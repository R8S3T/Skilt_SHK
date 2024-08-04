import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { fetchMathTopicSubchaptersByTopicId } from 'src/database/databaseServices';
import { MathTopicSubchapter } from 'src/types/types';
import GenericRows from '../GenericRows';

type MathTopicSubchapterScreenRouteProp = RouteProp<MathStackParamList, 'MathTopicSubchapterScreen'>;

type MathTopicSubchapterScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathTopicSubchapterScreen'>;

type Props = {
    route: MathTopicSubchapterScreenRouteProp;
    navigation: MathTopicSubchapterScreenNavigationProp;
};

const MathTopicSubchapterScreen: React.FC<Props> = ({ route, navigation }) => {
    const { topicId, topicName } = route.params;
    const [subchapters, setSubchapters] = useState<MathTopicSubchapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        navigation.setOptions({ title: topicName });
        const loadSubchapters = async () => {
            try {
                const data = await fetchMathTopicSubchaptersByTopicId(topicId);
                setSubchapters(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load subchapters:', error);
                setLoading(false);
            }
        };
        loadSubchapters();
    }, [navigation, topicId, topicName]);

    const handleNodePress = (subchapterId: number, subchapterName: string) => {
        navigation.navigate('MathTopicContentScreen', {
            subchapterId,
            subchapterName,
            topicId,
            topicName
        });
    };

    const formattedSubchapters = subchapters.map(subchapter => ({
        id: subchapter.SubchapterId,
        title: subchapter.SubchapterName,
        isLocked: false,  // Adjust this logic as needed
        isFinished: false,  // Adjust this logic as needed
    }));

    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <GenericRows items={formattedSubchapters} onNodePress={handleNodePress} color="#FF5733" finishedColor="#32CD32" />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
});

export default MathTopicSubchapterScreen;


