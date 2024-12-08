import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ControlButtons from './ControlButtons';
import { Quiz, MultipleChoiceOption } from 'src/types/contentTypes';
import { screenWidth, scaleFontSize } from 'src/utils/screenDimensions';

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
                    {selectedOption === quiz.Answer ? 'Richtig! Gut gemacht.' : 'Falsch, bitte versuche es nochmal.'}
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
        fontSize: screenWidth > 600 ? 26 : 20,
        fontWeight: 'bold',
        marginTop: screenWidth > 600 ? 60 : 40,
        marginBottom: screenWidth > 600 ? 60 : 50,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#FFF',
        lineHeight: screenWidth > 600 ? 40 : 30,
    },
    option: {
        backgroundColor: '#2b4353',
        minWidth: screenWidth > 600 ? '90%' : '85%',
        padding: screenWidth > 600 ? 25 : 20,
        marginVertical: screenWidth > 600 ? 15 : 10,
        marginHorizontal: 20,
        borderRadius: 8,
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
        fontSize: screenWidth > 600 ? 24 : 18,
        textAlign: 'center',
    },
    answerText: {
        color: '#FFF',
        marginVertical: screenWidth > 600 ? 30 : 20,
        fontSize: screenWidth > 600 ? 22 : 18,
        textAlign: 'center',
    },
});

export default MultipleChoice;

