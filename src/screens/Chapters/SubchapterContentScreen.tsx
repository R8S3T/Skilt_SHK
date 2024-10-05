import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ContentSlide from '../ContentSlide';
import QuizSlide from '../Quiz/QuizSlide';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { GenericContent } from 'src/types/contentTypes';
import { fetchSubchapterContentBySubchapterId, fetchQuizByContentId } from 'src/database/databaseServices';
import { useSubchapter } from './SubchapterContext';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; // Import icon library

type SubchapterContentScreenRouteProp = RouteProp<LearnStackParamList, 'SubchapterContentScreen'>;
type SubchapterContentScreenNavigationProp = StackNavigationProp<LearnStackParamList, 'SubchapterContentScreen'>;

type Props = {
    route: SubchapterContentScreenRouteProp;
    navigation: SubchapterContentScreenNavigationProp;
};

const SubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterTitle, chapterId=0, chapterTitle=''  } = route.params;
    const [contentData, setContentData] = useState<GenericContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [maxIndexVisited, setMaxIndexVisited] = useState<number>(0); // Track the max index visited
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

    const nextContent = async () => {
        if (showQuiz) {
            setShowQuiz(false);
            if (currentIndex < contentData.length - 1) {
                setCurrentIndex((prevIndex) => {
                    const newIndex = prevIndex + 1;
                    setMaxIndexVisited(Math.max(maxIndexVisited, newIndex));
                    return newIndex;
                });
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
                        setCurrentIndex((prevIndex) => {
                            const newIndex = prevIndex + 1;
                            setMaxIndexVisited(Math.max(maxIndexVisited, newIndex));
                            return newIndex;
                        });
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
                    <QuizSlide contentId={contentData[currentIndex].ContentId} onContinue={nextContent} />
                ) : (
                    <ContentSlide contentData={contentData[currentIndex]} onNext={nextContent} />
                )}
                <View style={styles.bottomNavContainer}>
                    <TouchableOpacity onPress={goBack} disabled={currentIndex === 0}>
                        <Ionicons 
                            name="chevron-back" 
                            size={30}  // Subtle arrow size
                            color={currentIndex === 0 ? 'lightgray' : 'gray'}  // Gray for disabled state
                            style={styles.arrowStyle}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextContent} disabled={currentIndex === contentData.length - 1}>
                        <Text style={{ color: 'black', fontSize: 18 }}></Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={goForward} 
                        disabled={currentIndex >= maxIndexVisited || currentIndex === contentData.length - 1}
                    >
                        <Ionicons 
                            name="chevron-forward" 
                            size={30}  // Subtle arrow size
                            color={currentIndex >= maxIndexVisited || currentIndex === contentData.length - 1 ? 'lightgray' : 'gray'}  // Gray for disabled state
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
        padding: 0,
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

