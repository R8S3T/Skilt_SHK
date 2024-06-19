import React from "react";
import { View, StyleSheet } from "react-native";
import SubchapterNode from "./SubchapterNode";

interface Subchapter {
    id: number;
    title: string;
    isLocked: boolean;
}

interface SubchapterRowsProps {
    subchapters: Subchapter[];
}

const SubchapterRows: React.FC<SubchapterRowsProps> = ({ subchapters }) => {
    return (
        <View style={styles.container}>
            {subchapters.map((subchapter) => (
                <SubchapterNode
                    key={subchapter.id}
                    id={subchapter.id}
                    title={subchapter.title}
                    isLocked={subchapter.isLocked}
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

export default SubchapterRows;