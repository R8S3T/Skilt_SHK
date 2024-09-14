import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import NextSlideButton from './NextSlideButton';
import { imageMap } from 'src/utils/imageMappings';
import { GenericContent } from 'src/types/contentTypes';

interface ContentSlideProps {
    contentData: GenericContent;
    onNext: () => void;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ contentData, onNext }) => {
    const { ContentData } = contentData;

    const processText = (text: string) => {
        const parts = text.split(/(\[bold\].*?\[\/bold\])|(\[heading\].*?\[\/heading\])|(\[subheading\].*?\[\/subheading\])/g); // Added subheading marker
    
        return parts.map((part, index) => {
            if (!part) return null; // Safeguard against undefined or null parts
    
            // Handle heading marker
            if (part.startsWith('[heading]') && part.endsWith('[/heading]')) {
                const headingText = part.replace('[heading]', '').replace('[/heading]', '');
                return <Text key={index} style={styles.headingText}>{headingText}</Text>;
            }
    
            // Handle subheading marker
            if (part.startsWith('[subheading]') && part.endsWith('[/subheading]')) {
                const subheadingText = part.replace('[subheading]', '').replace('[/subheading]', '');
                return <Text key={index} style={styles.subheadingText}>{subheadingText}</Text>;
            }

            // Handle bold marker
            if (part.startsWith('[bold]') && part.endsWith('[/bold]')) {
                const boldText = part.replace('[bold]', '').replace('[/bold]', '');
                return <Text key={index} style={styles.boldText}>{boldText}</Text>;
            }

            // Default to regular content text
            return <Text key={index} style={styles.contentText}>{part}</Text>;
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {ContentData.split(/\n/).map((part, index) => {
                    // Handle underline markers
                    if (part.startsWith('[underline]') && part.endsWith('[/underline]')) {
                        const underlineText = part.replace('[underline]', '').replace('[/underline]', '');
                        return (
                            <View key={index} style={styles.underlineContainer}>
                                <Text style={styles.contentText}>{underlineText}</Text>
                            </View>
                        );
                    }

                    // Handle bgcolor-block markers
                    if (part.startsWith('[bgcolor-block=')) {
                        const bgColor = part.match(/\[bgcolor-block=(#[0-9a-fA-F]{6})\]/)?.[1] || '';
                        const content = part.replace(/\[bgcolor-block=.*?\]/, '').replace('[/bgcolor-block]', '');
                        return (
                            <View key={index} style={[styles.bgColorBlock, { backgroundColor: bgColor }]}>
                                <Text style={styles.contentText}>{content}</Text>
                            </View>
                        );
                    }

                    // Handle frame markers
                    if (part.startsWith('[frame]') && part.endsWith('[/frame]')) {
                        const frameText = part.replace('[frame]', '').replace('[/frame]', '');
                        return (
                            <View key={index} style={styles.frameWithBulb}>
                                <Image source={require('assets/Images/info_sign.png')} style={styles.infoSign} />
                                <Text style={styles.contentText}>{frameText}</Text>
                            </View>
                        );
                    }

                    // Handle images
                    if (part.startsWith('[LF_')) {
                        const imageName = part.replace('[', '').replace(']', '').trim();
                        const imageSource = imageMap[imageName as keyof typeof imageMap];
                        if (imageSource) {
                            const isWelcomeImage = imageName.includes('welcome');
                            const imageStyle = isWelcomeImage ? styles.welcomeImage : styles.image;
                            return <Image key={index} source={imageSource} style={imageStyle} />;
                        } else {
                            console.warn(`Image not found for key: ${imageName}`);
                        }
                    }

                    // Process text (including bold and heading markers)
                    return (
                        <Text key={index} style={styles.contentText}>
                            {processText(part)}
                        </Text>
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
    contentText: {
        fontFamily: 'OpenSans-Regular',  // Default font for body text
        fontSize: 20,
    },
    boldText: {
        fontFamily: 'OpenSans-Semibold', // Use OpenSans-SemiBold for subtle bold effect
        fontSize: 20,
        color: '#333',                   // Slightly darker color to make it stand out
    },
    headingText: {
        fontFamily: 'Lato-Bold',         // Use Lato for headings
        fontSize: 24,
    },
    subheadingText: {
        fontFamily: 'Lato-Medium',
        fontSize: 22,
    },
    underlineContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 5,
        width: '100%',
        marginVertical: 10,
    },
    bgColorBlock: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'contain',
        marginVertical: 0,
        marginTop: 10,
        marginBottom: 10,
    },
    welcomeImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 20,
    },
    frameWithBulb: {
        position: 'relative',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    infoSign: {
        width: 38,
        height: 38,
        position: 'absolute',
        top: 30,
        left: -40,
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
