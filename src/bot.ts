import {Client, GatewayIntentBits} from 'discord.js';
import * as dotenv from 'dotenv';
import {initDatabase} from './database/init';
import {channelCreate} from './events/channelCreate';
import {messageCreate} from './events/messageCreate';
import {messageReactionAdd} from './events/messageReactionAdd';
import {ready} from './events/ready';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once('ready', async () => await ready(client));
client.on('messageCreate', messageCreate);
client.on('messageReactionAdd', messageReactionAdd);
client.on('channelCreate', channelCreate);

(async () => {
    await initDatabase();
    console.log('Database initialized.');
    await client.login(process.env.DISCORD_TOKEN);
    console.log('Bot logged in.');
})();
