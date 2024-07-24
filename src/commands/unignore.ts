import {Message, TextChannel} from 'discord.js';
import {unignoreItem} from '../database/unignoreItem';

export const unignore = async (message: Message) => {
    const channel = message.mentions.channels.first();
    if (channel) {
        await unignoreItem(channel.id);
        if (channel instanceof TextChannel) {
            message.channel.send(`Unignored ${channel.name}`);
        }
    } else {
        message.channel.send('Please mention a valid channel or thread to unignore.');
    }
};
