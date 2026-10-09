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
  /** Base colors used to generate the procedural texture. */
  colors: string[];
  style: 'rocky' | 'banded' | 'earth';
  sectionId?: SectionId;
  rings?: { inner: number; outer: number; color: string };
}

// Sizes and distances are stylized (not to scale) so every planet stays visible and clickable.
export const planets: PlanetConfig[] = [
  { name: 'Mercury', radius: 0.35, orbitRadius: 5, orbitSpeed: 0.32, spinSpeed: 0.2, tilt: 0.01, colors: ['#8c8580', '#5e5955', '#b0aaa4'], style: 'rocky', sectionId: 'motorcycles' },
  { name: 'Venus', radius: 0.6, orbitRadius: 7, orbitSpeed: 0.24, spinSpeed: 0.1, tilt: 3.1, colors: ['#e8c48a', '#c9a064', '#f2dcb0'], style: 'banded', sectionId: 'family' },
  { name: 'Earth', radius: 0.65, orbitRadius: 9.4, orbitSpeed: 0.19, spinSpeed: 0.5, tilt: 0.41, colors: ['#1f5fa8', '#3a8a3e', '#f4f4f4'], style: 'earth', sectionId: 'work' },
  { name: 'Mars', radius: 0.45, orbitRadius: 11.8, orbitSpeed: 0.15, spinSpeed: 0.48, tilt: 0.44, colors: ['#c1440e', '#8a2f0a', '#e07a4a'], style: 'rocky', sectionId: 'cars' },
  { name: 'Jupiter', radius: 1.5, orbitRadius: 16, orbitSpeed: 0.08, spinSpeed: 0.9, tilt: 0.05, colors: ['#d8b48a', '#a8774f', '#f0e0c8', '#c48a5a'], style: 'banded', sectionId: 'travel' },
  { name: 'Saturn', radius: 1.25, orbitRadius: 21, orbitSpeed: 0.06, spinSpeed: 0.8, tilt: 0.47, colors: ['#e6d3a3', '#c8a96e', '#f5ead0'], style: 'banded', sectionId: 'space', rings: { inner: 1.6, outer: 2.6, color: '#d9c79c' } },
  { name: 'Uranus', radius: 0.9, orbitRadius: 25.5, orbitSpeed: 0.045, spinSpeed: 0.6, tilt: 1.71, colors: ['#9fe3e8', '#7ccbd3', '#c4f1f4'], style: 'banded', sectionId: 'breweries' },
  { name: 'Neptune', radius: 0.88, orbitRadius: 29.5, orbitSpeed: 0.035, spinSpeed: 0.62, tilt: 0.49, colors: ['#3557d4', '#2340a8', '#5b7cf0'], style: 'banded', sectionId: 'outdoors' },
];
