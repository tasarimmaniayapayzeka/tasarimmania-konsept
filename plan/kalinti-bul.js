/* Taşımadan sonra kalan eski adres izlerini bağlamıyla gösterir.
 * Kullanım: node plan/kalinti-bul.js
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const KOK = path.join(__dirname, '..');

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o);
    else if (/\.(html|xml|json|txt)$/.test(e.name)) o.push(p);
  }
  return o;
}

const dosyalar = tara(S)
  .concat([path.join(KOK, '404.html')].filter(fs.existsSync))
  .concat(fs.readdirSync(__dirname).filter((f) => /\.(json|md)$/.test(f)).map((f) => path.join(__dirname, f)));

const DESEN = /hizmetler\/[a-z][a-z0-9-]*/g;
let toplam = 0;
for (const f of dosyalar) {
  const h = fs.readFileSync(f, 'utf8');
  const bulunan = [...h.matchAll(DESEN)];
  if (!bulunan.length) continue;
  const rel = path.relative(KOK, f).split(path.sep).join('/');
  /* haritalar ve plan belgeleri eski adresi BİLEREK taşıyor */
  const belge = /^plan\/.*\.(json|md)$/.test(rel);
  console.log(`\n  ${rel}  (${bulunan.length} geçiş)${belge ? '   ← harita/belge, eski adres burada BEKLENİR' : ''}`);
  if (belge) { continue; }
  toplam += bulunan.length;
  for (const m of bulunan.slice(0, 4)) {
    const bas = Math.max(0, m.index - 90);
    console.log('     …' + h.slice(bas, m.index + m[0].length + 50).replace(/\s+/g, ' ').trim());
  }
}
console.log(`\n  Belge dışı kalıntı: ${toplam}\n`);
process.exit(toplam ? 1 : 0);
