import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import { useTheme } from 'src/context/ThemeContext';

const FlashCardChoice = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { isDarkMode, theme } = useTheme();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Flashcard Choices', // Title for the header
            headerStyle: {
                backgroundColor: theme.background, // Use theme background color
            },
            headerTitleStyle: {
                color: theme.primaryText,
                fontSize: 20,
                fontWeight: 'normal',
            },
            headerTitleAlign: 'left', // Align the header title to the left
            headerTintColor: theme.primaryText,
        });
    }, [navigation, theme]);

    const handleFieldCardsPress = () => {
        console.log('Karten nach Lernfeldern pressed');
        navigation.navigate('FlashCardChapters');
    };

    const handleRepeatCardsPress = () => {
        console.log('Lernkarte wiederholen pressed');
        navigation.navigate('FlashCardRepeat');  // Navigate to FlashCardRepeat
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header Title */}
            <Text style={[styles.headerTitle, { color: theme.primaryText }]}>Flashcard Choices</Text>

            {/* Buttons */}
            <TouchableOpacity style={styles.button} onPress={handleFieldCardsPress}>
                <Text style={styles.buttonText}>Karten nach Lernfeldern</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRepeatCardsPress}>
                <Text style={styles.buttonText}>Lernkarte wiederholen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        zIndex: 1,
    },
    button: {
        backgroundColor: 'transparent', // Set background color to transparent
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: '#a2a8d3', // Set border color
        alignItems: 'center',
        width: '80%', // Set width for buttons
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#a2a8d3', // Set text color to match the border
        fontSize: 18,
        textAlign: 'center',
    },
});

export default FlashCardChoice;
