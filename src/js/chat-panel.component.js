var ChatPanelComponent = function(container) {

	this.container = container;
	this.dom = {
		friendName: 'dom'
	};
	this.changeTarget = function(name) {

		if (name == this.to) {
			return;
		}
		this.container.find('.panel-title')
			.attr('data-name', name)
			.html(name);
		this.to = name;
		if (!this.dom[name]) {
			this.dom[name] =  $('<ul class="message-list"></ul>');
		}
		this.container.find('.panel-body')
			.html('')
			.html(this.dom[name]);

		// to bottom
		if (!this.dom[name]) return;
		var scrollTop = this.dom[name].height() - this.container.find('.panel-body').height();
		this.container.find('.panel-body').scrollTop(scrollTop + 20);
	};
	this.send = function(message) {

		var friendName = message.to;
		var str =
			`<li class="message-list-item send">
		<img class="head send-head" src="img/0481.png" alt="send">
		<a class="message-content">
		` + message.content + `
		</a>
		</li>`;
		if (!this.dom[friendName]) {

			this.dom[friendName] = $('<ul class="message-list"></ul>');
			this.container.find('.panel-body')
				.html('')
				.html(this.dom[name]);
		}
		this.dom[friendName].append(str);

		// scroll
		var scrollTop = this.container.find('.panel-body').scrollTop() + 60;
		this.container.find('.panel-body').animate({
			scrollTop: scrollTop
		}, 300);
		return this;
	};
	this.receive = function(message) {

		var friendName = message.from;
		var str =
			`<li class="message-list-item receive">
		<img class="head receive-head" src="img/0482.png" alt="receive">
		<a class="message-content">
		` + message.content + `
		</a>
		</li>`
		if (!this.dom[friendName]) {

			this.dom[friendName] = $('<ul class="message-list"></ul>');
			this.container.find('.panel-body')
				.html('')
				.html(this.dom[name]);
		}
		this.dom[friendName].append(str);

		// scroll
		var scrollTop = this.container.find('.panel-body').scrollTop() + 60;
		this.container.find('.panel-body').animate({
			scrollTop: scrollTop
		}, 300);
		return this;
	};
	this.remove = function(friendName, id) {

		this.dom[friendName].find('data-id="' + id + '"').remove();
		return this;
	};

	// events
	var self = this;
	this.container.find('.send-btn').click(function() {

		var content = self.container.find('.send-text').val().trim();
		self.container.find('.send-text').val('');
		if (!content) return;
		var message = {
			from: app.user.name,
			to: self.to,
			content: content,
			time: new Date()
		};
		console.log('send message to ' + message.to);
		app.chatClient.send(message);
		self.send(message);
	});
}