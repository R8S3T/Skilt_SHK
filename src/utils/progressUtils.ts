import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { fetchSubchaptersByChapterId, fetchQuizByContentId } from 'src/database/databaseServices';
import { LearnStackParamList, RootStackParamList } from 'src/types/navigationTypes';

// Function to save progress (updated to save subchapterId and currentIndex)
export const saveProgress = async (
    sectionKey: string,
    chapterId: number,
    subchapterId: number,
    subchapterName: string,
    currentIndex: number,
    imageName: string | null // Add imageName parameter
) => {
    try {
        const progressData = {
            chapterId,
            subchapterId,
            subchapterName,
            currentIndex,
            imageName,
        };
        await AsyncStorage.setItem(`progress_${sectionKey}`, JSON.stringify(progressData));
    } catch (e) {
        console.error('Error saving progress.', e);
    }
};


// Function to load progress
// In progressUtils.ts
export const loadProgress = async (sectionKey: string) => {
    try {
        const savedProgress = await AsyncStorage.getItem(`progress_${sectionKey}`);
        const parsedProgress = savedProgress ? JSON.parse(savedProgress) : { chapterId: null, subchapterId: null, subchapterName: null, currentIndex: null, imageName: null };
        return parsedProgress;
    } catch (e) {
        console.error('Error loading progress.', e);
        return { chapterId: null, subchapterId: null, subchapterName: null, currentIndex: null, imageName: null };
    }
};


// Function to save slide index
export const saveContentSlideIndex = async (subchapterId: number, currentIndex: number) => {
    try {
        await AsyncStorage.setItem(`slideIndex_${subchapterId}`, JSON.stringify(currentIndex));
    } catch (error) {
        console.error('Error saving slide index:', error);
    }
};

// Function to load slide index
export const loadContentSlideIndex = async (subchapterId: number) => {
    try {
        const savedIndex = await AsyncStorage.getItem(`slideIndex_${subchapterId}`);
        return savedIndex ? JSON.parse(savedIndex) : null;
    } catch (error) {
        console.error('Error loading slide index:', error);
    }
};

// Function to handle exiting the content screen and saving progress
export const handleExit = async (
    chapterId: number,
    subchapterId: number,
    subchapterName: string,
    currentIndex: number,
    navigation: NavigationProp<any>
) => {
    try {
        // Fetch subchapters and get image name
        const subchapters = await fetchSubchaptersByChapterId(chapterId);
        const currentSubchapter = subchapters.find((sub) => sub.SubchapterId === subchapterId);
        const imageName = currentSubchapter?.ImageName || null;

        await saveProgress('section1', chapterId, subchapterId, subchapterName, currentIndex, imageName);
        navigation.navigate('HomeScreen');
    } catch (error) {
        console.error('Error handling exit:', error);
    }
};

// Function to handle progressing to the next content slide or completing the subchapter

interface NextContentParams {
    showQuiz: boolean;
    setShowQuiz: (show: boolean) => void;
    currentIndex: number;
    contentData: any[];
    setCurrentIndex: (index: number) => void;
    maxIndexVisited: number;
    setMaxIndexVisited: (index: number) => void;
    subchapterId: number;
    subchapterTitle: string;
    chapterId: number;
    chapterTitle: string;
    navigation: NavigationProp<LearnStackParamList, 'SubchapterContentScreen'>; // Keep this specific
    markSubchapterAsFinished: (id: number) => void;
    unlockSubchapter: (id: number) => void;
    origin?: string;
}

export const moveToNextSlide = async ({
    currentIndex,
    contentData,
    setCurrentIndex,
    maxIndexVisited,
    setMaxIndexVisited,
    saveCurrentProgress,
    showQuiz,
    setShowQuiz,
    completeSubchapter,
}: {
    currentIndex: number;
    contentData: any[];
    setCurrentIndex: (index: number) => void;
    maxIndexVisited: number;
    setMaxIndexVisited: (index: number) => void;
    saveCurrentProgress: (index: number) => Promise<void>;
    showQuiz: boolean;
    setShowQuiz: (show: boolean) => void;
    completeSubchapter: () => Promise<void>;
}) => {
    const isLastSlide = currentIndex === contentData.length - 1;

    if (!isLastSlide) {
        const newIndex = currentIndex + 1;
        const nextContent = contentData[newIndex];
    
        if (!nextContent) {
            return;
        }
    
        if ('QuizId' in nextContent) {;
            setShowQuiz(true);
        } else if ('ContentId' in nextContent) {
            setShowQuiz(false); // Ensure we leave quiz mode
            setCurrentIndex(newIndex);
            setMaxIndexVisited(Math.max(maxIndexVisited, newIndex));
            await saveCurrentProgress(newIndex);
        } else {
            console.error("Unrecognized content type. Skipping.");
        }
    }
     else {
        console.log("On the last slide. Checking for quiz or completing subchapter.");

        try {
            const quizData = await fetchQuizByContentId(contentData[currentIndex].ContentId);

            if (quizData.length > 0) {
                setShowQuiz(true); // Transition to quiz
            } else {
                await completeSubchapter(); // Transition to CongratsScreen
            }
        } catch (error) {
            console.error("Error fetching quiz data for last slide:", error);
            await completeSubchapter(); // Fallback to CongratsScreen
        }
    }
};


