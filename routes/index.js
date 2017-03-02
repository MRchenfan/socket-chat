var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {

	if (!req.session.user) {
		res.redirect('users/login')
		return
	}
  res.render('index', { title: 'socket chat' })
})

module.exports = router
