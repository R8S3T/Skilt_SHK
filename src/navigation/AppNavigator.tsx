//The main navigator that handles the top-level routing throughout the app
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';
import IntroScreen from '../screens/IntroScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LearnStackNavigator from './LearnStackNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    //Flag to control the visibility of the LearnStackNavigator based on certain conditions, such as user role, feature availability, or testing status.
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
                component={LearnStackNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;