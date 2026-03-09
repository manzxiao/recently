import AsyncStorage from "@react-native-async-storage/async-storage";
import { Share, Platform } from "react-native";
import * as Clipboard from "expo-clipboard";
import type { Event } from "../types/event";

const STORAGE_KEY = "@recently_events";

/**
 * Export events data as JSON string
 */
export async function getExportData(): Promise<string> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (!data) {
    throw new Error("没有数据可以导出");
  }

  const events: Event[] = JSON.parse(data);
  const exportData = {
    version: "1.0.0",
    appName: "时光簿",
    exportDate: new Date().toISOString(),
    eventsCount: events.length,
    events: events,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Export events to clipboard
 */
export async function exportToClipboard(): Promise<number> {
  const jsonData = await getExportData();
  await Clipboard.setStringAsync(jsonData);
  const data = JSON.parse(jsonData);
  return data.eventsCount;
}

/**
 * Share events data
 */
export async function shareEvents(): Promise<void> {
  const jsonData = await getExportData();
  const timestamp = new Date().toISOString().split("T")[0];

  await Share.share({
    message: jsonData,
    title: `时光簿备份 ${timestamp}`,
  });
}

/**
 * Import events from JSON string
 */
export async function importEvents(jsonString: string): Promise<number> {
  try {
    const importData = JSON.parse(jsonString);

    // Validate data structure
    if (!importData.events || !Array.isArray(importData.events)) {
      throw new Error("无效的备份文件格式");
    }

    // Validate version compatibility
    if (importData.version && importData.version !== "1.0.0") {
      console.warn("Version mismatch:", importData.version);
    }

    // Get existing events
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const existingEvents: Event[] = existingData ? JSON.parse(existingData) : [];

    // Merge events (avoid duplicates by ID)
    const existingIds = new Set(existingEvents.map((e) => e.id));
    const newEvents = importData.events.filter((e: Event) => !existingIds.has(e.id));

    const mergedEvents = [...existingEvents, ...newEvents];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mergedEvents));

    return newEvents.length;
  } catch (error) {
    console.error("Import error:", error);
    throw error;
  }
}

/**
 * Import events from clipboard
 */
export async function importFromClipboard(): Promise<number> {
  const clipboardContent = await Clipboard.getStringAsync();
  if (!clipboardContent) {
    throw new Error("剪贴板为空");
  }
  return await importEvents(clipboardContent);
}
