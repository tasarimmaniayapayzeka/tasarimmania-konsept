/* Blog yazıları hangi hizmet sayfasına kaç link veriyor?
 *
 * ⚠ Bu ölçüm daha önce İKİ KEZ yanlış yapıldı:
 *   1) <div class="mobmenu"> gövde linki sayıldı → ortalama 13,4 yerine gerçek 6,5
 *   2) sayfaya özgü <nav class="yz-ilgili"> menü sanıldı → "hizmet→blog 0" denildi,
 *      gerçek 27'ydi
 * Bu yüzden menü/altbilgi bölgeleri açıkça dışlanıyor, yz-ilgili dışlanmıyor.
 *
 * Kullanım: node plan/ic-link-olc.js [modul-oneki]
 *   node plan/ic-link-olc.js mobil-uygulama
 */
const fs = require('fs'), path = require('path');
const { HIZMET_YOLLARI } = require('./sayfa-turu');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const ONEK = process.argv[2] || '';

function menuBolgeleri(h) {
  const b = [];
  for (const m of h.matchAll(/<nav\b([^>]*)>[\s\S]*?<\/nav>/gi))
    if (!/yz-ilgili|ilgili|breadcrumb/i.test(m[1])) b.push([m.index, m.index + m[0].length]);
  for (const m of h.matchAll(/<(footer|header)\b[^>]*>[\s\S]*?<\/\1>/gi)) b.push([m.index, m.index + m[0].length]);
  for (const m of h.matchAll(/<div[^>]*class="[^"]*mobmenu[^"]*"[^>]*>[\s\S]*?<\/div>/gi)) b.push([m.index, m.index + m[0].length]);
  return b;
}

/* blog → hizmet haritası */
const hedefler = {};
for (const d of fs.readdirSync(path.join(S, 'blog'), { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  const f = path.join(S, 'blog', d.name, 'index.html');
  if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, 'utf8'), b = menuBolgeleri(h), gorulen = new Set();
  /* ⚠ ESKİ SAYAÇ "hizmetler/" ARIYORDU — adresler düzleşince hiçbir bağ
     bulamadı ve "0 blog→hizmet bağı" dedi. Gerçekte bağlar duruyor, yalnız
     yolları değişti. Artık bağ, sayfanın konumundan çözülüp harita ile
     karşılaştırılıyor. → plan/sayfa-turu.js */
  const dizin = path.join(S, 'blog', d.name);
  for (const m of h.matchAll(/<a\s[^>]*href\s*=\s*"([^"]+)"/gi)) {
    if (b.some(([x, y]) => m.index >= x && m.index < y)) continue;
    const ham = m[1].replace(/[#?].*$/, '');
    if (/^(https?:|mailto:|tel:|#)/i.test(ham) || !ham) continue;
    const mutlak = path.resolve(dizin, ham);
    const rel = path.relative(S, mutlak);
    if (rel.startsWith('..')) continue;
    const t = '/' + rel.split(path.sep).join('/').replace(/\/?$/, '/');
    if (HIZMET_YOLLARI.has(t)) gorulen.add(t);
  }
  for (const t of gorulen) (hedefler[t] ??= []).push(d.name);
}

/* tüm hizmet sayfaları */
function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
/* ⚠ Hizmet listesi haritadan okunuyor; klasör taraması adres düzleşince
   çöktü (site/hizmetler/ altında tek sayfa kaldı). → plan/sayfa-turu.js */
const sayfalar = [...HIZMET_YOLLARI]
  .filter((y) => fs.existsSync(path.join(S, y.replace(/^\//, ''), 'index.html')))
  .filter((y) => fs.statSync(path.join(S, y.replace(/^\//, ''), 'index.html')).size >= 2000);

if (ONEK) {
  console.log(`\n■ ${ONEK} modülü — hangi sayfa kaç yazıdan link alıyor`);
  for (const u of sayfalar.filter((u) => u.includes(ONEK))) {
    const l = hedefler[u] || [];
    console.log(`  ${l.length >= 2 ? '✓' : '⚠'} ${String(l.length).padStart(2)}  ${u}`);
    l.forEach((x) => console.log('        · ' + x));
  }
}

console.log('\n■ 2 blog linkinin ALTINDA kalan hizmet sayfaları');
let eksik = 0, toplam = 0;
for (const u of sayfalar) {
  const n = (hedefler[u] || []).length;
  toplam += n;
  if (n < 2) { eksik++; console.log(`  ${n}  ${u}`); }
}
if (!eksik) console.log('  yok ✓');
console.log(`\n  ${sayfalar.length} hizmet sayfası · ${toplam} blog→hizmet bağı · ${eksik} sayfa eşiğin altında\n`);
