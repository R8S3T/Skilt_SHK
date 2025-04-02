import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { screenWidth } from 'src/utils/screenDimensions';

const UpdatesInfoScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        const backIconSize = screenWidth > 600 ? 35 : 28;
        const headerFontSize = screenWidth > 600 ? 24 : 20;
        navigation.setOptions({
            headerTitle: '',
            headerTitleAlign: 'left',
            headerStyle: { 
                backgroundColor: theme.surface,
                elevation: 0,             // Entfernt Schatten auf Android
                shadowColor: 'transparent', // Entfernt Schatten auf iOS
                borderBottomWidth: 0,     // Entfernt die untere Linie auf iOS
            },
            headerTintColor: theme.primaryText,
            headerTitleStyle: {
                marginLeft: -10,
                fontWeight: 'normal',
            },
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={backIconSize}
                        color={theme.primaryText}
                    />
                    <Text
                        style={{
                            color: theme.primaryText,
                            fontSize: headerFontSize,
                            fontWeight: 'normal',
                            marginLeft: 5,
                        }}
                    >
                        Einstellungen
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, theme]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Sticky Header */}
            <Text style={[styles.stickyHeader, { color: theme.primaryText, backgroundColor: theme.surface }]}>
                Updates
            </Text>

            {/* Content ScrollView */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.textBlock}>
                    <Text style={[styles.description, { color: theme.primaryText }]}>
                        Von Zeit zu Zeit nehmen wir kleine Änderungen und Verbesserungen an der App vor.
                    </Text>
                    <Text style={[styles.description, { color: theme.primaryText }]}>
                        Da die App offline funktioniert, informieren wir nicht automatisch über Updates.
                    </Text>
                    <Text style={[styles.description, { color: theme.primaryText }]}>
                        Bitte schaue gelegentlich im App Store nach,
                        ob eine neue Version verfügbar ist.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeader: {
        fontFamily: 'Lato-Bold',
        fontSize: screenWidth > 600 ? 36 : 24,
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
    textBlock: {
        marginVertical: 16,
        paddingHorizontal: 10,
    },
    description: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'left',
        marginBottom: 10,
    },
});

export default UpdatesInfoScreen;
