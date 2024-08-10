import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { fetchMathSubchaptersByChapterId } from 'src/database/databaseServices';
import { MathSubchapter } from 'src/types/contentTypes';
import GenericRows from '../GenericRows';
import { MathSubchapterContext } from './MathSubchapterContext';

type MathSubchapterScreenRouteProp = RouteProp<MathStackParamList, 'MathSubchapterScreen'>;

type MathSubchapterScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathSubchapterScreen'>;

type Props = {
    route: MathSubchapterScreenRouteProp;
    navigation: MathSubchapterScreenNavigationProp;
};

const MathSubchapterScreen: React.FC<Props> = ({ route, navigation }) => {
    const { chapterId, chapterTitle } = route.params;
    const [subchapters, setSubchapters] = useState<MathSubchapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const context = useContext(MathSubchapterContext);

    if (!context) {
        throw new Error('MathSubchapterContext must be used within a MathSubchapterProvider');
    }

    const { unlockedSubchapters, finishedSubchapters, setCurrentSubchapter } = context;

    useEffect(() => {
        navigation.setOptions({ title: chapterTitle });
        const loadSubchapters = async () => {
            try {
                const data = await fetchMathSubchaptersByChapterId(chapterId);
                setSubchapters(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load subchapters:', error);
                setLoading(false);
            }
        };
        loadSubchapters();
    }, [navigation, chapterId, chapterTitle]);

    const handleNodePress = (subchapterId: number, subchapterTitle: string) => {
        navigation.navigate('MathSubchapterContentScreen', {
            subchapterId,
            subchapterTitle,
            chapterId,
            chapterTitle
        });
    };

    const formattedSubchapters = subchapters.map(subchapter => ({
        id: subchapter.SubchapterId,
        title: subchapter.SubchapterName,
        isLocked: !unlockedSubchapters.includes(subchapter.SubchapterId),
        isFinished: finishedSubchapters.includes(subchapter.SubchapterId),
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

export default MathSubchapterScreen;

