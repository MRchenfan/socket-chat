let _error = require('../config/error')
let express = require('express')
let router = express.Router()
let db = require('../db/db')

let UserModel = db.model('UserModel')

/* GET users listing. */
router.get('/', (req, res, next) => {

	res.render('users')
})

router.get('/login', (req, res, next) => {
	res.render('login', {
		title: 'login'
	})
})

router.get('/signin', (req, res, next) => {
	res.render('signin', {
		title: 'signin'
	})
})

router.get('/getUser', (req, res, next) => {

	if (req.session.user) {

		res.json({
			success: true,
			user: req.session.user
		})
	} else {

		res.json({
			success: false,
			error: _error.notLogin
		})
	}
})

router.get('/search', (req, res, next) => {

	console.info('/users/search')
	console.log('user.name = ' + req.query.name)
	var name = req.query.name
	var pat = new RegExp(name, 'i')
	UserModel
		.find()
		.or([{
			name: pat
		}, {
			email: pat
		}])
		.select('name email')
		.then((_res) => {

			res.json({
				success: true,
				result: _res
			})
		})
})

router.post('/signin', (req, res, next) => {
	console.info('/users/signin')
	console.log('user.name = ' + req.body.name)
	let user = {
		name: req.body.name,
		passwd: req.body.passwd,
		email: req.body.email
	}

	// validate user
	if (!_validateUser(user)) {

		return res.json({
			success: false,
			error: _error.illegalInput
		})
	}
	let newUser = new UserModel(user)

	newUser.save((err, _res) => {

		if (err) {

			return res.json({
				success: false,
				error: err //_error.dbError
			})
		}

		// create success
		return res.json({
			success: true,
			result: _res
		})
	})
})

router.post('/login', (req, res, next) => {
	console.info('/users/login')
	console.log('user.name = ' + req.body.name)

	let user = {
		name: req.body.name,
		passwd: req.body.passwd
	}

	// validate user
	if (!_validateUser(user)) {

		return res.json({
			success: false,
			error: _error.illegalInput
		})
	}
	let query = user
	UserModel.findOne(query, (err, _res) => {

		if (err) {

			return res.json({
				success: false,
				error: _error.dbError
			})
		}
		if (!_res) {

			return res.json({
				success: false,
				error: _error.notFound
			})
		}

		// login success
		req.session.user = _res
		return res.json({
			success: true,
			result: _res
		})
	})
})

router.get('/logout', (req, res, next) => {

	req.session.user = null;
	res.json({
		success: true
	})
})

router.get('/addFriend', (req, res, next) => {

	console.info('/users/addFriend?' + req.query.name);
	if (req.session.user) {
		var userName = req.session.user.name;
		var friendName = req.query.name;
		var friendList = req.session.user.friendList;

		if (friendList.indexOf(friendName) > -1) {

			return res.json({
				success: false,
				error: _error.alreadyFriend
			})
		}

		if (userName == friendName) {

			return res.json({
				success: false,
				error: _error.cantAddYourself
			})
		}

		friendList.push(friendName); // 同时更新了session
		UserModel
			.update({
				name: userName
			}, {
				friendList: friendList
			})
			.then((_res) => {

				console.log(_res)
				res.json({
					success: true,
					friendList: friendList
				})
			})
	}
})

function _validateUser(user) {

	try {

		for (var k in user) {

			if (!user[k]) {
				throw _error.illegalInput
			}
		}
		return {
			success: true
		}
	} catch (err) {

		return {
			success: false,
			error: err
		}
	}
}

module.exports = router