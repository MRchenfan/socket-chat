let db = require('../../../db/db')

let UserModel = db.model('UserModel')


let newUser = new UserModel({
	name: 'test',
	email: 'test@163.com',
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