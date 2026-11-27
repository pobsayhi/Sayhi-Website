// Optimize images in public/home, public/work, public/team, public/Contact in place.
// Max width 1200px (no enlargement), EXIF orientation preserved via .rotate(),
// JPG: mozjpeg q75 / PNG: palette q80. Overwrites only when the result is smaller.
// Usage: node script/optimize-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOTS = ['public/home', 'public/work', 'public/team', 'public/Contact'];
const EXTS = new Set(['.jpg', '.jpeg', '.png']);
const MAX_WIDTH = 1200;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = ROOTS.flatMap((r) => (fs.existsSync(r) ? walk(r) : []));

let beforeTotal = 0;
let afterTotal = 0;
let changed = 0;
let skipped = 0;
const results = [];

for (const file of files) {
  const before = fs.statSync(file).size;
  beforeTotal += before;

  const isPng = path.extname(file).toLowerCase() === '.png';
  try {
    // Read into a buffer first: sharp(file) keeps a lazily-read fd open on the
    // input path, which makes overwriting the same file fail on Windows (EBUSY).
    const input = fs.readFileSync(file);
    let pipeline = sharp(input).rotate(); // auto-orient from EXIF, strips rotation metadata
    if (isPng) {
      pipeline = pipeline
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .png({ palette: true, quality: 80 });
    } else {
      pipeline = pipeline
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true });
    }

    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

    if (info.size < before) {
      fs.writeFileSync(file, data);
      afterTotal += info.size;
      changed += 1;
      results.push({ file, before, after: info.size });
    } else {
      afterTotal += before;
      skipped += 1;
      results.push({ file, before, after: before, skipped: true });
    }
  } catch (err) {
    afterTotal += before; // untouched
    skipped += 1;
    console.error(`ERROR ${file}: ${err.message}`);
    results.push({ file, before, after: before, error: err.message });
  }
}

const fmt = (n) => (n / 1024 / 1024).toFixed(2) + ' MB';
const pct = beforeTotal ? ((1 - afterTotal / beforeTotal) * 100).toFixed(1) : '0';

for (const r of results) {
  const kb = (n) => (n / 1024).toFixed(0).padStart(6) + ' KB';
  const tag = r.error ? 'ERROR  ' : r.skipped ? 'SKIPPED' : 'OK     ';
  console.log(`${tag} ${kb(r.before)} -> ${kb(r.after)}  ${r.file}${r.error ? '  (' + r.error + ')' : ''}`);
}

console.log(`\nFiles scanned : ${files.length}`);
console.log(`Recompressed  : ${changed}`);
console.log(`Skipped/error : ${skipped} (already smaller or failed)`);
console.log(`Total size    : ${fmt(beforeTotal)} -> ${fmt(afterTotal)}  (-${pct}%)`);
