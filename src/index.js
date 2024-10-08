const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN

const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');

const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildBans
	]
});

client.login(token);