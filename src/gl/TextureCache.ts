import * as THREE from 'three';

/**
 * 纹理缓存：跨横竖屏切换复用同一 Texture 实例，降低 GPU 上传次数。
 */
const cache = new Map<string, THREE.Texture>();

export function getTextureFromCache(key: string): THREE.Texture | undefined {
  return cache.get(key);
}

export function setTextureCache(key: string, texture: THREE.Texture): void {
  const prev = cache.get(key);
  if (prev) prev.dispose();
  cache.set(key, texture);
}

export function disposeAllTextures(): void {
  cache.forEach((t) => t.dispose());
  cache.clear();
}
