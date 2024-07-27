import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSubchapter } from './SubchapterContext';

type CongratsScreenParams = {
    subchapterId: number | null;
    subchapterTitle: string;
    chapterId: number;
    chapterTitle: string;
};

const CongratsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<{ params: CongratsScreenParams }, 'params'>>();

    const { markSubchapterAsFinished } = useSubchapter();

    const { chapterId, chapterTitle, subchapterId, subchapterTitle } = route.params ?? { chapterId: 0, chapterTitle: '', subchapterId: null, subchapterTitle: '' };


    console.log('CongratsScreen Params:', route.params);

    const handleContinue = () => {
        console.log('Chapter ID:', chapterId, 'Chapter Title:', chapterTitle);
        console.log('handleContinue called');
        console.log('Navigating to SubchaptersScreen with chapterId and chapterTitle');

        if (subchapterId !== null) {
            markSubchapterAsFinished(subchapterId)
        }

        navigation.navigate('SubchaptersScreen', {
            chapterId,
            chapterTitle,
        });
    };

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../assets/Animations/congrats_1.json')}
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