import { MathSubchapter } from "./contentTypes";

export interface SubchapterContextType {
    unlockedSubchapters: number[];
    finishedSubchapters: number[];
    currentSubchapterId: number | null;
    currentSubchapterTitle: string;
    unlockSubchapter: (subchapterId: number) => void;
    markSubchapterAsFinished: (subchapterId: number) => void;
    setCurrentSubchapter: (subchapterId: number | null, subchapterTitle: string) => void;
}

export interface MathSubchapterContextType {
    unlockedSubchapters: number[];
    finishedSubchapters: number[];
    currentSubchapterId: number | null;
    currentSubchapterTitle: string;
    unlockSubchapter: (subchapterId: number) => void;
    markSubchapterAsFinished: (subchapterId: number) => void;
    setCurrentSubchapter: (subchapterId: number | null, subchapterTitle: string) => void;
    subchapters: MathSubchapter[]; // Add this to the context type
    setSubchapters: (subchapters: MathSubchapter[]) => void;
}
