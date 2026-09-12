/*
 * Regenerates the PDF copies of the documentation in docs/.
 *
 * The Markdown files in docs/ are the source of truth. Run this after editing
 * them so the PDFs do not drift.
 *
 *   1. npm install marked            (in a scratch folder, not the website project)
 *   2. node build-pdf.mjs <docs-dir> <html-out-dir>
 *   3. Print each generated .html to PDF with headless Edge or Chrome:
 *
 *      msedge --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="out.pdf" "file:///.../in.html"
 *
 * Any browser "Print to PDF" on the generated .html works too: choose A4 and
 * switch headers and footers off. The @page rule supplies the margins.
 *
 * It emits both the five individual documents and one combined volume,
 * U-TECH-Documentation-Complete, that contains all of them.
 */

import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';

const DOCS = process.argv[2];
const OUT  = process.argv[3];

const BRAND = 'URSULINE TECHNOLOGY · SMA REGINA PACIS SURAKARTA';

// id = anchor namespace for the combined volume; src = markdown file
const PARTS = [
  { id:'index',     src:'README.md',       out:'U-TECH-Docs-Index',
    title:'U-TECH Website', sub:'Documentation Index · Indeks Dokumentasi',
    partLabel:'Index', partTitle:'Documentation Index',
    partSub:'Where everything lives · Di mana semuanya berada' },
  { id:'hb-en',     src:'HANDBOOK.en.md',  out:'U-TECH-Handbook-EN',
    title:'U-TECH Website', sub:'Maintainer Handbook · English',
    partLabel:'Part 1', partTitle:'Maintainer Handbook',
    partSub:'English — architecture, pages, cookbook, deployment' },
  { id:'hb-id',     src:'HANDBOOK.id.md',  out:'U-TECH-Handbook-ID',
    title:'Website U-TECH', sub:'Buku Panduan Pengurus · Bahasa Indonesia',
    partLabel:'Bagian 2', partTitle:'Buku Panduan Pengurus',
    partSub:'Bahasa Indonesia — arsitektur, halaman, buku resep, deployment' },
  { id:'fn-en',     src:'FUNCTIONS.en.md', out:'U-TECH-Functions-EN',
    title:'U-TECH Website', sub:'Function & Component Reference · English',
    partLabel:'Part 3', partTitle:'Function & Component Reference',
    partSub:'English — every function and component in src/' },
  { id:'fn-id',     src:'FUNCTIONS.id.md', out:'U-TECH-Functions-ID',
    title:'Website U-TECH', sub:'Rujukan Fungsi & Komponen · Bahasa Indonesia',
    partLabel:'Bagian 4', partTitle:'Rujukan Fungsi & Komponen',
    partSub:'Bahasa Indonesia — setiap fungsi dan komponen di src/' },
];

const PDF_NAME = {
  'HANDBOOK.en.md':  'U-TECH-Handbook-EN.pdf',
  'HANDBOOK.id.md':  'U-TECH-Handbook-ID.pdf',
  'FUNCTIONS.en.md': 'U-TECH-Functions-EN.pdf',
  'FUNCTIONS.id.md': 'U-TECH-Functions-ID.pdf',
};
const PART_OF_FILE = {
  'HANDBOOK.en.md':  'hb-en',
  'HANDBOOK.id.md':  'hb-id',
  'FUNCTIONS.en.md': 'fn-en',
  'FUNCTIONS.id.md': 'fn-id',
};

