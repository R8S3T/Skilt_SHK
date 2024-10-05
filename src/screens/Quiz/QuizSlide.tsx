import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import MultipleChoice from './MultipleChoice';
import ClozeTest from './ClozeTest';
import { fetchQuizByContentId, fetchMultipleChoiceOptionsByQuizId, fetchClozeTestOptionsByQuizId } from 'src/database/databaseServices';
import { Quiz, MultipleChoiceOption, ClozeTestOption } from 'src/types/contentTypes';
import Constants from 'expo-constants'; // Import Constants to access environment variables

interface QuizSlideProps {
    contentId: number;
    onContinue: () => void;
    style?: ViewStyle;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ contentId, onContinue, style }) => {
    // Access the SHOW_QUIZZES variable from the environment
    const showQuizzes = Constants.manifest?.extra?.SHOW_QUIZZES === 'true';

    // If quizzes are disabled, return a message
    if (!showQuizzes) {
        return <Text>Quizzes are disabled in settings.</Text>;
    }

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [options, setOptions] = useState<(MultipleChoiceOption[] | ClozeTestOption[])>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadQuizOptions = async (quiz: Quiz) => {
        try {
            let fetchedOptions: MultipleChoiceOption[] | ClozeTestOption[] = [];
            if (quiz.QuizType === 'multiple_choice') {
                fetchedOptions = await fetchMultipleChoiceOptionsByQuizId(quiz.QuizId);
            } else if (quiz.QuizType === 'cloze_test') {
                const clozeTestOptions = await fetchClozeTestOptionsByQuizId(quiz.QuizId);
                fetchedOptions = clozeTestOptions.map(option => ({
                    ...option,
                    OptionTexts: typeof option.OptionTexts === 'string'
                        ? option.OptionTexts.split(', ').map(text => text.trim())
                        : option.OptionTexts
                }));
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
                setError('Failed to load quiz data.');
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
            loadQuizOptions(quizzes[nextIndex]); // Load options for the next quiz
        } else {
            // All quizzes completed
            onContinue(); // Call the parent's continue function
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
            {currentQuiz.QuizType === 'multiple_choice' && (
                <MultipleChoice
                    quiz={currentQuiz}
                    options={options as MultipleChoiceOption[]}
                    onAnswerSubmit={(isCorrect) => {
                        if (isCorrect) {
                            handleContinue();
                        }
                    }}
                    onContinue={handleContinue}
                />
            )}
            {currentQuiz.QuizType === 'cloze_test' && (
                <ClozeTest
                    quiz={currentQuiz}
                    options={options as ClozeTestOption[]}
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


