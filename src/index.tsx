import App from './App';

/**
 * Web 端入口占位：接入 react-dom 的 createRoot 后在此挂载到 #root。
 * 避免在未安装 react-dom 时阻塞类型检查，故不直接 import 'react-dom/client'。
 */
export function mountWebApp(): void {
  void App;
}
