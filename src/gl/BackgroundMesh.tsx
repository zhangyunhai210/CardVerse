import { Grid } from '@react-three/drei';
import React from 'react';

/**
 * 长廊背景：无限网格 + 轻微纵深感，避免空场景。
 */
export function BackgroundMesh(): React.ReactElement {
  return (
    <Grid
      args={[40, 40]}
      cellSize={0.5}
      cellThickness={0.4}
      sectionSize={5}
      sectionThickness={1}
      fadeDistance={45}
      fadeStrength={1}
      infiniteGrid
      sectionColor="#4a6fa5"
      cellColor="#1e2a38"
      position={[0, -1.2, 0]}
    />
  );
}
