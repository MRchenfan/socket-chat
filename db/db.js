
let config = require('../config/config')
let mongoose = require('mongoose')

mongoose.Promise = require('bluebird')

let uri = config.db.uri
mongoose.connect(uri)

let db = mongoose.connection

db.once('open', () => {

	console.log('========== db is opened ===========')
})

db.on('error', (err) => {

	console.log(err)
})

// register models
require('./models/user-model')
require('./models/message-model')

module.exports = db