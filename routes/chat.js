let router = require('express').Router()
let db = require('../db/db')
let MessageModel = db.model('MessageModel')

router.get('/history', (req, res, next) => {

	let name = req.query.name
	let friend = req.query.friend
	// MessageModel.find({ from: name }) todo: how to use mongodb
})