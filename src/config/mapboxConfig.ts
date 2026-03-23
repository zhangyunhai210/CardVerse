import { getMapboxToken } from './env';

/**
 * Mapbox 跨端共用配置：Geocoding / Maps SDK 初始化参数。
 */
export const mapboxConfig = {
  accessToken: getMapboxToken(),
  defaultStyle: 'mapbox://styles/mapbox/streets-v12',
} as const;
