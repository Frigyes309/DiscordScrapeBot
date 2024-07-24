import {db} from './init';

// Save thread data
export const saveThread = async (id: string, name: string, type: string, parent: string | null) => {
    const database = await db;
    await database.run(
        'INSERT OR REPLACE INTO threads (id, name, type, parent) VALUES (?, ?, ?, ?)',
        [id, name, type, parent],
    );
};
