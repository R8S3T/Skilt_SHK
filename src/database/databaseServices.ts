// Provides functions to fetch chapter data from a server for a specified year

// databaseservices.ts client-side
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
    Flashcard
} from 'src/types/contentTypes';

    // Use here Expo IP adress
    const API_URL = 'http://192.168.164.38:3000';


// Fetch chapters by year via the server
export async function fetchChaptersByYear(year: number): Promise<Chapter[]> {
    try {
        const response = await fetch(`${API_URL}/chapters/${year}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const chapters: Chapter[] = await response.json();
        console.log(`Fetched Chapters Data for year ${year}:`, chapters);
        return chapters;
    } catch (error) {
        console.error(`Failed to fetch chapters for year ${year}:`, error);
        return [];  // Return empty array on error
    }
}

// Fetch subchapters by chapter ID
export async function fetchSubchaptersByChapterId(chapterId: number): Promise<Subchapter[]> {
    try {
        const response = await fetch(`${API_URL}/subchapters/${chapterId}`);
        if (!response.ok) {
            console.error('Network response was not ok:', response.status, response.statusText);
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const subchapters: Subchapter[] = await response.json();
        console.log(`Fetched Subchapters Data for chapterId ${chapterId}:`, subchapters);
        return subchapters;
    } catch (error) {
        console.error(`Failed to fetch subchapters for chapterId ${chapterId}:`, error);
        return [];  // Return empty array on error
    }
}

// Fetch subchapter content by subchapter ID
export async function fetchSubchapterContentBySubchapterId(subchapterId: number): Promise<GenericContent[]> {
    try {
        const response = await fetch(`${API_URL}/subchaptercontent/${subchapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const subchapterContent: GenericContent[] = await response.json();
        console.log(`Fetched Subchapter Content Data for subchapterId ${subchapterId}:`, subchapterContent);
        return subchapterContent;
    } catch (error) {
        console.error(`Failed to fetch subchapter content for subchapterId ${subchapterId}:`, error);
        return [];
    }
}

// Fetch math chapters from the server
export async function fetchMathChapters(): Promise<MathChapter[]> {
    try {
        const response = await fetch(`${API_URL}/mathchapters`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const mathChapters: MathChapter[] = await response.json();
        console.log('Fetched Math Chapters Data:', mathChapters);
        return mathChapters;
    } catch (error) {
        console.error('Failed to fetch math chapters:', error);
        return [];
    }
}

// Fetch math subchapters by chapter ID
export async function fetchMathSubchaptersByChapterId(chapterId: number): Promise<MathSubchapter[]> {
    try {
        const response = await fetch(`${API_URL}/mathsubchapters/${chapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const subchapters: MathSubchapter[] = await response.json();
        console.log(`Fetched Math Subchapters Data for chapterId ${chapterId}:`, subchapters);
        return subchapters;
    } catch (error) {
        console.error(`Failed to fetch math subchapters for chapterId ${chapterId}`, error);
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
        console.log(`Fetched Math Subchapter Content Data for subchapterId ${subchapterId}:`, mathSubchapterContent);
        return mathSubchapterContent;
    } catch (error) {
        console.error(`Failed to fetch math subchapter content for subchapterId ${subchapterId}`, error);
        return [];
    }
}

// Fetch quiz by content ID
export async function fetchQuizByContentId(contentId: number): Promise<Quiz[]> {
    try {
        const response = await fetch(`${API_URL}/quiz/${contentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const quizzes: Quiz[] = await response.json();
        console.log(`Fetched Quiz Data for contentId ${contentId}:`, quizzes);

        for (let quiz of quizzes) {
            if (quiz.QuizType === 'cloze_test') {
                const clozeOptions = await fetchClozeTestOptionsByQuizId(quiz.QuizId);
                quiz.Options = clozeOptions;
            } else if (quiz.QuizType === 'multiple_choice') {
                const multipleChoiceOptions = await fetchMultipleChoiceOptionsByQuizId(quiz.QuizId);
                quiz.Options = multipleChoiceOptions;
            }
        }

        return quizzes;
    } catch (error) {
        console.error(`Failed to fetch quiz for contentId ${contentId}:`, error);
        return [];
    }
}

// Fetch multiple-choice options by quiz ID
export async function fetchMultipleChoiceOptionsByQuizId(quizId: number): Promise<MultipleChoiceOption[]> {
    try {
        const response = await fetch(`${API_URL}/multiplechoiceoptions/${quizId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const options: MultipleChoiceOption[] = await response.json();
        console.log(`Fetched MultipleChoiceOptions for quizId ${quizId}:`, options); // Verify the data here
        return options;
    } catch (error) {
        console.error(`Failed to fetch multiple choice options for quizId ${quizId}:`, error);
        return [];
    }
}

// Fetch cloze test options by quiz ID
export async function fetchClozeTestOptionsByQuizId(quizId: number): Promise<ClozeTestOption[]> {
    try {
        const response = await fetch(`${API_URL}/clozetestoptions/${quizId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const options: ClozeTestOption[] = await response.json();
        console.log(`Fetched ClozeTestOptions for quizId ${quizId}:`, options);
        return options;
    } catch (error) {
        console.error(`Failed to fetch cloze test options for quizId ${quizId}:`, error);
        return [];
    }
}

// Fetch MathMiniQuiz by content ID
export async function fetchMathMiniQuizByContentId(contentId: number): Promise<MathMiniQuiz[]> {
    try {
        const response = await fetch(`${API_URL}/mathminiquiz/${contentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        // No need to process Answer as array, it is already processed server-side
        const quizzes: MathMiniQuiz[] = await response.json();
        console.log(`Fetched MathMiniQuiz Data for contentId ${contentId}:`, quizzes);
        return quizzes;
    } catch (error) {
        console.error(`Failed to fetch MathMiniQuiz for contentId ${contentId}:`, error);
        return [];
    }
}

// Search subchapters by query
export async function searchSubchapters(query: string): Promise<Subchapter[]> {
    try {
        const response = await fetch(`${API_URL}/search/${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const results: Subchapter[] = await response.json();
        console.log(`Search results for query "${query}":`, results);
        return results;
    } catch (error) {
        console.error(`Failed to fetch search results for query "${query}":`, error);
        return [];
    }
}

// Fetch flashcards by chapter ID
export async function fetchFlashcardsByChapterId(chapterId: number): Promise<Flashcard[]> {
    try {
        const response = await fetch(`${API_URL}/flashcards/chapter/${chapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const flashcards: Flashcard[] = await response.json();
        console.log(`Fetched Flashcards Data for chapterId ${chapterId}:`, flashcards);
        return flashcards;
    } catch (error) {
        console.error(`Failed to fetch flashcards for chapterId ${chapterId}:`, error);
        return [];
    }
}

// Fetch distinct flashcard topics by SubchapterId
export async function fetchFlashcardTopicsBySubchapterId(subchapterId: number): Promise<string[]> {
    try {
        const response = await fetch(`${API_URL}/flashcards/topics/subchapter/${subchapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const topics: string[] = await response.json();
        return topics;
    } catch (error) {
        console.error(`Failed to fetch flashcard topics for subchapterId ${subchapterId}:`, error);
        return [];
    }
}

// Fetch flashcards (Question and Answer) by TopicName and SubchapterId
export async function fetchFlashcardsByTopic(subchapterId: number, topicName: string): Promise<{ Question: string, Answer: string }[]> {
    try {
        const response = await fetch(`${API_URL}/flashcards/subchapter/${subchapterId}/topic/${topicName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const flashcards = await response.json();
        return flashcards;
    } catch (error) {
        console.error(`Failed to fetch flashcards for topic ${topicName} and subchapterId ${subchapterId}:`, error);
        return [];
    }
}