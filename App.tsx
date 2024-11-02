import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "src/navigation/AppNavigator";
import { loadFonts } from "src/utils/fonts";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { ThemeProvider } from "src/context/ThemeContext";  // Adjust path as necessary

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        setIsReady(true);
      } catch (e) {
        console.error("An error occurred while loading app resources:", e);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});

export default App;




