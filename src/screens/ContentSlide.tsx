import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import NextSlideButton from './NextSlideButton';
import ContentHandler from 'src/components/ContentHandler';
import { Quiz } from 'src/types/contentTypes';
import { GenericContent } from 'src/types/contentTypes';
import { useTheme } from 'src/context/ThemeContext';
import { loadContentSlideIndex, saveContentSlideIndex } from 'src/utils/progressUtils';

interface ContentSlideProps {
    contentData: (GenericContent | Quiz)[]; // Include all content for navigation checks
    onNext: () => void;
    currentIndex: number; // Add currentIndex prop
    setCurrentIndex: (index: number) => void;
    subchapterId: number;
    setShowQuiz: (value: boolean) => void;
}

const ContentSlide: React.FC<ContentSlideProps> = ({
    contentData,
    currentIndex,
    setCurrentIndex,
    subchapterId,
    onNext,
    setShowQuiz, // Ensure this is included
}) => {
    console.log("setShowQuiz in ContentSlide:", setShowQuiz);
    const currentSlide = contentData[currentIndex]; // Get the current slide data
    const { ContentData } = currentSlide as GenericContent; // Extract ContentData if it's a GenericContent
    const [isButtonActive, setIsButtonActive] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const { theme, isDarkMode } = useTheme();
    const [loading, setLoading] = useState(true);

    // Track layout and content sizes
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);

    const [canNavigateBack, setCanNavigateBack] = useState(false); // For the left arrow
    const [canNavigateForward, setCanNavigateForward] = useState(false); // For the right arrow

    // Handle navigation backward
    const onPrev = () => {
        if (canNavigateBack) {
            const previousIndex = currentIndex - 1;

            // Check if the previous slide is a quiz
            if ('QuizId' in contentData[previousIndex]) {
                setCurrentIndex(previousIndex - 1); // Skip the quiz and move to the previous content slide
            } else {
                setCurrentIndex(previousIndex); // Move to the previous slide
            }
        }
    };


    // Handle navigation forward
    const onForwardArrowPress = async () => {
        const lastVisitedIndex = await loadContentSlideIndex(subchapterId);
        const nextIndex = currentIndex + 1;
        console.log("NextIndex:", nextIndex, "LastVisitedIndex:", lastVisitedIndex);
        console.log("NextContent:", contentData[nextIndex]);
    
        if (currentIndex < lastVisitedIndex) {
            // Check if the next content is a quiz
            if (contentData[nextIndex] && 'QuizId' in contentData[nextIndex]) {
                console.log("Displaying quiz:", contentData[nextIndex]);
                setShowQuiz(true); // Trigger quiz mode
                setCurrentIndex(nextIndex); // Move to the quiz
            } else {
                console.log("Displaying regular content slide:", contentData[nextIndex]);
                setCurrentIndex(nextIndex); // Move to the next slide
            }
        } else {
            console.log("Cannot move forward beyond the most recently visited slide.");
        }
    };
    
    useEffect(() => {
        const checkProgress = async () => {
            const lastVisitedIndex = await loadContentSlideIndex(subchapterId);
            setCanNavigateBack(currentIndex > 0);
            console.log("lastVisitedIndex on reload:", lastVisitedIndex);

            setCanNavigateForward(
                lastVisitedIndex !== null && currentIndex < lastVisitedIndex
            ); // Enable forward arrow only for visited slides
        };

        checkProgress();
    }, [currentIndex, subchapterId]);


    useEffect(() => {
        if (ContentData) {
            setLoading(false); // Stop loading when content is available
        }
    }, [ContentData]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
        setIsButtonActive(false);

        const fallbackTimeout = setTimeout(() => {
            if (contentHeight <= containerHeight) {
                setIsButtonActive(true);
            }
        }, 300);

        return () => clearTimeout(fallbackTimeout);
    }, [contentData, contentHeight, containerHeight]);

    useEffect(() => {
        if (contentHeight > 0 && containerHeight > 0) {
            if (contentHeight <= containerHeight) {
                setIsButtonActive(true);
            }
        }
    }, [contentHeight, containerHeight]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;

        if (isAtBottom) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    };

    const handleContainerLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
    };

    const handleContentSizeChange = (width: number, height: number) => {
        setContentHeight(height);

        if (height <= containerHeight) {
            setIsButtonActive(true);
        }
    };

    return (
        <View style={[styles.container, isDarkMode && { backgroundColor: theme.background }]} onLayout={handleContainerLayout}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, isDarkMode && { backgroundColor: theme.surface }]}
                nestedScrollEnabled={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ref={scrollViewRef}
                onContentSizeChange={handleContentSizeChange}
            >
            {loading ? null : ContentData ? (
                ContentData.split(/\n/).map((part, index) => (
                    <ContentHandler key={index} part={part} />
                ))
            ) : (
                <Text style={styles.errorText}>
                    Error: No content available to display.
                </Text>
            )}
            </ScrollView>
                <View style={styles.buttonContainer}>
                    <Text
                        style={[styles.arrow, !canNavigateBack && styles.disabledArrow]}
                        onPress={canNavigateBack ? onPrev : undefined}
                    >
                        {"<"}
                    </Text>
                    <NextSlideButton
                        onPress={onNext}
                        isActive={isButtonActive}
                        label="Weiter"
                        style={styles.nextButton}
                    />
                    <Text
                        style={[styles.arrow, !canNavigateForward && styles.disabledArrow]}
                        onPress={canNavigateForward ? onForwardArrowPress : undefined}
                    >
                        {">"}
                    </Text>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    nextButton: {
        marginLeft: 10,
    },
    errorText: {
        color: 'green',
        textAlign: 'center',
        margin: 10,
    },
    arrow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000', // Default color for active arrows
    },
    disabledArrow: {
        color: '#ccc', // Disabled arrow color
    },
});

export default ContentSlide;


