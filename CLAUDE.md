# Recently - Project Guide

## 📱 Project Overview

**Recently** is a React Native mobile application built with Expo, featuring file-based routing with Expo Router and styled with NativeWind v4 (Tailwind CSS for React Native).

- **Bundle ID**: `com.manzxiao.recently`
- **Version**: 1.0.0
- **Platforms**: iOS, Android, Web
- **EAS Project ID**: `2b20d716-390c-41dc-9e4b-13e71093cb3a`

## 🛠 Tech Stack

### Core Framework

- **Expo SDK**: 55.0.5
- **React**: 19.2.0
- **React Native**: 0.83.2
- **TypeScript**: 5.9.2
- **Expo Router**: File-based routing with typed routes

### Styling

- **NativeWind**: 4.2.2 (stable) - Tailwind CSS for React Native
- **Tailwind CSS**: 3.4.17
- **Utility Libraries**: clsx, tailwind-merge

### Key Libraries

- **Navigation**:
  - Expo Router (file-based)
  - @react-navigation/\* (底层导航)
- **Animations**: react-native-reanimated 4.2.1
- **Images**: expo-image
- **Icons**: expo-symbols (SF Symbols)
- **Background Tasks**: expo-background-task
- **Glass Effect**: expo-glass-effect

### Development Tools

- **React Compiler**: Enabled (experimental)
- **Typed Routes**: Enabled
- **Dev Client**: expo-dev-client

## 📁 Project Structure

```
recently/
├── src/
│   ├── app/                    # Expo Router 路由文件
│   │   ├── _layout.tsx         # 根布局（导入 global.css）
│   │   ├── index.tsx           # 主页
│   │   └── examples.tsx        # Tailwind 样式示例
│   └── global.css              # Tailwind 全局样式
│
├── assets/
│   ├── images/                 # 图片资源
│   └── expo.icon/              # 应用图标
│
├── .agents/skills/             # Expo 技能库
├── .claude/skills/             # Claude 技能（符号链接）
│
├── babel.config.js             # Babel 配置（NativeWind preset）
├── metro.config.js             # Metro bundler 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 配置
├── app.json                    # Expo 配置
├── eas.json                    # EAS Build 配置
└── package.json                # 依赖配置
```

## 🎨 NativeWind v4 使用指南

### ✅ 核心原则

1. **直接使用 React Native 组件** - 不需要包装组件
2. **所有 Tailwind 类都能正常工作** - 包括 text-_, bg-_, p-_, m-_ 等
3. **使用 className prop** - 就像在 Web 上使用 Tailwind 一样

### 基础用法

```tsx
import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";

export default function MyScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      {/* 标题 - 所有 text-* 类都能用 */}
      <Text className="text-2xl font-bold text-gray-900 mb-4">Title</Text>

      {/* 副标题 */}
      <Text className="text-base text-gray-600 mb-4">Description text</Text>

      {/* 按钮 */}
      <Pressable className="bg-blue-500 active:bg-blue-700 px-6 py-3 rounded-lg">
        <Text className="text-white text-center font-semibold">Press Me</Text>
      </Pressable>

      {/* 图片 */}
      <Image className="w-full h-48 rounded-lg mt-4" source={{ uri: "https://example.com/image.jpg" }} />
    </View>
  );
}
```

### 支持的 Tailwind 类

