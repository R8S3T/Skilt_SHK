import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useContent } from './ContentContext';

type CongratsScreenParams = {
    contentId: number | null;
    contentTitle: string;
    onContinue: () => void;
};

const CongratsScreen: React.FC = () => {
    const route = useRoute<RouteProp<{ params: CongratsScreenParams }, 'params'>>();
    const { contentId, contentTitle, onContinue } = route.params;

    const { markContentAsFinished } = useContent();

    const handleContinue = () => {
        if (contentId !== null) {
            markContentAsFinished(contentId);
        }
        onContinue(); // Use the provided callback to continue
    };

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/Animations/congrats_1.json')}
                autoPlay
                loop={false}
                style={styles.animation}
            />
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
        backgroundColor: 'orange',
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