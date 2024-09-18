import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { dynamicCardHeight, scaleFontSize, screenWidth } from 'src/utils/screenDimensions';

interface EducationYear {
    year: number;
    learnAreas: number;
}

type YearsScreenNavigationProp = NavigationProp<LearnStackParamList, 'YearsScreen'>;

const YearsScreen: React.FC = () => {
    const navigation = useNavigation<YearsScreenNavigationProp>();

    const educationData: EducationYear[] = [
        { year: 1, learnAreas: 4 },
        { year: 2, learnAreas: 4 },
        { year: 3, learnAreas: 5 },
        { year: 4, learnAreas: 2 },
    ];

    const backgroundColors = [
        'rgba(155, 166, 165, 0.9)',
        'rgba(43, 67, 83, 0.9)',
        'rgba(232, 99, 10, 0.7)',
        'rgba(168, 209, 209, 0.9)'
    ];
    const handlePress = (year: number) => {
        navigation.navigate('ChaptersScreen', { year: year.toString() });
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {educationData.map((item) => (
                    <TouchableOpacity
                        key={item.year}
                        style={[styles.card, {
                            borderColor: backgroundColors[item.year - 1],
                            borderWidth: 1,
                        }]}
                        onPress={() => handlePress(item.year)}
                    >
                        <View style={[styles.yearRectangle, {
                            backgroundColor: backgroundColors[item.year - 1],
                            width: '85%', // Covering 85% of the card's width
                        }]}>
                            <Text style={styles.number}>{`${item.year}. Lehrjahr`}</Text>
                        </View>
                        <Text style={[styles.learnArea, { left: '90%' }]}>{`${item.learnAreas} Lernfelder`}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 25
    },
    card: {
        width: '85%',
        minHeight: dynamicCardHeight(85, 120),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        marginTop: 0,
        marginBottom: 45,
        overflow: 'hidden',
        paddingTop: 0,
        paddingBottom: 30,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    yearRectangle: {
        width: '75%',
        height: screenWidth > 375 ? 45 : 35,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: '#f0f0f0',
    },
    number: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        color: '#fff',
    },
    learnArea: {
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(14),
        color: '#2b4353',
        position: 'absolute',
        bottom: 10,
        left: '85%',
        transform: [{ translateX: -scaleFontSize(14) * 3 }],
    },
});

export default YearsScreen;



