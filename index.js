const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;

const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');

const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
});

console.log('Everything is perfeeect!')
client.login(token);