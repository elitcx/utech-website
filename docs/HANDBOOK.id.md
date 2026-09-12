# Website U-TECH — Buku Panduan Pengurus (Bahasa Indonesia)

> **English version:** [HANDBOOK.en.md](HANDBOOK.en.md)

Ini adalah dokumen serah terima lengkap untuk website URSU Technology (U-TECH).
Dokumen ini ditulis untuk pengurus generasi berikutnya — kamu mungkin belum
pernah menyentuh React sebelumnya. Setiap bagian menjelaskan **apa** sesuatu itu,
**mengapa** dibangun seperti itu, dan **bagaimana** cara mengubahnya.

Baca bagian 1 dan 2 dulu. Setelah itu, bagian 11 ("Buku Resep") adalah bagian
yang akan kamu buka setiap minggu.

---

## Daftar isi

1. [Apa itu website ini](#1-apa-itu-website-ini)
2. [Menjalankannya di komputermu](#2-menjalankannya-di-komputermu)
3. [Teknologi yang dipakai, dan alasan pemilihannya](#3-teknologi-yang-dipakai-dan-alasan-pemilihannya)
4. [Peta folder dan file](#4-peta-folder-dan-file)
5. [Bagaimana sebuah halaman benar-benar dimuat](#5-bagaimana-sebuah-halaman-benar-benar-dimuat)
6. [Routing: bagaimana URL dipetakan ke halaman](#6-routing-bagaimana-url-dipetakan-ke-halaman)
7. [Lapisan data — file yang paling sering kamu edit](#7-lapisan-data--file-yang-paling-sering-kamu-edit)
8. [Komponen bersama dan hook khusus](#8-komponen-bersama-dan-hook-khusus)
9. [Sistem CSS: token, lapisan, dan bahasa warna](#9-sistem-css-token-lapisan-dan-bahasa-warna)
10. [Pembahasan mendalam per halaman](#10-pembahasan-mendalam-per-halaman)
11. [Buku resep: tugas perawatan yang umum](#11-buku-resep-tugas-perawatan-yang-umum)
12. [Gambar dan aset](#12-gambar-dan-aset)
13. [Deployment](#13-deployment)
14. [Masalah yang diketahui, duplikasi, dan utang teknis](#14-masalah-yang-diketahui-duplikasi-dan-utang-teknis)
15. [Ide pengembangan](#15-ide-pengembangan)
16. [Daftar istilah](#16-daftar-istilah)

---

## 1. Apa itu website ini

Website U-TECH adalah **situs rekrutmen dan informasi publik** untuk komunitas
Ursuline Technology di SMA-SMP Regina Pacis Surakarta.

Tugasnya, berdasarkan urutan prioritas:

1. Meyakinkan siswa yang penasaran bahwa bergabung dengan U-TECH itu layak.
2. Menunjukkan apa yang benar-benar dikerjakan tiga divisi, dengan proyek dan
   nama yang nyata.
3. Mengumumkan acara mendatang supaya anggota dan non-anggota tahu apa yang
   sedang berlangsung.
4. Memberi satu tempat untuk mengarahkan orang ketika pendaftaran dibuka.

Ini **murni front-end statis**. Tidak ada backend, tidak ada database, tidak ada
login, dan tidak ada kode sisi server. Semua yang kamu lihat dibangun dari file
data JavaScript yang di-commit ke dalam repositori. Pendaftaran anggota ditangani
oleh Google Form eksternal, dan kontak lewat WhatsApp serta Instagram.

Itu keputusan yang disengaja, dijelaskan di bagian 3.

### Tujuh halaman

| URL | File | Tujuan |
|---|---|---|
| `/` | `src/pages/Home/index.jsx` | Halaman utama. Hero divisi yang digerakkan scroll, terminal interaktif, ringkasan semuanya. |
| `/about` | `src/pages/About.jsx` | Timeline sejarah, lorong kepemimpinan 3-D, portofolio, galeri foto, nilai-nilai. |
| `/events` | `src/pages/Events.jsx` | Daftar acara lengkap dengan filter jenis dan divisi. |
| `/join` | `src/pages/Join.jsx` | Halaman rekrutmen: langkah-langkah, manfaat, gerbang pendaftaran, FAQ. |
| `/metaverse` | `src/pages/divisions/Metaverse.jsx` | Halaman divisi Metaverse & Web Design. |
| `/robotics` | `src/pages/divisions/Robotics.jsx` | Halaman divisi Robotics & Embedded Systems. |
| `/printing` | `src/pages/divisions/Printing.jsx` | Halaman divisi 3D Printing & Rapid Prototyping. |

### Brief desain yang menjadi acuan

`PRODUCT.md` di root repositori adalah brief desain aslinya. File itu
mendefinisikan audiens, kepribadian merek ("mudah didekati, energik, ramah"),
anti-referensi ("situs klub sekolah generik", "perusahaan teknologi korporat yang
dingin"), dan lima prinsip desain. **Baca file itu sebelum melakukan perubahan
visual.** Kalau kamu mengubah tampilan situs, kamu sedang mengikuti brief itu
atau menggantinya secara sadar — tentukan yang mana, dan perbarui `PRODUCT.md`
kalau kamu menggantinya.

---

## 2. Menjalankannya di komputermu

### Prasyarat

- **Node.js 18 atau lebih baru.** Unduh dari [nodejs.org](https://nodejs.org).
  Proyek ini terakhir dikembangkan dengan Node 24 dan npm 11.
- **Git.** Untuk meng-clone repositori dan mengirim perubahan.
- Editor kode. **Visual Studio Code** disarankan; repo sudah menyertakan
  `.vscode/settings.json` dengan daftar kata untuk pemeriksa ejaan agar nama-nama
  Indonesia tidak ditandai salah.

### Pengaturan pertama kali

```bash
git clone https://github.com/elitcx/utech-website.git
cd utech-website
npm install
```

`npm install` membaca `package.json` dan `package-lock.json` lalu mengunduh
setiap dependensi ke dalam `node_modules/`. Folder itu besar dan **tidak**
di-commit ke git (lihat `.gitignore`). Jalankan `npm install` lagi setiap kali
`package.json` berubah.

### Tiga perintah yang kamu butuhkan

```bash
npm run dev
```

Menjalankan server pengembangan Vite, biasanya di `http://localhost:5173`. Server
ini punya **hot module replacement**: simpan sebuah file dan browser langsung
memperbarui tampilan tanpa memuat ulang penuh, posisi scroll pun tetap. Inilah
yang kamu pakai 99% waktu.

```bash
npm run build
```

Menghasilkan bundel produksi yang sudah dioptimalkan di folder `dist/`. Perintah
ini memperkecil JavaScript dan CSS, memberi nama file dengan hash untuk
cache-busting, dan menyalin semua isi `public/`. Kamu jarang perlu
menjalankannya sendiri karena hosting melakukannya untukmu, tetapi ini cara
tercepat menangkap kesalahan sintaks yang ditoleransi server pengembangan.

```bash
npm run preview
```

Menyajikan isi `dist/` secara lokal, seperti server sungguhan. Gunakan untuk
memeriksa build produksi sebelum deploy. Catatan: `npm run preview` **tidak**
mengikuti perubahan kode — ia hanya menyajikan hasil `npm run build` terakhir.

### Alur kerja mengedit

1. `npm run dev` di terminal, biarkan berjalan.
2. Buka `http://localhost:5173` di browser.
3. Edit sebuah file, simpan, perhatikan browser memperbarui diri.
4. Kalau sudah puas, commit dan push. Deployment berjalan otomatis (bagian 13).

---

## 3. Teknologi yang dipakai, dan alasan pemilihannya

### Daftar dependensi sengaja dibuat sangat kecil

```json
"dependencies":    { "react", "react-dom", "react-router-dom" }
"devDependencies": { "vite", "@vitejs/plugin-react" }
```

Lima paket. Tidak ada library UI, tidak ada framework CSS, tidak ada library
animasi, tidak ada library manajemen state, tidak ada klien CMS. Setiap efek
visual di situs ini ditulis tangan dengan CSS biasa dan Canvas 2D API.

**Mengapa ini penting bagimu:** website klub siswa dirawat oleh siapa pun yang
menjabat tahun itu. Kalau situs ini bergantung pada Tailwind, Framer Motion,
Redux, dan sebuah headless CMS, pengurus berikutnya harus mempelajari empat alat
tambahan sebelum bisa memperbaiki satu salah ketik. Dengan lima paket, satu-satunya
hal yang wajib kamu pelajari adalah React — dan komponen dalam proyek ini sengaja
dibuat sebagai React yang sederhana.

Harga dari pilihan ini adalah beberapa kode jadi lebih panjang daripada kalau
memakai library (kanvas hero, misalnya, ratusan baris kode menggambar).
Pertukaran itu diambil secara sadar: lebih banyak baris, lebih sedikit konsep.

### React 18 — model komponen

React membuatmu membangun halaman dari **komponen**: fungsi yang mengembalikan
markup mirip HTML (disebut JSX). Sebuah komponen bisa menerima masukan (**props**)
dan menyimpan datanya sendiri yang bisa berubah (**state**).

Model berpikir utamanya: ketika state berubah, React menjalankan ulang fungsi
komponen itu dan memperbarui hanya bagian halaman nyata yang berbeda. Kamu tidak
pernah menulis `document.getElementById(...)` untuk mengubah teks. Kamu mengubah
state dan membiarkan React menggambar ulang.

Contoh dari `src/components/Nav.jsx`:

```jsx
const [menuOpen, setMenuOpen] = useState(false);
// ...
<button onClick={() => setMenuOpen(true)}>☰</button>
<div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}>
```

Mengklik tombol memanggil `setMenuOpen(true)`. React menjalankan ulang `Nav`,
className sekarang memuat `open`, dan aturan CSS
`.mobile-nav-overlay.open { display: flex }` membuat menu muncul. Tidak ada kode
DOM manual sama sekali.

**React Strict Mode** diaktifkan di `src/main.jsx`. Dalam mode pengembangan ia
sengaja menjalankan sebagian kode dua kali untuk mengungkap bug. Inilah sebabnya
kode animasi dalam proyek ini berhati-hati membersihkan dirinya sendiri (lihat
pembersihan `useEffect` di bagian 10). Ini **tidak** terjadi di produksi.

### React Router 6 — satu halaman, banyak URL

Situs ini adalah **aplikasi satu halaman (single-page application, SPA)**. Browser
memuat satu file HTML (`index.html`) sekali saja; setelah itu, mengklik tautan
tidak mengambil halaman baru dari server. React Router menukar komponen yang
ditampilkan dan memperbarui bilah URL.

Hasilnya: navigasi terasa instan, dan hal-hal yang sudah dimuat (misalnya font)
tetap tersimpan. Harganya: server harus diberi tahu untuk mengirim `index.html`
untuk *setiap* URL, kalau tidak me-refresh `/about` akan menghasilkan 404. Itulah
tepatnya yang dilakukan `vercel.json` — lihat bagian 13.

### Vite 6 — alat build

Vite adalah server pengembangan sekaligus bundler. Dua hal yang diberikannya:

- **Server pengembangan instan.** Vite menyajikan file sumbermu sebagai modul ES
  native, sehingga waktu mulai hampir nol tanpa bergantung ukuran proyek.
- **Build produksi yang dioptimalkan.** `npm run build` membuang kode yang tidak
  terpakai, memperkecil file, dan memberi sidik jari pada nama file
  (`index-a1b2c3.js`) sehingga browser menyimpan cache secara agresif tetapi
  selalu mendapat versi baru setelah deploy.

`vite.config.js` hanya empat baris — cuma plugin React. Tidak ada konfigurasi
build khusus yang perlu dipahami.

### CSS biasa — tanpa framework

Penataan gaya ditulis tangan dalam tujuh file CSS, diatur berdasarkan cakupan
(bagian 9). Token desain tinggal di CSS custom property pada `:root`. Tidak ada
pemrosesan CSS saat build selain yang Vite lakukan otomatis.

**Mengapa tanpa Tailwind:** situs ini bersandar pada satu set kecil warna,
spasi, dan ukuran huruf yang konsisten. Custom property mengungkapkannya dengan
bersih, dan pengurus yang tahu CSS dasar bisa langsung bekerja. Tailwind akan
menambah sebuah file konfigurasi, satu kosakata kelas untuk dihafal, dan sebuah
langkah build.

**Di mana aturan ini dilonggarkan:** beberapa komponen memakai **inline style**
React (`style={{ ... }}`) alih-alih kelas CSS. Itu terjadi ketika sebuah nilai
*dihitung dari data* — paling sering warna divisi. Contoh dari
`DivisionsShowcase.jsx`:

```jsx
<div className="div-card-name" style={{ color: isActive ? d.color : 'var(--white)' }}>
```

Warnanya bergantung pada divisi mana yang diwakili kartu ini, jadi nilai itu
tidak bisa tinggal di stylesheet statis tanpa menulis tiga aturan yang nyaris
identik. Inline style adalah alat yang tepat di sana.

Aturan praktis yang dipakai di seluruh basis kode ini:

- **Tampilan tetap** (tata letak, spasi, tipografi, keadaan hover) → kelas CSS.
- **Nilai yang berasal dari data** (warna aksen divisi, lebar bilah kemajuan,
  `maxHeight` yang dihitung) → inline style.

Kalau kamu melihat blok inline style panjang untuk tampilan *tetap* — ada
beberapa di `Events.jsx`, `Join.jsx`, dan `About.jsx` — itu utang teknis,
dicatat di bagian 14.

### Canvas 2D — animasinya

Ilustrasi hero (kubus wireframe yang berputar, papan Arduino, printer 3-D)
digambar dengan **Canvas 2D API**: sebuah elemen `<canvas>` ditambah JavaScript
yang mengeluarkan perintah menggambar enam puluh kali per detik.

**Mengapa canvas dan bukan SVG atau library 3-D:** ini adegan beranimasi dengan
puluhan bagian bergerak, partikel, dan gradien. SVG akan membuat ratusan node DOM
dan tersendat. Three.js akan menambah sekitar 600 KB ke bundel hanya untuk tiga
ilustrasi. Canvas sudah tersedia di setiap browser, tidak berbiaya apa pun, dan
menangani ini dengan nyaman.

**Mengapa matematika 3-D ditulis tangan:** kubus dan oktahedron memakai fungsi
rotasi dan proyeksi perspektif yang sangat kecil (sekitar 10 baris, di
`Hero.jsx`). Itu lebih sedikit kode daripada mengimpor library, dan sepenuhnya
bisa diperiksa.

---

## 4. Peta folder dan file

```
utech-website/
├── index.html                 ← satu-satunya kerangka HTML (font, favicon, div #root)
├── package.json               ← dependensi dan skrip dev/build/preview
├── package-lock.json          ← versi dependensi yang tepat (commit file ini!)
├── vite.config.js             ← konfigurasi Vite: hanya plugin React
├── vercel.json                ← aturan rewrite SPA untuk hosting
├── README.md                  ← deskripsi komunitas untuk publik
├── PRODUCT.md                 ← brief desain asli; baca sebelum mendesain ulang
├── .gitignore                 ← node_modules/, dist/, .env, .claude/
├── .gitattributes             ← menormalkan akhir baris antara Windows/macOS
├── .vscode/settings.json      ← daftar kata untuk pemeriksa ejaan
│
├── public/                    ← disalin apa adanya ke hasil build, tidak diproses
│   └── uploads/               ← semua gambar situs. Dirujuk sebagai "/uploads/x.webp"
│       ├── logo.png           ← dipakai nav, footer, favicon, kartu about
│       ├── 3dprint.webp       ← thumbnail portofolio
│       ├── irgl.webp          ← foto galeri
│       └── ... (15 file)
│
├── docs/                      ← buku panduan ini
│   ├── HANDBOOK.en.md
│   └── HANDBOOK.id.md
│
├── dist/                      ← hasil build. Dihasilkan otomatis; tidak di-commit.
│
└── src/
    ├── main.jsx               ← titik masuk: memasang <App> ke dalam #root
    ├── App.jsx                ← router + ScrollToTop
    │
    ├── config/
    │   └── signup.js          ← ★ saklar buka/tutup pendaftaran, URL form, URL kontak
    │
    ├── data/
    │   ├── events.js          ← ★ semua acara, plus peta jenis→warna
    │   └── projects.js        ← ★ semua proyek divisi, plus peta status→warna
    │
    ├── hooks/
    │   └── useReveal.js       ← hook animasi muncul-saat-discroll
    │
    ├── components/            ← dipakai lebih dari satu halaman
    │   ├── Nav.jsx            ← bilah atas tetap, dropdown divisi, menu mobile
    │   ├── Footer.jsx         ← logo, tautan sosial, kredit
    │   └── Marquee.jsx        ← ticker kata kunci bergulir
    │
    ├── pages/
    │   ├── About.jsx          ← 523 baris: timeline, lorong 3-D, portofolio, galeri
    │   ├── Events.jsx         ← daftar acara yang bisa difilter
    │   ├── Join.jsx           ← langkah, manfaat, gerbang pendaftaran, akordeon FAQ
    │   │
    │   ├── Home/              ← halaman utama, dipecah jadi delapan file bagian
    │   │   ├── index.jsx      ← menyusun bagian-bagian secara berurutan
    │   │   ├── Hero.jsx       ← 473 baris: hero digerakkan scroll + tiga kanvas
    │   │   ├── DivisionsShowcase.jsx ← tiga kartu divisi yang bisa dibuka
    │   │   ├── Terminal.jsx   ← shell tiruan yang interaktif
    │   │   ├── HomeAbout.jsx  ← blok singkat "siapa kami"
    │   │   ├── Pillars.jsx    ← enam kartu "apa yang kami lakukan"
    │   │   ├── HomeEvents.jsx ← empat acara mendatang terdekat
    │   │   └── CTA.jsx        ← ajakan bertindak penutup
    │   │
    │   └── divisions/         ← tiga halaman divisi yang nyaris identik
    │       ├── Metaverse.jsx  ← biru,  kanvas kubus wireframe
    │       ├── Robotics.jsx   ← hijau, kanvas Arduino + panel sensor langsung
    │       └── Printing.jsx   ← amber, kanvas printer + tabel spesifikasi lab
    │
    └── styles/
        ├── global.css         ← token desain, reset, noise pada body, keyframes
        ├── shared.css         ← tombol, nav, footer, marquee, reveal, chip
        ├── home.css           ← khusus halaman utama (989 baris)
        ├── about.css          ← khusus halaman about, termasuk lorong 3-D
        ├── events.css         ← khusus halaman events
        ├── join.css           ← khusus halaman join
        └── divisions.css      ← dipakai bersama oleh ketiga halaman divisi
```

★ = tiga file yang memuat konten yang bisa diedit. Kalau seseorang meminta
"perbarui websitenya", perubahannya biasanya ada di salah satu dari ketiga file
ini.

Ada juga folder `uploads/` yang tertinggal di root repositori berisi satu
tangkapan layar. Folder itu **tidak** disajikan ke pengunjung — hanya
`public/uploads/` yang disajikan. Aman untuk dihapus.

---

## 5. Bagaimana sebuah halaman benar-benar dimuat

Memahami urutan ini membuat semua bagian selanjutnya lebih mudah.

**Langkah 1 — browser meminta sebuah URL.** Misalnya pengunjung membuka
`https://situsmu.com/events`.

**Langkah 2 — hosting menulis ulang permintaan itu.** `vercel.json` berisi:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Setiap path, apa pun isinya, dijawab dengan `index.html`. URL di bilah alamat
tetap `/events`.

**Langkah 3 — `index.html` dimuat.** File ini sengaja dibuat hampir kosong:

```html
<link rel="icon" href="/uploads/logo.png" />
<title>URSU Technology</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk...DM+Sans...Space+Mono..." rel="stylesheet" />
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

Tiga hal terjadi di sini: favicon dan judul halaman diatur, tiga font Google
diambil (dengan petunjuk `preconnect` untuk mempercepatnya), dan sebuah
`<div id="root">` kosong dibuat sebagai titik pemasangan.

**Langkah 4 — `src/main.jsx` berjalan.**

```jsx
import './styles/global.css';
import './styles/shared.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
```

Dua stylesheet diimpor di sini, yang membuat keduanya **global untuk setiap
halaman**: `global.css` (token desain dan reset) dan `shared.css` (nav, footer,
tombol). Stylesheet khusus halaman justru diimpor di dalam file halamannya
masing-masing.

**Langkah 5 — `App.jsx` menentukan apa yang ditampilkan.** Ia membaca URL dan
me-render komponen rute yang cocok. Untuk `/events` itu adalah `<Events />`.

**Langkah 6 — komponen halaman di-render.** `Events.jsx` mengimpor stylesheet-nya
sendiri (`import '../styles/events.css'`), membaca `ALL_EVENTS` dari lapisan
data, memfilternya, dan mengembalikan markup. `<Nav />` dan `<Footer />`
disertakan oleh halaman itu sendiri.

**Langkah 7 — efek berjalan.** Setelah React menggambar, hook `useEffect`
menyala: pendengar scroll terpasang, `IntersectionObserver` mulai mengawasi
animasi reveal, loop animasi kanvas dimulai.

**Langkah 8 — navigasi selanjutnya melewati langkah 1–4.** Mengklik sebuah
`<Link>` ke `/join` tidak menyentuh jaringan. React Router menukar komponennya,
`ScrollToTop` melompat ke atas, dan halaman baru di-render. Inilah sebabnya
navigasi terasa instan.

---

## 6. Routing: bagaimana URL dipetakan ke halaman

Seluruh routing tinggal di satu file pendek, `src/App.jsx`:

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

Tiga bagian:

- **`BrowserRouter`** mengaktifkan URL bersih memakai History API browser (tanpa
  fragmen `#`).
- **`Routes` / `Route`** adalah tabel pencarian. Satu baris per halaman.
- **`ScrollToTop`** adalah komponen kecil yang didefinisikan di file yang sama:

```jsx
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
```

Komponen ini tidak me-render apa pun. Satu-satunya tugasnya adalah efek samping:
setiap kali path berubah, scroll ke atas. Tanpa ini, mengklik tautan footer saat
kamu sudah scroll setengah halaman utama akan mendaratkanmu di tengah halaman
baru. Ini perbaikan standar SPA yang tidak dilakukan router untukmu.

### Aturan penting soal tautan

**Di dalam aplikasi, selalu pakai `<Link to="/join">`, jangan `<a href="/join">`.**

Tag `<a>` memicu muat ulang halaman penuh: browser membuang aplikasi React,
mengunduh ulang semuanya, dan navigasi terasa lambat. `<Link>` ditangani oleh
router di dalam memori.

Pakai tag `<a>` sungguhan hanya untuk:

- **URL eksternal** (Instagram, GitHub, WhatsApp, Google Form). Selalu tambahkan
  `target="_blank" rel="noopener noreferrer"` — atribut `rel` adalah langkah
  keamanan yang mencegah halaman yang dibuka memanipulasi halamanmu.
- **Jangkar di halaman yang sama** seperti `<a href="#projects">`, yang melompat
  ke elemen dengan `id="projects"`. Scroll halusnya berasal dari
  `html { scroll-behavior: smooth }` di `global.css`.

### Tidak ada rute 404

Kalau seseorang membuka `/contact`, `Routes` tidak menemukan kecocokan dan
halaman tampil kosong — tanpa nav, tanpa footer, tanpa pesan. Menambahkan rute
penangkap-semua adalah kontribusi pertama yang bagus; lihat bagian 15.

### Menambah halaman baru

1. Buat komponennya, misalnya `src/pages/Resources.jsx`. Sertakan `<Nav />` di
   atas dan `<Footer />` di bawah — router tidak menambahkannya untukmu.
2. Impor di `App.jsx` dan tambahkan
   `<Route path="/resources" element={<Resources />} />`.
3. Tambahkan ke `NAV_LINKS` di `src/components/Nav.jsx` supaya muncul di menu.

Hanya tiga langkah itu. Tidak ada yang lain yang perlu disentuh.

---

## 7. Lapisan data — file yang paling sering kamu edit

Ini adalah inti dari merawat situs. Konten dipisahkan dari tampilan: kamu mengedit
sebuah array JavaScript, dan komponen-komponennya me-render ulang dirinya di
sekeliling data baru itu.

### 7.1 `src/config/signup.js` — saklar rekrutmen

```js
export const SIGNUP_CONFIG = {
  isOpen: false,
  googleFormUrl: '',
  nextIntakeDate: 'September 2026',
  showNextIntakeDate: true,
};

export const CONTACT_URL = 'https://wa.me/6282261592211';
```

Empat pengaturan dan satu tautan kontak. `isOpen` adalah saklar utama yang
mengubah perilaku situs di tiga tempat terpisah:

| Di mana | `isOpen: false` | `isOpen: true` |
|---|---|---|
| Panel pendaftaran `/join` | Lencana abu-abu "Sign-ups currently closed", tanggal angkatan berikutnya, tombol Instagram | Lencana hijau berdenyut "Sign-ups are open", tombol menuju `googleFormUrl` |
| Subjudul hero `/join` | "…Sign-ups open periodically. Scroll down to stay in the loop." | "…Sign-ups are open now. Scroll down to apply." |
| Terminal beranda, perintah `join <divisi>` | Pesan amber "Registration is currently closed" + tanggal angkatan berikutnya | Pesan hijau "Registration is open!" lalu otomatis diarahkan ke `/join` setelah 0,9 detik |

`showNextIntakeDate` mengatur apakah tanggalnya ditampilkan sama sekali. Kalau
nilainya `false`, atau `nextIntakeDate` kosong, keadaan tertutup akan memakai
pesan alternatif "Check our Instagram @ursutech for updates."

`CONTACT_URL` dipakai oleh tepat satu hal: tautan **Contact** di footer. Mengubah
nomor WhatsApp di sini memperbaruinya di seluruh situs.

> **⚠ Jebakan penting.** `googleFormUrl` saat ini berupa string kosong. Kalau
> kamu menyetel `isOpen: true` tanpa mengisi URL form-nya, tombol besar "Open
> Sign-Up Form" akan tampil dan bisa diklik, tetapi tidak menuju ke mana pun.
> **Selalu setel keduanya bersamaan.**

### 7.2 `src/data/events.js` — setiap acara di situs

Tiga ekspor.

**`TYPE_COLORS`** memetakan jenis acara ke warna heks, dipakai untuk angka
tanggal besar dan pil jenis acara di `/events`:

```js
export const TYPE_COLORS = {
  Hackathon: '#5570f1',  Workshop: '#22c97a',  'Build Night': '#5570f1',
  Networking: '#f5a232', Social: '#22c97a',
};
```

**`TYPE_TAG_STYLE`** memetakan jenis yang sama ke nama kelas CSS (`blue`,
`green`, `amber`), dipakai oleh baris acara ringkas di halaman utama:

```js
export const TYPE_TAG_STYLE = {
  Hackathon: 'blue', Workshop: 'green', 'Build Night': 'blue',
  Networking: 'amber', Social: 'green',
};
```

Dua peta ini ada karena kedua permukaan itu menata tagnya secara berbeda — yang
satu menghitung warna inline dari nilai heks, yang lain menyalakan kelas CSS
yang sudah ditulis. Kalau kamu menambah jenis acara baru, **tambahkan ke kedua
peta**, kalau tidak halaman events akan jatuh ke abu-abu `#888` dan halaman utama
jatuh ke `blue`.

**`ALL_EVENTS`** adalah array acaranya. Satu objek per acara:

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

| Field | Wajib | Catatan |
|---|---|---|
| `id` | ya | Angka unik apa saja. React memakainya sebagai kunci daftar. |
| `month` | ya | Tiga huruf kapital: `JAN`…`DEC`. Harus cocok dengan `MONTH_INDEX`. |
| `day` | ya | String. Dua digit sesuai konvensi (`'09'`), walaupun `'1'` juga berfungsi. |
| `year` | ya | Angka, misalnya `2026`. |
| `title` | ya | Ditampilkan sebagai nama acara. |
| `type` | ya | Harus berupa kunci di `TYPE_COLORS`. |
| `location` | ya | Teks bebas, ditampilkan di samping ikon pin. |
| `time` | ya | Teks bebas. Bisa rentang jam atau rentang tanggal. |
| `desc` | ya | Satu atau dua kalimat. Hanya tampil di `/events`. |
| `division` | ya | `'All'`, `'Metaverse'`, `'Robotics'`, atau `'3D Printing'`. |
| `featured` | tidak | `true` menambah batas biru, latar bernuansa, dan lencana "Featured". |
| `capacity` | tidak | Teks bebas seperti `'5 spots'`. Ditampilkan dengan ikon orang. |

**`isUpcoming`** adalah fungsi yang menggantikan penanda manual "lalu/mendatang":

```js
const MONTH_INDEX = { JAN:0, FEB:1, ..., DEC:11 };

export const isUpcoming = e =>
  new Date(e.year, MONTH_INDEX[e.month], Number(e.day)) >=
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
```

Fungsi ini membangun sebuah `Date` dari tiga field acara dan membandingkannya
dengan hari ini pada tengah malam. Memakai tengah malam alih-alih `new Date()`
berarti **acara yang berlangsung hari ini masih terhitung mendatang**, dan itulah
yang kamu inginkan.

Konsekuensi praktisnya: **acara hilang dari situs dengan sendirinya.** Kamu tidak
perlu menandai apa pun sebagai lalu. Sehari setelah sebuah acara, ia berhenti
muncul di daftar mendatang, penghitung "Upcoming Events" berkurang satu, dan
halaman utama otomatis menarik acara berikutnya.

Sayangnya `MONTH_INDEX` dideklarasikan dua kali — sekali di sini dan sekali di
bagian atas `Events.jsx`. Lihat bagian 14.

### 7.3 `src/data/projects.js` — proyek divisi

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

Ketiga kunci (`metaverse`, `robotics`, `printing`) memakai huruf kecil dan
dipakai sebagai kunci pencarian oleh lima komponen berbeda. **Jangan mengganti
namanya.**

`status` harus salah satu dari tiga kunci `STATUS_COLORS`. Status yang tidak
dikenali menghasilkan warna `undefined` dan pil yang tampak rusak.

Satu file ini memasok jumlah tempat yang luar biasa banyak:

| Pengguna | Apa yang dibaca |
|---|---|
| `Hero.jsx` | `DIVISION_PROJECTS.<div>.length` → statistik "Projects" di panel hero |
| `DivisionsShowcase.jsx` | `.length` untuk statistik, `.slice(0, 3)` untuk daftar proyek di kartu yang terbuka |
| `Terminal.jsx` | memfilter `status === 'Active'` di seluruh divisi untuk perintah `projects` |
| `Metaverse.jsx` / `Robotics.jsx` / `Printing.jsx` | array penuh → grid kartu proyek |

Jadi menambah satu objek proyek memperbarui sebuah penghitung di hero halaman
utama, sebuah penghitung dan daftar di kartu divisi halaman utama, sebuah baris
di terminal, dan sebuah kartu di halaman divisi. Itulah hasil dari lapisan data.

---

## 8. Komponen bersama dan hook khusus

### 8.1 `useReveal` — animasi muncul saat discroll

`src/hooks/useReveal.js` hanya lima belas baris dan dipakai hampir di setiap
bagian situs.

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

**Cara memakainya** — dua bagian, selalu bersamaan:

```jsx
const ref = useReveal();
// ...
<div className="reveal" ref={ref}> …isi… </div>
```

**Cara kerjanya.** CSS pasangannya ada di `shared.css`:

```css
.reveal         { opacity: 0; transform: translateY(28px);
                  transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

Elemen dimulai tak tampak dan tergeser 28 piksel ke bawah. Sebuah
`IntersectionObserver` mengawasinya; begitu 12% bagiannya masuk ke layar, callback
observer menambahkan kelas `visible`, dan CSS menganimasikannya ke tempatnya
dalam 0,7 detik.

**Mengapa observer dan bukan pendengar scroll.** Penangan scroll menyala pada
setiap piksel pergerakan, menjalankan JavaScript-mu di thread utama, dan butuh
pembatasan laju. `IntersectionObserver` diimplementasikan di dalam browser,
menyala hanya ketika ambang batas dilewati, dan praktis tanpa biaya. Ia alat yang
benar untuk "beri tahu saya kapan ini tampil di layar".

**Detail penting:**

- Kelasnya hanya pernah **ditambahkan**, tidak pernah dihapus. Konten muncul
  sekali lalu tetap. Itu disengaja: animasi ulang setiap kali discroll lewat itu
  menjengkelkan.
- `obs.disconnect()` di fungsi pembersih berjalan saat komponen dilepas
  (misalnya ketika kamu pindah halaman). Tanpanya, observer akan menumpuk.
- **Satu hook per elemen.** Setiap panggilan mengembalikan ref-nya sendiri, jadi
  bagian yang punya tiga blok beranimasi mandiri memanggil `useReveal()` tiga
  kali. Kamu bisa melihatnya di `Join.jsx`:
  `const r1 = useReveal(), r2 = useReveal(), r3 = ..., r4 = ...`.
- Hook ini sebagian menghormati preferensi gerak berkurang: `global.css` punya
  `@media (prefers-reduced-motion: reduce) { .reveal { transform: none !important } }`,
  sehingga gerak menggeliser dihilangkan tetapi pudar singkatnya tetap ada.

### 8.2 `Nav.jsx` — bilah atas

Disertakan secara manual oleh setiap halaman (komponen ini tidak ada di
`App.jsx`). Ia menyimpan tiga state:

```jsx
const [scrolled, setScrolled]  = useState(false);  // sudahkah pengguna scroll melewati 30px?
const [menuOpen, setMenuOpen]  = useState(false);  // apakah overlay mobile terbuka?
const [divOpen,  setDivOpen]   = useState(false);  // apakah dropdown Divisions terbuka?
```

**Efek mengecil saat discroll.** Pendengar scroll membalikkan `scrolled` ketika
`window.scrollY > 30`, yang menambahkan kelas `scrolled`. CSS lalu mengecilkan
bilah dari 64 px menjadi 56 px dan mengubah batas bawahnya menjadi biru.
Pendengarnya dihapus di fungsi pembersih `useEffect`.

**Menutup menu otomatis saat navigasi.** Efek kedua mengawasi `location.pathname`
dan menutup kedua menu setiap kali path berubah. Tanpa ini, menyentuh tautan di
overlay mobile akan berpindah halaman tetapi meninggalkan overlay menutupi
halaman baru.

**Daftar tautan adalah data, bukan markup:**

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

Bilah desktop me-render `NAV_LINKS.filter(l => !l.cta)` sebagai tautan biasa,
lalu dropdown Divisions, lalu tombol "Join Us" secara terpisah (tombol itu butuh
perlakuan biru pekat, jadi dikecualikan dari loop normal oleh penanda
`cta: true`).

Overlay mobile me-render `[...NAV_LINKS, ...DIV_LINKS]` sebagai satu daftar rata
— di ponsel tidak ada ruang untuk dropdown hover, jadi divisi menjadi entri
tingkat atas, masing-masing diberi nuansa `color`-nya sendiri.

**Penyorotan tautan aktif** adalah perbandingan langsung: `pathname === l.to`
menambahkan kelas `active`, yang menampilkan garis bawah. Pemicu Divisions
ditandai aktif ketika `DIV_LINKS.some(d => d.to === pathname)` — yaitu, ketika
kamu berada di halaman divisi mana pun.

**Dropdown-nya** terbuka pada `onMouseEnter` dari `<li>` dan tertutup pada
`onMouseLeave`, dengan saklar `onClick` sebagai cadangan untuk perangkat sentuh.
Ia membawa `aria-haspopup` dan `aria-expanded` supaya pembaca layar
mengumumkannya dengan benar, dan Escape menutupnya. Perhatikan bahwa penataan
gaya dropdown ini inline alih-alih di CSS — ketidakkonsistenan kecil, dicatat di
bagian 14.

**Untuk menambah tautan nav:** tambahkan satu objek ke `NAV_LINKS`. Desktop dan
mobile memperbarui diri otomatis.

### 8.3 `Footer.jsx`

Statis kecuali satu impor: `CONTACT_URL` dari file konfigurasi. Memuat logo, tiga
tautan (Instagram, GitHub, Contact), tahun hak cipta, dan kredit penulis. Tahun
`© 2026` adalah teks yang ditulis langsung — perbarui manual setiap Januari, atau
ganti dengan `new Date().getFullYear()`.

### 8.4 `Marquee.jsx` — ticker bergulir

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

**Trik penggandaan adalah keseluruhan komponen ini.** Animasi CSS-nya:

```css
.marquee-track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
```

Track berisi daftar itu dua kali dan dianimasikan tepat ke `-50%` dari lebarnya
sendiri. Di akhir animasi, salinan kedua berada tepat di posisi awal salinan
pertama — jadi ketika ia kembali ke `0`, tidak ada yang berubah secara terlihat.
Gulirannya tampak tanpa ujung dan mulus. Hapus penggandaannya, atau ubah `-50%`,
dan kamu akan mendapat lompatan yang kelihatan.

**Pemakaian.** `items` secara bawaan berisi daftar kata kunci teknologi umum.
Halaman mengirim daftarnya sendiri:

```jsx
<Marquee items={['Free to Join','No Experience Needed','All Students Welcome', /*…*/]} />
```

Prop `color` (`'green'` atau `'amber'`) memberi nuansa pada titik pemisah, tetapi
saat ini tidak pernah dikirim dari mana pun — titiknya selalu biru.

---

## 9. Sistem CSS: token, lapisan, dan bahasa warna

### 9.1 Token desain

`global.css` dibuka dengan setiap warna, font, dan radius yang dipakai di situs,
dideklarasikan sebagai CSS custom property pada `:root`:

```css
:root {
  --bg:  #07090f;   /* latar halaman — hampir hitam dengan nuansa biru */
  --bg2: #0c1018;   /* latar bagian bergantian, latar kartu */
  --bg3: #111622;   /* keadaan hover, latar kartu bersarang */

  --blue:         #5570f1;              /* aksen utama · Metaverse */
  --blue-dim:     #3d52c4;
  --blue-glow:    rgba(85,112,241,0.18);
  --green:        #1a6b4a;              /* hijau gelap, untuk isian tombol */
  --green-bright: #22c97a;              /* hijau aksen · Robotics */
  --green-glow:   rgba(34,201,122,0.15);
  --amber:        #f5a232;              /* amber aksen · 3D Printing */

  --white:       #f0f2f8;                  /* teks isi */
  --white-dim:   rgba(240,242,248,0.55);   /* teks sekunder */
  --white-faint: rgba(240,242,248,0.08);

  --mono:    'Space Mono', monospace;       /* label, tag, terminal, statistik */
  --sans:    'DM Sans', sans-serif;         /* teks isi */
  --display: 'Space Grotesk', sans-serif;   /* judul, angka besar */

  --border:      rgba(255,255,255,0.07);
  --border-blue: rgba(85,112,241,0.3);
  --r: 6px;
}
```

**Selalu pakai tokennya, jangan nilai mentahnya.** Menulis
`color: var(--white-dim)` alih-alih `color: rgba(240,242,248,0.55)` berarti
desain ulang di masa depan hanya mengubah satu baris. Satu-satunya pengecualian
yang sah adalah nilai warna yang dihitung di JavaScript dari data — nilai itu
memang harus memakai string heks, karena `DIVISION_PROJECTS` dan objek divisi
perlu melakukan operasi padanya (`d.color + '55'` untuk menambah alfa).

### 9.2 Bahasa tiga warna divisi

Ini konvensi visual terpenting di situs, dinyatakan sebagai prinsip 5 di
`PRODUCT.md`: *satu klub, tiga suara yang berbeda*.

| Divisi | Warna | Token | Heks |
|---|---|---|---|
| Metaverse & Web Design | Biru | `--blue` | `#5570f1` |
| Robotics & Embedded Systems | Hijau | `--green-bright` | `#22c97a` |
| 3D Printing & Rapid Prototyping | Amber | `--amber` | `#f5a232` |

Biru sekaligus berfungsi sebagai aksen utama umum situs, yang membuat divisi
Metaverse terasa seperti "bawaan" — perlu diketahui kalau kamu suatu saat
menyeimbangkan ulang palet.

Warnanya diterapkan melalui tiga mekanisme berbeda tergantung konteks:

**1. Inline style yang digerakkan data** — di halaman utama, tempat ketiga divisi
muncul berdampingan. Setiap objek divisi membawa `color`-nya sendiri, dan
komponen menyisipkannya:

```jsx
{ div: 'robotics', color: '#22c97a', glowColor: 'rgba(34,201,122,0.1)', /* … */ }
// ...
<div className="div-card-num" style={{ color: d.color }}>
<div style={{ background: d.color + '12', borderColor: d.color + '55' }}>
```

Akhiran `+ '12'` dan `+ '55'` adalah kanal alfa heks — menambahkan dua digit heks
pada warna 6-digit membuatnya menjadi RGBA 8-digit. `12` ≈ opasitas 7%, `55` ≈
33%. Ini cara ringkas menurunkan satu nuansa dan satu batas dari satu warna dasar.

**2. Penimpaan variabel CSS per halaman** — di halaman divisi. `divisions.css`
mendefinisikan tiga kelas pembungkus:

```css
.div-blue  { --accent: #5570f1; --accent-glow: rgba(85,112,241,0.18); --accent-dim: rgba(85,112,241,0.25); }
.div-green { --accent: #22c97a; --accent-glow: rgba(34,201,122,0.15); --accent-dim: rgba(34,201,122,0.25); }
.div-amber { --accent: #f5a232; --accent-glow: rgba(245,162,50,0.15); --accent-dim: rgba(245,162,50,0.25); }
```

Setiap halaman divisi membungkus seluruh isinya dengan salah satu kelas itu:

```jsx
export default function Robotics() {
  return <div className="div-green"> … </div>;
}
```

Setiap aturan di dalam `divisions.css` lalu merujuk ke `var(--accent)` tanpa
perlu tahu sedang berada di divisi mana. Inilah sebabnya ketiga halaman berbagi
satu stylesheet alih-alih memiliki tiga salinan. **Ini pola terbersih dalam basis
kode ini** — kalau kamu menambah divisi keempat, kamu menambah tiga baris CSS dan
mengubah satu nama kelas, dan seluruh halaman berganti tema.

**3. Kelas pengubah** — untuk elemen kecil yang berulang:

```css
.section-label.green { color: var(--green-bright); }
.section-label.amber { color: var(--amber); }
.btn-primary.green-btn { background: var(--green); }
.btn-primary.amber-btn { background: #c47a20; }
.tag-chip.green { /* … */ }
.marquee-dot.amber { /* … */ }
```

Dipakai sebagai `<div className="section-label green">PROJECTS</div>`.

### 9.3 Lapisan file dan urutan pemuatan

| File | Cakupan | Diimpor oleh |
|---|---|---|
| `global.css` | Segalanya: token, reset, lapisan noise pada body, keyframes, gerak berkurang | `main.jsx` |
| `shared.css` | Nav, footer, tombol, marquee, `.reveal`, `.section-inner`, `.section-label`, `.tag-chip`, cincin fokus | `main.jsx` |
| `home.css` | Khusus halaman utama | `Home/index.jsx` |
| `about.css` | Khusus halaman about | `About.jsx` |
| `events.css` | Khusus halaman events | `Events.jsx` |
| `join.css` | Khusus halaman join | `Join.jsx` |
| `divisions.css` | Ketiga halaman divisi | masing-masing halaman divisi |

Dua file pertama dimuat di setiap halaman karena `main.jsx` mengimpornya. Sisanya
diimpor di dalam komponen halaman yang membutuhkannya — Vite menggabungkannya ke
dalam hasil build, dan karena dimuat setelah `shared.css`, stylesheet halaman bisa
menimpa aturan bersama.

> **⚠ Jebakan.** Karena semua CSS berakhir di satu stylesheet global, **nama kelas
> bersifat global**. `home.css` mendefinisikan ulang `.section-inner`,
> `.section-label`, dan `.reveal`, yang sudah ada di `shared.css`. Yang dimuat
> terakhir yang menang. Berhati-hatilah menambah nama kelas umum seperti `.card`
> atau `.grid` — pilih sebuah awalan (`.events-card`, `.ltunnel-card`)
> sebagaimana kode yang ada sebagian besar sudah melakukannya.

### 9.4 Primitif tata letak yang sebaiknya kamu pakai ulang

```css
.section-inner  { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }
.section-label  { font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
                  color: var(--blue); display: flex; align-items: center; gap: 10px; }
.section-label::before { content: ''; width: 20px; height: 1px; background: var(--blue); }
```

`.section-inner` adalah wadah konten standar: terpusat, dibatasi 1200 px, dengan
padding responsif yang turun ke 32 px pada 1024 px dan 20 px pada 768 px. Hampir
setiap bagian situs memakainya.

`.section-label` adalah label kecil monospace di atas setiap judul ("OUR
DIVISIONS", "WHAT WE DO", "FAQ"). Pseudo-elemen `::before` menggambar garis pendek
di sebelah kirinya. Pakai ini untuk setiap bagian baru supaya halaman tetap
konsisten.

### 9.5 Skala tipografi

Tiga font, dimuat dari Google Fonts di `index.html`:

- **Space Grotesk** (`--display`) — judul dan angka besar. Terasa agak teknis dan
  geometris. Dipakai dengan letter-spacing negatif yang rapat (`-0.02em` sampai
  `-0.03em`) dan bobot 600–700.
- **DM Sans** (`--sans`) — teks isi. Sangat mudah dibaca pada ukuran kecil.
  Biasanya bobot 300 untuk paragraf, dan itulah yang memberi situs ini kesan
  lapang.
- **Space Mono** (`--mono`) — label, tag, statistik, terminal. Letter-spacing
  positif yang lebar (`0.1em` sampai `0.2em`) dan huruf kapital. Inilah font yang
  melakukan sebagian besar kerja "kredibilitas teknis" dari brief desain.

Judul memakai `clamp()` untuk ukuran cair: `font-size: clamp(28px, 3vw, 44px)`
berarti "jangan di bawah 28 px, jangan di atas 44 px, selain itu 3% dari lebar
viewport". Ini menghilangkan kebutuhan media query untuk ukuran huruf.

### 9.6 Titik putus responsif

Tiga titik putus, dipakai secara konsisten:

| Lebar | Makna | Perubahan utama |
|---|---|---|
| `max-width: 1024px` | Tablet / laptop kecil | Padding 48→32 px, grid banyak kolom menyusut ke 2, kanvas hero divisi disembunyikan |
| `max-width: 768px` | Ponsel / ponsel besar | Padding →20 px, nav desktop diganti overlay hamburger, sebagian besar grid →1 kolom, hero beralih ke tata letak titik mobile |
| `max-width: 480px` | Ponsel kecil | Pengurangan lanjutan ukuran huruf dan skala kanvas |

Ada juga satu blok `min-width: 769px` yang memaksa menyembunyikan tombol menu dan
overlay mobile dengan `!important`, sebagai penjaga kalau ada state mobile yang
bocor ke desktop.

### 9.7 Dua sentuhan global yang perlu diketahui

**Lapisan noise.** `global.css` melukis tekstur turbulensi SVG tetap seukuran
layar penuh di atas seluruh situs:

```css
body::before {
  content: ''; position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,…feTurbulence…");
  pointer-events: none; z-index: 9999; opacity: 0.4;
}
```

Ini berupa data URI inline, jadi tidak memerlukan permintaan jaringan. Ia
menambah butiran film halus yang mencegah latar hampir hitam tampak rata dan
bergaris. `pointer-events: none` itu krusial — tanpanya, lapisan ini akan duduk
di atas segalanya pada `z-index: 9999` dan menelan setiap klik di situs.

**Gerak berkurang.** Bagian bawah `global.css` menghormati
`prefers-reduced-motion: reduce` dengan menghapus transform pada reveal dan
lapisan kanvas, menghentikan titik berdenyut, dan memperlambat marquee dari 28 s
menjadi 80 s. Penanganannya masih sebagian — animasi kanvas dan lorong 3-D di
halaman About tetap berjalan. Lihat bagian 15.

---

## 10. Pembahasan mendalam per halaman

### 10.1 Home — `src/pages/Home/`

`index.jsx` adalah keseluruhan halaman itu, dan panjangnya 28 baris:

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

**Mengapa dipecah jadi delapan file.** Halaman utama dalam satu file akan jauh di
atas seribu baris. Memecahnya per bagian berarti: kamu bisa menemukan kode untuk
hal yang sedang kamu lihat dalam hitungan detik, dua orang bisa mengedit dua
bagian tanpa konflik penggabungan, dan mengubah urutan halaman cukup dengan
memindahkan satu baris di sini. `<>…</>` adalah *fragment* React — pembungkus yang
mengelompokkan anak-anaknya tanpa menambah elemen DOM.

Kedelapan bagian berbagi `home.css`, diimpor sekali di bagian atas `index.jsx`.

#### Hero.jsx — pameran divisi yang digerakkan scroll

Ini komponen paling kompleks di situs (473 baris). Layak dipahami karena ia juga
hal yang paling mungkin membuatmu bingung.

**Efeknya:** hero terlihat diam sementara kamu men-scroll melewati tiga layar
penuh, bergilir melalui tiga divisi — ilustrasi, teks, statistik, dan warna
tombol semuanya berubah bersamaan.

**Mekanismenya — posisi sticky.** Di `home.css`:

```css
.hero-scroll-wrap { height: 300vh; position: relative; }
.hero-sticky      { position: sticky; top: 0; height: 100vh; overflow: hidden; }
```

Pembungkus luarnya setinggi tiga layar, menciptakan jarak scroll. Elemen
dalamnya `position: sticky`, jadi ia menempel di puncak layar dan tetap di sana
sementara induknya ter-scroll lewat. Tiga layar scroll, satu layar konten
terlihat — itulah rasa "scroll-jacking", dicapai dengan dua properti CSS tanpa
JavaScript.

**Perhitungan scroll ke indeks:**

```jsx
const onScroll = () => {
  const rect = wrapRef.current.getBoundingClientRect();
  const scrolled = -rect.top;                                  // px yang sudah discroll ke dalam wrap
  const total = wrap.offsetHeight - window.innerHeight;         // total jarak yang bisa discroll
  const pct = Math.max(0, Math.min(1, scrolled / total));       // batasi ke 0…1
  setScrollPct(pct);
  const idx = Math.min(2, Math.floor(pct * 3));                 // 0, 1, atau 2
  // …
};
window.addEventListener('scroll', onScroll, { passive: true });
```

`-rect.top` adalah seberapa jauh tepi atas pembungkus sudah melewati atas layar,
yaitu seberapa dalam kamu sudah men-scroll ke dalam hero. Membaginya dengan total
jarak yang bisa discroll memberi persentase 0–1, yang menggerakkan bilah kemajuan
di sisi kanan. Mengalikannya dengan 3 lalu membulatkan ke bawah memberi indeks
divisi; `Math.min(2, …)` menjaga kasus batas ketika `pct` tepat `1` dan akan
menghasilkan `3`.

`{ passive: true }` memberi tahu browser bahwa pendengar ini tidak akan pernah
memanggil `preventDefault()`, sehingga browser bisa menjaga scroll tetap mulus
tanpa menunggu penangannya. Selalu berikan ini untuk pendengar scroll yang hanya
membaca.

**Transisi silang teks.** Berganti divisi tidak menukar teks seketika. Sebuah
mesin status tiga tahap menjalankannya:

```jsx
if (idx !== prevIdx.current) {
  setTextState('exiting');                  // CSS memudarkan teks saat ini
  setTimeout(() => {
    setActiveIdx(idx);                      // tukar datanya
    prevIdx.current = idx;
    setTextState('entering');               // teks baru mulai tak tampak & tergeser
    setTimeout(() => setTextState('shown'), 50);   // frame berikutnya: animasikan masuk
  }, 280);                                  // 280ms = durasi keluar di CSS
}
```

Angka `280` harus sama dengan durasi transisi CSS pada `.hero-text-wrap`, dan
`50` adalah jeda satu frame supaya browser mencatat posisi awal "entering"
sebelum beralih ke "shown". Kalau kamu mengubah waktu di CSS, ubah juga `280`.

**Mengapa `prevIdx` memakai `useRef`, bukan state.** Sebuah ref menyimpan nilai
antar render tanpa memicu render ketika berubah. Penangan scroll menyala puluhan
kali per detik; kalau melacak indeks sebelumnya memicu render setiap kali,
halaman akan merambat. Ref adalah alat yang tepat untuk "ingat ini antar
panggilan, tapi jangan gambar ulang".

**Ketiga kanvas.** `MetaverseCanvas`, `RoboticsCanvas`, dan `PrintingCanvas`
didefinisikan di file yang sama. Ketiganya dipasang sekaligus dan ditumpuk, dengan
CSS mengatur yang mana terlihat:

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

Ketiganya tetap terpasang supaya transisi silangnya mulus — melepasnya akan
membuat mereka muncul dan hilang mendadak. Tetapi menjalankan tiga loop
`requestAnimationFrame` terus-menerus akan memboroskan baterai, jadi setiap
kanvas menerima prop `active` dan **menjeda loop animasinya sendiri ketika tidak
aktif**:

```jsx
const draw = () => {
  /* …ratusan panggilan menggambar… */
  t++;
  if (activeRef.current) {
    rafRef.current = requestAnimationFrame(draw);   // lanjutkan
  } else {
    rafRef.current = null;                          // hentikan loopnya
  }
};
// dijalankan ulang ketika `active` kembali true:
restartRef.current = () => { if (!rafRef.current) draw(); };
```

Ini keputusan performa terpenting di file itu. Perhatikan polanya: `active`
disalin ke `activeRef` oleh sebuah efek, karena closure `draw` menangkap nilai
dari render pertamanya dan kalau tidak disalin ia takkan pernah melihat prop yang
diperbarui.

**Apa yang digambar setiap kanvas:**

| Kanvas | Adegan |
|---|---|
| `MetaverseCanvas` | Kubus wireframe berputar dengan rotasi 3-D dan proyeksi perspektif buatan sendiri, lantai grid dengan titik hilang, 70 partikel melayang, cincin elips yang mengorbit, dan oktahedron kecil yang mengorbit. Merespons posisi tetikus: `mouseRef` memberi rotasi tambahan. |
| `RoboticsCanvas` | Arduino Uno bergaya: garis papan, tekstur grid, lubang pemasangan, jalur PCB dengan titik "arus" yang beranimasi menyusurinya, konektor USB-B, chip ATmega328P dengan pin, kristal 16 MHz, regulator tegangan, soket barrel, 14 pin digital dan 6 pin analog, empat LED status berkedip, dan serial monitor palsu yang mencetak nilai hidup. |
| `PrintingCanvas` | Potongan printer FDM: kerangka, batang gantry, meja panas yang menurun, kepala cetak yang memindai kiri-kanan dan naik satu lapisan per sapuan, berkas ekstrusi filamen, kipas berputar, objek tercetak yang tumbuh dengan lebar mengikuti fungsi profil, plus kotak HUD untuk suhu nozel, suhu meja, dan persentase kemajuan. |

Ketiganya punya varian satu-divisi yang serupa di halaman divisi, dengan dimensi
sedikit lebih kecil (440×440 bukan 580×580) dan tanpa logika penjedaan — di sana
mereka satu-satunya kanvas di halaman.

**Pola pembersihan kanvas yang universal.** Setiap komponen kanvas mengakhiri
efeknya dengan:

```jsx
return () => {
  cancelAnimationFrame(rafRef.current);
  canvas.removeEventListener('mousemove', onMouse);
};
```

Tanpa ini, berpindah halaman akan meninggalkan loop animasi berjalan selamanya
terhadap kanvas yang sudah terlepas — kebocoran memori yang menumpuk setiap kali
pengunjung kembali ke halaman itu. **Kalau kamu suatu saat menulis komponen
kanvas baru, tiru pola ini.**

**Kontrol navigasi.** Desktop mendapat daftar divisi vertikal di kiri dan bilah
kemajuan di kanan; mobile (di bawah 768 px) menyembunyikan keduanya dan
menampilkan tiga titik. Semuanya men-scroll, bukan melompat:

```jsx
onClick={() => {
  const total = wrap.offsetHeight - window.innerHeight;
  window.scrollTo({ top: wrap.offsetTop + (i / 3 + 0.01) * total, behavior: 'smooth' });
}}
```

`+ 0.01` menggeser target sedikit melewati batas antar segmen, supaya pembulatan
tidak mendaratkanmu di divisi sebelumnya. Titik-titik mobile dibuat lebih mudah
disentuh dengan area sentuh tak tampak yang diperluas:

```css
.hero-mobile-dot::after { content: ''; position: absolute; inset: -18px; }
```

Itu mengubah titik 6 px menjadi target sentuh 42 px tanpa mengubah tampilannya —
teknik yang layak diingat.

**Untuk mengedit konten hero**, ubah `DIV_DATA` di dekat bagian bawah
`Hero.jsx`. Setiap entri memuat teks lencana, judul, subjudul, deskripsi, daftar
tag, set warna, nuansa gradien, jumlah anggota, kelas tombol, dan path tujuan.

#### DivisionsShowcase.jsx — tiga kartu yang bisa dibuka

Tiga kartu didefinisikan oleh array `DIVISIONS`. Satu state melacak yang mana
terbuka:

```jsx
const [active, setActive] = useState(null);   // null | 'metaverse' | 'robotics' | 'printing'
```

Mengklik sebuah kartu menyalakan/mematikannya:
`setActive(isActive ? null : d.div)`. Karena satu nilai menyimpan jawabannya,
**membuka satu kartu otomatis menutup yang lain** — sebuah akordeon tanpa logika
tambahan.

Animasi membuka memakai `maxHeight` inline yang dihitung:

```jsx
<div className="div-detail" style={{ maxHeight: isActive ? '440px' : '0' }}>
```

dengan `overflow: hidden` dan transisi CSS pada `max-height`. Ini trik
membuka-tutup klasik yang hanya memakai CSS. Ia membutuhkan batas piksel tetap
karena CSS tidak bisa bertransisi ke `auto` — jadi **kalau kamu menambahkan cukup
banyak konten ke panel detail sebuah divisi, konten itu akan terpotong pada 440
px**. Naikkan angkanya kalau itu terjadi.

Panel yang terbuka menampilkan ketua dan wakil ketua divisi, lalu tiga proyek
pertama melalui `DIVISION_PROJECTS.<div>.slice(0, 3)`.

Ikon setiap kartu disimpan sebagai **fungsi yang menerima sebuah warna**:

```jsx
icon: (color) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
),
// dipanggil sebagai: {d.icon(d.color)}
```

Menyimpan fungsi daripada JSX yang sudah jadi memungkinkan satu definisi ikon
diwarnai ulang per divisi. Ikonnya berupa SVG inline, bukan font ikon atau
library — tidak ada permintaan tambahan, dan warnanya diwarisi secara alami.

#### Terminal.jsx — shell tiruan yang interaktif

Tiruan terminal yang meyakinkan, dan bagian kepribadian utama situs ini. Ia juga
contoh mandiri yang baik untuk state React, jadi bacalah kalau kamu ingin
mempelajari polanya.

**State:**

```jsx
const [lines,   setLines]   = useState(BOOT_LINES);  // semua yang sudah dicetak
const [input,   setInput]   = useState('');          // nilai masukan saat ini
const [history, setHistory] = useState([]);          // perintah lampau, terbaru dulu
const [histIdx, setHistIdx] = useState(-1);          // posisi saat menelusuri riwayat
```

**Keluaran adalah data, bukan HTML.** Setiap baris yang dicetak adalah objek
`{ type, text }`, di mana `type` adalah salah satu dari `out`, `green`, `blue`,
`amber`, `dim`, `err`, `cmd`, atau `spacer`. `renderLine` mengubahnya menjadi
markup, dan CSS menata setiap jenis:

```css
.t-out.green { color: #22c97a; }
.t-out.err   { color: #f05e5e; }
.t-out.dim   { color: rgba(240,242,248,0.25); }
.t-spacer    { height: 6px; }
```

Menjaga keluaran sebagai data berarti sebuah perintah hanyalah fungsi yang
mengembalikan array.

**Perintah tinggal di satu objek:**

```jsx
const COMMANDS = {
  help:      () => [ /* baris-baris */ ],
  divisions: () => [ /* baris-baris */ ],
  events:    () => [ /* baris-baris */ ],
  members:   () => [ /* baris-baris */ ],
  projects:  () => { /* dibangun dari DIVISION_PROJECTS saat dipanggil */ },
  whoami:    () => [ /* baris-baris */ ],
};
```

**Untuk menambah perintah:** tambahkan satu kunci yang nilainya fungsi
pengembali array objek baris, dan tambahkan satu baris ke `help` yang
menjelaskannya. Tidak ada yang lain.

`projects` adalah yang menarik — ia membaca data hidup alih-alih teks yang
ditulis langsung:

```jsx
for (const [div, projects] of Object.entries(DIVISION_PROJECTS)) {
  for (const p of projects.filter(p => p.status === 'Active')) {
    lines.push({ type: COLOR[div], text: `  [${PREFIX[div]}] ${p.name.padEnd(26)}— active` });
  }
}
```

`padEnd(26)` merapikan tanda hubungnya menjadi satu kolom, dan itulah yang
membuatnya terbaca seperti keluaran terminal sungguhan.

**`clear` dan `join` ditangani khusus** di `runCmd` alih-alih tinggal di
`COMMANDS`, karena keduanya melakukan lebih dari sekadar mengembalikan baris.
`clear` mengganti seluruh array `lines`. `join <divisi>` membaca `SIGNUP_CONFIG`
dan bisa memicu navigasi, memakai sebuah baris penanda:

```jsx
{ type: '__redirect', to: '/join' }
```

`runCmd` mengeluarkan baris itu sebelum me-render dan bertindak atasnya:

```jsx
const redirectLine  = output.find(l => l.type === '__redirect');
const visibleOutput = output.filter(l => l.type !== '__redirect');
setLines([...newLines, ...visibleOutput]);
if (redirectLine) setTimeout(() => navigate(redirectLine.to), 900);
```

Jeda 900 ms memberi pengguna waktu membaca "Redirecting…" sebelum halaman
berubah. Pola "perintah mengembalikan instruksi efek samping sebagai data" ini
menjaga setiap perintah tetap fungsi murni — layak ditiru kalau kamu menambah
perintah lain yang perlu *melakukan* sesuatu.

**Riwayat perintah** meniru shell sungguhan. `history` berurutan terbaru-dulu,
jadi ArrowUp menaikkan indeks dan ArrowDown menurunkannya, dengan `-1` berarti
"masukan kosong":

```jsx
else if (e.key === 'ArrowUp') {
  e.preventDefault();                                   // jangan pindahkan kursor teks
  const idx = Math.min(histIdx + 1, history.length - 1);
  setHistIdx(idx);
  setInput(history[idx] || '');
}
```

**Dua sentuhan kenyamanan.** Mengklik di mana pun di badan terminal memfokuskan
input yang tersembunyi (`onClick={() => inputRef.current?.focus()}`), sehingga
terminalnya terasa seperti yang sungguhan. Dan tombol petunjuk yang bisa diklik
di sisi kiri menyisipkan sebuah perintah:

```jsx
const injectCmd = (cmd) => {
  inputRef.current?.focus();
  setInput(cmd);
  setTimeout(() => runCmd(cmd), 80);
};
```

Jeda 80 ms membuat pengguna *melihat* perintahnya muncul di kolom masukan sebelum
dijalankan — detail kecil yang membuat interaksinya bisa dipahami.

Setelah setiap perintah, `setTimeout(scrollBody, 0)` men-scroll keluaran ke
bawah. Timeout berjeda nol menunda scroll sampai React selesai menggambar baris
baru; tanpanya, kamu akan men-scroll ke tinggi yang lama.

> **⚠ Masalah yang diketahui.** Keluaran perintah `events` **ditulis langsung dan
> sudah kedaluwarsa**. Ia mencantumkan "Spring Hackathon 2026", "AI & Machine
> Learning Workshop", dan lainnya yang tidak ada di `data/events.js`. Perintah
> `projects` membaca data hidup tetapi `events` tidak. Memperbaiki ini adalah
> kontribusi kecil bernilai tertinggi yang bisa kamu buat — lihat bagian 15 untuk
> perubahan tepatnya.

#### HomeAbout.jsx, Pillars.jsx, CTA.jsx

Bagian sederhana dan statis. `HomeAbout` adalah blok dua kolom dengan teks dan
kartu logo. `Pillars` memetakan array enam item menjadi grid kartu, masing-masing
dengan ikon SVG inline yang warna garisnya bergantian biru dan hijau. `CTA`
adalah ajakan bertindak penutup dengan dua tombol. Ketiganya memakai `useReveal`.

Untuk mengubah teksnya, edit komponennya langsung — ketiganya tidak digerakkan
data, karena kontennya berupa prosa, bukan rekaman.

#### HomeEvents.jsx — pratinjau acara yang hidup

Pendek, dan demonstrasi yang baik untuk lapisan data:

```jsx
const events = ALL_EVENTS
  .filter(isUpcoming)
  .slice(0, 4)
  .map(e => ({ /* bentuk rata dengan kelas tagStyle */
    month: e.month, day: e.day, year: e.year, name: e.title,
    location: e.location, time: e.time, tag: e.type,
    tagStyle: TYPE_TAG_STYLE[e.type] ?? 'blue',
  }));
```

Filter ke yang mendatang, ambil empat pertama, bentuk ulang untuk ditampilkan.
Nilai cadangan `?? 'blue'` berarti jenis acara yang tidak dikenal tetap tampil,
hanya dengan warna bawaan, alih-alih menghasilkan `undefined` di sebuah className.

Perhatikan bahwa ini berjalan saat **modul dimuat**, bukan di dalam komponen —
jadi daftarnya dihitung sekali ketika bundelnya dimuat. Untuk situs yang datanya
hanya berubah saat deploy, itu tidak masalah.

### 10.2 About — `src/pages/About.jsx`

File tunggal terpanjang (523 baris) dan halaman paling ambisius secara visual.
Enam bagian: hero dengan statistik, nilai-nilai, timeline sejarah, lorong
kepemimpinan 3-D, portofolio, dan galeri foto.

**Array data di bagian atas file:** `TIMELINE`, `TEAM`, `PORTFOLIO`, `GALLERY`,
`VALUES`, `GALLERY_PATTERNS`. Inilah yang akan kamu edit.

#### Lightbox

Komponen kecil yang menampilkan gambar layar penuh ketika thumbnail galeri atau
portofolio diklik. Tiga hal yang dilakukannya dengan benar dan yang sebaiknya
kamu pertahankan kalau menyentuhnya:

```jsx
useEffect(() => {
  const onKey = (e) => { if (e.key === 'Escape') onClose(); };
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';          // kunci scroll latar
  return () => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';              // selalu pulihkan
  };
}, [onClose]);
```

Escape menutupnya. Scroll latar dikunci selama ia terbuka — dan, yang krusial,
**dipulihkan di fungsi pembersih**, sehingga pelepasan komponen yang mendadak
tidak pernah bisa meninggalkan halaman tak bisa discroll secara permanen.
Mengklik latar menutupnya, sedangkan mengklik gambarnya tidak, berkat
`onClick={(e) => e.stopPropagation()}` pada `<img>`.

State lightbox tinggal di komponen induk `About` dan diteruskan ke bawah sebagai
callback:

```jsx
const [lightbox, setLightbox] = useState(null);
const openLightbox  = useCallback((src, alt) => setLightbox({ src, alt }), []);
const closeLightbox = useCallback(() => setLightbox(null), []);
// …
<GalleryItem item={item} patternIdx={i} onOpen={openLightbox} />
```

`useCallback` menjaga identitas fungsinya tetap stabil antar render, sehingga
meneruskannya ke banyak anak tidak menyebabkan render ulang yang tak perlu. Ini
pola **"mengangkat state ke atas"** — state bersama tinggal di leluhur bersama
terdekat, dan anak-anaknya menerima sebuah fungsi untuk mengubahnya.

#### Lorong Kepemimpinan

Hal paling berani di situs ini: koridor 3-D berisi kartu kepemimpinan dan judul
divisi melayang yang kamu lewati dengan men-scroll, berakhir di layar daftar
lengkap yang rata. Sekitar 150 baris.

**Bagaimana 3-D-nya bekerja.** Transform 3-D CSS, bukan WebGL. `about.css`
menyiapkan:

```css
.ltunnel-scene { perspective: 800px; z-index: 1; /* … */ }
.ltunnel-world { transform-style: preserve-3d; /* … */ }
```

`perspective` pada induk membuat `translate3d(x, y, z)` pada anak-anaknya tampak
seperti kedalaman nyata. `preserve-3d` mencegah browser memipihkan transform
bersarang. Item diletakkan pada nilai `z` besar dan "kamera" bergerak dengan
mengurangi offset `z` yang diterapkan ke setiap item.

**Penyusunan adegan** terjadi sekali, dalam sebuah `useMemo`:

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
  for (let i = 0; i < 70; i++) { out.push({ id:`s${i}`, type:'star', /* x, y, z acak */ }); }
  return { allItems: out, totalDepth: td };
}, []);
```

Ia berjalan maju melalui kedalaman, meletakkan judul divisi, lalu anggotanya
bergantian di kiri dan kanan pusat (`mi % 2` menentukan sisinya), lalu jarak
sebelum divisi berikutnya. Akhirnya ia menyebar 70 bintang pada posisi acak
sebagai petunjuk kedalaman. `useMemo` dengan array dependensi kosong berarti ini
berjalan **sekali** — posisi bintang acaknya tetap alih-alih melompat pada setiap
render.

**Animasi berjalan di luar React.** Ini keputusan arsitektural kuncinya. Sebuah
loop `requestAnimationFrame` menulis langsung ke elemen DOM:

```jsx
const els = elMap.current;   // diisi oleh  ref={el => elMap.current[item.id] = el}
const S = { scroll: 0, target: 0, vel: 0, mx: 0, my: 0 };   // objek biasa, bukan state

const tick = () => {
  S.vel += ((S.target - S.scroll) * 0.07 - S.vel) * 0.12;   // penghalusan pegas
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

**Mengapa melewati React di sini.** Sekitar 80 elemen diperbarui 60 kali per
detik. Menyimpan posisi kamera di `useState` akan memicu 60 render per detik pada
pohon komponen dengan 80 anak — tersendat sudah pasti. Menulis
`el.style.transform` langsung adalah jalan keluar yang benar untuk animasi
berfrekuensi tinggi. React tetap memiliki tugas *membuat* elemennya; loop animasi
hanya mengubah transform-nya.

**Inersia.** Pegas dua baris di `tick` itulah yang membuat lorongnya terasa
fisik. `S.target` melompat seketika ketika kamu men-scroll; `S.scroll`
mengejarnya, dan `S.vel` (kecepatan) itu sendiri dihaluskan. Hasilnya ada
percepatan dan meluncur, bukan pemetaan kaku 1:1. Konstanta `0.07` (kekakuan) dan
`0.12` (redaman) adalah tombol penyetelnya — nilai lebih besar berarti lebih
tanggap dan kurang melayang.

**Hiasan visual yang digerakkan kecepatan:**

- `scene.style.perspective = Math.max(500, 800 - Math.abs(v) * 6) + 'px'` —
  bergerak cepat menyempitkan bidang pandang, seperti efek kecepatan.
- Teks judul mendapat `textShadow` aberasi kromatik merah/hijau yang digeser oleh
  kecepatan ketika `|v| > 1.5`.
- Bintang membentang sepanjang z (`scale3d(1, 1, s)`) seiring kecepatan, menjadi
  garis gerak.
- Kartu bergoyang lembut:
  `Math.sin(performance.now() * 0.0007 + item.z * 0.001) * 8`. Suku `item.z`
  menggeser fase setiap kartu supaya mereka tidak bergoyang serempak.

**Pemudaran berdasarkan kedalaman** menjaga adegan tetap bersih:

```jsx
const getAlpha = (vz) => {
  if (vz < -2800) return 0;                              // jauh di belakang: hilang
  if (vz < -1300) return (vz + 2800) / 1500;             // memudar masuk dari kejauhan
  if (vz >  380)  return Math.max(0, 1 - (vz - 380) / 280);  // memudar keluar saat melewatimu
  return 1;
};
if (a <= 0) return;   // lewati penulisan transform sepenuhnya — optimasi murah
```

**Penangkapan scroll, dan bagaimana ia melepaskan.** Lorong ini mencegat kejadian
roda supaya scroll-mu menggerakkan kamera alih-alih halaman:

```jsx
const onWheel = (e) => {
  const done = (S.target <= 0 && e.deltaY < 0) || (S.target >= totalDepth && e.deltaY > 0);
  if (done) return;                     // di ujung: biarkan halaman men-scroll normal
  e.preventDefault();
  S.target = Math.max(0, Math.min(totalDepth, S.target + e.deltaY * 2.5));
};
outer.addEventListener('wheel', onWheel, { passive: false });
```

Pemeriksaan `done` itu esensial: tanpanya kamu akan terjebak di lorong selamanya.
Ketika kamu mencapai salah satu ujung dan terus men-scroll ke arah itu,
penangannya kembali lebih awal dan browser men-scroll halaman. Perangkat sentuh
mendapat logika yang sama melalui `touchstart`/`touchmove` memakai selisih jari.

Perhatikan `{ passive: false }` di sini — kebalikan dari pendengar scroll di hero
— karena penangan ini *harus* bisa memanggil `preventDefault()`.

**Layar akhir.** Daftar lengkapnya muncul memudar silang saat lorongnya berakhir:

```jsx
const rp = Math.max(0, Math.min(1, (cam - (totalDepth - 700)) / 700));
world.style.opacity = Math.max(0, 1 - Math.max(0, (cam - (totalDepth - 900)) / 500));
roster.style.opacity = rp;
roster.style.pointerEvents = rp > 0.05 ? 'auto' : 'none';
```

Saklar `pointerEvents` mencegah daftar yang tak tampak memblokir klik pada lorong
sebelum daftarnya muncul.

Daftar itu sengaja tinggal **di luar** `.ltunnel-scene` dalam markup-nya. Ada
komentar di kode sumber yang menjelaskan alasannya, dan layak dibaca: di dalam
konteks `perspective`, anak-anak yang ditranslasikan 3-D bisa menggambar di atas
saudara berikutnya terlepas dari `z-index`. Memindahkan daftar keluar dari
konteks penumpukan itu membuat `z-index: 7` berperilaku normal.

> **⚠ Jebakan kritis untuk pengurus.** `TUNNEL_SECTIONS` mengiris `TEAM`
> **berdasarkan indeks**:
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
> Sisipkan anggota Community kelima dan setiap irisan berikutnya bergeser: seorang
> ketua Metaverse akan diam-diam muncul di bawah Robotics. **Kalau kamu menambah
> atau menghapus siapa pun dari `TEAM`, kamu harus memperbarui indeks irisan
> ini.** Bagian 11.6 memandu langkahnya, dan bagian 15 mengusulkan perbaikan
> permanen.

#### Portofolio dan Galeri

Keduanya mengikuti pola yang sama: sebuah array objek di mana `img` berupa path
atau `null`, dan komponennya me-render foto atau placeholder yang dihasilkan:

```jsx
{item.img
  ? <img src={item.img} alt={item.label} style={{ position:'absolute', inset:0,
      width:'100%', height:'100%', objectFit:'cover' }} />
  : <div className="gallery-placeholder">📷 {item.hint}</div>}
```

`objectFit: 'cover'` membuat rasio aspek apa pun mengisi kotaknya tanpa distorsi,
sehingga kamu bisa memasukkan foto berbentuk apa saja.

Kelas `expandable` ditambahkan hanya ketika `img` terisi, yang mengubah kursor
menjadi `zoom-in` dan menghubungkan kliknya ke lightbox. Placeholder tidak bisa
diklik.

Galerinya adalah **grid CSS bergaya masonry**:

```css
.gallery-grid      { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 240px; gap: 8px; }
.gallery-grid .wide { grid-column: span 2; }
.gallery-grid .tall { grid-row: span 2; }
```

Menyetel `wide: true` atau `tall: true` pada item galeri membuatnya menempati dua
kolom atau dua baris. Mencampurnya menciptakan mosaik yang bervariasi. Pada 1024
px grid-nya turun ke dua kolom dan `.wide` direset ke satu kolom supaya tidak ada
yang melimpah.

Placeholder mendapat salah satu dari tiga pola garis diagonal/horizontal, dipilih
oleh `GALLERY_PATTERNS[patternIdx % 3]` — modulonya menggilir ketiganya sehingga
placeholder yang berdampingan berbeda.

### 10.3 Events — `src/pages/Events.jsx`

Halaman yang paling digerakkan data. Dua filter mandiri plus pengelompokan bulan
otomatis.

**State dan turunannya:**

```jsx
const [filter,    setFilter]    = useState('All');              // jenis acara
const [divFilter, setDivFilter] = useState('All Divisions');     // divisi

const upcoming = ALL_EVENTS.filter(isUpcoming);

const filtered = upcoming.filter(e => {
  const typeOk = filter === 'All' || e.type === filter;
  const divOk  = divFilter === 'All Divisions' || e.division === divFilter || e.division === 'All';
  return typeOk && divOk;
});
```

Perhatikan `|| e.division === 'All'` — acara yang ditandai `'All'` tampil di
setiap filter divisi, dan itu benar untuk acara seluruh klub.

**Pengelompokan bulan tanpa library pengelompokan:**

```jsx
const months = [...new Set(filtered.map(e => `${e.month} ${e.year}`))];
// …
{months.map(month => (
  <div key={month}>
    <div className="events-month-label">{month}</div>
    {filtered.filter(e => `${e.month} ${e.year}` === month).map(e => /* kartu */)}
  </div>
))}
```

Bangun kunci string per acara, bungkus dalam `Set` untuk menghapus duplikat,
sebarkan kembali ke array, lalu render satu judul per bulan dan filter daftarnya
untuk masing-masing. Judulnya muncul sesuai urutan data, jadi **jaga `ALL_EVENTS`
tetap terurut berdasarkan tanggal** — tidak ada yang mengurutkannya untukmu.

**Penghitung yang hidup** di hero dihitung, bukan ditulis:

```jsx
const currentMonthKey = Object.keys(MONTH_INDEX).find(k => MONTH_INDEX[k] === now.getMonth());
const thisMonthCount  = upcoming.filter(e => e.month === currentMonthKey && e.year === now.getFullYear()).length;
// di-render sebagai: [[String(upcoming.length),'Upcoming Events'], [String(thisMonthCount),'This Month'], ['120+','Avg. Attendance']]
```

"Upcoming Events" dan "This Month" memperbarui diri. "Avg. Attendance" ditulis
langsung.

**Warna tag jenis** dihitung dari satu nilai heks:

```jsx
const typeTagStyle = type => {
  const color = TYPE_COLORS[type] ?? '#888';
  return { color, background: `${color}18`, border: `1px solid ${color}33` };
};
```

Satu warna dasar menghasilkan teks, latar beropasitas 9%, dan batas beropasitas
20%. Pola tiga nilai ini muncul berulang di seluruh situs.

**Keadaan kosong** sudah ditangani — kalau tidak ada acara yang cocok, pesan "NO
EVENTS MATCH THIS FILTER" ditampilkan alih-alih halaman kosong. Selalu lakukan
ini ketika kamu menambah sebuah filter.

> **Catatan.** `const past = ALL_EVENTS.filter(e => !isUpcoming(e))` dihitung
> tetapi tidak pernah di-render. `events.css` masih menyimpan gaya
> `.past-section`, `.past-grid`, dan `.past-card` dari bagian acara lampau yang
> sudah dihapus. Hidupkan kembali bagian itu (bagian 15) atau hapus kode matinya.

### 10.4 Join — `src/pages/Join.jsx`

Empat array data (`FAQS`, `PERKS`, `STEPS`), satu panel pendaftaran bergerbang,
dan sebuah akordeon.

**Gerbang pendaftaran** dibuat sebagai komponen terpisah supaya kedua keadaannya
tetap mudah dibaca:

```jsx
function SignupPanel() {
  if (SIGNUP_CONFIG.isOpen) {
    return ( /* lencana hijau + tautan ke googleFormUrl */ );
  }
  return ( /* lencana abu-abu + tanggal angkatan berikutnya + tautan Instagram */ );
}
```

Sebuah `return` awal untuk kasus terbuka, bukan ternary yang membungkus 40 baris
JSX. Ketika kedua cabangnya sama-sama besar, return awal jauh lebih mudah dibaca.

Subjudul hero juga bergerbang, dengan ternary karena isinya satu string:

```jsx
const heroSub = SIGNUP_CONFIG.isOpen
  ? '…Sign-ups are open now. Scroll down to apply.'
  : '…Sign-ups open periodically. Scroll down to stay in the loop.';
```

**Akordeon FAQ** memakai satu nilai state untuk seluruh daftar:

```jsx
const [openFaq, setOpenFaq] = useState(null);
// …
onClick={() => setOpenFaq(openFaq === i ? null : i)}
```

Pola akordeon satu-nilai yang sama seperti kartu divisi: mengklik item yang
terbuka menutupnya, mengklik yang lain berpindah. Hanya satu yang bisa terbuka.

Aksesibilitasnya yang terbaik di situs ini, dan merupakan standar yang perlu
ditiru:

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

Sebuah `<button>` sungguhan (bisa difokus lewat papan ketik dan diaktifkan dengan
Enter/Spasi secara gratis), `aria-expanded` yang mengumumkan keadaannya, dan
`aria-controls` yang menghubungkan tombol ke panel yang dikendalikannya. Chevron
berputar 180° melalui transisi CSS pada kelas `open`.

> **⚠ Jebakan.** `.faq-a.open { max-height: 200px }` di `join.css`. Jawaban FAQ
> yang panjang akan terpotong. Kalau kamu menulis jawaban panjang, naikkan angka
> itu.

### 10.5 Ketiga halaman divisi

`Metaverse.jsx`, `Robotics.jsx`, dan `Printing.jsx` berbagi satu struktur:

1. Hero: lencana, judul, subjudul, tag teknologi, dua tombol, tiga statistik, nama
   ketua, dan ilustrasi kanvas di sisi kanan.
2. `<Marquee>` dengan kata kunci khusus divisi.
3. Grid proyek dari `DIVISION_PROJECTS.<div>`.
4. **Satu bagian unik per divisi** (ini perbedaan utama di antara ketiganya).
5. Grid tumpukan teknologi dari array `TECH` lokal.
6. "Get Involved" — teks plus array `LEARN` berisi kegiatan berulang.
7. Bilah CTA dan footer.

| Halaman | Kelas pembungkus | Kanvas | Bagian unik |
|---|---|---|---|
| `Metaverse.jsx` | `div-blue` | Kubus wireframe (`HeroCanvas`) | tidak ada |
| `Robotics.jsx` | `div-green` | Papan Arduino (`ArduinoCanvas`) | **Live Demo** — panel telemetri palsu `LiveSensors` |
| `Printing.jsx` | `div-amber` | Printer FDM (`PrinterCanvas`) | **Print Specs** — tabel peralatan lab |

**Bagaimana pewarnaan temanya bekerja** — ini pola yang dijelaskan di bagian 9.2.
Kelas pembungkus menyetel `--accent`, dan `divisions.css` hanya merujuk ke
`var(--accent)`. Satu stylesheet, tiga tema, tanpa duplikasi.

**`LiveSensors`** (di `Robotics.jsx`) adalah komponen kecil yang bagus: enam
bacaan telemetri palsu yang disegarkan oleh pewaktu.

```jsx
const [sensors, setSensors] = useState({ prox:42, torque:78, speed:1240, temp:36.4, volt:4.98, current:0.32 });
useEffect(() => {
  const id = setInterval(() => setSensors({ /* nilai acak baru */ }), 800);
  return () => clearInterval(id);
}, []);
```

Setiap baris me-render label, sebuah bilah yang lebarnya `pct * 100`%, dan nilai
yang diformat. `clearInterval` di pembersihnya wajib — tanpanya pewaktunya terus
menyala setelah kamu berpindah halaman, memanggil `setState` pada komponen yang
sudah dilepas.

> **⚠ Jebakan.** Ketiga statistik hero di setiap halaman divisi adalah **string
> yang ditulis langsung**, dan angkanya bertentangan dengan data nyata. Metaverse
> menulis "6 Projects" padahal `DIVISION_PROJECTS.metaverse` berisi 2; Printing
> menulis 16; Robotics menulis 9. Halaman utama membaca `.length` yang nyata, jadi
> kedua halaman itu saling bertentangan. Perbaikannya di bagian 11.8.

---

## 11. Buku resep: tugas perawatan yang umum

Resep praktis. Masing-masing mencantumkan file-nya, perubahannya, dan cara
memverifikasinya.

### 11.1 Menambah acara baru

**File:** `src/data/events.js`

Tambahkan ke `ALL_EVENTS`, jaga array tetap terurut berdasarkan tanggal:

```js
{ id: 6, month: 'NOV', day: '15', year: 2026,
  title: 'Arduino Bootcamp',
  type: 'Workshop',
  location: 'Smart Classroom 2',
  time: '13:00 – 16:00',
  desc: 'Pengenalan Arduino dua jam langsung praktik untuk pemula total.',
  division: 'Robotics',
  capacity: '20 spots' },
```

Daftar periksa:

- `id` unik.
- `month` tiga huruf kapital.
- `type` adalah kunci yang sudah ada di `TYPE_COLORS` (kalau belum, tambahkan ke
  kedua peta warna).
- `division` tepat `'All'`, `'Metaverse'`, `'Robotics'`, atau `'3D Printing'`.
- Tambahkan `featured: true` hanya untuk acara yang benar-benar besar — itu
  sorotan visual, dan menyoroti semuanya sama dengan tidak menyoroti apa pun.

**Verifikasi:** acaranya muncul di `/events` di bawah bulannya, penghitung
"Upcoming Events" bertambah, acaranya bertahan melewati filter jenis dan divisi,
dan kalau ia termasuk empat terdekat ia juga muncul di halaman utama.

### 11.2 Membuka atau menutup pendaftaran

**File:** `src/config/signup.js`

Untuk membuka:

```js
export const SIGNUP_CONFIG = {
  isOpen: true,
  googleFormUrl: 'https://forms.gle/ID-FORM-ASLIMU',   // ← tidak boleh kosong
  nextIntakeDate: 'September 2026',
  showNextIntakeDate: true,
};
```

Untuk menutup, setel `isOpen: false` dan perbarui `nextIntakeDate` ke siklus
berikutnya.

**Verifikasi:** di `/join` lencananya hijau dan berdenyut, tombolnya membuka
form-mu di tab baru, dan subjudul hero berbunyi "Sign-ups are open now". Di
halaman utama, mengetik `join robotics` di terminal mencetak pesan hijau dan
mengarahkan ke `/join`.

### 11.3 Menambah atau memperbarui proyek divisi

**File:** `src/data/projects.js`

```js
robotics: [
  { name: 'Ursuline Cup Final Project', /* … */ },
  { name: 'Line Follower v2',
    desc: 'Line follower PID generasi kedua untuk musim kompetisi 2026.',
    tags: ['C++','Arduino','PID','IR Sensors'],
    status: 'In Progress' },
],
```

`status` harus `'Active'`, `'In Progress'`, atau `'Shipped'`.

**Verifikasi:** kartu proyeknya muncul di `/robotics`; penghitung Projects di hero
halaman utama dan di kartu divisi halaman utama keduanya bertambah satu; kalau
`status`-nya `'Active'`, perintah `projects` di terminal mencantumkannya.

### 11.4 Mengubah jumlah anggota sebuah divisi

Tidak ada satu tempat. Angkanya terduplikasi:

| File | Lokasi |
|---|---|
| `src/pages/Home/Hero.jsx` | `members: 31` dll. di dalam `DIV_DATA` |
| `src/pages/Home/DivisionsShowcase.jsx` | `members: 31` dll. di dalam `DIVISIONS` |
| `src/pages/Home/Terminal.jsx` | string keluaran perintah `members` |
| `src/pages/divisions/*.jsx` | array statistik hero yang ditulis langsung |
| `src/pages/About.jsx` | grid statistik hero, prosa subjudul hero, entri timeline terakhir |
| `src/pages/Join.jsx` | subjudul hero (dua kali) dan daftar statistik hero |

Cari angka lamanya di seluruh folder `src/` dan perbarui setiap kemunculannya.
Duplikasi ini adalah utang teknis terburuk dalam proyek ini; bagian 15 mengusulkan
perbaikan sumber-tunggal yang butuh sekitar dua puluh menit dan akan membuat tugas
ini menjadi suntingan satu baris.

### 11.5 Mengubah ketua atau wakil ketua divisi

Dua file per divisi:

1. `src/pages/Home/DivisionsShowcase.jsx` — field `leader` dan `viceLead` pada
   entri `DIVISIONS` yang sesuai.
2. `src/pages/divisions/<Divisi>.jsx` — kedua nama di hero, sekitar baris 96–100.

Dan kalau orangnya ada di lorong kepemimpinan, juga `TEAM` di `About.jsx` — lihat
resep berikutnya.

### 11.6 Menambah, menghapus, atau mengganti nama anggota tim

**File:** `src/pages/About.jsx`

**Langkah 1.** Edit array `TEAM`:

```js
{ name:'Nama Orang Baru', role:'Treasurer', div:'Community',
  color:'#5570f1', initials:'NOB', img:null },
```

- `div` sebaiknya `'Community'`, `'Metaverse'`, `'Robotics'`, atau
  `'3D Printing'`.
- `color` sebaiknya cocok dengan warna divisinya.
- `initials` adalah placeholder yang ditampilkan ketika tidak ada foto. Hanya
  **dua karakter pertama** yang ditampilkan (`member.initials.slice(0, 2)`), jadi
  `'NOB'` tampil sebagai `NO`.
- `img: '/uploads/foto.webp'` menampilkan foto sungguhan. Letakkan filenya di
  `public/uploads/` dulu.

**Langkah 2 — jangan lewati ini.** Perbarui `TUNNEL_SECTIONS` supaya rentang
irisannya masih cocok. Urutan `TEAM` harus: anggota Community, lalu Metaverse,
lalu Robotics, lalu 3D Printing. Kalau kamu menambahkan anggota Community kelima,
setiap rentang berikutnya bergeser satu:

```js
const TUNNEL_SECTIONS = [
  { title:'COMMUNITY', color:'#5570f1', members: TEAM.slice(0,5)  },  // tadinya (0,4)
  { title:'METAVERSE', color:'#5570f1', members: TEAM.slice(5,7)  },  // tadinya (4,6)
  { title:'ROBOTICS',  color:'#22c97a', members: TEAM.slice(7,9)  },  // tadinya (6,8)
  { title:'3D PRINT',  color:'#f5a232', members: TEAM.slice(9,11) },  // tadinya (8,10)
];
```

**Verifikasi:** scroll seluruh lorong kepemimpinan di `/about` dan pastikan setiap
orang muncul di bawah judul divisi yang benar, baik di lorong 3-D maupun di layar
daftar akhir.

### 11.7 Menambahkan foto ke galeri atau portofolio

**Langkah 1.** Letakkan gambarnya di `public/uploads/`. Pakai `.webp` dan jaga
ukurannya di bawah kira-kira 300 KB — lihat bagian 12.

**Langkah 2 — galeri.** Tambahkan ke `GALLERY` di `About.jsx`:

```js
{ label:'Robotics Workshop 2026',
  bg:'rgba(34,201,122,0.08)',
  hint:'Workshop · Maret 2026',
  img:'/uploads/robotics-workshop.webp',
  wide:true },
```

Path-nya dimulai dengan `/uploads/`, **bukan** `/public/uploads/` — `public/`
adalah akar web dalam hasil build. `wide: true` membentang dua kolom,
`tall: true` membentang dua baris; hilangkan keduanya untuk sel normal. `hint`
hanya tampil kalau `img` bernilai `null`.

**Langkah 3 — portofolio.** Tambahkan ke `PORTFOLIO`:

```js
{ name:'Hexapod Walker', div:'Robotics',
  desc:'Robot berjalan enam kaki dengan kendali gaya langkah kinematika terbalik.',
  status:'In Progress', statusColor:'#5570f1',
  bg:'rgba(85,112,241,0.08)', divColor:'#22c97a',
  img:'/uploads/hexapod.webp' },
```

`divColor` sebaiknya warna divisinya; `statusColor` sebaiknya cocok dengan
statusnya (hijau `#22c97a` untuk Active, biru `#5570f1` untuk In Progress,
`rgba(255,255,255,0.3)` untuk Shipped).

**Verifikasi:** gambarnya terbuka, mengkliknya membuka lightbox, Escape
menutupnya, dan mosaik galerinya masih tampak seimbang.

### 11.8 Memperbaiki statistik hero halaman divisi

**File:** ketiga file di `src/pages/divisions/`

Ganti array yang ditulis langsung dengan nilai yang dihitung. Di `Metaverse.jsx`,
ubah:

```jsx
{[['31','Members'],['6','Projects'],['4','Events / Sem']].map(([n,l]) => (
```

menjadi:

```jsx
{[['31','Members'],[String(PROJECTS.length),'Projects'],['4','Events / Sem']].map(([n,l]) => (
```

`PROJECTS` sudah didefinisikan di bagian atas setiap file sebagai
`DIVISION_PROJECTS.metaverse`. Sekarang hitungannya tidak bisa menyimpang dari
kenyataan. Lakukan hal yang sama di `Robotics.jsx` dan `Printing.jsx`.

### 11.9 Menambah perintah terminal baru

**File:** `src/pages/Home/Terminal.jsx`

Tambahkan sebuah kunci ke `COMMANDS`:

```js
contact: () => [
  { type:'blue',  text:'Get in touch' },
  { type:'spacer' },
  { type:'out',   text:'  Instagram : @ursutech' },
  { type:'out',   text:'  WhatsApp  : wa.me/6282261592211' },
  { type:'spacer' },
],
```

Lalu tambahkan satu baris ke keluaran `help` supaya orang bisa menemukannya:

```js
{ type:'out', text:'  contact          Show contact information' },
```

Kalau mau, tambahkan juga ke `HINTS` untuk mendapat tombol yang bisa diklik di
sisi kiri.

Nilai `type` yang tersedia: `out` (abu-abu redup), `green`, `blue`, `amber`,
`dim` (sangat samar), `err` (merah), `spacer` (baris kosong).

### 11.10 Mengubah nomor kontak atau tautan sosial

- **WhatsApp / kontak:** `CONTACT_URL` di `src/config/signup.js`. Satu suntingan,
  berlaku untuk footer di mana pun.
- **Instagram:** ditulis langsung sebagai `https://www.instagram.com/ursutech/`
  di `Footer.jsx`, `CTA.jsx`, `Events.jsx`, dan `Join.jsx`. Cari `instagram.com`
  di `src/` dan perbarui masing-masing. Memindahkan ini ke `signup.js` bersebelahan
  dengan `CONTACT_URL` akan jadi perbaikan kecil yang bagus.
- **GitHub:** di `Footer.jsx`.
- **Email:** `ursutech@gmail.com` muncul di pembuka FAQ di `Join.jsx`.

### 11.11 Mengubah warna di seluruh situs

**File:** `src/styles/global.css`

Edit tokennya di `:root`, misalnya `--blue: #5570f1`. Setiap aturan CSS yang
memakai `var(--blue)` akan ikut berubah.

Tetapi **literal warna di JavaScript tidak ikut**. Nilai heks yang sama diulang
di:

- `Hero.jsx` (`DIV_DATA`: `color`, `badgeBg`, `badgeBorder`, `tint`)
- `DivisionsShowcase.jsx` (`DIVISIONS`: `color`, `glowColor`, `iconBg`)
- `Nav.jsx` (`DIV_LINKS`)
- `data/events.js` (`TYPE_COLORS`)
- `data/projects.js` (`STATUS_COLORS`)
- `styles/divisions.css` (`.div-blue` / `.div-green` / `.div-amber`)
- `About.jsx` (`TIMELINE`, `TEAM`, `PORTFOLIO`, `TUNNEL_SECTIONS`)
- di dalam setiap fungsi menggambar kanvas, sebagai string `rgba(…)`

Cari heks lamanya di seluruh `src/` dan kerjakan secara sistematis. Perubahan
merek yang sungguhan adalah pekerjaan setengah hari, bukan suntingan satu baris.

### 11.12 Mengedit teks halaman

Prosa tidak ada di lapisan data — ia tinggal di komponen yang menampilkannya.

| Teks | File |
|---|---|
| Paragraf "siapa kami" di beranda | `src/pages/Home/HomeAbout.jsx` |
| Enam pilar di beranda | `src/pages/Home/Pillars.jsx` (array `pillars`) |
| CTA penutup beranda | `src/pages/Home/CTA.jsx` |
| Prosa sejarah di About | `src/pages/About.jsx`, di dalam bagian History |
| Entri timeline About | `TIMELINE` di `About.jsx` |
| Nilai-nilai di About | `VALUES` di `About.jsx` |
| FAQ di Join | `FAQS` di `Join.jsx` |
| Manfaat di Join | `PERKS` di `Join.jsx` |
| Tiga langkah di Join | `STEPS` di `Join.jsx` |
| Deskripsi divisi | file yang relevan di `src/pages/divisions/` |
| Tumpukan teknologi divisi | array `TECH` di setiap file divisi |
| Kegiatan divisi | array `LEARN` di setiap file divisi |

> **⚠ Apostrof di JSX.** Teks berada di dalam string JavaScript, jadi `'` yang
> tidak di-escape akan merusak string berkutip tunggal. Pakai kutip ganda di
> sekitar stringnya (`a: "…you'll receive…"`) atau escape tanda itu
> (`'…you\'ll…'`). Kamu akan melihat keduanya di kode yang sudah ada.

### 11.13 Menambah divisi baru sepenuhnya

Tugas terpanjang, tetapi mekanis:

1. **`src/data/projects.js`** — tambahkan sebuah kunci ke `DIVISION_PROJECTS`,
   misalnya `ai: [...]`.
2. **`src/styles/divisions.css`** — tambahkan kelas tema:
   ```css
   .div-purple { --accent: #a855f7; --accent-glow: rgba(168,85,247,0.15); --accent-dim: rgba(168,85,247,0.25); }
   ```
   Tambahkan juga penimpaan `.div-purple .project-card-tag`,
   `.div-purple .learn-item-icon`, dan `.div-purple .div-hero-badge`, mengikuti
   ketiga yang sudah ada.
3. **`src/pages/divisions/AI.jsx`** — salin `Metaverse.jsx` sebagai templat, ubah
   kelas pembungkusnya menjadi `div-purple`, dan tulis ulang array kontennya.
4. **`src/App.jsx`** — impor dan tambahkan `<Route path="/ai" element={<AI />} />`.
5. **`src/components/Nav.jsx`** — tambahkan ke `DIV_LINKS` dengan warna baru.
6. **`src/pages/Home/Hero.jsx`** — tambahkan ke `DIV_DATA`, **dan** ubah
   `Math.floor(pct * 3)` / `Math.min(2, …)` / `(i / 3 + 0.01)` supaya memakai `4`
   dan `3`. Tiga angka, mudah terlewat — pembagian scroll-nya ditulis langsung
   untuk tiga divisi.
7. **`src/pages/Home/DivisionsShowcase.jsx`** — tambahkan ke `DIVISIONS`.
   Perbarui juga `.divisions-grid { grid-template-columns: repeat(3, 1fr) }` di
   `home.css` dan label `{d.num} / 03`.
8. **`src/pages/Home/Terminal.jsx`** — tambahkan satu baris ke perintah
   `divisions`, tambahkan kunci baru ke `map` di `getJoinOutput`, dan ke `PREFIX`
   / `COLOR` di perintah `projects`.
9. **`src/pages/Events.jsx`** — tambahkan nama divisinya ke `divFilters`.
10. **`src/pages/About.jsx`** — tambahkan anggota ke `TEAM` dan satu bagian ke
    `TUNNEL_SECTIONS`, lalu hitung ulang setiap irisannya.

Kerjakan dalam urutan ini dan uji setelah setiap langkah.

### 11.14 Men-deploy sebuah perubahan

```bash
git add .
git commit -m "Tambah acara Arduino Bootcamp untuk November 2026"
git push
```

Kalau hosting-mu terhubung ke repositori GitHub, itu sudah seluruh proses
deploy-nya — ia membangun dan menerbitkan otomatis dalam satu sampai dua menit.
Bagian 13 membahas detailnya dan cara mengaturnya dari nol.

---

## 12. Gambar dan aset

### Ke mana file-nya diletakkan

Semua yang dilihat pengunjung tinggal di `public/uploads/`. Vite menyalin
`public/` apa adanya ke hasil build tanpa memprosesnya, jadi file di
`public/uploads/foto.webp` disajikan di `/uploads/foto.webp`.

**Rujuk sebagai `/uploads/foto.webp`** — dengan garis miring di depan, tanpa
`public/`. Salah di sini adalah kesalahan gambar yang paling sering terjadi.

```jsx
<img src="/uploads/logo.png" alt="URSU Technology" />   // ✅
<img src="/public/uploads/logo.png" />                  // ❌ 404
<img src="uploads/logo.png" />                          // ❌ rusak di rute bersarang
```

### Format dan ukuran

Aset saat ini berformat `.webp` kecuali `logo.png` dan `bot.jpg`. **Pakai WebP
untuk foto.** Formatnya biasanya 25–35% lebih kecil daripada JPEG pada kualitas
visual yang sama dan didukung setiap browser yang dipakai hari ini.

Panduan:

- **Foto** (galeri, portofolio): WebP, sisi terpanjang sekitar 1600 px, di bawah
  ~300 KB.
- **Logo:** PNG, karena butuh transparansi.
- Konversikan lewat [squoosh.app](https://squoosh.app) di browser, atau
  `cwebp -q 82 input.jpg -o output.webp` di baris perintah.

Tidak ada optimasi gambar saat build dan tidak ada `srcset` responsif, jadi file
yang kamu commit adalah tepat yang diunduh pengunjung. Gambar berukuran berlebih
adalah penyebab paling mungkin situs terasa lambat.

### Teks alternatif (alt)

Setiap `<img>` dalam proyek ini punya atribut `alt`, dan yang baru harus punya
juga. Itulah yang didengar pengguna pembaca layar dan yang tampil kalau gambarnya
gagal dimuat. Deskripsikan isinya (`alt="Anggota merakit robot line follower"`),
bukan nama filenya (`alt="IMG_2043"`).

### Penamaan

Huruf kecil, tanpa spasi, tanda hubung antar kata: `3dprintworkshop.webp`,
`linefollower.webp`. Spasi di nama file memerlukan pengodean URL dan menyebabkan
404 yang sulit dilacak.

---

## 13. Deployment

### Bagaimana sekarang bekerjanya

Repositori memuat `vercel.json`, jadi situs ini dikonfigurasi untuk **Vercel**.

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Mengapa file ini esensial.** Situs ini aplikasi satu halaman: hanya
`index.html` yang ada sebagai file sungguhan. Kalau pengunjung membuka
`https://situs.com/about` langsung, atau me-refresh saat berada di halaman itu,
server mencari file di `/about`, tidak menemukan apa-apa, dan mengembalikan 404.
Rewrite ini memberi tahu hosting untuk menjawab *setiap* path dengan
`index.html`, setelah itu React Router membaca URL-nya dan menampilkan halaman
yang benar.

**Kalau kamu suatu saat pindah hosting, kamu harus mereproduksi aturan ini**,
kalau tidak setiap URL kecuali halaman utama akan 404 saat di-refresh.
Padanannya:

- **Netlify** — buat `public/_redirects` berisi `/* /index.html 200`
- **GitHub Pages** — salin `dist/index.html` menjadi `dist/404.html` setelah
  build
- **Cloudflare Pages** — langsung berfungsi untuk SPA
- **Apache** — `.htaccess` dengan `FallbackResource /index.html`
- **nginx** — `try_files $uri $uri/ /index.html;`

### Alur deploy

1. Kamu push ke branch `main` di GitHub.
2. Vercel mendeteksi push itu.
3. Ia menjalankan `npm install` lalu `npm run build`.
4. Ia menerbitkan isi `dist/` ke CDN.
5. Situs langsung diperbarui, biasanya dalam satu sampai dua menit.

Kamu tidak pernah membangun atau mengunggah secara manual.

### Menghubungkan hosting dari nol

Kalau kamu perlu mengatur ini lagi, misalnya di bawah akun Vercel baru:

1. Masuk di [vercel.com](https://vercel.com) dengan akun GitHub yang memiliki
   repositorinya.
2. **Add New → Project**, lalu pilih `utech-website`.
3. Vercel mendeteksi Vite otomatis. Konfirmasi: framework **Vite**, build command
   `npm run build`, output directory `dist`.
4. **Deploy.** Kamu langsung mendapat URL `*.vercel.app`.
5. Kalau mau, pasang domain khusus di **Settings → Domains**.

Tidak ada variabel lingkungan yang dibutuhkan — tidak ada rahasia di proyek ini.

### Menyerahkan akses

Bagian dari serah terima adalah akses, bukan hanya kode. Pastikan pengurus yang
masuk mendapat:

- **GitHub** — kepemilikan atau hak admin pada repositori `utech-website`, atau
  sebuah fork di bawah akun milik komunitas.
- **Vercel** (atau hosting mana pun) — akses ke proyek dan domainnya.
- **Google Form** — akses editor ke form pendaftaran, dan ke spreadsheet
  responsnya.
- **Instagram** `@ursutech` — kredensial login.
- **Registrar domain**, kalau klub memiliki domain khusus.

Situs yang tidak bisa di-deploy siapa pun adalah situs yang tidak bisa dirawat
siapa pun. Pertimbangkan membuat akun klub bersama untuk setiap layanan alih-alih
mengikatkannya pada akun pribadi satu siswa.

### Membatalkan deploy yang buruk

Di Vercel, buka **Deployments**, cari build terakhir yang bagus, dan pilih
**Promote to Production**. Instan dan tidak memerlukan perubahan git.

Di git, untuk membatalkan sebuah commit tertentu:

```bash
git revert <hash-commit>
git push
```

`git revert` membuat commit baru yang membatalkan commit lama, yang aman pada
branch bersama. Hindari `git reset --hard` plus force-push pada `main` — itu
menulis ulang riwayat yang mungkin sudah ditarik orang lain.

---

## 14. Masalah yang diketahui, duplikasi, dan utang teknis

Inventaris yang jujur. Tidak ada yang merusak situs; semuanya akan menggigitmu
pada akhirnya. Kurang lebih diurutkan berdasarkan seberapa mungkin menyebabkan
masalah nyata.

### Prioritas tinggi

**1. Jumlah anggota terduplikasi di tujuh file.** `62`, `31`, `24`, dan `22`
muncul di `Hero.jsx`, `DivisionsShowcase.jsx`, `Terminal.jsx`, ketiga halaman
divisi, `About.jsx` (tiga tempat terpisah), dan `Join.jsx` (tiga tempat).
Memperbarui setelah gelombang rekrutmen berarti menemukan setiap kemunculannya.
Dipastikan akan menyimpang. Perbaikan: bagian 15.1.

**2. Perintah `events` di terminal kedaluwarsa dan ditulis langsung.** Ia masih
mencetak "Spring Hackathon 2026", "AI & Machine Learning Workshop", "Industry
Night — Summer Edition", dan "End-of-Year Showcase & Social". Tidak satu pun ada
di `data/events.js`. Pengunjung yang mengetik `events` di terminal lalu membuka
`/events` melihat dua daftar acara yang berbeda. Perintah `projects` sudah
membaca data hidup, jadi pola yang perlu ditiru ada di file yang sama. Perbaikan:
bagian 15.2.

**3. `TUNNEL_SECTIONS` mengiris `TEAM` dengan indeks yang ditulis langsung.**
Menambah anggota tanpa menyesuaikan batas irisannya akan diam-diam menempatkan
orang di bawah divisi yang salah. Tidak ada galat, hanya keluaran yang salah.
Perbaikan: bagian 15.3.

**4. Statistik hero halaman divisi bertentangan dengan data nyata.** Metaverse
mengklaim 6 proyek (sebenarnya 2), Robotics 9 (sebenarnya 1), Printing 16
(sebenarnya 1). Halaman utama menampilkan hitungan nyata, jadi situsnya
bertentangan dengan dirinya sendiri. Perbaikan: bagian 11.8.

**5. `googleFormUrl` kosong.** Menyetel `isOpen: true` tanpa juga menyetel URL-nya
menghasilkan tombol mencolok yang tidak melakukan apa pun. Layak menambahkan
penjaga yang jatuh kembali ke tautan Instagram ketika URL-nya kosong.

### Prioritas menengah

**6. `MONTH_INDEX` dideklarasikan dua kali**, identik, di `data/events.js` dan
`Events.jsx`. Ekspor dari file data dan impor saja.

**7. Kode mati.**

- `Events.jsx` menghitung `past` dan tidak pernah me-render-nya; `r1` dan `r2`
  dari `useReveal` juga tak terpakai.
- `events.css` masih menyimpan `.past-section`, `.past-grid`, dan `.past-card`
  untuk bagian yang sudah dihapus.
- `join.css` masih menyimpan `.div-chooser`, `.div-choice*`, `.form-grid`, dan
  `.join-form-*` untuk formulir yang sudah tidak ada.
- `about.css` masih menyimpan `.team-grid` / `.team-card` / `.team-avatar` dari
  tata letak grid yang digantikan lorong 3-D.
- `divisions.css` punya `.div-detail.open`, yang digantikan `maxHeight` inline.
- `Nav.jsx` dikirimi `active="metaverse.html"` oleh halaman divisi. `Nav` tidak
  menerima prop apa pun dan mengabaikannya — sisa dari masa ketika situs ini HTML
  statis.
- Prop `color` pada `Marquee` tidak pernah dikirim oleh pemanggil mana pun.

**8. Inline style dipakai untuk tampilan tetap.** `Events.jsx`, `Join.jsx`, dan
`About.jsx` memuat blok `style={{ … }}` panjang untuk tata letak dan tipografi
yang tidak digerakkan data. Semestinya menjadi kelas CSS. Lebih sulit dibaca,
tidak mungkin dipakai ulang, dan tidak bisa ditimpa media query — itulah sebabnya
`join.css` harus memakai `!important` pada `.faq-section-grid` dan
`.join-form-section-grid` untuk mengalahkan kolom grid inline pada lebar mobile.

**9. Batas `max-height` tetap saat membuka.** `.faq-a.open` dibatasi 200 px dan
panel detail divisi 440 px. Konten panjang terpotong tanpa peringatan.

**10. `e.division === 'All'` membuat filter divisi permisif.** Setiap acara
seluruh klub tampil di setiap filter divisi. Bisa dibilang benar, tetapi artinya
memfilter ke "Metaverse" saat ini menampilkan kelima acara, yang bisa terbaca
sebagai filter yang rusak. Pertimbangkan catatan visual, atau mode yang lebih
ketat.

### Prioritas rendah

**11. Tidak ada linter, formatter, atau tes.** Tidak ada konfigurasi ESLint,
tidak ada Prettier, dan tidak ada rangkaian tes. Konsistensi gaya sepenuhnya
bergantung pada pengurusnya, dan tidak ada yang menangkap salah ketik sebelum
deploy selain browser.

**12. Celah aksesibilitas.**

- Lorong kepemimpinan hanya digerakkan roda dan sentuhan. Pengguna papan ketik
  tidak bisa melewatinya, dan kontennya praktis tak terjangkau tanpa tetikus.
- Penanganan `prefers-reduced-motion` masih sebagian: animasi kanvas dan lorongnya
  tetap bergerak penuh.
- Dropdown divisi terbuka saat hover dengan cadangan klik, tetapi tidak mendukung
  navigasi tombol panah antar itemnya.
- Pola `data-active` pada kartu divisi memakai `<div>` dengan `onClick` alih-alih
  `<button>`, jadi kartu-kartu itu tidak bisa dioperasikan dengan papan ketik.

**13. Tidak ada metadata SEO atau sosial.** `index.html` punya `<title>` dan
tidak ada lagi. Tidak ada `<meta name="description">`, tidak ada tag Open Graph,
jadi tautan yang dibagikan ke WhatsApp atau Instagram tidak menampilkan gambar
pratinjau atau deskripsi. Juga tidak ada `sitemap.xml` atau `robots.txt`. Usaha
kecil, hasil yang terlihat.

**14. Tidak ada rute 404.** URL yang tidak dikenal menampilkan halaman yang
benar-benar kosong.

**15. URL Instagram ditulis langsung di empat file.** Semestinya tinggal di
`config/signup.js` di samping `CONTACT_URL`.

**16. Tahun di footer ditulis langsung** sebagai `© 2026`.

**17. Folder `uploads/` di root yang tertinggal** berisi satu tangkapan layar yang
tidak pernah disajikan. Aman untuk dihapus.

**18. `home.css` mendefinisikan ulang kelas bersama.** `.section-inner`,
`.section-label`, dan `.reveal` ada di `shared.css` maupun `home.css`. Saat ini
tidak berbahaya karena nilainya sama, tetapi mengedit satu dan bukan yang lain
menciptakan ketidakkonsistenan membingungkan yang hanya muncul di sebagian
halaman.

---

## 15. Ide pengembangan

Diurutkan supaya item awalnya benar-benar bisa dikerjakan orang yang baru mengenal
basis kode ini, dan membangun kepercayaan diri yang dibutuhkan untuk item
selanjutnya.

### 15.1 Buat satu sumber kebenaran untuk statistik komunitas — *kecil, bernilai tinggi*

Buat `src/data/community.js`:

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

Lalu ganti setiap hitungan yang ditulis langsung dengan sebuah impor.
`TOTAL_MEMBERS` bersifat turunan, jadi ia tidak mungkin bertentangan dengan angka
per divisi. Pembaruan tahun depan menjadi tiga suntingan alih-alih pencarian di
tujuh file. Ini kontribusi pertama terbaik untuk basis kode ini.

### 15.2 Hubungkan perintah `events` di terminal ke data nyata — *kecil, bernilai tinggi*

Di `Terminal.jsx`, ganti array yang ditulis langsung dengan:

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

Sekarang terminal tidak mungkin bertentangan dengan halaman events. Tiru bentuk
perintah `projects` yang sudah ada, yang memang sudah melakukannya dengan benar.

### 15.3 Buat `TUNNEL_SECTIONS` diturunkan dari `TEAM` — *kecil, menghapus satu kelas bug*

Ganti pengirisan berdasarkan indeks dengan pemfilteran pada field `div` yang sudah
dimiliki `TEAM`:

```js
const TUNNEL_SECTIONS = [
  { title:'COMMUNITY', color:'#5570f1', members: TEAM.filter(m => m.div === 'Community')   },
  { title:'METAVERSE', color:'#5570f1', members: TEAM.filter(m => m.div === 'Metaverse')   },
  { title:'ROBOTICS',  color:'#22c97a', members: TEAM.filter(m => m.div === 'Robotics')    },
  { title:'3D PRINT',  color:'#f5a232', members: TEAM.filter(m => m.div === '3D Printing') },
];
```

Sekarang menambah anggota cukup satu suntingan di satu tempat, urutan di `TEAM`
tidak lagi penting, dan bug "divisi salah" menjadi tidak mungkin terjadi.

### 15.4 Tambahkan metadata SEO dan sosial — *kecil, hasil terlihat*

Di `index.html`:

```html
<meta name="description" content="URSU Technology (U-TECH) adalah komunitas teknologi yang dipimpin siswa di SMA Regina Pacis Surakarta. Tiga divisi: Metaverse & Web Design, Robotics & Embedded Systems, 3D Printing." />
<meta property="og:title" content="URSU Technology — Komunitas Teknologi Siswa" />
<meta property="og:description" content="Tiga divisi, 62 anggota, keanggotaan gratis. Bangun hal nyata di SMA Regina Pacis Surakarta." />
<meta property="og:image" content="/uploads/logo.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

Tautan yang dibagikan ke WhatsApp atau Instagram lalu menampilkan kartu pratinjau
yang semestinya. Tambahkan juga `public/robots.txt` dan `public/sitemap.xml`.

Untuk judul per halaman, setel `document.title` di `useEffect` kecil pada setiap
halaman, atau pasang `react-helmet-async`.

### 15.5 Tambahkan halaman 404 — *kecil*

```jsx
<Route path="*" element={<NotFound />} />
```

Sebuah komponen `NotFound` dengan `<Nav />`, pesan singkat, tautan ke beranda, dan
`<Footer />`. Dua puluh baris, dan itu mencegah URL yang salah ketik menampilkan
halaman kosong.

### 15.6 Ekstrak tata letak halaman divisi yang sama — *menengah*

Ketiga halaman divisi panjangnya kira-kira 200 baris masing-masing dan sekitar
80% identik. Satu komponen `DivisionPage` yang menerima perbedaannya sebagai
props, dengan setiap halaman disederhanakan menjadi sebuah objek data plus satu
bagian unik sebagai `children`, akan menghapus sekitar 400 baris duplikat.
Perbaiki bug hero sekali alih-alih tiga kali.

### 15.7 Pindahkan inline style tata letak ke CSS — *menengah, berkelanjutan*

Kerjakan `Events.jsx`, `Join.jsx`, dan `About.jsx`, mengonversi blok
`style={{ … }}` bertampilan tetap menjadi kelas bernama di stylesheet yang sesuai.
Simpan inline style hanya untuk nilai turunan data. Ini juga memungkinkanmu
menghapus akal-akalan `!important` di `join.css`.

Kerjakan satu bagian sekali waktu, periksa halamannya setelah masing-masing. Tidak
glamor, tapi membuat setiap perubahan berikutnya lebih mudah.

### 15.8 Lengkapi dukungan gerak berkurang — *menengah, aksesibilitas*

Baca preferensinya di JavaScript dan hormati di komponen yang beranimasi:

```jsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Di setiap kanvas, gambar satu frame statis dan lewati loop
`requestAnimationFrame`. Di lorong kepemimpinan, lewati penangkapan scroll
sepenuhnya dan render daftar yang rata secara langsung. Sebagian pengunjung
mengalami mual gerak dari scroll-jacking dan paralaks; ini isu aksesibilitas
nyata, bukan sekadar kemewahan.

### 15.9 Buat lorong kepemimpinan bisa diakses papan ketik — *menengah, aksesibilitas*

Tambahkan penanganan tombol panah dan Page Up/Down yang memindahkan `S.target`,
buat kontainernya bisa difokus dengan `tabIndex={0}`, dan sediakan tombol "Skip to
full roster" yang terlihat untuk melompat langsung ke daftar rata. Saat ini
informasi kepemimpinan tak terjangkau tanpa alat penunjuk.

### 15.10 Tambahkan ESLint dan Prettier — *menengah, mencegah masalah ke depan*

```bash
npm install -D eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks prettier
```

Tambahkan `"lint": "eslint src"` ke skripnya. Plugin React Hooks sendiri saja
menangkap satu keluarga bug halus (dependensi efek yang kurang, pemanggilan hook
bersyarat). Prettier mengakhiri semua debat format. Layak dikerjakan sebelum basis
kodenya bertambah besar.

### 15.11 Pindahkan acara ke CMS atau spreadsheet — *besar*

Saat ini memperbarui sebuah acara memerlukan akses git dan satu deploy. Kalau
pengurus di masa depan kurang teknis, itu halangan nyata. Pilihannya, dari yang
termurah:

- **Google Sheets sebagai sumber data.** Terbitkan sebuah sheet sebagai CSV dan
  ambil saat halaman berjalan. Gratis, dan siapa pun bisa mengedit spreadsheet.
  Biayanya: satu permintaan jaringan, dan situsnya rusak kalau sheet-nya
  dibatalkan penerbitannya.
- **Headless CMS** (Sanity, Contentful, Strapi) dengan antarmuka penyuntingan
  yang layak dan tingkat gratis. Persiapannya lebih banyak, pemakaiannya jauh
  lebih nyaman.
- **CMS berbasis git** (Decap CMS, sebelumnya Netlify CMS). Memberi antarmuka
  penyuntingan web yang meng-commit ke repositori, jadi datanya tetap di git.
  Jalan tengah yang bagus untuk sebuah klub.

Lakukan ini hanya kalau menyunting acara benar-benar menjadi penghambat.
Meng-commit sebuah objek JS lebih sederhana daripada opsi mana pun di atas kalau
pengurusnya nyaman dengan git.

### 15.12 Tambahan lain yang berharga

- **Hidupkan kembali bagian acara lampau.** `Events.jsx` sudah menghitung `past`
  dan `events.css` masih punya gayanya. Sebagian besar hanya soal menyambungkan.
- **Gambar responsif.** Hasilkan varian 800 px / 1600 px dan pakai `srcset` supaya
  ponsel tidak mengunduh foto seukuran desktop.
- **Muat kanvas secara lazy.** `React.lazy` plus `Suspense` pada kanvas hero akan
  memotong ukuran bundel awal.
- **Halaman detail acara.** `/events/:id` untuk acara yang butuh deskripsi penuh,
  poster, atau tautan pendaftaran.
- **Halaman sumber daya khusus anggota.** Tutorial, materi presentasi, panduan
  printer.
- **Analitik.** Vercel Analytics atau Plausible, untuk mengetahui halaman mana
  yang benar-benar berujung pada pendaftaran.
- **Audit teks `alt`.** Beberapa gambar galeri memakai labelnya sebagai alt, yang
  mendeskripsikan acaranya bukan gambarnya.

---

## 16. Daftar istilah

Istilah yang dipakai di dokumen ini dan di dalam kode.

| Istilah | Arti |
|---|---|
| **Component (komponen)** | Fungsi JavaScript yang mengembalikan JSX. Balok penyusun React. Dinamai dengan `PascalCase`. |
| **JSX** | Sintaks mirip HTML di dalam JavaScript. `className` bukan `class`, `{}` untuk menyisipkan ekspresi. |
| **Props** | Masukan yang dikirim ke sebuah komponen, seperti atribut HTML: `<Marquee items={[...]} />`. |
| **State** | Data milik komponen yang bisa berubah. Mengubahnya me-render ulang komponen itu. Dibuat dengan `useState`. |
| **Hook** | Fungsi berawalan `use` yang menambahkan perilaku ke komponen. `useState`, `useEffect`, `useRef`, plus `useReveal` buatan kita. |
| **`useEffect`** | Menjalankan kode setelah render — memasang pendengar, memulai pewaktu. Nilai kembaliannya adalah fungsi pembersih yang berjalan saat komponen dilepas. |
| **`useRef`** | Kotak yang bisa diubah dan bertahan antar render tanpa memicu render. Dipakai untuk referensi DOM dan nilai yang dibaca di dalam loop animasi. |
| **`useMemo`** | Menghitung sebuah nilai sekali dan menyimpannya sampai dependensinya berubah. Dipakai untuk penyusunan adegan lorong. |
| **`useCallback`** | Seperti `useMemo` tetapi untuk fungsi: menjaga identitas fungsinya stabil antar render. |
| **Render** | React menjalankan fungsi komponen untuk menentukan bagaimana halaman seharusnya tampak. |
| **Mount / unmount** | Komponen ditambahkan ke, atau dihapus dari, halaman. Berpindah halaman meng-unmount sebuah halaman. |
| **Cleanup function (fungsi pembersih)** | Fungsi yang dikembalikan dari `useEffect`. Menghapus pendengar, membatalkan pewaktu, menghentikan loop animasi. Melewatkannya menyebabkan kebocoran memori. |
| **SPA** | Single-page application. Satu file HTML; JavaScript menukar kontennya saat kamu bernavigasi. |
| **Route (rute)** | Pemetaan URL ke komponen, dideklarasikan di `App.jsx`. |
| **`<Link>`** | Elemen navigasi internal React Router. Pakai ini, bukan `<a>`, untuk tautan di dalam situs. |
| **CSS custom property** | Variabel CSS: `--blue: #5570f1`, dipakai sebagai `var(--blue)`. Token desain kita. |
| **Design token** | Nilai desain bernama (warna, font, radius) yang didefinisikan sekali dan dipakai ulang di mana-mana. |
| **`clamp()`** | Fungsi CSS untuk ukuran cair: `clamp(min, ideal, maks)`. Menghilangkan kebutuhan media query untuk ukuran huruf. |
| **`IntersectionObserver`** | API browser yang melaporkan kapan sebuah elemen masuk ke layar. Menggerakkan `useReveal`. |
| **`requestAnimationFrame`** | API browser yang memanggil fungsimu sebelum penggambaran berikutnya, sekitar 60 kali per detik. Menggerakkan setiap animasi di sini. |
| **Canvas 2D** | API menggambar untuk elemen `<canvas>`. Dipakai untuk ketiga ilustrasi hero. |
| **`position: sticky`** | Penempatan CSS yang menyematkan elemen sementara induknya ter-scroll lewat. Menggerakkan hero beranda. |
| **`perspective` / `preserve-3d`** | Properti 3-D CSS yang membuat `translate3d` terbaca sebagai kedalaman nyata. Menggerakkan lorong kepemimpinan. |
| **Hot module replacement (HMR)** | Server pengembangan menukar kode yang berubah ke halaman yang sedang berjalan tanpa memuat ulang. |
| **Bundle (bundel)** | Satu file JavaScript (plus CSS) teroptimasi yang dihasilkan `npm run build`. |
| **Rewrite** | Aturan hosting yang menyajikan satu file untuk banyak URL. Milik kita mengirim setiap path ke `index.html`. |
| **`public/`** | Folder yang disalin apa adanya ke hasil build. Isinya disajikan dari akar situs. |
| **Akhiran alfa heks** | Dua digit heks tambahan di akhir sebuah warna untuk opasitas: `#5570f1` + `55` = 33% pekat. Dipakai di mana-mana untuk nuansa dan batas. |

---

## Catatan penutup untuk pengurus berikutnya

Beberapa hal yang perlu dikatakan terang-terangan.

**Mulai dari yang kecil.** Tambahkan sebuah acara. Ubah jumlah anggota. Ganti
sebuah foto. Ketiga tugas itu menyentuh lapisan data, proses build, dan deploy,
dan akan mengajarimu bentuk proyek ini lebih cepat daripada membaca dokumentasi
lagi.

**Lapisan data adalah sekutumu.** `src/config/signup.js`, `src/data/events.js`,
dan `src/data/projects.js` mencakup sebagian besar hal yang akan diminta orang
untuk kamu ubah. Kalau kamu menemukan dirimu mengedit sebuah komponen untuk
mengubah fakta tentang klub, tanyakan apakah fakta itu semestinya ada di lapisan
data.

**Jalankan `npm run build` sebelum kamu push** apa pun yang tidak sepele. Server
pengembangan itu pemaaf; proses build tidak, dan lebih baik menemukan kesalahan
secara lokal daripada di produksi.

**Jaga `PRODUCT.md` tetap jujur.** File itu merekam mengapa situs ini tampak
seperti sekarang. Kalau kamu mendesain ulang, perbaruilah supaya pengurus
*berikutnya* mewarisi alasan, bukan hanya CSS.

**Perbaiki duplikasinya ketika kamu punya waktu satu sore.** Bagian 15.1 sampai
15.3 itu kecil, mandiri, dan menghapus tiga kategori bug sekaligus. Siapa pun
yang mengerjakannya mempermudah hidup semua orang setelahnya.

**Tulislah segala hal.** Ketika kamu menemukan sesuatu yang mengejutkan,
tambahkan ke buku panduan ini. Dokumentasi yang tidak diperbarui menjadi
menyesatkan, dan dokumentasi yang menyesatkan lebih buruk daripada tidak ada.

Semoga sukses. Situsnya dalam kondisi cukup baik, ukurannya memang kecil, dan
semua di dalamnya bisa dibaca. Tidak ada sihir di sini.
