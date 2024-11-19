import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { searchSubchapters } from 'src/database/databaseServices';
import { SubchapterWithPreviewExtended } from 'src/utils/searchUtils'; // Correct import of the extended type
import { RootStackParamList } from 'src/types/navigationTypes';
import { handleSearch } from 'src/utils/searchUtils'; // Import the search handler

// In SearchScreen.tsx
const SearchScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [query, setQuery] = useState<string>(''); 
    const [results, setResults] = useState<SubchapterWithPreviewExtended[]>([]);

    const handleSearchResults = async () => {
        const searchResults = await handleSearch(query, searchSubchapters); // Use the helper function
        setResults(searchResults);
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search..."
                style={styles.input}
            />
            <Button title="Search" onPress={handleSearchResults} />

            <FlatList
                data={results}
                keyExtractor={(item) => item.SubchapterId.toString()}
                style={styles.resultsList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Learn', {
                                screen: 'SubchapterContentScreen',
                                params: {
                                    subchapterId: item.SubchapterId,
                                    subchapterTitle: item.SubchapterName,
                                    chapterId: item.ChapterId,
                                    chapterTitle: item.ChapterTitle || 'Unknown Chapter',
                                    origin: 'SearchScreen', // Pass the origin parameter
                                },
                            })
                        }
                    >
                        <Text style={styles.resultTitle}>{item.SubchapterName}</Text>
                        <Text style={styles.resultPreview}>{item.cleanedPreview}...</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
        marginBottom: 16,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultPreview: {
        fontSize: 14,
        color: '#666',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    resultsList: {
        marginTop: 20,
    },
});

export default SearchScreen;

