import { useEffect, useRef } from 'react';
import { sections, sectionById, type SectionId } from '../data/sections';
import { SectionContent } from './SectionContent';

interface Props {
  id: SectionId;
  onClose: () => void;
  onSelect: (id: SectionId) => void;
}

export function SectionPanel({ id, onClose, onSelect }: Props) {
  const section = sectionById[id];
  const index = sections.findIndex((s) => s.id === id);
  const prev = sections[(index - 1 + sections.length) % sections.length];
  const next = sections[(index + 1) % sections.length];
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    scrollRef.current?.scrollTo({ top: 0 });
  }, [id]);

  return (
    <aside key={id} className="panel" aria-label={`${section.title} details`}>
      <button ref={closeRef} className="panel__close" onClick={onClose} aria-label="Close and return to solar system">
        ×
      </button>
      <div ref={scrollRef} className="panel__scroll">
        <SectionContent section={section} />
      </div>
      <nav className="panel__nav" aria-label="Section navigation">
        <button onClick={() => onSelect(prev.id)}>← {prev.body}</button>
        <button onClick={() => onSelect(next.id)}>{next.body} →</button>
      </nav>
    </aside>
  );
}
