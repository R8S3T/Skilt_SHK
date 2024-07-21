import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentSlide from '../ContentSlide';
import NextButton from '../SubchapterContent/NextButton';
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
    const { subchapterId, subchapterTitle, chapterId, chapterTitle } = route.params;
    const [contentData, setContentData] = useState<SubchapterContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

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

    useEffect(() => {
        console.log('Current Index:', currentIndex);
    }, [currentIndex]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading ...</Text>
            </View>
        );
    }

    const nextContent = () => {
        if (currentIndex < contentData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate('CongratsScreen', {
                subchapterId: subchapterId,
                subchapterTitle: subchapterTitle,
                chapterId: chapterId,
                chapterTitle: chapterTitle,
            });
        }
    };

    return (
        <View style={styles.container}>
            <ContentSlide contentData={contentData[currentIndex]} />
            <View style={styles.buttonContainer}>
                <NextButton
                    onPress={nextContent}
                    isActive={contentData.length > 0}
                    style={styles.nextButton}
                >
                    {currentIndex < contentData.length - 1 ? 'Next' : 'Finish'}
                </NextButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    nextButton: {
        marginLeft: 10,
    },
});

export default SubchapterContentScreen;

