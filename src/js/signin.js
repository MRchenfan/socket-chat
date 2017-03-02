$(function() {

	let hostUrl = 'http://localhost:3003'
	$('.login-btn').click(function(e) {

		location.href = 'login.html'
	})

	$('.signin-btn').click(function() {

		var user = {
			name: $('input[name="name"]').val().trim(),
			email: $('input[name="email"]').val().trim(),
			passwd: $('input[name="password"]').val()
		}

		// todo: validate
		var validate = _validateUser(user)
		if (!validate.success) {

			return alert(validate.error)
		} 
		$.post(hostUrl + '/users/signin', user, function(res) {

			console.log(res);
			if (!res.success) {
				alert(res.error);
				return;
			}
			alert('sign in success');
			location.href = 'login.html';
		});
	});

	function _validateUser(user) {

		if (!user.name) {
			return {
				success: false,
				error: 'name required'
			}
		}
		if (!user.email) {
			return {
				success: false,
				error: 'email required'
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














