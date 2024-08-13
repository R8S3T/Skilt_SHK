import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, LayoutChangeEvent } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import { MathMiniQuiz, GenericContent } from 'src/types/contentTypes';
import MathMiniQuizComponent from '../Quiz/MathMiniQuiz';
import MiniQuizButton from '../MathScreen/MiniQuizButton';
import NextSlideButton from '../NextSlideButton';

interface MathContentSlideProps {
    contentData: GenericContent;
    mathMiniQuizzes: MathMiniQuiz[];
    onQuizComplete: (isCorrect: boolean) => void;
    onQuizLayout: (event: LayoutChangeEvent) => void;
    completedQuizzes: boolean[];
    onNextSlide: () => void;
}

const MathContentSlide: React.FC<MathContentSlideProps> = ({
    contentData,
    mathMiniQuizzes,
    onQuizComplete,
    onQuizLayout,
    completedQuizzes,
    onNextSlide,
}) => {
    const { ContentData } = contentData;
    const [revealedParts, setRevealedParts] = useState<number>(1);
    const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

    // Split the content by the [continue] marker
    const parts = ContentData.split(/\[continue\]/);

    const handleContinue = () => {
        setRevealedParts((prev) => prev + 1);
        setQuizAnswered(false);  // Reset for next section
    };

    const handleQuizAnswered = () => {
        setQuizAnswered(true);
    };

    const renderPart = (part: string, index: number) => {
        const subParts = part.split(/\[([^\]]+)\]/);

        return subParts.map((subPart, subIndex) => {
            const trimmedSubPart = subPart.trim();

            // Handle images
            const imageSource = imageMap[trimmedSubPart as keyof typeof imageMap];
            if (imageSource) {
                const imageStyle = trimmedSubPart.toLowerCase().includes('welcome')
                    ? styles.welcomeImage
                    : styles.image;

                return <Image key={`${index}-${subIndex}`} source={imageSource} style={imageStyle} />;
            }

            // Handle quizzes
            if (trimmedSubPart.startsWith('quiz_')) {
                const quizIndex = parseInt(trimmedSubPart.split('_')[1], 10) - 1;
                const quiz = mathMiniQuizzes[quizIndex];

                if (quiz) {
                    return (
                        <MathMiniQuizComponent
                            key={`${index}-${subIndex}`}
                            quiz={quiz}
                            onQuizComplete={onQuizComplete}
                            onQuizLayout={onQuizLayout}
                            onQuizAnswered={handleQuizAnswered}  // Pass the new prop
                        />
                    );
                }
            }

            return <Text key={`${index}-${subIndex}`} style={styles.contentText}>{trimmedSubPart}</Text>;
        });
    };

    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {parts.slice(0, revealedParts).map((part, index) => (
                <View key={index}>
                    {renderPart(part, index)}
                    {index < parts.length - 1 && (
                        <MiniQuizButton
                            label="Continue"
                            onPress={handleContinue}
                            disabled={!quizAnswered && !!parts[index].includes('quiz_')}
                        />
                    )}
                </View>
            ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
                <NextSlideButton
                    onPress={onNextSlide}
                    isActive={true}
                    label="Next"
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 160,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    welcomeImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    contentText: {
        fontSize: 20,
        marginVertical: 10,
    },
    buttonContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
});

export default MathContentSlide;



