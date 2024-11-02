// src/components/YearsScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { fetchChaptersByYear } from 'src/database/databaseServices';
import { NavigationProp } from '@react-navigation/native';
import { useTheme } from 'src/context/ThemeContext';

const YearsScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();
    const { isDarkMode, theme } = useTheme();
    const [expandedYear, setExpandedYear] = React.useState<number | null>(null);
    const [chapters, setChapters] = React.useState<{ [key: number]: { chapterId: number; chapterTitle?: string; chapterIntro?: string }[] }>({});
    const [loading, setLoading] = React.useState<boolean>(false);

    const educationData = [
        { year: 1, learnAreas: 4 },
        { year: 2, learnAreas: 4 },
        { year: 3, learnAreas: 5 },
        { year: 4, learnAreas: 2 },
    ];

    const handlePress = async (year: number) => {
        setExpandedYear(expandedYear === year ? null : year);
        if (!chapters[year]) {
            setLoading(true);
            try {
                const fetchedChapters = await fetchChaptersByYear(year);
                setChapters((prevChapters) => ({
                    ...prevChapters,
                    [year]: fetchedChapters.map(ch => ({
                        chapterId: ch.ChapterId,
                        chapterIntro: ch.ChapterIntro ?? '',
                    })),
                }));
            } catch (error) {
                console.error(`Failed to fetch chapters for year ${year}:`, error);
            }
            setLoading(false);
        }
    };

    const handleChapterPress = (chapterId: number) => {
        navigation.navigate('SubchaptersScreen', { chapterId });
    };

    const renderChapter = (chapter: { chapterId: number; chapterIntro?: string }) => (
        <TouchableOpacity
            key={chapter.chapterId}
            style={[
                styles.chapterContainer,
                isDarkMode && { borderColor: theme.primaryText }
            ]}
            onPress={() => handleChapterPress(chapter.chapterId)}
        >
            <Image
                source={require('../../assets/Images/play_icon.png')}
                style={[styles.playButton, { tintColor: '#e8630a' }]}
            />
            {chapter.chapterIntro && <Text style={[styles.introText, isDarkMode && { color: theme.primaryText }]}>{chapter.chapterIntro}</Text>}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, isDarkMode && { backgroundColor: theme.background }]}>
            <Text style={[styles.title, isDarkMode && { color: theme.primaryText }]}>Wähle dein Lehrjahr</Text>

            {educationData.map((item, index) => (
                <View
                    key={index}
                    style={[
                        styles.cardContainer,
                        isDarkMode && {
                            backgroundColor: theme.surface,
                            borderColor: theme.border
                        }
                    ]}
                >
                    <TouchableOpacity onPress={() => handlePress(item.year)} style={styles.card}>
                        <View style={styles.yearRectangle}>
                            <Text style={[styles.number, isDarkMode && { color: theme.primaryText }]}>{`${item.year}. Lehrjahr`}</Text>
                        </View>
                        <Text style={[styles.learnArea, isDarkMode && { color: theme.secondaryText }]}>{`${item.learnAreas} Lernfelder`}</Text>
                    </TouchableOpacity>

                    {expandedYear === item.year && (
                        <View style={styles.chaptersContainer}>
                            {loading ? (
                                <Text style={isDarkMode && { color: theme.secondaryText }}>Loading...</Text>
                            ) : (
                                chapters[item.year]?.map((chapter) => renderChapter(chapter))
                            )}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const iconSize = 24;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        marginHorizontal: 0,
        backgroundColor: '#f0f0f0', // Light mode background
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginVertical: 20,
        textAlign: 'center',
        color: '#333', // Light mode text color
    },
    cardContainer: {
        marginTop: 0,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10, 
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#d3d3d3', // Light mode border
        backgroundColor: '#f5f5f5', // Light mode background
    },
    card: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    yearRectangle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    number: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: '#2b4353', // Light mode text color
    },
    learnArea: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        color: '#4f5f6f', // Light mode text color
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 10,
    },
    chaptersContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    chapterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        marginVertical: 12,
        borderWidth: 0.8,
        borderColor: '#2b4353', // Light mode border color
        borderRadius: 10,
    },
    introText: {
        flex: 1,
        marginLeft: 28,
        fontFamily: 'OpenSans-Regular',
        color: '#2b4353', // Light mode text color
        fontSize: 16,
    },
    playButton: {
        width: iconSize,
        height: iconSize,
    },
});

export default YearsScreen;
