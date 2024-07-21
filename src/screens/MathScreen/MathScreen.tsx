import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageSourcePropType } from 'react-native';
import { scaleFontSize } from "src/utils/screenDimensions";
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnStackParamList } from 'src/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

interface MathTopic {
    key: string;
    label: string;
    icon: ImageSourcePropType;
}

const data: MathTopic[] = [
    { key: 'equations', label: 'Gleichungen', icon: require('../../../assets/Images/math_scales.png') },
    { key: 'measurements', label: 'Maße', icon: require('../../../assets/Images/math_measurements.png') },
    { key: 'fraction', label: 'Bruchrechnung', icon: require('../../../assets/Images/math_fraction.png') },
    { key: 'geometry', label: 'Geometrie', icon: require('../../../assets/Images/math_geometry.png') },
    { key: 'formulas', label: 'Formelberechnung', icon: require('../../../assets/Images/math_formula.png') },
];

type MathScreenNavigationProp = StackNavigationProp<LearnStackParamList, 'MathScreen'>;

const MathScreen: React.FC = () => {
    const navigation = useNavigation<MathScreenNavigationProp>();

    const renderItem = ({ item }: { item: MathTopic }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('MathTopicContentScreen', { topicId: data.indexOf(item) + 1, topicName: item.label })}
        >
            <Image source={item.icon} style={styles.iconStyle}/>
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Fachmathematik</Text>
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

