let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, index: 1 },
	email: { type: String, required: true, uniqie: true },
	passwd: { type: String, index: 1, required: true },
	role: { type: String },
	gender: { type: String },
	headImg: { type: String }, // base64
	friendList: { type: Array },
	blackList: { type: Array },
	isOnline: { type: Boolean }
})

mongoose.model('UserModel', UserSchema)