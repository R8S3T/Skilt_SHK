import { NavigatorScreenParams } from "@react-navigation/native";
import { LearnStackParamList } from "src/navigation/LearnStackNavigator";

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


// A TypeScript type that defines all possible navigation paths and parameters in AppNavigator, ensuring that navigation across the entire app is type-safe and well-organized.

export type RootStackParamList = {
    Intro: undefined;
    HomeScreen: NavigatorScreenParams<BottomTabParamList>;
    Learn: NavigatorScreenParams<LearnStackParamList>;
};