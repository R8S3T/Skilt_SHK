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
    SubchapterContent?: string;
    isLocked: boolean;
    isFinished: boolean;
}

export interface SubchapterContent {
    ContentId: number;
    SubchapterId: number;
    TextContent: string;
    SortOrder: number;
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

export interface MathTopicContent {
    ContentId: number;
    TopicId: number;
    TextContent: string;
    ImageUrl?: string;
    SortOrder: number;
    Quiz?: {
        Question: string;
        Options: string[];
    };
}
