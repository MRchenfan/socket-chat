
function extend() {
	var result = {},
		i, attr;
	for (i = 0; i < arguments.length; i++) {
		for (attr in arguments[i]) {
			if (arguments[i].hasOwnProperty(attr)) {
				result[attr] = arguments[i][attr];
			}
		}
	}
	return result;
};