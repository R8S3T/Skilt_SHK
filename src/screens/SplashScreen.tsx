import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';
import { hasCompletedOnboarding } from 'src/utils/onBoardingUtils';

type SplashScreenProps = StackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Start animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        // Check onboarding status and navigate accordingly
        const checkOnboarding = async () => {
            const hasOnboarded = await hasCompletedOnboarding();
            setTimeout(() => {
                navigation.replace(hasOnboarded ? 'HomeScreen' : 'Intro');
            }, 2000); // Delay for the splash animation
        };

        checkOnboarding();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/Images/skilt_logo.png')}
                style={[
                    styles.logo,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0', // Grayish background color
    },
    logo: {
        width: 150,
        height: 150,
    },
});


export default SplashScreen;
