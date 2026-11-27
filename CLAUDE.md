# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SAY HI web — a marketing/portfolio site for "SAY HI INCORPORATED". Plain JavaScript React 19 + Vite app (no TypeScript) with react-router-dom v7, deployed on Vercel.

## Repository layout

The actual project root is `sayhi-web-main/`. When the working directory is the outer download folder, the path is nested two levels deep (`sayhi-web-main-NewNew-main/sayhi-web-main/`) — run all npm commands from inside `sayhi-web-main/` (where `package.json` lives), not from either outer folder. `node_modules/` is not committed; run `npm install` first.

## Commands

- `npm install` — install dependencies (no `node_modules` committed)
- `npm run dev` — start dev server with HMR (default http://localhost:5173)
- `npm run build` — production build
- `npm run preview` — serve the production build locally
- `npm run lint` — lint with oxlint (config in `.oxlintrc.json`; plugins: react, oxc)

There are no tests and no test runner.

## Architecture

Routing lives entirely in `src/App.jsx`: `BrowserRouter` with a flat `<Routes>` list. Current routes: `/` (Home), `/work` (Work), `/work/detail/:id` (WorkDetail), `/work/:category` (Work, pre-filtered), `/team` (Team), `/team/:id` (TeamMemberDetail), `/contact` (Contact). To add a page, create the folder, then register the route in `App.jsx`. Navigation must use `Link` from react-router-dom for internal routes (not `<a href>`).

Each page is a self-contained folder in `src/pages/<Page>/` pairing `index.jsx` with a page-level CSS file (`src/pages/Home/home.css`, `src/pages/Team/Team.css`, `src/pages/Contact/Contact.css`). Two pages hold a second detail component: `src/pages/Work/` has `index.jsx` → Work and `WorkDetail.jsx` → WorkDetail (each with its own CSS), plus `workdata.js` (the `DEMO_WORKS` array — the single source for work/portfolio items, including the demo data that powers the detail pages). `src/pages/Team/` likewise has `index.jsx` → Team and `TeamMemberDetail.jsx` → TeamMemberDetail (with `TeamMemberDetail.css`). Shared cross-page data lives in `src/data/`: `teamMembers.js` (imported by both Team components; also exports `WORK_CATEGORIES` and `CATEGORY_SLUGS` — the 5 canonical work categories, which map 1:1 to `public/work/<slug>/` folders) and `faq.js` (FAQ data, imported only by Contact — Home's FAQ section is a separate hardcoded section, do not unify them unassigned). `src/index.css` holds global styles.

## Coding rules (ที่โปรเจกต์นี้ใช้จริง)

- **Plain CSS แยกต่อหน้า — ไม่ใช้ Tailwind, ไม่เพิ่ม dependency ใหม่** ถ้าต้องแชร์สี/ฟอนต์ ให้อ่านจาก CSS variables ที่ `home.css` (`:root` + `[data-theme="dark"]`): `--bg-primary`, `--bg-secondary`, `--ink`, `--gray-text`, `--blue-nav`, `--grad-text`, `--grad-btn`, `--radius-pill` ฯลฯ
- **Dark mode** = attribute `data-theme` บน `<html>` + `localStorage` key `"theme"` — ทุกหน้า init ธีมใน `useEffect` ตัวแรก (โครง `initTheme`/`applyTheme`/`switchTheme` ต้องเหมือนกันทุกหน้า) ข้อยกเว้น: หน้า Team ใช้ `body.dark-mode` แบบเก่าคู่ขนานอยู่ด้วย (แต่อ่าน `localStorage["theme"]` เหมือนกัน) — อย่ายุบรวมเองหากไม่ได้รับมอบหมาย หน้า Work/WorkDetail ใช้ `data-theme` แบบเดียวกับ Home/Contact
- **Design tokens:** `:root` + `[data-theme="dark"]` variables อยู่ที่ `src/pages/Home/home.css` ไฟล์เดียว — หน้าอื่นที่ต้องใช้สี/ฟอนต์ import เข้ามา เช่น Work ทำ `import '../Home/home.css'` ก่อน CSS ของตัวเอง
- **ข้อมูลแบบ array เดียว:** ข้อมูลที่ทำซ้ำ (สมาชิกทีม, ลิงก์โซเชียล) ให้เก็บเป็น array ที่ตำแหน่งเดียวแล้ว `.map()` แสดง — เช่น `teamMembers` ใน `src/data/teamMembers.js` (ใช้ร่วมทั้งหน้า Team และ TeamMemberDetail, `id` เป็น slug ของ URL `/team/:id`), `SOCIAL_LINKS` ใน `src/pages/Contact/index.jsx`, `faqs` ใน `src/data/faq.js` (FAQ หน้า Contact — ห้าม hardcode คำถาม/คำตอบใน JSX) แก้ข้อมูลที่ array จุดเดียวจบ (ข้อยกเว้น: `teamMembers` ใน `src/pages/Home/index.jsx` ยังเป็นสำเนา local แยกของหน้า Home — ยังไม่ยุบรวมกับ `src/data/teamMembers.js`)
- **รูปภาพ:** ใช้ `<img>` พร้อม `alt`, `loading="lazy"`, `object-fit: cover` และต้องมี fallback placeholder ทุกกรณีที่รูปหาย (`onError` สลับ state เป็น placeholder ไม่ให้การ์ดโล่ง) — ไฟล์รูปวางใน `public/` แล้วอ้างเป็น absolute path เช่น `"/team/team-pob.JPG"` (ตรงกับชื่อไฟล์จริงทั้งตัวพิมพ์และนามสกุล)
- **`useEffect` แบบ imperative DOM:** หน้าต่างๆ ใช้ `useEffect` array ว่างผูก DOM ตรงๆ ผ่าน `document.querySelector` (hamburger menu, IntersectionObserver, marquee touch-pause ฯลฯ) — ทุก listener ที่เพิ่มต้องมี cleanup ใน return ของ effect เสมอ, `setInterval`/`setTimeout` ต้อง clear ตอน unmount (ดูตัวอย่าง `src/pages/Contact/useLocalTime.js`)
- **Accessibility:** อนิเมชัน/transition ต้องถูกปิดเมื่อ `prefers-reduced-motion: reduce`, ลิงก์ครบ `aria-label` ตามสมควร, ปุ่ม/ลิงก์ต้องมี `:focus-visible` ที่มองเห็นชัด, ลิงก์ภายนอกใช้ `target="_blank" rel="noopener noreferrer"`
- **ขอบเขตการแก้:** แก้เฉพาะไฟล์/หน้าที่ได้รับมอบหมาย — ห้ามแก้หน้าอื่น หรือ CSS ส่วนกลางของหน้าอื่นโดยไม่ได้ขออนุญาต (หากต้องเพิ่ม class ใหม่ ให้เพิ่ม block ท้ายไฟล์ของ section ตัวเอง ไม่แก้กฎเดิม)

## Gotchas

- Pages use a single `useEffect` with an empty dependency array that wires up imperative DOM behavior — keep listener cleanup in the effect's return function consistent. Team's dark mode toggles `body.dark-mode` while Home/Contact/Work toggle `documentElement[data-theme]` — the two implementations are not currently unified (both read the same `localStorage["theme"]` key).
- Home's "OUR TEAM" section is a CSS-marquee (`--marquee-duration` controls speed): two duplicated `team-track-group`s + `translateX(-50%)` keyframes for a seamless loop; the second copy is `aria-hidden` and must not contain focusable elements.
- Route order matters in `App.jsx`: `/work/detail/:id` is registered before `/work/:category` so detail URLs aren't swallowed by the category catch-all — keep that order when adding work routes.
- The Work page's filter/search/grid is driven by `DEMO_WORKS` in `src/pages/Work/workdata.js` (demo data, not a backend); WorkDetail derives everything from the `:id` param against that array.
- `vercel.json` rewrites all paths to `/index.html` for SPA client-side routing. `src/main.jsx` (referenced by `index.html`) is the real entry point. (Former stray root-level copies `index.jsx`/`Team.css` and a stray wrapper `package-lock.json` were deleted on 2026-11-26; they no longer exist — README's warning about them is outdated.)

สถานะงานล่าสุดและสิ่งที่ยังค้าง: ดูที่ `HANDOFF.md` (updated 2026-11-26 — covers the Contact page and the Home team marquee). It is written from code inspection on a machine without git, so still verify its claims against the code (e.g. with `npm run build` / `npm run lint`) before acting on them.
