// A sub-navigator dedicated to managing the navigation flow within the specific learning-related content of the app.
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import YearsScreen from 'src/screens/YearsScreen';
import ChaptersScreen from 'src/screens/ChaptersScreen';

export type LearnStackParamList = {
    HomeScreen: undefined;
    YearsScreen: undefined;
    ChaptersScreen: { year: number };
};

const Stack = createStackNavigator<LearnStackParamList>();

const LearnStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="YearsScreen" component={YearsScreen} />
            <Stack.Screen name="ChaptersScreen" component={ChaptersScreen} /> 
        </Stack.Navigator>
    );
};

export default LearnStackNavigator;
