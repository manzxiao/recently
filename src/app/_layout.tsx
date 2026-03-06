import { Stack } from "expo-router";
import { LogBox } from "react-native";
import "../global.css";

// expo-widgets requires a native module that isn't available in Expo Go
LogBox.ignoreLogs(["Cannot find native module 'ExpoWidgets'"]);

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
