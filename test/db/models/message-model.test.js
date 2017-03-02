let db = require('../../../db/db')

let MessageModel = db.model('MessageModel')

MessageModel
	.find({})
	.or([{
		from: 'test-1',
		to: 'xiaofan'
	}, {
		from: 'xiaofan',
		to: 'test-1'
	}])
	.then((res) => {
		console.log(res)
		db.close()
	})