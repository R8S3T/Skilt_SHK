import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { scaleFontSize, dynamicMargin, dynamicCardHeight } from 'src/utils/screenDimensions';

const { width: screenWidth } = Dimensions.get('window');

const FlashCard: React.FC = () => {
    const [flipped, setFlipped] = useState(false);
    const [rotateAnim] = useState(new Animated.Value(0));

    const flipCard = () => {
        Animated.timing(rotateAnim, {
            toValue: flipped ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setFlipped(!flipped);
    };

    const frontInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={flipCard}>
                <View>
                    {/* Front Side */}
                    <Animated.View
                        style={[
                            styles.card,
                            {
                                transform: [{ rotateY: frontInterpolate }],
                                zIndex: flipped ? 0 : 1, // Front stays on top when not flipped
                            },
                        ]}
                    >
                        <Text style={styles.questionText}>Welche Rohre eignen sich für die Trinkwasserinstallation?</Text>
                    </Animated.View>

                    {/* Back Side */}
                    <Animated.View
                        style={[
                            styles.card,
                            styles.cardBack, // Styling for the back
                            {
                                transform: [{ rotateY: backInterpolate }],
                                zIndex: flipped ? 1 : 0, // Back is on top when flipped
                                position: 'absolute',
                                top: 0,
                            },
                        ]}
                    >
                        <Text style={styles.answerText}>Für die Trinkwasserinstallation eignen sich Kunststoff-, Kupfer- und Edelstahlrohre.</Text>
                    </Animated.View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: dynamicMargin(10, 20),
    },
    card: {
        width: screenWidth * 0.85,
        height: dynamicCardHeight(250, 350),
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        borderRadius: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 20,
    },
    cardBack: {
        backgroundColor: '#f1f1f1',
    },
    questionText: {
        fontSize: scaleFontSize(18),
        textAlign: 'center',
        padding: 15,
    },
    answerText: {
        fontSize: scaleFontSize(16),
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 15,
    },
});

export default FlashCard;


