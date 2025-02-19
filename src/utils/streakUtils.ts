import AsyncStorage from "@react-native-async-storage/async-storage";

const STREAK_KEY = '@user_streak';
const LAST_ACTIVE_DATE_KEY = '@last_active_date';
const ACTIVE_DAYS_KEY = '@active_days';

// Function to get the current and longest streak
export const getStreakData = async () => {
    try {
        const streak = parseInt(await AsyncStorage.getItem(STREAK_KEY) || '0', 10);
        const longestStreak = parseInt(await AsyncStorage.getItem('@longest_streak') || '0', 10);
        const storedActiveDays = await AsyncStorage.getItem(ACTIVE_DAYS_KEY);
        const activeDays = storedActiveDays ? JSON.parse(storedActiveDays) : [];
        return { streak, longestStreak, activeDays };
    } catch (error) {
        return { streak: 0, longestStreak: 0, activeDays: [] };
    }
};

// Function to update the streak based on user activity
export const updateStreak = async () => {
    try {
        const today = new Date().toDateString();
        const lastActiveDate = await AsyncStorage.getItem(LAST_ACTIVE_DATE_KEY);
        let streak = parseInt(await AsyncStorage.getItem(STREAK_KEY) || '0', 10);
        let longestStreak = parseInt(await AsyncStorage.getItem('@longest_streak') || '0', 10);
        const storedActiveDays = await AsyncStorage.getItem(ACTIVE_DAYS_KEY);
        let activeDays: string[] = storedActiveDays ? JSON.parse(storedActiveDays) : [];

        if (lastActiveDate === new Date(Date.now() - 86400000).toDateString()) {
            streak += 1;
        } else if (lastActiveDate !== today) {
            streak = 1; // Reset streak if a day was missed
        }

        longestStreak = Math.max(longestStreak, streak);

        await AsyncStorage.setItem(LAST_ACTIVE_DATE_KEY, today);
        await AsyncStorage.setItem(STREAK_KEY, streak.toString());
        await AsyncStorage.setItem('@longest_streak', longestStreak.toString());

        // Update active days list (limit to last 30 days)
        if (!activeDays.includes(today)) {
            activeDays.push(today);
            if (activeDays.length > 30) activeDays.shift();
            await AsyncStorage.setItem(ACTIVE_DAYS_KEY, JSON.stringify(activeDays));
        }

        return { streak, longestStreak, activeDays };
    } catch (error) {
        return { streak: 0, longestStreak: 0, activeDays: [] };
    }
};
