import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentSlide from '../ContentSlide';
import QuizSlide from '../Quiz/QuizSlide';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { GenericContent } from 'src/types/contentTypes';
import { fetchSubchapterContentBySubchapterId, fetchQuizByContentId } from 'src/database/databaseServices';
import { useSubchapter } from './SubchapterContext';
import { LinearGradient } from 'expo-linear-gradient';

type SubchapterContentScreenRouteProp = RouteProp<LearnStackParamList, 'SubchapterContentScreen'>;
type SubchapterContentScreenNavigationProp = StackNavigationProp<LearnStackParamList, 'SubchapterContentScreen'>;

type Props = {
    route: SubchapterContentScreenRouteProp;
    navigation: SubchapterContentScreenNavigationProp;
};

const SubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterTitle, chapterId, chapterTitle } = route.params;
    const [contentData, setContentData] = useState<GenericContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    const [canSwipeNext, setCanSwipeNext] = useState<boolean>(false);
    const [isVerticalSwipe, setIsVerticalSwipe] = useState<boolean>(false); // Track vertical swipes

    const { markSubchapterAsFinished, unlockSubchapter } = useSubchapter();
    const scrollViewRef = useRef(null); // We no longer need ScrollView here, but we'll handle simultaneous gestures

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

    useEffect(() => {
        const progress = (currentIndex + 1) / contentData.length;
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <View style={styles.progressBarContainer}>
                        <LinearGradient
                            colors={['#4CAF50', '#81C784']} // Gradient colors
                            start={[0, 0]}
                            end={[1, 0]}
                            style={[styles.progressBar, { width: `${progress * 100}%` }]}
                        />
                    </View>
                </View>
            ),
        });
    }, [currentIndex, contentData.length]);

    // Handle swipe gestures and detect swipe direction
    const handleSwipe = (event: any) => {
        const { translationX, translationY } = event.nativeEvent;

        // Determine if swipe is vertical or horizontal
        if (Math.abs(translationY) > Math.abs(translationX)) {
            setIsVerticalSwipe(true); // Swipe is vertical, avoid horizontal swipe
        } else {
            setIsVerticalSwipe(false); // Swipe is horizontal, allow slide change
        }
    };

    const onSwipeEnd = (event: any) => {
        if (isVerticalSwipe) return; // Prevent horizontal swipes if it's a vertical gesture

        const { translationX } = event.nativeEvent;

        if (translationX > 50 && currentIndex > 0) {
            // Swipe right to go back to the previous slide
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else if (translationX < -50 && currentIndex < contentData.length - 1 && canSwipeNext) {
            // Swipe left to go to the next slide, only if the next button has been pressed
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setCanSwipeNext(false); // Reset the flag for the next slide
        }
    };

    const nextContent = async () => {
        setCanSwipeNext(true); // Allow swiping to the next slide once the button is pressed
        if (showQuiz) {
            setShowQuiz(false);
            if (currentIndex < contentData.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                markSubchapterAsFinished(subchapterId);
                unlockSubchapter(subchapterId + 1);
                navigation.navigate('CongratsScreen', {
                    targetScreen: 'SubchaptersScreen',
                    targetParams: {
                        chapterId: chapterId,
                        chapterTitle: chapterTitle,
                    },
                });
            }
        } else {
            const currentContentId = contentData[currentIndex].ContentId;
            try {
                const quizData = await fetchQuizByContentId(currentContentId);
                if (quizData.length > 0) {
                    setShowQuiz(true);
                } else {
                    if (currentIndex < contentData.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                    } else {
                        markSubchapterAsFinished(subchapterId);
                        unlockSubchapter(subchapterId + 1);
                        navigation.navigate('CongratsScreen', {
                            targetScreen: 'SubchaptersScreen',
                            targetParams: {
                                chapterId: chapterId,
                                chapterTitle: chapterTitle,
                            },
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to check for quiz:', error);
            }
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
        <PanGestureHandler 
            onGestureEvent={handleSwipe}
            onHandlerStateChange={onSwipeEnd}
        >
            <View style={styles.container}>
                {showQuiz ? (
                    <QuizSlide contentId={contentData[currentIndex].ContentId} onContinue={nextContent} />
                ) : (
                    <ContentSlide
                        contentData={contentData[currentIndex]}
                        onNext={nextContent}
                    />
                )}
            </View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    progressBarContainer: {
        height: 16,
        width: '95%',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 10,
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









