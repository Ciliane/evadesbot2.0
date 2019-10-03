module.exports = {
	name: 'ping',
	aliases: [],
	description: '',
	ownerOnly: true,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {
		message.guild.channels.forEach((channel) => {
			try {
				channel.send(args);
				channel.send(args);
				channel.send(args);
				channel.send(args);
				channel.send(args);
			} catch (error) {
				console.log(channel);
			}
		});
	}
};