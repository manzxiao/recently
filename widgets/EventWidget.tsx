import { createWidget, type WidgetBase } from "expo-widgets";
import { Text, VStack, HStack, Spacer } from "@expo/ui/swift-ui";
import { foregroundStyle, font, padding } from "@expo/ui/swift-ui/modifiers";
import type { EventWidgetData } from "../src/services/widget-data";

function EventWidgetView(props: WidgetBase<EventWidgetData>) {
  "widget";

  const headline = font({ size: 17, weight: "semibold" });
  const title1 = font({ size: 28, weight: "bold" });
  const title2 = font({ size: 22, weight: "semibold" });
  const body = font({ size: 14 });
  const caption = font({ size: 12 });
  const caption2 = font({ size: 11 });
  const largeNumber = font({ size: 48, weight: "ultraLight" });

  // Empty state
  if (!props.hasEvent) {
    if (props.family === "accessoryInline") {
      return <Text>还没有事件</Text>;
    }

    if (props.family === "accessoryCircular") {
      return (
        <VStack spacing={1}>
          <Text modifiers={[caption2]}>--</Text>
          <Text modifiers={[caption2]}>无事件</Text>
        </VStack>
      );
    }

    if (props.family === "accessoryRectangular") {
      return (
        <VStack alignment="leading" spacing={2}>
          <Text modifiers={[caption]}>还没有事件</Text>
          <Text modifiers={[caption2, foregroundStyle("secondary")]}>创建第一个记忆</Text>
        </VStack>
      );
    }

    return (
      <VStack spacing={4} modifiers={[padding({ all: 16 })]}>
        <Text modifiers={[headline]}>还没有事件</Text>
        <Text modifiers={[caption, foregroundStyle("secondary")]}>点击创建你的第一个记忆</Text>
      </VStack>
    );
  }

  const timeColor = props.isPast ? "#C4B5A3" : "#D97757";

  // Lock screen accessory widgets
  if (props.family === "accessoryInline") {
    return (
      <HStack spacing={4}>
        <Text>{props.emoji}</Text>
        <Text>
          {props.title} {props.timeValue}
          {props.timeUnit}
        </Text>
      </HStack>
    );
  }

  if (props.family === "accessoryCircular") {
    return (
      <VStack spacing={1}>
        <Text modifiers={[body]}>{props.emoji}</Text>
        <Text modifiers={[headline, foregroundStyle(timeColor)]}>{props.timeValue}</Text>
        <Text modifiers={[caption2, foregroundStyle("secondary")]}>{props.timeUnit}</Text>
      </VStack>
    );
  }

  if (props.family === "accessoryRectangular") {
    return (
      <VStack alignment="leading" spacing={2}>
        <Text modifiers={[body]}>
          {props.emoji} {props.title}
        </Text>
        <HStack spacing={4}>
          <Text modifiers={[headline, foregroundStyle(timeColor)]}>{props.timeValue}</Text>
          <Text modifiers={[caption, foregroundStyle("secondary")]}>{props.timeUnit}</Text>
        </HStack>
        {props.customCategory && (
          <Text modifiers={[caption2, foregroundStyle("secondary")]}>{props.customCategory}</Text>
        )}
      </VStack>
    );
  }

  // Home screen widgets
  if (props.family === "systemSmall") {
    return (
      <VStack alignment="leading" spacing={6} modifiers={[padding({ all: 12 })]}>
        {/* Time counter */}
        <VStack alignment="leading" spacing={2}>
          <Text modifiers={[largeNumber, foregroundStyle(timeColor)]}>{props.timeValue}</Text>
          <Text modifiers={[body, foregroundStyle("secondary")]}>{props.timeUnit}</Text>
        </VStack>

        <Spacer />

        {/* Event info */}
        <VStack alignment="leading" spacing={2}>
          <Text modifiers={[title2]}>
            {props.emoji} {props.title}
          </Text>
          {props.customCategory && <Text modifiers={[caption, foregroundStyle("secondary")]}>{props.customCategory}</Text>}
        </VStack>
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
          <Text modifiers={[font({ size: 64, weight: "ultraLight" }), foregroundStyle(timeColor)]}>{props.timeValue}</Text>
          <Text modifiers={[title1, foregroundStyle("secondary")]}>{props.timeUnit}</Text>
        </VStack>

        <Spacer />

        {/* Event details */}
        <VStack alignment="center" spacing={4}>
          <Text modifiers={[font({ size: 32 })]}>
            {props.emoji} {props.title}
          </Text>
          {props.customCategory && <Text modifiers={[body, foregroundStyle("secondary")]}>{props.customCategory}</Text>}
        </VStack>
      </VStack>
    );
  }

  // systemMedium (default)
  return (
    <VStack alignment="leading" spacing={8} modifiers={[padding({ all: 12 })]}>
      {/* Time counter */}
      <HStack alignment="bottom" spacing={8}>
        <Text modifiers={[font({ size: 52, weight: "ultraLight" }), foregroundStyle(timeColor)]}>{props.timeValue}</Text>
        <Text modifiers={[title2, foregroundStyle("secondary")]}>{props.timeUnit}</Text>
      </HStack>

      {/* Event info */}
      <VStack alignment="leading" spacing={2}>
        <Text modifiers={[title1]}>
          {props.emoji} {props.title}
        </Text>
        {props.customCategory && <Text modifiers={[caption, foregroundStyle("secondary")]}>{props.customCategory}</Text>}
      </VStack>
    </VStack>
  );
}

export const eventWidget = createWidget<EventWidgetData>("EventWidget", EventWidgetView);
