import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import ControlButtons from './ControlButtons';

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
        if (selectedOption && quiz.Answer.includes(selectedOption)) {
            setIsAnswerCorrect(true);
            onQuizComplete(true); // Notify parent about the correct answer
        } else {
            setIsAnswerCorrect(false);
            onQuizComplete(false); // Notify parent about the incorrect answer
        }
    };


    const getButtonStyle = (option: string) => {
        let style = styles.optionButton;
    
        if (selectedOption === option && isAnswerCorrect === null) {
            // Thicker border for selected option before confirmation
            style = { ...style, borderColor: '#b8e1dd', borderWidth: 3 };
        } else if (isAnswerCorrect !== null && selectedOption) {
            if (selectedOption === option) {
                if (quiz.Answer.includes(option)) {
                    style = { ...style, borderColor: '#32CD32', borderWidth: 4 };  // Green for correct
                } else {
                    style = { ...style, borderColor: '#FF6347', borderWidth: 4 };  // Red for incorrect
                }
            }
        } else if (option === selectedOption && isAnswerCorrect === false) {
            style = { ...style, borderColor: '#8fc2c2', borderWidth: 4 };  // Default color for selected but incorrect
        }
        return style;
    };
    

    const renderOptions = () => {
        return [quiz.Option1, quiz.Option2, quiz.Option3].map((option, index) => (
            <TouchableOpacity
                key={index}
                style={getButtonStyle(option)}  // Apply dynamic styling
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.questionText}>{quiz.Question}</Text>
            {renderImage()}
            <View style={styles.answerContainer}>
                {renderOptions()}
                {isAnswerCorrect !== null && (
                    <Text style={styles.feedbackText}>
                        {isAnswerCorrect ? 'Correct!' : 'Incorrect, please try again.'}
                    </Text>
                )}
            </View>
            <ControlButtons
                onClear={() => setSelectedOption(null)}  // Clear selection
                onSubmit={handleAnswerSubmit}  // Handle answer submission
                onContinue={onNextSlide}  // Handle navigation to the next slide
                submitButtonText={isAnswerCorrect !== null ? 'Weiter' : 'Bestätigen'}  // Conditionally set button text
                disabled={selectedOption === null}  // Disable when no option is selected
                showClearButton={true}
                showBackspaceButton={false}
            />
        </ScrollView>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',  // Ensure content starts from the top
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3a7563',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        lineHeight: 30,
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
    },
    answerContainer: {
        flex: 1, // This ensures answer options don't shift up
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    optionButton: {
        backgroundColor: 'transparent',  // Remove solid fill
        borderColor: '#b8e1dd',  // Add border color similar to QuizSlide
        borderWidth: 1,  // Define border width
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
        backgroundColor: '#32CD32',  // Correct option color
    },
    incorrectOption: {
        backgroundColor: '#FF6347',  // Incorrect option color
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
        color: '#FFF',
    },
    submitButton: {
        backgroundColor: '#2196F3', // Matching the blue from MultipleChoice
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    continueButton: {
        backgroundColor: '#008CBA', // Slightly adjusted blue for continue button
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});


export default MathQuizSlide;
