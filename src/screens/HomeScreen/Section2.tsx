import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LearnStackParamList } from '../../navigation/LearnStackNavigator';
import { scaleFontSize, screenWidth } from 'src/utils/screenDimensions';

interface Section2Props {
    onButtonPress: (title: string) => void;
};

const Section2: React.FC<Section2Props> = ({ onButtonPress }) => {
    const navihgation = useNavigation<NavigationProp<LearnStackParamList>>();

    const handlePress = () => {
        console.log('Section2 Pressed');
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>Übungen</Text>
                <Text style={styles.subtitle}>Teste Dein Wissen</Text>
            </View>
            <Image
                source={require('../../../assets/Images/wrench.png')}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: screenWidth * 0.90,
        height: screenWidth * 0.30,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        color: '#2b4353',
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        textAlign: 'left',
        marginBottom: 5,
    },
    subtitle: {
        color: '#2b4353',
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(14),
        textAlign: 'left',
    },
    image: {
        width: screenWidth * 0.13,
        height: screenWidth * 0.13,
        marginRight: screenWidth * 0.02,
    },
});

export default Section2;