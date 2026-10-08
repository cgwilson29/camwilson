import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { planets } from '../data/planets';
import type { SectionId } from '../data/sections';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { CameraRig, OVERVIEW_POSITION } from './CameraRig';

interface Props {
  selected: SectionId | null;
  onSelect: (id: SectionId) => void;
  reducedMotion: boolean;
}

function useIsWide() {
  const [wide, setWide] = useState(() => window.innerWidth > 800);
  useEffect(() => {
    const onResize = () => setWide(window.innerWidth > 800);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return wide;
}

export default function SolarSystem({ selected, onSelect, reducedMotion }: Props) {
  const wide = useIsWide();
  return (
    <Canvas
      className="scene"
      dpr={[1, 1.5]}
      camera={{ position: OVERVIEW_POSITION.toArray(), fov: 45, near: 0.1, far: 2000 }}
      onPointerMissed={() => (document.body.style.cursor = '')}
    >
      <color attach="background" args={['#03040a']} />
      <ambientLight intensity={0.12} />
      <Stars radius={300} depth={80} count={6000} factor={5} fade speed={reducedMotion ? 0 : 0.5} />
      <Sun selected={selected === 'about'} onSelect={onSelect} />
      {planets.map((p) => (
        <Planet
          key={p.name}
          config={p}
          paused={reducedMotion || selected !== null}
          selected={selected === p.sectionId}
          onSelect={onSelect}
        />
      ))}
      <OrbitControls
        makeDefault
        enablePan={false}
        enabled={selected === null}
        minDistance={4}
        maxDistance={90}
        maxPolarAngle={Math.PI * 0.85}
      />
      <CameraRig selected={selected} panel={wide ? 'side' : 'bottom'} />
    </Canvas>
  );
}
