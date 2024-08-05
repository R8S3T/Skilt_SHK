// Provides functions to fetch chapter data from a server for a specified year

import {
    Chapter,
    Subchapter,
    SubchapterContent,
    MathChapter,
    MathSubchapter,
    MathSubchapterContent
} from 'src/types/types';

    // Use here Expo IP adress
    const API_URL = 'http://192.168.145.38:3000';


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
        const subchapterContent: any[] = await response.json();
        console.log(`Fetched Subchapter Content Data for subchapterId ${subchapterId}:`, subchapterContent);

        // Transform the data to match the expected structure
        return subchapterContent.map(content => ({
            ContentId: content.ContentId,
            SubchapterId: content.SubchapterId,
            TextContent: content.ContentData,
            SortOrder: content.SortOrder,
            ImageUrl: content.ImageUrl || null,
            Quiz: content.Quiz || null,
        }));
    } catch (error) {
        console.error(`Failed to fetch subchapter content for subchapterId ${subchapterId}:`, error);
        return [];
    }
}

// Fetch math chapters from the server
export async function fetchMathChapters(): Promise<MathChapter[]> {
    try {
        const response = await fetch(`${API_URL}/mathchapters`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const mathChapters: MathChapter[] = await response.json();
        console.log('Fetched Math Chapters Data:', mathChapters);
        return mathChapters;
    } catch (error) {
        console.error('Failed to fetch math chapters:', error);
        return [];
    }
}

// Fetch math subchapters by chapter ID
export async function fetchMathSubchaptersByChapterId(chapterId: number): Promise<MathSubchapter[]> {
    try {
        const response = await fetch(`${API_URL}/mathsubchapters/${chapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const subchapters: MathSubchapter[] = await response.json();
        console.log(`Fetched Math Subchapters Data for chapterId ${chapterId}:`, subchapters);
        return subchapters;
    } catch (error) {
        console.error(`Failed to fetch math subchapters for chapterId ${chapterId}`, error);
        return [];
    }
}

// Fetch math subchapter content by subchapter ID
export async function fetchMathContentBySubchapterId(subchapterId: number): Promise<MathSubchapterContent[]> {
    try {
        const response = await fetch(`${API_URL}/mathsubchaptercontent/${subchapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const subchapterContent: MathSubchapterContent[] = await response.json();
        console.log(`Fetched Math Subchapter Content Data for subchapterId ${subchapterId}:`, subchapterContent);
        return subchapterContent;
    } catch (error) {
        console.error(`Failed to fetch math subchapter content for subchapterId ${subchapterId}`, error);
        return [];
    }
}


