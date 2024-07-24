import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const MathTopicScreen: React.FC = () => {
    const handleNodePress = (nodeId: number) => {
        console.log(`Node ${nodeId} pressed`);
    };

    const nodes = [
        { id: 1, title: 'Node 1' },
        { id: 2, title: 'Node 2' },
        { id: 3, title: 'Node 3' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Gleichungen</Text>
            <View style={styles.nodesContainer}>
                {nodes.map(node => (
                    <TouchableOpacity
                        key={node.id}
                        style={styles.node}
                        onPress={() => handleNodePress(node.id)}
                    >
                        <Text style={styles.nodeText}>{node.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
    nodesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    node: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 50,
    },
    nodeText: {
        fontSize: 18,
    },
});

export default MathTopicScreen;