import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AnswerStatus } from 'src/types/types';

interface SentenceWithBlanksProps {
    sentenceParts: string[];
    filledAnswers: AnswerStatus[];
}

const SentenceWithBlanks: React.FC<SentenceWithBlanksProps> = ({ sentenceParts, filledAnswers }) => {
    return (
        <View style={styles.container}>
            {sentenceParts.map((part, index) => (
                <View key={index} style={styles.line}>
                    <Text style={styles.sentencePart}>{part}</Text>
                    {index < sentenceParts.length - 1 && (
                        <Text style={
                            filledAnswers[index].isCorrect === null
                            ? styles.blank
                            : filledAnswers[index].isCorrect
                                ? styles.correctBlank
                                : styles.incorrectBlank
                        }>
                            {filledAnswers[index].answer || '_'}
                        </Text>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Your container style
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    sentencePart: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    blank: {
        fontWeight: 'bold',
        minWidth: 50,
        fontSize: 20,
        color: '#8fc2c2',
    },
    correctBlank: {
        fontWeight: 'bold',
        color: '#32CD32',
        minWidth: 50,
        fontSize: 20,
    },
    incorrectBlank: {
        fontWeight: 'bold',
        color: '#FF6347',
        minWidth: 50,
        fontSize: 20,
    },
});

export default SentenceWithBlanks;
