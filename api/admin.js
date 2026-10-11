// Serverless endpoint behind the admin dashboard (Vercel function).
// The password and the GitHub token live ONLY in server environment variables:
//   ADMIN_PASSWORD  – what managers type into the terminal
//   GITHUB_TOKEN    – fine-grained token, Contents: read & write on this repo only
//   GITHUB_REPO     – optional, defaults to elitcx/utech-website
//   GITHUB_BRANCH   – optional, defaults to main
//   ADMIN_LOCAL_FS  – dev only: read/write the local files instead of GitHub
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const REPO = process.env.GITHUB_REPO || 'elitcx/utech-website';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const DATA_FILE = 'src/data/site.json';
const SESSION_MS = 8 * 60 * 60 * 1000;
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DIVS = ['metaverse', 'robotics', 'printing'];
const PROJECT_DIVS = ['all', ...DIVS];

const sha256 = s => crypto.createHash('sha256').update(s).digest();
const safeEqual = (a, b) => crypto.timingSafeEqual(sha256(String(a)), sha256(String(b)));
const sign = exp => crypto.createHmac('sha256', process.env.ADMIN_PASSWORD).update(String(exp)).digest('hex');
const makeToken = () => { const exp = Date.now() + SESSION_MS; return `${exp}.${sign(exp)}`; };
const checkToken = t => {
  const [exp, mac] = String(t || '').split('.');
  return Boolean(exp && mac) && Number(exp) > Date.now() && safeEqual(mac, sign(exp));
};

/* ── storage: GitHub (production) or local disk (dev) ───────────── */
const gh = async (p, opts = {}) => {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${p}`, {
    ...opts,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) throw Object.assign(new Error(`GitHub ${res.status}`), { status: res.status });
  return res.json();
};

const local = process.env.ADMIN_LOCAL_FS === '1';
const hashOf = text => crypto.createHash('sha1').update(text).digest('hex');

async function readSite() {
  if (local) {
    const text = await fs.readFile(DATA_FILE, 'utf8');
    return { data: JSON.parse(text), sha: hashOf(text) };
  }
  const f = await gh(`${DATA_FILE}?ref=${BRANCH}&t=${Date.now()}`);
  return { data: JSON.parse(Buffer.from(f.content, 'base64').toString('utf8')), sha: f.sha };
}

async function writeSite(data, sha) {
  const text = JSON.stringify(data, null, 2) + '\n';
  if (local) {
    if (hashOf(await fs.readFile(DATA_FILE, 'utf8')) !== sha) throw Object.assign(new Error('conflict'), { status: 409 });
    await fs.writeFile(DATA_FILE, text);
    return hashOf(text);
  }
  const r = await gh(DATA_FILE, {
    method: 'PUT',
    body: JSON.stringify({
      message: 'Update site content via admin dashboard', branch: BRANCH, sha,
      content: Buffer.from(text).toString('base64'),
    }),
  });
  return r.content.sha;
}

async function writeImage(name, buf) {
  const rel = `public/uploads/${name}`;
  if (local) { await fs.mkdir(path.dirname(rel), { recursive: true }); await fs.writeFile(rel, buf); return; }
  await gh(rel, { method: 'PUT', body: JSON.stringify({ message: `Upload ${name} via admin dashboard`, branch: BRANCH, content: buf.toString('base64') }) });
}

/* ── validation ─────────────────────────────────────────────────── */
function validate(d) {
  const err = m => { throw Object.assign(new Error(m), { status: 400 }); };
  const str = (v, what) => { if (typeof v !== 'string') err(`${what} must be text`); };
  if (!d || typeof d !== 'object') err('Invalid data');
  for (const k of ['events', 'team', 'projects', 'timeline', 'gallery']) if (!Array.isArray(d[k])) err(`${k} missing`);
  if (!d.signup || typeof d.signup.isOpen !== 'boolean') err('signup invalid');
  if (!d.stats || !d.divisions) err('stats missing');
  for (const k of DIVS) {
    const v = d.divisions[k];
    if (!v || !Array.isArray(v.tags)) err(`division ${k} invalid`);
  }
  d.events.forEach(e => {
    str(e.title, 'Event title'); if (!e.title.trim()) err('Every event needs a title');
    if (!MONTHS.includes(e.month)) err(`Bad month on "${e.title}"`);
    const day = Number(e.day); if (!(day >= 1 && day <= 31)) err(`Bad day on "${e.title}"`);
    if (!Number.isInteger(Number(e.year))) err(`Bad year on "${e.title}"`);
  });
  d.projects.forEach(p => {
    str(p.name, 'Project name'); if (!p.name.trim()) err('Every project needs a name');
    if (!PROJECT_DIVS.includes(p.division)) err(`Bad division on "${p.name}"`);
  });
  d.team.forEach(m => { str(m.name, 'Member name'); if (!m.name.trim()) err('Every team member needs a name'); });
  if (JSON.stringify(d).length > 400_000) err('Data too large');
}

const MAGIC = {
  webp: b => b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP',
  jpg: b => b[0] === 0xff && b[1] === 0xd8,
  png: b => b.subarray(1, 4).toString() === 'PNG',
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const fail = (code, error) => res.status(code).json({ error });
  if (req.method !== 'POST') return fail(405, 'Method not allowed');
  if (!process.env.ADMIN_PASSWORD) return fail(500, 'Admin is not configured on the server.');
  if (!local && !process.env.GITHUB_TOKEN) return fail(500, 'GITHUB_TOKEN is not configured on the server.');

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  try {
    if (body.action === 'login') {
      if (safeEqual(body.password ?? '', process.env.ADMIN_PASSWORD)) return res.status(200).json({ token: makeToken() });
      await new Promise(r => setTimeout(r, 1200)); // slow down guessing
      return fail(401, 'Wrong password.');
    }
    if (!checkToken(body.token)) return fail(401, 'Session expired. Log in again.');

    if (body.action === 'load') return res.status(200).json(await readSite());
    if (body.action === 'save') {
      validate(body.data);
      return res.status(200).json({ sha: await writeSite(body.data, body.sha) });
    }
    if (body.action === 'upload') {
      const ext = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' }[body.type];
      if (!ext) return fail(400, 'Only WebP, JPEG or PNG images.');
      const buf = Buffer.from(String(body.data || ''), 'base64');
      if (!buf.length || buf.length > 3_000_000) return fail(400, 'Image must be under 3 MB.');
      if (!MAGIC[ext](buf)) return fail(400, 'File is not a valid image.');
      const slug = String(body.name || 'image').toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'image';
      const name = `${slug}-${Date.now().toString(36)}.${ext}`;
      await writeImage(name, buf);
      return res.status(200).json({ path: `/uploads/${name}` });
    }
    return fail(400, 'Unknown action.');
  } catch (e) {
    if (e.status === 409 || e.status === 422) return fail(409, 'The site data changed since you loaded it. Reload the dashboard and re-apply your edits.');
    return fail(e.status && e.status < 500 ? e.status : 500, e.status === 400 ? e.message : 'Server error.');
  }
}
