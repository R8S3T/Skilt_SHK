// src/components/Section1.tsx

import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import RenderButton from "./RenderButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "src/types/navigationTypes";
import { scaleFontSize, screenWidth } from "src/utils/screenDimensions";
import { useTheme } from 'src/context/ThemeContext';

interface Section1Props {
    onButtonPress: (title: string) => void;
}

const Section1: React.FC<Section1Props> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { theme, isDarkMode } = useTheme();

    const initialChapterId = 1;
    const initialChapterTitle = 'Einführung';
    const initialSubchapterId = 1;
    const initialSubchapterTitle = 'Grundlagen';

    return (
        <View style={[styles.newContainer, { backgroundColor: isDarkMode ? theme.surface : '#eeeeee' }]}>
            <Text style={[styles.heading, { color: isDarkMode ? theme.primaryText : '#2b4353' }]}>Meistere Dein Handwerk</Text>
            <Text style={[styles.description, { color: isDarkMode ? theme.secondaryText : '#2b4353' }]}>
                Vertiefe Dein Wissen mit maßgeschneiderten Lernhäppchen, die auf deine Ausbildung abgestimmt sind.
            </Text>
            <View style={styles.horizontalContainer}>
                <Image source={require('../../../assets/Images/rocket.png')} style={styles.image} />
                <RenderButton
                    title='Starte hier'
                    onPress={() => {
                        onButtonPress('Starte hier');
                        navigation.navigate('Learn', {
                            screen: 'YearsScreen',
                            params: {
                                chapterId: initialChapterId,
                                chapterTitle: initialChapterTitle,
                                subchapterId: initialSubchapterId,
                                subchapterTitle: initialSubchapterTitle,
                            },
                        });
                    }}
                    buttonStyle={[styles.ovalButton, { backgroundColor: '#e8630a' }]} // Orange button background
                    textStyle={[styles.topButtonText, { color: '#f6f5f5' }]} // Consistent text color for readability
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    newContainer: {
        padding: 20,
        width: screenWidth * 0.90,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    heading: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(13),
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    ovalButton: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 150,
    },
    topButtonText: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(14),
    },
});

export default Section1;
