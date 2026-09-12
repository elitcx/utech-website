# U-TECH Website — Function & Component Reference (English)

> **Bahasa Indonesia:** [FUNCTIONS.id.md](FUNCTIONS.id.md)
> **Main handbook:** [HANDBOOK.en.md](HANDBOOK.en.md)

Every function and every component in `src/`, in file order, with its signature,
what it returns, what it does, who calls it, and anything that will trip you up.

Nothing is skipped — that includes tiny one-line arrow functions nested inside
effects, because those are exactly the ones that cause confusing bugs.

**How to read an entry:**

- **Kind** — Component, Hook, Helper, Event handler, Animation loop, or Factory.
- **Called by** — who invokes it. "React" means you never call it yourself;
  React does, during render. "Browser" means the browser calls it when an event
  fires.
- **Returns** — what comes back. Components return JSX. Effects return a cleanup
  function or nothing.

A note on the word *component*: a component is just a function that returns JSX
and whose name starts with a capital letter. React calls it for you. Everything
else in this document is an ordinary function.

---

## Contents

- [Summary index](#summary-index)
- [1. `src/main.jsx`](#1-srcmainjsx)
- [2. `src/App.jsx`](#2-srcappjsx)
- [3. `src/hooks/useReveal.js`](#3-srchooksuserevealjs)
- [4. `src/config/signup.js`](#4-srcconfigsignupjs)
- [5. `src/data/events.js`](#5-srcdataeventsjs)
- [6. `src/data/projects.js`](#6-srcdataprojectsjs)
- [7. `src/components/Nav.jsx`](#7-srccomponentsnavjsx)
- [8. `src/components/Footer.jsx`](#8-srccomponentsfooterjsx)
- [9. `src/components/Marquee.jsx`](#9-srccomponentsmarqueejsx)
- [10. `src/pages/Home/index.jsx`](#10-srcpageshomeindexjsx)
- [11. `src/pages/Home/Hero.jsx`](#11-srcpageshomeherojsx)
- [12. `src/pages/Home/DivisionsShowcase.jsx`](#12-srcpageshomedivisionsshowcasejsx)
- [13. `src/pages/Home/Terminal.jsx`](#13-srcpageshometerminaljsx)
- [14. `src/pages/Home/HomeAbout.jsx`](#14-srcpageshomehomeaboutjsx)
- [15. `src/pages/Home/Pillars.jsx`](#15-srcpageshomepillarsjsx)
- [16. `src/pages/Home/HomeEvents.jsx`](#16-srcpageshomehomeeventsjsx)
- [17. `src/pages/Home/CTA.jsx`](#17-srcpageshomectajsx)
- [18. `src/pages/About.jsx`](#18-srcpagesaboutjsx)
- [19. `src/pages/Events.jsx`](#19-srcpageseventsjsx)
- [20. `src/pages/Join.jsx`](#20-srcpagesjoinjsx)
- [21. `src/pages/divisions/Metaverse.jsx`](#21-srcpagesdivisionsmetaversejsx)
- [22. `src/pages/divisions/Robotics.jsx`](#22-srcpagesdivisionsroboticsjsx)
- [23. `src/pages/divisions/Printing.jsx`](#23-srcpagesdivisionsprintingjsx)
- [24. React functions used](#24-react-functions-used)
- [25. Browser APIs used](#25-browser-apis-used)
- [26. JavaScript built-ins used](#26-javascript-built-ins-used)
- [27. Patterns that repeat](#27-patterns-that-repeat)

---

## Summary index

**Components — 26 total.** 7 are pages, 3 are shared, 8 are home-page sections,
6 are canvas illustrations, 4 are small helpers inside a page.

| Component | File | Kind |
|---|---|---|
| `App` | `App.jsx:17` | Root — holds the router |
| `ScrollToTop` | `App.jsx:11` | Invisible side-effect component |
| `Nav` | `components/Nav.jsx:17` | Shared |
| `Footer` | `components/Footer.jsx:3` | Shared |
| `Marquee` | `components/Marquee.jsx:7` | Shared |
| `Home` | `pages/Home/index.jsx:13` | Page |
| `Hero` | `pages/Home/Hero.jsx:328` | Home section |
| `MetaverseCanvas` | `pages/Home/Hero.jsx:6` | Canvas |
| `RoboticsCanvas` | `pages/Home/Hero.jsx:108` | Canvas |
| `PrintingCanvas` | `pages/Home/Hero.jsx:202` | Canvas |
| `DivisionsShowcase` | `pages/Home/DivisionsShowcase.jsx:70` | Home section |
| `Terminal` | `pages/Home/Terminal.jsx:118` | Home section |
| `HomeAbout` | `pages/Home/HomeAbout.jsx:3` | Home section |
| `Pillars` | `pages/Home/Pillars.jsx:85` | Home section |
| `HomeEvents` | `pages/Home/HomeEvents.jsx:19` | Home section |
| `CTA` | `pages/Home/CTA.jsx:4` | Home section |
| `About` | `pages/About.jsx:379` | Page |
| `Lightbox` | `pages/About.jsx:66` | Helper component |
| `GalleryItem` | `pages/About.jsx:90` | Helper component |
| `PortfolioCard` | `pages/About.jsx:114` | Helper component |
| `LeadershipTunnel` | `pages/About.jsx:149` | Helper component (large) |
| `Events` | `pages/Events.jsx:11` | Page |
| `Join` | `pages/Join.jsx:84` | Page |
| `SignupPanel` | `pages/Join.jsx:35` | Helper component |
| `Metaverse` | `pages/divisions/Metaverse.jsx:69` | Page |
| `HeroCanvas` | `pages/divisions/Metaverse.jsx:10` | Canvas |
| `Robotics` | `pages/divisions/Robotics.jsx:90` | Page |
| `ArduinoCanvas` | `pages/divisions/Robotics.jsx:10` | Canvas |
| `LiveSensors` | `pages/divisions/Robotics.jsx:48` | Helper component |
| `Printing` | `pages/divisions/Printing.jsx:82` | Page |
| `PrinterCanvas` | `pages/divisions/Printing.jsx:10` | Canvas |

**Named non-component functions.**

| Function | File | Purpose |
|---|---|---|
| `useReveal` | `hooks/useReveal.js:3` | Custom hook — fade-in on scroll |
| `isUpcoming` | `data/events.js:31` | Is this event today or later? |
| `getJoinOutput` | `Home/Terminal.jsx:85` | Builds the `join` command's output |
| `typeTagStyle` | `Events.jsx:34` | Derives three colours from one hex |
| `rot` | `Hero.jsx:29`, `Metaverse.jsx:22` | 3-D rotation on X, Y, Z |
| `proj` | `Hero.jsx:36`, `Metaverse.jsx:23` | 3-D to 2-D perspective projection |
| `lerp` | `Hero.jsx:133`, `Robotics.jsx:20` | Linear interpolation |
| `getPt` | `Hero.jsx:134`, `Robotics.jsx:21` | Point along a multi-segment path |
| `getBedY` | `Hero.jsx:220`, `Printing.jsx:18` | Y position of the print bed |
| `modelW` | `Hero.jsx:221`, `Printing.jsx:19` | Half-width of the printed object |
| `getAlpha` | `About.jsx:193` | Opacity from tunnel depth |
| `draw` | 6 canvas components | One animation frame |
| `tick` | `About.jsx:224` | Tunnel animation frame |
| `runCmd` | `Terminal.jsx:133` | Executes a terminal command |
| `renderLine` | `Terminal.jsx:193` | Turns a line object into JSX |
| `injectCmd` | `Terminal.jsx:187` | Types and runs a command for the user |
| `scrollBody` | `Terminal.jsx:129` | Scrolls terminal output to the bottom |

---

## 1. `src/main.jsx`

**No functions declared.** This is the entry point — it imports the two global
stylesheets and mounts the app:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
```

`createRoot` and `render` are React functions, documented in section 24.

---

## 2. `src/App.jsx`

### `ScrollToTop()` — Component

- **File:** `src/App.jsx:11`
- **Props:** none
- **Returns:** `null` — it renders nothing
- **Called by:** React, on every render of `App`

```jsx
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
```

Reads the current path from the router, and whenever that path changes, scrolls
the window to the top.

This is a **side-effect-only component**: a component that exists purely to run a
hook, not to draw anything. Returning `null` is legal and normal. The alternative
would be duplicating this `useEffect` in all seven pages.

**Why it is needed:** in a single-page app, navigation does not reset scroll
position. Without this, clicking a footer link from halfway down the home page
would land you halfway down the new page.

**Gotcha:** because it scrolls on *every* path change, it would also fight any
future "restore scroll position on back button" feature. If you add one, this
component is the thing to change.

### `App()` — Component

- **File:** `src/App.jsx:17`
- **Props:** none
- **Returns:** the router tree
- **Called by:** `main.jsx`, once

Wraps everything in `BrowserRouter`, mounts `ScrollToTop`, and declares the seven
routes. It is the whole routing configuration of the site.

**Gotcha:** there is no `<Route path="*">`, so an unknown URL renders nothing at
all — a blank white page with no nav and no footer.

---

## 3. `src/hooks/useReveal.js`

### `useReveal()` — Custom hook

- **File:** `src/hooks/useReveal.js:3`
- **Parameters:** none
- **Returns:** a React ref object, to attach to one DOM element
- **Called by:** 20+ components, at the top of their function body

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

Creates a ref, watches the element it ends up pointing at, and adds the CSS class
`visible` the first time 12% of that element scrolls into view. The class is what
triggers the fade-and-rise animation defined in `shared.css`.

**Usage is always two parts:**

```jsx
const ref = useReveal();
<div className="reveal" ref={ref}>…</div>
```

Miss the `className="reveal"` and nothing happens. Miss the `ref` and the content
stays permanently invisible, because `.reveal` sets `opacity: 0`.

**Nested function — the observer callback.** `([entry]) => { … }` is destructuring
the first element out of the array the browser passes in. One observer watching
one element always gets an array of one.

**Why it returns early on `if (!el) return;`** — defensive. If the ref was never
attached to anything, `ref.current` is `null` and `observe(null)` would throw.

**Why `obs.disconnect()`** — this is the cleanup function. It runs when the
component unmounts. Without it, every page visit would leave a live observer
behind.

**Gotcha:** one hook per element. A section with four independently animating
blocks needs four calls, which is why you see
`const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();`
in `Join.jsx`. Reusing one ref on two elements means only the last one animates.

---

## 4. `src/config/signup.js`

**No functions.** Two exported constants: `SIGNUP_CONFIG` (an object with
`isOpen`, `googleFormUrl`, `nextIntakeDate`, `showNextIntakeDate`) and
`CONTACT_URL` (a string).

Read by `Join.jsx`, `Terminal.jsx`, and `Footer.jsx`. See the handbook, section
7.1.

---

## 5. `src/data/events.js`

### `isUpcoming(e)` — Helper

- **File:** `src/data/events.js:31`
- **Parameters:** `e` — one event object from `ALL_EVENTS`
- **Returns:** `boolean` — `true` if the event is today or in the future
- **Called by:** `Events.jsx` (twice), `HomeEvents.jsx`

```js
const MONTH_INDEX = { JAN:0, FEB:1, /* … */ DEC:11 };

export const isUpcoming = e =>
  new Date(e.year, MONTH_INDEX[e.month], Number(e.day)) >=
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
```

Builds a `Date` from the event's `year`, `month`, and `day` fields, then compares
it to today.

**Two details that matter.** `MONTH_INDEX` converts `'OCT'` to `9`, because
JavaScript months are zero-based. And the right-hand side rebuilds today's date
from its year, month, and day parts, which **discards the time of day** — the
comparison is against midnight this morning, not against right now. That is
deliberate: an event happening at 2 pm today still counts as upcoming at 4 pm.

**This function is why you never mark an event as "past".** The day after an
event, it drops out of every list automatically.

**Gotcha:** a typo in `month` (`'SEPT'` instead of `'SEP'`) makes
`MONTH_INDEX[e.month]` return `undefined`, which makes the `Date` invalid, which
makes the comparison `false`. The event silently disappears with no error. If an
event you added is not showing, check the month spelling first.

---

## 6. `src/data/projects.js`

**No functions.** Two exported constants: `STATUS_COLORS` (status name → colour)
and `DIVISION_PROJECTS` (division key → array of project objects).

Read by `Hero.jsx`, `DivisionsShowcase.jsx`, `Terminal.jsx`, and all three
division pages.

---

## 7. `src/components/Nav.jsx`

### `Nav()` — Component

- **File:** `src/components/Nav.jsx:17`
- **Props:** none accepted
- **Returns:** the fixed top bar plus the mobile overlay
- **Called by:** every page, manually

Holds three pieces of state: `scrolled`, `menuOpen`, `divOpen`. Renders the
desktop link row with a hover dropdown for divisions, a hamburger button, and a
full-screen mobile overlay.

**Gotcha — a dead prop.** The three division pages call it as
`<Nav active="metaverse.html" />`. `Nav` declares no parameters, so this prop is
silently ignored. It is a leftover from when the site was static HTML files.
Harmless, but do not add more to it expecting them to work.

### `fn()` — Event handler (scroll)

- **File:** `src/components/Nav.jsx:26`
- **Returns:** nothing
- **Called by:** the browser, on every scroll event

```js
const fn = () => setScrolled(window.scrollY > 30);
```

Sets `scrolled` to `true` once the page has scrolled more than 30 pixels, which
adds the `scrolled` class and shrinks the bar from 64 px to 56 px.

It is registered and removed inside a `useEffect` with an empty dependency array,
so it attaches once on mount and detaches on unmount.

**Note on the name.** `fn` is a poor name — it says nothing. If you touch this
code, rename it to `onScroll` to match the convention used everywhere else in the
project.

**Note on efficiency.** It calls `setScrolled` on every single scroll event, even
when the value does not change. React bails out of re-rendering when the state
value is identical, so this is cheap in practice, but passing a comparison would
be cleaner.

### `close()` — Event handler

- **File:** `src/components/Nav.jsx:37`
- **Returns:** nothing
- **Called by:** the mobile close button, and every mobile nav link

```js
const close = () => { setMenuOpen(false); setDivOpen(false); };
```

Closes both menus at once. Used for the ✕ button and attached to each mobile link
via `onClick={close}` so that tapping a link dismisses the overlay as it
navigates.

### The second `useEffect` — auto-close on navigation

- **File:** `src/components/Nav.jsx:32`

```js
useEffect(() => { setMenuOpen(false); setDivOpen(false); }, [location.pathname]);
```

Not a named function, but worth listing because its absence would be a visible
bug. It watches the path and closes both menus whenever it changes. Without it,
the mobile overlay would stay open on top of the page you just navigated to.

### Inline handlers on the dropdown

Four small arrow functions are written directly in the JSX:

| Handler | Line | Does |
|---|---|---|
| `onMouseEnter={() => setDivOpen(true)}` | 61 | Opens the dropdown on hover |
| `onMouseLeave={() => setDivOpen(false)}` | 62 | Closes it when the pointer leaves |
| `onClick={() => setDivOpen(v => !v)}` | 69 | Toggles it — the touch-device fallback |
| `onKeyDown={e => e.key === 'Escape' && setDivOpen(false)}` | 70 | Closes it on Escape |

The toggle uses the **updater form** `setDivOpen(v => !v)` rather than
`setDivOpen(!divOpen)`. The updater form receives the current value as an
argument, so it is always correct even if several updates queue up in one tick.
Prefer it whenever the new state depends on the old one.

Two more inline handlers set the dropdown item hover background directly:

```jsx
onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
```

This writes to the DOM element's inline style rather than using a CSS `:hover`
rule. It works, but it is the odd one out in this codebase — a `:hover` rule in
`shared.css` would be the consistent choice.

---

## 8. `src/components/Footer.jsx`

### `Footer()` — Component

- **File:** `src/components/Footer.jsx:3`
- **Props:** none
- **Returns:** the footer bar
- **Called by:** every page, manually

The only non-static part is `href={CONTACT_URL}`, imported from the config. Logo,
Instagram and GitHub URLs, the year, and the author credit are all literal text.

**Gotcha:** `© 2026` is hard-coded. Replace with `{new Date().getFullYear()}` if
you would rather not remember it each January.

---

## 9. `src/components/Marquee.jsx`

### `Marquee({ items, color })` — Component

- **File:** `src/components/Marquee.jsx:7`
- **Props:**
  - `items` — array of strings. Defaults to `DEFAULT_ITEMS`, a generic tech
    keyword list.
  - `color` — `'green'`, `'amber'`, or omitted. Tints the separator dots.
- **Returns:** the scrolling ticker strip
- **Called by:** `Home/index.jsx`, `Join.jsx`, `About.jsx`, and all three
  division pages

```jsx
export default function Marquee({ items = DEFAULT_ITEMS, color }) {
  const doubled = [...items, ...items];
  …
}
```

**The one line that matters** is `const doubled = [...items, ...items];`. The
component renders the list twice, and the CSS animates the track to exactly
`-50%` of its own width. At the end of the loop, copy two sits precisely where
copy one began, so the reset to `0` is invisible. That is the entire trick behind
the seamless infinite scroll.

Break either half — remove the doubling, or change `-50%` in `shared.css` — and
you get a visible jump once per cycle.

**Default parameter syntax.** `{ items = DEFAULT_ITEMS, color }` destructures the
props object and supplies a fallback for `items` if the caller omits it. This is
plain JavaScript, not a React feature.

**Gotcha:** `color` is accepted but no caller ever passes it, so every dot on the
site is blue. Either start using it or delete the parameter.

---

## 10. `src/pages/Home/index.jsx`

### `Home()` — Component (page)

- **File:** `src/pages/Home/index.jsx:13`
- **Props:** none
- **Returns:** the eight home sections wrapped in a fragment
- **Called by:** the router, for path `/`

Pure composition — no state, no effects, no logic. It imports `home.css` and
renders `Nav`, `Hero`, `Marquee`, `DivisionsShowcase`, `Terminal`, `HomeAbout`,
`Pillars`, `HomeEvents`, `CTA`, `Footer`, in that order.

To reorder the home page, move a line here. To remove a section, delete a line.

---

## 11. `src/pages/Home/Hero.jsx`

The biggest file in the project — four components and nine nested functions.

### `MetaverseCanvas({ active })` — Component (canvas)

- **File:** `src/pages/Home/Hero.jsx:6`
- **Props:** `active` — boolean. When `false`, the animation loop pauses.
- **Returns:** `<canvas width={580} height={580} />`
- **Called by:** `Hero`

Draws the blue scene: a rotating wireframe cube, a vanishing-point grid floor, 70
drifting particles, an orbiting elliptical ring, and a small orbiting octahedron.
Follows the mouse.

**Four refs, each with a distinct job:**

| Ref | Holds |
|---|---|
| `canvasRef` | the DOM `<canvas>` element |
| `mouseRef` | `{x, y}` cursor position inside the canvas |
| `rafRef` | the current animation frame id, so it can be cancelled |
| `activeRef` | a copy of the `active` prop, readable from inside `draw` |
| `restartRef` | a function that restarts the loop if it has stopped |

**Why `activeRef` exists, and why this is the single most important idea in the
file.** The `draw` function is created once, inside an effect with `[]`
dependencies. It captures the values that existed at that moment — a JavaScript
**closure**. If `draw` read the `active` prop directly, it would read the value
from the first render forever. Copying the prop into a ref gives `draw` a box it
can peek into for the current value:

```jsx
useEffect(() => {
  activeRef.current = active;
  if (active && restartRef.current) restartRef.current();
}, [active]);
```

This is the standard fix for "my animation loop does not see prop changes".

#### `rot(p, rx, ry, rz)` — Helper (3-D math)

- **File:** `src/pages/Home/Hero.jsx:29`
- **Parameters:** `p` — a point as `[x, y, z]`; `rx`, `ry`, `rz` — rotation
  angles in radians around each axis
- **Returns:** a new `[x, y, z]` array
- **Called by:** `draw`, once per vertex per frame

Applies three rotation matrices in sequence: around X, then Y, then Z. Written
out longhand with `Math.cos` and `Math.sin` rather than imported from a library.
Ten lines replacing a 600 KB dependency.

Order matters — rotations do not commute. Changing the order changes the
animation.

#### `proj([x, y, z])` — Helper (3-D math)

- **File:** `src/pages/Home/Hero.jsx:36`
- **Parameters:** one point as `[x, y, z]`, destructured in the parameter list
- **Returns:** `[screenX, screenY, scale]`
- **Called by:** `draw`, once per vertex per frame

```js
const proj = ([x,y,z]) => { const f = 500/(500+z+250), cx = W/2, cy = H/2;
                            return [cx+x*f, cy+y*f, f]; };
```

Perspective projection: turns a 3-D point into a 2-D screen position. `f` is the
foreshortening factor — larger `z` (further away) makes `f` smaller, so the point
moves toward the centre and shrinks.

**The third return value is the clever part.** `f` is handed back alongside the
coordinates and reused as an opacity and size multiplier:

```js
ctx.fillStyle = `rgba(85,112,241,${pd})`;   // further away = more transparent
ctx.arc(px, py, 3*pd, …)                     // further away = smaller dot
```

One number gives you position, depth fade, and scale. That is why nearer edges of
the cube look brighter and thicker than far ones.

#### `draw()` — Animation loop

- **File:** `src/pages/Home/Hero.jsx:37`
- **Returns:** nothing
- **Called by:** itself, via `requestAnimationFrame`, about 60 times a second

Renders one frame. The sequence is always the same: clear the canvas, then draw
back-to-front — grid floor, particles, centre glow, cube edges, cube vertices,
orbiting ring, orbiting octahedron. Canvas 2-D has no z-ordering, so **draw order
is layer order**.

It ends with the self-scheduling tail:

```js
t++;
if (activeRef.current) { rafRef.current = requestAnimationFrame(draw); }
else                   { rafRef.current = null; }
```

`t` is the frame counter that drives every animation — rotation angles, ring
position, LED blinking are all functions of `t`. Setting `rafRef.current = null`
when inactive is what lets `restartRef` detect a stopped loop.

#### `onMouse(e)` — Event handler

- **File:** `src/pages/Home/Hero.jsx:98`
- **Parameters:** `e` — a mousemove event
- **Returns:** nothing
- **Called by:** the browser, on canvas mousemove

```js
const onMouse = e => {
  const r = canvas.getBoundingClientRect();
  mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
};
```

Converts page coordinates into canvas-local coordinates by subtracting the
canvas's position on screen. `e.clientX` is relative to the viewport;
`getBoundingClientRect()` tells you where the canvas sits in the viewport; the
difference is the position inside the canvas.

It writes to a **ref, not state**. Mousemove fires constantly — using state here
would re-render the component hundreds of times a second. The ref lets `draw`
read the latest position on its own schedule.

#### `restartRef.current` — Helper

- **File:** `src/pages/Home/Hero.jsx:102`

```js
restartRef.current = () => { if (!rafRef.current) draw(); };
```

Restarts the loop, but only if it is actually stopped. The `if` guard prevents
two concurrent loops, which would double the animation speed and the CPU cost.

### `RoboticsCanvas({ active })` — Component (canvas)

- **File:** `src/pages/Home/Hero.jsx:108`
- **Props:** `active` — boolean
- **Returns:** `<canvas width={580} height={580} />`
- **Called by:** `Hero`

Draws the green scene: a stylised Arduino Uno with board outline, grid texture,
mounting holes, PCB traces carrying animated current dots, USB-B connector,
ATmega328P chip with pin rows, 16 MHz crystal, voltage regulator, barrel jack,
14 digital and 6 analog headers, four blinking LEDs, and a fake serial monitor.

Same ref structure and same pausing pattern as `MetaverseCanvas`.

#### `lerp(a, b, t2)` — Helper (math)

- **File:** `src/pages/Home/Hero.jsx:133`
- **Parameters:** `a`, `b` — two numbers; `t2` — a fraction from 0 to 1
- **Returns:** a number between `a` and `b`
- **Called by:** `getPt`

```js
const lerp = (a, b, t2) => a + (b - a) * t2;
```

**Linear interpolation** — the most reused function in all of computer graphics.
`t2 = 0` returns `a`, `t2 = 1` returns `b`, `t2 = 0.5` returns the midpoint. Used
here to slide a dot smoothly between two trace corners.

The parameter is named `t2` rather than `t` to avoid shadowing the outer `t`
frame counter.

#### `getPt(pts, p)` — Helper (math)

- **File:** `src/pages/Home/Hero.jsx:134`
- **Parameters:** `pts` — array of `[x, y]` corner points; `p` — progress along
  the whole path, 0 to 1
- **Returns:** `[x, y]` — a point on the path
- **Called by:** `draw`, once per trace per frame

```js
const getPt = (pts, p) => {
  const segs = pts.length - 1,
        seg  = Math.min(Math.floor(p * segs), segs - 1),
        loc  = (p * segs) - seg;
  return [lerp(pts[seg][0], pts[seg+1][0], loc),
          lerp(pts[seg][1], pts[seg+1][1], loc)];
};
```

Converts "40% of the way along this whole zigzag path" into an actual coordinate.
It works out which segment you are in (`seg`), how far along that segment you are
(`loc`), then interpolates between that segment's two endpoints.

`Math.min(…, segs - 1)` clamps the segment index so that `p === 1` does not index
past the end of the array.

This is what makes the current dots appear to flow along the circuit traces.

#### `draw()` — Animation loop

- **File:** `src/pages/Home/Hero.jsx:142`

One frame of the Arduino scene. Two details worth knowing:

```js
currents[ti] = (currents[ti] + 0.004) % 1;
```

Each trace has its own progress value, advanced by 0.004 per frame, and `% 1`
wraps it back to 0 — so dots loop forever. Because they start at
`Math.random()`, they are out of phase with each other.

```js
const blink = 0.55 + Math.sin(t * 0.06 + led.phase) * 0.45;
ctx.globalAlpha = blink;  /* draw */  ctx.globalAlpha = 1;
```

LED brightness is a sine wave, each LED offset by its own `phase` so they pulse
independently. Note that `globalAlpha` is **always reset to 1** afterwards —
canvas state is global, so forgetting to reset it would make everything drawn
later semi-transparent. That class of bug is the most common one in canvas code.

### `PrintingCanvas({ active })` — Component (canvas)

- **File:** `src/pages/Home/Hero.jsx:202`
- **Props:** `active` — boolean
- **Returns:** `<canvas width={580} height={580} />`
- **Called by:** `Hero`

Draws the amber scene: printer frame, gantry rod, a descending heated bed, a
print head scanning left and right, a filament extrusion beam, a spinning fan,
the object growing layer by layer, and HUD tiles for nozzle temperature, bed
temperature, and progress.

**This is the only canvas with React state:**

```jsx
const [layer, setLayer] = useState(0);
```

`setLayer(curLayer)` is called once per completed layer, not every frame.

**Gotcha worth knowing:** `layer` is set but never read — it is not rendered
anywhere. The layer number shown on screen comes from the local `curLayer`
variable inside `draw`. So this state, and the re-render it causes about once a
second, currently achieve nothing. It is harmless, but if you wanted to show the
layer count in HTML outside the canvas, `layer` is already wired up for it.

#### `getBedY(l)` — Helper

- **File:** `src/pages/Home/Hero.jsx:220`
- **Parameters:** `l` — layer number, 0 to `TOTAL` (40)
- **Returns:** a Y pixel coordinate
- **Called by:** `draw`

```js
const getBedY = (l) => FY + FH - 40 - l * (FH - 80) / TOTAL;
```

Maps a layer number to the bed's vertical position. Higher layer means a smaller
Y, so the bed moves **up** the screen as the print progresses. Real FDM printers
lower the bed, but moving it up keeps the growing object centred in frame.

#### `modelW(l)` — Helper (shape profile)

- **File:** `src/pages/Home/Hero.jsx:221`
- **Parameters:** `l` — layer number
- **Returns:** a number — half the object's width at that layer
- **Called by:** `draw`, for every layer drawn, every frame

```js
const modelW = (l) => {
  const n = l / TOTAL;                         // normalise to 0…1
  if (n < 0.1)  return 4 + n * 60;             // flared base
  if (n < 0.5)  return 10;                     // straight shaft
  if (n < 0.7)  return 10 + (n - 0.5) * 30;    // bulge outward
  if (n < 0.85) return 16 - (n - 0.7) * 46;    // taper in sharply
  return 9;                                    // narrow neck
};
```

**This single function defines the silhouette of the printed object** — something
vase-like with a flared base, a bulge, and a narrow neck. Change the numbers and
you print a different shape. It is the cheapest thing in the file to experiment
with.

The `n = l / TOTAL` normalisation means the profile is described in fractions of
total height, so it keeps its proportions if you change `TOTAL`.

#### `draw()` — Animation loop

- **File:** `src/pages/Home/Hero.jsx:222`

The layer-advance logic at the end is the interesting part:

```js
headX += 0.016 * scanDir;
if (Math.abs(headX) > 1) {
  scanDir *= -1;                                        // bounce off the edge
  if (headX > 0) {                                      // only on the right edge
    curLayer = Math.min(curLayer + 1, TOTAL - 1);
    setLayer(curLayer);
  }
}
```

`headX` runs from −1 to +1 as a normalised position. When it exceeds either
limit, `scanDir` flips sign and the head reverses. A layer is added only on the
right-hand bounce, so one layer equals one full there-and-back sweep.
`Math.min(…, TOTAL - 1)` stops the print at the top instead of growing forever.

### `Hero()` — Component (home section)

- **File:** `src/pages/Home/Hero.jsx:328`
- **Props:** none
- **Returns:** the 300vh scroll wrapper containing the sticky hero
- **Called by:** `Home`

State: `activeIdx` (0–2), `scrollPct` (0–1), `textState` (`'shown'`, `'exiting'`,
`'entering'`). One ref: `prevIdx`.

Reads its content from `DIV_DATA`, an array of three objects defined at line 288.

#### `onScroll()` — Event handler

- **File:** `src/pages/Home/Hero.jsx:336`
- **Returns:** nothing
- **Called by:** the browser, on window scroll

The function that drives the whole hero:

```js
const onScroll = () => {
  const wrap = wrapRef.current; if (!wrap) return;
  const rect     = wrap.getBoundingClientRect();
  const scrolled = -rect.top;
  const total    = wrap.offsetHeight - window.innerHeight;
  const pct      = Math.max(0, Math.min(1, scrolled / total));
  setScrollPct(pct);
  const idx = Math.min(2, Math.floor(pct * 3));
  if (idx !== prevIdx.current) { /* crossfade, below */ }
};
```

Step by step: `rect.top` is how far the wrapper's top edge is from the top of the
viewport, negative once you scroll past it, so `-rect.top` is pixels scrolled
into the hero. `total` is the scrollable distance — wrapper height minus one
screen. Dividing gives a 0–1 fraction, clamped by the `Math.max`/`Math.min`
sandwich. Multiplying by 3 and flooring gives the division index, and
`Math.min(2, …)` guards the edge case where `pct` is exactly 1 and would produce
3.

Registered with `{ passive: true }`, which promises the browser this handler will
never call `preventDefault()`, letting it scroll without waiting.

#### The crossfade callbacks

- **File:** `src/pages/Home/Hero.jsx:345–351`

Two nested `setTimeout` callbacks implement the three-stage text transition:

```js
setTextState('exiting');                             // 1. fade out (CSS, 280ms)
setTimeout(() => {
  setActiveIdx(idx);                                 // 2. swap the data
  prevIdx.current = idx;
  setTextState('entering');                          //    position off-screen
  setTimeout(() => setTextState('shown'), 50);       // 3. next frame: animate in
}, 280);
```

**The two magic numbers.** `280` must equal the CSS transition duration on
`.hero-text-wrap` — change one and you must change the other. `50` is a
one-frame delay that lets the browser register the "entering" start position
before transitioning away from it; without it, the browser would collapse both
style changes into one and you would see no animation.

**Why `prevIdx` is a ref.** `onScroll` fires dozens of times a second. If
tracking the previous index used state, each scroll event would re-render. Refs
store values across calls without triggering renders.

#### The navigation click handlers

- **File:** `src/pages/Home/Hero.jsx:387` (mobile dots), `406` (left nav)

Both are the same computation:

```js
onClick={() => {
  const wrap = wrapRef.current; if (!wrap) return;
  const total = wrap.offsetHeight - window.innerHeight;
  window.scrollTo({ top: wrap.offsetTop + (i / 3 + 0.01) * total, behavior: 'smooth' });
}}
```

This is `onScroll` run backwards: given a division index, work out the scroll
position that would select it. `i / 3` is the start of that division's segment,
and `+ 0.01` nudges past the boundary so rounding cannot land you in the previous
division.

### `DIV_DATA` — data, not a function

- **File:** `src/pages/Home/Hero.jsx:288`

Three objects carrying badge text, title, subtitle, description, tag list,
colours, gradient tint, member count, button class, and destination path. This is
the array to edit when changing hero content. Its `projects` field reads
`DIVISION_PROJECTS.<div>.length`, so project counts stay accurate; `members` is
hard-coded.

---

## 12. `src/pages/Home/DivisionsShowcase.jsx`

### `DivisionsShowcase()` — Component (home section)

- **File:** `src/pages/Home/DivisionsShowcase.jsx:70`
- **Props:** none
- **Returns:** the three-card grid
- **Called by:** `Home`

One state value: `const [active, setActive] = useState(null);` holding `null` or a
division key.

**The accordion in one line:**

```jsx
onClick={() => setActive(isActive ? null : d.div)}
```

Because a single value holds which card is open, opening one closes the others
for free. No loop, no array of booleans.

**The expand animation:**

```jsx
<div className="div-detail" style={{ maxHeight: isActive ? '440px' : '0' }}>
```

CSS cannot transition to `height: auto`, so a fixed pixel ceiling is used with
`overflow: hidden`. **Gotcha:** content taller than 440 px is silently clipped.

### `icon(color)` — Factory function (inside data)

- **File:** `src/pages/Home/DivisionsShowcase.jsx:19`, `38`, `59`
- **Parameters:** `color` — a hex string
- **Returns:** a JSX `<svg>` element
- **Called by:** the render, as `{d.icon(d.color)}`

```jsx
icon: (color) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
),
```

Each division stores its icon as a **function that takes a colour** rather than
finished JSX. That lets one definition be recoloured per division. If it stored
plain JSX, the stroke colour would be fixed at definition time.

This is the only place in the codebase that uses this pattern. Elsewhere (for
example `Pillars.jsx` and `About.jsx`) icons are stored as plain JSX with
hard-coded colours, because they never need recolouring.

---

## 13. `src/pages/Home/Terminal.jsx`

The best self-contained example of React state in the project.

### `COMMANDS` — an object of six functions

- **File:** `src/pages/Home/Terminal.jsx:16`

Each key is a command name; each value is a function taking no arguments and
returning an **array of line objects**. Adding a command means adding one key.

| Key | Line | Returns |
|---|---|---|
| `help` | 17 | The list of available commands |
| `divisions` | 29 | The three divisions, one coloured line each |
| `events` | 39 | A hard-coded, stale event list ⚠ |
| `members` | 48 | The member-count line |
| `projects` | 53 | Built live from `DIVISION_PROJECTS` |
| `whoami` | 73 | The "about the club" block |

A **line object** is `{ type, text }`, where `type` selects a CSS colour class:
`out`, `green`, `blue`, `amber`, `dim`, `err`, `spacer`, `cmd`.

Keeping output as data rather than JSX is what makes commands trivially simple —
each one is a pure function returning an array.

#### `COMMANDS.projects()` — Helper

- **File:** `src/pages/Home/Terminal.jsx:53`
- **Returns:** an array of line objects
- **Called by:** `runCmd`

The only command that reads real data:

```js
for (const [div, projects] of Object.entries(DIVISION_PROJECTS)) {
  for (const p of projects.filter(p => p.status === 'Active')) {
    lines.push({ type: COLOR[div], text: `  [${PREFIX[div]}] ${p.name.padEnd(26)}— active` });
  }
}
```

`Object.entries` turns `{metaverse: [...], robotics: [...]}` into
`[['metaverse', [...]], ['robotics', [...]]]` so both key and value are available
in the loop. `PREFIX` and `COLOR` are small lookup objects mapping the division
key to a two-letter tag and a line colour. `padEnd(26)` pads the name with spaces
to 26 characters so the dashes line up in a column, which is what makes it read
like real terminal output.

It also counts as it goes and appends a summary line.

**This is the pattern `COMMANDS.events` should copy.** See handbook section 15.2.

### `getJoinOutput(arg)` — Helper

- **File:** `src/pages/Home/Terminal.jsx:85`
- **Parameters:** `arg` — the word typed after `join`, possibly `undefined`
- **Returns:** an array of line objects
- **Called by:** `runCmd`, when the command is `join`

```js
function getJoinOutput(arg) {
  const map  = { metaverse:'Metaverse', robotics:'Robotics', printing:'3D Printing' };
  const name = map[arg?.toLowerCase()];
  if (!name) return [ { type:'err', text:`Division "${arg}" not found…` }, … ];
  if (SIGNUP_CONFIG.isOpen) return [ …, { type:'__redirect', to:'/join' } ];
  …
}
```

Three branches: unknown division → red error; sign-ups open → green message plus
a redirect instruction; sign-ups closed → amber message plus the next intake
date.

**`arg?.toLowerCase()`** uses optional chaining. If the user types bare `join`
with no argument, `arg` is `undefined`; the `?.` short-circuits to `undefined`
instead of throwing "cannot read property of undefined".

**The `__redirect` sentinel.** This is the notable idea in the file. The function
cannot navigate — it is a pure function with no access to the router. So it
returns navigation *as data*, a line object with a made-up type that `runCmd`
knows to intercept. The double underscore signals "not a real output line".

This keeps every command a pure function, which makes them trivial to reason
about. Copy the pattern if you add a command that needs to cause an effect.

It lives outside `COMMANDS` because it takes an argument, while every entry in
`COMMANDS` takes none.

### `Terminal()` — Component (home section)

- **File:** `src/pages/Home/Terminal.jsx:118`
- **Props:** none
- **Returns:** the two-column section — hints on the left, terminal window on the
  right
- **Called by:** `Home`

Four state values (`lines`, `input`, `history`, `histIdx`), two refs (`bodyRef`,
`inputRef`), two reveal refs, and `navigate` from the router.

#### `scrollBody()` — Helper

- **File:** `src/pages/Home/Terminal.jsx:129`
- **Returns:** nothing
- **Called by:** `runCmd`, via `setTimeout(scrollBody, 0)`

```js
const scrollBody = () => {
  if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
};
```

Scrolls the output pane to the bottom by setting `scrollTop` to the full
`scrollHeight`.

**Why it is always called via `setTimeout(…, 0)`.** At the moment `runCmd` calls
`setLines`, React has not yet rendered the new lines, so `scrollHeight` is still
the old value. A zero-delay timeout defers the scroll to the next task, after
React has painted. Without it you scroll to where the bottom *used* to be.

#### `runCmd(raw)` — Helper

- **File:** `src/pages/Home/Terminal.jsx:133`
- **Parameters:** `raw` — the raw input string
- **Returns:** nothing
- **Called by:** `onKeyDown` (on Enter) and `injectCmd`

The dispatcher. Its steps:

1. `trim()` the input and return immediately if empty.
2. Split into command and arguments:
   `const [cmd, ...args] = trimmed.toLowerCase().split(' ');` — destructuring with
   a rest element, so `join robotics` becomes `cmd = 'join'`, `args = ['robotics']`.
3. Echo the command into the output as a `cmd`-type line.
4. **Special-case `clear`**: replace the whole `lines` array and `return` early.
5. Otherwise pick the output: `getJoinOutput(args[0])` for `join`,
   `COMMANDS[cmd]()` if the command exists, else a red "command not found".
6. Extract any `__redirect` line, filter it out of the visible output, and
   schedule `navigate` 900 ms later if present.
7. Push the command onto `history`, reset `histIdx` to `-1`, clear the input, and
   queue `scrollBody`.

**Why `clear` returns early** instead of living in `COMMANDS`: every other
command *appends* to the output, while `clear` *replaces* it. It cannot be
expressed as "return some lines to add".

**The 900 ms delay** on navigation exists so the user can read "Redirecting…"
before the page changes. Instant navigation would look like a glitch.

#### `onKeyDown(e)` — Event handler

- **File:** `src/pages/Home/Terminal.jsx:172`
- **Parameters:** `e` — a keyboard event
- **Returns:** nothing
- **Called by:** the browser, on keydown in the input

Three keys:

- **Enter** → `runCmd(input)`.
- **ArrowUp** → move back through history.
- **ArrowDown** → move forward through history.

```js
else if (e.key === 'ArrowUp') {
  e.preventDefault();
  const idx = Math.min(histIdx + 1, history.length - 1);
  setHistIdx(idx);
  setInput(history[idx] || '');
}
```

`history` is stored **newest first** (`setHistory(h => [trimmed, ...h])`), so
ArrowUp *increases* the index to go further back. `histIdx === -1` means "not
browsing history, input is empty". The `Math.min`/`Math.max` clamps stop you
running off either end.

`e.preventDefault()` is essential: by default, arrow keys move the text cursor
inside an input. Without it the cursor would jump while you browse history.

#### `injectCmd(cmd)` — Helper

- **File:** `src/pages/Home/Terminal.jsx:187`
- **Parameters:** `cmd` — the command string to run
- **Returns:** nothing
- **Called by:** the four hint buttons on the left

```js
const injectCmd = (cmd) => {
  inputRef.current?.focus();
  setInput(cmd);
  setTimeout(() => runCmd(cmd), 80);
};
```

Focuses the input, types the command into it, then runs it 80 ms later. The delay
exists so the user *sees* the command appear before the output does — it makes
the causal link visible. Running instantly would look like the button magically
produced output.

`inputRef.current?.focus()` uses optional chaining in case the ref is not yet
attached.

Note that `runCmd(cmd)` is passed the command directly rather than reading
`input`. State updates are not immediate, so `input` would still hold the old
value at that point.

#### `renderLine(l, i)` — Helper (render function)

- **File:** `src/pages/Home/Terminal.jsx:193`
- **Parameters:** `l` — a line object; `i` — its array index
- **Returns:** a JSX element
- **Called by:** `{lines.map(renderLine)}`

Three branches: a `spacer` becomes an empty spacing div; a `cmd` line becomes a
prompt plus the echoed command; everything else becomes a div whose className
includes the line's `type`, which CSS colours.

```jsx
return <div key={i} className={`t-line t-out ${l.type}`}>{l.text}</div>;
```

**Why it is a plain function, not a component.** It returns JSX but is named in
camelCase and called directly. React does not manage it, there is no state, no
hooks. Calling it a component and writing `<RenderLine l={l} />` would work but
add nothing.

**Why `key={i}` is acceptable here.** Using an array index as a React key is
normally discouraged, because reordering or inserting breaks React's tracking.
Terminal output is strictly append-only — lines never move or get inserted in the
middle — so the index is stable and safe.

#### `BOOT_LINES` and `HINTS` — data

- **File:** `src/pages/Home/Terminal.jsx:7` and `111`

`BOOT_LINES` is the initial value of `lines`, so it is what shows before the user
types anything. `HINTS` is the four clickable suggestions on the left, each
`{ cmd, desc }`.

---

## 14. `src/pages/Home/HomeAbout.jsx`

### `HomeAbout()` — Component (home section)

- **File:** `src/pages/Home/HomeAbout.jsx:3`
- **Props:** none
- **Returns:** a two-column block — copy on the left, logo card on the right
- **Called by:** `Home`

Calls `useReveal()` once. Everything else is static JSX. No other functions. Edit
the text directly in the component.

---

## 15. `src/pages/Home/Pillars.jsx`

### `Pillars()` — Component (home section)

- **File:** `src/pages/Home/Pillars.jsx:85`
- **Props:** none
- **Returns:** the six-card grid
- **Called by:** `Home`

Calls `useReveal()`, then maps the `pillars` array (line 3) into cards.

`pillars` entries store their `icon` as **plain JSX**, not as a function — unlike
`DivisionsShowcase`, where icons are recoloured per division. Here each icon's
stroke colour is written into the SVG, so no factory is needed.

```jsx
{pillars.map((p) => (
  <div className="pillar-card" key={p.num}>…</div>
))}
```

`key={p.num}` uses the stable `'01'`…`'06'` values rather than the array index.

---

## 16. `src/pages/Home/HomeEvents.jsx`

### `HomeEvents()` — Component (home section)

- **File:** `src/pages/Home/HomeEvents.jsx:19`
- **Props:** none
- **Returns:** the four-row upcoming events list
- **Called by:** `Home`

Calls `useReveal()` and maps over the `events` array. The component itself does
almost nothing; the logic is above it.

### The module-level `events` pipeline

- **File:** `src/pages/Home/HomeEvents.jsx:5`

```js
const events = ALL_EVENTS
  .filter(isUpcoming)
  .slice(0, 4)
  .map(e => ({
    month: e.month, day: e.day, year: e.year, name: e.title,
    location: e.location, time: e.time, tag: e.type,
    tagStyle: TYPE_TAG_STYLE[e.type] ?? 'blue',
  }));
```

A three-step chain: keep only upcoming events, take the first four, reshape each
into the flatter form this component wants. Note `title` is renamed to `name` and
a `tagStyle` CSS class is added.

`?? 'blue'` is the **nullish coalescing operator** — it supplies `'blue'` only
when the left side is `null` or `undefined`. So an unrecognised event type still
renders, just in the default colour, rather than producing `className="… undefined"`.

**This runs at module load, not inside the component.** It executes once when the
bundle is first imported, not on every render. For a site whose data changes only
at deploy time that is fine and slightly faster. But it means the list will not
update if the page stays open across midnight — a negligible concern here, worth
knowing in general.

---

## 17. `src/pages/Home/CTA.jsx`

### `CTA()` — Component (home section)

- **File:** `src/pages/Home/CTA.jsx:4`
- **Props:** none
- **Returns:** the closing call-to-action
- **Called by:** `Home`

Calls `useReveal()` **twice** — `ref` for the heading block and `ref2` for the
text and buttons — so the two halves animate in independently. Otherwise static.

---

## 18. `src/pages/About.jsx`

Five components and eleven nested functions. The most involved file after
`Hero.jsx`.

### `Lightbox({ src, alt, onClose })` — Component

- **File:** `src/pages/About.jsx:66`
- **Props:**
  - `src` — image URL
  - `alt` — alt text
  - `onClose` — callback invoked to dismiss
- **Returns:** the full-screen backdrop with the image
- **Called by:** `About`, conditionally: `{lightbox && <Lightbox … />}`

```jsx
useEffect(() => {
  const onKey = (e) => { if (e.key === 'Escape') onClose(); };
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';
  return () => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
  };
}, [onClose]);
```

Three behaviours, all correct and all worth preserving:

1. **Escape closes it** — via the nested `onKey` handler, registered on
   `document` so it works regardless of focus.
2. **Background scroll is locked** — `document.body.style.overflow = 'hidden'`
   while open.
3. **The lock is always released** — in the cleanup function. This matters more
   than it looks: if the release happened in a click handler instead, an unmount
   by any other route would leave the whole page permanently unscrollable.

The backdrop has `onClick={onClose}` while the image has
`onClick={(e) => e.stopPropagation()}`. `stopPropagation` prevents the click from
**bubbling** up to the backdrop, so clicking the photo does not dismiss it while
clicking around it does.

#### `onKey(e)` — Event handler

- **File:** `src/pages/About.jsx:68`
- **Parameters:** `e` — a keyboard event
- **Called by:** the browser, on any keydown while the lightbox is open

One line: if the key is Escape, call `onClose`.

### `GalleryItem({ item, patternIdx, onOpen })` — Component

- **File:** `src/pages/About.jsx:90`
- **Props:**
  - `item` — one object from `GALLERY`
  - `patternIdx` — the array index, used to pick a placeholder pattern
  - `onOpen` — callback `(src, alt)` to open the lightbox
- **Returns:** one grid cell
- **Called by:** `About`, inside `GALLERY.map`

Renders a photo if `item.img` is set, otherwise a patterned placeholder showing
`item.hint`.

```jsx
className={`gallery-item${item.wide ? ' wide' : ''}${item.tall ? ' tall' : ''}${item.img ? ' expandable' : ''}`}
backgroundImage: item.img ? 'none' : GALLERY_PATTERNS[patternIdx % 3]
onClick={() => item.img && onOpen(item.img, item.label)}
```

Three things conditional on the data: `wide`/`tall` control grid span,
`expandable` sets `cursor: zoom-in`, and the click only fires when there is an
image to show.

`item.img && onOpen(…)` is a **guard expression** — the right side only evaluates
if the left is truthy. Compact, and used throughout this file.

`patternIdx % 3` cycles through the three placeholder patterns so adjacent empty
cells look different.

### `PortfolioCard({ p, onOpen })` — Component

- **File:** `src/pages/About.jsx:114`
- **Props:** `p` — one object from `PORTFOLIO`; `onOpen` — lightbox callback
- **Returns:** one portfolio card
- **Called by:** `About`, inside `PORTFOLIO.map`

Same photo-or-placeholder pattern as `GalleryItem`, plus a text block with
division, name, description, and a status pill. The pill derives three colours
from `p.statusColor`:

```jsx
style={{ color: p.statusColor, background: p.statusColor + '18',
         border: `1px solid ${p.statusColor}33` }}
```

Appending `18` and `33` to a 6-digit hex makes 8-digit RGBA — roughly 9% and 20%
opacity. One base colour, three derived values.

### `LeadershipTunnel()` — Component

- **File:** `src/pages/About.jsx:149`
- **Props:** none
- **Returns:** the 3-D scene, the roster end-screen, a progress bar, and a hint
- **Called by:** `About`

The most complex component in the project. Six refs and no state at all — that
absence is the point.

| Ref | Holds |
|---|---|
| `outerRef` | the scroll-capturing container |
| `sceneRef` | the element carrying `perspective` |
| `worldRef` | the `preserve-3d` container whose transform tilts everything |
| `progRef` | the progress bar, width written directly |
| `rosterRef` | the end-screen, opacity written directly |
| `elMap` | an object mapping item id → DOM element |

`elMap` is populated during render by a **ref callback**:

```jsx
ref={el => elMap.current[item.id] = el}
```

Instead of one ref per element, a single ref holds a dictionary of all ~80
elements, which the animation loop then looks up by id.

#### The `useMemo` scene builder

- **File:** `src/pages/About.jsx:157`
- **Returns:** `{ allItems, totalDepth }`
- **Called by:** React, once

Walks forward through depth (`z`), pushing a title item, then member cards
alternating left and right of centre, then a gap, for each section. Then scatters
70 stars at random positions.

```js
const xOff = single ? 0 : mi % 2 === 0 ? -310 : 310;
```

`mi % 2` alternates the side. A section with one member centres it instead.

**`useMemo` with `[]` is load-bearing here, not an optimisation.** The star
positions come from `Math.random()`. Without memoisation they would be
recalculated on every render and the stars would jump around.

Two nested `forEach` callbacks do the walking: the outer over
`TUNNEL_SECTIONS`, the inner over `sec.members`.

#### `getAlpha(vz)` — Helper

- **File:** `src/pages/About.jsx:193`
- **Parameters:** `vz` — the item's depth relative to the camera
- **Returns:** a number from 0 to 1
- **Called by:** `tick`, once per item per frame

```js
const getAlpha = (vz) => {
  if (vz < -2800) return 0;
  if (vz < -1300) return (vz + 2800) / 1500;
  if (vz >  380)  return Math.max(0, 1 - (vz - 380) / 280);
  return 1;
};
```

A four-band opacity curve. Far behind the camera: invisible. Approaching from the
distance: fading in. Close to or past the camera: fading out. In the sweet spot:
fully opaque.

This is what keeps the tunnel legible — without it, all 80 items would be drawn
at full opacity at once.

`tick` uses its result as an early-exit: `if (a <= 0) return;` skips the
transform write entirely for invisible items, which is most of them.

#### `onWheel(e)` — Event handler

- **File:** `src/pages/About.jsx:200`
- **Parameters:** `e` — a wheel event
- **Called by:** the browser, on wheel over the tunnel

```js
const onWheel = (e) => {
  const done = (S.target <= 0 && e.deltaY < 0) || (S.target >= totalDepth && e.deltaY > 0);
  if (done) return;
  e.preventDefault();
  S.target = Math.max(0, Math.min(totalDepth, S.target + e.deltaY * 2.5));
};
```

Converts wheel movement into camera depth, hijacking the page scroll.

**The `done` check is the most important line in the function.** It asks: are we
at an end *and* scrolling further in that direction? If so, return without
calling `preventDefault()`, which lets the browser scroll the page normally.
Without it, the tunnel would be an inescapable trap.

Registered with `{ passive: false }` — the opposite of the hero's scroll listener
— because it must be allowed to call `preventDefault()`.

`* 2.5` is the scroll sensitivity multiplier.

#### `onMove(e)` — Event handler

- **File:** `src/pages/About.jsx:207`
- **Parameters:** `e` — a mousemove event
- **Called by:** the browser, on window mousemove

```js
S.mx = (e.clientX / window.innerWidth  - 0.5) * 2;
S.my = (e.clientY / window.innerHeight - 0.5) * 2;
```

Normalises the cursor to −1…+1 on each axis, centre being 0. `tick` uses these to
tilt the whole world, producing a subtle parallax that follows the mouse.

Dividing by the window size makes it resolution-independent; subtracting 0.5 and
doubling re-centres the range on zero.

#### `onTouchStart(e)` / `onTouchMove(e)` — Event handlers

- **File:** `src/pages/About.jsx:213` and `214`
- **Called by:** the browser, on touch

```js
const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
const onTouchMove  = (e) => {
  const dy = touchY - e.touches[0].clientY;
  touchY = e.touches[0].clientY;
  const done = (S.target <= 0 && dy < 0) || (S.target >= totalDepth && dy > 0);
  if (done) return;
  e.preventDefault();
  S.target = Math.max(0, Math.min(totalDepth, S.target + dy * 3));
};
```

The touch equivalent of `onWheel`. `onTouchStart` records where the finger landed;
`onTouchMove` computes the delta since the last move, updates the record, and
applies it. The same `done` release check appears here.

`touchY` is a plain closure variable, not a ref — it only needs to live as long as
the effect, and nothing outside reads it.

#### `tick()` — Animation loop

- **File:** `src/pages/About.jsx:224`
- **Returns:** nothing
- **Called by:** itself, via `requestAnimationFrame`

The heart of the tunnel. Per frame:

**1. Advance the camera with spring physics.**

```js
S.vel += ((S.target - S.scroll) * 0.07 - S.vel) * 0.12;
S.scroll += S.vel;
```

`S.target` jumps instantly when you scroll; `S.scroll` chases it; `S.vel` is
itself smoothed toward the ideal velocity. Two lines give acceleration, coasting,
and settling. `0.07` is stiffness, `0.12` is damping — raise them for snappier
and less floaty.

**2. Velocity-driven scene effects.**

```js
scene.style.perspective = `${Math.max(500, 800 - Math.abs(v) * 6)}px`;
world.style.transform   = `rotateX(${S.my * 4 - v * 0.3}deg) rotateY(${S.mx * 4}deg)`;
```

Moving fast narrows the field of view, which reads as speed. The world tilts with
the mouse and pitches slightly with velocity.

**3. Cross-fade to the roster.**

```js
const rp = Math.max(0, Math.min(1, (cam - (totalDepth - 700)) / 700));
world.style.opacity        = Math.max(0, 1 - Math.max(0, (cam - (totalDepth - 900)) / 500));
roster.style.opacity       = rp;
roster.style.pointerEvents = rp > 0.05 ? 'auto' : 'none';
```

The world fades out slightly before the roster fades in, so they overlap. The
`pointerEvents` toggle stops the invisible roster from swallowing clicks.

**4. Position every item.** A `forEach` over `allItems` with three branches —
stars get a z-stretch proportional to speed, titles get a velocity-driven
chromatic-aberration `textShadow`, cards get a sine bob and a mobile-scaled x
offset:

```js
const xScale = vw < 480 ? 0.32 : vw < 768 ? Math.max(0.45, vw / 900) : 1;
const fy = Math.sin(performance.now() * 0.0007 + item.z * 0.001) * 8;
```

The `item.z` term inside the sine offsets each card's phase so they do not bob in
unison. `xScale` pulls the left/right offsets inward on narrow screens so cards
stay on screen.

**Why this loop writes to `el.style` instead of using state.** About 80 elements
update 60 times a second. Storing the camera position in `useState` would mean 60
renders per second of a tree with 80 children — guaranteed stutter. Direct DOM
writes are the correct escape hatch for high-frequency animation. React still
creates the elements; the loop only mutates their transforms.

**`S` is a plain object**, not state and not even a ref, because it only needs to
live for the lifetime of the effect.

#### The effect cleanup

- **File:** `src/pages/About.jsx:275`

```js
return () => {
  cancelAnimationFrame(raf);
  outer.removeEventListener('wheel', onWheel);
  outer.removeEventListener('touchstart', onTouchStart);
  outer.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('mousemove', onMove);
};
```

Five teardowns. The `mousemove` listener is on `window`, so forgetting that one
would leave a handler running on every page of the site after you navigate away.

#### The render's item mapper

- **File:** `src/pages/About.jsx:304`

`{allItems.map(item => { … })}` with three `if` branches returning a star, a
title, or a card, and `return null` at the end for safety. Every branch attaches
the `ref={el => elMap.current[item.id] = el}` callback so `tick` can find it.

### `About()` — Component (page)

- **File:** `src/pages/About.jsx:379`
- **Props:** none
- **Returns:** the whole About page
- **Called by:** the router, for `/about`

Four `useReveal()` refs, one state value for the lightbox, two callbacks.

#### `openLightbox(src, alt)` — Helper

- **File:** `src/pages/About.jsx:385`
- **Parameters:** `src`, `alt`
- **Returns:** nothing
- **Called by:** `GalleryItem` and `PortfolioCard`, via the `onOpen` prop

```js
const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
```

#### `closeLightbox()` — Helper

- **File:** `src/pages/About.jsx:386`
- **Called by:** `Lightbox`, via `onClose`

```js
const closeLightbox = useCallback(() => setLightbox(null), []);
```

**Why both are wrapped in `useCallback`.** Without it, a new function object
would be created on every render of `About`, and since these are passed as props
to fourteen gallery and portfolio children, every one of them would see a
"changed" prop. `useCallback` with `[]` returns the same function identity every
time.

**This is the "lifting state up" pattern.** The lightbox state cannot live inside
`GalleryItem`, because the overlay must cover the whole page, and only one can be
open at a time. So it lives in the nearest common ancestor, and children get a
function to change it.

### Data arrays in this file

`TIMELINE` (9), `TEAM` (19), `PORTFOLIO` (33), `GALLERY` (42), `VALUES` (51),
`GALLERY_PATTERNS` (57), `TUNNEL_SECTIONS` (143).

**`TUNNEL_SECTIONS` deserves a warning.** It slices `TEAM` by hard-coded index:

```js
{ title:'COMMUNITY', members: TEAM.slice(0,4) },
{ title:'METAVERSE', members: TEAM.slice(4,6) },
```

Insert a member and every later range is wrong, silently filing people under the
wrong division. See handbook sections 11.6 and 15.3.

---

## 19. `src/pages/Events.jsx`

### `Events()` — Component (page)

- **File:** `src/pages/Events.jsx:11`
- **Props:** none
- **Returns:** the whole Events page
- **Called by:** the router, for `/events`

Two state values (`filter`, `divFilter`) and several derived values computed
fresh on every render.

#### The filter callback

- **File:** `src/pages/Events.jsx:20`

```js
const filtered = upcoming.filter(e => {
  const typeOk = filter === 'All' || e.type === filter;
  const divOk  = divFilter === 'All Divisions' || e.division === divFilter || e.division === 'All';
  return typeOk && divOk;
});
```

Both conditions must pass. Each has an "All" escape hatch that short-circuits to
`true`.

The third clause, `e.division === 'All'`, makes club-wide events appear under
every division filter. Correct in intent, but it currently means filtering to
"Metaverse" shows all five events, which can look like a broken filter.

#### The month-grouping expressions

- **File:** `src/pages/Events.jsx:26`

```js
const months = [...new Set(filtered.map(e => `${e.month} ${e.year}`))];
```

Four operations in one line: `map` builds a `"OCT 2026"` string per event, `Set`
discards duplicates, the spread converts back to an array, and the result is a
list of unique month headings **in first-appearance order**.

That last part is why `ALL_EVENTS` must be kept sorted by date — nothing sorts it
for you, so out-of-order data produces out-of-order headings.

The render then filters again per month:

```jsx
{filtered.filter(e => `${e.month} ${e.year}` === month).map(e => …)}
```

Grouping without a library, at the cost of one extra pass per month. With five
events that is free.

#### The live counters

- **File:** `src/pages/Events.jsx:29`

```js
const currentMonthKey = Object.keys(MONTH_INDEX).find(k => MONTH_INDEX[k] === now.getMonth());
const thisMonthCount  = upcoming.filter(e => e.month === currentMonthKey && e.year === now.getFullYear()).length;
```

A reverse lookup: `getMonth()` gives a number like `9`, and `find` searches
`MONTH_INDEX` for the key whose value is `9`, returning `'OCT'`. Then counts
matching events.

**Gotcha:** `MONTH_INDEX` is redeclared at the top of this file, identical to the
one in `data/events.js`. Export and import it instead.

#### `typeTagStyle(type)` — Helper

- **File:** `src/pages/Events.jsx:34`
- **Parameters:** `type` — an event type string
- **Returns:** a style object with `color`, `background`, `border`
- **Called by:** the render, per event card

```js
const typeTagStyle = type => {
  const color = TYPE_COLORS[type] ?? '#888';
  return { color, background: `${color}18`, border: `1px solid ${color}33` };
};
```

Derives three coordinated values from one base colour using hex alpha suffixes.
The `?? '#888'` fallback means an unknown type renders grey rather than breaking.

`{ color, … }` uses property shorthand — equivalent to `{ color: color, … }`.

**Gotcha:** `const past = ALL_EVENTS.filter(e => !isUpcoming(e))` on line 14 is
computed but never rendered. The reveal refs `r1` and `r2` on line 32 are also
unused.

---

## 20. `src/pages/Join.jsx`

### `SignupPanel()` — Component

- **File:** `src/pages/Join.jsx:35`
- **Props:** none — reads `SIGNUP_CONFIG` from the module scope
- **Returns:** the open panel or the closed panel
- **Called by:** `Join`

```jsx
function SignupPanel() {
  if (SIGNUP_CONFIG.isOpen) {
    return ( /* green badge, button to googleFormUrl */ );
  }
  return ( /* grey badge, next intake date, Instagram button */ );
}
```

An **early return** rather than a ternary. When both branches are 20 lines of
JSX, a ternary becomes unreadable; two returns do not.

The closed branch conditionally shows the intake date:

```jsx
{SIGNUP_CONFIG.showNextIntakeDate && SIGNUP_CONFIG.nextIntakeDate && ( … )}
```

Both the flag and a non-empty string are required, so clearing the date hides the
block without needing to flip the flag.

**Why it takes no props.** It reads the config directly, which keeps the call site
clean but makes it untestable in isolation. Taking `config` as a prop would be
more flexible; for a single-use component this is fine.

**Gotcha:** if `isOpen` is `true` while `googleFormUrl` is `''`, this renders a
prominent button whose `href` is empty. Always set both together.

### `Join()` — Component (page)

- **File:** `src/pages/Join.jsx:84`
- **Props:** none
- **Returns:** the whole Join page
- **Called by:** the router, for `/join`

One state value, four reveal refs, one derived string.

#### The FAQ toggle

- **File:** `src/pages/Join.jsx:187`

```jsx
const [openFaq, setOpenFaq] = useState(null);
onClick={() => setOpenFaq(openFaq === i ? null : i)}
```

The same single-value accordion as `DivisionsShowcase`, holding an index instead
of a key. Clicking the open item closes it; clicking another switches.

The markup around it is the most accessible on the site — a real `<button>`,
`aria-expanded`, and `aria-controls` pointing at the panel id. Match this when
you build anything expandable.

**Gotcha:** `.faq-a.open { max-height: 200px }` in `join.css` clips long answers.

#### The gated hero subtitle

- **File:** `src/pages/Join.jsx:89`

```js
const heroSub = SIGNUP_CONFIG.isOpen
  ? '…Sign-ups are open now. Scroll down to apply.'
  : '…Sign-ups open periodically. Scroll down to stay in the loop.';
```

A ternary here, because the two branches are single strings rather than JSX
trees. Same decision as `SignupPanel`, opposite answer, for a good reason.

### Data arrays

`FAQS` (10), `PERKS` (19), `STEPS` (29). `STEPS` entries store their `icon` as
plain JSX with hard-coded stroke colours.

---

## 21. `src/pages/divisions/Metaverse.jsx`

### `HeroCanvas()` — Component (canvas)

- **File:** `src/pages/divisions/Metaverse.jsx:10`
- **Props:** **none**
- **Returns:** `<canvas width={440} height={440} />`
- **Called by:** `Metaverse`

The single-division version of `MetaverseCanvas`. Same scene — wireframe cube,
grid floor, particles, orbiting ring — with three differences:

| | Hero version | Division version |
|---|---|---|
| Size | 580 × 580 | 440 × 440 |
| Particles | 70 | 60 |
| Cube size `S` | 130 | 110 |
| Projection divisor | `500/(500+z+250)` | `450/(450+z+220)` |
| Orbiting octahedron | yes | no |
| `active` prop / pausing | yes | **no** |

**The missing `active` prop is the meaningful difference.** This canvas has no
`activeRef` and no `restartRef`; `draw` unconditionally calls
`requestAnimationFrame(draw)`. It is the only canvas on its page, always visible,
so there is nothing to pause for.

It still cancels correctly on unmount, which is what matters:

```js
return () => { cancelAnimationFrame(rafRef.current);
               canvas.removeEventListener('mousemove', onMouse); };
```

#### `rot(p, rx, ry, rz)`, `proj([x,y,z])`, `draw()`, `onMouse(e)`

- **Files:** lines 22, 23, 24, 42

Identical in purpose to the versions in `Hero.jsx` documented in section 11, with
the constants noted in the table above. They are **copy-pasted**, not imported —
duplication worth consolidating if you ever refactor.

### `Metaverse()` — Component (page)

- **File:** `src/pages/divisions/Metaverse.jsx:69`
- **Props:** none
- **Returns:** the whole Metaverse page
- **Called by:** the router, for `/metaverse`

Four reveal refs and no other logic — it maps over `PROJECTS` (which is
`DIVISION_PROJECTS.metaverse`), the local `TECH` array, and the local `LEARN`
array.

Wrapped in `<div className="div-blue">`, which sets the `--accent` CSS variable
that `divisions.css` reads throughout. That one class is the entire theming
mechanism.

**Gotcha:** it passes `<Nav active="metaverse.html" />`, a prop `Nav` does not
accept. And the hero stats are hard-coded `['31','Members'],['6','Projects']`
while `PROJECTS.length` is 2.

---

## 22. `src/pages/divisions/Robotics.jsx`

### `ArduinoCanvas()` — Component (canvas)

- **File:** `src/pages/divisions/Robotics.jsx:10`
- **Props:** none
- **Returns:** `<canvas width={420} height={420} />`
- **Called by:** `Robotics`

The single-division version of `RoboticsCanvas`. Same Arduino scene at smaller
dimensions, no `active` prop, no pausing. Contains its own copies of
`lerp` (line 20), `getPt` (line 21), and `draw` (line 23), documented in
section 11.

### `LiveSensors()` — Component

- **File:** `src/pages/divisions/Robotics.jsx:48`
- **Props:** none
- **Returns:** the six-row telemetry panel
- **Called by:** `Robotics`, in the "LIVE DEMO" section

```jsx
const [sensors, setSensors] = useState({ prox:42, torque:78, speed:1240,
                                         temp:36.4, volt:4.98, current:0.32 });
useEffect(() => {
  const id = setInterval(() => setSensors({ /* six new random values */ }), 800);
  return () => clearInterval(id);
}, []);
```

Fake but convincing robot telemetry, refreshed every 800 ms.

**`clearInterval` in the cleanup is mandatory.** Without it the timer keeps firing
after you navigate away, calling `setState` on an unmounted component — a memory
leak plus a React warning. `setInterval` returns an id precisely so you can
cancel it.

**The `rows` array** is rebuilt on each render, converting raw readings into
display form:

```js
{ label:'SPEED', val:`${sensors.speed} rpm`, pct: sensors.speed/1600, color:'#22c97a' },
{ label:'TEMP',  val:`${sensors.temp}°C`,   pct:(sensors.temp-30)/20, color:'#f5a232' },
```

`pct` normalises each reading to 0–1 against a plausible maximum so the bars are
comparable. `TEMP` subtracts 30 first, treating 30 °C as the zero point —
otherwise a 34–38 °C range would barely move the bar.

The bar width is clamped in the render: `width: ${Math.min(r.pct * 100, 100)}%`,
so an out-of-range reading cannot overflow its track.

`.toFixed(1)` and `.toFixed(2)` in the interval callback round to a fixed number
of decimals, which stops the values jittering by six digits and keeps the column
width stable. Note they return **strings**, not numbers — fine here since the
values are only displayed and divided.

### `Robotics()` — Component (page)

- **File:** `src/pages/divisions/Robotics.jsx:90`
- **Props:** none
- **Returns:** the whole Robotics page
- **Called by:** the router, for `/robotics`

Same shape as `Metaverse`, wrapped in `div-green`, with the extra "LIVE DEMO"
section containing `<LiveSensors />`. Section labels use `className="section-label green"`.

---

## 23. `src/pages/divisions/Printing.jsx`

### `PrinterCanvas()` — Component (canvas)

- **File:** `src/pages/divisions/Printing.jsx:10`
- **Props:** none
- **Returns:** `<canvas width={400} height={420} />`
- **Called by:** `Printing`

The single-division version of `PrintingCanvas`. Differences from the hero
version:

| | Hero version | Division version |
|---|---|---|
| Size | 580 × 580 | 400 × 420 |
| Frame | `FW=220, FH=280, BED_H=18` | `FW=200, FH=260, BED_H=16` |
| `useState` for layer | yes (unused) | **no** |
| `active` prop / pausing | yes | no |

Dropping the unused `useState` makes this the cleaner of the two
implementations — it tracks `curLayer` purely as a local variable.

#### `getBedY(l)` — Helper

- **File:** `src/pages/divisions/Printing.jsx:18`

```js
const getBedY = l => FY + FH - 36 - l * (FH - 72) / TOTAL;
```

Same role as in `Hero.jsx` with constants tuned to the smaller frame (36 and 72
instead of 40 and 80).

#### `modelW(l)` — Helper

- **File:** `src/pages/divisions/Printing.jsx:19`

```js
const modelW = l => { const n = l/TOTAL;
  if (n<0.1)  return 4+n*55;
  if (n<0.5)  return 9;
  if (n<0.7)  return 9+(n-0.5)*28;
  if (n<0.85) return 15-(n-0.7)*42;
  return 8; };
```

The same five-band silhouette, scaled down slightly for the smaller canvas. Note
the constants differ from the hero version (55/9/28/42/8 versus 60/10/30/46/9), so
the two printed objects are not pixel-identical. Edit both if you want them to
match.

#### `draw()` — Animation loop

- **File:** `src/pages/divisions/Printing.jsx:20`

Same structure as the hero version minus the `setLayer` call.

### `Printing()` — Component (page)

- **File:** `src/pages/divisions/Printing.jsx:82`
- **Props:** none
- **Returns:** the whole 3D Printing page
- **Called by:** the router, for `/printing`

Wrapped in `div-amber`. Its unique section is "PRINT SPECS", a table built by
mapping an inline array of `[label, value]` pairs describing the lab equipment.

**Gotcha:** hero stats claim `['22','Members'],['16','Projects']` while
`PROJECTS.length` is 1.

---

## 24. React functions used

Functions from React and React Router, with how this project uses them.

| Function | Used in | What it does here |
|---|---|---|
| `useState(initial)` | 12 components | Declares state. Returns `[value, setter]`. Calling the setter re-renders. |
| `useEffect(fn, deps)` | 15+ places | Runs `fn` after render. `[]` means once on mount. `[x]` means whenever `x` changes. Returning a function registers cleanup. |
| `useRef(initial)` | 20+ places | A mutable `.current` box that survives renders without causing them. Used for DOM nodes, animation ids, and values read inside loops. |
| `useMemo(fn, deps)` | `About.jsx:157` | Caches a computed value. Here it freezes the random star positions. |
| `useCallback(fn, deps)` | `About.jsx:385, 386` | Caches a function identity, so child props do not appear to change. |
| `ReactDOM.createRoot(el)` | `main.jsx` | Creates the React root on the `#root` div. |
| `.render(element)` | `main.jsx` | Mounts `<App />` into that root. |
| `React.StrictMode` | `main.jsx` | Development-only double-invocation to surface bugs. Not active in production. |
| `useLocation()` | `App.jsx`, `Nav.jsx` | Returns the current route object; both use `.pathname`. |
| `useNavigate()` | `Terminal.jsx` | Returns a `navigate(path)` function for programmatic navigation. |
| `<BrowserRouter>` | `App.jsx` | Enables History API routing. |
| `<Routes>` / `<Route>` | `App.jsx` | The URL-to-component lookup table. |
| `<Link to="…">` | everywhere | Internal navigation without a page reload. |

**The setter's updater form.** `setState(v => !v)` receives the current value and
returns the next one. Prefer it over `setState(!value)` whenever the new state
depends on the old. Used in `Nav.jsx:69` and `Terminal.jsx:144`.

**Dependency arrays, briefly.** `useEffect(fn, [])` runs once. `useEffect(fn, [x])`
re-runs whenever `x` changes. Omitting the array entirely runs after every render
— this project never does that, and you should not either.

---

## 25. Browser APIs used

Built-in browser functions, not from any library.

### Animation and observation

| API | Used in | Purpose |
|---|---|---|
| `requestAnimationFrame(fn)` | all 6 canvases, `LeadershipTunnel` | Calls `fn` before the next repaint, ~60 fps. Returns an id. |
| `cancelAnimationFrame(id)` | every cleanup | Stops a scheduled frame. **Omitting this leaks.** |
| `new IntersectionObserver(cb, opts)` | `useReveal` | Reports when an element enters the viewport. |
| `observer.observe(el)` / `.disconnect()` | `useReveal` | Start and stop watching. |
| `performance.now()` | `LeadershipTunnel` | High-resolution timestamp, drives the card bob. |
| `setTimeout(fn, ms)` | `Hero`, `Terminal` | Deferred execution. Used for transition timing and for deferring work until after a render. |
| `setInterval(fn, ms)` / `clearInterval(id)` | `LiveSensors` | Repeating timer, and its mandatory cancellation. |

### Canvas 2D

All used inside the six `draw` functions. Canvas has **global drawing state** —
set `fillStyle`, then every subsequent `fill()` uses it until you change it
again. This is the most common source of canvas bugs.

| Method | Purpose |
|---|---|
| `canvas.getContext('2d')` | Gets the drawing context. Everything else hangs off this. |
| `ctx.clearRect(x,y,w,h)` | Wipes the canvas. First call of every frame. |
| `ctx.beginPath()` | Starts a new path. Forgetting it makes shapes connect to the previous one. |
| `ctx.moveTo` / `lineTo` / `arcTo` / `closePath` | Path construction. |
| `ctx.arc(x,y,r,0,Math.PI*2)` | A full circle. |
| `ctx.stroke()` / `ctx.fill()` | Draws the current path as outline or solid. |
| `ctx.fillRect` / `strokeRect` | Rectangle shortcuts. |
| `ctx.fillStyle` / `strokeStyle` / `lineWidth` / `lineCap` | Appearance state. |
| `ctx.createLinearGradient` / `createRadialGradient` | Gradient objects, then `.addColorStop(offset, colour)`. |
| `ctx.setLineDash([on, off])` | Dashed lines. **Always reset with `setLineDash([])`.** |
| `ctx.globalAlpha` | Global opacity multiplier. **Always reset to 1.** |
| `ctx.font` / `fillText` / `textAlign` | Text. `textAlign` is also global state; the code resets it to `'left'` after each centred label. |

### DOM and events

| API | Used in | Purpose |
|---|---|---|
| `addEventListener` / `removeEventListener` | `Nav`, `Hero`, `About`, canvases | Always paired — register in the effect, remove in the cleanup. |
| `{ passive: true }` | `Hero`'s scroll listener | Promises no `preventDefault()`, so scrolling stays smooth. |
| `{ passive: false }` | `LeadershipTunnel`'s wheel listener | Required in order to call `preventDefault()`. |
| `e.preventDefault()` | `onWheel`, `onTouchMove`, `onKeyDown` | Suppresses the default action — page scroll, or cursor movement. |
| `e.stopPropagation()` | `Lightbox` image | Stops the click reaching the backdrop. |
| `el.getBoundingClientRect()` | canvases, `Hero` | Element position and size relative to the viewport. |
| `el.classList.add('visible')` | `useReveal` | Adds one class without touching the others. |
| `el.style.<prop> = …` | `LeadershipTunnel`, `Nav` dropdown | Direct inline style write. Used for 60 fps animation. |
| `window.scrollTo({top, behavior:'smooth'})` | `Hero`, `ScrollToTop` | Programmatic scroll. |
| `window.scrollY` / `innerWidth` / `innerHeight` | `Nav`, `Hero`, `About` | Scroll offset and viewport size. |
| `el.offsetTop` / `offsetHeight` | `Hero`, `About` | Layout position and height. |
| `el.scrollTop` / `scrollHeight` | `Terminal` | Read and set scroll inside the output pane. |
| `document.body.style.overflow` | `Lightbox` | Locks and unlocks page scrolling. |
| `e.touches[0].clientY` | `LeadershipTunnel` | First finger's vertical position. |

---

## 26. JavaScript built-ins used

Standard language functions, grouped by what they are for. If you are new to
JavaScript, this is the vocabulary the codebase assumes.

### Array methods

| Method | Returns | Used for |
|---|---|---|
| `.map(fn)` | a new array | Transforming data into JSX, or reshaping objects. The workhorse of this codebase. |
| `.filter(fn)` | a new array | `isUpcoming`, status filtering, removing the `__redirect` line. |
| `.find(fn)` | first match or `undefined` | Reverse month lookup, locating the redirect line. |
| `.some(fn)` | boolean | `Nav` checking whether the current path is any division. |
| `.slice(a, b)` | a sub-array | First four events, first three projects, `TEAM` sections. |
| `.forEach(fn)` | nothing | Drawing loops and scene building, where no result is needed. |
| `.reduce(fn, init)` | one value | Suggested in handbook 15.1 for summing members. |
| `Array.from({length: n}, fn)` | a new array | Generating particles and pin positions. |
| `.push(x)` | new length | Building the terminal's `lines` and the tunnel's `allItems`. |
| `[...a, ...b]` (spread) | a new array | Doubling the marquee, appending terminal output, `Set` to array. |

**`map` versus `forEach`:** `map` returns a new array, so use it when you need
the result (JSX, reshaped data). `forEach` returns nothing, so use it for side
effects (drawing to a canvas, mutating element styles).

### Object methods

| Method | Used for |
|---|---|
| `Object.entries(obj)` | `Terminal`'s `projects` command, to loop over key **and** value. |
| `Object.keys(obj)` | `Events`' reverse month lookup. |
| `Object.values(obj)` | Suggested in handbook 15.1. |
| `new Set(array)` | Deduplicating month labels. |

### String methods

| Method | Used for |
|---|---|
| `.trim()` | Cleaning terminal input. |
| `.toLowerCase()` | Case-insensitive command matching. |
| `.split(' ')` | Splitting a command from its arguments. |
| `.padEnd(n)` / `.padStart(n, '0')` | Aligning terminal output columns; zero-padding day numbers. |
| Template literals | String building with `${}` everywhere. |

### Math and numbers

| Function | Used for |
|---|---|
| `Math.min` / `Math.max` | Clamping. The pattern `Math.max(0, Math.min(1, x))` forces a value into 0–1 and appears a dozen times. |
| `Math.floor` | Scroll percentage to division index, random integers. |
| `Math.abs` | Velocity magnitude, scan-direction bounce test. |
| `Math.round` | Progress percentage display. |
| `Math.random()` | Particles, stars, fake sensor readings. |
| `Math.sin` / `Math.cos` | All rotation, orbiting, pulsing, and bobbing. |
| `Math.PI` | `Math.PI * 2` is a full circle, used in every `arc` call. |
| `Number(x)` | Converting the `day` string to a number in `isUpcoming`. |
| `.toFixed(n)` | Fixed-decimal display in `LiveSensors`. |
| `String(x)` | Numbers to strings for the stat displays. |
| `n % m` (modulo) | Cycling patterns, wrapping progress, alternating sides. |

### Dates

| Function | Used for |
|---|---|
| `new Date(y, m, d)` | Building a comparable date in `isUpcoming`. **Months are zero-based.** |
| `.getFullYear()` / `.getMonth()` / `.getDate()` | Today's parts, for the midnight comparison. |

### Syntax worth naming

| Syntax | Meaning | Example in this codebase |
|---|---|---|
| `?.` optional chaining | Short-circuits to `undefined` instead of throwing | `arg?.toLowerCase()`, `inputRef.current?.focus()` |
| `??` nullish coalescing | Fallback only for `null`/`undefined` | `TYPE_COLORS[type] ?? '#888'` |
| `&&` guard | Right side only runs if left is truthy | `{item.img && onOpen(…)}`, `{e.featured && <span>…}` |
| `? :` ternary | Inline conditional | `isActive ? d.color : 'var(--white)'` |
| `{ a, b }` destructuring | Pull properties into variables | `function Marquee({ items, color })` |
| `const [a, ...rest] = arr` | Array destructuring with rest | `const [cmd, ...args] = trimmed.split(' ')` |
| `{ color }` shorthand | `{ color: color }` | `typeTagStyle`'s return value |
| `x = default` | Default parameter | `items = DEFAULT_ITEMS` |

---

## 27. Patterns that repeat

Recognise these seven and most of the codebase reads itself.

**1. Effect registers, cleanup removes.** Every `useEffect` that attaches
something detaches it in the returned function. Listeners, observers, animation
frames, intervals, and the body scroll lock all follow this. If you add one and
skip the cleanup, you create a leak that compounds on every page visit.

**2. Ref for high-frequency values, state for rendered values.** Mouse position,
animation frame ids, camera depth, and the previous division index all live in
refs because they change faster than the screen needs to update. Anything the
user actually sees lives in state.

**3. Direct DOM writes for 60 fps animation.** `LeadershipTunnel` writes
`el.style.transform` instead of using state. React owns creating elements; the
animation loop owns mutating them. This is the sanctioned escape hatch, not a
hack — but use it only when you are genuinely updating many elements every frame.

**4. One state value for an accordion.** Storing "which one is open" rather than
an array of booleans gives mutual exclusion for free. Used in
`DivisionsShowcase` (a division key) and `Join`'s FAQ (an index).

**5. Three colours from one.** `color`, `color + '18'`, `color + '33'` for text,
background, and border. In `typeTagStyle`, `PortfolioCard`, the tunnel cards, and
the division showcase. Hex alpha suffixes: `12`≈7%, `18`≈9%, `33`≈20%,
`55`≈33%.

**6. Fallbacks on every lookup.** `TYPE_COLORS[type] ?? '#888'`,
`TYPE_TAG_STYLE[e.type] ?? 'blue'`. A typo in the data degrades the display
instead of producing `undefined` in a className. Keep doing this.

**7. Clamp with a min/max sandwich.** `Math.max(0, Math.min(1, x))` appears in
the hero scroll, the tunnel wheel handler, and the roster cross-fade. It is the
idiomatic way to force a value into a range.

---

## Where to go next

- **[HANDBOOK.en.md](HANDBOOK.en.md)** — the full handbook: architecture, CSS
  system, page walkthroughs, the maintenance cookbook, deployment, known issues,
  and improvement proposals.
- **Section 11 of the handbook** is the cookbook — the practical recipes for
  adding events, opening sign-ups, and updating the team.
- **Section 14 of the handbook** lists the known issues referenced as "gotchas"
  throughout this document, with the fix for each.
