import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEvents } from "../../hooks/useEvents";
import { EventCategory } from "../../types/event";

// Extended emoji presets with categories
const EMOJI_CATEGORIES = {
  education: ["📚", "🎓", "📖", "✏️", "📝", "🏫"],
  celebration: ["🎂", "🎉", "🎊", "🎈", "🎁", "🥳"],
  love: ["💍", "💐", "💝", "❤️", "💕", "🌹"],
  travel: ["✈️", "🌍", "🗺️", "🧳", "🏖️", "🚗"],
  work: ["💼", "💻", "📊", "🏢", "📱", "⌚"],
  home: ["🏠", "🏡", "🔑", "🛋️", "🎨", "🌱"],
  health: ["💪", "🏃", "🧘", "🏥", "💊", "🩺"],
  food: ["🍰", "🍕", "☕", "🍜", "🍱", "🥗"],
  entertainment: ["🎸", "🎮", "🎬", "📺", "🎭", "🎪"],
  nature: ["🌸", "🌺", "🌻", "🌲", "🌊", "⛰️"],
  sports: ["⚽", "🏀", "🎾", "🏊", "🚴", "⛷️"],
  other: ["⭐", "✨", "🔔", "📅", "🎯", "🔥"],
};

// Flatten all emojis for quick selection
const ALL_EMOJIS = Object.values(EMOJI_CATEGORIES).flat();

const CATEGORY_OPTIONS: Array<{ id: EventCategory; label: string; icon: string }> = [
  { id: "birthday", label: "生日", icon: "gift" },
  { id: "exam", label: "考试", icon: "pencil" },
  { id: "anniversary", label: "纪念日", icon: "heart" },
  { id: "other", label: "其他", icon: "star" },
];

