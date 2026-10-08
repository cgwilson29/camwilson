import { NavLink, Link } from 'react-router-dom';
import { sections } from '../data/sections';

export function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        Cam Wilson
      </Link>
      <nav aria-label="Sections">
        <ul className="navbar__links">
          {sections.map((s) => (
            <li key={s.id}>
              <NavLink to={`/about/${s.id}`}>{s.title}</NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/sections" className="navbar__all">
              All
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
