import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchChapters } from 'src/database/databaseServices';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import { useTheme } from 'src/context/ThemeContext';
import { scaleFontSize, dynamicCardHeight } from "src/utils/screenDimensions";

// Main component
const FlashCardChapters = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [chapters, setChapters] = useState<{ ChapterId: number; ChapterName: string }[]>([]);
    const { theme } = useTheme();

    // Calculate button size to fit three per row
    const screenWidth = Dimensions.get('window').width;
    const buttonSize = (screenWidth - 80) / 3; // 40 for padding between buttons

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Lernkarten',
            headerStyle: {
                backgroundColor: theme.surface,
            },
            headerTitleStyle: {
                color: theme.primaryText,
                fontSize: 20,
                fontWeight: '600',
                paddingLeft: -20,
            },
            headerTitleAlign: 'left',
            headerTintColor: theme.primaryText,
        });
    }, [navigation, theme]);

    useEffect(() => {
        const getChapters = async () => {
            const fetchedChapters = await fetchChapters();
            setChapters(fetchedChapters);
        };

        getChapters();
    }, []);

    const handleButtonPress = (chapterId: number) => {
        console.log(`Navigating to Chapter ID: ${chapterId}`);
        navigation.navigate('FlashcardScreen', { chapterId, chapterTitle: `Lernfeld ${chapterId}` });
    };

    return (
        <View style={styles.container}>
            {/* Sticky Header for "Lernfelder" */}
            <View style={[styles.header, { backgroundColor: theme.surface }]}>
                <Text style={[styles.headerText, { color: theme.primaryText }]}>Lernfelder</Text>
            </View>
            
            {/* Scrollable Content with Buttons in Rows */}
            <ScrollView contentContainerStyle={[styles.scrollContent]}>
                <View style={styles.rowContainer}>
                    {chapters.map((chapter) => (
                        <TouchableOpacity
                            key={chapter.ChapterId}
                            style={[styles.button, { width: buttonSize, height: buttonSize }]}
                            onPress={() => handleButtonPress(chapter.ChapterId)}
                        >
                            <Text style={styles.buttonText}>{chapter.ChapterName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#ffffff',
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2b4353',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default FlashCardChapters;
