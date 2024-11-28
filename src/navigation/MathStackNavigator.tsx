import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MathChapterScreen from 'src/screens/MathScreen/MathChapterScreen';
import MathSubchapterContentScreen from 'src/screens/MathScreen/MathSubchapterContentScreen';
import MathSubchapterScreen from 'src/screens/MathScreen/MathSubchapterScreen';
import MathCongratsScreen from 'src/screens/MathScreen/MathCongratsScreen';
import { MathStackParamList } from 'src/types/navigationTypes';

const Stack = createStackNavigator<MathStackParamList>();

const MathStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: '600',
                },
            }}
        >
            <Stack.Screen 
                name="MathChapterScreen" 
                component={MathChapterScreen}
                options={{ 
                    title: 'Start',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        paddingLeft: -20, // Adjust this value as needed
                        fontWeight: '600',
                    },
                }}
            />
            <Stack.Screen
                name="MathSubchapterScreen"
                component={MathSubchapterScreen}
                options={{
                    title: 'Module',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontWeight: '600',
                        paddingLeft: -20, // Adjust this as needed to position closer to the arrow
                    },
                }}
            />
            <Stack.Screen
                name="MathSubchapterContentScreen"
                component={MathSubchapterContentScreen}
                options={{ title: 'Math Content' }}
            />
            <Stack.Screen
                name="MathCongratsScreen"
                component={MathCongratsScreen}
                options={{ title: 'Congratulations' }}
            />
        </Stack.Navigator>
    );
};

export default MathStackNavigator;


