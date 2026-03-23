/**
 * UI 状态：横竖屏、放大镜等（占位）
 */
export interface UiState {
  isGalleryLandscape: boolean;
  magnifierOpen: boolean;
}

export const defaultUiState: UiState = {
  isGalleryLandscape: false,
  magnifierOpen: false,
};
