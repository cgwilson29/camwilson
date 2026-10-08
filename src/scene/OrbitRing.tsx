import { useMemo } from 'react';
import { Line } from '@react-three/drei';

export function OrbitRing({ radius, highlight }: { radius: number; highlight: boolean }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);
  return (
    <Line
      points={points}
      color={highlight ? '#9fc3ff' : '#ffffff'}
      transparent
      opacity={highlight ? 0.6 : 0.12}
      lineWidth={1}
    />
  );
}
