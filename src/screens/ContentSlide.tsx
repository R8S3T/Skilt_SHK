import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { GenericContent, Quiz, MultipleChoiceOption } from 'src/types/types';
import MultipleChoice from './Quiz/MultipleChoice';
import { fetchQuizByContentId, fetchMultipleChoiceOptionsByQuizId } from 'src/database/databaseServices';

interface ContentSlideProps {
    contentData: GenericContent;
    contentType?: string;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, contentType }) => {
    const { TextContent, ContentData, ImageUrl, Quiz: quizData } = contentData;
    const displayText = TextContent || ContentData;
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [options, setOptions] = useState<MultipleChoiceOption[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (contentType === 'subchapter' && quizData) {
            const loadQuizData = async () => {
                try {
                    const fetchedQuiz = await fetchQuizByContentId(contentData.ContentId);
                    if (fetchedQuiz.length > 0) {
                        setQuiz(fetchedQuiz[0]);
                        const fetchedOptions = await fetchMultipleChoiceOptionsByQuizId(fetchedQuiz[0].QuizId);
                        setOptions(fetchedOptions);
                    } else {
                        setError('No quiz found for this content.');
                    }
                } catch (err) {
                    setError('Failed to fetch quiz data.');
                } finally {
                    setLoading(false);
                }
            };

            loadQuizData();
        } else {
            setLoading(false);
        }
    }, [contentData.ContentId, contentType, quizData]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.slide}>
            {ImageUrl && <Image source={{ uri: ImageUrl }} style={styles.image} />}
            <Text style={styles.contentText}>{displayText}</Text>
            {contentType === 'subchapter' && quiz && options.length > 0 && (
                <MultipleChoice quiz={quiz} options={options} onAnswerSubmit={(isCorrect) => {}} />
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
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    contentText: {
        fontSize: 16,
        marginBottom: 10,
    },
    quizContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    quizQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quizOption: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ContentSlide;








