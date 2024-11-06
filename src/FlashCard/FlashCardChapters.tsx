import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchChapters } from 'src/database/databaseServices';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

// Memoized button component to avoid unnecessary re-renders
const FlashCardButton = React.memo(({ id, name, onPress }: { id: number; name: string; onPress: (id: number) => void }) => (
    <TouchableOpacity key={id} style={styles.button} onPress={() => onPress(id)}>
        <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
));

// Main component
const FlashCardChapters = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [chapters, setChapters] = useState<{ ChapterId: number; ChapterName: string }[]>([]);

    useEffect(() => {
        const getChapters = async () => {
            const fetchedChapters = await fetchChapters();
            setChapters(fetchedChapters);
        };

        getChapters();
    }, []);

    const handleButtonPress = (chapterId: number) => {
        console.log(`Navigating to Chapter ID: ${chapterId}`);
        navigation.navigate('FlashcardScreen', { chapterId, chapterTitle: `Lernfeld ${chapterId}` });
    };

    return (
        <View style={styles.container}>
            {/* Sticky Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Lernfelder</Text>
            </View>
            
            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                {chapters.map((chapter) => (
                    <FlashCardButton
                        key={chapter.ChapterId}
                        id={chapter.ChapterId}
                        name={chapter.ChapterName}
                        onPress={handleButtonPress}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerText: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        width: '90%',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#333333',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default FlashCardChapters;
