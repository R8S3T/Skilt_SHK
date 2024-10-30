import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OptionButtonProps {
    option: string;
    onSelect: (option: string) => void;
    isSelected: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, onSelect, isSelected }) => {
    return (
        <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect(option)}
            disabled={isSelected}
        >
            <Text style={styles.optionText}>
                {isSelected ? '' : option}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    option: {
        backgroundColor: '#2b4353',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8fc2c2',
        width: '40%',
    },
    optionText: {
        color: '#FFF',
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default OptionButton;


