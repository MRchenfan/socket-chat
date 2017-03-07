!(function() {

	// for dev
	$.ajaxSetup({
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		}
	});
	var config = {
		host: 'http://localhost:3003'
	};
	var router = {
		login: 'login.html',
		signin: 'signin.html',
		index: '/'
	};
	
	var app = {
		config: config,
		router: router
	}

	window.app = app;
}());