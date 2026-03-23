/**
 * 环境变量与 API Key 占位：生产环境请使用 .env + CI 注入，勿将密钥提交仓库。
 */
export type AppEnv = 'development' | 'staging' | 'production';

export const APP_ENV: AppEnv =
  (process.env.APP_ENV as AppEnv | undefined) ?? 'development';

export function getMapboxToken(): string {
  return process.env.MAPBOX_TOKEN ?? '';
}
