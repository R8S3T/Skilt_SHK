import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { BottomTabParamList } from 'src/types/navigationTypes';
import LearnTracker from './LearnTracker';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

type HomeRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<HomeRouteProp>();
    const username = route.params?.username || 'Default User';

    useEffect(() => {
        // Set the header title dynamically based on the username
        navigation.setOptions({
            headerTitle: `Hallo, ${username}`
        });
    }, [navigation, username]);

    const handleButtonPress = (title: string) => {
        // Handle button press from sections, possibly navigate or perform actions
        console.log(title);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LearnTracker />
            <Section1 onButtonPress={handleButtonPress} />
            <Section2 onButtonPress={handleButtonPress} />
            {/* <Section3 onButtonPress={handleButtonPress} /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});

export default HomeScreen;
