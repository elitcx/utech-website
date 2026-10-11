import site from './site.json';

export const STATUS_COLORS = {
  Active:       '#22c97a',
  'In Progress':'#5570f1',
  Shipped:      'rgba(255,255,255,0.3)',
};

export const DIV_LABEL = { all:'All Divisions', metaverse:'Metaverse', robotics:'Robotics', printing:'3D Printing' };
export const DIV_ACCENT = { all:'#5570f1', metaverse:'#5570f1', robotics:'#22c97a', printing:'#f5a232' };

// Single source of truth for every project (edit in site.json or the admin dashboard).
// Fields: division ('all'|'metaverse'|'robotics'|'printing'; 'all' appears under every division), name, desc, tags[], status, img, showcase
export const ALL_PROJECTS = site.projects;

export const DIVISION_PROJECTS = {
  metaverse: ALL_PROJECTS.filter(p => p.division === 'metaverse' || p.division === 'all'),
  robotics:  ALL_PROJECTS.filter(p => p.division === 'robotics' || p.division === 'all'),
  printing:  ALL_PROJECTS.filter(p => p.division === 'printing' || p.division === 'all'),
};

// Anything not yet shipped counts as ongoing
export const ACTIVE_PROJECTS = ALL_PROJECTS.filter(p => p.status !== 'Shipped');

export const statusStyle = status => {
  const c = STATUS_COLORS[status] ?? STATUS_COLORS.Shipped;
  return { color: c, background: c + '18', border: `1px solid ${c}33` };
};
