import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import SubchapterRows from './SubchapterRows';

const SubchaptersScreen: React.FC = () => {
    // Dummy data for layout purposes
    const subchapters = [
        { id: 1, title: "Subchapter 1", isLocked: false },
        { id: 2, title: "Subchapter 2", isLocked: true },
        { id: 3, title: "Subchapter 3", isLocked: false },
        { id: 4, title: "Subchapter 4", isLocked: false },
    ];

    return (
        <ScrollView style={styles.screenContainer}>
            <Text style={styles.heading}>Subchapters</Text>
            <View style={styles.separator} />
            <SubchapterRows subchapters={subchapters} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        marginTop: 25,
        color: '#2b4353',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#2b4353',
        marginVertical: 5,
    },
});

export default SubchaptersScreen;
