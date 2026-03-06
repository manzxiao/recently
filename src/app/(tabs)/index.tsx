import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { useEvents } from "../../hooks/useEvents";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

function getDaysUntil(targetDateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
  const { events, loading, deleteEvent, refreshEvents } = useEvents();

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
            const daysUntil = getDaysUntil(event.date);
            const isPast = daysUntil < 0;

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
                  {/* Days Counter */}
                  <View className="flex-row items-baseline mb-3">
                    <Text
                      className={`${isPast ? "text-[#C4B5A3]" : "text-[#D97757]"} text-[56px] tracking-tighter`}
                      style={{ fontWeight: "200", letterSpacing: -2 }}
                    >
                      {Math.abs(daysUntil)}
                    </Text>
                    <Text
                      className={`${isPast ? "text-[#C4B5A3]" : "text-[#9B8F7F]"} text-[16px] ml-2 flex-1`}
                      style={{ fontWeight: "400" }}
                    >
                      {isPast ? "天前" : "天"}
                    </Text>

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
