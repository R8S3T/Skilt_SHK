import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStreakData, updateStreak } from 'src/utils/streakUtils';

const LearnTracker = () => {
    const [firstActiveDay, setFirstActiveDay] = useState<string | null>(null);
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
    
            // Find the earliest recorded active day
            if (activeDays.length > 0) {
                setFirstActiveDay(activeDays[0]); 
            }
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

                const isActive = activeDays.includes(dateString);
                const isPastDay = date < new Date() && !isActive; // Missed day

                // Ensure "X" is only shown for days *after* the first tracked day
                const showMissedX = isPastDay && firstActiveDay && new Date(dateString) >= new Date(firstActiveDay);

                return (
                    <View key={index} style={styles.dayContainer}>
                        {/* Weekday Label */}
                        <Text style={[styles.dayText, { color: isActive ? '#333' : '#aaa' }]}>
                            {day}
                        </Text>

                        {/* Day Box with Conditional Icons */}
                        <View
                            style={[
                                styles.dayBox,
                                {
                                    backgroundColor: 'transparent', // No fill color
                                    borderWidth: 2,
                                    borderColor: isActive ? '#FFA500' : '#E0E0E0', // Orange for active, gray for others
                                },
                            ]}
                        >
                            {isActive ? (
                                <Ionicons name="flame" size={18} color="#FFA500" />
                            ) : showMissedX ? (
                                <Ionicons name="close" size={18} color="#aaa" /> // Gray "X" only for missed days after first use
                            ) : null}
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
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        marginLeft: 5,
        marginBottom: 10,
    },
    subText: {
        fontSize: 20,
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
        marginTop: 6,
    },
    dayText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    futureDay: {
        width: 18,
        height: 18,
        borderRadius: 5,
        backgroundColor: '#D3D3D3',
    },
    streakInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    streakBlock: {
        alignItems: 'center',
    },
    streakRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    icon: {
        marginRight: 8,
    },
    streakText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
    },
    streakNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 6,
    },
});

export default LearnTracker;
