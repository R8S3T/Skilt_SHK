import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { SubchapterContent } from 'src/types/types';
import { fetchSubchapterContentBySubchapterId } from 'src/database/databaseServices';

type SubchapterContentScreenRouteProp = RouteProp<LearnStackParamList, 'SubchapterContentScreen'>;

type SubchapterContentScreenNavigationProp = StackNavigationProp<LearnStackParamList, 'SubchapterContentScreen'>;

type Props = {
    route: SubchapterContentScreenRouteProp;
    navigation: SubchapterContentScreenNavigationProp;
};

const SubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterTitle } = route.params;
    const [contentData, setContentData] = useState<SubchapterContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        navigation.setOptions({ title: subchapterTitle });

        const loadData = async () => {
            try {
                const data = await fetchSubchapterContentBySubchapterId(subchapterId);
                setContentData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load content data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, [navigation, subchapterId, subchapterTitle]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading ...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {contentData.map(content => (
                <Text key={content.ContentId} style={styles.contentText}>{content.ContentData}</Text>
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    contentText: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default SubchapterContentScreen;
