import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, type PerspectiveCamera } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { SectionId } from '../data/sections';
import { planets } from '../data/planets';
import { bodyPositions } from './registry';
import { SUN_RADIUS } from './Sun';

export const OVERVIEW_POSITION = new Vector3(0, 22, 38);
const ORIGIN = new Vector3();
const UP = new Vector3(0, 1, 0);

function bodyRadius(id: SectionId) {
  if (id === 'about') return SUN_RADIUS;
  return planets.find((p) => p.sectionId === id)?.radius ?? 1;
}

/**
 * Flies the camera to the selected body (or back to the overview on deselect).
 * Once a flight lands, control is handed back to OrbitControls.
 */
export function CameraRig({ selected, panel }: { selected: SectionId | null; panel: 'side' | 'bottom' }) {
  const { camera, controls } = useThree() as unknown as {
    camera: PerspectiveCamera;
    controls: OrbitControlsImpl | null;
  };
  const flying = useRef(true);
  const desiredPos = useRef(new Vector3());
  const desiredTarget = useRef(new Vector3());

  useEffect(() => {
    flying.current = true;
  }, [selected]);

  useFrame((_, delta) => {
    if (!controls) return;
    if (selected) {
      const pos = bodyPositions.get(selected);
      if (!pos) return;
      // Narrow screens have a smaller horizontal field of view, so back off further.
      const dist = (bodyRadius(selected) * 6 + 2) * (panel === 'bottom' ? 1.7 : 1);
      const outward = pos.lengthSq() > 0 ? pos.clone().normalize() : new Vector3(0, 0, 1);
      const side = new Vector3().crossVectors(UP, outward);
      // Sit on the sunward side, off to one side and slightly above, so the lit face shows
      // in a crescent-to-gibbous view rather than the night side.
      desiredPos.current
        .copy(pos)
        .addScaledVector(outward, pos.lengthSq() > 0 ? -dist * 0.45 : dist)
        .addScaledVector(side, dist * 0.85)
        .addScaledVector(UP, dist * 0.3);
      // Never park the camera inside the sun's glow shell (matters for Mercury's tight orbit).
      const minFromSun = SUN_RADIUS * 1.7 + 1.5;
      if (pos.lengthSq() > 0 && desiredPos.current.length() < minFromSun) {
        desiredPos.current.setLength(minFromSun);
      }
      desiredTarget.current.copy(pos);
      // Shift the body off screen center so the panel doesn't cover it.
      const forward = desiredTarget.current.clone().sub(desiredPos.current).normalize();
      if (panel === 'side') {
        const right = new Vector3().crossVectors(forward, UP).normalize();
        desiredTarget.current.addScaledVector(right, dist * 0.3);
      } else {
        const screenUp = new Vector3().crossVectors(new Vector3().crossVectors(forward, UP), forward).normalize();
        desiredTarget.current.addScaledVector(screenUp, -dist * 0.3);
      }
      // While a section is open, keep the camera locked onto its body.
      flying.current = true;
    } else {
      desiredPos.current.copy(OVERVIEW_POSITION);
      desiredTarget.current.copy(ORIGIN);
    }

    if (!flying.current) return;
    const t = 1 - Math.exp(-delta * 3);
    camera.position.lerp(desiredPos.current, t);
    controls.target.lerp(desiredTarget.current, t);
    controls.update();
    if (!selected && camera.position.distanceTo(desiredPos.current) < 0.05) {
      flying.current = false;
    }
  });

  return null;
}
