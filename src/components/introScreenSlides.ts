import React from 'react';

// Define the TypeScript type for the slides
export interface Slide {
    key: string;
    animation: any; // Use any for now, adjust if you have a specific type for animations
    title: string;
    text: string;
    backgroundColor: string;
    renderInputField?: boolean;
}

export const slides: Slide[] = [
    {
        key: 'one',
        animation: require('../../assets/Animations/fireworks_animation.json'),
        title: 'Willkommen bei Skilt',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est.',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'two',
        animation: require('../../assets/Animations/knowledge_donut_animation.json'),
        title: 'Lernen in kleinen Wissens-Häppchen',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est.',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'three',
        animation: require('../../assets/Animations/quiz_animation_3.json'),
        title: 'Interaktive Quizzes',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl suscipit adipiscing bibendum est.',
        backgroundColor: '#f6f5f5',
    },
    {
        key: 'four',
        animation: require('../../assets/Animations/user_animation_2.json'),
        title: 'Benutzername',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        backgroundColor: '#f6f5f5',
        renderInputField: true,
    },
];

