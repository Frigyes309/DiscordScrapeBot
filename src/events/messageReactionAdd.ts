import {MessageReaction, PartialMessageReaction, PartialUser, User} from 'discord.js';
import {saveReaction} from '../database/saveReaction';
import {isIgnored} from '../utils/isIgnored';
import {logger} from '../utils/logger';

// Handle message reactions
export const messageReactionAdd = async (
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
) => {
    if (user.bot) return; // Ignore bot reactions

    // Fetch full reaction and user objects if they are partial
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            logger.error('Error fetching reaction:', error);
            return;
        }
    }

    if (user.partial) {
        try {
            await user.fetch();
        } catch (error) {
            logger.error('Error fetching user:', error);
            return;
        }
    }

    try {
        const messageChannelId = reaction.message.channel.id;
        if (!(await isIgnored(messageChannelId, 'channel'))) {
            logger.info(
                `Reaction added by ${user.tag}: ${reaction.emoji.toString()} on message ${
                    reaction.message.id
                }`,
            );
            await saveReaction(user.id, reaction.message.id, reaction.emoji.toString());
        }
    } catch (error) {
        logger.error('Error saving reaction:', error);
    }
};
