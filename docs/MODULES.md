# 全模块参考

本文按目录列出仓库内**已实现**的文件与职责，便于检索与分工。路径均相对于仓库根目录。

---

## 根目录与工程配置

| 路径 | 职责 |
|------|------|
| `package.json` | 依赖、脚本、`main: expo-router/entry` |
| `package-lock.json` | 锁定依赖版本 |
| `tsconfig.json` | TypeScript 与 `@/*` 路径 |
| `babel.config.js` | Expo + Reanimated |
| `metro.config.js` | Metro 与 `@` 别名 |
| `app.json` | Expo 应用 id、权限、插件、Web 输出方式 |
| `expo-env.d.ts` | Expo Router 类型引用 |
| `vitest.config.ts` | 单元测试解析别名与匹配规则 |
| `.gitignore` | `node_modules`、`dist`、`.expo`、`.env` 等 |

---

## `app/`（Expo Router 路由层）

仅负责**路由组合与导出页面**，业务逻辑在 `src/screens`。

| 路径 | 职责 |
|------|------|
| `_layout.tsx` | 根布局：`GestureHandlerRootView`、`SafeAreaProvider`、`Stack`；启动时 `bootstrapApp()`；未就绪时全屏 Loading |
| `(tabs)/_layout.tsx` | 底部 Tab：名片 / 长廊 / 设置 |
| `(tabs)/index.tsx` | 导出 `HomeScreen` |
| `(tabs)/gallery.tsx` | 导出 `GalleryScreen` |
| `(tabs)/settings.tsx` | 导出 `SettingsScreen` |
| `card/[id].tsx` | 导出 `CardDetailScreen`，动态路由参数 `id` |

**路由与 URL 对应关系（Web）**

| 路由 | 说明 |
|------|------|
| `/` | 首页（Tabs 默认） |
| `/gallery` | 长廊 |
| `/settings` | 设置 |
| `/card/:id` | 名片详情（模态栈） |

---

## `src/bootstrap.ts`

- 调用 `initLocalDatabase()`、`loadAllCards()`，将结果写入 `useCardStore.setCards`。
- 在 `app/_layout.tsx` 中于首屏前执行，保证列表有数据（含种子数据）。

---

## `src/config/`

| 路径 | 职责 |
|------|------|
| `env.ts` | `APP_ENV`、`getMapboxToken()`（读 `EXPO_PUBLIC_MAPBOX_TOKEN`） |
| `mapboxConfig.ts` | `accessToken`、默认样式 URL，供后续接入 Mapbox 地图 SDK 复用 |

---

## `src/components/`

| 路径 | 职责 |
|------|------|
| `Header.tsx` | 顶栏：标题、可选返回 |
| `Card/CardFront.tsx` | 名片正面：职位标题、姓名、公司 |
| `Card/CardBack.tsx` | 名片背面：地址、坐标摘要 |
| `Card/Card3DNode.tsx` | Web 长廊中单张名片：Box + `@react-three/drei` Html 文字 |
| `MapSticker.tsx` | 坐标展示 + 点击调用 `launchMapNavigation`（无瓦片 Key 的轻量「贴纸」） |
| `FloatingMagnifier.tsx` | 全屏 Modal 放大展示名片字段 |
| `DistanceBadge.tsx` | 距离角标（km / m） |

---

## `src/screens/`

| 路径 | 职责 |
|------|------|
| `HomeScreen.tsx` | 列表：`sortCardsByDistance`、下拉刷新定位、`FlatList` 进入详情 |
| `GalleryScreen.tsx` | **Web**：`Scene` + 全屏 WebGL；**原生**：横向 `FlatList` 占位 |
| `CardDetailScreen.tsx` | `useLocalSearchParams` 取 `id`；距离、放大镜、`MapSticker` |
| `SettingsScreen.tsx` | OCR 开关、默认地图厂商（`MapProvider`） |

---

## `src/navigation/`

| 路径 | 职责 |
|------|------|
| `AppNavigator.ts` | `useAppNavigation()`：对 `expo-router` 的 `replace` / `push` 封装（可选业务使用） |
| `MapLauncher.ts` | `getMapLaunchUrl`、`launchMapNavigation`（Google / Apple / 高德 / 百度 + 回退） |

---

## `src/store/`

