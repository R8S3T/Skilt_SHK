import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { fetchMathChapters } from 'src/database/databaseServices';
import { MathChapter } from "src/types/contentTypes";

type MathChapterScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathChapterScreen'>;

const MathChapterScreen: React.FC = () => {
    const navigation = useNavigation<MathChapterScreenNavigationProp>();
    const [chapters, setChapters] = useState<MathChapter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChapters = async () => {
            try {
                const fetchedChapters = await fetchMathChapters();
                setChapters(fetchedChapters);
            } catch (error) {
                console.error('Failed to fetch chapters:', error);
            } finally {
                setLoading(false);
            }
        };

        loadChapters();
    }, []);

    const renderItem = ({ item }: { item: MathChapter }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate('MathSubchapterScreen', { chapterId: item.ChapterId, chapterTitle: item.ChapterName });
            }}
        >
            <Text style={styles.itemText}>{item.ChapterName}</Text>
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
                data={chapters}
                renderItem={renderItem}
                keyExtractor={item => item.ChapterId.toString()}
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
        fontSize: 24,
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
    itemText: {
        fontSize: 18,
    },
});

export default MathChapterScreen;




