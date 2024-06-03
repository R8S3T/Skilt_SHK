import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import SettingsScreen from 'src/screens/SettingsScreen';

type IconName = 'book' | 'book-outline' | 'settings' | 'settings-outline';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#e8630a',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused, color, size }) => {
                    // Initialize iconName with a default value
                    let iconName: IconName = 'book-outline'; // Default icon
                    if (route.name === 'Home') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home'
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings'
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
