import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Flashcard from './FlashCard';
import { fetchFlashcardsForChapter } from 'src/database/databaseServices';
import { NavigationProp, RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const INCORRECT_CARDS_KEY = 'incorrect_cards';

type FlashcardScreenRouteProp = RouteProp<RootStackParamList, 'FlashcardScreen'>;

const FlashcardScreen = () => {
    const route = useRoute<FlashcardScreenRouteProp>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { chapterId } = route.params;
    const [flashcards, setFlashcards] = useState<{ Question: string; Answer: string }[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

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

    useEffect(() => {
        const getFlashcards = async () => {
            const cards = await fetchFlashcardsForChapter(chapterId);
            setFlashcards(cards);
        };
        getFlashcards();
    }, [chapterId]);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
    };

    const markCardAsCorrect = () => {
        handleNextCard();
    };

    const markCardAsIncorrect = async () => {
        const currentCard = flashcards[currentCardIndex];

        try {
            const storedCards = await AsyncStorage.getItem(INCORRECT_CARDS_KEY);
            const incorrectCards = storedCards ? JSON.parse(storedCards) : [];
            incorrectCards.push({ question: currentCard.Question, answer: currentCard.Answer });
            await AsyncStorage.setItem(INCORRECT_CARDS_KEY, JSON.stringify(incorrectCards));
        } catch (error) {
            console.error('Failed to save incorrect card:', error);
        }

        handleNextCard();
    };

    const resetChapterCards = () => {
        setCurrentCardIndex(0);
    };

    const repeatIncorrectCards = () => {
        navigation.navigate('FlashCardRepeat');
    };

    return (
        <View style={styles.container}>
            {flashcards.length > 0 ? (
                currentCardIndex < flashcards.length ? (
                    <Flashcard
                        key={currentCardIndex}
                        question={flashcards[currentCardIndex].Question}
                        answer={flashcards[currentCardIndex].Answer}
                        onMarkCorrect={markCardAsCorrect}
                        onMarkIncorrect={markCardAsIncorrect}
                        isAlternateColor={currentCardIndex % 2 === 1}
                    />
                ) : (
                    // Render message and buttons after the last card
                    <View style={styles.endScreen}>
                        <Text style={styles.endMessage}>Keine weiteren Karten verfügbar</Text>
                        <TouchableOpacity style={styles.repeatButton} onPress={resetChapterCards}>
                            <Text style={styles.buttonText}>Karten aus diesem Lernfeld wiederholen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.repeatButton} onPress={repeatIncorrectCards}>
                            <Text style={styles.buttonText}>Alle Karten, die du nicht wusstest, wiederholen</Text>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <Text style={styles.loadingText}>Loading flashcards...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: '#ffffff',
    },
    closeButton: {
        marginLeft: 15,
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
});

export default FlashcardScreen;
