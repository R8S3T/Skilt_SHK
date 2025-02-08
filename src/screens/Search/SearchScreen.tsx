import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { searchSubchapters } from 'src/database/databaseServices';
import { SubchapterWithPreviewExtended } from 'src/utils/searchUtils';
import { RootStackParamList } from 'src/types/navigationTypes';
import { handleSearch } from 'src/utils/searchUtils';
import { useTheme } from 'src/context/ThemeContext';
import { screenWidth } from 'src/utils/screenDimensions';
import { Ionicons } from '@expo/vector-icons';

const RESULTS_PER_PAGE = 5;

// In SearchScreen.tsx
const SearchScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [query, setQuery] = useState<string>(''); 
    const [results, setResults] = useState<SubchapterWithPreviewExtended[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0); // Tracks the current page

    const { theme, isDarkMode } = useTheme();
    
    const handleQueryChange = async (text: string) => {
        setQuery(text);
        const searchResults = await handleSearch(text, searchSubchapters);
        setResults(searchResults);
        setCurrentPage(0); // Reset to the first page when a new search is performed
    };

    const paginatedResults = results.slice(
        currentPage * RESULTS_PER_PAGE,
        (currentPage + 1) * RESULTS_PER_PAGE
    );

    const hasNextPage = (currentPage + 1) * RESULTS_PER_PAGE < results.length;


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '', // Remove the title from the header
            headerStyle: {
                backgroundColor: isDarkMode ? '#1c1c1e' : '#f8f8f8', // Adjust for dark mode
            },
            headerShadowVisible: false, // Optionally remove shadow for a cleaner look
        });
    }, [navigation, isDarkMode]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View
                    style={[
                        styles.inputContainer, // Corrected from styles.input
                        {
                            borderColor: isDarkMode ? '#777' : theme.border, // Ensure border is visible
                            borderWidth: 2, // Make border more prominent
                            backgroundColor: isDarkMode ? '#333' : '#fff', // Ensure contrast
                        },
                    ]}
                >
                <Ionicons
                    name="search"
                    size={screenWidth > 600 ? 30 : 24}
                    color={theme.secondaryText}
                    style={{ marginRight: 8 }}
                />
                <TextInput
                    value={query}
                    onChangeText={handleQueryChange}
                    placeholder="Suche..."
                    placeholderTextColor={theme.secondaryText}
                    style={{
                        flex: 1,
                        color: theme.primaryText,
                        backgroundColor: isDarkMode ? '#333' : '#fff',
                        paddingHorizontal: screenWidth > 600 ? 20 : 12, // Increased padding
                        fontSize: screenWidth > 600 ? 24 : 18, // Increased font size
                        height: screenWidth > 600 ? 60 : 50, // Increased height
                        borderRadius: 8, // Slightly rounded corners for a larger appearance
                    }}
                />

                {query.length > 0 && ( 
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <Ionicons
                            name="close-circle"
                            size={screenWidth > 600 ? 30 : 24}
                            color={theme.secondaryText}
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={paginatedResults}
                keyExtractor={(item) => item.SubchapterId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Learn", {
                                screen: "SubchapterContentScreen",
                                params: {
                                    subchapterId: item.SubchapterId,
                                    subchapterTitle: item.SubchapterName,
                                    chapterId: item.ChapterId || 0,
                                    chapterTitle: item.ChapterTitle || "Unknown Chapter",
                                    origin: "SearchScreen",
                                },
                            })
                        }
                    >
                        <Text style={[styles.resultTitle, { color: theme.primaryText }]}>
                            {item.SubchapterName}
                        </Text>
                        <Text style={[styles.resultPreview, { color: theme.secondaryText }]}>
                            {item.cleanedPreview.map((part, index) =>
                                query.toLowerCase() === part.toLowerCase() ? (
                                    <Text key={`highlight-${index}`} style={{ fontWeight: "bold", color: "#e8630a" }}>
                                        {part}
                                    </Text>
                                ) : (
                                    <Text key={`normal-${index}`}>{part}</Text>
                                )
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={
                    results.length > RESULTS_PER_PAGE ? ( // Show pagination only if there are results and multiple pages
                        <View
                            style={[
                                styles.paginationContainer,
                                { backgroundColor: theme.background }
                            ]}
                        >
                            {/* Back Arrow */}
                            <TouchableOpacity
                                onPress={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
                                disabled={currentPage === 0}
                            >
                                <Ionicons
                                    name="arrow-back-circle"
                                    size={40} 
                                    color={currentPage === 0 ? theme.secondaryText : theme.accent}
                                />
                            </TouchableOpacity>
                
                            {/* Page Numbers */}
                            <Text style={[styles.paginationText, { fontSize: 18, color: theme.primaryText }]}>
                                Seite {currentPage + 1} von {Math.ceil(results.length / RESULTS_PER_PAGE)}
                            </Text>
                
                            {/* Forward Arrow */}
                            <TouchableOpacity
                                onPress={() =>
                                    setCurrentPage((prevPage) =>
                                        Math.min(prevPage + 1, Math.ceil(results.length / RESULTS_PER_PAGE) - 1)
                                    )
                                }
                                disabled={!hasNextPage}
                            >
                                <Ionicons
                                    name="arrow-forward-circle"
                                    size={40} 
                                    color={!hasNextPage ? theme.secondaryText : theme.accent}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: screenWidth > 600 ? 32 : 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: screenWidth > 600 ? 14 : 10, // Increased padding
        borderRadius: 8, 
        height: screenWidth > 600 ? 60 : 50, // Increased height
        fontSize: screenWidth > 600 ? 24 : 18, // Larger font size
    },
    
    resultTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: screenWidth > 600 ? 20 : 18,
    },
    resultPreview: {
        fontFamily: 'OpenSans-Regular',
        fontSize: screenWidth > 600 ? 18 : 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    resultsList: {
        marginTop: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: screenWidth > 600 ? 26 : 20,
        paddingVertical: 10,
    },
    paginationText: {
        marginHorizontal: 16,
        fontSize: screenWidth > 600 ? 20 : 16,
        fontWeight: '600',
    }
});

export default SearchScreen;

