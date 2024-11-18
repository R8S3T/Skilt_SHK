import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
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
}

const QuizSlide: React.FC<QuizSlideProps> = ({ contentId, onContinue, style }) => {
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
        const loadQuizData = async () => {
            try {
                const fetchedQuizzes = await fetchQuizByContentId(contentId);
                if (fetchedQuizzes.length > 0) {
                    setQuizzes(fetchedQuizzes);
                    loadQuizOptions(fetchedQuizzes[0]); // Load options for the first quiz
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

    const handleContinue = () => {
        const nextIndex = currentQuizIndex + 1;
        if (nextIndex < quizzes.length) {
            setCurrentQuizIndex(nextIndex);
            loadQuizOptions(quizzes[nextIndex]);
        } else {
            onContinue();
        }
    };

    if (loading) {
        return <Text>Loading quiz...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (quizzes.length === 0) {
        return <Text>No quiz found for this content.</Text>;
    }

    const currentQuiz = quizzes[currentQuizIndex];

    return (
        <View style={[styles.slide, style]}>
            {currentQuiz.QuizType === 'multiple_choice' && Array.isArray(options) && (
                <MultipleChoice
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
