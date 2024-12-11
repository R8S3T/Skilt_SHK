import { SubchapterWithPreview } from "src/types/contentTypes";

export interface SubchapterWithPreviewExtended extends SubchapterWithPreview {
    cleanedPreview: string[]; // Updated to handle highlighted parts as an array
}

const cleanContent = (content: string): string => {
    return content.replace(/\[.*?\]/g, ""); // Entfernt [Marker]
};

const adjustPreview = (content: string, query: string): string => {
    const cleanedContent = cleanContent(content);

    // Split the content into sentences
    const sentences = cleanedContent.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);

    if (!sentences) {
        // If no sentences found, return an empty string
        return '';
    }

    // Find the index of the sentence that contains the query
    const queryRegex = new RegExp(query, 'i');

    const index = sentences.findIndex(sentence => queryRegex.test(sentence));

    if (index === -1) {
        // If query not found, return the first sentence(s) as a fallback
        const preview = sentences.slice(0, 1).join(' ').trim();
        return preview.length > 0 ? preview + '...' : '';
    } else {
        // Start the preview from the matching sentence
        const previewSentences = [];

        // Add the matching sentence
        previewSentences.push(sentences[index]);

        // Optionally, include subsequent sentences until preview length is reached
        let totalLength = sentences[index].length;
        let i = index + 1;
        const previewLength = 50; // Adjust the desired preview length as needed

        while (i < sentences.length && totalLength < previewLength) {
            totalLength += sentences[i].length;
            previewSentences.push(sentences[i]);
            i++;
        }

        const preview = previewSentences.join(' ').trim();
        return preview.length > 0 ? preview + '...' : '';
    }
};


// Highlight the query in the preview
export const highlightQuery = (content: string, query: string): string[] => {
    const queryRegex = new RegExp(`(${query})`, "gi");
    return content.split(queryRegex); // Teilt den Text in Treffer und Nicht-Treffer
};

export const handleSearch = async (
    query: string,
    searchSubchapters: (query: string) => Promise<SubchapterWithPreview[]>
): Promise<SubchapterWithPreviewExtended[]> => {
    const searchResults = await searchSubchapters(query);

    const filteredResults = searchResults
        .map((subchapter) => {
            const adjustedPreview = adjustPreview(subchapter.ContentPreview || "", query);
            const highlightedPreview = highlightQuery(adjustedPreview, query);

            return {
                ...subchapter,
                relevanceScore: 0, // (Optional) You can implement relevance logic here
                cleanedPreview: highlightedPreview, // Return as an array of strings for highlighting
            };
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore);

    return filteredResults;
};
