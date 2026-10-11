import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, clearToken, loadSite, saveSite, uploadImage } from './api';
import { TYPE_COLORS, isUpcoming } from '../data/events';
import './admin.css';

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DIVS = [
  { key: 'metaverse', label: 'Metaverse', tone: 'blue' },
  { key: 'robotics', label: 'Robotics', tone: 'green' },
  { key: 'printing', label: '3D Printing', tone: 'amber' },
];
const DIV_TONE = { all: 'violet', metaverse: 'blue', robotics: 'green', printing: 'amber' };
const DIV_NAME = { all: 'All divisions', metaverse: 'Metaverse', robotics: 'Robotics', printing: '3D Printing' };
const STATUS_TONE = { Active: 'green', 'In Progress': 'blue', Shipped: 'neutral' };
const SECTION_TONE = { Community: 'blue', Metaverse: 'blue', Robotics: 'green', '3D Printing': 'amber' };
const EVENT_DIV_TONE = { All: 'violet', Metaverse: 'blue', Robotics: 'green', '3D Printing': 'amber' };
const MONTH_IDX = Object.fromEntries(MONTHS.map((m, i) => [m, i]));
const eventTime = e => new Date(e.year, MONTH_IDX[e.month], Number(e.day) || 1).getTime();

/* ── small pieces ───────────────────────────────────────────────── */
const Chip = ({ tone = 'neutral', children }) => <span className={`adm-chip ${tone}`}>{children}</span>;

// Remembers local previews so a freshly uploaded photo shows before the site is redeployed
const previews = new Map();

function Tags({ value, onChange }) {
  const joined = (value || []).join(', ');
  return <input key={joined} defaultValue={joined} placeholder="Unity, Figma, Arduino"
    onBlur={e => onChange(e.target.value.split(',').map(t => t.trim()).filter(Boolean))} />;
}

function Image({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const pick = async e => {
    const file = e.target.files[0]; e.target.value = '';
    if (!file) return;
    setBusy(true); setErr('');
    try {
      const path = await uploadImage(file);
      previews.set(path, URL.createObjectURL(file));
      onChange(path);
    } catch (x) { setErr(x.message); }
    setBusy(false);
  };
  return (
    <div className="adm-image">
      <div className="adm-thumb">{value ? <img src={previews.get(value) || value} alt="" /> : <span>No photo</span>}</div>
      <div className="adm-image-actions">
        <label className="adm-btn">
          {busy ? 'Uploading…' : value ? 'Replace photo' : 'Upload photo'}
          <input type="file" accept="image/*" hidden onChange={pick} disabled={busy} />
        </label>
        {value && <button type="button" className="adm-btn subtle" onClick={() => onChange(null)}>Remove</button>}
        {err && <small className="err">{err}</small>}
      </div>
    </div>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div className="adm-seg">
      {options.map(([v, label]) => (
        <button type="button" key={String(v)} className={value === v ? 'on' : ''} onClick={() => onChange(v)}>{label}</button>
      ))}
    </div>
  );
}

function Control({ f, value, onChange }) {
  switch (f.type) {
    case 'textarea': return <textarea rows="3" value={value ?? ''} onChange={e => onChange(e.target.value)} />;
    case 'number': return <input type="number" value={value ?? ''} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))} />;
    case 'select': return (
      <select value={String(value ?? '')} onChange={e => onChange(e.target.value)}>
        {f.options.map(o => { const [v, l] = Array.isArray(o) ? o : [o, o]; return <option key={v} value={v}>{l}</option>; })}
      </select>
    );
    case 'bool': return <Segmented value={!!value} onChange={onChange} options={[[false, f.no || 'No'], [true, f.yes || 'Yes']]} />;
    case 'tags': return <Tags value={value} onChange={onChange} />;
    case 'image': return <Image value={value} onChange={onChange} />;
    default: return <input value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={f.placeholder} />;
  }
}

function Fields({ fields, value, onChange }) {
  return (
    <div className="adm-grid">
      {fields.map(f => (
        <div className={`adm-field${f.wide ? ' wide' : ''}`} key={f.key}>
          <span className="adm-label">{f.label}</span>
          <Control f={f} value={value[f.key]} onChange={v => onChange({ ...value, [f.key]: v })} />
          {f.hint && <small>{f.hint}</small>}
        </div>
      ))}
    </div>
  );
}

