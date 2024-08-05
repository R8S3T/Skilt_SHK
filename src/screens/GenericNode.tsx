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
    const dynamicNodeSize = getDynamicIconSize(90, 110);
    const dynamicIconSize = getDynamicIconSize(50, 60);

    const iconSource = isLocked
        ? require('../../assets/Images/lock_icon.png')
        : isFinished
            ? require('../../assets/Images/ok_icon.png')
            : require('../../assets/Images/play_icon.png');

    const dynamicStyles = StyleSheet.create({
        container: {
            width: dynamicNodeSize,
            height: dynamicNodeSize,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            borderRadius: 25,
            borderWidth: 2.5,
            borderColor: isLocked ? '#A9A9A9' : isFinished ? finishedColor : '#A9A9A9',
            backgroundColor: isLocked ? 'transparent' : '#FFFFFF',
            marginHorizontal: 26,
        },
        icon: {
            width: dynamicIconSize,
            height: dynamicIconSize,
            tintColor: isLocked ? '#FFFFFF' : isFinished ? finishedColor : '#A9A9A9',
        },
    });

    return (
        <View style={dynamicStyles.container}>
            <TouchableOpacity onPress={onPress} disabled={isLocked} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}>
                {isLocked ? (
                    <LinearGradient
                        colors={['#dcd9d9', '#bfbfbf']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Image source={iconSource} style={dynamicStyles.icon} resizeMode="contain" />
                    </LinearGradient>
                ) : (
                    <>
                        <Image source={iconSource} style={dynamicStyles.icon} />
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GenericNode;

