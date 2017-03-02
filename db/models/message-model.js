let mongoose = require('mongoose')

let MessageSchema = new mongoose.Schema({
	content: { type: String },
	from: { type: String },
	to: { type: String },
	time: { type: Date }
})

mongoose.model('MessageModel', MessageSchema)