import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import { scaleFontSize, screenWidth } from 'src/utils/screenDimensions';

interface FlashcardsSectionProps {
    onButtonPress: (title: string) => void;
    subchapterId: number;  // Add subchapterId as a prop
}

const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ onButtonPress, subchapterId }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = () => {
        console.log('Navigating to FlashCardsTopicScreen with subchapterId:', subchapterId);
        navigation.navigate('FlashCardsTopicScreen', { subchapterId });  // Pass subchapterId
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Lernkarten</Text>
                <Text style={styles.description}>
                    Trainiere mit{'\n'}interaktiven Lernkarten
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: screenWidth * 0.90,
        height: screenWidth * 0.35,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2b4353',
        borderRadius: 5,
        margin: 5,
        overflow: 'hidden',
    },
    textContainer: {
        padding: 20,
        justifyContent: 'center',
    },
    heading: {
        color: '#fff',
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        marginBottom: 8,
    },
    description: {
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(12),
    },
});

export default FlashcardsSection;
