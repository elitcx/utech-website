import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import Nav from '../../components/Nav';
import Marquee from '../../components/Marquee';
import Footer from '../../components/Footer';
import { DIVISION_PROJECTS, STATUS_COLORS } from '../../data/projects';
import '../../styles/divisions.css';

function ArduinoCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');const W=canvas.width,H=canvas.height;
    let t=0;
    const BW=240,BH=175,BX=W/2-120,BY=H/2-87;
    const traces=[{pts:[[BX+40,BY+55],[BX+40,BY+28],[BX+95,BY+28]]},{pts:[[BX+75,BY+55],[BX+75,BY+18],[BX+150,BY+18],[BX+150,BY+55]]},{pts:[[BX+115,BY+120],[BX+115,BY+150],[BX+55,BY+150]]},{pts:[[BX+170,BY+120],[BX+190,BY+120],[BX+190,BY+158],[BX+95,BY+158]]},{pts:[[BX+210,BY+75],[BX+228,BY+75],[BX+228,BY+46],[BX+190,BY+46]]},{pts:[[BX+40,BY+95],[BX+18,BY+95],[BX+18,BY+46],[BX+55,BY+46],[BX+55,BY+55]]},];
    const currents=traces.map(()=>Math.random());
    const lerp=(a,b,t2)=>a+(b-a)*t2;
    const getPt=(pts,p)=>{const segs=pts.length-1,seg=Math.min(Math.floor(p*segs),segs-1),loc=(p*segs)-seg;return[lerp(pts[seg][0],pts[seg+1][0],loc),lerp(pts[seg][1],pts[seg+1][1],loc)];};
    const leds=[{x:BX+BW-26,y:BY+20,color:'#22c97a',phase:0},{x:BX+BW-26,y:BY+37,color:'#5570f1',phase:1.2},{x:BX+BW-26,y:BY+48,color:'#f5a232',phase:2.4},{x:BX+BW-26,y:BY+63,color:'#22c97a',phase:0.6}];
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const bg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,200);bg.addColorStop(0,'rgba(34,201,122,0.06)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      const r=7;ctx.fillStyle='#0d3320';ctx.strokeStyle='rgba(34,201,122,0.4)';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(BX+r,BY);ctx.lineTo(BX+BW-r,BY);ctx.arcTo(BX+BW,BY,BX+BW,BY+r,r);ctx.lineTo(BX+BW,BY+BH-r);ctx.arcTo(BX+BW,BY+BH,BX+BW-r,BY+BH,r);ctx.lineTo(BX+r,BY+BH);ctx.arcTo(BX,BY+BH,BX,BY+BH-r,r);ctx.lineTo(BX,BY+r);ctx.arcTo(BX,BY,BX+r,BY,r);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.strokeStyle='rgba(34,201,122,0.03)';ctx.lineWidth=0.5;for(let x=BX+10;x<BX+BW;x+=18){ctx.beginPath();ctx.moveTo(x,BY+4);ctx.lineTo(x,BY+BH-4);ctx.stroke();}for(let y=BY+10;y<BY+BH;y+=18){ctx.beginPath();ctx.moveTo(BX+4,y);ctx.lineTo(BX+BW-4,y);ctx.stroke();}
      [[BX+12,BY+12],[BX+BW-12,BY+12],[BX+12,BY+BH-12],[BX+BW-12,BY+BH-12]].forEach(([cx,cy])=>{ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.fillStyle='#050f0a';ctx.fill();ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.lineWidth=1;ctx.stroke();});
      traces.forEach(tr=>{ctx.beginPath();ctx.moveTo(tr.pts[0][0],tr.pts[0][1]);tr.pts.slice(1).forEach(p=>ctx.lineTo(p[0],p[1]));ctx.strokeStyle='rgba(34,201,122,0.22)';ctx.lineWidth=2;ctx.stroke();});
      currents.forEach((p,ti)=>{currents[ti]=(currents[ti]+0.005)%1;const[cx,cy]=getPt(traces[ti].pts,currents[ti]);ctx.beginPath();ctx.arc(cx,cy,2.5,0,Math.PI*2);ctx.fillStyle='#22c97a';ctx.fill();const g=ctx.createRadialGradient(cx,cy,0,cx,cy,8);g.addColorStop(0,'rgba(34,201,122,0.4)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(cx-8,cy-8,16,16);});
      ctx.fillStyle='#1a2a22';ctx.strokeStyle='rgba(34,201,122,0.35)';ctx.lineWidth=1;ctx.fillRect(BX-20,BY+BH/2-16,20,32);ctx.strokeRect(BX-20,BY+BH/2-16,20,32);ctx.fillStyle='#050f0a';ctx.fillRect(BX-16,BY+BH/2-10,12,20);
      const CX=BX+120,CY=BY+87,CS=40;ctx.fillStyle='#0a1f12';ctx.strokeStyle='rgba(34,201,122,0.5)';ctx.lineWidth=1;ctx.fillRect(CX-CS/2,CY-CS/2,CS,CS);ctx.strokeRect(CX-CS/2,CY-CS/2,CS,CS);
      for(let i=0;i<6;i++){const py=CY-CS/2+7+i*6;ctx.fillStyle='rgba(34,201,122,0.4)';ctx.fillRect(CX-CS/2-4,py,4,2.5);ctx.fillRect(CX+CS/2,py,4,2.5);}
      ctx.fillStyle='rgba(34,201,122,0.5)';ctx.font='6px Space Mono,monospace';ctx.textAlign='center';ctx.fillText('ATmega',CX,CY-3);ctx.fillText('328P',CX,CY+5);ctx.textAlign='left';
      leds.forEach(led=>{const blink=0.55+Math.sin(t*0.06+led.phase)*0.45;ctx.globalAlpha=blink;ctx.beginPath();ctx.arc(led.x,led.y,3.5,0,Math.PI*2);ctx.fillStyle=led.color;ctx.fill();ctx.globalAlpha=1;});
      ctx.fillStyle='rgba(34,201,122,0.3)';ctx.font='6px Space Mono,monospace';['PWR','TX','RX','L'].forEach((l,i)=>ctx.fillText(l,BX+BW-50,leds[i].y+2.5));
      const MX=W*0.68,MY=H*0.06;ctx.fillStyle='rgba(5,15,10,0.9)';ctx.strokeStyle='rgba(34,201,122,0.2)';ctx.lineWidth=0.8;ctx.fillRect(MX,MY,130,68);ctx.strokeRect(MX,MY,130,68);ctx.fillStyle='rgba(34,201,122,0.5)';ctx.font='7px Space Mono,monospace';ctx.fillText('Serial Monitor',MX+5,MY+11);ctx.fillStyle='rgba(34,201,122,0.3)';
      [`> loop() t=${t}`,`> pin13: ${t%60<30?'HIGH':'LOW'}`,`> sensor: ${(Math.sin(t*0.04)*50+50).toFixed(0)}`,`> delay(100)`].forEach((m,i)=>ctx.fillText(m,MX+5,MY+22+i*12));
      if(t%30<15){ctx.fillStyle='#22c97a';ctx.fillRect(MX+5,MY+59,5,7);}
      t++;rafRef.current=requestAnimationFrame(draw);
    };
    draw();return()=>cancelAnimationFrame(rafRef.current);
  },[]);
  return <canvas ref={canvasRef} width={420} height={420} style={{display:'block'}}/>;
}

