import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/events.css';
import { TYPE_COLORS, ALL_EVENTS, isUpcoming } from '../data/events';

const MONTH_INDEX = { JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11 };

export default function Events() {
  const [filter, setFilter] = useState('All');
  const upcoming = ALL_EVENTS.filter(isUpcoming);
  const past = ALL_EVENTS.filter(e => !isUpcoming(e));

  const filters = ['All','Hackathon','Workshop','Build Night','Networking','Social'];
  const divFilters = ['All Divisions','Metaverse','Robotics','3D Printing'];
  const [divFilter, setDivFilter] = useState('All Divisions');

  const filtered = upcoming.filter(e => {
    const typeOk = filter === 'All' || e.type === filter;
    const divOk = divFilter === 'All Divisions' || e.division === divFilter || e.division === 'All';
    return typeOk && divOk;
  });

  const months = [...new Set(filtered.map(e => `${e.month} ${e.year}`))];

  const now = new Date();
  const currentMonthKey = Object.keys(MONTH_INDEX).find(k => MONTH_INDEX[k] === now.getMonth());
  const thisMonthCount = upcoming.filter(e => e.month === currentMonthKey && e.year === now.getFullYear()).length;

  const r1 = useReveal(), r2 = useReveal();

  const typeTagStyle = type => {
    const color = TYPE_COLORS[type] ?? '#888';
    return { color, background:`${color}18`, border:`1px solid ${color}33` };
  };

  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="events-hero">
        <div className="events-hero-dotgrid"/>
        <div className="events-hero-glow"/>
        <div className="events-hero-inner" style={{opacity:0,animation:'fadeUp 0.8s 0.2s ease forwards'}}>
          <div className="section-label">EVENTS</div>
          <h1 className="events-hero-title">Everything happening<br/>at <em>URSU Technology</em></h1>
          <p className="events-hero-sub">Hackathons, workshops, build nights, networking, and social events — open to all students.</p>
          <div style={{display:'flex',gap:16,marginTop:32,flexWrap:'wrap'}}>
            {[[String(upcoming.length),'Upcoming Events'],[String(thisMonthCount),'This Month'],['120+','Avg. Attendance']].map(([n,l])=>(
              <div key={l} style={{paddingRight:16,borderRight:'1px solid var(--border)'}}>
                <div style={{fontFamily:'var(--display)',fontSize:24,fontWeight:700,color:'var(--blue)',letterSpacing:'-0.02em'}}>{n}</div>
                <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'0.12em',color:'rgba(255,255,255,0.3)',marginTop:2,textTransform:'uppercase'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{borderBottom:'1px solid var(--border)'}}>
        <div className="filter-bar">
          {filters.map(f => (
            <button key={f} className={`filter-btn${filter===f?' active':''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
          <div style={{width:1,height:24,background:'var(--border)',margin:'0 4px'}}/>
          {divFilters.map(f => (
            <button key={f} className={`filter-btn${divFilter===f?' active green':''}`} onClick={() => setDivFilter(f)} style={{fontSize:'10px'}}>{f}</button>
          ))}
          <div className="filter-count">{filtered.length} event{filtered.length!==1?'s':''}</div>
        </div>
      </div>

      {/* Event list */}
      <div className="events-list-wrap">
        {filtered.length === 0 && (
          <div style={{padding:'60px 0',textAlign:'center',fontFamily:'var(--mono)',fontSize:12,letterSpacing:'0.1em',color:'rgba(255,255,255,0.25)'}}>
            NO EVENTS MATCH THIS FILTER
          </div>
        )}
        {months.map(month => (
          <div key={month}>
            <div className="events-month-label">{month}</div>
            {filtered.filter(e => `${e.month} ${e.year}` === month).map(e => (
              <div key={e.id} className={`event-card${e.featured?' featured':''}`}>
                <div className="event-date-block">
                  <div className="event-date-day" style={{color: TYPE_COLORS[e.type] ?? '#888'}}>{e.day}</div>
                  <div className="event-date-month">{e.month}</div>
                </div>
                <div className="event-main">
                  <div className="event-title-row">
                    <div className="event-title">{e.title}</div>
                    <span className="event-type-tag" style={typeTagStyle(e.type)}>{e.type}</span>
                    {e.featured && <span className="event-featured-badge">Featured</span>}
                  </div>
                  <div className="event-meta-row">
                    <div className="event-meta-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {e.location}
                    </div>
                    <div className="event-meta-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {e.time}
                    </div>
                    {e.capacity && <div className="event-meta-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                      {e.capacity}
                    </div>}
                  </div>
                  <p className="event-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{borderTop:'1px solid var(--border)'}}>
        <div className="events-cta">
          <div>
            <div className="section-label">STAY IN THE LOOP</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,3vw,40px)',fontWeight:700,letterSpacing:'-0.02em'}}>Never miss an event — <span style={{color:'var(--blue)'}}>tune in on Instagram</span></h2>
          </div>
          <div style={{display:'flex',gap:12,flexShrink:0,flexWrap:'wrap'}}>
            <Link to="/join" className="btn-primary">Join URSU Technology</Link>
            <a href="https://www.instagram.com/ursutech/" target="_blank" rel="noopener noreferrer" className="btn-ghost">Our Instagram</a>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
