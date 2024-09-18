import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MathChapterScreen from 'src/screens/MathScreen/MathChapterScreen';
import MathSubchapterContentScreen from 'src/screens/MathScreen/MathSubchapterContentScreen';
import MathSubchapterScreen from 'src/screens/MathScreen/MathSubchapterScreen';
import { MathStackParamList } from 'src/types/navigationTypes';
import MathCongratsScreen from 'src/screens/MathScreen/MathCongratsScreen';

const Stack = createStackNavigator<MathStackParamList>();

const MathStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MathChapterScreen" component={MathChapterScreen} />
            <Stack.Screen name="MathSubchapterScreen" component={MathSubchapterScreen} />
            <Stack.Screen name="MathSubchapterContentScreen" component={MathSubchapterContentScreen} />
            <Stack.Screen name="MathCongratsScreen" component={MathCongratsScreen} />
        </Stack.Navigator>
    );
};

export default MathStackNavigator;


