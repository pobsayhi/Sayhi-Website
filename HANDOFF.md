# HANDOFF.md — สถานะงานส่งมอบ Sayhi-web

> อัปเดตล่าสุด: 2026-11-26
> ผู้ส่งมอบทำงานบนเครื่องที่ **ไม่มี git และไม่ใช่ git repo** — ทุกอย่างในไฟล์นี้อ้างอิงจากโค้ดปัจจุบันใน repo ตรวจสอบด้วย `npm run build` (ผ่าน) และ `npm run lint` (ผ่าน, เหลือ warning เดิม) ล่าสุดวันที่ระบุด้านบน

---

## ✅ ส่วนที่เสร็จแล้ว (ตรวจจากโค้ดจริง)

### หน้า Contact (`/contact`) — สร้างใหม่ทั้งหมด
- Route ลงทะเบียนใน `src/App.jsx` แล้ว, เมนู Contact ใน Navbar หน้า Home เปลี่ยนจาก `<a href>` เป็น `<Link>` (SPA ไม่ reload)
- อ้างอิงดีไซน์ Figma frame `55:17` (file `IhgGmFiqipNxiJUQHo2qNn`) — **ตัดรูปภาพทั้งหมดออกตามข้อตกลง** เหลือ layout minimal เต็มจอ
- โครงสร้าง subcomponents ใน `src/pages/Contact/index.jsx`: `ContactHeader`, `EmailCard`, `SocialGrid`, `LocalTime`
- ข้อความโปรย "Have a project in mind?" + อนิเมชัน fade-up ไล่ stagger ตอนโหลดหน้า
- อีเมล `sayhimultimedia@gmail.com` เป็น `mailto:` + ปุ่ม COPY (กดแล้วเป็น "COPIED ✓" 2 วิ, มี fallback `execCommand`, เคลียร์ timer ตอน unmount)
- Social grid 4 คอลัมน์ (แท็บเล็ต 2 / มือถือ 1), hover ลูกศร ↗ + เส้นใต้เคลื่อนไหว
- นาฬิกาสด "BANGKOK, TH — HH:MM ICT" ผ่าน custom hook `src/pages/Contact/useLocalTime.js` (`Intl.DateTimeFormat` + `Asia/Bangkok`, clearInterval ตอน unmount)
- แถว footer ล่าง: © ปีปัจจุบัน + ปุ่ม BACK TO TOP (smooth scroll, เคารพ reduced-motion)
- หมายเหตุ: ไม่มี footer ใหญ่สีฟ้า (site-footer) บนหน้านี้ — ถอดออกเพื่อให้เป็น single full-height screen ตาม layout ที่เจ้าของโปรเจกต์ยืนยัน

### หน้า Home — แถว "OUR TEAM" อัปเกรดเป็น Marquee
- เดิม: กล่อง `wire-box` ว่าง 9 ใบ ลากเมาส์/ล้อเมาส์เลื่อนเอง (JS ใน useEffect ช่วงที่ 7)
- ใหม่: เลื่อนอัตโนมัติแบบ CSS marquee วนลูปไร้รอยต่อ (สำเนาแถว 2 ชุด + `translateX(-50%)`)
- การ์ดสมาชิก map จาก array `teamMembers` (11 คน, `{ id, nickname, name, role, image }`) ที่ต้นไฟล์ `src/pages/Home/index.jsx` + component `TeamCard`
- รูปอ้าง `public/team/*.JPG` ที่มีอยู่จริง 11 ไฟล์ — รูปหาย/โหลดพังมี placeholder ตัวอักษรย่อชื่อเล่น (`onError`)
- หยุดเมื่อ hover (CSS) / แตะค้าง (JS touchstart/touchend, มี cleanup), ความเร็วปรับที่ `--marquee-duration` ใน `home.css`, ปิดเมื่อ `prefers-reduced-motion`
- หัวข้อ "OUR TEAM" + ปุ่ม DISCOVER TEAM อยู่แถวบนสุดของ section (`.team-section-header`) แยกจากภาพที่เลื่อน — ไม่ทับรูปคน
- ปุ่ม DISCOVER TEAM เป็น `<Link to="/team">` (เดิมเป็น button กดแล้วไม่มีผล) + ลูกเล่น hover: เปลี่ยนเป็น gradient ฟ้า `--grad-btn` + ยกนิ้ว + เงา, มี `:focus-visible`

