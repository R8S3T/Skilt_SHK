import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStreak, updateStreak } from 'src/utils/streakUtils';

const LearnTracker = () => {
    const [streakDates, setStreakDates] = useState<Date[]>([]);
    const [activeDays, setActiveDays] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await updateStreak();
            const storedActiveDays = await AsyncStorage.getItem('activeDays');
            let activeDaysArray = storedActiveDays ? JSON.parse(storedActiveDays) : [];
            setActiveDays(activeDaysArray);

            const dates = [];
            for (let i = 4; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                dates.push(date);
            }
            setStreakDates(dates);
        };

        fetchData();
    }, []);

    const isActive = (date: Date) => {
        const dateString = date.toDateString();
        return activeDays.includes(dateString);
    };

    // Format options for German weekdays
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const formatter = new Intl.DateTimeFormat('de-DE', options);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lern-Tracker</Text>
            <View style={styles.trackerContainer}>
                {streakDates.map((date, index) => (
                    <View key={index} style={styles.flameContainer}>
                        <Image
                            source={
                                isActive(date)
                                    ? require('../../../assets/Images/flame_active.png')
                                    : require('../../../assets/Images/flame_inactive.png')
                            }
                            style={styles.flameIcon}
                        />
                        <Text style={styles.weekdayText}>{formatter.format(date)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    trackerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    flameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        width: 60,
        height: 60,
    },
    flameIcon: {
        width: 30,
        height: 30,
    },
    weekdayText: {
        fontSize: 12,
        marginTop: 3,
        color: '#333',
    },
});

export default LearnTracker;
