import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from 'src/types/navigationTypes';
import { scaleFontSize, screenWidth } from "src/utils/screenDimensions";
import { useTheme } from 'src/context/ThemeContext';
import { fetchMathChapters } from 'src/database/databaseServices';
import { MathChapter } from 'src/types/contentTypes';
import { imageMap } from 'src/utils/imageMappings';

interface MathModulSectionProps {
    onButtonPress?: (title: string) => void;
}

const MathModulSection: React.FC<MathModulSectionProps> = ({ onButtonPress }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { isDarkMode, theme } = useTheme();
    const [displayModules, setDisplayModules] = useState<MathChapter[]>([]);

    useEffect(() => {
        const loadModules = async () => {
            try {
                const fetchedChapters = await fetchMathChapters();
                const shuffledChapters = fetchedChapters.sort(() => 0.5 - Math.random());
                const selectedChapters = shuffledChapters.slice(0, 3);
                setDisplayModules(selectedChapters);
            } catch (error) {
                console.error('Failed to fetch chapters:', error);
            }
        };
        loadModules();
    }, []);

    const handleButtonPress = (module: MathChapter | { ChapterName: string }) => {
        onButtonPress?.(module.ChapterName); // Call the onButtonPress prop

        if (module.ChapterName === 'Alle Module') {
            navigation.navigate('Math', { screen: 'MathChapterScreen' });
        } else if ('ChapterId' in module) {  // Check if it's a MathChapter type
            navigation.navigate('Math', { 
                screen: 'MathSubchapterScreen', 
                params: { 
                    chapterId: module.ChapterId, 
                    chapterTitle: module.ChapterName,
                    origin: 'HomeScreen'  // Pass the origin parameter
                }
            });
        }
    };

    return (
        <View style={[styles.container, isDarkMode && { backgroundColor: theme.surface }]}>
            <Text style={[styles.title, isDarkMode && { color: theme.primaryText }]}>Fachmathematik</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {displayModules.map((module) => (
                    <TouchableOpacity
                        key={module.ChapterId}
                        style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]}
                        onPress={() => handleButtonPress(module)}
                    >
                        {module.Image && imageMap[module.Image as keyof typeof imageMap] && (
                            <Image source={imageMap[module.Image as keyof typeof imageMap]} style={styles.image} />
                        )}
                        <Text style={[styles.buttonText, isDarkMode && { color: theme.primaryText }]} numberOfLines={2} ellipsizeMode="tail">
                            {module.ChapterName}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]}
                    onPress={() => handleButtonPress({ ChapterName: 'Alle Module' })}
                >
                    <Image source={require('../../../assets/Images/math_all.png')} style={styles.image} />
                    <Text style={[styles.buttonText, isDarkMode && { color: theme.primaryText }]} numberOfLines={2} ellipsizeMode="tail">
                        Alle Module
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: screenWidth > 600 ? 35 : 22,
        alignSelf: 'flex-start',
    },
    button: {
        borderRadius: 10,
        padding: screenWidth > 600 ? 20 : 15,
        marginLeft: 10,
        marginRight: 10,
        width: screenWidth > 600 ? screenWidth * 0.45 : screenWidth * 0.4,
        height: screenWidth > 600 ? 250 : 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    lightButton: {
        backgroundColor: '#FFF',
        borderColor: '#CCC',
    },
    darkButton: {
        backgroundColor: '#555',
        borderColor: '#888',
    },
    image: {
        width: screenWidth > 600 ? 120 : 80,
        height: screenWidth > 600 ? 120 : 80,
        marginBottom: 5,
        resizeMode: 'contain',
    },
    buttonText: {
        fontSize: screenWidth > 600 ? 18 : 16,
        textAlign: 'center',
        color: '#333',
    },
});

export default MathModulSection;

