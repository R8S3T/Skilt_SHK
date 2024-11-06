// src/FlashCard/Flashcard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card';

const Flashcard = ({ question, answer }: { question: string; answer: string }) => {
    return (
        <View style={styles.container}>
            <FlipCard flipHorizontal flipVertical={false} clickable>
                {/* Front Side - Question */}
                <View style={styles.face}>
                    <Text style={styles.text}>{question}</Text>
                </View>

                {/* Back Side - Answer */}
                <View style={styles.back}>
                    <Text style={styles.text}>{answer}</Text>
                </View>
            </FlipCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'center',
    },
    face: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 8,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF7043',
        padding: 20,
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Flashcard;
