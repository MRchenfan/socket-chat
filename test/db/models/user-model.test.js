let db = require('../../../db')

let UserModel = db.model('UserModel')

let newUser = new UserModel({
	name: 'wuya',
	email: '0980980@xfewy.com',
	passwd: '123456',
	role: 'admin',
	gender: 'man',
	headImg: ''
})

newUser.save((err) => {

	if (err) console.log(err)

	UserModel.find({}, (err, res) => {

		if (err) console.log(err)
		else console.log(res)

		db.close()
	})
})