import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@recently_events";

export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  customCategory?: string;
  emoji: string;
  createdAt: string;
}

export interface EventWidgetData {
  hasEvent: boolean;
  emoji: string;
  title: string;
  customCategory: string;
  timeValue: string;
  timeUnit: string;
  isPast: boolean;
}

const EMPTY_EVENT: EventWidgetData = {
  hasEvent: false,
  emoji: "",
  title: "",
  customCategory: "",
  timeValue: "",
  timeUnit: "",
  isPast: false,
};

// Calculate time until event
function getTimeUntil(targetDateStr: string): { days: number; hours: number; minutes: number; isPast: boolean } {
  const now = new Date();
  const target = new Date(targetDateStr);
  const diffMs = target.getTime() - now.getTime();
  const isPast = diffMs < 0;
  const absDiffMs = Math.abs(diffMs);

  const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isPast };
}

// Format time display
function formatTimeDisplay(timeUntil: { days: number; hours: number; minutes: number }): string {
  const { days, hours, minutes } = timeUntil;

  if (days >= 1) {
    return days.toString();
  } else if (hours >= 1) {
    return `${hours}:${String(minutes).padStart(2, "0")}`;
  } else {
    return minutes.toString();
  }
}

// Format time unit
function formatTimeUnit(timeUntil: { days: number; hours: number }, isPast: boolean): string {
  const { days, hours } = timeUntil;

  if (days >= 1) {
    return isPast ? "天前" : "天";
  } else if (hours >= 1) {
    return isPast ? "小时前" : "小时";
  } else {
    return isPast ? "分钟前" : "分钟";
  }
}

/**
 * Select the next upcoming event from storage
 */
export async function selectNextEvent(): Promise<EventWidgetData> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return EMPTY_EVENT;

    const events: Event[] = JSON.parse(data);
    const now = new Date();

    // Find upcoming events
    const upcomingEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= now;
    });

    // Sort by nearest first
    upcomingEvents.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    if (upcomingEvents.length === 0) return EMPTY_EVENT;

    const event = upcomingEvents[0];
    const timeUntil = getTimeUntil(event.date);

    return {
      hasEvent: true,
      emoji: event.emoji,
      title: event.title,
      customCategory: event.customCategory || "",
      timeValue: formatTimeDisplay(timeUntil),
      timeUnit: formatTimeUnit(timeUntil, timeUntil.isPast),
      isPast: timeUntil.isPast,
    };
  } catch (error) {
    console.error("Widget: Failed to load events", error);
    return EMPTY_EVENT;
  }
}
