/* Kullanıcının verdiği YENİ adres ağacı ile MEVCUT site arasındaki farkı ölçer.
 *
 * Kullanıcının 7 Eyl 2026'da verdiği hedef yapı:
 *   /seo/ /web-tasarim/ /sosyal-medya/ /google-ads/ /meta-reklam/
 *   /video-produksiyon/ /yapay-zeka/
 *   /blog/<slug>/   (blog kendi öneki altında kalıyor)
 *   /hakkimizda/ /referanslar/ /iletisim/
 *
 * Amaç: hangi sayfa nereye gidiyor, hangisi karşılıksız kalıyor, hangisi yeni.
 * 36.996 kelimelik hizmet içeriği söz konusu — silme/birleştirme kararı
 * ölçülmeden verilmez.
 *
 * Kullanım: node plan/yeni-yapi-fark.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');

const HEDEF_HIZMET = ['seo', 'web-tasarim', 'sosyal-medya', 'google-ads',
  'meta-reklam', 'video-produksiyon', 'yapay-zeka'];
const HEDEF_DIGER = ['blog', 'hakkimizda', 'referanslar', 'iletisim'];

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const govde = (h) => {
  const b = h.indexOf('<main'); const s = h.lastIndexOf('</main>');
  const g = b < 0 ? h : h.slice(b, s > b ? s : undefined);
  return g.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
};

const hepsi = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const bilgi = new Map();
for (const f of hepsi) {
  const h = fs.readFileSync(f, 'utf8');
  bilgi.set(yol(f), {
    kelime: govde(h).split(' ').filter(Boolean).length,
    yonlendirme: /http-equiv="refresh"/i.test(h),
  });
}

const hizmetler = [...bilgi.keys()].filter((y) => y.startsWith('/hizmetler/') && !bilgi.get(y).yonlendirme);
const bloglar = [...bilgi.keys()].filter((y) => /^\/blog\/[^/]+\/$/.test(y));
const digerler = [...bilgi.keys()].filter((y) => !y.startsWith('/hizmetler/') && !y.startsWith('/blog/'));

/* mevcut hizmet sayfasını hedef 7'den birine eşle — ad benzerliğiyle, KESİN DEĞİL */
const ESLEME_IPUCU = {
  'seo': ['/hizmetler/seo/'],
  'web-tasarim': ['/hizmetler/web-tasarim-yazilim/'],
  'sosyal-medya': ['/hizmetler/dijital-pazarlama/sosyal-medya-yonetimi/'],
  'google-ads': ['/hizmetler/dijital-pazarlama/google-ads/'],
  'meta-reklam': ['/hizmetler/dijital-pazarlama/meta-ads/'],
  'video-produksiyon': ['/hizmetler/video-produksiyon/'],
  'yapay-zeka': ['/hizmetler/web-tasarim-yazilim/ai-entegrasyonu/', '/hizmetler/video-produksiyon/ai-destekli-produksiyon/'],
};
const eslesen = new Set(Object.values(ESLEME_IPUCU).flat());

console.log('\n  YENİ ADRES YAPISI — MEVCUT SİTEYLE FARK\n');
console.log(`  Hedef yapıda hizmet: ${HEDEF_HIZMET.length}   ·   Sitede hizmet sayfası: ${hizmetler.length}`);
console.log(`  Hedef yapıda blog  : /blog/ altında (çakışma yok)   ·   Sitede: ${bloglar.length} yazı`);

console.log('\n  ── 1. HEDEFTEKİ 7 ADRESİN KARŞILIĞI ──');
for (const s of HEDEF_HIZMET) {
  const k = ESLEME_IPUCU[s] || [];
  const varOlan = k.filter((y) => bilgi.has(y));
  if (!varOlan.length) { console.log(`  /${s}/`.padEnd(24) + '✗ SİTEDE KARŞILIĞI YOK — yeni yazılacak'); continue; }
  const kel = varOlan.reduce((a, y) => a + bilgi.get(y).kelime, 0);
  console.log(`  /${s}/`.padEnd(24) + `← ${varOlan.join(' + ')}  (${kel} kelime)`);
}

console.log('\n  ── 2. HEDEFTE KARŞILIĞI OLMAYAN HİZMET SAYFALARI ──');
const oksuz = hizmetler.filter((y) => !eslesen.has(y) && y !== '/hizmetler/');
let oksuzKelime = 0;
oksuz.sort().forEach((y) => { oksuzKelime += bilgi.get(y).kelime; console.log(`  ${y.padEnd(52)} ${bilgi.get(y).kelime} kelime`); });
console.log(`  ${'—'.repeat(52)}`);
console.log(`  ${String(oksuz.length).padStart(2)} sayfa · ${oksuzKelime.toLocaleString('tr-TR')} kelime`);

console.log('\n  ── 3. HEDEFTE OLUP SİTEDE HİÇ OLMAYAN ──');
const yeniler = [];
if (!bilgi.has('/referanslar/')) yeniler.push('/referanslar/  (sitede yok — sıfırdan yazılacak)');
if (!ESLEME_IPUCU['yapay-zeka'].some((y) => bilgi.has(y))) yeniler.push('/yapay-zeka/');
yeniler.forEach((x) => console.log('  ' + x));
if (!yeniler.length) console.log('  ✓ hepsinin bir kaynağı var');

console.log('\n  ── 4. HEDEF AĞAÇTA GEÇMEYEN ama SİTEDE OLAN diğer sayfalar ──');
digerler.filter((y) => y !== '/' && !HEDEF_DIGER.includes(y.split('/').filter(Boolean)[0]))
  .sort().forEach((y) => console.log(`  ${y.padEnd(24)} ${bilgi.get(y).kelime} kelime`));
console.log('');
