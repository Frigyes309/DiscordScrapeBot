import {Channel, TextChannel, ThreadChannel} from 'discord.js';
import {saveChannel} from '../database/saveChannel';
import {saveThread} from '../database/saveThread';
import {logger} from '../utils/logger';

// Handle channel creation
export const channelCreate = async (channel: Channel) => {
    if (channel.isTextBased() && !channel.isThread()) {
        if (channel instanceof TextChannel) {
            try {
                await saveChannel(
                    channel.id,
                    channel.name,
                    channel.type.toString(),
                    channel.parentId,
                );
                logger.info(`Channel ${channel.name} saved to database.`);
            } catch (error) {
                logger.error('Error saving channel:', error);
            }
        }
    } else if (channel.isThread()) {
        if (channel instanceof ThreadChannel) {
            try {
                await saveThread(
                    channel.id,
                    channel.name,
                    channel.type.toString(),
                    channel.parentId,
                );
                logger.info(`Thread ${channel.name} saved to database.`);
            } catch (error) {
                logger.error('Error saving thread:', error);
            }
        }
    }
};
