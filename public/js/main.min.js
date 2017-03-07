$(function() {

	app.chatPanel = new ChatPanelComponent($('.chat-panel'));
	app.friendList = new FriendListComponent($('.friend-list-wrapper'));
	app.user = {};
	app.chatClient = new ChatClient();

	app.chatClient
		.on('connect', function() {
			console.info('connect');
		})
		.on('disconnect', function() {

			console.info('disconnect');
		})
		.on('message', function(data) {

			console.info('receive message');
			console.log(data);
			app.chatPanel.receive(data);
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

			var friendName = '';
			if (!data.success || data.result.length === 0) return;
			if (data.result[0].from == app.user.name) {

				friendName = data.result[0].to;
			} else {

				friendName = data.result[0].from;
			}

			for (var i = 0; i < data.result.length; i++) {

				var message = data.result[i];
				if (message.from == friendName) {

					app.chatPanel.receive(message);
				} else {

					app.chatPanel.send(message);
				}
			}
		})

	$.get(app.config.host + '/users/getUser', function(res) {

		console.log(res);
		if (!res.success) {

			alert('用户登录失败')
			location.href = app.router.login;
		}
		app.user = res.user;
		app.chatClient.init({
			url: app.config.host,
			name: app.user.name,
			passwd: app.user.passwd,
			io: io, // socket.io
			friendList: app.user.friendList,
			blackList: app.user.blackList
		});
		// render friend list
		$('.friend-list .panel-title .user-name').html(app.user.name);
		for (var i = 0; i < app.user.friendList.length; i++) {

			app.friendList.add(app.user.friendList[i]);
		}
	});

	// open chat panel
	app.friendList.on('click', function(name) {

		// render message list on chat panel
		app.chatPanel.changeTarget(name);
	});
	// search
	!(function() {

		$('.search-btn').click(function() {

			var name = $('.search-text').val().trim();
			if (!name) return;
			$.get(app.config.host + '/users/search', {
				name: name
			}, function(res) {

				console.log(res);
				if (!res.success) return;
				var str = '';
				for (var i = 0; i < res.result.length; i++) {
					var u = res.result[i];
					str +=
						`<a class="list-group-item">
					<span>` + u.name + `</span>
					/
					<span class="small">` + u.email + `</span>
					<button class="add-btn btn btn-warning btn-xs pull-right" data-name="` + u.name + `">
					添加好友
					</button>
					</a>`;
				}
				$('.search-result').html(str);
			})
		});

		$('.search-result').delegate('.add-btn', 'click', function() {

			var name = $(this).attr('data-name');
			if (!name) return;
			$.get(app.config.host + '/users/addFriend', {
				name: name
			}, function(res) {

				console.log(res);
				if (res.success) {

					app.friendList.add(name);
					app.chatClient.addFriend(name);
				} else {

					alert(res.error);
				}
			})
		});
	}());
	// log out
	$('.logout-btn').click(function() {

		$.get(app.config.host + '/users/logout', function(res) {

			if (res.success) {

				location.href = app.router.login;
			}
		});
	});

	window.app = app;
});