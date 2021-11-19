const config = require("../config.json");

const Discord = require("discord.js");

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

const rules = [
	`Do not ask us for help with illegal or unethical hacking. Follow Discord ToS. You can find them at https://discord.com/tos`,
	`Don't ask to ask. https://dontasktoask.com/\n~~Is anyone here to help me?~~ **=>** Code: *x*, error: *y*, end goal: *z*, any ideas why it doesn't work?`,
	`Please only use English in the text channels here, or you will be muted temporarily. Remember, you can always use a translator if your English isn't fluent.`,
	`Spamming chat with a problem is not allowed.`,
	`Try to keep messages PG-friendly - we love aspiring, young developers!`,
	`Racially degrading, controversial and strong political views are not to be expressed here. Keep things relevant.`,
	`Use the relevant channels for support.`,
	`Ensure that you paste large amounts of code into a web tool such as https://sourceb.in/ for ease of use.`,
	`Do not DM people for support. Ask them here, and do not repeatedly @ them.`,
	`Do not ping staff unless they are actively helping you with a problem or there is an incident on the server that requires staff attention.`,
	`DMs that involve advertisments/scams without the user's consent will result in an immediate ban.`,
	`Please be respectful to all users. **Those providing support, please respect new developers. Everyone starts somewhere. Those receiving support, please respect those helping out. They are taking time out of their day to help you.**`
];

let rulesString = "";

i = 0;

rules.forEach(r => {
	i++;
	rulesString += `${i}) ${r}\n\n`;
});

rulesString = rulesString.slice(0, -2);

module.exports.run = async(client, message, args, prefix) => {

	const helpEmbed = new Discord.MessageEmbed()
		.setTitle(`Code Cave | Rules`)
		.setThumbnail(config.embedThumb)
		.setColor(config.embedColor)
		.setDescription(rulesString)

	message.channel.send({ embeds: [helpEmbed] });

}

module.exports.help = {
  name: `rules`,
	aliases: []
}
