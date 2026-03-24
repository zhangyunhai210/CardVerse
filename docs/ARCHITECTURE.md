# CardVerse 跨端前端工程架构

本文档说明 **Expo SDK 52 + React Native + Web** 下的运行时、目录结构与数据流。**逐文件清单**见 [MODULES.md](./MODULES.md)；**环境变量与构建配置**见 [CONFIGURATION.md](./CONFIGURATION.md)。

## 技术栈（当前实现）

| 层级 | 选型 |
|------|------|
| 运行时 | Expo SDK 52 |
| 路由 | `expo-router`（`app/` 文件路由） |
| UI | React Native 组件 + `react-native-web`（Web） |
| 状态 | Zustand（`useCardStore`、`useUiStore`） |
| 本地存储 | `expo-sqlite` |
| 定位 | `expo-location` |
| 外链 | `expo-linking` |
| Web 3D | `three`、`@react-three/fiber`、`@react-three/drei` |
| OCR（Web） | `tesseract.js`（动态 `import()`） |
| 测试 | Vitest（`tests/**/*.test.ts`） |

## 目录总览（与仓库一致）

```
CardVerse/
├── app.json
├── app/                           # Expo Router：仅组合路由
│   ├── _layout.tsx                # 根 Stack + 启动 bootstrap
│   ├── (tabs)/
│   │   ├── _layout.tsx            # 底部 Tab
│   │   ├── index.tsx              # → HomeScreen
│   │   ├── gallery.tsx            # → GalleryScreen
│   │   └── settings.tsx           # → SettingsScreen
│   └── card/
│       └── [id].tsx               # → CardDetailScreen
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js                # Expo Metro + @ 别名
├── vitest.config.ts
├── expo-env.d.ts
├── README.md
├── assets/
│   ├── fonts/
│   ├── images/
│   ├── textures/
│   └── icons/
├── src/
│   ├── bootstrap.ts               # 初始化 DB + 注入名片列表
│   ├── config/
│   │   ├── env.ts
│   │   └── mapboxConfig.ts
│   ├── components/
│   │   ├── Card/
│   │   │   ├── CardFront.tsx
│   │   │   ├── CardBack.tsx
│   │   │   └── Card3DNode.tsx     # Web 长廊 3D 节点
│   │   ├── MapSticker.tsx
│   │   ├── FloatingMagnifier.tsx
│   │   ├── DistanceBadge.tsx
│   │   └── Header.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── GalleryScreen.tsx      # Web 三屏；原生横向列表
│   │   ├── CardDetailScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── navigation/
│   │   ├── AppNavigator.ts        # useRouter 封装
│   │   └── MapLauncher.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── cardSlice.ts           # 类型
│   │   ├── uiSlice.ts             # 类型与默认值
│   │   ├── useCardStore.ts
│   │   └── useUiStore.ts
│   ├── services/
│   │   ├── geocodingService.ts
│   │   ├── locationService.ts
│   │   └── ocrService.ts
│   ├── hooks/
│   │   ├── useDeviceOrientation.ts
│   │   ├── useDistanceCalculator.ts
│   │   └── useInfiniteScroll3D.ts
│   ├── utils/
│   │   ├── math.ts
│   │   ├── time.ts
│   │   ├── string.ts
│   │   └── sortCardsByDistance.ts
│   ├── db/
│   │   ├── index.ts               # SQLite 主逻辑
│   │   └── migrations/
│   │       ├── 001_add_latlng.ts  # 占位
│   │       └── 002_update_schema.ts
│   ├── styles/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── global.ts
│   └── gl/
│       ├── Scene.tsx
│       ├── GalleryController.tsx
│       ├── BackgroundMesh.tsx
│       └── TextureCache.ts
├── scripts/
│   ├── build-web.sh
│   └── build-mobile.sh
├── tests/
│   ├── components/                # 占位
│   ├── screens/
│   ├── services/
│   ├── e2e/
│   └── utils/                     # Vitest：math、string
└── docs/
    ├── README.md                  # 文档索引
    ├── ARCHITECTURE.md            # 本文档
    ├── MODULES.md                 # 全模块文件级说明
    └── CONFIGURATION.md           # 配置与环境变量
```

