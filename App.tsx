import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "src/navigation/AppNavigator";
import { loadFonts } from "src/utils/fonts";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { ThemeProvider } from "src/context/ThemeContext";
import { initializeDatabase, fetchVersionNumber } from "src/database/initializeLocalDatabase";
import { DATABASE_MODE } from "@env";

const App = () => {


  const [isReady, setIsReady] = useState(false);
  const [versionNumber, setVersionNumber] = useState<number | null>(null);

  useEffect(() => {
    async function prepare() {
        try {
            // Load fonts
            await loadFonts();

            // Initialize the database
            const db = await initializeDatabase();

            // Fetch version number
            const version = await fetchVersionNumber();
            setVersionNumber(version);

            // Mark app as ready
            setIsReady(true);
        } catch (e) {
            console.error("An error occurred while preparing the app:", e);
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




