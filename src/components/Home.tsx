import { Suspense, lazy, useEffect } from 'react';
import { useSelectedSection } from '../hooks/useSelectedSection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { NavBar } from './NavBar';
import { SectionPanel } from './SectionPanel';

const SolarSystem = lazy(() => import('../scene/SolarSystem'));

export function Home() {
  const { selected, select } = useSelectedSection();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') select(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [select]);

  return (
    <div className="home">
      <Suspense fallback={<div className="loading">Launching…</div>}>
        <SolarSystem selected={selected} onSelect={select} reducedMotion={reducedMotion} />
      </Suspense>
      <NavBar />
      {!selected && (
        <div className="hero">
          <h1>Cam Wilson</h1>
          <p>USPHS Pharmacist · FDA OCE Project Facilitate</p>
          <p className="hero__hint">Click a planet to explore · drag to rotate · scroll to zoom</p>
        </div>
      )}
      {selected && <SectionPanel id={selected} onClose={() => select(null)} onSelect={select} />}
    </div>
  );
}
