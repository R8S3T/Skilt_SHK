import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GenericRows from '../screens/GenericRows';
import { fetchMathTopics } from 'src/database/databaseServices';
import { MathTopic } from 'src/types/types';
import { MathStackParamList } from 'src/types/navigationTypes';

interface MathTopicNode {
    id: number;
    title: string;
    isLocked: boolean;
    isFinished: boolean;
}

type NavigationType = StackNavigationProp<MathStackParamList, 'MathTopicContentScreen'>;

const MathTopicScreen: React.FC = () => {
    const [nodes, setNodes] = useState<MathTopicNode[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationType>();

    useEffect(() => {
        const loadTopics = async () => {
            try {
                const topics = await fetchMathTopics();
                const formattedNodes: MathTopicNode[] = topics.map((topic: MathTopic) => ({
                    id: topic.TopicId,
                    title: topic.TopicName,
                    isLocked: false,
                    isFinished: false,
                }));
                setNodes(formattedNodes);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch topics:', error);
                setLoading(false);
            }
        };

        loadTopics();
    }, []);

    const handleNodePress = (nodeId: number, title: string) => {
        console.log(`Node ${nodeId} pressed: ${title}`);
        navigation.navigate('MathTopicSubchapterScreen', {
            topicId: nodeId,
            topicName: title
        });
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Gleichungen</Text>
            <View style={styles.separator} />
            <GenericRows items={nodes} onNodePress={handleNodePress} color="#FF5733" finishedColor="#32CD32" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
    },
});

export default MathTopicScreen;

