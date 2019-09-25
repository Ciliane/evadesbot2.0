'use strict';


const { parseMention } = require('../utils/mentionParser.js');

module.exports = {
	name: 'avatar',
	aliases: ['pfp', 'icon'],
	description: 'Shows your avatar or of any other user',
	usage: 'e!avatar       (Your avatar)\ne!avatar [@mention#0001/user ID]',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {
		let user = parseMention(args[0], client) || client.users.get(args[0]);
		if (!user) {
			return message.channel.send(message.author.avatarURL);
		}

		message.channel.send(user.avatarURL);
	}
};
