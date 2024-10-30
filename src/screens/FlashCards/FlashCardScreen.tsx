import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FlipCard from 'react-native-flip-card';
import { fetchFlashcardsByTopic } from 'src/database/databaseServices';
import { LinearGradient } from 'expo-linear-gradient';

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
            <View style={styles.outerContainer}>
                <Text>No flashcards available for this topic.</Text>
            </View>
        );
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.cardWrapper}>
                <FlipCard
                    style={styles.cardContainer}
                    friction={8}
                    perspective={1200}
                    flipHorizontal={true}
                    flipVertical={false}
                    clickable={true}
                >
                    {/* Front Side */}
                    <LinearGradient colors={['#ffffff', '#e0eafc']} style={styles.front}>
                        <Text style={styles.headerText}>{topic || "Topic Name"}</Text>
                        <Text style={styles.frontText}>{flashcards[currentCardIndex].question}</Text>
                    </LinearGradient>

                    {/* Back Side */}
                    <LinearGradient colors={['#d3cce3', '#e9e4f0']} style={styles.back}>
                        <Text style={styles.headerText}>{topic || "Topic Name"}</Text>
                        <Text style={styles.backText}>{flashcards[currentCardIndex].answer}</Text>
                    </LinearGradient>
                </FlipCard>
            </View>

            {/* Button to move to the next card */}
            <TouchableOpacity onPress={handleNextCard} style={styles.nextButton}>
                <Text style={styles.buttonText}>Next Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    cardWrapper: {
        width: 320,
        height: 450, // Increased height to fit header
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
    },
    cardContainer: {
        width: '100%',
        height: '100%',
    },
    front: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: '#8c94a9',
        backgroundColor: '#ffffff',
    },
    back: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: '#b4a7d6',
        backgroundColor: '#f8f9fa',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    frontText: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        color: '#4a4a4a',
    },
    backText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#555',
        fontStyle: 'italic',
    },
    nextButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FlashCardScreen;
