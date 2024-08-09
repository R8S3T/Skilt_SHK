import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ControlButtons from './ControlButtons';
import SentenceWithBlanks from './SentenceWithBlanks';
import OptionButton from './OptionButton';
import { Quiz, ClozeTestOption, AnswerStatus } from 'src/types/types';

interface ClozeTestProps {
    quiz: Quiz;
    options: ClozeTestOption[];
    onAnswerSubmit: (isCorrect: boolean) => void;
    onContinue: () => void;
}

const ClozeTest: React.FC<ClozeTestProps> = ({ quiz, options, onAnswerSubmit, onContinue }) => {
    // Split the question into sentence parts based on the underscores representing blanks
    const sentenceParts = quiz.Question.split('_');

    // Initialize state to track selected options and their correctness
    const [selectedOptions, setSelectedOptions] = useState<AnswerStatus[]>(Array(sentenceParts.length - 1).fill({ answer: null, isCorrect: null }));

    // Manage the state for the submit button text and its disabled state
    const [submitButtonText, setSubmitButtonText] = useState<string>('Submit');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Handle the selection of an option, filling the first available blank
    const handleOptionSelect = (option: string) => {
        const newSelectedOptions = [...selectedOptions];
        const emptyIndex = newSelectedOptions.findIndex(opt => opt.answer === null);  // Find the first empty blank
        if (emptyIndex !== -1) {
            newSelectedOptions[emptyIndex] = { answer: option, isCorrect: null };  // Fill the blank
            setSelectedOptions(newSelectedOptions);
            setIsButtonDisabled(newSelectedOptions.some(opt => opt.answer === null));  // Disable button until all blanks are filled
        }
    };

    // Handle deletion of an option from a blank
    const handleDelete = (index: number) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = { answer: null, isCorrect: null };  // Clear the blank
        setSelectedOptions(newSelectedOptions);
        setIsButtonDisabled(true);  // Re-disable the submit button
    };

    // Handle the submission of the quiz answers
    const handleSubmit = () => {
        const correctAnswers = options.map(option => option.CorrectOptions);  // Get the correct answers
        const isCorrect = selectedOptions.every((opt, index) => opt.answer === correctAnswers[index]);  // Check correctness

        // Update selected options with correctness information
        const updatedSelectedOptions = selectedOptions.map((opt, index) => ({
            ...opt,
            isCorrect: opt.answer === correctAnswers[index],
        }));
        setSelectedOptions(updatedSelectedOptions);

        // Update button text based on whether answers were correct, and disable/enable the button accordingly
        setSubmitButtonText(isCorrect ? 'Continue' : 'Submit');
        setIsButtonDisabled(!isCorrect);

        // Call the parent's answer submission handler
        onAnswerSubmit(isCorrect);
    };

    // Handle the continue action after a correct submission
    const handleContinue = () => {
        onAnswerSubmit(true);
        onContinue();
    };

    console.log('Options in ClozeTest:', options);
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <SentenceWithBlanks sentenceParts={sentenceParts} filledAnswers={selectedOptions} />

            <View style={styles.optionsContainer}>
                {options.map((option, idx) =>
                    (option.OptionTexts as string[]).map((text, i) => (
                        <OptionButton
                            key={i}
                            option={text}
                            onSelect={() => handleOptionSelect(text)}
                            isSelected={selectedOptions.some(opt => opt.answer === text)}
                        />
                    ))
                )}
            </View>

            {selectedOptions.some(opt => opt.isCorrect !== null) && (
                <Text style={styles.answerText}>
                    {selectedOptions.every(opt => opt.isCorrect) ? 'Correct answer.' : 'Incorrect answer, please try again.'}
                </Text>
            )}
            <ControlButtons
                onClear={() => setSelectedOptions(Array(sentenceParts.length - 1).fill({ answer: null, isCorrect: null }))}
                onSubmit={handleSubmit}
                onContinue={handleContinue}
                showBackspaceButton={false}
                submitButtonText={submitButtonText}
                disabled={isButtonDisabled}
                showClearButton={true}
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
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    answerText: {
        color: '#FFF',
        marginVertical: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ClozeTest;

