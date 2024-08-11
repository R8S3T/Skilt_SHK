import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface NextButtonProps {
    onPress: () => void;
    isActive: boolean;
    style?: StyleProp<ViewStyle>;
    label?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress, isActive, style, label = 'Weiter' }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, isActive ? styles.active : styles.inactive, style]}
            disabled={!isActive}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        minWidth: 100,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 20,
    },
    active: {
        backgroundColor: '#ff8f00',
    },
    inactive: {
        backgroundColor: 'gray',
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default NextButton;

