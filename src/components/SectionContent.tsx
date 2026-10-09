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
      {section.extraLists?.map((list) => (
        <section key={list.title}>
          <h3>{list.title}</h3>
          <ul>
            {list.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      {section.education && (
        <>
          <h3>Education</h3>
          <ol className="education">
            {section.education.map((e, i) => (
              <li key={i} className={`education__item${e.current ? ' education__item--current' : ''}`}>
                <span className="education__credential">
                  {e.credential}
                  {e.current && <span className="education__badge">In progress</span>}
                </span>
                <span className="education__meta">
                  {e.school}
                  {e.years && ` · ${e.years}`}
                </span>
                {e.note && <span className="education__note">{e.note}</span>}
              </li>
            ))}
          </ol>
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
