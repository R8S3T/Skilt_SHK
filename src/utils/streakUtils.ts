import AsyncStorage from "@react-native-async-storage/async-storage";

const STREAK_KEY = '@user_streak';
const LAST_ACTIVE_DATE_KEY = '@last_active_date';

// Function to get the current streak from AsyncStorage
export const getStreak = async () => {
    try {
        const streak = await AsyncStorage.getItem(STREAK_KEY);
        return streak ? JSON.parse(streak) : 0;
    } catch (error) {
        console.error('Failed to get streak from AsyncStorage', error);
    }
};

// Function to update the streak
export const updateStreak = async () => {
    try {
        const today = new Date().toDateString();
        const lastActiveDate = await AsyncStorage.getItem('lastActiveDate');
        let streak = parseInt(await AsyncStorage.getItem('streak') || '0', 10);

        // Fetch or initialize activeDays array
        const storedActiveDays = await AsyncStorage.getItem('activeDays');
        let activeDays: string[] = storedActiveDays ? JSON.parse(storedActiveDays) : [];

        if (lastActiveDate === new Date(Date.now() - 86400000).toDateString()) {
            streak += 1;
        } else if (lastActiveDate !== today) {
            streak = 1; // Reset streak if the user missed a day or it's the first day
        }

        // Update lastActiveDate
        await AsyncStorage.setItem('lastActiveDate', today);
        // Update streak
        await AsyncStorage.setItem('streak', streak.toString());

        // Update activeDays array
        if (!activeDays.includes(today)) {
            activeDays.push(today);
            // Keep only the last 30 days to limit storage
            if (activeDays.length > 30) {
                activeDays.shift();
            }
            await AsyncStorage.setItem('activeDays', JSON.stringify(activeDays));
        }

        return streak;
    } catch (error) {
        console.error('Error updating streak:', error);
        return 0;
    }
};