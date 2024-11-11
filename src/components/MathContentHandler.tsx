import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import { useTheme } from 'src/context/ThemeContext';

interface MathContentHandlerProps {
    part: string;
    index: number;
    }

const MathContentHandler: React.FC<MathContentHandlerProps> = ({ part, index }) => {
const { theme, isDarkMode } = useTheme();

const renderPart = (part: string, index: number) => {
    const content = [];
    const bgColorBlockRegex = /\[bgcolor-block=(#?[a-zA-Z0-9]+)\]([\s\S]*?)\[\/bgcolor-block\]/g;
    let lastIndex = 0, match;

    while ((match = bgColorBlockRegex.exec(part)) !== null) {
        if (match.index > lastIndex) {
            content.push(...processNormalText(part.slice(lastIndex, match.index), index, lastIndex));
        }
        const bgColor = isDarkMode ? '#333333' : match[1];
        const bgText = match[2];
        content.push(
            <View key={`${index}-bgcolor-block-${lastIndex}`} style={[styles.bgColorBlock, { backgroundColor: bgColor }]}>
                <Text style={[styles.contentText, { color: theme.primaryText }]}>{bgText}</Text>
            </View>
        );
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < part.length) {
        content.push(...processNormalText(part.slice(lastIndex), index, lastIndex));
    }
    return <View style={styles.fullWidthPartContainer}>{content}</View>;
};

const processNormalText = (text: string, index: number, lastIndex: number) => {
    const lines = text.split('\n');
    return lines.map((line, subIndex) => {
        const content = [];

        // Inline background line
        const bgColorLineRegex = /\[bgcolor-line=(#?[a-zA-Z0-9]+)\](.*?)\[\/bgcolor-line\]/;
        const bgColorLineMatch = line.match(bgColorLineRegex);
        if (bgColorLineMatch) {
            const bgColor = bgColorLineMatch[1];
            const bgText = bgColorLineMatch[2];
            content.push(
                <Text key={`${index}-${lastIndex}-${subIndex}`} style={[styles.contentText, { backgroundColor: bgColor, color: theme.primaryText, padding: 5 }]}>
                    {bgText}
                </Text>
            );
            return content;
        }

        // Image handling
        if (line.startsWith('[equations_') || line.startsWith('[bigImage_')) {
            const imageName = line.replace('[', '').replace(']', '').trim();
            const imageSource = imageMap[imageName as keyof typeof imageMap];
            if (imageSource) {
                content.push(
                    <Image
                        key={`${index}-${lastIndex}-${subIndex}`}
                        source={imageSource}
                        style={imageName.includes("welcome") ? styles.welcomeImage : imageName.includes("big") ? styles.bigImage : styles.image}
                    />
                );
            }
            return content;
        }

        // Check for heading
        if (line.startsWith('[heading]') && line.endsWith('[/heading]')) {
            const headingText = line.replace('[heading]', '').replace('[/heading]', '');
            content.push(
                <Text key={`${index}-${lastIndex}-${subIndex}-heading`} style={[styles.headingText, { color: theme.primaryText }]}>
                    {headingText}
                </Text>
            );
            return content;
        }

        // Check for subheading
        if (line.startsWith('[subheading]') && line.endsWith('[/subheading]')) {
            const subheadingText = line.replace('[subheading]', '').replace('[/subheading]', '');
            content.push(
                <Text key={`${index}-${lastIndex}-${subIndex}-subheading`} style={[styles.subheadingText, { color: theme.secondaryText }]}>
                    {subheadingText}
                </Text>
            );
            return content;
        }
        // Underline text
        if (line.includes('[underline]') && line.includes('[/underline]')) {
            const underlineText = line.replace('[underline]', '').replace('[/underline]', '');
            content.push(
                <View key={`${index}-${lastIndex}-${subIndex}`} style={[styles.underlineContainer, { borderBottomColor: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                    <Text style={[styles.contentText, { color: theme.primaryText }]}>{underlineText}</Text>
                </View>
            );
            return content;
        }

        // Bold and normal text
        const parts = line.split(/(\[bold\].*?\[\/bold\])/g);
        const lineContent = parts.map((part, partIndex) =>
            part.startsWith('[bold]') && part.endsWith('[/bold]')
                ? <Text key={`${index}-${subIndex}-${partIndex}-bold`} style={[styles.contentText, { fontWeight: 'bold', color: theme.primaryText }]}>{part.replace('[bold]', '').replace('[/bold]', '')}</Text>
                : <Text key={`${index}-${subIndex}-${partIndex}-normal`} style={[styles.contentText, { color: theme.primaryText }]}>{part}</Text>
        );

        return <Text key={`${index}-${lastIndex}-${subIndex}-combined`} style={[styles.contentText, { color: theme.primaryText }]}>{lineContent}</Text>;
    });
};

// At the end of the component:
return <>{renderPart(part, index)}</>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullWidthPartContainer: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    partContainer: {
        flex: 1,
        padding: 5,
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginVertical: 8,
    },
    welcomeImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginVertical: 0,
    },
    bigImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginVertical: 0,
    },
    contentText: {
        fontSize: 20,
        marginVertical: 1.5,
        color: '#000',
        padding: 5,
        letterSpacing: 1.2,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
        width: '100%',
    },
    underlineContainer: {
        borderBottomWidth: 2,
        paddingBottom: 5,
        width: '100%',
        marginVertical: 10,
    },
    bgColorBlock: {
        padding: 25,
        borderRadius: 5,
        marginVertical: 0,
        borderWidth: 1.5,
        borderColor: 'orange',
    },
    headingText: {
        fontFamily: 'Lato-Bold',
        fontSize: 24,
    },
    subheadingText: {
    fontFamily: 'Lato-Medium',
    fontSize: 22,
    },
    sectionText: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 20,
    letterSpacing: 1.2,
    },
    boldText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    },
});
export default MathContentHandler;
