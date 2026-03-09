import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDisplayDate } from "../utils/repeat";

const STORAGE_KEY = "@recently_events";

export type RepeatType = "none" | "daily" | "weekly" | "monthly" | "yearly";

export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  customCategory?: string;
  emoji: string;
  createdAt: string;
  isPinned?: boolean; // 是否优先显示在 widget
  repeatType?: RepeatType; // 重复类型
}

export interface EventWidgetData {
  hasEvent: boolean;
  emoji: string;
  title: string;
  customCategory: string;
  timeDisplay: string; // 完整的时间显示，用于描述文字，如 "还有 79 天"
  countdownNumber: string; // 倒计时数字，如 "79" 或 "14"
  countdownUnit: string; // 倒计时单位，如 "天后" 或 "小时"
  dateText: string; // 日期文字，如 "2026年5月1日"
  isPast: boolean;
}

const EMPTY_EVENT: EventWidgetData = {
  hasEvent: false,
  emoji: "",
  title: "",
  customCategory: "",
  timeDisplay: "",
  countdownNumber: "",
  countdownUnit: "",
  dateText: "",
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

// Format time for widget display
function formatTimeForWidget(
  timeUntil: { days: number; hours: number; minutes: number; seconds: number },
  isPast: boolean,
): { display: string; number: string; unit: string } {
  const { days, hours, minutes } = timeUntil;
  const prefix = isPast ? "已过去" : "还有";

  if (days >= 1) {
    return {
      display: `${prefix} ${days} 天`,
      number: String(days),
      unit: "天后",
    };
  } else if (hours >= 1) {
    return {
      display: `${prefix} ${hours}:${minutes.toString().padStart(2, '0')}`,
      number: String(hours),
      unit: "小时",
    };
  } else {
    return {
      display: `${prefix} ${minutes} 分钟`,
      number: String(minutes),
      unit: "分钟",
    };
  }
}

// Format date text: "2026年5月1日"
function formatDateText(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

/**
 * Select the next upcoming event from storage
 * Priority: 1. Pinned events 2. Nearest upcoming events
 */
export async function selectNextEvent(): Promise<EventWidgetData> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return EMPTY_EVENT;

    const events: Event[] = JSON.parse(data);
    const now = new Date();

    // Map events with their display dates (considering repeat)
    const eventsWithDisplayDates = events.map((event) => ({
      event,
      displayDate: getDisplayDate(event),
    }));

    // Find upcoming events
    const upcomingEvents = eventsWithDisplayDates.filter((item) => {
      const eventDate = new Date(item.displayDate);
      return eventDate >= now;
    });

    if (upcomingEvents.length === 0) return EMPTY_EVENT;

    // Check for pinned events first
    const pinnedEvents = upcomingEvents.filter((item) => item.event.isPinned === true);

    let selectedItem: { event: Event; displayDate: string };

    if (pinnedEvents.length > 0) {
      // If there are pinned events, select the nearest pinned event
      pinnedEvents.sort((a, b) => {
        return new Date(a.displayDate).getTime() - new Date(b.displayDate).getTime();
      });
      selectedItem = pinnedEvents[0];
    } else {
      // Otherwise, select the nearest upcoming event
      upcomingEvents.sort((a, b) => {
        return new Date(a.displayDate).getTime() - new Date(b.displayDate).getTime();
      });
      selectedItem = upcomingEvents[0];
    }

    const { event: selectedEvent, displayDate } = selectedItem;
    const timeUntil = getTimeUntil(displayDate);
    const timeFormatted = formatTimeForWidget(timeUntil, timeUntil.isPast);

    return {
      hasEvent: true,
      emoji: selectedEvent.emoji,
      title: selectedEvent.title,
      customCategory: selectedEvent.customCategory || "",
      timeDisplay: timeFormatted.display,
      countdownNumber: timeFormatted.number,
      countdownUnit: timeFormatted.unit,
      dateText: formatDateText(displayDate),
      isPast: timeUntil.isPast,
    };
  } catch (error) {
    console.error("Widget: Failed to load events", error);
    return EMPTY_EVENT;
  }
}
