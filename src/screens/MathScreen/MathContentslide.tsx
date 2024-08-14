import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, LayoutChangeEvent, FlatList } from 'react-native';
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
    const [isLastPart, setIsLastPart] = useState<boolean>(false);

    // Split the content by the [continue] marker
    const parts = ContentData.split(/\[continue\]/);

    const handleContinue = () => {
        const nextRevealedParts = revealedParts + 1;
        setRevealedParts(nextRevealedParts);
        setQuizAnswered(false);  // Reset for the next section

        // Check if the next part is the last part
        if (nextRevealedParts >= parts.length) {
            setIsLastPart(true);  // Mark as the last part if we've reached the end
        }
    };

    // Ensure isLastPart is set for short content
    useEffect(() => {
        if (revealedParts === parts.length) {
            setIsLastPart(true);
        }
    }, [revealedParts, parts.length]);

    const handleQuizAnswered = () => {
        setQuizAnswered(true);
    };

    const renderPart = (part: string, index: number) => {
        const subParts = part.split(/\[([^\]]+)\]/);
        let quizFound = false;  // Local flag to detect quiz presence in this part

        const content = subParts.map((subPart, subIndex) => {
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
                quizFound = true;
                const quizIndex = parseInt(trimmedSubPart.split('_')[1], 10) - 1;
                const quiz = mathMiniQuizzes[quizIndex];

                if (quiz) {
                    return (
                        <MathMiniQuizComponent
                            key={`${index}-${subIndex}`}
                            quiz={quiz}
                            onQuizComplete={onQuizComplete}
                            onQuizLayout={onQuizLayout}
                            onQuizAnswered={handleQuizAnswered}
                        />
                    );
                }
            }

            return <Text key={`${index}-${subIndex}`} style={styles.contentText}>{trimmedSubPart}</Text>;
        });

        // Return the rendered content without updating state here.
        return content;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={parts.slice(0, revealedParts)}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.partContainer}>
                        {renderPart(item, index)}
                        {index < parts.length - 1 && (
                            <MiniQuizButton
                                label="Continue"
                                onPress={handleContinue}
                                disabled={!quizAnswered && !!item.includes('quiz_')}  // Disable if a quiz is present and not answered
                            />
                        )}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <View style={styles.footer}>
                        {isLastPart && revealedParts === parts.length && (  // Display the button only if it's the last part and all parts are revealed
                            <NextSlideButton
                                onPress={onNextSlide}
                                isActive={true}
                                label="Next"
                            />
                        )}
                    </View>
                }
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    partContainer: {
        marginBottom: 16,
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
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
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
});

export default MathContentSlide;

