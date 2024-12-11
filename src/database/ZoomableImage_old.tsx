import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image, Dimensions, ImageSourcePropType, Text } from 'react-native';
import Zoom from 'react-native-zoom-reanimated';

const deviceWidth = Dimensions.get('window').width;

const ZoomableImage: React.FC<{ source: ImageSourcePropType; style?: any }> = ({ source, style }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Touchable Image to Open Modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.touchableContainer}>
        <Image source={source} style={[style, styles.zoomableImage]} resizeMode="contain" />
      </TouchableOpacity>

      {/* Modal for Focused Zoom */}
      <Modal visible={isModalVisible} transparent={false} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Zoom>
            <Image
              source={source}
              resizeMode="contain"
              style={{
                width: deviceWidth,
                height: deviceWidth * 0.75, // Adjust to maintain aspect ratio
              }}
            />
          </Zoom>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    borderWidth: 1,
    borderColor: '#d3d3d3', // Subtle border color to indicate zoomable
    borderRadius: 8,
    padding: 5,
  },
  zoomableImage: {
    opacity: 0.9, // Slight opacity to indicate interactivity
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#888', // Darker color for the close button
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ZoomableImage;
