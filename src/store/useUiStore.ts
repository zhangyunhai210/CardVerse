import { create } from 'zustand';

import { defaultUiPreferences, type UiPreferences } from '@/store/uiSlice';

interface UiState extends UiPreferences {
  setMagnifier: (open: boolean, cardId?: string | null) => void;
  setOcrEnabled: (enabled: boolean) => void;
  setDefaultMapProvider: (p: UiPreferences['defaultMapProvider']) => void;
}

/**
 * UI 状态：放大镜、OCR 开关、地图跳转偏好。
 */
export const useUiStore = create<UiState>((set) => ({
  ...defaultUiPreferences,
  setMagnifier: (open, cardId = null) =>
    set({ magnifierOpen: open, magnifierCardId: cardId ?? null }),
  setOcrEnabled: (ocrEnabled) => set({ ocrEnabled }),
  setDefaultMapProvider: (defaultMapProvider) => set({ defaultMapProvider }),
}));
