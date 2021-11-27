const config = require('./config.json');
const token = require('./token.json');

const Discord = require('discord.js');
const request = require('request');

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

const colors = require("colors");
const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

let logChannel;

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	};

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`)
		client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name)
		});
	});

});

client.login(token);

client.on(`ready`, () => {

	console.log(`${client.user.tag} is now active.`.green);
	logChannel = client.channels.cache.find(c => c.name.includes(`staff-logs`));

});

client.on(`messageCreate`, message => {
	
	if(message.author.bot && message.author.id !== config.disboardUserID) return;
	if(!message.guild) return message.channel.send(`${message.author}, you can only run bot commands in servers.`);
	if(message.guild.id !== config.guildID) return;
	
	// if (message.content.split(`\n`).length > 20) {
	// 	message.delete({timeout: 10});
	// 	message.channel.send(`${message.author}, please paste large amounts of text/code into https://sourceb.in/ to keep the channels clean.`);
	// };

	let prefix = config.prefix;

	let args = message.content.toLowerCase().slice(prefix.length).split(" ");

	if(message.content.toLowerCase().startsWith(prefix)) {

		const command = args[0];

		let timeNow = new Date().toLocaleTimeString();
		let timeNowString = ("[" + timeNow + "] ");

		let stringArgs = args.join(" ");

		if(message.guild) {
			console.log(timeNowString.cyan + command.yellow + " has been run by user " + message.author.tag.yellow + " in channel " + message.channel.name.yellow + " in server " + message.guild.name.yellow + ": " + stringArgs.brightMagenta);
		} else {
			console.log(timeNowString.cyan + command.yellow + " has been run by user " + message.author.tag.yellow + " privately: " + stringArgs.brightMagenta);
		};

		let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if(commandfile) commandfile.run(client, message, args, prefix);
		if(!commandfile) return;

	};

});

client.on(`guildMemberAdd`, async member => {

	if (Date.now() - member.user.createdAt < 1000*60*60*24*30) {
		
		const tooNewEmbed = new Discord.MessageEmbed()
			.setTitle(`Code Cave | Your user account is too new`)
			.setThumbnail(config.embedThumb)
			.setColor(config.embedColor)
			.setDescription(`Whoops! We only allow accounts that are over 30 days old in Code Cave due to a surge in recent bot activity.`)

		try {
			await member.user.send(tooNewEmbed);
		} catch(e) { console.log(e) };

		await member.kick();

	}

});