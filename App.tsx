import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "src/navigation/AppNavigator";
import { loadFonts } from "src/utils/fonts";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SubchapterProvider } from "src/screens/Chapters/SubchapterContext";
import { MathSubchapterProvider } from "src/screens/MathScreen/MathSubchapterContext";

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
    <NavigationContainer>
      <SubchapterProvider>
        <MathSubchapterProvider>
          <AppNavigator />
        </MathSubchapterProvider>
      </SubchapterProvider>
    </NavigationContainer>
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