function LiveSensors() {
  const [sensors,setSensors]=useState({prox:42,torque:78,speed:1240,temp:36.4,volt:4.98,current:0.32});
  useEffect(()=>{
    const id=setInterval(()=>setSensors({prox:Math.floor(Math.random()*60+20),torque:Math.floor(Math.random()*40+55),speed:Math.floor(Math.random()*400+1000),temp:(Math.random()*4+34).toFixed(1),volt:(Math.random()*0.2+4.9).toFixed(2),current:(Math.random()*0.2+0.25).toFixed(2)}),800);
    return()=>clearInterval(id);
  },[]);
  const rows=[
    {label:'PROXIMITY',val:`${sensors.prox} cm`,pct:sensors.prox/100,color:'#22c97a'},
    {label:'TORQUE',val:`${sensors.torque}%`,pct:sensors.torque/100,color:'#5570f1'},
    {label:'SPEED',val:`${sensors.speed} rpm`,pct:sensors.speed/1600,color:'#22c97a'},
    {label:'TEMP',val:`${sensors.temp}°C`,pct:(sensors.temp-30)/20,color:'#f5a232'},
    {label:'VOLTAGE',val:`${sensors.volt}V`,pct:sensors.volt/5,color:'#22c97a'},
    {label:'CURRENT',val:`${sensors.current}A`,pct:sensors.current/0.5,color:'#5570f1'},
  ];
  return (
    <div className="sensor-panel">
      <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'0.15em',color:'rgba(34,201,122,0.5)',marginBottom:4}}>LIVE SENSOR DATA</div>
      {rows.map(r=>(
        <div className="sensor-row" key={r.label}>
          <div className="sensor-label">{r.label}</div>
          <div className="sensor-bar-wrap"><div className="sensor-bar" style={{width:`${Math.min(r.pct*100,100)}%`,background:r.color,boxShadow:`0 0 6px ${r.color}`}}/></div>
          <div className="sensor-val">{r.val}</div>
        </div>
      ))}
    </div>
  );
}

const PROJECTS = DIVISION_PROJECTS.robotics;

