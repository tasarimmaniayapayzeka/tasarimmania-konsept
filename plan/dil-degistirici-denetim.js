/* DİL DEĞİŞTİRİCİ DENETİMİ — düğme doğru yere gidiyor mu?
 *
 * Kullanım: node plan/dil-degistirici-denetim.js
 *
 * Yalnız "düğme var mı" bakmak YETMEZ. Ölçülen dört şey:
 *   1. Bağlantı diskte GERÇEKTEN var mı (göreli yol her derinlikte çözülüyor mu)
 *   2. Hedef ÖBÜR dilde mi (TR sayfa TR'ye, EN sayfa EN'e gitmesin)
 *   3. Gidiş-dönüş kapanıyor mu: A→B→A aynı sayfaya dönüyor mu
 *   4. Etkin dil işareti sayfanın gerçek diliyle uyuşuyor mu (<html lang>)
 *
 * ⚠ 3. MADDE EN ÖNEMLİSİ. Yol tek tek doğru görünüp yine de yanlış eşleşme
 *   olabilir: iki farklı TR sayfası aynı EN sayfasına işaret ederse ikisi de
 *   "var" der, ama dönüşte biri kaybolur. Gidiş-dönüş bunu yakalar.
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

const sayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const gidis = new Map();   // kaynak yol → hedef yol
let dugmesiz = [], kirik = [], ayniDil = [], langUyusmaz = [], cokluHedef = [];
const hedefSayaci = new Map();

for (const f of sayfalar) {
  const h = fs.readFileSync(f, 'utf8');
  const y = yol(f);
  const en = y === '/en/' || y.startsWith('/en/');

  const blok = h.match(/<div class="dil"[^>]*>([\s\S]*?)<\/div>/);
  if (!blok) { dugmesiz.push(y); continue; }

  /* <html lang="…"> ile etkin işaret uyuşmalı */
  const htmlLang = (h.match(/<html[^>]*\blang="([a-zA-Z-]+)"/) || [])[1] || '?';
  const etkin = (blok[1].match(/<span aria-current="true" lang="([a-z]+)"/) || [])[1] || '?';
  if (htmlLang.toLowerCase().split('-')[0] !== etkin) langUyusmaz.push(`${y}  <html lang="${htmlLang}"> ↔ etkin "${etkin}"`);

  const href = (blok[1].match(/<a href="([^"]+)"/) || [])[1];
  if (!href) { kirik.push(y + ' (bağlantı yok)'); continue; }

  const hedefDosya = path.join(path.dirname(f), href, 'index.html');
  if (!fs.existsSync(hedefDosya)) { kirik.push(`${y} → ${href}  (dosya yok)`); continue; }

  const hy = yol(hedefDosya);
  const hedefEn = hy === '/en/' || hy.startsWith('/en/');
  if (hedefEn === en) ayniDil.push(`${y} → ${hy}`);

  gidis.set(y, hy);
  hedefSayaci.set(hy, (hedefSayaci.get(hy) || 0) + 1);
}

for (const [hy, n] of hedefSayaci) if (n > 1) cokluHedef.push(`${hy}  ← ${n} sayfa`);

/* gidiş-dönüş */
let donmeyen = [];
for (const [a, b] of gidis) if (gidis.get(b) !== a) donmeyen.push(`${a} → ${b} → ${gidis.get(b) || 'YOK'}`);

const yaz = (ad, liste) => {
  console.log(`  ${ad.padEnd(28)}: ${liste.length}`);
  if (liste.length) console.log('    ' + liste.slice(0, 12).join('\n    ') + (liste.length > 12 ? `\n    … +${liste.length - 12}` : ''));
};
console.log(`\n  taranan sayfa               : ${sayfalar.length}`);
console.log(`  düğmesi olan                : ${sayfalar.length - dugmesiz.length}`);
yaz('düğmesi OLMAYAN', dugmesiz);
yaz('KIRIK bağlantı', kirik);
yaz('AYNI dile giden', ayniDil);
yaz('gidiş-dönüş KAPANMAYAN', donmeyen);
yaz('AYNI hedefe giden birden çok', cokluHedef);
yaz('<html lang> UYUŞMAYAN', langUyusmaz);
console.log(`\n  TOPLAM bulgu: ${kirik.length + ayniDil.length + donmeyen.length + cokluHedef.length + langUyusmaz.length + dugmesiz.length}\n`);
