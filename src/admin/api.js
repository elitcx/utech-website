// Talks to the /api/admin serverless function. The session token (not the password)
// is kept in sessionStorage and disappears when the tab is closed.
const KEY = 'ursu_admin_session';

export const getToken = () => { try { return sessionStorage.getItem(KEY); } catch { return null; } };
export const setToken = t => { try { sessionStorage.setItem(KEY, t); } catch { /* private mode */ } };
export const clearToken = () => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } };

async function post(payload) {
  let res;
  try {
    res = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch { throw Object.assign(new Error('Could not reach the server.'), { status: 0 }); }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(json.error || `Error ${res.status}`), { status: res.status });
  return json;
}

export const login = async password => (await post({ action: 'login', password })).token;
export const loadSite = () => post({ action: 'load', token: getToken() });
export const saveSite = (data, sha) => post({ action: 'save', token: getToken(), data, sha }).then(r => r.sha);

// Shrinks the picture in the browser (max 1600px, WebP) before sending it.
export async function uploadImage(file) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise(r => canvas.toBlob(r, 'image/webp', 0.85));
  const data = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(String(fr.result).split(',')[1]); fr.readAsDataURL(blob); });
  return (await post({ action: 'upload', token: getToken(), name: file.name, type: 'image/webp', data })).path;
}
