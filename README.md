# 时光簿 Recently

> 优雅的倒计时工具，记录每一个重要时刻

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Made with Expo](https://img.shields.io/badge/Made%20with-Expo-000020.svg?style=flat&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.83-61DAFB.svg?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)

时光簿是一个注重隐私、设计精美的倒计时 App。用最简洁的方式记录生日、纪念日、考试、旅行等重要事件。

## ✨ 特色功能

### 📅 事件管理
- 创建无限个倒计时事件
- 支持每日/每周/每月/每年重复提醒
- 自定义分类和 Emoji 图标
- 置顶重要事件优先显示

### 🎨 设计美学
- 日式极简美学，灵感来源于 Wabi-Sabi（侘寂）
- 温暖舒适的米色系配色方案
- 流畅优雅的交互动画
- 精心打磨的每一个细节

### 📱 桌面小组件
- 支持小、中、大三种尺寸
- 实时倒计时显示
- 自动选择最近或置顶事件
- 一目了然的时间提醒

### 💾 数据安全
- 本地存储，完全保护隐私
- 一键备份和恢复功能
- 数据完全掌控在你手中
- 无广告、无追踪、无内购

## 🛠 技术栈

- **框架**: [Expo SDK 55](https://expo.dev/) + [React Native 0.83](https://reactnative.dev/)
- **语言**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **路由**: [Expo Router](https://docs.expo.dev/router/introduction/) (文件系统路由)
- **样式**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **状态管理**: React Hooks + AsyncStorage
- **小组件**: [expo-widgets](https://docs.expo.dev/versions/latest/sdk/widgets/)
- **图标**: [expo-symbols](https://docs.expo.dev/versions/latest/sdk/symbols/) (SF Symbols)

## 📦 项目结构

```
recently/
├── src/
│   ├── app/                    # Expo Router 路由
│   │   ├── (tabs)/            # Tab 导航页面
│   │   │   ├── index.tsx      # 主页 - 事件列表
│   │   │   ├── create.tsx     # 创建事件页面
│   │   │   └── profile.tsx    # 个人设置页面
│   │   └── _layout.tsx        # 根布局
│   ├── components/            # 可复用组件
│   ├── hooks/                 # 自定义 Hooks
│   │   └── useEvents.ts       # 事件数据管理
│   ├── services/              # 业务逻辑
│   │   ├── widget-data.ts     # 小组件数据处理
│   │   └── widget-sync.ts     # 小组件同步
│   ├── types/                 # TypeScript 类型定义
│   │   └── event.ts           # 事件类型
│   ├── utils/                 # 工具函数
│   │   ├── repeat.ts          # 重复事件计算
│   │   └── storage.ts         # 备份/恢复
│   ├── widgets/               # iOS 小组件
│   │   └── EventWidget.tsx    # 事件小组件
│   └── global.css             # Tailwind 全局样式
├── assets/                    # 静态资源
│   └── images/                # 应用图标
├── docs/                      # 文档
│   └── privacy.html           # 隐私政策页面
├── app.json                   # Expo 配置
├── eas.json                   # EAS Build 配置
└── tailwind.config.js         # Tailwind 配置
```

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- iOS Simulator (macOS) 或 Android Emulator
- Expo CLI

### 安装

```bash
# 1. 克隆仓库
git clone https://github.com/manzxiao/recently.git
cd recently

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm start
```

### 运行

```bash
# iOS 模拟器
npm run ios

# Android 模拟器
npm run android

# Web 浏览器
npm run web
```

## 📱 构建与发布

### 开发构建

```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录 Expo 账号
eas login

# 构建 iOS 开发版本
eas build --profile development --platform ios
```

### 生产构建

```bash
# iOS 生产版本
eas build --profile production --platform ios

# Android 生产版本
eas build --profile production --platform android
```

### 提交到应用商店

```bash
# 提交到 App Store
eas submit --platform ios --latest

# 提交到 Google Play
eas submit --platform android --latest
```

详细发布流程请查看 [APP_STORE_RELEASE.md](./APP_STORE_RELEASE.md)

## 🎨 设计系统

时光簿采用日式极简主义设计风格，完整的设计规范请查看 [CLAUDE.md](./CLAUDE.md) 中的设计系统章节。

### 配色方案

```
主背景：#FAF8F5  (温暖米白)
卡片背景：#FFFFFF (纯白)
主文字：#3A3530  (深棕)
次要文字：#9B8F7F (中等棕灰)
强调色：#D97757  (柔和橙)
```

### 设计原则

- 超细字重的大标题（font-weight: 200-300）
- 微妙的阴影效果（opacity: 0.04）
- 大圆角设计（rounded-3xl: 24px）
- 温暖柔和的配色
- 流畅的动画过渡

## 🔐 隐私保护

时光簿非常重视用户隐私：

- ✅ 所有数据仅存储在设备本地
- ✅ 不收集任何个人信息
- ✅ 不使用任何追踪或分析工具
- ✅ 无广告、无第三方 SDK
- ✅ 开源代码，完全透明

完整隐私政策：[https://manzxiao.github.io/recently/docs/privacy.html](https://manzxiao.github.io/recently/docs/privacy.html)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 测试相关
chore: 构建/工具配置
```

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Expo](https://expo.dev/) - 优秀的 React Native 开发框架
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [SF Symbols](https://developer.apple.com/sf-symbols/) - Apple 官方图标库
- 所有贡献者和使用者

## 📞 联系方式

- **GitHub Issues**: [https://github.com/manzxiao/recently/issues](https://github.com/manzxiao/recently/issues)
- **隐私政策**: [https://manzxiao.github.io/recently/docs/privacy.html](https://manzxiao.github.io/recently/docs/privacy.html)

---

**用简洁的方式，记录美好的时光** ✨
