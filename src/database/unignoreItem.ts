import {db} from './init';

// Remove ignored item
export const unignoreItem = async (id: string) => {
    const database = await db;
    await database.run('DELETE FROM ignored WHERE id = ?', [id]);
};
