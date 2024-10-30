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
                    <View style={styles.front}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{topic || "Topic Name"}</Text>
                        </View>
                        <View style={styles.innerBox}>
                            <Text style={styles.frontText}>{flashcards[currentCardIndex].question}</Text>
                        </View>
                    </View>

                    {/* Back Side */}
                    <View style={styles.back}>
                        <View style={styles.innerBox}>
                            <Text style={styles.backText}>{flashcards[currentCardIndex].answer}</Text>
                        </View>
                    </View>
                </FlipCard>
            </View>

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
        width: 350,
        height: 400,
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
    header: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    front: {
        flex: 1,
        backgroundColor: '#2b4450',
        borderRadius: 15,
        padding: 10,
    },
    innerBox: {
        backgroundColor: '#dfebed',
        width: '85%',
        height: '50%',
        justifyContent: 'center',
        marginTop: 50,
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
    },
    frontText: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        color: '#2b4450',
    },
    back: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dfebed',
        borderRadius: 15,
        borderWidth: 8,
        borderColor: '#2b4450',
    },
    backText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2b4450',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#343A40',
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
