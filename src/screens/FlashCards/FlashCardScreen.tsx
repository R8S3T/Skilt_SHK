import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FlipCard from 'react-native-flip-card';
import { fetchFlashcardsByTopic } from 'src/database/databaseServices';

interface Flashcard {
    question: string;
    answer: string;
    topic: string;
}

const FlashCardScreen: React.FC = () => {
    const route = useRoute();
    const { subchapterId, topic } = route.params as { subchapterId: number, topic: string };
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFlashcards() {
            try {
                const fetchedFlashcards = await fetchFlashcardsByTopic(subchapterId, topic);
                setFlashcards(fetchedFlashcards.map((flashcard: any) => ({
                    question: flashcard.Question,
                    answer: flashcard.Answer,
                    topic: flashcard.topic,
                })));
            } catch (error) {
                console.error(`Error fetching flashcards for topic ${topic}:`, error);
            } finally {
                setLoading(false);
            }
        }
        loadFlashcards();
    }, [subchapterId, topic]);

    const handleNextCard = () => {
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            alert('No more cards!');
        }
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
            <FlipCard
                style={styles.cardContainer}
                friction={6}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
                clickable={true}
                onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd); }}
            >
                {/* Front Side */}
                <View style={styles.face}>
                    <Text style={styles.text}>{flashcards[currentCardIndex].question}</Text>
                </View>

                {/* Back Side */}
                <View style={styles.back}>
                    <Text style={styles.text}>{flashcards[currentCardIndex].answer}</Text>
                </View>
            </FlipCard>

            {/* Button to move to the next card */}
            <TouchableOpacity onPress={handleNextCard} style={styles.nextButton}>
                <Text style={styles.buttonText}>Next Card</Text>
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
        backgroundColor: '#f5f5f5',
    },
    cardContainer: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
    face: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
    },
    back: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FlashCardScreen;


