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

// Fields: id, month (3-letter), day (2-digit string), year, title, type (must match TYPE_COLORS key),
//         location, time, desc, division ('All'|'Metaverse'|'Robotics'|'3D Printing')
// Optional: featured (bool), capacity (string)
// upcoming/past is determined automatically from the date — no manual flag needed
export const ALL_EVENTS = [
  { id:1,  month:'MAY', day:'09', year:2026, title:'3D Printer Unboxing',           type:'Social',    location:'Smart Classroom 2',             time:'14:00 PM – 16:00 PM', desc:'Unboxing and first-run of the new Bambu Lab X1 Carbon COMBO with AMS. Open to all members.',                                                              division:'All' },
  { id:2,  month:'JUL', day:'12', year:2026, title:'MPLS U-TECH Showcase',          type:'Social',    location:'Auditorium',                    time:'10:00 AM – 12:00 PM', desc:'Holding the U-TECH stand for new grade X students entering SMA Regina Pacis and promotion for the U-TECH community.',                                     capacity:'5 spots',  division:'All' },
  { id:3,  month:'OCT', day:'25', year:2026, title:'IRGL 2026',                     type:'Hackathon', location:'Universitas Petra Surabaya',    time:'10:00 AM – 6:00 PM',  desc:'Informatics Rally Games and Logic Competition by Universitas Petra Surabaya.',                                                                             featured:true, capacity:'12 spots', division:'All' },
  { id:4,  month:'OCT', day:'31', year:2026, title:'Ursuline Cup Project Showcase', type:'Social',    location:'Auditorium',                    time:'10:00 AM – 2:00 PM',  desc:'Final end-of-year showcase of U-TECH projects so far for the Ursuline Cup Event.',                                                                       featured:true, capacity:'6 spots',  division:'All' },
];

const MONTH_INDEX = { JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11 };

export const isUpcoming = e =>
  new Date(e.year, MONTH_INDEX[e.month], Number(e.day)) >=
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
