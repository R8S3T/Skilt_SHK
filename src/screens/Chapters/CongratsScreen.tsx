import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import { CommonActions } from '@react-navigation/native';

type CongratsScreenRouteProp = RouteProp<RootStackParamList, 'CongratsScreen'>;

const CongratsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<CongratsScreenRouteProp>();

    const targetScreen = route.params?.targetScreen as keyof RootStackParamList;
    const targetParams = route.params?.targetParams;

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

    const handleContinue = () => {
        const { targetScreen, targetParams } = route.params;

        if (targetScreen === 'HomeScreen') {
            // Navigate to HomeScreen within BottomTabNavigator
            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Home',
                    params: targetParams,
                })
            );
        } else {
            // For other screens, continue as normal
            navigation.navigate(targetScreen, targetParams);
        }
    };

    return (
        <View style={styles.container}>
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






