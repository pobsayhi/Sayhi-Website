// ข้อมูลสมาชิกทีม SAY HI INCORPORATED — แหล่งเดียวที่หน้า Team และหน้า TeamMemberDetail ใช้ร่วมกัน
// id ใช้เป็น slug ใน URL: /team/:id (เช่น /team/pob)
//
// ── หมวดผลงาน ─────────────────────────────────────────────
// 5 หมวดตรงกับโฟลเดอร์บน Google Drive — ห้ามเพิ่ม/ตั้งชื่อนอกชุดนี้
export const WORK_CATEGORIES = [
  '3D',
  'GRAPHIC',
  'MOTION',
  'PHOTO',
  'PRODUCTION',
];

// slug ของแต่ละหมวด ใช้เป็นชื่อโฟลเดอร์รูปใน public/work/<slug>/
export const CATEGORY_SLUGS = {
  '3D': '3d',
  GRAPHIC: 'graphic',
  MOTION: 'motion',
  PHOTO: 'photo',
  PRODUCTION: 'production',
};

// ── รูปผลงานจริง (ต้องทำเอง) ───────────────────────────────
// 1) วางไฟล์รูปที่  public/work/<slug>/<ชื่อไฟล์>.jpg — slug มี 5 ตัว: 3d | graphic | motion | photo | production
//    เช่น  public/work/graphic/pob-poster-01.jpg
// 2) ใส่ thumbnail เป็น absolute path เดียวกับชื่อไฟล์จริง  เช่น  thumbnail: '/work/graphic/pob-poster-01.jpg'
//    (ตรงตัวพิมพ์เล็ก-ใหญ่และนามสกุลไฟล์)
// 3) ถ้า thumbnail เว้นว่าง ('') หน้าเว็บจะแสดงกล่อง placeholder ไว้แทน — ข้อมูลด้านล่างทั้งหมดเป็น "ข้อมูลตัวอย่าง"
//    ให้แทน title/thumbnail/link ด้วยของจริงทีละชิ้น และลบชิ้นที่ไม่มีจริงออกได้เลย
//
// works[] เป็น object: { id, title, category, thumbnail, link? }
//   - category ต้องเป็นหนึ่งใน WORK_CATEGORIES เท่านั้น
//   - link (optional) = URL ภายนอก เช่น Google Drive / Behance ของชิ้นงานนั้น

