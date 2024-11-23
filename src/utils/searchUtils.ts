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

            const nameMatchCount = (subchapterNameLower.match(new RegExp(`\\b${queryLower}\\b`, 'g')) || []).length;
            const previewMatchCount = (contentPreviewLower.match(new RegExp(queryLower, 'g')) || []).length;

            const isExactTitleMatch = subchapterNameLower === queryLower ? 5 : 0; // Higher weight for exact matches
            const isPartialMatch = subchapterNameLower.includes(queryLower) ? 2 : 0;

            return {
                ...subchapter,
                relevanceScore: nameMatchCount * 3 + previewMatchCount + isExactTitleMatch + isPartialMatch,
                cleanedPreview: cleanContent(subchapter.ContentPreview || '').substring(0, 100), // Clean and trim content
            };
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Deduplicate results
    const uniqueResults = filteredResults.filter(
        (result, index, self) =>
            index === self.findIndex((r) => r.SubchapterId === result.SubchapterId)
    );

    return uniqueResults;
};

