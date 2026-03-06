import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Event, CreateEventInput, UpdateEventInput } from "../types/event";
import { updateWidgetData } from "../services/widget-sync";

const STORAGE_KEY = "@recently_events";

// Sort events: upcoming first (nearest first), then past (most recent first)
function sortEvents(events: Event[]): Event[] {
  const now = new Date();

  return events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const isAPast = dateA < now;
    const isBPast = dateB < now;

    // Both are future events - sort by nearest first
    if (!isAPast && !isBPast) {
      return dateA.getTime() - dateB.getTime();
    }

    // Both are past events - sort by most recent first
    if (isAPast && isBPast) {
      return dateB.getTime() - dateA.getTime();
    }

    // One is past, one is future - future comes first
    return isAPast ? 1 : -1;
  });
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load events from storage
  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setEvents(sortEvents(parsed));
      } else {
        setEvents([]);
      }
      // Update widget data on load
      await updateWidgetData();
    } catch (err) {
      setError("Failed to load events");
      console.error("Load events error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save events to storage
  const saveEvents = useCallback(async (newEvents: Event[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
      setEvents(newEvents);
      // Update widget data
      await updateWidgetData();
    } catch (err) {
      setError("Failed to save events");
      console.error("Save events error:", err);
      throw err;
    }
  }, []);

  // Create a new event
  const createEvent = useCallback(
    async (input: CreateEventInput) => {
      try {
        const newEvent: Event = {
          id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
          ...input,
          createdAt: new Date().toISOString(),
        };

        // Read latest data from AsyncStorage to avoid stale state
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        const currentEvents = data ? JSON.parse(data) : [];

        const newEvents = [...currentEvents, newEvent];
        await saveEvents(sortEvents(newEvents));
        return newEvent;
      } catch (err) {
        console.error("Create event error:", err);
        throw err;
      }
    },
    [saveEvents]
  );

  // Update an event
  const updateEvent = useCallback(
    async (input: UpdateEventInput) => {
      try {
        // Read latest data from AsyncStorage to avoid stale state
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        const currentEvents = data ? JSON.parse(data) : [];

        const newEvents = currentEvents.map((event: Event) =>
          event.id === input.id ? { ...event, ...input } : event
        );
        await saveEvents(sortEvents(newEvents));
      } catch (err) {
        console.error("Update event error:", err);
        throw err;
      }
    },
    [saveEvents]
  );

  // Delete an event
  const deleteEvent = useCallback(
    async (id: string) => {
      try {
        // Read latest data from AsyncStorage to avoid stale state
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        const currentEvents = data ? JSON.parse(data) : [];

        const newEvents = currentEvents.filter((event: Event) => event.id !== id);
        await saveEvents(newEvents);
      } catch (err) {
        console.error("Delete event error:", err);
        throw err;
      }
    },
    [saveEvents]
  );

  // Clear all events (for testing/debugging)
  const clearAllEvents = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setEvents([]);
      // Update widget data
      await updateWidgetData();
    } catch (err) {
      console.error("Clear events error:", err);
      throw err;
    }
  }, []);

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    clearAllEvents,
    refreshEvents: loadEvents,
  };
}
