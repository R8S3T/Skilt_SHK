// This file handles the direct interaction with the SQLite database, including creating tables and adding entries. It operates on the server-side.

import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, 'skiltSHK.db');
console.log("Database path: ", dbPath);

// Initialize the database and create tables
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

// Create the database tables if they do not exist
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
            console.error('Error creating Chapters table:', err.message);
            reject(err);
        } else {
            console.log('Table Chapters created successfully.');
            db.run(`
                CREATE TABLE IF NOT EXISTS Subchapters (
                    SubchapterId INTEGER PRIMARY KEY AUTOINCREMENT,
                    ChapterId INTEGER,
                    SubchapterName TEXT,
                    FOREIGN KEY(ChapterId) REFERENCES Chapters(ChapterId) ON DELETE CASCADE ON UPDATE CASCADE
                );
            `, (err) => {
                if (err) {
                    console.error('Error creating Subchapters table:', err.message);
                    reject(err);
                } else {
                    console.log('Table Subchapters created successfully.');
                    db.run(`
                        CREATE TABLE IF NOT EXISTS SubchapterContent (
                            ContentId INTEGER PRIMARY KEY AUTOINCREMENT,
                            SubchapterId INTEGER,
                            ContentData TEXT,
                            SortOrder INTEGER,
                            FOREIGN KEY(SubchapterId) REFERENCES Subchapters(SubchapterId) ON DELETE CASCADE ON UPDATE CASCADE
                        );
                    `, (err) => {
                        if (err) {
                            console.error('Error creating SubchapterContent table:', err.message);
                            reject(err);
                        } else {
                            console.log('Table SubchapterContent created successfully.');
                            db.run(`
                                CREATE TABLE IF NOT EXISTS MathChapters (
                                    ChapterId INTEGER PRIMARY KEY AUTOINCREMENT,
                                    ChapterName TEXT NOT NULL,
                                    Description TEXT,
                                    SortOrder INTEGER
                                );
                            `, (err) => {
                                if (err) {
                                    console.error('Error creating MathChapters table:', err.message);
                                    reject(err);
                                } else {
                                    console.log('Table MathChapters created successfully.');
                                    db.run(`
                                        CREATE TABLE IF NOT EXISTS MathSubchapters (
                                            SubchapterId INTEGER PRIMARY KEY AUTOINCREMENT,
                                            ChapterId INTEGER,
                                            SubchapterName TEXT,
                                            SortOrder INTEGER,
                                            FOREIGN KEY(ChapterId) REFERENCES MathChapters(ChapterId) ON DELETE CASCADE ON UPDATE CASCADE
                                        );
                                    `, (err) => {
                                        if (err) {
                                            console.error('Error creating MathSubchapters table:', err.message);
                                            reject(err);
                                        } else {
                                            console.log('Table MathSubchapters created successfully.');
                                            db.run(`
                                                CREATE TABLE IF NOT EXISTS MathSubchapterContent (
                                                    ContentId INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    SubchapterId INTEGER,
                                                    TextContent TEXT,
                                                    ImageUrl TEXT,
                                                    SortOrder INTEGER,
                                                    FOREIGN KEY(SubchapterId) REFERENCES MathSubchapters(SubchapterId) ON DELETE CASCADE ON UPDATE CASCADE
                                                );
                                            `, (err) => {
                                                if (err) {
                                                    console.error('Error creating MathSubchapterContent table:', err.message);
                                                    reject(err);
                                                } else {
                                                    console.log('Table MathSubchapterContent created successfully.');
                                                    resolve();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

// Fetch chapters by year
export const fetchChaptersByYear = (year: number): Promise<any[]> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        try {
            db.all('SELECT * FROM Chapters WHERE Year = ?', [year], (err, rows) => {
                if (err) {
                    console.error('Failed to fetch chapters:', err);
                    reject(err);
                } else {
                    console.log(`Fetched Chapters Data for year ${year}:`, rows);
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error('Error executing query:', error);
            reject(error);
        } finally {
            db.close();  // Ensures closure even if db.all() setup fails
        }
    });
};


// Fetch subchapters by chapter id
export const fetchSubchaptersByChapterId = (chapterId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
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

// Fetch subchapter content by subchapter id
export const fetchSubchapterContentBySubchapterId = (subchapterId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.all('SELECT * FROM SubchapterContent WHERE SubchapterId = ? ORDER BY SortOrder', [subchapterId], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch subchapter content:', err);
                reject(err);
            } else {
                console.log(`Fetched Subchapter Content Data for subchapterId ${subchapterId}:`, rows);
                resolve(rows);
            }
        });
    });
};

// Fetch math chapters
export const fetchMathChapters = (): Promise<any[]> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        try {
            db.all('SELECT * FROM MathChapters ORDER BY SortOrder', [], (err, rows) => {
                if (err) {
                    console.error('Failed to fetch math chapters:', err);
                    reject(err);
                } else {
                    console.log('Fetched Math Chapters Data:', rows);
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error('Error during database query:', error);
            reject(error);
        } finally {
            db.close();  // Ensures the database is always closed
        }
    });
};

// Fetch math subchapters by chapter ID
export const fetchMathSubchaptersByChapterId = (chapterId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.all('SELECT * FROM MathSubchapters WHERE ChapterId = ? ORDER BY SortOrder', [chapterId], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch subchapters:', err);
                reject(err);
            } else {
                console.log(`Fetched Math Subchapters Data for chapterId ${chapterId}:`, rows);
                resolve(rows);
            }
        });
    });
};

// Fetch math subchapter content by subchapter ID
export const fetchMathSubchapterContentBySubchapterId = (subchapterId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.all('SELECT * FROM MathSubchapterContent WHERE SubchapterId = ? ORDER BY SortOrder', [subchapterId], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch subchapter content:', err);
                reject(err);
            } else {
                console.log(`Fetched Math Subchapter Content Data for subchapterId ${subchapterId}:`, rows);
                resolve(rows);
            }
        });
    });
};

// Add a new chapter to the database
export const addChapter = (chapterName: string, chapterIntro: string, year: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
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

