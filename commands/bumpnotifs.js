const config = require("../config.json");

const Discord = require("discord.js");

module.exports.run = async(client, message, args, prefix) => {

	let embed = new Discord.MessageEmbed()
		.setTitle(`Code Cave | Bump Notifications`)
		.setThumbnail(config.embedThumb)
		.setColor(config.embedColor)

	// check if user has role
	// IF user doesn't have role
	//     add role to user
	//     send message saying they have been given the role and they can run cmd again to opt out
	// ELSE IF user has role
	//     remove role from user
	//     send message saying they no longer have the role and they can run cmd again to opt in

	if (message.member.roles.cache.has(config.bumpNotifRole)) {
		// has role
		embed.setDescription(`😴 You will no longer be notified when the server is ready to be bumped.\n\nYou can re-opt in at any time by just running this command again!`);
		message.member.roles.remove(config.bumpNotifRole);
		message.reply({ embeds: [embed] });
	} else {
		// lacks role
		embed.setDescription(`🏓 You will now be notified when the server is ready to be bumped!`);
		message.member.roles.add(config.bumpNotifRole);
		message.reply({ embeds: [embed] });
	}

}

module.exports.help = {
  name: `bumpnotifs`,
	aliases: [`bn`, `bumpn`, `notifs`, `bp`, `bumppings`, `bumpp`]
}
