// src/FlashCard/FlashcardScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Flashcard from './FlashCard';
import { fetchFlashcardsForChapter } from 'src/database/databaseServices';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

type FlashcardScreenRouteProp = RouteProp<RootStackParamList, 'FlashcardScreen'>;

const FlashcardScreen = () => {
    const route = useRoute<FlashcardScreenRouteProp>();
    const { chapterId } = route.params;
    const [flashcards, setFlashcards] = useState<{ Question: string; Answer: string }[]>([]);

    useEffect(() => {
        const getFlashcards = async () => {
            const cards = await fetchFlashcardsForChapter(chapterId);
            setFlashcards(cards);
        };
        getFlashcards();
    }, [chapterId]);

    return (
        <View style={styles.container}>
            {flashcards.length > 0 ? (
                flashcards.map((card, index) => (
                    <Flashcard key={index} question={card.Question} answer={card.Answer} />
                ))
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
        paddingTop: 20,
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
});

export default FlashcardScreen;
