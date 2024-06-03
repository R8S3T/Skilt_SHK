import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YearsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Years</Text>
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

export default YearsScreen;