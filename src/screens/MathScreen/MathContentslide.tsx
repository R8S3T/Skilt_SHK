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
                        viewPosition: 0.3, // Adjust this value as needed
                    });
                }
            }, 100);
        }
    };

    const handleQuizAnswered = () => {
        setQuizAnswered(true);
    };

    const renderPart = (part: string, index: number) => {
        // Match all [bgcolor-block] blocks and process content inside and outside the blocks
        const bgColorBlockRegex = /\[bgcolor-block=(#?[a-zA-Z0-9]+)\]([\s\S]*?)\[\/bgcolor-block\]/g;
        let lastIndex = 0;
        const content = [];

        let match;
        while ((match = bgColorBlockRegex.exec(part)) !== null) {
            // Add any text before the [bgcolor-block] as normal content
            if (match.index > lastIndex) {
                const normalText = part.slice(lastIndex, match.index);
                content.push(...processNormalText(normalText, index, lastIndex));
            }

            // Extract the background color and text inside the [bgcolor-block] block
            const bgColor = match[1];
            const bgText = match[2];

            // Add the [bgcolor-block]
            content.push(
                <View key={`${index}-bgcolor-block-${lastIndex}`} style={[styles.bgColorBlock, { backgroundColor: bgColor }]}>
                    <Text style={styles.contentText}>{bgText}</Text>
                </View>
            );

            // Update lastIndex to continue from the end of this [bgcolor-block]
            lastIndex = match.index + match[0].length;
        }

        // Add any remaining text after the last [bgcolor-block]
        if (lastIndex < part.length) {
            const remainingText = part.slice(lastIndex);
            content.push(...processNormalText(remainingText, index, lastIndex));
        }

        return <View style={styles.fullWidthPartContainer}>{content}</View>;
    };

    const processNormalText = (text: string, index: number, lastIndex: number) => {
        const lines = text.split('\n');
        return lines.map((line, subIndex) => {
            const content = [];
    
            // Handle single-line background color
            const bgColorLineRegex = /\[bgcolor-line=(#?[a-zA-Z0-9]+)\](.*?)\[\/bgcolor-line\]/;
            const bgColorLineMatch = line.match(bgColorLineRegex);
            if (bgColorLineMatch) {
                const bgColor = bgColorLineMatch[1];
                const bgText = bgColorLineMatch[2];
                content.push(
                    <Text key={`${index}-${lastIndex}-${subIndex}`} style={[styles.contentText, { backgroundColor: bgColor, padding: 5 }]}>
                        {bgText}
                    </Text>
                );
                return content;
            }
    
            // Handle images
            if (line.startsWith('[equations_')) {
                const imageName = line.replace('[', '').replace(']', '').trim();
                const imageSource = imageMap[imageName as keyof typeof imageMap];
                if (imageSource) {
                    // Apply different style for welcome images
                    const isWelcomeImage = imageName.includes("welcome");
                    content.push(
                        <Image
                            key={`${index}-${lastIndex}-${subIndex}`}
                            source={imageSource}
                            style={isWelcomeImage ? styles.welcomeImage : styles.image}
                        />
                    );
                } else {
                    console.warn(`Image not found for key: ${imageName}`);
                }
                return content;
            }
    
            // Handle quizzes
            if (line.startsWith('[quiz_')) {
                const quizIndex = parseInt(line.split('_')[1], 10) - 1;
                const quiz = mathMiniQuizzes[quizIndex];
                if (quiz) {
                    content.push(
                        <MathMiniQuizComponent
                            key={`${index}-${lastIndex}-${subIndex}`}
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
                return content;
            }
    
            // Handle underline text
            if (line.includes('[underline]') && line.includes('[/underline]')) {
                const underlineText = line.replace('[underline]', '').replace('[/underline]', '');
                content.push(
                    <View key={`${index}-${lastIndex}-${subIndex}`} style={styles.underlineContainer}>
                        <Text style={styles.contentText}>{underlineText}</Text>
                    </View>
                );
                return content;
            }
    
            // Handle inline bold text and normal text together
            const parts = line.split(/(\[bold\].*?\[\/bold\])/g); // Split by bold markers, keeping the markers in the result
    
            const lineContent = parts.map((part, partIndex) => {
                if (part.startsWith('[bold]') && part.endsWith('[/bold]')) {
                    const boldText = part.replace('[bold]', '').replace('[/bold]', '');
                    return (
                        <Text key={`${index}-${subIndex}-${partIndex}-bold`} style={[styles.contentText, { fontWeight: 'bold' }]}>
                            {boldText}
                        </Text>
                    );
                } else {
                    return (
                        <Text key={`${index}-${subIndex}-${partIndex}-normal`} style={styles.contentText}>
                            {part}
                        </Text>
                    );
                }
            });
    
            // Render the whole line in a single <Text> component to keep everything inline
            return (
                <Text key={`${index}-${lastIndex}-${subIndex}-combined`} style={styles.contentText}>
                    {lineContent}
                </Text>
            );
        });
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
        padding: 20,
    },
    partContainer: {
        flex: 1,
        padding: 5,
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 0,
    },
    welcomeImage: {
        width: '100%',
        height: 300, // Increase height for welcome images
        resizeMode: 'contain',
        marginVertical: 0,
    },
    contentText: {
        fontSize: 20,
        marginVertical: 10,
        color: '#000',
        padding: 5,
        letterSpacing: 1.2,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
        width: '100%',
    },
    underlineContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 5,
        width: '100%',
        marginVertical: 10,
    },
    bgColorBlock: {
        padding: 25,
        borderRadius: 5,
        marginVertical: 0,
        borderWidth: 1.5,
        borderColor: 'orange'
    },
});

export default MathContentSlide;

