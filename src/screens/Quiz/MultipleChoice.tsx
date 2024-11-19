import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ControlButtons from './ControlButtons';
import { Quiz, MultipleChoiceOption } from 'src/types/contentTypes';

interface MultipleChoiceProps {
    quiz: Quiz;
    options: MultipleChoiceOption[];
    onAnswerSubmit: (isCorrect: boolean) => void;
    onContinue: () => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ quiz, options, onAnswerSubmit, onContinue }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [submitButtonText, setSubmitButtonText] = useState<string>('Bestätigen');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleAnswer = (option: string) => {
        setSelectedOption(option);
        setShowFeedback(false);
        setIsAnswerCorrect(false);
        setSubmitButtonText('Bestätigen');
        setIsButtonDisabled(false);
    };

    const handleSubmit = () => {
        const isCorrect = selectedOption === quiz.Answer;
        setShowFeedback(true);
        setIsAnswerCorrect(isCorrect);

        if (isCorrect) {
            setSubmitButtonText('Weiter');
        } else {
            setIsButtonDisabled(true);
            onAnswerSubmit(false);
        }
    };

    const handleContinue = () => {
        onAnswerSubmit(true);
        onContinue();
    };

    const getButtonStyle = (option: string) => {
        let style = styles.option;

        if (showFeedback && selectedOption) {
            if (selectedOption === option) {
                if (option === quiz.Answer) {
                    style = { ...style, borderColor: '#32CD32', borderWidth: 4 };
                } else {
                    style = { ...style, borderColor: '#FF6347', borderWidth: 4 };
                }
            }
        } else if (option === selectedOption && !isAnswerCorrect) {
            style = { ...style, borderColor: '#8fc2c2', borderWidth: 4 };
        }
        return style;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.quizText}>{quiz.Question}</Text>
            {options.map((option, index) => (
                [option.OptionText1, option.OptionText2, option.OptionText3]
                    .filter(text => text) // Filter out empty option fields
                    .map((text, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={getButtonStyle(text)}
                            onPress={() => handleAnswer(text)}
                        >
                            <Text style={styles.optionText}>{text}</Text>
                        </TouchableOpacity>
                    ))
            ))}
            {showFeedback && (
                <Text style={styles.answerText}>
                    {selectedOption === quiz.Answer ? 'Richtig!' : 'Falsch, bitte versuche es nochmal.'}
                </Text>
            )}
            <ControlButtons
                onClear={() => setSelectedOption(null)}
                onSubmit={handleSubmit}
                onContinue={handleContinue}
                showBackspaceButton={false}
                submitButtonText={submitButtonText}
                disabled={isButtonDisabled}
                showClearButton={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2b4353',
    },
    quizText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 50,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#FFF',
        lineHeight: 30,
    },
    option: {
        backgroundColor: '#2b4353',
        minWidth: '85%',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8fc2c2',
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
        color: '#FFF',
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        textAlign: 'center',
    },
    answerText: {
        color: '#FFF',
        marginVertical: 20,
        fontSize: 18,
        textAlign: 'center',
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

