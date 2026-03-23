# CardVerse 跨端前端工程目录与模块划分

本文档描述 **React Native + Web（React + WebGL）** 的纯前端跨端目录结构、职责边界与实现要点，供开发团队按模块并行落地。

## 目录总览

```
CardVerse/
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js                # React Native 构建配置
├── README.md
├── assets/
│   ├── fonts/
│   ├── images/
│   ├── textures/                  # 3D 长廊材质纹理
│   └── icons/
├── src/
│   ├── App.tsx                    # 跨端入口
│   ├── index.tsx                  # Web 入口
│   ├── config/
│   │   ├── env.ts                 # API keys, 环境配置
│   │   └── mapboxConfig.ts        # Mapbox 配置
│   ├── components/                # UI 通用组件
│   │   ├── Card/
│   │   │   ├── CardFront.tsx
│   │   │   ├── CardBack.tsx
│   │   │   └── Card3DNode.tsx     # react-three-fiber 3D 节点
│   │   ├── MapSticker.tsx         # 微缩地图贴纸组件
│   │   ├── FloatingMagnifier.tsx  # 放大镜组件
│   │   ├── DistanceBadge.tsx      # 距离显示
│   │   └── Header.tsx
│   ├── screens/                   # 页面/视图
│   │   ├── HomeScreen.tsx         # 抽屉列表视图
│   │   ├── GalleryScreen.tsx      # 横屏艺术长廊
│   │   ├── CardDetailScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx       # Stack / Tab Navigator
│   │   └── MapLauncher.ts         # 跳转地图逻辑
│   ├── store/                     # 状态管理
│   │   ├── index.ts
│   │   ├── cardSlice.ts           # 名片列表状态
│   │   └── uiSlice.ts             # UI 状态（横竖屏、放大镜）
│   ├── services/
│   │   ├── geocodingService.ts    # 地址解析
│   │   ├── locationService.ts     # 定位
│   │   └── ocrService.ts          # OCR + AI 地址校准
│   ├── hooks/
│   │   ├── useDeviceOrientation.ts
│   │   ├── useDistanceCalculator.ts
│   │   └── useInfiniteScroll3D.ts
│   ├── utils/
│   │   ├── math.ts                # 球面距离、Parallax 计算
│   │   ├── time.ts                # 时间轴排序
│   │   └── string.ts              # Levenshtein Distance
│   ├── db/
│   │   ├── index.ts               # WatermelonDB / SQLite 初始化
│   │   └── migrations/
│   │       ├── 001_add_latlng.ts
│   │       └── 002_update_schema.ts
│   ├── styles/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── global.ts
│   └── gl/                        # 3D 横屏长廊相关
│       ├── Scene.tsx              # 横屏 Scene 初始化
│       ├── GalleryController.tsx  # 3D 节点排列 + 滑动惯性
│       ├── BackgroundMesh.tsx     # 城市轮廓、经纬线渲染
│       └── TextureCache.ts        # 纹理复用管理
├── scripts/
│   ├── build-web.sh
│   └── build-mobile.sh
└── tests/
    ├── components/
    ├── screens/
    ├── services/
    └── e2e/
```

## 核心模块说明

### 1. App 与 Screens

| 模块 | 职责 |
|------|------|
| **HomeScreen** | 竖屏抽屉列表、附近名片排序（结合定位与距离） |
| **GalleryScreen** | 横屏 3D 长廊，惯性滑动与 Parallax |
| **CardDetailScreen** | 单张名片详情，微缩地图贴纸与距离展示 |
| **SettingsScreen** | 地图授权、OCR 开关等 |

### 2. 3D 渲染模块（`gl/`）

- **Scene.tsx**：初始化 Three.js 场景、相机、光源；与 `react-three-fiber` 或 RN 的 GL 视图对接。
- **GalleryController.tsx**：名片节点沿时间轴或空间轴排列、手势与惯性滑动。
- **BackgroundMesh.tsx**：低多边形城市轮廓、经纬线等轻量背景。
- **TextureCache.ts**：纹理共享与生命周期管理，避免横竖屏切换时重复解码。

### 3. 地图与地理信息（`services/` + `navigation/`）

- **geocodingService.ts**：Mapbox Geocoding 等，统一地址 → 经纬度。
- **locationService.ts**：封装设备定位，处理权限与降级策略。
- **MapLauncher.ts**：通过 URL Scheme / 深度链接打开 Google Maps、Apple Maps、高德、百度等。

### 4. AI OCR 模块

- **ocrService.ts**：Tesseract.js（或原生能力）解析名片文字，结合 **string.ts** 的 Levenshtein 与候选地址库做校准。

### 5. 状态管理

- 使用 **Redux Toolkit** 或 **Zustand** 管理全局状态：名片列表、排序、横屏开关、放大镜状态等；`store/` 中按 slice 拆分。

### 6. 数据库

- **WatermelonDB** 或 **SQLite** 做离线缓存与迁移；`db/migrations/` 存放版本化 schema 变更。

## 跨端关键设计

1. **3D 性能**：`react-three-fiber` + RN 侧 GLView / Web 侧 WebGL；节点池化、LOD、纹理复用（`TextureCache`）。
2. **横屏惯性滑动**：Reanimated + Gesture Handler；位移与 `utils/math` 中球面距离结合做 Parallax 参考。
3. **地图统一**：Mapbox GL JS（Web）与 Mapbox RN SDK（移动端）共享业务层与 token 配置。
4. **OCR**：Tesseract.js + WASM 可在 Web 与部分 RN 环境运行；重计算任务可考虑后台队列或原生模块。

## 仓库内当前状态

本仓库已按上述目录建立 **占位文件与最小实现**（如 Haversine、Levenshtein），便于后续接入 React Navigation、打包工具与原生依赖。具体接入步骤见 `README.md`。
