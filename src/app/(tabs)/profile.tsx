import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

const SETTINGS_OPTIONS = [
  { id: "notifications", label: "通知设置", icon: "bell", color: "#D97757" },
  { id: "theme", label: "主题外观", icon: "paintbrush", color: "#9B8F7F" },
  { id: "backup", label: "备份与恢复", icon: "arrow.clockwise", color: "#7BA897" },
  { id: "about", label: "关于", icon: "info.circle", color: "#6B9BD1" },
];

const STATS = [
  { label: "已创建", value: "3", unit: "个事件" },
  { label: "最近的", value: "92", unit: "天后" },
  { label: "已过去", value: "0", unit: "个" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#FAF8F5]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-8">
          <Text
            className="text-[#3A3530] text-[42px] tracking-tight"
            style={{ fontWeight: "300", letterSpacing: -1 }}
          >
            我的
          </Text>
        </View>

        {/* Profile Card */}
        <View className="px-6 mb-8">
          <View
            className="bg-white rounded-3xl p-6 items-center"
            style={{
              shadowColor: "#3A3530",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 12,
              elevation: 2,
            }}
          >
            {/* Avatar */}
            <View
              className="w-24 h-24 rounded-full bg-[#E8E3DB] items-center justify-center mb-4"
              style={{
                shadowColor: "#3A3530",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
              }}
            >
              <SymbolView name="person.fill" size={40} type="hierarchical" tintColor="#9B8F7F" />
            </View>

            <Text className="text-[#3A3530] text-[24px] mb-1" style={{ fontWeight: "500" }}>
              时光记录者
            </Text>
            <Text className="text-[#9B8F7F] text-[14px]" style={{ fontWeight: "400" }}>
              珍惜每一个重要时刻
            </Text>

            {/* Stats */}
            <View className="flex-row w-full mt-6 pt-6 border-t border-[#E8E3DB]">
              {STATS.map((stat, index) => (
                <View key={stat.label} className="flex-1 items-center">
                  {index > 0 && <View className="absolute left-0 w-[1px] h-full bg-[#E8E3DB]" />}
                  <Text
                    className="text-[#D97757] text-[28px] tracking-tighter"
                    style={{ fontWeight: "300", letterSpacing: -1 }}
                  >
                    {stat.value}
                  </Text>
                  <Text className="text-[#9B8F7F] text-[12px] mt-1" style={{ fontWeight: "400" }}>
                    {stat.label}
                  </Text>
                  <Text className="text-[#C4B5A3] text-[11px]" style={{ fontWeight: "400" }}>
                    {stat.unit}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="px-6">
          <Text className="text-[#3A3530] text-[13px] mb-3 tracking-wide px-2" style={{ fontWeight: "600" }}>
            设置
          </Text>

          {SETTINGS_OPTIONS.map((option, index) => (
            <Pressable
              key={option.id}
              className={`flex-row items-center bg-white px-5 py-4 active:opacity-80 ${
                index === 0 ? "rounded-t-2xl" : ""
              } ${index === SETTINGS_OPTIONS.length - 1 ? "rounded-b-2xl" : ""}`}
              style={{
                borderBottomWidth: index === SETTINGS_OPTIONS.length - 1 ? 0 : 1,
                borderBottomColor: "#F5F1EB",
                shadowColor: "#3A3530",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.02,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${option.color}15` }}
              >
                <SymbolView name={option.icon} size={18} type="hierarchical" tintColor={option.color} />
              </View>

              <Text className="flex-1 text-[#3A3530] text-[16px] ml-4" style={{ fontWeight: "500" }}>
                {option.label}
              </Text>

              <SymbolView name="chevron.right" size={16} type="hierarchical" tintColor="#C4B5A3" />
            </Pressable>
          ))}
        </View>

        {/* Version */}
        <View className="items-center mt-12 mb-8">
          <Text className="text-[#C4B5A3] text-[12px]" style={{ fontWeight: "400" }}>
            时光簿 v1.0.0
          </Text>
          <Text className="text-[#D4C4B0] text-[11px] mt-1" style={{ fontWeight: "400" }}>
            用心记录，不负时光
          </Text>
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
