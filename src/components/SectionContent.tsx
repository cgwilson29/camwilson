import type { Section } from '../data/sections';

export function SectionContent({ section, headingLevel = 2 }: { section: Section; headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <article className="section-content" aria-labelledby={`section-${section.id}`}>
      <p className="section-content__body">{section.body}</p>
      <Heading id={`section-${section.id}`} className="section-content__title">
        {section.title}
      </Heading>
      <p className="section-content__tagline">{section.tagline}</p>
      {section.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {section.highlights && (
        <>
          <h3>{section.highlightsTitle ?? 'Highlights'}</h3>
          <ul>
            {section.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </>
      )}
      {section.links && (
        <p className="section-content__links">
          {section.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </article>
  );
}
