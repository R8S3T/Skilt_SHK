import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';


interface MathMiniQuiz {
    Question: string;
    Option1: string;
    Option2: string;
    Option3: string;
    Answer: string[];  // Array to handle multiple correct answers
    Image?: string; // Optional image
}

interface MathQuizSlideProps {
    quiz: MathMiniQuiz;  // Single quiz object
    onQuizComplete: (isCorrect: boolean) => void; // Callback when a quiz is completed
    onNextSlide: () => void; // Callback to go to the next quiz or content
}

const MathQuizSlide: React.FC<MathQuizSlideProps> = ({ quiz, onQuizComplete, onNextSlide }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

    const handleAnswerSubmit = () => {
        if (selectedOption && quiz.Answer.includes(selectedOption)) {
            setIsAnswerCorrect(true);
            onQuizComplete(true); // Notify parent about the correct answer
        } else {
            setIsAnswerCorrect(false);
            onQuizComplete(false); // Notify parent about the incorrect answer
        }
    };

    const renderOptions = () => {
        return [quiz.Option1, quiz.Option2, quiz.Option3].map((option, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.optionButton,
                    selectedOption === option && (isAnswerCorrect ? styles.correctOption : styles.incorrectOption)
                ]}
                onPress={() => setSelectedOption(option)}
            >
                <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
        ));
    };

    const renderImage = () => {
        if (quiz.Image) {
            const imageSource = imageMap[quiz.Image as keyof typeof imageMap];
            if (imageSource) {
                return <Image source={imageSource} style={styles.quizImage} />;
            }
        }
        return null;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.questionText}>{quiz.Question}</Text>
            {renderImage()}
            {/* Separate the answers and feedback */}
            <View style={styles.answerContainer}>
                {renderOptions()}
                {isAnswerCorrect !== null && (
                    <Text style={styles.feedbackText}>
                        {isAnswerCorrect ? 'Correct!' : 'Incorrect, please try again.'}
                    </Text>
                )}
            </View>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAnswerSubmit}
                disabled={selectedOption === null}
            >
                <Text style={styles.submitButtonText}>Submit Answer</Text>
            </TouchableOpacity>
            {isAnswerCorrect !== null && (
                <TouchableOpacity style={styles.continueButton} onPress={onNextSlide}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',  // Ensure content starts from the top
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2b4353',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFF',
        lineHeight: 30,
    },
    answerContainer: {
        flex: 1, // This ensures answer options don't shift up
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    optionButton: {
        backgroundColor: '#4CAF50', // Matching button style with MultipleChoice
        padding: 15,
        marginVertical: 10,
        width: '80%',
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#8fc2c2',
        borderWidth: 1,
    },
    optionText: {
        color: '#fff',
        fontSize: 18,
    },
    correctOption: {
        backgroundColor: '#32CD32',  // Correct option color
    },
    incorrectOption: {
        backgroundColor: '#FF6347',  // Incorrect option color
    },
    quizImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    feedbackText: {
        fontSize: 18,
        marginVertical: 10,
        color: '#FFF',
    },
    submitButton: {
        backgroundColor: '#2196F3', // Matching the blue from MultipleChoice
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    continueButton: {
        backgroundColor: '#008CBA', // Slightly adjusted blue for continue button
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});


export default MathQuizSlide;
