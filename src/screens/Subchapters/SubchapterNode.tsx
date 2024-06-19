import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

interface SubchapterNodeProps {
    id: number;
    isLocked: boolean;
    title: string;
}

const SubchapterNode: React.FC<SubchapterNodeProps> = ({
    id,
    isLocked,
    title,
}) => {
    const iconSource = isLocked
        ? require('../../../assets/Images/lock_icon.png')
        : require('../../../assets/Images/play_icon.png');

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => console.log(`${title} pressed`)} disabled={isLocked} style={styles.button}>
                <Image source={iconSource} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 40,
        borderWidth: 2.5,
        borderColor: '#FFA500',
        backgroundColor: '#FFFFFF',
    },
    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    icon: {
        width: 40,
        height: 40,
    },
});

export default SubchapterNode;