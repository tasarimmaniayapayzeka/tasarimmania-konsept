/* DİL DEĞİŞTİRİCİ — ÖNCE ENVANTER (hiçbir şeyi değiştirmez)
 *
 * Amaç: düğmeyi 154 sayfaya koymadan ÖNCE kaç farklı üst menü yapısı
 * olduğunu ÖLÇMEK. "Genelde şöyledir" varsayımı yasak — [[olcmeden-konusma]].
 *
 * Ölçtükleri:
 *   1. Üst menü kabuğu   : <header class="navbar"> mi, <nav class="nav"> mi?
 *   2. Sağ blok          : .nav-right var mı, yoksa .nav-tel doğrudan mı?
 *   3. Mobil menü        : .mobmenu var mı, hangi biçimde?
 *   4. Dil karşılığı     : bu sayfanın öbür dildeki adresi haritada var mı?
 *   5. Zaten var mı      : daha önce konmuş bir dil düğmesi (idempotent kapı)
 *
 * Kullanım: node plan/dil-nav-envanter.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');

/* Dil haritası — hreflang betiğiyle AYNI kaynak, ayrı bir kopya türetilmesin */
const HARITA = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));
const TR_EN = new Map([['/', '/en/']]);
for (const [bolum, girdiler] of Object.entries(HARITA)) {
  if (bolum.startsWith('_') || typeof girdiler !== 'object') continue;
  for (const [tr, o] of Object.entries(girdiler)) {
    if (tr.startsWith('_')) continue;
    if (o && typeof o === 'object' && o.en) TR_EN.set(tr, o.en);
  }
}
const EN_TR = new Map([...TR_EN].map(([a, b]) => [b, a]));

const sayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const kalip = new Map();          // yapı imzası → sayfa listesi
let karsiligiYok = [], zatenVar = 0;

for (const f of sayfalar) {
  const h = fs.readFileSync(f, 'utf8');
  const y = yol(f);
  const en = y.startsWith('/en/') || y === '/en';

  const kabuk = /<header class="navbar"/.test(h) ? 'header.navbar'
    : /<nav class="nav"[^>]*data-nav/.test(h) ? 'nav.nav[data-nav]'
      : /<nav class="nav"/.test(h) ? 'nav.nav' : '?';
  const sag = /<div class="nav-right">/.test(h) ? '.nav-right' : /class="nav-tel"/.test(h) ? '.nav-tel(çıplak)' : 'yok';
  const mob = /class="mobmenu"/.test(h) ? '.mobmenu' : 'yok';
  const imza = `${kabuk} · sağ:${sag} · mobil:${mob}`;

  if (!kalip.has(imza)) kalip.set(imza, []);
  kalip.get(imza).push(y);

  const hedef = en ? EN_TR.get(y) : TR_EN.get(y);
  if (!hedef) karsiligiYok.push(y);
  else if (!fs.existsSync(path.join(S, hedef.replace(/^\//, ''), 'index.html'))) karsiligiYok.push(y + ' (dosya yok → ' + hedef + ')');

  if (/data-dil-degistir/.test(h)) zatenVar++;
}

console.log('\n  ÜST MENÜ YAPILARI\n');
for (const [imza, liste] of [...kalip].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(liste.length).padStart(3)} sayfa · ${imza}`);
  console.log(`        örnek: ${liste.slice(0, 3).join(' , ')}${liste.length > 3 ? ' …' : ''}`);
}
console.log(`\n  toplam sayfa            : ${sayfalar.length}`);
console.log(`  dil karşılığı OLMAYAN   : ${karsiligiYok.length}`);
if (karsiligiYok.length) console.log('    ' + karsiligiYok.join('\n    '));
console.log(`  dil düğmesi ZATEN olan  : ${zatenVar}\n`);
