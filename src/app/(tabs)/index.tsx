import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  date: Date;
  category: "birthday" | "exam" | "anniversary" | "other";
  emoji?: string;
}

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "高考",
    date: new Date("2026-06-07"),
    category: "exam",
    emoji: "📚",
  },
  {
    id: "2",
    title: "妈妈生日",
    date: new Date("2026-04-15"),
    category: "birthday",
    emoji: "🎂",
  },
  {
    id: "3",
    title: "结婚纪念日",
    date: new Date("2026-09-20"),
    category: "anniversary",
    emoji: "💍",
  },
];

function getDaysUntil(targetDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
}

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const [events] = useState<Event[]>(MOCK_EVENTS);

  return (
    <View className="flex-1 bg-[#FAF8F5]">
      {/* Header */}
      <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-8">
        <Text
          className="text-[#3A3530] text-[42px] tracking-tight"
          style={{ fontWeight: "300", letterSpacing: -1 }}
        >
          时光簿
        </Text>
        <Text className="text-[#9B8F7F] text-[15px] mt-2" style={{ fontWeight: "400" }}>
          记录每一个重要的时刻
        </Text>
      </View>

      {/* Events List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {events.length === 0 ? (
          <View className="items-center justify-center py-24">
            <SymbolView name="calendar.badge.plus" size={64} type="hierarchical" tintColor="#D4C4B0" />
            <Text className="text-[#9B8F7F] text-[15px] mt-6">还没有事件</Text>
            <Text className="text-[#C4B5A3] text-[13px] mt-2">点击下方创建你的第一个记忆</Text>
          </View>
        ) : (
          events.map((event, index) => {
            const daysUntil = getDaysUntil(event.date);
            const isPast = daysUntil < 0;

            return (
              <Pressable
                key={event.id}
                className="mb-4 bg-white rounded-3xl p-6 active:opacity-80"
                style={{
                  shadowColor: "#3A3530",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 12,
                  elevation: 2,
                }}
              >
                {/* Days Counter */}
                <View className="flex-row items-baseline mb-3">
                  <Text
                    className={`${isPast ? "text-[#C4B5A3]" : "text-[#D97757]"} text-[56px] tracking-tighter`}
                    style={{ fontWeight: "200", letterSpacing: -2 }}
                  >
                    {Math.abs(daysUntil)}
                  </Text>
                  <Text
                    className={`${isPast ? "text-[#C4B5A3]" : "text-[#9B8F7F]"} text-[16px] ml-2`}
                    style={{ fontWeight: "400" }}
                  >
                    {isPast ? "天前" : "天"}
                  </Text>
                </View>

                {/* Event Title */}
                <Text className="text-[#3A3530] text-[22px] mb-2" style={{ fontWeight: "500" }}>
                  {event.emoji} {event.title}
                </Text>

                {/* Event Date */}
                <Text className="text-[#9B8F7F] text-[14px]" style={{ fontWeight: "400" }}>
                  {formatDate(event.date)}
                </Text>
              </Pressable>
            );
          })
        )}

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
