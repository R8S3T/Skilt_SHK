import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MathContentSlide from './MathContentslide';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { GenericContent, MathMiniQuiz } from 'src/types/contentTypes';
import { useSubchapter } from '../Chapters/SubchapterContext';
import { fetchMathContentBySubchapterId, fetchMathMiniQuizByContentId } from 'src/database/databaseServices';

type MathSubchapterContentScreenRouteProp = RouteProp<MathStackParamList, 'MathSubchapterContentScreen'>;
type MathSubchapterContentScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathSubchapterContentScreen'>;

type Props = {
    route: MathSubchapterContentScreenRouteProp;
    navigation: MathSubchapterContentScreenNavigationProp;
};

const MathSubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterTitle, chapterId, chapterTitle } = route.params;
    const [contentData, setContentData] = useState<GenericContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const { markSubchapterAsFinished, unlockSubchapter } = useSubchapter();
    const [mathMiniQuizzes, setMathMiniQuizzes] = useState<MathMiniQuiz[]>([]);
    const [completedQuizzes, setCompletedQuizzes] = useState<boolean[]>([]);

    useEffect(() => {
        navigation.setOptions({ title: subchapterTitle });

        const loadData = async () => {
            try {
                const data = await fetchMathContentBySubchapterId(subchapterId);
                setContentData(data);
                setLoading(false);

                if (data.length > 0) {
                    const fetchedMathMiniQuizzes = await fetchMathMiniQuizByContentId(data[currentIndex].ContentId) as MathMiniQuiz[];
                    setMathMiniQuizzes(fetchedMathMiniQuizzes);
                    setCompletedQuizzes(new Array(fetchedMathMiniQuizzes.length).fill(false));  // Initialize completedQuizzes
                }
            } catch (error) {
                console.error('Failed to load content data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, [navigation, subchapterId, subchapterTitle, currentIndex]);

    useEffect(() => {
        console.log('Current Index:', currentIndex);

        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    }, [currentIndex]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading ...</Text>
            </View>
        );
    }

    const nextContent = () => {
        if (currentIndex < contentData.length - 1) {
            setCurrentIndex(currentIndex + 1);

            // Scroll to the top of the new slide
            if (scrollViewRef.current) {
                setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                }, 100); // Add a slight delay to ensure the new content is loaded
            }
        } else {
            markSubchapterAsFinished(subchapterId);
            unlockSubchapter(subchapterId + 1);
            navigation.navigate('MathCongratsScreen', {
                targetScreen: 'MathSubchapterScreen',
                targetParams: {
                    chapterId: chapterId,
                    chapterTitle: chapterTitle,
                },
            });
        }
    };

    return (
        <View style={styles.container}>
            {contentData.length > 0 && (
                <MathContentSlide
                    contentData={contentData[currentIndex]}
                    mathMiniQuizzes={mathMiniQuizzes}
                    onQuizComplete={(isCorrect) => {
                        // Handle quiz completion
                        console.log('Quiz completed:', isCorrect);
                    }}
                    onQuizLayout={(event) => {
                        // Handle quiz layout changes if needed
                    }}
                    completedQuizzes={completedQuizzes}
                    onNextSlide={nextContent}  // Move to the next slide
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
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





