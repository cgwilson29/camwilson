import { useTexture } from '@react-three/drei';
import { SRGBColorSpace, type Texture } from 'three';
import { textureUrl } from '../data/planets';

/** Loads a color map from public/textures/ (suspends until ready). */
export function useSurfaceTexture(file: string): Texture {
  return useTexture(textureUrl(file), (t) => {
    const tex = Array.isArray(t) ? t[0] : t;
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 8;
  }) as Texture;
}
