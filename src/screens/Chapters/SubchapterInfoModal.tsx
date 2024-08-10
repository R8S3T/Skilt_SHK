import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SubchapterInfoModalProps } from 'src/types/uiTypes';

const SubchapterInfoModal: React.FC<SubchapterInfoModalProps> = ({
    visible,
    onClose,
    subchapterName,
    onReviewLesson
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.subchapterName}>{subchapterName}</Text>
                    <Text style={styles.description}>
                    Du hast diese Lektion abgeschlossen. Möchtest du sie wiederholen?
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={onReviewLesson}>
                        <Text style={styles.buttonText}>Wiederholen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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