const teamMembers = [
  {
    id: 'pob',
    nickname: 'POB',
    fullName: 'KORPAPOP KUMWAN',
    role: 'CEO / DEVELOPER',
    image: '/team/pob.JPG',
    bio: 'Leads SAY HI INCORPORATED with a developer-first mindset — turning ideas into products, keeping the team shipping, and writing code whenever the meetings allow it.',
    skills: ['Leadership', 'React', 'Node.js', 'Product Strategy'],
    works: [
      { id: 'pob-01', title: 'Company introduction deck', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'pob-02', title: 'Behind the scenes 2026', category: 'PHOTO', thumbnail: '', link: '' },
      { id: 'pob-03', title: 'Studio showreel cut', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'pob-04', title: 'Team workflow motion explainer', category: 'MOTION', thumbnail: '', link: '' },
    ],
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
    },
  },
  {
    id: 'pumpui',
    nickname: 'PUMPUI',
    fullName: 'KANYAPAT THONGRANG',
    role: 'GRAPHIC DESIGN',
    image: '/team/pumpui.jpg',
    bio: 'Graphic designer who loves bold colors and clean layouts. Handles posters, brand materials and social media visuals for the studio.',
    skills: ['Poster Design', 'Brand Identity', 'Figma'],
    works: [
      { id: 'pumpui-01', title: 'Social media campaign visuals', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'pumpui-02', title: 'Event poster series 2026', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'pumpui-03', title: 'Say Hi sticker pack', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'pumpui-04', title: 'Mascot exploration', category: '3D', thumbnail: '', link: '' },
    ],
    socials: {
      instagram: 'https://www.instagram.com/sayh.i2026/',
    },
  },
  {
    id: 'im',
    nickname: 'IM',
    fullName: 'CHAIANAN TURAPONG',
    role: 'PROGRAMMER',
    image: '/team/im.jpg',
    bio: 'Programmer who enjoys solving tricky logic problems and keeping every build green. Works across frontend and backend tasks.',
    skills: ['JavaScript', 'APIs', 'Problem Solving'],
    works: [
      { id: 'im-01', title: 'Internal automation scripts', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'im-02', title: 'API documentation pack', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'im-03', title: 'Build pipeline demo clip', category: 'MOTION', thumbnail: '', link: '' },
    ],
    socials: {
      github: 'https://github.com/',
    },
  },
  {
    id: 'luktan',
    nickname: 'LUKTAN',
    fullName: 'NAMPHET AIAMONG',
    role: 'GRAPHIC DESIGN',
    image: '/team/luktan.jpg',
    bio: 'Designer with an eye for illustration and typography. Turns rough sketches into polished visuals for client work.',
    skills: ['Illustration', 'Typography', 'Adobe Suite'],
    works: [
      { id: 'luktan-01', title: 'Character illustration set', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'luktan-02', title: 'Client branding refresh', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'luktan-03', title: 'Low-poly room mockup', category: '3D', thumbnail: '', link: '' },
      { id: 'luktan-04', title: 'Sketch to screen process', category: 'MOTION', thumbnail: '', link: '' },
    ],
    socials: {
      instagram: 'https://www.instagram.com/sayh.i2026/',
    },
  },
  {
    id: 'kan-hi-end',
    nickname: 'KAN HI-END',
    fullName: 'SAKKAN MEEJAN',
    role: 'FRONT END DEVELOPER',
    image: '/team/kan.jpg',
    bio: 'Front end developer obsessed with pixel-perfect UI and smooth interactions. Built most of the SAY HI web experience you are browsing right now.',
    skills: ['React', 'CSS Animation', 'Responsive UI'],
    works: [
      { id: 'kan-01', title: 'SAY HI website front end', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'kan-02', title: 'Interactive landing pages', category: 'MOTION', thumbnail: '', link: '' },
      { id: 'kan-03', title: 'Component spec sheet', category: 'PRODUCTION', thumbnail: '', link: '' },
    ],
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
    },
  },
  {
    id: 'sos',
    nickname: 'SOS',
    fullName: 'SORRAWIT KULSAROJ',
    role: 'DEVELOPER',
    image: '/team/sos.jpg',
    bio: 'Full-stack developer who keeps things simple and reliable. Enjoys building tools that the whole team uses every day.',
    skills: ['Full Stack', 'Databases', 'DevOps'],
    works: [
      { id: 'sos-01', title: 'Internal dashboard', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'sos-02', title: 'Deployment runbook', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'sos-03', title: 'Office timelapse', category: 'PHOTO', thumbnail: '', link: '' },
    ],
    socials: {
      github: 'https://github.com/',
    },
  },
  {
    id: 'toon',
    nickname: 'TOON',
    fullName: 'SITTHISAK SUKSATHIT',
    role: 'DEVELOPER',
    image: '/team/toon.jpg',
    bio: 'Developer who likes clean code and quick iterations. Often pairs with designers to turn Figma files into working interfaces.',
    skills: ['React', 'TypeScript', 'UI Implementation'],
    works: [
      { id: 'toon-01', title: 'Client web applications', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'toon-02', title: '3D product viewer prototype', category: '3D', thumbnail: '', link: '' },
      { id: 'toon-03', title: 'Feature walkthrough clip', category: 'MOTION', thumbnail: '', link: '' },
    ],
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
    },
  },
  {
    id: 'soda',
    nickname: 'SODA',
    fullName: 'SIRIPONG WANCHAWEE',
    role: 'DEVELOPER',
    image: '/team/soda.jpg',
    bio: 'Developer focused on performance and details. Makes sure the website loads fast and works on every screen size.',
    skills: ['Performance', 'JavaScript', 'Testing'],
    works: [
      { id: 'soda-01', title: 'Performance overhaul report', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'soda-02', title: 'Cross-browser test shots', category: 'PHOTO', thumbnail: '', link: '' },
    ],
    socials: {
      github: 'https://github.com/',
    },
  },
  {
    id: 'boss',
    nickname: 'BOSS',
    fullName: 'APICHART INSING',
    role: 'UX/UI',
    image: '/team/boss.jpg',
    bio: 'UX/UI designer who sketches, prototypes and tests until the flow just feels right. Designs most of the pages on this site.',
    skills: ['Figma', 'Prototyping', 'User Research'],
    works: [
      { id: 'boss-01', title: 'SAY HI website UX/UI design', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'boss-02', title: 'Mobile app wireframes', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'boss-03', title: 'Wordmark exploration', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'boss-04', title: 'Prototype flow recording', category: 'MOTION', thumbnail: '', link: '' },
    ],
    socials: {
      linkedin: 'https://www.linkedin.com/',
    },
  },
  {
    id: 'zoda',
    nickname: 'ZODA',
    fullName: 'PATTANASAK KHAEKTAO',
    role: 'DEVELOPER',
    image: '/team/zoda.JPG',
    bio: 'Developer who enjoys building features end to end — from database schema to the last pixel on screen.',
    skills: ['Full Stack', 'REST APIs', 'React'],
    works: [
      { id: 'zoda-01', title: 'Member profile system', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'zoda-02', title: 'Content management tools', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'zoda-03', title: 'Data model diagram', category: 'PRODUCTION', thumbnail: '', link: '' },
    ],
    socials: {
      github: 'https://github.com/',
    },
  },
  {
    id: 'fah',
    nickname: 'FAH',
    fullName: 'SROIFA PANTIP',
    role: 'GRAPHIC DESIGN',
    image: '/team/fah.jpg',
    bio: 'Graphic designer with a soft spot for minimal layouts and pastel palettes. Works on branding and marketing materials.',
    skills: ['Branding', 'Layout Design', 'Color Theory'],
    works: [
      { id: 'fah-01', title: 'SAY HI brand guidelines', category: 'PRODUCTION', thumbnail: '', link: '' },
      { id: 'fah-02', title: 'Marketing collateral set', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'fah-03', title: 'Minimal logo marks', category: 'GRAPHIC', thumbnail: '', link: '' },
      { id: 'fah-04', title: 'Studio photoshoot set', category: 'PHOTO', thumbnail: '', link: '' },
    ],
    socials: {
      instagram: 'https://www.instagram.com/sayh.i2026/',
    },
  },
];

export default teamMembers;
