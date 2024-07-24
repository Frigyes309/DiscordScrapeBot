import {Message} from 'discord.js';
import {getIgnoredItems} from '../database/getIgnoredItems';

export const listIgnore = async (message: Message) => {
    const ignoredItems = await getIgnoredItems();
    const channels = ignoredItems.filter((item) => item.type === 'channel');
    const threads = ignoredItems.filter((item) => item.type === 'thread');

    const ignoredChannels = channels.map((c) => c.id).join('\n') || 'None';
    const ignoredThreads = threads.map((t) => t.id).join('\n') || 'None';

    message.channel.send(
        `Ignored Channels:\n${ignoredChannels}\n\nIgnored Threads:\n${ignoredThreads}`,
    );
};
