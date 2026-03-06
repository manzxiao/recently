import { View, Text, TextInput, Pressable, ScrollView, Alert, ActivityIndicator, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { EventCategory } from "../../types/event";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

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

// Format date to Chinese display
function formatDateDisplay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日 ${weekday}`;
}

// Format date to ISO string (YYYY-MM-DD)
function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Calculate days until
function getDaysUntil(targetDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
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
  const [creating, setCreating] = useState(false);

  // Emoji selection states
  const [showAllEmojis, setShowAllEmojis] = useState(false);
  const [showCustomEmojiInput, setShowCustomEmojiInput] = useState(false);
  const [customEmojiInput, setCustomEmojiInput] = useState("");

  // Category selection states
  const [customCategoryLabel, setCustomCategoryLabel] = useState("");

  // Display emojis (first 12 or all)
  const displayedEmojis = showAllEmojis ? ALL_EMOJIS : ALL_EMOJIS.slice(0, 12);

  const handleCustomEmojiSubmit = () => {
    const emoji = customEmojiInput.trim();
    if (emoji) {
      setSelectedEmoji(emoji);
      setCustomEmojiInput("");
      setShowCustomEmojiInput(false);
    }
  };

  const daysUntil = getDaysUntil(selectedDate);

  const handleDateChange = (event: any, date?: Date) => {
    // Android: picker closes after selection
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
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
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-[#3A3530] text-[13px] tracking-wide" style={{ fontWeight: "600" }}>
                选择图标
              </Text>
              <Pressable
                onPress={() => setShowCustomEmojiInput(!showCustomEmojiInput)}
                className="flex-row items-center"
              >
                <SymbolView name="pencil" size={14} type="hierarchical" tintColor="#D97757" />
                <Text className="text-[#D97757] text-[12px] ml-1" style={{ fontWeight: "500" }}>
                  自定义
                </Text>
              </Pressable>
            </View>

            {/* Custom Emoji Input */}
            {showCustomEmojiInput && (
              <View className="mb-3 flex-row gap-2">
                <TextInput
                  value={customEmojiInput}
                  onChangeText={setCustomEmojiInput}
                  placeholder="输入任意 emoji 😊"
                  placeholderTextColor="#C4B5A3"
                  className="flex-1 bg-white rounded-2xl px-4 py-3 text-[#3A3530] text-[17px]"
                  style={{
                    fontWeight: "400",
                    shadowColor: "#3A3530",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.03,
                    shadowRadius: 8,
                  }}
                  onSubmitEditing={handleCustomEmojiSubmit}
                  returnKeyType="done"
                />
                <Pressable
                  onPress={handleCustomEmojiSubmit}
                  className="bg-[#D97757] rounded-2xl px-4 items-center justify-center"
                  style={{
                    shadowColor: "#D97757",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                  }}
                >
                  <Text className="text-white text-[14px]" style={{ fontWeight: "600" }}>
                    确定
                  </Text>
                </Pressable>
              </View>
            )}

            {/* Emoji Grid */}
            <View className="flex-row flex-wrap gap-3">
              {displayedEmojis.map((emoji, index) => (
                <Pressable
                  key={`${emoji}-${index}`}
                  onPress={() => setSelectedEmoji(emoji)}
                  className={`w-14 h-14 rounded-2xl items-center justify-center ${
                    selectedEmoji === emoji ? "bg-[#D97757]" : "bg-white"
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
                  className={`flex-row items-center px-4 py-3 rounded-full ${
                    selectedCategory === category.id && !customCategoryLabel ? "bg-[#D97757]" : "bg-white"
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
                    className={`ml-2 text-[14px] ${
                      selectedCategory === category.id && !customCategoryLabel
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
              onPress={() => setShowDatePicker(true)}
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
                  {daysUntil === 0 ? "今天" : daysUntil > 0 ? `${daysUntil} 天后` : `${Math.abs(daysUntil)} 天前`}
                </Text>
              </View>
              <SymbolView name="calendar" size={24} type="hierarchical" tintColor="#D97757" />
            </Pressable>

            {/* iOS: Modal picker, Android: Dialog picker */}
            {showDatePicker && (
              <>
                {Platform.OS === "ios" && (
                  <View className="bg-white rounded-2xl overflow-hidden" style={{ shadowOpacity: 0.03 }}>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="spinner"
                      onChange={handleDateChange}
                      locale="zh-CN"
                      textColor="#3A3530"
                    />
                    <View className="flex-row p-4 border-t border-[#E8E3DB]">
                      <Pressable
                        onPress={() => setShowDatePicker(false)}
                        className="flex-1 py-3 rounded-xl items-center mr-2 bg-[#F5F1EB]"
                      >
                        <Text className="text-[#9B8F7F] text-[15px]" style={{ fontWeight: "600" }}>
                          完成
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}

                {Platform.OS === "android" && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </>
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
