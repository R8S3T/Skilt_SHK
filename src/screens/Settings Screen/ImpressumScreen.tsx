import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const ImpressumScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Einstellungen',
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.primaryText,
            headerTitleStyle: {
                marginLeft: -10,
                fontWeight: 'normal',
            },
        });
    }, [navigation, theme]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Sticky Header */}
            <Text style={[styles.stickyHeader, { color: theme.primaryText, backgroundColor: theme.surface }]}>
                Impressum
            </Text>

            {/* Content ScrollView */}
            <ScrollView style={styles.scrollView}>
                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Betreiber</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Skilt wird von Calisma betrieben.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Verantwortlich für den Inhalt</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Rebecca Stelter{'\n'}
                    Wattstr. 8{'\n'}
                    12459 Berlin{'\n'}
                    Kontakt: info@skilt.app
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Technische Zeichnungen</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Die technischen Zeichnungen stammen von Florian Broschart.{'\n'}
                    Kontakt: broschart.florian@gmail.com
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 12,
        paddingHorizontal: 20,
        textAlign: 'center',
        elevation: 3,
        zIndex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 24,
        marginBottom: 8,
        textAlign: 'left',
        letterSpacing: 0.4,
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'left',
        marginBottom: 20,
    },
});

export default ImpressumScreen;
