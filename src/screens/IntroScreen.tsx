import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Slide, slides } from 'src/components/introScreenSlides';

interface IntroScreenProps {
    navigation: NavigationProp<ParamListBase>;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleDone = () => {
        navigation.navigate('HomeScreen', {
            screen: 'Home',
            params: { username: username }
        });
    };
    
    const renderSlide = ({ item } : { item: Slide }) => {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                <LottieView
                    source={item.animation}
                    autoPlay
                    loop
                    style={styles.animation}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
                {item.renderInputField && (
                    <View style={styles.inputField}>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder='Dein Name'
                            style={styles.textInput}
                        />
                        <Button title="Done" onPress={() => handleDone()} />
                    </View>
                )}
            </View>
        );
    };

    return (
        <AppIntroSlider
            renderItem={renderSlide}
            data={slides}
            onDone={handleDone}
            showSkipButton={true}
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    animation: {
        width: 300,
        height: 300,
    },
    title: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        marginTop: 15,
    },
    text: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    inputField: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '80%',
        padding: 10,
        marginBottom: 20,
    },
});

export default IntroScreen;