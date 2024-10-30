import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDynamicIconSize } from 'src/utils/screenDimensions';

interface GenericNodeProps {
    id: number;
    isLocked: boolean;
    isFinished: boolean;
    onPress: () => void;
    title: string;
    color: string;
    finishedColor: string;
}

const GenericNode: React.FC<GenericNodeProps> = ({
    isLocked,
    isFinished,
    onPress,
    title,
    color,
    finishedColor,
    id
}) => {
    const dynamicNodeSize = getDynamicIconSize(70, 90);
    const dynamicIconSize = getDynamicIconSize(40, 50);

    const iconSource = isLocked
        ? require('../../assets/Images/lock_icon.png')
        : isFinished
            ? require('../../assets/Images/ok_icon.png')
            : require('../../assets/Images/play_icon.png');

    const dynamicStyles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginVertical: 5,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: isLocked ? '#A9A9A9' : isFinished ? finishedColor : '#A9A9A9',
            backgroundColor: isLocked ? '#f0f0f0' : '#FFFFFF',  // Different background for locked state
            paddingVertical: 8,
            paddingHorizontal: 15,
        },
        iconContainer: {
            width: dynamicNodeSize,
            height: dynamicNodeSize,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginRight: 15, // Reduced space between the icon and text
        },
        icon: {
            width: dynamicIconSize,
            height: dynamicIconSize,
            tintColor: isLocked ? '#A9A9A9' : isFinished ? finishedColor : '#A9A9A9',
        },
        text: {
            flex: 1,
            fontSize: 15, // Adjust font size for compact layout
            color: isLocked ? '#A9A9A9' : '#000000',  // Text color based on lock status
        },
    });

    return (
        <TouchableOpacity 
            onPress={onPress}  // Allow press even when locked
            style={dynamicStyles.container} 
        >
            <View style={dynamicStyles.iconContainer}>
                <Image source={iconSource} style={dynamicStyles.icon} resizeMode="contain" />
            </View>
            <Text style={dynamicStyles.text}>{title}</Text>
        </TouchableOpacity>
    );
};



export default GenericNode;

