// src/utils/searchUtils.ts

import { SubchapterWithPreview } from 'src/types/contentTypes';

// Define and export the extended type
export interface SubchapterWithPreviewExtended extends SubchapterWithPreview {
    cleanedPreview: string; // Add cleanedPreview to the extended type
}

// Define the cleanContent function to clean the content
const cleanContent = (content: string): string => {
    return content.replace(/\[.*?\]/g, '');  // Remove [markers]
};

export const handleSearch = async (
    query: string,
    searchSubchapters: (query: string) => Promise<SubchapterWithPreview[]>
): Promise<SubchapterWithPreviewExtended[]> => {
    const searchResults = await searchSubchapters(query);

    const filteredResults = searchResults
        .map((subchapter) => {
            const subchapterNameLower = subchapter.SubchapterName.toLowerCase();
            const contentPreviewLower = (subchapter.ContentPreview || '').toLowerCase();
            const queryLower = query.toLowerCase();

            const nameMatchCount = (subchapterNameLower.match(new RegExp(queryLower, 'g')) || []).length;
            const previewMatchCount = (contentPreviewLower.match(new RegExp(queryLower, 'g')) || []).length;

            const isInTitle = subchapterNameLower.includes(queryLower) ? 1 : 0;

            return {
                ...subchapter,
                relevanceScore: nameMatchCount * 2 + previewMatchCount + isInTitle * 3,
                cleanedPreview: cleanContent(subchapter.ContentPreview || '').substring(0, 100), // Clean and trim content
            };
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore);

    return filteredResults;
};
