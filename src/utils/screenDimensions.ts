import { Dimensions } from 'react-native';

// Function to calculate screen size
export const screenWidth = Dimensions.get('window').width;

// Function to calculate fontsize
export const scaleFontSize = (size: number): number => {
    const isTablet = screenWidth > 600; // Tablet threshold
    const scale = screenWidth / 375; // Use mobile-friendly base
    const scaledSize = size * scale;

    return isTablet ? Math.round(scaledSize * 1.2) : Math.round(scaledSize); // Add multiplier for tablets
};

// Function to calculate dynamic margin
export const dynamicMargin = (smallMargin: number, largeMargin: number): number => {
    return screenWidth > 375 ? largeMargin : smallMargin;
};

export const dynamicCardHeight = (smallHeight: number, largeHeight: number): number => {
    const screenWidth = Dimensions.get('window').width;
    return screenWidth > 375 ? largeHeight : smallHeight;
};

// Function to calculate dynamic icon size
export const getDynamicIconSize = (smallSize: number, largeSize: number): number => {
    return screenWidth > 375 ? largeSize : smallSize;
};