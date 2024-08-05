import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { fetchMathContentBySubchapterId } from 'src/database/databaseServices';
import { MathTopicContent } from 'src/types/types';
import ContentSlide from '../screens/ContentSlide';

type MathTopicContentScreenRouteProp = RouteProp<MathStackParamList, 'MathTopicContentScreen'>;

type MathTopicContentScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathTopicContentScreen'>;

type Props = {
    route: MathTopicContentScreenRouteProp;
    navigation: MathTopicContentScreenNavigationProp;
};

const MathTopicContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterName, topicId, topicName } = route.params;
    const [contentData, setContentData] = useState<MathTopicContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        navigation.setOptions({ title: subchapterName });
        console.log(`Received params: topicId=${topicId}, topicName=${topicName}, subchapterId=${subchapterId}, subchapterName=${subchapterName}`);

        const loadData = async () => {
            try {
                const data = await fetchMathContentBySubchapterId(subchapterId);
                setContentData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load content data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, [navigation, topicId, topicName, subchapterId, subchapterName]);

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


