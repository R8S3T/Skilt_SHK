import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image, Dimensions, ImageSourcePropType } from 'react-native';
import Zoom from 'react-native-zoom-reanimated';
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';

const deviceWidth = Dimensions.get('window').width;

const ZoomableImage: React.FC<{ source: ImageSourcePropType; style?: any }> = ({ source, style }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Touchable Image to Open Modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={source} style={style} resizeMode="contain" />
      </TouchableOpacity>

      {/* Modal for Focused Zoom */}
      <Modal visible={isModalVisible} transparent={false} onRequestClose={() => setModalVisible(false)}>
        <GestureHandlerRootView style={styles.modalContainer}>
          <Zoom style={styles.zoomContainer}>
            <Image
              source={source}
              resizeMode="contain"
              style={{
                width: deviceWidth,
                height: deviceWidth * 0.75, // Adjust to maintain aspect ratio
              }}
            />
          </Zoom>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

// Wrap the component with gestureHandlerRootHOC before exporting
export default gestureHandlerRootHOC(ZoomableImage);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
