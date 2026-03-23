export type MapProvider = 'google' | 'apple' | 'amap' | 'baidu';

/**
 * 打开外部地图导航：按平台与用户偏好选择 Google / Apple / 高德 / 百度。
 */
export function launchMapNavigation(_lat: number, _lng: number, _provider?: MapProvider): void {
  // 接入 Linking / 各厂商 URL Scheme 后实现
}
