import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { useState } from "react";

const EMOJI_PRESETS = ["📚", "🎂", "💍", "🎓", "✈️", "🎉", "💼", "🏠", "🎸", "🎨"];

const CATEGORY_OPTIONS = [
  { id: "birthday", label: "生日", icon: "gift" },
  { id: "exam", label: "考试", icon: "pencil" },
  { id: "anniversary", label: "纪念日", icon: "heart" },
  { id: "other", label: "其他", icon: "star" },
];

export default function CreateEventScreen() {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("📚");
  const [selectedCategory, setSelectedCategory] = useState("exam");
  const [date, setDate] = useState("");

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
            <View className="flex-row flex-wrap gap-3">
              {EMOJI_PRESETS.map((emoji) => (
                <Pressable
                  key={emoji}
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
            </View>
          </View>

          {/* Category Selection */}
          <View className="mb-8">
            <Text className="text-[#3A3530] text-[13px] mb-3 tracking-wide" style={{ fontWeight: "600" }}>
              类别
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {CATEGORY_OPTIONS.map((category) => (
                <Pressable
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`flex-row items-center px-4 py-3 rounded-full ${
                    selectedCategory === category.id ? "bg-[#D97757]" : "bg-white"
                  }`}
                  style={{
                    shadowColor: "#3A3530",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: selectedCategory === category.id ? 0.15 : 0.03,
                    shadowRadius: 8,
                    elevation: 1,
                  }}
                >
                  <SymbolView
                    name={category.icon}
                    size={16}
                    type="hierarchical"
                    tintColor={selectedCategory === category.id ? "#FAF8F5" : "#9B8F7F"}
                  />
                  <Text
                    className={`ml-2 text-[14px] ${
                      selectedCategory === category.id ? "text-[#FAF8F5]" : "text-[#3A3530]"
                    }`}
                    style={{ fontWeight: "500" }}
                  >
                    {category.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Date Input */}
          <View className="mb-8">
            <Text className="text-[#3A3530] text-[13px] mb-3 tracking-wide" style={{ fontWeight: "600" }}>
              日期
            </Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="2026-06-07"
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

          {/* Create Button */}
          <Pressable
            className="bg-[#D97757] rounded-2xl py-5 items-center mb-8 active:opacity-90"
            style={{
              shadowColor: "#D97757",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Text className="text-white text-[17px]" style={{ fontWeight: "600", letterSpacing: 0.3 }}>
              创建记忆
            </Text>
          </Pressable>
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
