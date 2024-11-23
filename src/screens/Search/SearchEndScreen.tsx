import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import LottieView from 'lottie-react-native';

const SearchEndScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // Disable back navigation
            return true;
        });

        return () => backHandler.remove();
    }, []);
    return (
        <View style={styles.container}>

            <LottieView
                source={require('../../../assets/Animations/suche.json')} // Ensure the correct path
                autoPlay
                loop
                style={styles.animation}
            />
            <View style={styles.buttonsContainer}>

                <TouchableOpacity
                    style={styles.borderedButton}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Text style={styles.buttonText}>Zurück zur Suche</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    animation: {
        width: 200, // Adjust size as needed
        height: 200,
        marginBottom: 20,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    borderedButton: {
        borderWidth: 1,
        borderColor: '#24527a', // Customize your border color
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#24527a', // Same as the border color
    },
});

export default SearchEndScreen;
