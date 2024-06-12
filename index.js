const config = require('./config.json');
const discord = require('discord.js');

const client = new discord.Client({intents:[]});

client.login(config.token);