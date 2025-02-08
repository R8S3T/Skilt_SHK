import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'src/context/ThemeContext';
import LearnTracker from './LearnTracker';
import { useSubchapter } from 'src/context/SubchapterContext';

const StatisticsScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { getFinishedSubchaptersToday } = useSubchapter();
    
    const [finishedToday, setFinishedToday] = useState<number>(0);
    const [quizzesToday, setQuizzesToday] = useState<number>(2); // Placeholder
    const [totalSubchapters, setTotalSubchapters] = useState<number>(50); // Placeholder

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

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Streak Tracker */}
            <LearnTracker />

            {/* Spacing Between Tracker & Stats */}
            <View style={{ height: 50 }} />

            {/* Statistics Container with Left-Aligned Content and Bigger Icons */}
            <View style={[styles.statsContainer, { borderColor: theme.border }]}>
                {/* Header with Icon */}
                <View style={styles.headerRow}>
                    <Text style={styles.statsHeader}>Heute hast du bereits</Text>
                </View>

                {/* Statistic Summary (Stacked & Left-Aligned) */}
                <View style={styles.statItem}>
                    <Ionicons name="book-outline" size={34} color="#4A90E2" />
                    <Text style={styles.statsText}>
                        <Text style={styles.boldText}>{finishedToday}</Text> gelernt
                    </Text>
                </View>

                <View style={styles.statItem}>
                    <Ionicons name="checkbox-outline" size={34} color="#50C878" />
                    <Text style={styles.statsText}>
                        <Text style={styles.boldText}>{quizzesToday}</Text> gelöst
                    </Text>
                </View>

                {/* Thin Separator */}
                <View style={styles.separator} />

                {/* Overall Statistics with Icon */}
                <View style={styles.footerRow}>
                    <Ionicons name="library-outline" size={34} color="#FFD700" />
                    <Text style={styles.statsFooter}>
                        Unterkapitel insgesamt – <Text style={styles.boldText}>{totalSubchapters}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    statsContainer: {
        width: '90%',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 12, // Rounded corners
        borderWidth: 1, // Subtle border
        alignItems: 'flex-start', // Align everything to the left
        borderColor: '#ccc', // Light grey border
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // Space between icon and text
        marginBottom: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14, // More space between icon and text
        marginBottom: 12, // Increased spacing
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statsHeader: {
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        color: '#333',
    },
    statsText: {
        fontSize: 22,
        color: '#000',
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 15,
    },
    statsFooter: {
        fontSize: 20,
        color: '#555',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000',
    },
});

export default StatisticsScreen;
