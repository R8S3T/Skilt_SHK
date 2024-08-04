import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageSourcePropType } from 'react-native';
import { scaleFontSize } from "src/utils/screenDimensions";
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { fetchMathTopics } from 'src/database/databaseServices'; // Import your fetch function
import { MathTopic } from 'src/types/types';

type MathScreenNavigationProp = StackNavigationProp<LearnStackParamList, 'MathScreen'>;

const MathScreen: React.FC = () => {
    const navigation = useNavigation<MathScreenNavigationProp>();
    const [topics, setTopics] = useState<MathTopic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTopics = async () => {
            try {
                const fetchedTopics = await fetchMathTopics();
                setTopics(fetchedTopics);
            } catch (error) {
                console.error('Failed to fetch topics:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTopics();
    }, []);

    const renderItem = ({ item }: { item: MathTopic }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate('MathTopicSubchapterScreen', { topicId: item.TopicId, topicName: item.TopicName });
            }}
        >
            <Text style={styles.itemText}>{item.TopicName}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Fachmathematik</Text>
            <FlatList
                data={topics}
                renderItem={renderItem}
                keyExtractor={item => item.TopicId.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: scaleFontSize(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    iconStyle: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
    itemText: {
        fontSize: scaleFontSize(18),
    },
});

export default MathScreen;



