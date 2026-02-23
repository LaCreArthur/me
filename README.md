<div align="center">

# Arthur Scheidel — Personal Portfolio

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LaCreArthur/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arthur-scheidel/)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/LaCreArthur)
[![itch.io](https://img.shields.io/badge/itch.io-FA5C5C?style=for-the-badge&logo=itch.io&logoColor=white)](https://lacrearthur.itch.io/)

**🌐 Live Site:** [lacrearthur.github.io](https://lacrearthur.github.io/)  
**👨‍💻 Developer:** Arthur Scheidel (LaCreArthur) — Founder at Sorolla

</div>

## 📋 Overview

Personal portfolio showcasing Arthur's work as a game developer and founder. Brutalist design, terminal aesthetic, fully static — no build step required.

## 🛠️ Tech Stack

- **HTML5 / CSS3 / JavaScript** — Static site, no framework
- **Tailwind CSS** (CDN) — Utility styling
- **JetBrains Mono** — Typography
- **Formspree** — Contact form
- **GitHub Pages** — Hosting

## 📁 Structure

```
index.html          — Shell + meta tags + schema.org
js/
  data.js           — All content (edit this to update the site)
  components.js     — Render functions (HTML generators)
css/
  style.css         — Custom styles (brutalist/terminal theme)
data/
  projects.json     — Project data (reference, not loaded at runtime)
img/                — Static images
llms.txt            — AI-readable site summary
resume.pdf          — Downloadable resume
```

## ✏️ Editing Content

All content lives in `js/data.js`. Edit that file to update:
- Hero headline, subhead, metrics
- Projects (featured work, archive, tools)
- About section and timeline
- Contact info

No build step needed — push to `master` and GitHub Pages serves it.

## 🚀 Local Preview

```bash
# Any static server works
npx serve .
# or
python -m http.server 8080
```

---

**Note:** `data/projects.json` is a content reference file. The actual runtime data is in `js/data.js`.
