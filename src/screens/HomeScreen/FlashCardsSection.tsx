// src/components/FlashcardsSection.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import { scaleFontSize, screenWidth } from 'src/utils/screenDimensions';
import { useTheme } from 'src/context/ThemeContext';

interface FlashcardsSectionProps {
    onButtonPress: (title: string) => void;
    subchapterId: number;
}

const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ onButtonPress, subchapterId }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { theme } = useTheme();

    const handlePress = () => {
        console.log('Navigating to FlashCardsTopicScreen with subchapterId:', subchapterId);
        navigation.navigate('FlashCardsTopicScreen', { subchapterId });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.buttonContainer, { backgroundColor: theme.surface }]}  // Use theme surface color for background
        >
            <View style={styles.textContainer}>
                <Text style={[styles.heading, { color: theme.primaryText }]}>Lernkarten</Text>
                <Text style={[styles.description, { color: theme.secondaryText }]}>
                    Trainiere mit{'\n'}interaktiven Lernkarten
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: screenWidth * 0.90,
        height: screenWidth * 0.35,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        margin: 5,
        overflow: 'hidden',
    },
    textContainer: {
        padding: 20,
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        marginBottom: 8,
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(12),
    },
});

export default FlashcardsSection;


