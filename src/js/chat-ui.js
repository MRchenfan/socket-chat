var str = '';
for (var i = 0; i < friends.length; i++) {

	str += '<a class="list-group-item" data-name="' + friends[i] + '">' +
		friends[i] +
		'</a>';
}
this.cfg.chatList.find('.list-group').html(str);


fn.renderChatPanel = function(name) {
	var self = this;
	this.cfg.chatPanel.find('.panel-title').html(name);
	this.cfg.sendBtn.attr('data-name', name);
	// get chat history
	$.get(this.cfg.url + '/chat/history', {
		name: self.cfg.name,
		friend: name
	}, function(res) {

		if (!res.success) {
			alert('获取历史消息失败');
		}
		var str = '';
		for (var i = 0; i < res.result.length; i++) {

			var message = res.result.length[i];
			if (message.from == name) {

				str +=
					'<li class="message-list-item send">' +
					'<img class="head send-head" src="img/0481.png" alt="send">' +
					'<a class="message-content">' +
					message.content +
					'</a>' +
					'</li>';
			} else {

				str +=
					'<li class="message-list-item receive">' +
					'<img class="head receive-head" src="img/0482.png" alt="receive">' +
					'<a class="message-content">' +
					message.content +
					'</a>' +
					'</li>';
			}
		}
		self.chatPanel.find('.message-list').html(str);
	});
};

fn.bind = function() {

	var self = this;

	// friend list
	this.cfg.chatList.delegate('.list-group-item', 'click', function() {

		var name = $(this).attr('data-name');
		self.renderChatPanel(name);

		$(this).addClass('active')
			.siblings()
			.removeClass('active');
	});

	// send btn
	this.cfg.sendBtn.click(function() {

		var content = self.cfg.inputText.val().trim();
		if (!content) return; // todo: validate
		var to = $(this).attr('data-name');
		var message = {
			content: content,
			from: self.cfg.name,
			to: to,
			time: Date.now()
		};
		self.send(message);
	});
};