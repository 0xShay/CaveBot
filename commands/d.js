const config = require("../config.json");

const Discord = require("discord.js");
const fetch = require(`node-fetch`);
const fs = require("fs");

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

function monthString() {
	let timeNow = new Date();
	let monthNum = timeNow.getMonth() + 1;
	if (monthNum < 10) monthNum = `0${monthNum}`;
	let yearNum = timeNow.getFullYear();
	return `${monthNum}.${yearNum}`;
};

module.exports.run = async(client, message, args, prefix) => {

	if (!args[1] || args[1] != `bump`) return;

	const filter = response => {
		return (response.author.id == config.disboardUserID) && (response.embeds[0].description.includes(`:thumbsup:`));
	}

	message.channel.awaitMessages({
		filter,
		max: 1,
		time: 30000,
		errors: [`time`]
	}).then(collected => {

			let bumps = {};

			if (fs.existsSync(`./bumpData/${monthString()}.json`)) {
				bumps = JSON.parse(fs.readFileSync(`./bumpData/${monthString()}.json`, "utf8"));
			}

			if (bumps[message.author.id]) {

				bumps[message.author.id] += 1;

			} else {

				bumps[message.author.id] = 1;

			}
			
			fs.writeFile(`./bumpData/${monthString()}.json`, JSON.stringify(bumps), (err) => {
				if (err) console.log(err);
			});

		setTimeout(() => {
			message.channel.send(`<@&${config.bumpNotifRole}>, the server is ready to be bumped again!`);
		}, 7201000) // 2hrs and 1sec
	}).catch(err => {
		console.log(err);
	});

}

module.exports.help = {
  name: `d`,
	aliases: []
}
