import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ControlButtons from './ControlButtons';
import SentenceWithBlanks from './SentenceWithBlanks';
import OptionButton from './OptionButton';
import { Quiz, AnswerStatus } from 'src/types/contentTypes';

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
    
        setSubmitButtonText(isOverallCorrect ? 'Weiter' : 'Bestätigen');
        setIsButtonDisabled(!isOverallCorrect);
    };
    

    const handleClear = () => {
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
        justifyContent: 'space-between', // Ensures even spacing between children
        paddingHorizontal: 10,
        paddingVertical: 40, // Adds vertical padding for better spacing
        backgroundColor: '#2b4353',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly', // More even spacing between options
        marginVertical: 30, // Adds space above and below the options
    },
    sentenceContainer: {
        marginBottom: 40, // Adds space below the sentence with blanks
    },
    controlButtonsContainer: {
        marginTop: 40, // Adds space above the control buttons
    },
});


export default ClozeTest;
