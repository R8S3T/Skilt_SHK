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
                setTotalCards(parsedCards.length); // Initialize with the total count
                setCurrentCardIndex(0);  // Reset to the start
                console.log("Loaded cards:", parsedCards.length);
            }
        };
        loadIncorrectCards();
    }, [chapterId]);

    const handleNextCard = async () => {
        const updatedCards = incorrectCards.filter((_, index) => index !== currentCardIndex);

        // Update storage with the new set of incorrect cards
        await AsyncStorage.setItem(`incorrect_cards_${chapterId}`, JSON.stringify(updatedCards));
        setIncorrectCards(updatedCards);

        // Update totalCards based on remaining incorrect cards
        setTotalCards(updatedCards.length);

        // Move to the next card if any are left
        if (updatedCards.length > 0) {
            setCurrentCardIndex((prevIndex) => Math.min(prevIndex, updatedCards.length - 1));
        } else {
            setCurrentCardIndex(0);
        }

        // Save progress
        await saveFlashcardProgress(PROGRESS_KEY, currentCardIndex);
    };

    const currentCard = incorrectCards[currentCardIndex];

    // FlashCardRepeat.tsx - Updated return statement for correct countdown
    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>{`${totalCards - currentCardIndex} remaining`}</Text> 

            {incorrectCards.length > 0 && currentCard ? (
                <Flashcard
                    key={`${currentCardIndex}-${Date.now()}`}
                    question={currentCard.question}
                    answer={currentCard.answer}
                    onNext={handleNextCard}  // Pass only "Weiter" button in repeat mode
                    isAlternateColor={currentCardIndex % 2 === 1}
                    isRepeatMode={true}  // Enable repeat mode for FlashCardRepeat
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