> 说明：早期方案中的 `src/App.tsx`、`src/index.tsx` 已由 **`expo-router/entry`** 替代，不再存在于仓库。

## 应用启动与数据流

1. **入口**：`package.json` 的 `main` 指向 `expo-router/entry`。
2. **根布局**：`app/_layout.tsx` 在挂载子路由前执行 `bootstrapApp()`（见 `src/bootstrap.ts`）。
3. **数据库**：`initLocalDatabase()` 创建 `cards` / `meta` 表；若表为空则写入演示名片（`seedDemoCards`）。
4. **全局状态**：`loadAllCards()` 结果写入 `useCardStore`，各 Tab 与详情页从 store 读取或按 `id` 查找。
5. **定位**：`HomeScreen` 在挂载与下拉刷新时调用 `locationService`，更新 `userLocation` 后由 `sortCardsByDistance` 排序。

## 核心模块说明

### 1. 路由与页面（`app/` + `src/screens/`）

| 模块 | 职责 |
|------|------|
| **HomeScreen** | 竖屏列表；按距离排序（需定位）；进入详情 |
| **GalleryScreen** | **Web**：WebGL 长廊（`src/gl/Scene.tsx`）；**原生**：横向 `FlatList` 占位 |
| **CardDetailScreen** | 正反面、距离、放大镜、地图贴纸、外链导航 |
| **SettingsScreen** | OCR 开关、默认地图厂商（`MapProvider`） |

### 2. 3D 渲染（`src/gl/` + `components/Card/Card3DNode.tsx`）

- **Scene.tsx**：`Canvas`、雾、背景色与 `GalleryController`。
- **GalleryController.tsx**：`ScrollControls`（横向）+ `Card3DNode` 阵列；`BackgroundMesh`。
- **BackgroundMesh.tsx**：`@react-three/drei` 的 `Grid` 作为地面参考。
- **TextureCache.ts**：纹理 Map 缓存与释放（后续贴图资源接入时使用）。
- **Card3DNode.tsx**：盒体 + `Html` 文字标签（仅 Web 长廊引用）。

### 3. 地图与地理（`services/` + `navigation/` + `components/MapSticker.tsx`）

- **geocodingService.ts**：Mapbox Geocoding REST；需 `EXPO_PUBLIC_MAPBOX_TOKEN`。
- **locationService.ts**：`expo-location` 前台定位。
- **MapLauncher.ts**：构造 Google / Apple / 高德 / 百度 URL 并 `Linking.openURL`，失败时回退 Google Web。
- **MapSticker.tsx**：无瓦片 Key 时展示坐标 + 点击跳转外链（可后续换静态图）。

### 4. OCR（`services/ocrService.ts` + `utils/string.ts`）

- Web **动态加载** `tesseract.js`，`pickAddressLine` 抽取候选地址行；
- `calibrateAddress` 使用 **Levenshtein** 与候选列表比对（演示）；
- 原生端当前返回 `null`，设置页已说明。

### 5. 状态管理（`src/store/`）

- **useCardStore**：名片列表、用户坐标、定位错误信息；
- **useUiStore**：放大镜开关与目标 `cardId`、OCR 开关、默认地图厂商。

### 6. 数据库（`src/db/`）

- **expo-sqlite**：`cards` 表字段与 `CardEntity` 对齐；`meta.schema_version` 预留扩展；
- **migrations/**：占位文件，真实 schema 迁移可逐步从 `index.ts` 中拆出。

### 7. 样式（`src/styles/`）

- 设计 token：`colors`、`typography`、`global`（间距），供各组件统一引用。

## 跨端策略摘要

| 能力 | Web | 原生（iOS/Android） |
|------|-----|---------------------|
| 路由 | Expo Router + Metro Web | 同构 |
| 长廊 | `react-three-fiber` + drei | 横向列表占位；可接 `expo-gl` |
| 地图跳转 | `expo-linking` | 同左 |
| OCR | Tesseract.js | 待接原生能力 |
| 本地 DB | expo-sqlite | 同左 |

## 相关文档

- [MODULES.md](./MODULES.md) — 全项目文件与职责对照表  
- [CONFIGURATION.md](./CONFIGURATION.md) — 环境变量与工程配置  
- 根目录 [README.md](../README.md) — 安装、脚本与运行命令  
