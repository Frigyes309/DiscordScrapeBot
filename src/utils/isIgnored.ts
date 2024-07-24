import {getIgnoredItems} from '../database/getIgnoredItems';

// Check if a channel or thread is ignored
export const isIgnored = async (id: string, type: 'channel' | 'thread'): Promise<boolean> => {
    const ignoredItems = await getIgnoredItems();
    return ignoredItems.some((item) => item.id === id && item.type === type);
};
