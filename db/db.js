
let config = require('../config/config')
let mongoose = require('mongoose')
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

module.exports = db