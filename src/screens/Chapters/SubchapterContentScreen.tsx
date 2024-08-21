import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentSlide from '../ContentSlide';
import QuizSlide from '../Quiz/QuizSlide';
import NextSlideButton from '../NextSlideButton';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { GenericContent } from 'src/types/contentTypes';
import { fetchSubchapterContentBySubchapterId, fetchQuizByContentId } from 'src/database/databaseServices';
import { useSubchapter } from './SubchapterContext';

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
    const { markSubchapterAsFinished, unlockSubchapter } = useSubchapter();

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

    const nextContent = async () => {
        // Check if we're showing the quiz
        if (showQuiz) {
            // If the quiz is shown and completed, move to the next content item
            setShowQuiz(false);
            if (currentIndex < contentData.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                // If no more content, mark as finished
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
            // If the content is shown, check if there's a quiz associated with it
            const currentContentId = contentData[currentIndex].ContentId;

            try {
                const quizData = await fetchQuizByContentId(currentContentId);
                if (quizData.length > 0) {
                    // Show quiz if there's one associated with the content
                    setShowQuiz(true);
                } else {
                    // Otherwise, move directly to the next content
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
        <View style={styles.container}>
            {showQuiz ? (
                <QuizSlide contentId={contentData[currentIndex].ContentId} onContinue={nextContent} />
            ) : (
                <ContentSlide contentData={contentData[currentIndex]} onNext={nextContent} />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
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

export default SubchapterContentScreen;








