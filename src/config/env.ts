/**
 * 环境变量：Mapbox 等密钥请通过 EXPO_PUBLIC_* 注入，勿提交到仓库。
 */
export type AppEnv = 'development' | 'staging' | 'production';

export const APP_ENV: AppEnv =
  (process.env.EXPO_PUBLIC_APP_ENV as AppEnv | undefined) ?? 'development';

export function getMapboxToken(): string {
  return process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '';
}
