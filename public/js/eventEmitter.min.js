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