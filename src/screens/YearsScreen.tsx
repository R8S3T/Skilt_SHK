import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { fetchChaptersByYear } from 'src/database/databaseServices';
import { NavigationProp } from '@react-navigation/native';
import { useTheme } from 'src/context/ThemeContext';
import { scaleFontSize } from "src/utils/screenDimensions";


const YearsScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<LearnStackParamList>>();
    const { isDarkMode, theme } = useTheme();
    const [expandedYear, setExpandedYear] = useState<number | null>(null);
    const [chapters, setChapters] = useState<{ [key: number]: { chapterId: number; chapterIntro?: string }[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string | null>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Start',
            headerStyle: {
                backgroundColor: theme.surface,
            },
            headerTitleStyle: {
                color: theme.primaryText,
                fontSize: 20,
                fontWeight: 'normal',
            },
            headerTitleAlign: 'left',
            headerTintColor: theme.primaryText,
        });
    }, [navigation, theme]);

    const educationData = [
        { year: 1, learnAreas: 4 },
        { year: 2, learnAreas: 4 },
        { year: 3, learnAreas: 5 },
        { year: 4, learnAreas: 2 },
    ];

    const handlePress = async (year: number) => {
        // Lock years 3 and 4
        if (year === 3 || year === 4) {
            setModalMessage('Inhalte momentan nicht verfügbar');
            setModalVisible(true);
            return; // Prevent further execution if year is locked
        }
    
        // Toggle expanded state for the year
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

    const handleChapterPress = (chapterId: number, year: number) => {
        // Lock chapter IDs 7 and 8, and years 3 and 4
        if ((chapterId === 7 || chapterId === 8) || (year === 3 || year === 4)) {
            setModalMessage('Dieser Inhalt ist in der Tesversion nicht verfügbar.');
            setModalVisible(true);
        } else {
            // Navigate if chapter is not locked
            navigation.navigate('SubchaptersScreen', { chapterId });
        }
    };

    const renderChapter = (chapter: { chapterId: number; chapterIntro?: string }, year: number) => (
        <TouchableOpacity
            key={chapter.chapterId}
            style={[
                styles.chapterContainer,
                isDarkMode && { borderColor: theme.primaryText }
            ]}
            onPress={() => handleChapterPress(chapter.chapterId, year)}
        >
            <Image
                source={require('../../assets/Images/play_icon.png')}
                style={[styles.playButton, { tintColor: theme.accent }]}
            />
            {chapter.chapterIntro && (
                <Text style={[styles.introText, { color: theme.primaryText }]}>{chapter.chapterIntro}</Text>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.titleContainer, { backgroundColor: theme.surface }]}>
                <Text style={[styles.title, { color: theme.primaryText }]}>Wähle dein Lehrjahr</Text>
            </View>

            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                {educationData.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.cardContainer,
                            {
                                backgroundColor: isDarkMode ? theme.surface : theme.background,
                                borderColor: theme.border,
                            }
                        ]}
                    >
                        <TouchableOpacity onPress={() => handlePress(item.year)} style={styles.card}>
                            <View style={styles.yearRectangle}>
                                <Text style={[styles.number, { color: theme.primaryText }]}>{`${item.year}. Lehrjahr`}</Text>
                            </View>
                            <Text style={[styles.learnArea, { color: theme.secondaryText }]}>{`${item.learnAreas} Lernfelder`}</Text>
                        </TouchableOpacity>

                        {expandedYear === item.year && (
                            <View style={styles.chaptersContainer}>
                                {loading ? (
                                    <Text style={{ color: theme.secondaryText }}>Loading...</Text>
                                ) : (
                                    chapters[item.year]?.map((chapter) => renderChapter(chapter, item.year))
                                )}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Modal for locked chapters */}
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButton}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const iconSize = 24;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    titleContainer: {
        padding: 20,
        alignItems: 'center',
        zIndex: 1,
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        textAlign: 'center',
    },
    container: {
        flex: 1,
        paddingVertical: 30,
    },
    cardContainer: {
        marginHorizontal: 10,
        marginBottom: 15,
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
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
        fontSize: 22,
    },
    learnArea: {
        fontSize: 18,
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
        borderRadius: 10,
    },
    introText: {
        flex: 1,
        marginLeft: 28,
        fontSize: 16,
    },
    playButton: {
        width: iconSize,
        height: iconSize,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    modalButton: {
        fontSize: 14,
        color: '#007bff',
    },
});

export default YearsScreen;
