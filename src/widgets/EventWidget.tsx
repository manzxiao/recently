import { HStack, Spacer, Text, VStack } from "@expo/ui/swift-ui";
import { font, foregroundStyle, padding } from "@expo/ui/swift-ui/modifiers";
import { createWidget, type WidgetBase } from "expo-widgets";
import type { EventWidgetData } from "../services/widget-data";

function EventWidgetView(props: WidgetBase<EventWidgetData>) {
  "widget";

  const headline = font({ size: 17, weight: "semibold" });
  const title1 = font({ size: 28, weight: "bold" });
  const body = font({ size: 14 });
  const caption = font({ size: 12 });

  // Empty state - 优雅的空状态设计
  if (!props.hasEvent) {
    if (props.family === "systemSmall") {
      return (
        <VStack alignment="center" spacing={8} modifiers={[padding({ all: 16 })]}>
          <Spacer />
          <Text modifiers={[font({ size: 36 })]}>📅</Text>
          <Text modifiers={[caption, foregroundStyle("secondary")]}>
            暂无事件
          </Text>
          <Spacer />
        </VStack>
      );
    }

    if (props.family === "systemLarge") {
      return (
        <VStack alignment="center" spacing={12} modifiers={[padding({ all: 20 })]}>
          <Spacer />
          <Text modifiers={[font({ size: 60 })]}>📅</Text>
          <VStack alignment="center" spacing={4}>
            <Text modifiers={[title1]}>时光簿</Text>
            <Text modifiers={[body, foregroundStyle("secondary")]}>
              点击创建你的第一个记忆
            </Text>
          </VStack>
          <Spacer />
        </VStack>
      );
    }

    // systemMedium empty state
    return (
      <HStack alignment="center" spacing={12} modifiers={[padding({ all: 16 })]}>
        <Text modifiers={[font({ size: 48 })]}>📅</Text>
        <VStack alignment="leading" spacing={4}>
          <Text modifiers={[headline]}>时光簿</Text>
          <Text modifiers={[caption, foregroundStyle("secondary")]}>
            暂无事件
          </Text>
        </VStack>
      </HStack>
    );
  }

  const timeColor = props.isPast ? "#C4B5A3" : "#D97757";

  // Home screen widgets
  if (props.family === "systemSmall") {
    return (
      <VStack alignment="center" spacing={6} modifiers={[padding({ all: 16 })]}>
        {/* Emoji - 大而醒目 */}
        <Text modifiers={[font({ size: 44 })]}>
          {props.emoji}
        </Text>

        <Spacer />

        {/* 事件标题 - 精简显示 */}
        <Text modifiers={[body, foregroundStyle("primary")]}>
          {props.title.length > 6 ? props.title.substring(0, 6) + "..." : props.title}
        </Text>

        {/* 倒计时 - 强调色 */}
        <Text modifiers={[caption, foregroundStyle(timeColor)]}>
          {props.timeDisplay}
        </Text>
      </VStack>
    );
  }

  if (props.family === "systemLarge") {
    return (
      <VStack alignment="leading" spacing={16} modifiers={[padding({ all: 20 })]}>
        {/* Header */}
        <HStack>
          <Text modifiers={[caption, foregroundStyle("secondary")]}>时光簿</Text>
          <Spacer />
          {props.customCategory && (
            <Text modifiers={[caption, foregroundStyle("secondary")]}>
              {props.customCategory}
            </Text>
          )}
        </HStack>

        <Spacer />

        {/* 主要内容区 - 居中展示 */}
        <VStack alignment="center" spacing={12}>
          {/* Emoji 超大显示 */}
          <Text modifiers={[font({ size: 80 })]}>
            {props.emoji}
          </Text>

          {/* 事件标题 */}
          <Text modifiers={[font({ size: 32, weight: "medium" })]}>
            {props.title}
          </Text>

          {/* 倒计时 - 精致排版 */}
          <VStack alignment="center" spacing={4}>
            <Text modifiers={[caption, foregroundStyle("secondary")]}>
              距离这一刻
            </Text>
            <Text modifiers={[title1, foregroundStyle(timeColor)]}>
              {props.timeDisplay}
            </Text>
          </VStack>
        </VStack>

        <Spacer />
      </VStack>
    );
  }

  // systemMedium (default)
  return (
    <HStack alignment="center" spacing={12} modifiers={[padding({ all: 16 })]}>
      {/* 左侧：Emoji 装饰 */}
      <VStack alignment="center" spacing={4}>
        <Text modifiers={[font({ size: 52 })]}>
          {props.emoji}
        </Text>
      </VStack>

      {/* 右侧：事件信息 */}
      <VStack alignment="leading" spacing={4}>
        <Text modifiers={[caption, foregroundStyle("secondary")]}>
          {props.customCategory || "时光簿"}
        </Text>

        <Text modifiers={[title1]}>
          {props.title}
        </Text>

        <Spacer />

        <Text modifiers={[body, foregroundStyle(timeColor)]}>
          {props.timeDisplay}
        </Text>
      </VStack>
    </HStack>
  );
}

export const eventWidget = createWidget<EventWidgetData>("EventWidget", EventWidgetView);

// Export empty state for initialization
export const EMPTY_EVENT_DATA: EventWidgetData = {
  hasEvent: false,
  emoji: "",
  title: "",
  customCategory: "",
  timeDisplay: "",
  isPast: false,
};
