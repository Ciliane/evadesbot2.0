'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const embed = require('./utils/embedgenerator.js');

const prefix = 'e!';

let commandFiles = fs.readdirSync('./commands/');
let commands = new Map();
let commandsAliases = new Map();
let commandCooldowns = new Map();

let thing = 1;
for (let file of commandFiles) {
	let command = require('./commands/' + file);
	commands.set(command.name, command);
	for (let key of command.aliases) {
		commandsAliases.set(key, command.name);
	}
	console.log(`${command.name} loaded! (${thing}/${commandFiles.length})`);
	thing += 1;
}

let cooldowns = {};
client.on('message', message => {
	if (message.content.startsWith('<@622188092782018600>')) {
		message.reply(
			'Prefix is `e!`\nSay e!help for list of all avaible commands'
		);
		return;
	}

	if (
		!message.content.startsWith(prefix) ||
		(message.author.bot && message.author.id != client.user.id)
	)
		return;

	let args = message.content.slice(prefix.length).split(' ');
	let commandName = args.shift();

	let command = commands.get(commandName) || commands.get(commandsAliases.get(commandName));
	if (!command) return;

	if (command.ownerOnly && message.author.id != '369217982594940931') return;
	if (command.guildOnly && !message.guild) return;
	if (command.dmOnly && message.guild) return message.channel.send('You can\'t use this command outside of DMs!');

	try {
		message.channel.startTyping();
		command.execute(message, args, client, Discord);
		setTimeout(() => {
			message.channel.stopTyping();
		}, 1000);
	} catch (error) {
		message.reply('Something went wrong for executing a command!');
		message.channel.stopTyping();
		console.error(error);
		return;
	}
});

client.on('ready', () => {
	console.log('Ready!');
	client.user.setStatus('dnd', 'Ping for prefix', {type: 'LISTENING'});
	client.user.setActivity('Ping for prefix', {type: 'LISTENING'});
});



client.login(String(process.env.TOKEN));
