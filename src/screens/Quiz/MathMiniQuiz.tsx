import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import { MathMiniQuiz } from 'src/types/contentTypes';
import MiniQuizButton from '../MathScreen/MiniQuizButton';

interface MathMiniQuizProps {
    quiz: MathMiniQuiz;
    onQuizComplete: (isCorrect: boolean) => void;
    onQuizLayout: (event: LayoutChangeEvent) => void;
    onQuizAnswered: () => void;
}

const MathMiniQuizComponent: React.FC<MathMiniQuizProps> = ({
    quiz,
    onQuizComplete,
    onQuizLayout,
    onQuizAnswered,  // Use the new prop
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

    const handleAnswerSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (selectedOption) {
            const isCorrect = selectedOption === quiz.Answer;
            setIsAnswered(true);
            onQuizComplete(isCorrect);
            onQuizAnswered();
        }
    };

    // Create an array of options
    const options = [quiz.Option1, quiz.Option2, quiz.Option3].filter(Boolean);

    return (
        <View style={styles.quizContainer} onLayout={onQuizLayout}>
            <Text style={styles.questionText}>{quiz.Question}</Text>
            {options.map((option: string, index: number) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedOption === option && styles.selectedOption,
                        isAnswered && option === quiz.Answer && styles.correctOption,
                        isAnswered && selectedOption === option && option !== quiz.Answer && styles.incorrectOption,
                    ]}
                    onPress={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
            <MiniQuizButton
                label="Submit"
                onPress={handleSubmit}
                disabled={!selectedOption}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    quizContainer: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    selectedOption: {
        borderColor: '#007BFF',
        borderWidth: 2,
    },
    correctOption: {
        borderColor: 'green',
        borderWidth: 2,
        backgroundColor: '#d4edda',
    },
    incorrectOption: {
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: '#f8d7da',
    },
    optionText: {
        fontSize: 16,
    },
});

export default MathMiniQuizComponent;












