import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import SettingsScreen from 'src/screens/SettingsScreen';
import SearchScreen from 'src/screens/SearchScreen';  // Import the SearchScreen

type IconName = 'book' | 'book-outline' | 'settings' | 'settings-outline' | 'search' | 'search-outline';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#e8630a',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: IconName = 'book-outline'; // Default icon

                    if (route.name === 'Home') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Search') {  // Add search icon condition
                        iconName = focused ? 'search' : 'search-outline';
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
                name="Search"  // Add search screen
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search'
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

