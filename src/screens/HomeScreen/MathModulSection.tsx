import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from 'src/types/navigationTypes';
import { scaleFontSize, screenWidth } from 'src/utils/screenDimensions';

interface Module {
    title: string;
    img?: any;
}

interface MathModulProps {
    onButtonPress?: (title: string) => void; // Optional onButtonPress prop
}

const MathModulSection: React.FC<MathModulProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const modules: Module[] = [
        { title: 'Gleichungen', img: require('../../../assets/Images/math_scales.png') },
        { title: 'Geometrie', img: require('../../../assets/Images/math_geometry.png') },
        { title: 'Bruchrechnung', img: require('../../../assets/Images/math_fraction.png') },
        { title: 'Alle Module', img: require('../../../assets/Images/math_all.png') }
    ];

    const handleButtonPress = (title: string) => {
        console.log('Button pressed:', title);

        if (onButtonPress) {
            console.log('onButtonPress is provided');
            onButtonPress(title);
        }

        if (title === 'Alle Module') {
            console.log('Navigating to MathChapterScreen');
            navigation.navigate('Math', { screen: 'MathChapterScreen' });
        } else {
            console.log(`${title} pressed`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fachmathematik</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {modules.map((module, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => handleButtonPress(module.title)}
                    >
                        {module.img && <Image source={module.img} style={styles.image} />}
                        <Text style={styles.buttonText}>{module.title}</Text>
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
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 5,
    },
    scrollViewContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    button: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        width: screenWidth * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCC',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center'
    },
});

export default MathModulSection;
