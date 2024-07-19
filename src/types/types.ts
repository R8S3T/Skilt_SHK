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
    ContentData: string;
    SortOrder: number;
}
