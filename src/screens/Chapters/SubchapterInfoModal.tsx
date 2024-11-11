import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { SubchapterInfoModalProps } from 'src/types/uiTypes';
import { scaleFontSize } from 'src/utils/screenDimensions';

const SubchapterInfoModal: React.FC<SubchapterInfoModalProps> = ({
    visible,
    onClose,
    subchapterName,
    onReviewLesson,
    isJumpAhead = false,
    onJumpAheadConfirm,
    message,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.fullScreen}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.modalView, { opacity }]}>
                            <Text style={styles.subchapterName}>{subchapterName}</Text>
                            <Text style={styles.description}>
                                {message || (isJumpAhead
                                    ? `Möchtest du mit ${subchapterName} weitermachen?`
                                    : 'Du hast diese Lektion abgeschlossen. Möchtest du sie wiederholen?')}
                            </Text>
                            {!message && (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={isJumpAhead ? onJumpAheadConfirm : onReviewLesson}
                                >
                                    <Text style={styles.buttonText}>
                                        {isJumpAhead ? 'Weitermachen' : 'Wiederholen'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};


const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    subchapterName: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        color: '#333',
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(12),
        marginBottom: 15,
        textAlign: 'center',
    },
    subchapterNameHighlight: {
        fontSize: scaleFontSize(14), // Make it slightly larger
        fontWeight: 'bold', // Bold text
        color: '#333', // Optional: color to match the theme
    },
    button: {
        backgroundColor: '#343A40',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SubchapterInfoModal;





