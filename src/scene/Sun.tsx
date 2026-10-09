import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { AdditiveBlending, CanvasTexture, Vector3, type Mesh } from 'three';
import { sectionById, type SectionId } from '../data/sections';
import { SUN_TEXTURE } from '../data/planets';
import { useSurfaceTexture } from './useSurfaceTexture';
import { bodyPositions } from './registry';

export const SUN_RADIUS = 2.4;

/** Soft radial falloff for the corona glow, so it has no hard edges at any distance. */
function makeGlowTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255, 200, 120, 1)');
  g.addColorStop(0.3, 'rgba(255, 160, 60, 0.55)');
  g.addColorStop(0.6, 'rgba(255, 120, 30, 0.15)');
  g.addColorStop(1, 'rgba(255, 100, 20, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

export function Sun({ selected, onSelect }: { selected: boolean; onSelect: (id: SectionId) => void }) {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useSurfaceTexture(SUN_TEXTURE);
  const glow = useMemo(makeGlowTexture, []);
  useEffect(() => () => glow.dispose(), [glow]);

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
        {/* Self-luminous: unlit, so the photosphere map shows at full brightness. */}
        <meshBasicMaterial map={texture} color={hovered ? '#ffffff' : '#ffe2b0'} />
      </mesh>
      <sprite scale={SUN_RADIUS * 4.2} raycast={() => null}>
        <spriteMaterial map={glow} blending={AdditiveBlending} depthWrite={false} transparent opacity={0.85} />
      </sprite>
      <Html position={[0, SUN_RADIUS + 0.8, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`planet-label${hovered || selected ? ' planet-label--active' : ''}`}>
          <span className="planet-label__name">Sun</span>
          <span className="planet-label__section">{sectionById.about.title}</span>
        </div>
      </Html>
    </group>
  );
}
