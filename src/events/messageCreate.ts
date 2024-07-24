import {Message, PartialMessage, TextChannel, ThreadChannel} from 'discord.js';
import {getIgnoredItems} from '../database/getIgnoredItems';
import {ignoreItem} from '../database/ignoreItem';
import {saveMessage} from '../database/saveMessage';
import {saveUser} from '../database/saveUser';
import {unignoreItem} from '../database/unignoreItem';
import {isIgnored} from '../utils/isIgnored';
import {logger} from '../utils/logger';

export const messageCreate = async (message: Message | PartialMessage) => {
    if (message.partial) {
        try {
            await message.fetch();
        } catch (error) {
            logger.error('Error fetching partial message:', error);
            return;
        }
    }

    if (!message.guild) return; // Ignore DMs

    if (!(await isIgnored(message.channel.id, 'channel'))) {
        try {
            await saveUser(message.author!!.id, message.author!!.username);
            logger.info(
                `Saving message from ${message.author!!.tag} in channel ${message.channel.id}: ${
                    message.content
                }`,
            );
            await saveMessage(
                message.id,
                message.author!!.id,
                message.content!!,
                message.createdTimestamp.toString(),
                message.channel.id,
                message.reference?.messageId || null,
            );
        } catch (error) {
            logger.error('Error saving message:', error);
        }
    }

    // Command handling
    if (message.content!!.startsWith('/ignore')) {
        const mentionedChannel = message.mentions.channels.first() as
            | (TextChannel | ThreadChannel)
            | undefined;
        const targetChannel = mentionedChannel || message.channel;

        if (await isIgnored(targetChannel.id, targetChannel.isThread() ? 'thread' : 'channel')) {
            message.channel.send(
                `This ${
                    targetChannel.isThread() ? 'thread' : 'channel'
                } is already ignored. Are you sure you want to use this command this way?`,
            );
        } else {
            await ignoreItem(targetChannel.id, targetChannel.isThread() ? 'thread' : 'channel');
            if (targetChannel instanceof TextChannel) {
                message.channel.send(`Ignored ${targetChannel.name}`);
            }
        }
    } else if (message.content!!.startsWith('/unignore')) {
        const mentionedChannel = message.mentions.channels.first() as
            | (TextChannel | ThreadChannel)
            | undefined;
        const targetChannel = mentionedChannel || message.channel;

        if (!(await isIgnored(targetChannel.id, targetChannel.isThread() ? 'thread' : 'channel'))) {
            message.channel.send(
                `This ${
                    targetChannel.isThread() ? 'thread' : 'channel'
                } is not ignored, so it cannot be unignored. Are you sure you wanted to use this command this way?`,
            );
        } else {
            await unignoreItem(targetChannel.id);
            if (targetChannel instanceof TextChannel) {
                message.channel.send(`Unignored ${targetChannel.name}`);
            }
        }
    } else if (message.content!!.startsWith('/list')) {
        const ignoredItems = await getIgnoredItems();
        const channels = ignoredItems.filter((item) => item.type === 'channel');
        const threads = ignoredItems.filter((item) => item.type === 'thread');

        const ignoredChannels = channels.map((c) => `<#${c.id}>`).join('\n') || 'None';
        const ignoredThreads = threads.map((t) => `<#${t.id}>`).join('\n') || 'None';

        message.channel.send(
            `Ignored Channels:\n${ignoredChannels}\n\nIgnored Threads:\n${ignoredThreads}`,
        );
    } else if (message.content === '/ping') {
        message.channel.send(
            `Hello! I'm here! I'm alive! I'm watching you! I'm watching everything!`,
        );
    } else if (message.content!! === '/help') {
        message.channel.send(
            `Available commands:
            
/help: Lists all the available commands.

/ping: Pings the bot.

/ignore [optional: #channel-name]: Ignores the channel from tracking (can be used on multiple channels and threads). If no argument is provided, the current channel is ignored.

/unignore [optional: #channel-name]: Unignores the channel from tracking (can be used on multiple channels and threads). If no argument is provided, the current channel is unignored. By default all channels are tracked.

/list: Lists all the ignored channels and threads.`,
        );
    }
};
