// src/navigation/AppNavigator.tsx

import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';
import IntroScreen from '../screens/IntroScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LearnStackNavigator from './LearnStackNavigator';
import MathStackNavigator from './MathStackNavigator';
import { SubchapterProvider } from 'src/context/SubchapterContext';
import { MathSubchapterProvider } from 'src/context/MathSubchapterContext';
import PrivacyPolicyScreen from 'src/screens/Settings Screen/PrivacyPolicyScreen';
import FlashCardChoice from 'src/FlashCard/FlashCardChoice';
import FlashCardChapters from 'src/FlashCard/FlashCardChapters';
import FlashcardScreen from 'src/FlashCard/FlashcardScreen';
import FlashCardRepeat from 'src/FlashCard/FlashCardRepeat';
import { hasCompletedOnboarding } from 'src/utils/onBoardingUtils';
import SplashScreen from 'src/screens/SplashScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
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
                name="FlashCardChoice" // Add this line
                component={FlashCardChoice} // Set the component
                options={{ title: 'Flash Card Choices', headerTitleAlign: 'center' }} // Optional: Customize the header
            />
            <Stack.Screen
                name="FlashCardChapters" // Register the new screen
                component={FlashCardChapters}
                options={{ title: 'Flashcard Chapters', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name="FlashcardScreen"
                component={FlashcardScreen}
                options={{ title: 'Flashcard', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name="FlashCardRepeat"
                component={FlashCardRepeat}
                options={{ title: 'Flashcard Repeat', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name="PrivacyPolicyScreen"
                component={PrivacyPolicyScreen}
                options={{ title: 'Datenschutzerklärung', headerTitleAlign: 'center' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
