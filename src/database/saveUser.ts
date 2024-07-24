import {db} from './init';

// Save user data
export const saveUser = async (id: string, displayName: string) => {
    const database = await db;
    await database.run('INSERT OR REPLACE INTO users (id, displayName) VALUES (?, ?)', [
        id,
        displayName,
    ]);
};
