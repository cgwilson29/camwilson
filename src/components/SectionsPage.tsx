import { Link } from 'react-router-dom';
import { sections } from '../data/sections';
import { NavBar } from './NavBar';
import { SectionContent } from './SectionContent';
import { Footer } from './Footer';

/** Plain, scrollable version of the whole site — no 3D required. */
export function SectionsPage() {
  return (
    <div className="page">
      <NavBar />
      <main className="page__main">
        <Link to="/" className="page__back">
          ← Back to the solar system
        </Link>
        {sections.map((s) => (
          <SectionContent key={s.id} section={s} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
