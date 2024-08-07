import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

interface ControlButtonsProps {
    onClear: () => void;
    onSubmit: () => void;
    onContinue: () => void;
    showBackspaceButton: boolean;
    submitButtonText?: string;
    disabled: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
    onClear,
    onSubmit,
    onContinue,
    showBackspaceButton = true,
    submitButtonText = "Bestätigen",
    disabled
}) => {
    return (
        <View style={styles.buttonContainer}>
            {showBackspaceButton && (
                <TouchableOpacity onPress={onClear}>
                    <Image
                        source={require('../../../assets/Images/backspace.png')} 
                        style={styles.backspaceIcon}
                    />
                </TouchableOpacity>
            )}
            <TouchableOpacity 
                style={[styles.submitButton, disabled && styles.disabledButton]} 
                onPress={submitButtonText === 'Weiter' ? onContinue : onSubmit}
                disabled={disabled}
            >
                <Text style={styles.submitButtonText}>{submitButtonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 50,
    },
    backspaceIcon: {
        width: 30,
        height: 30,
        margin: 10,
        marginRight: 50,
        tintColor: '#e8630a',
    },
    submitButton: {
        backgroundColor: '#2b4353',
        borderWidth: 1,
        borderColor: '#e8630a',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: '#d3d3d3',
        borderColor: '#a9a9a9'
    },
});

export default ControlButtons;

