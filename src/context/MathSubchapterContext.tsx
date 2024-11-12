import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MathSubchapterContextType } from 'src/types/contextTypes';
import { MathSubchapter } from 'src/types/contentTypes';

const MathSubchapterContext = createContext<MathSubchapterContextType | undefined>(undefined);

interface MathSubchapterProviderProps {
    children: ReactNode;
}

export const useMathSubchapter = (): MathSubchapterContextType => {
    const context = useContext(MathSubchapterContext);
    if (!context) {
        throw new Error('useMathSubchapter must be used within a MathSubchapterProvider');
    }
    return context;
};

export const MathSubchapterProvider: React.FC<MathSubchapterProviderProps> = ({ children }) => {
    const [unlockedSubchapters, setUnlockedSubchapters] = useState<number[]>([18]);
    const [finishedSubchapters, setFinishedSubchapters] = useState<number[]>([]);
    const [currentSubchapterId, setCurrentSubchapterId] = useState<number | null>(null);
    const [currentSubchapterTitle, setCurrentSubchapterTitle] = useState<string>('');
    const [subchapters, setSubchapters] = useState<MathSubchapter[]>([]);

    // Load progress on component mount
    useEffect(() => {
        const loadSavedProgress = async () => {
            try {
                const savedUnlocked = await AsyncStorage.getItem('mathUnlockedSubchapters');
                const savedFinished = await AsyncStorage.getItem('mathFinishedSubchapters');
                
                const initialUnlocked = savedUnlocked ? JSON.parse(savedUnlocked) : [];
                const initialFinished = savedFinished ? JSON.parse(savedFinished) : [];
                
                // Ensure only the first subchapter is unlocked by default
                if (initialUnlocked.length === 0) {
                    initialUnlocked.push(5); // Assuming subchapter with ID 5 is the first one
                }

                setUnlockedSubchapters(initialUnlocked);
                setFinishedSubchapters(initialFinished);

                console.log("Initial unlocked subchapters:", initialUnlocked);
                console.log("Initial finished subchapters:", initialFinished);
            } catch (error) {
                console.error("Error loading saved progress:", error);
            }
        };
        loadSavedProgress();
    }, []);

    const unlockSubchapter = (subchapterId: number) => {
        setUnlockedSubchapters((current) => {
            if (!current.includes(subchapterId)) {
                const updated = [...current, subchapterId];
                console.log("Unlocked subchapters updated:", updated);
                return updated;
            }
            return current;
        });
    };
    
    
    const markSubchapterAsFinished = (subchapterId: number) => {
        console.log("Marking subchapter as finished:", subchapterId);
        setFinishedSubchapters((current) => {
            if (!current.includes(subchapterId)) {
                const updated = [...current, subchapterId];
                console.log("Updated finished subchapters:", updated);
                return updated;
            }
            return current;
        });
    
        const currentSubchapter = subchapters.find(sub => sub.SubchapterId === subchapterId);
        if (currentSubchapter) {
            const nextSubchapter = subchapters.find(
                sub => sub.SortOrder === currentSubchapter.SortOrder + 1
            );
    
            if (nextSubchapter && !unlockedSubchapters.includes(nextSubchapter.SubchapterId)) {
                unlockSubchapter(nextSubchapter.SubchapterId);
            }
        }
    };
    
    const setCurrentSubchapter = (subchapterId: number | null, subchapterTitle: string) => {
        console.log("Setting current subchapter:", subchapterId, subchapterTitle);
    
        if (subchapterId !== null && !unlockedSubchapters.includes(subchapterId)) {
            unlockSubchapter(subchapterId);
        }
    
        setCurrentSubchapterId(subchapterId);
        setCurrentSubchapterTitle(subchapterTitle);
    };

    return (
        <MathSubchapterContext.Provider
            value={{
                unlockedSubchapters,
                finishedSubchapters,
                currentSubchapterId,
                currentSubchapterTitle,
                unlockSubchapter,
                markSubchapterAsFinished,
                setCurrentSubchapter,
                subchapters,
                setSubchapters,
            }}
        >
            {children}
        </MathSubchapterContext.Provider>
    );
};

export { MathSubchapterContext };
