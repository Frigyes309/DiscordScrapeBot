import {Collection, TextChannel, ThreadChannel} from 'discord.js';
import {saveMessage} from '../database/saveMessage';
import {saveReaction} from '../database/saveReaction';
import {logger} from './logger';

// Fetch and save all messages in a channel or thread
export const fetchAndSaveMessages = async (channel: TextChannel | ThreadChannel) => {
    let lastMessageId: string | undefined;
    while (true) {
        const options: any = {limit: 100};
        if (lastMessageId) {
            options.before = lastMessageId;
        }

        const messages = await channel.messages.fetch(options);

        if (!(messages instanceof Collection)) {
            logger.error('Fetched messages are not in expected Collection format');
            break;
        }

        if (messages.size === 0) {
            break;
        }

        for (const message of messages.values()) {
            const replyTo = message.reference?.messageId || null;
            try {
                await saveMessage(
                    message.id,
                    message.author.id,
                    message.content,
                    message.createdTimestamp.toString(),
                    message.channel.id,
                    replyTo,
                );

                // Save reactions
                const reactions = message.reactions.cache;
                for (const [, reaction] of reactions) {
                    for (const user of reaction.users.cache.values()) {
                        await saveReaction(user.id, message.id, reaction.emoji.toString());
                    }
                }
            } catch (error) {
                logger.error('Error saving message:', error);
            }
        }

        lastMessageId = messages.lastKey();
        if (!lastMessageId) {
            break;
        }
    }
};
