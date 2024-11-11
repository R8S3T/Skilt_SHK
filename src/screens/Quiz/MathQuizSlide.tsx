import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
        // Check if the selected option is in the array of correct answers
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
        <View style={styles.container}>
            <Text style={styles.questionText}>{quiz.Question}</Text>
            {renderImage()}
            {renderOptions()}
            {isAnswerCorrect !== null && (
                <Text style={styles.feedbackText}>
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect, please try again.'}
                </Text>
            )}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        marginVertical: 10,
        width: '80%',
        borderRadius: 5,
        alignItems: 'center',
    },
    optionText: {
        color: '#fff',
        fontSize: 18,
    },
    correctOption: {
        backgroundColor: '#32CD32',
    },
    incorrectOption: {
        backgroundColor: '#FF6347',
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
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    continueButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default MathQuizSlide;
