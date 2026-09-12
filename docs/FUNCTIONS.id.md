# Website U-TECH — Rujukan Fungsi & Komponen (Bahasa Indonesia)

> **English:** [FUNCTIONS.en.md](FUNCTIONS.en.md)
> **Buku panduan utama:** [HANDBOOK.id.md](HANDBOOK.id.md)

Setiap fungsi dan setiap komponen di `src/`, sesuai urutan file, beserta
tanda tangannya, apa yang dikembalikan, apa yang dilakukan, siapa yang
memanggilnya, dan hal-hal yang bisa membuatmu tersandung.

Tidak ada yang dilewatkan — termasuk fungsi panah satu baris yang tersarang di
dalam efek, karena justru itulah yang menyebabkan bug membingungkan.

**Cara membaca satu entri:**

- **Jenis** — Komponen, Hook, Pembantu, Penangan kejadian, Loop animasi, atau
  Pabrik (factory).
- **Dipanggil oleh** — siapa yang menjalankannya. "React" berarti kamu tidak
  pernah memanggilnya sendiri; React yang melakukannya saat render. "Browser"
  berarti browser memanggilnya ketika sebuah kejadian terjadi.
- **Mengembalikan** — apa yang dihasilkan. Komponen mengembalikan JSX. Efek
  mengembalikan fungsi pembersih atau tidak mengembalikan apa pun.

Catatan tentang kata *komponen*: komponen hanyalah fungsi yang mengembalikan JSX
dan namanya dimulai dengan huruf kapital. React memanggilnya untukmu. Semua hal
lain di dokumen ini adalah fungsi biasa.

---

## Isi

