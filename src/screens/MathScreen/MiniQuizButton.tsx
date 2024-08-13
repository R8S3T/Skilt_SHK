import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface MiniQuizButtonProps {
    label: string;
    onPress: () => void;
    disabled: boolean;
}

const MiniQuizButton: React.FC<MiniQuizButtonProps> = ({ label, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled ? styles.disabledButton : styles.activeButton]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#007BFF',
    },
    disabledButton: {
        backgroundColor: '#ddd',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MiniQuizButton;
