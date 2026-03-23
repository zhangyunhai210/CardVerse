import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

/**
 * 根据窗口宽高判断横竖屏（与画廊横屏体验一致）。
 */
export function useDeviceOrientation(): 'portrait' | 'landscape' {
  const [o, setO] = useState<'portrait' | 'landscape'>(() => {
    const { width, height } = Dimensions.get('window');
    return height >= width ? 'portrait' : 'landscape';
  });

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setO(window.height >= window.width ? 'portrait' : 'landscape');
    });
    return () => sub.remove();
  }, []);

  return o;
}
