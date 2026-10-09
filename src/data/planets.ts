import type { SectionId } from './sections';

export interface PlanetConfig {
  name: string;
  radius: number;
  orbitRadius: number;
  /** Radians per second around the sun. */
  orbitSpeed: number;
  /** Radians per second around its own axis. */
  spinSpeed: number;
  /** Axial tilt in radians. */
  tilt: number;
  /** Equirectangular surface map in public/textures/. */
  texture: string;
  /** Optional cloud layer (white-on-black map used as transparency). */
  clouds?: string;
  sectionId?: SectionId;
  /** Ring radii are multiples of the planet radius; texture is a radial strip (inner → outer). */
  rings?: { inner: number; outer: number; texture: string };
}

// Sizes and distances are stylized (not to scale) so every planet stays visible and clickable.
// Textures: Solar System Scope (https://www.solarsystemscope.com/textures/), CC BY 4.0,
// based on NASA mission imagery.
export const planets: PlanetConfig[] = [
  { name: 'Mercury', radius: 0.35, orbitRadius: 5, orbitSpeed: 0.32, spinSpeed: 0.2, tilt: 0.01, texture: 'mercury.jpg', sectionId: 'motorcycles' },
  { name: 'Venus', radius: 0.6, orbitRadius: 7, orbitSpeed: 0.24, spinSpeed: 0.1, tilt: 3.1, texture: 'venus.jpg', sectionId: 'family' },
  { name: 'Earth', radius: 0.65, orbitRadius: 9.4, orbitSpeed: 0.19, spinSpeed: 0.5, tilt: 0.41, texture: 'earth.jpg', clouds: 'earth_clouds.jpg', sectionId: 'work' },
  { name: 'Mars', radius: 0.45, orbitRadius: 11.8, orbitSpeed: 0.15, spinSpeed: 0.48, tilt: 0.44, texture: 'mars.jpg', sectionId: 'cars' },
  { name: 'Jupiter', radius: 1.5, orbitRadius: 16, orbitSpeed: 0.08, spinSpeed: 0.9, tilt: 0.05, texture: 'jupiter.jpg', sectionId: 'travel' },
  { name: 'Saturn', radius: 1.25, orbitRadius: 21, orbitSpeed: 0.06, spinSpeed: 0.8, tilt: 0.47, texture: 'saturn.jpg', sectionId: 'space', rings: { inner: 1.2, outer: 2.3, texture: 'saturn_ring.png' } },
  { name: 'Uranus', radius: 0.9, orbitRadius: 25.5, orbitSpeed: 0.045, spinSpeed: 0.6, tilt: 1.71, texture: 'uranus.jpg', sectionId: 'breweries' },
  { name: 'Neptune', radius: 0.88, orbitRadius: 29.5, orbitSpeed: 0.035, spinSpeed: 0.62, tilt: 0.49, texture: 'neptune.jpg', sectionId: 'outdoors' },
];

export const SUN_TEXTURE = 'sun.jpg';

export function textureUrl(file: string) {
  return `${import.meta.env.BASE_URL}textures/${file}`;
}
