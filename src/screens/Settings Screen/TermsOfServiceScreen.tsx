import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const TermsOfServiceScreen = () => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={[styles.title, { color: theme.primaryText }]}>Nutzungsbedingungen</Text>
                <Text style={[styles.text, { color: theme.secondaryText }]}>
                    Hier stehen die vollständigen Nutzungsbedingungen...
                </Text>
                {/* Weitere Inhalte hinzufügen */}
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
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default TermsOfServiceScreen;
