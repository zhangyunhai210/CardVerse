# CardVerse

跨端纯前端应用：**Expo SDK 52**（React Native + Web），包含名片列表、SQLite 离线数据、Mapbox 地理编码（可选）、Web 端 **react-three-fiber** 3D 长廊、Tesseract OCR（仅 Web）。

详细目录与模块说明见 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)。

## 环境要求

- Node.js ≥ 18
- iOS / Android 开发需本机安装 Xcode / Android Studio（或使用 EAS 云构建）

## 安装与运行

```bash
npm install
npm run start
```

在终端中选择 `w` 打开 Web，或用手机 Expo Go 扫描二维码（原生）。

## 脚本

| 命令 | 说明 |
|------|------|
| `npm run start` | 启动 Metro（Expo Dev Server） |
| `npm run web` | 直接启动 Web |
| `npm run typecheck` | TypeScript 检查 |
| `npm test` | Vitest 单元测试 |
| `npm run build:web` | `expo export --platform web`，输出到 `dist/` |

## 环境变量

在项目根目录创建 `.env`（勿提交），或使用 `EXPO_PUBLIC_*` 前缀：

- `EXPO_PUBLIC_MAPBOX_TOKEN`：启用 Mapbox 地理编码（`geocodeAddress`）；未配置时返回 `null`。
- `EXPO_PUBLIC_APP_ENV`：可选 `development` / `staging` / `production`。

## 功能说明

- **首页**：按与当前位置的距离排序名片（需定位权限）；下拉刷新重新定位。
- **长廊**：Web 为 Three.js 横向滚动长廊；原生为横向列表（可后续接入 `expo-gl` + fiber/native）。
- **详情**：放大镜、距离、打开系统地图（Google / Apple / 高德 / 百度）。
- **设置**：OCR 开关、默认地图应用。

## 技术栈摘要

- 路由与导航：`expo-router`
- 状态：`zustand`
- 本地存储：`expo-sqlite`
- 3D：`three` + `@react-three/fiber` + `@react-three/drei`（Web）
- OCR：`tesseract.js`（仅 Web 动态加载）
