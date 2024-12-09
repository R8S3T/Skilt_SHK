import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MultipleChoice from './MultipleChoice';
import ClozeTest from './ClozeTest';
import { fetchQuizByContentId, fetchMultipleChoiceOptionsByQuizId, fetchClozeTestOptionsByQuizId } from 'src/database/databaseServices';
import { Quiz, MultipleChoiceOption } from 'src/types/contentTypes';

const isClozeTestOptions = (
    options: MultipleChoiceOption[] | { options: string[]; correctAnswers: (string | null)[] }
): options is { options: string[]; correctAnswers: (string | null)[] } => {
    return (options as { options: string[] }).options !== undefined;
};

interface QuizSlideProps {
    contentId: number;
    onContinue: () => void;
    style?: ViewStyle;
    setShowQuiz: (show: boolean) => void;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ contentId, onContinue, style, setShowQuiz }) => {
    const navigation = useNavigation();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [options, setOptions] = useState<MultipleChoiceOption[] | { options: string[]; correctAnswers: (string | null)[] }>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadQuizOptions = async (quiz: Quiz) => {
        try {
            let fetchedOptions: MultipleChoiceOption[] | { options: string[]; correctAnswers: (string | null)[] };
            if (quiz.QuizType === 'multiple_choice') {
                fetchedOptions = await fetchMultipleChoiceOptionsByQuizId(quiz.QuizId);
            } else if (quiz.QuizType === 'cloze_test') {
                fetchedOptions = await fetchClozeTestOptionsByQuizId(quiz.QuizId);
            } else {
                throw new Error('Unsupported quiz type');
            }

            setOptions(fetchedOptions);
        } catch (err) {
            setError('Failed to load quiz options.');
            console.error(err);
        }
    };

    useEffect(() => {
        if (typeof navigation !== 'undefined') {
            navigation.setOptions({
                headerLeft: () => null,
            });
        }

        const loadQuizData = async () => {
            try {
                const fetchedQuizzes = await fetchQuizByContentId(contentId);
                if (fetchedQuizzes.length > 0) {
                    setQuizzes(fetchedQuizzes);
                    loadQuizOptions(fetchedQuizzes[0]);
                } else {
                    setError('No quiz found for this content.');
                }
            } catch (err) {
                setError('Failed to fetch quiz data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadQuizData();
    }, [contentId]);

    const handleContinue = async () => {
        const nextIndex = currentQuizIndex + 1;
        if (nextIndex < quizzes.length) {
            setOptions([]);
            setCurrentQuizIndex(nextIndex);
            loadQuizOptions(quizzes[nextIndex]);
        } else {
            setShowQuiz(false); // Ensure we exit quiz mode
            await onContinue(); // Call the parent-provided onContinue handler
        }
    };
    

    if (loading) {
        return <View style={{ flex: 1, backgroundColor: '#2b4353' }} />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (quizzes.length === 0) {
        return <Text>Hier scheint es wohl kein Quiz zu geben...</Text>;
    }

    const currentQuiz = quizzes[currentQuizIndex];

    return (
        <View style={[styles.slide, style]}>
            {currentQuiz.QuizType === 'multiple_choice' && Array.isArray(options) && (
                <MultipleChoice
                    key={`multiple-choice-${currentQuizIndex}`}
                    quiz={currentQuiz}
                    options={options}
                    onAnswerSubmit={(isCorrect) => {
                        if (isCorrect) {
                            handleContinue();
                        }
                    }}
                    onContinue={handleContinue}
                />
            )}
            {currentQuiz.QuizType === 'cloze_test' && !Array.isArray(options) && isClozeTestOptions(options) && (
                <ClozeTest
                    key={`cloze-test-${currentQuizIndex}`}
                    quiz={currentQuiz}
                    options={options.options}
                    correctAnswers={options.correctAnswers}
                    onAnswerSubmit={(isCorrect) => {
                        if (isCorrect) {
                            handleContinue();
                        }
                    }}
                    onContinue={handleContinue}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40, // Adjust vertical padding
        backgroundColor: '#2b4353',
    },
});

export default QuizSlide;
