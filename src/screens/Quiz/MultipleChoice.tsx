// MultipleChoice.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Quiz, MultipleChoiceOption } from 'src/types/types';

interface MultipleChoiceProps {
    quiz: Quiz;
    options: MultipleChoiceOption[];
    onAnswerSubmit: (isCorrect: boolean) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ quiz, options, onAnswerSubmit }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handleAnswer = (option: string) => {
        setSelectedOption(option);
        setShowFeedback(false);
        setIsAnswerCorrect(false);
    };

    const handleSubmit = () => {
        const isCorrect = selectedOption === quiz.Answer;
        setShowFeedback(true);
        setIsAnswerCorrect(isCorrect);
        onAnswerSubmit(isCorrect);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{quiz.Question}</Text>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedOption === option.OptionText && styles.selectedOption,
                        showFeedback && option.OptionText === quiz.Answer && styles.correctOption,
                        showFeedback && selectedOption === option.OptionText && selectedOption !== quiz.Answer && styles.incorrectOption,
                    ]}
                    onPress={() => handleAnswer(option.OptionText)}
                >
                    <Text style={styles.optionText}>{option.OptionText}</Text>
                </TouchableOpacity>
            ))}
            {showFeedback && (
                <Text style={styles.feedback}>
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect, try again.'}
                </Text>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#d0d0d0',
    },
    correctOption: {
        backgroundColor: '#c8e6c9',
    },
    incorrectOption: {
        backgroundColor: '#ffcdd2',
    },
    optionText: {
        fontSize: 16,
    },
    feedback: {
        marginTop: 10,
        fontSize: 16,
        color: '#ff5722',
    },
    submitButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196f3',
        borderRadius: 5,
    },
    submitButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default MultipleChoice;
