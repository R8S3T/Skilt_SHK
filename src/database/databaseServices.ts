// Provides functions to fetch chapter data from a server for a specified year

import {
    Chapter,
    Subchapter,
    SubchapterContent,
    MathTopic,
    MathTopicSubchapter,
    MathTopicContent 
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

// Fetch math topics from the server
export async function fetchMathTopics(): Promise<MathTopic[]> {
    try {
        const response = await fetch(`${API_URL}/mathtopics`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const mathTopics: MathTopic[] = await response.json();
        console.log('Fetched Math Topics Data:', mathTopics);
        return mathTopics;
    } catch (error) {
        console.error('Failed to fetch math topics:', error);
        return [];
    }
}


// Fetch math topic subchapters by topic ID
export async function fetchMathTopicSubchaptersByTopicId(topicId: number): Promise<MathTopicSubchapter[]> {
    try {
        const response = await fetch(`${API_URL}/mathtopicsubchapters/${topicId}`);
        if (!response.ok) {
            console.error('HTTP error', response.status, await response.text());
            throw new Error('Network response was not ok.');
        }
        const subchapters: MathTopicSubchapter[] = await response.json();
        console.log(`Fetched Math Topic Subchapters Data for topicId ${topicId}:`, subchapters);
        return subchapters;
    } catch (error) {
        console.error(`Failed to fetch math topic subchapters for topicId ${topicId}`, error);
        return [];
    }
}

// Fetch math topic content by subchapter ID
export async function fetchMathContentBySubchapterId(subchapterId: number): Promise<MathTopicContent[]> {
    try {
        const response = await fetch(`${API_URL}/mathtopiccontent/${subchapterId}`);
        console.log(`Request URL: ${API_URL}/mathtopiccontent/${subchapterId}`);
        console.log(`Response Status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Response Error: ${errorText}`);
            throw new Error('Network response was not ok.');
        }

        const mathTopicContent: MathTopicContent[] = await response.json();
        console.log(`Fetched Math Topic Content Data for subchapterId ${subchapterId}:`, mathTopicContent);
        return mathTopicContent;
    } catch (error) {
        console.error(`Failed to fetch math topic content for subchapterId ${subchapterId}`, error);
        return [];
    }
}

