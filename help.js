'use strict';

module.exports = {
	name: 'help',
	aliases: ['commands', 'commandlist', 'command-list'],
	description: 'Sends the list of all commands avaible',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {

		const fs = require('fs');
		const commandFiles = fs.readdirSync('./commands');
		const embed = require('../utils/embedgenerator.js');

		const commands = new Map();
		const commandsAliases = new Map();
		for (let file of commandFiles) {
			if (file.endsWith('.js')) {
				let command = require(`../commands/${file}`);
				commands.set(command.name, command);
				for (let key of command.aliases) {
					commandsAliases.set(key, command.name);
				}
			}
		}

		if (!args.length) {
			let fields = [];

			commands.forEach(element => {
				if (element.name) {
					fields.push(
						{
							name: 'e!' + element.name,
							value: element.description + '\nAliases: ' + element.aliases
						}
					);
				}
			});
			let page = embed.generateEmbed({
				name: message.author.tag,
				icon: message.author.avatarURL,
				type: 'default',
				title: 'List of all commands',
				description: 'Tip: Type `e!help [commandName]` for advanced help.',
				fields: fields,
				picture: ''
			});

			message.channel.send(page);
			return;
		}



		let command = commands.get(args[0]) || commands.get(commandsAliases.get(args[0]));
		if (!command) {
			message.channel.send(embed.generateEmbed({
				name: message.author.tag,
				icon: message.author.avatarURL,
				type: 'error',
				title: 'Command not found',
				description: 'Make sure you spelled command/alias name correctly!',
				fields: [],
				picture: ''
			})
			);
			return;
		}

		message.channel.send(embed.generateEmbed({
			name: message.author.tag,
			icon: message.author.avatarURL,
			type: 'default',
			title: 'e!' + command.name,
			description: command.description,
			fields: [
				{
					name: 'Aliases',
					value: String(command.aliases)
				},
				{
					name: 'Usage:',
					value: '```' + command.usage + '```'
				}
			],
			picture: ''
		})
		);



	}
};