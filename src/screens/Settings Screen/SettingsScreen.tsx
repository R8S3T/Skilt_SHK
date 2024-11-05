import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes';

const SettingsScreen = () => {
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { isDarkMode, toggleDarkMode, theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const loadName = async () => {
            try {
                const savedName = await AsyncStorage.getItem('userName');
                if (savedName) setName(savedName);
            } catch (error) {
                console.error("Failed to load the name:", error);
            }
        };
        loadName();
    }, []);

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('userName', name);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save the name:", error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { color: theme.primaryText }]}>Einstellungen</Text>

            <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.label, { color: theme.primaryText }]}>Name</Text>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.surface, color: theme.primaryText, borderColor: theme.border }]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor={isDarkMode ? "#ccc" : "#aaa"}
                    />
                ) : (
                    <Text style={[styles.name, { color: theme.primaryText }]}>{name}</Text>
                )}
            </View>

            <TouchableOpacity
                style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
                onPress={isEditing ? handleSave : () => setIsEditing(true)}
            >
                <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Name'}</Text>
            </TouchableOpacity>

            <View style={styles.option}>
                <Text style={[styles.label, { color: theme.primaryText }]}>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            </View>

            <TouchableOpacity
                style={[styles.privacyButton, { backgroundColor: theme.accent }]}
                onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            >
                <Text style={styles.privacyButtonText}>Datenschutzerklärung</Text>
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
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    input: {
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    saveButton: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        paddingVertical: 12,
    },
    privacyButton: {
        marginTop: 30,
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    privacyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default SettingsScreen;