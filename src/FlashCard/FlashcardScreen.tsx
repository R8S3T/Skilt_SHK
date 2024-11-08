import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Flashcard from './FlashCard';
import { fetchFlashcardsForChapter } from 'src/database/databaseServices';
import { NavigationProp, RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { loadFlashcardProgress, saveFlashcardProgress } from 'src/utils/progressUtils';

const INCORRECT_CARDS_KEY = 'incorrect_cards';

type FlashcardScreenRouteProp = RouteProp<RootStackParamList, 'FlashcardScreen'>;

const FlashcardScreen = () => {
    const route = useRoute<FlashcardScreenRouteProp>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { chapterId } = route.params;
    const [flashcards, setFlashcards] = useState<{ Question: string; Answer: string }[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [totalFlashcards, setTotalFlashcards] = useState(0);
    const [totalCards, setTotalCards] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#ffffff',
            },
            headerTitleAlign: 'center',
        });
    }, [navigation]);

    // Load flashcard progress
    useEffect(() => {
        const getFlashcards = async () => {
            const cards = await fetchFlashcardsForChapter(chapterId);
            setFlashcards(cards);
            setTotalCards(cards.length); // Update total cards here
        };
        getFlashcards();
    }, [chapterId]);

    // handleNextCard to save the current index
    const handleNextCard = () => {
        const newIndex = currentCardIndex + 1;
        setCurrentCardIndex(newIndex);

        // Save the current index after moving to the next card
        saveFlashcardProgress(chapterId, newIndex);
    };

    useEffect(() => {
        const loadProgress = async () => {
            const progress = await loadFlashcardProgress(chapterId);
            setCurrentCardIndex(progress.currentIndex || 0);
            const cards = await fetchFlashcardsForChapter(chapterId);
            setFlashcards(cards);
            setTotalCards(cards.length);
        };
        loadProgress();
    }, [chapterId]);

    const markCardAsCorrect = async () => {
        await saveFlashcardProgress(chapterId, currentCardIndex + 1); // Save progress
        handleNextCard();
    };

    const markCardAsIncorrect = async () => {
        const currentCard = flashcards[currentCardIndex];
        const key = `incorrect_cards_${chapterId}`; // Unique key per chapter

        try {
            const storedCards = await AsyncStorage.getItem(key);
            const incorrectCards = storedCards ? JSON.parse(storedCards) : [];

            // Check if card is already saved
            console.log("Current card marked incorrect:", currentCard);

            // Add card only if it's not already saved
            const exists = incorrectCards.some(
                (savedCard: { question: string; answer: string }) =>
                    savedCard.question === currentCard.Question && savedCard.answer === currentCard.Answer
            );

            if (!exists) {
                incorrectCards.push({ question: currentCard.Question, answer: currentCard.Answer });
                await AsyncStorage.setItem(key, JSON.stringify(incorrectCards));
                console.log("Incorrect card saved:", incorrectCards);
            } else {
                console.log("Card already exists in incorrect cards, skipping save.");
            }
        } catch (error) {
            console.error('Failed to save incorrect card:', error);
        }

        await saveFlashcardProgress(chapterId, currentCardIndex + 1);
        handleNextCard();
    };

    const resetChapterCards = () => {
        setCurrentCardIndex(0);
    };

    const repeatIncorrectCards = () => {
        navigation.navigate('FlashCardRepeat', { chapterId });

    };

    useEffect(() => {
        return () => {
            saveFlashcardProgress(chapterId, currentCardIndex);
        };
    }, [currentCardIndex, chapterId]);

    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>{`${currentCardIndex + 1} / ${totalCards}`}</Text>

            {flashcards.length > 0 && currentCardIndex < flashcards.length ? (
                <Flashcard
                    key={currentCardIndex}
                    question={flashcards[currentCardIndex].Question}
                    answer={flashcards[currentCardIndex].Answer}
                    onMarkCorrect={markCardAsCorrect}
                    onMarkIncorrect={markCardAsIncorrect}
                    isAlternateColor={currentCardIndex % 2 === 1}
                />
            ) : (
                <Text style={styles.loadingText}>Loading flashcards...</Text>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.reviewButton} onPress={resetChapterCards}>
                    <Text style={styles.buttonContainerText}>Alle Karten wiederholen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reviewButton} onPress={repeatIncorrectCards}>
                    <Text style={styles.buttonContainerText}>Nicht-gewusst Karten wiederholen</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#ffffff',
    },
    closeButton: {
        marginLeft: 15,
    },
    counterText: {
        fontSize: 20,
        color: '#333',
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
    endScreen: {
        alignItems: 'center',
    },
    endMessage: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    repeatButton: {
        backgroundColor: '#24527a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 50,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    reviewButton: {
        borderColor: '#24527a',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonContainerText: {
        color: '#24527a',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default FlashcardScreen;
