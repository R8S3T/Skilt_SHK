import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChaptersScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Chapters</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChaptersScreen;