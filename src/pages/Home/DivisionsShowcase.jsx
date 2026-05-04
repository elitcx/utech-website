import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';

const DIVISIONS = [
  {
    num: '01',
    div: 'metaverse',
    name: 'Metaverse',
    color: '#5570f1',
    glowColor: 'rgba(85,112,241,0.12)',
    iconBg: 'rgba(85,112,241,0.1)',
    desc: 'Building immersive XR experiences — from VR worlds and spatial UI to WebGL shaders and game engines.',
    tags: ['Unity', 'WebXR', 'Spatial UI', 'AR/VR', 'Shaders', 'Three.js'],
    members: 31, projects: 12,
    projects_list: [
      { name: 'Campus AR Navigator', status: 'Active' },
      { name: 'VR Physics Sandbox', status: 'Active' },
      { name: 'Metaverse Storefront Demo', status: 'Shipped' },
    ],
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    num: '02',
    div: 'robotics',
    name: 'Robotics',
    color: '#22c97a',
    glowColor: 'rgba(34,201,122,0.1)',
    iconBg: 'rgba(34,201,122,0.08)',
    desc: 'Designing and programming autonomous machines — robotic arms, rovers, embedded systems, and computer vision.',
    tags: ['ROS2', 'Arduino', 'OpenCV', 'Raspberry Pi', 'Kinematics', 'C++'],
    members: 24, projects: 9,
    projects_list: [
      { name: '3-DOF Arm Controller', status: 'Active' },
      { name: 'Autonomous Line Follower', status: 'Shipped' },
      { name: 'CV Object Sorter', status: 'Active' },
    ],
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="3" y="11" width="4" height="8" rx="1"/>
        <rect x="10" y="7" width="4" height="12" rx="1"/>
        <rect x="17" y="9" width="4" height="10" rx="1"/>
        <line x1="5" y1="11" x2="5" y2="7"/><circle cx="5" cy="6" r="1.5"/>
      </svg>
    ),
  },
  {
    num: '03',
    div: 'printing',
    name: '3D Printing',
    color: '#f5a232',
    glowColor: 'rgba(245,162,50,0.1)',
    iconBg: 'rgba(245,162,50,0.08)',
    desc: 'Rapid prototyping from CAD to physical object — FDM, SLA resin, parametric design, and hardware iteration.',
    tags: ['Fusion 360', 'FDM/SLA', 'OpenSCAD', 'Slicing', 'PLA/PETG', 'CAD'],
    members: 22, projects: 16,
    projects_list: [
      { name: 'Modular Enclosure System', status: 'Active' },
      { name: 'Custom Robotics Mounts', status: 'Shipped' },
      { name: 'Parametric Keyboard Case', status: 'Active' },
    ],
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <polyline points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <line x1="2" y1="12" x2="12" y2="17"/>
        <line x1="22" y1="12" x2="12" y2="17"/>
      </svg>
    ),
  },
];

export default function DivisionsShowcase() {
  const [active, setActive] = useState(null);
  const ref = useReveal();

  return (
    <section className="divisions-section">
      <div className="divisions-inner">
        <div className="reveal" ref={ref}>
          <div className="divisions-header">
            <div>
              <div className="section-label">OUR DIVISIONS</div>
              <h2 className="divisions-title">Three communities,<br/>one <em>ecosystem</em></h2>
            </div>
            <p className="divisions-sub">Each division runs its own projects, workshops, and events — and frequently collaborates across boundaries.</p>
          </div>

          <div className="divisions-grid">
            {DIVISIONS.map((d) => {
              const isActive = active === d.div;
              return (
                <div
                  key={d.div}
                  className="div-card"
                  data-active={isActive}
                  style={{ borderColor: isActive ? d.color + '55' : undefined }}
                  onClick={() => setActive(isActive ? null : d.div)}
                >
                  <div className="div-card-top">
                    <div className="div-card-glow" style={{
                      background: `radial-gradient(circle, ${d.glowColor} 0%, transparent 70%)`,
                      opacity: isActive ? 1 : 0.5,
                    }}/>
                    <div className="div-card-num">{d.num} / 03</div>
                    <div className="div-card-icon" style={{ background: d.iconBg }}>
                      {d.icon(d.color)}
                    </div>
                    <div className="div-card-name" style={{ color: isActive ? d.color : 'var(--white)' }}>
                      {d.name}
                    </div>
                    <p className="div-card-desc">{d.desc}</p>
                  </div>

                  <div className="div-card-tags">
                    {d.tags.map(t => (
                      <span key={t} className="div-card-tag">{t}</span>
                    ))}
                  </div>

                  <div className="div-detail" style={{ maxHeight: isActive ? '320px' : '0' }}>
                    <div className="div-detail-inner">
                      <div className="div-detail-title">Active Projects</div>
                      <div className="div-projects">
                        {d.projects_list.map(p => (
                          <div key={p.name} className="div-project">
                            <div className="div-project-dot" style={{ background: d.color }}/>
                            <span className="div-project-name">{p.name}</span>
                            <span className="div-project-status">{p.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="div-card-footer">
                    <div style={{ display:'flex', gap:32 }}>
                      <div className="div-stat">
                        <div className="div-stat-num" style={{ color: d.color }}>{d.members}</div>
                        <div className="div-stat-label">Members</div>
                      </div>
                      <div className="div-stat">
                        <div className="div-stat-num">{d.projects}</div>
                        <div className="div-stat-label">Projects</div>
                      </div>
                    </div>
                    <div className="div-card-arrow" style={{ borderColor: isActive ? d.color + '55' : undefined, color: isActive ? d.color : undefined }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
