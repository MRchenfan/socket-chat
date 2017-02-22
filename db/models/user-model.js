let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
	name: { type: String, index: 1, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	passwd: { type: String, index: 1, required: true },
	role: { type: String },
	gender: { type: String },
	headImg: { type: String }, // base64
})

mongoose.model('UserModel', UserSchema)