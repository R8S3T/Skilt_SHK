import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { BottomTabParamList } from 'src/types/navigationTypes';
import LearnTracker from '../LearnTracking/LearnTracker';
import Section1 from './Section1';
import MathModulSection from './MathModulSection';
import FlashcardsSection from './FlashCardsSection';

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<HomeRouteProp>();
    const username = route.params?.username || 'Default User';
    const subchapterId = 1;  // Hardcode subchapterId for now

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
            <LearnTracker />
            <Section1 onButtonPress={handleButtonPress} />
            <MathModulSection onButtonPress={handleButtonPress} />
            <FlashcardsSection
                onButtonPress={handleButtonPress}
                subchapterId={subchapterId}  // Pass the subchapterId here
            />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    scrollContentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Ensure components are aligned at the top
        paddingVertical: 20, // Add some padding for visual spacing
        backgroundColor: '#fff',
    },
    sectionSpacing: {
        marginBottom: 20, // Add space between sections
    },
});

export default HomeScreen;

