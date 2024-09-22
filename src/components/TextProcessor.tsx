// src/components/TextProcessor.tsx
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';

interface TextProcessorProps {
    text: string;
}

const TextProcessor: React.FC<TextProcessorProps> = ({ text }) => {
    const processText = (text: string) => {
        const parts = text.split(/(\[bold\].*?\[\/bold\])|(\[heading\].*?\[\/heading\])|(\[subheading\].*?\[\/subheading\])|(\[section\].*?\[\/section\])/g);
    
        return parts.map((part, index) => {
            if (!part) return null;

            if (part.startsWith('[heading]') && part.endsWith('[/heading]')) {
                const headingText = part.replace('[heading]', '').replace('[/heading]', '');
                return <Text key={index} style={styles.headingText}>{headingText}</Text>;
            }

            if (part.startsWith('[subheading]') && part.endsWith('[/subheading]')) {
                const subheadingText = part.replace('[subheading]', '').replace('[/subheading]', '');
                return <Text key={index} style={styles.subheadingText}>{subheadingText}</Text>;
            }

            if (part.startsWith('[section]') && part.endsWith('[/section]')) {
                const sectionText = part.replace('[section]', '').replace('[/section]', '');
                return <Text key={index} style={styles.sectionText}>{sectionText}</Text>;
            }

            if (part.startsWith('[bold]') && part.endsWith('[/bold]')) {
                const boldText = part.replace('[bold]', '').replace('[/bold]', '');
                return <Text key={index} style={styles.boldText}>{boldText}</Text>;
            }

            return <Text key={index} style={styles.contentText}>{part}</Text>;
        });
    };

    return <>{processText(text)}</>;
};

const styles = StyleSheet.create({
    contentText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        letterSpacing: 0.8,
        marginTop: 5,
    },
    boldText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        color: '#000',
    },
    headingText: {
        fontFamily: 'Lato-Bold',
        fontSize: 24,
    },
    subheadingText: {
        fontFamily: 'Lato-Medium',
        fontSize: 20,
        fontStyle: 'italic',
    },
    sectionText: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: 18,
        letterSpacing: 1.2,
    },
});

export default TextProcessor;
