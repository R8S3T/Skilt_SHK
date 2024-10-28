import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { loadProgress } from 'src/utils/progressUtils';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/navigationTypes';

interface ResumeSectionProps {
    sectionTitle?: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ sectionTitle = "Resume Learning" }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [lastChapterId, setLastChapterId] = useState<number | null>(null);
    const [lastChapterTitle, setLastChapterTitle] = useState<string | null>(null);
    const [lastSubchapter, setLastSubchapter] = useState<number | null>(null);
    const [lastContentId, setLastContentId] = useState<number | null>(null);

    const loadLastViewed = async () => {
        const { chapterId, chapterTitle, subchapterId, currentIndex } = await loadProgress('section1');
        if (chapterId) setLastChapterId(chapterId);
        if (chapterTitle) setLastChapterTitle(chapterTitle);
        if (subchapterId) setLastSubchapter(subchapterId);
        if (currentIndex !== null) setLastContentId(currentIndex);
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
                    subchapterTitle: `Kapitel ${lastSubchapter}`,
                    chapterId: lastChapterId ?? 1,
                    chapterTitle: lastChapterTitle ?? "Default Chapter Title",
                    contentId: lastContentId,
                },
            });
        } else {
            console.error("Cannot navigate: Missing one or more required parameters.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{sectionTitle}</Text>
            <Text style={styles.subtitle}>
                {lastSubchapter ? `Continue from Subchapter ${lastSubchapter}` : "No recent activity"}
            </Text>
            <Button
                title="Resume"
                onPress={handleContinue}
                disabled={lastSubchapter === null || lastContentId === null}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
    },
});

export default ResumeSection;
