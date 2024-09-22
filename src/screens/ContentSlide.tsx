import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NextSlideButton from './NextSlideButton';
import TextProcessor from 'src/components/TextProcessor';
import ContentMarkerHandler from 'src/components/ContentMarkerHandler';
import { GenericContent } from 'src/types/contentTypes';

interface ContentSlideProps {
    contentData: GenericContent;
    onNext: () => void;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, onNext }) => {
    const { ContentData } = contentData;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} nestedScrollEnabled={true}>
                {ContentData.split(/\n/).map((part, index) => {
                    // First handle all special markers
                    return (
                        <React.Fragment key={index}>
                            <ContentMarkerHandler part={part} />
                            {/* Process the remaining text */}
                            <TextProcessor text={part} />
                        </React.Fragment>
                    );
                })}
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

