import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ViewStyle } from 'react-native';
import MultipleChoice from './MultipleChoice';
import ClozeTest from './ClozeTest';
import { fetchQuizByContentId, fetchMultipleChoiceOptionsByQuizId, fetchClozeTestOptionsByQuizId } from 'src/database/databaseServices';
import { Quiz, MultipleChoiceOption, ClozeTestOption } from 'src/types/contentTypes';

interface QuizSlideProps {
    contentId: number;
    onContinue: () => void;
    style?: ViewStyle;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ contentId, onContinue, style }) => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [options, setOptions] = useState<(MultipleChoiceOption[] | ClozeTestOption[])>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadQuizData = async () => {
            try {
                const fetchedQuiz = await fetchQuizByContentId(contentId);
                if (fetchedQuiz.length > 0) {
                    const quizData = fetchedQuiz[0];
                    const quiz = {
                        ...quizData,
                        Type: quizData.QuizType // Map QuizType to Type
                    };
                    setQuiz(quiz);

                    let fetchedOptions: MultipleChoiceOption[] | ClozeTestOption[] = [];
                    if (quiz.Type === 'multiple_choice') {
                        fetchedOptions = await fetchMultipleChoiceOptionsByQuizId(quiz.QuizId);
                    } else if (quiz.Type === 'cloze_test') {
                        const clozeTestOptions = await fetchClozeTestOptionsByQuizId(quiz.QuizId);
                        fetchedOptions = clozeTestOptions.map(option => ({
                            ...option,
                            OptionTexts: typeof option.OptionTexts === 'string'
                                ? option.OptionTexts.split(', ').map(text => text.trim()) // Ensure OptionTexts is a string
                                : option.OptionTexts // If it's already an array, keep it as is
                        }));
                    }

                    setOptions(fetchedOptions);
                } else {
                    setError('No quiz found for this content.');
                }
            } catch (err) {
                setError('Failed to load quiz data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadQuizData();
    }, [contentId]);

    if (loading) {
        return <Text>Loading quiz...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!quiz) {
        return <Text>No quiz found for this content.</Text>;
    }

    return (
        <View style={[styles.slide, style]}>
            {quiz.QuizType === 'multiple_choice' && (
                <MultipleChoice
                    quiz={quiz}
                    options={options as MultipleChoiceOption[]}
                    onAnswerSubmit={(isCorrect) => {
                        if (isCorrect) {
                            onContinue();
                        }
                    }}
                    onContinue={onContinue}
                />
            )}
            {quiz.QuizType === 'cloze_test' && (
                <ClozeTest
                    quiz={quiz}
                    options={options as ClozeTestOption[]}
                    onAnswerSubmit={(isCorrect) => {
                        if (isCorrect) {
                            onContinue();
                        }
                    }}
                    onContinue={onContinue}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 0,
        backgroundColor: '#2b4353',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default QuizSlide;




