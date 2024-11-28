import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MathContentSlide from './MathContentSlide';
import MathQuizSlide from '../Quiz/MathQuizSlide';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { GenericContent, MathMiniQuiz } from 'src/types/contentTypes';
import { useMathSubchapter } from '../../context/MathSubchapterContext';
import { fetchMathContentBySubchapterId, fetchMathMiniQuizByContentId } from 'src/database/databaseServices';
import { useTheme } from 'src/context/ThemeContext';
import { usePreloadContent } from 'src/hooks/usePreloadContent';
import { saveProgress, loadProgress } from 'src/utils/progressUtils';

type MathSubchapterContentScreenRouteProp = RouteProp<MathStackParamList, 'MathSubchapterContentScreen'>;
type MathSubchapterContentScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathSubchapterContentScreen'>;

type Props = {
    route: MathSubchapterContentScreenRouteProp;
    navigation: MathSubchapterContentScreenNavigationProp;
};

const MathSubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterTitle, chapterId, chapterTitle } = route.params;
    const { isDarkMode, theme } = useTheme();
    const [contentData, setContentData] = useState<GenericContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const { markSubchapterAsFinished, unlockSubchapter } = useMathSubchapter();
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    const [mathQuiz, setMathQuiz] = useState<MathMiniQuiz | null>(null);
    const [mathMiniQuizzes, setMathMiniQuizzes] = useState<MathMiniQuiz[]>([]);
    const [completedQuizzes, setCompletedQuizzes] = useState<boolean[]>([]);
    const { finishedSubchapters } = useMathSubchapter();


// Configure navigation header
useEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity
                onPress={async () => {
                    const isSubchapterFinished = finishedSubchapters.includes(subchapterId);
                    if (isSubchapterFinished) {
                        await saveProgress(
                            'math',
                            chapterId,
                            subchapterId,
                            subchapterTitle,
                            currentIndex,
                            null
                        );
                    }
                    // Use reset to ensure no duplicate stack
                    navigation.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'MathSubchapterScreen',
                                params: {
                                    chapterId,
                                    chapterTitle,
                                    origin: 'MathChapterScreen',
                                },
                            },
                        ],
                    });
                }}
                style={{ marginLeft: 15 }}
            >
                <Ionicons name="close" size={24} color={theme.primaryText} />
            </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.primaryText,
        title: subchapterTitle,
    });
}, [
    navigation,
    chapterId,
    chapterTitle,
    theme,
    subchapterTitle,
    finishedSubchapters,
    currentIndex,
]);



    // Load content data and initial quiz
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch content data
                const content = await fetchMathContentBySubchapterId(subchapterId);
                setContentData(content);

                // Check if the subchapter is marked as finished
                const savedFinished = await loadProgress('mathFinished');
                console.log('Loaded Finished Subchapters:', savedFinished);

                const isSubchapterFinished = Array.isArray(savedFinished) && savedFinished.includes(subchapterId);

                if (isSubchapterFinished) {
                    // If finished, resume from the last saved progress
                    const savedProgress = await loadProgress('math');

                    if (
                        savedProgress &&
                        savedProgress.subchapterId === subchapterId &&
                        savedProgress.currentIndex !== null
                    ) {
                        const validIndex = Math.min(savedProgress.currentIndex, content.length - 1);
                        setCurrentIndex(validIndex);

                        // Fetch quiz for the saved content
                        const quizzes = await fetchMathMiniQuizByContentId(content[validIndex]?.ContentId);
                        setMathQuiz(quizzes[0] || null);
                    }
                } else if (content.length > 0) {
                    // Default to the first slide and its quiz if not finished
                    setCurrentIndex(0);
                    const quizzes = await fetchMathMiniQuizByContentId(content[0].ContentId);
                    setMathQuiz(quizzes[0] || null);
                }
            } catch (error) {
                console.error('Failed to load content data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [subchapterId]);

    // Scroll to top on content index change
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    }, [currentIndex]);

    const { getNextContent, preloading } = usePreloadContent(
        currentIndex,
        async (contentId) => {
            const quizzes = await fetchMathMiniQuizByContentId(contentId);
            return quizzes[0] || null;
        }
    );

    const nextContent = async () => {
        if (showQuiz && currentIndex < contentData.length - 1) {
            // Move to the next content slide
            const newIndex = currentIndex + 1;
            setShowQuiz(false);
            setCurrentIndex(newIndex);

            // Save progress
            await saveProgress(
                'math',
                chapterId,
                subchapterId,
                subchapterTitle,
                newIndex,
                null // Pass imageName if needed
            );

            // Use preloaded quiz if available
            const preloadedQuiz = getNextContent();
            if (preloadedQuiz) {
                setMathQuiz(preloadedQuiz);
            } else {
                // Fallback to fetching the quiz
                const quizzes = await fetchMathMiniQuizByContentId(contentData[newIndex]?.ContentId);
                setMathQuiz(quizzes[0] || null);
            }
        } else if (showQuiz) {
            // All content and quizzes completed, navigate to the congrats screen
            markSubchapterAsFinished(subchapterId);
            unlockSubchapter(subchapterId + 1);
            navigation.navigate('MathCongratsScreen', {
                subchapterId,
                targetScreen: 'MathSubchapterScreen',
                targetParams: {
                    chapterId,
                    chapterTitle,
                },
            });
        } else {
            // Toggle to show the quiz after the content slide
            setShowQuiz(true);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {loading ? (
                <Text style={{ color: theme.primaryText }}>Daten werden geladen ...</Text>
            ) : (
                showQuiz && mathQuiz ? (
                    <MathQuizSlide
                        quiz={mathQuiz}
                        onQuizComplete={(isCorrect) => console.log(isCorrect ? 'Correct' : 'Incorrect')}
                        onNextSlide={nextContent}
                    />
                ) : (
                    <MathContentSlide
                        contentData={contentData[currentIndex]}
                        mathMiniQuizzes={mathMiniQuizzes}
                        onQuizComplete={(isCorrect) => console.log(isCorrect ? 'Correct' : 'Incorrect')}
                        onQuizLayout={(event) => {}}
                        completedQuizzes={completedQuizzes}
                        onNextSlide={nextContent}
                    />
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    nextButton: {
        marginLeft: 10,
    },
});

export default MathSubchapterContentScreen;