const CSS = `
@page { size: A4; margin: 18mm 16mm 20mm 16mm; }

:root {
  --ink:      #14161c;
  --ink-soft: #4a5160;
  --ink-dim:  #6b7280;
  --rule:     #d9dce4;
  --rule-soft:#eceef3;
  --blue:     #3b50c4;
  --green:    #17754a;
  --amber:    #9a6212;
  --code-bg:  #f5f6f9;
  --warn-bg:  #fdf7ec;
  --warn-edge:#d9a43a;
}

* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

body {
  margin: 0;
  font-family: "Segoe UI", -apple-system, "Helvetica Neue", Arial, sans-serif;
  font-size: 9.6pt;
  line-height: 1.62;
  color: var(--ink);
}

/* ── Cover ── */
.cover {
  height: 247mm;
  display: flex;
  flex-direction: column;
  justify-content: center;
  page-break-after: always;
  border-top: 3px solid var(--blue);
  padding-top: 14mm;
}
.cover-eyebrow {
  font-family: "Consolas", "SF Mono", monospace;
  font-size: 8.5pt; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--blue); margin-bottom: 10mm;
}
.cover h1 {
  font-size: 34pt; line-height: 1.04; letter-spacing: -0.022em;
  margin: 0 0 5mm; font-weight: 700; border: 0; padding: 0;
}
.cover .sub {
  font-size: 13pt; color: var(--ink-soft); font-weight: 400;
  margin-bottom: 16mm; letter-spacing: -0.005em;
}
.cover-meta {
  border-top: 1px solid var(--rule); padding-top: 5mm;
  font-family: "Consolas", "SF Mono", monospace; font-size: 8pt;
  color: var(--ink-dim); letter-spacing: 0.05em; line-height: 2;
}
.cover-dots { display: flex; gap: 5mm; margin-bottom: 16mm; }
.cover-dot  { width: 7mm; height: 7mm; border-radius: 50%; }

/* ── Part divider (combined volume only) ── */
.part-divider {
  height: 247mm;
  display: flex; flex-direction: column; justify-content: center;
  page-break-before: always; page-break-after: always;
  border-top: 3px solid var(--blue);
  padding-top: 14mm;
}
.part-label {
  font-family: "Consolas", "SF Mono", monospace;
  font-size: 9pt; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--blue); margin-bottom: 6mm;
}
.part-divider h1 {
  font-size: 27pt; line-height: 1.1; letter-spacing: -0.02em;
  margin: 0 0 4mm; border: 0; padding: 0; page-break-before: avoid;
}
.part-divider .part-sub { font-size: 12pt; color: var(--ink-soft); }

/* ── Master contents (combined volume only) ── */
.master-toc { page-break-after: always; }
.master-toc h2 { margin-top: 0; }
.mt-row {
  display: flex; gap: 4mm; align-items: baseline;
  padding: 2.4mm 0; border-bottom: 0.5pt solid var(--rule-soft);
}
.mt-num {
  font-family: "Consolas", "SF Mono", monospace; font-size: 8pt;
  letter-spacing: 0.14em; color: var(--blue); width: 22mm; flex-shrink: 0;
  text-transform: uppercase;
}
.mt-title { font-weight: 600; font-size: 10.5pt; }
.mt-desc  { color: var(--ink-soft); font-size: 9pt; }

/* ── Headings ── */
h1, h2, h3, h4, h5, h6 {
  font-weight: 650; letter-spacing: -0.014em; line-height: 1.25;
  color: var(--ink); page-break-after: avoid; break-after: avoid;
}
h1 {
  font-size: 19pt; margin: 0 0 6mm; padding-bottom: 3mm;
  border-bottom: 2px solid var(--blue); page-break-before: always;
}
h1:first-of-type { page-break-before: avoid; }
h2 {
  font-size: 14pt; margin: 9mm 0 3.5mm; padding-bottom: 2mm;
  border-bottom: 1px solid var(--rule);
}
h3 { font-size: 11.5pt; margin: 7mm 0 2.5mm; color: #23262f; }
h4 { font-size: 10.2pt; margin: 5.5mm 0 2mm; color: var(--ink-soft); }
h5, h6 { font-size: 9.6pt; margin: 4.5mm 0 2mm; color: var(--ink-soft); }

p { margin: 0 0 3mm; orphans: 3; widows: 3; }

a { color: var(--blue); text-decoration: none; border-bottom: 0.4pt solid #b9c2ea; }

/* ── Code ── */
code {
  font-family: "Consolas", "SF Mono", "Liberation Mono", monospace;
  font-size: 0.875em; background: var(--code-bg);
  border: 0.5pt solid var(--rule-soft); border-radius: 2pt;
  padding: 0.1em 0.34em;
  /* Break only when the token genuinely cannot fit, so identifiers and file
     paths are not split mid-word inside narrow table cells. */
  word-break: normal; overflow-wrap: break-word;
}
pre {
  background: var(--code-bg); border: 0.6pt solid var(--rule);
  border-left: 2.4pt solid var(--blue); border-radius: 2pt;
  padding: 3mm 3.6mm; margin: 0 0 4mm; overflow: hidden;
  page-break-inside: avoid; break-inside: avoid;
}
pre code {
  background: none; border: 0; padding: 0;
  font-size: 8.1pt; line-height: 1.52;
  white-space: pre-wrap; word-break: break-word;
}
pre.long { page-break-inside: auto; break-inside: auto; }

/* ── Tables ── */
table {
  width: 100%; border-collapse: collapse; margin: 0 0 4.5mm;
  font-size: 8.6pt; page-break-inside: avoid; break-inside: avoid;
}
table.long { page-break-inside: auto; break-inside: auto; }
thead { display: table-header-group; }
th, td {
  border: 0.5pt solid var(--rule); padding: 1.5mm 2.2mm;
  text-align: left; vertical-align: top; line-height: 1.45;
}
th { background: #eef0f6; font-weight: 650; }
tbody tr:nth-child(even) { background: #fafbfd; }
td code, th code { font-size: 0.9em; background: #fff; }

/* ── Lists ── */
ul, ol { margin: 0 0 3.5mm; padding-left: 5.6mm; }
li { margin-bottom: 1.3mm; }
li > ul, li > ol { margin-top: 1.3mm; margin-bottom: 0; }

/* ── Callout ── */
blockquote {
  margin: 0 0 4mm; padding: 2.6mm 3.4mm;
  background: var(--warn-bg); border-left: 2.4pt solid var(--warn-edge);
  border-radius: 2pt; color: #5c4a22; page-break-inside: avoid;
}
blockquote p:last-child { margin-bottom: 0; }
blockquote code { background: #fff; border-color: #e4d6b4; }

hr { border: 0; border-top: 1px solid var(--rule); margin: 7mm 0; }
strong { font-weight: 650; }
em { font-style: italic; }
`;

