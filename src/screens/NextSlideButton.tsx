import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';

interface NextSlideButtonProps {
    onPress: () => void;
    isActive: boolean;
    style?: StyleProp<ViewStyle>;
    label?: string;
}

const NextSlideButton: React.FC<NextSlideButtonProps> = ({ onPress, isActive, style, label = 'Weiter' }) => {
    const { theme, isDarkMode } = useTheme(); 
    return (
<TouchableOpacity
    onPress={onPress}
    style={[
        styles.button,
        isActive
            ? { backgroundColor: isDarkMode ? '#556B2F' : '#343A40' } // Subtle greenish active color
            : { backgroundColor: isDarkMode ? '#444444' : 'gray' }, // Muted inactive color
        style,
    ]}
    disabled={!isActive}
>
    <Text style={[styles.text, { color: isDarkMode ? '#E0E0E0' : 'white' }]}>{label}</Text>
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
        backgroundColor: '#343A40',
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

export default NextSlideButton;

