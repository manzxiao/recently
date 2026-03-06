import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      {/* Main Heading */}
      <Text className="text-3xl font-bold text-gray-900 mb-2">
        Welcome to NativeWind v4!
      </Text>

      {/* Subtitle */}
      <Text className="text-base text-gray-600 text-center mb-8">
        Stable version with Tailwind CSS v3
      </Text>

      {/* Success Button */}
      <View className="bg-blue-500 px-6 py-3 rounded-lg mb-4">
        <Text className="text-white font-semibold text-center">
          All text-* classes work! 🎉
        </Text>
      </View>

      {/* Examples Link */}
      <Link href="/examples" asChild>
        <Pressable className="bg-gray-100 active:bg-gray-200 px-6 py-3 rounded-lg mb-3">
          <Text className="text-gray-900 font-semibold text-center">
            View Style Examples →
          </Text>
        </Pressable>
      </Link>

      {/* Info Text */}
      <Text className="text-sm text-gray-500 text-center mt-8">
        Edit src/app/index.tsx to customize this screen
      </Text>
    </View>
  );
}
