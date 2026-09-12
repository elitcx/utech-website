# U-TECH Website — Maintainer Handbook (English)

> **Bahasa Indonesia:** [HANDBOOK.id.md](HANDBOOK.id.md)

This is the complete handover document for the URSU Technology (U-TECH) website.
It is written for the next generation of *pengurus* — you may have never touched
React before. Every section explains **what** something is, **why** it was built
that way, and **how** to change it.

Read section 1 and 2 first. After that, section 11 ("Cookbook") is the part you
will open every week.

---

## Table of contents

1. [What this website is](#1-what-this-website-is)
2. [Getting it running on your computer](#2-getting-it-running-on-your-computer)
3. [The technology, and why these choices](#3-the-technology-and-why-these-choices)
4. [Folder and file map](#4-folder-and-file-map)
5. [How a page actually loads (the request lifecycle)](#5-how-a-page-actually-loads-the-request-lifecycle)
6. [Routing: how URLs map to pages](#6-routing-how-urls-map-to-pages)
7. [The data layer — the files you will edit most](#7-the-data-layer--the-files-you-will-edit-most)
8. [Shared components and the custom hook](#8-shared-components-and-the-custom-hook)
9. [The CSS system: tokens, layers, and the colour language](#9-the-css-system-tokens-layers-and-the-colour-language)
10. [Page-by-page deep dive](#10-page-by-page-deep-dive)
11. [Cookbook: common maintenance tasks](#11-cookbook-common-maintenance-tasks)
12. [Images and assets](#12-images-and-assets)
13. [Deployment](#13-deployment)
14. [Known issues, duplication, and technical debt](#14-known-issues-duplication-and-technical-debt)
15. [Ideas for improvement](#15-ideas-for-improvement)
16. [Glossary](#16-glossary)

---

## 1. What this website is

The U-TECH website is a **public recruitment and information site** for the
Ursuline Technology community at SMA-SMP Regina Pacis Surakarta.

Its job, in priority order:

1. Convince a curious student that joining U-TECH is worth their time.
2. Show what the three divisions actually do, with real projects and real names.
3. Publish upcoming events so members and non-members know what is happening.
4. Give a single place to send people when sign-ups open.

It is a **static front-end only**. There is no backend, no database, no login,
and no server-side code. Everything you see is built from JavaScript data files
committed into the repository. Member sign-up is handled by an external Google
Form, and contact goes through WhatsApp and Instagram.

That is a deliberate choice, explained in section 3.

### The seven pages

| URL | File | Purpose |
|---|---|---|
| `/` | `src/pages/Home/index.jsx` | Landing page. Scroll-driven division hero, interactive terminal, summary of everything. |
| `/about` | `src/pages/About.jsx` | History timeline, 3-D leadership tunnel, portfolio, photo gallery, values. |
| `/events` | `src/pages/Events.jsx` | Full event list with type and division filters. |
| `/join` | `src/pages/Join.jsx` | Recruitment page: steps, perks, sign-up gate, FAQ. |
| `/metaverse` | `src/pages/divisions/Metaverse.jsx` | Metaverse & Web Design division page. |
| `/robotics` | `src/pages/divisions/Robotics.jsx` | Robotics & Embedded Systems division page. |
| `/printing` | `src/pages/divisions/Printing.jsx` | 3D Printing & Rapid Prototyping division page. |

### The design brief it was built against

`PRODUCT.md` in the repository root is the original design brief. It defines the
audience, the brand personality ("accessible, energetic, welcoming"), the
anti-references ("generic school club site", "cold corporate tech company"), and
five design principles. **Read it before making visual changes.** If you change
the look of the site, you are either following that brief or consciously
replacing it — decide which, and update `PRODUCT.md` if you replace it.

---

## 2. Getting it running on your computer

### Prerequisites

- **Node.js 18 or newer.** Download from [nodejs.org](https://nodejs.org).
  This project was last developed on Node 24 with npm 11.
- **Git.** To clone the repository and push changes.
- A code editor. **Visual Studio Code** is recommended; the repo already ships
  `.vscode/settings.json` with a spell-check word list for Indonesian names.

### First-time setup

```bash
git clone https://github.com/elitcx/utech-website.git
cd utech-website
npm install
```

`npm install` reads `package.json` and `package-lock.json` and downloads every
dependency into `node_modules/`. That folder is large and is **not** committed to
git (see `.gitignore`). Run `npm install` again any time `package.json` changes.

### The three commands you need

```bash
npm run dev
```

Starts the Vite development server, normally at `http://localhost:5173`. It has
**hot module replacement**: save a file and the browser updates instantly without
a full reload, keeping your scroll position. This is what you use 99% of the
time.

```bash
npm run build
```

Produces the optimised production bundle in `dist/`. It minifies JavaScript and
CSS, hashes filenames for cache-busting, and copies everything from `public/`.
You rarely need to run this yourself because the host runs it for you, but it is
the fastest way to catch a syntax error that the dev server tolerated.

```bash
npm run preview
```

Serves the contents of `dist/` locally, the way a real server would. Use it to
sanity-check a production build before deploying. Note: `npm run preview` will
**not** pick up source changes — it only serves what `npm run build` last wrote.

### The edit loop

1. `npm run dev` in a terminal, leave it running.
2. Open `http://localhost:5173` in a browser.
3. Edit a file, save, watch the browser update.
4. When you are happy, commit and push. Deployment is automatic (section 13).

---

## 3. The technology, and why these choices

### The dependency list is intentionally tiny

```json
"dependencies":    { "react", "react-dom", "react-router-dom" }
"devDependencies": { "vite", "@vitejs/plugin-react" }
```

Five packages. No UI library, no CSS framework, no animation library, no state
management library, no CMS client. Every visual effect on this site is written by
hand in plain CSS and the Canvas 2D API.

**Why this matters to you:** a student club website is maintained by whoever is
in charge this year. If the site depended on Tailwind, Framer Motion, Redux, and
a headless CMS, the next maintainer would need to learn four extra tools before
fixing a typo. With five packages, the only thing you must learn is React — and
the components in this project are deliberately simple React.

The cost of this choice is that some code is longer than it would be with a
library (the hero canvases, for example, are hundreds of lines of drawing code).
That trade was made knowingly: more lines, fewer concepts.

### React 18 — the component model

React lets you build the page out of **components**: functions that return
HTML-like markup (called JSX). A component can take inputs (**props**) and hold
its own changing data (**state**).

The key mental model: when state changes, React re-runs the component function
and updates only the parts of the real page that differ. You never write
`document.getElementById(...)` to update text. You change state and let React
redraw.

Example from `src/components/Nav.jsx`:

```jsx
const [menuOpen, setMenuOpen] = useState(false);
// ...
<button onClick={() => setMenuOpen(true)}>☰</button>
<div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}>
```

Clicking the button calls `setMenuOpen(true)`. React re-runs `Nav`, the className
now includes `open`, and the CSS rule `.mobile-nav-overlay.open { display: flex }`
makes the menu appear. No manual DOM code anywhere.

**React Strict Mode** is enabled in `src/main.jsx`. In development it
intentionally runs some code twice to expose bugs. This is why animation code in
this project is careful to clean up after itself (see `useEffect` cleanup in
section 10). It does **not** double-run in production.

### React Router 6 — one page, many URLs

The site is a **single-page application (SPA)**. The browser loads one HTML file
(`index.html`) once; after that, clicking a link does not fetch a new page from
the server. React Router swaps which component is displayed and updates the URL
bar.

Result: navigation is instant, and shared state (like fonts already loaded) is
preserved. The cost: the server must be told to send `index.html` for *every*
URL, otherwise refreshing `/about` returns a 404. That is exactly what
`vercel.json` does — see section 13.

### Vite 6 — the build tool

Vite is the development server and bundler. Two things it gives you:

- **Instant dev server.** It serves your source files as native ES modules, so
  startup is nearly instant regardless of project size.
- **Optimised production build.** `npm run build` tree-shakes unused code,
  minifies, and fingerprints filenames (`index-a1b2c3.js`) so browsers cache
  aggressively but always get the new version after a deploy.

`vite.config.js` is four lines — just the React plugin. There is no custom build
configuration to understand.

### Plain CSS — no framework

Styling is hand-written CSS in seven files, organised by scope (section 9).
Design tokens live in CSS custom properties on `:root`. There is no build-time
CSS processing beyond what Vite does automatically.

**Why no Tailwind:** the site leans on a small, consistent set of colours,
spacings, and type sizes. Custom properties express that cleanly, and a
maintainer who knows basic CSS can work on it immediately. Tailwind would add a
config file, a class vocabulary to memorise, and a build step.

**Where this rule is bent:** several components use React **inline styles**
(`style={{ ... }}`) instead of CSS classes. This happens where a value is
*computed from data* — most often a division colour. For example in
`DivisionsShowcase.jsx`:

```jsx
<div className="div-card-name" style={{ color: isActive ? d.color : 'var(--white)' }}>
```

The colour depends on which division this card represents, so it cannot live in a
static stylesheet without writing three near-identical rules. Inline style is the
right tool there.

The rule of thumb used throughout this codebase:

- **Fixed appearance** (layout, spacing, typography, hover states) → CSS class.
- **Value derived from data** (a division's accent colour, a progress bar width,
  a computed `maxHeight`) → inline style.

Where you see long inline style blocks for *fixed* appearance — there are a few
in `Events.jsx`, `Join.jsx`, and `About.jsx` — that is technical debt, noted in
section 14.

### Canvas 2D — the animations

The hero illustrations (rotating wireframe cube, Arduino board, 3-D printer) are
drawn with the **Canvas 2D API**: a `<canvas>` element plus JavaScript that
issues drawing commands sixty times a second.

**Why canvas and not SVG or a 3-D library:** these are animated scenes with
dozens of moving parts, particles, and gradients. SVG would create hundreds of
DOM nodes and stutter. Three.js would add ~600 KB to the bundle for three
illustrations. Canvas is built into every browser, costs nothing, and handles
this comfortably.

**Why hand-written 3-D math:** the cube and octahedron use a tiny rotation and
perspective-projection function (about 10 lines, in `Hero.jsx`). It is less code
than importing a library, and it is fully inspectable.

---

## 4. Folder and file map

```
utech-website/
├── index.html                 ← the single HTML shell (fonts, favicon, #root div)
├── package.json               ← dependencies and the dev/build/preview scripts
├── package-lock.json          ← exact dependency versions (commit this!)
├── vite.config.js             ← Vite config: just the React plugin
├── vercel.json                ← SPA rewrite rule for the host
├── README.md                  ← public-facing description of the community
├── PRODUCT.md                 ← the original design brief; read before redesigning
├── .gitignore                 ← node_modules/, dist/, .env, .claude/
├── .gitattributes             ← normalises line endings across Windows/macOS
├── .vscode/settings.json      ← spell-checker word list
│
├── public/                    ← copied verbatim into the build, never processed
│   └── uploads/               ← all site images. Referenced as "/uploads/x.webp"
│       ├── logo.png           ← used by nav, footer, favicon, about card
│       ├── 3dprint.webp       ← portfolio thumbnails
│       ├── irgl.webp          ← gallery photos
│       └── ... (15 files)
│
├── docs/                      ← this handbook
│   ├── HANDBOOK.en.md
│   └── HANDBOOK.id.md
│
├── dist/                      ← build output. Generated; not committed.
│
└── src/
    ├── main.jsx               ← entry point: mounts <App> into #root
    ├── App.jsx                ← router + ScrollToTop
    │
    ├── config/
    │   └── signup.js          ← ★ sign-up open/closed switch, form URL, contact URL
    │
    ├── data/
    │   ├── events.js          ← ★ every event, plus the type→colour maps
    │   └── projects.js        ← ★ every division project, plus status→colour map
    │
    ├── hooks/
    │   └── useReveal.js       ← scroll-into-view fade-up animation hook
    │
    ├── components/            ← used by more than one page
    │   ├── Nav.jsx            ← fixed top bar, divisions dropdown, mobile menu
    │   ├── Footer.jsx         ← logo, social links, credits
    │   └── Marquee.jsx        ← scrolling keyword ticker
    │
    ├── pages/
    │   ├── About.jsx          ← 523 lines: timeline, 3-D tunnel, portfolio, gallery
    │   ├── Events.jsx         ← filterable event list
    │   ├── Join.jsx           ← steps, perks, sign-up gate, FAQ accordion
    │   │
    │   ├── Home/              ← the landing page, split into eight section files
    │   │   ├── index.jsx      ← composes the sections in order
    │   │   ├── Hero.jsx       ← 473 lines: scroll-driven hero + three canvases
    │   │   ├── DivisionsShowcase.jsx ← three expandable division cards
    │   │   ├── Terminal.jsx   ← interactive fake shell
    │   │   ├── HomeAbout.jsx  ← short "who we are" block
    │   │   ├── Pillars.jsx    ← six "what we do" cards
    │   │   ├── HomeEvents.jsx ← next four upcoming events
    │   │   └── CTA.jsx        ← closing call to action
    │   │
    │   └── divisions/         ← three near-identical division pages
    │       ├── Metaverse.jsx  ← blue,  wireframe-cube canvas
    │       ├── Robotics.jsx   ← green, Arduino canvas + live sensor panel
    │       └── Printing.jsx   ← amber, printer canvas + lab spec table
    │
    └── styles/
        ├── global.css         ← design tokens, reset, body noise, keyframes
        ├── shared.css         ← buttons, nav, footer, marquee, reveal, chips
        ├── home.css           ← home page only (989 lines)
        ├── about.css          ← about page only, incl. the 3-D tunnel
        ├── events.css         ← events page only
        ├── join.css           ← join page only
        └── divisions.css      ← shared by all three division pages
```

★ = the three files that hold editable content. If someone asks you to "update
the website", the change is usually in one of these three.

There is also a stray `uploads/` folder at the repository root containing one
pasted screenshot. It is **not** served to visitors — only `public/uploads/` is.
It can safely be deleted.

---

## 5. How a page actually loads (the request lifecycle)

Understanding this sequence makes every later section easier.

**Step 1 — the browser requests a URL.** Say a visitor opens
`https://your-site.com/events`.

**Step 2 — the host rewrites it.** `vercel.json` contains:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Every path, no matter what it is, is answered with `index.html`. The URL in the
address bar stays `/events`.

**Step 3 — `index.html` loads.** It is deliberately almost empty:

```html
<link rel="icon" href="/uploads/logo.png" />
<title>URSU Technology</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk...DM+Sans...Space+Mono..." rel="stylesheet" />
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

Three things happen here: the favicon and page title are set, the three Google
Fonts are fetched (with `preconnect` hints to speed that up), and an empty
`<div id="root">` is created as the mounting point.

**Step 4 — `src/main.jsx` runs.**

```jsx
import './styles/global.css';
import './styles/shared.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
```

Two stylesheets are imported here, which makes them **global to every page**:
`global.css` (design tokens and reset) and `shared.css` (nav, footer, buttons).
Page-specific stylesheets are imported inside their own page file instead.

**Step 5 — `App.jsx` decides what to show.** It reads the URL and renders the
matching route component. For `/events` that is `<Events />`.

**Step 6 — the page component renders.** `Events.jsx` imports its own stylesheet
(`import '../styles/events.css'`), reads `ALL_EVENTS` from the data layer,
filters it, and returns the markup. `<Nav />` and `<Footer />` are included by
the page itself.

**Step 7 — effects run.** After React paints, `useEffect` hooks fire: scroll
listeners attach, `IntersectionObserver`s begin watching for reveal animations,
canvas animation loops start.

**Step 8 — later navigation skips steps 1–4.** Clicking a `<Link>` to `/join`
does not touch the network. React Router swaps the component, `ScrollToTop` jumps
to the top, and the new page renders. This is why navigation feels instant.

---

## 6. Routing: how URLs map to pages

All routing lives in one short file, `src/App.jsx`:

```jsx
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/events"     element={<Events />} />
        <Route path="/join"       element={<Join />} />
        <Route path="/metaverse"  element={<Metaverse />} />
        <Route path="/robotics"   element={<Robotics />} />
        <Route path="/printing"   element={<Printing />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Three pieces:

- **`BrowserRouter`** enables clean URLs using the browser History API (no `#`
  fragments).
- **`Routes` / `Route`** is the lookup table. One line per page.
- **`ScrollToTop`** is a tiny custom component defined in the same file:

```jsx
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
```

It renders nothing. Its only job is a side effect: whenever the path changes,
scroll to the top. Without it, clicking a footer link while scrolled halfway down
the home page would land you halfway down the new page. This is a standard SPA
fix that routers do not do for you.

### Important linking rule

**Inside the app, always use `<Link to="/join">`, never `<a href="/join">`.**

An `<a>` tag triggers a full page reload: the browser discards the React app,
re-downloads everything, and the navigation feels slow. `<Link>` is handled by
the router in memory.

Use a real `<a>` tag only for:

- **External URLs** (Instagram, GitHub, WhatsApp, Google Forms). Always add
  `target="_blank" rel="noopener noreferrer"` — the `rel` attribute is a security
  measure that prevents the opened page from manipulating yours.
- **Same-page anchors** like `<a href="#projects">`, which jump to an element
  with `id="projects"`. Smooth scrolling for these comes from
  `html { scroll-behavior: smooth }` in `global.css`.

### There is no 404 route

If someone visits `/contact`, `Routes` matches nothing and the page renders
blank — no nav, no footer, no message. Adding a catch-all is a good first
contribution; see section 15.

### Adding a new page

1. Create the component, e.g. `src/pages/Resources.jsx`. Include `<Nav />` at the
   top and `<Footer />` at the bottom — the router does not add them for you.
2. Import it in `App.jsx` and add `<Route path="/resources" element={<Resources />} />`.
3. Add it to `NAV_LINKS` in `src/components/Nav.jsx` so it appears in the menu.

That is all three steps. Nothing else needs touching.

---

## 7. The data layer — the files you will edit most

This is the heart of maintaining the site. Content is separated from
presentation: you edit a JavaScript array, and the components re-render
themselves around the new data.

### 7.1 `src/config/signup.js` — the recruitment switch

```js
export const SIGNUP_CONFIG = {
  isOpen: false,
  googleFormUrl: '',
  nextIntakeDate: 'September 2026',
  showNextIntakeDate: true,
};

export const CONTACT_URL = 'https://wa.me/6282261592211';
```

Four settings and a contact link. `isOpen` is the master switch that changes the
site's behaviour in three separate places:

| Where | `isOpen: false` | `isOpen: true` |
|---|---|---|
| `/join` sign-up panel | Grey "Sign-ups currently closed" badge, next-intake date, Instagram button | Green pulsing "Sign-ups are open" badge, button linking to `googleFormUrl` |
| `/join` hero subtitle | "…Sign-ups open periodically. Scroll down to stay in the loop." | "…Sign-ups are open now. Scroll down to apply." |
| Home terminal, `join <division>` command | Amber "Registration is currently closed" + next intake date | Green "Registration is open!" then auto-redirects to `/join` after 0.9 s |

`showNextIntakeDate` controls whether the date is shown at all. If it is `false`,
or `nextIntakeDate` is empty, the closed state falls back to "Check our Instagram
@ursutech for updates."

`CONTACT_URL` is used by exactly one thing: the **Contact** link in the footer.
Changing the WhatsApp number here updates it site-wide.

> **⚠ Critical gotcha.** `googleFormUrl` is currently an empty string. If you set
> `isOpen: true` without filling in the form URL, the big "Open Sign-Up Form"
> button will render and be clickable, but will go nowhere. **Always set both at
> the same time.**

### 7.2 `src/data/events.js` — every event on the site

Three exports.

**`TYPE_COLORS`** maps an event type to a hex colour, used for the big day number
and the type pill on `/events`:

```js
export const TYPE_COLORS = {
  Hackathon: '#5570f1',  Workshop: '#22c97a',  'Build Night': '#5570f1',
  Networking: '#f5a232', Social: '#22c97a',
};
```

**`TYPE_TAG_STYLE`** maps the same types to a CSS class name (`blue`, `green`,
`amber`), used by the home page's compact event rows:

```js
export const TYPE_TAG_STYLE = {
  Hackathon: 'blue', Workshop: 'green', 'Build Night': 'blue',
  Networking: 'amber', Social: 'green',
};
```

Two maps exist because the two surfaces style their tags differently — one
computes inline colours from a hex value, the other toggles a pre-written CSS
class. If you add a new event type, **add it to both maps**, or the events page
falls back to grey `#888` and the home page falls back to `blue`.

**`ALL_EVENTS`** is the array of events. One object per event:

```js
{ id: 5, month: 'OCT', day: '31', year: 2026,
  title: 'Ursuline Cup Project Showcase',
  type: 'Social',
  location: 'Auditorium',
  time: '10:00 AM – 2:00 PM',
  desc: 'Final end-of-year showcase of U-TECH projects…',
  featured: true,
  capacity: '6 spots',
  division: 'All' }
```

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Any unique number. React uses it as the list key. |
| `month` | yes | Three uppercase letters: `JAN`…`DEC`. Must match `MONTH_INDEX`. |
| `day` | yes | String. Two digits by convention (`'09'`), though `'1'` also works. |
| `year` | yes | Number, e.g. `2026`. |
| `title` | yes | Shown as the event name. |
| `type` | yes | Must be a key in `TYPE_COLORS`. |
| `location` | yes | Free text, shown beside a pin icon. |
| `time` | yes | Free text. Can be a time range or a date range. |
| `desc` | yes | One or two sentences. Shown on `/events` only. |
| `division` | yes | `'All'`, `'Metaverse'`, `'Robotics'`, or `'3D Printing'`. |
| `featured` | no | `true` adds a blue border, tinted background, and "Featured" badge. |
| `capacity` | no | Free text like `'5 spots'`. Shown with a people icon. |

**`isUpcoming`** is the function that replaces a manual "past/upcoming" flag:

```js
const MONTH_INDEX = { JAN:0, FEB:1, ..., DEC:11 };

export const isUpcoming = e =>
  new Date(e.year, MONTH_INDEX[e.month], Number(e.day)) >=
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
```

It builds a `Date` from the event's three fields and compares it to today at
midnight. Using midnight rather than `new Date()` means **an event happening
today still counts as upcoming**, which is what you want.

The practical consequence: **events disappear from the site by themselves.** You
never have to mark anything as past. The day after an event, it stops appearing
in the upcoming list, the "Upcoming Events" counter drops by one, and the home
page pulls in the next event automatically.

`MONTH_INDEX` is unfortunately declared twice — once here and once at the top of
`Events.jsx`. See section 14.

### 7.3 `src/data/projects.js` — division projects

```js
export const STATUS_COLORS = {
  Active: '#22c97a',
  'In Progress': '#5570f1',
  Shipped: 'rgba(255,255,255,0.3)',
};

export const DIVISION_PROJECTS = {
  metaverse: [
    { name: 'Ursuline Cup Final Project',
      desc: 'Final Project for the Ursuline Cup Showcase…',
      tags: ['Unity','C#','Python','HTML','CSS','Javascript'],
      status: 'Active' },
    { name: 'Portfolio', desc: '…', tags: ['HTML','CSS','Javascript'], status: 'Active' },
  ],
  robotics: [ /* … */ ],
  printing: [ /* … */ ],
};
```

The three keys (`metaverse`, `robotics`, `printing`) are lowercase and are used
as lookup keys by five different components. **Do not rename them.**

`status` must be one of the three `STATUS_COLORS` keys. An unrecognised status
produces `undefined` colours and a broken-looking pill.

This one file feeds an unusually large number of places:

| Consumer | What it reads |
|---|---|
| `Hero.jsx` | `DIVISION_PROJECTS.<div>.length` → the "Projects" stat in the hero panel |
| `DivisionsShowcase.jsx` | `.length` for the stat, `.slice(0, 3)` for the expandable card's project list |
| `Terminal.jsx` | filters `status === 'Active'` across all divisions for the `projects` command |
| `Metaverse.jsx` / `Robotics.jsx` / `Printing.jsx` | the full array → the project card grid |

So adding one project object updates a counter on the home page hero, a counter
and a list on the home page division card, a line in the terminal, and a card on
the division page. That is the payoff of the data layer.

---

## 8. Shared components and the custom hook

### 8.1 `useReveal` — the scroll-in animation

`src/hooks/useReveal.js` is fifteen lines and is used on nearly every section of
the site.

```js
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
```

**How to use it** — two parts, always together:

```jsx
const ref = useReveal();
// ...
<div className="reveal" ref={ref}> …content… </div>
```

**How it works.** The paired CSS lives in `shared.css`:

```css
.reveal         { opacity: 0; transform: translateY(28px);
                  transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

The element starts invisible and nudged 28 pixels down. An
`IntersectionObserver` watches it; once 12% of it enters the viewport, the
observer callback adds the `visible` class, and CSS animates it into place over
0.7 seconds.

**Why an observer and not a scroll listener.** A scroll handler fires on every
pixel of scrolling, runs your JavaScript on the main thread, and needs
throttling. `IntersectionObserver` is implemented inside the browser, fires only
when a threshold is crossed, and costs effectively nothing. It is the correct
tool for "tell me when this is on screen".

**Important details:**

- The class is only ever **added**, never removed. Content fades in once and
  stays. That is deliberate: re-animating on every scroll-past is annoying.
- `obs.disconnect()` in the cleanup function runs when the component unmounts
  (for example when you navigate away). Without it, observers would accumulate.
- **One hook per element.** Each call returns its own ref, so a section with
  three independently animating blocks calls `useReveal()` three times. You can
  see this in `Join.jsx`: `const r1 = useReveal(), r2 = useReveal(), r3 = ..., r4 = ...`.
- It respects reduced motion partially: `global.css` has
  `@media (prefers-reduced-motion: reduce) { .reveal { transform: none !important } }`,
  so the slide is removed but a short fade remains.

### 8.2 `Nav.jsx` — the top bar

Included manually by every page (it is not in `App.jsx`). It holds three pieces
of state:

```jsx
const [scrolled, setScrolled]  = useState(false);  // has the user scrolled past 30px?
const [menuOpen, setMenuOpen]  = useState(false);  // is the mobile overlay open?
const [divOpen,  setDivOpen]   = useState(false);  // is the Divisions dropdown open?
```

**The shrink-on-scroll effect.** A scroll listener flips `scrolled` when
`window.scrollY > 30`, which adds the `scrolled` class. CSS then shrinks the bar
from 64 px to 56 px and changes the bottom border to blue. The listener is
removed in the `useEffect` cleanup.

**Auto-closing menus on navigation.** A second effect watches `location.pathname`
and closes both menus whenever it changes. Without this, tapping a link in the
mobile overlay would navigate but leave the overlay covering the new page.

**The link lists are data, not markup:**

```jsx
const NAV_LINKS = [
  { to: '/',       label: 'Home' },
  { to: '/about',  label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/join',   label: 'Join Us', cta: true },
];

const DIV_LINKS = [
  { to: '/metaverse', label: 'Metaverse',   color: '#5570f1' },
  { to: '/robotics',  label: 'Robotics',    color: '#22c97a' },
  { to: '/printing',  label: '3D Printing', color: '#f5a232' },
];
```

The desktop bar renders `NAV_LINKS.filter(l => !l.cta)` as plain links, then the
Divisions dropdown, then the "Join Us" button separately (it needs the solid-blue
treatment, so it is excluded from the normal loop by the `cta: true` flag).

The mobile overlay renders `[...NAV_LINKS, ...DIV_LINKS]` as one flat list — on a
phone there is no room for a hover dropdown, so divisions become top-level
entries, each tinted with its own `color`.

**Active-link highlighting** is a direct comparison: `pathname === l.to` adds the
`active` class, which reveals the underline. The Divisions trigger is marked
active when `DIV_LINKS.some(d => d.to === pathname)` — that is, when you are on
any division page.

**The dropdown** opens on `onMouseEnter` of the `<li>` and closes on
`onMouseLeave`, with an `onClick` toggle as a fallback for touch devices. It
carries `aria-haspopup` and `aria-expanded` so screen readers announce it
correctly, and Escape closes it. Note that the dropdown's own styling is inline
rather than in CSS — a small inconsistency, noted in section 14.

**To add a nav link:** add one object to `NAV_LINKS`. Both desktop and mobile
update automatically.

### 8.3 `Footer.jsx`

Static apart from one import: `CONTACT_URL` from the config file. Holds the logo,
three links (Instagram, GitHub, Contact), the copyright year, and the author
credit. The year `© 2026` is hard-coded text — update it manually each January,
or replace it with `new Date().getFullYear()`.

### 8.4 `Marquee.jsx` — the scrolling ticker

```jsx
export default function Marquee({ items = DEFAULT_ITEMS, color }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <div className={`marquee-dot${color === 'green' ? ' green' : color === 'amber' ? ' amber' : ''}`} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**The doubling trick is the whole component.** The CSS animation is:

```css
.marquee-track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
```

The track contains the list twice and is animated to exactly `-50%` of its own
width. At the end of the animation, the second copy sits precisely where the
first copy started — so when it snaps back to `0`, nothing visibly changes. The
scroll looks infinite and seamless. Remove the doubling, or change `-50%`, and
you get a visible jump.

**Usage.** `items` defaults to a generic tech keyword list. Pages pass their own:

```jsx
<Marquee items={['Free to Join','No Experience Needed','All Students Welcome', /*…*/]} />
```

The `color` prop (`'green'` or `'amber'`) tints the separator dots, but it is
currently never passed anywhere — the dots are always blue.

---

## 9. The CSS system: tokens, layers, and the colour language

### 9.1 Design tokens

`global.css` opens with every colour, font, and radius used on the site, declared
as CSS custom properties on `:root`:

```css
:root {
  --bg:  #07090f;   /* page background — near-black with a blue cast */
  --bg2: #0c1018;   /* alternating section background, card background */
  --bg3: #111622;   /* hover state, nested card background */

  --blue:         #5570f1;              /* primary accent · Metaverse */
  --blue-dim:     #3d52c4;
  --blue-glow:    rgba(85,112,241,0.18);
  --green:        #1a6b4a;              /* dark green, used for button fills */
  --green-bright: #22c97a;              /* accent green · Robotics */
  --green-glow:   rgba(34,201,122,0.15);
  --amber:        #f5a232;              /* accent amber · 3D Printing */

  --white:       #f0f2f8;                  /* body text */
  --white-dim:   rgba(240,242,248,0.55);   /* secondary text */
  --white-faint: rgba(240,242,248,0.08);

  --mono:    'Space Mono', monospace;       /* labels, tags, terminal, stats */
  --sans:    'DM Sans', sans-serif;         /* body copy */
  --display: 'Space Grotesk', sans-serif;   /* headings, big numbers */

  --border:      rgba(255,255,255,0.07);
  --border-blue: rgba(85,112,241,0.3);
  --r: 6px;
}
```

**Always use the token, never the raw value.** Writing `color: var(--white-dim)`
instead of `color: rgba(240,242,248,0.55)` means a future redesign changes one
line. The one legitimate exception is colour values computed in JavaScript from
data — those necessarily use hex strings, because `DIVISION_PROJECTS` and the
division objects need to do arithmetic on them (`d.color + '55'` to add alpha).

### 9.2 The three-colour division language

This is the most important visual convention on the site, stated as principle 5
in `PRODUCT.md`: *one club, three distinct voices*.

| Division | Colour | Token | Hex |
|---|---|---|---|
| Metaverse & Web Design | Blue | `--blue` | `#5570f1` |
| Robotics & Embedded Systems | Green | `--green-bright` | `#22c97a` |
| 3D Printing & Rapid Prototyping | Amber | `--amber` | `#f5a232` |

Blue doubles as the site's general primary accent, which is why the Metaverse
division feels like "the default" — worth knowing if you ever rebalance the
palette.

The colour is applied by three different mechanisms depending on context:

**1. Data-driven inline styles** — on the home page, where all three divisions
appear side by side. Each division object carries its own `color`, and components
interpolate it:

```jsx
{ div: 'robotics', color: '#22c97a', glowColor: 'rgba(34,201,122,0.1)', /* … */ }
// ...
<div className="div-card-num" style={{ color: d.color }}>
<div style={{ background: d.color + '12', borderColor: d.color + '55' }}>
```

The `+ '12'` and `+ '55'` suffixes are hex alpha channels — appending two hex
digits to a 6-digit colour makes it 8-digit RGBA. `12` ≈ 7% opacity, `55` ≈ 33%.
This is a compact way to derive a tint and a border from one base colour.

**2. A CSS variable override per page** — on the division pages. `divisions.css`
defines three wrapper classes:

```css
.div-blue  { --accent: #5570f1; --accent-glow: rgba(85,112,241,0.18); --accent-dim: rgba(85,112,241,0.25); }
.div-green { --accent: #22c97a; --accent-glow: rgba(34,201,122,0.15); --accent-dim: rgba(34,201,122,0.25); }
.div-amber { --accent: #f5a232; --accent-glow: rgba(245,162,50,0.15); --accent-dim: rgba(245,162,50,0.25); }
```

Each division page wraps its whole content in one of them:

```jsx
export default function Robotics() {
  return <div className="div-green"> … </div>;
}
```

Every rule inside `divisions.css` then refers to `var(--accent)` without knowing
which division it is on. This is why all three pages share one stylesheet instead
of having three copies. **It is the cleanest pattern in the codebase** — if you
add a fourth division, you add three lines of CSS and change one class name, and
the entire page re-themes.

**3. Modifier classes** — for small repeated elements:

```css
.section-label.green { color: var(--green-bright); }
.section-label.amber { color: var(--amber); }
.btn-primary.green-btn { background: var(--green); }
.btn-primary.amber-btn { background: #c47a20; }
.tag-chip.green { /* … */ }
.marquee-dot.amber { /* … */ }
```

Used as `<div className="section-label green">PROJECTS</div>`.

### 9.3 File layers and load order

| File | Scope | Imported by |
|---|---|---|
| `global.css` | Everything: tokens, reset, body noise overlay, keyframes, reduced-motion | `main.jsx` |
| `shared.css` | Nav, footer, buttons, marquee, `.reveal`, `.section-inner`, `.section-label`, `.tag-chip`, focus rings | `main.jsx` |
| `home.css` | Home page only | `Home/index.jsx` |
| `about.css` | About page only | `About.jsx` |
| `events.css` | Events page only | `Events.jsx` |
| `join.css` | Join page only | `Join.jsx` |
| `divisions.css` | All three division pages | each division page |

The first two load on every page because `main.jsx` imports them. The rest are
imported inside the page component that needs them — Vite bundles them into the
build, and since they load after `shared.css`, a page stylesheet can override a
shared rule.

> **⚠ Gotcha.** Because all CSS ends up in one global stylesheet, **class names
> are global**. `home.css` redefines `.section-inner`, `.section-label`, and
> `.reveal`, which already exist in `shared.css`. Whichever loads last wins. Be
> careful adding generic class names like `.card` or `.grid` — pick a prefix
> (`.events-card`, `.ltunnel-card`) the way the existing code mostly does.

### 9.4 Layout primitives you should reuse

```css
.section-inner  { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }
.section-label  { font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
                  color: var(--blue); display: flex; align-items: center; gap: 10px; }
.section-label::before { content: ''; width: 20px; height: 1px; background: var(--blue); }
```

`.section-inner` is the standard content container: centred, capped at 1200 px,
with responsive padding that drops to 32 px at 1024 px and 20 px at 768 px.
Almost every section on the site uses it.

`.section-label` is the small monospace eyebrow above every heading ("OUR
DIVISIONS", "WHAT WE DO", "FAQ"). The `::before` pseudo-element draws the short
dash to its left. Use it for any new section so the page stays consistent.

### 9.5 Typography scale

Three fonts, loaded from Google Fonts in `index.html`:

- **Space Grotesk** (`--display`) — headings and big numbers. Slightly technical,
  geometric. Used with tight negative letter-spacing (`-0.02em` to `-0.03em`) and
  weight 600–700.
- **DM Sans** (`--sans`) — body copy. Highly readable at small sizes. Usually
  weight 300 for paragraphs, which is what gives the site its airy feel.
- **Space Mono** (`--mono`) — labels, tags, stats, the terminal. Wide positive
  letter-spacing (`0.1em` to `0.2em`) and uppercase. This is the font that does
  most of the "technical credibility" work from the design brief.

Headings use `clamp()` for fluid sizing: `font-size: clamp(28px, 3vw, 44px)`
means "never below 28 px, never above 44 px, otherwise 3% of viewport width".
This removes the need for font-size media queries.

### 9.6 Responsive breakpoints

Three breakpoints, used consistently:

| Width | Meaning | Main changes |
|---|---|---|
| `max-width: 1024px` | Tablet / small laptop | Padding 48→32 px, multi-column grids collapse to 2, division hero canvas hidden |
| `max-width: 768px` | Phone / large phone | Padding →20 px, desktop nav replaced by hamburger overlay, most grids →1 column, hero switches to the mobile dot layout |
| `max-width: 480px` | Small phone | Further font-size and canvas-scale reductions |

There is also one `min-width: 769px` block that force-hides the mobile menu
button and overlay with `!important`, guarding against any leaked mobile state on
desktop.

### 9.7 Two global touches worth knowing

**The noise overlay.** `global.css` paints a fixed, full-screen SVG turbulence
texture over the entire site:

```css
body::before {
  content: ''; position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,…feTurbulence…");
  pointer-events: none; z-index: 9999; opacity: 0.4;
}
```

It is an inline data URI, so it costs no network request. It adds a subtle film
grain that stops the near-black background looking flat and banded. `pointer-events: none`
is essential — without it, this layer would sit above everything at `z-index: 9999`
and swallow every click on the site.

**Reduced motion.** The bottom of `global.css` honours
`prefers-reduced-motion: reduce` by removing reveal and canvas-layer transforms,
stopping pulsing dots, and slowing the marquee from 28 s to 80 s. It is partial
— the canvas animations and the About-page 3-D tunnel still run. See section 15.

---

## 10. Page-by-page deep dive

### 10.1 Home — `src/pages/Home/`

`index.jsx` is the whole page, and it is 28 lines:

```jsx
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <DivisionsShowcase />
      <Terminal />
      <HomeAbout />
      <Pillars />
      <HomeEvents />
      <CTA />
      <Footer />
    </>
  );
}
```

**Why split into eight files.** A single-file home page would be well over a
thousand lines. Splitting by section means: you can find the code for the thing
you are looking at in seconds, two people can edit two sections without merge
conflicts, and reordering the page is a matter of moving one line here. The
`<>…</>` is a React *fragment* — a wrapper that groups children without adding a
DOM element.

All eight sections share `home.css`, imported once at the top of `index.jsx`.

#### Hero.jsx — the scroll-driven division showcase

This is the most complex component on the site (473 lines). It is worth
understanding because it is also the most likely thing to confuse you.

**The effect:** the hero appears to stay still while you scroll through three
full screens, cycling through the three divisions — illustration, text, stats and
button colour all changing together.

**The mechanism — sticky positioning.** In `home.css`:

```css
.hero-scroll-wrap { height: 300vh; position: relative; }
.hero-sticky      { position: sticky; top: 0; height: 100vh; overflow: hidden; }
```

The outer wrapper is three viewport-heights tall, creating scroll distance. The
inner element is `position: sticky`, so it pins to the top of the screen and
stays there while its parent scrolls past. Three screens of scrolling, one screen
of visible content — that is the "scroll-jacking" feel, achieved with two CSS
properties and no JavaScript.

**The scroll-to-index calculation:**

```jsx
const onScroll = () => {
  const rect = wrapRef.current.getBoundingClientRect();
  const scrolled = -rect.top;                                  // px scrolled into the wrap
  const total = wrap.offsetHeight - window.innerHeight;         // total scrollable distance
  const pct = Math.max(0, Math.min(1, scrolled / total));       // clamp to 0…1
  setScrollPct(pct);
  const idx = Math.min(2, Math.floor(pct * 3));                 // 0, 1, or 2
  // …
};
window.addEventListener('scroll', onScroll, { passive: true });
```

`-rect.top` is how far the wrapper's top edge has gone above the viewport, i.e.
how far into the hero you have scrolled. Dividing by the total scrollable
distance gives a 0–1 percentage, which drives the progress bar on the right.
Multiplying by 3 and flooring gives the division index; `Math.min(2, …)` guards
against the edge case where `pct` hits exactly `1` and would produce `3`.

`{ passive: true }` tells the browser this listener will never call
`preventDefault()`, which lets it keep scrolling smooth instead of waiting for
the handler. Always pass it for read-only scroll listeners.

**The text crossfade.** Changing division does not swap the text instantly. A
three-stage state machine runs it:

```jsx
if (idx !== prevIdx.current) {
  setTextState('exiting');                  // CSS fades current text out
  setTimeout(() => {
    setActiveIdx(idx);                      // swap the data
    prevIdx.current = idx;
    setTextState('entering');               // new text starts invisible & offset
    setTimeout(() => setTextState('shown'), 50);   // next frame: animate in
  }, 280);                                  // 280ms = the CSS exit duration
}
```

The `280` must match the CSS transition duration on `.hero-text-wrap`, and the
`50` is a one-frame delay so the browser registers the "entering" start position
before transitioning to "shown". If you change the CSS timing, change the `280`
too.

**Why `prevIdx` is a `useRef`, not state.** A ref holds a value across renders
without causing a re-render when it changes. The scroll handler fires dozens of
times a second; if tracking the previous index triggered a render each time, the
page would crawl. Refs are the right tool for "remember this between calls, but
don't redraw".

**The three canvases.** `MetaverseCanvas`, `RoboticsCanvas`, and
`PrintingCanvas` are defined in the same file. All three are mounted at once and
stacked, with CSS controlling which is visible:

```jsx
{[MetaverseCanvas, RoboticsCanvas, PrintingCanvas].map((Comp, i) => (
  <div key={i} className={`hero-canvas-layer ${i === activeIdx ? 'visible' : 'hidden'}`}>
    <Comp active={i === activeIdx} />
  </div>
))}
```

```css
.hero-canvas-layer.hidden  { opacity: 0; transform: scale(0.88) translateY(20px); }
.hero-canvas-layer.visible { opacity: 1; transform: scale(1) translateY(0); }
```

All three stay mounted so the crossfade is smooth — unmounting would make them
pop in and out. But running three `requestAnimationFrame` loops continuously
would waste battery, so each canvas receives an `active` prop and **pauses its
own animation loop when inactive**:

```jsx
const draw = () => {
  /* …hundreds of drawing calls… */
  t++;
  if (activeRef.current) {
    rafRef.current = requestAnimationFrame(draw);   // keep going
  } else {
    rafRef.current = null;                          // stop the loop
  }
};
// restarted when `active` flips back to true:
restartRef.current = () => { if (!rafRef.current) draw(); };
```

This is the single most important performance decision in the file. Note the
pattern: `active` is copied into `activeRef` by an effect, because the `draw`
closure captures values from its first render and would otherwise never see the
updated prop.

**What each canvas draws:**

| Canvas | Scene |
|---|---|
| `MetaverseCanvas` | Rotating wireframe cube with hand-rolled 3-D rotation and perspective projection, a vanishing-point grid floor, 70 drifting particles, an orbiting elliptical ring, and a small orbiting octahedron. Responds to mouse position: `mouseRef` feeds extra rotation. |
| `RoboticsCanvas` | A stylised Arduino Uno: board outline, grid texture, mounting holes, PCB traces with animated "current" dots travelling along them, USB-B connector, ATmega328P chip with pins, 16 MHz crystal, voltage regulator, barrel jack, 14 digital and 6 analog pin headers, four blinking status LEDs, and a fake serial monitor printing live values. |
| `PrintingCanvas` | An FDM printer cross-section: frame, gantry rod, descending heated bed, a print head that scans left-right and advances one layer per sweep, a filament extrusion beam, a spinning fan, a growing printed object whose width follows a profile function, plus HUD tiles for nozzle temp, bed temp, and progress percentage. |

All three have a matching single-division variant on the division pages, with
slightly smaller dimensions (440×440 instead of 580×580) and no pausing logic —
they are always the only canvas on the page.

**The universal canvas cleanup pattern.** Every canvas component ends its effect
with:

```jsx
return () => {
  cancelAnimationFrame(rafRef.current);
  canvas.removeEventListener('mousemove', onMouse);
};
```

Without this, navigating away would leave the animation loop running forever
against a detached canvas — a memory leak that compounds every time the visitor
returns to the page. **If you ever write a new canvas component, copy this
pattern.**

**Navigation controls.** Desktop gets a vertical division list on the left and a
progress bar on the right; mobile (below 768 px) hides both and shows three dots.
All of them scroll rather than jump:

```jsx
onClick={() => {
  const total = wrap.offsetHeight - window.innerHeight;
  window.scrollTo({ top: wrap.offsetTop + (i / 3 + 0.01) * total, behavior: 'smooth' });
}}
```

The `+ 0.01` nudges the target just past the boundary between segments, so
rounding cannot land you in the previous division. The mobile dots are made
easier to tap by an invisible expanded hit area:

```css
.hero-mobile-dot::after { content: ''; position: absolute; inset: -18px; }
```

That turns a 6 px dot into a 42 px touch target without changing how it looks — a
technique worth remembering.

**To edit the hero content**, change `DIV_DATA` near the bottom of `Hero.jsx`.
Each entry holds the badge text, title, subtitle, description, tag list, colour
set, gradient tint, member count, button class, and destination path.

#### DivisionsShowcase.jsx — three expandable cards

Three cards defined by a `DIVISIONS` array. One piece of state tracks which is
open:

```jsx
const [active, setActive] = useState(null);   // null | 'metaverse' | 'robotics' | 'printing'
```

Clicking a card toggles it: `setActive(isActive ? null : d.div)`. Because a
single value holds the answer, **opening one card closes the others
automatically** — an accordion with no extra logic.

The expand animation uses an inline computed `maxHeight`:

```jsx
<div className="div-detail" style={{ maxHeight: isActive ? '440px' : '0' }}>
```

with `overflow: hidden` and a CSS transition on `max-height`. This is the classic
CSS-only expand trick. It requires a fixed pixel ceiling because CSS cannot
transition to `auto` — so **if you add enough content to a division's detail
panel, it will be clipped at 440 px**. Raise the number if that happens.

The expanded panel shows the division lead and vice lead, then the first three
projects via `DIVISION_PROJECTS.<div>.slice(0, 3)`.

Each card's icon is stored as a **function that takes a colour**:

```jsx
icon: (color) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
),
// called as: {d.icon(d.color)}
```

Storing a function rather than finished JSX lets the same icon definition be
recoloured per division. Icons are inline SVG rather than an icon font or library
— no extra request, and they inherit colour naturally.

#### Terminal.jsx — the interactive fake shell

A convincing imitation of a terminal, and the site's main personality piece. It
is also a good self-contained example of React state, so read it if you want to
learn the patterns.

**State:**

```jsx
const [lines,   setLines]   = useState(BOOT_LINES);  // everything printed so far
const [input,   setInput]   = useState('');          // current input value
const [history, setHistory] = useState([]);          // past commands, newest first
const [histIdx, setHistIdx] = useState(-1);          // position when arrowing through history
```

**Output is data, not HTML.** Every printed line is an object
`{ type, text }`, where `type` is one of `out`, `green`, `blue`, `amber`, `dim`,
`err`, `cmd`, or `spacer`. `renderLine` turns it into markup, and CSS styles each
type:

```css
.t-out.green { color: #22c97a; }
.t-out.err   { color: #f05e5e; }
.t-out.dim   { color: rgba(240,242,248,0.25); }
.t-spacer    { height: 6px; }
```

Keeping output as data means a command is just a function that returns an array.

**Commands live in one object:**

```jsx
const COMMANDS = {
  help:      () => [ /* lines */ ],
  divisions: () => [ /* lines */ ],
  events:    () => [ /* lines */ ],
  members:   () => [ /* lines */ ],
  projects:  () => { /* built from DIVISION_PROJECTS at call time */ },
  whoami:    () => [ /* lines */ ],
};
```

**To add a command:** add one key whose value is a function returning an array of
line objects, and add a line to `help` describing it. Nothing else.

`projects` is the interesting one — it reads live data rather than hard-coded
text:

```jsx
for (const [div, projects] of Object.entries(DIVISION_PROJECTS)) {
  for (const p of projects.filter(p => p.status === 'Active')) {
    lines.push({ type: COLOR[div], text: `  [${PREFIX[div]}] ${p.name.padEnd(26)}— active` });
  }
}
```

`padEnd(26)` aligns the dashes into a column, which is what makes it read like
real terminal output.

**`clear` and `join` are special-cased** in `runCmd` rather than living in
`COMMANDS`, because they do more than return lines. `clear` replaces the whole
`lines` array. `join <division>` reads `SIGNUP_CONFIG` and may trigger
navigation, using a sentinel line type:

```jsx
{ type: '__redirect', to: '/join' }
```

`runCmd` pulls that line out before rendering and acts on it:

```jsx
const redirectLine  = output.find(l => l.type === '__redirect');
const visibleOutput = output.filter(l => l.type !== '__redirect');
setLines([...newLines, ...visibleOutput]);
if (redirectLine) setTimeout(() => navigate(redirectLine.to), 900);
```

The 900 ms delay lets the user read "Redirecting…" before the page changes. This
"command returns a side-effect instruction as data" pattern keeps every command a
pure function — worth copying if you add more commands that need to *do* things.

**Command history** mimics a real shell. `history` is newest-first, so ArrowUp
increments the index and ArrowDown decrements it, with `-1` meaning "empty
input":

```jsx
else if (e.key === 'ArrowUp') {
  e.preventDefault();                                   // don't move the text cursor
  const idx = Math.min(histIdx + 1, history.length - 1);
  setHistIdx(idx);
  setInput(history[idx] || '');
}
```

**Two usability touches.** Clicking anywhere in the terminal body focuses the
hidden input (`onClick={() => inputRef.current?.focus()}`), so the terminal feels
like a real one. And the clickable hint buttons on the left inject a command:

```jsx
const injectCmd = (cmd) => {
  inputRef.current?.focus();
  setInput(cmd);
  setTimeout(() => runCmd(cmd), 80);
};
```

The 80 ms delay lets the user *see* the command appear in the input before it
runs — a small detail that makes the interaction legible.

After every command, `setTimeout(scrollBody, 0)` scrolls the output to the
bottom. The zero-delay timeout defers the scroll until after React has painted
the new lines; without it, you would scroll to the old height.

> **⚠ Known issue.** The `events` command output is **hard-coded and stale**. It
> lists "Spring Hackathon 2026", "AI & Machine Learning Workshop", and others
> that are not in `data/events.js`. The `projects` command reads live data but
> `events` does not. Fixing this is the single highest-value small contribution
> you can make — see section 15 for the exact change.

#### HomeAbout.jsx, Pillars.jsx, CTA.jsx

Simple, static sections. `HomeAbout` is a two-column block with copy and a logo
card. `Pillars` maps a six-item array into a grid of cards, each with an inline
SVG icon whose stroke colour alternates blue and green. `CTA` is the closing
call-to-action with two buttons. All three use `useReveal`.

To change the text, edit the component directly — these are not data-driven,
because the content is prose rather than records.

#### HomeEvents.jsx — the live events preview

Short, and a good demonstration of the data layer:

```jsx
const events = ALL_EVENTS
  .filter(isUpcoming)
  .slice(0, 4)
  .map(e => ({ /* flattened shape with a tagStyle class */
    month: e.month, day: e.day, year: e.year, name: e.title,
    location: e.location, time: e.time, tag: e.type,
    tagStyle: TYPE_TAG_STYLE[e.type] ?? 'blue',
  }));
```

Filter to upcoming, take the first four, reshape for display. The `?? 'blue'`
fallback means an unknown event type still renders, just in the default colour,
instead of producing `undefined` in a className.

Note this runs at **module load**, not inside the component — so the list is
computed once when the bundle loads. For a site whose data only changes on
deploy, that is fine.

### 10.2 About — `src/pages/About.jsx`

The longest single file (523 lines) and the most visually ambitious page. Six
sections: hero with stats, values, history timeline, the 3-D leadership tunnel,
portfolio, and photo gallery.

**Data arrays at the top of the file:** `TIMELINE`, `TEAM`, `PORTFOLIO`,
`GALLERY`, `VALUES`, `GALLERY_PATTERNS`. These are the things you will edit.

#### The Lightbox

A small component that shows a full-screen image when a gallery or portfolio
thumbnail is clicked. Three things it does correctly and that you should preserve
if you touch it:

```jsx
useEffect(() => {
  const onKey = (e) => { if (e.key === 'Escape') onClose(); };
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';          // lock background scroll
  return () => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';              // always restore
  };
}, [onClose]);
```

Escape closes it. Background scrolling is locked while it is open — and, crucially,
**restored in the cleanup function**, so an early unmount can never leave the page
permanently unscrollable. Clicking the backdrop closes it, while clicking the
image itself does not, thanks to `onClick={(e) => e.stopPropagation()}` on the
`<img>`.

The lightbox state lives in the parent `About` component and is passed down as a
callback:

```jsx
const [lightbox, setLightbox] = useState(null);
const openLightbox  = useCallback((src, alt) => setLightbox({ src, alt }), []);
const closeLightbox = useCallback(() => setLightbox(null), []);
// …
<GalleryItem item={item} patternIdx={i} onOpen={openLightbox} />
```

`useCallback` keeps the function identity stable between renders, so passing it
to many children does not cause needless re-renders. This is **"lifting state
up"** — the shared state lives in the closest common ancestor, and children
receive a function to change it.

#### The Leadership Tunnel

The boldest thing on the site: a 3-D corridor of floating leadership cards and
division titles that you fly through by scrolling, ending in a flat full-roster
screen. About 150 lines.

**How the 3-D works.** CSS 3-D transforms, not WebGL. `about.css` sets up:

```css
.ltunnel-scene { perspective: 800px; z-index: 1; /* … */ }
.ltunnel-world { transform-style: preserve-3d; /* … */ }
```

`perspective` on the parent makes `translate3d(x, y, z)` on children look like
real depth. `preserve-3d` stops the browser flattening nested transforms. Items
are positioned at large `z` values and the "camera" moves by decreasing the
`z` offset applied to every item.

**Scene construction** happens once, in a `useMemo`:

```jsx
const { allItems, totalDepth } = useMemo(() => {
  const out = [];
  let z = 400;
  TUNNEL_SECTIONS.forEach((sec, si) => {
    out.push({ id:`t${si}`, type:'title', title:sec.title, color:sec.color, z });
    z += 480;
    sec.members.forEach((m, mi) => {
      const xOff = sec.members.length === 1 ? 0 : (mi % 2 === 0 ? -310 : 310);
      out.push({ id:`c${si}${mi}`, type:'card', member:m, color:sec.color, z, x:xOff });
      z += 640;
    });
    z += 780;
  });
  const td = z;
  for (let i = 0; i < 70; i++) { out.push({ id:`s${i}`, type:'star', /* random x, y, z */ }); }
  return { allItems: out, totalDepth: td };
}, []);
```

It walks forward through depth, placing a division title, then its members
alternating left and right of centre (`mi % 2` decides the side), then a gap
before the next division. Finally it scatters 70 stars at random positions for
depth cues. `useMemo` with an empty dependency array means this runs **once** —
the random star positions stay fixed instead of jumping on every render.

**Animation runs outside React.** This is the key architectural decision. A
`requestAnimationFrame` loop writes directly to DOM elements:

```jsx
const els = elMap.current;   // populated by  ref={el => elMap.current[item.id] = el}
const S = { scroll: 0, target: 0, vel: 0, mx: 0, my: 0 };   // plain object, not state

const tick = () => {
  S.vel += ((S.target - S.scroll) * 0.07 - S.vel) * 0.12;   // spring smoothing
  S.scroll += S.vel;
  // …
  allItems.forEach(item => {
    const el = els[item.id];
    const vz = item.z - S.scroll;
    el.style.opacity = getAlpha(vz);
    el.style.transform = `translate3d(${x}px, ${y}px, ${vz}px)`;
  });
  raf = requestAnimationFrame(tick);
};
```

**Why bypass React here.** Around 80 elements update 60 times a second. Storing
the camera position in `useState` would trigger 60 renders a second of a
component tree with 80 children — guaranteed jank. Writing `el.style.transform`
directly is the correct escape hatch for high-frequency animation. React still
owns *creating* the elements; the animation loop only mutates their transforms.

**Inertia.** The two-line spring in `tick` is what makes the tunnel feel
physical. `S.target` jumps instantly when you scroll; `S.scroll` chases it, and
`S.vel` (velocity) is itself smoothed. The result is acceleration and coasting
rather than a rigid 1:1 mapping. The constants `0.07` (stiffness) and `0.12`
(damping) are the knobs — larger values mean snappier and less floaty.

**Visual flourishes driven by velocity:**

- `scene.style.perspective = Math.max(500, 800 - Math.abs(v) * 6) + 'px'` —
  moving fast narrows the field of view, like a speed effect.
- Title text gets a red/green chromatic-aberration `textShadow` offset by
  velocity when `|v| > 1.5`.
- Stars stretch along z (`scale3d(1, 1, s)`) with speed, becoming motion streaks.
- Cards bob gently: `Math.sin(performance.now() * 0.0007 + item.z * 0.001) * 8`.
  The `item.z` term offsets each card's phase so they do not bob in unison.

**Depth-based fading** keeps the scene clean:

```jsx
const getAlpha = (vz) => {
  if (vz < -2800) return 0;                              // far behind: gone
  if (vz < -1300) return (vz + 2800) / 1500;             // fading in from the distance
  if (vz >  380)  return Math.max(0, 1 - (vz - 380) / 280);  // fading out as it passes you
  return 1;
};
if (a <= 0) return;   // skip the transform write entirely — cheap optimisation
```

**Scroll capture, and how it releases.** The tunnel intercepts wheel events so
your scroll drives the camera instead of the page:

```jsx
const onWheel = (e) => {
  const done = (S.target <= 0 && e.deltaY < 0) || (S.target >= totalDepth && e.deltaY > 0);
  if (done) return;                     // at an end: let the page scroll normally
  e.preventDefault();
  S.target = Math.max(0, Math.min(totalDepth, S.target + e.deltaY * 2.5));
};
outer.addEventListener('wheel', onWheel, { passive: false });
```

The `done` check is essential: without it you would be trapped in the tunnel
forever. When you reach either end and keep scrolling that way, the handler
returns early and the browser scrolls the page. Touch devices get the same logic
via `touchstart`/`touchmove` using finger delta.

Note `{ passive: false }` here — the opposite of the hero's scroll listener —
because this handler *must* be able to call `preventDefault()`.

**The end screen.** The roster cross-fades in as the tunnel ends:

```jsx
const rp = Math.max(0, Math.min(1, (cam - (totalDepth - 700)) / 700));
world.style.opacity = Math.max(0, 1 - Math.max(0, (cam - (totalDepth - 900)) / 500));
roster.style.opacity = rp;
roster.style.pointerEvents = rp > 0.05 ? 'auto' : 'none';
```

The `pointerEvents` toggle stops the invisible roster from blocking clicks on the
tunnel before it appears.

The roster deliberately lives **outside** `.ltunnel-scene` in the markup. There
is a comment in the source explaining why, and it is worth reading: inside a
`perspective` context, 3-D-translated children can paint above later siblings
regardless of `z-index`. Moving the roster out of that stacking context makes
`z-index: 7` behave normally.

> **⚠ Critical gotcha for maintainers.** `TUNNEL_SECTIONS` slices `TEAM` **by
> index**:
>
> ```jsx
> const TUNNEL_SECTIONS = [
>   { title:'COMMUNITY', color:'#5570f1', members: TEAM.slice(0,4) },
>   { title:'METAVERSE', color:'#5570f1', members: TEAM.slice(4,6) },
>   { title:'ROBOTICS',  color:'#22c97a', members: TEAM.slice(6,8) },
>   { title:'3D PRINT',  color:'#f5a232', members: TEAM.slice(8,10) },
> ];
> ```
>
> Insert a fifth Community member and every later slice shifts: a Metaverse lead
> will silently appear under Robotics. **If you add or remove anyone from `TEAM`,
> you must update these slice indices.** Section 11.6 walks through it, and
> section 15 proposes a permanent fix.

#### Portfolio and Gallery

Both follow the same pattern: an array of objects where `img` is either a path or
`null`, and the component renders a photo or a generated placeholder:

```jsx
{item.img
  ? <img src={item.img} alt={item.label} style={{ position:'absolute', inset:0,
      width:'100%', height:'100%', objectFit:'cover' }} />
  : <div className="gallery-placeholder">📷 {item.hint}</div>}
```

`objectFit: 'cover'` makes any aspect ratio fill the box without distortion, so
you can drop in photos of any shape.

The `expandable` class is added only when `img` is set, which changes the cursor
to `zoom-in` and wires the click to the lightbox. A placeholder is not clickable.

The gallery is a **masonry-style CSS grid**:

```css
.gallery-grid      { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 240px; gap: 8px; }
.gallery-grid .wide { grid-column: span 2; }
.gallery-grid .tall { grid-row: span 2; }
```

Setting `wide: true` or `tall: true` on a gallery item makes it occupy two
columns or two rows. Mixing them creates the varied mosaic. At 1024 px the grid
drops to two columns and `.wide` is reset to one column so nothing overflows.

Placeholders get one of three diagonal/horizontal line patterns, chosen by
`GALLERY_PATTERNS[patternIdx % 3]` — the modulo cycles through the three so
adjacent placeholders differ.

### 10.3 Events — `src/pages/Events.jsx`

The most data-driven page. Two independent filters plus automatic month grouping.

**State and derivation:**

```jsx
const [filter,    setFilter]    = useState('All');              // event type
const [divFilter, setDivFilter] = useState('All Divisions');     // division

const upcoming = ALL_EVENTS.filter(isUpcoming);

const filtered = upcoming.filter(e => {
  const typeOk = filter === 'All' || e.type === filter;
  const divOk  = divFilter === 'All Divisions' || e.division === divFilter || e.division === 'All';
  return typeOk && divOk;
});
```

Note `|| e.division === 'All'` — an event tagged `'All'` shows under every
division filter, which is correct for club-wide events.

**Month grouping without a grouping library:**

```jsx
const months = [...new Set(filtered.map(e => `${e.month} ${e.year}`))];
// …
{months.map(month => (
  <div key={month}>
    <div className="events-month-label">{month}</div>
    {filtered.filter(e => `${e.month} ${e.year}` === month).map(e => /* card */)}
  </div>
))}
```

Build a string key per event, wrap in a `Set` to deduplicate, spread back to an
array, then render a heading per month and filter the list for each. Headings
appear in data order, so **keep `ALL_EVENTS` sorted by date** — nothing sorts it
for you.

**The live counters** in the hero are computed, not typed:

```jsx
const currentMonthKey = Object.keys(MONTH_INDEX).find(k => MONTH_INDEX[k] === now.getMonth());
const thisMonthCount  = upcoming.filter(e => e.month === currentMonthKey && e.year === now.getFullYear()).length;
// rendered as: [[String(upcoming.length),'Upcoming Events'], [String(thisMonthCount),'This Month'], ['120+','Avg. Attendance']]
```

"Upcoming Events" and "This Month" update themselves. "Avg. Attendance" is
hard-coded.

**Type tag colours** are computed from one hex value:

```jsx
const typeTagStyle = type => {
  const color = TYPE_COLORS[type] ?? '#888';
  return { color, background: `${color}18`, border: `1px solid ${color}33` };
};
```

One base colour yields text, a 9%-opacity background, and a 20%-opacity border.
This three-value pattern recurs all over the site.

**The empty state** is handled — if no events match, a "NO EVENTS MATCH THIS
FILTER" message renders instead of a blank page. Always do this when you add a
filter.

> **Note.** `const past = ALL_EVENTS.filter(e => !isUpcoming(e))` is computed but
> never rendered. `events.css` still carries `.past-section`, `.past-grid`, and
> `.past-card` styles from a past-events section that was removed. Either
> reinstate the section (section 15) or delete the dead code.

### 10.4 Join — `src/pages/Join.jsx`

Four data arrays (`FAQS`, `PERKS`, `STEPS`), a gated sign-up panel, and an
accordion.

**The sign-up gate** is a separate component so the two states stay readable:

```jsx
function SignupPanel() {
  if (SIGNUP_CONFIG.isOpen) {
    return ( /* green badge + link to googleFormUrl */ );
  }
  return ( /* grey badge + next-intake date + Instagram link */ );
}
```

An early `return` for the open case rather than a ternary wrapping 40 lines of
JSX. When two branches are both substantial, early return is much easier to read.

The hero subtitle is also gated, with a ternary because it is a single string:

```jsx
const heroSub = SIGNUP_CONFIG.isOpen
  ? '…Sign-ups are open now. Scroll down to apply.'
  : '…Sign-ups open periodically. Scroll down to stay in the loop.';
```

**The FAQ accordion** uses one state value for the whole list:

```jsx
const [openFaq, setOpenFaq] = useState(null);
// …
onClick={() => setOpenFaq(openFaq === i ? null : i)}
```

Same single-value-accordion pattern as the division cards: clicking an open item
closes it, clicking another switches. Only one can be open.

Its accessibility is the best on the site, and is the standard to match:

```jsx
<button type="button" className="faq-q"
        aria-expanded={openFaq === i}
        aria-controls={`faq-answer-${i}`}>
  <span className="faq-q-text">{f.q}</span>
  <svg className={`faq-chevron${openFaq === i ? ' open' : ''}`}>…</svg>
</button>
<div id={`faq-answer-${i}`} className={`faq-a${openFaq === i ? ' open' : ''}`}>
  <p className="faq-a-inner">{f.a}</p>
</div>
```

A real `<button>` (keyboard-focusable and Enter/Space-activatable for free),
`aria-expanded` announcing the state, and `aria-controls` linking the button to
the panel it governs. The chevron rotates 180° via a CSS transition on the `open`
class.

> **⚠ Gotcha.** `.faq-a.open { max-height: 200px }` in `join.css`. A long FAQ
> answer will be clipped. If you write a long answer, raise that number.

### 10.5 The three division pages

`Metaverse.jsx`, `Robotics.jsx`, and `Printing.jsx` share one structure:

1. Hero: badge, title, subtitle, tech tags, two buttons, three stats, lead names,
   and a canvas illustration on the right.
2. `<Marquee>` with division-specific keywords.
3. Projects grid from `DIVISION_PROJECTS.<div>`.
4. **One unique section per division** (this is the main difference between them).
5. Tech stack grid from a local `TECH` array.
6. "Get Involved" — copy plus a `LEARN` array of recurring activities.
7. CTA bar and footer.

| Page | Wrapper class | Canvas | Unique section |
|---|---|---|---|
| `Metaverse.jsx` | `div-blue` | Wireframe cube (`HeroCanvas`) | none |
| `Robotics.jsx` | `div-green` | Arduino board (`ArduinoCanvas`) | **Live Demo** — `LiveSensors` fake telemetry panel |
| `Printing.jsx` | `div-amber` | FDM printer (`PrinterCanvas`) | **Print Specs** — lab equipment table |

**How the theming works** — this is the pattern described in section 9.2. The
wrapper class sets `--accent`, and `divisions.css` refers only to `var(--accent)`.
One stylesheet, three themes, no duplication.

**`LiveSensors`** (in `Robotics.jsx`) is a nice small component: six fake
telemetry readings refreshed on a timer.

```jsx
const [sensors, setSensors] = useState({ prox:42, torque:78, speed:1240, temp:36.4, volt:4.98, current:0.32 });
useEffect(() => {
  const id = setInterval(() => setSensors({ /* new random values */ }), 800);
  return () => clearInterval(id);
}, []);
```

Each row renders a label, a bar whose width is `pct * 100`%, and a formatted
value. `clearInterval` in the cleanup is mandatory — without it the timer keeps
firing after you navigate away, calling `setState` on an unmounted component.

> **⚠ Gotcha.** The three hero stats on each division page are **hard-coded
> strings**, and they disagree with the real data. Metaverse says "6 Projects"
> while `DIVISION_PROJECTS.metaverse` has 2; Printing says 16; Robotics says 9.
> The home page reads the real `.length`, so the two pages contradict each other.
> Fix in section 11.8.

---

## 11. Cookbook: common maintenance tasks

Practical recipes. Each one lists the file, the change, and how to verify it.

### 11.1 Add a new event

**File:** `src/data/events.js`

Append to `ALL_EVENTS`, keeping the array sorted by date:

```js
{ id: 6, month: 'NOV', day: '15', year: 2026,
  title: 'Arduino Bootcamp',
  type: 'Workshop',
  location: 'Smart Classroom 2',
  time: '13:00 – 16:00',
  desc: 'Two-hour hands-on introduction to Arduino for complete beginners.',
  division: 'Robotics',
  capacity: '20 spots' },
```

Checklist:

- `id` is unique.
- `month` is three uppercase letters.
- `type` is an existing key in `TYPE_COLORS` (otherwise add it to both colour maps).
- `division` is exactly `'All'`, `'Metaverse'`, `'Robotics'`, or `'3D Printing'`.
- Add `featured: true` only for genuinely major events — it is a visual
  highlight, and highlighting everything highlights nothing.

**Verify:** the event appears on `/events` under its month, the "Upcoming Events"
counter increased, it survives the type and division filters, and if it is within
the next four it appears on the home page too.

### 11.2 Open or close sign-ups

**File:** `src/config/signup.js`

To open:

```js
export const SIGNUP_CONFIG = {
  isOpen: true,
  googleFormUrl: 'https://forms.gle/YOUR-REAL-FORM-ID',   // ← must not be empty
  nextIntakeDate: 'September 2026',
  showNextIntakeDate: true,
};
```

To close, set `isOpen: false` and update `nextIntakeDate` to the next cycle.

**Verify:** on `/join` the badge is green and pulsing, the button opens your form
in a new tab, and the hero subtitle says "Sign-ups are open now". On the home
page, typing `join robotics` in the terminal prints a green message and redirects
to `/join`.

### 11.3 Add or update a division project

**File:** `src/data/projects.js`

```js
robotics: [
  { name: 'Ursuline Cup Final Project', /* … */ },
  { name: 'Line Follower v2',
    desc: 'Second-generation PID line follower for the 2026 competition season.',
    tags: ['C++','Arduino','PID','IR Sensors'],
    status: 'In Progress' },
],
```

`status` must be `'Active'`, `'In Progress'`, or `'Shipped'`.

**Verify:** the project card appears on `/robotics`; the Projects counter in the
home hero and on the home division card both went up by one; if `status` is
`'Active'`, the terminal's `projects` command lists it.

### 11.4 Change a division's member count

There is no single place. The number is duplicated:

| File | Location |
|---|---|
| `src/pages/Home/Hero.jsx` | `members: 31` etc. inside `DIV_DATA` |
| `src/pages/Home/DivisionsShowcase.jsx` | `members: 31` etc. inside `DIVISIONS` |
| `src/pages/Home/Terminal.jsx` | the `members` command output string |
| `src/pages/divisions/*.jsx` | the hard-coded hero stat array |
| `src/pages/About.jsx` | hero stat grid, hero subtitle prose, last timeline entry |
| `src/pages/Join.jsx` | hero subtitle (twice) and the hero stat list |

Search the whole `src/` folder for the old number and update every occurrence.
This duplication is the worst piece of technical debt in the project; section 15
proposes a single-source-of-truth fix that takes about twenty minutes and would
make this task a one-line edit.

### 11.5 Change a division lead or vice lead

Two files per division:

1. `src/pages/Home/DivisionsShowcase.jsx` — the `leader` and `viceLead` fields in
   the matching `DIVISIONS` entry.
2. `src/pages/divisions/<Division>.jsx` — the two names in the hero, around line
   96–100.

And if the person is in the leadership tunnel, also `TEAM` in `About.jsx` — see
the next recipe.

### 11.6 Add, remove, or rename a team member

**File:** `src/pages/About.jsx`

**Step 1.** Edit the `TEAM` array:

```js
{ name:'New Person Name', role:'Treasurer', div:'Community',
  color:'#5570f1', initials:'NPN', img:null },
```

- `div` should be `'Community'`, `'Metaverse'`, `'Robotics'`, or `'3D Printing'`.
- `color` should match the division colour.
- `initials` is the placeholder shown when there is no photo. Only the **first
  two characters** are displayed (`member.initials.slice(0, 2)`), so `'NPN'`
  renders as `NP`.
- `img: '/uploads/photo.webp'` shows a real photo instead. Put the file in
  `public/uploads/` first.

**Step 2 — do not skip this.** Update `TUNNEL_SECTIONS` so the slice ranges still
match. `TEAM` order must be: Community members, then Metaverse, then Robotics,
then 3D Printing. If you added a fifth Community member, every later range shifts
by one:

```js
const TUNNEL_SECTIONS = [
  { title:'COMMUNITY', color:'#5570f1', members: TEAM.slice(0,5)  },  // was (0,4)
  { title:'METAVERSE', color:'#5570f1', members: TEAM.slice(5,7)  },  // was (4,6)
  { title:'ROBOTICS',  color:'#22c97a', members: TEAM.slice(7,9)  },  // was (6,8)
  { title:'3D PRINT',  color:'#f5a232', members: TEAM.slice(9,11) },  // was (8,10)
];
```

**Verify:** scroll the whole leadership tunnel on `/about` and check every person
appears under the correct division heading, in both the 3-D tunnel and the final
roster screen.

### 11.7 Add a photo to the gallery or portfolio

**Step 1.** Put the image in `public/uploads/`. Use `.webp` and keep it under
roughly 300 KB — see section 12.

**Step 2 — gallery.** Add to `GALLERY` in `About.jsx`:

```js
{ label:'Robotics Workshop 2026',
  bg:'rgba(34,201,122,0.08)',
  hint:'Workshop · March 2026',
  img:'/uploads/robotics-workshop.webp',
  wide:true },
```

The path starts with `/uploads/`, **not** `/public/uploads/` — `public/` is the
web root in the build. `wide: true` spans two columns, `tall: true` spans two
rows; omit both for a normal cell. `hint` only shows if `img` is `null`.

**Step 3 — portfolio.** Add to `PORTFOLIO`:

```js
{ name:'Hexapod Walker', div:'Robotics',
  desc:'Six-legged walking robot with inverse-kinematics gait control.',
  status:'In Progress', statusColor:'#5570f1',
  bg:'rgba(85,112,241,0.08)', divColor:'#22c97a',
  img:'/uploads/hexapod.webp' },
```

`divColor` should be the division's colour; `statusColor` should match the status
(green `#22c97a` for Active, blue `#5570f1` for In Progress,
`rgba(255,255,255,0.3)` for Shipped).

**Verify:** the image loads, clicking it opens the lightbox, Escape closes it,
and the gallery mosaic still looks balanced.

### 11.8 Fix the division page hero stats

**Files:** the three files in `src/pages/divisions/`

Replace the hard-coded array with computed values. In `Metaverse.jsx`, change:

```jsx
{[['31','Members'],['6','Projects'],['4','Events / Sem']].map(([n,l]) => (
```

to:

```jsx
{[['31','Members'],[String(PROJECTS.length),'Projects'],['4','Events / Sem']].map(([n,l]) => (
```

`PROJECTS` is already defined at the top of each file as
`DIVISION_PROJECTS.metaverse`. Now the count cannot drift from reality. Do the
same in `Robotics.jsx` and `Printing.jsx`.

### 11.9 Add a new terminal command

**File:** `src/pages/Home/Terminal.jsx`

Add a key to `COMMANDS`:

```js
contact: () => [
  { type:'blue',  text:'Get in touch' },
  { type:'spacer' },
  { type:'out',   text:'  Instagram : @ursutech' },
  { type:'out',   text:'  WhatsApp  : wa.me/6282261592211' },
  { type:'spacer' },
],
```

Then add a line to the `help` output so people can discover it:

```js
{ type:'out', text:'  contact          Show contact information' },
```

Optionally add it to `HINTS` to get a clickable button on the left.

Available `type` values: `out` (dim grey), `green`, `blue`, `amber`, `dim` (very
faint), `err` (red), `spacer` (blank line).

### 11.10 Change the contact number or social links

- **WhatsApp / contact:** `CONTACT_URL` in `src/config/signup.js`. One edit,
  applies to the footer everywhere.
- **Instagram:** hard-coded as `https://www.instagram.com/ursutech/` in
  `Footer.jsx`, `CTA.jsx`, `Events.jsx`, and `Join.jsx`. Search `src/` for
  `instagram.com` and update each. Moving this into `signup.js` alongside
  `CONTACT_URL` would be a good small improvement.
- **GitHub:** in `Footer.jsx`.
- **Email:** `ursutech@gmail.com` appears in the FAQ intro in `Join.jsx`.

### 11.11 Change a colour site-wide

**File:** `src/styles/global.css`

Edit the token in `:root`, for example `--blue: #5570f1`. Every CSS rule using
`var(--blue)` updates.

But **JavaScript colour literals do not**. The same hex values are repeated in:

- `Hero.jsx` (`DIV_DATA`: `color`, `badgeBg`, `badgeBorder`, `tint`)
- `DivisionsShowcase.jsx` (`DIVISIONS`: `color`, `glowColor`, `iconBg`)
- `Nav.jsx` (`DIV_LINKS`)
- `data/events.js` (`TYPE_COLORS`)
- `data/projects.js` (`STATUS_COLORS`)
- `styles/divisions.css` (`.div-blue` / `.div-green` / `.div-amber`)
- `About.jsx` (`TIMELINE`, `TEAM`, `PORTFOLIO`, `TUNNEL_SECTIONS`)
- inside every canvas drawing function, as `rgba(…)` strings

Search for the old hex across `src/` and be systematic. A proper rebrand is a
half-day job, not a one-line change.

### 11.12 Edit page copy

Prose is not in the data layer — it lives in the component that displays it.

| Text | File |
|---|---|
| Home "who we are" paragraphs | `src/pages/Home/HomeAbout.jsx` |
| Home six pillars | `src/pages/Home/Pillars.jsx` (the `pillars` array) |
| Home closing CTA | `src/pages/Home/CTA.jsx` |
| About history prose | `src/pages/About.jsx`, inside the History section |
| About timeline entries | `TIMELINE` in `About.jsx` |
| About values | `VALUES` in `About.jsx` |
| Join FAQ | `FAQS` in `Join.jsx` |
| Join perks | `PERKS` in `Join.jsx` |
| Join three steps | `STEPS` in `Join.jsx` |
| Division descriptions | the relevant file in `src/pages/divisions/` |
| Division tech stacks | the `TECH` array in each division file |
| Division activities | the `LEARN` array in each division file |

> **⚠ Apostrophes in JSX.** Text sits inside JavaScript strings, so an
> unescaped `'` breaks a single-quoted string. Use double quotes around the
> string (`a: "…you'll receive…"`) or escape it (`'…you\'ll…'`). You will see
> both in the existing code.

### 11.13 Add a whole new division

The longest task, but mechanical:

1. **`src/data/projects.js`** — add a key to `DIVISION_PROJECTS`, e.g. `ai: [...]`.
2. **`src/styles/divisions.css`** — add a theme class:
   ```css
   .div-purple { --accent: #a855f7; --accent-glow: rgba(168,85,247,0.15); --accent-dim: rgba(168,85,247,0.25); }
   ```
   Also add `.div-purple .project-card-tag`, `.div-purple .learn-item-icon`, and
   `.div-purple .div-hero-badge` overrides, following the existing three.
3. **`src/pages/divisions/AI.jsx`** — copy `Metaverse.jsx` as a template, change
   the wrapper class to `div-purple`, and rewrite the content arrays.
4. **`src/App.jsx`** — import it and add a `<Route path="/ai" element={<AI />} />`.
5. **`src/components/Nav.jsx`** — add to `DIV_LINKS` with the new colour.
6. **`src/pages/Home/Hero.jsx`** — add to `DIV_DATA`, **and** change
   `Math.floor(pct * 3)` / `Math.min(2, …)` / `(i / 3 + 0.01)` to use `4` and `3`.
   Three numbers, easy to miss — the scroll segmentation is hard-coded to three
   divisions.
7. **`src/pages/Home/DivisionsShowcase.jsx`** — add to `DIVISIONS`. Also update
   `.divisions-grid { grid-template-columns: repeat(3, 1fr) }` in `home.css` and
   the `{d.num} / 03` label.
8. **`src/pages/Home/Terminal.jsx`** — add a line to the `divisions` command, add
   the new key to the `map` in `getJoinOutput`, and to `PREFIX` / `COLOR` in the
   `projects` command.
9. **`src/pages/Events.jsx`** — add the division name to `divFilters`.
10. **`src/pages/About.jsx`** — add members to `TEAM` and a section to
    `TUNNEL_SECTIONS`, recalculating every slice.

Do them in this order and test after each step.

### 11.14 Deploy a change

```bash
git add .
git commit -m "Add Arduino Bootcamp event for November 2026"
git push
```

If your host is connected to the GitHub repository, that is the entire deploy —
it builds and publishes automatically in one to two minutes. Section 13 covers
the details and how to set it up from scratch.

---

## 12. Images and assets

### Where files go

Everything visitor-facing lives in `public/uploads/`. Vite copies `public/`
verbatim into the build without processing, so a file at
`public/uploads/photo.webp` is served at `/uploads/photo.webp`.

**Reference it as `/uploads/photo.webp`** — with the leading slash, without
`public/`. Getting this wrong is the most common image mistake.

```jsx
<img src="/uploads/logo.png" alt="URSU Technology" />   // ✅
<img src="/public/uploads/logo.png" />                  // ❌ 404
<img src="uploads/logo.png" />                          // ❌ breaks on nested routes
```

### Format and size

Current assets are `.webp` apart from `logo.png` and `bot.jpg`. **Use WebP for
photos.** It is typically 25–35% smaller than JPEG at the same visual quality and
is supported by every browser in use today.

Guidelines:

- **Photos** (gallery, portfolio): WebP, longest edge about 1600 px, under
  ~300 KB.
- **Logo:** PNG, because it needs transparency.
- Convert with [squoosh.app](https://squoosh.app) in the browser, or
  `cwebp -q 82 input.jpg -o output.webp` on the command line.

There are no build-time image optimisations and no responsive `srcset`, so the
file you commit is exactly what visitors download. Oversized images are the most
likely cause of a slow site.

### Alt text

Every `<img>` in the project has an `alt` attribute, and new ones must too. It is
what screen-reader users hear and what shows if an image fails to load. Describe
the content (`alt="Members assembling a line-follower robot"`), not the file
(`alt="IMG_2043"`).

### Naming

Lowercase, no spaces, hyphens between words: `3dprintworkshop.webp`,
`linefollower.webp`. Spaces in filenames require URL-encoding and cause
hard-to-debug 404s.

---

## 13. Deployment

### How it works now

The repository contains `vercel.json`, so the site is configured for **Vercel**.

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Why this file is essential.** The site is a single-page application: only
`index.html` exists as a real file. If a visitor opens `https://site.com/about`
directly, or refreshes while on that page, the server looks for a file at
`/about`, finds nothing, and returns 404. This rewrite tells the host to answer
*every* path with `index.html`, after which React Router reads the URL and shows
the right page.

**If you ever move hosts, you must reproduce this rule**, or every URL except the
home page will 404 on refresh. The equivalents:

- **Netlify** — create `public/_redirects` containing `/* /index.html 200`
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` after building
- **Cloudflare Pages** — works out of the box for SPAs
- **Apache** — a `.htaccess` with `FallbackResource /index.html`
- **nginx** — `try_files $uri $uri/ /index.html;`

### The deploy flow

1. You push to the `main` branch on GitHub.
2. Vercel detects the push.
3. It runs `npm install` then `npm run build`.
4. It publishes the contents of `dist/` to the CDN.
5. The live site updates, usually within one to two minutes.

You never build or upload manually.

### Connecting a host from scratch

If you need to set this up again, for example under a new Vercel account:

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account that owns
   the repository.
2. **Add New → Project**, and pick `utech-website`.
3. Vercel auto-detects Vite. Confirm: framework **Vite**, build command
   `npm run build`, output directory `dist`.
4. **Deploy.** You get a `*.vercel.app` URL immediately.
5. Optionally attach a custom domain under **Settings → Domains**.

No environment variables are needed — there are no secrets in this project.

### Handing over access

Part of the handover is access, not just code. Make sure the incoming maintainers
get:

- **GitHub** — ownership or admin on the `utech-website` repository, or a fork
  under a community-owned account.
- **Vercel** (or whichever host) — access to the project and the domain.
- **The Google Form** — editor access to the sign-up form, and to the responses
  spreadsheet.
- **Instagram** `@ursutech` — login credentials.
- **The domain registrar**, if the club owns a custom domain.

A site nobody can deploy is a site nobody can maintain. Consider creating a
shared club account for each service rather than tying them to one student's
personal account.

### Rolling back a bad deploy

On Vercel, open **Deployments**, find the last good build, and choose **Promote
to Production**. It is instant and does not require a git change.

In git, to undo a specific commit:

```bash
git revert <commit-hash>
git push
```

`git revert` creates a new commit that undoes the old one, which is safe on a
shared branch. Avoid `git reset --hard` plus a force-push on `main` — it rewrites
history others may have pulled.

---

## 14. Known issues, duplication, and technical debt

An honest inventory. None of this breaks the site; all of it will bite you
eventually. Roughly ordered by how likely it is to cause a real problem.

### High priority

**1. Member counts are duplicated across seven files.** `62`, `31`, `24`, and
`22` appear in `Hero.jsx`, `DivisionsShowcase.jsx`, `Terminal.jsx`, all three
division pages, `About.jsx` (three separate places), and `Join.jsx` (three
places). Updating after a recruitment drive means finding every one. Guaranteed
to drift. Fix: section 15.1.

**2. The terminal `events` command is stale and hard-coded.** It still prints
"Spring Hackathon 2026", "AI & Machine Learning Workshop", "Industry Night —
Summer Edition", and "End-of-Year Showcase & Social". None are in
`data/events.js`. A visitor who types `events` in the terminal and then visits
`/events` sees two different event lists. The `projects` command already reads
live data, so the pattern to copy exists in the same file. Fix: section 15.2.

**3. `TUNNEL_SECTIONS` slices `TEAM` by hard-coded index.** Adding a member
without adjusting the slice boundaries silently files people under the wrong
division. There is no error, just wrong output. Fix: section 15.3.

**4. Division page hero stats contradict the real data.** Metaverse claims 6
projects (actual: 2), Robotics 9 (actual: 1), Printing 16 (actual: 1). The home
page shows the real counts, so the site disagrees with itself. Fix: section 11.8.

**5. `googleFormUrl` is empty.** Setting `isOpen: true` without also setting the
URL produces a prominent button that does nothing. Worth adding a guard that
falls back to the Instagram link when the URL is blank.

### Medium priority

**6. `MONTH_INDEX` is declared twice**, identically, in `data/events.js` and
`Events.jsx`. Export it from the data file and import it.

**7. Dead code.**

- `Events.jsx` computes `past` and never renders it; `r1` and `r2` from
  `useReveal` are likewise unused.
- `events.css` keeps `.past-section`, `.past-grid`, and `.past-card` for a
  removed section.
- `join.css` keeps `.div-chooser`, `.div-choice*`, `.form-grid`, and
  `.join-form-*` for a form that no longer exists.
- `about.css` keeps `.team-grid` / `.team-card` / `.team-avatar` from the grid
  layout that the 3-D tunnel replaced.
- `divisions.css` has `.div-detail.open`, superseded by an inline `maxHeight`.
- `Nav.jsx` is passed `active="metaverse.html"` by the division pages. `Nav`
  accepts no props and ignores it — a leftover from when the site was static HTML.
- `Marquee`'s `color` prop is never passed by any caller.

**8. Inline styles used for fixed appearance.** `Events.jsx`, `Join.jsx`, and
`About.jsx` contain long `style={{ … }}` blocks for layout and typography that
are not data-driven. They should be CSS classes. Harder to scan, impossible to
reuse, and they cannot be overridden by a media query — which is why
`join.css` resorts to `!important` on `.faq-section-grid` and
`.join-form-section-grid` to beat inline grid columns at mobile widths.

**9. Fixed `max-height` expand ceilings.** `.faq-a.open` caps at 200 px and the
division detail panel at 440 px. Long content is silently clipped.

**10. `e.division === 'All'` makes the division filter permissive.** Every
club-wide event appears under every division filter. Arguably correct, but it
means filtering by "Metaverse" currently shows all five events, which can read as
a broken filter. Consider a visual note, or a stricter mode.

### Low priority

**11. No linter, no formatter, no tests.** There is no ESLint config, no
Prettier, and no test suite. Style consistency depends entirely on the
maintainer, and nothing catches a typo before deploy except the browser.

**12. Accessibility gaps.**

- The leadership tunnel is wheel- and touch-driven only. Keyboard users cannot
  traverse it, and its content is effectively unreachable without a mouse.
- `prefers-reduced-motion` handling is partial: the canvas animations and the
  tunnel still run at full motion.
- The division dropdown opens on hover with a click fallback, but does not
  support arrow-key navigation between items.
- The `data-active` pattern on division cards uses a `<div>` with `onClick`
  rather than a `<button>`, so those cards are not keyboard-operable.

**13. No SEO or social metadata.** `index.html` has a `<title>` and nothing else.
No `<meta name="description">`, no Open Graph tags, so a link shared to WhatsApp
or Instagram shows no preview image or description. Also no `sitemap.xml` or
`robots.txt`. Low effort, visible payoff.

**14. No 404 route.** An unknown URL renders a completely blank page.

**15. Instagram URL hard-coded in four files.** Should live in `config/signup.js`
next to `CONTACT_URL`.

**16. The footer year is hard-coded** as `© 2026`.

**17. A stray root-level `uploads/` folder** holds one pasted screenshot that is
never served. Safe to delete.

**18. `home.css` redefines shared classes.** `.section-inner`, `.section-label`,
and `.reveal` exist in both `shared.css` and `home.css`. Currently harmless
because the values match, but editing one and not the other creates a confusing
inconsistency that only appears on some pages.

---

## 15. Ideas for improvement

Ordered so the early items are genuinely achievable for someone new to the
codebase, and build the confidence needed for the later ones.

### 15.1 Create a single source of truth for community stats — *small, high value*

Create `src/data/community.js`:

```js
export const DIVISION_META = {
  metaverse: { name: 'Metaverse',   members: 31, color: '#5570f1', path: '/metaverse' },
  robotics:  { name: 'Robotics',    members: 24, color: '#22c97a', path: '/robotics'  },
  printing:  { name: '3D Printing', members: 22, color: '#f5a232', path: '/printing'  },
};

export const TOTAL_MEMBERS =
  Object.values(DIVISION_META).reduce((sum, d) => sum + d.members, 0);

export const EVENTS_PER_YEAR  = '13+';
export const YEARS_RUNNING    = '3+';
export const COMPETITION_WINS = '5+';
```

Then replace every hard-coded count with an import. `TOTAL_MEMBERS` is derived,
so it can never disagree with the per-division numbers. Next year's update
becomes three edits instead of a search across seven files. This is the single
best first contribution to this codebase.

### 15.2 Wire the terminal `events` command to real data — *small, high value*

In `Terminal.jsx`, replace the hard-coded array with:

```js
import { ALL_EVENTS, isUpcoming } from '../../data/events';

events: () => {
  const upcoming = ALL_EVENTS.filter(isUpcoming).slice(0, 5);
  if (upcoming.length === 0) return [
    { type:'dim', text:'No upcoming events scheduled.' }, { type:'spacer' },
  ];
  const COLOR = { Hackathon:'blue', Workshop:'green', Social:'green',
                  Networking:'amber', 'Build Night':'blue' };
  return [
    { type:'blue', text:'Upcoming Events' },
    { type:'spacer' },
    ...upcoming.map(e => ({
      type: COLOR[e.type] ?? 'out',
      text: `  ${e.month} ${String(e.day).padStart(2,'0')}   ${e.title.padEnd(32)}[${e.location}]`,
    })),
    { type:'spacer' },
  ];
},
```

Now the terminal can never contradict the events page. Copy the shape of the
existing `projects` command, which already does this correctly.

### 15.3 Make `TUNNEL_SECTIONS` derive from `TEAM` — *small, removes a whole class of bug*

Replace index slicing with filtering on the `div` field that `TEAM` already has:

```js
const TUNNEL_SECTIONS = [
  { title:'COMMUNITY', color:'#5570f1', members: TEAM.filter(m => m.div === 'Community')   },
  { title:'METAVERSE', color:'#5570f1', members: TEAM.filter(m => m.div === 'Metaverse')   },
  { title:'ROBOTICS',  color:'#22c97a', members: TEAM.filter(m => m.div === 'Robotics')    },
  { title:'3D PRINT',  color:'#f5a232', members: TEAM.filter(m => m.div === '3D Printing') },
];
```

Now adding a member is one edit in one place, order in `TEAM` no longer matters,
and the "wrong division" bug becomes impossible.

### 15.4 Add SEO and social metadata — *small, visible payoff*

In `index.html`:

```html
<meta name="description" content="URSU Technology (U-TECH) is the student-led technology community at SMA Regina Pacis Surakarta. Three divisions: Metaverse & Web Design, Robotics & Embedded Systems, 3D Printing." />
<meta property="og:title" content="URSU Technology — Student Tech Community" />
<meta property="og:description" content="Three divisions, 62 members, free membership. Build real things at SMA Regina Pacis Surakarta." />
<meta property="og:image" content="/uploads/logo.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

A link shared to WhatsApp or Instagram then shows a proper preview card. Add a
`public/robots.txt` and `public/sitemap.xml` too.

For per-page titles, either set `document.title` in a small `useEffect` per page,
or install `react-helmet-async`.

### 15.5 Add a 404 page — *small*

```jsx
<Route path="*" element={<NotFound />} />
```

A `NotFound` component with `<Nav />`, a short message, a link home, and
`<Footer />`. Twenty lines, and it stops mistyped URLs from showing a blank page.

### 15.6 Extract the shared division page layout — *medium*

The three division pages are roughly 200 lines each and about 80% identical. A
single `DivisionPage` component taking the differences as props, with each page
reduced to a data object plus the one unique section as `children`, would remove
around 400 duplicated lines. Fix a hero bug once instead of three times.

### 15.7 Move inline layout styles into CSS — *medium, ongoing*

Work through `Events.jsx`, `Join.jsx`, and `About.jsx`, converting fixed-appearance
`style={{ … }}` blocks into named classes in the matching stylesheet. Keep inline
styles only for data-derived values. This also lets you delete the `!important`
hacks in `join.css`.

Do it one section at a time, checking the page after each. Not glamorous, but it
makes every later change easier.

### 15.8 Complete the reduced-motion support — *medium, accessibility*

Read the preference in JavaScript and honour it in the animated components:

```jsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

In each canvas, draw one static frame and skip the `requestAnimationFrame` loop.
In the leadership tunnel, skip scroll capture entirely and render the flat roster
directly. Some visitors get motion sickness from scroll-jacking and parallax;
this is a real accessibility issue, not a nicety.

### 15.9 Make the leadership tunnel keyboard-accessible — *medium, accessibility*

Add arrow-key and Page Up/Down handling that moves `S.target`, make the container
focusable with `tabIndex={0}`, and offer a visible "Skip to full roster" button
that jumps straight to the flat list. Right now the leadership information is
unreachable without a pointing device.

### 15.10 Add ESLint and Prettier — *medium, prevents future problems*

```bash
npm install -D eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks prettier
```

Add `"lint": "eslint src"` to the scripts. The React Hooks plugin alone catches a
whole family of subtle bugs (missing effect dependencies, conditional hook calls).
Prettier ends all formatting debate. Worth doing before the codebase grows.

### 15.11 Move events into a CMS or spreadsheet — *large*

Right now updating an event requires git access and a deploy. If future pengurus
are less technical, that is a real barrier. Options, cheapest first:

- **Google Sheets as a data source.** Publish a sheet as CSV and fetch it at
  runtime. Free, and anyone can edit a spreadsheet. Cost: a network request, and
  the site breaks if the sheet is unpublished.
- **A headless CMS** (Sanity, Contentful, Strapi) with a proper editing UI and
  free tiers. More setup, much nicer to use.
- **Git-based CMS** (Decap CMS, formerly Netlify CMS). Gives a web editing
  interface that commits to the repository, so the data stays in git. Good middle
  ground for a club.

Do this only if editing events is genuinely a bottleneck. Committing a JS object
is simpler than any of the above if the maintainer is comfortable with git.

### 15.12 Other worthwhile additions

- **Bring back a past-events section.** `Events.jsx` already computes `past` and
  `events.css` still has the styles. Mostly just wiring.
- **Responsive images.** Generate 800 px / 1600 px variants and use `srcset` so
  phones do not download desktop-sized photos.
- **Lazy-load the canvases.** `React.lazy` plus `Suspense` on the hero canvases
  would cut initial bundle size.
- **Event detail pages.** `/events/:id` for events that need a full description,
  poster, or registration link.
- **A members-only resources page.** Tutorials, slide decks, printer guides.
- **Analytics.** Vercel Analytics or Plausible, to learn which pages actually
  convert to sign-ups.
- **`alt` text audit.** Several gallery images use the label as alt text, which
  describes the event rather than the picture.

---

## 16. Glossary

Terms used in this document and in the code.

| Term | Meaning |
|---|---|
| **Component** | A JavaScript function returning JSX. The building block of React. Named in `PascalCase`. |
| **JSX** | The HTML-like syntax inside JavaScript. `className` instead of `class`, `{}` to embed expressions. |
| **Props** | Inputs passed into a component, like HTML attributes: `<Marquee items={[...]} />`. |
| **State** | Data a component owns that can change. Changing it re-renders the component. Created with `useState`. |
| **Hook** | A function starting with `use` that adds behaviour to a component. `useState`, `useEffect`, `useRef`, plus our own `useReveal`. |
| **`useEffect`** | Runs code after render — attaching listeners, starting timers. Its return value is a cleanup function that runs on unmount. |
| **`useRef`** | A mutable box that survives re-renders without triggering one. Used for DOM references and for values read inside animation loops. |
| **`useMemo`** | Computes a value once and caches it until its dependencies change. Used for the tunnel scene construction. |
| **`useCallback`** | Like `useMemo` but for functions: keeps the function identity stable across renders. |
| **Render** | React running a component function to work out what the page should look like. |
| **Mount / unmount** | A component being added to, or removed from, the page. Navigating away unmounts a page. |
| **Cleanup function** | The function returned from `useEffect`. Removes listeners, cancels timers, stops animation loops. Skipping it causes memory leaks. |
| **SPA** | Single-page application. One HTML file; JavaScript swaps the content as you navigate. |
| **Route** | A URL-to-component mapping, declared in `App.jsx`. |
| **`<Link>`** | React Router's internal navigation element. Use instead of `<a>` for in-site links. |
| **CSS custom property** | A CSS variable: `--blue: #5570f1`, used as `var(--blue)`. Our design tokens. |
| **Design token** | A named design value (colour, font, radius) defined once and reused everywhere. |
| **`clamp()`** | CSS function for fluid sizing: `clamp(min, preferred, max)`. Removes the need for font-size media queries. |
| **`IntersectionObserver`** | Browser API that reports when an element enters the viewport. Powers `useReveal`. |
| **`requestAnimationFrame`** | Browser API that calls your function before the next repaint, about 60 times a second. Powers every animation here. |
| **Canvas 2D** | Drawing API for the `<canvas>` element. Used for all three hero illustrations. |
| **`position: sticky`** | CSS positioning that pins an element while its parent scrolls past. Drives the home hero. |
| **`perspective` / `preserve-3d`** | CSS 3-D properties that make `translate3d` read as real depth. Drive the leadership tunnel. |
| **Hot module replacement (HMR)** | The dev server swapping changed code into the running page without a reload. |
| **Bundle** | The single optimised JavaScript file (plus CSS) produced by `npm run build`. |
| **Rewrite** | A host rule that serves one file for many URLs. Ours sends every path to `index.html`. |
| **`public/`** | Folder copied verbatim into the build. Its contents are served from the site root. |
| **Hex alpha suffix** | Two extra hex digits appended to a colour for opacity: `#5570f1` + `55` = 33% opaque. Used throughout for tints and borders. |

---

## Closing notes for the next maintainers

A few things worth saying plainly.

**Start small.** Add an event. Change a member count. Swap a photo. Those three
tasks touch the data layer, the build, and the deploy, and they will teach you
the shape of the project faster than reading more documentation.

**The data layer is your friend.** `src/config/signup.js`, `src/data/events.js`,
and `src/data/projects.js` cover most of what anyone will ask you to change. If
you find yourself editing a component to change a fact about the club, ask
whether that fact belongs in the data layer instead.

**Run `npm run build` before you push** anything non-trivial. The dev server is
forgiving; the build is not, and it is better to find a mistake locally than in
production.

**Keep `PRODUCT.md` honest.** It records why the site looks the way it does. If
you redesign, update it so the *next* maintainer inherits reasoning and not just
CSS.

**Fix the duplication when you have an afternoon.** Sections 15.1 through 15.3
are small, self-contained, and remove three whole categories of bug. Whoever does
them makes life easier for everyone after.

**Write things down.** When you discover something surprising, add it to this
handbook. Documentation that is not updated becomes misleading, and misleading
documentation is worse than none.

Good luck. The site is in decent shape, it is genuinely small, and everything in
it is readable. Nothing here is magic.
