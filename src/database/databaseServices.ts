// Provides functions to fetch chapter data from a server for a specified year

// databaseservices.ts client-side
import { DATABASE_MODE, API_URL } from '@env';

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

console.log("DATABASE_MODE at runtime:", DATABASE_MODE);


export async function fetchVersionNumber(): Promise<number | null> {

        try {
            const response = await fetch(`${API_URL}/version`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const { version_number }: { version_number: number } = await response.json();
            return version_number; // Return the server version number
        } catch (error) {
            return null; // Return null on error
        }
    }


// Fetch chapters by year via the server
export async function fetchChaptersByYear(year: number): Promise<Chapter[]> {

        try {
            const response = await fetch(`${API_URL}/chapters/${year}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const chapters: Chapter[] = await response.json();
            return chapters;
        } catch (error) {
            return [];  // Return empty array on error
        }
    }

// Fetch subchapters by chapter ID
export async function fetchSubchaptersByChapterId(chapterId: number): Promise<Subchapter[]> {
        try {
            const response = await fetch(`${API_URL}/subchapters/${chapterId}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            const subchapters: Subchapter[] = await response.json();
            return subchapters;
        } catch (error) {
            return [];
        }
    }

// Fetch subchapter content by subchapter ID
export async function fetchSubchapterContentBySubchapterId(subchapterId: number): Promise<(GenericContent | Quiz)[]> {
        try {
            // Fetch from server
            const response = await fetch(`${API_URL}/subchaptercontent/${subchapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const contentResult: GenericContent[] = await response.json();

            // Combine content and quizzes
            const mergedContent: (GenericContent | Quiz)[] = [];
            for (const content of contentResult) {
                mergedContent.push(content);

                const quizzes = await fetchQuizByContentId(content.ContentId);
                if (quizzes.length > 0) {
                    mergedContent.push(...quizzes); // Add quizzes if available
                }
            }

            return mergedContent;
        } catch (error) {
            return [];
        }
    }


// Fetch math chapters
export async function fetchMathChapters(): Promise<MathChapter[]> {

        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/mathchapters`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const mathChapters: MathChapter[] = await response.json();
            return mathChapters;
        } catch (error) {
            return [];
        }
    }

// Fetch math subchapters by chapter ID
export async function fetchMathSubchaptersByChapterId(chapterId: number): Promise<MathSubchapter[]> {

        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/mathsubchapters/${chapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const subchapters: MathSubchapter[] = await response.json();
            return subchapters;
        } catch (error) {
            return [];
        }
    }

// Fetch math subchapter content by subchapter ID
export async function fetchMathContentBySubchapterId(subchapterId: number): Promise<GenericContent[]> {

        try {
            const response = await fetch(`${API_URL}/mathsubchaptercontent/${subchapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const mathSubchapterContent: GenericContent[] = await response.json();
            return mathSubchapterContent;
        } catch (error) {
            return [];
        }
    }

export async function fetchQuizByContentId(contentId: number): Promise<Quiz[]> {

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
            return [];
        }
    }


// Fetch multiple-choice options by quiz ID
export async function fetchMultipleChoiceOptionsByQuizId(quizId: number): Promise<MultipleChoiceOption[]> {

        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/multiplechoiceoptions/${quizId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const options: MultipleChoiceOption[] = await response.json();
            return options;
        } catch (error) {
            throw error;
        }
    }

// Fetch ClozeTestOptions by Quiz ID
export async function fetchClozeTestOptionsByQuizId(
    quizId: number
): Promise<{ options: string[]; correctAnswers: (string | null)[] }> {
        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/clozetestoptions/${quizId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Server response was not ok.');
            }

            // Map the server response to the expected format
            return {
                options: data.options || [],
                correctAnswers: data.correctAnswers || [],
            };
        } catch (error) {
            return { options: [], correctAnswers: [] };
        }
    }


export async function fetchMathMiniQuizByContentId(contentId: number): Promise<MathMiniQuiz[]> {

        try {
            const response = await fetch(`${API_URL}/mathminiquiz/${contentId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const quizzes = await response.json();

            return quizzes.map((quiz: any) => ({
                QuizId: quiz.QuizId,
                ContentId: quiz.ContentId,
                Question: quiz.Question,
                Answer: Array.isArray(quiz.Answer)
                    ? quiz.Answer
                    : quiz.Answer?.split(',').map((ans: string) => ans.trim()) || [],
                Options: quiz.Options?.split(',').map((opt: string) => opt.trim()) || [],
                Image: quiz.Image || null,
            }));
        } catch (error) {
            return [];
        }
    }


// Search subchapters by query
export async function searchSubchapters(query: string): Promise<Subchapter[]> {

        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/search/${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const results: Subchapter[] = await response.json();
            return results;
        } catch (error) {
            return [];
        }
    }

// Function to fetch flashcards based on a chapterId
export async function fetchFlashcardsForChapter(chapterId: number): Promise<{ Question: string; Answer: string }[]> {

        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/flashcards?chapterId=${chapterId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return [];
        }
    }

// Fetch all chapters (for displaying all "Lernfelder")
export async function fetchChapters(): Promise<{ ChapterId: number; ChapterName: string }[]> {

        // Fetch from server
        try {
            const response = await fetch(`${API_URL}/chapters`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return [];
        }
    }