| 路径 | 职责 |
|------|------|
| `cardSlice.ts` | `CardEntity` 类型定义 |
| `uiSlice.ts` | `UiPreferences` 类型与默认值（放大镜、OCR、默认地图） |
| `useCardStore.ts` | Zustand：`cards`、`userLocation`、`locationError` 及 setter |
| `useUiStore.ts` | Zustand：UI 偏好与 `setMagnifier` 等 |
| `index.ts` | 对外 re-export |

---

## `src/services/`

| 路径 | 职责 |
|------|------|
| `geocodingService.ts` | Mapbox Geocoding HTTP；无 Token 时返回 `null` |
| `locationService.ts` | `expo-location` 前台定位与权限 |
| `ocrService.ts` | Web 动态 `import('tesseract.js')`；`pickAddressLine`、`calibrateAddress`（Levenshtein）；原生返回 `null` |

---

## `src/hooks/`

| 路径 | 职责 |
|------|------|
| `useDeviceOrientation.ts` | `Dimensions` 监听横竖屏 |
| `useDistanceCalculator.ts` | 封装 `haversineKm`，返回 km 或 `null` |
| `useInfiniteScroll3D.ts` | 横向偏移状态（预留与 3D/动效对齐） |

---

## `src/utils/`

| 路径 | 职责 |
|------|------|
| `math.ts` | `haversineKm` 球面距离 |
| `string.ts` | `levenshtein` 编辑距离 |
| `time.ts` | `compareTimeAsc` 时间比较辅助 |
| `sortCardsByDistance.ts` | 有定位按距离升序，无定位按 `createdAt` 降序 |

---

## `src/db/`

| 路径 | 职责 |
|------|------|
| `index.ts` | `expo-sqlite`：`initLocalDatabase`、`loadAllCards`、`saveCard`；`meta`/`cards` 表；空库时 `seedDemoCards` |
| `migrations/001_add_latlng.ts` | 迁移占位（当前 schema 在 `index.ts` 一次性创建，可后续改为真正迁移链） |
| `migrations/002_update_schema.ts` | 迁移占位 |

---

## `src/styles/`

| 路径 | 职责 |
|------|------|
| `colors.ts` | 背景、主文字、强调色 |
| `typography.ts` | 标题 / 正文字号与字重 |
| `global.ts` | 间距等全局 token |

---

## `src/gl/`（Web 三维长廊）

| 路径 | 职责 |
|------|------|
| `Scene.tsx` | `Canvas`：背景色、雾、`GalleryController` |
| `GalleryController.tsx` | `ScrollControls` + `Scroll` 排布 `Card3DNode`；`BackgroundMesh`、灯光 |
| `BackgroundMesh.tsx` | `@react-three/drei` `Grid` 地面网格 |
| `TextureCache.ts` | `THREE.Texture` 的 Map 缓存与 `dispose`（扩展贴图复用时使用） |

---

## `assets/`

| 路径 | 职责 |
|------|------|
| `fonts/`、`images/`、`textures/`、`icons/` | 静态资源目录（当前以 `.gitkeep` 占位，可按设计稿补字体与纹理） |

---

## `scripts/`

| 路径 | 职责 |
|------|------|
| `build-web.sh` | `npx expo export --platform web`，输出 `dist/` |
| `build-mobile.sh` | 提示使用 `expo run:*` 或 EAS Build |

---

## `tests/`

| 路径 | 职责 |
|------|------|
| `utils/math.test.ts` | `haversineKm` 粗略范围断言 |
| `utils/string.test.ts` | `levenshtein` 基础用例 |
| `components/`、`screens/`、`services/`、`e2e/` | 空目录占位，可后续接组件测试与 E2E |

---

## 模块依赖关系（简图）

```
app/_layout.tsx
  → bootstrap.ts → db/index.ts → useCardStore
  → Stack → (tabs) / card/[id]
        → screens/* → components/*、services/*、store/*、gl/*（仅 Web 长廊）
```

---

## 扩展建议（与当前缺口）

| 方向 | 建议落点 |
|------|----------|
| 原生长廊 WebGL | `GalleryScreen.tsx` + `expo-gl` + `@react-three/fiber/native` |
| 地图瓦片 / 微缩图 | 接入 Mapbox Static API 或自托管瓦片，在 `MapSticker.tsx` |
| 迁移自动化 | 将 `db/index.ts` 中 DDL 拆入 `migrations/*` 并在启动时按版本执行 |
| OCR 原生 | `ocrService.ts` 接系统 Vision / 第三方 SDK |
