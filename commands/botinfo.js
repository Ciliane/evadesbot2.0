'use strict';

const fs = require('fs');
const embed = require('../utils/embedgenerator.js');
module.exports = {
	name: 'botinfo',
	aliases: ['info', 'botstats'],
	description: 'Gets stats for this bot, such as how many users, how many servers, and how many commands',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {
		let guildsCount = client.guilds.size;
		let usersCount = 0;
		let totalCommands = fs.readdirSync('/').length;

		client.guilds.forEach((guild) => {
			usersCount += guild.members.size;
		});


		message.channel.send(embed.generateEmbed({
			name: message.author.tag,
			icon: message.author.avatarURL,
			type: 'default',
			title: 'Bot stats',
			description: '',
			fields: [
				{
					name: 'Total commands',
					value: totalCommands
				},
				{
					name: 'Total servers',
					value: guildsCount
				},
				{
					name: 'Total users',
					value: usersCount
				}
			],
			picture: ''
		})
		);

	}
};