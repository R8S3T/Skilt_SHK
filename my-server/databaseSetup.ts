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
    createClozeTestOptionsTable,
    createMathMiniQuizTable,
    createFlashcardsTable,
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
                    await createMathMiniQuizTable(db);
                    await createFlashcardsTable(db);
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
            // Update the SQL query to only select the relevant columns: ChapterName and ChapterIntro
            db.all('SELECT ChapterId, ChapterName, ChapterIntro FROM Chapters WHERE Year = ?', [year], (err, rows) => {
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


// Fetch subchapters by chapter id and order by SortOrder
export const fetchSubchaptersByChapterId = (chapterId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.all('SELECT SubchapterId, ChapterId, SubchapterName, SortOrder, ImageName FROM Subchapters WHERE ChapterId = ? ORDER BY SortOrder ASC', [chapterId], (err, rows) => {
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

// Fetch MathMiniQuiz by content ID
export const fetchMathMiniQuizByContentId = (contentId: number): Promise<any[]> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM MathMiniQuiz WHERE ContentId = ?', [contentId], (err, rows) => {
            db.close();
            if (err) {
                console.error('Failed to fetch MathMiniQuiz:', err);
                reject(err);
            } else {
                // Ensure TypeScript knows that rows is an array of objects
                const processedRows = rows.map(row => {
                    // Type the row explicitly as an object with specific fields
                    const typedRow = row as { [key: string]: any };
                    return {
                        ...typedRow,  // Spread operator works now because we ensured row is an object
                        Answer: typedRow.Answer.split(',').map((answer: string) => answer.trim()) // Convert to array
                    };
                });

                resolve(processedRows);
            }
        });
    });
};

// Search subchapters and content by a search query
export const searchSubchapters = (searchQuery: string): Promise<any[]> => {
    const db = new sqlite3.Database(dbPath);
    return new Promise((resolve, reject) => {
        const query = `
            SELECT s.SubchapterId, s.SubchapterName, GROUP_CONCAT(c.ContentData, ' ') AS ContentPreview
            FROM Subchapters s
            LEFT JOIN SubchapterContent c ON s.SubchapterId = c.SubchapterId
            WHERE s.SubchapterName LIKE ? OR c.ContentData LIKE ?
            GROUP BY s.SubchapterId
            ORDER BY s.SortOrder;
        `;
        db.all(query, [`%${searchQuery}%`, `%${searchQuery}%`], (err, rows) => {
            db.close();
            if (err) {
                console.error('Search query failed:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Fetch distinct flashcard topics by SubchapterId
export const fetchFlashcardTopicsBySubchapterId = (subchapterId: number): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        const query = `SELECT DISTINCT TopicName FROM Flashcards WHERE SubchapterId = ?`;
        
        db.all(query, [subchapterId], (err, rows: any[]) => {  // Explicitly typing rows as any[]
            db.close();
            if (err) {
                console.error(`Failed to fetch flashcard topics for subchapterId ${subchapterId}:`, err);
                reject(err);
            } else {
                const topics = rows.map(row => row.TopicName);  // Now row is assumed to have TopicName
                resolve(topics);
            }
        });
    });
};

// Fetch flashcards (Question and Answer) by TopicName and SubchapterId
export const fetchFlashcardsByTopic = (subchapterId: number, topicName: string): Promise<{ Question: string, Answer: string }[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        const query = `SELECT Question, Answer FROM Flashcards WHERE SubchapterId = ? AND TopicName = ?`;

        db.all(query, [subchapterId, topicName], (err, rows: any[]) => {  // Explicitly typing rows as any[]
            db.close();
            if (err) {
                console.error(`Failed to fetch flashcards for topic ${topicName} and subchapterId ${subchapterId}:`, err);
                reject(err);
            } else {
                const flashcards = rows.map(row => ({
                    Question: row.Question,
                    Answer: row.Answer,
                }));
                resolve(flashcards);
            }
        });
    });
};

