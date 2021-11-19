const config = require("../config.json");

const Discord = require("discord.js");

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

module.exports.run = async(client, message, args, prefix) => {

	const helpEmbed = new Discord.MessageEmbed()
		.setTitle(`Code Cave | Help`)
		.setThumbnail(config.embedThumb)
		.setColor(config.embedColor)
		.setDescription(`Code Cave is a Discord server designed to help new developers with problems in their code, and help those helping out learn more whilst helping others!`)
		.addField(`${prefix}help`, `Shows this help embed`)
		.addField(`${prefix}info`, `Shows information about Code Cave`)
		.addField(`${prefix}rules`, `Shows the server rules`)
		.addField(`${prefix}bumptop`, `Shows the top 10 Disboard bumpers of the month`)
		.addField(`${prefix}bumpnotifs`, `Toggles you being pinged when the server is ready to be bumped`)
		.addField(`${prefix}discordjs [topic]`, `Returns Discord.js help on [topic]`)

	message.channel.send({ embeds: [helpEmbed] });

}

module.exports.help = {
  name: `help`,
	aliases: [`?`]
}
