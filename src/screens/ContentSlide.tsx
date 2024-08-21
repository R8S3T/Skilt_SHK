import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import NextSlideButton from './NextSlideButton';
import { imageMap } from 'src/utils/imageMappings';
import { GenericContent } from 'src/types/contentTypes';

interface ContentSlideProps {
    contentData: GenericContent;
    onNext: () => void; // Add this prop to handle the "Next" action
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, onNext }) => {
    const { ContentData } = contentData;

    // Split the content by any image placeholders like [equations_3]
    const parts = ContentData.split(/\[([^\]]+)\]/);

    return (
        <View style={styles.slide}>
            {parts.map((part, index) => {
                const trimmedPart = part.trim();
                const imageSource = imageMap[trimmedPart as keyof typeof imageMap];

                if (imageSource) {
                    // Apply larger style if the image name contains "welcome"
                    const imageStyle = trimmedPart.toLowerCase().includes('welcome')
                        ? styles.welcomeImage
                        : styles.image;

                    return <Image key={index} source={imageSource} style={imageStyle} />;
                } else {
                    return <Text key={index} style={styles.contentText}>{part}</Text>;
                }
            })}
            <View style={styles.buttonContainer}>
                <NextSlideButton
                    onPress={onNext}
                    isActive={true}
                    label="Next"
                    style={styles.nextButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        padding: 20,
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
        marginTop: 100,
        marginBottom: 50,
    },
    contentText: {
        fontSize: 20,
        marginVertical: 10,
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













