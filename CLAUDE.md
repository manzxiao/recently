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
  - @react-navigation/* (底层导航)
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
2. **所有 Tailwind 类都能正常工作** - 包括 text-*, bg-*, p-*, m-* 等
3. **使用 className prop** - 就像在 Web 上使用 Tailwind 一样

### 基础用法

```tsx
import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";

export default function MyScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      {/* 标题 - 所有 text-* 类都能用 */}
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Title
      </Text>

      {/* 副标题 */}
      <Text className="text-base text-gray-600 mb-4">
        Description text
      </Text>

      {/* 按钮 */}
      <Pressable className="bg-blue-500 active:bg-blue-700 px-6 py-3 rounded-lg">
        <Text className="text-white text-center font-semibold">
          Press Me
        </Text>
      </Pressable>

      {/* 图片 */}
      <Image
        className="w-full h-48 rounded-lg mt-4"
        source={{ uri: "https://example.com/image.jpg" }}
      />
    </View>
  );
}
```

### 支持的 Tailwind 类

| 类别 | 示例 | 状态 |
|------|------|------|
| 布局 | `flex-1`, `flex-row`, `items-center`, `justify-between` | ✅ |
| 间距 | `p-4`, `m-2`, `px-6`, `py-3`, `gap-4` | ✅ |
| 背景色 | `bg-blue-500`, `bg-red-600`, `bg-white` | ✅ |
| 文字颜色 | `text-gray-900`, `text-blue-500`, `text-white` | ✅ |
| 字体大小 | `text-xs`, `text-sm`, `text-base`, `text-xl`, `text-2xl` | ✅ |
| 字体粗细 | `font-bold`, `font-semibold`, `font-medium` | ✅ |
| 文字对齐 | `text-center`, `text-left`, `text-right` | ✅ |
| 圆角 | `rounded`, `rounded-lg`, `rounded-full` | ✅ |
| 边框 | `border`, `border-2`, `border-gray-300` | ✅ |
| 阴影 | `shadow`, `shadow-lg` | ✅ (iOS only) |
| 交互状态 | `active:bg-blue-700`, `active:opacity-80` | ✅ |

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
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
};
```

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
export default function Component({ }: ComponentProps) {
  // 3.1 Hooks
  const [state, setState] = useState();

  // 3.2 Handlers
  const handlePress = () => {};

  // 3.3 Render
  return (
    <View>
      {/* JSX */}
    </View>
  );
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

# 2. 删除并重新安装依赖
rm -rf node_modules .expo
npm install

# 3. 检查 Metro bundler 是否正常编译 CSS
```

### TypeScript 错误

```bash
# 重新生成类型
npx expo customize tsconfig.json
```

### Metro bundler 错误

```bash
# 重启 Metro
pkill -f "metro"
npm start
```

### iOS/Android 构建错误

```bash
# iOS - 清除 pod 缓存
cd ios && pod install && cd ..

# Android - 清理构建
cd android && ./gradlew clean && cd ..
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
import Constants from 'expo-constants';

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

### Examples
- 查看 `src/app/examples.tsx` 获取完整的 Tailwind 样式示例
- 查看 `NATIVEWIND_V4_GUIDE.md` 获取详细的 NativeWind 使用指南

## 🚨 Critical Rules

1. **永远不要修改 babel.config.js 和 metro.config.js** - 除非升级 NativeWind 版本
2. **使用 npx expo install** 安装新包 - 确保版本兼容性
3. **提交前测试多个平台** - iOS、Android、Web 可能有差异
4. **使用 Tailwind className** - 避免内联样式
5. **遵循 Expo Router 文件规范** - _layout.tsx, +html.tsx 等有特殊含义
6. **清除缓存是万能药** - 遇到问题先 `npx expo start --clear`

## 🔄 Recent Changes

### 2024-03 - NativeWind v4 Migration
- ✅ 从 NativeWind v5 (preview) 迁移到 v4 (stable)
- ✅ 所有 text-* Tailwind 类现在都能正常工作
- ✅ 移除了 react-native-css 依赖
- ✅ 添加了完整的样式示例页面

## 👤 Project Owner

- **GitHub**: [@manzxiao](https://github.com/manzxiao)
- **Repository**: https://github.com/manzxiao/recently.git

---

**Last Updated**: 2024-03-06
**Expo SDK**: 55.0.5
**NativeWind**: 4.2.2
**React Native**: 0.83.2
