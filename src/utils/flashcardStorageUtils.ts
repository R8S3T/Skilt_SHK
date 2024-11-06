// src/utils/flashcardStorageUtils.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const INCORRECT_CARDS_KEY = 'incorrect_cards';

// Function to add an incorrect card to AsyncStorage
export const addIncorrectCardToStorage = async (card: { question: string; answer: string }) => {
    try {
        const storedCards = await AsyncStorage.getItem(INCORRECT_CARDS_KEY);
        const incorrectCards = storedCards ? JSON.parse(storedCards) : [];

        // Check if the card already exists to avoid duplicates
        const exists = incorrectCards.some(
            (savedCard: { question: string; answer: string }) =>
                savedCard.question === card.question && savedCard.answer === card.answer
        );

        if (!exists) {
            incorrectCards.push(card);
            await AsyncStorage.setItem(INCORRECT_CARDS_KEY, JSON.stringify(incorrectCards));
        }
    } catch (error) {
        console.error('Error adding incorrect card to storage:', error);
    }
};
