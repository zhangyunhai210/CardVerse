import { useCallback, useRef, useState } from 'react';

/**
 * 长廊横向滚动偏移（像素），供 2D 回退列表与 WebGL 对齐同一套「页」概念。
 */
export function useInfiniteScroll3D() {
  const [offsetX, setOffsetX] = useState(0);
  const lastTs = useRef<number | null>(null);

  const onScroll = useCallback((x: number) => {
    setOffsetX(x);
    lastTs.current = Date.now();
  }, []);

  return { offsetX, onScroll, lastTs };
}
