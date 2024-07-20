import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

interface ContentSlideProps {
    contentData: {
        ContentData: string;
        ContentId: number;
    };
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData }) => {
    const { ContentData } = contentData;

    return (
        <View style={styles.slide}>
            <Text style={styles.contentText}>{ContentData}</Text>
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
    contentText: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default ContentSlide;