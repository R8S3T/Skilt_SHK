import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MathStackParamList } from 'src/types/navigationTypes';

type MathCongratsScreenRouteProp = RouteProp<MathStackParamList, 'MathCongratsScreen'>;

const MathCongratsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<MathCongratsScreenRouteProp>();

    const targetScreen = route.params?.targetScreen as keyof MathStackParamList;
    const targetParams = route.params?.targetParams as any;

    if (!targetScreen || !targetParams) {
        return (
            <View style={styles.container}>
                <Text>Error: Missing navigation parameters.</Text>
            </View>
        );
    }

    const handleContinue = () => {
        navigation.navigate(targetScreen, targetParams);
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

export default MathCongratsScreen;

