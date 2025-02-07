import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStreakData, updateStreak } from 'src/utils/streakUtils';

const LearnTracker = () => {
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [activeDays, setActiveDays] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await updateStreak();
            const { streak, longestStreak, activeDays } = await getStreakData();
            setStreak(streak);
            setLongestStreak(longestStreak);
            setActiveDays(activeDays);
        };

        fetchData();
    }, []);

    const days = ['S', 'M', 'D', 'M', 'D', 'F', 'S'];
    const todayIndex = new Date().getDay();

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>Lernstrecke</Text>
                </View>
            </View>

            {/* Weekly Streak Visualization */}
            <View style={styles.weekContainer}>
                {days.map((day, index) => {

                    const date = new Date();
                    date.setDate(date.getDate() - (todayIndex - index));
                    const dateString = date.toDateString();

                    return (
                        <View key={index} style={styles.dayContainer}>
                            {/* Weekday Label */}
                            <Text style={[styles.dayText, { color: activeDays.includes(dateString) ? '#333' : '#aaa' }]}>
                                {day}
                            </Text>

                            {/* Day Box with Flame Inside */}
                            <View
                                style={[
                                    styles.dayBox,
                                    {
                                        backgroundColor: activeDays.includes(dateString) ? '#FFA500' : '#E0E0E0',
                                    },
                                ]}
                            >
                                {activeDays.includes(dateString) ? (
                                    <Ionicons name="flame" size={18} color="white" />
                                ) : (
                                    <View style={styles.futureDay} />
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Streak Data */}
            <View style={styles.streakInfo}>
                <View style={styles.streakBlock}>
                    <Text style={styles.streakText}>Aktuelle Strecke</Text>
                    <View style={styles.streakRow}>
                        <Ionicons name="flame" size={20} color="#FFA500" />
                        <Text style={styles.streakNumber}>
                            {streak} {streak === 1 ? 'Tag' : 'Tage'}
                        </Text>
                    </View>
                </View>
                <View style={styles.streakBlock}>
                    <Text style={styles.streakText}>Längste Strecke</Text>
                    <View style={styles.streakRow}>
                        <Ionicons name="trophy-outline" size={20} color="#5e87b8" />
                        <Text style={styles.streakNumber}>
                            {longestStreak} {longestStreak === 1 ? 'Tag' : 'Tage'}
                        </Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        padding: 15,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    subText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5, // Space between days
    },
    dayBox: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    futureDay: {
        width: 18,
        height: 18,
        borderRadius: 5,
        backgroundColor: '#D3D3D3', // Light grey for future days
    },
    streakInfo: {
        flexDirection: 'row', // Aligns both blocks in a row
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    streakBlock: {
        alignItems: 'center',
    },
    streakRow: {
        flexDirection: 'row', // Ensures icon and number are side by side
        alignItems: 'center', // Centers them vertically
        marginTop: 4,
    },
    icon: {
        marginRight: 8, // Adds spacing between icon and text
    },
    streakText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    streakNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 6, // Adds space between icon and number
    },
});

export default LearnTracker;
