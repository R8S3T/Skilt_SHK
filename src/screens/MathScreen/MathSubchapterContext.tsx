import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MathSubchapterContextType } from 'src/types/contextTypes'; // Ensure the path is correct
import { MathSubchapter } from 'src/types/contentTypes'; // Ensure the path is correct

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
    const [unlockedSubchapters, setUnlockedSubchapters] = useState<number[]>([0]); // Initial subchapter unlocked
    const [finishedSubchapters, setFinishedSubchapters] = useState<number[]>([]);
    const [currentSubchapterId, setCurrentSubchapterId] = useState<number | null>(null);
    const [currentSubchapterTitle, setCurrentSubchapterTitle] = useState<string>('');
    const [subchapters, setSubchapters] = useState<MathSubchapter[]>([]); // Subchapters list

    // Function to unlock a subchapter based on SubchapterId
    const unlockSubchapter = (subchapterId: number) => {
        setUnlockedSubchapters((current) => {
            const updated = [...new Set([...current, subchapterId])]; // Keep existing unlocked subchapters and add the new one
            console.log('Updated unlocked subchapters:', updated);
            return updated;
        });
    };

    // Function to mark a subchapter as finished and unlock the next one based on SortOrder
    const markSubchapterAsFinished = (subchapterId: number) => {
        setFinishedSubchapters(current => {
            const updated = [...new Set([...current, subchapterId])];
            console.log('Updated finished subchapters:', updated);
            return updated;
        });
    
        unlockSubchapter(subchapterId + 1);  // Temporarily revert to previous unlocking logic
    };
    // Function to set the current subchapter and unlock it if needed
    const setCurrentSubchapter = (subchapterId: number | null, subchapterTitle: string) => {
        if (subchapterId !== null && !unlockedSubchapters.includes(subchapterId)) {
            console.log('Unlocking subchapter:', subchapterId); // Debug log
            unlockSubchapter(subchapterId); // Unlock the subchapter if it's not already unlocked
        }
        setCurrentSubchapterId(subchapterId);
        setCurrentSubchapterTitle(subchapterTitle);
    };

    // Example effect to debug state after component mounts or updates
    useEffect(() => {
        console.log('Rendering subchapters with unlockedSubchapters:', unlockedSubchapters);
    }, [unlockedSubchapters]);

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
                setSubchapters // Expose setSubchapters so it can be updated externally
            }}
        >
            {children}
        </MathSubchapterContext.Provider>
    );
};

export { MathSubchapterContext };


