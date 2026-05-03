import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/events.css';

const ALL_EVENTS = [
  /* ── Upcoming ── */
  { id:1, month:'MAY', day:'03', year:2026, title:'Spring Hackathon 2026', type:'Hackathon', typeColor:'#5570f1', location:'ED Building, Room 209', time:'9:00 AM – 9:00 PM', desc:'24-hour hackathon open to all UR students. Form teams of 2–4, pick a challenge track, and build something in a day. Prizes, mentors, and free food provided.', featured:true, upcoming:true, capacity:'80 spots', division:'All' },
  { id:2, month:'MAY', day:'10', year:2026, title:'Intro to Arduino — Workshop', type:'Workshop', typeColor:'#22c97a', location:'CK 230', time:'2:00 PM – 4:30 PM', desc:'Hands-on introduction to Arduino microcontrollers — wiring, coding, and building your first sensor circuit from scratch. No experience required.', upcoming:true, capacity:'30 spots', division:'Robotics' },
  { id:3, month:'MAY', day:'17', year:2026, title:'AI & Machine Learning Workshop', type:'Workshop', typeColor:'#22c97a', location:'CK 230', time:'2:00 PM – 4:30 PM', desc:'An applied workshop covering ML fundamentals with Python — from data preprocessing to training your first neural network using TensorFlow/Keras.', upcoming:true, capacity:'30 spots', division:'All' },
  { id:4, month:'MAY', day:'24', year:2026, title:'XR Design Build Night', type:'Build Night', typeColor:'#5570f1', location:'ED 209', time:'6:00 PM – 9:30 PM', desc:'Weekly Metaverse division build night — open to all. Bring your Unity or WebXR project or start one from scratch with help from division leads.', upcoming:true, capacity:'Open', division:'Metaverse' },
  { id:5, month:'JUN', day:'06', year:2026, title:'Industry Night — Summer Edition', type:'Networking', typeColor:'#f5a232', location:'Riddell Centre, Lounge B', time:'5:30 PM – 8:00 PM', desc:'An evening of industry connections — meet professionals from tech companies across Saskatchewan and beyond. Smart casual dress, open to all members.', featured:true, upcoming:true, capacity:'120 spots', division:'All' },
  { id:6, month:'JUN', day:'14', year:2026, title:'3D Printing Open Lab Night', type:'Build Night', typeColor:'#f5a232', location:'Print Lab, ED 114', time:'6:00 PM – 10:00 PM', desc:'Monthly open print night for the 3D Printing division. Bring a model, get help with slicing, and run prints on our FDM and resin machines.', upcoming:true, capacity:'20 spots', division:'3D Printing' },
  { id:7, month:'JUN', day:'21', year:2026, title:'End-of-Year Showcase & Social', type:'Social', typeColor:'#22c97a', location:'Research & Innovation Centre', time:'3:00 PM – 7:00 PM', desc:'Annual end-of-year showcase where all three divisions present their semester projects. Open to faculty, staff, and students. Food and drinks provided.', featured:true, upcoming:true, capacity:'200 spots', division:'All' },
  { id:8, month:'JUL', day:'12', year:2026, title:'Intro to Fusion 360 Workshop', type:'Workshop', typeColor:'#f5a232', location:'CK 230', time:'1:00 PM – 4:00 PM', desc:'A three-hour hands-on introduction to parametric CAD in Fusion 360 — sketches, features, assemblies, and preparing models for 3D printing.', upcoming:true, capacity:'25 spots', division:'3D Printing' },
  { id:9, month:'JUL', day:'26', year:2026, title:'Robotics Competition Prep', type:'Workshop', typeColor:'#22c97a', location:'ED 209', time:'10:00 AM – 2:00 PM', desc:'Preparation session for upcoming regional robotics competitions — hardware tuning, algorithm review, and strategy planning.', upcoming:true, capacity:'20 spots', division:'Robotics' },
  /* ── Past ── */
  { id:10, month:'MAR', day:'15', year:2025, title:'Spring Hackathon 2025', type:'Hackathon', typeColor:'#5570f1', location:'ED 209', time:'9:00 AM – 9:00 PM', desc:'Our first major hackathon — 8 teams, 24 hours, 8 prototypes.', upcoming:false, attendees:80, projects:8 },
  { id:11, month:'FEB', day:'08', year:2025, title:'Introduction to ROS2', type:'Workshop', typeColor:'#22c97a', location:'CK 230', time:'2:00 PM – 5:00 PM', desc:'Three-hour hands-on ROS2 workshop with 25 attendees.', upcoming:false, attendees:25 },
  { id:12, month:'NOV', day:'20', year:2024, title:'Industry Night Fall 2024', type:'Networking', typeColor:'#f5a232', location:'Riddell Centre', time:'5:30 PM – 8:00 PM', desc:'Our first ever industry night with 12 company reps.', upcoming:false, attendees:65 },
  { id:13, month:'OCT', day:'05', year:2024, title:'Founding Kickoff Event', type:'Social', typeColor:'#22c97a', location:'Riddell Centre', time:'4:00 PM – 7:00 PM', desc:'The launch event that started it all — 60 founding members.', upcoming:false, attendees:60 },
  { id:14, month:'JAN', day:'18', year:2025, title:'WebXR Workshop', type:'Workshop', typeColor:'#5570f1', location:'CK 226', time:'1:00 PM – 4:00 PM', desc:'Intro to building VR experiences in the browser with Three.js.', upcoming:false, attendees:22 },
  { id:15, month:'APR', day:'12', year:2025, title:'End-of-Year Showcase 2025', type:'Social', typeColor:'#22c97a', location:'RI Centre', time:'3:00 PM – 7:00 PM', desc:'Division project showcases + annual social. Record turnout of 140.', upcoming:false, attendees:140 },
];

