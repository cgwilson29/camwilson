import { forwardRef, useEffect, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Vector3, type Group, type Mesh } from 'three';
import type { PlanetConfig } from '../data/planets';
import { sectionById, type SectionId } from '../data/sections';
import { useSurfaceTexture } from './useSurfaceTexture';
import { SaturnRings } from './SaturnRings';
import { bodyPositions } from './registry';
import { OrbitRing } from './OrbitRing';

interface Props {
  config: PlanetConfig;
  paused: boolean;
  selected: boolean;
  onSelect: (id: SectionId) => void;
}

export function Planet({ config, paused, selected, onSelect }: Props) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const clouds = useRef<Mesh>(null);
  // Spread planets around the sun instead of lining them all up at angle 0.
  const angle = useRef(config.orbitRadius * 1.7);
  const [hovered, setHovered] = useState(false);
  const texture = useSurfaceTexture(config.texture);
  const section = config.sectionId ? sectionById[config.sectionId] : null;

  useEffect(() => {
    if (!config.sectionId) return;
    bodyPositions.set(config.sectionId, new Vector3());
    return () => void bodyPositions.delete(config.sectionId!);
  }, [config.sectionId]);

  useFrame((_, delta) => {
    if (!paused) angle.current += config.orbitSpeed * delta;
    const x = Math.cos(angle.current) * config.orbitRadius;
    const z = -Math.sin(angle.current) * config.orbitRadius;
    group.current!.position.set(x, 0, z);
    if (!paused) {
      mesh.current!.rotation.y += config.spinSpeed * delta;
      // Clouds drift slightly faster than the surface.
      if (clouds.current) clouds.current.rotation.y += config.spinSpeed * 1.2 * delta;
    }
    const target = hovered || selected ? 1.15 : 1;
    const s = mesh.current!.scale.x + (target - mesh.current!.scale.x) * 0.15;
    mesh.current!.scale.setScalar(s);
    if (config.sectionId) bodyPositions.get(config.sectionId)?.set(x, 0, z);
  });

  const interactive = !!section;
  const handlers = interactive
    ? {
        onClick: (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect(config.sectionId!);
        },
        onPointerOver: (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        },
        onPointerOut: () => {
          setHovered(false);
          document.body.style.cursor = '';
        },
      }
    : {};

  return (
    <>
      <OrbitRing radius={config.orbitRadius} highlight={hovered || selected} />
      <group ref={group}>
        <group rotation={[0, 0, config.tilt]}>
          <mesh ref={mesh} {...handlers}>
            <sphereGeometry args={[config.radius, 48, 32]} />
            <meshStandardMaterial
              map={texture}
              roughness={1}
              metalness={0}
              emissive={hovered ? '#334466' : '#000000'}
            />
            {config.clouds && <Clouds ref={clouds} file={config.clouds} radius={config.radius} />}
          </mesh>
          {config.rings && (
            <SaturnRings
              inner={config.radius * config.rings.inner}
              outer={config.radius * config.rings.outer}
              texture={config.rings.texture}
            />
          )}
        </group>
        {section && (
          <Html
            position={[0, config.radius + 0.5, 0]}
            center
            zIndexRange={[10, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <div className={`planet-label${hovered || selected ? ' planet-label--active' : ''}`}>
              <span className="planet-label__name">{config.name}</span>
              <span className="planet-label__section">{section.title}</span>
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

const Clouds = forwardRef<Mesh, { file: string; radius: number }>(function Clouds({ file, radius }, ref) {
  const map = useSurfaceTexture(file);
  return (
    <mesh ref={ref} raycast={() => null}>
      <sphereGeometry args={[radius * 1.015, 48, 32]} />
      <meshStandardMaterial alphaMap={map} color="#ffffff" transparent depthWrite={false} opacity={0.9} />
    </mesh>
  );
});
