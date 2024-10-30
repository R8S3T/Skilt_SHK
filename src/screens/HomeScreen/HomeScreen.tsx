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

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<HomeRouteProp>();
    const username = route.params?.username || 'Default User';
    const [showResume, setShowResume] = useState(false);

    useEffect(() => {
        // Check if the user has made progress in the app
        const checkProgress = async () => {
            const hasProgress = await hasMadeProgress();
            setShowResume(hasProgress);
        };
        checkProgress();
    }, []);

    useEffect(() => {
        // Set the header title dynamically based on the username
        navigation.setOptions({
            headerTitle: `Hallo, ${username}`,
        });
    }, [navigation, username]);

    const handleButtonPress = (title: string) => {
        console.log(title);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
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
        backgroundColor: '#fff',
    },
    sectionSpacing: {
        marginBottom: 20,
    },
});

export default HomeScreen;


