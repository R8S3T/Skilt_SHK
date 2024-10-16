import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { imageMap } from 'src/utils/imageMappings';
import ImageModal from 'react-native-image-modal';

const deviceWidth = Dimensions.get('window').width;

interface ContentHandlerProps {
  part: string;
}

const ContentHandler: React.FC<ContentHandlerProps> = ({ part }) => {
  // Handle special markers like underline, bgcolor-block, images, etc.

  if (part.startsWith('[frame]') && part.endsWith('[/frame]')) {
    const frameText = part.replace('[frame]', '').replace('[/frame]', '');
    return (
      <View style={styles.frameWithBulb}>
        <Image source={require('assets/Images/info_sign.png')} style={styles.infoSign} />
        <Text style={styles.contentText}>{frameText}</Text>
      </View>
    );
  }

  // Handle bullet point marker
  if (part.startsWith('[bullet]') && part.endsWith('[/bullet]')) {
    const bulletText = part.replace('[bullet]', '').replace('[/bullet]', '');
    return (
      <View style={styles.bulletTextContainer}>
        <Text style={styles.bulletPoint}>○</Text>
        <Text style={styles.bulletText}>{bulletText}</Text>
      </View>
    );
  }

  if (part.startsWith('[LF_')) {
    const imageName = part.replace('[', '').replace(']', '').trim();
    const imageSource = imageMap[imageName as keyof typeof imageMap];
    
    if (imageSource) {
      // Split the marker to check for different tags
      const markers = imageName.split('_').map(marker => marker.toLowerCase());

      let imageStyle = styles.image;
      const isZoomable = markers.includes('zoom');
      const isWelcome = markers.includes('welcome');
      const isSmall = markers.includes('small');
      
      // Apply styles based on markers
      if (isWelcome) {
        imageStyle = styles.welcomeImage;
      } else if (isSmall) {
        imageStyle = styles.smallImage;
      }

      // If image is marked as zoomable, use ImageModal for zoom and modal functionality
      if (isZoomable) {
        console.log("Rendering zoomable image:", imageName);
        return (
          <View style={styles.imageContainer}>
            <ImageModal
              source={imageSource}
              resizeMode="contain"
              overlayBackgroundColor="#d1d8e5"
              style={{
                width: deviceWidth * 0.9,
                height: deviceWidth * 0.75,
                alignSelf: 'center',
              }}
            />
            
            <Image 
              source={require('../../assets/Images/zoom_icon.png')} 
              style={styles.zoomIcon} 
            />
          </View>
        );
      }

      // Default case for non-zoomable images
      return (
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={imageStyle} resizeMode="contain" />
        </View>
      );
    } else {
      console.warn(`Image not found for key: ${imageName}`);
    }
  }

  // Process text formatting (heading, subheading, bold, etc.)
  const processText = (text: string) => {
    const parts = text.split(/(\[bold\].*?\[\/bold\])|(\[heading\].*?\[\/heading\])|(\[subheading\].*?\[\/subheading\])|(\[section\].*?\[\/section\])|(\[bullet\].*?\[\/bullet\])/g);

    return (
      <Text style={styles.contentText}>
        {parts.map((part, index) => {
          if (!part) return null;

          // Handle heading marker
          if (part.startsWith('[heading]') && part.endsWith('[/heading]')) {
            const headingText = part.replace('[heading]', '').replace('[/heading]', '');
            return (
              <Text key={index} style={styles.headingText}>
                {headingText}
              </Text>
            );
          }

          // Handle subheading marker
          if (part.startsWith('[subheading]') && part.endsWith('[/subheading]')) {
            const subheadingText = part.replace('[subheading]', '').replace('[/subheading]', '');
            return (
              <Text key={index} style={styles.subheadingText}>
                {subheadingText}
              </Text>
            );
          }

          // Handle section marker
          if (part.startsWith('[section]') && part.endsWith('[/section]')) {
            const sectionText = part.replace('[section]', '').replace('[/section]', '');
            return (
              <Text key={index} style={styles.sectionText}>
                {sectionText}
              </Text>
            );
          }

          // Handle bold marker
          if (part.startsWith('[bold]') && part.endsWith('[/bold]')) {
            const boldText = part.replace('[bold]', '').replace('[/bold]', '');
            return (
              <Text key={index} style={styles.boldText}>
                {boldText}
              </Text>
            );
          }

          // Default case for regular text
          return part.trim() !== '' ? (
            <Text key={index} style={styles.contentText}>
              {part}
            </Text>
          ) : null;
        })}
      </Text>
    );
  };

  // Return the processed text
  return <>{processText(part)}</>;
};

const styles = StyleSheet.create({
  contentText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    letterSpacing: 0.8,
    marginTop: 5,
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
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
    fontSize: 22,
  },
  sectionText: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 20,
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
    width: 32,
    height: 32,
    position: 'absolute',
    top: 30,
    left: -30,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 0,
  },
  welcomeImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  smallImage: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginVertical: 5,
  },
  zoomContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
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
    fontSize: 18,
    lineHeight: 24,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default ContentHandler;

