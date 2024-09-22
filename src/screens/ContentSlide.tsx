import React from 'react';
import { View, StyleSheet } from 'react-native';
import NextSlideButton from './NextSlideButton';
import ContentHandler from 'src/components/ContentHandler';
import { GenericContent } from 'src/types/contentTypes';
import { ScrollView } from 'react-native-gesture-handler';

interface ContentSlideProps {
    contentData: GenericContent;
    onNext: () => void;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, onNext }) => {
    const { ContentData } = contentData;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} nestedScrollEnabled={true}>
                {ContentData.split(/\n/).map((part, index) => (
                    <ContentHandler key={index} part={part} />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <NextSlideButton
                    onPress={onNext}
                    isActive={true}
                    label="Weiter"
                    style={styles.nextButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
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

export default ContentSlide;
