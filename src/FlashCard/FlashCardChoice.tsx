import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

const FlashCardChoice = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleFieldCardsPress = () => {
        console.log('Karten nach Lernfeldern pressed');
        navigation.navigate('FlashCardChapters');
    };

    const handleRepeatCardsPress = () => {
        console.log('Lernkarte wiederholen pressed');
        navigation.navigate('FlashCardRepeat');  // Navigate to FlashCardRepeat
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashcard Choices</Text>
            <TouchableOpacity style={styles.button} onPress={handleFieldCardsPress}>
                <Text style={styles.buttonText}>Karten nach Lernfeldern</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRepeatCardsPress}>
                <Text style={styles.buttonText}>Lernkarte wiederholen</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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

export default FlashCardChoice;
