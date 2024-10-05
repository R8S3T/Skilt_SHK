// FlashCardScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchFlashcardsByTopic } from 'src/database/databaseServices';

const FlashCardScreen: React.FC = () => {
    const route = useRoute();
    const { subchapterId, topic } = route.params as { subchapterId: number, topic: string };
    const [flashcards, setFlashcards] = useState<{ Question: string, Answer: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        async function loadFlashcards() {
            const fetchedFlashcards = await fetchFlashcardsByTopic(subchapterId, topic);
            setFlashcards(fetchedFlashcards);
            setLoading(false);
        }
        loadFlashcards();
    }, [subchapterId, topic]);

    const handleFlipCard = () => {
        setShowAnswer(!showAnswer);
    };

    const handleNextCard = () => {
        setShowAnswer(false);
        setCurrentCard((prev) => (prev + 1) % flashcards.length);  // Cycle through cards
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (flashcards.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No flashcards available for this topic.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleFlipCard} style={styles.card}>
                <Text style={styles.cardText}>
                    {showAnswer ? flashcards[currentCard].Answer : flashcards[currentCard].Question}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextCard} style={styles.nextButton}>
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#2b4353',
        padding: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '80%',
    },
    cardText: {
        color: '#fff',
        fontSize: 18,
    },
    nextButton: {
        backgroundColor: '#1e90ff',
        padding: 15,
        borderRadius: 10,
    },
    nextText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default FlashCardScreen;
