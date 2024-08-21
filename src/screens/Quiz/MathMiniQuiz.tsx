import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import { MathMiniQuiz } from 'src/types/contentTypes';
import MiniQuizButton from '../MathScreen/MiniQuizButton';
import ContinueButton from '../MathScreen/MathContinueButton';

interface MathMiniQuizProps {
    quiz: MathMiniQuiz;
    onQuizComplete: (isCorrect: boolean) => void;
    onQuizLayout: (event: LayoutChangeEvent) => void;
    onQuizAnswered: () => void;
    onContinue: () => void;
}

const MathMiniQuizComponent: React.FC<MathMiniQuizProps> = ({
    quiz,
    onQuizComplete,
    onQuizLayout,
    onQuizAnswered,
    onContinue,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [showContinueButton, setShowContinueButton] = useState<boolean>(true);

    const handleAnswerSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(opt => opt !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleSubmit = () => {
        if (selectedOptions.length > 0) {
            const correctAnswers = quiz.Answer;
            const isCorrect = selectedOptions.every(opt => correctAnswers.includes(opt)) &&
                selectedOptions.length === correctAnswers.length;
            setIsAnswered(true);
            onQuizComplete(isCorrect);
            onQuizAnswered(); // Notify parent that the quiz has been answered
        }
    };

    const handleContinue = () => {
        setShowContinueButton(false);
        onContinue();
    };

    const options = [quiz.Option1, quiz.Option2, quiz.Option3].filter(Boolean);

    return (
        <View style={styles.quizContainer} onLayout={onQuizLayout}>
            <Text style={styles.questionText}>{quiz.Question}</Text>
            {options.map((option: string, index: number) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedOptions.includes(option) && styles.selectedOption,
                        isAnswered && quiz.Answer.includes(option) && styles.correctOption,
                        isAnswered && selectedOptions.includes(option) && !quiz.Answer.includes(option) && styles.incorrectOption,
                    ]}
                    onPress={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
            <View style={styles.buttonContainer}>
                <MiniQuizButton
                    label="Submit"
                    onPress={handleSubmit}
                    disabled={selectedOptions.length === 0}
                />
                {showContinueButton && (
                    <ContinueButton
                        label="Continue"
                        onPress={handleContinue}
                        disabled={!isAnswered}
                        style={styles.continueButton}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    quizContainer: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    continueButton: {
        width: 150,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
});

export default MathMiniQuizComponent;














