var MessageListComponent = function(friendName) {

	this.friendName = friendName;
	this.dom = $('<ul class="message-list"></ul>');
}

MessageListComponent.prototype = {

	send: function(message) {

		var str = 
		`<li class="message-list-item send">
		<img class="head send-head" src="img/0481.png" alt="send">
		<a class="message-content">
		` + message.content + `
		</a>
		</li>`;
		this.dom.append(str);
		return this;
	},	
	receive: function(message) {

		var str = 
		`<li class="message-list-item receive">
		<img class="head receive-head" src="img/0482.png" alt="receive">
		<a class="message-content">
		receive message
		</a>
		</li>`
		this.dom.append(str);
		return this;
	},
	remove: function(id) {

		this.dom.find('data-id="' + id + '"').remove();
		return this;
	}
};