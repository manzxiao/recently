import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";

/**
 * NativeWind v4 样式示例
 * 所有 text-* 类都能正常工作！
 */

export default function NativeWindExamples() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      {/* Layout Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Layout & Flexbox</Text>
        <View className="flex-row gap-2 mb-2">
          <View className="flex-1 bg-blue-500 p-4 rounded-lg">
            <Text className="text-white">Flex 1</Text>
          </View>
          <View className="flex-1 bg-green-500 p-4 rounded-lg">
            <Text className="text-white">Flex 1</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-lg">
          <Text className="text-gray-900">Space Between</Text>
          <Text className="text-gray-600">Aligned</Text>
        </View>
      </View>

      {/* Typography Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Typography</Text>
        <Text className="text-3xl font-bold mb-1">3XL Bold Heading</Text>
        <Text className="text-2xl font-semibold mb-1">2XL Semibold</Text>
        <Text className="text-xl mb-1">XL Regular</Text>
        <Text className="text-lg mb-1">Large Text</Text>
        <Text className="text-base mb-1">Base Size (16px)</Text>
        <Text className="text-sm mb-1">Small Text</Text>
        <Text className="text-xs">Extra Small</Text>
      </View>

      {/* Color Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Colors</Text>
        <View className="gap-2">
          <View className="bg-red-500 p-3 rounded">
            <Text className="text-white font-semibold">Red 500</Text>
          </View>
          <View className="bg-blue-500 p-3 rounded">
            <Text className="text-white font-semibold">Blue 500</Text>
          </View>
          <View className="bg-green-500 p-3 rounded">
            <Text className="text-white font-semibold">Green 500</Text>
          </View>
          <View className="bg-purple-500 p-3 rounded">
            <Text className="text-white font-semibold">Purple 500</Text>
          </View>
          <View className="bg-gray-800 p-3 rounded">
            <Text className="text-white font-semibold">Gray 800</Text>
          </View>
        </View>
      </View>

      {/* Text Color Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Text Colors</Text>
        <View className="bg-white p-4 rounded-lg border border-gray-200">
          <Text className="text-red-500 mb-1">Red Text</Text>
          <Text className="text-blue-600 mb-1">Blue Text</Text>
          <Text className="text-green-700 mb-1">Green Text</Text>
          <Text className="text-gray-500 mb-1">Gray Text</Text>
          <Text className="text-black">Black Text</Text>
        </View>
      </View>

      {/* Spacing Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Spacing</Text>
        <View className="bg-gray-100 p-4 rounded-lg">
          <View className="bg-white p-2 mb-2 rounded">
            <Text className="text-gray-900">p-2 (8px padding)</Text>
          </View>
          <View className="bg-white p-4 mb-2 rounded">
            <Text className="text-gray-900">p-4 (16px padding)</Text>
          </View>
          <View className="bg-white px-6 py-3 rounded">
            <Text className="text-gray-900">px-6 py-3</Text>
          </View>
        </View>
      </View>

      {/* Border Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Borders & Rounded</Text>
        <View className="gap-2">
          <View className="bg-white border border-gray-300 p-3">
            <Text className="text-gray-900">Border Default</Text>
          </View>
          <View className="bg-white border-2 border-blue-500 p-3 rounded">
            <Text className="text-gray-900">Border-2 Rounded</Text>
          </View>
          <View className="bg-white border border-red-500 p-3 rounded-lg">
            <Text className="text-gray-900">Rounded-lg</Text>
          </View>
          <View className="bg-white border border-green-500 p-3 rounded-full">
            <Text className="text-gray-900 text-center">Rounded-full</Text>
          </View>
        </View>
      </View>

      {/* Shadow Examples (iOS only) */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Shadows (iOS)</Text>
        <View className="gap-4">
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <Text className="text-gray-900">Shadow SM</Text>
          </View>
          <View className="bg-white p-4 rounded-lg shadow">
            <Text className="text-gray-900">Shadow Default</Text>
          </View>
          <View className="bg-white p-4 rounded-lg shadow-lg">
            <Text className="text-gray-900">Shadow LG</Text>
          </View>
        </View>
      </View>

      {/* Button Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Interactive Buttons</Text>
        <View className="gap-2">
          <Pressable className="bg-blue-500 active:bg-blue-700 p-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Primary Button
            </Text>
          </Pressable>
          <Pressable className="bg-white border-2 border-blue-500 active:bg-gray-50 p-4 rounded-lg">
            <Text className="text-blue-500 text-center font-semibold">
              Outline Button
            </Text>
          </Pressable>
          <Pressable className="bg-gray-200 active:bg-gray-300 p-4 rounded-lg">
            <Text className="text-gray-700 text-center font-semibold">
              Secondary Button
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Image Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Images</Text>
        <View className="gap-2">
          <Image
            className="w-full h-48 rounded-lg"
            source={{ uri: "https://picsum.photos/400/300" }}
          />
          <View className="flex-row gap-2">
            <Image
              className="flex-1 h-24 rounded"
              source={{ uri: "https://picsum.photos/200/200" }}
            />
            <Image
              className="flex-1 h-24 rounded"
              source={{ uri: "https://picsum.photos/201/200" }}
            />
          </View>
        </View>
      </View>

      {/* Card Example */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Card Component</Text>
        <View className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-2">
            Card Title
          </Text>
          <Text className="text-gray-600 mb-4">
            This is a card component with shadow, border, and padding. Perfect
            for content organization.
          </Text>
          <Pressable className="bg-blue-500 active:bg-blue-700 py-2 px-4 rounded">
            <Text className="text-white text-center font-semibold">
              Action Button
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Gap Examples */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Gap Utilities</Text>
        <View className="bg-gray-100 p-4 rounded-lg">
          <View className="flex-row gap-2 mb-4">
            <View className="flex-1 bg-blue-500 p-3 rounded">
              <Text className="text-white text-center">Gap-2</Text>
            </View>
            <View className="flex-1 bg-blue-500 p-3 rounded">
              <Text className="text-white text-center">Gap-2</Text>
            </View>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1 bg-green-500 p-3 rounded">
              <Text className="text-white text-center">Gap-4</Text>
            </View>
            <View className="flex-1 bg-green-500 p-3 rounded">
              <Text className="text-white text-center">Gap-4</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Success Notice */}
      <View className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200">
        <Text className="text-lg font-bold text-green-900 mb-2">
          ✅ NativeWind v4 - 稳定版本
        </Text>
        <View className="gap-1">
          <Text className="text-green-800">• 所有 text-* 类都能工作</Text>
          <Text className="text-green-800">• text-xl, text-2xl 等大小类 ✅</Text>
          <Text className="text-green-800">• text-gray-*, text-blue-* 等颜色类 ✅</Text>
          <Text className="text-green-800">• text-center 对齐类 ✅</Text>
          <Text className="text-green-800">• 生产环境可用 ✅</Text>
        </View>
      </View>
    </ScrollView>
  );
}
