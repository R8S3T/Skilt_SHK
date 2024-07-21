// Provides functions to fetch chapter data from a server for a specified year

import { Chapter, Subchapter, SubchapterContent, MathTopicContent } from 'src/types/types';

const API_URL = 'http://192.168.227.38:3000';

// Fetch chapters by year via the server
export async function fetchChaptersByYear(year: number): Promise<Chapter[]> {
    try {
        const response = await fetch(`${API_URL}/chapters/${year}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const chapters: Chapter[] = await response.json();
        console.log(`Fetched Chapters Data for year ${year}:`, chapters);
        return chapters;
    } catch (error) {
        console.error(`Failed to fetch chapters for year ${year}:`, error);
        return [];  // Return empty array on error
    }
}

// Fetch subchapters by chapter ID
export async function fetchSubchaptersByChapterId(chapterId: number): Promise<Subchapter[]> {
    try {
        const response = await fetch(`${API_URL}/subchapters/${chapterId}`);
        if (!response.ok) {
            console.error('Network response was not ok:', response.status, response.statusText);
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const subchapters: Subchapter[] = await response.json();
        console.log(`Fetched Subchapters Data for chapterId ${chapterId}:`, subchapters);
        return subchapters;
    } catch (error) {
        console.error(`Failed to fetch subchapters for chapterId ${chapterId}:`, error);
        return [];  // Return empty array on error
    }
}

// Fetch subchapter content by subchapter ID
export async function fetchSubchapterContentBySubchapterId(subchapterId: number): Promise<SubchapterContent[]> {
    try {
        const response = await fetch(`${API_URL}/subchaptercontent/${subchapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const subchapterContent: SubchapterContent[] = await response.json();
        console.log(`Fetched Subchapter Content Data for subchapterId ${subchapterId}:`, subchapterContent);
        return subchapterContent;
    } catch (error) {
        console.error(`Failed to fetch subchapter content for subchapterId ${subchapterId}:`, error);
        return [];
    }
}

// Fetch math topic content by topic ID
export async function fetchMathContentByTopicId(topicId:number): Promise<MathTopicContent[]> {
    try {
        const response = await fetch(`${API_URL}/mathtopiccontent/${topicId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const mathTopicContent: MathTopicContent[] = await response.json();
        console.log(`Fetched Math Topic Content Data for topicId ${topicId}:`, mathTopicContent);
        return mathTopicContent;
    } catch (error) {
        console.error(`Failed to fetchg math topic content for topicId ${topicId}`, error);
        return [];
    }
}

