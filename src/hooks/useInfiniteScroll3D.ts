import { useCallback, useState } from 'react';

/**
 * 3D 长廊惯性滑动与分页加载（占位）
 */
export function useInfiniteScroll3D() {
  const [offset, setOffset] = useState(0);
  const onScrollEnd = useCallback(() => {
    setOffset((v) => v);
  }, []);
  return { offset, onScrollEnd };
}
