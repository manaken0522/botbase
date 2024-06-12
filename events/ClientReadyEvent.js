const discord = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')

module.exports = {
    async execute(client) {
        client.once(discord.Events.ClientReady, async (readyClient) => {
            console.log('ready');
        
            const commands = [];
            client.commands = new discord.Collection();
            console.log(__dirname);
            const foldersPath = path.join(__dirname, '../commands');
            const commandFolders = fs.readdirSync(foldersPath);
            for (const folder of commandFolders) {
                const commandsPath = path.join(foldersPath, folder);
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const filePath = path.join(commandsPath, file);
                    const command = require(filePath);
                    if ('data' in command && 'execute' in command) {
                        commands.push(command.data.toJSON());
                        client.commands.set(command.data.name, command);
                    }
                }
            }
            await client.rest.put(discord.Routes.applicationCommands(client.application.id), {body: commands});
        });
    }
}