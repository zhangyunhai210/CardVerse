import type { MapProvider } from '@/navigation/MapLauncher';

/**
 * 全局 UI 偏好：放大镜、OCR、默认地图厂商（持久化可后续接 AsyncStorage）。
 */
export interface UiPreferences {
  magnifierOpen: boolean;
  magnifierCardId: string | null;
  ocrEnabled: boolean;
  defaultMapProvider: MapProvider;
}

export const defaultUiPreferences: UiPreferences = {
  magnifierOpen: false,
  magnifierCardId: null,
  ocrEnabled: true,
  defaultMapProvider: 'google',
};
