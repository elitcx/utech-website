import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DIVISION_PROJECTS } from '../../data/projects';

/* ── MetaverseCanvas ── */
function MetaverseCanvas({ active }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 290, y: 290 });
  const rafRef = useRef(null);
  const activeRef = useRef(active);
  const restartRef = useRef(null);
  useEffect(() => {
    activeRef.current = active;
    if (active && restartRef.current) restartRef.current();
  }, [active]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
      r: Math.random()*1.6+0.3,
    }));
    const S = 130;
    const BASE_VERTS = [[-S,-S,-S],[S,-S,-S],[S,S,-S],[-S,S,-S],[-S,-S,S],[S,-S,S],[S,S,S],[-S,S,S]];
    const EDGES = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    let t = 0;
    const rot = (p,rx,ry,rz) => {
      let [x,y,z]=p;
      let ny=y*Math.cos(rx)-z*Math.sin(rx),nz=y*Math.sin(rx)+z*Math.cos(rx); y=ny;z=nz;
      let nx=x*Math.cos(ry)+z*Math.sin(ry);nz=-x*Math.sin(ry)+z*Math.cos(ry);x=nx;z=nz;
      nx=x*Math.cos(rz)-y*Math.sin(rz);ny=x*Math.sin(rz)+y*Math.cos(rz);
      return[nx,ny,nz];
    };
    const proj = ([x,y,z]) => { const f=500/(500+z+250),cx=W/2,cy=H/2; return[cx+x*f,cy+y*f,f]; };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      // grid floor
      const gY=H*0.73, vX=W/2+(mouseRef.current.x-W/2)*0.03;
      ctx.lineWidth=0.6;
      for(let i=-10;i<=10;i++){
        ctx.beginPath();ctx.moveTo(vX+i*36,gY-10);ctx.lineTo(vX+i*260,H+20);
        ctx.strokeStyle='rgba(85,112,241,0.1)';ctx.stroke();
      }
      for(let j=0;j<6;j++){
        const yy=gY+j*(H-gY+20)/5;
        ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke();
      }
      const hg=ctx.createLinearGradient(0,gY-20,0,gY+20);
      hg.addColorStop(0,'transparent');hg.addColorStop(0.5,'rgba(85,112,241,0.1)');hg.addColorStop(1,'transparent');
      ctx.fillStyle=hg;ctx.fillRect(0,gY-20,W,40);
      // particles
      particles.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(85,112,241,${0.15+p.r*0.1})`;ctx.fill();
      });
      const mx=(mouseRef.current.x/W-0.5), my=(mouseRef.current.y/H-0.5);
      const rx=t*0.006+my*0.6, ry=t*0.009+mx*0.7, rz=t*0.004;
      const pv=BASE_VERTS.map(v=>proj(rot(v,rx,ry,rz)));
      // glow
      const cg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,170);
      cg.addColorStop(0,'rgba(85,112,241,0.1)');cg.addColorStop(1,'transparent');
      ctx.fillStyle=cg;ctx.fillRect(0,0,W,H);
      EDGES.forEach(([a,b])=>{
        const[ax,ay,ad]=pv[a],[bx,by,bd]=pv[b];
        ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);
        ctx.strokeStyle=`rgba(85,112,241,${Math.min(ad,bd)*1.1})`;ctx.lineWidth=1.4;ctx.stroke();
      });
      pv.forEach(([px,py,pd])=>{
        ctx.beginPath();ctx.arc(px,py,3*pd,0,Math.PI*2);ctx.fillStyle=`rgba(85,112,241,${pd})`;ctx.fill();
        ctx.beginPath();ctx.arc(px,py,7*pd,0,Math.PI*2);ctx.fillStyle=`rgba(85,112,241,${pd*0.18})`;ctx.fill();
      });
      // orbiting ring
      const ringR=190, ringT=t*0.007;
      for(let i=0;i<60;i++){
        const a=i/60*Math.PI*2+ringT;
        const rx2=Math.cos(a)*ringR, ry2=Math.sin(a)*ringR*0.28;
        ctx.beginPath();ctx.arc(W/2+rx2,H/2+ry2,i%8===0?3:1,0,Math.PI*2);
        ctx.fillStyle=i%8===0?'rgba(34,201,122,0.7)':'rgba(85,112,241,0.25)';ctx.fill();
      }
      // small octahedron orbiting
      const oA=t*0.015, oR=175;
      const ox=W/2+Math.cos(oA)*oR, oy=H/2+Math.sin(oA)*oR*0.3-20;
      const os=22;
      const oVerts=[[0,-os,0],[os,0,0],[0,0,os],[-os,0,0],[0,0,-os],[0,os,0]];
      const oE=[[0,1],[0,2],[0,3],[0,4],[5,1],[5,2],[5,3],[5,4],[1,2],[2,3],[3,4],[4,1]];
      const opv=oVerts.map(v=>{const[px,py,pd]=proj(rot(v,rx*1.6,ry*1.4,0));return[px-W/2+ox,py-H/2+oy,pd];});
      oE.forEach(([a,b])=>{
        ctx.beginPath();ctx.moveTo(opv[a][0],opv[a][1]);ctx.lineTo(opv[b][0],opv[b][1]);
        ctx.strokeStyle='rgba(34,201,122,0.5)';ctx.lineWidth=0.8;ctx.stroke();
      });
      t++;
      if (activeRef.current) { rafRef.current = requestAnimationFrame(draw); } else { rafRef.current = null; }
    };
    const onMouse=e=>{const r=canvas.getBoundingClientRect();mouseRef.current={x:e.clientX-r.left,y:e.clientY-r.top};};
    canvas.addEventListener('mousemove',onMouse);
    restartRef.current = () => { if (!rafRef.current) draw(); };
    draw();
    return()=>{cancelAnimationFrame(rafRef.current);canvas.removeEventListener('mousemove',onMouse);};
  },[]);
  return <canvas ref={canvasRef} width={580} height={580} style={{display:'block'}}/>;
}

/* ── RoboticsCanvas: Arduino board ── */
function RoboticsCanvas({ active }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(active);
  const restartRef = useRef(null);
  useEffect(() => {
    activeRef.current = active;
    if (active && restartRef.current) restartRef.current();
  }, [active]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0;
    const BW=260,BH=190,BX=W/2-130,BY=H/2-95+10;
    const traces=[
      {pts:[[BX+40,BY+60],[BX+40,BY+30],[BX+100,BY+30]]},
      {pts:[[BX+80,BY+60],[BX+80,BY+20],[BX+160,BY+20],[BX+160,BY+60]]},
      {pts:[[BX+120,BY+130],[BX+120,BY+160],[BX+60,BY+160]]},
      {pts:[[BX+180,BY+130],[BX+200,BY+130],[BX+200,BY+170],[BX+100,BY+170]]},
      {pts:[[BX+220,BY+80],[BX+240,BY+80],[BX+240,BY+50],[BX+200,BY+50]]},
      {pts:[[BX+220,BY+100],[BX+250,BY+100],[BX+250,BY+160],[BX+220,BY+160]]},
      {pts:[[BX+40,BY+100],[BX+20,BY+100],[BX+20,BY+50],[BX+60,BY+50],[BX+60,BY+60]]},
    ];
    const currents=traces.map(()=>Math.random());
    const lerp=(a,b,t2)=>a+(b-a)*t2;
    const getPt=(pts,p)=>{
      const segs=pts.length-1,seg=Math.min(Math.floor(p*segs),segs-1),loc=(p*segs)-seg;
      return[lerp(pts[seg][0],pts[seg+1][0],loc),lerp(pts[seg][1],pts[seg+1][1],loc)];
    };
    const digitalPins=Array.from({length:14},(_,i)=>({x:BX+20+i*16.5,y:BY-14}));
    const analogPins=Array.from({length:6},(_,i)=>({x:BX+50+i*18,y:BY+BH+14}));
    const powerPins=[{x:BX+BW-60,y:BY-14},{x:BX+BW-42,y:BY-14},{x:BX+BW-24,y:BY-14}];
    const leds=[{x:BX+BW-28,y:BY+22,color:'#22c97a',phase:0},{x:BX+BW-28,y:BY+40,color:'#5570f1',phase:1.2},{x:BX+BW-28,y:BY+52,color:'#f5a232',phase:2.4},{x:BX+BW-28,y:BY+68,color:'#22c97a',phase:0.6}];
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const bg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,220);bg.addColorStop(0,'rgba(34,201,122,0.07)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      // board
      const r=8;ctx.fillStyle='#0d3320';ctx.strokeStyle='rgba(34,201,122,0.4)';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(BX+r,BY);ctx.lineTo(BX+BW-r,BY);ctx.arcTo(BX+BW,BY,BX+BW,BY+r,r);ctx.lineTo(BX+BW,BY+BH-r);ctx.arcTo(BX+BW,BY+BH,BX+BW-r,BY+BH,r);ctx.lineTo(BX+r,BY+BH);ctx.arcTo(BX,BY+BH,BX,BY+BH-r,r);ctx.lineTo(BX,BY+r);ctx.arcTo(BX,BY,BX+r,BY,r);ctx.closePath();ctx.fill();ctx.stroke();
      // grid texture
      ctx.strokeStyle='rgba(34,201,122,0.04)';ctx.lineWidth=0.5;
      for(let x=BX+10;x<BX+BW;x+=20){ctx.beginPath();ctx.moveTo(x,BY+5);ctx.lineTo(x,BY+BH-5);ctx.stroke();}
      for(let y=BY+10;y<BY+BH;y+=20){ctx.beginPath();ctx.moveTo(BX+5,y);ctx.lineTo(BX+BW-5,y);ctx.stroke();}
      // mounting holes
      [[BX+14,BY+14],[BX+BW-14,BY+14],[BX+14,BY+BH-14],[BX+BW-14,BY+BH-14]].forEach(([cx,cy])=>{ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fillStyle='#050f0a';ctx.fill();ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.lineWidth=1;ctx.stroke();});
      // traces
      traces.forEach(tr=>{ctx.beginPath();ctx.moveTo(tr.pts[0][0],tr.pts[0][1]);tr.pts.slice(1).forEach(p=>ctx.lineTo(p[0],p[1]));ctx.strokeStyle='rgba(34,201,122,0.25)';ctx.lineWidth=2;ctx.stroke();});
      // current dots
      currents.forEach((p,ti)=>{
        currents[ti]=(currents[ti]+0.004)%1;
        const[cx,cy]=getPt(traces[ti].pts,currents[ti]);
        ctx.beginPath();ctx.arc(cx,cy,3,0,Math.PI*2);ctx.fillStyle='#22c97a';ctx.fill();
        const g=ctx.createRadialGradient(cx,cy,0,cx,cy,10);g.addColorStop(0,'rgba(34,201,122,0.5)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(cx-10,cy-10,20,20);
      });
      // USB-B
      ctx.fillStyle='#1a2a22';ctx.strokeStyle='rgba(34,201,122,0.35)';ctx.lineWidth=1;ctx.fillRect(BX-22,BY+BH/2-18,22,36);ctx.strokeRect(BX-22,BY+BH/2-18,22,36);ctx.fillStyle='#050f0a';ctx.fillRect(BX-18,BY+BH/2-12,14,24);ctx.strokeStyle='rgba(34,201,122,0.2)';ctx.strokeRect(BX-18,BY+BH/2-12,14,24);
      // ATmega chip
      const CX=BX+130,CY=BY+95,CS=44;ctx.fillStyle='#0a1f12';ctx.strokeStyle='rgba(34,201,122,0.5)';ctx.lineWidth=1;ctx.fillRect(CX-CS/2,CY-CS/2,CS,CS);ctx.strokeRect(CX-CS/2,CY-CS/2,CS,CS);
      for(let i=0;i<7;i++){const py=CY-CS/2+8+i*7;ctx.fillStyle='rgba(34,201,122,0.4)';ctx.fillRect(CX-CS/2-5,py,5,3);ctx.fillRect(CX+CS/2,py,5,3);}
      ctx.fillStyle='rgba(34,201,122,0.5)';ctx.font='7px Space Mono,monospace';ctx.textAlign='center';ctx.fillText('ATmega',CX,CY-4);ctx.fillText('328P',CX,CY+6);ctx.textAlign='left';
      ctx.beginPath();ctx.arc(CX-CS/2+4,CY-CS/2,4,0,Math.PI);ctx.fillStyle='#0a1f12';ctx.fill();
      // crystal
      ctx.fillStyle='#1a2a22';ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.lineWidth=0.8;ctx.fillRect(BX+80,BY+80,18,10);ctx.strokeRect(BX+80,BY+80,18,10);ctx.fillStyle='rgba(34,201,122,0.3)';ctx.font='6px Space Mono,monospace';ctx.fillText('16MHz',BX+68,BY+75);
      // voltage reg
      ctx.fillStyle='#0f2218';ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.lineWidth=0.8;ctx.fillRect(BX+190,BY+60,20,26);ctx.strokeRect(BX+190,BY+60,20,26);for(let i=0;i<3;i++){ctx.fillStyle='rgba(34,201,122,0.35)';ctx.fillRect(BX+194+i*6,BY+86,3,8);}
      // power jack
      ctx.beginPath();ctx.arc(BX+BW+14,BY+BH-35,12,0,Math.PI*2);ctx.fillStyle='#111';ctx.fill();ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.stroke();ctx.beginPath();ctx.arc(BX+BW+14,BY+BH-35,5,0,Math.PI*2);ctx.fillStyle='#050f0a';ctx.fill();
      // pins
      digitalPins.forEach(pin=>{ctx.fillStyle='rgba(34,201,122,0.18)';ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.lineWidth=0.5;ctx.fillRect(pin.x-4,BY-24,8,12);ctx.strokeRect(pin.x-4,BY-24,8,12);ctx.beginPath();ctx.arc(pin.x,BY-18,2,0,Math.PI*2);ctx.fillStyle='rgba(34,201,122,0.5)';ctx.fill();});
      powerPins.forEach(pin=>{ctx.fillStyle='rgba(34,201,122,0.18)';ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.lineWidth=0.5;ctx.fillRect(pin.x-4,BY-24,8,12);ctx.strokeRect(pin.x-4,BY-24,8,12);});
      analogPins.forEach(pin=>{ctx.fillStyle='rgba(34,201,122,0.18)';ctx.strokeStyle='rgba(34,201,122,0.3)';ctx.lineWidth=0.5;ctx.fillRect(pin.x-4,BY+BH+12,8,12);ctx.strokeRect(pin.x-4,BY+BH+12,8,12);ctx.beginPath();ctx.arc(pin.x,BY+BH+18,2,0,Math.PI*2);ctx.fillStyle='rgba(34,201,122,0.45)';ctx.fill();});
      // LEDs
      leds.forEach(led=>{
        const blink=0.55+Math.sin(t*0.06+led.phase)*0.45;
        ctx.globalAlpha=blink;ctx.beginPath();ctx.arc(led.x,led.y,4,0,Math.PI*2);ctx.fillStyle=led.color;ctx.fill();ctx.globalAlpha=1;
      });
      ctx.fillStyle='rgba(34,201,122,0.35)';ctx.font='7px Space Mono,monospace';
      ['PWR','TX','RX','L'].forEach((l2,i)=>ctx.fillText(l2,BX+BW-54,leds[i].y+3));
      // serial monitor
      const MX=W*0.72,MY=H*0.08;ctx.fillStyle='rgba(5,15,10,0.85)';ctx.strokeStyle='rgba(34,201,122,0.2)';ctx.lineWidth=0.8;ctx.fillRect(MX,MY,140,76);ctx.strokeRect(MX,MY,140,76);ctx.fillStyle='rgba(34,201,122,0.5)';ctx.font='7px Space Mono,monospace';ctx.fillText('Serial Monitor',MX+6,MY+12);ctx.fillStyle='rgba(34,201,122,0.3)';
      [`> loop() t=${t}`,`> pin13: ${t%60<30?'HIGH':'LOW'}`,`> sensor: ${(Math.sin(t*0.04)*50+50).toFixed(0)}`,`> delay(100)`].forEach((m,i)=>ctx.fillText(m,MX+6,MY+24+i*13));
      if(t%30<15){ctx.fillStyle='#22c97a';ctx.fillRect(MX+6,MY+66,5,8);}
      t++;
      if (activeRef.current) { rafRef.current = requestAnimationFrame(draw); } else { rafRef.current = null; }
    };
    restartRef.current = () => { if (!rafRef.current) draw(); };
    draw();
    return()=>cancelAnimationFrame(rafRef.current);
  },[]);
  return <canvas ref={canvasRef} width={580} height={580} style={{display:'block'}}/>;
}

/* ── PrintingCanvas: FDM printer frame ── */
function PrintingCanvas({ active }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(active);
  const restartRef = useRef(null);
  const [layer, setLayer] = useState(0);
  useEffect(() => {
    activeRef.current = active;
    if (active && restartRef.current) restartRef.current();
  }, [active]);
  const TOTAL = 40;
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0, curLayer = 0, headX = 0, scanDir = 1;
    const AMBER = '#f5a232';
    const FX=W/2-110,FY=H*0.12,FW=220,FH=280,BED_H=18;
    const getBedY=(l)=>FY+FH-40-l*(FH-80)/TOTAL;
    const modelW=(l)=>{const n=l/TOTAL;if(n<0.1)return 4+n*60;if(n<0.5)return 10;if(n<0.7)return 10+(n-0.5)*30;if(n<0.85)return 16-(n-0.7)*46;return 9;};
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const bg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,230);bg.addColorStop(0,'rgba(245,162,50,0.06)');bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      // frame
      ctx.strokeStyle='rgba(245,162,50,0.25)';ctx.lineWidth=4;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(FX,FY);ctx.lineTo(FX,FY+FH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX+FW,FY);ctx.lineTo(FX+FW,FY+FH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX,FY);ctx.lineTo(FX+FW,FY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX,FY+FH);ctx.lineTo(FX+FW,FY+FH);ctx.stroke();
      [[FX,FY],[FX+FW,FY],[FX,FY+FH],[FX+FW,FY+FH]].forEach(([cx,cy])=>{ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fillStyle='rgba(245,162,50,0.4)';ctx.fill();ctx.beginPath();ctx.arc(cx,cy,9,0,Math.PI*2);ctx.fillStyle='rgba(245,162,50,0.1)';ctx.fill();});
      ctx.setLineDash([4,6]);ctx.strokeStyle='rgba(245,162,50,0.15)';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(FX+18,FY+10);ctx.lineTo(FX+18,FY+FH-10);ctx.stroke();
      ctx.beginPath();ctx.moveTo(FX+FW-18,FY+10);ctx.lineTo(FX+FW-18,FY+FH-10);ctx.stroke();
      ctx.setLineDash([]);
      // gantry rod
      const XY=FY+36;
      ctx.strokeStyle='rgba(245,162,50,0.3)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(FX+8,XY);ctx.lineTo(FX+FW-8,XY);ctx.stroke();
      [FX+8,FX+FW-8].forEach(cx=>{ctx.beginPath();ctx.arc(cx,XY,4,0,Math.PI*2);ctx.fillStyle='rgba(245,162,50,0.35)';ctx.fill();});
      // bed
      const bedY=getBedY(curLayer);
      ctx.fillStyle='rgba(245,100,30,0.12)';ctx.fillRect(FX+12,bedY,FW-24,BED_H);ctx.strokeStyle='rgba(245,162,50,0.5)';ctx.lineWidth=1.5;ctx.strokeRect(FX+12,bedY,FW-24,BED_H);
      const bedGlow=ctx.createRadialGradient(FX+FW/2,bedY+BED_H/2,0,FX+FW/2,bedY+BED_H/2,70);bedGlow.addColorStop(0,'rgba(245,100,30,0.12)');bedGlow.addColorStop(1,'transparent');ctx.fillStyle=bedGlow;ctx.fillRect(FX,bedY-20,FW,50);
      ctx.strokeStyle='rgba(245,162,50,0.1)';ctx.lineWidth=0.5;for(let gx=FX+24;gx<FX+FW-12;gx+=18){ctx.beginPath();ctx.moveTo(gx,bedY+2);ctx.lineTo(gx,bedY+BED_H-2);ctx.stroke();}
      ctx.fillStyle='rgba(245,162,50,0.3)';ctx.font='7px Space Mono,monospace';ctx.textAlign='right';ctx.fillText(`LAYER ${curLayer}`,FX+FW-16,bedY+BED_H+12);ctx.textAlign='left';
      // printed object
      const objBaseY=bedY;
      for(let l=0;l<=curLayer;l++){
        const w=modelW(l),ly=objBaseY-l*((FH-80)/TOTAL),cx2=FX+FW/2,isTop=l===curLayer;
        const alpha=isTop?0.9:(0.15+(l/Math.max(curLayer,1))*0.4);
        ctx.fillStyle=isTop?`rgba(245,162,50,${0.55+Math.sin(t*0.08)*0.2})`:`rgba(245,130,40,${alpha*0.35})`;
        ctx.fillRect(cx2-w,ly-2,w*2,4);
        if(isTop){const lg=ctx.createLinearGradient(cx2-w,ly,cx2+w,ly);lg.addColorStop(0,'transparent');lg.addColorStop(0.5,'rgba(245,162,50,0.5)');lg.addColorStop(1,'transparent');ctx.fillStyle=lg;ctx.fillRect(cx2-w,ly-6,w*2,6);}
      }
      if(curLayer>2){
        ctx.strokeStyle='rgba(245,162,50,0.25)';ctx.lineWidth=1;ctx.beginPath();
        for(let l=0;l<=curLayer;l++){const w=modelW(l),ly=objBaseY-l*((FH-80)/TOTAL),cx2=FX+FW/2;if(l===0)ctx.moveTo(cx2-w,ly);else ctx.lineTo(cx2-w,ly);}
        for(let l=curLayer;l>=0;l--){const w=modelW(l),ly=objBaseY-l*((FH-80)/TOTAL),cx2=FX+FW/2;ctx.lineTo(cx2+w,ly);}
        ctx.closePath();ctx.stroke();
      }
      // print head
      const headPX=FX+FW/2+headX*(FW/2-30),headPY=XY;
      ctx.fillStyle='rgba(245,162,50,0.12)';ctx.strokeStyle='rgba(245,162,50,0.5)';ctx.lineWidth=1.2;ctx.fillRect(headPX-18,headPY-10,36,20);ctx.strokeRect(headPX-18,headPY-10,36,20);
      ctx.fillStyle='rgba(245,162,50,0.2)';ctx.fillRect(headPX-7,headPY+10,14,28);ctx.strokeStyle='rgba(245,162,50,0.4)';ctx.lineWidth=1;ctx.strokeRect(headPX-7,headPY+10,14,28);
      ctx.beginPath();ctx.moveTo(headPX-7,headPY+38);ctx.lineTo(headPX+7,headPY+38);ctx.lineTo(headPX+3,headPY+46);ctx.lineTo(headPX-3,headPY+46);ctx.closePath();ctx.fillStyle='rgba(245,162,50,0.6)';ctx.fill();
      const nozzleY=headPY+46,targetLayer=objBaseY-curLayer*((FH-80)/TOTAL)-2;
      if(nozzleY<targetLayer){const beam=ctx.createLinearGradient(headPX,nozzleY,headPX,targetLayer);beam.addColorStop(0,'rgba(245,162,50,0.7)');beam.addColorStop(1,'rgba(245,162,50,0.1)');ctx.beginPath();ctx.moveTo(headPX-1.5,nozzleY);ctx.lineTo(headPX+1.5,nozzleY);ctx.lineTo(headPX+1.5,targetLayer);ctx.lineTo(headPX-1.5,targetLayer);ctx.closePath();ctx.fillStyle=beam;ctx.fill();}
      const ng=ctx.createRadialGradient(headPX,headPY+46,0,headPX,headPY+46,24);ng.addColorStop(0,'rgba(245,162,50,0.25)');ng.addColorStop(1,'transparent');ctx.fillStyle=ng;ctx.fillRect(headPX-24,headPY+30,48,48);
      // fan
      ctx.beginPath();ctx.arc(headPX+12,headPY+4,5,0,Math.PI*2);ctx.strokeStyle='rgba(245,162,50,0.3)';ctx.lineWidth=0.8;ctx.stroke();
      for(let fa=0;fa<4;fa++){const a=fa/4*Math.PI*2+t*0.1;ctx.beginPath();ctx.moveTo(headPX+12,headPY+4);ctx.lineTo(headPX+12+Math.cos(a)*4,headPY+4+Math.sin(a)*4);ctx.strokeStyle='rgba(245,162,50,0.4)';ctx.stroke();}
      // HUD
      [[W*0.06,H*0.15,'NOZZLE','200°C','rgba(245,162,50,0.7)'],[W*0.06,H*0.26,'BED','60°C','rgba(245,100,30,0.6)']].forEach(([hx,hy,label,val,col])=>{ctx.fillStyle='rgba(10,6,2,0.8)';ctx.strokeStyle='rgba(245,162,50,0.15)';ctx.lineWidth=0.7;ctx.fillRect(hx,hy,90,36);ctx.strokeRect(hx,hy,90,36);ctx.fillStyle='rgba(245,162,50,0.35)';ctx.font='7px Space Mono,monospace';ctx.fillText(label,hx+6,hy+12);ctx.fillStyle=col;ctx.font='bold 12px Space Mono,monospace';ctx.fillText(val,hx+6,hy+26);});
      const pct=curLayer/TOTAL;ctx.fillStyle='rgba(10,6,2,0.8)';ctx.strokeStyle='rgba(245,162,50,0.15)';ctx.lineWidth=0.7;ctx.fillRect(W*0.06,H*0.38,90,42);ctx.strokeRect(W*0.06,H*0.38,90,42);ctx.fillStyle='rgba(245,162,50,0.35)';ctx.font='7px Space Mono,monospace';ctx.fillText('PROGRESS',W*0.06+6,H*0.38+12);ctx.fillStyle='rgba(245,162,50,0.1)';ctx.fillRect(W*0.06+6,H*0.38+17,78,6);ctx.fillStyle=AMBER;ctx.fillRect(W*0.06+6,H*0.38+17,78*pct,6);ctx.fillStyle='rgba(245,162,50,0.6)';ctx.font='bold 10px Space Mono,monospace';ctx.fillText(`${Math.round(pct*100)}%`,W*0.06+6,H*0.38+36);
      headX+=0.016*scanDir;
      if(Math.abs(headX)>1){scanDir*=-1;if(headX>0){curLayer=Math.min(curLayer+1,TOTAL-1);setLayer(curLayer);}}
      t++;
      if (activeRef.current) { rafRef.current = requestAnimationFrame(draw); } else { rafRef.current = null; }
    };
    restartRef.current = () => { if (!rafRef.current) draw(); };
    draw();
    return()=>cancelAnimationFrame(rafRef.current);
  },[]);
  return <canvas ref={canvasRef} width={580} height={580} style={{display:'block'}}/>;
}

/* ══════════════════════════════════════════
   HERO DATA
   ══════════════════════════════════════════ */

const DIV_DATA = [
  {
    div:'metaverse', num:'01',
    badge:'Metaverse Division',
    color:'#5570f1', badgeBg:'rgba(85,112,241,0.1)', badgeBorder:'rgba(85,112,241,0.25)',
    tint:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(85,112,241,0.07) 0%, transparent 70%)',
    title:'Metaverse', titleSub:'& Web Design',
    desc:'Building immersive spatial experiences at the intersection of virtual reality, augmented reality, and real-time 3D.',
    tags:['Unity','Godot','React','HTML/CSS','Figma','JavaScript'],
    btnClass:'', members:31, projects:DIVISION_PROJECTS.metaverse.length, path:'/metaverse',
  },
  {
    div:'robotics', num:'02',
    badge:'Robotics Division',
    color:'#22c97a', badgeBg:'rgba(34,201,122,0.08)', badgeBorder:'rgba(34,201,122,0.25)',
    tint:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(34,201,122,0.06) 0%, transparent 70%)',
    title:'Robotics', titleSub:'& Embedded Systems',
    desc:'Designing autonomous machines — from 3-DOF arms to computer vision pipelines — that interact with the physical world.',
    tags:['ROS2','Arduino','OpenCV','Raspberry Pi','Kinematics','C++'],
    btnClass:'green-btn', members:24, projects:DIVISION_PROJECTS.robotics.length, path:'/robotics',
  },
  {
    div:'printing', num:'03',
    badge:'3D Printing Division',
    color:'#f5a232', badgeBg:'rgba(245,162,50,0.08)', badgeBorder:'rgba(245,162,50,0.25)',
    tint:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245,162,50,0.06) 0%, transparent 70%)',
    title:'3D Printing', titleSub:'& Rapid Prototyping',
    desc:'Turning digital designs into physical objects — high-speed CoreXY FDM, multi-colour AMS, and iterative hardware prototyping.',
    tags:['Fusion 360','CoreXY / AMS','OpenSCAD','Bambu Studio','PLA / PETG / CF','CAD'],
    btnClass:'amber-btn', members:22, projects:DIVISION_PROJECTS.printing.length, path:'/printing',
  },
];

/* ══════════════════════════════════════════
   HERO — SCROLL DRIVEN
   ══════════════════════════════════════════ */

export default function Hero() {
  const wrapRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [textState, setTextState] = useState('shown'); // 'shown','exiting','entering'
  const prevIdx = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current; if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = wrap.offsetHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      setScrollPct(pct);
      const idx = Math.min(2, Math.floor(pct * 3));
      if (idx !== prevIdx.current) {
        setTextState('exiting');
        setTimeout(() => {
          setActiveIdx(idx);
          prevIdx.current = idx;
          setTextState('entering');
          setTimeout(() => setTextState('shown'), 50);
        }, 280);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const d = DIV_DATA[activeIdx];

  return (
    <div className="hero-scroll-wrap" ref={wrapRef}>
      <div className="hero-sticky">
        <div className="hero-dotgrid"/>
        <div className="hero-tint" style={{ background: d.tint }}/>

        {/* Central canvas stack */}
        <div className="hero-canvas-area">
          <div className="hero-canvas-stack">
            {[MetaverseCanvas, RoboticsCanvas, PrintingCanvas].map((Comp, i) => (
              <div key={i} className={`hero-canvas-layer ${i === activeIdx ? 'visible' : 'hidden'}`}>
                <Comp active={i === activeIdx}/>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile division dots */}
        <div className="hero-mobile-dots">
          {DIV_DATA.map((item, i) => (
            <button
              key={i}
              type="button"
              className={`hero-mobile-dot${i === activeIdx ? ' active' : ''}`}
              style={{ background: i === activeIdx ? item.color : 'transparent' }}
              aria-label={`View ${item.title} division`}
              aria-pressed={i === activeIdx}
              onClick={() => {
                const wrap = wrapRef.current; if (!wrap) return;
                const total = wrap.offsetHeight - window.innerHeight;
                window.scrollTo({ top: wrap.offsetTop + (i / 3 + 0.01) * total, behavior: 'smooth' });
              }}
            />
          ))}
        </div>

        {/* Left division nav */}
        <div className="hero-div-nav">
          {DIV_DATA.map((item, i) => (
            <button
              key={i}
              type="button"
              className={`hero-div-nav-item ${i !== activeIdx ? 'inactive' : ''}`}
              style={{ color: item.color }}
              aria-label={`View ${item.title} division`}
              aria-pressed={i === activeIdx}
              onClick={() => {
                const wrap = wrapRef.current; if (!wrap) return;
                const total = wrap.offsetHeight - window.innerHeight;
                const target = wrap.offsetTop + (i / 3 + 0.01) * total;
                window.scrollTo({ top: target, behavior: 'smooth' });
              }}
            >
              <div className="hero-div-nav-pip" style={{ background: item.color }}/>
              <div>
                <div className="hero-div-nav-text">{item.title}</div>
                <div className="hero-div-nav-num">{item.num}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Right scroll progress */}
        <div className="hero-scroll-progress">
          <div className="hero-scroll-track">
            <div className="hero-scroll-fill" style={{ height:`${scrollPct*100}%`, background: d.color }}/>
          </div>
          <div className="hero-scroll-label">Scroll</div>
        </div>

        {/* Info panel */}
        <div className="hero-info-panel">
          <div className={`hero-text-wrap ${textState}`}>
            <div className="hero-info-badge" style={{ color:d.color, background:d.badgeBg, border:`1px solid ${d.badgeBorder}` }}>
              <div className="hero-info-badge-dot" style={{ background:d.color }}/>
              {d.badge}
            </div>
            <div className="hero-info-title">
              <span style={{ color: d.color }}>{d.title}</span><br/>
              <span style={{ color:'var(--white)', fontSize:'0.68em', fontWeight:600, letterSpacing:'-0.01em' }}>{d.titleSub}</span>
            </div>
            <div className="hero-info-desc">{d.desc}</div>
            <div className="hero-info-tags">
              {d.tags.map(t => <span key={t} className="hero-info-tag">{t}</span>)}
            </div>
          </div>

          <div className="hero-info-right">
            <div className="hero-stat">
              <div className="hero-stat-num" style={{ color:d.color }}>{d.members}</div>
              <div className="hero-stat-label">Members</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">{d.projects}</div>
              <div className="hero-stat-label">Projects</div>
            </div>
            <div className="hero-info-actions">
              <Link to="/join" className={`btn-primary ${d.btnClass}`}>Join</Link>
              <Link to={d.path} className="btn-ghost">Learn More</Link>
            </div>
          </div>
        </div>

        {/* Scroll hint — hides after scrolling */}
        <div className="hero-scroll-hint" style={{ opacity: scrollPct < 0.04 ? 1 : 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
          </svg>
          Scroll to explore
        </div>
      </div>
    </div>
  );
}
