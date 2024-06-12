const discord = require('discord.js');

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong'),
    async execute(interaction) {
        await interaction.reply(`pong! ${interaction.client.ws.ping}ms`);
    }
}