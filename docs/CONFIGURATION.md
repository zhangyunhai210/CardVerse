# 配置说明

## 环境变量（`EXPO_PUBLIC_*`）

Expo 会将 `EXPO_PUBLIC_` 前缀变量注入客户端打包产物，**勿写入生产密钥到仓库**。常用项：

| 变量 | 用途 |
|------|------|
| `EXPO_PUBLIC_MAPBOX_TOKEN` | Mapbox Geocoding API（`geocodingService.ts`）；未设置时地理编码返回 `null` |
| `EXPO_PUBLIC_APP_ENV` | 可选：`development` / `staging` / `production`（`config/env.ts`） |

本地可在项目根目录使用 `.env`（需配合 `expo` 加载方式或 CI 注入；**不要将 `.env` 提交 Git**，已列入 `.gitignore`）。

## `app.json`（Expo）

- **scheme**：`cardverse`，用于深度链接与 `expo-linking`。
- **plugins**：`expo-router`、`expo-sqlite`、`expo-location`。
- **iOS**：定位、相册文案（相册为后续 OCR 选图预留）。
- **Android**：粗略/精确定位权限。
- **web**：Metro 打包、`output: "single"`。

## `package.json`

- **main**：`expo-router/entry`，应用入口由 Expo Router 接管。
- **scripts**：`start` / `web` / `android` / `ios`、`typecheck`、`test`、`build:web`、`build:mobile`。

## `tsconfig.json`

- **extends**：`expo/tsconfig.base`。
- **paths**：`@/*` → `src/*`（需与 `metro.config.js` 中 `resolver.alias` 一致）。
- **module**：`ESNext`，支持 `import()` 动态加载（如 OCR）。

## `babel.config.js`

- **presets**：`babel-preset-expo`。
- **plugins**：`react-native-reanimated/plugin`（**必须置于最后**）。

## `metro.config.js`

- 使用 `expo/metro-config` 的默认配置。
- **resolver.alias**：`@` → 项目根下 `src`，与 TypeScript paths 对齐。

## `vitest.config.ts`

- **resolve.alias**：`@` → `src`，与业务代码一致，便于对 `utils` 等做单元测试。
- **test.include**：`tests/**/*.test.ts`。

## `expo-env.d.ts`

- 三斜线引用 `expo-router/types`，为路由与布局提供类型辅助。
