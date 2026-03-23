import { useState } from 'react';

/**
 * 监听横竖屏变化（占位）：RN 用 Dimensions / Web 用 matchMedia orientation。
 */
export function useDeviceOrientation(): 'portrait' | 'landscape' {
  const [o] = useState<'portrait' | 'landscape'>('portrait');
  return o;
}
