import {db} from './init';

// Save reaction data
export const saveReaction = async (userId: string, messageId: string, emoji: string) => {
    const database = await db;
    await database.run(
        'INSERT OR REPLACE INTO reactions (userId, messageId, emoji) VALUES (?, ?, ?)',
        [userId, messageId, emoji],
    );
};
