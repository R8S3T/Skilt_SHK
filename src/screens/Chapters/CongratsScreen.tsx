import React, { useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import { CommonActions } from '@react-navigation/native';
import { useTheme } from 'src/context/ThemeContext';
type CongratsScreenRouteProp = RouteProp<RootStackParamList, 'CongratsScreen'>;

const CongratsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<CongratsScreenRouteProp>();
    const { theme, isDarkMode } = useTheme();

    const targetScreen = route.params?.targetScreen as keyof RootStackParamList;
    const targetParams = route.params?.targetParams;


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Completely hide the header
        });
    }, [navigation]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true; // Prevent default back navigation
        });

        return () => backHandler.remove(); // Cleanup the event listener on unmount
    }, []);

    // Array of animation sources
    const animations = [
        require('../../../assets/Animations/congrats_1.json'),
        require('../../../assets/Animations/congrats_2.json'),
        require('../../../assets/Animations/congrats_3.json'),
        require('../../../assets/Animations/congrats_5.json'),
    ];

    // Select a random animation
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    if (!targetScreen || !targetParams) {
        return (
            <View style={styles.container}>
                <Text>Error: Missing navigation parameters.</Text>
            </View>
        );
    }
    useEffect(() => {
        console.log("CongratsScreen received route params:", route.params);
    }, []);
    
    const handleContinue = () => {
        console.log("handleContinue called. Route params received:", route.params);
    
        const { targetScreen, targetParams } = route.params || {};
    
        if (targetScreen === 'HomeScreen') {
            console.log("Navigating to HomeScreen.");
            navigation.navigate('HomeScreen');
        } else if (targetScreen === 'SubchaptersScreen') {
            console.log("Navigating to SubchaptersScreen with params:", targetParams);
            navigation.navigate('SubchaptersScreen', targetParams);
        } else {
            console.error("Unexpected or missing targetScreen:", targetScreen);
        }
    };
    
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LottieView
                source={randomAnimation}
                autoPlay
                loop={false}
                style={styles.animation}
            />
            <TouchableOpacity style={[styles.button, styles.active]} onPress={handleContinue}>
                <Text style={styles.text}>Weiter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 300,
        height: 300,
    },
    button: {
        minWidth: 100,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: '#ff8f00',
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CongratsScreen;