// Format date to Chinese display (with time)
function formatDateDisplay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日 ${weekday} ${hours}:${minutes}`;
}

// Format date to ISO string (with time)
function formatDateISO(date: Date): string {
  return date.toISOString();
}

// Calculate time until (returns object with days, hours, minutes)
function getTimeUntil(targetDate: Date): { days: number; hours: number; minutes: number; isPast: boolean } {
  const now = new Date();
  const target = new Date(targetDate);
  const diffMs = target.getTime() - now.getTime();
  const isPast = diffMs < 0;
  const absDiffMs = Math.abs(diffMs);

  const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isPast };
}

// Format time remaining display
function formatTimeRemaining(timeUntil: ReturnType<typeof getTimeUntil>): string {
  const { days, hours, minutes, isPast } = timeUntil;

  if (days >= 1) {
    return isPast ? `${days} 天前` : `${days} 天后`;
  } else if (hours >= 1) {
    return isPast ? `${hours} 小时 ${minutes} 分钟前` : `${hours} 小时 ${minutes} 分钟后`;
  } else if (minutes >= 1) {
    return isPast ? `${minutes} 分钟前` : `${minutes} 分钟后`;
  } else {
    return "即将到来";
  }
}

export default function CreateEventScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { createEvent } = useEvents();

  const [title, setTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("📚");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("exam");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [creating, setCreating] = useState(false);

  // Emoji selection states
  const [showAllEmojis, setShowAllEmojis] = useState(false);

  // Category selection states
  const [customCategoryLabel, setCustomCategoryLabel] = useState("");

  // Display emojis (first 12 or all)
  const displayedEmojis = showAllEmojis ? ALL_EMOJIS : ALL_EMOJIS.slice(0, 12);

  const timeUntil = getTimeUntil(selectedDate);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      if (pickerMode === "date") {
        if (date) {
          setSelectedDate(date);
          // After selecting date, show time picker
          setPickerMode("time");
        } else {
          setShowDatePicker(false);
        }
      } else {
        // Time selected
        if (date) {
          setSelectedDate(date);
        }
        setShowDatePicker(false);
        setPickerMode("date"); // Reset for next time
      }
    } else {
      // iOS: just update the date
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const handlePickerDone = () => {
    if (pickerMode === "date") {
      // Switch to time picker
      setPickerMode("time");
    } else {
      // Done with time selection
      setShowDatePicker(false);
      setPickerMode("date"); // Reset
    }
  };

  const handlePickerOpen = () => {
    setPickerMode("date");
    setShowDatePicker(true);
  };

  const handleCreate = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert("提示", "请输入事件名称");
      return;
    }

    try {
      setCreating(true);

      await createEvent({
        title: title.trim(),
        date: formatDateISO(selectedDate),
        category: selectedCategory,
        customCategory: customCategoryLabel.trim() || undefined,
        emoji: selectedEmoji,
      });

      // Reset form
      setTitle("");
      setSelectedDate(new Date());
      setSelectedEmoji("📚");
      setSelectedCategory("exam");
      setCustomCategoryLabel("");

      // Show success and navigate to list
      Alert.alert("成功", "事件创建成功！", [
        {
          text: "确定",
          onPress: () => router.push("/(tabs)"),
        },
      ]);
    } catch (error) {
      Alert.alert("错误", "创建失败，请重试");
    } finally {
      setCreating(false);
    }
  };

  return (
    <View className="flex-1 bg-[#FAF8F5]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-8">
          <Text
            className="text-[#3A3530] text-[42px] tracking-tight"
            style={{ fontWeight: "300", letterSpacing: -1 }}
          >
            新的记忆
          </Text>
          <Text className="text-[#9B8F7F] text-[15px] mt-2" style={{ fontWeight: "400" }}>
            记录一个值得纪念的日子
          </Text>
        </View>

        <View className="px-6">
          {/* Title Input */}
          <View className="mb-8">
            <Text className="text-[#3A3530] text-[13px] mb-3 tracking-wide" style={{ fontWeight: "600" }}>
              事件名称
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="例如：高考、妈妈生日"
              placeholderTextColor="#C4B5A3"
              className="bg-white rounded-2xl px-5 py-4 text-[#3A3530] text-[17px]"
              style={{
                fontWeight: "400",
                shadowColor: "#3A3530",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 8,
                elevation: 1,
              }}
            />
          </View>

          {/* Emoji Selection */}
          <View className="mb-8">
            <Text className="text-[#3A3530] text-[13px] mb-3 tracking-wide" style={{ fontWeight: "600" }}>
              选择图标
            </Text>

            {/* Emoji Grid */}
            <View className="flex-row flex-wrap gap-3">
              {displayedEmojis.map((emoji, index) => (
                <Pressable
                  key={`${emoji}-${index}`}
                  onPress={() => setSelectedEmoji(emoji)}
                  className={`w-14 h-14 rounded-2xl items-center justify-center ${selectedEmoji === emoji ? "bg-[#D97757]" : "bg-white"
                    }`}
                  style={{
                    shadowColor: "#3A3530",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: selectedEmoji === emoji ? 0.15 : 0.03,
                    shadowRadius: 8,
                    elevation: 1,
                  }}
                >
                  <Text className="text-[28px]">{emoji}</Text>
                </Pressable>
              ))}

              {/* Show More/Less Button */}
              <Pressable
                onPress={() => setShowAllEmojis(!showAllEmojis)}
                className="w-14 h-14 rounded-2xl items-center justify-center bg-[#F5F1EB]"
              >
                <SymbolView
                  name={showAllEmojis ? "chevron.up" : "chevron.down"}
                  size={20}
                  type="hierarchical"
                  tintColor="#9B8F7F"
                />
              </Pressable>
            </View>

            <Text className="text-[#C4B5A3] text-[11px] mt-2" style={{ fontWeight: "400" }}>
              {showAllEmojis ? `共 ${ALL_EMOJIS.length} 个图标` : "点击箭头查看更多"}
            </Text>
          </View>

          {/* Category Selection */}
          <View className="mb-8">
            <Text className="text-[#3A3530] text-[13px] mb-3 tracking-wide" style={{ fontWeight: "600" }}>
              类别
            </Text>
            <View className="flex-row flex-wrap gap-3 mb-3">
              {CATEGORY_OPTIONS.map((category) => (
                <Pressable
                  key={category.id}
                  onPress={() => {
                    setSelectedCategory(category.id);
                    if (category.id !== "other") {
                      setCustomCategoryLabel("");
                    }
                  }}
                  className={`flex-row items-center px-4 py-3 rounded-full ${selectedCategory === category.id && !customCategoryLabel ? "bg-[#D97757]" : "bg-white"
                    }`}
                  style={{
                    shadowColor: "#3A3530",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: selectedCategory === category.id && !customCategoryLabel ? 0.15 : 0.03,
                    shadowRadius: 8,
                    elevation: 1,
                  }}
                >
                  <SymbolView
                    name={category.icon}
                    size={16}
                    type="hierarchical"
                    tintColor={
                      selectedCategory === category.id && !customCategoryLabel ? "#FAF8F5" : "#9B8F7F"
                    }
                  />
                  <Text
                    className={`ml-2 text-[14px] ${selectedCategory === category.id && !customCategoryLabel
                      ? "text-[#FAF8F5]"
                      : "text-[#3A3530]"
                      }`}
                    style={{ fontWeight: "500" }}
                  >
                    {category.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Custom Category Input */}
            <View className="flex-row gap-2">
              <TextInput
                value={customCategoryLabel}
                onChangeText={(text) => {
                  setCustomCategoryLabel(text);
                  if (text.trim()) {
                    setSelectedCategory("other");
                  }
                }}
                placeholder="或输入自定义类别..."
                placeholderTextColor="#C4B5A3"
                className="flex-1 bg-white rounded-2xl px-4 py-3 text-[#3A3530] text-[14px]"
                style={{
                  fontWeight: "400",
                  shadowColor: "#3A3530",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: customCategoryLabel ? 0.06 : 0.03,
                  shadowRadius: 8,
                  borderWidth: customCategoryLabel ? 1 : 0,
                  borderColor: customCategoryLabel ? "#D97757" : "transparent",
                }}
              />
            </View>

            {customCategoryLabel && (
              <Text className="text-[#D97757] text-[11px] mt-2" style={{ fontWeight: "500" }}>
                ✓ 自定义类别：{customCategoryLabel}
              </Text>
            )}
          </View>

          {/* Date Picker */}
          <View className="mb-8">
            <Text className="text-[#3A3530] text-[13px] mb-3 tracking-wide" style={{ fontWeight: "600" }}>
              日期
            </Text>

            {/* Date Display Button */}
            <Pressable
              onPress={handlePickerOpen}
              className="bg-white rounded-2xl px-5 py-4 flex-row items-center justify-between mb-3"
              style={{
                shadowColor: "#3A3530",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 8,
                elevation: 1,
              }}
            >
              <View className="flex-1">
                <Text className="text-[#3A3530] text-[17px] mb-1" style={{ fontWeight: "400" }}>
                  {formatDateDisplay(selectedDate)}
                </Text>
                <Text className="text-[#9B8F7F] text-[13px]" style={{ fontWeight: "400" }}>
                  {formatTimeRemaining(timeUntil)}
                </Text>
              </View>
              <SymbolView name="calendar" size={24} type="hierarchical" tintColor="#D97757" />
            </Pressable>

            {/* iOS: Bottom Modal, Android: Native Dialog */}
            {Platform.OS === "ios" && (
              <Modal
                visible={showDatePicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <Pressable
                  className="flex-1 bg-black/30 justify-end"
                  onPress={() => setShowDatePicker(false)}
                >
                  <Pressable onPress={(e) => e.stopPropagation()}>
                    <View className="bg-white rounded-t-3xl overflow-hidden">
                      {/* Picker Title */}
                      <View className="py-4 border-b border-[#E8E3DB]">
                        <Text className="text-center text-[#3A3530] text-[17px]" style={{ fontWeight: "600" }}>
                          {pickerMode === "date" ? "选择日期" : "选择时间"}
                        </Text>
                      </View>

                      <DateTimePicker
                        value={selectedDate}
                        mode={pickerMode}
                        display="spinner"
                        onChange={handleDateChange}
                        locale="zh-CN"
                        textColor="#3A3530"
                      />

                      <View className="flex-row gap-3 p-6 border-t border-[#E8E3DB]" style={{ paddingBottom: 34 }}>
                        {pickerMode === "time" && (
                          <Pressable
                            onPress={() => setPickerMode("date")}
                            className="flex-1 py-4 rounded-2xl items-center bg-[#E8E3DB] active:opacity-80"
                          >
                            <Text className="text-[#9B8F7F] text-[15px]" style={{ fontWeight: "600" }}>
                              返回
                            </Text>
                          </Pressable>
                        )}
                        <Pressable
                          onPress={handlePickerDone}
                          className="flex-1 py-4 rounded-2xl items-center bg-[#D97757] active:opacity-90"
                          style={{
                            shadowColor: "#D97757",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 12,
                          }}
                        >
                          <Text className="text-white text-[17px]" style={{ fontWeight: "600" }}>
                            {pickerMode === "date" ? "下一步" : "完成"}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </Pressable>
                </Pressable>
              </Modal>
            )}

            {Platform.OS === "android" && showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode={pickerMode}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Create Button */}
          <Pressable
            onPress={handleCreate}
            disabled={creating}
            className="bg-[#D97757] rounded-2xl py-5 items-center mb-8 active:opacity-90"
            style={{
              shadowColor: "#D97757",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: creating ? 0.15 : 0.3,
              shadowRadius: 12,
              elevation: 4,
              opacity: creating ? 0.6 : 1,
            }}
          >
            {creating ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-[17px]" style={{ fontWeight: "600", letterSpacing: 0.3 }}>
                创建记忆
              </Text>
            )}
          </Pressable>
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
