import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons from Expo
import { RootStackParamList } from 'src/types/navigationTypes';

interface FlashcardsSectionProps {
    onButtonPress: (title: string) => void;
}

const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = () => {
        onButtonPress("Lernkarten pressed");
        navigation.navigate('FlashCardChoice');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lernkarten</Text>
                <Ionicons name="book-outline" size={40} color="#497285" style={styles.icon} />
            </View>
            <Text style={styles.subheader}>Teste Dein Wissen hier</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        width: '90%',
        borderColor: '#497285',
        borderWidth: 1,
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    icon: {
        marginRight: 10,
    },
    subheader: {
        marginTop: 8,
        fontSize: 18,
        color: '#4a4a4a',
    },
});

export default FlashcardsSection;
