// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabParamList } from 'src/types/navigationTypes';
import Section1 from './Section1';
import ResumeSection from './ResumeSection';
import MathModulSection from './MathModulSection';
import FlashcardsSection from './FlashCardSection';
import { hasMadeProgress } from 'src/utils/onBoardingUtils';
import { useTheme } from 'src/context/ThemeContext';
import { screenWidth, scaleFontSize } from 'src/utils/screenDimensions';

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<HomeRouteProp>();
    const [username, setUsername] = useState(route.params?.username || 'viel Spaß beim Lernen!');
    const screenWidth = Dimensions.get('window').width; 
    const [showResume, setShowResume] = useState(false);
    const { theme } = useTheme();  // Access theme from ThemeContext

    useEffect(() => {
        const loadUsername = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userName');
                if (storedName) setUsername(storedName);
            } catch (error) {
                console.error('Failed to load username:', error);
            }
        };

        loadUsername();
    }, []); // Load only on initial render

    useEffect(() => {
        const checkProgress = async () => {
            const hasProgress = await hasMadeProgress();
            setShowResume(hasProgress);
            console.log("showResume set to:", hasProgress);
        };
        checkProgress();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={[styles.greetingText, { color: theme.primaryText }]}>
                    {`Hallo, ${username}`}
                </Text>
            ), // Updated from static string to a Text component
            headerStyle: {
                backgroundColor: theme.background,
            },
            headerTintColor: theme.primaryText,
            headerShadowVisible: false, 
        });
    }, [navigation, username, theme]);

    useFocusEffect(
        React.useCallback(() => {
            const loadUsername = async () => {
                const storedName = await AsyncStorage.getItem('userName');
                if (storedName) setUsername(storedName);
            };
            loadUsername();
        }, [])
    );

    const handleButtonPress = (title: string) => {
        console.log(title);
    };


    return (
        <ScrollView
            style={{ backgroundColor: theme.background }}
            contentContainerStyle={[
                styles.scrollContentContainer,
                { backgroundColor: theme.background }  // Use centralized theme background color
            ]}
        >
            <Section1 onButtonPress={handleButtonPress} />
            {showResume && <ResumeSection sectionTitle="Weiterlernen" />}
            <MathModulSection onButtonPress={handleButtonPress} />
            <FlashcardsSection onButtonPress={handleButtonPress} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    sectionSpacing: {
        marginBottom: 20,
    },
    greetingText: {
        fontFamily: 'Lato-Bold',
        fontSize: screenWidth > 600 ? scaleFontSize(14) : scaleFontSize(16), // Larger for tablets
        textAlign: 'center',
    },
});

export default HomeScreen;

