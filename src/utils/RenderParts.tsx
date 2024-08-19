import React from 'react';
import { View, Text, Image, StyleSheet, LayoutChangeEvent } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import MathMiniQuizComponent from 'src/screens/Quiz/MathMiniQuiz';
import { MathMiniQuiz } from 'src/types/contentTypes';

interface RenderPartProps {
    part: string;
    index: number;
    mathMiniQuizzes: MathMiniQuiz[];
    onQuizComplete: (isCorrect: boolean) => void;
    onQuizLayout: (event: LayoutChangeEvent) => void;
    handleQuizAnswered: () => void;
    handleContinue: () => void;
    contentId: number; // Add contentId as a prop
}

const RenderPart: React.FC<RenderPartProps> = ({
    part,
    index,
    mathMiniQuizzes,
    onQuizComplete,
    onQuizLayout,
    handleQuizAnswered,
    handleContinue,
    contentId, // Destructure contentId
}) => {
    // Filter quizzes by ContentId
    const filteredQuizzes = mathMiniQuizzes.filter(quiz => quiz.ContentId === contentId);

    const lines = part.split('\n'); // Split content into lines
    const content = lines.map((line, subIndex) => {
        // Handle images
        if (line.startsWith('[equations_')) {
            const imageName = line.replace('[', '').replace(']', '').trim(); // Extract the image key
            const imageSource = imageMap[imageName as keyof typeof imageMap];
            if (imageSource) {
                return <Image key={`${index}-${subIndex}`} source={imageSource} style={styles.image} />;
            } else {
                console.warn(`Image not found for key: ${imageName}`);
                return null; // If the image isn't found, return null
            }
        }

        // Handle bold text
        if (line.includes('[bold]') && line.includes('[/bold]')) {
            const boldText = line.replace('[bold]', '').replace('[/bold]', '');
            return (
                <Text key={`${index}-${subIndex}`} style={[styles.contentText, { fontWeight: 'bold' }]}>
                    {boldText}
                </Text>
            );
        }

// Handle quizzes
if (line.startsWith('[quiz_')) {
    const rawQuizIndex = parseInt(line.split('_')[1], 10) - 1;
    const filteredQuizzes = mathMiniQuizzes.filter(quiz => quiz.ContentId === contentId);

    console.log('Filtered Quizzes:', filteredQuizzes);
    console.log('Total quizzes for ContentId:', filteredQuizzes.length);

    // Use a dynamic index based on the number of available quizzes for the contentId
    const dynamicQuizIndex = Math.min(rawQuizIndex, filteredQuizzes.length - 1); // Ensure the index is within bounds

    const quiz = filteredQuizzes[dynamicQuizIndex];
    
    if (quiz) {
        return (
            <MathMiniQuizComponent
                key={`${index}-${subIndex}`}
                quiz={quiz}
                onQuizComplete={onQuizComplete}
                onQuizLayout={onQuizLayout}
                onQuizAnswered={handleQuizAnswered}
                onContinue={handleContinue}
            />
        );
    } else {
        console.warn(`Quiz not found for dynamic index ${dynamicQuizIndex} in filtered quizzes`);
    }
}

        // Default: Render as normal text
        return (
            <Text key={`${index}-${subIndex}`} style={styles.contentText}>
                {line}
            </Text>
        );
    });

    return <View style={styles.fullWidthPartContainer}>{content}</View>;
};

const styles = StyleSheet.create({
    fullWidthPartContainer: {
        flex: 1,
        width: '100%',
        padding: 25,
    },
    image: {
        width: '100%',
        height: 160,
        resizeMode: 'contain',
        marginVertical: 50,
    },
    contentText: {
        fontSize: 20,
        marginVertical: 10,
        color: '#000',
    },
});

export default RenderPart;
