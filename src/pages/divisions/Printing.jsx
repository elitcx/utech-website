import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import Nav from '../../components/Nav';
import Marquee from '../../components/Marquee';
import Footer from '../../components/Footer';
import { DIVISION_PROJECTS, STATUS_COLORS } from '../../data/projects';
import '../../styles/divisions.css';

function PrinterCanvas() {
  const canvasRef=useRef(null);const rafRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');const W=canvas.width,H=canvas.height;
    const TOTAL=40;
    let t=0,curLayer=0,headX=0,scanDir=1;
    const FX=W/2-100,FY=H*0.1,FW=200,FH=260,BED_H=16;
    const getBedY=l=>FY+FH-36-l*(FH-72)/TOTAL;
    const modelW=l=>{const n=l/TOTAL;if(n<0.1)return 4+n*55;if(n<0.5)return 9;if(n<0.7)return 9+(n-0.5)*28;if(n<0.85)return 15-(n-0.7)*42;return 8;};
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const bg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,210);bg.addColorStop(0,'rgba(245,162,50,0.06)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(245,162,50,0.22)';ctx.lineWidth=3.5;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(FX,FY);ctx.lineTo(FX,FY+FH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX+FW,FY);ctx.lineTo(FX+FW,FY+FH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX,FY);ctx.lineTo(FX+FW,FY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX,FY+FH);ctx.lineTo(FX+FW,FY+FH);ctx.stroke();
      [[FX,FY],[FX+FW,FY],[FX,FY+FH],[FX+FW,FY+FH]].forEach(([cx,cy])=>{ctx.beginPath();ctx.arc(cx,cy,4.5,0,Math.PI*2);ctx.fillStyle='rgba(245,162,50,0.4)';ctx.fill();});
      ctx.setLineDash([4,6]);ctx.strokeStyle='rgba(245,162,50,0.12)';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(FX+16,FY+8);ctx.lineTo(FX+16,FY+FH-8);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX+FW-16,FY+8);ctx.lineTo(FX+FW-16,FY+FH-8);ctx.stroke();
      ctx.setLineDash([]);
      const XY=FY+32;ctx.strokeStyle='rgba(245,162,50,0.28)';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(FX+6,XY);ctx.lineTo(FX+FW-6,XY);ctx.stroke();
      const bedY=getBedY(curLayer);
      ctx.fillStyle='rgba(245,100,30,0.1)';ctx.fillRect(FX+10,bedY,FW-20,BED_H);ctx.strokeStyle='rgba(245,162,50,0.45)';ctx.lineWidth=1.3;ctx.strokeRect(FX+10,bedY,FW-20,BED_H);
      ctx.strokeStyle='rgba(245,162,50,0.08)';ctx.lineWidth=0.5;for(let gx=FX+22;gx<FX+FW-10;gx+=16){ctx.beginPath();ctx.moveTo(gx,bedY+2);ctx.lineTo(gx,bedY+BED_H-2);ctx.stroke();}
      ctx.fillStyle='rgba(245,162,50,0.28)';ctx.font='6px Space Mono,monospace';ctx.textAlign='right';ctx.fillText(`L${curLayer}`,FX+FW-14,bedY+BED_H+10);ctx.textAlign='left';
      const objBaseY=bedY;
      for(let l=0;l<=curLayer;l++){
        const w=modelW(l),ly=objBaseY-l*((FH-72)/TOTAL),cx2=FX+FW/2,isTop=l===curLayer;
        const alpha=isTop?0.9:(0.12+(l/Math.max(curLayer,1))*0.38);
        ctx.fillStyle=isTop?`rgba(245,162,50,${0.5+Math.sin(t*0.08)*0.25})`:`rgba(245,130,40,${alpha*0.35})`;
        ctx.fillRect(cx2-w,ly-2,w*2,4);
        if(isTop){const lg=ctx.createLinearGradient(cx2-w,ly,cx2+w,ly);lg.addColorStop(0,'transparent');lg.addColorStop(0.5,'rgba(245,162,50,0.45)');lg.addColorStop(1,'transparent');ctx.fillStyle=lg;ctx.fillRect(cx2-w,ly-5,w*2,5);}
      }
      if(curLayer>3){ctx.strokeStyle='rgba(245,162,50,0.2)';ctx.lineWidth=0.8;ctx.beginPath();for(let l=0;l<=curLayer;l++){const w=modelW(l),ly=objBaseY-l*((FH-72)/TOTAL),cx2=FX+FW/2;if(l===0)ctx.moveTo(cx2-w,ly);else ctx.lineTo(cx2-w,ly);}for(let l=curLayer;l>=0;l--){const w=modelW(l),ly=objBaseY-l*((FH-72)/TOTAL),cx2=FX+FW/2;ctx.lineTo(cx2+w,ly);}ctx.closePath();ctx.stroke();}
      const headPX=FX+FW/2+headX*(FW/2-26),headPY=XY;
      ctx.fillStyle='rgba(245,162,50,0.1)';ctx.strokeStyle='rgba(245,162,50,0.45)';ctx.lineWidth=1;ctx.fillRect(headPX-15,headPY-8,30,17);ctx.strokeRect(headPX-15,headPY-8,30,17);
      ctx.fillStyle='rgba(245,162,50,0.18)';ctx.fillRect(headPX-6,headPY+9,12,24);ctx.strokeRect(headPX-6,headPY+9,12,24);
      ctx.beginPath();ctx.moveTo(headPX-6,headPY+33);ctx.lineTo(headPX+6,headPY+33);ctx.lineTo(headPX+2.5,headPY+40);ctx.lineTo(headPX-2.5,headPY+40);ctx.closePath();ctx.fillStyle='rgba(245,162,50,0.55)';ctx.fill();
      const nY=headPY+40,tL=objBaseY-curLayer*((FH-72)/TOTAL)-2;
      if(nY<tL){const beam=ctx.createLinearGradient(headPX,nY,headPX,tL);beam.addColorStop(0,'rgba(245,162,50,0.65)');beam.addColorStop(1,'rgba(245,162,50,0.08)');ctx.beginPath();ctx.moveTo(headPX-1.2,nY);ctx.lineTo(headPX+1.2,nY);ctx.lineTo(headPX+1.2,tL);ctx.lineTo(headPX-1.2,tL);ctx.closePath();ctx.fillStyle=beam;ctx.fill();}
      const ng=ctx.createRadialGradient(headPX,headPY+40,0,headPX,headPY+40,20);ng.addColorStop(0,'rgba(245,162,50,0.22)');ng.addColorStop(1,'transparent');ctx.fillStyle=ng;ctx.fillRect(headPX-20,headPY+28,40,40);
      for(let fa=0;fa<4;fa++){const a=fa/4*Math.PI*2+t*0.09;ctx.beginPath();ctx.moveTo(headPX+10,headPY+3);ctx.lineTo(headPX+10+Math.cos(a)*3.5,headPY+3+Math.sin(a)*3.5);ctx.strokeStyle='rgba(245,162,50,0.35)';ctx.lineWidth=0.8;ctx.stroke();}
      const pct=curLayer/TOTAL;
      ctx.fillStyle='rgba(10,6,2,0.85)';ctx.strokeStyle='rgba(245,162,50,0.15)';ctx.lineWidth=0.6;ctx.fillRect(W*0.03,H*0.1,84,32);ctx.strokeRect(W*0.03,H*0.1,84,32);
      ctx.fillStyle='rgba(245,162,50,0.35)';ctx.font='6px Space Mono,monospace';ctx.fillText('PROGRESS',W*0.03+5,H*0.1+10);
      ctx.fillStyle='rgba(245,162,50,0.08)';ctx.fillRect(W*0.03+5,H*0.1+14,74,4);ctx.fillStyle='#f5a232';ctx.fillRect(W*0.03+5,H*0.1+14,74*pct,4);
      ctx.fillStyle='rgba(245,162,50,0.6)';ctx.font='bold 9px Space Mono,monospace';ctx.fillText(`${Math.round(pct*100)}%`,W*0.03+5,H*0.1+28);
      headX+=0.016*scanDir;if(Math.abs(headX)>1){scanDir*=-1;if(headX>0){curLayer=Math.min(curLayer+1,TOTAL-1);}}
      t++;rafRef.current=requestAnimationFrame(draw);
    };
    draw();return()=>cancelAnimationFrame(rafRef.current);
  },[]);
  return <canvas ref={canvasRef} width={400} height={420} style={{display:'block'}}/>;
}

