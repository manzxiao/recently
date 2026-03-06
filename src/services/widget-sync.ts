import { Platform } from "react-native";
import { selectNextEvent } from "./widget-data";
import type { EventWidgetData } from "./widget-data";

// Lazy-load widget handle (like ministep's getStepWidget)
function getEventWidget() {
  if (Platform.OS !== "ios") return null;
  try {
    const { eventWidget } = require("../widgets/EventWidget");
    return eventWidget;
  } catch (err) {
    console.log("[Widget] Failed to load widget module:", err);
    return null;
  }
}

/**
 * Update widget with event data (like ministep's updateStepWidget)
 */
export function updateEventWidget(data: EventWidgetData): void {
  try {
    const widget = getEventWidget();
    if (!widget) {
      console.log("[Widget] Widget module not available");
      return;
    }

    widget.updateSnapshot(data);
    console.log("[Widget] Updated with event:", data.hasEvent ? data.title : "empty");
  } catch (err) {
    console.error("[Widget] Failed to update widget:", err);
  }
}

/**
 * Update widget data from storage
 * This should be called when events change to keep widgets in sync
 */
export async function updateWidgetData() {
  if (Platform.OS !== "ios") return;

  try {
    const eventData = await selectNextEvent();
    updateEventWidget(eventData);
  } catch (error) {
    console.log("Widget update skipped (not available in this environment)");
  }
}

/**
 * Initialize widget on app startup (like ministep's WidgetUpdater.initialize)
 */
export async function initializeWidget() {
  if (Platform.OS !== "ios") return;

  try {
    // Load latest event data from storage
    const eventData = await selectNextEvent();
    updateEventWidget(eventData);
    console.log("[Widget] Initialized");
  } catch (err) {
    console.error("[Widget] Failed to initialize:", err);
  }
}
