# CardVerse

跨端纯前端应用骨架：**React Native** 与 **Web（React + WebGL）** 共享业务与 UI 逻辑，覆盖名片列表、3D 横屏长廊、地图与 OCR 等能力。

## 文档

- **[工程目录与模块划分](./docs/ARCHITECTURE.md)**：完整目录树、模块职责、跨端设计要点，可直接指导开发拆分任务。

## 本地开发（占位）

1. 安装依赖：`npm install`
2. 类型检查：`npm run typecheck`
3. Web / 移动端打包脚本见 `scripts/`，需接入 Vite 或 Webpack、React Native CLI 后补全具体命令。

## 环境变量

敏感配置通过环境变量注入（勿提交密钥），示例见 `src/config/env.ts`（如 `MAPBOX_TOKEN`、`APP_ENV`）。
