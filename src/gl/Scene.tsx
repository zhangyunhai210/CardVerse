import { Canvas } from '@react-three/fiber';
import React from 'react';

import type { CardEntity } from '@/store/cardSlice';

import { GalleryController } from '@/gl/GalleryController';

export interface SceneProps {
  cards: CardEntity[];
}

/**
 * Web 端 WebGL 场景入口：透视相机 + 长廊控制器。
 */
export function Scene({ cards }: SceneProps): React.ReactElement {
  return (
    <Canvas
      shadows
      style={{ flex: 1, background: '#0b1220' }}
      camera={{ position: [0, 2.2, 11], fov: 48 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#0b1220']} />
      <fog attach="fog" args={['#0b1220', 12, 38]} />
      <GalleryController cards={cards} />
    </Canvas>
  );
}
