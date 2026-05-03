import { useReveal } from '../../hooks/useReveal';

const pillars = [
  {
    num: '01',
    title: 'Build & Code',
    body: 'Hands-on software projects, coding challenges, and open-source contributions. From web apps to embedded systems.',
    color: '#5570f1',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke="#5570f1" strokeWidth="1.5"/>
        <polyline points="8 6 2 12 8 18" stroke="#5570f1" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Design & Craft',
    body: 'UI/UX design, product thinking, and visual systems. We believe great technology is inseparable from great design.',
    color: '#22c97a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1" stroke="#22c97a" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1" stroke="#22c97a" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1" stroke="#22c97a" strokeWidth="1.5"/>
        <rect x="13" y="13" width="8" height="8" rx="1" stroke="#22c97a" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Learn & Explore',
    body: 'Workshops on AI, cybersecurity, data, and emerging tech. Speaker series, study groups, and peer learning.',
    color: '#5570f1',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#5570f1" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="#5570f1" strokeWidth="1.5"/>
        <line x1="12" y1="3" x2="12" y2="9" stroke="#5570f1" strokeWidth="1.5"/>
        <line x1="12" y1="15" x2="12" y2="21" stroke="#5570f1" strokeWidth="1.5"/>
        <line x1="3" y1="12" x2="9" y2="12" stroke="#5570f1" strokeWidth="1.5"/>
        <line x1="15" y1="12" x2="21" y2="12" stroke="#5570f1" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Connect & Network',
    body: 'Industry nights, alumni panels, and career mentorship. Build the professional relationships that open doors.',
    color: '#22c97a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="12" r="2.5" stroke="#22c97a" strokeWidth="1.5"/>
        <circle cx="18" cy="6" r="2.5" stroke="#22c97a" strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="2.5" stroke="#22c97a" strokeWidth="1.5"/>
        <line x1="8.2" y1="10.8" x2="15.8" y2="7.2" stroke="#22c97a" strokeWidth="1.5"/>
        <line x1="8.2" y1="13.2" x2="15.8" y2="16.8" stroke="#22c97a" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Compete & Hack',
    body: 'Hackathons, CTF competitions, and case challenges — where ideas become prototypes under pressure.',
    color: '#5570f1',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#5570f1" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Ship & Impact',
    body: 'Real projects that solve real problems. We encourage members to take ideas from concept to deployment.',
    color: '#22c97a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12l5 5L20 7" stroke="#22c97a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Pillars() {
  const ref = useReveal();

  return (
    <section id="pillars">
      <div className="section-inner">
        <div className="reveal" ref={ref}>
          <div className="pillars-header">
            <div className="section-label" style={{marginBottom: 0}}>WHAT WE DO</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'56px',flexWrap:'wrap',gap:'20px'}}>
            <h2 className="pillars-title">Six pillars of<br/><em>community</em></h2>
            <p className="pillars-sub">Everything we do falls within one of these areas — and most projects span several.</p>
          </div>
          <div className="pillars-grid">
            {pillars.map((p) => (
              <div className="pillar-card" key={p.num}>
                <div className="pillar-num">{p.num}</div>
                <div className="pillar-icon">{p.icon}</div>
                <div className="pillar-card-title">{p.title}</div>
                <p className="pillar-card-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
