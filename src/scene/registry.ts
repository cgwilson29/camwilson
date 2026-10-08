import { Vector3 } from 'three';
import type { SectionId } from '../data/sections';

/** Live world positions of each section's body, written by the planets every frame. */
export const bodyPositions = new Map<SectionId, Vector3>();
