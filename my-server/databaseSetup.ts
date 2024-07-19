// This file handles the direct interaction with the SQLite database, including creating tables and adding entries. It operates on the server-side.

import sqlite3 from 'sqlite3';
import path from 'path';

// Resolve the database path
const dbPath = path.resolve(__dirname, 'skiltSHK.db');
console.log("Database path: ", dbPath);

export const initializeDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
                reject(err);
            } else {
                console.log('Connected to the SQLite database.');
                createTables(db, resolve, reject);
            }
        });
    });
};

// Create the database table if it does not exist
const createTables = (db: sqlite3.Database, resolve: () => void, reject: (err: any) => void) => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Chapters (
            ChapterId INTEGER PRIMARY KEY AUTOINCREMENT,
            ChapterName TEXT NOT NULL,
            ChapterIntro TEXT,
            Year INTEGER
        );
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
            reject(err); // Reject the promise if there's an error
        } else {
            console.log('Table Chapters created successfully.');
            db.run(`
                CREATE TABLE IF NOT EXISTS Subchapters (
                    SubchapterId INTEGER PRIMARY KEY AUTOINCREMENT,
                    ChapterId INTEGER,
                    SubchapterName TEXT,
                    SubchapterContent TEXT,
                    FOREIGN KEY(ChapterId) REFERENCES Chapters(ChapterId)
                );
            `, (err) => {
                if (err) {
                    console.error('Error creating Subchapters table:', err.message);
                    reject(err);
                } else {
                    console.log('Table Subchapters created successfully.');
                    resolve();
                }
            });
        }
    });
};

// Fetch chapters by year
export const fetchChaptersByYear = (year: number): Promise<any[]> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Chapters WHERE Year = ?', [year], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch chapters:', err);
                reject(err);
            } else {
                console.log(`Fetched Chapters Data for year ${year}:`, rows);
                resolve(rows);
            }
        });
    });
};

// Fetch subchapter content by chapter id
export const fetchSubchaptersByChapterId = (chapterId: number): Promise<any[]> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Subchapters WHERE ChapterId = ?', [chapterId], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch subchapters:', err);
                reject(err);
            } else {
                console.log(`Fetched Subchapters Data for chapterId ${chapterId}:`, rows);
                resolve(rows);
            }
        });
    });
};

// Add a new chapter to the database
export const addChapter = (chapterName: string, chapterIntro: string, year: number): Promise<void> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO Chapters (ChapterName, ChapterIntro, Year) VALUES (?, ?, ?)
        `, [chapterName, chapterIntro, year], (err: Error | null) => {
            db.close();
            if (err) {
                console.error('Error adding chapter:', err.message);
                reject(err);
            } else {
                console.log('Chapter added successfully.');
                resolve();
            }
        });
    });
};

