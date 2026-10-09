import { useMemo } from 'react';
import { DoubleSide, RingGeometry, Vector3 } from 'three';
import { useSurfaceTexture } from './useSurfaceTexture';

/**
 * The ring texture is a 1D radial strip, so remap RingGeometry's planar UVs:
 * u runs from the inner edge (0) to the outer edge (1).
 */
export function SaturnRings({ inner, outer, texture }: { inner: number; outer: number; texture: string }) {
  const map = useSurfaceTexture(texture);
  const geometry = useMemo(() => {
    const g = new RingGeometry(inner, outer, 128, 1);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    const v = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      uv.setXY(i, (v.length() - inner) / (outer - inner), 0.5);
    }
    return g;
  }, [inner, outer]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial map={map} side={DoubleSide} transparent depthWrite={false} roughness={1} />
    </mesh>
  );
}
