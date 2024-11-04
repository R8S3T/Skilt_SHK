// SettingsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { isDarkMode, toggleDarkMode, theme, fontSize, setFontSize } = useTheme();

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
            console.log("Name saved:", name);
        } catch (error) {
            console.error("Failed to save the name:", error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { fontSize: fontSize + 12, color: theme.primaryText }]}>Settings</Text>

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
                    <Text style={[styles.name, { fontSize, color: theme.primaryText }]}>{name}</Text>
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

            <View style={styles.option}>
                <Text style={[styles.label, { color: theme.primaryText }]}>Font Size</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={14}
                    maximumValue={24}
                    value={fontSize}
                    onValueChange={setFontSize}
                />
                <Text style={[styles.fontSizeLabel, { color: theme.primaryText }]}>{Math.round(fontSize)} pt</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    section: { marginBottom: 20, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, borderWidth: 1 },
    label: { fontSize: 16, marginBottom: 5 },
    name: { fontSize: 18 },
    input: { fontSize: 18, paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderRadius: 8 },
    button: { marginTop: 20, alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
    editButton: { backgroundColor: '#4CAF50' },
    saveButton: { backgroundColor: '#2196F3' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
    slider: { flex: 1, marginHorizontal: 10 },
    fontSizeLabel: { fontSize: 16 },
});

export default SettingsScreen;



