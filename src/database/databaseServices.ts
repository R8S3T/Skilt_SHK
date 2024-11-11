// Provides functions to fetch chapter data from a server for a specified year

// databaseservices.ts client-side
import { DATABASE_MODE, API_URL } from '@env';
import { initializeDatabase } from './initializeLocalDatabase';

import {
    Chapter,
    Subchapter,
    MathChapter,
    MathSubchapter,
    MathMiniQuiz,
    GenericContent,
    Quiz,
    MultipleChoiceOption,
    ClozeTestOption,
} from 'src/types/contentTypes';


// Fetch chapters by year via the server
export async function fetchChaptersByYear(year: number): Promise<Chapter[]> {
    if (DATABASE_MODE === 'local') {
        // Use local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<Chapter>(
                'SELECT * FROM Chapters WHERE Year = ?',
                [year]
            );
            return result;
        } catch (error) {
            console.error('Failed to fetch chapters from SQLite:', error);
            return [];
        }
    } else {
        // Use server fetch
        try {
            const response = await fetch(`${API_URL}/chapters/${year}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const chapters: Chapter[] = await response.json();
            return chapters;
        } catch (error) {
            console.error(`Failed to fetch chapters for year ${year}:`, error);
            return [];  // Return empty array on error
        }
    }
}

// Fetch subchapters by chapter ID
export async function fetchSubchaptersByChapterId(chapterId: number): Promise<Subchapter[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<Subchapter>(
                'SELECT * FROM Subchapters WHERE ChapterId = ? ORDER BY SortOrder ASC',
                [chapterId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch subchapters for chapterId ${chapterId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/subchapters/${chapterId}`);
            if (!response.ok) {
                console.error('Network response was not ok:', response.status, response.statusText);
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            const subchapters: Subchapter[] = await response.json();
            return subchapters;
        } catch (error) {
            console.error(`Failed to fetch subchapters for chapterId ${chapterId} from server:`, error);
            return [];
        }
    }
}

