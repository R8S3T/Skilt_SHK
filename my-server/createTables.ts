import sqlite3 from 'sqlite3';

export const createChaptersTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
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
                resolve();
            }
        });
    });
};

export const createSubchaptersTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
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
                resolve();
            }
        });
    });
};

export const createSubchapterContentTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
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
                resolve();
            }
        });
    });
};

export const createMathChaptersTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
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
                resolve();
            }
        });
    });
};

export const createMathSubchaptersTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
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
                resolve();
            }
        });
    });
};

export const createMathSubchapterContentTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS MathSubchapterContent (
                ContentId INTEGER PRIMARY KEY AUTOINCREMENT,
                ChapterId INTEGER,
                SubchapterId INTEGER,
                TextContent TEXT,
                ImageUrl TEXT,
                SortOrder INTEGER,
                FOREIGN KEY(ChapterId) REFERENCES MathChapters(ChapterId) ON DELETE CASCADE ON UPDATE CASCADE,
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
    });
};

export const createQuizTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS Quiz (
                QuizId INTEGER PRIMARY KEY AUTOINCREMENT,
                ContentId INTEGER,
                Question TEXT,
                Type TEXT,
                Answer TEXT,
                FOREIGN KEY(ContentId) REFERENCES SubchapterContent(ContentId)
            );
        `, (err) => {
            if (err) {
                console.error('Error creating Quiz table:', err.message);
                reject(err);
            } else {
                console.log('Table Quiz created successfully.');
                resolve();
            }
        });
    });
};

export const createMultipleChoiceOptionsTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS MultipleChoiceOptions (
                OptionId INTEGER PRIMARY KEY AUTOINCREMENT,
                QuizId INTEGER,
                OptionText1 TEXT,
                OptionText2 TEXT,
                OptionText3 TEXT,
                OptionText4 TEXT,
                FOREIGN KEY(QuizId) REFERENCES Quiz(QuizId)
            );
        `, (err) => {
            if (err) {
                console.error('Error creating MultipleChoiceOptions table:', err.message);
                reject(err);
            } else {
                console.log('Table MultipleChoiceOptions created successfully.');
                resolve();
            }
        });
    });
};

export const createClozeTestOptionsTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS ClozeTestOptions (
                OptionId INTEGER PRIMARY KEY AUTOINCREMENT,
                QuizId INTEGER,
                OptionTexts TEXT, -- Store options as a comma-separated string
                CorrectOptions TEXT, -- Store correct options as a comma-separated string
                FOREIGN KEY(QuizId) REFERENCES Quiz(QuizId)
            );
        `, (err) => {
            if (err) {
                console.error('Error creating ClozeTestOptions table:', err.message);
                reject(err);
            } else {
                console.log('Table ClozeTestOptions created successfully.');
                resolve();
            }
        });
    });
};

export const createMathMiniQuizTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS MathMiniQuiz (
                QuizId INTEGER PRIMARY KEY AUTOINCREMENT,
                ContentId INTEGER,
                Question TEXT,
                Answer TEXT,
                Option1 TEXT,
                Option2 TEXT,
                Option3 TEXT,
                FOREIGN KEY(ContentId) REFERENCES MathSubchapterContent(ContentId)
            );
        `, (err) => {
            if (err) {
                console.error('Error creating MathMiniQuiz table:', err.message);
                reject(err);
            } else {
                console.log('Table MathMiniQuiz created successfully.');
                resolve();
            }
        });
    });
};

export const createFlashcardsTable = (db: sqlite3.Database): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS Flashcards (
                FlashcardId INTEGER PRIMARY KEY AUTOINCREMENT,
                Question TEXT NOT NULL,
                Answer TEXT NOT NULL,
                TopicName TEXT NOT NULL,
                SubchapterId INTEGER NOT NULL,
                FOREIGN KEY (SubchapterId) REFERENCES SubchapterContent(SubchapterId) ON DELETE CASCADE
            );
        `, (err) => {
            if (err) {
                console.error('Failed to create Flashcards table:', err.message);
                reject(err);
            } else {
                console.log('Flashcards table created successfully.');
                resolve();
            }
        });
    });
};

