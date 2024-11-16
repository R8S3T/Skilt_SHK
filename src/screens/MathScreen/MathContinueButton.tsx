import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ContinueButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    style?: any;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ label, onPress, disabled = false, style }) => {
    return (
        <TouchableOpacity
            style={[styles.button, style, disabled ? styles.disabledButton : styles.activeButton]} // Apply styles and handle disabled state
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#000000',
        height: 40,
    },
    activeButton: {
        backgroundColor: '#000000',
    },
    disabledButton: {
        backgroundColor: 'grey',
        
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ContinueButton;

