import type { RepeatType } from "../types/event";

/**
 * Calculate the next occurrence of a repeating event
 * @param eventDate - The original event date (ISO string)
 * @param repeatType - The repeat frequency
 * @returns The next occurrence date (ISO string)
 */
export function getNextOccurrence(eventDate: string, repeatType: RepeatType): string {
  const now = new Date();
  const original = new Date(eventDate);

  if (repeatType === "none") {
    return eventDate;
  }

  let next = new Date(original);

  switch (repeatType) {
    case "daily":
      // Add days until we're in the future
      while (next <= now) {
        next.setDate(next.getDate() + 1);
      }
      break;

    case "weekly":
      // Add weeks until we're in the future
      while (next <= now) {
        next.setDate(next.getDate() + 7);
      }
      break;

    case "monthly":
      // Add months until we're in the future
      while (next <= now) {
        next.setMonth(next.getMonth() + 1);
      }
      break;

    case "yearly":
      // For birthdays and anniversaries
      // Keep the month and day, but update the year
      next.setFullYear(now.getFullYear());

      // If already passed this year, move to next year
      if (next <= now) {
        next.setFullYear(now.getFullYear() + 1);
      }
      break;
  }

  return next.toISOString();
}

/**
 * Get display date for an event (considering repeat)
 * @param event - The event object
 * @returns The display date (original or next occurrence)
 */
export function getDisplayDate(event: { date: string; repeatType?: RepeatType }): string {
  if (!event.repeatType || event.repeatType === "none") {
    return event.date;
  }

  return getNextOccurrence(event.date, event.repeatType);
}

/**
 * Get human-readable repeat label
 */
export function getRepeatLabel(repeatType: RepeatType): string {
  const labels: Record<RepeatType, string> = {
    none: "不重复",
    daily: "每天",
    weekly: "每周",
    monthly: "每月",
    yearly: "每年",
  };
  return labels[repeatType];
}

/**
 * Get repeat icon
 */
export function getRepeatIcon(repeatType: RepeatType): string {
  const icons: Record<RepeatType, string> = {
    none: "circle",
    daily: "arrow.clockwise",
    weekly: "calendar.badge.clock",
    monthly: "calendar",
    yearly: "gift",
  };
  return icons[repeatType];
}
