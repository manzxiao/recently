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
  timeDisplay: string; // 完整的时间显示，如 "3天5小时20分钟" 或 "2小时30分15秒"
  isPast: boolean;
}

const EMPTY_EVENT: EventWidgetData = {
  hasEvent: false,
  emoji: "",
  title: "",
  customCategory: "",
  timeDisplay: "",
  isPast: false,
};

// Calculate time until event
function getTimeUntil(targetDateStr: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} {
  const now = new Date();
  const target = new Date(targetDateStr);
  const diffMs = target.getTime() - now.getTime();
  const isPast = diffMs < 0;
  const absDiffMs = Math.abs(diffMs);

  const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiffMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast };
}

// Format time display: "还有 X天" or "还有 X小时X分钟"
function formatTimeDisplay(
  timeUntil: { days: number; hours: number; minutes: number; seconds: number },
  isPast: boolean,
): string {
  const { days, hours, minutes } = timeUntil;
  const prefix = isPast ? "已过去" : "还有";

  if (days >= 1) {
    // 大于天：只显示天数
    return `${prefix} ${days}天`;
  } else {
    // 小于天：显示小时和分钟
    return `${prefix} ${hours}:${minutes}`;
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
      timeDisplay: formatTimeDisplay(timeUntil, timeUntil.isPast),
      isPast: timeUntil.isPast,
    };
  } catch (error) {
    console.error("Widget: Failed to load events", error);
    return EMPTY_EVENT;
  }
}
