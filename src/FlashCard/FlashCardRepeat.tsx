// src/FlashCard/FlashCardRepeat.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Flashcard from './FlashCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFlashcardProgress, saveFlashcardProgress } from 'src/utils/progressUtils';
import { RootStackParamList } from 'src/types/navigationTypes';

type FlashCardRepeatRouteProp = RouteProp<RootStackParamList, 'FlashCardRepeat'>;

const FlashCardRepeat = () => {
    const route = useRoute<FlashCardRepeatRouteProp>();
    const chapterId = route.params?.chapterId ?? 0;
    const [incorrectCards, setIncorrectCards] = useState<{ question: string; answer: string }[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [totalCards, setTotalCards] = useState(0);

    const PROGRESS_KEY = `flashcard_repeat_progress_${chapterId}`;

    // Load incorrect cards and progress
    useEffect(() => {
        const loadIncorrectCards = async () => {
            const key = `incorrect_cards_${chapterId}`;
            const storedCards = await AsyncStorage.getItem(key);
            if (storedCards) {
                const parsedCards = JSON.parse(storedCards);
                setIncorrectCards(parsedCards);
                setTotalCards(parsedCards.length);
                setCurrentCardIndex(0);  // Reset to the start
            }
        };
        loadIncorrectCards();
    }, [chapterId]);

    // Update the markCardAsCorrect function to update the state when the last card is marked correct
    const markCardAsCorrect = async () => {
        const updatedCards = incorrectCards.filter((_, index) => index !== currentCardIndex);

        // Update storage with the new set of incorrect cards
        await AsyncStorage.setItem(`incorrect_cards_${chapterId}`, JSON.stringify(updatedCards));
        console.log("Updated incorrect cards in storage after marking correct:", updatedCards);

        // Update the state with the new list of incorrect cards
        setIncorrectCards(updatedCards);
        setTotalCards(updatedCards.length); 

        // If there are still cards left, move to the next card. Otherwise, reset the index to show the "No more cards" message.
        if (updatedCards.length > 0) {
            setCurrentCardIndex((prevIndex) => Math.min(prevIndex, updatedCards.length - 1));
        } else {
            setCurrentCardIndex(0); // Reset index if no cards are left
        }

        // Optionally, save progress
        await saveFlashcardProgress(PROGRESS_KEY, currentCardIndex);
    };

    const handleNextCard = async () => {
        const nextIndex = currentCardIndex + 1;
        console.log("Advancing to card index:", nextIndex, "out of", incorrectCards.length);
    
        if (nextIndex < incorrectCards.length) {
            setCurrentCardIndex(nextIndex);
            await saveFlashcardProgress(PROGRESS_KEY, nextIndex);
        } else {
            console.log("All cards completed. Ending session.");
        }
    };
    

    const currentCard = incorrectCards[currentCardIndex];

    return (
        <View style={styles.container}>
        <Text style={styles.counterText}>{`${totalCards - currentCardIndex} remaining`}</Text>

            {incorrectCards.length > 0 && currentCard ? (
                <Flashcard
                    key={`${currentCardIndex}-${Date.now()}`}  // Force re-render with a unique key
                    question={currentCard.question}
                    answer={currentCard.answer}
                    onMarkCorrect={markCardAsCorrect}
                    onMarkIncorrect={handleNextCard}
                    isAlternateColor={currentCardIndex % 2 === 1}
                />
            ) : (
                <Text style={styles.loadingText}>No incorrect cards to review.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#f5f5f5',
    },
    counterText: {
        fontSize: 18,
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
});

export default FlashCardRepeat;
