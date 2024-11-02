import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
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
    const { chapterId, chapterTitle } = route.params;
    const [subchapters, setSubchapters] = useState<MathSubchapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const context = useMathSubchapter();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedSubchapter, setSelectedSubchapter] = useState<MathSubchapter | null>(null);

    if (!context) {
        throw new Error('MathSubchapterContext must be used within a MathSubchapterProvider');
    }

    const { unlockedSubchapters, finishedSubchapters, setCurrentSubchapter } = context;

    useEffect(() => {
    }, [finishedSubchapters, unlockedSubchapters]);

    useEffect(() => {
        navigation.setOptions({ title: chapterTitle });
        const loadSubchapters = async () => {
            try {
                const data = await fetchMathSubchaptersByChapterId(chapterId);
                setSubchapters(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load subchapters:', error);
                setLoading(false);
            }
        };
        loadSubchapters();
    }, [navigation, chapterId, chapterTitle]);

    useEffect(() => {
        if (subchapters.length > 0) {
            const firstSubchapter = subchapters.find(sub => sub.SortOrder === 1); // Unlock the first subchapter
            if (firstSubchapter && !unlockedSubchapters.includes(firstSubchapter.SubchapterId)) {
                setCurrentSubchapter(firstSubchapter.SubchapterId, firstSubchapter.SubchapterName);
            }
        }
    }, [subchapters, unlockedSubchapters]);

    useEffect(() => {
    }, [unlockedSubchapters]);

    const handleNodePress = (subchapterId: number, subchapterTitle: string) => {
        const isFinished = finishedSubchapters.includes(subchapterId);
        const selected = subchapters.find(sub => sub.SubchapterId === subchapterId);

        if (isFinished && selected) {
            setSelectedSubchapter(selected);
            setModalVisible(true);
        } else {
            // Unlock the next subchapter based on SortOrder
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
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>{chapterTitle}</Text>
            <View style={styles.separator} />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <GenericRows items={formattedSubchapters} onNodePress={handleNodePress} color="#FF5733" finishedColor="#52ab95" />
            )}
            {selectedSubchapter && (
                <SubchapterInfoModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    subchapterName={selectedSubchapter.SubchapterName}
                    onReviewLesson={handleReviewLesson}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        marginTop: 25,
        color: '#2b4353',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#2b4353',
        marginVertical: 5,
    },
});


export default MathSubchapterScreen;


