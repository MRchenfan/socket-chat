var FriendListComponent = function(container) {
	this.container = container;
	EventEmitter.call(this);

	this.add = function(name) {

		var str = '<a class="list-group-item friend-list-item" data-name="' + name + '">' + name + '</a>';

		this.container.append(str);
	};

	this.online = function(name) {

		this.container.find('.friend-list-item[data-name="' + name + '"]')
			.addClass('online');
	};

	this.offline = function(name) {

		this.container.find('.friend-list-item[data-name="' + name + '"]')
			.removeClass('online');
	};

	// events
	var self = this;
	this.container.delegate('.friend-list-item', 'click', function() {

		self.emit('click', $(this).attr('data-name'));
	});
};

FriendListComponent.prototype = new EventEmitter();