### ทั่วโปรเจกต์
- README.md และ CLAUDE.md อัปเดตใหม่ตามโครงสร้างปัจจุบัน
- `.gitignore` เพิ่ม `.env` / `.env.*` (เดิมมีแค่ node_modules, dist, *.local)

---

## ⏳ ส่วนที่ยังค้าง

1. **ลิงก์โซเชียลยังไม่ใช่ลิงก์จริง** — `SOCIAL_LINKS` ใน `src/pages/Contact/index.jsx`: LINKEDIN ชี้ `https://www.linkedin.com/` (หน้าแรก ไม่ใช่โปรไฟล์), FACEBOOK ชี้ `https://www.facebook.com/`, GITHUB ยังเป็น `"#"` ตามที่เจ้าของโปรเจกต์สั่งใช้ชั่วคราว
2. **Footer หน้า Home** มีลิงก์ TikTok/Facebook เป็น placeholder (`https://tiktok.com`, `https://facebook.com`) — Instagram เป็นลิงก์จริงแล้ว
3. ~~**Route `/work` ไม่มีอยู่จริง**~~ **ทำแล้ว (หลังวันที่ 2026-11-21)** — หน้า `/work`, `/work/detail/:id`, `/work/:category` มีจริงแล้วใน `src/pages/Work/` (ข้อมูล demo ที่ `workdata.js`)
4. **รูปใน `public/team/`** — มีไฟล์ 11 ไฟล์ครบตาม array แล้ว แต่**ยังไม่เคยตรวจด้วยตา**ว่าภาพที่แสดงถูกต้อง/คุณภาพโอเคทั้ง 11 ใบ (สมควรเปิด `npm run dev` ดูหน้า Home และ Team)
5. **Footer หน้า Team** อีเมลยังถูก mask เป็น `*********@*****.***` (`src/pages/Team/index.jsx` บริเวณ site-footer) — สมควรเปลี่ยนเป็นอีเมลจริงแบบหน้า Home (ไม่แน่ใจว่าตั้งใจซ่อนหรือลืมแก้ ควรถามเจ้าของโปรเจกต์)
6. **ไม่มี TODO/FIXME ค้างในโค้ด** — grep แล้วไม่เจอ marker ใดๆ ใน `src/`

---

## ⚠️ ปัญหาที่รู้อยู่แล้ว (Known Issues)

1. **Lint warning ค้าง 2 จุด** (ไม่ blocking, เป็นของเดิมก่อนมีการส่งมอบ): `react(set-state-in-effect)` ที่ `src/pages/Team/index.jsx:26` และอีกจุดที่ oxlint พิมพ์แค่ `index.jsx:27:7` โดยไม่ระบุ path เต็ม (น่าจะเป็น Home — ไม่แน่ใจ ควรตรวจสอบ)
2. **ระบบ dark mode สองแบบยังไม่ยุบรวมกัน** — Home/Contact ใช้ `documentElement[data-theme]`, Team ใช้ `body.dark-mode` + `team-dark-bg` (แบบเดิมของโปรเจกต์)
3. **Hamburger menu พื้นหลัง hardcode ขาว** `rgba(255,255,255,0.95)` ใน useEffect ของทุกหน้า — บน Dark Mode เมนูจะเป็นกล่องขาว (ของเดิม, ยังไม่แก้)
4. **ปุ่ม 🔍 Search ใน Navbar เป็นของประดับ** ยังไม่มีฟังก์ชัน (ทุกหน้า)
5. **ไฟล์แปลกระดับ root**: ~~`index.jsx` + `Team.css` เป็นสำเนาเก่า~~ **แก้แล้ว (2026-11-26)** — ลบทิ้งพร้อม stray `package-lock.json` ระดับ wrapper แล้ว, entry จริงคือ `src/main.jsx`
6. **เครื่องผู้ส่งมอบไม่มี git** — โปรเจกต์ยังไม่เคยเป็น git repo ดูหัวข้อ "เตรียม git" ด้านล่าง

