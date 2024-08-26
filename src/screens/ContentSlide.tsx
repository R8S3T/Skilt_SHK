import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import NextSlideButton from './NextSlideButton';
import { imageMap } from 'src/utils/imageMappings';
import { GenericContent } from 'src/types/contentTypes';

interface ContentSlideProps {
    contentData: GenericContent;
    onNext: () => void;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, onNext }) => {
    const { ContentData } = contentData;

    // Initialize variables to track marker states
    let isBold = false;
    let isUnderline = false;
    let isBgBlock = false;
    let isFrame = false;  
    let isLine = false;   // New state for line marker
    let bgColor = '';

    // Adjust split pattern to ensure correct detection of markers, including the new [line] marker
    const parts = ContentData.split(/(\[\/?bold\]|\[bgcolor-line=#[0-9a-fA-F]{6}\]|\[\/bgcolor-line\]|\[bgcolor-block=#[0-9a-fA-F]{6}\]|\[\/bgcolor-block\]|\[\/?underline\]|\[\/?frame\]|\[\/?line\]|\[LF_[^\]]+\])/);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {parts.map((part, index) => {
                    // Handle [bold] marker start
                    if (part === '[bold]') {
                        isBold = true;
                        return null;
                    }

                    // Handle [/bold] marker end
                    if (part === '[/bold]') {
                        isBold = false;
                        return null;
                    }

                    // Handle [underline] marker start
                    if (part === '[underline]') {
                        isUnderline = true;
                        return null;
                    }

                    // Handle [/underline] marker end
                    if (part === '[/underline]') {
                        isUnderline = false;
                        return null;
                    }

                    // Handle [bgcolor-line=] marker start
                    if (part.startsWith('[bgcolor-line=')) {
                        bgColor = part.match(/\[bgcolor-line=(#[0-9a-fA-F]{6})\]/)?.[1] || '';
                        return (
                            <Text key={index} style={[styles.contentText, { backgroundColor: bgColor }]}>
                                {parts[index + 1]} {/* Apply the bgcolor-line to the next part */}
                            </Text>
                        );
                    }

                    // Skip rendering the part that follows the [bgcolor-line=] marker since it has already been rendered
                    if (parts[index - 1]?.startsWith('[bgcolor-line=') && part !== '[/bgcolor-line]') {
                        return null;
                    }

                    // Handle [/bgcolor-line] marker end
                    if (part === '[/bgcolor-line]') {
                        return null;
                    }

                    // Handle [bgcolor-block=] marker start
                    if (part.startsWith('[bgcolor-block=')) {
                        bgColor = part.match(/\[bgcolor-block=(#[0-9a-fA-F]{6})\]/)?.[1] || '';
                        isBgBlock = true;
                        return null;
                    }

                    // Handle [/bgcolor-block] marker end
                    if (part === '[/bgcolor-block]') {
                        isBgBlock = false;
                        bgColor = '';
                        return null;
                    }

                    // Handle [frame] marker start
                    if (part === '[frame]') {
                        isFrame = true;
                        return null;
                    }

                    // Handle [/frame] marker end
                    if (part === '[/frame]') {
                        isFrame = false;
                        return null;
                    }

                    // Handle [line] marker start
                    if (part === '[line]') {
                        isLine = true;
                        return null;
                    }

                    // Handle [/line] marker end
                    if (part === '[/line]') {
                        isLine = false;
                        return null;
                    }

                    // Handle image placeholders for LF_ markers
                    if (part.startsWith('[LF_')) {
                        const imageName = part.replace('[', '').replace(']', '').trim();
                        const imageSource = imageMap[imageName as keyof typeof imageMap];
                        if (imageSource) {
                            return (
                                <View key={index} style={[styles.imageContainer, isFrame && styles.frameWithBulb]}>
                                    {isLine && <View style={styles.line} />}
                                    <Image source={imageSource} style={styles.image} />
                                    {isLine && <View style={styles.line} />}
                                </View>
                            );
                        } else {
                            console.warn(`Image not found for key: ${imageName}`);
                        }
                    }

                    // Handle equations images (assuming this was the original placeholder handling)
                    const imageSource = imageMap[part.trim() as keyof typeof imageMap];
                    if (imageSource) {
                        const imageStyle = part.toLowerCase().includes('welcome')
                            ? styles.welcomeImage
                            : styles.image;
                        return <Image key={index} source={imageSource} style={imageStyle} />;
                    }

                    // Apply styles based on the markers
                    const textStyle = [
                        styles.contentText,
                        isBold && styles.boldText,
                        isBgBlock && { backgroundColor: bgColor, padding: 10, borderRadius: 5 },
                    ].filter(Boolean); // Filter out any false values

                    // Handle underline text
                    if (isUnderline) {
                        return (
                            <View key={index} style={styles.underlineContainer}>
                                <Text style={textStyle}>{part}</Text>
                            </View>
                        );
                    }

                    // If inside a frame, include the info sign image left and center with the text
                    if (isFrame) {
                        return (
                            <View key={index} style={styles.frameWithBulb}>
                                <Image source={require('assets/Images/info_sign.png')} style={styles.infoSign} />
                                <Text style={textStyle}>{part}</Text>
                            </View>
                        );
                    }

                    return (
                        <Text key={index} style={textStyle}>
                            {part}
                        </Text>
                    );
                })}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <NextSlideButton
                    onPress={onNext}
                    isActive={true}
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
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    welcomeImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginTop: 100,
        marginBottom: 50,
    },
    contentText: {
        fontSize: 20,
        marginVertical: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    underlineContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 5,
        width: '100%',
        marginVertical: 10,
    },
    frameWithBulb: {
        position: 'relative',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    infoSign: {
        width: 38,
        height: 38,
        position: 'absolute',
        top: 30,
        left: -40,
    },
    line: {
        height: 1.5,
        backgroundColor: 'orange',
        marginVertical: 10,
        width: '100%',
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
