import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FAF8F5",
          borderTopWidth: 1,
          borderTopColor: "#E8E3DB",
          height: 88,
          paddingTop: 8,
          paddingBottom: 34,
        },
        tabBarActiveTintColor: "#D97757",
        tabBarInactiveTintColor: "#9B8F7F",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          letterSpacing: 0.5,
        },
        sceneStyle: {
          backgroundColor: "#FAF8F5",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "记忆",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name="calendar"
              size={24}
              type="hierarchical"
              tintColor={color}
              animationSpec={{
                effect: {
                  type: focused ? "pulse" : "bounce",
                },
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "创建",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name="plus.circle"
              size={24}
              type="hierarchical"
              tintColor={color}
              animationSpec={{
                effect: {
                  type: focused ? "pulse" : "bounce",
                },
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name="person.circle"
              size={24}
              type="hierarchical"
              tintColor={color}
              animationSpec={{
                effect: {
                  type: focused ? "pulse" : "bounce",
                },
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