const PROJECTS = DIVISION_PROJECTS.printing;

const TECH = [
  {name:'Fusion 360',desc:'Parametric CAD design'},{name:'OpenSCAD',desc:'Programmatic 3D modelling'},{name:'Bambu Studio / OrcaSlicer',desc:'FDM slicing & tuning'},{name:'Multi-Colour AMS',desc:'16-filament automated material system'},
  {name:'CoreXY High-Speed',desc:'Up to 20,000 mm/s² acceleration'},{name:'Pressure Advance',desc:'Vibration compensation & flow tuning'},{name:'PLA / PETG / ABS / CF',desc:'FDM & abrasive filaments'},{name:'Blender',desc:'Organic & sculpt forms'},
];

const LEARN = [
  {title:'Open Print Nights',sub:'Monthly · Print Lab',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5a232" strokeWidth="1.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>},
  {title:'CAD Design Workshop',sub:'Monthly · Open to all',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5a232" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>},
  {title:'Slicer Settings Deep-Dive',sub:'Monthly · Instagram',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5a232" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>},
  {title:'Material Science Talk',sub:'Quarterly · All welcome',icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5a232" strokeWidth="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>},
];

export default function Printing() {
  const r1=useReveal(),r2=useReveal(),r3=useReveal(),r4=useReveal();
  return (
    <div className="div-amber">
      <Nav active="printing.html"/>
      <section className="div-hero" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="div-hero-bg"/><div className="div-hero-grid"/>
        <div className="div-hero-content" style={{opacity:0,animation:'fadeUp 0.8s 0.2s ease forwards'}}>
          <div className="div-hero-badge"><div className="div-hero-badge-dot"/>3D Printing Division · 03</div>
          <h1 className="div-hero-title">3D Printing<br/><span style={{color:'var(--white)',fontSize:'0.65em',fontWeight:600}}>& Rapid Prototyping</span></h1>
          <p className="div-hero-sub">Turning digital designs into physical objects — high-speed CoreXY FDM, multi-colour AMS printing, parametric CAD, and iterative hardware prototyping for every division and project.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:32}}>
            {['Fusion 360','CoreXY / AMS','OpenSCAD','Bambu Studio','PLA / PETG / CF','CAD'].map(t=><span key={t} className="tag-chip amber">{t}</span>)}
          </div>
          <div style={{display:'flex',gap:12}}>
            <Link to="/join" className="btn-primary amber-btn">Join Division</Link>
            <a href="#projects" className="btn-ghost">See Projects</a>
          </div>
          <div className="div-stat-row">
            {[['22','Members'],['16','Projects'],['4','Events / Sem']].map(([n,l])=>(
              <div key={l}><div className="div-stat-num">{n}</div><div className="div-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="div-hero-canvas"><PrinterCanvas/></div>
      </section>

      <Marquee items={['Fusion 360','FDM Printing','CoreXY High-Speed','OpenSCAD','Bambu Studio','PETG / PLA / CF','Rapid Prototyping','Parametric CAD','Multi-Material AMS']} color="amber"/>

      <section id="projects" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r1}>
            <div className="section-label amber">PROJECTS</div>
            <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:48}}>What we're building</h2>
            <div className="project-grid">
              {PROJECTS.map(p=>(
                <div className="project-card" key={p.name}>
                  <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:12}}>3D Printing</div>
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
                <div className="section-label amber">PRINT SPECS</div>
                <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,2.5vw,36px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16}}>Our lab setup</h2>
                <p style={{fontSize:14,fontWeight:300,color:'var(--white-dim)',lineHeight:1.8,marginBottom:28}}>The 3D Printing division operates a Bambu Lab X1 Carbon COMBO with AMS — a high-speed CoreXY printer with Lidar-assisted error detection and 16-colour multi-material support. Members get supervised access during open print nights and can run prints for any division project.</p>
              </div>
              <div className="print-widget">
                <div className="print-widget-title">Lab Equipment</div>
                {[['FDM Printer','Bambu Lab X1 Carbon COMBO · AMS · CoreXY · Lidar'],['Feeder System','Direct · Single nozzle · 0.4 mm'],['Build Volume','256 × 256 × 256 mm'],['Max Temperature','Hotend 300 °C · Bed 110 °C'],['Connectivity','Wi-Fi · microSD · Camera'],['Materials','PLA, PETG, ABS, TPU · Up to 16 colours via AMS']].map(([k,v])=>(
                  <div className="print-param" key={k}>
                    <span className="print-param-label">{k}</span>
                    <span className="print-param-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{borderBottom:'1px solid var(--border)'}}>
        <div className="section-inner">
          <div className="reveal" ref={r3}>
            <div className="section-label amber">TECH STACK</div>
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
                <div className="section-label amber">GET INVOLVED</div>
                <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,2.5vw,36px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16}}>How to participate</h2>
                <p style={{fontSize:14,fontWeight:300,color:'var(--white-dim)',lineHeight:1.8,marginBottom:28}}>Monthly open print nights — bring a model or learn CAD from scratch. Monthly workshops cover everything from Fusion 360 basics to advanced slicer techniques and material science.</p>
                <Link to="/join" className="btn-primary amber-btn">Join 3D Printing Division</Link>
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
          <h2 style={{fontFamily:'var(--display)',fontSize:'clamp(24px,3vw,40px)',fontWeight:700,letterSpacing:'-0.02em'}}>Ready to print your <span style={{color:'var(--accent)'}}>first idea</span>?</h2>
          <div style={{display:'flex',gap:12,flexShrink:0,flexWrap:'wrap'}}>
            <Link to="/join" className="btn-primary amber-btn">Join the Division</Link>
            <Link to="/events" className="btn-ghost">Upcoming Events</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
