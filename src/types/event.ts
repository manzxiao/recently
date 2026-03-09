export type EventCategory = "birthday" | "exam" | "anniversary" | "other";

export type RepeatType = "none" | "daily" | "weekly" | "monthly" | "yearly";

export interface Event {
  id: string;
  title: string;
  date: string; // ISO datetime string (YYYY-MM-DDTHH:mm:ss.sssZ)
  category: EventCategory;
  customCategory?: string; // Custom category label (when category is "other")
  emoji: string;
  createdAt: string; // ISO timestamp
  isPinned?: boolean; // Priority display on widget
  repeatType?: RepeatType; // Repeat frequency (default: "none")
}

export interface CreateEventInput {
  title: string;
  date: string;
  category: EventCategory;
  customCategory?: string;
  emoji: string;
  isPinned?: boolean;
  repeatType?: RepeatType;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string;
}
