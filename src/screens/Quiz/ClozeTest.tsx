import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ControlButtons from './ControlButtons';
import SentenceWithBlanks from './SentenceWithBlanks';
import OptionButton from './OptionButton';
import { Quiz, AnswerStatus } from 'src/types/contentTypes';
import { screenWidth, scaleFontSize } from 'src/utils/screenDimensions';

interface ClozeTestProps {
    quiz: Quiz;
    options: string[];
    correctAnswers: (string | null)[];
    onAnswerSubmit: (isCorrect: boolean) => void;
    onContinue: () => void;
}

const ClozeTest: React.FC<ClozeTestProps> = ({ quiz, options, correctAnswers, onAnswerSubmit, onContinue }) => {
    const sentenceParts = useMemo(() => quiz.Question.split('_'), [quiz.Question]);

    const [selectedOptions, setSelectedOptions] = useState<AnswerStatus[]>(
        Array(sentenceParts.length - 1).fill({ answer: null, isCorrect: null })
    );
    const [submitButtonText, setSubmitButtonText] = useState('Bestätigen');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);

    // Reset state when a new quiz is loaded
    useEffect(() => {
        const resetOptions = Array(sentenceParts.length - 1).fill({ answer: null, isCorrect: null });
        setSelectedOptions(resetOptions);
        setSubmitButtonText('Bestätigen');
        setIsButtonDisabled(true);
    }, [sentenceParts]);

    const handleOptionSelect = (option: string) => {
        const newSelectedOptions = [...selectedOptions];
        const emptyIndex = newSelectedOptions.findIndex(opt => opt.answer === null);
        if (emptyIndex !== -1) {
            newSelectedOptions[emptyIndex] = { answer: option, isCorrect: null };
            setSelectedOptions(newSelectedOptions);
            setIsButtonDisabled(false);
        }
    };

    const handleSubmit = () => {
        if (submitButtonText === 'Weiter') {
            onAnswerSubmit(true);
            onContinue();
            return;
        }
    
        // Check correctness for each blank individually
        const newSelectedOptions = selectedOptions.map((opt, index) => ({
            ...opt,
            isCorrect: opt.answer === correctAnswers[index],
        }));
    
        setSelectedOptions(newSelectedOptions);
    
        // Determine overall correctness
        const isOverallCorrect = newSelectedOptions.every(opt => opt.isCorrect);
    
        if (isOverallCorrect) {
            setSubmitButtonText('Weiter');
            setAnswerFeedback('Richtig! Gut gemacht.'); // Correct feedback
        } else {
            setAnswerFeedback('Falsch. Bitte überprüfe deine Antworten.'); // Incorrect feedback
        }
    
        setIsButtonDisabled(!isOverallCorrect);
    };
    

    const handleClear = () => {
        setAnswerFeedback(null);

        const lastFilledIndex = selectedOptions
            .map((opt, index) => ({ ...opt, index }))
            .filter(opt => opt.answer !== null)
            .map(opt => opt.index)
            .pop();

        if (lastFilledIndex !== undefined) {
            const newSelectedOptions = [...selectedOptions];
            newSelectedOptions[lastFilledIndex] = { answer: null, isCorrect: null };
            setSelectedOptions(newSelectedOptions);
            setSubmitButtonText('Bestätigen');
            setIsButtonDisabled(true);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {selectedOptions.length === sentenceParts.length - 1 ? (
                <>
                    <View style={styles.sentenceContainer}>
                        <SentenceWithBlanks sentenceParts={sentenceParts} filledAnswers={selectedOptions} />
                    </View>
                    <View style={styles.optionsContainer}>
                        {options.map((option, idx) => (
                            <OptionButton
                                key={idx}
                                option={option}
                                onSelect={() => handleOptionSelect(option)}
                                isSelected={selectedOptions.some(opt => opt.answer === option)}
                            />
                        ))}
                    </View>
                    {answerFeedback && ( // Display feedback
                        <Text style={styles.answerFeedback}>{answerFeedback}</Text>
                    )}
                    <View style={styles.controlButtonsContainer}>
                        <ControlButtons
                            onSubmit={handleSubmit}
                            onClear={handleClear}
                            onContinue={onContinue}
                            submitButtonText={submitButtonText}
                            disabled={isButtonDisabled}
                            showBackspaceButton={true}
                        />
                    </View>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: screenWidth > 600 ? 25 : 10,
        paddingVertical: screenWidth > 600 ? 60 : 40,
        backgroundColor: '#2b4353',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginVertical: screenWidth > 600 ? 50 : 30,
        padding: screenWidth > 600 ? 15 : 10,
    },
    sentenceContainer: {
        marginBottom: screenWidth > 600 ? 50 : 40,
    },
    controlButtonsContainer: {
        marginTop: screenWidth > 600 ? 60 : 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    answerFeedback: {
        color: '#FFF',
        fontSize: screenWidth > 600 ? 22 : 18,
        textAlign: 'center',
        marginVertical: 20,
        fontWeight: 'bold',
    },
});


export default ClozeTest;
