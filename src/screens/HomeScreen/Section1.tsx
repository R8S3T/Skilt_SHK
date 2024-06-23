import React from "react";
import { View, Text, Image, StyleSheet, TextStyle } from 'react-native';
import RenderButton from "./RenderButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "src/types/navigationTypes";
import { scaleFontSize, screenWidth } from "src/utils/screenDimensions";

interface Section1Props {
    onButtonPress: (title: string) => void;
}

const Section1: React.FC<Section1Props> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.newContainer}>
            <Text style={styles.heading}>Meistere Dein Handwerk</Text>
            <Text style={styles.description}>Vertiefe Dein Wissen mit maßgeschneiderten Lernhäppchen, die auf deine Ausbildung abgestimmt sind.</Text>
            <View style={styles.horizontalContainer}>
                <Image source={require('../../../assets/Images/rocket.png')} style={styles.image} />
                <RenderButton
                    title='Starte hier'
                    onPress={() => {
                        onButtonPress('Starte hier');
                        navigation.navigate('Learn', { screen: 'YearsScreen' });
                    }}
                    buttonStyle={styles.ovalButton}
                    textStyle={styles.topButtonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    newContainer: {
        backgroundColor: '#e3e3e3',
        padding: 20,
        width: screenWidth * 0.90,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center', // Center all children vertically and horizontally
    },
    horizontalContainer: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center items vertically within the row
        width: '100%', // Take the full width to accommodate children side by side
        justifyContent: 'space-between', // Space out children evenly
        marginTop: 10, // Space from the description text to this container
    },
    heading: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        color: '#2b4353',
        textAlign: 'center', // Center align text
        marginBottom: 10,
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(13),
        textAlign: 'center', // Center align text
        color: '#2b4353',
        marginBottom: 20, // More space before the horizontal container
    },
    image: {
        width: 100, // Adjust as necessary
        height: 100, // Adjust as necessary
        marginRight: 20, // Add some margin to the right of the image for spacing
    },
    ovalButton: {
        backgroundColor: '#e8630a',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 150, // Specific width for button
    },
    topButtonText: {
        color: '#f6f5f5',
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(14),
    } as TextStyle,
});

export default Section1;
