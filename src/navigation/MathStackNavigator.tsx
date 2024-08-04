import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MathScreen from 'src/screens/MathScreen/MathScreen';
import MathTopicContentScreen from 'src/screens/MathScreen/MathTopicContentScreen';
import MathTopicSubchapterScreen from 'src/screens/MathScreen/MathTopicSubchapterScreen';
import { MathStackParamList } from 'src/types/navigationTypes';

const Stack = createStackNavigator<MathStackParamList>();

const MathStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MathScreen" component={MathScreen} />
            <Stack.Screen name="MathTopicContentScreen" component={MathTopicContentScreen} />
            <Stack.Screen name="MathTopicSubchapterScreen" component={MathTopicSubchapterScreen} />
        </Stack.Navigator>
    );
};

export default MathStackNavigator;

