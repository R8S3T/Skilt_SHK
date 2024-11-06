// src/FlashCard/Flashcard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';

const Flashcard = ({ question, answer, onMarkCorrect, onMarkIncorrect }: { 
    question: string; 
    answer: string; 
    onMarkCorrect: () => void;
    onMarkIncorrect: () => void;
}) => {
    return (
        <View style={styles.cardWrapper}>
            <FlipCard
                style={styles.flipCard}
                flipHorizontal
                flipVertical={false}
                clickable
            >
                {/* Front Side - Question */}
                <View style={styles.front}>
                    <Text style={styles.text}>{question}</Text>
                </View>

                {/* Back Side - Answer with Correct/Incorrect Buttons */}
                <View style={styles.back}>
                    <Text style={styles.text}>{answer}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.correctButton} onPress={onMarkCorrect}>
                            <Text style={styles.buttonText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.incorrectButton} onPress={onMarkIncorrect}>
                            <Text style={styles.buttonText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </FlipCard>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        width: 300,
        height: 400,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipCard: {
        width: 300,
        height: 400,
    },
    front: {
        width: '100%',
        height: '100%',
        backgroundColor: '#5585b5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF7043',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    correctButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    incorrectButton: {
        backgroundColor: '#FF7043',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Flashcard;


