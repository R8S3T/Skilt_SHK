import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { screenWidth, scaleFontSize } from 'src/utils/screenDimensions';

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
        marginHorizontal: screenWidth > 600 ? 15 : 10, // More horizontal space for tablets
        marginVertical: screenWidth > 600 ? 15 : 10,   // More vertical space for tablets
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8fc2c2',
        width: screenWidth > 600 ? '50%' : '60%', // Adjust width for tablets
    },
    optionText: {
        color: '#FFF',
        fontFamily: 'OpenSans-Regular',
        fontSize: screenWidth > 600 ? 24 : 18,
        textAlign: 'center',
    },
});

export default OptionButton;


