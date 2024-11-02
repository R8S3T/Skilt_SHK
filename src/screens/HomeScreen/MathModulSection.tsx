// src/components/MathModulSection.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from 'src/types/navigationTypes';
import { scaleFontSize, screenWidth } from 'src/utils/screenDimensions';
import { useTheme } from 'src/context/ThemeContext';

interface Module {
    title: string;
    img?: any;
}

interface MathModulProps {
    onButtonPress?: (title: string) => void;
}

const MathModulSection: React.FC<MathModulProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { isDarkMode, theme } = useTheme();

    const modules: Module[] = [
        { title: 'Gleichungen', img: require('../../../assets/Images/math_scales.png') },
        { title: 'Geometrie', img: require('../../../assets/Images/math_geometry.png') },
        { title: 'Bruchrechnung', img: require('../../../assets/Images/math_fraction.png') },
        { title: 'Alle Module', img: require('../../../assets/Images/math_all.png') }
    ];

    const handleButtonPress = (title: string) => {
        console.log("Button Pressed in MathModulSection:", title);
    
        if (title === 'Alle Module') {
            console.log("Navigating to Math stack with MathChapterScreen");
            navigation.navigate('Math', { screen: 'MathChapterScreen' });
        } else {
            console.log(`${title} pressed`);
        }
    };

    return (
        <View style={[
            styles.container,
            isDarkMode && { backgroundColor: theme.surface } // Dark mode container color
        ]}>
            <Text style={[
                styles.title,
                isDarkMode && { color: theme.primaryText } // Dark mode text color
            ]}>Fachmathematik</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {modules.map((module, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            isDarkMode ? styles.darkButton : styles.lightButton // Individual button styles for dark and light
                        ]}
                        onPress={() => handleButtonPress(module.title)}
                    >
                        {module.img && <Image source={module.img} style={styles.image} />}
                        <Text style={[
                            styles.buttonText,
                            isDarkMode && { color: theme.primaryText } // Dark mode button text color
                        ]}>{module.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#fff', // Light mode background
    },
    scrollViewContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
        color: '#333', // Light mode text color
    },
    button: {
        borderRadius: 10,
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        width: screenWidth * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    lightButton: {
        backgroundColor: '#FFF',
        borderColor: '#CCC',
    },
    darkButton: {
        backgroundColor: '#555', // Dark mode button background color
        borderColor: '#888',     // Dark mode button border color
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333', // Light mode button text color
    },
});

export default MathModulSection;


