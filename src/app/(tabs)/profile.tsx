import { View, Text, Pressable, ScrollView, Alert, Modal, TextInput, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { useEvents } from "../../hooks/useEvents";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { exportToClipboard, shareEvents, importFromClipboard } from "../../utils/storage";

const SETTINGS_OPTIONS = [
  { id: "notifications", label: "通知设置", icon: "bell", color: "#D97757" },
  { id: "theme", label: "主题外观", icon: "paintbrush", color: "#9B8F7F" },
  { id: "backup", label: "备份与恢复", icon: "arrow.clockwise", color: "#7BA897" },
  { id: "clear", label: "清除所有数据", icon: "trash", color: "#E85D75" },
  { id: "about", label: "关于", icon: "info.circle", color: "#6B9BD1" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { events, clearAllEvents, refreshEvents } = useEvents();

  // Modal states
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [importText, setImportText] = useState("");

  // Refresh on focus
  useFocusEffect(
    useCallback(() => {
      refreshEvents();
    }, [refreshEvents])
  );

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date();

    let nearestDays: number | null = null;
    let pastCount = 0;

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const diffMs = eventDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffMs < 0) {
        pastCount++;
      } else {
        if (nearestDays === null || diffDays < nearestDays) {
          nearestDays = diffDays;
        }
      }
    });

    return [
      { label: "已创建", value: events.length.toString(), unit: "个事件" },
      {
        label: "最近的",
        value: nearestDays !== null ? (nearestDays === 0 ? "<1" : nearestDays.toString()) : "-",
        unit: nearestDays !== null && nearestDays >= 0 ? "天后" : ""
      },
      { label: "已过去", value: pastCount.toString(), unit: "个" },
    ];
  }, [events]);

  // Backup & Restore functions
  const handleExport = useCallback(async () => {
    try {
      const count = await exportToClipboard();
      Alert.alert("导出成功", `已将 ${count} 个事件复制到剪贴板\n\n请保存到安全的地方`);
    } catch (error: any) {
      Alert.alert("导出失败", error.message || "请重试");
    }
  }, []);

  const handleShare = useCallback(async () => {
    try {
      await shareEvents();
    } catch (error: any) {
      Alert.alert("分享失败", error.message || "请重试");
    }
  }, []);

  const handleImport = useCallback(async () => {
    if (!importText.trim()) {
      Alert.alert("提示", "请粘贴备份数据");
      return;
    }

    try {
      const count = await importFromClipboard();
      Alert.alert("导入成功", `成功导入 ${count} 个新事件`, [
        {
          text: "确定",
          onPress: () => {
            setImportText("");
            setShowBackupModal(false);
            refreshEvents();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("导入失败", error.message || "请检查数据格式");
    }
  }, [importText, refreshEvents]);

  const handleSettingPress = useCallback(
    (id: string) => {
      switch (id) {
        case "notifications":
          Alert.alert(
            "通知设置",
            "请在系统设置中开启通知权限：\n\n设置 > 时光簿 > 通知",
            [
              { text: "取消", style: "cancel" },
              {
                text: "前往设置",
                onPress: () => Linking.openSettings(),
              },
            ]
          );
          break;

        case "theme":
          Alert.alert("主题外观", "当前版本仅支持浅色主题\n\n深色模式将在未来版本中推出");
          break;

        case "backup":
          setShowBackupModal(true);
          break;

        case "clear":
          Alert.alert("清除所有数据", "此操作将删除所有事件，且无法恢复。确定要继续吗？", [
            { text: "取消", style: "cancel" },
            {
              text: "清除",
              style: "destructive",
              onPress: async () => {
                try {
                  await clearAllEvents();
                  Alert.alert("成功", "所有数据已清除");
                } catch (error) {
                  Alert.alert("错误", "清除失败，请重试");
                }
              },
            },
          ]);
          break;

        case "about":
          setShowAboutModal(true);
          break;

        default:
          break;
      }
    },
    [clearAllEvents]
  );

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
              {stats.map((stat, index) => (
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
              onPress={() => handleSettingPress(option.id)}
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

      {/* Backup & Restore Modal */}
      <Modal
        visible={showBackupModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBackupModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setShowBackupModal(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-[#FAF8F5] rounded-t-3xl overflow-hidden">
              {/* Header */}
              <View className="py-4 px-6 border-b border-[#E8E3DB] flex-row items-center justify-between">
                <Text className="text-[#3A3530] text-[17px]" style={{ fontWeight: "600" }}>
                  备份与恢复
                </Text>
                <Pressable onPress={() => setShowBackupModal(false)}>
                  <SymbolView name="xmark.circle.fill" size={24} type="hierarchical" tintColor="#9B8F7F" />
                </Pressable>
              </View>

              <ScrollView className="px-6 py-6" style={{ maxHeight: 500 }}>
                {/* Export Section */}
                <Text className="text-[#3A3530] text-[15px] mb-3" style={{ fontWeight: "600" }}>
                  导出数据
                </Text>
                <Text className="text-[#9B8F7F] text-[14px] mb-4" style={{ fontWeight: "400" }}>
                  将所有事件数据导出到剪贴板或分享给其他应用
                </Text>

                <View className="flex-row gap-3 mb-8">
                  <Pressable
                    onPress={handleExport}
                    className="flex-1 bg-white rounded-2xl py-4 items-center active:opacity-80"
                    style={{
                      shadowColor: "#3A3530",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 8,
                    }}
                  >
                    <SymbolView name="doc.on.clipboard" size={28} type="hierarchical" tintColor="#D97757" />
                    <Text className="text-[#3A3530] text-[14px] mt-2" style={{ fontWeight: "600" }}>
                      复制到剪贴板
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={handleShare}
                    className="flex-1 bg-white rounded-2xl py-4 items-center active:opacity-80"
                    style={{
                      shadowColor: "#3A3530",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 8,
                    }}
                  >
                    <SymbolView name="square.and.arrow.up" size={28} type="hierarchical" tintColor="#7BA897" />
                    <Text className="text-[#3A3530] text-[14px] mt-2" style={{ fontWeight: "600" }}>
                      分享备份
                    </Text>
                  </Pressable>
                </View>

                {/* Import Section */}
                <Text className="text-[#3A3530] text-[15px] mb-3" style={{ fontWeight: "600" }}>
                  导入数据
                </Text>
                <Text className="text-[#9B8F7F] text-[14px] mb-4" style={{ fontWeight: "400" }}>
                  从剪贴板粘贴备份数据，导入的事件会与现有数据合并
                </Text>

                <TextInput
                  value={importText}
                  onChangeText={setImportText}
                  placeholder="在此粘贴备份数据..."
                  placeholderTextColor="#C4B5A3"
                  multiline
                  numberOfLines={6}
                  className="bg-white rounded-2xl p-4 text-[#3A3530] text-[14px] mb-4"
                  style={{
                    fontWeight: "400",
                    shadowColor: "#3A3530",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.03,
                    shadowRadius: 8,
                    textAlignVertical: "top",
                    minHeight: 120,
                  }}
                />

                <Pressable
                  onPress={handleImport}
                  disabled={!importText.trim()}
                  className="bg-[#D97757] rounded-2xl py-4 items-center active:opacity-90"
                  style={{
                    opacity: importText.trim() ? 1 : 0.5,
                    shadowColor: "#D97757",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 12,
                  }}
                >
                  <Text className="text-white text-[15px]" style={{ fontWeight: "600" }}>
                    导入事件
                  </Text>
                </Pressable>
              </ScrollView>

              <View style={{ paddingBottom: insets.bottom || 20 }} />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={showAboutModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAboutModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setShowAboutModal(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-[#FAF8F5] rounded-t-3xl overflow-hidden">
              {/* Header */}
              <View className="py-4 px-6 border-b border-[#E8E3DB] flex-row items-center justify-between">
                <Text className="text-[#3A3530] text-[17px]" style={{ fontWeight: "600" }}>
                  关于时光簿
                </Text>
                <Pressable onPress={() => setShowAboutModal(false)}>
                  <SymbolView name="xmark.circle.fill" size={24} type="hierarchical" tintColor="#9B8F7F" />
                </Pressable>
              </View>

              <ScrollView className="px-6 py-8" style={{ maxHeight: 500 }}>
                {/* App Icon */}
                <View className="items-center mb-6">
                  <View
                    className="w-20 h-20 rounded-3xl bg-white items-center justify-center mb-4"
                    style={{
                      shadowColor: "#3A3530",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 16,
                    }}
                  >
                    <SymbolView name="calendar" size={40} type="hierarchical" tintColor="#D97757" />
                  </View>
                  <Text className="text-[#3A3530] text-[24px] mb-1" style={{ fontWeight: "500" }}>
                    时光簿
                  </Text>
                  <Text className="text-[#9B8F7F] text-[14px]" style={{ fontWeight: "400" }}>
                    版本 1.0.0
                  </Text>
                </View>

                {/* Description */}
                <View className="bg-white rounded-2xl p-5 mb-6"
                  style={{
                    shadowColor: "#3A3530",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 8,
                  }}
                >
                  <Text className="text-[#3A3530] text-[15px] leading-6" style={{ fontWeight: "400" }}>
                    一个极简优雅的时间记录应用，帮助你珍惜每一个重要的时刻。
                  </Text>
                  <Text className="text-[#3A3530] text-[15px] leading-6 mt-3" style={{ fontWeight: "400" }}>
                    支持创建倒计时、纪念日、生日提醒等多种事件类型，并可设置每天、每周、每月、每年重复。
                  </Text>
                </View>

                {/* Features */}
                <Text className="text-[#3A3530] text-[15px] mb-3" style={{ fontWeight: "600" }}>
                  主要功能
                </Text>
                {[
                  { icon: "calendar.badge.clock", text: "事件倒计时", color: "#D97757" },
                  { icon: "arrow.clockwise", text: "重复事件", color: "#7BA897" },
                  { icon: "square.grid.2x2", text: "桌面小组件", color: "#6B9BD1" },
                  { icon: "pin.fill", text: "优先显示", color: "#9B8F7F" },
                ].map((feature, index) => (
                  <View key={index} className="flex-row items-center mb-3">
                    <View
                      className="w-8 h-8 rounded-full items-center justify-center"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <SymbolView name={feature.icon} size={16} type="hierarchical" tintColor={feature.color} />
                    </View>
                    <Text className="text-[#3A3530] text-[14px] ml-3" style={{ fontWeight: "400" }}>
                      {feature.text}
                    </Text>
                  </View>
                ))}

                {/* Footer */}
                <Text className="text-[#C4B5A3] text-[12px] text-center mt-8" style={{ fontWeight: "400" }}>
                  用心记录，不负时光
                </Text>
                <Text className="text-[#D4C4B0] text-[11px] text-center mt-2" style={{ fontWeight: "400" }}>
                  Made with ❤️ in China
                </Text>
              </ScrollView>

              <View style={{ paddingBottom: insets.bottom || 20 }} />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
