import React from "react";
import { View, Image, StyleSheet, Text } from 'react-native';

const LearnTracker = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}></Text>
            <Image
                source={require('../../../assets/Images/streak_tracker.jpg')}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff', // You can adjust the background color
        borderRadius: 10, // Optional: if you want rounded corners
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 380,
        height: 100,
        marginLeft: 15,
    }
});

export default LearnTracker;