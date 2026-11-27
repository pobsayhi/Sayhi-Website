// ขนาดจริง (กว้างxสูง) ของรูปใน public/ — ใช้ใส่ width/height ให้ <img>
// เพื่อให้เบราว์เซอร์คำนวณพื้นที่ไว้ก่อนรูปโหลด (กัน CLS) — CSS ของแต่ละหน้า
// ยังคุมขนาดจริงด้วย aspect-ratio + object-fit: cover เหมือนเดิม จึงไม่กระทบหน้าตาเว็บ
// อัปเดตค่าตรงนี้เมื่อเปลี่ยนไฟล์รูป

const DIMS = {
  // รูปสมาชิกทีม (public/team/)
  '/team/pob.JPG': [1200, 1800],
  '/team/pumpui.jpg': [1200, 1800],
  '/team/im.jpg': [1200, 1800],
  '/team/luktan.jpg': [1200, 1800],
  '/team/kan.jpg': [1200, 1800],
  '/team/sos.jpg': [1684, 2528],
  '/team/toon.jpg': [1200, 1800],
  '/team/soda.jpg': [1200, 1800],
  '/team/boss.jpg': [1200, 1800],
  '/team/zoda.JPG': [1200, 1800],
  '/team/fah.jpg': [1200, 1800],

  // รูปหมู่ (public/Contact/)
  '/Contact/All-2X8A9213.jpg': [1200, 800],
  '/Contact/All-2X8A9243.jpg': [1200, 800],
  '/Contact/All-2X8A9249.jpg': [1200, 800],
  '/Contact/All-Group.jpg': [1056, 588],

  // ผลงาน (public/work/)
  '/work/3d/3d-boss.jpg': [1200, 675],
  '/work/3d/3d-toon.jpg': [911, 507],
  '/work/3d/3d1-toon.jpg': [1059, 517],
  '/work/3d/emu-otori-boss.png': [534, 636],
  '/work/graphic/artist-kan.jpg': [1200, 788],
  '/work/graphic/base-to-the-future-soda.jpg': [1186, 1684],
  '/work/graphic/behind-the-chaos-pumpui.jpg': [1200, 1714],
  '/work/graphic/blue-nature-fah-poster.jpg': [1200, 1697],
  '/work/graphic/color-buddy-fah-character-design.jpg': [1200, 675],
  '/work/graphic/cortis-luktan-grunge-typography.jpeg': [595, 842],
  '/work/graphic/crimson-deck-sos.png': [858, 808],
  '/work/graphic/do-anything-boss.jpg': [1200, 1601],
  '/work/graphic/duck-in-a-box-boss.jpg': [308, 254],
  '/work/graphic/flower-toon.png': [553, 555],
  '/work/graphic/fragments-of-identity-pumpui.jpg': [1200, 1697],
  '/work/graphic/grow-up-kan.jpg': [1093, 817],
  '/work/graphic/her-boss.png': [476, 267],
  '/work/graphic/icat-sos.jpg': [1200, 1200],
  '/work/graphic/nike-boss.png': [1200, 668],
  '/work/graphic/oasis-sos.jpg': [1200, 1200],
  '/work/graphic/piano-toon.png': [1200, 756],
  '/work/graphic/sao-fire-boss.png': [1200, 1200],
  '/work/graphic/the-door-luktan.jpg': [737, 1310],
  '/work/graphic/the-lotus-luktan-editorial-halftone.jpeg': [1200, 769],
  '/work/graphic/wingsy-soda-mockup.png': [709, 684],
  '/work/graphic/yesterday-practice-boss.png': [1200, 687],
  '/work/photo/designspace-toon.jpg': [1200, 676],
  '/work/photo/digital-horizon-pumpui.jpg': [1200, 799],
  '/work/photo/img-1921-kan.jpg': [1200, 675],
  '/work/photo/life-by-the-sea-luktan.jpg': [1200, 800],
  '/work/photo/lover-cmm-boss.png': [665, 909],
  '/work/photo/sayhi-pob.jpg': [1080, 1620],
  '/work/photo/the-light-sos.jpg': [1024, 1024],
  '/work/photo/tree-toon.jpg': [1154, 2049],
  '/work/photo/yesterdays-memories-fah.jpg': [1200, 502],
};

// คืน { width, height } ของรูปจาก path — ถ้าไม่มีใน map คืน undefined (ไม่ใส่ attr)
export function imageDims(src) {
  const dims = DIMS[src];
  return dims ? { width: dims[0], height: dims[1] } : undefined;
}

export default DIMS;
