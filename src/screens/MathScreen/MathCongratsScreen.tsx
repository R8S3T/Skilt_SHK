import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { CommonActions, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MathStackParamList } from 'src/types/navigationTypes';
import { useMathSubchapter } from '../../context/MathSubchapterContext';

type MathCongratsScreenRouteProp = RouteProp<MathStackParamList, 'MathCongratsScreen'>;

export interface MathCongratsScreenParams {
    subchapterId: number;
    targetScreen: keyof MathStackParamList;
    targetParams: {
        chapterId: number;
        chapterTitle: string;
        origin?: string;
    };
}

const MathCongratsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<MathCongratsScreenRouteProp>();
    const { markSubchapterAsFinished } = useMathSubchapter();

    const targetScreen = route.params?.targetScreen as keyof MathStackParamList;
    const targetParams = route.params?.targetParams;
    const subchapterId = route.params?.subchapterId;

    // Array of animation sources
    const animations = [
        require('../../../assets/Animations/congrats_1.json'),
        require('../../../assets/Animations/congrats_2.json'),
        require('../../../assets/Animations/congrats_3.json'),
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
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                })
            );
        } else if (targetScreen === 'MathSubchapterScreen') {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'MathChapterScreen', params: { chapterId: targetParams.chapterId } },
                        { name: 'MathSubchapterScreen', params: targetParams },
                    ],
                })
            );
        } else {
            console.error("Unexpected targetScreen:", targetScreen);
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

export default MathCongratsScreen;