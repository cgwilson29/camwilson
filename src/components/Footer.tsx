export function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Cam Wilson. Views expressed are my own and do not represent those of
      the FDA, HHS, or the U.S. Public Health Service. Planets not to scale. Planet imagery:{' '}
      <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">
        Solar System Scope
      </a>{' '}
      (CC BY 4.0), based on NASA data.
    </footer>
  );
}
