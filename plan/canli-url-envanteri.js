/* Mevcut CANLI sitenin (www.tasarimmania.com) gerçek adres yapısını çıkarır.
 *
 * Neden: yeni sitenin URL yapısı değişecek ("/webtasarim" gibi düz adresler).
 * Doğru kararı ve 301 haritasını kurmak için canlı adreslerin GERÇEK deseni
 * gerekiyor — tahminle değil, arşivden.
 *
 * Kaynak: canli-site-yedek/www-tasarimmania-com-2026-09-02/ (2 Eyl 2026,
 * 175 HTML, wp-json dökümü dahil).
 *
 * Kullanım: node plan/canli-url-envanteri.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const YEDEK = path.join(KOK, 'canli-site-yedek', 'www-tasarimmania-com-2026-09-02');

if (!fs.existsSync(YEDEK)) {
  console.error('  ✗ yedek klasörü yok: ' + YEDEK);
  process.exit(2);
}

/* --- 1. wp-json dökümünden sayfa/yazı slug'ları --- */
function jsonOku(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}
const wpKok = path.join(YEDEK, 'wp-json');
const bulunan = { sayfa: [], yazi: [], kategori: [] };

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else o.push(p);
  }
  return o;
}

for (const f of tara(wpKok)) {
  const j = jsonOku(f);
  if (!Array.isArray(j)) continue;
  for (const k of j) {
    if (!k || !k.link) continue;
    const yol = String(k.link).replace(/^https?:\/\/[^/]+/, '');
    const kayit = { yol, baslik: (k.title && (k.title.rendered || k.title)) || '' };
    if (k.type === 'page') bulunan.sayfa.push(kayit);
    else if (k.type === 'post') bulunan.yazi.push(kayit);
  }
}
const benzersiz = (l) => [...new Map(l.map((x) => [x.yol, x])).values()];
bulunan.sayfa = benzersiz(bulunan.sayfa);
bulunan.yazi = benzersiz(bulunan.yazi);

console.log('\n  CANLI SİTE — ADRES ENVANTERİ (arşivden, 2 Eyl 2026)\n');
console.log(`  wp-json: ${bulunan.sayfa.length} sayfa · ${bulunan.yazi.length} yazı\n`);

/* --- 2. derinlik dağılımı: adresler düz mü, iç içe mi --- */
const derinlik = (y) => y.split('/').filter(Boolean).length;
const say = {};
for (const s of bulunan.sayfa) { const d = derinlik(s.yol); say[d] = (say[d] || 0) + 1; }
console.log('  SAYFA adreslerinin derinliği:');
Object.entries(say).sort().forEach(([d, n]) => console.log(`    ${d} seviye: ${n} sayfa`));

console.log('\n  SAYFA adresleri:');
bulunan.sayfa.sort((a, b) => a.yol.localeCompare(b.yol))
  .forEach((s) => console.log(`    ${s.yol.padEnd(44)} ${String(s.baslik).replace(/<[^>]*>/g, '').slice(0, 40)}`));

console.log(`\n  YAZI adreslerinden ilk 12 (toplam ${bulunan.yazi.length}):`);
bulunan.yazi.sort((a, b) => a.yol.localeCompare(b.yol)).slice(0, 12)
  .forEach((s) => console.log(`    ${s.yol}`));

/* --- 3. sitemap varsa oradan da doğrula --- */
const smAday = tara(YEDEK).filter((f) => /sitemap[^/\\]*\.xml$/i.test(f));
console.log(`\n  arşivdeki sitemap dosyası: ${smAday.length}`);
for (const f of smAday.slice(0, 3)) {
  const x = fs.readFileSync(f, 'utf8');
  const n = (x.match(/<loc>/g) || []).length;
  console.log(`    ${path.basename(f).padEnd(28)} ${n} URL`);
}
console.log('');
