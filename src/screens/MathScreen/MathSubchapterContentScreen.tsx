import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { fetchMathContentBySubchapterId } from 'src/database/databaseServices';
import { MathSubchapterContent } from 'src/types/types';
import { MathSubchapterContext } from './MathSubchapterContext';
import ContentSlide from '../ContentSlide';
import NextButton from '../NextButton';

type MathSubchapterContentScreenRouteProp = RouteProp<MathStackParamList, 'MathSubchapterContentScreen'>;

type MathSubchapterContentScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathSubchapterContentScreen'>;

type Props = {
    route: MathSubchapterContentScreenRouteProp;
    navigation: MathSubchapterContentScreenNavigationProp;
};

const MathSubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterTitle, chapterId, chapterTitle } = route.params;
    const [contentData, setContentData] = useState<MathSubchapterContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const context = useContext(MathSubchapterContext); // Add this line

    if (!context) {
        throw new Error('MathSubchapterContext must be used within a MathSubchapterProvider');
    }

    const { markSubchapterAsFinished, unlockSubchapter } = context

    useEffect(() => {
        navigation.setOptions({ title: subchapterTitle });
        console.log(`Received params: chapterId=${chapterId}, chapterTitle=${chapterTitle}, subchapterId=${subchapterId}, subchapterTitle=${subchapterTitle}`);

        const loadData = async () => {
            try {
                const data = await fetchMathContentBySubchapterId(subchapterId);
                setContentData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load content data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, [navigation, chapterId, chapterTitle, subchapterId, subchapterTitle]);

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
            markSubchapterAsFinished(subchapterId); // Add this line
            unlockSubchapter(subchapterId + 1); // Add this line
            navigation.navigate('MathCongratsScreen', {
                targetScreen: 'MathSubchapterScreen',
                targetParams: {
                    chapterId: chapterId,
                    chapterTitle: chapterTitle,
                },
            });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <ContentSlide contentData={contentData[currentIndex]} />
            <View style={styles.buttonContainer}>
                <NextButton
                    onPress={nextContent}
                    isActive={contentData.length > 0}
                    label={currentIndex < contentData.length - 1 ? 'Next' : 'Finish'}
                    style={styles.nextButton}
                />
            </View>
        </ScrollView>
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

export default MathSubchapterContentScreen;





