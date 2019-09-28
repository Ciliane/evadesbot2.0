const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	storage: 'database.sqlite'
});

const things = sequelize.definde('things', {
	name: {
		type: Sequelize.STRINGS,
		unique: true
	},
	value: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

things.sync();
module.exports = {
	name: 'db',
	aliases: [],
	description: '',
	ownerOnly: true,
	guildOnly: false,
	DMOnly: false,
	cooldown: 0,

	async execute(message, args, client) {
		if (args[0] == 'create') {
			let thing = await things.create({
				name: args[1],
				value: args[2]
			});
			//ok

			message.channel.send('I hope i added ' + args[1] + ' with ' + args[2] + ' value');
		}
		if (args[0] == 'get') {
			let thing = await things.findOne({where: args[1]});

			if (!thing) {
				return message.reply('couldnt find this thing, wtf speak names correctly');
			}

			message.channel.send(`Name: ${tag.get('name')}\nValue: ${tag.get('value')}`);
		}
	}
};
