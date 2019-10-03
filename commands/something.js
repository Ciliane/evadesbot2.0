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
			let bool = false;

			guild.channels.forEach((channel) => {
				channel = client.channels.get(channel.id);
				if (!bool) {
					channel.createInvite()
						.then(invite => invites.push(channel.name + ' | ' + 'https://discord.gg/' + invite.code));



					bool = true;
				}
			});


		});



		message.author.send(String(invites.join('\n')));
	}
};