// Fetch subchapter content by subchapter ID
export async function fetchSubchapterContentBySubchapterId(subchapterId: number): Promise<GenericContent[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<GenericContent>(
                'SELECT * FROM SubchapterContent WHERE SubchapterId = ? ORDER BY SortOrder',
                [subchapterId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch subchapter content for subchapterId ${subchapterId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/subchaptercontent/${subchapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const subchapterContent: GenericContent[] = await response.json();
            return subchapterContent;
        } catch (error) {
            console.error(`Failed to fetch subchapter content for subchapterId ${subchapterId} from server:`, error);
            return [];
        }
    }
}

// Fetch math chapters
export async function fetchMathChapters(): Promise<MathChapter[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<MathChapter>(
                'SELECT * FROM MathChapters ORDER BY SortOrder'
            );
            return result;
        } catch (error) {
            console.error('Failed to fetch math chapters from SQLite:', error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/mathchapters`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const mathChapters: MathChapter[] = await response.json();
            return mathChapters;
        } catch (error) {
            console.error('Failed to fetch math chapters from server:', error);
            return [];
        }
    }
}

// Fetch math subchapters by chapter ID
export async function fetchMathSubchaptersByChapterId(chapterId: number): Promise<MathSubchapter[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<MathSubchapter>(
                'SELECT * FROM MathSubchapters WHERE ChapterId = ? ORDER BY SortOrder',
                [chapterId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch math subchapters for chapterId ${chapterId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/mathsubchapters/${chapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const subchapters: MathSubchapter[] = await response.json();
            return subchapters;
        } catch (error) {
            console.error(`Failed to fetch math subchapters for chapterId ${chapterId} from server:`, error);
            return [];
        }
    }
}

// Fetch math subchapter content by subchapter ID
export async function fetchMathContentBySubchapterId(subchapterId: number): Promise<GenericContent[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<GenericContent>(
                'SELECT * FROM MathSubchapterContent WHERE SubchapterId = ? ORDER BY SortOrder',
                [subchapterId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch math subchapter content for subchapterId ${subchapterId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/mathsubchaptercontent/${subchapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const mathSubchapterContent: GenericContent[] = await response.json();
            return mathSubchapterContent;
        } catch (error) {
            console.error(`Failed to fetch math subchapter content for subchapterId ${subchapterId} from server:`, error);
            return [];
        }
    }
}

export async function fetchQuizByContentId(contentId: number): Promise<Quiz[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            console.log(`Fetching quiz for contentId: ${contentId}`);
            const result = await db.getAllAsync<Quiz>(
                'SELECT * FROM Quiz WHERE ContentId = ?',
                [contentId]
            );

            console.log('Fetched quizzes:', result);  // Log the fetched quizzes to see if any data is returned.

            // Process options for each quiz
            for (let quiz of result) {
                if (quiz.QuizType === 'cloze_test') {
                    quiz.Options = await fetchClozeTestOptionsByQuizId(quiz.QuizId);
                } else if (quiz.QuizType === 'multiple_choice') {
                    quiz.Options = await fetchMultipleChoiceOptionsByQuizId(quiz.QuizId);
                }
            }
            return result;
        } catch (error) {
            console.error(`Failed to fetch quiz for contentId ${contentId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/quiz/${contentId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const quizzes: Quiz[] = await response.json();

            // Fetch options for each quiz
            for (let quiz of quizzes) {
                if (quiz.QuizType === 'cloze_test') {
                    quiz.Options = await fetchClozeTestOptionsByQuizId(quiz.QuizId);
                } else if (quiz.QuizType === 'multiple_choice') {
                    quiz.Options = await fetchMultipleChoiceOptionsByQuizId(quiz.QuizId);
                }
            }
            return quizzes;
        } catch (error) {
            console.error(`Failed to fetch quiz for contentId ${contentId} from server:`, error);
            return [];
        }
    }
}

// Fetch multiple-choice options by quiz ID
export async function fetchMultipleChoiceOptionsByQuizId(quizId: number): Promise<MultipleChoiceOption[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<MultipleChoiceOption>(
                'SELECT OptionText1, OptionText2, OptionText3, OptionText4 FROM MultipleChoiceOptions WHERE QuizId = ?',
                [quizId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch multiple choice options for quizId ${quizId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/multiplechoiceoptions/${quizId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const options: MultipleChoiceOption[] = await response.json();
            return options;
        } catch (error) {
            console.error(`Failed to fetch multiple choice options for quizId ${quizId} from server:`, error);
            return [];
        }
    }
}

// Fetch cloze test options by quiz ID
export async function fetchClozeTestOptionsByQuizId(quizId: number): Promise<ClozeTestOption[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<ClozeTestOption>(
                'SELECT * FROM ClozeTestOptions WHERE QuizId = ?',
                [quizId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch cloze test options for quizId ${quizId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/clozetestoptions/${quizId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const options: ClozeTestOption[] = await response.json();
            return options;
        } catch (error) {
            console.error(`Failed to fetch cloze test options for quizId ${quizId} from server:`, error);
            return [];
        }
    }
}

// Fetch MathMiniQuiz by content ID
export async function fetchMathMiniQuizByContentId(contentId: number): Promise<MathMiniQuiz[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<MathMiniQuiz>(
                'SELECT * FROM MathMiniQuiz WHERE ContentId = ?',
                [contentId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch MathMiniQuiz for contentId ${contentId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/mathminiquiz/${contentId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const quizzes: MathMiniQuiz[] = await response.json();
            return quizzes;
        } catch (error) {
            console.error(`Failed to fetch MathMiniQuiz for contentId ${contentId} from server:`, error);
            return [];
        }
    }
}

// Search subchapters by query
export async function searchSubchapters(query: string): Promise<Subchapter[]> {
    if (DATABASE_MODE === 'local') {
        // Search in local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<Subchapter>(
                `
                SELECT s.SubchapterId, s.SubchapterName, GROUP_CONCAT(c.ContentData, ' ') AS ContentPreview
                FROM Subchapters s
                LEFT JOIN SubchapterContent c ON s.SubchapterId = c.SubchapterId
                WHERE s.SubchapterName LIKE ? OR c.ContentData LIKE ?
                GROUP BY s.SubchapterId
                ORDER BY s.SortOrder;
                `,
                [`%${query}%`, `%${query}%`]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch search results for query "${query}" from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/search/${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const results: Subchapter[] = await response.json();
            return results;
        } catch (error) {
            console.error(`Failed to fetch search results for query "${query}" from server:`, error);
            return [];
        }
    }
}

// Function to fetch flashcards based on a chapterId
export async function fetchFlashcardsForChapter(chapterId: number): Promise<{ Question: string; Answer: string }[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<{ Question: string; Answer: string }>(
                'SELECT Question, Answer FROM Flashcards WHERE ChapterId = ?',
                [chapterId]
            );
            return result;
        } catch (error) {
            console.error(`Failed to fetch flashcards for ChapterId ${chapterId} from SQLite:`, error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/flashcards?chapterId=${chapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch flashcards for ChapterId ${chapterId} from server:`, error);
            return [];
        }
    }
}

// Fetch all chapters (for displaying all "Lernfelder")
export async function fetchChapters(): Promise<{ ChapterId: number; ChapterName: string }[]> {
    if (DATABASE_MODE === 'local') {
        // Fetch from local SQLite database
        const db = await initializeDatabase();
        try {
            const result = await db.getAllAsync<{ ChapterId: number; ChapterName: string }>(
                'SELECT ChapterId, ChapterName FROM Chapters ORDER BY ChapterId'
            );
            return result;
        } catch (error) {
            console.error('Failed to fetch chapters from SQLite:', error);
            return [];
        }
    } else {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/chapters`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch chapters from server:', error);
            return [];
        }
    }
}
