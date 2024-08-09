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
    const sentenceParts = quiz.Question.split('_');

    console.log('Sentence Parts:', sentenceParts);
    console.log('Options:', options);

    const [selectedOptions, setSelectedOptions] = useState<AnswerStatus[]>(Array(sentenceParts.length - 1).fill({ answer: null, isCorrect: null }));
    const [submitButtonText, setSubmitButtonText] = useState<string>('Bestätigen');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleOptionSelect = (option: string) => {
        const newSelectedOptions = [...selectedOptions];
        const emptyIndex = newSelectedOptions.findIndex(opt => opt.answer === null);
        if (emptyIndex !== -1) {
            newSelectedOptions[emptyIndex] = { answer: option, isCorrect: null };
            setSelectedOptions(newSelectedOptions);
            setIsButtonDisabled(false);
        }
    };

    const handleDelete = () => {
        const lastFilledIndex = selectedOptions
            .map((opt, index) => ({ ...opt, index }))
            .filter(opt => opt.answer !== null)
            .map(opt => opt.index)
            .pop(); // Get the last filled blank
    
        if (lastFilledIndex !== undefined) {
            const newSelectedOptions = [...selectedOptions];
            newSelectedOptions[lastFilledIndex] = { answer: null, isCorrect: null };
            setSelectedOptions(newSelectedOptions);
            setSubmitButtonText('Bestätigen');
            setIsButtonDisabled(true);
        }
    };

    const handleSubmit = () => {
        if (submitButtonText === 'Weiter') {
            handleContinue();
            return;
        }

        // Split the correct answers into an array
        const correctAnswers = options[0].CorrectOptions.split(',').map(opt => opt.trim());

        // Check if the selected answers match the correct answers for all blanks
        const isCorrect = selectedOptions.every((opt, index) => opt.answer === correctAnswers[index]);

        if (isCorrect) {
            setSubmitButtonText('Weiter');
            setIsButtonDisabled(false);
        } else {
            setSubmitButtonText('Bestätigen');
            setIsButtonDisabled(true);
        }

        // Update selected options with correctness information
        const updatedSelectedOptions = selectedOptions.map((opt, index) => ({
            ...opt,
            isCorrect: opt.answer === correctAnswers[index],
        }));
        setSelectedOptions(updatedSelectedOptions);

        setShowFeedback(true);
    };

    const handleContinue = () => {
        onAnswerSubmit(true);
        onContinue();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <SentenceWithBlanks sentenceParts={sentenceParts} filledAnswers={selectedOptions} />
            <View style={styles.optionsContainer}>
                {options.map((option, idx) =>
                    (option.OptionTexts as string[]).map((text, i) => (
                        <OptionButton
                            key={`${idx}-${i}`}
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
                onClear={handleDelete}
                onSubmit={handleSubmit}
                onContinue={handleContinue}
                showBackspaceButton={true}
                submitButtonText={submitButtonText}
                disabled={isButtonDisabled}
                showClearButton={submitButtonText !== 'Weiter'}
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

