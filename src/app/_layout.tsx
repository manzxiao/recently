import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { useEffect } from "react";
import "../global.css";
import { initializeWidget } from "../services/widget-sync";

// expo-widgets requires a native module that isn't available in Expo Go
LogBox.ignoreLogs(["Cannot find native module 'ExpoWidgets'"]);

export default function RootLayout() {
  // Initialize widget on app startup
  useEffect(() => {
    initializeWidget();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
