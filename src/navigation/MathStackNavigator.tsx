import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MathScreen from 'src/screens/MathScreen/MathScreen'; 
import { MathStackParamList } from 'src/types/navigationTypes';

const Stack = createStackNavigator<MathStackParamList>();

const MathStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MathScreen" component={MathScreen} />
        </Stack.Navigator>
    );
};

export default MathStackNavigator;