| 类别     | 示例                                                     | 状态          |
| -------- | -------------------------------------------------------- | ------------- |
| 布局     | `flex-1`, `flex-row`, `items-center`, `justify-between`  | ✅            |
| 间距     | `p-4`, `m-2`, `px-6`, `py-3`, `gap-4`                    | ✅            |
| 背景色   | `bg-blue-500`, `bg-red-600`, `bg-white`                  | ✅            |
| 文字颜色 | `text-gray-900`, `text-blue-500`, `text-white`           | ✅            |
| 字体大小 | `text-xs`, `text-sm`, `text-base`, `text-xl`, `text-2xl` | ✅            |
| 字体粗细 | `font-bold`, `font-semibold`, `font-medium`              | ✅            |
| 文字对齐 | `text-center`, `text-left`, `text-right`                 | ✅            |
| 圆角     | `rounded`, `rounded-lg`, `rounded-full`                  | ✅            |
| 边框     | `border`, `border-2`, `border-gray-300`                  | ✅            |
| 阴影     | `shadow`, `shadow-lg`                                    | ✅ (iOS only) |
| 交互状态 | `active:bg-blue-700`, `active:opacity-80`                | ✅            |

### ScrollView 注意事项

```tsx
// ❌ contentContainerClassName 不支持
<ScrollView contentContainerClassName="p-4">

// ✅ 使用 contentContainerStyle
<ScrollView contentContainerStyle={{ padding: 16 }}>

// ✅ 或者包裹一层 View
<ScrollView className="flex-1">
  <View className="p-4">
    {/* content */}
  </View>
</ScrollView>
```

### 自定义主题

