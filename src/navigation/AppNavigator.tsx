import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';
import IntroScreen from '../screens/IntroScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LearnStackNavigator from './LearnStackNavigator';
import MathStackNavigator from './MathStackNavigator';
import { SubchapterProvider } from 'src/screens/Chapters/SubchapterContext';
import { MathSubchapterProvider } from 'src/screens/MathScreen/MathSubchapterContext';
import FlashCardsTopicScreen from 'src/screens/FlashCards/FlashCardsTopicScreen';
import FlashCardScreen from 'src/screens/FlashCards/FlashCardScreen';
FlashCardScreen

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    const shouldShowLearnStack = true;

    return (
        <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen
                name="Intro"
                component={IntroScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Learn"
                options={{ headerShown: false }}
            >
                {() => (
                    <SubchapterProvider>
                        <LearnStackNavigator />
                    </SubchapterProvider>
                )}
            </Stack.Screen>
            <Stack.Screen
                name="Math"
                options={{ headerShown: false }}
            >
                {() => (
                    <MathSubchapterProvider>
                        <MathStackNavigator />
                    </MathSubchapterProvider>
                )}
            </Stack.Screen>
            <Stack.Screen
                name="FlashCardsTopicScreen"
                component={FlashCardsTopicScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FlashCardScreen"
                component={FlashCardScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
