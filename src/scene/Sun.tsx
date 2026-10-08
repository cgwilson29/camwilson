import { useEffect, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { AdditiveBlending, BackSide, Vector3, type Mesh } from 'three';
import { sectionById, type SectionId } from '../data/sections';
import { bodyPositions } from './registry';

export const SUN_RADIUS = 2.4;

export function Sun({ selected, onSelect }: { selected: boolean; onSelect: (id: SectionId) => void }) {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    bodyPositions.set('about', new Vector3(0, 0, 0));
    return () => void bodyPositions.delete('about');
  }, []);

  useFrame((_, delta) => {
    mesh.current!.rotation.y += 0.05 * delta;
  });

  return (
    <group>
      <pointLight position={[0, 0, 0]} intensity={3} decay={0} color="#fff3d6" />
      <mesh
        ref={mesh}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect('about');
        }}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = '';
        }}
      >
        <sphereGeometry args={[SUN_RADIUS, 64, 48]} />
        <meshBasicMaterial color={hovered ? '#ffd27a' : '#ffbb44'} />
      </mesh>
      {[1.15, 1.35, 1.7].map((s, i) => (
        <mesh key={s} scale={s}>
          <sphereGeometry args={[SUN_RADIUS, 32, 24]} />
          <meshBasicMaterial
            color="#ff9a2e"
            transparent
            opacity={0.18 - i * 0.05}
            blending={AdditiveBlending}
            side={BackSide}
            depthWrite={false}
          />
        </mesh>
      ))}
      <Html position={[0, SUN_RADIUS + 0.8, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`planet-label${hovered || selected ? ' planet-label--active' : ''}`}>
          <span className="planet-label__name">Sun</span>
          <span className="planet-label__section">{sectionById.about.title}</span>
        </div>
      </Html>
    </group>
  );
}
