import { Link } from 'react-router-dom';
import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Marquee from '../components/Marquee';
import Footer from '../components/Footer';
import { DIV_COLORS, teamOf } from '../data/team';
import { ALL_PROJECTS, ACTIVE_PROJECTS, DIV_LABEL, DIV_ACCENT, statusStyle } from '../data/projects';
import { STATS, fill } from '../data/stats';
import site from '../data/site.json';
import { TIMELINE } from '../data/timeline';

const ACTIVE_COUNT = ACTIVE_PROJECTS.length;
const COLOR_CYCLE = ['rgba(85,112,241,0.08)', 'rgba(34,201,122,0.06)', 'rgba(245,162,50,0.06)'];
const PORTFOLIO = ALL_PROJECTS.filter(p => p.showcase).map((p, i) => ({
  ...p, div: DIV_LABEL[p.division], divColor: DIV_ACCENT[p.division], bg: COLOR_CYCLE[i % 3],
}));
const GALLERY_BGS = ['rgba(85,112,241,0.08)', 'rgba(245,162,50,0.08)', 'rgba(34,201,122,0.08)'];
const GALLERY = site.gallery.map((g, i) => ({
  ...g, wide: g.size === 'wide', tall: g.size === 'tall', bg: GALLERY_BGS[i % 3],
}));
import '../styles/about.css';

const VALUES = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title:'Build First', body:'We believe in learning by doing. Every workshop, session, and meeting centres around making something real.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c97a" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title:'Radically Open', body:'No GPA requirements, no gatekeeping. If you are curious, you belong here, regardless of background or experience level.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5a232" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title:'Aim High', body:'We take on projects that push us. We enter competitions to win. We ship products, not just prototypes.' },
];

const GALLERY_PATTERNS = [
  `repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px)`,
  `repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 16px)`,
  `repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 10px)`,
];

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <img
        className="lightbox-img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function GalleryItem({ item, patternIdx, onOpen }) {
  return (
    <div
      className={`gallery-item${item.wide ? ' wide' : ''}${item.tall ? ' tall' : ''}${item.img ? ' expandable' : ''}`}
      style={{ background: item.bg, backgroundImage: item.img ? 'none' : GALLERY_PATTERNS[patternIdx % 3] }}
      onClick={() => item.img && onOpen(item.img, item.label)}
    >
      {item.img ? (
        <img src={item.img} alt={item.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
      ) : (
        <div className="gallery-placeholder">
          <div style={{ fontSize:20, marginBottom:8, opacity:0.3 }}>📷</div>
          {item.hint}
        </div>
      )}
      <div className="gallery-label">
        <span className="gallery-label-text">{item.label}</span>
        {item.img && <span className="gallery-expand-icon">⤢</span>}
      </div>
    </div>
  );
}


function PortfolioCard({ p, onOpen }) {
  return (
    <div className="portfolio-card">
      <div
        className={`portfolio-thumb${p.img ? ' expandable' : ''}`}
        style={{ background: p.bg }}
        onClick={() => p.img && onOpen(p.img, p.name)}
      >
        {p.img ? (
          <img src={p.img} alt={p.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        ) : (
          <>
            <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 14px)' }} />
            <div className="portfolio-thumb-label">{p.name}<br/>project visual</div>
          </>
        )}
      </div>
      <div className="portfolio-info">
        <div className="portfolio-div" style={{ color:p.divColor }}>{p.div}</div>
        <div className="portfolio-name">{p.name}</div>
        <p className="portfolio-desc">{p.desc}</p>
        <span className="portfolio-status" style={statusStyle(p.status)}>{p.status}</span>
      </div>
    </div>
  );
}

// ── Leadership Tunnel ─────────────────────────────────────────────
const withColor = div => teamOf(div).map(m => ({ ...m, color: DIV_COLORS[div] }));
const TUNNEL_SECTIONS = [
  { title:'COMMUNITY', color:DIV_COLORS.Community,     members: withColor('Community') },
  { title:'METAVERSE', color:DIV_COLORS.Metaverse,     members: withColor('Metaverse') },
  { title:'ROBOTICS',  color:DIV_COLORS.Robotics,      members: withColor('Robotics') },
  { title:'3D PRINT',  color:DIV_COLORS['3D Printing'], members: withColor('3D Printing') },
];

