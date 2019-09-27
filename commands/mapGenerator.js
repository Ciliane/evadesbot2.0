const words = {
	a: {
		primary: ['artifical',
			'aesthetic',
			'absolute',
			'abnormal',
			'absent',
			'amiable',
			'antique',
			'awful',
			'awkward',
			'audile'],
		secondary: [
			'ability',
			'absense',
			'absorb',
			'accident',
			'accordance',
			'ache',
			'act',
			'admire',
			'acceptance',
			'Affection',
			'afraid',
			'Altitude',
			'Anger',
			'Announcement'
		]
	}
};

const embed = require('../utils/embedgenerator.js');
const seedrandom = require('seedrandom');
const YAML = require('json-to-pretty-yaml');
module.exports = {
	name: 'mapgenerator',
	aliases: ['randommap', 'randomcode', 'mg', 'codegenerator'],
	description: 'Generates random evades.io map and sends it after',
	usage: 'e!mapgenerator [seed (optional)]',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 3,

	execute(message, args, client, Discord) {
		let seed;
		let thing = String(args.join(' ')) || String(Math.round(Math.random() * 999999));
		seed = seedrandom(thing);
		let howmanies = [40, 80, 120];
		let howmany = howmanies[Math.floor(seed() * howmanies.length)];
		let promise = new Promise(function (resolve, reject) {
			let map = {

			};
			try {

				let name = '';
				name += words.a.primary[Math.floor(seed() * words.a.primary.length)] + ' ';
				name += words.a.secondary[Math.floor(seed() * words.a.secondary.length)];
				map['name'] = name;
				let properties = {
					background_color: [
						String(Math.round(seed() * 255)),
						String(Math.round(seed() * 255)),
						String(Math.round(seed() * 255)),
						'100'
					],
					friction: 0.75
				};
				if (seed() * 100 > 80) {
					properties.friction = 0.50;
				}


				let areas = [];

				let enemies = [
					'teleporting',
					'dasher',
					'switch',
					'snowman',
					'icicle',
					'draining',
					'disabling',
					'normal',
					'repelling',
					'regen_sniper',
					'slowing',
					'immune',
					'oscillating',
					'spiral',
					'zigzag',
					'zoning',
					'speed_sniper',
					'sizing',
					'freezing',
					'turning',
					'gravity',
					'wavy',
					'homing',
					'liquid',
					'sniper',
					'slippery',
					'radiating_bullets',
					'ice_sniper'
				];

				for (let i = 0, x = 0; i < howmany; i++ , x += 3200) {
					let number = 1;
					if (i == 0) {
						number += 2;
					}
					let spawner = [];

					let typesCount = 1;

					if (i > 1 && i < 5) typesCount = 1;
					if (i > 5 && i < 15) typesCount = Math.round(Math.random() * 2);
					if (i > 15 && i < 20) typesCount = 2;
					if (i > 20 && i < 30) typesCount = Math.round(Math.random() * (3 - 2) + 2);
					if (i > 30 && i < 40) typesCount = Math.round(Math.random() * (4 - 3) + 3);

					if (i > 40 && i < 45) typesCount = 1;
					if (i > 45 && i < 55) typesCount = Math.round(Math.random() * 2);
					if (i > 55 && i < 60) typesCount = 2;
					if (i > 60 && i < 70) typesCount = Math.round(Math.random() * (4 - 3) + 3);
					if (i > 70 && i < 80) typesCount = Math.round(Math.random() * (4 - 3) + 3);

					if (i > 80 && i < 85) typesCount = 1;
					if (i > 85 && i < 95) typesCount = Math.round(Math.random() * 2);
					if (i > 95 && i < 110) typesCount = 2;
					if (i > 110 && i < 120) typesCount = Math.round(Math.random() * (3 - 2) + 2);
					if (i > 120 && i < 130) typesCount = Math.round(Math.random() * (4 - 3) + 3);



					if (i >= 3) {
						spawner.push({
							types: [
								'wall'
							],
							radius: Math.floor(seed() * (64 - 32) + 15),
							speed: Math.floor(seed() * (15 - 5) + 5),
							count: Math.floor(seed() * (20 - 15) + 15)
						});
					}
					for (let j = 0; j < typesCount; j++) {

						spawner.push({
							types: [
								enemies[Math.floor(seed() * enemies.length)]
							],
							radius: Math.floor(seed() * (32 - 10) + 10),
							speed: Math.floor(seed() * (10 - 5) + 5),
							count: Math.floor(seed() * (20 - 5) + 5)
						});
					}


					let area = {
						x: x,
						y: 0,
						zones: [
							{
								type: 'safe',
								x: 0,
								y: 0,
								width: 320,
								height: 480
							},
							{
								translate: {
									x: -160,
									y: 0
								},
								type: 'exit',
								x: 0,
								y: 0,
								width: 64,
								height: 480
							},
							{
								type: 'active',
								x: 320,
								y: 0,
								width: 2560,
								height: 480,
								spawner: spawner
							},
							{
								type: 'safe',
								x: 2880,
								y: 0,
								width: 320,
								height: 480
							},
							{
								translate: {
									x: 192,
									y: 0
								},
								type: 'exit',
								x: 3136,
								y: 0,
								width: 64,
								height: 480
							}
						],
						assets: []
					};

					areas.push(area);


				}
				map['areas'] = areas;
				map['properties'] = properties;
				let json = JSON.stringify(map);
				json = JSON.parse(json);
				resolve(json);




			} catch (error) {
				reject(error);
			}

		});

		promise.then(
			function (resolve) {

				message.channel.send(embed.generateEmbed({
					name: message.author.tag,
					icon: message.author.avatarURL,
					type: 'success',
					title: 'Succesfuly created new map!',
					description: `Info:\nMap name: ${resolve.name}\nAreas count: ${resolve.areas.length}\nBG color: ${String(resolve.properties.background_color)}\nSeed: ${thing}`,
					fields: [],
					picture: ''
				}));



				message.channel.send(new Discord.Attachment(Buffer.from(YAML.stringify(resolve), 'utf8'), resolve.name + '.yaml'));
			}, function reject(error) {
				message.reply('Something went wrong while making a map...');
				console.error(error);
			});
	}
};
