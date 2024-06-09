import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { dynamicCardHeight, scaleFontSize } from 'src/utils/screenDimensions';

type LearnStackParamList = {
    HomeScreen: undefined;
    YearsScreen: undefined;
    ChaptersScreen: { year: string };
};

type ChaptersScreenRouteProps = {
    route: RouteProp<LearnStackParamList, 'ChaptersScreen'>;
}

interface Chapter {
    key: string;
    title: string;
}

const chaptersData: Record<string, Chapter[]> = {
    '1': [
        { key: '1', title: 'Test Titel 1' },
        { key: '2', title: 'Test Titel 2' },
        { key: '3', title: 'Test Titel 3' },
        { key: '4', title: 'Test Titel 4' },
    ],
    '2': [
        { key: '1', title: 'Test Titel 1' },
        { key: '2', title: 'Test Titel 2' },
        { key: '3', title: 'Test Titel 3' },
        { key: '4', title: 'Test Titel 4' },
    ],
    '3': [
        { key: '1', title: 'Test Titel 1' },
        { key: '2', title: 'Test Titel 2' },
        { key: '3', title: 'Test Titel 3' },
        { key: '4', title: 'Test Titel 4' },
        { key: '5', title: 'Test Titel 5' },
    ],
    '4': [
        { key: '1', title: 'Test Titel 1' },
        { key: '2', title: 'Test Titel 2' },
    ],
}

const ChaptersScreen: React.FC<ChaptersScreenRouteProps> = ({ route }) => {
    const { year } = route.params;
    const chapters = chaptersData[year];

    const renderItem = ({ item }: { item: Chapter }) => (
        <TouchableOpacity style={styles.chapterContainer}>
            <Image
                source={require('../../assets/Images/play_icon.png')} // Adjust the path
                style={styles.playButton}
            />
            <Text style={styles.chapterText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{`${year}. Lehrjahr`}</Text>
            <FlatList
                data={chapters}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />
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
    chapterText: {
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