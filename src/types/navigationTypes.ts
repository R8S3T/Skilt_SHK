import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeParamList = {
    Home: { username: string };
};

export type BottomTabParamList = {
    Home: { username: string };
    Settings: undefined;
};

export type LearnStackParamList = {
    HomeScreen: undefined;
    YearsScreen: {
        chapterId?: number;
        chapterTitle?: string;
        subchapterId?: number;
        subchapterTitle?: string;
    };
    ChaptersScreen: { year: string };
    SubchaptersScreen: { chapterId: number; chapterTitle?: string };
    SubchapterContentScreen: {
        subchapterId: number;
        subchapterTitle: string;
        chapterId?: number;
        chapterTitle?: string;
        contentId?: number;
        onCompletion?: () => void;
        origin?: string;
        previousScreen?: string;
    };
    CongratsScreen: {
        targetScreen: keyof LearnStackParamList | keyof MathStackParamList;
        targetParams: { 
            chapterId: number; 
            chapterTitle: string; 
            origin?: string;  // Ensure origin is defined as optional
            previousScreen?: string; 
        };
    };
};

export type MathStackParamList = {
    MathChapterScreen: undefined;
    MathSubchapterScreen: {
        chapterId: number;
        chapterTitle: string;
        origin?: string;
    };
    MathSubchapterContentScreen: {
        subchapterId: number;
        subchapterTitle: string;
        chapterId: number;
        chapterTitle: string;
        origin?: string;
    };
    MathCongratsScreen: {
        subchapterId: number;
        targetScreen: keyof MathStackParamList;
        targetParams: {
            chapterId: number;
            chapterTitle: string;
            origin?: string;
        };
    };
};

// A TypeScript type that defines all possible navigation paths and parameters in AppNavigator, ensuring that navigation across the entire app is type-safe and well-organized.

export type RootStackParamList = {
    Intro: undefined;
    HomeScreen: NavigatorScreenParams<BottomTabParamList>;
    Learn: NavigatorScreenParams<LearnStackParamList>;
    Math: NavigatorScreenParams<MathStackParamList>;
    CongratsScreen: {
        targetScreen: keyof RootStackParamList;
        targetParams: { 
            chapterId: number; 
            chapterTitle: string; 
            origin?: string;
            previousScreen?: string;
        };
    };
    FlashCardChoice: undefined;
    FlashCardChapters: undefined;
    FlashcardScreen: {
        chapterId: number;
        chapterTitle?: string;
    };
    PrivacyPolicyScreen: undefined;
};


