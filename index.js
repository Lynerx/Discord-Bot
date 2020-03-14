const Discord = require('discord.js');
const bot = new Discord.Client(); // Create the bot
const ms = require('ms');

// Token
const token = '';

// Commands start with '!'
const PREFIX = '!';

bot.on('ready', () => {
	console.log('Bot Actived!');
});

bot.on('message', (message) => {
	let args = message.content.substring(PREFIX.length).split(' ');

	switch (args[0]) {
		case 'yoo':
			message.reply('Sup ma friend ?!'); // reply to a especific user
			break;

		case 'github':
			message.channel.send('https://github.com/Lynerx');
			break;

		case 'info': //  NOT COMPLETEEEEEEEEEEEEEEEEEEEE
			if (args[1] === 'commands') message.channel.send('!yoo \n !github - Lyner Github');
			else {
				message.channel.send('Command does not exit! Type: !info commands');
			}
			break;

		case 'clear':
			if (!args[1]) return message.reply('ERROR: please define the 2nd argument!');
			message.channel.bulkDelete(args[1]);
			break;

		case 'mute':
			let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
			if (!person) return message.reply('User member not found !');

			let mainRole = message.guild.roles.cache.find((role) => role.name === 'Alpha');
			let muteRole = message.guild.roles.cache.find((role) => role.name === 'Mute');

			if (!muteRole) return message.reply("Couldn't find the Mute role");

			let time = args[2];
			if (!time) {
				return message.reply('You didnt specify a time!!');
			}
			person.roles.add(mainRole.id);
			person.roles.remove(muteRole.id);

			message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`);

			setTimeout(function() {
				person.roles.add(mainRole.id);
				person.roles.remove(muteRole.id);
				message.channel.send(`@${person.user.tag} has been unmuted !`);
			}, ms(time));
			break;
	}
});
bot.login(token);