---

## ประวัติการแก้ไข (Changelog)

> **แหล่งข้อมูล:** โปรเจกต์นี้ไม่มี git history รายการทั้งหมด**อนุมานจากโค้ดปัจจุบัน + บันทึกการทำงานใน session ของผู้ส่งมอบ** (เรียงจากเก่าไปใหม่ ทั้งหมดเกิดขึ้นวันที่ 2026-11-21) ทุกรายการมีหลักฐานในโค้ดรองรับ ไม่มีการเดา

### 1. สร้างหน้า Contact `/contact` (รอบแรก)
- **ทำอะไรไป:** สร้างหน้า Contact แบบ minimal full-height จาก Figma frame 55:17 — หัวข้อ "SAY HI INCORPORATED" gradient + เส้นคั่นสองข้าง, แถวติดต่อ (อีเมล mailto + COPY, LinkedIn, Facebook, Instagram), Navbar/ธีมชุดเดิมของเว็บ, ตัดรูปภาพจาก Figma ออกทั้งหมด, เชื่อม route + เปลี่ยน `<a href="/contact">` ใน Navbar หน้า Home เป็น `<Link>`
- **ไฟล์ที่เกี่ยวข้อง:** `src/pages/Contact/index.jsx` (สร้างใหม่), `src/pages/Contact/Contact.css` (สร้างใหม่), `src/App.jsx` (เพิ่ม route), `src/pages/Home/index.jsx` (Navbar)
- **เปลี่ยนจากเดิม:** ก่อนหน้าไม่มีหน้า Contact เลย
- **สถานะ:** เสร็จสมบูรณ์ (build ผ่าน — ยังไม่ได้ทดสอบ visual บน dev server)

### 2. ปรับปรุงหน้า Contact รอบสอง (layout A: minimal กลางจอ)
- **ทำอะไรไป:** แตกเป็น subcomponents (`ContactHeader`, `EmailCard`, `SocialGrid`, `LocalTime`), เพิ่ม tagline "Have a project in mind?" + fade-up stagger, social grid 4 คอลัมน์ (เพิ่ม GITHUB ลิงก์ `#` ชั่วคราว), custom hook `useLocalTime` นาฬิกากรุงเทพฯ ทุกวินาที, แถว footer © + BACK TO TOP, ลด padding บน, focus-visible ครบ, reduced-motion ครบ
- **ไฟล์ที่เกี่ยวข้อง:** `src/pages/Contact/index.jsx` (refactor), `src/pages/Contact/Contact.css` (refactor), `src/pages/Contact/useLocalTime.js` (สร้างใหม่)
- **เปลี่ยนจากเดิม:** ถอด footer ใหญ่สีฟ้า (site-footer) ออกจากหน้า Contact — หน้าเป็น single full-height screen; แถวโซเชียลแนวนอนเดิมกลายเป็น grid 4 ช่อง
- **สถานะ:** เสร็จสมบูรณ์ (build + lint ผ่าน)

### 3. แถว "OUR TEAM" หน้า Home → Marquee เลื่อนอัตโนมัติ
- **ทำอะไรไป:** เปลี่ยนจากกล่อง wire-box ว่าง 9 ใบ (ลากเมาส์/ล้อเมาส์เอง) เป็น marquee CSS เลื่อนอัตโนมัติวนลูปไร้รอยต่อ — การ์ดสมาชิก 11 คน map จาก array `teamMembers` + component `TeamCard` พร้อม placeholder เมื่อรูปหาย, หยุดเมื่อ hover/แตะค้าง, ความเร็ว `--marquee-duration`, reduced-motion, ปุ่ม DISCOVER TEAM แทรกในแถวเป็น `<Link to="/team">` (ชุดสำเนาที่ 2 ใช้ `<span>` กัน tab target ซ้ำ)
- **ไฟล์ที่เกี่ยวข้อง:** `src/pages/Home/index.jsx` (`teamMembers`, `TeamCard`, useEffect ช่วงที่ 7 เปลี่ยนจาก drag/wheel เป็น touch-pause, JSX section), `src/pages/Home/home.css` (block "Our Team Marquee")
- **เปลี่ยนจากเดิม:** JS drag-to-scroll + wheel ที่ useEffect ช่วงที่ 7 ถูกถอดออก (marquee เป็น transform ไม่ใช่ scrollable — ผู้ใช้เลื่อนเองไม่ได้ ซึ่งเป็นข้อจำกัดที่เจ้าของโปรเจกต์รับทราบแล้วเลือก); `.team-overlay` เดิมถูกแทนด้วยการ์ดในแถว (ก่อนถูกย้ายอีกทีในข้อ 4)
- **สถานะ:** เสร็จสมบูรณ์ (build + lint ผ่าน)

