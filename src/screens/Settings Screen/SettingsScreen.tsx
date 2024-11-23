import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';
import { scaleFontSize } from 'src/utils/screenDimensions';

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
            headerTitle: '',
            headerTintColor: theme.primaryText,
        });
    }, [navigation, theme]);

    useEffect(() => {
        const loadName = async () => {
            try {
                const savedName = await AsyncStorage.getItem('userName');
                if (savedName) setName(savedName);
            } catch (error) {
                console.error('Failed to load the name:', error);
            }
        };
        loadName();
    }, []);

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('userName', name);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to save the name:', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Separate Header Container */}
                <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
                    <Text style={[styles.headerText, { color: theme.primaryText }]}>Einstellungen</Text>
                </View>

                {/* Name Change Section */}
                <View style={[styles.section, { backgroundColor: isDarkMode ? theme.background : 'transparent' }]}>
                    <View style={styles.row}>
                        {isEditing ? (
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: isDarkMode ? theme.surface : 'transparent',
                                        color: theme.primaryText,
                                        borderColor: theme.border,
                                    },
                                ]}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor={isDarkMode ? '#ccc' : '#aaa'}
                            />
                        ) : (
                            <Text style={[styles.name, { color: theme.primaryText }]}>{name}</Text>
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

        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    headerContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 24,
    },
    headerText: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(16),
    },
    section: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Place text and input/button in one row
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    name: {
        fontSize: 16,
        color: '#333', // Dynamically overridden by theme.primaryText
    },
    input: {
        fontSize: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
        flex: 1, // Ensure it adjusts dynamically in the row
    },
    buttonContainer: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: '#cccccc',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#FFA500',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc', // Dynamically overridden by theme.border
        marginHorizontal: 20,
    },
});

export default SettingsScreen;
