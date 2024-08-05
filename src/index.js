const dotenv = require('dotenv');
dotenv.config();
 
const token = process.env.TOKEN;

const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');

const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages]
});

console.log('Everything is perfeeect!')
client.login('MTI1MDM0ODQwMDA2NzYwODYwNg.GFQCxN.xqbf9hPFwquG9JLyOyqMe_7v240eHXz2FPjPMw');
