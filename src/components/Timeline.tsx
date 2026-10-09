import type { TimelineEntry } from '../data/sections';

export function Timeline({ entries, compact = false }: { entries: TimelineEntry[]; compact?: boolean }) {
  return (
    <ol className={`timeline${compact ? ' timeline--compact' : ''}`}>
      {entries.map((e, i) => (
        <li key={i} className={`timeline__item${e.current ? ' timeline__item--current' : ''}`}>
          <span className="timeline__title">
            {e.title}
            {e.current && <span className="timeline__badge">In progress</span>}
          </span>
          {e.meta && <span className="timeline__meta">{e.meta}</span>}
          {e.note && <span className="timeline__note">{e.note}</span>}
        </li>
      ))}
    </ol>
  );
}
