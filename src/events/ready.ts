import {Client, TextChannel, ThreadChannel} from 'discord.js';
import {initDatabase} from '../database/init';
import {saveChannel} from '../database/saveChannel';
import {saveThread} from '../database/saveThread';
import {fetchAndSaveMessages} from '../utils/fetchAndSaveMessages';
import {isIgnored} from '../utils/isIgnored';
import {logger} from '../utils/logger';

// Handle ready event
export const ready = async (client: Client) => {
    logger.info(`Logged in as ${client.user?.tag}`);
    logger.info('Bot is ready and fetching past messages.');

    await initDatabase();
    const guilds = client.guilds.cache;

    for (const [guildId, guild] of guilds) {
        const channels = guild.channels.cache.filter(
            (channel) => channel.isTextBased() && !channel.isThread(),
        );

        for (const [channelId, channel] of channels) {
            if (channel instanceof TextChannel) {
                if (!(await isIgnored(channel.id, 'channel'))) {
                    logger.info(`Fetching messages from channel: ${channel.name}`);
                    await saveChannel(
                        channel.id,
                        channel.name,
                        channel.type.toString(),
                        channel.parentId,
                    );
                    await fetchAndSaveMessages(channel);
                }
            }
        }

        const threads = guild.channels.cache.filter((channel) => channel.isThread());

        for (const [threadId, thread] of threads) {
            if (thread instanceof ThreadChannel) {
                if (!(await isIgnored(thread.id, 'thread'))) {
                    logger.info(`Fetching messages from thread: ${thread.name}`);
                    await saveThread(
                        thread.id,
                        thread.name,
                        thread.type.toString(),
                        thread.parentId,
                    );
                    await fetchAndSaveMessages(thread);
                }
            }
        }
    }

    logger.info('Finished fetching past messages.');
};
