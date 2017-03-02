let app = require('./app')
let server = require('http').createServer(app)
let io = require('socket.io')(server)

module.exports = server

// io => 
let db = require('./db/db')
let UserModel = db.model('UserModel')
let MessageModel = db.model('MessageModel')

let _users = require('./data-cache/socket-user')

io.on('connection', (client) => {

	client.on('disconnect', () => {

		_onLogout(client)
	})

	client.on('login', (data) => {

		_onLogin(client, data)
	})

	client.on('logout', () => {

		_onLogout(client)
	})

	client.on('message', (data) => {

		_onMessage(client, data)
	})

	client.on('friend', (data) => {

		_onFriend(client, data)
	})

	client.on('record', (data) => {

		_onRecord(client, data)
	})

	console.info('New connect: ' + client.id)
})

function _onLogin(client, data) {
	// data = name
	UserModel.findOne({
			name: data.name,
			passwd: data.passwd
		})
		.then((user) => {

			if (user) {

				_users[user.name] = {
					name: user.name,
					socketId: client.id
				}
				client.emit('info.login', {
					success: true,
					result: user
				})
			} else {

				client.emit('info.login', {
						success: false,
						error: 'user not found'
					})
					// do nothing?
			}
		})
}

function _onLogout(client) {
	// delete frome _users
	if (_users.deleteBySocketId(client.id)) {

		client.emit('info.logout', {
			success: true,
			result: _users
		})
	} else {

		client.emit('info.logout', {
			success: false,
			result: _users
		})
	}
}

function _onMessage(client, data) {

	console.info('new message:')
	console.log(data)
	let toSocketId = _users.findByName(data.to).socketId
	if (toSocketId) {

		io.sockets.sockets[toSocketId].emit('message', data)
		client.emit('info.message', {
			info: 'message sent',
			message: data
		})
	} else {

		client.emit('info.message', {
			info: 'target offline',
			message: data
		})
	}

	// resove history ...
	let newMessage = new MessageModel({
		content: data.content,
		from: data.from,
		to: data.to,
		time: new Date(data.time)
	})
	newMessage.save((err) => {

		if (err) {
			console.warn(err)
		}
	})
}

function _onFriend(client, data) {
	if (!data) data = []
	UserModel.find({
			name: data
		}, 'name email gender headImg role')
		.then((res) => {

			client.emit('friend', {
				success: true,
				result: res
			})
		})
}

function _onRecord(client, data) {

	MessageModel
		.find({})
		.or([{
			from: data.from,
			to: data.to
		}, {
			from: data.to,
			to: data.from
		}])
		.then((res) => {

			client.emit('record', {

				success: true,
				result: res
			})
		}) 
}