/**
 * GitHub-compatible heading slug. Punctuation is dropped and then EACH
 * remaining space becomes one hyphen — so "data layer — the files" keeps the
 * double hyphen ("data-layer--the-files") that the hand-written table-of-
 * contents links rely on. Collapsing whitespace here would break those links.
 */
function slugify(s) {
  return s.trim().toLowerCase().replace(/[^\w\s-]/gu, '').replace(/ /g, '-');
}

/**
 * Convert one document to HTML.
 * @param {object} part     entry from PARTS
 * @param {boolean} combined  true when building the single merged volume
 */
function toHtml(part, combined) {
  let md = fs.readFileSync(path.join(DOCS, part.src), 'utf8');

  // The cover or part divider carries the title, so drop the leading H1.
  md = md.replace(/^#\s+.*\r?\n/, '');

  // Namespace this document's own anchors FIRST. Doing it after the
  // cross-document rewrite below would also rewrite the #part-* targets that
  // rewrite introduces, producing dead links like "#index--part-hb-en".
  if (combined) {
    md = md.replace(/\]\(#([^)]+)\)/g, (_m, a) => `](#${part.id}--${a})`);
  }

  // Rewrite links between documents: to the sibling PDF when building the
  // individual files, or to the part divider when building the combined one.
  for (const [mdName, pdfName] of Object.entries(PDF_NAME)) {
    const esc = mdName.replace(/\./g, '\\.');
    const target = combined ? `#part-${PART_OF_FILE[mdName]}` : pdfName;
    if (!combined) {
      md = md.replace(new RegExp(`\\[[^\\]]*?${esc}\\]\\((?:docs/)?${esc}\\)`, 'g'),
                      `[${pdfName}](${target})`);
    }
    md = md.replace(new RegExp(`\\]\\((?:docs/)?${esc}\\)`, 'g'), `](${target})`);
  }

  // Any remaining link to a file outside this PDF would be dead on paper.
  // Keep the text, drop the link.
  md = md.replace(/\[([^\]]+)\]\((?:\.\.\/|\.\/)?[^)]*\.md\)/g, '$1');

  marked.setOptions({ gfm: true, breaks: false, mangle: false, headerIds: false });
  let html = marked.parse(md);

  // Re-add heading ids ourselves so they can be namespaced predictably, with
  // GitHub-style -1/-2 suffixes when the same heading text repeats (several
  // "draw() — Animation loop" headings do). The first occurrence keeps the bare
  // slug, so table-of-contents links continue to resolve.
  const used = new Map();
  html = html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
    const plain = inner.replace(/<[^>]+>/g, '');
    let id = slugify(plain);
    const n = used.get(id) ?? 0;
    used.set(id, n + 1);
    if (n > 0) id = `${id}-${n}`;
    return `<h${lvl} id="${(combined ? `${part.id}--` : '') + id}">${inner}</h${lvl}>`;
  });

  // Let oversized tables and code blocks split across pages instead of clipping.
  html = html.replace(/<table>([\s\S]*?)<\/table>/g, (m, inner) =>
    (inner.match(/<tr>/g) || []).length > 14 ? `<table class="long">${inner}</table>` : m);
  html = html.replace(/<pre>([\s\S]*?)<\/pre>/g, (m, inner) =>
    (inner.match(/\n/g) || []).length > 26 ? `<pre class="long">${inner}</pre>` : m);

  return html;
}