### 4. ย้ายหัวข้อ OUR TEAM ไปไว้บนสุด (feedback รอบแรก: overlay บัง)
- **ทำอะไรไป:** ย้ายหัวข้อ "OUR TEAM" + ปุ่ม DISCOVER TEAM ออกจากแถว marquee ขึ้นเป็นแถว header บนสุดของ section (`.team-section-header`) ให้ภาพเลื่อนเต็มพื้นที่ด้านล่างโดยไม่มีอะไรทับ
- **ไฟล์ที่เกี่ยวข้อง:** `src/pages/Home/index.jsx` (JSX section), `src/pages/Home/home.css` (`.our-team-section` flex แนวตั้ง, `.team-section-header`, การ์ด `height: 100%`, รูป crop ตัวเองเมื่อจอเตี้ย; ลบสไตล์ overlay ที่เพิ่มไปแล้ว)
- **เปลี่ยนจากเดิม:** ข้อ 3 วางหัวข้อเป็นการ์ดเลื่อนในแถว → รอบนี้ยึดติดบนสุดนิ่งๆ (กลายเป็นโครงใกล้เคียง overlay เดิมของโปรเจกต์ แต่ไม่ทับภาพ)
- **สถานะ:** เสร็จสมบูรณ์ (build + lint ผ่าน)

### 5. ลูกเล่น hover ปุ่ม DISCOVER TEAM
- **ทำอะไรไป:** ปุ่มชี้เมาส์แล้วเปลี่ยนเป็น gradient ฟ้า `--grad-btn` + ตัวอักษรขาว + ยกนิ้ว -2px + เงาฟ้านุ่ม, ตอนกดยุบลง (active), เพิ่ม `:focus-visible` และ reduced-motion ให้ปุ่ม
- **ไฟล์ที่เกี่ยวข้อง:** `src/pages/Home/home.css` (scope `.team-section-header .btn-gray` เท่านั้น)
- **เปลี่ยนจากเดิม:** ปุ่มเดิมไม่มี hover effect ใดๆ
- **สถานะ:** เสร็จสมบูรณ์ (build + lint ผ่าน)

### 6. เตรียมพร้อมส่งมอบ (งานเอกสาร)
- **ทำอะไรไป:** เขียน README.md ใหม่ (วิธีรัน/โครงสร้าง/dark mode), อัปเดต CLAUDE.md (กฎการเขียนโค้ด + gotchas ปัจจุบัน), สร้างไฟล์นี้, เพิ่ม `.env*` ใน `.gitignore`, ตรวจ security + build + lint
- **ไฟล์ที่เกี่ยวข้อง:** `README.md`, `CLAUDE.md`, `HANDOFF.md`, `.gitignore`
- **สถานะ:** เสร็จสมบูรณ์

