import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { fetchSubchaptersByChapterId } from 'src/database/databaseServices';


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
        
        console.log("Loaded Progress Data:", parsedProgress); // Fügen Sie dies hinzu, um den gespeicherten Fortschritt zu prüfen.
        
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