- [Indeks ringkas](#indeks-ringkas)
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
- [24. Fungsi React yang dipakai](#24-fungsi-react-yang-dipakai)
- [25. API browser yang dipakai](#25-api-browser-yang-dipakai)
- [26. Fungsi bawaan JavaScript yang dipakai](#26-fungsi-bawaan-javascript-yang-dipakai)
- [27. Pola yang berulang](#27-pola-yang-berulang)

---

## Indeks ringkas

**Komponen — 26 total.** 7 adalah halaman, 3 dipakai bersama, 8 adalah bagian
halaman utama, 6 adalah ilustrasi kanvas, 4 adalah pembantu kecil di dalam
halaman.

| Komponen | File | Jenis |
|---|---|---|
| `App` | `App.jsx:17` | Akar — memuat router |
| `ScrollToTop` | `App.jsx:11` | Komponen efek samping tak terlihat |
| `Nav` | `components/Nav.jsx:17` | Bersama |
| `Footer` | `components/Footer.jsx:3` | Bersama |
| `Marquee` | `components/Marquee.jsx:7` | Bersama |
| `Home` | `pages/Home/index.jsx:13` | Halaman |
| `Hero` | `pages/Home/Hero.jsx:328` | Bagian beranda |
| `MetaverseCanvas` | `pages/Home/Hero.jsx:6` | Kanvas |
| `RoboticsCanvas` | `pages/Home/Hero.jsx:108` | Kanvas |
| `PrintingCanvas` | `pages/Home/Hero.jsx:202` | Kanvas |
| `DivisionsShowcase` | `pages/Home/DivisionsShowcase.jsx:70` | Bagian beranda |
| `Terminal` | `pages/Home/Terminal.jsx:118` | Bagian beranda |
| `HomeAbout` | `pages/Home/HomeAbout.jsx:3` | Bagian beranda |
| `Pillars` | `pages/Home/Pillars.jsx:85` | Bagian beranda |
| `HomeEvents` | `pages/Home/HomeEvents.jsx:19` | Bagian beranda |
| `CTA` | `pages/Home/CTA.jsx:4` | Bagian beranda |
| `About` | `pages/About.jsx:379` | Halaman |
| `Lightbox` | `pages/About.jsx:66` | Komponen pembantu |
| `GalleryItem` | `pages/About.jsx:90` | Komponen pembantu |
| `PortfolioCard` | `pages/About.jsx:114` | Komponen pembantu |
| `LeadershipTunnel` | `pages/About.jsx:149` | Komponen pembantu (besar) |
| `Events` | `pages/Events.jsx:11` | Halaman |
| `Join` | `pages/Join.jsx:84` | Halaman |
| `SignupPanel` | `pages/Join.jsx:35` | Komponen pembantu |
| `Metaverse` | `pages/divisions/Metaverse.jsx:69` | Halaman |
| `HeroCanvas` | `pages/divisions/Metaverse.jsx:10` | Kanvas |
| `Robotics` | `pages/divisions/Robotics.jsx:90` | Halaman |
| `ArduinoCanvas` | `pages/divisions/Robotics.jsx:10` | Kanvas |
| `LiveSensors` | `pages/divisions/Robotics.jsx:48` | Komponen pembantu |
| `Printing` | `pages/divisions/Printing.jsx:82` | Halaman |
| `PrinterCanvas` | `pages/divisions/Printing.jsx:10` | Kanvas |

**Fungsi bernama yang bukan komponen.**

| Fungsi | File | Kegunaan |
|---|---|---|
| `useReveal` | `hooks/useReveal.js:3` | Hook khusus — muncul memudar saat discroll |
| `isUpcoming` | `data/events.js:31` | Apakah acara ini hari ini atau setelahnya? |
| `getJoinOutput` | `Home/Terminal.jsx:85` | Membangun keluaran perintah `join` |
| `typeTagStyle` | `Events.jsx:34` | Menurunkan tiga warna dari satu heks |
| `rot` | `Hero.jsx:29`, `Metaverse.jsx:22` | Rotasi 3-D pada X, Y, Z |
| `proj` | `Hero.jsx:36`, `Metaverse.jsx:23` | Proyeksi perspektif 3-D ke 2-D |
| `lerp` | `Hero.jsx:133`, `Robotics.jsx:20` | Interpolasi linear |
| `getPt` | `Hero.jsx:134`, `Robotics.jsx:21` | Titik di sepanjang jalur banyak segmen |
| `getBedY` | `Hero.jsx:220`, `Printing.jsx:18` | Posisi Y meja cetak |
| `modelW` | `Hero.jsx:221`, `Printing.jsx:19` | Setengah lebar objek yang dicetak |
| `getAlpha` | `About.jsx:193` | Opasitas dari kedalaman lorong |
| `draw` | 6 komponen kanvas | Satu frame animasi |
| `tick` | `About.jsx:224` | Frame animasi lorong |
| `runCmd` | `Terminal.jsx:133` | Menjalankan perintah terminal |
| `renderLine` | `Terminal.jsx:193` | Mengubah objek baris menjadi JSX |
| `injectCmd` | `Terminal.jsx:187` | Mengetik dan menjalankan perintah untuk pengguna |
| `scrollBody` | `Terminal.jsx:129` | Men-scroll keluaran terminal ke bawah |

---

## 1. `src/main.jsx`

**Tidak ada fungsi yang dideklarasikan.** Ini titik masuk — ia mengimpor dua
stylesheet global dan memasang aplikasinya:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
```

`createRoot` dan `render` adalah fungsi React, didokumentasikan di bagian 24.

---

## 2. `src/App.jsx`

### `ScrollToTop()` — Komponen

- **File:** `src/App.jsx:11`
- **Props:** tidak ada
- **Mengembalikan:** `null` — tidak menggambar apa pun
- **Dipanggil oleh:** React, pada setiap render `App`

```jsx
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
```

Membaca path saat ini dari router, dan setiap kali path itu berubah, men-scroll
jendela ke atas.

Ini **komponen khusus efek samping**: komponen yang ada semata untuk menjalankan
sebuah hook, bukan untuk menggambar. Mengembalikan `null` itu sah dan normal.
Alternatifnya adalah menduplikasi `useEffect` ini di ketujuh halaman.

**Mengapa dibutuhkan:** dalam aplikasi satu halaman, navigasi tidak mengatur
ulang posisi scroll. Tanpa ini, mengklik tautan footer dari tengah halaman utama
akan mendaratkanmu di tengah halaman baru.

**Jebakan:** karena ia men-scroll pada *setiap* perubahan path, ia juga akan
bertentangan dengan fitur "pulihkan posisi scroll saat tombol kembali" di masa
depan. Kalau kamu menambahkannya, komponen inilah yang perlu diubah.

### `App()` — Komponen

- **File:** `src/App.jsx:17`
- **Props:** tidak ada
- **Mengembalikan:** pohon router
- **Dipanggil oleh:** `main.jsx`, sekali

Membungkus semuanya dalam `BrowserRouter`, memasang `ScrollToTop`, dan
mendeklarasikan tujuh rute. Inilah seluruh konfigurasi routing situs ini.

**Jebakan:** tidak ada `<Route path="*">`, jadi URL yang tidak dikenal tidak
me-render apa pun — halaman putih kosong tanpa nav dan tanpa footer.

---

## 3. `src/hooks/useReveal.js`

### `useReveal()` — Hook khusus

- **File:** `src/hooks/useReveal.js:3`
- **Parameter:** tidak ada
- **Mengembalikan:** objek ref React, untuk dilekatkan ke satu elemen DOM
- **Dipanggil oleh:** 20+ komponen, di bagian atas badan fungsinya

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

Membuat sebuah ref, mengawasi elemen yang akhirnya ditunjuknya, dan menambahkan
kelas CSS `visible` saat pertama kali 12% elemen itu masuk ke layar. Kelas itulah
yang memicu animasi memudar-dan-naik yang didefinisikan di `shared.css`.

**Pemakaiannya selalu dua bagian:**

```jsx
const ref = useReveal();
<div className="reveal" ref={ref}>…</div>
```

Lupa `className="reveal"` dan tidak terjadi apa-apa. Lupa `ref` dan kontennya
tetap tak terlihat selamanya, karena `.reveal` menyetel `opacity: 0`.

**Fungsi tersarang — callback observer.** `([entry]) => { … }` mendestrukturkan
elemen pertama dari array yang dikirim browser. Satu observer yang mengawasi satu
elemen selalu menerima array berisi satu item.

**Mengapa ia kembali awal pada `if (!el) return;`** — sebagai pertahanan. Kalau
ref-nya tidak pernah dilekatkan ke apa pun, `ref.current` bernilai `null` dan
`observe(null)` akan melempar galat.

**Mengapa `obs.disconnect()`** — ini fungsi pembersihnya. Ia berjalan ketika
komponennya dilepas. Tanpanya, setiap kunjungan halaman akan meninggalkan satu
observer yang masih hidup.

**Jebakan:** satu hook per elemen. Bagian dengan empat blok yang beranimasi
mandiri butuh empat panggilan, itulah sebabnya kamu melihat
`const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();`
di `Join.jsx`. Memakai ulang satu ref pada dua elemen membuat hanya yang terakhir
beranimasi.

---

## 4. `src/config/signup.js`

**Tidak ada fungsi.** Dua konstanta yang diekspor: `SIGNUP_CONFIG` (objek dengan
`isOpen`, `googleFormUrl`, `nextIntakeDate`, `showNextIntakeDate`) dan
`CONTACT_URL` (sebuah string).

Dibaca oleh `Join.jsx`, `Terminal.jsx`, dan `Footer.jsx`. Lihat buku panduan,
bagian 7.1.

---

## 5. `src/data/events.js`

### `isUpcoming(e)` — Pembantu

- **File:** `src/data/events.js:31`
- **Parameter:** `e` — satu objek acara dari `ALL_EVENTS`
- **Mengembalikan:** `boolean` — `true` kalau acaranya hari ini atau di masa depan
- **Dipanggil oleh:** `Events.jsx` (dua kali), `HomeEvents.jsx`

```js
const MONTH_INDEX = { JAN:0, FEB:1, /* … */ DEC:11 };

export const isUpcoming = e =>
  new Date(e.year, MONTH_INDEX[e.month], Number(e.day)) >=
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
```

Membangun sebuah `Date` dari field `year`, `month`, dan `day` acara, lalu
membandingkannya dengan hari ini.

**Dua detail yang penting.** `MONTH_INDEX` mengubah `'OCT'` menjadi `9`, karena
bulan di JavaScript dimulai dari nol. Dan sisi kanannya membangun ulang tanggal
hari ini dari bagian tahun, bulan, dan harinya, yang **membuang waktu jamnya** —
perbandingannya terhadap tengah malam pagi ini, bukan terhadap saat ini juga. Itu
disengaja: acara yang berlangsung pukul 14.00 hari ini tetap terhitung mendatang
pada pukul 16.00.

**Fungsi inilah sebabnya kamu tidak pernah menandai acara sebagai "lampau".**
Sehari setelah sebuah acara, ia keluar dari semua daftar secara otomatis.

**Jebakan:** salah ketik pada `month` (`'SEPT'` bukan `'SEP'`) membuat
`MONTH_INDEX[e.month]` mengembalikan `undefined`, yang membuat `Date`-nya tidak
valid, yang membuat perbandingannya `false`. Acaranya hilang diam-diam tanpa
galat. Kalau acara yang kamu tambahkan tidak muncul, periksa ejaan bulannya dulu.

---

## 6. `src/data/projects.js`

**Tidak ada fungsi.** Dua konstanta yang diekspor: `STATUS_COLORS` (nama status →
warna) dan `DIVISION_PROJECTS` (kunci divisi → array objek proyek).

Dibaca oleh `Hero.jsx`, `DivisionsShowcase.jsx`, `Terminal.jsx`, dan ketiga
halaman divisi.

---

## 7. `src/components/Nav.jsx`

### `Nav()` — Komponen

- **File:** `src/components/Nav.jsx:17`
- **Props:** tidak menerima apa pun
- **Mengembalikan:** bilah atas tetap plus overlay mobile
- **Dipanggil oleh:** setiap halaman, secara manual

Menyimpan tiga state: `scrolled`, `menuOpen`, `divOpen`. Me-render baris tautan
desktop dengan dropdown hover untuk divisi, tombol hamburger, dan overlay mobile
layar penuh.

**Jebakan — prop mati.** Ketiga halaman divisi memanggilnya sebagai
`<Nav active="metaverse.html" />`. `Nav` tidak mendeklarasikan parameter apa pun,
jadi prop ini diabaikan diam-diam. Ini sisa dari masa ketika situs ini berupa
file HTML statis. Tidak berbahaya, tetapi jangan menambah prop lain dengan harapan
berfungsi.

### `fn()` — Penangan kejadian (scroll)

- **File:** `src/components/Nav.jsx:26`
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** browser, pada setiap kejadian scroll

```js
const fn = () => setScrolled(window.scrollY > 30);
```

Menyetel `scrolled` menjadi `true` setelah halaman discroll lebih dari 30 piksel,
yang menambahkan kelas `scrolled` dan mengecilkan bilahnya dari 64 px ke 56 px.

Ia didaftarkan dan dihapus di dalam `useEffect` berdependensi kosong, jadi
terpasang sekali saat mount dan terlepas saat unmount.

**Catatan soal namanya.** `fn` adalah nama yang buruk — tidak mengatakan apa pun.
Kalau kamu menyentuh kode ini, ganti namanya menjadi `onScroll` supaya cocok
dengan konvensi yang dipakai di seluruh proyek.

**Catatan soal efisiensi.** Ia memanggil `setScrolled` pada setiap kejadian
scroll, bahkan ketika nilainya tidak berubah. React membatalkan render ulang
ketika nilai state-nya identik, jadi ini murah dalam praktik, tetapi menambahkan
perbandingan akan lebih bersih.

### `close()` — Penangan kejadian

- **File:** `src/components/Nav.jsx:37`
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** tombol tutup mobile, dan setiap tautan nav mobile

```js
const close = () => { setMenuOpen(false); setDivOpen(false); };
```

Menutup kedua menu sekaligus. Dipakai untuk tombol ✕ dan dilekatkan ke setiap
tautan mobile via `onClick={close}` supaya menyentuh tautan membubarkan
overlay-nya sembari bernavigasi.

### `useEffect` kedua — menutup otomatis saat navigasi

- **File:** `src/components/Nav.jsx:32`

```js
useEffect(() => { setMenuOpen(false); setDivOpen(false); }, [location.pathname]);
```

Bukan fungsi bernama, tetapi layak dicantumkan karena ketidakhadirannya akan
menjadi bug yang terlihat. Ia mengawasi path dan menutup kedua menu setiap kali
path berubah. Tanpanya, overlay mobile akan tetap terbuka di atas halaman yang
baru kamu tuju.

### Penangan inline pada dropdown

Empat fungsi panah kecil ditulis langsung di JSX-nya:

| Penangan | Baris | Melakukan |
|---|---|---|
| `onMouseEnter={() => setDivOpen(true)}` | 61 | Membuka dropdown saat hover |
| `onMouseLeave={() => setDivOpen(false)}` | 62 | Menutupnya saat penunjuk keluar |
| `onClick={() => setDivOpen(v => !v)}` | 69 | Menyalakan/mematikan — cadangan perangkat sentuh |
| `onKeyDown={e => e.key === 'Escape' && setDivOpen(false)}` | 70 | Menutupnya saat Escape |

Saklarnya memakai **bentuk pembaru** `setDivOpen(v => !v)` alih-alih
`setDivOpen(!divOpen)`. Bentuk pembaru menerima nilai saat ini sebagai argumen,
jadi ia selalu benar bahkan kalau beberapa pembaruan mengantre dalam satu tick.
Utamakan bentuk ini setiap kali state baru bergantung pada yang lama.

Dua penangan inline lain menyetel latar hover item dropdown secara langsung:

```jsx
onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
```

Ini menulis ke inline style elemen DOM alih-alih memakai aturan CSS `:hover`.
Berfungsi, tetapi ini satu-satunya yang berbeda di basis kode ini — aturan
`:hover` di `shared.css` akan menjadi pilihan yang konsisten.

---

## 8. `src/components/Footer.jsx`

### `Footer()` — Komponen

- **File:** `src/components/Footer.jsx:3`
- **Props:** tidak ada
- **Mengembalikan:** bilah footer
- **Dipanggil oleh:** setiap halaman, secara manual

Satu-satunya bagian yang tidak statis adalah `href={CONTACT_URL}`, diimpor dari
konfigurasi. Logo, URL Instagram dan GitHub, tahun, serta kredit penulis semuanya
teks literal.

**Jebakan:** `© 2026` ditulis langsung. Ganti dengan `{new Date().getFullYear()}`
kalau kamu tidak ingin mengingatnya setiap Januari.

---

## 9. `src/components/Marquee.jsx`

### `Marquee({ items, color })` — Komponen

- **File:** `src/components/Marquee.jsx:7`
- **Props:**
  - `items` — array string. Bawaannya `DEFAULT_ITEMS`, daftar kata kunci
    teknologi umum.
  - `color` — `'green'`, `'amber'`, atau dihilangkan. Memberi nuansa pada titik
    pemisah.
- **Mengembalikan:** strip ticker bergulir
- **Dipanggil oleh:** `Home/index.jsx`, `Join.jsx`, `About.jsx`, dan ketiga
  halaman divisi

```jsx
export default function Marquee({ items = DEFAULT_ITEMS, color }) {
  const doubled = [...items, ...items];
  …
}
```

**Satu baris yang penting** adalah `const doubled = [...items, ...items];`.
Komponennya me-render daftar itu dua kali, dan CSS menganimasikan track-nya tepat
ke `-50%` dari lebarnya sendiri. Di akhir loop, salinan kedua berada tepat di
posisi awal salinan pertama, jadi pengaturan ulang ke `0` tak terlihat. Itulah
seluruh trik di balik guliran tanpa ujung yang mulus.

Rusakkan salah satu bagiannya — hilangkan penggandaannya, atau ubah `-50%` di
`shared.css` — dan kamu akan mendapat lompatan yang kelihatan sekali per siklus.

**Sintaks parameter bawaan.** `{ items = DEFAULT_ITEMS, color }` mendestrukturkan
objek props dan menyediakan nilai cadangan untuk `items` kalau pemanggilnya tidak
mengirimnya. Ini JavaScript biasa, bukan fitur React.

**Jebakan:** `color` diterima tetapi tidak ada pemanggil yang mengirimnya, jadi
setiap titik di situs berwarna biru. Mulailah memakainya atau hapus parameternya.

---

## 10. `src/pages/Home/index.jsx`

### `Home()` — Komponen (halaman)

- **File:** `src/pages/Home/index.jsx:13`
- **Props:** tidak ada
- **Mengembalikan:** delapan bagian beranda dibungkus dalam sebuah fragment
- **Dipanggil oleh:** router, untuk path `/`

Murni penyusunan — tanpa state, tanpa efek, tanpa logika. Ia mengimpor `home.css`
lalu me-render `Nav`, `Hero`, `Marquee`, `DivisionsShowcase`, `Terminal`,
`HomeAbout`, `Pillars`, `HomeEvents`, `CTA`, `Footer`, dalam urutan itu.

Untuk mengubah urutan halaman utama, pindahkan satu baris di sini. Untuk
menghapus sebuah bagian, hapus satu baris.

---

## 11. `src/pages/Home/Hero.jsx`

File terbesar dalam proyek ini — empat komponen dan sembilan fungsi tersarang.

### `MetaverseCanvas({ active })` — Komponen (kanvas)

- **File:** `src/pages/Home/Hero.jsx:6`
- **Props:** `active` — boolean. Ketika `false`, loop animasinya berhenti sejenak.
- **Mengembalikan:** `<canvas width={580} height={580} />`
- **Dipanggil oleh:** `Hero`

Menggambar adegan biru: kubus wireframe berputar, lantai grid bertitik hilang, 70
partikel melayang, cincin elips mengorbit, dan oktahedron kecil yang mengorbit.
Mengikuti tetikus.

**Lima ref, masing-masing dengan tugas berbeda:**

| Ref | Menyimpan |
|---|---|
| `canvasRef` | elemen DOM `<canvas>` |
| `mouseRef` | posisi kursor `{x, y}` di dalam kanvas |
| `rafRef` | id frame animasi saat ini, supaya bisa dibatalkan |
| `activeRef` | salinan prop `active`, bisa dibaca dari dalam `draw` |
| `restartRef` | fungsi yang memulai ulang loop kalau sudah berhenti |

**Mengapa `activeRef` ada, dan mengapa ini gagasan terpenting dalam file ini.**
Fungsi `draw` dibuat sekali, di dalam efek berdependensi `[]`. Ia menangkap
nilai-nilai yang ada pada saat itu — sebuah **closure** JavaScript. Kalau `draw`
membaca prop `active` secara langsung, ia akan membaca nilai dari render pertama
selamanya. Menyalin prop itu ke sebuah ref memberi `draw` kotak yang bisa
diintipnya untuk nilai terkini:

```jsx
useEffect(() => {
  activeRef.current = active;
  if (active && restartRef.current) restartRef.current();
}, [active]);
```

Ini perbaikan standar untuk "loop animasi saya tidak melihat perubahan prop".

#### `rot(p, rx, ry, rz)` — Pembantu (matematika 3-D)

- **File:** `src/pages/Home/Hero.jsx:29`
- **Parameter:** `p` — sebuah titik sebagai `[x, y, z]`; `rx`, `ry`, `rz` — sudut
  rotasi dalam radian di sekitar setiap sumbu
- **Mengembalikan:** array `[x, y, z]` yang baru
- **Dipanggil oleh:** `draw`, sekali per titik sudut per frame

Menerapkan tiga matriks rotasi secara berurutan: sekitar X, lalu Y, lalu Z.
Ditulis panjang dengan `Math.cos` dan `Math.sin` alih-alih diimpor dari library.
Sepuluh baris menggantikan dependensi 600 KB.

Urutan penting — rotasi tidak komutatif. Mengubah urutannya mengubah animasinya.

#### `proj([x, y, z])` — Pembantu (matematika 3-D)

- **File:** `src/pages/Home/Hero.jsx:36`
- **Parameter:** satu titik sebagai `[x, y, z]`, didestrukturkan di daftar
  parameternya
- **Mengembalikan:** `[screenX, screenY, scale]`
- **Dipanggil oleh:** `draw`, sekali per titik sudut per frame

```js
const proj = ([x,y,z]) => { const f = 500/(500+z+250), cx = W/2, cy = H/2;
                            return [cx+x*f, cy+y*f, f]; };
```

Proyeksi perspektif: mengubah titik 3-D menjadi posisi layar 2-D. `f` adalah
faktor pemendekan — `z` lebih besar (lebih jauh) membuat `f` lebih kecil, jadi
titiknya bergerak ke arah pusat dan mengecil.

**Nilai kembalian ketiga adalah bagian yang pintar.** `f` diserahkan kembali
bersama koordinatnya dan dipakai ulang sebagai pengali opasitas dan ukuran:

```js
ctx.fillStyle = `rgba(85,112,241,${pd})`;   // lebih jauh = lebih transparan
ctx.arc(px, py, 3*pd, …)                     // lebih jauh = titik lebih kecil
```

Satu angka memberimu posisi, pemudaran kedalaman, dan skala. Itulah sebabnya
sisi-sisi kubus yang lebih dekat tampak lebih terang dan lebih tebal daripada
yang jauh.

#### `draw()` — Loop animasi

- **File:** `src/pages/Home/Hero.jsx:37`
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** dirinya sendiri, via `requestAnimationFrame`, sekitar 60
  kali per detik

Me-render satu frame. Urutannya selalu sama: bersihkan kanvas, lalu gambar dari
belakang ke depan — lantai grid, partikel, cahaya pusat, sisi kubus, titik sudut
kubus, cincin mengorbit, oktahedron mengorbit. Canvas 2-D tidak punya pengurutan
z, jadi **urutan menggambar adalah urutan lapisan**.

Ia berakhir dengan ekor penjadwalan-diri:

```js
t++;
if (activeRef.current) { rafRef.current = requestAnimationFrame(draw); }
else                   { rafRef.current = null; }
```

`t` adalah penghitung frame yang menggerakkan setiap animasi — sudut rotasi,
posisi cincin, kedipan LED semuanya fungsi dari `t`. Menyetel
`rafRef.current = null` saat tidak aktif itulah yang memungkinkan `restartRef`
mendeteksi loop yang berhenti.

#### `onMouse(e)` — Penangan kejadian

- **File:** `src/pages/Home/Hero.jsx:98`
- **Parameter:** `e` — kejadian mousemove
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** browser, pada mousemove di kanvas

```js
const onMouse = e => {
  const r = canvas.getBoundingClientRect();
  mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
};
```

Mengubah koordinat halaman menjadi koordinat lokal kanvas dengan mengurangi
posisi kanvas di layar. `e.clientX` relatif terhadap viewport;
`getBoundingClientRect()` memberi tahu di mana kanvasnya berada di viewport;
selisihnya adalah posisi di dalam kanvas.

Ia menulis ke sebuah **ref, bukan state**. Mousemove menyala terus-menerus —
memakai state di sini akan me-render ulang komponennya ratusan kali per detik.
Ref-nya membuat `draw` bisa membaca posisi terkini sesuai jadwalnya sendiri.

#### `restartRef.current` — Pembantu

- **File:** `src/pages/Home/Hero.jsx:102`

```js
restartRef.current = () => { if (!rafRef.current) draw(); };
```

Memulai ulang loopnya, tetapi hanya kalau benar-benar berhenti. Penjaga `if`-nya
mencegah dua loop berjalan bersamaan, yang akan menggandakan kecepatan animasi
dan biaya CPU-nya.

### `RoboticsCanvas({ active })` — Komponen (kanvas)

- **File:** `src/pages/Home/Hero.jsx:108`
- **Props:** `active` — boolean
- **Mengembalikan:** `<canvas width={580} height={580} />`
- **Dipanggil oleh:** `Hero`

Menggambar adegan hijau: Arduino Uno bergaya dengan garis papan, tekstur grid,
lubang pemasangan, jalur PCB yang membawa titik arus beranimasi, konektor USB-B,
chip ATmega328P dengan baris pin, kristal 16 MHz, regulator tegangan, soket
barrel, 14 header digital dan 6 analog, empat LED berkedip, dan serial monitor
palsu.

Struktur ref dan pola penjedaan yang sama seperti `MetaverseCanvas`.

#### `lerp(a, b, t2)` — Pembantu (matematika)

- **File:** `src/pages/Home/Hero.jsx:133`
- **Parameter:** `a`, `b` — dua angka; `t2` — fraksi dari 0 sampai 1
- **Mengembalikan:** sebuah angka antara `a` dan `b`
- **Dipanggil oleh:** `getPt`

```js
const lerp = (a, b, t2) => a + (b - a) * t2;
```

**Interpolasi linear** — fungsi yang paling banyak dipakai ulang dalam seluruh
grafika komputer. `t2 = 0` mengembalikan `a`, `t2 = 1` mengembalikan `b`,
`t2 = 0.5` mengembalikan titik tengahnya. Dipakai di sini untuk menggeser sebuah
titik dengan mulus antara dua sudut jalur.

Parameternya dinamai `t2` bukan `t` untuk menghindari menutupi `t` penghitung
frame di luarnya.

#### `getPt(pts, p)` — Pembantu (matematika)

- **File:** `src/pages/Home/Hero.jsx:134`
- **Parameter:** `pts` — array titik sudut `[x, y]`; `p` — kemajuan di sepanjang
  seluruh jalur, 0 sampai 1
- **Mengembalikan:** `[x, y]` — sebuah titik di jalurnya
- **Dipanggil oleh:** `draw`, sekali per jalur per frame

```js
const getPt = (pts, p) => {
  const segs = pts.length - 1,
        seg  = Math.min(Math.floor(p * segs), segs - 1),
        loc  = (p * segs) - seg;
  return [lerp(pts[seg][0], pts[seg+1][0], loc),
          lerp(pts[seg][1], pts[seg+1][1], loc)];
};
```

Mengubah "40% perjalanan di sepanjang seluruh jalur zigzag ini" menjadi koordinat
nyata. Ia menghitung segmen mana yang sedang kamu tempati (`seg`), seberapa jauh
kamu di segmen itu (`loc`), lalu menginterpolasi antara kedua ujung segmen itu.

`Math.min(…, segs - 1)` membatasi indeks segmennya supaya `p === 1` tidak
mengindeks melewati ujung array.

Inilah yang membuat titik-titik arus tampak mengalir di sepanjang jalur sirkuit.

#### `draw()` — Loop animasi

- **File:** `src/pages/Home/Hero.jsx:142`

Satu frame adegan Arduino. Dua detail yang layak diketahui:

```js
currents[ti] = (currents[ti] + 0.004) % 1;
```

Setiap jalur punya nilai kemajuannya sendiri, dimajukan 0,004 per frame, dan
`% 1` mengembalikannya ke 0 — jadi titiknya berputar selamanya. Karena mereka
dimulai dari `Math.random()`, fase mereka berbeda satu sama lain.

```js
const blink = 0.55 + Math.sin(t * 0.06 + led.phase) * 0.45;
ctx.globalAlpha = blink;  /* gambar */  ctx.globalAlpha = 1;
```

Kecerahan LED adalah gelombang sinus, setiap LED digeser oleh `phase`-nya sendiri
supaya berdenyut mandiri. Perhatikan bahwa `globalAlpha` **selalu diatur ulang ke
1** setelahnya — state kanvas bersifat global, jadi lupa mengaturnya ulang akan
membuat semua yang digambar setelahnya jadi semi-transparan. Kelas bug itu adalah
yang paling umum dalam kode kanvas.

### `PrintingCanvas({ active })` — Komponen (kanvas)

- **File:** `src/pages/Home/Hero.jsx:202`
- **Props:** `active` — boolean
- **Mengembalikan:** `<canvas width={580} height={580} />`
- **Dipanggil oleh:** `Hero`

Menggambar adegan amber: kerangka printer, batang gantry, meja panas yang
menurun, kepala cetak yang memindai kiri-kanan, berkas ekstrusi filamen, kipas
berputar, objek yang tumbuh lapis demi lapis, dan kotak HUD untuk suhu nozel,
suhu meja, dan kemajuan.

**Ini satu-satunya kanvas yang punya state React:**

```jsx
const [layer, setLayer] = useState(0);
```

`setLayer(curLayer)` dipanggil sekali per lapisan selesai, bukan setiap frame.

**Jebakan yang layak diketahui:** `layer` disetel tetapi tidak pernah dibaca — ia
tidak di-render di mana pun. Nomor lapisan yang tampil di layar berasal dari
variabel lokal `curLayer` di dalam `draw`. Jadi state ini, dan render ulang yang
ditimbulkannya sekitar sekali per detik, saat ini tidak menghasilkan apa pun. Ini
tidak berbahaya, tetapi kalau kamu ingin menampilkan jumlah lapisan dalam HTML di
luar kanvas, `layer` sudah siap untuk itu.

#### `getBedY(l)` — Pembantu

- **File:** `src/pages/Home/Hero.jsx:220`
- **Parameter:** `l` — nomor lapisan, 0 sampai `TOTAL` (40)
- **Mengembalikan:** koordinat piksel Y
- **Dipanggil oleh:** `draw`

```js
const getBedY = (l) => FY + FH - 40 - l * (FH - 80) / TOTAL;
```

Memetakan nomor lapisan ke posisi vertikal mejanya. Lapisan lebih tinggi berarti
Y lebih kecil, jadi mejanya bergerak **naik** di layar seiring kemajuan cetaknya.
Printer FDM sungguhan menurunkan mejanya, tetapi menaikkannya membuat objek yang
tumbuh tetap terpusat dalam bingkai.

#### `modelW(l)` — Pembantu (profil bentuk)

- **File:** `src/pages/Home/Hero.jsx:221`
- **Parameter:** `l` — nomor lapisan
- **Mengembalikan:** sebuah angka — setengah lebar objek pada lapisan itu
- **Dipanggil oleh:** `draw`, untuk setiap lapisan yang digambar, setiap frame

```js
const modelW = (l) => {
  const n = l / TOTAL;                         // normalkan ke 0…1
  if (n < 0.1)  return 4 + n * 60;             // dasar melebar
  if (n < 0.5)  return 10;                     // batang lurus
  if (n < 0.7)  return 10 + (n - 0.5) * 30;    // menggembung keluar
  if (n < 0.85) return 16 - (n - 0.7) * 46;    // menyempit tajam
  return 9;                                    // leher sempit
};
```

**Fungsi tunggal ini mendefinisikan siluet objek yang dicetak** — sesuatu
menyerupai vas dengan dasar melebar, gembungan, dan leher sempit. Ubah angkanya
dan kamu mencetak bentuk berbeda. Ini hal termurah di file ini untuk dicoba-coba.

Normalisasi `n = l / TOTAL` berarti profilnya dijelaskan dalam fraksi tinggi
total, jadi proporsinya tetap kalau kamu mengubah `TOTAL`.

#### `draw()` — Loop animasi

- **File:** `src/pages/Home/Hero.jsx:222`

Logika penambahan lapisan di akhirnya adalah bagian yang menarik:

```js
headX += 0.016 * scanDir;
if (Math.abs(headX) > 1) {
  scanDir *= -1;                                        // membal di tepinya
  if (headX > 0) {                                      // hanya di tepi kanan
    curLayer = Math.min(curLayer + 1, TOTAL - 1);
    setLayer(curLayer);
  }
}
```

`headX` bergerak dari −1 ke +1 sebagai posisi ternormalisasi. Ketika melewati
salah satu batasnya, `scanDir` berbalik tanda dan kepalanya berbalik arah. Sebuah
lapisan ditambahkan hanya pada pantulan sisi kanan, jadi satu lapisan sama dengan
satu sapuan pulang-pergi penuh. `Math.min(…, TOTAL - 1)` menghentikan cetakannya
di puncak alih-alih tumbuh selamanya.

### `Hero()` — Komponen (bagian beranda)

- **File:** `src/pages/Home/Hero.jsx:328`
- **Props:** tidak ada
- **Mengembalikan:** pembungkus scroll 300vh yang memuat hero sticky-nya
- **Dipanggil oleh:** `Home`

State: `activeIdx` (0–2), `scrollPct` (0–1), `textState` (`'shown'`, `'exiting'`,
`'entering'`). Satu ref: `prevIdx`.

Membaca kontennya dari `DIV_DATA`, array tiga objek yang didefinisikan di baris
288.

#### `onScroll()` — Penangan kejadian

- **File:** `src/pages/Home/Hero.jsx:336`
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** browser, pada scroll jendela

Fungsi yang menggerakkan seluruh hero:

```js
const onScroll = () => {
  const wrap = wrapRef.current; if (!wrap) return;
  const rect     = wrap.getBoundingClientRect();
  const scrolled = -rect.top;
  const total    = wrap.offsetHeight - window.innerHeight;
  const pct      = Math.max(0, Math.min(1, scrolled / total));
  setScrollPct(pct);
  const idx = Math.min(2, Math.floor(pct * 3));
  if (idx !== prevIdx.current) { /* transisi silang, di bawah */ }
};
```

Langkah demi langkah: `rect.top` adalah jarak tepi atas pembungkus dari atas
viewport, bernilai negatif begitu kamu men-scroll melewatinya, jadi `-rect.top`
adalah piksel yang sudah discroll ke dalam hero. `total` adalah jarak yang bisa
discroll — tinggi pembungkus dikurangi satu layar. Membaginya memberi fraksi
0–1, dibatasi oleh selimut `Math.max`/`Math.min`. Mengalikannya dengan 3 lalu
membulatkan ke bawah memberi indeks divisi, dan `Math.min(2, …)` menjaga kasus
batas ketika `pct` tepat 1 dan akan menghasilkan 3.

Didaftarkan dengan `{ passive: true }`, yang berjanji kepada browser bahwa
penangan ini tidak akan pernah memanggil `preventDefault()`, sehingga browser bisa
men-scroll tanpa menunggu.

#### Callback transisi silang

- **File:** `src/pages/Home/Hero.jsx:345–351`

Dua callback `setTimeout` tersarang menjalankan transisi teks tiga tahap:

```js
setTextState('exiting');                             // 1. memudar keluar (CSS, 280ms)
setTimeout(() => {
  setActiveIdx(idx);                                 // 2. tukar datanya
  prevIdx.current = idx;
  setTextState('entering');                          //    posisikan di luar layar
  setTimeout(() => setTextState('shown'), 50);       // 3. frame berikutnya: animasikan masuk
}, 280);
```

**Dua angka ajaibnya.** `280` harus sama dengan durasi transisi CSS pada
`.hero-text-wrap` — ubah satu dan kamu harus mengubah yang lain. `50` adalah
jeda satu frame yang membuat browser mencatat posisi awal "entering" sebelum
beralih darinya; tanpanya, browser akan menggabungkan kedua perubahan gaya
menjadi satu dan kamu tidak akan melihat animasi apa pun.

**Mengapa `prevIdx` sebuah ref.** `onScroll` menyala puluhan kali per detik.
Kalau pelacakan indeks sebelumnya memakai state, setiap kejadian scroll akan
me-render ulang. Ref menyimpan nilai antar panggilan tanpa memicu render.

#### Penangan klik navigasi

- **File:** `src/pages/Home/Hero.jsx:387` (titik mobile), `406` (nav kiri)

Keduanya perhitungan yang sama:

```js
onClick={() => {
  const wrap = wrapRef.current; if (!wrap) return;
  const total = wrap.offsetHeight - window.innerHeight;
  window.scrollTo({ top: wrap.offsetTop + (i / 3 + 0.01) * total, behavior: 'smooth' });
}}
```

Ini `onScroll` yang dijalankan terbalik: diberi sebuah indeks divisi, hitung
posisi scroll yang akan memilihnya. `i / 3` adalah awal segmen divisi itu, dan
`+ 0.01` menggeser melewati batasnya supaya pembulatan tidak mendaratkanmu di
divisi sebelumnya.

### `DIV_DATA` — data, bukan fungsi

- **File:** `src/pages/Home/Hero.jsx:288`

Tiga objek yang membawa teks lencana, judul, subjudul, deskripsi, daftar tag,
warna, nuansa gradien, jumlah anggota, kelas tombol, dan path tujuan. Inilah array
yang perlu diedit saat mengubah konten hero. Field `projects`-nya membaca
`DIVISION_PROJECTS.<div>.length`, jadi hitungan proyeknya tetap akurat; `members`
ditulis langsung.

---

## 12. `src/pages/Home/DivisionsShowcase.jsx`

### `DivisionsShowcase()` — Komponen (bagian beranda)

- **File:** `src/pages/Home/DivisionsShowcase.jsx:70`
- **Props:** tidak ada
- **Mengembalikan:** grid tiga kartu
- **Dipanggil oleh:** `Home`

Satu state: `const [active, setActive] = useState(null);` yang menyimpan `null`
atau sebuah kunci divisi.

**Akordeonnya dalam satu baris:**

```jsx
onClick={() => setActive(isActive ? null : d.div)}
```

Karena satu nilai menyimpan kartu mana yang terbuka, membuka satu otomatis
menutup yang lain secara gratis. Tanpa loop, tanpa array boolean.

**Animasi membukanya:**

```jsx
<div className="div-detail" style={{ maxHeight: isActive ? '440px' : '0' }}>
```

CSS tidak bisa bertransisi ke `height: auto`, jadi batas piksel tetap dipakai
bersama `overflow: hidden`. **Jebakan:** konten yang lebih tinggi dari 440 px
terpotong diam-diam.

### `icon(color)` — Fungsi pabrik (di dalam data)

- **File:** `src/pages/Home/DivisionsShowcase.jsx:19`, `38`, `59`
- **Parameter:** `color` — string heks
- **Mengembalikan:** elemen JSX `<svg>`
- **Dipanggil oleh:** render, sebagai `{d.icon(d.color)}`

```jsx
icon: (color) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
),
```

Setiap divisi menyimpan ikonnya sebagai **fungsi yang menerima warna** alih-alih
JSX yang sudah jadi. Itu memungkinkan satu definisi diwarnai ulang per divisi.
Kalau ia menyimpan JSX biasa, warna garisnya akan terpatok sejak saat
pendefinisian.

Ini satu-satunya tempat di basis kode yang memakai pola ini. Di tempat lain
(misalnya `Pillars.jsx` dan `About.jsx`) ikon disimpan sebagai JSX biasa dengan
warna yang ditulis langsung, karena tidak pernah perlu diwarnai ulang.

---

## 13. `src/pages/Home/Terminal.jsx`

Contoh mandiri terbaik untuk state React dalam proyek ini.

### `COMMANDS` — sebuah objek berisi enam fungsi

- **File:** `src/pages/Home/Terminal.jsx:16`

Setiap kunci adalah nama perintah; setiap nilainya adalah fungsi tanpa argumen
yang mengembalikan **array objek baris**. Menambah perintah berarti menambah satu
kunci.

| Kunci | Baris | Mengembalikan |
|---|---|---|
| `help` | 17 | Daftar perintah yang tersedia |
| `divisions` | 29 | Tiga divisi, satu baris berwarna masing-masing |
| `events` | 39 | Daftar acara yang ditulis langsung dan kedaluwarsa ⚠ |
| `members` | 48 | Baris jumlah anggota |
| `projects` | 53 | Dibangun langsung dari `DIVISION_PROJECTS` |
| `whoami` | 73 | Blok "tentang klub" |

Sebuah **objek baris** adalah `{ type, text }`, di mana `type` memilih kelas warna
CSS: `out`, `green`, `blue`, `amber`, `dim`, `err`, `spacer`, `cmd`.

Menjaga keluaran sebagai data alih-alih JSX itulah yang membuat perintahnya
sangat sederhana — masing-masing fungsi murni yang mengembalikan array.

#### `COMMANDS.projects()` — Pembantu

- **File:** `src/pages/Home/Terminal.jsx:53`
- **Mengembalikan:** array objek baris
- **Dipanggil oleh:** `runCmd`

Satu-satunya perintah yang membaca data nyata:

```js
for (const [div, projects] of Object.entries(DIVISION_PROJECTS)) {
  for (const p of projects.filter(p => p.status === 'Active')) {
    lines.push({ type: COLOR[div], text: `  [${PREFIX[div]}] ${p.name.padEnd(26)}— active` });
  }
}
```

`Object.entries` mengubah `{metaverse: [...], robotics: [...]}` menjadi
`[['metaverse', [...]], ['robotics', [...]]]` sehingga kunci dan nilainya
keduanya tersedia di dalam loop. `PREFIX` dan `COLOR` adalah objek pencarian kecil
yang memetakan kunci divisi ke tag dua huruf dan warna baris. `padEnd(26)`
mengisi namanya dengan spasi hingga 26 karakter supaya tanda hubungnya rapi
sekolom, dan itulah yang membuatnya terbaca seperti keluaran terminal sungguhan.

Ia juga menghitung sambil berjalan dan menambahkan baris ringkasan.

**Inilah pola yang semestinya ditiru `COMMANDS.events`.** Lihat buku panduan
bagian 15.2.

### `getJoinOutput(arg)` — Pembantu

- **File:** `src/pages/Home/Terminal.jsx:85`
- **Parameter:** `arg` — kata yang diketik setelah `join`, bisa jadi `undefined`
- **Mengembalikan:** array objek baris
- **Dipanggil oleh:** `runCmd`, ketika perintahnya `join`

```js
function getJoinOutput(arg) {
  const map  = { metaverse:'Metaverse', robotics:'Robotics', printing:'3D Printing' };
  const name = map[arg?.toLowerCase()];
  if (!name) return [ { type:'err', text:`Division "${arg}" not found…` }, … ];
  if (SIGNUP_CONFIG.isOpen) return [ …, { type:'__redirect', to:'/join' } ];
  …
}
```

Tiga cabang: divisi tidak dikenal → galat merah; pendaftaran terbuka → pesan
hijau plus instruksi pengalihan; pendaftaran tertutup → pesan amber plus tanggal
angkatan berikutnya.

**`arg?.toLowerCase()`** memakai optional chaining. Kalau pengguna mengetik `join`
saja tanpa argumen, `arg` bernilai `undefined`; `?.` memotong ke `undefined`
alih-alih melempar "cannot read property of undefined".

**Penanda `__redirect`.** Ini gagasan penting di file ini. Fungsinya tidak bisa
bernavigasi — ia fungsi murni tanpa akses ke router. Jadi ia mengembalikan
navigasi *sebagai data*, sebuah objek baris dengan tipe buatan yang `runCmd` tahu
harus dicegat. Garis bawah ganda menandakan "bukan baris keluaran sungguhan".

Ini menjaga setiap perintah tetap fungsi murni, yang membuatnya mudah dipikirkan.
Tiru polanya kalau kamu menambah perintah yang perlu menimbulkan efek.

Ia tinggal di luar `COMMANDS` karena ia menerima argumen, sementara setiap entri
di `COMMANDS` tidak menerima apa pun.

### `Terminal()` — Komponen (bagian beranda)

- **File:** `src/pages/Home/Terminal.jsx:118`
- **Props:** tidak ada
- **Mengembalikan:** bagian dua kolom — petunjuk di kiri, jendela terminal di
  kanan
- **Dipanggil oleh:** `Home`

Empat state (`lines`, `input`, `history`, `histIdx`), dua ref (`bodyRef`,
`inputRef`), dua ref reveal, dan `navigate` dari router.

#### `scrollBody()` — Pembantu

- **File:** `src/pages/Home/Terminal.jsx:129`
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** `runCmd`, via `setTimeout(scrollBody, 0)`

```js
const scrollBody = () => {
  if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
};
```

Men-scroll panel keluaran ke bawah dengan menyetel `scrollTop` ke `scrollHeight`
penuhnya.

**Mengapa ia selalu dipanggil via `setTimeout(…, 0)`.** Pada saat `runCmd`
memanggil `setLines`, React belum me-render baris-baris baru, jadi `scrollHeight`
masih nilai lama. Timeout berjeda nol menunda scrollnya ke tugas berikutnya,
setelah React menggambar. Tanpanya kamu men-scroll ke posisi yang *tadinya*
bawah.

#### `runCmd(raw)` — Pembantu

- **File:** `src/pages/Home/Terminal.jsx:133`
- **Parameter:** `raw` — string masukan mentah
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** `onKeyDown` (saat Enter) dan `injectCmd`

Pengirimnya. Langkah-langkahnya:

1. `trim()` masukannya dan kembali langsung kalau kosong.
2. Pisahkan menjadi perintah dan argumen:
   `const [cmd, ...args] = trimmed.toLowerCase().split(' ');` — destrukturisasi
   dengan elemen sisa, jadi `join robotics` menjadi `cmd = 'join'`,
   `args = ['robotics']`.
3. Gemakan perintahnya ke keluaran sebagai baris bertipe `cmd`.
4. **Kasus khusus `clear`**: ganti seluruh array `lines` lalu `return` lebih awal.
5. Kalau bukan, pilih keluarannya: `getJoinOutput(args[0])` untuk `join`,
   `COMMANDS[cmd]()` kalau perintahnya ada, kalau tidak galat merah "command not
   found".
6. Ekstrak baris `__redirect` kalau ada, saring dari keluaran yang terlihat, dan
   jadwalkan `navigate` 900 ms kemudian.
7. Dorong perintahnya ke `history`, atur ulang `histIdx` ke `-1`, bersihkan
   masukannya, dan antrekan `scrollBody`.

**Mengapa `clear` kembali lebih awal** alih-alih tinggal di `COMMANDS`: setiap
perintah lain *menambahkan* ke keluaran, sementara `clear` *menggantinya*. Itu
tidak bisa diungkapkan sebagai "kembalikan beberapa baris untuk ditambahkan".

**Jeda 900 ms** pada navigasinya ada supaya pengguna bisa membaca "Redirecting…"
sebelum halaman berubah. Navigasi seketika akan terlihat seperti gangguan.

#### `onKeyDown(e)` — Penangan kejadian

- **File:** `src/pages/Home/Terminal.jsx:172`
- **Parameter:** `e` — kejadian papan ketik
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** browser, pada keydown di kolom masukan

Tiga tombol:

- **Enter** → `runCmd(input)`.
- **ArrowUp** → bergerak mundur menelusuri riwayat.
- **ArrowDown** → bergerak maju menelusuri riwayat.

```js
else if (e.key === 'ArrowUp') {
  e.preventDefault();
  const idx = Math.min(histIdx + 1, history.length - 1);
  setHistIdx(idx);
  setInput(history[idx] || '');
}
```

`history` disimpan **terbaru dulu** (`setHistory(h => [trimmed, ...h])`), jadi
ArrowUp *menaikkan* indeksnya untuk mundur lebih jauh. `histIdx === -1` berarti
"tidak sedang menelusuri riwayat, masukannya kosong". Pembatas
`Math.min`/`Math.max` mencegahmu keluar dari kedua ujungnya.

`e.preventDefault()` itu esensial: secara bawaan, tombol panah memindahkan kursor
teks di dalam kolom masukan. Tanpanya kursornya akan melompat sambil kamu
menelusuri riwayat.

#### `injectCmd(cmd)` — Pembantu

- **File:** `src/pages/Home/Terminal.jsx:187`
- **Parameter:** `cmd` — string perintah yang akan dijalankan
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** empat tombol petunjuk di sisi kiri

```js
const injectCmd = (cmd) => {
  inputRef.current?.focus();
  setInput(cmd);
  setTimeout(() => runCmd(cmd), 80);
};
```

Memfokuskan masukannya, mengetikkan perintahnya, lalu menjalankannya 80 ms
kemudian. Jedanya ada supaya pengguna *melihat* perintahnya muncul sebelum
keluarannya — itu membuat hubungan sebab-akibatnya terlihat. Menjalankan seketika
akan tampak seperti tombolnya secara ajaib menghasilkan keluaran.

`inputRef.current?.focus()` memakai optional chaining untuk berjaga-jaga kalau
ref-nya belum terlekat.

Perhatikan bahwa `runCmd(cmd)` dikirimi perintahnya secara langsung alih-alih
membaca `input`. Pembaruan state tidak langsung berlaku, jadi `input` masih akan
menyimpan nilai lama pada titik itu.

#### `renderLine(l, i)` — Pembantu (fungsi render)

- **File:** `src/pages/Home/Terminal.jsx:193`
- **Parameter:** `l` — objek baris; `i` — indeks arraynya
- **Mengembalikan:** elemen JSX
- **Dipanggil oleh:** `{lines.map(renderLine)}`

Tiga cabang: `spacer` menjadi div pemberi jarak kosong; baris `cmd` menjadi prompt
plus perintah yang digemakan; sisanya menjadi div yang classNamenya memuat `type`
baris itu, yang diwarnai CSS.

```jsx
return <div key={i} className={`t-line t-out ${l.type}`}>{l.text}</div>;
```

**Mengapa ini fungsi biasa, bukan komponen.** Ia mengembalikan JSX tetapi dinamai
dengan camelCase dan dipanggil langsung. React tidak mengelolanya, tidak ada
state, tidak ada hook. Menyebutnya komponen dan menulis `<RenderLine l={l} />`
akan berfungsi tetapi tidak menambah apa pun.

**Mengapa `key={i}` dapat diterima di sini.** Memakai indeks array sebagai key
React biasanya tidak disarankan, karena pengurutan ulang atau penyisipan merusak
pelacakan React. Keluaran terminal murni hanya-menambah — baris tidak pernah
berpindah atau disisipkan di tengah — jadi indeksnya stabil dan aman.

#### `BOOT_LINES` dan `HINTS` — data

- **File:** `src/pages/Home/Terminal.jsx:7` dan `111`

`BOOT_LINES` adalah nilai awal `lines`, jadi itulah yang tampil sebelum pengguna
mengetik apa pun. `HINTS` adalah empat saran yang bisa diklik di sisi kiri,
masing-masing `{ cmd, desc }`.

---

## 14. `src/pages/Home/HomeAbout.jsx`

### `HomeAbout()` — Komponen (bagian beranda)

- **File:** `src/pages/Home/HomeAbout.jsx:3`
- **Props:** tidak ada
- **Mengembalikan:** blok dua kolom — teks di kiri, kartu logo di kanan
- **Dipanggil oleh:** `Home`

Memanggil `useReveal()` sekali. Sisanya JSX statis. Tidak ada fungsi lain. Edit
teksnya langsung di komponennya.

---

## 15. `src/pages/Home/Pillars.jsx`

### `Pillars()` — Komponen (bagian beranda)

- **File:** `src/pages/Home/Pillars.jsx:85`
- **Props:** tidak ada
- **Mengembalikan:** grid enam kartu
- **Dipanggil oleh:** `Home`

Memanggil `useReveal()`, lalu memetakan array `pillars` (baris 3) menjadi kartu.

Entri `pillars` menyimpan `icon`-nya sebagai **JSX biasa**, bukan sebagai fungsi —
berbeda dari `DivisionsShowcase`, di mana ikon diwarnai ulang per divisi. Di sini
warna garis setiap ikon ditulis ke dalam SVG-nya, jadi tidak perlu pabrik.

```jsx
{pillars.map((p) => (
  <div className="pillar-card" key={p.num}>…</div>
))}
```

`key={p.num}` memakai nilai `'01'`…`'06'` yang stabil alih-alih indeks arraynya.

---

## 16. `src/pages/Home/HomeEvents.jsx`

### `HomeEvents()` — Komponen (bagian beranda)

- **File:** `src/pages/Home/HomeEvents.jsx:19`
- **Props:** tidak ada
- **Mengembalikan:** daftar empat baris acara mendatang
- **Dipanggil oleh:** `Home`

Memanggil `useReveal()` dan memetakan array `events`. Komponennya sendiri hampir
tidak melakukan apa-apa; logikanya ada di atasnya.

### Alur `events` di tingkat modul

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

Rantai tiga langkah: simpan hanya acara mendatang, ambil empat pertama, bentuk
ulang masing-masing menjadi bentuk yang lebih rata yang diinginkan komponen ini.
Perhatikan `title` diganti nama menjadi `name` dan kelas CSS `tagStyle`
ditambahkan.

`?? 'blue'` adalah **operator nullish coalescing** — ia menyediakan `'blue'` hanya
ketika sisi kirinya `null` atau `undefined`. Jadi jenis acara yang tidak dikenal
tetap tampil, hanya dengan warna bawaan, alih-alih menghasilkan
`className="… undefined"`.

**Ini berjalan saat modul dimuat, bukan di dalam komponen.** Ia dieksekusi sekali
ketika bundelnya pertama diimpor, bukan pada setiap render. Untuk situs yang
datanya hanya berubah saat deploy itu baik-baik saja dan sedikit lebih cepat.
Tetapi artinya daftarnya tidak akan diperbarui kalau halamannya dibiarkan terbuka
melewati tengah malam — kekhawatiran yang bisa diabaikan di sini, tetapi layak
diketahui secara umum.

---

## 17. `src/pages/Home/CTA.jsx`

### `CTA()` — Komponen (bagian beranda)

- **File:** `src/pages/Home/CTA.jsx:4`
- **Props:** tidak ada
- **Mengembalikan:** ajakan bertindak penutup
- **Dipanggil oleh:** `Home`

Memanggil `useReveal()` **dua kali** — `ref` untuk blok judul dan `ref2` untuk
teks serta tombolnya — supaya kedua bagiannya beranimasi masuk secara mandiri.
Selain itu statis.

---

## 18. `src/pages/About.jsx`

Lima komponen dan sebelas fungsi tersarang. File paling rumit setelah `Hero.jsx`.

### `Lightbox({ src, alt, onClose })` — Komponen

- **File:** `src/pages/About.jsx:66`
- **Props:**
  - `src` — URL gambar
  - `alt` — teks alternatif
  - `onClose` — callback yang dipanggil untuk menutupnya
- **Mengembalikan:** latar layar penuh dengan gambarnya
- **Dipanggil oleh:** `About`, secara kondisional: `{lightbox && <Lightbox … />}`

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

Tiga perilaku, semuanya benar dan semuanya layak dipertahankan:

1. **Escape menutupnya** — via penangan `onKey` tersarang, didaftarkan pada
   `document` supaya berfungsi terlepas dari fokusnya.
2. **Scroll latar dikunci** — `document.body.style.overflow = 'hidden'` selama
   terbuka.
3. **Kuncinya selalu dilepas** — di fungsi pembersihnya. Ini lebih penting
   daripada kelihatannya: kalau pelepasannya terjadi di penangan klik, unmount
   lewat jalur lain apa pun akan meninggalkan seluruh halaman tak bisa discroll
   secara permanen.

Latarnya punya `onClick={onClose}` sementara gambarnya punya
`onClick={(e) => e.stopPropagation()}`. `stopPropagation` mencegah kliknya
**menggelembung** naik ke latarnya, jadi mengklik fotonya tidak menutupnya
sementara mengklik sekelilingnya menutupnya.

#### `onKey(e)` — Penangan kejadian

- **File:** `src/pages/About.jsx:68`
- **Parameter:** `e` — kejadian papan ketik
- **Dipanggil oleh:** browser, pada keydown apa pun selama lightbox terbuka

Satu baris: kalau tombolnya Escape, panggil `onClose`.

### `GalleryItem({ item, patternIdx, onOpen })` — Komponen

- **File:** `src/pages/About.jsx:90`
- **Props:**
  - `item` — satu objek dari `GALLERY`
  - `patternIdx` — indeks arraynya, dipakai memilih pola placeholder
  - `onOpen` — callback `(src, alt)` untuk membuka lightbox
- **Mengembalikan:** satu sel grid
- **Dipanggil oleh:** `About`, di dalam `GALLERY.map`

Me-render foto kalau `item.img` terisi, kalau tidak placeholder berpola yang
menampilkan `item.hint`.

```jsx
className={`gallery-item${item.wide ? ' wide' : ''}${item.tall ? ' tall' : ''}${item.img ? ' expandable' : ''}`}
backgroundImage: item.img ? 'none' : GALLERY_PATTERNS[patternIdx % 3]
onClick={() => item.img && onOpen(item.img, item.label)}
```

Tiga hal bergantung pada datanya: `wide`/`tall` mengatur rentang grid,
`expandable` menyetel `cursor: zoom-in`, dan kliknya hanya menyala kalau ada
gambar untuk ditampilkan.

`item.img && onOpen(…)` adalah **ekspresi penjaga** — sisi kanannya hanya
dievaluasi kalau sisi kirinya bernilai benar. Ringkas, dan dipakai di seluruh
file ini.

`patternIdx % 3` menggilir ketiga pola placeholder supaya sel kosong yang
berdampingan tampak berbeda.

### `PortfolioCard({ p, onOpen })` — Komponen

- **File:** `src/pages/About.jsx:114`
- **Props:** `p` — satu objek dari `PORTFOLIO`; `onOpen` — callback lightbox
- **Mengembalikan:** satu kartu portofolio
- **Dipanggil oleh:** `About`, di dalam `PORTFOLIO.map`

Pola foto-atau-placeholder yang sama seperti `GalleryItem`, plus blok teks berisi
divisi, nama, deskripsi, dan pil status. Pilnya menurunkan tiga warna dari
`p.statusColor`:

```jsx
style={{ color: p.statusColor, background: p.statusColor + '18',
         border: `1px solid ${p.statusColor}33` }}
```

Menambahkan `18` dan `33` ke heks 6-digit menghasilkan RGBA 8-digit — kira-kira
opasitas 9% dan 20%. Satu warna dasar, tiga nilai turunan.

### `LeadershipTunnel()` — Komponen

- **File:** `src/pages/About.jsx:149`
- **Props:** tidak ada
- **Mengembalikan:** adegan 3-D, layar akhir berisi daftar, bilah kemajuan, dan
  petunjuk
- **Dipanggil oleh:** `About`

Komponen paling kompleks dalam proyek ini. Enam ref dan tanpa state sama sekali —
ketiadaan itu justru intinya.

| Ref | Menyimpan |
|---|---|
| `outerRef` | kontainer penangkap scroll |
| `sceneRef` | elemen yang membawa `perspective` |
| `worldRef` | kontainer `preserve-3d` yang transformnya memiringkan semuanya |
| `progRef` | bilah kemajuan, lebarnya ditulis langsung |
| `rosterRef` | layar akhir, opasitasnya ditulis langsung |
| `elMap` | objek yang memetakan id item → elemen DOM |

`elMap` diisi saat render oleh sebuah **callback ref**:

```jsx
ref={el => elMap.current[item.id] = el}
```

Alih-alih satu ref per elemen, satu ref menyimpan kamus berisi semua ~80 elemen,
yang lalu dicari loop animasinya berdasarkan id.

#### Pembangun adegan `useMemo`

- **File:** `src/pages/About.jsx:157`
- **Mengembalikan:** `{ allItems, totalDepth }`
- **Dipanggil oleh:** React, sekali

Berjalan maju melalui kedalaman (`z`), mendorong item judul, lalu kartu anggota
bergantian di kiri dan kanan pusat, lalu jarak, untuk setiap bagian. Lalu
menyebar 70 bintang pada posisi acak.

```js
const xOff = single ? 0 : mi % 2 === 0 ? -310 : 310;
```

`mi % 2` menggantikan sisinya. Bagian dengan satu anggota memusatkannya.

**`useMemo` dengan `[]` di sini menanggung beban, bukan optimasi.** Posisi
bintangnya berasal dari `Math.random()`. Tanpa memoisasi, posisinya akan dihitung
ulang pada setiap render dan bintangnya akan melompat-lompat.

Dua callback `forEach` tersarang melakukan penjelajahannya: yang luar atas
`TUNNEL_SECTIONS`, yang dalam atas `sec.members`.

#### `getAlpha(vz)` — Pembantu

- **File:** `src/pages/About.jsx:193`
- **Parameter:** `vz` — kedalaman item relatif terhadap kamera
- **Mengembalikan:** angka dari 0 sampai 1
- **Dipanggil oleh:** `tick`, sekali per item per frame

```js
const getAlpha = (vz) => {
  if (vz < -2800) return 0;
  if (vz < -1300) return (vz + 2800) / 1500;
  if (vz >  380)  return Math.max(0, 1 - (vz - 380) / 280);
  return 1;
};
```

Kurva opasitas empat pita. Jauh di belakang kamera: tak terlihat. Mendekat dari
kejauhan: memudar masuk. Dekat atau melewati kamera: memudar keluar. Di titik
manis: sepenuhnya pekat.

Inilah yang membuat lorongnya tetap bisa dibaca — tanpanya, semua 80 item akan
digambar pada opasitas penuh sekaligus.

`tick` memakai hasilnya sebagai jalan keluar awal: `if (a <= 0) return;` melewati
penulisan transform sepenuhnya untuk item tak terlihat, yang merupakan sebagian
besarnya.

#### `onWheel(e)` — Penangan kejadian

- **File:** `src/pages/About.jsx:200`
- **Parameter:** `e` — kejadian roda
- **Dipanggil oleh:** browser, pada roda di atas lorongnya

```js
const onWheel = (e) => {
  const done = (S.target <= 0 && e.deltaY < 0) || (S.target >= totalDepth && e.deltaY > 0);
  if (done) return;
  e.preventDefault();
  S.target = Math.max(0, Math.min(totalDepth, S.target + e.deltaY * 2.5));
};
```

Mengubah gerakan roda menjadi kedalaman kamera, membajak scroll halamannya.

**Pemeriksaan `done` adalah baris terpenting dalam fungsi ini.** Ia bertanya:
apakah kita di ujung *dan* men-scroll lebih jauh ke arah itu? Kalau ya, kembali
tanpa memanggil `preventDefault()`, yang membuat browser men-scroll halaman
secara normal. Tanpanya, lorongnya akan menjadi perangkap yang tak bisa
dihindari.

Didaftarkan dengan `{ passive: false }` — kebalikan dari pendengar scroll di hero
— karena ia harus diizinkan memanggil `preventDefault()`.

`* 2.5` adalah pengali sensitivitas scroll.

#### `onMove(e)` — Penangan kejadian

- **File:** `src/pages/About.jsx:207`
- **Parameter:** `e` — kejadian mousemove
- **Dipanggil oleh:** browser, pada mousemove di jendela

```js
S.mx = (e.clientX / window.innerWidth  - 0.5) * 2;
S.my = (e.clientY / window.innerHeight - 0.5) * 2;
```

Menormalkan kursornya ke −1…+1 pada setiap sumbu, dengan pusatnya 0. `tick`
memakainya untuk memiringkan seluruh dunianya, menghasilkan paralaks halus yang
mengikuti tetikus.

Membaginya dengan ukuran jendela membuatnya bebas resolusi; mengurangi 0,5 dan
mengalikan dua memusatkan ulang rentangnya pada nol.

#### `onTouchStart(e)` / `onTouchMove(e)` — Penangan kejadian

- **File:** `src/pages/About.jsx:213` dan `214`
- **Dipanggil oleh:** browser, pada sentuhan

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

Padanan sentuh dari `onWheel`. `onTouchStart` mencatat di mana jarinya mendarat;
`onTouchMove` menghitung selisih sejak gerakan terakhir, memperbarui catatannya,
dan menerapkannya. Pemeriksaan pelepasan `done` yang sama muncul di sini.

`touchY` adalah variabel closure biasa, bukan ref — ia hanya perlu hidup selama
efeknya, dan tidak ada di luar yang membacanya.

#### `tick()` — Loop animasi

- **File:** `src/pages/About.jsx:224`
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** dirinya sendiri, via `requestAnimationFrame`

Jantung lorongnya. Per frame:

**1. Majukan kameranya dengan fisika pegas.**

```js
S.vel += ((S.target - S.scroll) * 0.07 - S.vel) * 0.12;
S.scroll += S.vel;
```

`S.target` melompat seketika ketika kamu men-scroll; `S.scroll` mengejarnya;
`S.vel` itu sendiri dihaluskan menuju kecepatan ideal. Dua baris memberi
percepatan, meluncur, dan menetap. `0.07` kekakuan, `0.12` redaman — naikkan
untuk yang lebih tanggap dan kurang melayang.

**2. Efek adegan yang digerakkan kecepatan.**

```js
scene.style.perspective = `${Math.max(500, 800 - Math.abs(v) * 6)}px`;
world.style.transform   = `rotateX(${S.my * 4 - v * 0.3}deg) rotateY(${S.mx * 4}deg)`;
```

Bergerak cepat menyempitkan bidang pandangnya, yang terbaca sebagai kecepatan.
Dunianya miring mengikuti tetikus dan sedikit mengangguk seiring kecepatan.

**3. Memudar silang ke daftar lengkapnya.**

```js
const rp = Math.max(0, Math.min(1, (cam - (totalDepth - 700)) / 700));
world.style.opacity        = Math.max(0, 1 - Math.max(0, (cam - (totalDepth - 900)) / 500));
roster.style.opacity       = rp;
roster.style.pointerEvents = rp > 0.05 ? 'auto' : 'none';
```

Dunianya memudar keluar sedikit sebelum daftarnya memudar masuk, jadi keduanya
bertumpang. Saklar `pointerEvents` mencegah daftar tak terlihat menelan klik.

**4. Posisikan setiap item.** Sebuah `forEach` atas `allItems` dengan tiga cabang
— bintang mendapat peregangan z sebanding kecepatan, judul mendapat `textShadow`
aberasi kromatik yang digerakkan kecepatan, kartu mendapat angguk sinus dan
offset x berskala mobile:

```js
const xScale = vw < 480 ? 0.32 : vw < 768 ? Math.max(0.45, vw / 900) : 1;
const fy = Math.sin(performance.now() * 0.0007 + item.z * 0.001) * 8;
```

Suku `item.z` di dalam sinusnya menggeser fase setiap kartu supaya mereka tidak
mengangguk serempak. `xScale` menarik offset kiri/kanannya ke dalam pada layar
sempit supaya kartunya tetap di layar.

**Mengapa loop ini menulis ke `el.style` alih-alih memakai state.** Sekitar 80
elemen diperbarui 60 kali per detik. Menyimpan posisi kamera di `useState` berarti
60 render per detik pada pohon dengan 80 anak — tersendat sudah pasti. Penulisan
DOM langsung adalah jalan keluar yang benar untuk animasi berfrekuensi tinggi.
React tetap membuat elemennya; loopnya hanya mengubah transformnya.

**`S` adalah objek biasa**, bukan state dan bahkan bukan ref, karena ia hanya
perlu hidup selama masa hidup efeknya.

#### Pembersih efeknya

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

Lima pembongkaran. Pendengar `mousemove`-nya ada di `window`, jadi melupakan yang
satu itu akan meninggalkan sebuah penangan yang berjalan di setiap halaman situs
setelah kamu pindah.

#### Pemeta item di render

- **File:** `src/pages/About.jsx:304`

`{allItems.map(item => { … })}` dengan tiga cabang `if` yang mengembalikan
bintang, judul, atau kartu, dan `return null` di akhirnya untuk keamanan. Setiap
cabang melekatkan callback `ref={el => elMap.current[item.id] = el}` supaya `tick`
bisa menemukannya.

### `About()` — Komponen (halaman)

- **File:** `src/pages/About.jsx:379`
- **Props:** tidak ada
- **Mengembalikan:** seluruh halaman About
- **Dipanggil oleh:** router, untuk `/about`

Empat ref `useReveal()`, satu state untuk lightbox, dua callback.

#### `openLightbox(src, alt)` — Pembantu

- **File:** `src/pages/About.jsx:385`
- **Parameter:** `src`, `alt`
- **Mengembalikan:** tidak ada
- **Dipanggil oleh:** `GalleryItem` dan `PortfolioCard`, via prop `onOpen`

```js
const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
```

#### `closeLightbox()` — Pembantu

- **File:** `src/pages/About.jsx:386`
- **Dipanggil oleh:** `Lightbox`, via `onClose`

```js
const closeLightbox = useCallback(() => setLightbox(null), []);
```

**Mengapa keduanya dibungkus `useCallback`.** Tanpanya, objek fungsi baru akan
dibuat pada setiap render `About`, dan karena keduanya dikirim sebagai props ke
empat belas anak galeri dan portofolio, setiap satu dari mereka akan melihat prop
yang "berubah". `useCallback` dengan `[]` mengembalikan identitas fungsi yang sama
setiap kali.

**Ini pola "mengangkat state ke atas".** State lightbox tidak bisa tinggal di
dalam `GalleryItem`, karena overlaynya harus menutupi seluruh halaman, dan hanya
satu yang bisa terbuka sekaligus. Jadi ia tinggal di leluhur bersama terdekat,
dan anak-anaknya mendapat sebuah fungsi untuk mengubahnya.

### Array data di file ini

`TIMELINE` (9), `TEAM` (19), `PORTFOLIO` (33), `GALLERY` (42), `VALUES` (51),
`GALLERY_PATTERNS` (57), `TUNNEL_SECTIONS` (143).

**`TUNNEL_SECTIONS` perlu peringatan.** Ia mengiris `TEAM` berdasarkan indeks
yang ditulis langsung:

```js
{ title:'COMMUNITY', members: TEAM.slice(0,4) },
{ title:'METAVERSE', members: TEAM.slice(4,6) },
```

Sisipkan satu anggota dan setiap rentang berikutnya salah, diam-diam menempatkan
orang di bawah divisi yang salah. Lihat buku panduan bagian 11.6 dan 15.3.

---

## 19. `src/pages/Events.jsx`

### `Events()` — Komponen (halaman)

- **File:** `src/pages/Events.jsx:11`
- **Props:** tidak ada
- **Mengembalikan:** seluruh halaman Events
- **Dipanggil oleh:** router, untuk `/events`

Dua state (`filter`, `divFilter`) dan beberapa nilai turunan yang dihitung ulang
pada setiap render.

#### Callback filternya

- **File:** `src/pages/Events.jsx:20`

```js
const filtered = upcoming.filter(e => {
  const typeOk = filter === 'All' || e.type === filter;
  const divOk  = divFilter === 'All Divisions' || e.division === divFilter || e.division === 'All';
  return typeOk && divOk;
});
```

Kedua kondisinya harus lolos. Masing-masing punya jalan keluar "All" yang memotong
ke `true`.

Klausa ketiganya, `e.division === 'All'`, membuat acara seluruh klub muncul di
setiap filter divisi. Maksudnya benar, tetapi saat ini artinya memfilter ke
"Metaverse" menampilkan kelima acara, yang bisa tampak seperti filter rusak.

#### Ekspresi pengelompokan bulan

- **File:** `src/pages/Events.jsx:26`

```js
const months = [...new Set(filtered.map(e => `${e.month} ${e.year}`))];
```

Empat operasi dalam satu baris: `map` membangun string `"OCT 2026"` per acara,
`Set` membuang duplikat, spread mengubahnya kembali menjadi array, dan hasilnya
adalah daftar judul bulan unik **dalam urutan kemunculan pertama**.

Bagian terakhir itulah sebabnya `ALL_EVENTS` harus dijaga terurut berdasarkan
tanggal — tidak ada yang mengurutkannya untukmu, jadi data yang tidak urut
menghasilkan judul yang tidak urut.

Render-nya lalu memfilter lagi per bulan:

```jsx
{filtered.filter(e => `${e.month} ${e.year}` === month).map(e => …)}
```

Pengelompokan tanpa library, dengan biaya satu lintasan ekstra per bulan. Dengan
lima acara itu gratis.

#### Penghitung yang hidup

- **File:** `src/pages/Events.jsx:29`

```js
const currentMonthKey = Object.keys(MONTH_INDEX).find(k => MONTH_INDEX[k] === now.getMonth());
const thisMonthCount  = upcoming.filter(e => e.month === currentMonthKey && e.year === now.getFullYear()).length;
```

Pencarian terbalik: `getMonth()` memberi angka seperti `9`, dan `find` mencari di
`MONTH_INDEX` kunci yang nilainya `9`, mengembalikan `'OCT'`. Lalu menghitung
acara yang cocok.

**Jebakan:** `MONTH_INDEX` dideklarasikan ulang di bagian atas file ini, identik
dengan yang ada di `data/events.js`. Ekspor dan impor saja.

#### `typeTagStyle(type)` — Pembantu

- **File:** `src/pages/Events.jsx:34`
- **Parameter:** `type` — string jenis acara
- **Mengembalikan:** objek gaya dengan `color`, `background`, `border`
- **Dipanggil oleh:** render, per kartu acara

```js
const typeTagStyle = type => {
  const color = TYPE_COLORS[type] ?? '#888';
  return { color, background: `${color}18`, border: `1px solid ${color}33` };
};
```

Menurunkan tiga nilai yang terkoordinasi dari satu warna dasar memakai akhiran
alfa heks. Nilai cadangan `?? '#888'` berarti jenis yang tidak dikenal tampil
abu-abu alih-alih rusak.

`{ color, … }` memakai singkatan properti — setara dengan `{ color: color, … }`.

**Jebakan:** `const past = ALL_EVENTS.filter(e => !isUpcoming(e))` di baris 14
dihitung tetapi tidak pernah di-render. Ref reveal `r1` dan `r2` di baris 32 juga
tak terpakai.

---

## 20. `src/pages/Join.jsx`

### `SignupPanel()` — Komponen

- **File:** `src/pages/Join.jsx:35`
- **Props:** tidak ada — membaca `SIGNUP_CONFIG` dari cakupan modulnya
- **Mengembalikan:** panel terbuka atau panel tertutup
- **Dipanggil oleh:** `Join`

```jsx
function SignupPanel() {
  if (SIGNUP_CONFIG.isOpen) {
    return ( /* lencana hijau, tombol ke googleFormUrl */ );
  }
  return ( /* lencana abu-abu, tanggal angkatan berikutnya, tombol Instagram */ );
}
```

Sebuah **return awal** alih-alih ternary. Ketika kedua cabangnya masing-masing 20
baris JSX, ternary menjadi tak terbaca; dua return tidak.

Cabang tertutupnya menampilkan tanggal angkatannya secara kondisional:

```jsx
{SIGNUP_CONFIG.showNextIntakeDate && SIGNUP_CONFIG.nextIntakeDate && ( … )}
```

Baik penandanya maupun string yang tidak kosong keduanya dibutuhkan, jadi
mengosongkan tanggalnya menyembunyikan bloknya tanpa perlu membalik penandanya.

**Mengapa ia tidak menerima props.** Ia membaca konfigurasinya langsung, yang
menjaga tempat pemanggilannya bersih tetapi membuatnya tidak bisa diuji secara
terpisah. Menerima `config` sebagai prop akan lebih fleksibel; untuk komponen
sekali pakai ini sudah cukup.

**Jebakan:** kalau `isOpen` bernilai `true` sementara `googleFormUrl` berupa `''`,
ini me-render tombol mencolok yang `href`-nya kosong. Selalu setel keduanya
bersamaan.

### `Join()` — Komponen (halaman)

- **File:** `src/pages/Join.jsx:84`
- **Props:** tidak ada
- **Mengembalikan:** seluruh halaman Join
- **Dipanggil oleh:** router, untuk `/join`

Satu state, empat ref reveal, satu string turunan.

#### Saklar FAQ

- **File:** `src/pages/Join.jsx:187`

```jsx
const [openFaq, setOpenFaq] = useState(null);
onClick={() => setOpenFaq(openFaq === i ? null : i)}
```

Akordeon satu-nilai yang sama seperti `DivisionsShowcase`, menyimpan sebuah indeks
alih-alih kunci. Mengklik item yang terbuka menutupnya; mengklik yang lain
berpindah.

Markup di sekelilingnya yang paling aksesibel di situs ini — sebuah `<button>`
sungguhan, `aria-expanded`, dan `aria-controls` yang menunjuk ke id panelnya.
Tiru ini ketika kamu membangun apa pun yang bisa dibuka-tutup.

**Jebakan:** `.faq-a.open { max-height: 200px }` di `join.css` memotong jawaban
panjang.

#### Subjudul hero yang bergerbang

- **File:** `src/pages/Join.jsx:89`

```js
const heroSub = SIGNUP_CONFIG.isOpen
  ? '…Sign-ups are open now. Scroll down to apply.'
  : '…Sign-ups open periodically. Scroll down to stay in the loop.';
```

Ternary di sini, karena kedua cabangnya berupa string tunggal bukan pohon JSX.
Keputusan yang sama seperti `SignupPanel`, jawaban yang berlawanan, dengan alasan
yang baik.

### Array data

`FAQS` (10), `PERKS` (19), `STEPS` (29). Entri `STEPS` menyimpan `icon`-nya
sebagai JSX biasa dengan warna garis yang ditulis langsung.

---

## 21. `src/pages/divisions/Metaverse.jsx`

### `HeroCanvas()` — Komponen (kanvas)

- **File:** `src/pages/divisions/Metaverse.jsx:10`
- **Props:** **tidak ada**
- **Mengembalikan:** `<canvas width={440} height={440} />`
- **Dipanggil oleh:** `Metaverse`

Versi satu-divisi dari `MetaverseCanvas`. Adegan yang sama — kubus wireframe,
lantai grid, partikel, cincin mengorbit — dengan beberapa perbedaan:

| | Versi hero | Versi divisi |
|---|---|---|
| Ukuran | 580 × 580 | 440 × 440 |
| Partikel | 70 | 60 |
| Ukuran kubus `S` | 130 | 110 |
| Pembagi proyeksi | `500/(500+z+250)` | `450/(450+z+220)` |
| Oktahedron mengorbit | ada | tidak |
| Prop `active` / penjedaan | ada | **tidak** |

**Hilangnya prop `active` adalah perbedaan yang bermakna.** Kanvas ini tidak punya
`activeRef` dan tidak punya `restartRef`; `draw` tanpa syarat memanggil
`requestAnimationFrame(draw)`. Ia satu-satunya kanvas di halamannya, selalu
terlihat, jadi tidak ada alasan untuk menjeda.

Ia tetap membatalkan dengan benar saat unmount, dan itulah yang penting:

```js
return () => { cancelAnimationFrame(rafRef.current);
               canvas.removeEventListener('mousemove', onMouse); };
```

#### `rot(p, rx, ry, rz)`, `proj([x,y,z])`, `draw()`, `onMouse(e)`

- **File:** baris 22, 23, 24, 42

Identik kegunaannya dengan versi di `Hero.jsx` yang didokumentasikan di bagian 11,
dengan konstanta seperti di tabel di atas. Keduanya **disalin-tempel**, bukan
diimpor — duplikasi yang layak digabungkan kalau kamu suatu saat merapikan
ulang.

### `Metaverse()` — Komponen (halaman)

- **File:** `src/pages/divisions/Metaverse.jsx:69`
- **Props:** tidak ada
- **Mengembalikan:** seluruh halaman Metaverse
- **Dipanggil oleh:** router, untuk `/metaverse`

Empat ref reveal dan tidak ada logika lain — ia memetakan `PROJECTS` (yaitu
`DIVISION_PROJECTS.metaverse`), array `TECH` lokal, dan array `LEARN` lokal.

Dibungkus dalam `<div className="div-blue">`, yang menyetel variabel CSS
`--accent` yang dibaca `divisions.css` di mana-mana. Satu kelas itu adalah seluruh
mekanisme pewarnaan temanya.

**Jebakan:** ia mengirim `<Nav active="metaverse.html" />`, prop yang `Nav` tidak
terima. Dan statistik heronya ditulis langsung
`['31','Members'],['6','Projects']` sementara `PROJECTS.length` adalah 2.

---

## 22. `src/pages/divisions/Robotics.jsx`

### `ArduinoCanvas()` — Komponen (kanvas)

- **File:** `src/pages/divisions/Robotics.jsx:10`
- **Props:** tidak ada
- **Mengembalikan:** `<canvas width={420} height={420} />`
- **Dipanggil oleh:** `Robotics`

Versi satu-divisi dari `RoboticsCanvas`. Adegan Arduino yang sama pada dimensi
lebih kecil, tanpa prop `active`, tanpa penjedaan. Memuat salinannya sendiri dari
`lerp` (baris 20), `getPt` (baris 21), dan `draw` (baris 23), didokumentasikan di
bagian 11.

### `LiveSensors()` — Komponen

- **File:** `src/pages/divisions/Robotics.jsx:48`
- **Props:** tidak ada
- **Mengembalikan:** panel telemetri enam baris
- **Dipanggil oleh:** `Robotics`, di bagian "LIVE DEMO"

```jsx
const [sensors, setSensors] = useState({ prox:42, torque:78, speed:1240,
                                         temp:36.4, volt:4.98, current:0.32 });
useEffect(() => {
  const id = setInterval(() => setSensors({ /* enam nilai acak baru */ }), 800);
  return () => clearInterval(id);
}, []);
```

Telemetri robot yang palsu tetapi meyakinkan, disegarkan setiap 800 ms.

**`clearInterval` di pembersihnya wajib.** Tanpanya pewaktunya terus menyala
setelah kamu pindah halaman, memanggil `setState` pada komponen yang sudah
dilepas — kebocoran memori plus peringatan React. `setInterval` mengembalikan
sebuah id justru supaya kamu bisa membatalkannya.

**Array `rows`** dibangun ulang pada setiap render, mengubah bacaan mentah menjadi
bentuk tampilan:

```js
{ label:'SPEED', val:`${sensors.speed} rpm`, pct: sensors.speed/1600, color:'#22c97a' },
{ label:'TEMP',  val:`${sensors.temp}°C`,   pct:(sensors.temp-30)/20, color:'#f5a232' },
```

`pct` menormalkan setiap bacaan ke 0–1 terhadap maksimum yang masuk akal supaya
bilahnya bisa dibandingkan. `TEMP` mengurangi 30 dulu, memperlakukan 30 °C sebagai
titik nolnya — kalau tidak, rentang 34–38 °C hampir tidak akan menggerakkan
bilahnya.

Lebar bilahnya dibatasi di render: `width: ${Math.min(r.pct * 100, 100)}%`, jadi
bacaan di luar rentang tidak bisa melimpah dari jalurnya.

`.toFixed(1)` dan `.toFixed(2)` di callback intervalnya membulatkan ke jumlah
desimal tetap, yang mencegah nilainya bergetar sampai enam digit dan menjaga lebar
kolomnya stabil. Perhatikan keduanya mengembalikan **string**, bukan angka —
tidak masalah di sini karena nilainya hanya ditampilkan dan dibagi.

### `Robotics()` — Komponen (halaman)

- **File:** `src/pages/divisions/Robotics.jsx:90`
- **Props:** tidak ada
- **Mengembalikan:** seluruh halaman Robotics
- **Dipanggil oleh:** router, untuk `/robotics`

Bentuk yang sama seperti `Metaverse`, dibungkus `div-green`, dengan bagian tambahan
"LIVE DEMO" yang memuat `<LiveSensors />`. Label bagiannya memakai
`className="section-label green"`.

---

## 23. `src/pages/divisions/Printing.jsx`

### `PrinterCanvas()` — Komponen (kanvas)

- **File:** `src/pages/divisions/Printing.jsx:10`
- **Props:** tidak ada
- **Mengembalikan:** `<canvas width={400} height={420} />`
- **Dipanggil oleh:** `Printing`

Versi satu-divisi dari `PrintingCanvas`. Perbedaan dari versi hero:

| | Versi hero | Versi divisi |
|---|---|---|
| Ukuran | 580 × 580 | 400 × 420 |
| Kerangka | `FW=220, FH=280, BED_H=18` | `FW=200, FH=260, BED_H=16` |
| `useState` untuk lapisan | ada (tak terpakai) | **tidak** |
| Prop `active` / penjedaan | ada | tidak |

Menghilangkan `useState` yang tak terpakai membuat ini implementasi yang lebih
bersih di antara keduanya — ia melacak `curLayer` murni sebagai variabel lokal.

#### `getBedY(l)` — Pembantu

- **File:** `src/pages/divisions/Printing.jsx:18`

```js
const getBedY = l => FY + FH - 36 - l * (FH - 72) / TOTAL;
```

Peran yang sama seperti di `Hero.jsx` dengan konstanta yang disetel untuk kerangka
lebih kecil (36 dan 72 bukan 40 dan 80).

#### `modelW(l)` — Pembantu

- **File:** `src/pages/divisions/Printing.jsx:19`

```js
const modelW = l => { const n = l/TOTAL;
  if (n<0.1)  return 4+n*55;
  if (n<0.5)  return 9;
  if (n<0.7)  return 9+(n-0.5)*28;
  if (n<0.85) return 15-(n-0.7)*42;
  return 8; };
```

Siluet lima pita yang sama, diperkecil sedikit untuk kanvas yang lebih kecil.
Perhatikan konstantanya berbeda dari versi hero (55/9/28/42/8 versus
60/10/30/46/9), jadi kedua objek cetakannya tidak identik piksel per piksel. Edit
keduanya kalau kamu ingin mereka sama.

#### `draw()` — Loop animasi

- **File:** `src/pages/divisions/Printing.jsx:20`

Struktur yang sama seperti versi hero tanpa panggilan `setLayer`.

### `Printing()` — Komponen (halaman)

- **File:** `src/pages/divisions/Printing.jsx:82`
- **Props:** tidak ada
- **Mengembalikan:** seluruh halaman 3D Printing
- **Dipanggil oleh:** router, untuk `/printing`

Dibungkus `div-amber`. Bagian uniknya adalah "PRINT SPECS", sebuah tabel yang
dibangun dengan memetakan array inline berisi pasangan `[label, nilai]` yang
menjelaskan peralatan lab.

**Jebakan:** statistik heronya mengklaim `['22','Members'],['16','Projects']`
sementara `PROJECTS.length` adalah 1.

---

## 24. Fungsi React yang dipakai

Fungsi dari React dan React Router, beserta cara proyek ini memakainya.

| Fungsi | Dipakai di | Apa yang dilakukannya di sini |
|---|---|---|
| `useState(awal)` | 12 komponen | Mendeklarasikan state. Mengembalikan `[nilai, penyetel]`. Memanggil penyetelnya me-render ulang. |
| `useEffect(fn, deps)` | 15+ tempat | Menjalankan `fn` setelah render. `[]` berarti sekali saat mount. `[x]` berarti setiap kali `x` berubah. Mengembalikan sebuah fungsi mendaftarkan pembersih. |
| `useRef(awal)` | 20+ tempat | Kotak `.current` yang bisa diubah dan bertahan antar render tanpa memicunya. Dipakai untuk node DOM, id animasi, dan nilai yang dibaca di dalam loop. |
| `useMemo(fn, deps)` | `About.jsx:157` | Menyimpan nilai terhitung. Di sini ia membekukan posisi bintang yang acak. |
| `useCallback(fn, deps)` | `About.jsx:385, 386` | Menyimpan identitas fungsi, supaya props anaknya tidak tampak berubah. |
| `ReactDOM.createRoot(el)` | `main.jsx` | Membuat akar React pada div `#root`. |
| `.render(elemen)` | `main.jsx` | Memasang `<App />` ke akar itu. |
| `React.StrictMode` | `main.jsx` | Pemanggilan ganda khusus pengembangan untuk memunculkan bug. Tidak aktif di produksi. |
| `useLocation()` | `App.jsx`, `Nav.jsx` | Mengembalikan objek rute saat ini; keduanya memakai `.pathname`. |
| `useNavigate()` | `Terminal.jsx` | Mengembalikan fungsi `navigate(path)` untuk navigasi programatik. |
| `<BrowserRouter>` | `App.jsx` | Mengaktifkan routing History API. |
| `<Routes>` / `<Route>` | `App.jsx` | Tabel pencarian URL ke komponen. |
| `<Link to="…">` | di mana-mana | Navigasi internal tanpa memuat ulang halaman. |

**Bentuk pembaru pada penyetelnya.** `setState(v => !v)` menerima nilai saat ini
dan mengembalikan nilai berikutnya. Utamakan ini daripada `setState(!nilai)`
setiap kali state baru bergantung pada yang lama. Dipakai di `Nav.jsx:69` dan
`Terminal.jsx:144`.

**Array dependensi, secara ringkas.** `useEffect(fn, [])` berjalan sekali.
`useEffect(fn, [x])` berjalan ulang setiap kali `x` berubah. Menghilangkan
arraynya sepenuhnya membuatnya berjalan setelah setiap render — proyek ini tidak
pernah melakukannya, dan kamu sebaiknya juga tidak.

---

## 25. API browser yang dipakai

Fungsi bawaan browser, bukan dari library mana pun.

### Animasi dan pengamatan

| API | Dipakai di | Kegunaan |
|---|---|---|
| `requestAnimationFrame(fn)` | 6 kanvas, `LeadershipTunnel` | Memanggil `fn` sebelum penggambaran berikutnya, ~60 fps. Mengembalikan sebuah id. |
| `cancelAnimationFrame(id)` | setiap pembersih | Menghentikan frame terjadwal. **Melewatkannya menyebabkan kebocoran.** |
| `new IntersectionObserver(cb, opsi)` | `useReveal` | Melaporkan kapan sebuah elemen masuk ke layar. |
| `observer.observe(el)` / `.disconnect()` | `useReveal` | Memulai dan menghentikan pengamatan. |
| `performance.now()` | `LeadershipTunnel` | Cap waktu beresolusi tinggi, menggerakkan angguk kartunya. |
| `setTimeout(fn, ms)` | `Hero`, `Terminal` | Eksekusi tertunda. Dipakai untuk waktu transisi dan untuk menunda kerja sampai setelah sebuah render. |
| `setInterval(fn, ms)` / `clearInterval(id)` | `LiveSensors` | Pewaktu berulang, dan pembatalannya yang wajib. |

### Canvas 2D

Semua dipakai di dalam enam fungsi `draw`. Canvas punya **state menggambar
global** — setel `fillStyle`, lalu setiap `fill()` setelahnya memakainya sampai
kamu mengubahnya lagi. Ini sumber bug kanvas yang paling umum.

| Metode | Kegunaan |
|---|---|
| `canvas.getContext('2d')` | Mendapatkan konteks menggambar. Semua hal lain bergantung padanya. |
| `ctx.clearRect(x,y,w,h)` | Menghapus kanvas. Panggilan pertama setiap frame. |
| `ctx.beginPath()` | Memulai jalur baru. Melupakannya membuat bentuknya terhubung ke yang sebelumnya. |
| `ctx.moveTo` / `lineTo` / `arcTo` / `closePath` | Penyusunan jalur. |
| `ctx.arc(x,y,r,0,Math.PI*2)` | Lingkaran penuh. |
| `ctx.stroke()` / `ctx.fill()` | Menggambar jalur saat ini sebagai garis atau isian. |
| `ctx.fillRect` / `strokeRect` | Jalan pintas persegi. |
| `ctx.fillStyle` / `strokeStyle` / `lineWidth` / `lineCap` | State tampilan. |
| `ctx.createLinearGradient` / `createRadialGradient` | Objek gradien, lalu `.addColorStop(offset, warna)`. |
| `ctx.setLineDash([nyala, mati])` | Garis putus-putus. **Selalu atur ulang dengan `setLineDash([])`.** |
| `ctx.globalAlpha` | Pengali opasitas global. **Selalu atur ulang ke 1.** |
| `ctx.font` / `fillText` / `textAlign` | Teks. `textAlign` juga state global; kodenya mengaturnya ulang ke `'left'` setelah setiap label terpusat. |

### DOM dan kejadian

| API | Dipakai di | Kegunaan |
|---|---|---|
| `addEventListener` / `removeEventListener` | `Nav`, `Hero`, `About`, kanvas | Selalu berpasangan — daftarkan di efeknya, hapus di pembersihnya. |
| `{ passive: true }` | pendengar scroll `Hero` | Berjanji tidak ada `preventDefault()`, jadi scrollnya tetap mulus. |
| `{ passive: false }` | pendengar roda `LeadershipTunnel` | Dibutuhkan supaya bisa memanggil `preventDefault()`. |
| `e.preventDefault()` | `onWheel`, `onTouchMove`, `onKeyDown` | Menekan tindakan bawaan — scroll halaman, atau gerakan kursor. |
| `e.stopPropagation()` | gambar `Lightbox` | Mencegah kliknya mencapai latarnya. |
| `el.getBoundingClientRect()` | kanvas, `Hero` | Posisi dan ukuran elemen relatif terhadap viewport. |
| `el.classList.add('visible')` | `useReveal` | Menambahkan satu kelas tanpa menyentuh yang lain. |
| `el.style.<prop> = …` | `LeadershipTunnel`, dropdown `Nav` | Penulisan inline style langsung. Dipakai untuk animasi 60 fps. |
| `window.scrollTo({top, behavior:'smooth'})` | `Hero`, `ScrollToTop` | Scroll programatik. |
| `window.scrollY` / `innerWidth` / `innerHeight` | `Nav`, `Hero`, `About` | Offset scroll dan ukuran viewport. |
| `el.offsetTop` / `offsetHeight` | `Hero`, `About` | Posisi tata letak dan tinggi. |
| `el.scrollTop` / `scrollHeight` | `Terminal` | Membaca dan menyetel scroll di dalam panel keluaran. |
| `document.body.style.overflow` | `Lightbox` | Mengunci dan membuka scroll halaman. |
| `e.touches[0].clientY` | `LeadershipTunnel` | Posisi vertikal jari pertama. |

---

## 26. Fungsi bawaan JavaScript yang dipakai

Fungsi bahasa standar, dikelompokkan berdasarkan kegunaannya. Kalau kamu baru
mengenal JavaScript, inilah kosakata yang diasumsikan oleh basis kode ini.

### Metode array

| Metode | Mengembalikan | Dipakai untuk |
|---|---|---|
| `.map(fn)` | array baru | Mengubah data menjadi JSX, atau membentuk ulang objek. Kuda pekerja basis kode ini. |
| `.filter(fn)` | array baru | `isUpcoming`, pemfilteran status, menghapus baris `__redirect`. |
| `.find(fn)` | kecocokan pertama atau `undefined` | Pencarian bulan terbalik, menemukan baris pengalihan. |
| `.some(fn)` | boolean | `Nav` memeriksa apakah path saat ini salah satu divisi. |
| `.slice(a, b)` | sub-array | Empat acara pertama, tiga proyek pertama, bagian `TEAM`. |
| `.forEach(fn)` | tidak ada | Loop menggambar dan penyusunan adegan, di mana hasilnya tidak diperlukan. |
| `.reduce(fn, awal)` | satu nilai | Disarankan di buku panduan 15.1 untuk menjumlahkan anggota. |
| `Array.from({length: n}, fn)` | array baru | Menghasilkan partikel dan posisi pin. |
| `.push(x)` | panjang baru | Membangun `lines` terminal dan `allItems` lorong. |
| `[...a, ...b]` (spread) | array baru | Menggandakan marquee, menambah keluaran terminal, `Set` ke array. |

**`map` versus `forEach`:** `map` mengembalikan array baru, jadi pakailah ketika
kamu butuh hasilnya (JSX, data yang dibentuk ulang). `forEach` tidak
mengembalikan apa pun, jadi pakailah untuk efek samping (menggambar ke kanvas,
mengubah gaya elemen).

### Metode objek

| Metode | Dipakai untuk |
|---|---|
| `Object.entries(obj)` | Perintah `projects` di `Terminal`, untuk melooping kunci **dan** nilai. |
| `Object.keys(obj)` | Pencarian bulan terbalik di `Events`. |
| `Object.values(obj)` | Disarankan di buku panduan 15.1. |
| `new Set(array)` | Menghapus duplikat label bulan. |

### Metode string

| Metode | Dipakai untuk |
|---|---|
| `.trim()` | Membersihkan masukan terminal. |
| `.toLowerCase()` | Pencocokan perintah tanpa peduli huruf besar-kecil. |
| `.split(' ')` | Memisahkan perintah dari argumennya. |
| `.padEnd(n)` / `.padStart(n, '0')` | Merapikan kolom keluaran terminal; menambah nol di depan nomor hari. |
| Template literal | Pembangunan string dengan `${}` di mana-mana. |

### Matematika dan angka

| Fungsi | Dipakai untuk |
|---|---|
| `Math.min` / `Math.max` | Pembatasan. Pola `Math.max(0, Math.min(1, x))` memaksa sebuah nilai ke 0–1 dan muncul selusin kali. |
| `Math.floor` | Persentase scroll ke indeks divisi, bilangan bulat acak. |
| `Math.abs` | Besaran kecepatan, uji pantulan arah pemindaian. |
| `Math.round` | Tampilan persentase kemajuan. |
| `Math.random()` | Partikel, bintang, bacaan sensor palsu. |
| `Math.sin` / `Math.cos` | Semua rotasi, pengorbitan, denyut, dan angguk. |
| `Math.PI` | `Math.PI * 2` adalah satu lingkaran penuh, dipakai di setiap panggilan `arc`. |
| `Number(x)` | Mengubah string `day` menjadi angka di `isUpcoming`. |
| `.toFixed(n)` | Tampilan desimal tetap di `LiveSensors`. |
| `String(x)` | Angka ke string untuk tampilan statistik. |
| `n % m` (modulo) | Menggilir pola, membungkus kemajuan, menggantikan sisi. |

### Tanggal

| Fungsi | Dipakai untuk |
|---|---|
| `new Date(y, m, d)` | Membangun tanggal yang bisa dibandingkan di `isUpcoming`. **Bulan dimulai dari nol.** |
| `.getFullYear()` / `.getMonth()` / `.getDate()` | Bagian-bagian hari ini, untuk perbandingan tengah malam. |

### Sintaks yang perlu dinamai

| Sintaks | Arti | Contoh di basis kode ini |
|---|---|---|
| `?.` optional chaining | Memotong ke `undefined` alih-alih melempar galat | `arg?.toLowerCase()`, `inputRef.current?.focus()` |
| `??` nullish coalescing | Nilai cadangan hanya untuk `null`/`undefined` | `TYPE_COLORS[type] ?? '#888'` |
| `&&` penjaga | Sisi kanan hanya berjalan kalau sisi kiri bernilai benar | `{item.img && onOpen(…)}`, `{e.featured && <span>…}` |
| `? :` ternary | Kondisional inline | `isActive ? d.color : 'var(--white)'` |
| `{ a, b }` destrukturisasi | Menarik properti menjadi variabel | `function Marquee({ items, color })` |
| `const [a, ...sisa] = arr` | Destrukturisasi array dengan sisa | `const [cmd, ...args] = trimmed.split(' ')` |
| `{ color }` singkatan | `{ color: color }` | Nilai kembalian `typeTagStyle` |
| `x = bawaan` | Parameter bawaan | `items = DEFAULT_ITEMS` |

---

## 27. Pola yang berulang

Kenali tujuh pola ini dan sebagian besar basis kodenya akan membaca dirinya
sendiri.

**1. Efek mendaftarkan, pembersih menghapus.** Setiap `useEffect` yang memasang
sesuatu melepasnya di fungsi yang dikembalikannya. Pendengar, observer, frame
animasi, interval, dan kunci scroll body semuanya mengikuti pola ini. Kalau kamu
menambah satu dan melewatkan pembersihnya, kamu membuat kebocoran yang menumpuk
pada setiap kunjungan halaman.

**2. Ref untuk nilai berfrekuensi tinggi, state untuk nilai yang di-render.**
Posisi tetikus, id frame animasi, kedalaman kamera, dan indeks divisi sebelumnya
semuanya tinggal di ref karena berubah lebih cepat daripada yang perlu diperbarui
layar. Apa pun yang benar-benar dilihat pengguna tinggal di state.

**3. Penulisan DOM langsung untuk animasi 60 fps.** `LeadershipTunnel` menulis
`el.style.transform` alih-alih memakai state. React memiliki tugas membuat
elemen; loop animasi memiliki tugas mengubahnya. Ini jalan keluar yang disahkan,
bukan akal-akalan — tetapi pakailah hanya ketika kamu benar-benar memperbarui
banyak elemen setiap frame.

**4. Satu state untuk sebuah akordeon.** Menyimpan "yang mana yang terbuka"
alih-alih array boolean memberi sifat saling eksklusif secara gratis. Dipakai di
`DivisionsShowcase` (kunci divisi) dan FAQ `Join` (sebuah indeks).

**5. Tiga warna dari satu.** `color`, `color + '18'`, `color + '33'` untuk teks,
latar, dan batas. Di `typeTagStyle`, `PortfolioCard`, kartu lorong, dan pameran
divisi. Akhiran alfa heks: `12`≈7%, `18`≈9%, `33`≈20%, `55`≈33%.

**6. Nilai cadangan pada setiap pencarian.** `TYPE_COLORS[type] ?? '#888'`,
`TYPE_TAG_STYLE[e.type] ?? 'blue'`. Salah ketik di datanya menurunkan kualitas
tampilan alih-alih menghasilkan `undefined` di sebuah className. Teruskan
kebiasaan ini.

**7. Batasi dengan selimut min/max.** `Math.max(0, Math.min(1, x))` muncul di
scroll hero, penangan roda lorong, dan pemudaran silang daftarnya. Ini cara
idiomatis memaksa sebuah nilai ke dalam suatu rentang.

---

## Ke mana selanjutnya

- **[HANDBOOK.id.md](HANDBOOK.id.md)** — buku panduan lengkap: arsitektur, sistem
  CSS, penelusuran halaman, buku resep perawatan, deployment, masalah yang
  diketahui, dan usulan pengembangan.
- **Bagian 11 buku panduan** adalah buku resepnya — resep praktis untuk menambah
  acara, membuka pendaftaran, dan memperbarui tim.
- **Bagian 14 buku panduan** mencantumkan masalah yang diketahui yang dirujuk
  sebagai "jebakan" di seluruh dokumen ini, beserta perbaikannya masing-masing.
