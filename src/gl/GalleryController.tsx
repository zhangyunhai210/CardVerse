import { Scroll, ScrollControls } from '@react-three/drei';
import React from 'react';

import { Card3DNode } from '@/components/Card/Card3DNode';
import type { CardEntity } from '@/store/cardSlice';

import { BackgroundMesh } from '@/gl/BackgroundMesh';

export interface GalleryControllerProps {
  cards: CardEntity[];
}

/**
 * Web 端长廊：ScrollControls 横向分页 + 名片节点排布。
 */
export function GalleryController({ cards }: GalleryControllerProps): React.ReactElement {
  const pages = Math.max(1, cards.length);

  return (
    <>
      <BackgroundMesh />
      <ambientLight intensity={0.55} />
      <directionalLight castShadow position={[8, 12, 10]} intensity={1.1} />
      <ScrollControls pages={pages} horizontal infinite damping={0.28}>
        <Scroll>
          <group position={[0, 0.5, 0]}>
            {cards.map((c, i) => (
              <group key={c.id} position={[i * 3.2, 0, 0]}>
                <Card3DNode title={c.title} subtitle={`${c.name} · ${c.company}`} />
              </group>
            ))}
          </group>
        </Scroll>
      </ScrollControls>
    </>
  );
}
