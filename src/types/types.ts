export interface Chapter {
    ChapterId: number;
    ChapterName: string;
    ChapterIntro?: string;
    Year: number;
}

export interface Subchapter {
    SubchapterId: number;
    ChapterId: number;
    SubchapterName: string;
    isLocked: boolean;
    isFinished: boolean;
}

export interface SubchapterContent {
    ContentId: number;
    SubchapterId: number;
    ContentData: string;
    SortOrder: number;
    TextContent: string; // Add this line
    ImageUrl?: string;
    Quiz?: {
        Question: string;
        Options: string[];
    };
}

export interface SubchapterContextType {
    unlockedSubchapters: number[];
    finishedSubchapters: number[];
    currentSubchapterId: number | null;
    currentSubchapterTitle: string;
    unlockSubchapter: (subchapterId: number) => void;
    markSubchapterAsFinished: (subchapterId: number) => void;
    setCurrentSubchapter: (subchapterId: number | null, subchapterTitle: string) => void;
}

export interface GenericContent {
    ContentId: number;
    TextContent: string;
    ImageUrl?: string;
    Quiz?: {
        Question: string;
        Options: string[];
    };
}

export interface MathChapter {
    ChapterId: number;
    ChapterName: string;
    Description: string;
    SortOrder: number;
}

export interface MathSubchapter {
    SubchapterId: number;
    ChapterId: number;
    SubchapterName: string;
    SortOrder: number;
}

export interface MathSubchapterContent {
    ContentId: number;
    ChapterId: number;
    SubchapterId: number;
    TextContent: string;
    ImageUrl?: string;
    SortOrder: number;
    Quiz?: {
        Question: string;
        Options: string[];
    };
}

export interface MathSubchapterContextType {
    unlockedSubchapters: number[];
    finishedSubchapters: number[];
    currentSubchapterId: number | null;
    currentSubchapterTitle: string;
    unlockSubchapter: (subchapterId: number) => void;
    markSubchapterAsFinished: (subchapterId: number) => void;
    setCurrentSubchapter: (subchapterId: number | null, subchapterTitle: string) => void;
}

