import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import { scaleFontSize } from 'src/utils/screenDimensions';
import ControlButtons from './ControlButtons';

interface MathMiniQuiz {
    Question: string;
    Option1: string;
    Option2: string;
    Option3: string;
    Answer: string[];
    Image?: string;
}

interface MathQuizSlideProps {
    quiz: MathMiniQuiz;
    onQuizComplete: (isCorrect: boolean) => void;
    onNextSlide: () => void;
}

const MathQuizSlide: React.FC<MathQuizSlideProps> = ({ quiz, onQuizComplete, onNextSlide }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

    const handleAnswerSubmit = () => {
        if (selectedOption && quiz.Answer.includes(selectedOption)) {
            setIsAnswerCorrect(true);
            onQuizComplete(true);
        } else {
            setIsAnswerCorrect(false);
            onQuizComplete(false);
        }
    };


    const getButtonStyle = (option: string) => {
        let style = styles.optionButton;
    
        if (selectedOption === option && isAnswerCorrect === null) {

            style = { ...style, borderColor: '#b8e1dd', borderWidth: 3 };
        } else if (isAnswerCorrect !== null && selectedOption) {
            if (selectedOption === option) {
                if (quiz.Answer.includes(option)) {
                    style = { ...style, borderColor: '#32CD32', borderWidth: 4 };
                } else {
                    style = { ...style, borderColor: '#FF6347', borderWidth: 4 };
                }
            }
        } else if (option === selectedOption && isAnswerCorrect === false) {
            style = { ...style, borderColor: '#8fc2c2', borderWidth: 4 }; 
        }
        return style;
    };
    

    const renderOptions = () => {
        return [quiz.Option1, quiz.Option2, quiz.Option3].map((option, index) => (
            <TouchableOpacity
                key={index}
                style={getButtonStyle(option)}
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

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{quiz.Question}</Text>
                </View>


                <View style={styles.imageContainer}>
                    {renderImage()}
                </View>


                <View style={styles.answerContainer}>
                    {renderOptions()}
                    {isAnswerCorrect !== null && (
                        <Text style={styles.feedbackText}>
                            {isAnswerCorrect ? 'Correct!' : 'Incorrect, please try again.'}
                        </Text>
                    )}
                </View>
            <ControlButtons
                onClear={() => setSelectedOption(null)}
                onSubmit={handleAnswerSubmit}
                onContinue={onNextSlide}
                submitButtonText={isAnswerCorrect !== null ? 'Weiter' : 'Bestätigen'}
                disabled={selectedOption === null}
                showClearButton={true}
                showBackspaceButton={false}
            />
        </ScrollView>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3a7563',
    },
    questionContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    questionText: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
        textAlign: 'center',
        color: '#FFF',
        lineHeight: 30,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    answerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    optionButton: {
        backgroundColor: 'transparent',
        borderColor: '#b8e1dd',
        borderWidth: 1,
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
        backgroundColor: '#32CD32',
    },
    incorrectOption: {
        backgroundColor: '#FF6347',
    },
    quizImage: {
        width: 350,
        height: 200,
        resizeMode: 'contain',
        marginTop: 10,
    },
    feedbackText: {
        fontSize: 18,
        marginVertical: 10,
        color: '#FFF',
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    continueButton: {
        backgroundColor: '#008CBA',
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
