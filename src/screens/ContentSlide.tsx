import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import NextSlideButton from './NextSlideButton';
import ContentHandler from 'src/components/ContentHandler';
import { GenericContent } from 'src/types/contentTypes';

interface ContentSlideProps {
    contentData: GenericContent;
    onNext: () => void;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, onNext }) => {
    const { ContentData } = contentData;
    const [isButtonActive, setIsButtonActive] = useState(false);  // Track if Next button should be active
    const scrollViewRef = useRef<ScrollView>(null);

    // Track layout and content sizes
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        // Scroll to the top when new content is loaded
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
        // Reset the button to inactive when new content is loaded
        setIsButtonActive(false);

        // Fallback timeout to ensure button activation for short content
        const fallbackTimeout = setTimeout(() => {
            if (contentHeight <= containerHeight) {
                setIsButtonActive(true);  // Ensure button is active for short content
            }
        }, 300);  // Adjust the delay as necessary

        return () => clearTimeout(fallbackTimeout);  // Cleanup the timeout when component unmounts or updates
    }, [contentData, contentHeight, containerHeight]);

    useEffect(() => {
        // Check if the content is short (fits within the screen) after layout change
        if (contentHeight > 0 && containerHeight > 0) {
            if (contentHeight <= containerHeight) {
                // Activate button if the content fits within the screen (no scrolling required)
                setIsButtonActive(true);
            }
        }
    }, [contentHeight, containerHeight]);

    // Function to handle scroll events
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;

        // Activate button when scrolled to bottom
        if (isAtBottom) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    };

    // Function to measure the container height (visible area)
    const handleContainerLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
    };

    // Function to measure the content height (total content) and update the button state
    const handleContentSizeChange = (width: number, height: number) => {
        setContentHeight(height);

        // If content fits within the container (no need to scroll), enable button
        if (height <= containerHeight) {
            setIsButtonActive(true);
        }
    };

    return (
        <View style={styles.container} onLayout={handleContainerLayout}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                nestedScrollEnabled={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}  // Set scroll event frequency
                ref={scrollViewRef}
                onContentSizeChange={handleContentSizeChange}  // Update content size and check if scrolling is needed
            >
                {ContentData.split(/\n/).map((part, index) => (
                    <ContentHandler key={index} part={part} />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <NextSlideButton
                    onPress={onNext}
                    isActive={isButtonActive}
                    label="Weiter"
                    style={styles.nextButton}
                />
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
        justifyContent: 'center',
        marginTop: 20,
    },
    nextButton: {
        marginLeft: 10,
    },
});

export default ContentSlide;

