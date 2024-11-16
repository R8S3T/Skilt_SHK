// MathSubchapterScreen.tsx
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
import { useTheme } from 'src/context/ThemeContext';
import { scaleFontSize } from "src/utils/screenDimensions";

type MathSubchapterScreenRouteProp = RouteProp<MathStackParamList, 'MathSubchapterScreen'>;
type MathSubchapterScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathSubchapterScreen'>;

type Props = {
    route: MathSubchapterScreenRouteProp;
    navigation: MathSubchapterScreenNavigationProp;
};

const MathSubchapterScreen: React.FC<Props> = ({ route, navigation }) => {
    const { chapterId, chapterTitle, origin } = route.params;
    const { isDarkMode, theme } = useTheme();
    const [subchapters, setSubchapters] = useState<MathSubchapter[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isJumpAhead, setIsJumpAhead] = useState(false);
    const [selectedSubchapter, setSelectedSubchapter] = useState<MathSubchapter | null>(null);
    const { unlockedSubchapters, finishedSubchapters, setCurrentSubchapter, unlockSubchapter } = useMathSubchapter();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: origin === 'HomeScreen' ? 'Start' : 'Module',
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.primaryText,
        });
    }, [navigation, origin, theme]);

    useEffect(() => {
        const loadSubchapters = async () => {
            try {
                const data = await fetchMathSubchaptersByChapterId(chapterId);
                setSubchapters(data);

                // Unlock the first subchapter by SortOrder if none are unlocked
                if (unlockedSubchapters.length === 0 && data.length > 0) {
                    const firstSubchapter = data.reduce((min, sub) => 
                        sub.SortOrder < min.SortOrder ? sub : min, data[0]);
                    unlockSubchapter(firstSubchapter.SubchapterId);
                }
            } catch (error) {
                console.error('Failed to load subchapters:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSubchapters();
    }, [chapterId, unlockedSubchapters, unlockSubchapter]);

    const handleNodePress = (subchapterId: number, subchapterTitle: string) => {
        const isFinished = finishedSubchapters.includes(subchapterId);
        const isLocked = !unlockedSubchapters.includes(subchapterId);
        const selected = subchapters.find(sub => sub.SubchapterId === subchapterId);

        if (isFinished && selected) {
            setSelectedSubchapter(selected);
            setModalVisible(true);
            setIsJumpAhead(false);
        } else if (isLocked && selected) {
            setSelectedSubchapter(selected);
            setModalVisible(true);
            setIsJumpAhead(true);
        } else {
            setCurrentSubchapter(subchapterId, subchapterTitle);
            navigation.navigate('MathSubchapterContentScreen', {
                subchapterId,
                subchapterTitle,
                chapterId,
                chapterTitle,
                origin
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
                chapterTitle,
                origin
            });
        }
        setModalVisible(false);
    };

    const handleJumpAheadConfirm = () => {
        if (selectedSubchapter) {
            unlockSubchapter(selectedSubchapter.SubchapterId);
            setCurrentSubchapter(selectedSubchapter.SubchapterId, selectedSubchapter.SubchapterName);
            navigation.navigate('MathSubchapterContentScreen', {
                subchapterId: selectedSubchapter.SubchapterId,
                subchapterTitle: selectedSubchapter.SubchapterName,
                chapterId,
                chapterTitle,
                origin
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
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.stickyHeading, { color: theme.primaryText, backgroundColor: theme.surface }]}>
                {chapterTitle}
            </Text>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {loading ? (
                    <Text style={{ color: theme.primaryText }}>Daten werden geladen...</Text>
                ) : (
                    <GenericRows
                        items={formattedSubchapters}
                        onNodePress={handleNodePress}
                        color={isDarkMode ? theme.accent : '#FF5733'}
                        finishedColor={isDarkMode ? theme.accent : '#52ab95'}
                    />
                )}
            </ScrollView>

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
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeading: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        textAlign: 'center',
        paddingVertical: 10,
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




