import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { SubchapterInfoModalProps } from 'src/types/uiTypes';

const SubchapterInfoModal: React.FC<SubchapterInfoModalProps> = ({
    visible,
    onClose,
    subchapterName,
    onReviewLesson,
    isJumpAhead = false,
    onJumpAheadConfirm,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 150, // Shorter duration for quicker animation
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 150, // Shorter duration for quicker fade-out
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            animationType="none" // Disable the default slide-up animation
            transparent={true}
            visible={visible}
            onRequestClose={onClose} // Handles hardware back button on Android
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.fullScreen}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.modalView, { opacity }]}>
                            <Text style={styles.subchapterName}>{subchapterName}</Text>
                            <Text style={styles.description}>
                                {isJumpAhead ? 'Do you really want to jump ahead to this subchapter?' : 'You have completed this lesson. Do you want to review it?'}
                            </Text>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={isJumpAhead ? onJumpAheadConfirm : onReviewLesson}
                            >
                                <Text style={styles.buttonText}>
                                    {isJumpAhead ? 'Jump Ahead' : 'Review'}
                                </Text>
                            </TouchableOpacity>
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
        backgroundColor: 'transparent', // Keep background transparent
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
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2196F3',
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





