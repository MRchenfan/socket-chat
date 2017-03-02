$(function() {
	var client = new ChatClient({
		url: 'http://127.0.0.1:3003',
		name: 'test-1',
		passwd: 123456,
		io: io, // socket.io
		friendList: ['xiaofan', 'test-2', 'junsheng'],
		blackList: []
	});

	client
		.on('connect', function() {
			console.info('connect');
		})
		.on('disconnect', function() {

			console.info('disconnect');
		})
		.on('message', function(data) {

			console.info('receive message');
			console.log(data);
		})
		.on('info.message', function(data) {

			console.info('info.message');
			console.log(data);
		})
		.on('info.login', function(data) {

			console.info('info.login');
			console.log(data);
		})
		.on('info.logout', function(data) {

			console.info('info.logout');
			console.log(data);
		})
		.on('record', function(data) {

			console.info('record');
			console.log(data);
		})

	$('.send-btn').click(function() {

		var content = $('.input-text').val().trim();
		if (content) {
			client.send({
				from: client.cfg.name,
				to: 'xiaofan',
				content: content,
				time: Date.now()
			})
		}
	});

	window.client = client;
})