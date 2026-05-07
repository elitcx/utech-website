import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/about',   label: 'About' },
  { to: '/events',  label: 'Events' },
  { to: '/join',    label: 'Join Us', cta: true },
];

const DIV_LINKS = [
  { to: '/metaverse',  label: 'Metaverse',   color: '#5570f1' },
  { to: '/robotics',   label: 'Robotics',    color: '#22c97a' },
  { to: '/printing',   label: '3D Printing', color: '#f5a232' },
];

export default function Nav() {
  const location = useLocation();
  const pathname = location.pathname;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDivOpen(false);
  }, [location.pathname]);

  const close = () => { setMenuOpen(false); setDivOpen(false); };

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo">
          <div className="nav-logo-img">
            <img src="/uploads/logo.png" alt="URSU Technology" />
          </div>
          <span className="nav-logo-text"><span>URSULINE</span> TECHNOLOGY</span>
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.filter(l => !l.cta).map(l => (
            <li key={l.to}>
              <Link to={l.to} className={pathname === l.to ? 'active' : ''}>
                {l.label}
              </Link>
            </li>
          ))}

          {/* Divisions dropdown */}
          <li
            style={{ position: 'relative' }}
            onMouseEnter={() => setDivOpen(true)}
            onMouseLeave={() => setDivOpen(false)}
          >
            <button
              type="button"
              className={`nav-div-trigger${DIV_LINKS.some(d => d.to === pathname) ? ' active' : ''}`}
              aria-haspopup="true"
              aria-expanded={divOpen}
              onClick={() => setDivOpen(v => !v)}
              onKeyDown={e => e.key === 'Escape' && setDivOpen(false)}
            >
              Divisions
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="1 1 5 5 9 1" />
              </svg>
            </button>
            {divOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                paddingTop: 12, zIndex: 200,
              }}>
              <div style={{
                background: 'rgba(10,12,20,0.98)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '6px', minWidth: 160,
                backdropFilter: 'blur(20px)',
              }}>
                {DIV_LINKS.map(d => (
                  <Link
                    key={d.to}
                    to={d.to}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 14px', borderRadius: 4, textDecoration: 'none',
                      color: pathname === d.to ? d.color : 'var(--white-dim)',
                      fontSize: 13, fontFamily: 'var(--sans)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    {d.label}
                  </Link>
                ))}
              </div>
              </div>
            )}
          </li>

          <li>
            <Link to="/join" className="nav-cta">Join Us</Link>
          </li>
        </ul>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="0" y1="1" x2="18" y2="1" />
            <line x1="0" y1="7" x2="18" y2="7" />
            <line x1="0" y1="13" x2="18" y2="13" />
          </svg>
        </button>
      </nav>

      <div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={close} aria-label="Close navigation">✕</button>
        {[...NAV_LINKS, ...DIV_LINKS].map(l => (
          <Link
            key={l.to}
            to={l.to}
            className="mobile-nav-link"
            onClick={close}
            style={{ color: l.color ? l.color : undefined }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
