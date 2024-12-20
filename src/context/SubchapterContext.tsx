// Creates and provides a context for managing subchapter-related state, such as unlocked and finished subchapters, and the current subchapter details.

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubchapterContextType } from 'src/types/contextTypes';

const SubchapterContext = createContext<SubchapterContextType | undefined>(undefined);

interface SubchapterProviderProps {
    children: ReactNode;
}

export const useSubchapter = (): SubchapterContextType => {
    const context = useContext(SubchapterContext);
    if (!context) {
        throw new Error('useSubchapter must be used within a SubchapterProvider');
    }
    return context;
}

export const SubchapterProvider: React.FC<SubchapterProviderProps> = ({ children }) => {
    const [unlockedSubchapters, setUnlockedSubchapters] = useState<number[]>([1]);
    const [finishedSubchapters, setFinishedSubchapters] = useState<number[]>([]);
    const [currentSubchapterId, setCurrentSubchapterId] = useState<number | null>(null);
    const [currentSubchapterTitle, setCurrentSubchapterTitle] = useState<string>('');

    // Load saved progress on component mount
    useEffect(() => {
        const loadSavedProgress = async () => {
            try {
                const savedUnlocked = await AsyncStorage.getItem('unlockedSubchapters');
                const savedFinished = await AsyncStorage.getItem('finishedSubchapters');
                if (savedUnlocked) setUnlockedSubchapters(JSON.parse(savedUnlocked));
                if (savedFinished) setFinishedSubchapters(JSON.parse(savedFinished));
            } catch (error) {
                console.error("Error loading saved progress:", error);
            }
        };
        loadSavedProgress();
    }, []);

    // Unlocks a subchapter and updates AsyncStorage
    const unlockSubchapter = async (subchapterId: number) => {
        setUnlockedSubchapters((current) => {
            const updated = [...new Set([...current, subchapterId])];
            AsyncStorage.setItem('unlockedSubchapters', JSON.stringify(updated)); // Persist the data
            return updated;
        });
    };

    // Marks a subchapter as finished and saves to AsyncStorage
    const markSubchapterAsFinished = async (subchapterId: number) => {
        setFinishedSubchapters((current) => {
            const updated = [...new Set([...current, subchapterId])];
            AsyncStorage.setItem('finishedSubchapters', JSON.stringify(updated)); // Persist the data
            return updated;
        });
        unlockSubchapter(subchapterId + 1); // Optionally unlock the next subchapter
    };

    const setCurrentSubchapter = (subchapterId: number | null, subchapterTitle: string) => {
        setCurrentSubchapterId(subchapterId);
        setCurrentSubchapterTitle(subchapterTitle);
    };

    return (
        <SubchapterContext.Provider value={{
            unlockedSubchapters,
            finishedSubchapters,
            currentSubchapterId,
            currentSubchapterTitle,
            unlockSubchapter,
            markSubchapterAsFinished,
            setCurrentSubchapter
        }}>
            {children}
        </SubchapterContext.Provider>
    );
}

export { SubchapterContext };

