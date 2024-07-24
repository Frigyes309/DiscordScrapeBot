import {db} from './init';

// Save ignored item data
export const ignoreItem = async (id: string, type: 'channel' | 'thread') => {
    const database = await db;
    await database.run('INSERT OR REPLACE INTO ignored (id, type) VALUES (?, ?)', [id, type]);
};
