import {db} from './init';

// Get all ignored items
export const getIgnoredItems = async () => {
    const database = await db;
    return await database.all('SELECT * FROM ignored');
};
