import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { fetchMathChapters } from 'src/database/databaseServices';
import { MathChapter } from "src/types/contentTypes";
import { imageMap } from "src/utils/imageMappings";

type MathChapterScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathChapterScreen'>;

const MathChapterScreen: React.FC = () => {
    const navigation = useNavigation<MathChapterScreenNavigationProp>();
    const [chapters, setChapters] = useState<MathChapter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChapters = async () => {
            try {
                const fetchedChapters = await fetchMathChapters();
                console.log("Fetched Chapters:", fetchedChapters);  // Debug log to check data
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
            {item.Image && imageMap[item.Image as keyof typeof imageMap] && (
                <Image source={imageMap[item.Image as keyof typeof imageMap]} style={styles.image} />
            )}
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
            {/* Sticky Header */}
            <Text style={styles.stickyHeader}>Fachmathematik</Text>

            {/* Scrollable Content */}
            <FlatList
                contentContainerStyle={styles.flatListContent} // Prevents overlap with sticky header
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
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    stickyHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
        backgroundColor: 'white', // Background color to make the header stand out
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    flatListContent: {
        paddingTop: 60,  // Offset to avoid overlap with sticky header
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        resizeMode: 'contain',
    },
    itemText: {
        fontSize: 18,
        flexShrink: 1, // Allow text to shrink to fit within available space
        flexWrap: 'wrap', // Allow wrapping onto the next line
        maxWidth: '75%', // Limit width to leave space for the image
    },
});

export default MathChapterScreen;





