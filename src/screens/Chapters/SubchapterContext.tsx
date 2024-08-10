// Creates and provides a context for managing subchapter-related state, such as unlocked and finished subchapters, and the current subchapter details.

import React, { createContext, useContext, useState, ReactNode } from 'react';
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

