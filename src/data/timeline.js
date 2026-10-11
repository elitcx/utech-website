import site from './site.json';

const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

// Timeline dates are free text ("October 14, 2023", "February 2024", "2026–Present").
// This reads the year / month / day out of the text so milestones can be put in order.
export const timelineKey = text => {
  const t = String(text || '').toLowerCase();
  const year = Number((t.match(/(?:19|20)\d{2}/) || [])[0]) || 0;
  const mi = MONTHS.findIndex(m => t.includes(m));
  const day = Number((t.match(/\b([0-3]?\d)\b(?=\s*,|\s*$)/) || [])[1]) || 0;
  return (t.includes('present') ? 9999 : year) * 10000 + (mi + 1) * 100 + (mi >= 0 ? day : 0);
};

export const sortTimeline = items => items
  .map((x, i) => [x, i])
  .sort((a, b) => timelineKey(a[0].date) - timelineKey(b[0].date) || a[1] - b[1])
  .map(([x]) => x);

// Oldest first
export const TIMELINE = sortTimeline(site.timeline);
