import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { SectionsPage } from './components/SectionsPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/sections" element={<SectionsPage />} />
        {/* One route for "/" and "/about/:id" so the 3D canvas stays mounted between them. */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
