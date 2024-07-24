import {Message, TextChannel} from 'discord.js';
import {ignoreItem} from '../database/ignoreItem';

export const ignore = async (message: Message) => {
    const channel = message.mentions.channels.first();
    if (channel) {
        await ignoreItem(channel.id, channel.isThread() ? 'thread' : 'channel');
        if (channel instanceof TextChannel) {
            message.channel.send(`Ignored ${channel.name}`);
        }
    } else {
        message.channel.send('Please mention a valid channel or thread to ignore.');
    }
};
