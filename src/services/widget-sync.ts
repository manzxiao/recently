import { Platform } from "react-native";
import { selectNextEvent } from "./widget-data";

/**
 * Update widget data
 * This should be called when events change to keep widgets in sync
 */
export async function updateWidgetData() {
  if (Platform.OS !== "ios") return;

  try {
    // Import expo-widgets only on iOS and only when available
    const { setWidgetData } = await import("expo-widgets");

    const eventData = await selectNextEvent();

    await setWidgetData("EventWidget", eventData);
  } catch (error) {
    // expo-widgets is only available in development builds, not Expo Go
    console.log("Widget update skipped (not available in this environment)");
  }
}