function LeadershipTunnel() {
  const outerRef  = useRef(null);
  const sceneRef  = useRef(null);   // perspective wrapper — 3D stacking context
  const worldRef  = useRef(null);
  const progRef   = useRef(null);
  const rosterRef = useRef(null);
  const elMap     = useRef({});

  const { allItems, totalDepth } = useMemo(() => {
    const out = [];
    let z = 400;
    TUNNEL_SECTIONS.forEach((sec, si) => {
      out.push({ id:`t${si}`, type:'title', title:sec.title, color:sec.color, z });
      z += 480;
      sec.members.forEach((m, mi) => {
        const single = sec.members.length === 1;
        const xOff = single ? 0 : mi % 2 === 0 ? -310 : 310;
        out.push({ id:`c${si}${mi}`, type:'card', member:m, color:sec.color, z, x:xOff });
        z += 640;
      });
      z += 780;
    });
    const td = z;
    for (let i = 0; i < 70; i++) {
      out.push({
        id:`s${i}`, type:'star',
        x:(Math.random()-0.5)*3400, y:(Math.random()-0.5)*3400,
        z:Math.random()*td,
        sc:['#5570f1','#22c97a','#f5a232','#c8d0f0'][Math.floor(Math.random()*4)],
        sz:Math.random()*2+0.5,
      });
    }
    return { allItems:out, totalDepth:td };
  }, []); // eslint-disable-line

  useEffect(() => {
    const outer  = outerRef.current;
    const scene  = sceneRef.current;
    const world  = worldRef.current;
    const prog   = progRef.current;
    const roster = rosterRef.current;
    const els    = elMap.current;
    const S = { scroll:0, target:0, vel:0, mx:0, my:0 };

    const getAlpha = (vz) => {
      if (vz < -2800) return 0;
      if (vz < -1300) return (vz + 2800) / 1500;
      if (vz >  380)  return Math.max(0, 1 - (vz - 380) / 280);
      return 1;
    };

    const onWheel = (e) => {
      const done = (S.target <= 0 && e.deltaY < 0) || (S.target >= totalDepth && e.deltaY > 0);
      if (done) return;
      e.preventDefault();
      S.target = Math.max(0, Math.min(totalDepth, S.target + e.deltaY * 2.5));
    };

    const onMove = (e) => {
      S.mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      S.my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const done = (S.target <= 0 && dy < 0) || (S.target >= totalDepth && dy > 0);
      if (done) return;
      e.preventDefault();
      S.target = Math.max(0, Math.min(totalDepth, S.target + dy * 3));
    };

    let raf;
    const tick = () => {
      S.vel += ((S.target - S.scroll) * 0.07 - S.vel) * 0.12;
      S.scroll += S.vel;
      const cam = S.scroll;
      const v   = S.vel;
      scene.style.perspective = `${Math.max(500, 800 - Math.abs(v) * 6)}px`;
      world.style.transform   = `rotateX(${S.my * 4 - v * 0.3}deg) rotateY(${S.mx * 4}deg)`;
      if (prog) prog.style.width = `${Math.min(100,(cam/totalDepth)*100)}%`;

      // Cross-fade: world fades out while roster fades in at the tunnel end
      const rp = Math.max(0, Math.min(1, (cam - (totalDepth - 700)) / 700));
      world.style.opacity = Math.max(0, 1 - Math.max(0, (cam - (totalDepth - 900)) / 500));
      if (roster) {
        roster.style.opacity       = rp;
        roster.style.pointerEvents = rp > 0.05 ? 'auto' : 'none';
      }

      // Mobile: scale down x-offset so cards stay on screen
      const vw = window.innerWidth;
      const xScale = vw < 480 ? 0.32 : vw < 768 ? Math.max(0.45, vw / 900) : 1;

      allItems.forEach(item => {
        const el = els[item.id];
        if (!el) return;
        const vz = item.z - cam;
        const a  = getAlpha(vz);
        el.style.opacity = a;
        if (a <= 0) return;

        if (item.type === 'star') {
          const s = Math.max(1, 1 + Math.abs(v) * 0.1);
          el.style.transform = `translate3d(${item.x}px,${item.y}px,${vz}px) scale3d(1,1,${s})`;
        } else if (item.type === 'title') {
          el.style.transform = `translate3d(0,0,${vz}px)`;
          const inn = el.firstChild;
          if (inn) inn.style.textShadow = Math.abs(v) > 1.5
            ? `${v*1.3}px 0 rgba(85,112,241,.65),${-v*1.3}px 0 rgba(34,201,122,.65)` : 'none';
        } else {
          const fy = Math.sin(performance.now()*0.0007 + item.z*0.001) * 8;
          const scaledX = (item.x || 0) * xScale;
          el.style.transform = `translate3d(${scaledX}px,${fy}px,${vz}px)`;
        }
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    outer.addEventListener('wheel',      onWheel,      { passive:false });
    outer.addEventListener('touchstart', onTouchStart, { passive:true  });
    outer.addEventListener('touchmove',  onTouchMove,  { passive:false });
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      outer.removeEventListener('wheel',      onWheel);
      outer.removeEventListener('touchstart', onTouchStart);
      outer.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('mousemove', onMove);
    };
  }, [allItems, totalDepth]);

  return (
    <div ref={outerRef} className="ltunnel">

      {/*
        ltunnel-scene: the ONLY element with perspective + preserve-3d children.
        z-index:1 gives it its own stacking context, so 3D-translated items
        can never escape and paint above the roster (z-index:7).
      */}
      <div ref={sceneRef} className="ltunnel-scene">
        {/* Header: gradient dissolves into the 3-D world */}
        <div className="ltunnel-header">
          <div className="section-label">LEADERSHIP</div>
          <h2 className="ltunnel-header-title">The people behind it all</h2>
        </div>

        {/* Bottom fade blends into the next section */}
        <div className="ltunnel-fade-bot" />

        {/* 3-D world */}
        <div ref={worldRef} className="ltunnel-world">
          {allItems.map(item => {
            if (item.type === 'star') return (
              <div key={item.id} ref={el => elMap.current[item.id]=el}
                className="ltunnel-star"
                style={{ width:item.sz, height:item.sz, background:item.sc }} />
            );

            if (item.type === 'title') return (
              <div key={item.id} ref={el => elMap.current[item.id]=el} className="ltunnel-item">
                <span className="ltunnel-bigtext">{item.title}</span>
              </div>
            );

            if (item.type === 'card') {
              const { member, color } = item;
              return (
                <div key={item.id} ref={el => elMap.current[item.id]=el} className="ltunnel-item">
                  <div className="ltunnel-card" style={{'--tc':color}}>
                    <div className="ltunnel-card-top">
                      <span className="ltunnel-card-role" style={{color}}>// {member.role}</span>
                      <span className="ltunnel-card-pip" style={{background:color}} />
                    </div>
                    <div className="ltunnel-card-avatar"
                      style={{borderColor:color+'55', background:color+'12', color}}>
                      {member.img
                        ? <img src={member.img} alt={member.name}
                            style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} />
                        : member.initials.slice(0,2)
                      }
                    </div>
                    <div className="ltunnel-card-name">{member.name}</div>
                    <div className="ltunnel-card-div" style={{color}}>{member.div}</div>
                    <div className="ltunnel-card-bar"
                      style={{background:`linear-gradient(90deg,${color}88,transparent)`}} />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Roster: lives OUTSIDE the perspective scene so z-index works normally */}
      <div ref={rosterRef} className="ltunnel-roster" style={{opacity:0,pointerEvents:'none'}}>
        <div className="ltunnel-roster-eyebrow">FULL ROSTER</div>
        {TUNNEL_SECTIONS.map(sec => (
          <div key={sec.title} className="ltunnel-roster-group">
            <div className="ltunnel-roster-group-label" style={{color:sec.color}}>{sec.title}</div>
            <div className="ltunnel-roster-row">
              {sec.members.map(m => (
                <div key={m.name} className="ltunnel-roster-card">
                  <div className="ltunnel-roster-avatar"
                    style={{borderColor:sec.color+'55', background:sec.color+'12', color:sec.color}}>
                    {m.img
                      ? <img src={m.img} alt={m.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} />
                      : m.initials.slice(0,2)}
                  </div>
                  <div className="ltunnel-roster-name">{m.name}</div>
                  <div className="ltunnel-roster-role" style={{color:sec.color}}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress & hint above everything */}
      <div ref={progRef} className="ltunnel-progress" />
      <div className="ltunnel-hint">SCROLL TO EXPLORE ↓</div>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────────

export default function About() {
  const revTimeline = useReveal();
  const revPortfolio = useReveal();
  const revGallery = useReveal();
  const revValues = useReveal();
  const [lightbox, setLightbox] = useState(null);
  const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
      <Nav />

      {/* Hero */}
      <section style={{borderBottom:'1px solid var(--border)', position:'relative', overflow:'hidden'}}>
        <div className="page-hero-dotgrid"/>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(85,112,241,0.07) 0%, transparent 70%)'}}/>
        <div className="about-hero-grid">
          <div style={{opacity:0,animation:'fadeUp 0.8s 0.2s ease forwards'}}>
            <div className="about-hero-eyebrow">URSU TECHNOLOGY · EST. 2023</div>
            <h1 className="about-hero-title">We exist to make <em>builders</em> out of every student.</h1>
            <p className="about-hero-sub">URSU Technology is the SMA Regina Pacis Surakarta's student-led tech community. We run workshops, trainings, and industry events, with three technical divisions and {STATS.members} active members.</p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Link to="/join" className="btn-primary">Join the Community</Link>
              <a href="#history" className="btn-ghost">Our Story</a>
            </div>
          </div>
          <div className="about-hero-right" style={{opacity:0,animation:'fadeUp 0.8s 0.4s ease forwards'}}>
            <div className="about-stat-grid">
              {[[STATS.members,'Members','blue'],['3','Divisions','green'],[STATS.eventsPerYear,'Events / Year','amber'],[String(ACTIVE_COUNT),'Active Projects','blue'],[STATS.yearsRunning,'Years Running','green'],[STATS.competitionWins,'Competition Wins','amber']].map(([n,l,c])=>(
                <div className="about-stat" key={l}>
                  <div className={`about-stat-num${c==='green'?' green':c==='amber'?' amber':''}`}>{n}</div>
                  <div className="about-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee items={['Student-Led','SMA Regina Pacis','Since 2023','Open to All','Build · Design · Explore','Surakarta','Community-First']}/>

      {/* Values */}
      <section style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={revValues}>
            <div className="section-label">OUR VALUES</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>What we stand for</h2>
            <div className="values-grid">
              {VALUES.map(v=>(
                <div className="value-card" key={v.title}>
                  <div className="value-icon">{v.icon}</div>
                  <div className="value-title">{v.title}</div>
                  <p className="value-body">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" style={{background:'var(--bg2)',borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={revTimeline}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}}>
              <div>
                <div className="section-label">OUR STORY</div>
                <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16}}>Built from the ground up</h2>
                <p style={{fontSize:15,fontWeight:300,color:'var(--white-dim)',lineHeight:1.8,marginBottom:32}}>Ursuline Technology, abbreviated as U-Tech, is a community that grew and developed following the Integrated Learning 1 (IL 1) exhibition held on October 14, 2023. This community was established as a space for students of SMA-SMP Regina Pacis to explore and develop their potential in modern technology.<br/><br/>U-Tech is divided into three divisions, each focusing on a different aspect of technology: robotics, 3D printing, and metaverse. Each division is designed to provide its members with in-depth experience and knowledge, enabling them to grow in the field of technology they choose.</p>
                <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                  {['2023','2024','2025','2026'].map(y=><span key={y} className="tag-chip neutral">{y}</span>)}
                </div>
              </div>
              <div className="timeline">
                {TIMELINE.map((item,i)=>(
                  <div className="timeline-item" key={i}>
                    <div className="timeline-pip-wrap">
                      <div className="timeline-pip" style={{background:item.color,boxShadow:`0 0 8px ${item.color}`}}/>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-date">{item.date}</div>
                      <div className="timeline-title">{item.title}</div>
                      <p className="timeline-body">{fill(item.body)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team — interactive 3D tunnel (header lives inside the tunnel for seamless blending) */}
      <section style={{borderBottom:'1px solid var(--border)'}}>
        <LeadershipTunnel />
      </section>

      {/* Portfolio */}
      <section style={{background:'var(--bg2)',borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={revPortfolio}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48,flexWrap:'wrap',gap:20}}>
              <div>
                <div className="section-label">PORTFOLIO</div>
                <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em'}}>What we've built</h2>
              </div>
              <Link to="/join" style={{fontFamily:'var(--mono)',fontSize:12,letterSpacing:'0.12em',color:'var(--blue)',textDecoration:'none'}}>CONTRIBUTE A PROJECT →</Link>
            </div>
            <div className="portfolio-grid">
              {PORTFOLIO.map(p => <PortfolioCard key={p.name} p={p} onOpen={openLightbox} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={revGallery}>
            <div className="section-label">GALLERY</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>Community in action</h2>
            <div className="gallery-grid">
              {GALLERY.map((item, i) => <GalleryItem key={i} item={item} patternIdx={i} onOpen={openLightbox} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <h2 className="cta-band-title">Ready to be part of<br/>something <em>real</em>?</h2>
          <div style={{display:'flex',gap:14,flexWrap:'wrap',flexShrink:0}}>
            <Link to="/join" className="btn-primary">Join URSU Technology</Link>
            <Link to="/events" className="btn-ghost">View Events</Link>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}
