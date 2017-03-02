let users = {
	name: {
		name: 'admin',
		socketId: 'socketId'
	}
}

users.findByName = function(name) {

	if (users[name]) {

		return users[name]
	} else {
		
		return false
	}
}

users.findBySocketId = function(id) {

	let res
	for (var k in users) {

		if (users[k].socketId == id) {
			res = users[k]
			break
		}
	}
	return res
}

users.deleteBySocketId = function(id) {

	let res = false
	for (var k in users) {

		if (users[k].socketId == id) {

			delete users[k]
			res = true
			break
		}
	}
	return res
}

users.isOnline = function(name) {

	if (users[name]) {

		return true
	} else {

		return false
	}
}

module.exports = users