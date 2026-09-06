/* sitemap.xml'e İngilizce sayfaları ekler — YALNIZ VAR OLANLARI.
 *
 * İlke hreflang'daki ile aynı: olmayan bir adresi listelemek arama motoruna
 * indekslenebilir 404 göstermektir. İngilizce sürüm tur tur üretiliyor; bu
 * araç her turdan sonra çalışıp yalnız diske yazılmış sayfaları ekler.
 *
 * ⚠ TÜRKÇE GİRDİLERE DOKUNULMAZ. Var olan <url> blokları olduğu gibi kalır;
 *   yalnız eksik İngilizce bloklar sona eklenir, fazlalıklar (silinmiş sayfa)
 *   bildirilir ama sessizce kaldırılmaz.
 *
 * lastmod parametre olarak verilir — betiğin her koşuşta "bugün"ü yazması,
 * içerik değişmese bile tarihi tazeleyip yanlış sinyal üretirdi
 * (bkz. sitemap-lastmod.js'teki aynı gerekçe).
 *
 * Kullanım: node plan/en-sitemap.js 2026-09-06 [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const TARIH = process.argv.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
const KANONIK = 'https://www.tasarimmania.com';
if (!TARIH) { console.error('  kullanım: node plan/en-sitemap.js YYYY-AA-GG [--uygula]'); process.exit(2); }

const smYol = path.join(S, 'sitemap.xml');
let xml = fs.readFileSync(smYol, 'utf8');
const SS = xml.includes('\r\n') ? '\r\n' : '\n';

/* diskteki İngilizce sayfalar */
function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const enSayfalar = tara(path.join(S, 'en'))
  .map((f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, ''))
  .sort();

/* haritadaki öncelik: kök 1.0, hizmet 0.8, diğer 0.7 */
const { turu } = require('./sayfa-turu');
const oncelik = (y) => (y === '/en/' ? '1.0' : turu(y) === 'hizmet' ? '0.8' : turu(y) === 'blog' ? '0.6' : '0.7');
const siklik = (y) => (turu(y) === 'blog' ? 'monthly' : 'weekly');

const mevcut = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const eksik = enSayfalar.filter((y) => !mevcut.has(KANONIK + y));
const fazla = [...mevcut].filter((l) => l.startsWith(KANONIK + '/en/') && !enSayfalar.includes(l.slice(KANONIK.length)));

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — sitemap.xml · İngilizce girdiler\n`);
console.log(`  sitemap'teki adres  : ${mevcut.size}`);
console.log(`  diskteki EN sayfası : ${enSayfalar.length}`);
console.log(`  EKLENECEK           : ${eksik.length}`);
eksik.forEach((y) => console.log(`     + ${y}  (priority ${oncelik(y)})`));
if (fazla.length) {
  console.log(`\n  ⚠ SİTEMAP'TE VAR AMA DİSKTE YOK: ${fazla.length}`);
  fazla.forEach((l) => console.log(`     ✗ ${l}`));
  console.log('     (elle karar verin — sessizce silinmiyor)');
}

if (!eksik.length) { console.log('\n  ✓ eklenecek bir şey yok\n'); process.exit(0); }

const bloklar = eksik.map((y) =>
  `  <url>${SS}    <loc>${KANONIK}${y}</loc>${SS}    <lastmod>${TARIH}</lastmod>${SS}`
  + `    <changefreq>${siklik(y)}</changefreq>${SS}    <priority>${oncelik(y)}</priority>${SS}  </url>`
).join(SS);

if (UYGULA) {
  const kapanis = xml.lastIndexOf('</urlset>');
  if (kapanis < 0) { console.error('\n  ✗ </urlset> bulunamadı\n'); process.exit(1); }
  xml = xml.slice(0, kapanis) + bloklar + SS + xml.slice(kapanis);
  /* başlıktaki "Son güncelleme" satırı da tazelensin */
  xml = xml.replace(/(Son güncelleme: )\d{4}-\d{2}-\d{2}/, `$1${TARIH}`);
  fs.writeFileSync(smYol, xml, 'utf8');
  console.log(`\n  yazıldı: site/sitemap.xml (+${eksik.length} adres)\n`);
} else console.log('\n  Uygulamak için: --uygula\n');
