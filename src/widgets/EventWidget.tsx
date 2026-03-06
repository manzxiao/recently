import { createWidget, type WidgetBase } from "expo-widgets";
import { Text, VStack, HStack, Spacer } from "@expo/ui/swift-ui";
import { foregroundStyle, font, padding } from "@expo/ui/swift-ui/modifiers";
import type { EventWidgetData } from "../services/widget-data";

function EventWidgetView(props: WidgetBase<EventWidgetData>) {
  "widget";

  const headline = font({ size: 17, weight: "semibold" });
  const title1 = font({ size: 28, weight: "bold" });
  const title2 = font({ size: 22, weight: "semibold" });
  const body = font({ size: 14 });
  const caption = font({ size: 12 });

  // Empty state
  if (!props.hasEvent) {
    if (props.family === "systemSmall") {
      return (
        <VStack spacing={4} modifiers={[padding({ all: 12 })]}>
          <Text modifiers={[headline]}>时光簿</Text>
          <Text modifiers={[caption, foregroundStyle("secondary")]}>暂无事件</Text>
        </VStack>
      );
    }

    return (
      <VStack spacing={4} modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[headline]}>时光簿</Text>
        <Text modifiers={[body, foregroundStyle("secondary")]}>点击创建你的第一个记忆</Text>
      </VStack>
    );
  }

  const timeColor = props.isPast ? "#C4B5A3" : "#D97757";

  // Home screen widgets
  if (props.family === "systemSmall") {
    return (
      <VStack alignment="leading" spacing={4} modifiers={[padding({ all: 12 })]}>
        {/* Time counter */}
        <Text modifiers={[font({ size: 32, weight: "bold" }), foregroundStyle(timeColor)]}>{props.timeValue}</Text>
        <Text modifiers={[caption, foregroundStyle("secondary")]}>{props.timeUnit}</Text>

        <Spacer />

        {/* Event info */}
        <Text modifiers={[body]}>{props.emoji}</Text>
        <Text modifiers={[caption, foregroundStyle("secondary")]}>{props.title}</Text>
      </VStack>
    );
  }

  if (props.family === "systemLarge") {
    return (
      <VStack alignment="leading" spacing={12} modifiers={[padding({ all: 16 })]}>
        {/* Header */}
        <HStack>
          <Text modifiers={[caption, foregroundStyle("secondary")]}>时光簿</Text>
          <Spacer />
          <Text modifiers={[caption, foregroundStyle("secondary")]}>下一个事件</Text>
        </HStack>

        {/* Time counter - large */}
        <VStack alignment="center" spacing={4}>
          <Text modifiers={[font({ size: 72, weight: "bold" }), foregroundStyle(timeColor)]}>{props.timeValue}</Text>
          <Text modifiers={[title1, foregroundStyle("secondary")]}>{props.timeUnit}</Text>
        </VStack>

        <Spacer />

        {/* Event details */}
        <VStack alignment="center" spacing={4}>
          <Text modifiers={[font({ size: 40 })]}>
            {props.emoji}
          </Text>
          <Text modifiers={[title1]}>{props.title}</Text>
          {props.customCategory && <Text modifiers={[body, foregroundStyle("secondary")]}>{props.customCategory}</Text>}
        </VStack>
      </VStack>
    );
  }

  // systemMedium (default)
  return (
    <VStack alignment="leading" spacing={6} modifiers={[padding({ all: 12 })]}>
      {/* Header */}
      <HStack>
        <Text modifiers={[caption, foregroundStyle("secondary")]}>时光簿</Text>
        <Spacer />
        <Text modifiers={[caption, foregroundStyle(timeColor)]}>{props.timeUnit}</Text>
      </HStack>

      {/* Time counter */}
      <Text modifiers={[font({ size: 48, weight: "bold" }), foregroundStyle(timeColor)]}>{props.timeValue}</Text>

      <Spacer />

      {/* Event info */}
      <HStack spacing={4}>
        <Text modifiers={[title2]}>{props.emoji}</Text>
        <Text modifiers={[headline]}>{props.title}</Text>
      </HStack>
      {props.customCategory && <Text modifiers={[caption, foregroundStyle("secondary")]}>{props.customCategory}</Text>}
    </VStack>
  );
}

export const eventWidget = createWidget<EventWidgetData>("EventWidget", EventWidgetView);

// Export empty state for initialization
export const EMPTY_EVENT_DATA: EventWidgetData = {
  hasEvent: false,
  emoji: "",
  title: "",
  customCategory: "",
  timeValue: "",
  timeUnit: "",
  isPast: false,
};
