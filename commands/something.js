module.exports = {
	name: 'something',
	aliases: [],
	description: '',
	ownerOnly: true,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	execute(message, args, client) {
		let invites = [];

		client.guilds.forEach((guild) => {

			let channel = guild.channels.first();
			channel.createInvite()
				.then(invite => invites.push(channel.name + ' | ' + 'https://discord.gg/' + invite.code));



		});



		message.author.send(String(invites.join('\n')));
	}
};