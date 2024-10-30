import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextStyle } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { loadProgress } from 'src/utils/progressUtils';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';
import { imageMap } from 'src/utils/imageMappings';
import { screenWidth } from 'src/utils/screenDimensions';

interface ResumeSectionProps {
    sectionTitle?: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ sectionTitle = "Lernen fortsetzen" }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [lastChapterId, setLastChapterId] = useState<number | null>(null);
    const [lastChapterTitle, setLastChapterTitle] = useState<string | null>(null);
    const [lastSubchapter, setLastSubchapter] = useState<number | null>(null);
    const [lastSubchapterName, setLastSubchapterName] = useState<string | null>(null);
    const [lastContentId, setLastContentId] = useState<number | null>(null);
    const [lastImageName, setLastImageName] = useState<string | null>(null);

    const loadLastViewed = async () => {
        const { chapterId, chapterTitle, subchapterId, subchapterName, currentIndex, imageName } = await loadProgress('section1');
        if (chapterId) setLastChapterId(chapterId);
        if (chapterTitle) setLastChapterTitle(chapterTitle);
        if (subchapterId) setLastSubchapter(subchapterId);
        if (subchapterName) setLastSubchapterName(subchapterName);
        if (currentIndex !== null) setLastContentId(currentIndex);
        if (imageName) setLastImageName(imageName);

        console.log('Last Image Name:', imageName);
    };

    // Use useFocusEffect to load the latest progress whenever the screen is focused
    useFocusEffect(
        useCallback(() => {
            loadLastViewed();
        }, [])
    );

    const handleContinue = () => {
        if (lastSubchapter && lastContentId !== null) {
            navigation.navigate('Learn', {
                screen: 'SubchapterContentScreen',
                params: {
                    subchapterId: lastSubchapter,
                    subchapterTitle: lastSubchapterName || `Kapitel ${lastSubchapter}`,
                    chapterId: lastChapterId ?? 1,
                    chapterTitle: lastChapterTitle ?? "Standard Kapitel Titel",
                    contentId: lastContentId,
                },
            });
        } else {
            console.error("Cannot navigate: Missing one or more required parameters.");
        }
    };

    // Type cast the imageMap with lastImageName
    const imageSource = lastImageName ? imageMap[lastImageName as keyof typeof imageMap] : null;

    return (
        <View style={styles.container}>
            <Text style={styles.resumeTitle}>{sectionTitle}</Text>
            <TouchableOpacity style={styles.newContainer} onPress={handleContinue} disabled={lastSubchapter === null || lastContentId === null}>
                {imageSource && (
                    <Image
                        source={imageSource}
                        style={styles.resumeImage}
                    />
                )}
                <Text style={styles.subtitle}>
                    {lastSubchapterName ? <Text style={styles.bold}>{lastSubchapterName}</Text> : "Keine kürzliche Aktivität"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginBottom: 20,
        marginTop: 20, // Added marginTop to align "Lernen fortsetzen" title
    },
    newContainer: {
        padding: 20,
        width: screenWidth * 0.90,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        backgroundColor: '#ffffff',
    },
    resumeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#555',
        marginTop: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    resumeImage: {
        width: '80%',
        height: 200,
        marginBottom: 15,
    },
});

export default ResumeSection;