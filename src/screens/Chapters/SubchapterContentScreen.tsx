// src/screens/SubchapterContentScreen.tsx

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ContentSlide from '../ContentSlide';
import QuizSlide from '../Quiz/QuizSlide';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { GenericContent } from 'src/types/contentTypes';
import { fetchSubchapterContentBySubchapterId } from 'src/database/databaseServices';
import { useSubchapter } from '../../context/SubchapterContext';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { saveProgress, loadProgress, nextContent } from 'src/utils/progressUtils';

type SubchapterContentScreenRouteProp = RouteProp<LearnStackParamList, 'SubchapterContentScreen'>;
type SubchapterContentScreenNavigationProp = StackNavigationProp<LearnStackParamList, 'SubchapterContentScreen'>;

type Props = {
    route: SubchapterContentScreenRouteProp;
    navigation: SubchapterContentScreenNavigationProp;
};

const SubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const {
        subchapterId,
        subchapterTitle,
        chapterId = 0,
        chapterTitle = '',
        origin = undefined, // Add default value for origin
    } = route.params;
    const [contentData, setContentData] = useState<GenericContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [maxIndexVisited, setMaxIndexVisited] = useState<number>(0);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);

    const { finishedSubchapters, markSubchapterAsFinished, unlockSubchapter } = useSubchapter();

     // Customize the header to include the "X" button and progress bar
     useLayoutEffect(() => {
        navigation.setOptions({
            // Place an "X" icon button in the header left position
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        if (route.params.origin === 'ResumeSection') {
                            // Navigate directly to HomeScreen if accessed via ResumeSection
                            navigation.navigate('HomeScreen');
                        } else {
                            // Otherwise, navigate back to SubchaptersScreen
                            navigation.navigate('SubchaptersScreen', { chapterId, chapterTitle });
                        }
                    }}
                    style={{ marginLeft: 15 }}
                >
                    <Ionicons name="close" size={24} color="gray" />
                </TouchableOpacity>
            ),
            headerRight: () => null,  // Remove any headerRight component if it exists
        });
    }, [navigation, chapterId, chapterTitle, route.params.origin]);
    

    // Load saved slide index on first render or reset to 0 if finished
    useEffect(() => {
        const initializeProgress = async () => {
            const savedProgress = await loadProgress('section1');
            if (finishedSubchapters.includes(subchapterId)) {
                setCurrentIndex(0);
            } else if (savedProgress?.subchapterId === subchapterId && savedProgress.currentIndex !== null) {
                setCurrentIndex(savedProgress.currentIndex);
            }
        };
        initializeProgress();
    }, [finishedSubchapters, subchapterId]);

    // Load content data for the subchapter
    useEffect(() => {
        navigation.setOptions({ title: subchapterTitle });
        const loadData = async () => {
            try {
                const data = await fetchSubchapterContentBySubchapterId(subchapterId);
                setContentData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load content data:', error);
                setLoading(false);
            }
        };
        loadData();
    }, [navigation, subchapterId, subchapterTitle]);

    // Update header progress bar
    useEffect(() => {
        const progress = (currentIndex + 1) / contentData.length;
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                    <View style={styles.progressBarContainer}>
                        <LinearGradient
                            colors={['#4CAF50', '#81C784']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={[styles.progressBar, { width: `${progress * 100}%` }]}
                        />
                    </View>
                </View>
            ),
        });
    }, [currentIndex, contentData.length]);

    // Handle navigating to the next slide or finish using imported `nextContent`
    const handleNextContent = () => {
        nextContent({
            showQuiz,
            setShowQuiz,
            currentIndex,
            contentData,
            setCurrentIndex,
            maxIndexVisited,
            setMaxIndexVisited,
            subchapterId,
            subchapterTitle,
            chapterId,
            chapterTitle,
            navigation,
            markSubchapterAsFinished,
            unlockSubchapter,
            origin, 
        });
    };

    // Navigation for back and forward buttons
    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goForward = () => {
        if (currentIndex < maxIndexVisited) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading ...</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                {showQuiz ? (
                    <QuizSlide contentId={contentData[currentIndex].ContentId} onContinue={handleNextContent} />
                ) : (
                    <ContentSlide contentData={contentData[currentIndex]} onNext={handleNextContent} />
                )}
                <View style={styles.bottomNavContainer}>
                    <TouchableOpacity onPress={goBack} disabled={currentIndex === 0}>
                        <Ionicons 
                            name="chevron-back" 
                            size={30}
                            color={currentIndex === 0 ? 'lightgray' : 'gray'}
                            style={styles.arrowStyle}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={handleNextContent} 
                        disabled={currentIndex === contentData.length - 1}
                    >

                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={goForward} 
                        disabled={currentIndex >= maxIndexVisited || currentIndex === contentData.length - 1}
                    >
                        <Ionicons 
                            name="chevron-forward" 
                            size={30}
                            color={currentIndex >= maxIndexVisited || currentIndex === contentData.length - 1 ? 'lightgray' : 'gray'}
                            style={styles.arrowStyle}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomNavContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    arrowStyle: {
        opacity: 0.8,
    },
    progressBarContainer: {
        height: 16,
        width: '90%',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    progressBar: {
        height: 15,
        borderRadius: 10,
    },
});

export default SubchapterContentScreen;
