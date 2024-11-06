// src/FlashCard/Flashcard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card';

const Flashcard = ({ question, answer }: { question: string; answer: string }) => {
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

                {/* Back Side - Answer */}
                <View style={styles.back}>
                    <Text style={styles.text}>{answer}</Text>
                </View>
            </FlipCard>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        width: 300,               // Fixed width for the outer container
        height: 400,              // Fixed height for the outer container
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
        width: 300,              // Fixed width for the FlipCard itself
        height: 400,             // Fixed height for the FlipCard itself
    },
    front: {
        width: '100%',            // Ensure front fills the flipCard container
        height: '100%',
        backgroundColor: '#4CAF50', // Green background for the front side
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        width: '100%',            // Ensure back fills the flipCard container
        height: '100%',
        backgroundColor: '#FF7043', // Orange background for the back side
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#2b4450',
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
});

export default Flashcard;

