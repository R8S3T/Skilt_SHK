import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SentenceWithBlanksProps {
    sentenceParts: string[];
    filledAnswers: { answer: string | null; isCorrect: boolean | null }[];
}

const SentenceWithBlanks: React.FC<SentenceWithBlanksProps> = ({ sentenceParts, filledAnswers }) => {
    return (
        <View style={styles.container}>
            {sentenceParts.map((part, index) => (
                <Text key={index} style={styles.sentencePart}>
                    {part}
                    {index < sentenceParts.length - 1 && (
                        <Text style={[
                            styles.blank,
                            filledAnswers[index].isCorrect === null
                                ? styles.blank
                                : filledAnswers[index].isCorrect
                                    ? styles.correctBlank
                                    : styles.incorrectBlank
                        ]}>
                            {filledAnswers[index].answer || '_______'}
                        </Text>
                    )}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
    },
    sentencePart: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginHorizontal: 3,
        lineHeight: 30,
    },
    blank: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#8fc2c2',
        paddingHorizontal: 5,
        textDecorationLine: 'underline',
    },
    correctBlank: {
        color: '#32CD32',
    },
    incorrectBlank: {
        color: '#FF6347',
    },
});

export default SentenceWithBlanks;
