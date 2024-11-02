// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabParamList } from 'src/types/navigationTypes';
import Section1 from './Section1';
import ResumeSection from './ResumeSection';
import MathModulSection from './MathModulSection';
import FlashcardsSection from './FlashCardsSection';
import { hasMadeProgress } from 'src/utils/onBoardingUtils';
import { useTheme } from 'src/context/ThemeContext';

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<HomeRouteProp>();
    const username = route.params?.username || 'Default User';
    const [showResume, setShowResume] = useState(false);
    const { theme } = useTheme();  // Access theme from ThemeContext

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
            headerTitle: `Hallo, ${username}`,
            headerStyle: {
                backgroundColor: theme.background,  // Apply background color from theme
            },
            headerTintColor: theme.primaryText,
            headerShadowVisible: false, 
        });
    }, [navigation, username, theme]);

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
            <FlashcardsSection
                onButtonPress={handleButtonPress}
                subchapterId={1}  // Replace with dynamic ID as needed
            />
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
});

export default HomeScreen;
