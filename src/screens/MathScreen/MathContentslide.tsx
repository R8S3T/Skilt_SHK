import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, LayoutChangeEvent } from 'react-native';
import RenderPart from 'src/utils/RenderParts';
import { MathMiniQuiz, GenericContent } from 'src/types/contentTypes';
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
    const { ContentData, ContentId } = contentData;
    const [currentPartIndex, setCurrentPartIndex] = useState<number>(0);
    const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
    const flatListRef = useRef<FlatList>(null);

    const handleQuizAnswered = () => {
        setQuizAnswered(true);
    };

    const handleContinue = () => {
        const nextPartIndex = currentPartIndex + 1;
        setCurrentPartIndex(nextPartIndex);

        // Delay the scroll action until the FlatList has updated
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: nextPartIndex,
                    animated: true,
                });
            }
        }, 100);
    };

    useEffect(() => {
        setCurrentPartIndex(0); // Reset currentPartIndex when a new slide is loaded
        setQuizAnswered(false); // Reset quizAnswered state when slide changes
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true }); // Ensure scroll is reset
        }
    }, [contentData]);

    // Split the content by the [continue] marker
    const parts = ContentData.split(/\[continue\]/);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={parts.slice(0, currentPartIndex + 1)}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.partContainer}>
                        <RenderPart
                            part={item}
                            index={index}
                            mathMiniQuizzes={mathMiniQuizzes}
                            onQuizComplete={onQuizComplete}
                            onQuizLayout={onQuizLayout}
                            handleQuizAnswered={handleQuizAnswered}
                            handleContinue={handleContinue}
                            contentId={ContentId}
                        />
                        {index === currentPartIndex && currentPartIndex < parts.length - 1 && (
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
                onScrollToIndexFailed={(info) => {
                    console.warn(`Scroll to index failed. Trying to scroll to index: ${info.index}, highest measured frame index: ${info.highestMeasuredFrameIndex}`);

                    // Scroll to the highest measured index first
                    flatListRef.current?.scrollToIndex({
                        index: info.highestMeasuredFrameIndex,
                        animated: true,
                    });

                    // After some delay, try scrolling to the desired index again
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({
                            index: info.index,
                            animated: true,
                        });
                    });
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
    partContainer: {
        flex: 1,
        padding: 25,
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
        width: '100%',
    },
});

export default MathContentSlide;