const TYPE_COLORS = { Hackathon:'#5570f1', Workshop:'#22c97a', Networking:'#f5a232', 'Build Night':'#5570f1', Social:'#22c97a' };

export default function Events() {
  const [filter, setFilter] = useState('All');
  const upcoming = ALL_EVENTS.filter(e => e.upcoming);
  const past = ALL_EVENTS.filter(e => !e.upcoming);

  const filters = ['All','Hackathon','Workshop','Build Night','Networking','Social'];
  const divFilters = ['All Divisions','Metaverse','Robotics','3D Printing'];
  const [divFilter, setDivFilter] = useState('All Divisions');

  const filtered = upcoming.filter(e => {
    const typeOk = filter === 'All' || e.type === filter;
    const divOk = divFilter === 'All Divisions' || e.division === divFilter || e.division === 'All';
    return typeOk && divOk;
  });

  const months = [...new Set(filtered.map(e => `${e.month} ${e.year}`))];

  const r1 = useReveal(), r2 = useReveal();

  const typeTagStyle = (type, color) => ({
    color, background:`${color}18`, border:`1px solid ${color}33`
  });

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
          <p className="events-hero-sub">Hackathons, workshops, build nights, networking, and social events — open to all University of Regina students.</p>
          <div style={{display:'flex',gap:16,marginTop:32,flexWrap:'wrap'}}>
            {[['9','Upcoming Events'],['3','This Month'],['120+','Avg. Attendance']].map(([n,l])=>(
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
                  <div className="event-date-day" style={{color: e.typeColor}}>{e.day}</div>
                  <div className="event-date-month">{e.month}</div>
                </div>
                <div className="event-main">
                  <div className="event-title-row">
                    <div className="event-title">{e.title}</div>
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
                <div className="event-right">
                  <span className="event-type-tag" style={typeTagStyle(e.type, e.typeColor)}>{e.type}</span>
                  <Link to="/join" className="event-rsvp">
                    RSVP
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Past events */}
      <div className="past-section">
        <div className="section-inner">
          <div className="reveal" ref={r1}>
            <div className="section-label">PAST EVENTS</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:0}}>What we've done</h2>
            <div className="past-grid">
              {past.map(e=>(
                <div className="past-card" key={e.id}>
                  <div className="past-card-date">{e.month} {e.day}, {e.year}</div>
                  <div className="past-card-name">{e.title}</div>
                  <div className="past-card-meta">{e.location}</div>
                  <div style={{display:'flex',gap:16}}>
                    <span className="event-type-tag" style={{...typeTagStyle(e.type,e.typeColor),display:'inline-block'}}>{e.type}</span>
                    {e.attendees && <span className="past-card-stat" style={{color:'rgba(255,255,255,0.3)'}}>{e.attendees} attended</span>}
                    {e.projects && <span className="past-card-stat" style={{color:'rgba(255,255,255,0.3)'}}>{e.projects} projects</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{borderTop:'1px solid var(--border)'}}>
        <div className="events-cta">
          <div>
            <div className="section-label">STAY IN THE LOOP</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,3vw,40px)',fontWeight:700,letterSpacing:'-0.02em'}}>Never miss an event — <span style={{color:'var(--blue)'}}>join the Discord</span></h2>
          </div>
          <div style={{display:'flex',gap:12,flexShrink:0,flexWrap:'wrap'}}>
            <Link to="/join" className="btn-primary">Join URSU Technology</Link>
            <a href="#" className="btn-ghost">Discord Server</a>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
