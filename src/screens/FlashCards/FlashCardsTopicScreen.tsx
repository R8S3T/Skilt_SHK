import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes'; // Import the correct RootStackParamList
import { fetchFlashcardTopicsBySubchapterId } from 'src/database/databaseServices';

// Type for navigation prop
type FlashCardsTopicScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FlashCardsTopicScreen'>;

// Define the route params type
interface FlashCardsTopicScreenRouteParams {
    subchapterId: number;
}

const FlashCardsTopicScreen: React.FC = () => {
    const [topics, setTopics] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Get the route params (subchapterId)
    const route = useRoute();
    const { subchapterId } = route.params as FlashCardsTopicScreenRouteParams;

    // Get the navigation prop with correct typing
    const navigation = useNavigation<FlashCardsTopicScreenNavigationProp>();

    // Fetch topics when the component mounts
    useEffect(() => {
        async function loadTopics() {
            try {
                const fetchedTopics = await fetchFlashcardTopicsBySubchapterId(subchapterId);
                setTopics(fetchedTopics);
            } catch (error) {
                console.error(`Error fetching topics for subchapterId ${subchapterId}:`, error);
            } finally {
                setLoading(false);
            }
        }
        loadTopics();
    }, [subchapterId]);

    // Navigate to FlashCardScreen with the selected topic and subchapterId
    const handleTopicPress = (topic: string) => {
        navigation.navigate('FlashCardScreen', { subchapterId, topic });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (topics.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No topics available for this subchapter.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Choose a Topic</Text>
            {topics.map((topic, index) => (
                <TouchableOpacity key={index} style={styles.topicButton} onPress={() => handleTopicPress(topic)}>
                    <Text style={styles.topicText}>{topic}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    topicButton: {
        backgroundColor: '#2b4353',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    topicText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default FlashCardsTopicScreen;
