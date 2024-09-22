// src/components/ContentMarkerHandler.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';

interface ContentMarkerHandlerProps {
    part: string;
}

const ContentMarkerHandler: React.FC<ContentMarkerHandlerProps> = ({ part }) => {
    if (part.startsWith('[underline]') && part.endsWith('[/underline]')) {
        const underlineText = part.replace('[underline]', '').replace('[/underline]', '');
        return (
            <View style={styles.underlineContainer}>
                <Text style={styles.contentText}>{underlineText}</Text>
            </View>
        );
    }

    if (part.startsWith('[bgcolor-block=')) {
        const bgColor = part.match(/\[bgcolor-block=(#[0-9a-fA-F]{6})\]/)?.[1] || '';
        const content = part.replace(/\[bgcolor-block=.*?\]/, '').replace('[/bgcolor-block]', '');
        return (
            <View style={[styles.bgColorBlock, { backgroundColor: bgColor }]}>
                <Text style={styles.contentText}>{content}</Text>
            </View>
        );
    }

    if (part.startsWith('[frame]') && part.endsWith('[/frame]')) {
        const frameText = part.replace('[frame]', '').replace('[/frame]', '');
        return (
            <View style={styles.frameWithBulb}>
                <Image source={require('assets/Images/info_sign.png')} style={styles.infoSign} />
                <Text style={styles.contentText}>{frameText}</Text>
            </View>
        );
    }

    if (part.startsWith('[LF_')) {
        const imageName = part.replace('[', '').replace(']', '').trim();
        const imageSource = imageMap[imageName as keyof typeof imageMap];

        if (imageSource) {
            let imageStyle = styles.image;

            if (imageName.includes('welcome')) {
                imageStyle = styles.welcomeImage;
            } else if (imageName.includes('small')) {
                imageStyle = styles.smallImage;
            }

            return <Image source={imageSource} style={imageStyle} />;
        } else {
            console.warn(`Image not found for key: ${imageName}`);
        }
    }

    // Default return is null for cases where the part doesn't match any marker
    return null;
};

const styles = StyleSheet.create({
    contentText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        letterSpacing: 0.8,
        marginTop: 5,
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
    frameWithBulb: {
        position: 'relative',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 30,
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
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginVertical: 0,
    },
    welcomeImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    smallImage: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginVertical: 5,
    },
});

export default ContentMarkerHandler;
