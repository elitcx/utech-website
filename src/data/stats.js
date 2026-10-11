import site from './site.json';
import { ALL_PROJECTS, ACTIVE_PROJECTS, DIVISION_PROJECTS } from './projects';

// Community-wide numbers and per-division info, all from site.json
export const STATS = site.stats;
export const DIVISIONS = site.divisions;

export const divInfo = key => ({
  ...DIVISIONS[key],
  projects: DIVISION_PROJECTS[key].length,
});

const TOKENS = {
  ...STATS,
  activeProjects: ACTIVE_PROJECTS.length,
  totalProjects: ALL_PROJECTS.length,
};

// Lets prose reference live numbers, e.g. "Now with {members} members" in the timeline text
export const fill = text => text.replace(/\{(\w+)\}/g, (m, k) => (k in TOKENS ? TOKENS[k] : m));
