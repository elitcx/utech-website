import site from './site.json';

// Single source of truth for the leadership roster (About page, division pages, home showcase).
// Edit people in src/data/site.json or from the admin dashboard.
export const TEAM = site.team;

export const DIV_COLORS = {
  Community:     '#5570f1',
  Metaverse:     '#5570f1',
  Robotics:      '#22c97a',
  '3D Printing': '#f5a232',
};

export const teamOf = div => TEAM.filter(m => m.div === div);

// Division lead / vice lead, matched by role ("Robotics Lead", "Robotics Vice Lead")
export const leadersOf = div => ({
  lead: TEAM.find(m => m.div === div && m.role === `${div} Lead`)?.name ?? 'TBA',
  vice: TEAM.find(m => m.div === div && m.role === `${div} Vice Lead`)?.name ?? 'TBA',
});
