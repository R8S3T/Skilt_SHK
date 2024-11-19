import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ContinueButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    style?: any;
    isDarkMode?: boolean;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ label, onPress, disabled = false, style, isDarkMode }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled
                    ? { backgroundColor: isDarkMode ? '#555555' : 'grey' }
                    : styles.activeButton,
                style,
            ]}
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
        height: 40,
    },
    activeButton: {
        backgroundColor: '#5f6769',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ContinueButton;
