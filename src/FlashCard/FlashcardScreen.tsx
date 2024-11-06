import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Flashcard from './FlashCard';
import { fetchFlashcardsForChapter } from 'src/database/databaseServices';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

type FlashcardScreenRouteProp = RouteProp<RootStackParamList, 'FlashcardScreen'>;

const FlashcardScreen = () => {
    const route = useRoute<FlashcardScreenRouteProp>();
    const { chapterId } = route.params;
    const [flashcards, setFlashcards] = useState<{ Question: string; Answer: string }[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    useEffect(() => {
        const getFlashcards = async () => {
            const cards = await fetchFlashcardsForChapter(chapterId);
            setFlashcards(cards);
        };
        getFlashcards();
    }, [chapterId]);

    const handleNextCard = () => {
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    return (
        <View style={styles.container}>
            {flashcards.length > 0 ? (
                <>
                    <Flashcard
                        key={currentCardIndex}
                        question={flashcards[currentCardIndex].Question}
                        answer={flashcards[currentCardIndex].Answer}
                    />
                    {currentCardIndex < flashcards.length - 1 ? (
                        <Button title="Next" onPress={handleNextCard} />
                    ) : (
                        <Text style={styles.noMoreCardsText}>Keine weiteren Karten verfügbar</Text>
                    )}
                </>
            ) : (
                <Text style={styles.loadingText}>Loading flashcards...</Text>
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
});

export default FlashcardScreen;