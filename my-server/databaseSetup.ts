// This file operates on the server-sid and handles the direct interaction with the SQLite database, including initializing the database and adding entries.
// The actual table creation logic has been moved to a separate module (createTables.ts).

// databaseSetup.ts

import sqlite3 from 'sqlite3';
import path from 'path';
import {
    createChaptersTable,
    createSubchaptersTable,
    createSubchapterContentTable,
    createMathChaptersTable,
    createMathSubchaptersTable,
    createMathSubchapterContentTable,
    createQuizTable,
    createMultipleChoiceOptionsTable,
    createClozeTestOptionsTable
} from './createTables';


const dbPath = path.resolve(__dirname, 'skiltSHK.db');
console.log("Database path: ", dbPath);

export const initializeDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, async (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
                reject(err);
            } else {
                console.log('Connected to the SQLite database.');

                // Set busy timeout to 5 seconds (5000 milliseconds)
                db.configure('busyTimeout', 5000);

                try {
                    await createChaptersTable(db);
                    await createSubchaptersTable(db);
                    await createSubchapterContentTable(db);
                    await createMathChaptersTable(db);
                    await createMathSubchaptersTable(db);
                    await createMathSubchapterContentTable(db);
                    await createQuizTable(db);
                    await createMultipleChoiceOptionsTable(db);
                    await createClozeTestOptionsTable(db);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
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

// Fetch quiz by content ID
export const fetchQuizByContentId = (contentId: number): Promise<any[]> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Quiz WHERE ContentId = ?', [contentId], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch quiz:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Fetch multiple-choice options by quiz ID
export const fetchMultipleChoiceOptionsByQuizId = (quizId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.all(`
            SELECT OptionText1, OptionText2, OptionText3, OptionText4
            FROM MultipleChoiceOptions
            WHERE QuizId = ?`, [quizId], (err, rows) => {  // Updated query to fetch new columns
            db.close();
            if (err) {
                console.error('Failed to fetch multiple-choice options:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Fetch cloze test options by quiz ID
export const fetchClozeTestOptionsByQuizId = (quizId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.all('SELECT * FROM ClozeTestOptions WHERE QuizId = ?', [quizId], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch cloze test options:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};