import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchSubchaptersByChapterId } from 'src/database/databaseServices';
import { Subchapter } from 'src/types/types';
import { LearnStackParamList } from 'src/types/navigationTypes';
import SubchapterRows from './SubchapterRows';

type SubchaptersScreenRouteProps = {
    route: RouteProp<LearnStackParamList, 'SubchaptersScreen'>;
}

type NavigationType = StackNavigationProp<LearnStackParamList, 'SubchaptersScreen'>;

const SubchaptersScreen: React.FC<SubchaptersScreenRouteProps> = ({ route }) => {
    const { chapterId, chapterTitle } = route.params;
    const [subchapters, setSubchapters] = useState<Subchapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<NavigationType>();

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
        navigation.navigate('SubchapterContentScreen', {
            subchapterId,
            subchapterTitle
        });
    }

    return (
        <ScrollView style={styles.screenContainer}>
            <Text style={styles.heading}>{chapterTitle}</Text>
            <View style={styles.separator} />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <SubchapterRows subchapters={subchapters} onNodePress={handleNodePress} />
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
