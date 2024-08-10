import React from 'react';
import { View, StyleSheet } from 'react-native';
import GenericNode from './GenericNode';

interface GenericRowsProps {
    items: {
        id: number;
        title: string;
        isLocked: boolean;
        isFinished: boolean;
    }[];
    onNodePress: (id: number, title: string) => void;
    color: string;
    finishedColor: string;
}

const GenericRows: React.FC<GenericRowsProps> = ({ items, onNodePress, color, finishedColor }) => {
    console.log('GenericRows items:', items);
    return (
        <View style={styles.container}>
            {items.map(item => (
                <GenericNode
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    isLocked={item.isLocked}
                    isFinished={item.isFinished}
                    onPress={() => onNodePress(item.id, item.title)}
                    color={color}
                    finishedColor={finishedColor} // Pass finishedColor prop
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
});


export default GenericRows;
