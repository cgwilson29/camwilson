import { CanvasTexture, SRGBColorSpace } from 'three';
import type { PlanetConfig } from '../data/planets';

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hash(str: string) {
  let h = 7;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) % 2147483647;
  return h || 1;
}

/** Builds an equirectangular texture procedurally so no image assets are needed. */
export function makePlanetTexture(p: PlanetConfig): CanvasTexture {
  const w = 512;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const rand = seeded(hash(p.name));
  const [base, dark, light, accent] = p.colors;

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  if (p.style === 'banded') {
    let y = 0;
    while (y < h) {
      const bandH = 4 + rand() * 18;
      const palette = [base, dark, light, accent ?? base];
      ctx.fillStyle = palette[Math.floor(rand() * palette.length)];
      ctx.globalAlpha = 0.35 + rand() * 0.5;
      ctx.fillRect(0, y, w, bandH);
      y += bandH;
    }
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = rand() > 0.5 ? light : dark;
      ctx.fillRect(rand() * w, rand() * h, 10 + rand() * 60, 1 + rand() * 2);
    }
    if (p.name === 'Jupiter') {
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = '#b5532e';
      ctx.beginPath();
      ctx.ellipse(w * 0.62, h * 0.66, 22, 11, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (p.style === 'rocky') {
    for (let i = 0; i < 260; i++) {
      const r = 2 + rand() ** 3 * 22;
      ctx.globalAlpha = 0.15 + rand() * 0.35;
      ctx.fillStyle = rand() > 0.5 ? dark : light;
      ctx.beginPath();
      ctx.arc(rand() * w, rand() * h, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Earth: continents, ice caps, clouds.
    for (let i = 0; i < 26; i++) {
      const cx = rand() * w;
      const cy = h * 0.2 + rand() * h * 0.6;
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = rand() > 0.3 ? dark : '#a08850';
      for (let j = 0; j < 14; j++) {
        ctx.beginPath();
        ctx.arc(cx + (rand() - 0.5) * 60, cy + (rand() - 0.5) * 30, 4 + rand() * 14, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, w, 14);
    ctx.fillRect(0, h - 14, w, 14);
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 120; i++) {
      ctx.fillRect(rand() * w, rand() * h, 20 + rand() * 70, 2 + rand() * 4);
    }
  }

  ctx.globalAlpha = 1;
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}
