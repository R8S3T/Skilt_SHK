import React from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { GenericContent } from 'src/types/contentTypes';
import { useNavigation } from '@react-navigation/native';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

interface ContentSlideProps {
    contentData: GenericContent;
    contentType?: string;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, contentType }) => {
    const navigation = useNavigation<StackNavigationProp<LearnStackParamList>>();
    const { TextContent, ContentData, ImageUrl } = contentData;
    const displayText = TextContent || ContentData;

    return (
        <View style={styles.slide}>
            {ImageUrl && <Image source={{ uri: ImageUrl }} style={styles.image} />}
            <Text style={styles.contentText}>{displayText}</Text>
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
        height: 200,
        resizeMode: 'contain',
    },
    contentText: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default ContentSlide;






