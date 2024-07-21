import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchSubchaptersByChapterId } from 'src/database/databaseServices';
import { Subchapter } from 'src/types/types';
import { LearnStackParamList } from 'src/types/navigationTypes';
import SubchapterRows from './SubchapterRows';
import { SubchapterContext } from './SubchapterContext'

type SubchaptersScreenRouteProps = {
    route: RouteProp<LearnStackParamList, 'SubchaptersScreen'>;
}

type NavigationType = StackNavigationProp<LearnStackParamList, 'SubchaptersScreen'>;

const SubchaptersScreen: React.FC<SubchaptersScreenRouteProps> = ({ route }) => {
    const { chapterId, chapterTitle } = route.params;
    const [subchapters, setSubchapters] = useState<Subchapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<NavigationType>();
    const context = useContext(SubchapterContext);

    if (!context) {
        throw new Error('SubchapterContext must be used within a SubchapterProvider');
    }

    const { unlockedSubchapters , finishedSubchapters, markSubchapterAsFinished, setCurrentSubchapter } = context;


    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSubchaptersByChapterId(chapterId);
                console.log("Fetched Subchapters Data for chapterId " + chapterId + ":", data);
                setSubchapters(data);
            } catch (error) {
                console.error('Failed to load subchapters for chapterId ' + chapterId + ':', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [chapterId]);

    const handleNodePress = (subchapterId: number, subchapterTitle: string) => {
        setCurrentSubchapter(subchapterId, subchapterTitle);
        navigation.navigate('SubchapterContentScreen', {
            subchapterId,
            subchapterTitle,
            chapterId,
            chapterTitle
        });
    }

    const renderedSubchapters = subchapters.map(subchapter => ({
        ...subchapter,
        isLocked: !unlockedSubchapters.includes(subchapter.SubchapterId),
        isFinished: finishedSubchapters.includes(subchapter.SubchapterId)
    }));

    return (
        <ScrollView style={styles.screenContainer}>
            <Text style={styles.heading}>{chapterTitle}</Text>
            <View style={styles.separator} />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <SubchapterRows subchapters={renderedSubchapters} onNodePress={handleNodePress} />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        marginTop: 25,
        color: '#2b4353',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#2b4353',
        marginVertical: 5,
    },
});

export default SubchaptersScreen;
