
let app = require('./app')
let server = require('http').createServer(app)
let io = require('socket.io')(server)

module.exports = server

// io => 
let db = require('./db/db')
let UserModel = db.model('UserModel')
let uuid = require('uuid')

io.on('connection', (client) => {

	client.uuid = uuid.v4()

	client.on('disconnect', () => {

		console.info('User leave: ' + client.uuid)
	})

	console.info('New connect: ' + client.uuid)
})