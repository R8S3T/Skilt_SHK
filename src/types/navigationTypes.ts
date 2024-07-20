import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeParamList = {
    Home: {
        username: string;
    };
};

export type BottomTabParamList = {
    Home: {
        username: string;
    };
    Settings: undefined;
};

export type LearnStackParamList = {
    HomeScreen: undefined;
    YearsScreen: undefined;
    ChaptersScreen: { year: string };
    SubchaptersScreen: { chapterId: number; chapterTitle: string };
    SubchapterContentScreen: {
        subchapterId: number; 
        subchapterTitle: string; 
        chapterId: number;
        chapterTitle: string;
    };
    CongratsScreen: {
        subchapterId: number | null;
        subchapterTitle: string;
        chapterId: number;
        chapterTitle: string;
    };
    MathScreen: undefined;
};

export type MathStackParamList = {
    MathScreen: undefined;
};

// A TypeScript type that defines all possible navigation paths and parameters in AppNavigator, ensuring that navigation across the entire app is type-safe and well-organized.

export type RootStackParamList = {
    Intro: undefined;
    HomeScreen: NavigatorScreenParams<BottomTabParamList>;
    Learn: NavigatorScreenParams<LearnStackParamList>;
    Math: NavigatorScreenParams<MathStackParamList>;
};