const TECH = [
  {name:'Arduino',desc:'Microcontroller platform'},{name:'ROS2',desc:'Robot Operating System'},{name:'Raspberry Pi',desc:'SBC for compute tasks'},{name:'OpenCV',desc:'Computer vision'},
  {name:'C++ / Python',desc:'Primary languages'},{name:'CAD / KiCad',desc:'Mechanical & PCB design'},{name:'MATLAB',desc:'Simulation & analysis'},{name:'3D Printing',desc:'Rapid prototyping'},
];

const LEARN = [
  {title:'Monthly Build Nights',sub:'Monthly · ED 209',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c97a" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>},
  {title:'Intro to ROS2 Workshop',sub:'Monthly · All welcome',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c97a" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>},
  {title:'Electronics Study Group',sub:'Monthly · Instagram',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c97a" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>},
  {title:'Competition Prep Sessions',sub:'Seasonal · Open to all',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c97a" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>},
];

export default function Robotics() {
  const r1=useReveal(),r2=useReveal(),r3=useReveal(),r4=useReveal();
  return (
    <div className="div-green">
      <Nav active="robotics.html"/>
      <section className="div-hero" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="div-hero-bg"/><div className="div-hero-grid"/>
        <div className="div-hero-content" style={{opacity:0,animation:'fadeUp 0.8s 0.2s ease forwards'}}>
          <div className="div-hero-badge"><div className="div-hero-badge-dot"/>Robotics Division · 02</div>
          <h1 className="div-hero-title">Robotics<br/><span style={{color:'var(--white)',fontSize:'0.65em',fontWeight:600}}>& Embedded Systems</span></h1>
          <p className="div-hero-sub">Designing and programming autonomous machines — from 3-DOF arms to computer vision pipelines — that interact with and respond to the physical world.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:32}}>
            {['ROS2','Arduino','OpenCV','Raspberry Pi','Kinematics','C++'].map(t=><span key={t} className="tag-chip green">{t}</span>)}
          </div>
          <div style={{display:'flex',gap:12}}>
            <Link to="/join" className="btn-primary green-btn">Join Division</Link>
            <a href="#projects" className="btn-ghost">See Projects</a>
          </div>
          <div className="div-stat-row">
            {[['24','Members'],['9','Projects'],['5','Events / Sem']].map(([n,l])=>(
              <div key={l}><div className="div-stat-num">{n}</div><div className="div-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="div-hero-canvas"><ArduinoCanvas/></div>
      </section>

      <Marquee items={['Arduino','ROS2','Computer Vision','Raspberry Pi','Servo Motors','Kinematics','OpenCV','Embedded C++','PCB Design']} color="green"/>

      <section id="projects" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r1}>
            <div className="section-label green">PROJECTS</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>What we're building</h2>
            <div className="project-grid">
              {PROJECTS.map(p=>(
                <div className="project-card" key={p.name}>
                  <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:12}}>Robotics</div>
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

      <section style={{background:'var(--bg2)',borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r2}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start'}}>
              <div>
                <div className="section-label green">LIVE DEMO</div>
                <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,2.5vw,36px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16}}>Real sensor data</h2>
                <p style={{fontSize:14,fontWeight:300,color:'var(--white-dim)',lineHeight:1.8,marginBottom:28}}>Our division works with real hardware — from servo torque sensors to ultrasonic proximity detectors. Here's a simulated live readout from a typical robotics session.</p>
              </div>
              <LiveSensors/>
            </div>
          </div>
        </div>
      </section>

      <section style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r3}>
            <div className="section-label green">TECH STACK</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>Our toolkit</h2>
            <div className="tech-grid">
              {TECH.map(t=><div className="tech-card" key={t.name}><div className="tech-card-name">{t.name}</div><div style={{fontSize:12,color:'var(--white-dim)',marginTop:4}}>{t.desc}</div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section style={{background:'var(--bg2)',borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r4}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start'}}>
              <div>
                <div className="section-label green">GET INVOLVED</div>
                <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,2.5vw,36px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16}}>How to participate</h2>
                <p style={{fontSize:14,fontWeight:300,color:'var(--white-dim)',lineHeight:1.8,marginBottom:28}}>Robotics meets monthly for build nights where we work on active projects. Monthly workshops cover ROS2, embedded C++, and computer vision from first principles.</p>
                <Link to="/join" className="btn-primary green-btn">Join Robotics Division</Link>
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
          <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,3vw,40px)',fontWeight:700,letterSpacing:'-0.02em'}}>Ready to build <span style={{color:'var(--accent)'}}>real machines</span>?</h2>
          <div style={{display:'flex',gap:12,flexShrink:0,flexWrap:'wrap'}}>
            <Link to="/join" className="btn-primary green-btn">Join the Division</Link>
            <Link to="/events" className="btn-ghost">Upcoming Events</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
