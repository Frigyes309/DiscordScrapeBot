import {open} from 'sqlite';
import sqlite3 from 'sqlite3';

// Open and initialize the database
export const db = open({
    filename: '/data/messages.db',
    driver: sqlite3.Database,
});

export const initDatabase = async () => {
    const database = await db;

    await database.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id TEXT PRIMARY KEY,
            authorId TEXT,
            content TEXT,
            date INTEGER,
            channelId TEXT,
            replyTo TEXT
        );
        
        CREATE TABLE IF NOT EXISTS reactions (
            userId TEXT,
            messageId TEXT,
            emoji TEXT,
            PRIMARY KEY (userId, messageId, emoji)
        );
        
        CREATE TABLE IF NOT EXISTS channels (
            id TEXT PRIMARY KEY,
            name TEXT,
            type TEXT,
            parent TEXT
        );

        CREATE TABLE IF NOT EXISTS threads (
            id TEXT PRIMARY KEY,
            name TEXT,
            type TEXT,
            parent TEXT
        );
        
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            displayName TEXT
        );
        
        CREATE TABLE IF NOT EXISTS ignored (
            id TEXT PRIMARY KEY,
            type TEXT -- 'channel' or 'thread'
        );
    `);
};
