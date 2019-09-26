const fetch = require('node-fetch');
const embed = require('../utils/embedgenerator.js');

module.exports = {
	name: 'servers',
	aliases: ['rooms', 'playersonline'],
	description: 'Gets players online on EU and US servers of evades.io',
	usage: 'e!servers',
	ownerOnly: false,
	guildOnly: false,
	DMOnly: false,
	cooldown: 5,

	execute(message, args, client) {
		let promise = new Promise(function (resolve, reject) {
			fetch('https://evades.io/api/game/list', {
				method: 'GET',
			}).then(response => {
				resolve(response.json());
			});
		});

		promise.then(
			function (resolve) {
				console.log(resolve);
			}, function reject(error) {

			});
	}
};