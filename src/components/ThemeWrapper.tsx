// src/components/ThemeWrapper.tsx

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        console.log("ThemeWrapper - isDarkMode changed:", isDarkMode);
    }, [isDarkMode]);

    return (
        <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkBackground: {
        backgroundColor: '#333', // Dark background color for dark mode
    },
    lightBackground: {
        backgroundColor: '#fff', // Light background color for light mode
    },
});

export default ThemeWrapper;

