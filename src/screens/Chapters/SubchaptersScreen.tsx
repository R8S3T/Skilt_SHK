import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchSubchaptersByChapterId } from 'src/database/databaseServices';
import { Subchapter } from 'src/types/contentTypes';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { SubchapterContext } from './SubchapterContext';
import SubchapterInfoModal from './SubchapterInfoModal';
import GenericRows from '../GenericRows';


type SubchaptersScreenRouteProps = {
    route: RouteProp<LearnStackParamList, 'SubchaptersScreen'>;
};

type NavigationType = StackNavigationProp<LearnStackParamList, 'SubchaptersScreen'>;

const SubchaptersScreen: React.FC<SubchaptersScreenRouteProps> = ({ route }) => {
    const { chapterId, chapterTitle } = route.params;
    const [subchapters, setSubchapters] = useState<Subchapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isJumpAhead, setIsJumpAhead] = useState<boolean>(false); // New state to handle Jump Ahead modal
    const [selectedSubchapter, setSelectedSubchapter] = useState<Subchapter | null>(null);
    const navigation = useNavigation<NavigationType>();
    const context = useContext(SubchapterContext);

    if (!context) {
        throw new Error('SubchapterContext must be used within a SubchapterProvider');
    }

    const { unlockedSubchapters, finishedSubchapters, setCurrentSubchapter, unlockSubchapter } = context;

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSubchaptersByChapterId(chapterId);
                setSubchapters(data);
            } catch (error) {
                console.error('Failed to load subchapters:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [chapterId]);

    const handleNodePress = (subchapterId: number, subchapterTitle: string) => {
        const isFinished = finishedSubchapters.includes(subchapterId);
        const isLocked = !unlockedSubchapters.includes(subchapterId);
        const selected = subchapters.find(sub => sub.SubchapterId === subchapterId);

        if (isFinished && selected) {
            // Subchapter is finished, show review modal
            setSelectedSubchapter(selected);
            setModalVisible(true);
            setIsJumpAhead(false); // Not a jump ahead scenario
        } else if (isLocked && selected) {
            // Subchapter is locked and user wants to jump ahead, show jump ahead modal
            setSelectedSubchapter(selected);
            setModalVisible(true);
            setIsJumpAhead(true); // It's a jump ahead scenario
        } else {
            // Subchapter is unlocked, navigate to the content screen
            setCurrentSubchapter(subchapterId, subchapterTitle);
            navigation.navigate('SubchapterContentScreen', {
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
            navigation.navigate('SubchapterContentScreen', {
                subchapterId: selectedSubchapter.SubchapterId,
                subchapterTitle: selectedSubchapter.SubchapterName,
                chapterId,
                chapterTitle
            });
        }
        setModalVisible(false);
    };

    const handleJumpAheadConfirm = () => {
        if (selectedSubchapter) {
            // Unlock the selected subchapter
            unlockSubchapter(selectedSubchapter.SubchapterId);

            // Set it as the current subchapter and navigate to the content screen
            setCurrentSubchapter(selectedSubchapter.SubchapterId, selectedSubchapter.SubchapterName);
            navigation.navigate('SubchapterContentScreen', {
                subchapterId: selectedSubchapter.SubchapterId,
                subchapterTitle: selectedSubchapter.SubchapterName,
                chapterId,
                chapterTitle
            });
        }
        setModalVisible(false);
    };
    

    const renderedSubchapters = subchapters.map(subchapter => ({
        id: subchapter.SubchapterId,
        title: subchapter.SubchapterName,
        isLocked: !unlockedSubchapters.includes(subchapter.SubchapterId),
        isFinished: finishedSubchapters.includes(subchapter.SubchapterId)
    }));

    return (
        <ScrollView style={styles.screenContainer}>
            <View style={styles.separator} />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <GenericRows items={renderedSubchapters} onNodePress={handleNodePress} color="#FFA500" finishedColor="#FFA500" />
            )}

            {selectedSubchapter && (
                <SubchapterInfoModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    subchapterName={selectedSubchapter.SubchapterName}
                    onReviewLesson={isJumpAhead ? handleJumpAheadConfirm : handleReviewLesson}
                    isJumpAhead={isJumpAhead}
                    onJumpAheadConfirm={handleJumpAheadConfirm}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
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

export default SubchaptersScreen;
