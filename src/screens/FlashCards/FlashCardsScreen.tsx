import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

const FlashCardsScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleSectionPress = (section: string) => {
        console.log(`${section} pressed`);
        if (section === 'Lernkarten nach Lernfeldern') {
            navigation.navigate('FlashCardsTopicScreen');  // Navigate to topic selection screen
        } else if (section === 'Zufällige Karten') {
            navigation.navigate('FlashCardsRandom');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wähle eine Kategorie</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSectionPress('Lernkarten nach Lernfeldern')}
            >
                <Text style={styles.buttonText}>Lernkarten nach Lernfeldern</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSectionPress('Zufällige Karten')}
            >
                <Text style={styles.buttonText}>Zufällige Karten</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#2b4353',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default FlashCardsScreen;
