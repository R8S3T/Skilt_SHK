// ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme, lightenColor } from 'src/components/theme';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    theme: typeof lightTheme;
    fontSize: number;
    setFontSize: (size: number) => void;
    lightenColor: (color: string, percent: number) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);  // Add fontSize state here

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ 
            isDarkMode, 
            toggleDarkMode, 
            theme, 
            fontSize, 
            setFontSize,
            lightenColor, // Pass lightenColor as part of the context
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};