import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MathSubchapterContextType } from 'src/types/contextTypes'; // Adjust this path as necessary

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
    // Initialize with the SubchapterId for "Einführung Algebra"
    const [unlockedSubchapters, setUnlockedSubchapters] = useState<number[]>([5]);  // Ensure 5 is the SubchapterId for Einführung Algebra
    const [finishedSubchapters, setFinishedSubchapters] = useState<number[]>([]);
    const [currentSubchapterId, setCurrentSubchapterId] = useState<number | null>(null);
    const [currentSubchapterTitle, setCurrentSubchapterTitle] = useState<string>('');

    // Function to unlock a subchapter based on SubchapterId
    const unlockSubchapter = (subchapterId: number) => {
        setUnlockedSubchapters((current) => {
            const updated = [...new Set([...current, subchapterId])];  // Keep existing unlocked and add new
            console.log('Updated unlocked subchapters in function:', updated);
            return updated;
        });
    };

    // Function to mark a subchapter as finished and unlock the next one
    const markSubchapterAsFinished = (subchapterId: number) => {
        setFinishedSubchapters(current => {
            const updated = [...new Set([...current, subchapterId])];
            console.log('Updated finished subchapters:', updated);  // Debug log
            return updated;
        });
        
        // Unlock the next subchapter (assuming sequential unlock)
        unlockSubchapter(subchapterId + 1);  // Adjust this logic based on your unlock requirements
    };

    // Function to set the current subchapter and unlock it if needed
    const setCurrentSubchapter = (subchapterId: number | null, subchapterTitle: string) => {
        if (subchapterId !== null && !unlockedSubchapters.includes(subchapterId)) {
            console.log('Unlocking subchapter:', subchapterId);  // Debug log
            unlockSubchapter(subchapterId);  // Unlock the subchapter if it's not already unlocked
        }
        setCurrentSubchapterId(subchapterId);
        setCurrentSubchapterTitle(subchapterTitle);
    };

    // Example effect to debug state after component mounts or updates
    useEffect(() => {
        console.log('Rendering subchapters with unlockedSubchapters:', unlockedSubchapters);
    }, [unlockedSubchapters]);

    return (
        <MathSubchapterContext.Provider value={{
            unlockedSubchapters,
            finishedSubchapters,
            currentSubchapterId,
            currentSubchapterTitle,
            unlockSubchapter,
            markSubchapterAsFinished,
            setCurrentSubchapter
        }}>
            {children}
        </MathSubchapterContext.Provider>
    );
};

export { MathSubchapterContext };

