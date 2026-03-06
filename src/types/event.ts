export type EventCategory = "birthday" | "exam" | "anniversary" | "other";

export interface Event {
  id: string;
  title: string;
  date: string; // ISO datetime string (YYYY-MM-DDTHH:mm:ss.sssZ)
  category: EventCategory;
  customCategory?: string; // Custom category label (when category is "other")
  emoji: string;
  createdAt: string; // ISO timestamp
}

export interface CreateEventInput {
  title: string;
  date: string;
  category: EventCategory;
  customCategory?: string;
  emoji: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string;
}
