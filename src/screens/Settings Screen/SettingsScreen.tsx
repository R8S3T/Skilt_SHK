import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';
import { screenWidth } from 'src/utils/screenDimensions';

const SettingsScreen = () => {
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { isDarkMode, toggleDarkMode, theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: theme.background,
            },
            headerTitle: 'Einstellungen',
            headerTintColor: theme.primaryText,
        });
    }, [navigation, theme]);

    useEffect(() => {
        const loadName = async () => {
            try {
                const savedName = await AsyncStorage.getItem('userName');
                if (savedName) setName(savedName);
            } catch (error) {
            }
        };
        loadName();
    }, []);

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('userName', name);
            setIsEditing(false);
        } catch (error) {
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
                </View>

                <View style={[styles.section, { backgroundColor: isDarkMode ? theme.background : 'transparent' }]}>
                    <View style={styles.row}>
                        {isEditing ? (

                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: isDarkMode ? theme.surface : '#fff',
                                        color: theme.primaryText,
                                        borderColor: theme.border,
                                    },
                                ]}
                                value={name}
                                onChangeText={setName}
                                placeholder="Namen festlegen"
                                placeholderTextColor={isDarkMode ? '#ccc' : '#aaa'}
                            />
                        ) : (
                        <Text
                            style={[
                                styles.name,
                                {
                                    color: theme.primaryText,
                                    fontSize: screenWidth > 600 ? 22 : 20,
                                },
                            ]}
                        >
                            {name || 'Wie heißt du?'}
                        </Text>
                        )}
                        <TouchableOpacity
                            style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
                            onPress={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            <Text style={styles.buttonText}>{isEditing ? 'Speichern' : 'Ändern'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Divider Line */}
                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                {/* Dark Mode Toggle */}
                <View style={[styles.section, { backgroundColor: isDarkMode ? theme.background : 'transparent' }]}>
                    <View style={styles.row}>
                        <Text style={[styles.label, { color: theme.primaryText }]}>Dark Mode</Text>
                        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
                    </View>
                </View>

                {/* Divider Line */}
                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                {/* Privacy Policy Button */}
                <TouchableOpacity
                    style={[styles.section, { backgroundColor: isDarkMode ? theme.background : 'transparent' }]}
                    onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                >
                    <Text style={[styles.label, { color: theme.primaryText }]}>Datenschutzerklärung</Text>
                </TouchableOpacity>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    <TouchableOpacity
                        style={[styles.section, { backgroundColor: isDarkMode ? theme.background : 'transparent' }]}
                        onPress={() => navigation.navigate('TermsOfServiceScreen')}
                    >
                        <Text style={[styles.label, { color: theme.primaryText }]}>Nutzungsbedingungen</Text>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                        <Text style={{ color: theme.secondaryText, fontSize: 16 }}>Version: Closed Test v01</Text>
                    </View>
                </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: screenWidth > 600 ? 40 : 20,
        paddingVertical: screenWidth > 600 ? 30 : 24,
    },
    headerContainer: {
        paddingVertical: screenWidth > 600 ? 30 : 20,
        alignItems: 'center',
        marginBottom: screenWidth > 600 ? 32 : 24,
    },
    
    headerText: {
        fontFamily: 'Lato-Bold',
        fontSize: screenWidth > 600 ? 24 : 20,
    },
    section: {
        paddingVertical: screenWidth > 600 ? 20 : 16,
        paddingHorizontal: screenWidth > 600 ? 24 : 20,
        backgroundColor: '#fff',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: screenWidth > 600 ? 22 : 18,
        color: '#333', 
    },
    input: {
        fontSize: screenWidth > 600 ? 22 : 20,
        paddingVertical: screenWidth > 600 ? 10 : 6,
        paddingHorizontal: screenWidth > 600 ? 16 : 12,
        borderWidth: 1,
        borderRadius: 8,
        flex: 1,
    },
    buttonContainer: {
        paddingVertical: screenWidth > 600 ? 16 : 14,
        paddingHorizontal: screenWidth > 600 ? 26 : 20,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: '#007BFF', // A vibrant blue to grab attention
    },
    button: {
        paddingVertical: screenWidth > 600 ? 12 : 10,
        paddingHorizontal: screenWidth > 600 ? 20 : 16,
        borderRadius: 8,
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#FFA500',
    },
    buttonText: {
        color: '#fff',
        fontSize: screenWidth > 600 ? 20 : 18,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 20,
    },
    label: {
        fontSize: screenWidth > 600 ? 22 : 20,
        fontWeight: '600',
    },
});

export default SettingsScreen;
