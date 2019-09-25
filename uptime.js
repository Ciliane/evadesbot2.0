'use strict';

const embed = require('../utils/embedGenerator.js');

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
		let minutes = time / (1000 * 60);
		let hours = time / (1000 * 60 * 24);

		message.channel.send(embed.generateEmbed({
			name: message.author.tag,
			icon: message.author.avatarURL,
			type: 'default',
			title: 'Uptime',
			description: '',
			fields: [
				{
					name: 'seconds',
					value: String(seconds.toFixed(1))
				}
			],
			picture: ''
		})
		);
	}
};