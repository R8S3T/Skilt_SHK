// src/screens/SubchapterContentScreen.tsx

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ContentSlide from '../ContentSlide';
import QuizSlide from '../Quiz/QuizSlide';
import { Quiz } from 'src/types/contentTypes';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { GenericContent } from 'src/types/contentTypes';
import { fetchSubchapterContentBySubchapterId, fetchSubchaptersByChapterId  } from 'src/database/databaseServices';
import { useSubchapter } from '../../context/SubchapterContext';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import {  loadProgress, completeSubchapter, saveProgress, } from 'src/utils/progressUtils';
import { useTheme } from 'src/context/ThemeContext';
import LottieView from 'lottie-react-native';
import { screenWidth } from 'src/utils/screenDimensions';

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
        origin = undefined,
    } = route.params;
    const [contentData, setContentData] = useState<(GenericContent | Quiz)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [maxIndexVisited, setMaxIndexVisited] = useState<number>(-1);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    const { theme, isDarkMode } = useTheme();
    const [navigating, setNavigating] = useState(false);

    const { finishedSubchapters, markSubchapterAsFinished, unlockSubchapter } = useSubchapter();

    const loadingAnimations = [
    require('../../../assets/Animations/loading_3.json'),
    ];

    const [selectedAnimation] = useState(
        loadingAnimations[Math.floor(Math.random() * loadingAnimations.length)]
    );

    useLayoutEffect(() => {
        navigation.setOptions(
            loading
                ? { headerShown: false } // Hide the header during loading
                : {
                      headerShown: true, // Show the header after loading
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (route.params.origin === 'ResumeSection') {
                                        // Navigate directly to HomeScreen if accessed via ResumeSection
                                        navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [{ name: 'HomeScreen' }],
                                            })
                                        );
                                    } else if (route.params.origin === 'SearchScreen') {
                                        // Navigate back to SearchScreen if accessed via SearchScreen
                                        navigation.goBack();
                                    } else {
                                        // Default: Reset stack to SubchaptersScreen
                                        navigation.dispatch(
                                            CommonActions.reset({
                                                index: 1,
                                                routes: [
                                                    {
                                                        name: 'YearsScreen',
                                                        params: { chapterId },
                                                    }, // Add YearsScreen to stack
                                                    {
                                                        name: 'SubchaptersScreen',
                                                        params: {
                                                            chapterId,
                                                            chapterTitle,
                                                        },
                                                    }, // Reset to SubchaptersScreen
                                                ],
                                            })
                                        );
                                    }
                                }}
                                style={{ marginLeft: 15 }}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color={theme.primaryText}
                                />
                            </TouchableOpacity>
                        ),
                        headerRight: () => null, // Remove any headerRight component if it exists
                        headerStyle: {
                            backgroundColor: theme.surface, // Dynamic background for dark mode
                        },
                    }
            );
    }, [
        loading, // Re-run whenever the loading state changes
        navigation,
        chapterId,
        chapterTitle,
        route.params.origin,
        theme,
    ]);
    

    useEffect(() => {
        console.log("maxIndexVisited updated:", maxIndexVisited);
    }, [maxIndexVisited]);

    // Always reset to the first slide when entering a subchapter
    useEffect(() => {
        setCurrentIndex(0);
    }, [subchapterId]);


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
        if (!loading) {
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
        }
    }, [currentIndex, contentData.length, loading]);

    useEffect(() => {
        const loadInitialMaxIndex = async () => {
            try {
                const savedProgress = await loadProgress('section1');
                console.log("Saved progress:", savedProgress);
                if (savedProgress?.currentIndex !== null && maxIndexVisited === -1) {
                    console.log("Setting maxIndexVisited from saved progress:", savedProgress.currentIndex);
                    setMaxIndexVisited(savedProgress.currentIndex);
                }
            } catch (error) {
                console.error("Error loading initial maxIndexVisited:", error);
            }
        };
    
        loadInitialMaxIndex();
    }, [maxIndexVisited]);
    

    const handleNextContent = async () => {
        if (currentIndex > maxIndexVisited) return;
        
        const nextIndex = currentIndex + 1;

        if (nextIndex < contentData.length) {
            const nextContent = contentData[nextIndex];
            const isQuiz = 'QuizId' in nextContent;
        
            const subchapters = await fetchSubchaptersByChapterId(chapterId);
            const currentSubchapter = subchapters.find(sub => sub.SubchapterId === subchapterId);
            const imageName = currentSubchapter?.ImageName || null;
        
            // Only update maxIndexVisited for new slides
            if (nextIndex > maxIndexVisited) {
                setMaxIndexVisited(nextIndex);
            }
        
            setCurrentIndex(() => {
                setShowQuiz(isQuiz); // Handle quiz display
                return nextIndex;
            });
        
            // Only save progress if not from SearchScreen
            if (origin !== 'SearchScreen') {
                await saveProgress(
                    'section1',
                    chapterId,
                    subchapterId,
                    subchapterTitle,
                    nextIndex,
                    imageName
                );
            }
        }
         else {
            const subchapters = await fetchSubchaptersByChapterId(chapterId);
            const currentSubchapter = subchapters.find(sub => sub.SubchapterId === subchapterId);
            const imageName = currentSubchapter?.ImageName || null;

            setNavigating(true);

            setTimeout(async () => {
                await completeSubchapter({
                    subchapterId,
                    chapterId,
                    chapterTitle,
                    navigation,
                    markSubchapterAsFinished,
                    unlockSubchapter,
                    origin,
                });
            }, 200); // Delay to ensure smooth transition
        }
    };

    const goBack = () => {
        // Skip quiz slides and navigate to the previous content slide
        let newIndex = currentIndex - 1;

        // Find the nearest previous ContentSlide
        while (newIndex >= 0 && 'QuizId' in contentData[newIndex]) {
            newIndex--;
        }

        // Only update index if a valid ContentSlide is found
        if (newIndex >= 0) {
            setShowQuiz(false); // Exit quiz mode
            setCurrentIndex(newIndex);
        }
    };

    if (loading || navigating) {
        return (
            <View style={styles.loadingContainer}>
                <LottieView
                    source={selectedAnimation}
                    autoPlay
                    loop
                    style={styles.animation}
                />
            </View>
        );
    }

    const isForwardArrowDisabled =
    loading || currentIndex > maxIndexVisited || currentIndex >= contentData.length - 1;

    console.log(
        "Forward Arrow State:",
        "currentIndex:", currentIndex,
        "maxIndexVisited:", maxIndexVisited,
        "isForwardArrowDisabled:", isForwardArrowDisabled
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
            {showQuiz ? (
                <QuizSlide
                    contentId={(contentData[currentIndex] as Quiz).ContentId}
                    setShowQuiz={setShowQuiz}
                    onContinue={async () => {
                        setShowQuiz(false);
                        handleNextContent();
                    }}
                />
            ) : (
                <ContentSlide
                    contentData={contentData[currentIndex] as GenericContent}
                    onNext={handleNextContent}
                />
            )}

                <View style={styles.bottomNavContainer}>
                    {/* Back Arrow */}
                    <TouchableOpacity
                        onPress={goBack}
                        disabled={currentIndex === 0 || showQuiz}>
                        <Ionicons
                            name="chevron-back"
                            size={30}
                            color={currentIndex === 0 || showQuiz ? 'lightgray' : '#e8630a'}
                            style={styles.arrowStyle}
                        />
                    </TouchableOpacity>

                    {/* Forward Arrow */}
                    <TouchableOpacity
                        onPress={handleNextContent}
                        disabled={isForwardArrowDisabled}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={
                                loading || currentIndex >= contentData.length - 1 || currentIndex >= maxIndexVisited
                                    ? 'lightgray' // Deactivated arrow
                                    : '#e8630a'   // Activated arrow
                            }
                            style={styles.arrowStyle}
                        />
                        
                    </TouchableOpacity>

                </View>
            </View>
        </GestureHandlerRootView>
    );
}

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
        bottom: screenWidth > 600 ? 30 : 20,
        width: '100%',
    },
    arrowStyle: {
        opacity: 0.8,
        fontSize: screenWidth > 600 ? 42 : 34, // Larger size for tablets
    },

    progressBarContainer: {
        height: screenWidth > 600 ? 20 : 16,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    animation: {
        width: 250,
        height: 250,
    },
});

export default SubchapterContentScreen;
