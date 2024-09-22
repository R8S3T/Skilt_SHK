import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlashCard from './FlashCard';

const FlashCardsOrganised: React.FC = () => {
    return (
        <View style={styles.container}>
            <FlashCard />
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

export default FlashCardsOrganised;

