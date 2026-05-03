import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import Nav from '../../components/Nav';
import Marquee from '../../components/Marquee';
import Footer from '../../components/Footer';
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

const PROJECTS = [
  {name:'Campus AR Navigator',desc:'An AR app built in Unity that overlays real-time wayfinding and room information onto the UR campus using image anchors and GPS.',tags:['Unity','ARCore','C#','GPS'],status:'Active',statusColor:'#22c97a'},
  {name:'VR Physics Sandbox',desc:'Interactive WebXR environment for visualising physics simulations — gravity, fluid dynamics, and collision modelling in real-time VR.',tags:['WebXR','Three.js','JavaScript','Physics'],status:'Active',statusColor:'#22c97a'},
  {name:'Procedural World Gen',desc:'A Unity project exploring procedural terrain and building generation for open-world XR environments using noise functions.',tags:['Unity','C#','Shaders','PCG'],status:'In Progress',statusColor:'#5570f1'},
  {name:'Spatial UI Toolkit',desc:'A reusable library of 3D UI components — panels, buttons, sliders — designed for immersive XR interfaces in WebXR and Unity.',tags:['WebXR','React','Three.js','UX'],status:'Shipped',statusColor:'rgba(255,255,255,0.3)'},
  {name:'AR Study Room',desc:'An augmented reality study companion that pins virtual notes, timers, and reminders to physical locations in a real room.',tags:['ARKit','Swift','UX','iOS'],status:'In Progress',statusColor:'#5570f1'},
  {name:'Metaverse Storefront',desc:'A proof-of-concept virtual storefront in WebGL — browsing products in 3D space with realistic lighting and physics.',tags:['WebGL','Three.js','Blender','E-commerce'],status:'Shipped',statusColor:'rgba(255,255,255,0.3)'},
];

const TECH = [
  {name:'Unity',desc:'Game engine for VR/AR builds'},
  {name:'WebXR',desc:'Browser-based XR APIs'},
  {name:'Three.js',desc:'3D in the browser'},
  {name:'Blender',desc:'3D modelling & animation'},
  {name:'ARCore/Kit',desc:'Mobile AR frameworks'},
  {name:'C# / JS',desc:'Primary code languages'},
  {name:'GLSL Shaders',desc:'Custom visual effects'},
  {name:'Unreal 5',desc:'High-fidelity environments'},
];

const LEARN = [
  {title:'Weekly Build Nights',sub:'Every Thursday · ED 209',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>},
  {title:'XR Design Workshop',sub:'Monthly · Open to all',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12s1.5-4 4-4 4 4 4 4-1.5 4-4 4-4-4-4-4z"/><circle cx="12" cy="12" r="1"/></svg>},
  {title:'Shader Study Group',sub:'Bi-weekly · Discord',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><line x1="2" y1="12" x2="12" y2="17"/><line x1="22" y1="12" x2="12" y2="17"/></svg>},
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
          <div className="div-hero-badge"><div className="div-hero-badge-dot"/>Metaverse Division · 01</div>
          <h1 className="div-hero-title">Metaverse<br/><span style={{color:'var(--white)',fontSize:'0.65em',fontWeight:600}}>& XR Design</span></h1>
          <p className="div-hero-sub">Building immersive spatial experiences at the intersection of virtual reality, augmented reality, game design, and real-time 3D rendering.</p>
          <div className="div-hero-tags">
            {['Unity','WebXR','Spatial UI','AR / VR','Shaders','Three.js'].map(t=><span key={t} className="tag-chip">{t}</span>)}
          </div>
          <div style={{display:'flex',gap:12}}>
            <Link to="/join" className="btn-primary">Join Division</Link>
            <a href="#projects" className="btn-ghost">See Projects</a>
          </div>
          <div className="div-stat-row">
            {[['38','Members'],['6','Projects'],['4','Events / Sem']].map(([n,l])=>(
              <div key={l}><div className="div-stat-num">{n}</div><div className="div-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="div-hero-canvas"><HeroCanvas/></div>
      </section>

      <Marquee items={['Unity','WebXR','Spatial Computing','ARCore','Three.js','GLSL Shaders','Blender','Virtual Reality','Augmented Reality']}/>

      {/* Projects */}
      <section id="projects" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r1}>
            <div className="section-label">PROJECTS</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>What we're building</h2>
            <div className="project-grid">
              {PROJECTS.map(p=>(
                <div className="project-card" key={p.name}>
                  <div className="project-card-div">Metaverse</div>
                  <div className="project-card-name">{p.name}</div>
                  <p className="project-card-desc">{p.desc}</p>
                  <div className="project-card-tags">{p.tags.map(t=><span key={t} className="project-card-tag">{t}</span>)}</div>
                  <div className="project-status" style={{color:p.statusColor,background:p.statusColor+'18',border:`1px solid ${p.statusColor}33`}}>{p.status}</div>
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
                <p style={{fontSize:14,fontWeight:300,color:'var(--white-dim)',lineHeight:1.8,marginBottom:28}}>The Metaverse division meets weekly for build nights and runs a monthly XR design workshop open to all members. No experience required — just curiosity and willingness to learn.</p>
                <Link to="/join" className="btn-primary">Join Metaverse Division</Link>
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
          <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,3vw,40px)',fontWeight:700,letterSpacing:'-0.02em'}}>Ready to build in <span style={{color:'var(--accent)'}}>3D space</span>?</h2>
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
