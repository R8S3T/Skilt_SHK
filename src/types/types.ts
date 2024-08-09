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

export interface SubchapterContent extends GenericContent {
    ContentId: number;
    SubchapterId: number;
    ContentData: string;
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

export interface MathSubchapterContent extends GenericContent {
    ContentId: number;
    SubchapterId: number;
    ContentData: string;
    SortOrder: number;
    ImageUrl?: string;
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

export interface GenericContent {
    ContentId: number;
    SubchapterId: number;
    ContentData: string;
    TextContent?: string;
    SortOrder: number;
    ImageUrl?: string;
    Quiz?: {
        Question: string;
        Options: string[];
    };
}

export interface Quiz {
    QuizId: number;
    ContentId: number;
    Question: string;
    QuizType: string;
    Answer: string;
    Options?: MultipleChoiceOption[] | ClozeTestOption[];
}

export interface MultipleChoiceOption {
    OptionId: number;
    QuizId: number;
    OptionText1: string;
    OptionText2: string;
    OptionText3: string;
    OptionText4: string;
}

export interface ClozeTestOption {
    OptionId: number;
    QuizId: number;
    OptionTexts: string | string[];
    CorrectOptions: string;
}

export interface AnswerStatus {
    answer: string | null;
    isCorrect: boolean | null;
}