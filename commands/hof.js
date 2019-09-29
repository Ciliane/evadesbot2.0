'use strict';


const embed = require('../utils/embedgenerator.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'hof',
	aliases: ['halloffame', 'weekly', 'leaderboard'],
	description: 'Gets hall of fame from evades.io',
	usage: 'e!hof',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 4,

	execute(message, args, client) {
		let json = new Promise(function(resolve, reject) {
			let timeout = setTimeout(() => {
				reject('request timeout');
			}, 10000);
			fetch('https://evades.io/api/game/hall_of_fame', {
				method: 'GET',
			}).then(response => {
				if (response.status != 200) {
					return reject(response.status);
				}
				clearTimeout(timeout);
				resolve(response.json());
			});
		});

		json.then(
			function(resolve) {
				let players = resolve.players;
				let playersCopy = players;
				let pages = [];

				let place = 1;
				for (let key of players) {

					let page = [];
					let pagePlayer = players.splice(0, 5);
					for (let key2 of pagePlayer) {
						page.push({
							name: `**${place}** - ${key2[0]}`,
							value: `${key2[1]} VP`
						});
						place++;
					}

					pages.push(embed.generateEmbed({
						name: message.author.tag,
						icon: message.author.avatarURL,
						type: 'default',
						title: 'Hall of fame',
						description: '',
						fields: page,
						picture: ''
					}));
				}


				message.channel.send(pages[0]).then(sentMessage => {
					sentMessage.react('⬅');
					setTimeout(() => {
						sentMessage.react('➡');
					}, 500);
					setTimeout(() => {
						sentMessage.react('❌');
					}, 1000);


					let filter = (reaction, user) => ['❌', '⬅', '➡'].includes(reaction.emoji.name) && user.id == message.author.id;
					let collector = sentMessage.createReactionCollector(filter, {time: 120000});

					let currentPage = 0;
					collector.on('collect', reaction => {
						if (reaction.emoji.name == '➡') {
							reaction.remove(message.author);

							currentPage += 1;
							if (currentPage == pages.length) currentPage -= 1;
							let page = pages[currentPage];
							page.embed.title = `Hall of fame (page ${currentPage + 1}/${pages.length + 1})`;
							sentMessage.edit(page);
						} if (reaction.emoji.name == '⬅') {

							reaction.remove(message.author);

							currentPage -= 1;
							if (currentPage == -1) currentPage += 1;
							let page = pages[currentPage];
							page.embed.title = `Hall of fame (page ${currentPage + 1}/${pages.length + 1})`;
							sentMessage.edit(page);

						} if (reaction.emoji.name == '❌') {
							collector.stop();
							sentMessage.delete();
						}
					});
				});
			}, function(error) { // Notify user if promise was rejected, and say the error code
				message.channel.send(embed.generateEmbed({
					name: message.author.tag,
					icon: message.author.avatarURL,
					type: 'error',
					title: 'Something went wrong...',
					description: 'Error code: (' + String(error) + ')',
					fields: [],
					picture: ''
				})
				);
			});
	}
};
