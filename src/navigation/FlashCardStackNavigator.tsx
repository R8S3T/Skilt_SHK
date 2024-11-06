// src/navigation/FlashCardStackNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlashCardStackParamList } from 'src/types/navigationTypes';
import FlashCardChoice from 'src/FlashCard/FlashCardChoice';
import FlashCardChapters from 'src/FlashCard/FlashCardChapters';
import FlashcardScreen from 'src/FlashCard/FlashcardScreen';
import FlashCardRepeat from 'src/FlashCard/FlashCardRepeat';
import { IncorrectCardProvider } from 'src/context/IncorrectCardContext';

const Stack = createStackNavigator<FlashCardStackParamList>();

const FlashCardStackNavigator: React.FC = () => (
    <IncorrectCardProvider>
        <Stack.Navigator>
            <Stack.Screen
                name="FlashCardChoice"
                component={FlashCardChoice}
                options={{ title: 'Flash Card Choices', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name="FlashCardChapters"
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
        </Stack.Navigator>
    </IncorrectCardProvider>
);

export default FlashCardStackNavigator;
