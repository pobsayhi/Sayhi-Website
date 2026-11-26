# SAY HI web

เว็บไซต์แนะนำ/พอร์ตโฟลิโอของ **SAY HI INCORPORATED** — plain JavaScript React 19 + Vite (ไม่ใช้ TypeScript, ไม่ใช้ Tailwind) ใช้ react-router-dom v7 และ deploy บน Vercel

## เริ่มต้นใช้งาน

```bash
npm install    # ติดตั้ง dependencies (ครั้งแรก)
npm run dev    # รัน dev server + HMR
```

- เปิดเว็บที่ **http://localhost:5173** (พอร์ต default ของ Vite — ถ้าพอร์ตถูกใช้ Vite จะสลับไป 5174 อัตโนมัติ)
- `npm run build` — build สำหรับ production (ผลลัพธ์อยู่ใน `dist/`)
- `npm run preview` — รัน build ล่าสุดให้ดูในเครื่อง
- `npm run lint` — ตรวจโค้ดด้วย oxlint (config ที่ `.oxlintrc.json`)

## โครงสร้างโปรเจกต์

```
src/
├── main.jsx              # entry point (index.html ชี้มาที่นี่)
├── App.jsx               # BrowserRouter + ลงทะเบียน route ทั้งหมด (แบบ flat list)
├── index.css             # global styles
├── data/
│   └── teamMembers.js    # ข้อมูลสมาชิกทั้งหมด + WORK_CATEGORIES (หน้า Team / /team/:id ใช้แหล่งเดียวกัน)
└── pages/
    ├── Home/
    │   ├── index.jsx     # หน้าแรก (hero, works, FAQ, OUR TEAM marquee, footer)
    │   └── home.css      # CSS ของหน้า + design tokens (:root + [data-theme="dark"])
    ├── Team/
    │   ├── index.jsx            # หน้ารวมทีม (การ์ด + hover preview ภาพย่อ)
    │   ├── Team.css
    │   ├── TeamMemberDetail.jsx # หน้า /team/:id — breadcrumb + กริดผลงาน 4x3 + Other member carousel + footer
    │   └── TeamMemberDetail.css
    ├── Work/                    # หน้า /work + /work/detail/:id (ข้อมูลใน workdata.js)
    └── Contact/
        ├── index.jsx     # ประกอบจาก subcomponents (ContactHeader, EmailCard, SocialGrid, LocalTime)
        ├── Contact.css
        └── useLocalTime.js  # custom hook นาฬิกาเวลากรุงเทพฯ
public/
├── team/                 # รูปสมาชิกทีม (อ้างในโค้ดเป็น "/team/<ชื่อไฟล์>")
└── work/<slug>/          # รูปผลงาน — สร้างโฟลเดอร์เองตาม slug หมวด (ดูหัวข้อถัดไป)
```

**กติกาโครงสร้าง:** 1 หน้า = 1 โฟลเดอร์ใน `src/pages/<Page>/` มี `index.jsx` คู่กับไฟล์ CSS ชื่อเดียวกับหน้า — การเพิ่มหน้าใหม่คือสร้างโฟลเดอร์แล้วเพิ่ม `<Route>` ใน `App.jsx` หนึ่งบรรทัด

## ข้อมูลผลงานสมาชิก (works[])

ใน `src/data/teamMembers.js` แต่ละคนมี `works` เป็น array ของ object:

```js
{ id: 'pob-01', title: '...', category: 'GRAPHIC', thumbnail: '', link: '' }
```

- **หมวดมี 5 หมวด** (`WORK_CATEGORIES`): `3D`, `GRAPHIC`, `MOTION`, `PHOTO`, `PRODUCTION` — slug ตาม `CATEGORY_SLUGS`: `3d`, `graphic`, `motion`, `photo`, `production`
- หน้า `/team/:id` แสดงกริดผลงาน **4 คอลัมน์ × 3 แถว = 12 ช่อง** ช่องเปล่าเป็นกากบาท wireframe — ไม่มีโฟลเดอร์หมวดแล้ว (field `category` ยังเก็บไว้ใช้ภายหลัง หน้า UI ยังไม่ใช้) ช่องที่มี `link` คลิกเปิดแท็บใหม่ได้
- **วิธีเพิ่มผลงาน:** วางรูปที่ `public/work/<slug>/` เช่น `public/work/graphic/pumpui-poster-01.jpg` แล้วใส่ `thumbnail: '/work/graphic/pumpui-poster-01.jpg'` (ตรงตัวพิมพ์และนามสกุล) — ชิ้นที่ยังเว้น `thumbnail: ''` จะไม่ถูกนับเป็นช่อง หน้าเว็บเติมกากบาทให้ครบ 12 เอง
- ตอนนี้ `works[]` ทุกตัวยังเป็น**ข้อมูลตัวอย่าง** (`thumbnail: ''` ทั้งหมด) — ต้องแทนด้วยของจริง

## ระบบ Dark Mode

ธีมสลับด้วย attribute `data-theme` บน `<html>` (`"light"` / `"dark"`) สีทั้งเว็บอ่านค่าจาก CSS variables ที่ `home.css` กำหนดไว้ (`--bg-primary`, `--ink`, `--gray-text`, `--blue-nav` ฯลฯ) โดย `[data-theme="dark"]` จะ override ค่าใน `:root` ทั้งหมด

- สถานะธีมเก็บใน `localStorage` key `"theme"` — เปิดครั้งแรกจะดูจาก `prefers-color-scheme` ของเครื่องก่อน
- ทุกหน้าที่มี navbar จะ init ธีมใน `useEffect` ตัวแรกของหน้า (ระบบเดียวกันทั้ง Home, Team, Contact)

## หมายเหตุ

- ไฟล์แปลกระดับ root (`index.jsx`, `Team.css`, wrapper `package-lock.json`) ถูกลบไปแล้ว (2026-11-26) — entry point จริงคือ `src/main.jsx`
- รายละเอียดสถานะงานและสิ่งที่ยังค้าง ดูที่ [HANDOFF.md](./HANDOFF.md)
- แนวทางทำงานกับ Claude Code ดูที่ [CLAUDE.md](./CLAUDE.md)
