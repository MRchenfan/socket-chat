/**
 * module start
 * @param  {object} root    
 * @param  {function} factory 
 * @return {[type]}         [description]
 */
!(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof define === 'function' && define.cmd) {
		define(function(require, exports, module) {
			module.exports = factory();
		});
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.ChatClient = factory();
	}
}(this, function() {

	var EventEmitter = (function() {

		var EventEmitter = function() {
			this.listeners = {};
			this.oneListeners = {};
		}
		EventEmitter.prototype = {
			constructor: EventEmitter,
			on: function(type, handler) {
				if (!this.listeners[type]) {
					this.listeners[type] = [];
				}
				this.listeners[type].push(handler);
				return this;
			},
			emit: function(type) {
				var _arguments = [];
				for (var i = 1; i < arguments.length; i++) {
					_arguments.push(arguments[i]);
				}

				if (type in this.listeners) {
					var handlers = this.listeners[type];
					for (var i = 0; i < handlers.length; i++) {
						handlers[i].apply(null, _arguments);
					}
				}

				if (type in this.oneListeners) {
					while (this.oneListeners[type].length) {
						this.oneListeners[type].shift().apply(null, _arguments);
					}
				}
				return this;
			},
			one: function(type, handler) {
				if (!this.listeners[type]) {
					this.oneListeners[type] = [];
				}
				this.oneListeners[type].push(handler);
				return this;
			}
		};
		return EventEmitter;
	}());

	var ChatClient = function(config) {
		EventEmitter.call(this);
	};

	var fn = ChatClient.prototype = new EventEmitter();

	fn.init = function(config) {
		var cfg = {
			url: null,
			name: null,
			passwd: null,
			friendList: [], // friend names
			blackList: [], // names
			io: null, // socket.io
		};
		this.cfg = extend(cfg, config);
		this.friendList = new List(this.cfg.friendList);
		this.blackList = new List(this.cfg.blackList);

		for (var i = 0; i < this.cfg.friendList.length; i++) {

			var name = this.cfg.friendList[i];
			this.friendList.info[name] = {
				name: name,
				headImg: null,
				email: null
			}
		}

		return this.connect()
			.login();
	};

	fn.connect = function() {

		this.socket = this.cfg.io(this.cfg.url);
		_initListeners(this);
		return this;
	};

	fn.login = function() {

		this.socket.emit('login', {
			name: this.cfg.name,
			passwd: this.cfg.passwd
		});
		return this;
	};

	fn.logout = function() {

		thist.socket.emit('logout');
		return this;
	};

	fn.send = function(data) {

		this.socket.emit('message', data);
		return this;
	};

	fn.addFriend = function(friendName) {

		this.friendList.add(friendName);
		// get info and records
		this.socket.emit('friend', [friendName]);
	};


	function _initListeners(client) {
		client.socket.on('connect', function() {

			client.emit('connect');
		});

		client.socket.on('disconnect', function() {

			client.emit('disconnect');
		});

		client.socket.on('info.login', function(data) {

			client.emit('info.login', data);
			// get friend info and messages
			if (!data.success) return;
			client.socket.emit('friend', client.friendList.names);
		});

		client.socket.on('info.logout', function(data) {

			client.emit('info.logout', data);
		});

		client.socket.on('info.message', function(data) {

			client.emit('info.message', data);
			// save
			client.friendList.addMessage(data.message.to, data.message);
		});

		client.socket.on('message', function(data) {

			client.emit('message', data);
			// save
			client.friendList.addMessage(data.from, data);
		});

		client.socket.on('friend', function(data) {

			client.emit('friend', data);
			// save friend info to friendList
			if (!data.success) return;
			for (var i = 0; i < data.result.length; i++) {

				var name = data.result[i].name;
				var info = data.result[i];
				client.friendList.addInfo(name, info);

				// get record
				client.socket.emit('record', {
					from: client.cfg.name,
					to: name
				});
			}
		});

		client.socket.on('record', function(data) {

			client.emit('record', data);
			// save record to friendList
			if ((!data.success) || (data.result.length === 0)) return;
			var friendName = '';
			if (data.result[0].from == client.cfg.name) {

				friendName = data.result[0].to;
			} else {

				friendName = data.result[0].from;
			}
			for (var i = 0; i < data.result.length; i++) {

				var message = data.result[i];
				client.friendList.addMessage(friendName, message);
			}
		});
	}

	return ChatClient;
}));