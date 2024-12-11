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
    imageName: string | null
) => {
    try {
        const progressData = {
            chapterId,
            subchapterId,
            subchapterName,
            currentIndex,
            imageName,
        };

        // Log the input parameters and data being saved
        console.log('saveProgress called with:', {
            sectionKey,
            chapterId,
            subchapterId,
            subchapterName,
            currentIndex,
            imageName,
        });

        await AsyncStorage.setItem(`progress_${sectionKey}`, JSON.stringify(progressData));

        // Confirm the data was successfully saved
        const savedProgress = await AsyncStorage.getItem(`progress_${sectionKey}`);
        console.log('Progress saved in AsyncStorage:', savedProgress);
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
    setMaxIndexVisited: (index: number | ((prev: number) => number)) => void; // Updated type

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
    setShowQuiz,
    completeSubchapter,
    
}: {
    currentIndex: number;
    contentData: any[];
    setCurrentIndex: (index: number) => void;
    maxIndexVisited: number;
    setMaxIndexVisited: (index: number | ((prev: number) => number)) => void;
    saveCurrentProgress: (index: number) => Promise<void>;
    showQuiz: boolean;
    setShowQuiz: (show: boolean) => void;
    completeSubchapter: () => Promise<void>;
}) => {
    console.log("moveToNextSlide called. Current index:", currentIndex);
    console.log(
        "moveToNextSlide:",
        "currentIndex:",
        currentIndex,
        "maxIndexVisited:",
        maxIndexVisited,
        "contentData.length:",
        contentData.length
    );
    const isLastSlide = currentIndex === contentData.length - 1;

    if (!isLastSlide) {
        const newIndex = currentIndex + 1;
        const nextContent = contentData[newIndex];
    
        if (!nextContent) {
            console.warn("No content available for the next slide. Skipping update.");

            return;
        }
    
        if ('QuizId' in nextContent) {
            setShowQuiz(true); // Enter quiz mode
        } else if ('ContentId' in nextContent) {
            setShowQuiz(false); // Exit quiz mode
            setCurrentIndex(newIndex);
            setMaxIndexVisited((prev) => {
                const updatedValue = Math.max(prev, currentIndex + 1);
                return updatedValue;
            });
            await saveCurrentProgress(newIndex);
        } else {
            console.error("Unrecognized content type. Skipping.");
        }
    } else {
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
            await completeSubchapter();
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

    let nextSubchapterData = subchapters.find(
        sub => sub.SortOrder === (currentSubchapterData?.SortOrder ?? 0) + 1
    );

    if (!nextSubchapterData) {
        const nextChapterId = chapterId + 1;
        const nextChapterSubchapters = await fetchSubchaptersByChapterId(nextChapterId);
        nextSubchapterData = nextChapterSubchapters.sort((a, b) => a.SortOrder - b.SortOrder)[0];
    }

        // Case 2: ResumeSection - navigate back to HomeScreen but prepare ResumeSection for next content
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
            targetParams: { 
                chapterId,
                chapterTitle,
                origin: 'ResumeSection'
            },
        });
        return;
    }
    // Case 1: If origin is SearchScreen, navigate to SearchEndScreen
    if (origin === 'SearchScreen') {
        (navigation as unknown as NavigationProp<RootStackParamList>).navigate('SearchEndScreen');
        return; // Ensure no further navigation occurs
    }


    // Case 3: Section1 - navigate back to SubchaptersScreen after CongratsScreen
    navigation.navigate('CongratsScreen', {
        targetScreen: 'SubchaptersScreen',
        targetParams: {
            chapterId,
            chapterTitle,
            origin: 'SubchapterComplete',
        },
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
    
            const imageName = currentSubchapter?.ImageName || null; // Fetch imageName
            if (currentSubchapter) {
                await saveProgress(
                    'section1',
                    chapterId,
                    subchapterId,
                    subchapterTitle,
                    newIndex,
                    imageName // Include imageName here
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


