import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { scaleFontSize } from 'src/utils/screenDimensions';
import { useTheme } from 'src/context/ThemeContext';
import { lightenColor } from 'src/components/theme';

const Flashcard = ({
    question,
    answer,
    onMarkCorrect,
    onMarkIncorrect,
    onNext,
    isAlternateColor,
    isRepeatMode = false,
}: {
    question: string;
    answer: string;
    onMarkCorrect?: () => void;
    onMarkIncorrect?: () => void;
    onNext?: () => void;
    isAlternateColor: boolean;
    isRepeatMode?: boolean;
}) => {
    const { theme, isDarkMode } = useTheme(); // Explicitly get isDarkMode from ThemeContext

    // Create a slightly lighter background color for dark mode
    const lighterSurface = lightenColor(theme.surface, 10);

    return (
        <View style={styles.cardWrapper}>
            <FlipCard
                style={styles.flipCard}
                flipHorizontal
                flipVertical={false}
                clickable
            >
                {/* Front side of the card */}
                <View
                    style={[
                        styles.front,
                        isAlternateColor
                            ? { borderColor: isDarkMode ? '#525C6B' : styles.alternateBorder.borderColor } // Dark mode: muted grayish-blue, light mode: original alternate color
                            : { borderColor: isDarkMode ? '#3E4653' : styles.defaultBorder.borderColor }, // Dark mode: subtle dark gray, light mode: original default color
                    ]}
                >
                    <Text style={[styles.questionText, { color: theme.primaryText }]}>
                        {question}
                    </Text>
                </View>
    
                {/* Back side of the card */}
                <View
                    style={[
                        styles.back,
                        isAlternateColor
                            ? { backgroundColor: isDarkMode ? '#636F81' : styles.alternateBack.backgroundColor } // Dark mode: lighter blue-gray, light mode: original alternate back color
                            : { backgroundColor: isDarkMode ? '#454D5A' : styles.defaultBack.backgroundColor }, // Dark mode: soft gray, light mode: original default back color
                    ]}
                >
                    <View
                        style={[
                            styles.answerBox,
                            { backgroundColor: isDarkMode ? theme.surface : '#ffffff' },
                        ]}
                    >
                        <Text style={[styles.answerText, { color: theme.secondaryText }]}>
                            {answer}
                        </Text>
                    </View>
    
                    {isRepeatMode ? (
                        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                            <Text style={styles.buttonText}>Weiter</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.incorrectButton,
                                    { backgroundColor: isDarkMode ? '#B55454' : '#e46161' }, // Muted red for dark mode
                                ]}
                                onPress={onMarkIncorrect}
                            >
                                <Text style={styles.buttonText}>Wusste ich nicht</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.correctButton,
                                    { backgroundColor: isDarkMode ? '#5cb85c' : '#118a7e' }, // Muted green for dark mode
                                ]}
                                onPress={onMarkCorrect}
                            >
                                <Text style={styles.buttonText}>Gewusst</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </FlipCard>
        </View>
    );
    
};

const styles = StyleSheet.create({
    cardWrapper: {
        width: 350,
        height: 480,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipCard: {
        width: 350,
        height: 480,
    },
    front: {
        width: '100%',
        height: '100%',
        borderWidth: 18,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    defaultBorder: {
        borderColor: '#85a6b1',
    },
    alternateBorder: {
        borderColor: '#77628c',
    },
    back: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultBack: {
        backgroundColor: '#85a6b1',
    },
    alternateBack: {
        backgroundColor: '#77628c',
    },
    questionText: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        textAlign: 'center',
        paddingHorizontal: 10,
        lineHeight: 30,
    },
    answerBox: {
        width: '90%',
        height: '65%',
        borderRadius: 10,
        backgroundColor: '#ffffff', // Original light mode color
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginBottom: 30,
    },
    answerText: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: scaleFontSize(14),
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
    },
    incorrectButton: {
        backgroundColor: '#e46161',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    correctButton: {
        backgroundColor: '#118a7e',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    nextButton: {  // Add this style for the "Weiter" button
        backgroundColor: '#343A40',
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Flashcard;
