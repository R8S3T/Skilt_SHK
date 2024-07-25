import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GenericRows from '../GenericRows'; // Adjust the path if necessary

const MathTopicScreen: React.FC = () => {
    const handleNodePress = (nodeId: number, title: string) => {
        console.log(`Node ${nodeId} pressed: ${title}`);
    };

    const nodes = [
        { id: 1, title: 'Node 1', isLocked: false, isFinished: true },
        { id: 2, title: 'Node 2', isLocked: false, isFinished: false },
        { id: 3, title: 'Node 3', isLocked: false, isFinished: false },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Gleichungen</Text>
            <View style={styles.separator} />
            <GenericRows items={nodes} onNodePress={handleNodePress} color="#FF5733" finishedColor="#32CD32" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
    },
});

export default MathTopicScreen;

