/* Düz (kök seviye) URL yapısına geçişte ÇAKIŞMA ve 301 analizi.
 *
 * Kullanıcı kararı (6 Eyl 2026): adresler düzleşecek —
 * /hizmetler/web-tasarim-yazilim/ yerine /webtasarim/ gibi kök seviye.
 * Gerekçe: canlı sitenin mevcut deseni de düz (ölçüldü: 14/15 sayfa tek
 * seviye, 79 yazının tamamı kök seviyede).
 *
 * ⚠ DÜZ YAPININ RİSKİ: hizmet, blog ve kurumsal sayfalar aynı ad alanını
 *   paylaşır. Aynı slug iki sayfaya düşerse biri diğerini ezer. Bu betik
 *   çakışmayı UYGULAMADAN ÖNCE bulur.
 *
 * ⚠ 301 HARİTASI: canlı sitede ZATEN sıralanan 15 sayfa + 79 yazı var.
 *   Yeni yapı onların adresini değiştiriyorsa 301 şart; yoksa birikmiş
 *   otorite çöpe gider.
 *
 * Kullanım: node plan/duz-url-cakisma.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const YEDEK = path.join(KOK, 'canli-site-yedek', 'www-tasarimmania-com-2026-09-02');

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* --- yeni sitenin mevcut adresleri --- */
const sayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000).map(yol);
const hizmet = sayfalar.filter((y) => y.startsWith('/hizmetler/') && y !== '/hizmetler/');
const blog = sayfalar.filter((y) => /^\/blog\/[^/]+\/$/.test(y));
const diger = sayfalar.filter((y) => !y.startsWith('/hizmetler/') && !y.startsWith('/blog/'));

/* --- canlı sitenin adresleri --- */
function jsonOku(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } }
function taraHepsi(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) taraHepsi(p, o); else o.push(p);
  }
  return o;
}
const canli = { sayfa: new Set(), yazi: new Set() };
for (const f of taraHepsi(path.join(YEDEK, 'wp-json'))) {
  const j = jsonOku(f);
  if (!Array.isArray(j)) continue;
  for (const k of j) {
    if (!k || !k.link) continue;
    const y = String(k.link).replace(/^https?:\/\/[^/]+/, '');
    if (k.type === 'page') canli.sayfa.add(y);
    else if (k.type === 'post') canli.yazi.add(y);
  }
}

/* --- son bileşen (slug) çıkar --- */
const slug = (y) => y.split('/').filter(Boolean).pop() || '(kök)';

const yeniDuz = new Map();      /* slug → [kaynak yollar] */
const ekle = (s, kaynak) => { if (!yeniDuz.has(s)) yeniDuz.set(s, []); yeniDuz.get(s).push(kaynak); };
hizmet.forEach((y) => ekle(slug(y), 'hizmet ' + y));
blog.forEach((y) => ekle(slug(y), 'blog   ' + y));
diger.filter((y) => y !== '/').forEach((y) => ekle(slug(y), 'diğer  ' + y));

console.log('\n  DÜZ URL YAPISI — ÇAKIŞMA ANALİZİ\n');
console.log(`  Yeni sitede düzleşecek adres: hizmet ${hizmet.length} · blog ${blog.length} · diğer ${diger.length - 1}`);
console.log(`  Canlı sitede var olan       : sayfa ${canli.sayfa.size} · yazı ${canli.yazi.size}\n`);

/* --- 1. YENİ SİTE İÇİ ÇAKIŞMA --- */
const icCakisma = [...yeniDuz.entries()].filter(([, l]) => l.length > 1);
console.log(`  ── 1. Yeni site içi çakışma: ${icCakisma.length}`);
icCakisma.forEach(([s, l]) => { console.log(`     /${s}/`); l.forEach((x) => console.log(`        ← ${x}`)); });
if (!icCakisma.length) console.log('     ✓ aynı slug iki sayfaya düşmüyor');

/* --- 2. CANLI SİTEYLE ÇAKIŞMA (aynı slug, farklı içerik) --- */
const canliSluglar = new Map();
[...canli.sayfa].forEach((y) => canliSluglar.set(slug(y), 'sayfa ' + y));
[...canli.yazi].forEach((y) => canliSluglar.set(slug(y), 'yazı  ' + y));
const disCakisma = [...yeniDuz.keys()].filter((s) => canliSluglar.has(s));
console.log(`\n  ── 2. Canlı siteyle aynı slug: ${disCakisma.length}`);
disCakisma.forEach((s) => {
  console.log(`     /${s}/`);
  console.log(`        canlı : ${canliSluglar.get(s)}`);
  yeniDuz.get(s).forEach((x) => console.log(`        yeni  : ${x}`));
});
if (!disCakisma.length) console.log('     ✓ örtüşme yok — hepsi yeni adres olur');

/* --- 3. 301 GEREKTİRENLER: canlıda var, yeni sitede karşılığı yok --- */
const yeniSluglar = new Set(yeniDuz.keys());
const oksuzCanli = [...canliSluglar.entries()].filter(([s]) => !yeniSluglar.has(s));
console.log(`\n  ── 3. Canlıda var, yeni sitede AYNI slug yok: ${oksuzCanli.length}/${canliSluglar.size}`);
console.log('     (her biri için 301 hedefi seçilmeli — yoksa 404 olur ve sıralama kaybolur)');
oksuzCanli.slice(0, 10).forEach(([s, k]) => console.log(`        ${('/' + s + '/').padEnd(52)} ${k.split(' ')[0]}`));
if (oksuzCanli.length > 10) console.log(`        … ${oksuzCanli.length - 10} adres daha`);
console.log('');
