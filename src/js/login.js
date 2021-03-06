$(function() {

	let hostUrl = app.config.host;
	$('.login-btn').click(function(e) {

		e.preventDefault();
		var user = {
			name: $('input[name="name"]').val().trim(),
			passwd: $('input[name="password"]').val()
		};

		// todo: validate
		var validate = _validateUser(user);
		if (!validate.success) {

			return alert(validate.error)
		}

		$.post(hostUrl + '/users/login', user, function(res) {

			console.log(res)
			if (!res.success) {
				alert(res.error)
				return
			}
			location.href = '/'
		})
	})

	$('.signin-btn').click(function(e) {

		location.href = 'signin.html'
	})

	function _validateUser(user) {

		if (!user.name) {
			return {
				success: false,
				error: 'name required'
			}
		}
		if (!user.passwd) {
			return {
				success: false,
				error: 'password required'
			}
		}
		return {
			success: true
		}
	}
})