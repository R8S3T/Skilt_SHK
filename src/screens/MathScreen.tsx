import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageSourcePropType } from 'react-native';
import { scaleFontSize } from "src/utils/screenDimensions";

interface MathTopic {
    key: string;
    label: string;
    icon: ImageSourcePropType;
}

const data: MathTopic[] = [
    { key: 'equations', label: 'Gleichungen', icon: require('../../assets/Images/math_scales.png') },
    { key: 'measurements', label: 'Maße', icon: require('../../assets/Images/math_measurements.png') },
    { key: 'fraction', label: 'Bruchrechnung', icon: require('../../assets/Images/math_fraction.png') },
    { key: 'geometry', label: 'Geometrie', icon: require('../../assets/Images/math_geometry.png') },
    { key: 'formulas', label: 'Formelberechnung', icon: require('../../assets/Images/math_formula.png') },
];

const MathScreen: React.FC = () => {
    const renderItem = ({ item }: { item: MathTopic }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => console.log(`key: ${item.key} pressed`)}
        >
            <Image source={item.icon} style={styles.iconStyle}/>
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mathe Grundkurs</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: scaleFontSize(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    iconStyle: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
    itemText: {
        fontSize: scaleFontSize(18),
    },
});

export default MathScreen;