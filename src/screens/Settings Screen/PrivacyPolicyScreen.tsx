import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    // Set header title to "Einstellungen" in the navigation options
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
                Datenschutzerklärung
            </Text>

            {/* Content ScrollView */}
            <ScrollView style={styles.scrollView}>
                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>1. Kontakt</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Skilt wird von Calisma betrieben. Bei Fragen zur App oder zum Datenschutz erreichst du uns unter
                    <Text> info@skilt.app</Text>. Weitere Infos findest du auf unserer Website: 
                    <Text> www.skilt.app</Text>.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>2. Lokale Datenspeicherung und Offline-Betrieb</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Deine Fortschritte und Einstellungen werden ausschließlich auf deinem Gerät gespeichert, wodurch die App offline funktioniert. Es erfolgt keine Speicherung oder Verarbeitung deiner Daten auf externen Servern.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>3. Keine Datenerhebung oder Weitergabe</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Skilt erhebt, verarbeitet und übermittelt keinerlei personenbezogene Daten. Es werden keine Tracking- oder Analyse-Tools verwendet, und es erfolgt keine Weitergabe an Dritte.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>4. Verlust der lokalen Daten</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Alle Daten werden nur lokal auf deinem Gerät gespeichert. Sie gehen verloren, wenn du die App deinstallierst oder die App-Daten löschst. In diesem Fall startet die App bei einer erneuten Installation ohne gespeicherte Fortschritte.
                </Text>

                <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>5. App-Updates</Text>
                <Text style={[styles.description, { color: theme.primaryText }]}>
                    Updates für Skilt werden über den Google Play Store bereitgestellt. Diese betreffen ausschließlich die Funktionalität der App und führen nicht zur Erhebung oder Verarbeitung von Daten.
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
        textAlign: 'left',  // Updated to left align
        letterSpacing: 0.4,
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'left',  // Updated to left align
        marginBottom: 20,
    },
});


export default PrivacyPolicyScreen;
