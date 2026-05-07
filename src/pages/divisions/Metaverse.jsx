import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import Nav from '../../components/Nav';
import Marquee from '../../components/Marquee';
import Footer from '../../components/Footer';
import { DIVISION_PROJECTS, STATUS_COLORS } from '../../data/projects';
import '../../styles/divisions.css';

function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({x:290,y:290});
  const rafRef = useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');const W=canvas.width,H=canvas.height;
    const particles=Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.35,vy:(Math.random()-0.5)*0.35,r:Math.random()*1.5+0.3}));
    const S=110;
    const BASE_VERTS=[[-S,-S,-S],[S,-S,-S],[S,S,-S],[-S,S,-S],[-S,-S,S],[S,-S,S],[S,S,S],[-S,S,S]];
    const EDGES=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    let t=0;
    const rot=(p,rx,ry,rz)=>{let[x,y,z]=p;let ny=y*Math.cos(rx)-z*Math.sin(rx),nz=y*Math.sin(rx)+z*Math.cos(rx);y=ny;z=nz;let nx=x*Math.cos(ry)+z*Math.sin(ry);nz=-x*Math.sin(ry)+z*Math.cos(ry);x=nx;z=nz;nx=x*Math.cos(rz)-y*Math.sin(rz);ny=x*Math.sin(rz)+y*Math.cos(rz);return[nx,ny,nz];};
    const proj=([x,y,z])=>{const f=450/(450+z+220),cx=W/2,cy=H/2;return[cx+x*f,cy+y*f,f];};
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const gY=H*0.73,vX=W/2+(mouseRef.current.x-W/2)*0.03;
      ctx.lineWidth=0.6;
      for(let i=-10;i<=10;i++){ctx.beginPath();ctx.moveTo(vX+i*36,gY-10);ctx.lineTo(vX+i*260,H+20);ctx.strokeStyle='rgba(85,112,241,0.1)';ctx.stroke();}
      for(let j=0;j<6;j++){const yy=gY+j*(H-gY+20)/5;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke();}
      const hg=ctx.createLinearGradient(0,gY-20,0,gY+20);hg.addColorStop(0,'transparent');hg.addColorStop(0.5,'rgba(85,112,241,0.1)');hg.addColorStop(1,'transparent');ctx.fillStyle=hg;ctx.fillRect(0,gY-20,W,40);
      particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(85,112,241,${0.12+p.r*0.08})`;ctx.fill();});
      const mx=(mouseRef.current.x/W-0.5),my=(mouseRef.current.y/H-0.5);
      const rx=t*0.006+my*0.6,ry=t*0.009+mx*0.7,rz=t*0.004;
      const pv=BASE_VERTS.map(v=>proj(rot(v,rx,ry,rz)));
      const cg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,160);cg.addColorStop(0,'rgba(85,112,241,0.1)');cg.addColorStop(1,'transparent');ctx.fillStyle=cg;ctx.fillRect(0,0,W,H);
      EDGES.forEach(([a,b])=>{const[ax,ay,ad]=pv[a],[bx,by,bd]=pv[b];ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.strokeStyle=`rgba(85,112,241,${Math.min(ad,bd)*1.1})`;ctx.lineWidth=1.4;ctx.stroke();});
      pv.forEach(([px,py,pd])=>{ctx.beginPath();ctx.arc(px,py,3*pd,0,Math.PI*2);ctx.fillStyle=`rgba(85,112,241,${pd})`;ctx.fill();});
      const ringR=170,ringT=t*0.007;
      for(let i=0;i<60;i++){const a=i/60*Math.PI*2+ringT;const rx2=Math.cos(a)*ringR,ry2=Math.sin(a)*ringR*0.28;ctx.beginPath();ctx.arc(W/2+rx2,H/2+ry2,i%8===0?3:1,0,Math.PI*2);ctx.fillStyle=i%8===0?'rgba(34,201,122,0.7)':'rgba(85,112,241,0.25)';ctx.fill();}
      t++;rafRef.current=requestAnimationFrame(draw);
    };
    const onMouse=e=>{const r=canvas.getBoundingClientRect();mouseRef.current={x:e.clientX-r.left,y:e.clientY-r.top};};
    canvas.addEventListener('mousemove',onMouse);draw();
    return()=>{cancelAnimationFrame(rafRef.current);canvas.removeEventListener('mousemove',onMouse);};
  },[]);
  return <canvas ref={canvasRef} width={440} height={440} style={{display:'block'}}/>;
}

const PROJECTS = DIVISION_PROJECTS.metaverse;

const TECH = [
  {name:'Unity',desc:'Game engine for 2D/3D builds'},
  {name:'Godot',desc:'Open-source game engine'},
  {name:'React',desc:'Component-based web UIs'},
  {name:'Blender',desc:'3D modelling & game assets'},
  {name:'Figma',desc:'UI/UX design & prototyping'},
  {name:'C# / JS',desc:'Primary code languages'},
  {name:'HTML / CSS',desc:'Web structure & styling'},
  {name:'Tailwind CSS',desc:'Utility-first styling'},
];

const LEARN = [
  {title:'Monthly Build Nights',sub:'Monthly · ED 209',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>},
  {title:'Game Design Workshop',sub:'Monthly · Open to all',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12s1.5-4 4-4 4 4 4 4-1.5 4-4 4-4-4-4-4z"/><circle cx="12" cy="12" r="1"/></svg>},
  {title:'Web Design Study Group',sub:'Monthly · Instagram',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><line x1="2" y1="12" x2="12" y2="17"/><line x1="22" y1="12" x2="12" y2="17"/></svg>},
  {title:'Industry Speaker Series',sub:'Quarterly · Open to all',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
];

export default function Metaverse() {
  const r1=useReveal(),r2=useReveal(),r3=useReveal(),r4=useReveal();
  return (
    <div className="div-blue">
      <Nav active="metaverse.html"/>
      {/* Hero */}
      <section className="div-hero" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="div-hero-bg"/><div className="div-hero-grid"/>
        <div className="div-hero-content" style={{opacity:0,animation:'fadeUp 0.8s 0.2s ease forwards'}}>
          <div className="div-hero-badge"><div className="div-hero-badge-dot"/>Game Design & Web Design Division · 01</div>
          <h1 className="div-hero-title">Game Design<br/><span style={{color:'var(--white)',fontSize:'0.65em',fontWeight:600}}>& Web Design</span></h1>
          <p className="div-hero-sub">Building interactive games and polished web experiences at the intersection of game mechanics, creative coding, and modern web development.</p>
          <div className="div-hero-tags">
            {['Unity','Godot','React','HTML/CSS','Figma','JavaScript'].map(t=><span key={t} className="tag-chip">{t}</span>)}
          </div>
          <div style={{display:'flex',gap:12}}>
            <Link to="/join" className="btn-primary">Join Division</Link>
            <a href="#projects" className="btn-ghost">See Projects</a>
          </div>
          <div className="div-stat-row">
            {[['31','Members'],['6','Projects'],['4','Events / Sem']].map(([n,l])=>(
              <div key={l}><div className="div-stat-num">{n}</div><div className="div-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="div-hero-canvas"><HeroCanvas/></div>
      </section>

      <Marquee items={['Unity','Godot','React','HTML/CSS','JavaScript','Figma','Blender','Game Design','Web Development']}/>

      {/* Projects */}
      <section id="projects" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r1}>
            <div className="section-label">PROJECTS</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>What we're building</h2>
            <div className="project-grid">
              {PROJECTS.map(p=>(
                <div className="project-card" key={p.name}>
                  <div className="project-card-div">Game Design & Web Design</div>
                  <div className="project-card-name">{p.name}</div>
                  <p className="project-card-desc">{p.desc}</p>
                  <div className="project-card-tags">{p.tags.map(t=><span key={t} className="project-card-tag">{t}</span>)}</div>
                  <div className="project-status" style={{color:STATUS_COLORS[p.status],background:STATUS_COLORS[p.status]+'18',border:`1px solid ${STATUS_COLORS[p.status]}33`}}>{p.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{background:'var(--bg2)',borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r2}>
            <div className="section-label">TECH STACK</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>Our toolkit</h2>
            <div className="tech-grid">
              {TECH.map(t=>(
                <div className="tech-card" key={t.name}>
                  <div className="tech-card-name">{t.name}</div>
                  <div className="tech-card-desc" style={{fontSize:12,color:'var(--white-dim)',marginTop:4}}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r3}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start'}}>
              <div>
                <div className="section-label">GET INVOLVED</div>
                <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,2.5vw,36px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16}}>How to participate</h2>
                <p style={{fontSize:14,fontWeight:300,color:'var(--white-dim)',lineHeight:1.8,marginBottom:28}}>The Game Design & Web Design division holds monthly build nights and runs a monthly game design workshop open to all members. No experience required — just curiosity and willingness to learn.</p>
                <Link to="/join" className="btn-primary">Join Game Design & Web Design</Link>
              </div>
              <div className="learn-grid">
                {LEARN.map(l=>(
                  <div className="learn-item" key={l.title}>
                    <div className="learn-item-icon">{l.icon}</div>
                    <div><div className="learn-item-title">{l.title}</div><div className="learn-item-sub">{l.sub}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-div">
        <div className="cta-div-inner">
          <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,3vw,40px)',fontWeight:700,letterSpacing:'-0.02em'}}>Ready to build <span style={{color:'var(--accent)'}}>games & websites</span>?</h2>
          <div style={{display:'flex',gap:12,flexShrink:0,flexWrap:'wrap'}}>
            <Link to="/join" className="btn-primary">Join the Division</Link>
            <Link to="/events" className="btn-ghost">Upcoming Events</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
