import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MathSubchapterContextType } from 'src/types/types';

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
}

export const MathSubchapterProvider: React.FC<MathSubchapterProviderProps> = ({ children }) => {
    const [unlockedSubchapters, setUnlockedSubchapters] = useState<number[]>([1]);
    const [finishedSubchapters, setFinishedSubchapters] = useState<number[]>([]);
    const [currentSubchapterId, setCurrentSubchapterId] = useState<number | null>(null);
    const [currentSubchapterTitle, setCurrentSubchapterTitle] = useState<string>('');

    const unlockSubchapter = (subchapterId: number) => {
        setUnlockedSubchapters((current) => [...new Set([...current, subchapterId])]);
    };

    const markSubchapterAsFinished = (subchapterId: number) => {
        setFinishedSubchapters(current => [...new Set([...current, subchapterId])]);
        // Unlock the next subchapter
        const nextSubchapterId = subchapterId + 1;
        unlockSubchapter(nextSubchapterId);
    }

    const setCurrentSubchapter = (subchapterId: number | null, subchapterTitle: string) => {
        setCurrentSubchapterId(subchapterId);
        setCurrentSubchapterTitle(subchapterTitle);
    };

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
}

export { MathSubchapterContext };
