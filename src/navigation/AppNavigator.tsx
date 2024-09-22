import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';
import IntroScreen from '../screens/IntroScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LearnStackNavigator from './LearnStackNavigator';
import MathStackNavigator from './MathStackNavigator';
import FlashCardsScreen from 'src/screens/FlashCards/FlashCardsScreen';
import FlashCardsOrganised from 'src/screens/FlashCards/FlashCardsOrganised';
import FlashCardsRandom from 'src/screens/FlashCards/FlashCardsRandom';
import { SubchapterProvider } from 'src/screens/Chapters/SubchapterContext';
import { MathSubchapterProvider } from 'src/screens/MathScreen/MathSubchapterContext';

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
                name="FlashCardsScreen"
                component={FlashCardsScreen}
                options={{ headerShown: true, title: 'Lernkarten' }}
            />
            <Stack.Screen
                name="FlashCardsRandom"
                component={FlashCardsRandom}
                options={{ headerShown: true, title: 'Zufällige Karten' }}
            />
            <Stack.Screen
                name="FlashCardsOrganised"
                component={FlashCardsOrganised}
                options={{ headerShown: true, title: 'Lernkarten nach Lernfeldern' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