/* ── list editor: filters, collapsible rows, add / reorder / delete ─ */
function ListEditor({ items, onChange, fields, blank, titleOf, chipsOf, thumbOf, noun, filters, sortFn, empty }) {
  const [filter, setFilter] = useState(filters ? filters[0].key : null);
  const [open, setOpen] = useState(null);
  const active = filters?.find(f => f.key === filter);
  let rows = items.map((it, i) => ({ it, i })).filter(r => !active || active.test(r.it));
  if (sortFn) rows = rows.sort((a, b) => sortFn(a.it, b.it));

  const set = (i, v) => onChange(items.map((x, j) => (j === i ? v : x)));
  const add = () => { onChange([...items, blank(items, active)]); setOpen(items.length); };
  const del = i => {
    if (!window.confirm(`Delete "${titleOf(items[i]) || `this ${noun}`}"? This can't be undone once published.`)) return;
    onChange(items.filter((_, j) => j !== i)); setOpen(null);
  };
  const move = (pos, d) => {
    const a = rows[pos], b = rows[pos + d]; if (!b) return;
    const next = [...items]; [next[a.i], next[b.i]] = [next[b.i], next[a.i]];
    onChange(next); if (open === a.i) setOpen(b.i);
  };

  return (
    <>
      <div className="adm-toolbar">
        {filters ? (
          <div className="adm-pills">
            {filters.map(f => (
              <button type="button" key={f.key} className={f.key === filter ? 'on' : ''} onClick={() => { setFilter(f.key); setOpen(null); }}>
                {f.label}<em>{items.filter(f.test).length}</em>
              </button>
            ))}
          </div>
        ) : <span />}
        <button type="button" className="adm-btn primary" onClick={add}>+ New {noun}</button>
      </div>

      {rows.length === 0 && <div className="adm-empty">{empty || `No ${noun}s here yet.`}</div>}

      <div className="adm-list">
        {rows.map(({ it, i }, pos) => {
          const isOpen = open === i;
          const thumb = thumbOf?.(it);
          return (
            <div className={`adm-row${isOpen ? ' open' : ''}`} key={i}>
              <div className="adm-row-head" onClick={() => setOpen(isOpen ? null : i)} role="button" tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') setOpen(isOpen ? null : i); }}>
                {thumbOf && <div className="adm-row-thumb">{thumb ? <img src={previews.get(thumb) || thumb} alt="" /> : null}</div>}
                <div className="adm-row-title">{titleOf(it) || <i>Untitled {noun}</i>}</div>
                <div className="adm-row-chips">{chipsOf?.(it)}</div>
                {!sortFn && (
                  <span className="adm-row-move" onClick={e => e.stopPropagation()}>
                    <button type="button" aria-label="Move up" disabled={pos === 0} onClick={() => move(pos, -1)}>↑</button>
                    <button type="button" aria-label="Move down" disabled={pos === rows.length - 1} onClick={() => move(pos, 1)}>↓</button>
                  </span>
                )}
                <span className="adm-caret">{isOpen ? '−' : '+'}</span>
              </div>
              {isOpen && (
                <div className="adm-row-body">
                  <Fields fields={fields} value={it} onChange={v => set(i, v)} />
                  <div className="adm-row-foot"><button type="button" className="adm-btn danger" onClick={() => del(i)}>Delete {noun}</button></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ── field schemas ──────────────────────────────────────────────── */
const nextId = items => Math.max(0, ...items.map(x => Number(x.id) || 0)) + 1;

const PROJECT_FIELDS = [
  { key: 'name', label: 'Project name', wide: true },
  { key: 'division', label: 'Division', type: 'select', hint: '"All divisions" makes it appear under Metaverse, Robotics and 3D Printing.',
    options: [['metaverse', 'Metaverse'], ['robotics', 'Robotics'], ['printing', '3D Printing'], ['all', 'All divisions']] },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'In Progress', 'Shipped'],
    hint: 'Active and In Progress count as ongoing projects. Shipped means finished and is no longer counted.' },
  { key: 'desc', label: 'Description', type: 'textarea', wide: true },
  { key: 'tags', label: 'Tags', type: 'tags', wide: true, hint: 'Separate with commas. Shown as small chips on the division page.' },
  { key: 'img', label: 'Photo', type: 'image', wide: true },
  { key: 'showcase', label: 'Also show on the About page?', type: 'bool', wide: true,
    yes: "Yes, in \"What we've built\"", no: 'No, division pages only',
    hint: "Every project already appears on its division page, on the home page and in the terminal. Choose Yes to also feature it, with its photo, in the \"What we've built\" section of the About page." },
];
const EVENT_FIELDS = [
  { key: 'title', label: 'Event title', wide: true },
  { key: 'month', label: 'Month', type: 'select', options: MONTHS },
  { key: 'day', label: 'Day', type: 'number' },
  { key: 'year', label: 'Year', type: 'number' },
  { key: 'type', label: 'Type', type: 'select', options: Object.keys(TYPE_COLORS) },
  { key: 'division', label: 'Division', type: 'select', options: ['All', 'Metaverse', 'Robotics', '3D Printing'], hint: 'Used by the division filter on the Events page.' },
  { key: 'location', label: 'Location' },
  { key: 'time', label: 'Time', placeholder: '10:00 AM – 12:00 PM', hint: 'Free text, shown as typed.' },
  { key: 'capacity', label: 'Capacity (optional)', placeholder: '30 spots' },
  { key: 'desc', label: 'Description', type: 'textarea', wide: true },
  { key: 'featured', label: 'Highlight this event?', type: 'bool', wide: true, yes: 'Yes, add a "Featured" badge', no: 'No',
    hint: 'Past events move to the Past list automatically; there is nothing to change.' },
];
const TEAM_FIELDS = [
  { key: 'name', label: 'Full name' },
  { key: 'role', label: 'Role', hint: 'Division leads are found by role text: "Robotics Lead" and "Robotics Vice Lead" (same for Metaverse and 3D Printing).' },
  { key: 'div', label: 'Section', type: 'select', options: ['Community', 'Metaverse', 'Robotics', '3D Printing'], hint: 'Which group they appear in on the About page.' },
  { key: 'initials', label: 'Initials', hint: 'Shown in the avatar when there is no photo.' },
  { key: 'img', label: 'Photo (optional)', type: 'image', wide: true },
];
const TIMELINE_FIELDS = [
  { key: 'date', label: 'Date', placeholder: 'October 2024', hint: 'Free text, shown as typed.' },
  { key: 'title', label: 'Title' },
  { key: 'color', label: 'Dot colour', type: 'select', options: [['#5570f1', 'Blue'], ['#22c97a', 'Green'], ['#f5a232', 'Amber']] },
  { key: 'body', label: 'Text', type: 'textarea', wide: true, hint: 'Tip: {members}, {activeProjects} and {eventsPerYear} are replaced with the live numbers.' },
];
const GALLERY_FIELDS = [
  { key: 'label', label: 'Caption', wide: true },
  { key: 'hint', label: 'Sub-caption', hint: 'Small text such as "Workshop · March 2025", used when there is no photo.' },
  { key: 'size', label: 'Tile size', type: 'select', options: [['normal', 'Normal'], ['wide', 'Wide (2 columns)'], ['tall', 'Tall (2 rows)']] },
  { key: 'img', label: 'Photo', type: 'image', wide: true },
];
const SIGNUP_FIELDS = [
  { key: 'isOpen', label: 'Membership sign-ups', type: 'bool', yes: 'Open', no: 'Closed', wide: true, hint: 'Controls the Join page, the Join buttons and the terminal "join" command.' },
  { key: 'showNextIntakeDate', label: 'Show the next intake date while closed', type: 'bool', wide: true },
  { key: 'nextIntakeDate', label: 'Next intake date', placeholder: 'October 2026' },
  { key: 'googleFormUrl', label: 'Google Form link', placeholder: 'https://forms.gle/…', hint: 'Used when sign-ups are open.' },
];
const STAT_FIELDS = [
  { key: 'members', label: 'Total members', hint: 'Home, About, Join, terminal' },
  { key: 'eventsPerYear', label: 'Events per year', placeholder: '13+', hint: 'About, Join' },
  { key: 'avgAttendance', label: 'Average attendance', placeholder: '120+', hint: 'Events page' },
  { key: 'yearsRunning', label: 'Years running', placeholder: '3+', hint: 'About page' },
  { key: 'competitionWins', label: 'Competition wins', placeholder: '5+', hint: 'About page' },
];
const DIV_FIELDS = [
  { key: 'members', label: 'Members', type: 'number' },
  { key: 'eventsPerSem', label: 'Events per semester', type: 'number' },
  { key: 'tags', label: 'Tech tags', type: 'tags', wide: true, hint: 'Shown on the home page and the division page.' },
];

/* ── tabs ───────────────────────────────────────────────────────── */
function Overview({ data, set }) {
  return (
    <>
      <section className="adm-panel">
        <h2>Sign-ups</h2>
        <Fields fields={SIGNUP_FIELDS} value={data.signup} onChange={v => set('signup', v)} />
      </section>
      <section className="adm-panel">
        <h2>Community numbers</h2>
        <p className="adm-sub">Typed as text, so "13+" works. The number of projects is automatic and comes from the Projects tab.</p>
        <Fields fields={STAT_FIELDS} value={data.stats} onChange={v => set('stats', v)} />
      </section>
      <div className="adm-three">
        {DIVS.map(d => (
          <section className={`adm-panel div-${d.tone}`} key={d.key}>
            <h2>{d.label}</h2>
            <Fields fields={DIV_FIELDS} value={data.divisions[d.key]} onChange={v => set('divisions', { ...data.divisions, [d.key]: v })} />
          </section>
        ))}
      </div>
    </>
  );
}

const projectFilters = [
  { key: 'all', label: 'All', test: () => true },
  ...DIVS.map(d => ({ key: d.key, label: d.label, test: p => p.division === d.key })),
  { key: 'shared', label: 'All divisions', test: p => p.division === 'all' },
];
const eventFilters = [
  { key: 'upcoming', label: 'Upcoming', test: isUpcoming },
  { key: 'past', label: 'Past', test: e => !isUpcoming(e) },
  { key: 'all', label: 'All', test: () => true },
];
const teamFilters = [
  { key: 'all', label: 'Everyone', test: () => true },
  ...['Community', 'Metaverse', 'Robotics', '3D Printing'].map(s => ({ key: s, label: s, test: m => m.div === s })),
];

const TABS = [
  { key: 'overview', label: 'Overview', title: 'Overview', desc: 'Sign-ups, community numbers and division stats.' },
  { key: 'projects', label: 'Projects', title: 'Projects', desc: 'Shown on division pages, the home page, the About page and the terminal.', count: d => d.projects.length },
  { key: 'events', label: 'Events', title: 'Events', desc: 'Shown on the Events page, the home page and the terminal.', count: d => d.events.length },
  { key: 'team', label: 'Team', title: 'Team', desc: 'Leadership shown on the About page, division pages and home cards.', count: d => d.team.length },
  { key: 'timeline', label: 'Timeline', title: 'Timeline', desc: 'The "Our story" milestones on the About page.', count: d => d.timeline.length },
  { key: 'gallery', label: 'Gallery', title: 'Gallery', desc: 'The "Community in action" photo grid on the About page.', count: d => d.gallery.length },
];

export default function Admin() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [sha, setSha] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState('overview');
  const [status, setStatus] = useState(null);

  const leave = () => { clearToken(); navigate('/'); };

  useEffect(() => {
    document.title = 'Admin · URSU Technology';
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    // body{overflow-x:hidden} on the public site would break the sticky sidebar/header
    document.body.style.overflowX = 'visible';
    return () => { meta.remove(); document.body.style.overflowX = ''; };
  }, []);

  useEffect(() => {
    if (!getToken()) { navigate('/'); return; }
    loadSite()
      .then(r => { setData(r.data); setSha(r.sha); })
      .catch(e => (e.status === 401 ? leave() : setStatus({ err: e.message })));
  }, []); // eslint-disable-line

  useEffect(() => {
    const warn = e => { if (dirty) e.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const set = (k, v) => { setData(d => ({ ...d, [k]: v })); setDirty(true); setStatus(null); };

  const publish = async () => {
    setStatus({ msg: 'Publishing…' });
    try {
      setSha(await saveSite(data, sha));
      setDirty(false);
      setStatus({ ok: 'Published. The live site updates in about a minute.' });
    } catch (e) {
      if (e.status === 401) leave(); else setStatus({ err: e.message });
    }
  };

  const cur = TABS.find(t => t.key === tab);
  const state = status?.err ? ['err', status.err] : status?.ok ? ['ok', status.ok] : status?.msg ? ['wait', status.msg]
    : dirty ? ['dirty', 'Unpublished changes'] : ['clean', 'Everything is published'];

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand">
          <img src="/uploads/logo.png" alt="" />
          <div><strong>URSU Technology</strong><span>ADMIN</span></div>
        </div>
        <div className="adm-nav">
          {TABS.map((t, i) => (
            <button type="button" key={t.key} className={t.key === tab ? 'on' : ''} onClick={() => setTab(t.key)}>
              <b>{String(i + 1).padStart(2, '0')}</b>{t.label}
              {data && t.count && <em>{t.count(data)}</em>}
            </button>
          ))}
        </div>
        <div className="adm-side-foot">
          <Link to="/" target="_blank">View site ↗</Link>
          <button type="button" onClick={leave}>Log out</button>
        </div>
      </aside>

      <main className="adm-main">
        <header className="adm-head">
          <div>
            <div className="adm-eyebrow">{cur.title.toUpperCase()}</div>
            <p>{cur.desc}</p>
          </div>
          <div className="adm-publish">
            <span className={`adm-state ${state[0]}`}><i />{state[1]}</span>
            <button type="button" className="adm-btn primary big" disabled={!dirty || !data} onClick={publish}>Publish changes</button>
          </div>
        </header>

        {!data ? <div className="adm-empty">{status?.err || 'Loading…'}</div> : (
          <>
            {tab === 'overview' && <Overview data={data} set={set} />}
            {tab === 'projects' && (
              <ListEditor noun="project" items={data.projects} onChange={v => set('projects', v)} fields={PROJECT_FIELDS}
                filters={projectFilters} titleOf={p => p.name} thumbOf={p => p.img}
                chipsOf={p => <><Chip tone={DIV_TONE[p.division]}>{DIV_NAME[p.division]}</Chip><Chip tone={STATUS_TONE[p.status]}>{p.status}</Chip>{p.showcase && <Chip tone="neutral">On About</Chip>}</>}
                blank={(items, f) => ({ id: nextId(items), division: DIVS.some(d => d.key === f?.key) ? f.key : f?.key === 'shared' ? 'all' : 'metaverse', name: '', desc: '', tags: [], status: 'Active', img: null, showcase: false })}
                empty="No projects in this division yet. Use “+ New project” to add one." />
            )}
            {tab === 'events' && (
              <ListEditor noun="event" items={data.events} onChange={v => set('events', v)} fields={EVENT_FIELDS}
                filters={eventFilters} titleOf={e => e.title}
                sortFn={(a, b) => { const ua = isUpcoming(a); return ua !== isUpcoming(b) ? (ua ? -1 : 1) : ua ? eventTime(a) - eventTime(b) : eventTime(b) - eventTime(a); }}
                chipsOf={e => <><Chip tone="neutral">{e.month} {e.day}, {e.year}</Chip><Chip tone={EVENT_DIV_TONE[e.division]}>{e.division}</Chip>{e.featured && <Chip tone="amber">Featured</Chip>}</>}
                blank={items => ({ id: nextId(items), month: 'JAN', day: 1, year: new Date().getFullYear(), title: '', type: 'Social', location: '', time: '', desc: '', division: 'All' })} />
            )}
            {tab === 'team' && (
              <ListEditor noun="member" items={data.team} onChange={v => set('team', v)} fields={TEAM_FIELDS}
                filters={teamFilters} titleOf={m => m.name} thumbOf={m => m.img}
                chipsOf={m => <><Chip tone="neutral">{m.role}</Chip><Chip tone={SECTION_TONE[m.div]}>{m.div}</Chip></>}
                blank={(_, f) => ({ name: '', role: '', div: f && f.key !== 'all' ? f.key : 'Community', initials: '', img: null })} />
            )}
            {tab === 'timeline' && (
              <ListEditor noun="milestone" items={data.timeline} onChange={v => set('timeline', v)} fields={TIMELINE_FIELDS}
                titleOf={t => t.title} chipsOf={t => <Chip tone="neutral">{t.date}</Chip>}
                blank={() => ({ date: '', title: '', body: '', color: '#5570f1' })} />
            )}
            {tab === 'gallery' && (
              <ListEditor noun="photo" items={data.gallery} onChange={v => set('gallery', v)} fields={GALLERY_FIELDS}
                titleOf={g => g.label} thumbOf={g => g.img} chipsOf={g => <Chip tone="neutral">{g.size}</Chip>}
                blank={() => ({ label: '', hint: '', img: null, size: 'normal' })} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
