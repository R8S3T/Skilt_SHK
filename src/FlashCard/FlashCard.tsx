import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { scaleFontSize } from 'src/utils/screenDimensions';

const Flashcard = ({ question, answer, onMarkCorrect, onMarkIncorrect, isAlternateColor }: { 
    question: string; 
    answer: string; 
    onMarkCorrect: () => void;
    onMarkIncorrect: () => void;
    isAlternateColor: boolean;
}) => {
    return (
        <View style={styles.cardWrapper}>
            <FlipCard
                style={styles.flipCard}
                flipHorizontal
                flipVertical={false}
                clickable
            >
                <View style={[styles.front, isAlternateColor ? styles.alternateBorder : styles.defaultBorder]}>
                    <Text style={styles.questionText}>{question}</Text>
                </View>

                <View style={[styles.back, isAlternateColor ? styles.alternateBack : styles.defaultBack]}>
                    <View style={styles.answerBox}>
                        <Text style={styles.answerText}>{answer}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.incorrectButton} onPress={onMarkIncorrect}>
                            <Text style={styles.buttonText}>Wusste ich nicht</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.correctButton} onPress={onMarkCorrect}>
                            <Text style={styles.buttonText}>Gewusst</Text>
                        </TouchableOpacity>
                    </View>
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
        color: '#333',
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
        backgroundColor: '#ffffff',
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
        color: '#333',
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
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Flashcard;
