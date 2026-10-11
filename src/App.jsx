import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Join from './pages/Join';
import Metaverse from './pages/divisions/Metaverse';
import Robotics from './pages/divisions/Robotics';
import Printing from './pages/divisions/Printing';

const Admin = lazy(() => import('./admin/Admin'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/join" element={<Join />} />
        <Route path="/metaverse" element={<Metaverse />} />
        <Route path="/robotics" element={<Robotics />} />
        <Route path="/printing" element={<Printing />} />
        <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}
