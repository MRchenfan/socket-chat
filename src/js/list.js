var List = function(names) {

	names = names ? names : [];
	this.names = names;
	this.info = {
		// name: {}
	};
	this.message = {
		// name: []
	};
};

List.prototype.add = function(name) {

	this.names.push(name);
	return this;
};

List.prototype.getInfo = function(name) {

	this.info[name];
	return this;
};

List.prototype.getMessage = function(name) {

	this.message[name];
	return this;
};

List.prototype.addInfo = function(name, info) {

	this.info[name] = extend(this.info[name], info);
	return this;
};

List.prototype.addMessage = function(name, message) {

	if (!(this.message[name] instanceof Array)) {
		this.message[name] = [];
	}
	this.message[name].push(message);
	return this;
};

List.prototype.count = function() {
	
	return this.names.length;
};