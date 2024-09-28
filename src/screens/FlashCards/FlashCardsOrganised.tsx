import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FlashCard from './FlashCard';
import { fetchFlashcardsByChapterId } from 'src/database/databaseServices'; // Import the fetch function
import { Flashcard } from 'src/types/contentTypes'; // Make sure to add Flashcard type

const FlashCardsOrganised: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFlashcardsByChapterId(1); // Pass the appropriate chapterId
                setFlashcards(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load flashcards:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const renderItem = ({ item }: { item: Flashcard }) => (
        <FlashCard question={item.Question} answer={item.Answer} />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading flashcards...</Text>
            ) : (
                <FlatList
                    data={flashcards}
                    renderItem={renderItem}
                    keyExtractor={item => item.FlashcardId.toString()}
                />
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
    },
});

export default FlashCardsOrganised;