### 7. หน้าสมาชิก `/team/:id` + hover preview + โครงข้อมูลผลงาน (2026-11-26)
- **ทำอะไรไป:**
  - รีไรต์หน้า `/team/:id` (`TeamMemberDetail.jsx`) ตาม Figma frame "only one member" (node 104:813): breadcrumb ไอคอน (home > layers > folder > folder-plus) → รูปสมาชิกซ้าย + กล่องคำพูด (ชื่อเล่น + ตำแหน่ง) → **กรอบกริดผลงาน 4x3 = 12 ช่อง** ช่องว่างเป็นกากบาท wireframe, ช่องที่มี `thumbnail` แสดงรูป (`object-fit: cover`), ช่องที่มี `link` คลิกเปิดแท็บใหม่, เกิน 12 ชิ้น scroll ในกรอบได้, scrollbar สไตล์ Figma + ชั้นไม้ใต้กรอบ → เส้นคั่น → "Other member" carousel (ตัดคนปัจจุบัน, ลูกศรเลื่อนซ้าย-ขวา, คลิกไป `/team/:id`) → footer เดิมของเว็บ — **ไม่มีโฟลเดอร์หมวดบนกริดแล้ว** (field `category` ยังเก็บในข้อมูลไว้ใช้ภายหลัง, UI ยังไม่ใช้)
  - hover preview บนการ์ดหน้า Team (`Team/index.jsx` + `Team.css`): เปลี่ยนจาก overlay role/skill เป็นรูปสมาชิก + กริดผลงานย่อ 3x2 + ชื่อเล่น + "VIEW PROFILE →" — เก็บ gradient ฟ้า/transition/`:focus-visible`/`@media (hover: none)` เดิม
  - โครงข้อมูล: `works[]` ใน `src/data/teamMembers.js` เป็น object `{ id, title, category, thumbnail, link? }` — **หมวดมี 5 หมวด**: `3D`, `GRAPHIC`, `MOTION`, `PHOTO`, `PRODUCTION` (slug: `3d`, `graphic`, `motion`, `photo`, `production`) ตัด LOGO/PDF ออกแล้ว (ชิ้นตัวอย่างเดิมย้ายเป็น LOGO→GRAPHIC, PDF→PRODUCTION หมด) — ตอนนี้ `thumbnail` ทุกชิ้นยังว่าง `''` เป็น**ข้อมูลตัวอย่างทั้งหมด**
  - วิธีเพิ่มผลงาน: วางรูปที่ `public/work/<slug>/` แล้วใส่ `thumbnail: '/work/<slug>/ชื่อไฟล์'` — ชิ้นที่ไม่มี thumbnail จะไม่ถูกนับเป็นช่อง, หน้าเว็บเติมกากบาทจนครบ 12 เอง
- **ไฟล์ที่เกี่ยวข้อง:** `src/pages/Team/TeamMemberDetail.jsx`, `src/pages/Team/TeamMemberDetail.css`, `src/pages/Team/index.jsx`, `src/pages/Team/Team.css`, `src/data/teamMembers.js`, `README.md`, `HANDOFF.md`
- **สถานะ:** เสร็จสมบูรณ์ (build + lint ผ่าน, ทดสอบ visual บน dev server desktop/mobile แล้ว)

---

## เตรียม git (ยังไม่ได้รัน — เจ้าของโปรเจกต์รันเอง)

โปรเจกต์ยังไม่ใช่ git repo และเครื่องนี้ไม่มี git ติดตั้ง คำสั่งทั้งหมดนี้**ยังไม่ถูกรันโดยผู้ส่งมอบ**:

```bash
# 1) ติดตั้ง git (ถ้าเครื่องยังไม่มี): https://git-scm.com/downloads

# 2) สร้าง repo ในโฟลเดอร์โปรเจกต์ + commit แรก
git init
git add .
git commit -m "Initial commit: Home/Team/Contact pages, OUR TEAM marquee, project handoff docs"

# 3) สร้าง repo ใหม่บน GitHub (ผ่านเว็บ github.com/New หรือ GitHub CLI: gh repo create sayhi-web --private)
#    แล้วเชื่อม + push:
git branch -M main
git remote add origin https://github.com/<username>/sayhi-web.git
git push -u origin main
```

ข้อความ commit ที่เสนอ (เลือกใช้ได้ตามชอบ):

```
Initial commit: SAY HI web — Home, Team, Contact pages

- Home: hero, selected works, FAQ, OUR TEAM auto-scroll marquee
- Team: member grid with public/team photos
- Contact: minimal full-height page (copy email, social grid, live Bangkok time)
- Docs: README, CLAUDE.md, HANDOFF.md
```

> หมายเหตุ: `node_modules/`, `dist/`, `.env*` ถูก exclude โดย `.gitignore` แล้ว — ตรวจอีกครั้งด้วย `git status` ก่อน commit ว่าไม่มีไฟล์แปลกเข้ามา
