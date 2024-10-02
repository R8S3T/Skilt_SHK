import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, LayoutAnimation } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

const FlashCardsTopicScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [expandedSection, setExpandedSection] = useState<number | null>(null);

    const handleSectionPress = (sectionIndex: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
        setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex);
    };

    const handleTopicPress = (topic: string) => {
        navigation.navigate('FlashCardsOrganised', { topic });
    };

    const backgroundColors = ['#9ba6a5', '#2b4353', '#e8630a', '#a8d1d1'];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Wähle ein Thema</Text>

            {/* Section 1 */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity onPress={() => handleSectionPress(1)}>
                    <Text style={[styles.sectionTitle, { color: backgroundColors[0] }]}>Lehrjahr 1</Text>
                </TouchableOpacity>
                {expandedSection === 1 && (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Werkstoffkunde')}>
                            <Text style={styles.buttonText}>Werkstoffkunde</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Rohrmaterialien')}>
                            <Text style={styles.buttonText}>Rohrmaterialien</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* Section 2 */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity onPress={() => handleSectionPress(2)}>
                    <Text style={[styles.sectionTitle, { color: backgroundColors[1] }]}>Lehrjahr 2</Text>
                </TouchableOpacity>
                {expandedSection === 2 && (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Installationstechnik')}>
                            <Text style={styles.buttonText}>Installationstechnik</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Materialkunde')}>
                            <Text style={styles.buttonText}>Materialkunde</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* Section 3 */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity onPress={() => handleSectionPress(3)}>
                    <Text style={[styles.sectionTitle, { color: backgroundColors[2] }]}>Lehrjahr 3</Text>
                </TouchableOpacity>
                {expandedSection === 3 && (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Hydraulik')}>
                            <Text style={styles.buttonText}>Hydraulik</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Wärmetechnik')}>
                            <Text style={styles.buttonText}>Wärmetechnik</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* Section 4 */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity onPress={() => handleSectionPress(4)}>
                    <Text style={[styles.sectionTitle, { color: backgroundColors[3] }]}>Lehrjahr 4</Text>
                </TouchableOpacity>
                {expandedSection === 4 && (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Löttechnik')}>
                            <Text style={styles.buttonText}>Löttechnik</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleTopicPress('Schweißtechnik')}>
                            <Text style={styles.buttonText}>Schweißtechnik</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    sectionContainer: {
        padding: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#2b4353',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default FlashCardsTopicScreen;



