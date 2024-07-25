import React from "react";
import { View, StyleSheet } from "react-native";
import SubchapterNode from "../../OldFiles/SubchapterNode_old";

interface Subchapter {
    SubchapterId: number;
    SubchapterName: string;
    isLocked: boolean;
    isFinished: boolean;
}

interface SubchapterRowsProps {
    subchapters: Subchapter[];
    onNodePress: (id: number, title: string) => void;
}

const SubchapterRows: React.FC<SubchapterRowsProps> = ({ subchapters, onNodePress }) => {
    return (
        <View style={styles.container}>
            {subchapters.map((subchapter) => (
                <SubchapterNode
                    key={subchapter.SubchapterId}
                    id={subchapter.SubchapterId}
                    title={subchapter.SubchapterName}
                    isLocked={subchapter.isLocked}
                    isFinished={subchapter.isFinished}
                    onPress={() => onNodePress(subchapter.SubchapterId, subchapter.SubchapterName)}
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