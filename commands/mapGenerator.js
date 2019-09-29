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
			'Announcement',
			'ascent'
		]
	},
	b: {
		primary: [
			'backside',
			'bad',
			'balanced',
			'ballistic',
			'boring',
			'bashing',
			'basic',
			'bloody'
		],
		secondary: [
			'badlands',
			'bacon',
			'battlefield',
			'brute',
			'blaze',
			'bucket',
			'bots'
		]
	},
	c: {
		primary: [
			'call',
			'calm',
			'capable',
			'central',
			'careful',
			'careless',
			'celestial',
			'charming'
		],
		secondary: [
			'Cage',
			'case',
			'caution',
			'chance',
			'charm',
			'cloud'
		]
	},
	d: {
		primary: [
			'digital',
			'dangerous',
			'deadly',
			'dark',
			'dirty',
			'distracting',
			'demotivating',
			'dramatic'
		],
		secondary: [
			'desert',
			'dimension',
			'descent',
			'darkness',
			'distort',
			'division',
			'deactivation',
			'destriction',
			'dive',
			'deception',
			''
		]
	},
	e: {
		primary: [
			'elite',
			'entering',
			'eternal',
			''
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
		let thing = String(args.join(' ')) || String(Math.round(seed() * 999999));
		seed = seedrandom(thing);
		let worldSizes = [40, 80, 120];
		let areasTotal = worldSizes[Math.floor(seed() * worldSizes.length)];
		let promise = new Promise(function(resolve, reject) {
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
				if (seed() * 100 >= 80) {
					properties.friction = 0.50;
				}


				let areas = [];


				let enemies = [
					[
						'snowman',
						'repelling',
						'sizing',
						'normal',
						'switch',
						'dasher',
						'slowing',
					],
					[
						'teleporting',
						'icicle',
						'disabling',
						'regen_sniper',
						'speed_sniper',
						'liquid',
						'ice_sniper',
						'homing',
						'draining',
						'immune',
						'oscillating',
						'wavy',
						'gravity',
					],
					[
						'zoning',
						'spiral',
						'zigzag',
						'slippery',
						'sniper',
						'radiating_bullets',
						'freezing',
						'turning',
					]
				]


				let bossArea = 10;

				for (let i = 0, x = 0; i < areasTotal; i++ , x += 3200) {
					let number = 1;
					if (i == 0) {
						number += 2;
					}
					let spawner = [];

					let enemiesToAdd = [];

					let typesCount = 0;
					if (i <= 10) {
						typesCount = 0;
					} if (i <= 20) {
						typesCount = 1;
					} if (i <= 30) {
						typesCount = Math.round(seed() * (2 - 1) + 1);
					} if (i <= 40) {
						typesCount = Math.round(seed() * (3 - 2) + 2);
					}


					if (i <= 50) {
						typesCount = 0;
					} if (i <= 60) {
						typesCount = 1;
					} if (i <= 70) {
						typesCount = Math.round(seed() * (3 - 2) + 2);
					} if (i <= 80) {
						typesCount = Math.round(seed() * (4 - 2) + 2);
					}



					if (i <= 90) {
						typesCount = 0;
					} if (i <= 100) {
						typesCount = 1;
					} if (i <= 110) {
						typesCount = Math.round(seed() * (3 - 2) + 2);
					} if (i <= 120) {
						typesCount = Math.round(seed() * (4 - 3) + 3);
					}


					for (let j = 0; j < typesCount; j++) {
						if (j == 0) {
							let arr = enemies[0];
							enemiesToAdd.push(arr[Math.floor(seed() * arr.length)]);
						} if (j == 1) {
							let arr = enemies[Math.round(seed() * 1)];
							enemiesToAdd.push(arr[Math.floor(seed() * arr.length)]);
						} if (j == 2) {
							let arr = enemies[1];
							enemiesToAdd.push(arr[Math.floor(seed() * arr.length)]);
						} if (j >= 3) {
							let arr = enemies[2];
							enemiesToAdd.push(arr[Math.floor(seed() * arr.length)]);
						}
					}



					if (i >= 3) {
						spawner.push({
							types: [
								'wall'
							],
							radius: Math.floor(seed() * 32 + 15),
							speed: Math.floor(seed() * (15 - 5) + 5),
							count: Math.floor(seed() * (20 - 15) + 15)
						});
					}
					for (let j = 0; j < enemiesToAdd.length; j++) {

						spawner.push({
							types: [
								enemiesToAdd[j]
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
			function(resolve) {

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