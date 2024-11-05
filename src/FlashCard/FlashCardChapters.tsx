import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchSubchapterIds } from 'src/database/databaseServices';


const FlashCardChapters = () => {
    const navigation = useNavigation();
    const [subchapterIds, setSubchapterIds] = useState<number[]>([]); // State to hold unique SubchapterIds

    useEffect(() => {
        const getSubchapterIds = async () => {
            const ids = await fetchSubchapterIds(); // Fetch subchapter IDs using the service
            setSubchapterIds(ids); // Update state with fetched IDs
        };

        getSubchapterIds(); // Call the function on component mount
    }, []);

    const handleButtonPress = (subchapterId: number) => {
        console.log(`Navigating to Subchapter ID: ${subchapterId}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashcard Chapters</Text>
            <Text style={styles.description}>
                Here you can select your flashcard chapters.
            </Text>
            {subchapterIds.length > 0 ? (
                subchapterIds.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={styles.button}
                        onPress={() => handleButtonPress(id)}
                    >
                        <Text style={styles.buttonText}>Lernfeld {id}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.description}>Loading chapters...</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default FlashCardChapters;
