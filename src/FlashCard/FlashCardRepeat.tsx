// src/FlashCard/FlashCardRepeat.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from './FlashCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INCORRECT_CARDS_KEY = 'incorrect_cards';

const FlashCardRepeat = () => {
    const [incorrectCards, setIncorrectCards] = useState<{ question: string; answer: string }[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    // Load incorrect cards from AsyncStorage
    useEffect(() => {
        const loadIncorrectCards = async () => {
            try {
                const storedCards = await AsyncStorage.getItem(INCORRECT_CARDS_KEY);
                if (storedCards) {
                    setIncorrectCards(JSON.parse(storedCards));
                }
            } catch (error) {
                console.error('Failed to load incorrect cards:', error);
            }
        };

        loadIncorrectCards();
    }, []);

    // Handler to navigate to the next card
    const handleNextCard = () => {
        if (currentCardIndex < incorrectCards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    // Optional: Remove card from list if marked correct this time
    const markCardAsCorrect = async () => {
        const updatedCards = incorrectCards.filter((_, index) => index !== currentCardIndex);
        setIncorrectCards(updatedCards);

        try {
            await AsyncStorage.setItem(INCORRECT_CARDS_KEY, JSON.stringify(updatedCards));
        } catch (error) {
            console.error('Failed to update incorrect cards in storage:', error);
        }
        
        handleNextCard();
    };

    const markCardAsIncorrect = () => {
        handleNextCard();
    };

    // Ensure the current card exists before rendering the Flashcard component
    const currentCard = incorrectCards[currentCardIndex];

    return (
        <View style={styles.container}>
            {incorrectCards.length > 0 && currentCard ? (
                <>
                    <Flashcard
                        key={currentCardIndex}
                        question={currentCard.question}
                        answer={currentCard.answer}
                        onMarkCorrect={markCardAsCorrect}
                        onMarkIncorrect={markCardAsIncorrect}
                    />
                    {currentCardIndex < incorrectCards.length - 1 ? (
                        <View style={styles.nextButtonContainer}>
                            <Button title="Next" onPress={handleNextCard} />
                        </View>
                    ) : (
                        <Text style={styles.noMoreCardsText}>No more incorrect cards</Text>
                    )}
                </>
            ) : (
                <Text style={styles.loadingText}>No incorrect cards to review.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 150,
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
    noMoreCardsText: {
        fontSize: 16,
        color: '#333',
        marginTop: 20,
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
});

export default FlashCardRepeat;
