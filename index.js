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
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.slice(prefix.length).split(' ');
    let commandName = args.shift();

    let command = commands.get(commandName) || commands.get(commandsAliases.get(commandName));
    if (!command) return;

    if (cooldowns[message.author.id] && cooldowns[message.author.id] > Date.now()) {
        message.channel.send(embed.generateEmbed({
            name: message.author.tag,
            icon: message.author.avatarURL,
            type: 'default',
            title: 'You are under cooldown, wait for a bit...',
            description: 'Why? To prevent API commands abuse',
            fields: [],
            picture: ''
        })
        );
        return;
    }

    if (command.ownerOnly && message.author.id != '369217982594940931') return;
    if (command.guildOnly && !message.guild) return;
    if (command.dmOnly && message.guild) return message.channel.send('You can\'t use this command outside of DMs!');

    try {
        message.channel.startTyping();
        command.execute(message, args, client, Discord);
        setTimeout(() => {
            message.channel.stopTyping();
        }, 500);
    } catch (error) {
        console.error(error);
        return;
    }

    let seconds = command.cooldown * 1000;

    cooldowns[message.author.id] = Date.now() + seconds;



});




client.on('ready', () => {
    console.log('Ready!');
    client.user.setActivity('e!help', { type: 'LISTENING' });
});

client.login(String(process.env.token));
