# U-TECH Website — Documentation / Dokumentasi

Maintainer documentation for the URSU Technology (U-TECH) website.
Dokumentasi pengurus untuk website URSU Technology (U-TECH).

---

## 🇬🇧 English

**→ [HANDBOOK.en.md](HANDBOOK.en.md)** — the complete maintainer handbook.

Covers what the site is, how to run it locally, why each technology was chosen,
a file-by-file map, how routing and the data layer work, every component and
page explained in depth, a cookbook of common maintenance tasks, deployment, an
honest list of known issues, and ideas for improvement.

**Start here if you are new:** sections 1 and 2, then section 11 (Cookbook).

---

## 🇮🇩 Bahasa Indonesia

**→ [HANDBOOK.id.md](HANDBOOK.id.md)** — buku panduan pengurus yang lengkap.

Mencakup apa itu situs ini, cara menjalankannya secara lokal, alasan pemilihan
setiap teknologi, peta file per file, cara kerja routing dan lapisan data, setiap
komponen dan halaman dijelaskan mendalam, buku resep tugas perawatan umum,
deployment, daftar jujur masalah yang diketahui, dan ide pengembangan.

**Mulai dari sini kalau kamu baru:** bagian 1 dan 2, lalu bagian 11 (Buku Resep).

---

## PDF versions / Versi PDF

Print-ready A4 copies live in [`pdf/`](pdf/), for reading offline or handing over
on paper. Salinan A4 siap cetak ada di [`pdf/`](pdf/).

**One file with everything:** `U-TECH-Documentation-Complete.pdf` (205 pages)
collects all four documents into a single volume with a master contents page.
This is the one to hand over. / **Satu berkas berisi semuanya:** itulah yang
sebaiknya diserahkan.

The same material is also split into separate PDFs. / Materi yang sama juga
tersedia terpisah.

| PDF | Pages | Contents |
|---|---|---|
| `U-TECH-Documentation-Complete.pdf` | 205 | Everything below, in one volume |
| `U-TECH-Handbook-EN.pdf` | 52 | Maintainer handbook, English |
| `U-TECH-Handbook-ID.pdf` | 54 | Buku panduan pengurus, Bahasa Indonesia |
| `U-TECH-Functions-EN.pdf` | 46 | Function & component reference, English |
| `U-TECH-Functions-ID.pdf` | 48 | Rujukan fungsi & komponen, Bahasa Indonesia |
| `U-TECH-Docs-Index.pdf` | 3 | This index |

The Markdown files are the source of truth. Regenerate the PDFs after editing
them. / File Markdown adalah sumber kebenarannya. Buat ulang PDF-nya setelah
mengedit.

---

## Quick reference / Rujukan cepat

The three files that hold editable content.
Tiga file yang memuat konten yang bisa diedit.

| File | What it controls / Apa yang diatur |
|---|---|
| [`src/config/signup.js`](../src/config/signup.js) | Sign-up open/closed, Google Form URL, next intake date, footer contact link. / Buka-tutup pendaftaran, URL Google Form, tanggal angkatan berikutnya, tautan kontak footer. |
| [`src/data/events.js`](../src/data/events.js) | Every event, and the event-type colour maps. Past events drop off automatically. / Setiap acara, dan peta warna jenis acara. Acara lampau hilang otomatis. |
| [`src/data/projects.js`](../src/data/projects.js) | Every division project, and the status colour map. / Setiap proyek divisi, dan peta warna status. |

Commands / Perintah:

```bash
npm install      # first time only / hanya pertama kali
npm run dev      # development server / server pengembangan
npm run build    # production build / build produksi
npm run preview  # preview the build / pratinjau hasil build
```

Other documents in the repository root / Dokumen lain di root repositori:

- [`README.md`](../README.md) — public description of the community. / Deskripsi komunitas untuk publik.
- [`PRODUCT.md`](../PRODUCT.md) — the original design brief. Read before any redesign. / Brief desain asli. Baca sebelum mendesain ulang.
