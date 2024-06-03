import React from "react";
import { View, Text, StyleSheet, TextStyle } from 'react-native';
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
    );
};

const styles = StyleSheet.create({
    newContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        width: screenWidth * 0.90,
        height: screenWidth * 0.55,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#e8630a',
    },
    heading: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        marginBottom: 15,
        color: '#2b4353',
        textAlign: 'left',
        width: '100%',
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(13),
        textAlign: 'left',
        color: '#2b4353',
        width: '100%',
        marginBottom: 15,
    },
    ovalButton: {
        width: screenWidth * 0.75,
        height: screenWidth * 0.10,
        backgroundColor: '#e8630a',
        borderRadius: 5,
        marginTop: screenWidth < 375 ? 0 : screenWidth * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topButtonText: {
        color: '#f6f5f5',
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(14),
    } as TextStyle,
});

export default Section1;