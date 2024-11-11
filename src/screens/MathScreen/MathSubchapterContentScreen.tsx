import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MathContentSlide from './MathContentslide';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { GenericContent, MathMiniQuiz } from 'src/types/contentTypes';
import { useMathSubchapter } from '../../context/MathSubchapterContext';
import { fetchMathContentBySubchapterId, fetchMathMiniQuizByContentId } from 'src/database/databaseServices';
import { useTheme } from 'src/context/ThemeContext';

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
    const [mathMiniQuizzes, setMathMiniQuizzes] = useState<MathMiniQuiz[]>([]);
    const [completedQuizzes, setCompletedQuizzes] = useState<boolean[]>([]);

    // Set the "X" button on the left side of the header
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('MathSubchapterScreen', { 
                        chapterId, 
                        chapterTitle, 
                        origin: 'HomeScreen'  // Pass the origin parameter here
                    })}
                    style={{ marginLeft: 15 }}
                >
                    <Ionicons name="close" size={24} color={theme.primaryText} />
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.primaryText,
            title: subchapterTitle,
        });
    }, [navigation, chapterId, chapterTitle, theme, subchapterTitle]);
    

    useEffect(() => {
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
    }, [subchapterId, currentIndex]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    }, [currentIndex]);

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Text style={{ color: theme.primaryText }}>Daten werden geladen ...</Text>
            </View>
        );
    }

    const nextContent = () => {
        if (currentIndex < contentData.length - 1) {
            setCurrentIndex(currentIndex + 1);
            if (scrollViewRef.current) {
                setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                }, 100);
            }
        } else {
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
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {contentData.length > 0 && (
                <MathContentSlide
                    contentData={contentData[currentIndex]}
                    mathMiniQuizzes={mathMiniQuizzes}
                    onQuizComplete={(isCorrect) => {}}
                    onQuizLayout={(event) => {}}
                    completedQuizzes={completedQuizzes}
                    onNextSlide={nextContent}
                />
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
