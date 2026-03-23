/**
 * 纹理缓存：横竖屏切换时复用 GPU 纹理，减少重复解码。
 */
const cache = new Map<string, unknown>();

export function getTextureFromCache(key: string): unknown | undefined {
  return cache.get(key);
}

export function setTextureCache(key: string, texture: unknown): void {
  cache.set(key, texture);
}
