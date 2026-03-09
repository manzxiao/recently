import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { useEvents } from "../../hooks/useEvents";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

// Calculate time until
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

// Format time for large display
function formatTimeDisplay(timeUntil: ReturnType<typeof getTimeUntil>): string {
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
function formatTimeUnit(timeUntil: ReturnType<typeof getTimeUntil>, isPast: boolean): string {
  const { days, hours } = timeUntil;

  if (days >= 1) {
    return isPast ? "天前" : "天";
  } else if (hours >= 1) {
    return isPast ? "小时前" : "小时";
  } else {
    return isPast ? "分钟前" : "分钟";
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
}

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const { events, loading, deleteEvent, updateEvent, refreshEvents } = useEvents();

  // Refresh events when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshEvents();
    }, [refreshEvents])
  );

  const handleDelete = useCallback(
    (id: string, title: string) => {
      Alert.alert("删除事件", `确定要删除"${title}"吗？`, [
        { text: "取消", style: "cancel" },
        {
          text: "删除",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEvent(id);
            } catch (error) {
              Alert.alert("错误", "删除失败，请重试");
            }
          },
        },
      ]);
    },
    [deleteEvent]
  );

  const handleTogglePin = useCallback(
    async (id: string, currentPinState: boolean) => {
      try {
        await updateEvent({ id, isPinned: !currentPinState });
      } catch (error) {
        Alert.alert("错误", "操作失败，请重试");
      }
    },
    [updateEvent]
  );

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
        {loading ? (
          <View className="items-center justify-center py-24">
            <ActivityIndicator size="large" color="#D97757" />
            <Text className="text-[#9B8F7F] text-[15px] mt-4">加载中...</Text>
          </View>
        ) : events.length === 0 ? (
          <View className="items-center justify-center py-24">
            <SymbolView name="calendar.badge.plus" size={64} type="hierarchical" tintColor="#D4C4B0" />
            <Text className="text-[#9B8F7F] text-[15px] mt-6">还没有事件</Text>
            <Text className="text-[#C4B5A3] text-[13px] mt-2">点击下方创建你的第一个记忆</Text>
          </View>
        ) : (
          events.map((event) => {
            const timeUntil = getTimeUntil(event.date);
            const { isPast } = timeUntil;

            return (
              <View key={event.id} className="mb-4">
                <Pressable
                  className="bg-white rounded-3xl p-6 active:opacity-80"
                  style={{
                    shadowColor: "#3A3530",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 12,
                    elevation: 2,
                  }}
                >
                  {/* Time Counter */}
                  <View className="flex-row items-baseline mb-3">
                    <Text
                      className={`${isPast ? "text-[#C4B5A3]" : "text-[#D97757]"} text-[56px] tracking-tighter`}
                      style={{ fontWeight: "200", letterSpacing: -2 }}
                    >
                      {formatTimeDisplay(timeUntil)}
                    </Text>
                    <Text
                      className={`${isPast ? "text-[#C4B5A3]" : "text-[#9B8F7F]"} text-[16px] ml-2 flex-1`}
                      style={{ fontWeight: "400" }}
                    >
                      {formatTimeUnit(timeUntil, isPast)}
                    </Text>

                    {/* Pin Button */}
                    <Pressable
                      onPress={() => handleTogglePin(event.id, event.isPinned || false)}
                      className="w-8 h-8 items-center justify-center active:opacity-60 mr-2"
                    >
                      <SymbolView
                        name={event.isPinned ? "pin.fill" : "pin"}
                        size={18}
                        type="hierarchical"
                        tintColor={event.isPinned ? "#D97757" : "#C4B5A3"}
                      />
                    </Pressable>

                    {/* Delete Button */}
                    <Pressable
                      onPress={() => handleDelete(event.id, event.title)}
                      className="w-8 h-8 items-center justify-center active:opacity-60"
                    >
                      <SymbolView name="trash" size={18} type="hierarchical" tintColor="#C4B5A3" />
                    </Pressable>
                  </View>

                  {/* Event Title */}
                  <Text className="text-[#3A3530] text-[22px] mb-2" style={{ fontWeight: "500" }}>
                    {event.emoji} {event.title}
                  </Text>

                  {/* Event Date and Category */}
                  <View className="flex-row items-center">
                    <Text className="text-[#9B8F7F] text-[14px]" style={{ fontWeight: "400" }}>
                      {formatDate(event.date)}
                    </Text>
                    {event.customCategory && (
                      <>
                        <View className="w-1 h-1 rounded-full bg-[#C4B5A3] mx-2" />
                        <Text className="text-[#C4B5A3] text-[13px]" style={{ fontWeight: "400" }}>
                          {event.customCategory}
                        </Text>
                      </>
                    )}
                  </View>
                </Pressable>
              </View>
            );
          })
        )}

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
