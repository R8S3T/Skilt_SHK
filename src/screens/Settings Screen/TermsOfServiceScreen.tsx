import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const TermsOfServiceScreen = () => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Ionicons name="construct-outline" size={60} color={theme.primaryText} style={styles.icon} />
                <Text style={[styles.title, { color: theme.primaryText }]}>Nutzungsbedingungen</Text>
                <Text style={[styles.text, { color: theme.secondaryText }]}>
                    Diese Seite befindet sich noch im Aufbau. Die Nutzungsbedingungen werden in Kürze ergänzt.
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 150,
    },
    icon: {
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
    },
});

export default TermsOfServiceScreen;
