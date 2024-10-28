import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

// Function to save progress (updated to save subchapterId and currentIndex)
export const saveProgress = async (sectionKey: string, chapterId: number, subchapterId: number, currentIndex: number) => {
    try {
        const progressData = {
            chapterId,
            subchapterId,
            currentIndex,
        };
        await AsyncStorage.setItem(`progress_${sectionKey}`, JSON.stringify(progressData));
    } catch (e) {
        console.error('Error saving progress.', e);
    }
};


// Function to load progress
export const loadProgress = async (sectionKey: string) => {
    try {
        const savedProgress = await AsyncStorage.getItem(`progress_${sectionKey}`);
        return savedProgress ? JSON.parse(savedProgress) : { subchapterId: null, currentIndex: null };
    } catch (e) {
        console.error('Error loading progress.', e);
        return { subchapterId: null, currentIndex: null };
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
export const handleExit = async (chapterId: number, subchapterId: number, currentIndex: number, navigation: NavigationProp<any>) => {
    try {
        // Use the correct `currentIndex` instead of `newIndex`
        await saveProgress('section1', chapterId, subchapterId, currentIndex); // Save progress when moving to next slide

        navigation.navigate('HomeScreen'); // Navigate back to Home Screen
    } catch (error) {
        console.error('Error handling exit:', error);
    }
};



