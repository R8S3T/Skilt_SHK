// MathChapterScreen.tsx
import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { fetchMathChapters } from 'src/database/databaseServices';
import { MathChapter } from "src/types/contentTypes";
import { imageMap } from "src/utils/imageMappings";
import { useTheme } from 'src/context/ThemeContext';
import ThemeWrapper from 'src/components/ThemeWrapper';

type MathChapterScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathChapterScreen'>;

const MathChapterScreen: React.FC = () => {
    const navigation = useNavigation<MathChapterScreenNavigationProp>();
    const { isDarkMode, theme } = useTheme();
    const [chapters, setChapters] = useState<MathChapter[]>([]);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Start',
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.primaryText,
        });
    }, [navigation, theme]);

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
            style={[styles.itemContainer, { borderColor: theme.border }]}
            onPress={() => {
                navigation.navigate('MathSubchapterScreen', { chapterId: item.ChapterId, chapterTitle: item.ChapterName });
            }}
        >
            {item.Image && imageMap[item.Image as keyof typeof imageMap] && (
                <Image source={imageMap[item.Image as keyof typeof imageMap]} style={styles.image} />
            )}
            <Text style={[styles.itemText, { color: theme.primaryText }]}>{item.ChapterName}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{ color: theme.primaryText }}>Loading...</Text>
            </View>
        );
    }

    return (
        <ThemeWrapper>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                {/* Sticky Header */}
                <Text style={[styles.stickyHeader, { color: theme.primaryText, backgroundColor: theme.surface }]}>
                    Fachmathematik
                </Text>
    
                {/* Scrollable Content */}
                <FlatList
                    contentContainerStyle={styles.flatListContent}
                    data={chapters}
                    renderItem={renderItem}
                    keyExtractor={item => item.ChapterId.toString()}
                />
            </View>
        </ThemeWrapper>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
    },
    stickyHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    flatListContent: {
        paddingTop: 60,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        resizeMode: 'contain',
    },
    itemText: {
        fontSize: 18,
        flexShrink: 1,
        flexWrap: 'wrap',
        maxWidth: '75%',
    },
});

export default MathChapterScreen;

