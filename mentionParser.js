'use strict';

exports.parseMention = function (mention, client) {
	if (!mention) return;

	mention = mention.slice(2, mention.length - 1);
	let user = client.users.get(mention);
	return user;
};