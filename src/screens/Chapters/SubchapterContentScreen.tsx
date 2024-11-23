// src/screens/SubchapterContentScreen.tsx

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ContentSlide from '../ContentSlide';
import QuizSlide from '../Quiz/QuizSlide';
import { Quiz } from 'src/types/contentTypes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { GenericContent } from 'src/types/contentTypes';
import { fetchSubchapterContentBySubchapterId } from 'src/database/databaseServices';
import { useSubchapter } from '../../context/SubchapterContext';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import {  loadProgress, nextContent } from 'src/utils/progressUtils';
import { completeSubchapter } from 'src/utils/progressUtils';
import { useTheme } from 'src/context/ThemeContext';
import LottieView from 'lottie-react-native';

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
    const [contentData, setContentData] = useState<(GenericContent | Quiz)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [maxIndexVisited, setMaxIndexVisited] = useState<number>(0);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    const { theme, isDarkMode } = useTheme();
    
    const { finishedSubchapters, markSubchapterAsFinished, unlockSubchapter } = useSubchapter();

    const loadingAnimations = [
/*         require('../../../assets/Animations/loading.json'), */
        require('../../../assets/Animations/loeading_2.json'),
/*         require('../../../assets/Animations/loading_3.json'), */
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
                                      navigation.navigate('HomeScreen');
                                  } else {
                                      // Otherwise, navigate back to SubchaptersScreen
                                      navigation.navigate('SubchaptersScreen', {
                                          chapterId,
                                          chapterTitle,
                                      });
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
    

    // Handle navigating to the next slide or finish using imported nextContent
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

    const goBack = () => {
        // Only navigate back if not in a quiz
        if (showQuiz) return;

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    if (loading) {
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
    

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
            {showQuiz ? (
                <QuizSlide
                    contentId={(contentData[currentIndex] as Quiz).ContentId}
                    onContinue={async () => {
                        console.log("Quiz finished. Completing subchapter.");
                        await completeSubchapter({
                            subchapterId,
                            chapterId,
                            chapterTitle,
                            navigation,
                            markSubchapterAsFinished,
                            unlockSubchapter,
                            origin,
                        });
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
                    <TouchableOpacity onPress={goBack} disabled={currentIndex === 0 || showQuiz}>
                        <Ionicons
                            name="chevron-back"
                            size={30}
                            color={currentIndex === 0 || showQuiz ? 'lightgray' : 'gray'}
                            style={styles.arrowStyle}
                        />
                    </TouchableOpacity>

                    {/* Forward Arrow */}
                    <TouchableOpacity
                        onPress={handleNextContent}
                        disabled={currentIndex === contentData.length - 1}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={currentIndex === contentData.length - 1 ? 'lightgray' : 'gray'}
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