export const completeSubchapter = async ({
    subchapterId,
    chapterId,
    chapterTitle,
    navigation,
    markSubchapterAsFinished,
    unlockSubchapter,
    origin,
}: {
    subchapterId: number;
    chapterId: number;
    chapterTitle: string;
    navigation: NavigationProp<any>;
    markSubchapterAsFinished: (id: number) => void;
    unlockSubchapter: (id: number) => void;
    origin?: string;
}) => {

    // Mark the current subchapter as finished and unlock the next one
    markSubchapterAsFinished(subchapterId);
    unlockSubchapter(subchapterId + 1);

    const subchapters = await fetchSubchaptersByChapterId(chapterId);
    const currentSubchapterData = subchapters.find(sub => sub.SubchapterId === subchapterId);

    console.log("Current subchapter data:", currentSubchapterData);

    let nextSubchapterData = subchapters.find(
        sub => sub.SortOrder === (currentSubchapterData?.SortOrder ?? 0) + 1
    );

    if (!nextSubchapterData) {
        const nextChapterId = chapterId + 1;
        const nextChapterSubchapters = await fetchSubchaptersByChapterId(nextChapterId);
        nextSubchapterData = nextChapterSubchapters.sort((a, b) => a.SortOrder - b.SortOrder)[0];
    }

    // Handle navigation based on origin
    if (origin === 'SearchScreen') {
        navigation.navigate('SearchEndScreen');
        return;
    }

    if (origin === 'ResumeSection') {
        if (nextSubchapterData) {
            await saveProgress(
                'section1',
                nextSubchapterData.ChapterId,
                nextSubchapterData.SubchapterId,
                nextSubchapterData.SubchapterName,
                0,
                nextSubchapterData.ImageName
            );
        }

        navigation.navigate('CongratsScreen', {
            targetScreen: 'HomeScreen',
            targetParams: { chapterId, chapterTitle, origin: 'ResumeSection' },
        });
        return;
    }

    // Default case: Navigate to SubchaptersScreen after CongratsScreen
    navigation.navigate('CongratsScreen', {
        targetScreen: 'SubchaptersScreen',
        targetParams: { chapterId, chapterTitle, origin: 'SubchapterComplete' },
    });
};

export const nextContent = async ({
    showQuiz,
    setShowQuiz,
    currentIndex,
    contentData,
    setCurrentIndex,
    maxIndexVisited,
    setMaxIndexVisited,
    subchapterId,
    subchapterTitle,
    chapterId,
    chapterTitle,
    navigation,
    markSubchapterAsFinished,
    unlockSubchapter,
    origin,
}: NextContentParams) => {
    const saveCurrentProgress = async (newIndex: number) => {
        try {
            const subchapters = await fetchSubchaptersByChapterId(chapterId);
            const currentSubchapter = subchapters.find(sub => sub.SubchapterId === subchapterId);
            if (currentSubchapter) {
                await saveProgress(
                    'section1',
                    chapterId,
                    subchapterId,
                    subchapterTitle,
                    newIndex,
                    currentSubchapter.ImageName
                );
            }
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    const completeSubchapterWrapper = async () => {
        await completeSubchapter({
            subchapterId,
            chapterId,
            chapterTitle,
            navigation,
            markSubchapterAsFinished,
            unlockSubchapter,
            origin,
        });
    };

    await moveToNextSlide({
        currentIndex,
        contentData,
        setCurrentIndex,
        maxIndexVisited,
        setMaxIndexVisited,
        saveCurrentProgress,
        showQuiz,
        setShowQuiz,
        completeSubchapter: completeSubchapterWrapper,
    });
};



// FLASHCARDS
// Function to save flashcard progress
// src/utils/progressUtils.ts

export const saveFlashcardProgress = async (
    key: string | number, // Accept string or number
    currentIndex: number
) => {
    try {
        const flashcardProgress = {
            key, 
            currentIndex,
        };
        await AsyncStorage.setItem(`flashcard_progress_${key}`, JSON.stringify(flashcardProgress));
        console.log("Progress saved:", flashcardProgress);
    } catch (error) {
        console.error('Error saving flashcard progress:', error);
    }
};


export const loadFlashcardProgress = async (key: string | number) => {
    try {
        const savedProgress = await AsyncStorage.getItem(`flashcard_progress_${key}`);
        return savedProgress ? JSON.parse(savedProgress) : { key: null, currentIndex: 0 };
    } catch (error) {
        console.error('Error loading flashcard progress:', error);
        return { key: null, currentIndex: 0 }; // Return default values on error
    }
};


