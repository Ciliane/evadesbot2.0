const worlds = [
	'Central CoRe',
	'Central Core Hard',
	'Vicious Valley',
	'Vicious Valley Hard',
	'Glacial Gorge',
	'Restless Ridge',
	'Humongous Hollow',
	'Haunted Halls',
	'Ominous Occult',
	'Dangerous District',
	'Elite Expanse',
	'Quiet Quarry',
	'Peculiar Pyramid',
	'Wacky Wonderland'
];
const heroes = [
	'Magmax',
	'Rime',
	'Morfe',
	'Aurora',
	'Necro',
	'Brute',
	'Nexus',
	'Shade',
	'Euclid',
	'Chrono',
	'Reaper',
	'Rameses',
	'Jolt',
	'Ghoul',
	'Cent',
	'Jotunn',
	'Candy',
	'Mirage'
];

const challengedPlayers = [];


const embed = require('../utils/embedgenerator.js');
module.exports = {
	name: 'challenge',
	aliases: ['ch', 'randomchallenge'],
	description: 'Generates random challenge for you, world to beat and hero to choose.',
	usage: 'e!challenge',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {
		let hero = heroes[Math.floor(Math.random() * heroes.length)];
		let world = worlds[Math.floor(Math.random() * worlds.length)];


		for (let i = 0; i < challengedPlayers.length; i++) {
			const player = challengedPlayers[i];
			if (player.id == message.author.id) {
				if (player.timestamp > Date.now()) {
					message.channel.send(player.embed);
					return;
				} else {
					challengedPlayers.splice(challengedPlayers.indexOf(player), 1);
					break;
				}
			}
		}
		let embedy = embed.generateEmbed({
			name: message.author.tag,
			icon: message.author.avatarURL,
			type: 'default',
			title: 'Your challenge...',
			description: `Beat ${world} playing as ${hero}!\nIf you dont have this hero: Choose any other`,
			fields: [],
			picture: ''
		});


		challengedPlayers.push({ id: message.author.id, challenge: embedy, timestamp: Date.now() + 3600000 });
	}
};