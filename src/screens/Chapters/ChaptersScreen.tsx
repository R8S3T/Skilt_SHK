// src/screens/ChaptersScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { dynamicCardHeight, scaleFontSize } from 'src/utils/screenDimensions';
import { Chapter } from 'src/types/contentTypes';
import { fetchChaptersByYear } from 'src/database/databaseServices';
import { LearnStackParamList } from 'src/types/navigationTypes'; // Make sure the path matches your actual file structure

type ChaptersScreenRouteProps = {
    route: RouteProp<LearnStackParamList, 'ChaptersScreen'>;
};

type NavigationType = StackNavigationProp<LearnStackParamList, 'ChaptersScreen'>;

const ChaptersScreen: React.FC<ChaptersScreenRouteProps> = ({ route }) => {
    const { year } = route.params;
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<NavigationType>();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchChaptersByYear(parseInt(year));
                console.log("Fetched Chapters Data for year " + year + ":", data);
                setChapters(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load chapters for year ' + year + ':', error);
                setLoading(false);
            }
        };

        loadData();
    }, [year]);

    const renderItem = ({ item }: { item: Chapter }) => (
        <TouchableOpacity
            style={styles.chapterContainer}
            onPress={() => navigation.navigate('SubchaptersScreen', {
                chapterId: item.ChapterId,
                chapterTitle: item.ChapterName
            })}
        >
            <Image
                source={require('../../../assets/Images/play_icon.png')}
                style={styles.playButton}
            />
            {item.ChapterIntro && <Text style={styles.introText}>{item.ChapterIntro}</Text>}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{`${year}. Lehrjahr`}</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={chapters}
                    renderItem={renderItem}
                    keyExtractor={item => item.ChapterId.toString()}
                />
            )}
        </View>
    );
};

const iconSize = 24;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(22),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#2b4353',
        backgroundColor: 'transparent',
    },
    chapterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        marginTop: 20,
        margin: 18,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2b4353',
        borderRadius: 10,
        backgroundColor: 'transparent',
        height: dynamicCardHeight(95, 110),
    },
    introText: {
        flex: 1,
        marginLeft: 28,
        fontFamily: 'OpenSans-Regular',
        color: '#2b4353',
        fontSize: scaleFontSize(13),
    },
    playButton: {
        width: iconSize,
        height: iconSize,
        tintColor: '#e8630a',
    },
});

export default ChaptersScreen;
