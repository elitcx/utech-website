# 🤖 Ursuline Technology (U-Tech)

> A student-driven technology community at SMA-SMP Regina Pacis

---

## 📖 About Us

**Ursuline Technology**, abbreviated as **U-Tech**, is a community that grew and developed following the **Integrated Learning 1 (IL 1)** exhibition held on **October 14, 2023**.

This community was established as a space for students of SMA-SMP Regina Pacis to explore and develop their potential in modern technology. U-Tech is divided into **three divisions**, each focusing on a different aspect of technology. Each division is designed to provide its members with in-depth experience and knowledge, enabling them to grow in the field of technology they choose.

---

## 🏛️ Divisions

### 🦾 Robotics Division
This division focuses on the **development and creation of robots**. Members learn about:
- Programming
- Mechanical design
- Automation technology development

Members have the opportunity to participate in **robotics competitions** and apply their knowledge in innovative projects.

---

### 🖨️ 3D Print Division
This division is a home for members interested in the **world of 3D printing**. Members learn about:
- 3D design
- Use of 3D printers
- Applications of 3D printing technology in everyday life

Projects may involve creating **prototypes, models, or other innovative items** using 3D printing technology.

---

### 🌐 Metaverse Division
This division encompasses the **development and exploration of the digital world**. Members learn about:
- Augmented Reality (AR)
- Virtual Reality (VR)
- Other metaverse elements

Members can be involved in developing **metaverse applications, virtual experiences**, or creative projects that blend the real and digital worlds.

---

## 🎯 Our Mission

U-Tech reflects a commitment to **integrating technology into education** and the development of its members. Through U-Tech, Regina Pacis students can:

- 🔍 Explore the world of technology
- 🛠️ Sharpen their skills
- 🤝 Collaborate on innovative projects
- 🌍 Make a positive impact on the development of technology in society

---

## 🛠️ For Maintainers / Untuk Pengurus

Full technical documentation lives in [`docs/`](docs/):

- **English** — [docs/HANDBOOK.en.md](docs/HANDBOOK.en.md)
- **Bahasa Indonesia** — [docs/HANDBOOK.id.md](docs/HANDBOOK.id.md)

It covers the project structure, how every component works, a cookbook of common
maintenance tasks (adding events, opening sign-ups, updating the team), and
deployment.

Dokumentasi teknis lengkap ada di [`docs/`](docs/), dalam bahasa Inggris dan
Indonesia. Mencakup struktur proyek, cara kerja setiap komponen, buku resep tugas
perawatan umum, dan deployment.

```bash
npm install && npm run dev
```

---

*© Ursuline Technology (U-Tech) — SMA-SMP Regina Pacis*

## Admin dashboard

Type `admin` in the home-page terminal and enter the manager password. The dashboard edits
`src/data/site.json` (sign-ups, numbers, projects, events, team, timeline, gallery) and commits it to
GitHub; Vercel then redeploys. Every page reads from that one file, so a change shows up everywhere.

Set these in Vercel → Settings → Environment Variables (see `.env.example`). Never commit real values:

- `ADMIN_PASSWORD` – the manager password
- `GITHUB_TOKEN` – fine-grained token for this repo only, *Contents: Read and write*

For local dev, `.env` (git-ignored) with `ADMIN_LOCAL_FS=1` makes the dashboard edit the local files instead.
