import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text, LayoutChangeEvent, FlatList } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import { MathMiniQuiz, GenericContent } from 'src/types/contentTypes';
import MathMiniQuizComponent from '../Quiz/MathMiniQuiz';
import NextSlideButton from '../NextSlideButton';
import ContinueButton from './MathContinueButton';

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
    onNextSlide,
}) => {
    const { ContentData } = contentData;
    const [currentPartIndex, setCurrentPartIndex] = useState<number>(0);
    const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
    const flatListRef = useRef<FlatList>(null);

    // Split the content by the [continue] marker
    const parts = ContentData.split(/\[continue\]/);

    // Reset state when slide changes
    useEffect(() => {
        setCurrentPartIndex(0);
        setQuizAnswered(false);

        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true }); // Scroll to top when Slide changes
        }
    }, [contentData]);

    const handleContinue = () => {
        const nextPartIndex = currentPartIndex + 1;

        if (nextPartIndex < parts.length) {
            setCurrentPartIndex(nextPartIndex);
            setQuizAnswered(false); // Reset quizAnswered when moving to the next part

            setTimeout(() => {
                if (flatListRef.current) {
                    flatListRef.current.scrollToIndex({
                        index: nextPartIndex,
                        animated: true,
                        viewPosition: 0.5, // Adjust this value as needed
                    });
                }
            }, 100);
        }
    };
    

    const handleQuizAnswered = () => {
        setQuizAnswered(true);
    };

    const renderPart = (part: string, index: number) => {
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
                const quizIndex = parseInt(line.split('_')[1], 10) - 1;  // This extracts the index
                const quiz = mathMiniQuizzes[quizIndex];  // Fetch the quiz from the array

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
                    console.warn(`Quiz with index ${quizIndex + 1} not found in mathMiniQuizzes`);
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

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={parts.slice(0, currentPartIndex + 1)}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.partContainer}>
                        {renderPart(item, index)}
                        {index === currentPartIndex &&
                            currentPartIndex < parts.length - 1 &&
                            !quizAnswered && ( // Ensure ContinueButton only shows when quiz is unanswered
                                <ContinueButton label="Continue" onPress={handleContinue} />
                            )}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
                ListFooterComponent={
                    <View style={styles.footer}>
                        {currentPartIndex === parts.length - 1 && (
                            <NextSlideButton onPress={onNextSlide} isActive={true} label="Next" />
                        )}
                    </View>
                }
                onScrollToIndexFailed={() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToEnd({ animated: true });
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    fullWidthPartContainer: {
        flex: 1,
        width: '100%',
        padding: 25,
    },
    partContainer: {
        flex: 1,
        padding: 25,
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
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
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
        width: '100%',
    },
});

export default MathContentSlide;
