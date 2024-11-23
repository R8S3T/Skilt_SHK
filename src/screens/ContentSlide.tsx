import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import NextSlideButton from './NextSlideButton';
import ContentHandler from 'src/components/ContentHandler';
import { GenericContent } from 'src/types/contentTypes';
import { useTheme } from 'src/context/ThemeContext';

interface ContentSlideProps {
    contentData: GenericContent;
    onNext: () => void;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, onNext }) => {
    const { ContentData } = contentData;
    const [isButtonActive, setIsButtonActive] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const { theme, isDarkMode } = useTheme(); // Access theme and dark mode status

    // Track layout and content sizes
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);

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
            {ContentData ? (
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        margin: 10,
    },
});

export default ContentSlide;


