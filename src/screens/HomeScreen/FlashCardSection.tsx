import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

interface FlashcardsSectionProps {
    onButtonPress: (title: string) => void;
}

// Update the navigation type based on your defined navigation parameters
const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Specify the type

    const handlePress = () => {
        onButtonPress("Lernkarten pressed"); // Call the onButtonPress function
        navigation.navigate('FlashCardChoice'); // Navigate to FlashCardChoice
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lernkarten</Text>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Open Flashcards</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4, // For Android shadow
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default FlashcardsSection;
