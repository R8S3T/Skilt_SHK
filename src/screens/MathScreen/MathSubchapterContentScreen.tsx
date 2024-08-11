import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import ContentSlide from '../ContentSlide';
import NextButton from '../NextButton';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { GenericContent } from 'src/types/contentTypes';
import { useSubchapter } from '../Chapters/SubchapterContext';
import { fetchMathContentBySubchapterId } from 'src/database/databaseServices';

type MathSubchapterContentScreenRouteProp = RouteProp<MathStackParamList, 'MathSubchapterContentScreen'>;

type MathSubchapterContentScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathSubchapterContentScreen'>;

type Props = {
    route: MathSubchapterContentScreenRouteProp;
    navigation: MathSubchapterContentScreenNavigationProp;
};

const MathSubchapterContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { subchapterId, subchapterTitle, chapterId, chapterTitle } = route.params;
    const [contentData, setContentData] = useState<GenericContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);  // Add ref for ScrollView
    const { markSubchapterAsFinished, unlockSubchapter } = useSubchapter();

    useEffect(() => {
        navigation.setOptions({ title: subchapterTitle });

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
    }, [navigation, subchapterId, subchapterTitle]);

    useEffect(() => {
        console.log('Current Index:', currentIndex);

        // Reset scroll position when currentIndex changes
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
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
            markSubchapterAsFinished(subchapterId);
            unlockSubchapter(subchapterId + 1);
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
        <ScrollView ref={scrollViewRef} style={styles.container}>
            {contentData.length > 0 && (
                <ContentSlide contentData={contentData[currentIndex]} />
            )}
            <View style={styles.buttonContainer}>
                <NextButton
                    onPress={nextContent}
                    isActive={contentData.length > 0}
                    label={currentIndex < contentData.length - 1 ? 'Weiter' : 'Finish'}
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










