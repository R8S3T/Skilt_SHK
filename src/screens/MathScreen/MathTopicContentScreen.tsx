import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MathStackParamList } from 'src/types/navigationTypes';
import { fetchMathContentByTopicId } from 'src/database/databaseServices';
import { MathTopicContent } from 'src/types/types';
import ContentSlide from '../ContentSlide';
import NextButton from '../SubchapterContent/NextButton';

type MathTopicContentScreenRouteProp = RouteProp<MathStackParamList, 'MathTopicContentScreen'>;

type MathTopicContentScreenNavigationProp = StackNavigationProp<MathStackParamList, 'MathTopicContentScreen'>;

type Props = {
    route: MathTopicContentScreenRouteProp;
    navigation: MathTopicContentScreenNavigationProp;
};

const MathTopicContentScreen: React.FC<Props> = ({ route, navigation }) => {
    const { topicId, topicName } = route.params;
    const [contentData, setContentData] = useState<MathTopicContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        navigation.setOptions({ title: topicName });
        console.log(`Received params: topicId=${topicId}, topicName=${topicName}`);

        const loadData = async () => {
            try {
                const data = await fetchMathContentByTopicId(topicId);
                setContentData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load content data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, [navigation, topicId, topicName]);

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
        if (currentIndex < contentData.length -1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate('CongratsScreen', {
                contentId: topicId,
                contentTitle: topicName,
                onContinue: () => {
                    navigation.navigate('MathTopicScreen');
                }
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

export default MathTopicContentScreen;

