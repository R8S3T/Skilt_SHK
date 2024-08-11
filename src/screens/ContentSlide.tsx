import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import { GenericContent } from 'src/types/contentTypes';

interface ContentSlideProps {
    contentData: GenericContent;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData }) => {
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
    welcomeImage: {  // Specific style for images containing "welcome" in the name
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    contentText: {
        fontSize: 20,
        marginVertical: 10,
    },
});

export default ContentSlide;






