'use strict';

const embed = require('../utils/embedgenerator.js');
module.exports = {
	name: 'invite',
	aliases: ['link', 'botlink'],
	description: 'Sends my authorization link',
	usage: 'e!link',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {
		message.channel.send(embed.generateEmbed({
			name: message.author.tag,
			icon: message.author.avatarURL,
			type: 'default',
			title: 'Link',
			description: '[Invite me!](https://discordapp.com/oauth2/authorize?client_id=622188092782018600&scope=bot&permissions=256000)',
			fields: [],
			picture: ''
		})
		);
	}
};
