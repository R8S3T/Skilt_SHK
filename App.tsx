import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "src/navigation/AppNavigator";
import { loadFonts } from "src/utils/fonts";
import { ActivityIndicator, Text, Button, View, StyleSheet } from "react-native";
import { ThemeProvider } from "src/context/ThemeContext";
import { initializeDatabase, fetchVersionNumber } from "src/database/initializeLocalDatabase";
import { DATABASE_MODE } from "@env";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Move prepare function outside of useEffect
  const prepare = async () => {
    try {
      // Clear previous errors
      setError(null);

      // Load fonts
      await loadFonts();

      // Initialize the database
      const db = await initializeDatabase();

      // Mark app as ready
      setIsReady(true);
    } catch (e) {
      console.error("An error occurred while preparing the app:", e);
      setError("An error occurred while initializing the app. Please restart.");
    }
  };

  useEffect(() => {
    prepare(); // Call the prepare function on mount
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button
              title="Retry"
              onPress={prepare} // Reuse the prepare function
            />
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
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
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default App;
