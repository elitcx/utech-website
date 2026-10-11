import site from './site.json';

export const TYPE_COLORS = {
  Hackathon:    '#5570f1',
  Workshop:     '#22c97a',
  'Build Night':'#5570f1',
  Networking:   '#f5a232',
  Social:       '#22c97a',
};

export const TYPE_TAG_STYLE = {
  Hackathon:    'blue',
  Workshop:     'green',
  'Build Night':'blue',
  Networking:   'amber',
  Social:       'green',
};

// Event data lives in site.json (edited from the admin dashboard or by hand).
// Fields: id, month (3-letter), day, year, title, type (must match TYPE_COLORS key),
//         location, time, desc, division ('All'|'Metaverse'|'Robotics'|'3D Printing')
// Optional: featured (bool), capacity (string)
// upcoming/past is determined automatically from the date — no manual flag needed
export const ALL_EVENTS = site.events;

const MONTH_INDEX = { JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11 };

export const isUpcoming = e =>
  new Date(e.year, MONTH_INDEX[e.month], Number(e.day)) >=
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
