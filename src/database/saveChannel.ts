import {db} from './init';

// Save channel data
export const saveChannel = async (
    id: string,
    name: string,
    type: string,
    parent: string | null,
) => {
    const database = await db;
    await database.run(
        'INSERT OR REPLACE INTO channels (id, name, type, parent) VALUES (?, ?, ?, ?)',
        [id, name, type, parent],
    );
};
