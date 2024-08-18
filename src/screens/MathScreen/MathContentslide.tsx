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
    const [isLastPart, setIsLastPart] = useState<boolean>(false);

    // Split the content by the [continue] marker
    const parts = ContentData.split(/\[continue\]/);

    const handleContinue = () => {
        const nextPartIndex = currentPartIndex + 1;
        setCurrentPartIndex(nextPartIndex);

        // Scroll to the newly revealed part
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    animated: true,
                    index: nextPartIndex, // Scroll to the newly revealed part
                });
            }, 100); 
        }

        // Check if the next part is the last part
        if (nextPartIndex >= parts.length - 1) {
            setIsLastPart(true); // Mark as the last part if we've reached the end
        }
    };

    const handleQuizAnswered = () => {
        setQuizAnswered(true);
    };

    const renderPart = (part: string, index: number) => {
        const subParts = part.split(/\[([^\]]+)\]/);
        const partBackgroundColor = index % 2 === 0 ? 'white' : '#f0f0f0';  // Alternate between white and light grey for each part

        const content = subParts.map((subPart, subIndex) => {
            const trimmedSubPart = subPart.trim();

            // Handle images
            const imageSource = imageMap[trimmedSubPart as keyof typeof imageMap];
            if (imageSource) {
                return <Image key={`${index}-${subIndex}`} source={imageSource} style={styles.image} />;
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
                            onQuizAnswered={handleQuizAnswered}
                            onContinue={handleContinue}
                        />
                    );
                }
            }

            return <Text key={`${index}-${subIndex}`} style={styles.contentText}>{trimmedSubPart}</Text>;
        });

        // Apply dynamic background color based on the index and ensure it covers the entire width and height
        return (
            <View style={[styles.fullWidthPartContainer, { backgroundColor: partBackgroundColor }]}>
                {content}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={parts.slice(0, currentPartIndex + 1)}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.partContainer}>
                        {renderPart(item, index)}
                        {index === currentPartIndex && currentPartIndex < parts.length - 1 && !item.includes('quiz_') && (
                            <ContinueButton
                                label="Continue"
                                onPress={handleContinue}
                            />
                        )}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
                ListFooterComponent={ 
                    <View style={styles.footer}>
                        {currentPartIndex === parts.length - 1 && (
                            <NextSlideButton
                                onPress={onNextSlide}
                                isActive={true}
                                label="Next"
                            />
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