在 `tailwind.config.js` 中扩展主题：

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
    },
  },
};
```

## 🎨 Design System - "时光簿"设计规范

**审美方向**: 日式极简主义 + 温暖优雅

### ⚠️ **重要：所有新增功能必须严格遵循此设计系统**

后续添加任何新页面、组件或功能时，必须保持与现有设计风格的一致性。这不是可选的建议，而是强制性要求。

### 🎨 配色方案

**主色调**：温暖米色系 + 柔和橙色强调

```tsx
// 背景色
bg-[#FAF8F5]       // 主背景 - 温暖的米白色
bg-white           // 卡片背景 - 纯白

// 文字颜色
text-[#3A3530]     // 主文字 - 深棕色
text-[#9B8F7F]     // 次要文字 - 中等棕灰
text-[#C4B5A3]     // 辅助文字 - 浅棕灰
text-[#D4C4B0]     // 最浅文字 - 装饰性

// 强调色
text-[#D97757]     // 强调色 - 柔和橙色（用于重要数字、选中状态）
bg-[#D97757]       // 按钮、高亮

// 分隔线和边框
border-[#E8E3DB]   // 边框、分隔线
bg-[#E8E3DB]       // 次要按钮背景
```

**❌ 禁止使用**：
- 鲜艳的纯色（蓝色、绿色、紫色等）
- 高饱和度的颜色
- 纯黑 (#000) 或纯灰 (#888)

### 📐 排版系统

**标题层级**：

```tsx
// 页面主标题（超大、超细）
text-[42px]        // 字号
fontWeight: "300"  // 超细字重
letterSpacing: -1  // 紧凑间距

// 卡片内大数字（强调剩余天数）
text-[56px]        // 字号
fontWeight: "200"  // 极细字重
letterSpacing: -2  // 非常紧凑

// 事件标题
text-[22px]        // 字号
fontWeight: "500"  // 中等字重

// 正文
text-[15px] / text-[14px]
fontWeight: "400"  // 常规字重

// 小标签
text-[13px] / text-[11px]
fontWeight: "400" / "500"
letterSpacing: 0.5 / 2  // 稍宽松
```

**关键原则**：
- ✅ 大标题使用超细字重（200-300），营造轻盈感
- ✅ 数字使用极细字重 + 负字间距，增强视觉冲击
- ✅ 正文保持 400 字重的可读性
- ❌ 避免使用 bold (700) 或更粗的字重

### 📦 间距系统

**内边距 (Padding)**：

```tsx
px-6   // 页面左右边距（24px）
py-4   // 卡片垂直内边距
p-6    // 卡片内边距

pt-8   // 区块顶部间距
pb-8   // 区块底部间距
```

**外边距 (Margin)**：

```tsx
mb-4   // 卡片之间间距
mb-2   // 文本行间距
mb-3   // 小区块间距
mt-2   // 顶部小间距
```

**安全区域**：

```tsx
// 总是使用 useSafeAreaInsets hook
import { useSafeAreaInsets } from "react-native-safe-area-context";

const insets = useSafeAreaInsets();
style={{ paddingTop: insets.top + 20 }}  // 顶部安全区域 + 额外 20px
```

### 🔘 圆角系统

```tsx
rounded-3xl   // 大卡片 (24px) - 主要容器
rounded-2xl   // 中等元素 (16px) - 输入框、按钮
rounded-full  // 圆形元素 - 头像、图标容器
```

**规则**：
- ✅ 卡片统一使用 `rounded-3xl`
- ✅ 按钮、输入框使用 `rounded-2xl`
- ❌ 不要使用 `rounded-lg` 或更小的圆角

### 🌑 阴影系统

**微妙的阴影**（用于卡片）：

```tsx
style={{
  shadowColor: "#3A3530",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.04,  // 非常轻微
  shadowRadius: 12,
  elevation: 2,         // Android
}}
```

**中等阴影**（用于主按钮）：

```tsx
style={{
  shadowColor: "#D97757",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 4,
}}
```

**规则**：
- ✅ 阴影必须非常轻微，不抢眼
- ✅ 卡片使用 0.04 透明度
- ❌ 禁止使用深色或明显的阴影

### 🎭 交互状态

**按压效果**：

```tsx
// 简单的透明度变化
className="active:opacity-80"

// 或背景色微调
className="active:bg-blue-700"  // 仅当有强调色按钮时
```

**SF Symbols 动画**：

```tsx
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
```

### 🧩 组件样式规范

#### Tab Bar

```tsx
tabBarStyle: {
  backgroundColor: "#FAF8F5",  // 与主背景一致
  borderTopWidth: 1,
  borderTopColor: "#E8E3DB",   // 细微分隔线
  height: 88,
  paddingTop: 8,
  paddingBottom: 34,           // 适配 iPhone Home Indicator
},
tabBarActiveTintColor: "#D97757",    // 选中：橙色
tabBarInactiveTintColor: "#9B8F7F",  // 未选中：棕灰
```

#### 输入框

```tsx
<TextInput
  className="bg-white rounded-2xl px-5 py-4 text-[#3A3530] text-[17px]"
  placeholderTextColor="#C4B5A3"
  style={{
    fontWeight: "400",
    shadowColor: "#3A3530",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  }}
/>
```

#### 主按钮

```tsx
<Pressable
  className="bg-[#D97757] rounded-2xl py-5 items-center active:opacity-90"
  style={{
    shadowColor: "#D97757",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  }}
>
  <Text className="text-white text-[17px]" style={{ fontWeight: "600" }}>
    创建记忆
  </Text>
</Pressable>
```

#### 次要按钮

```tsx
<Pressable
  className="bg-[#E8E3DB] rounded-full px-4 py-3"
  style={{ shadowOpacity: 0.03 }}
>
  <Text className="text-[#3A3530] text-[14px]" style={{ fontWeight: "500" }}>
    类别
  </Text>
</Pressable>
```

### 📋 布局规范

**页面结构**：

```tsx
<View className="flex-1 bg-[#FAF8F5]">
  {/* Header - 总是使用安全区域 */}
  <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-8">
    <Text className="text-[#3A3530] text-[42px]" style={{ fontWeight: "300" }}>
      标题
    </Text>
  </View>

  {/* Content - 可滚动 */}
  <ScrollView className="flex-1 px-6">
    {/* 内容 */}
  </ScrollView>
</View>
```

**卡片结构**：

```tsx
<Pressable
  className="mb-4 bg-white rounded-3xl p-6 active:opacity-80"
  style={{ /* 阴影样式 */ }}
>
  {/* 垂直布局，信息从上到下 */}
</Pressable>
```

### 🎯 图标使用

**使用 SF Symbols**（expo-symbols）：

```tsx
import { SymbolView } from "expo-symbols";

<SymbolView
  name="calendar"           // SF Symbol 名称
  size={24}                 // 统一尺寸：24 或 16
  type="hierarchical"       // 统一使用 hierarchical
  tintColor={color}         // 使用设计系统颜色
/>
```

**常用图标**：
- `calendar` - 事件/日历
- `plus.circle` - 创建
- `person.circle` - 个人
- `gift` - 生日
- `pencil` - 编辑/考试
- `heart` - 纪念日
- `star` - 其他/收藏

### ❌ 禁止事项

1. **禁止偏离配色方案**：不要引入新的颜色，必须使用定义的色值
2. **禁止使用粗字重**：标题最多 500，不要用 600-900
3. **禁止小圆角**：统一 `rounded-2xl` 或 `rounded-3xl`
4. **禁止深色阴影**：阴影透明度不超过 0.3
5. **禁止鲜艳颜色**：保持温暖、柔和的色调
6. **禁止复杂布局**：保持简洁、垂直布局优先
7. **禁止跳过安全区域**：总是使用 `useSafeAreaInsets`

### ✅ 开发检查清单

新增功能时，必须检查：

- [ ] 使用 `bg-[#FAF8F5]` 作为页面背景
- [ ] 标题使用 `text-[42px]` + `fontWeight: "300"`
- [ ] 强调色使用 `#D97757`（橙色）
- [ ] 卡片使用 `rounded-3xl` + 微妙阴影
- [ ] 按钮使用 `rounded-2xl`
- [ ] 文字颜色在定义的色阶中（`#3A3530` / `#9B8F7F` / `#C4B5A3`）
- [ ] 使用 SF Symbols 图标（`expo-symbols`）
- [ ] 添加了安全区域处理（`useSafeAreaInsets`）
- [ ] 交互状态使用 `active:opacity-80`
- [ ] 间距使用定义的系统（`px-6`, `mb-4` 等）

### 📖 参考实现

查看以下文件了解标准实现：

- `src/app/(tabs)/index.tsx` - 列表页面
- `src/app/(tabs)/create.tsx` - 表单页面
- `src/app/(tabs)/profile.tsx` - 个人信息页面
- `src/app/(tabs)/_layout.tsx` - Tab 导航

**记住**：一致性 > 创新。保持设计语言统一比引入新想法更重要。

## 🚀 Development Workflow

### 启动开发服务器

```bash
# 标准启动
npm start

# 直接在 iOS 模拟器启动
npm run ios

# 直接在 Android 模拟器启动
npm run android

# Web 开发
npm run web

# 清除缓存启动（样式问题时使用）
npx expo start --clear
```

### 常见开发任务

#### 1. 创建新页面

在 `src/app/` 下创建新文件：

```tsx
// src/app/profile.tsx
import { View, Text } from "react-native";

export default function Profile() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Profile</Text>
    </View>
  );
}
```

路由自动生成：`/profile`

#### 2. 嵌套路由

创建文件夹结构：

```
src/app/
  settings/
    _layout.tsx       # 设置布局
    index.tsx         # /settings
    account.tsx       # /settings/account
```

#### 3. 动态路由

使用方括号语法：

```tsx
// src/app/user/[id].tsx
import { useLocalSearchParams } from "expo-router";

export default function UserDetail() {
  const { id } = useLocalSearchParams();
  return <Text>User ID: {id}</Text>;
}
```

访问：`/user/123`

#### 4. 添加新依赖

```bash
# 使用 Expo 安装（推荐）
npx expo install package-name

# 或使用 npm
npm install package-name
```

## 📝 Coding Standards

### TypeScript

- ✅ 使用 TypeScript
- ✅ 启用 strict 模式
- ✅ 为组件 props 定义类型
- ✅ 使用 Expo Router 的类型化路由

```tsx
// 好的示例
interface ProfileProps {
  userId: string;
  onPress?: () => void;
}

export default function Profile({ userId, onPress }: ProfileProps) {
  // ...
}
```

### 样式规范

- ✅ **优先使用 Tailwind className** - 除非需要动态样式
- ✅ **使用 clsx 或 tailwind-merge** - 处理条件类名
- ❌ **避免混用 StyleSheet 和 className** - 保持一致性

```tsx
import { twMerge } from "tailwind-merge";

// 好的示例
const buttonClass = twMerge(
  "px-6 py-3 rounded-lg",
  isActive ? "bg-blue-500" : "bg-gray-300"
);

<Pressable className={buttonClass}>
```

### 组件组织

```tsx
// 1. Imports
import { View, Text } from "react-native";
import { useState } from "react";

// 2. Types
interface ComponentProps {
  // ...
}

// 3. Component
export default function Component({}: ComponentProps) {
  // 3.1 Hooks
  const [state, setState] = useState();

  // 3.2 Handlers
  const handlePress = () => {};

  // 3.3 Render
  return <View>{/* JSX */}</View>;
}
```

### 文件命名

- 组件文件：PascalCase - `ProfileScreen.tsx`
- 工具文件：camelCase - `formatDate.ts`
- 常量文件：camelCase - `colors.ts`
- 路由文件：kebab-case - `user-settings.tsx` 或 `_layout.tsx`

## 🔧 Build & Deployment

### EAS Build

```bash
# 开发构建
eas build --profile development --platform ios
eas build --profile development --platform android

# 预览构建
eas build --profile preview --platform ios

# 生产构建
eas build --profile production --platform ios
eas build --profile production --platform android
```

### EAS Update

```bash
# 发布 OTA 更新
eas update --branch production --message "Bug fixes"
```

## 🐛 Troubleshooting

### 样式不生效

```bash
# 1. 清除所有缓存
npx expo start --clear

```

### Metro bundler 错误

```bash
# 重启 Metro
pkill -f "metro"
npm start
```

## 📦 Important Files

### 配置文件说明

- **app.json** - Expo 项目配置，包括应用名、Bundle ID、图标等
- **eas.json** - EAS Build/Update 配置
- **babel.config.js** - 包含 NativeWind preset，不要修改
- **metro.config.js** - Metro bundler 配置，包含 NativeWind CSS 处理
- **tailwind.config.js** - Tailwind CSS 配置，可以扩展主题
- **tsconfig.json** - TypeScript 配置，使用路径别名 `@/*`

### 环境变量

在项目根目录创建 `.env` 文件：

```env
API_URL=https://api.example.com
```

在代码中使用：

```tsx
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## 🎯 Available Skills

项目包含以下 Expo 技能（在 `.agents/skills/` 中）：

- `building-native-ui` - 构建原生 UI 组件
- `expo-api-routes` - Expo API 路由
- `expo-cicd-workflows` - CI/CD 工作流
- `expo-deployment` - 部署指南
- `expo-dev-client` - 开发客户端
- `native-data-fetching` - 数据获取
- `upgrading-expo` - 升级 Expo
- `use-dom` - 使用 DOM 组件

## 📚 Resources

### Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind v4](https://www.nativewind.dev/docs)
- [Tailwind CSS v3](https://v3.tailwindcss.com/)
- [React Native](https://reactnative.dev/)

## 🚨 Critical Rules

1. **永远不要修改 babel.config.js 和 metro.config.js** - 除非升级 NativeWind 版本
2. **使用 npx expo install** 安装新包 - 确保版本兼容性
3. **提交前测试多个平台** - iOS、Android、Web 可能有差异
4. **使用 Tailwind className** - 避免内联样式
5. **遵循 Expo Router 文件规范** - \_layout.tsx, +html.tsx 等有特殊含义
6. **清除缓存是万能药** - 遇到问题先 `npx expo start --clear`
