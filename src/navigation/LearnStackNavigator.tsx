// A sub-navigator dedicated to managing the navigation flow within the specific learning-related content of the app.
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import YearsScreen from 'src/screens/YearsScreen';
import ChaptersScreen from 'src/screens/ChaptersScreen';
import SubchaptersScreen from 'src/screens/Subchapters/SubchaptersScreen';
import SubchapterContentScreen from 'src/screens/SubchapterContent/SubchapterContentScreen';
import CongratsScreen from 'src/screens/SubchapterContent/CongratsScreen';
import MathScreen from 'src/screens/MathScreen/MathScreen';
import MathTopicContentScreen from 'src/screens/MathScreen/MathTopicContentScreen';
import { LearnStackParamList } from 'src/types/navigationTypes';

const Stack = createStackNavigator<LearnStackParamList>();

const LearnStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="YearsScreen" component={YearsScreen} />
            <Stack.Screen name="ChaptersScreen" component={ChaptersScreen} />
            <Stack.Screen
                name="SubchaptersScreen"
                component={SubchaptersScreen}
                options={{ title: 'Subchapters' }}
            />
            <Stack.Screen
                name="SubchapterContentScreen"
                component={SubchapterContentScreen}
                options={{ title: 'Subchapter Content' }}
            />
            <Stack.Screen
                name="CongratsScreen"
                component={CongratsScreen}
                options={{ title: 'Congratulations' }} // Add CongratsScreen to the stack
            />
            <Stack.Screen
                name="MathScreen"
                component={MathScreen}
                options={{ title: 'Mathe Grundkurs' }}
            />
            <Stack.Screen
                name="MathTopicContentScreen"
                component={MathTopicContentScreen}
                options={{ title: 'Math Topic Content' }}
            />
        </Stack.Navigator>
    );
};

export default LearnStackNavigator;
