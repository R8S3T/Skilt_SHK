import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import LottieView from 'lottie-react-native';
import { useTheme } from 'src/context/ThemeContext';

const SearchEndScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { theme, isDarkMode } = useTheme();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // Disable back navigation
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LottieView
                source={require('../../../assets/Animations/suche.json')} // Ensure the correct path
                autoPlay
                loop
                style={styles.animation}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[
                        styles.borderedButton,
                        {
                            borderColor: isDarkMode ? '#CCCCCC' : '#24527a', // Dynamic border color
                            backgroundColor: isDarkMode ? 'transparent' : '#ffffff', // Dynamic background
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate('HomeScreen', {
                            screen: 'Search',
                        });
                    }}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            { color: isDarkMode ? '#CCCCCC' : '#24527a' }, // Dynamic text color
                        ]}
                    >
                        Zurück zur Suche
                    </Text>
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
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SearchEndScreen;

