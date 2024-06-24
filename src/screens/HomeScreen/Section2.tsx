import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LearnStackParamList } from '../../navigation/LearnStackNavigator';
import { scaleFontSize, screenWidth } from 'src/utils/screenDimensions';

interface Section2Props {
    onButtonPress: (title: string) => void;
};

const Section2: React.FC<Section2Props> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mathe-Module</Text>
            <Swiper style={styles.wrapper} showsButtons={true} loop={false}>
                {['Module 1', 'Module 2', 'Module 3', 'Module 4'].map((module, index) => (
                    <View key={index} style={styles.slide}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log(`Button pressed for: ${module}`);
                                onButtonPress(module);
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>{module}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 20,
    },
    wrapper: {
        height: 250, // Ensure you have enough height to display the swiper comfortably
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#EFEFEF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 14,
    },
});

export default Section2;