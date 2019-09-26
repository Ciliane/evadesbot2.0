'use strict';


const fetch = require('node-fetch');
const embed = require('../utils/embedgenerator.js');
module.exports = {
	name: 'stats',
	aliases: ['profile', 's'],
	description: 'Gets data about evades.io account.',
	usage: 'e!stats [playerName]',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 5,

	execute(message, args, client) {

		let user = args[0];
		let userUrl = encodeURI(user);

		// some validation
		// just a change to commit

		if (!user) {
			message.channel.send(embed.generateEmbed({
				name: message.author.tag,
				icon: message.author.avatarURL,
				type: 'default',
				title: 'Missing arguments!',
				description: 'No user selected',
				fields: [],
				picture: ''
			})
			);
			return;
		}

		let sentMessage;
		message.channel.send(embed.generateEmbed({
			name: message.author.tag,
			icon: message.author.avatarURL,
			type: 'default',
			title: 'Loading...',
			description: '',
			fields: [],
			picture: ''
		})
		).then(bruh => {
			sentMessage = bruh;
		});

		// creating a promise for getting a JSON from server
		let json = new Promise(function (resolve, reject) {
			// fetching data
			fetch('https://evades.io/api/account/' + userUrl, {
				method: 'GET',
			}).then(response => {
				// reject if not success
				if (response.status != 200) {
					reject(response.status);
					return;
				}
				// parse response
				resolve(response.json());
			});


		});

		json.then(
			// if promise was resolved, say the data
			function (result) {
				user = user.toUpperCase();
				let totalVp = result.stats.highest_area_achieved_counter;
				let weekVp = result.stats.highest_area_achieved_resettable_counter;

				let hats = '';
				let hatsJson = result.accessories.hat_collection;

				let heroes = [];
				let totalHeroes = 0;
				let heroesJson = result.stats.highest_area_achieved;


				let recordsJson = result.stats.week_record;

				{
					if (heroesJson['Central Core'] > 19) {
						heroes.push('Aurora');
						totalHeroes += 1;
					}
					if (heroesJson['Central Core'] == 40) {
						heroes.push('Necro');
						totalHeroes += 1;
					}
					if (heroesJson['Dangerous District'] == 80) {
						heroes.push('Reaper');
						totalHeroes += 1;
					}
					if (heroesJson['Elite Expanse'] > 39) {
						heroes.push('Shade');
						totalHeroes += 1;
						if (heroesJson['Elite Expanse'] == 80) {
							heroes.push('Euclid');
							totalHeroes += 1;
						}
					}
					if (heroesJson['Frozen Fjord'] == 40) {
						heroes.push('Jotunn');
						totalHeroes += 1;
					}
					if (heroesJson['Glacial Gorge'] == 40) {
						heroes.push('Nexus');
						totalHeroes += 1;
					}
					if (heroesJson['Monumental Migration'] > 119) {
						heroes.push('Chrono');
						totalHeroes += 1;
					}
					if (heroesJson['Ominous Occult'] == 16) {
						heroes.push('Ghoul');
						totalHeroes += 1;
					}
					if (heroesJson['Quiet Quarry'] == 80) {
						heroes.push('Cent');
						totalHeroes += 1;
					}
					if (heroesJson['Restless Ridge'] == 43) {
						heroes.push('Mirage');
						totalHeroes += 1;
					}
					if (heroesJson['Vicious Valley'] == 40) {
						heroes.push('Brute');
						totalHeroes += 1;
					}
					if (heroesJson['Wacky Wonderland'] > 39) {
						heroes.push('Jolt');
						totalHeroes += 1;
						if (heroesJson['Wacky Wonderland'] == 80) {
							heroes.push('Candy');
							totalHeroes += 1;
						}
					}


					if (!heroes.length) heroes = 'No heroes';
					else heroes = String(heroes.join(',\n'));
				}

				for (let key in hatsJson) {
					if (hatsJson[key] == true) {
						hats += `${key}, \n`;
					}
				}
				if (!hats) hats = 'No hats';




				let pages = [
					embed.generateEmbed({
						name: message.author.tag,
						icon: message.author.avatarURL,
						type: 'default',
						title: `_**${user.toUpperCase()}**_`,
						description: 'VP and hats\nReact with arrows to navigate bewtween stats pages',
						fields: [
							{
								name: '_**VP**_',
								value:
									`**TOTAL VP**: ${totalVp}
							**WEEKLY VP**: ${weekVp}`,
								inline: true
							},
							{
								name: '_**HATS**_',
								value: hats,
								inline: true
							}
						],
						picture: ''
					}), embed.generateEmbed({
						name: message.author.tag,
						icon: message.author.avatarURL,
						type: 'default',
						title: `_**${user}**_`,
						description: 'Heroes unlocked\n' + totalHeroes + '/14 unlocked',
						fields: [
							{
								name: '_**HEROES**_',
								value: heroes
							}
						],
						picture: ''
					})
				];

				let fields = [];
				for (let key in recordsJson) {
					fields.push(
						{
							name: `Week ${key}`,
							value: `VP: ${recordsJson[key].wins} \n Crown awarded: ${recordsJson[key].finish}`,
							inline: true
						}
					);
				}
				for (let key of fields) {
					pages.push(
						embed.generateEmbed({
							name: message.author.tag,
							icon: message.author.avatarURL,
							type: 'default',
							title: `_**${user}**_'`,
							description: 'Week history',
							fields: fields.slice(0, 6),
							picture: ''
						})
					);
					fields = fields.slice(6, fields.length);
					if (!fields.length) break;
				}



				const filter = (reaction, user) => ['⬅', '➡', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;

				sentMessage.edit(pages[0]);
				sentMessage.react('⬅');
				setTimeout(() => {
					sentMessage.react('➡');
				}, 500);
				setTimeout(() => {
					sentMessage.react('❌');
				}, 1000);

				let collector = sentMessage.createReactionCollector(filter, { time: 120000 });
				let currentPage = 0;



				collector.on('collect', reaction => {
					if (reaction.emoji.name == '⬅') {
						reaction.remove(message.author);

						currentPage -= 1;
						if (currentPage < 0) currentPage += 1;
						sentMessage.edit(pages[currentPage]);
					}
					if (reaction.emoji.name == '➡') {
						reaction.remove(message.author.id);

						currentPage += 1;
						if (currentPage == pages.length) currentPage -= 1;
						pages[currentPage].embed.title = `${user} (page ${currentPage + 1}/${pages.length})`;
						sentMessage.edit(pages[currentPage]);
					}
					if (reaction.emoji.name == '❌') {
						collector.stop();
						sentMessage.delete();
					}
				});
				collector.on('end', function () {
					if (!sentMessage) return;
					sentMessage.delete();
				});



			}, function (error) { // Notify user if promise was rejected, and say the error code
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
			}
		);

	}
};
