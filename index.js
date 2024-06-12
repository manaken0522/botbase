const config = require('./config.json');
const discord = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const intents = [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.GuildPresences];
const client = new discord.Client({intents:intents});
client.config = config;

const foldersPath = path.join(__dirname, 'events');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const filePath = path.join(foldersPath, folder);
    const event = require(filePath);
    if ('execute' in event) {
        event.execute(client);
    }
}

client.login(config.token);