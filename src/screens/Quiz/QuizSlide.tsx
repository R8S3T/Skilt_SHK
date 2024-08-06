import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MultipleChoice from './MultipleChoice';
import { fetchQuizByContentId, fetchMultipleChoiceOptionsByQuizId } from 'src/database/databaseServices';
import { Quiz, MultipleChoiceOption } from 'src/types/types';

interface QuizSlideProps {
    contentId: number;
    onContinue: () => void;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ contentId, onContinue }) => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [options, setOptions] = useState<MultipleChoiceOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadQuizData = async () => {
            try {
                const fetchedQuiz = await fetchQuizByContentId(contentId);
                if (fetchedQuiz.length > 0) {
                    setQuiz(fetchedQuiz[0]);
                    const fetchedOptions = await fetchMultipleChoiceOptionsByQuizId(fetchedQuiz[0].QuizId);
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
        <View style={styles.slide}>
            <MultipleChoice quiz={quiz} options={options} onAnswerSubmit={(isCorrect) => {}} />
            <View style={styles.buttonContainer}>
                <Button title="Continue" onPress={onContinue} />
            </View>
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
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default QuizSlide;



