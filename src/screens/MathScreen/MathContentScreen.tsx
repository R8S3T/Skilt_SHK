import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { fetchMathContentByTopicId } from 'src/database/databaseServices';
import { MathTopicContent } from 'src/types/types';

type MathTopicContentScreenRouteProp = RouteProp<LearnStackParamList, 'MathTopicContentScreen'>;

type MathTopicContentScreenNavigationProp = StackNavigationProp<LearnStackParamList, 'MathTopicContentScreen'>;

type Props = {
    route: MathTopicContentScreenRouteProp;
    navigation: MathTopicContentScreenNavigationProp;
};

const MathTopicContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { topicId, topicName } = route.params;
    const [contentData, setContentData] = useState<MathTopicContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        navigation.setOptions({ title: topicName });

        const loadData = async() => {
            try {
                const data = await fetchMathContentByTopicId(topicId);
                setContentData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load content data:', error)
            }
        };

        loadData();
    }, [navigation, topicId, topicName]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading ...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {contentData.map(content => (
                <View key={content.ContentId} style={styles.contentSection}>
                    {content.ImageUrl && <Image source={{ uri: content.ImageUrl }} style={styles.image} />}
                    <Text style={styles.contentText}>{content.TextContent}</Text>
                    {content.Quiz && (
                        <View style={styles.quizContainer}>
                            <Text style={styles.quizQuestion}>{content.Quiz.Question}</Text>
                            {content.Quiz.Options.map((option, index) => (
                                <Text key={index} style={styles.quizOption}>{option}</Text>
                            ))}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    contentSection: {
        marginBottom: 20,
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

export default MathTopicContentScreen;