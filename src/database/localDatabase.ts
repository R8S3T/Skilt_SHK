import { initializeDatabase } from './initializeLocalDatabase';

import { 
    Chapter,
    Subchapter,
    GenericContent,
    MathChapter,
    MathSubchapter,
    Quiz,
    MultipleChoiceOption,
    MathMiniQuiz,
    ClozeTestOption
} from '../types/contentTypes';



// Fetch chapters by year from local SQLite database
export async function fetchChaptersByYear(year: number): Promise<Chapter[]> {
    const db = await initializeDatabase();
    try {
        const result = await db.getAllAsync<Chapter>(
            'SELECT * FROM Chapters WHERE Year = ?',
            [year]
        );
        return result;
    } catch (error) {
        console.error('Failed to fetch chapters:', error);
        return [];
    }
}


// Fetch subchapters by chapter ID
export async function fetchSubchaptersByChapterId(chapterId: number): Promise<Subchapter[]> {
    const db = await initializeDatabase();
    try {
        const result = await db.getAllAsync<Subchapter>(
            'SELECT * FROM Subchapters WHERE ChapterId = ?',
            [chapterId]
        );
        return result;
    } catch (error) {
        console.error('Failed to fetch subchapters:', error);
        return [];
    }
}


// Fetch subchapter content by subchapter ID
export async function fetchSubchapterContentBySubchapterId(subchapterId: number): Promise<GenericContent[]> {
    const db = await initializeDatabase();
    try {
        const result = await db.getAllAsync<GenericContent>(
            'SELECT * FROM SubchapterContent WHERE SubchapterId = ? ORDER BY SortOrder',
            [subchapterId]
        );
        return result;
    } catch (error) {
        console.error(`Failed to fetch subchapter content for subchapterId ${subchapterId}:`, error);
        return [];
    }
}

// Fetch math chapters from the server
export async function fetchMathChapters(): Promise<MathChapter[]> {
    const db = await initializeDatabase();
    try {
        const result = await db.getAllAsync<MathChapter>(
            'SELECT * FROM MathChapters ORDER BY SortOrder'
        );
        return result;
    } catch (error) {
        console.error('Failed to fetch math chapters:', error);
        return [];
    }
}

// Fetch math subchapters by chapter ID
export async function fetchMathSubchaptersByChapterId(chapterId: number): Promise<MathSubchapter[]> {
    const db = await initializeDatabase();
    try {
        const result = await db.getAllAsync<MathSubchapter>(
            'SELECT * FROM MathSubchapters WHERE ChapterId = ? ORDER BY SortOrder',
            [chapterId]
        );
        return result;
    } catch (error) {
        console.error(`Failed to fetch math subchapters for chapterId ${chapterId}:`, error);
        return [];
    }
}

// Fetch math subchapter content by subchapter ID
export async function fetchMathContentBySubchapterId(subchapterId: number): Promise<GenericContent[]> {
    const db = await initializeDatabase();
    try {
        const result = await db.getAllAsync<GenericContent>(
            'SELECT * FROM MathSubchapterContent WHERE SubchapterId = ? ORDER BY SortOrder',
            [subchapterId]
        );
        return result;
    } catch (error) {
        console.error(`Failed to fetch math subchapter content for subchapterId ${subchapterId}:`, error);
        return [];
    }
}

// Fetch quiz by content ID
export async function fetchQuizByContentId(contentId: number): Promise<Quiz[]> {
    const db = await initializeDatabase();
    try {
        const result = await db.getAllAsync<Quiz>(
            'SELECT * FROM Quiz WHERE ContentId = ?',
            [contentId]
        );
        return result;
    } catch (error) {
        console.error('Failed to fetch quiz:', error);
        return [];
    }
}


// Fetch multiple-choice options by quiz ID
export async function fetchMultipleChoiceOptionsByQuizId(quizId: number): Promise<MultipleChoiceOption[]> {
    const db = await initializeDatabase();
    try {
        const options = await db.getAllAsync<MultipleChoiceOption>(
            'SELECT OptionText1, OptionText2, OptionText3, OptionText4 FROM MultipleChoiceOptions WHERE QuizId = ?',
            [quizId]
        );
        return options;
    } catch (error) {
        console.error(`Failed to fetch multiple-choice options for quizId ${quizId}:`, error);
        return [];
    }
}

// Fetch cloze test options by quiz ID
export async function fetchClozeTestOptionsByQuizId(quizId: number): Promise<ClozeTestOption[]> {
    const db = await initializeDatabase();
    try {
        const options = await db.getAllAsync<ClozeTestOption>(
            'SELECT * FROM ClozeTestOptions WHERE QuizId = ?',
            [quizId]
        );
        return options;
    } catch (error) {
        console.error(`Failed to fetch cloze test options for quizId ${quizId}:`, error);
        return [];
    }
}

// Fetch MathMiniQuiz by content ID
export async function fetchMathMiniQuizByContentId(contentId: number): Promise<MathMiniQuiz[]> {
    const db = await initializeDatabase();
    try {
        const quizzes = await db.getAllAsync<MathMiniQuiz>(
            'SELECT * FROM MathMiniQuiz WHERE ContentId = ?',
            [contentId]
        );
        return quizzes;
    } catch (error) {
        console.error(`Failed to fetch MathMiniQuiz for contentId ${contentId}:`, error);
        return [];
    }
}

// Search subchapters by query
export async function searchSubchapters(query: string): Promise<Subchapter[]> {
    const db = await initializeDatabase();
    const sqlQuery = `
        SELECT s.SubchapterId, s.SubchapterName, GROUP_CONCAT(c.ContentData, ' ') AS ContentPreview
        FROM Subchapters s
        LEFT JOIN SubchapterContent c ON s.SubchapterId = c.SubchapterId
        WHERE s.SubchapterName LIKE ? OR c.ContentData LIKE ?
        GROUP BY s.SubchapterId
        ORDER BY s.SortOrder;
    `;
    try {
        const results = await db.getAllAsync<Subchapter>(
            sqlQuery,
            [`%${query}%`, `%${query}%`]
        );
        return results;
    } catch (error) {
        console.error(`Failed to fetch search results for query "${query}":`, error);
        return [];
    }
}

// Function to fetch flashcards based on a chapterId
export async function fetchFlashcardsForChapter(chapterId: number): Promise<{ Question: string; Answer: string }[]> {
    const db = await initializeDatabase();
    try {
        const flashcards = await db.getAllAsync<{ Question: string; Answer: string }>(
            'SELECT Question, Answer FROM Flashcards WHERE ChapterId = ?',
            [chapterId]
        );
        return flashcards;
    } catch (error) {
        console.error(`Failed to fetch flashcards for ChapterId ${chapterId}:`, error);
        return [];
    }
}


// Fetch all chapters from the server (for displaying all "Lernfelder")
export async function fetchChapters(): Promise<{ ChapterId: number; ChapterName: string }[]> {
    const db = await initializeDatabase();
    try {
        const chapters = await db.getAllAsync<{ ChapterId: number; ChapterName: string }>(
            'SELECT ChapterId, ChapterName FROM Chapters ORDER BY ChapterId'
        );
        return chapters;
    } catch (error) {
        console.error('Failed to fetch chapters:', error);
        return [];
    }
}

