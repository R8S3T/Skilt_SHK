import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'src/context/ThemeContext';
import LearnTracker from './LearnTracker';
import StatsDetails from './StatsDetails';
import { Ionicons } from '@expo/vector-icons';
import { useSubchapter } from 'src/context/SubchapterContext';

const StatisticsScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { getFinishedSubchaptersToday } = useSubchapter();
    const [finishedToday, setFinishedToday] = useState<number>(0);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Lernerfolge' });
    }, [navigation]);

    useEffect(() => {
        const fetchData = async () => {
            const count = await getFinishedSubchaptersToday();
            setFinishedToday(count);
        };
        fetchData();
    }, []);

    const toggleSection = (section: string) => {
        setSelectedSection(selectedSection === section ? null : section);
    };

    // Define separate stats for "Heute" and "Insgesamt"
    const statsHeute = [
        { label: 'Abgeschlossene Unterkapitel', value: finishedToday, icon: 'book' as keyof typeof Ionicons.glyphMap, color: '#4A90E2' },
        { label: 'Quizzes gelöst', value: 2, icon: 'checkbox' as keyof typeof Ionicons.glyphMap, color: '#50C878' },
        { label: 'Gewusste Lernkarten', value: 5, icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap, color: '#FFD700' },
        { label: 'Wiederholte Lernkarten', value: 8, icon: 'refresh' as keyof typeof Ionicons.glyphMap, color: '#FF6347' },
    ];

    const statsInsgesamt = [
        { label: 'Abgeschlossene Unterkapitel', value: 50, icon: 'book' as keyof typeof Ionicons.glyphMap, color: '#4A90E2' },
        { label: 'Quizzes gelöst', value: 20, icon: 'checkbox' as keyof typeof Ionicons.glyphMap, color: '#50C878' },
        { label: 'Gewusste Lernkarten', value: 100, icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap, color: '#FFD700' },
        { label: 'Wiederholte Lernkarten', value: 40, icon: 'refresh' as keyof typeof Ionicons.glyphMap, color: '#FF6347' },
        { label: 'Abgeschlossene Kapitel', value: 10, icon: 'layers-outline' as keyof typeof Ionicons.glyphMap, color: '#8A2BE2' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Streak Tracker */}
            <LearnTracker />

            {/* Clickable Sections */}
            {[
                { title: "Heute", color: "#5e87b8", stats: statsHeute },
                { title: "Insgesamt", color: "#2b4353", stats: statsInsgesamt }
            ].map(({ title, color, stats }) => (
                <View key={title} style={[styles.sectionContainer, { backgroundColor: color }]}>
                    <TouchableOpacity onPress={() => toggleSection(title)} style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: '#ffffff' }]}>{title}</Text>
                    </TouchableOpacity>

                    {selectedSection === title && (
                        <StatsDetails title={`Statistik für ${title}`} stats={stats} />
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    sectionContainer: {
        width: '90%',
        borderRadius: 15,
        marginVertical: 10,
        overflow: 'hidden',
    },
    sectionHeader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    statsDetails: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    statsText: {
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 2,
    },
});

export default StatisticsScreen;
