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
        targetScreen: keyof LearnStackParamList | keyof MathStackParamList;
        targetParams: { chapterId: number; chapterTitle: string };
    };
};

export type MathStackParamList = {
    MathChapterScreen: undefined;
    MathSubchapterContentScreen: { subchapterId: number; subchapterTitle: string; chapterId: number; chapterTitle: string };
    MathSubchapterScreen: { chapterId: number; chapterTitle: string };
    MathCongratsScreen: {
        subchapterId: number;
        targetScreen: keyof MathStackParamList;
        targetParams: { chapterId: number; chapterTitle: string };
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
        targetParams: { chapterId: number; chapterTitle: string };
    };
    FlashCardsScreen: undefined;
    FlashCardsRandom: undefined;
    FlashCardsOrganised: undefined;
};

