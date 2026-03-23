import { Html } from '@react-three/drei';
import React from 'react';

export interface Card3DNodeProps {
  title: string;
  subtitle?: string;
  color?: string;
}

/**
 * 长廊中的单张名片 3D 节点：盒体 + Html 文字标签。
 */
export function Card3DNode({ title, subtitle, color = '#2b6cb0' }: Card3DNodeProps): React.ReactElement {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 3.2, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.45} />
      </mesh>
      <Html transform position={[0, 0, 0.2]} center style={{ pointerEvents: 'none', width: 200 }}>
        <div
          style={{
            color: '#f8fafc',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>{subtitle}</div> : null}
        </div>
      </Html>
    </group>
  );
}
