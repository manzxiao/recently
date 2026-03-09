import { HStack, Spacer, Text, VStack } from "@expo/ui/swift-ui";
import { font, foregroundStyle, padding } from "@expo/ui/swift-ui/modifiers";
import { createWidget, type WidgetBase } from "expo-widgets";
import type { EventWidgetData } from "../services/widget-data";

function EventWidgetView(props: WidgetBase<EventWidgetData>) {
  "widget";

  const titleFont = font({ size: 15, weight: "medium" });
  const largeNumber = font({ size: 100, weight: "semibold" });
  const mediumNumber = font({ size: 72, weight: "semibold" });
  const smallNumber = font({ size: 80, weight: "semibold" });
  const unitFont = font({ size: 13, weight: "regular" });
  const dateFont = font({ size: 11, weight: "regular" });

  // Empty state - clean and minimal
  if (!props.hasEvent) {
    if (props.family === "systemSmall") {
      return (
        <VStack alignment="center" spacing={8} modifiers={[padding({ all: 12 })]}>
          <Spacer />
          <Text modifiers={[font({ size: 48 })]}>📅</Text>
          <Text modifiers={[unitFont, foregroundStyle("secondary")]}>
            暂无事件
          </Text>
          <Spacer />
        </VStack>
      );
    }

    if (props.family === "systemLarge") {
      return (
        <VStack alignment="center" spacing={12} modifiers={[padding({ all: 16 })]}>
          <Spacer />
          <Text modifiers={[font({ size: 72 })]}>📅</Text>
          <VStack alignment="center" spacing={6}>
            <Text modifiers={[font({ size: 24, weight: "semibold" })]}>时光簿</Text>
            <Text modifiers={[unitFont, foregroundStyle("secondary")]}>
              点击创建你的第一个记忆
            </Text>
          </VStack>
          <Spacer />
        </VStack>
      );
    }

    // systemMedium empty state
    return (
      <HStack alignment="center" spacing={16} modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[font({ size: 56 })]}>📅</Text>
        <VStack alignment="leading" spacing={4}>
          <Text modifiers={[titleFont]}>时光簿</Text>
          <Text modifiers={[unitFont, foregroundStyle("secondary")]}>
            暂无事件
          </Text>
        </VStack>
      </HStack>
    );
  }

  // Vibrant color palette based on reference design
  const numberColors = ["#8B5CF6", "#10B981", "#EC4899", "#F59E0B", "#3B82F6"];
  const colorIndex = props.title.length % numberColors.length;
  const numberColor = numberColors[colorIndex];

  // Home screen widgets
  if (props.family === "systemSmall") {
    return (
      <VStack alignment="leading" spacing={2} modifiers={[padding({ all: 12 })]}>
        {/* Title at top */}
        <Text modifiers={[titleFont, foregroundStyle("primary")]}>
          {props.title}
        </Text>


        {/* Large countdown number - vibrant and bold */}
        <VStack alignment="center" spacing={2}>
          <Text modifiers={[smallNumber, foregroundStyle(numberColor)]}>
            {props.countdownNumber}
          </Text>
          <Text modifiers={[unitFont, foregroundStyle("secondary")]}>
            {props.countdownUnit}
          </Text>
        </VStack>

        {/* Date at bottom */}
        <Text modifiers={[dateFont, foregroundStyle("tertiary")]}>
          {props.dateText}
        </Text>
      </VStack>
    );
  }

  if (props.family === "systemLarge") {
    return (
      <VStack alignment="leading" spacing={8} modifiers={[padding({ all: 16 })]}>
        {/* Title at top */}
        <Text modifiers={[titleFont, foregroundStyle("primary")]}>
          {props.title}
        </Text>


        {/* Center: Large countdown number */}
        <VStack alignment="center" spacing={4}>
          <Text modifiers={[largeNumber, foregroundStyle(numberColor)]}>
            {props.countdownNumber}
          </Text>
          <Text modifiers={[unitFont, foregroundStyle("secondary")]}>
            {props.countdownUnit}
          </Text>
        </VStack>

        {/* Bottom: Date */}
        <Text modifiers={[dateFont, foregroundStyle("tertiary")]}>
          {props.dateText}
        </Text>
      </VStack>
    );
  }

  // systemMedium (default)
  return (
    <HStack alignment="center" spacing={0} modifiers={[padding({ all: 12 })]}>
      {/* 左侧：标题和描述 */}
      <VStack alignment="leading" spacing={4}>
        <Text modifiers={[titleFont, foregroundStyle("primary")]}>
          {props.title}
        </Text>

        <Text modifiers={[unitFont, foregroundStyle("secondary")]}>
          {props.timeDisplay}
        </Text>

        <Spacer />

        <Text modifiers={[dateFont, foregroundStyle("tertiary")]}>
          {props.dateText}
        </Text>
      </VStack>

      <Spacer />

      {/* 右侧：大号倒计时数字 */}
      <VStack alignment="center" spacing={0}>
        <Text modifiers={[mediumNumber, foregroundStyle(numberColor)]}>
          {props.countdownNumber}
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
  countdownNumber: "",
  countdownUnit: "",
  dateText: "",
  isPast: false,
};
