// ContentSlide.tsx
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { SubchapterContent } from 'src/types/types';
import { GenericContent } from 'src/types/types';

interface ContentSlideProps {
    contentData: GenericContent;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData }) => {
    const { TextContent, ImageUrl, Quiz } = contentData;

    return (
        <View style={styles.slide}>
            {ImageUrl && <Image source={{ uri: ImageUrl }} style={styles.image} />}
            <Text style={styles.contentText}>{TextContent}</Text>
            {Quiz && (
                <View style={styles.quizContainer}>
                    <Text style={styles.quizQuestion}>{Quiz.Question}</Text>
                    {Quiz.Options.map((option, index) => (
                        <Text key={index} style={styles.quizOption}>{option}</Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    contentText: {
        fontSize: 16,
        marginBottom: 10,
    },
    quizContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    quizQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quizOption: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ContentSlide;
