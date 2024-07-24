import {db} from './init';

// Save message data
export const saveMessage = async (
    id: string,
    authorId: string,
    content: string,
    date: string,
    channelId: string,
    replyTo: string | null,
) => {
    const database = await db;
    await database.run(
        'INSERT OR REPLACE INTO messages (id, authorId, content, date, channelId, replyTo) VALUES (?, ?, ?, ?, ?, ?)',
        [id, authorId, content, date, channelId, replyTo],
    );
};
