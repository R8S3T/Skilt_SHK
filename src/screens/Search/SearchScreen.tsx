import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { searchSubchapters } from 'src/database/databaseServices';
import { SubchapterWithPreviewExtended } from 'src/utils/searchUtils';
import { RootStackParamList } from 'src/types/navigationTypes';
import { handleSearch } from 'src/utils/searchUtils';
import { useTheme } from 'src/context/ThemeContext';
import { scaleFontSize } from 'src/utils/screenDimensions';
import { Ionicons } from '@expo/vector-icons';

// In SearchScreen.tsx
const SearchScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [query, setQuery] = useState<string>(''); 
    const [results, setResults] = useState<SubchapterWithPreviewExtended[]>([]);
    const { theme, isDarkMode } = useTheme();
    
    const handleQueryChange = async (text: string) => {
        setQuery(text); // Update the query state
        const searchResults = await handleSearch(text, searchSubchapters); // Fetch search results
        setResults(searchResults); // Update results
    };

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
                    styles.input,
                    {
                        borderColor: isDarkMode ? '#777' : theme.border, // Grayish border for dark mode
                        flexDirection: 'row',
                        alignItems: 'center',
                    },
                ]}
            >
                <Ionicons
                    name="search"
                    size={20}
                    color={theme.secondaryText}
                    style={{ marginRight: 8 }}
                />
                <TextInput
                    value={query}
                    onChangeText={handleQueryChange}
                    placeholder="Suche..."
                    placeholderTextColor={theme.secondaryText}
                    style={{
                        flex: 1, // Ensures the input field takes the remaining space
                        color: theme.primaryText,
                        backgroundColor: isDarkMode ? '#333' : '#fff',
                        padding: 8,
                        fontSize: 16,
                    }}
                />
            </View>

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
                                chapterId: item.ChapterId || 0, // Ensure a valid chapterId is passed
                                chapterTitle: item.ChapterTitle || 'Unknown Chapter',
                                origin: 'SearchScreen', // Pass the origin parameter
                            },
                        })
                    }
                    
                    >
                        <Text style={[styles.resultTitle, { color: theme.primaryText }]}>
                            {item.SubchapterName}
                        </Text>
                        <Text style={[styles.resultPreview, { color: theme.secondaryText }]}>
                            {item.cleanedPreview}...
                        </Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => 
                    <View style={[styles.separator, { backgroundColor: theme.border }]} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        padding: 8,
        borderRadius: 5,
        marginBottom: 16,
    },
    resultTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: scaleFontSize(14),
    },
    resultPreview: {
        fontFamily: 'OpenSans-Regular',
        fontSize: scaleFontSize(12),
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    resultsList: {
        marginTop: 20,
    },
});

export default SearchScreen;

