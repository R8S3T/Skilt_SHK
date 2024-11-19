import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import SettingsScreen from 'src/screens/Settings Screen/SettingsScreen';
import SearchScreen from 'src/screens/Search/SearchScreen';

type IconName = 'book' | 'book-outline' | 'settings' | 'settings-outline' | 'search' | 'search-outline';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#e8630a',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: IconName = 'book-outline';

                    if (route.name === 'Home') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Start',
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Suche',
                    headerTitleAlign: 'center', // Center-align the title if needed for consistency
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Einstellungen',
                    headerTitleAlign: 'center',
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;


