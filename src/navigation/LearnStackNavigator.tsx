// A sub-navigator dedicated to managing the navigation flow within the specific learning-related content of the app.

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import YearsScreen from 'src/screens/YearsScreen';
import ChaptersScreen from 'src/screens/Chapters/ChaptersScreen';
import SubchaptersScreen from 'src/screens/Chapters/SubchaptersScreen';
import SubchapterContentScreen from 'src/screens/Chapters/SubchapterContentScreen';
import CongratsScreen from 'src/screens/Chapters/CongratsScreen';
import { LearnStackParamList } from 'src/types/navigationTypes';

const Stack = createStackNavigator<LearnStackParamList>();

const LearnStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen}
            />
            <Stack.Screen
                name="YearsScreen"
                component={YearsScreen}
                options={{
                    title: 'Wähle dein Lehrjahr',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600', // Slightly bolder
                    },
                }}
            />
            <Stack.Screen
                name="ChaptersScreen"
                component={ChaptersScreen}
                options={({ route }) => ({
                    title: `${route.params.year}. Lehrjahr`,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600', // Slightly bolder
                    },
                })}
            />
                        <Stack.Screen
                name="SubchaptersScreen" // Add SubchaptersScreen here
                component={SubchaptersScreen}
                options={({ route }) => ({
                    title: route.params.chapterTitle,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600',
                    },
                })}
            />
            <Stack.Screen
                name="SubchapterContentScreen"
                component={SubchapterContentScreen}
                options={{ 
                    title: 'Subchapter Content',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600', // Slightly bolder
                    },
                }}
            />
            <Stack.Screen
                name="CongratsScreen"
                component={CongratsScreen}
                options={{ 
                    title: 'Congratulations',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600', // Slightly bolder
                    },
                }}
            />
        </Stack.Navigator>
    );
};

export default LearnStackNavigator;