const today = new Date().toISOString().slice(0, 10);

function coverBlock(title, sub) {
  return `<div class="cover">
  <div class="cover-eyebrow">${BRAND}</div>
  <div class="cover-dots">
    <div class="cover-dot" style="background:#3b50c4"></div>
    <div class="cover-dot" style="background:#17754a"></div>
    <div class="cover-dot" style="background:#d98c1a"></div>
  </div>
  <h1>${title}</h1>
  <div class="sub">${sub}</div>
  <div class="cover-meta">
    Generated ${today}<br>
    Source: github.com/elitcx/utech-website<br>
    Stack: React 18 · React Router 6 · Vite 6
  </div>
</div>`;
}

function page(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<style>${CSS}</style></head><body>
${bodyHtml}
</body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });

// ── Individual documents ────────────────────────────────────────────────────
for (const part of PARTS) {
  const body = coverBlock(part.title, part.sub) + '\n' + toHtml(part, false);
  const p = path.join(OUT, part.out + '.html');
  fs.writeFileSync(p, page(`${part.title} — ${part.sub}`, body), 'utf8');
  console.log('HTML  ' + part.out + '.html');
}

// ── Combined volume ─────────────────────────────────────────────────────────
const tocRows = PARTS.map(p => `  <div class="mt-row">
    <div class="mt-num">${p.partLabel}</div>
    <div><div class="mt-title">${p.partTitle}</div>
         <div class="mt-desc">${p.partSub}</div></div>
  </div>`).join('\n');

const combinedBody = [
  coverBlock('U-TECH Website', 'Complete Documentation · Dokumentasi Lengkap'),
  `<div class="master-toc">
  <h2 id="whats-inside">What is inside / Isi dokumen</h2>
  <p>This volume collects every documentation file for the URSU Technology
  website. Each part is also published as its own PDF.</p>
  <p>Dokumen ini mengumpulkan seluruh berkas dokumentasi website URSU Technology.
  Setiap bagian juga diterbitkan sebagai PDF tersendiri.</p>
${tocRows}
  <p style="margin-top:6mm"><strong>English readers</strong> want Part 1 and Part 3.
  <strong>Pembaca Bahasa Indonesia</strong> silakan ke Bagian 2 dan Bagian 4.
  The two languages carry the same content.</p>
</div>`,
  ...PARTS.map(p => `<div class="part-divider" id="part-${p.id}">
  <div class="part-label">${p.partLabel}</div>
  <h1>${p.partTitle}</h1>
  <div class="part-sub">${p.partSub}</div>
</div>
${toHtml(p, true)}`),
].join('\n');

fs.writeFileSync(path.join(OUT, 'U-TECH-Documentation-Complete.html'),
  page('U-TECH Website — Complete Documentation', combinedBody), 'utf8');
console.log('HTML  U-TECH-Documentation-Complete.html');
