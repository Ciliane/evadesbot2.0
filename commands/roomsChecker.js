const fetch = require('node-fetch');
const embed = require('../utils/embedgenerator.js');

module.exports = {
	name: 'servers',
	aliases: ['rooms', 'playersonline'],
	description: 'Gets players online on EU and US servers of evades.io',
	usage: 'e!servers',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 5,

	execute(message, args, client) {
		let promise = new Promise(function (resolve, reject) {
			fetch('https://evades.io/api/game/list', {
				method: 'GET',
			}).then(response => {
				if (response.status != 200) {
					reject(response.status);
				}
				resolve(response.json());
			});
		});

		promise.then(
			function (resolve) {
				let us = resolve.local;
				let eu = resolve.remotes['https://eu.evades.io'];

				let euServers = [];
				let usServers = [];
				let playersOnline = 0;

				for (let i = 0; i < us.length; i++) {
					const room = us[i][0];

					usServers.push(`Server ${i + 1}\nPlayers: ${room.connected}/${room.capacity}\n\n`);
					playersOnline += room.connected;
				}
				for (let i = 0; i < eu.length; i++) {
					const room = eu[i][0];

					euServers.push(`Server ${i + 1}\nPlayers: ${room.connected}/${room.capacity}\n\n`);
					playersOnline += room.connected;
				}



				message.channel.send(embed.generateEmbed({
					name: message.author.tag,
					icon: message.author.avatarURL,
					type: 'default',
					title: 'Online players total: ' + playersOnline,
					description: 'description',
					fields: [
						{
							name: 'US servers',
							value: String(usServers.join('')),
							inline: true
						},
						{
							name: 'EU servers',
							value: String(euServers.join('')),
							inline: true
						}
					],
					picture: ''
				})
				);
			}, function reject(error) {
				message.channel.send(embed.generateEmbed({
					name: message.author.tag,
					icon: message.author.avatarURL,
					type: 'error',
					title: 'Something went wrong...',
					description: 'Error code: (' + error + ')',
					fields: [],
					picture: ''
				})
				);
			});
	}
};