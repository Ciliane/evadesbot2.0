'use strict';

const embed = require('../utils/embedgenerator.js');

module.exports = {
	name: 'uptime',
	aliases: ['online-time', 'runtime'],
	description: 'Says how long i am online',
	usage: 'e!uptime',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {
		let time = client.uptime;

		let seconds = time / 1000;
		let minutes = 0;
		let hours = 0;
		let days = 0;

		while (seconds > 60) {
			minutes += 1;
			seconds -= 60;
		}
		while (minutes > 60) {
			hours += 1;
			minutes -= 60;
		}

		let timeString = '';

		if (seconds > 0) timeString += `${seconds} seconds`;
		if (minutes > 0) timeString += `, ${minutes} minutes`;
		if (hours > 0) timeString += `, ${hours} hours`
		message.channel.send(embed.generateEmbed({
			name: message.author.tag,
			icon: message.author.avatarURL,
			type: 'default',
			title: 'Uptime',
			description: timeString,
			fields: [],
			picture: ''
		})
		);
	}
};
