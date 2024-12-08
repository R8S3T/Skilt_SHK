import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextStyle } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import ImageModal from 'react-native-image-modal';
import { useTheme } from 'src/context/ThemeContext';
import { screenWidth, scaleFontSize } from 'src/utils/screenDimensions';

const deviceWidth = Dimensions.get('window').width;

interface ContentHandlerProps {
  part: string;
}

const ContentHandler: React.FC<ContentHandlerProps> = ({ part }) => {
  const { theme, isDarkMode } = useTheme(); // Access theme and dark mode status

  // Handle special markers like frame, bullet point, images, etc.
  if (part.startsWith('[frame]') && part.endsWith('[/frame]')) {
    const frameText = part.replace('[frame]', '').replace('[/frame]', '');
    return (
      <View style={[styles.frameWithBulb, { backgroundColor: theme.surface }]}>
        <Image source={require('assets/Images/info_sign.png')} style={styles.infoSign} />
        <Text style={[styles.contentText, { color: theme.primaryText }]}>{frameText}</Text>
      </View>
    );
  }

  if (part.startsWith('[bullet]') && part.endsWith('[/bullet]')) {
    const bulletText = part.replace('[bullet]', '').replace('[/bullet]', '');
    return (
      <View style={styles.bulletTextContainer}>
        <Text style={[styles.bulletPoint, { color: theme.primaryText }]}>○</Text>
        <Text style={[styles.bulletText, { color: theme.primaryText }]}>{bulletText}</Text>
      </View>
    );
  }

  if (part.startsWith('[LF_')) {
    const imageName = part.replace('[', '').replace(']', '').trim();
    const imageSource = imageMap[imageName as keyof typeof imageMap];
    
    if (imageSource) {
      const markers = imageName.split('_').map(marker => marker.toLowerCase());
      let imageStyle = styles.image;
      const isZoomable = markers.includes('zoom');
      const isWelcome = markers.includes('welcome');
      const isSmall = markers.includes('small');

      if (isWelcome) {
        imageStyle = styles.welcomeImage;
      } else if (isSmall) {
        imageStyle = styles.smallImage;
      }

      return (
        <View style={[styles.imageContainer, isDarkMode && styles.darkImageContainer]}>
          {isZoomable ? (
            <>
              <ImageModal
                source={imageSource}
                resizeMode="contain"
                overlayBackgroundColor="#c1c1c1"  // Darker grey color for zoomable overlay
                style={{
                  width: deviceWidth * 0.9,
                  height: deviceWidth * 0.75,
                }}
              />
              <Image
                source={require('../../assets/Images/zoom_icon.png')}
                style={[styles.zoomIcon, isDarkMode && { tintColor: '#4d4d4d' }]} // Dark gray in dark mode
              />
            </>
          ) : (
            <Image source={imageSource} style={imageStyle} resizeMode="contain" />
          )}
        </View>
      );
    } else {
      console.warn(`Image not found for key: ${imageName}`);
    }
  }


  const processText = (text: string) => {
    const parts = text.split(/(\[bold\].*?\[\/bold\])|(\[heading\].*?\[\/heading\])|(\[subheading\].*?\[\/subheading\])|(\[section\].*?\[\/section\])/g);

    return (
      <Text style={[styles.contentText, { color: theme.primaryText }]}>
        {parts.map((part, index) => {
          if (!part) return null;

          if (part.startsWith('[heading]') && part.endsWith('[/heading]')) {
            const headingText = part.replace('[heading]', '').replace('[/heading]', '');
            return (
              <Text key={index} style={[styles.headingText, { color: theme.primaryText }]}>
                {headingText}
              </Text>
            );
          }

          if (part.startsWith('[subheading]') && part.endsWith('[/subheading]')) {
            const subheadingText = part.replace('[subheading]', '').replace('[/subheading]', '');
            return (
              <Text key={index} style={[styles.subheadingText, { color: theme.secondaryText }]}>
                {subheadingText}
              </Text>
            );
          }

          if (part.startsWith('[section]') && part.endsWith('[/section]')) {
            const sectionText = part.replace('[section]', '').replace('[/section]', '');
            return (
              <Text key={index} style={[styles.sectionText, { color: theme.primaryText }]}>
                {sectionText}
              </Text>
            );
          }

          if (part.startsWith('[bold]') && part.endsWith('[/bold]')) {
            const boldText = part.replace('[bold]', '').replace('[/bold]', '');
            return (
              <Text key={index} style={[styles.boldText, { color: theme.primaryText }]}>
                {boldText}
              </Text>
            );
          }

          return part.trim() !== '' ? (
            <Text key={index} style={[styles.contentText, { color: theme.primaryText }]}>
              {part}
            </Text>
          ) : null;
        })}
      </Text>
    );
  };

  return <>{processText(part)}</>;
};

const styles = StyleSheet.create({
  contentText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: screenWidth > 600 ? 22 : 19,
    letterSpacing: 0.9,
    marginTop: 5,
  },
  darkImageContainer: {
    backgroundColor: '#c1c1c1',
    paddingHorizontal: 2,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  boldText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: screenWidth > 600 ? 20 : 18,
  },
  headingText: {
    fontFamily: 'Lato-Bold',
    fontSize: screenWidth > 600 ? 28 : 24,
  },
  subheadingText: {
    fontFamily: 'Lato-Medium',
    fontSize: screenWidth > 600 ? 26 : 22,
  },
  sectionText: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: screenWidth > 600 ? 24 : 20,
    letterSpacing: 1.2,
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
    width: screenWidth > 600 ? 48 : 32,
    height: screenWidth > 600 ? 48 : 32,
    position: 'absolute',
    top: screenWidth > 600 ? 40 : 30,
    left: screenWidth > 600 ? -40 : -30,
  },
  image: {
    width: '100%',
    height: screenWidth > 600 ? 250 : 200,
    resizeMode: 'contain',
    marginVertical: 0,
  },
  welcomeImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginVertical: screenWidth > 600 ? 25 : 10,
  },
  smallImage: {
    width: '100%',
    height: screenWidth > 600 ? 120 : 80,
    resizeMode: 'contain',
    marginVertical: screenWidth > 600 ? 10 : 5,
  },
  zoomIcon: {
    position: 'absolute',
    bottom: screenWidth > 600 ? 12 : 8,
    right: screenWidth > 600 ? 12 : 8,
    width: screenWidth > 600 ? 36 : 24,
    height: screenWidth > 600 ? 36 : 24,
  },
  bulletTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 5,
    width: '100%',
  },
  bulletPoint: {
    width: 10,
    fontSize: 18,
    lineHeight: 24,
    marginRight: 10,
    textAlign: 'center',
  },
  bulletText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: screenWidth > 600 ? 20 : 18, // Larger for tablets
    lineHeight: screenWidth > 600 ? 28 : 24,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default ContentHandler;
