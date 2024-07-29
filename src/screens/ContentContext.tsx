import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContentContextType } from 'src/types/types';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
    children: ReactNode;
}

export const useContent = (): ContentContextType => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
    const [unlockedContentIds, setUnlockedContentIds] = useState<number[]>([1]);
    const [finishedContentIds, setFinishedContentIds] = useState<number[]>([]);
    const [currentContentId, setCurrentContentId] = useState<number | null>(null);
    const [currentContentTitle, setCurrentContentTitle] = useState<string>('');

    const unlockContent = (contentId: number) => {
        setUnlockedContentIds((current) => [...new Set([...current, contentId])]);
    }

    const markContentAsFinished = (contentId: number) => {
        setFinishedContentIds(current => [...new Set([...current, contentId])]);
        // Optionally unlock the next content
        unlockContent(contentId + 1);
    }

    const setCurrentContent = (contentId: number | null, contentTitle: string) => {
        setCurrentContentId(contentId);
        setCurrentContentTitle(contentTitle);
    };

    return (
        <ContentContext.Provider value={{
            unlockedContentIds,
            finishedContentIds,
            currentContentId,
            currentContentTitle,
            unlockContent,
            markContentAsFinished,
            setCurrentContent
        }}>
            {children}
        </ContentContext.Provider>
    );
}

export { ContentContext };