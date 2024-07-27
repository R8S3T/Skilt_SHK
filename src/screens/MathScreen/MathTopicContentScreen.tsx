import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { fetchMathContentByTopicId } from 'src/database/databaseServices';
import { MathTopicContent } from 'src/types/types';
import ContentSlide from '../ContentSlide';

type MathTopicContentScreenRouteProp = RouteProp<MathStackParamList, 'MathTopicContentScreen'>;

type MathTopicContentScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathTopicContentScreen'>;

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
        console.log(`Received params: topicId=${topicId}, topicName=${topicName}`);

        const loadData = async () => {
            try {
                const data = await fetchMathContentByTopicId(topicId);
                setContentData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load content data:', error);
                setLoading(false);
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
                <ContentSlide key={content.ContentId} contentData={content} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default MathTopicContentScreen;

