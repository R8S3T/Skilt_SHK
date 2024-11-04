import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { fetchMathSubchaptersByChapterId } from 'src/database/databaseServices';
import { MathSubchapter } from 'src/types/contentTypes';
import GenericRows from '../GenericRows';
import { useMathSubchapter } from '../../context/MathSubchapterContext';
import SubchapterInfoModal from '../Chapters/SubchapterInfoModal';

type MathSubchapterScreenRouteProp = RouteProp<MathStackParamList, 'MathSubchapterScreen'>;

type MathSubchapterScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathSubchapterScreen'>;

type Props = {
    route: MathSubchapterScreenRouteProp;
    navigation: MathSubchapterScreenNavigationProp;
};

const MathSubchapterScreen: React.FC<Props> = ({ route, navigation }) => {
    const { chapterId, chapterTitle, source } = route.params as { chapterId: number; chapterTitle: string; source?: string }; 
    const [subchapters, setSubchapters] = useState<MathSubchapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const context = useMathSubchapter();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedSubchapter, setSelectedSubchapter] = useState<MathSubchapter | null>(null);

    const { unlockedSubchapters, finishedSubchapters, setCurrentSubchapter } = context;

    useLayoutEffect(() => {
        console.log("Source parameter received:", source);
        navigation.setOptions({
            headerTitle: source === 'HomeScreen' ? 'Home' : 'Module',
        });
    }, [navigation, source]);

    useEffect(() => {
        const loadSubchapters = async () => {
            try {
                const data = await fetchMathSubchaptersByChapterId(chapterId);
                setSubchapters(data);
            } catch (error) {
                console.error('Failed to load subchapters:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSubchapters();
    }, [chapterId]);

    const handleNodePress = (subchapterId: number, subchapterTitle: string) => {
        const isFinished = finishedSubchapters.includes(subchapterId);
        const selected = subchapters.find(sub => sub.SubchapterId === subchapterId);

        if (isFinished && selected) {
            setSelectedSubchapter(selected);
            setModalVisible(true);
        } else {
            const currentSubchapter = subchapters.find(sub => sub.SubchapterId === subchapterId);
            if (currentSubchapter) {
                const nextSubchapter = subchapters.find(
                    sub => sub.SortOrder === currentSubchapter.SortOrder + 1
                );
                if (nextSubchapter && !unlockedSubchapters.includes(nextSubchapter.SubchapterId)) {
                    setCurrentSubchapter(nextSubchapter.SubchapterId, nextSubchapter.SubchapterName);
                }
            }
            setCurrentSubchapter(subchapterId, subchapterTitle);
            navigation.navigate('MathSubchapterContentScreen', {
                subchapterId,
                subchapterTitle,
                chapterId,
                chapterTitle
            });
        }
    };

    const handleReviewLesson = () => {
        if (selectedSubchapter) {
            setCurrentSubchapter(selectedSubchapter.SubchapterId, selectedSubchapter.SubchapterName);
            navigation.navigate('MathSubchapterContentScreen', {
                subchapterId: selectedSubchapter.SubchapterId,
                subchapterTitle: selectedSubchapter.SubchapterName,
                chapterId,
                chapterTitle
            });
        }
        setModalVisible(false);
    };

    const formattedSubchapters = subchapters.map(subchapter => ({
        id: subchapter.SubchapterId,
        title: subchapter.SubchapterName,
        isLocked: !unlockedSubchapters.includes(subchapter.SubchapterId),
        isFinished: finishedSubchapters.includes(subchapter.SubchapterId)
    }));

    return (
        <View style={styles.container}>
            {/* Sticky Heading */}
            <Text style={styles.stickyHeading}>{chapterTitle}</Text>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <GenericRows
                        items={formattedSubchapters}
                        onNodePress={handleNodePress}
                        color="#FF5733"
                        finishedColor="#52ab95"
                    />
                )}
            </ScrollView>

            {selectedSubchapter && (
                <SubchapterInfoModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    subchapterName={selectedSubchapter.SubchapterName}
                    onReviewLesson={handleReviewLesson}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    stickyHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    scrollViewContent: {
        paddingTop: 60,  // Offset to avoid overlap with sticky heading
    },
});

export default MathSubchapterScreen;



