/* Bir sayfanın hangi kısmı ORTAK KABUK, hangisi SAYFAYA ÖZEL İÇERİK?
 *
 * İngilizce sürümde kabuk birebir kopyalanmalı (tasarım aynı kalsın), içerik
 * yeniden yazılmalı. Bu ayrımı tahminle yapmak yerine ölçüyorum: aynı bloklar
 * kaç sayfada birebir tekrar ediyor?
 *
 * Kullanım: node plan/en-sayfa-anatomi.js [sayfa-yolu]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const HEDEF = process.argv[2] || 'seo';

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const hepsi = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const f = path.join(S, HEDEF, 'index.html');
if (!fs.existsSync(f)) { console.error('  ✗ sayfa yok: ' + HEDEF); process.exit(2); }
const h = fs.readFileSync(f, 'utf8');

const bolge = (ad, bas, son) => ({ ad, bas, son, uzunluk: son - bas });
const B = [];
const it = (s) => h.indexOf(s);
B.push(bolge('head (meta/şema)', it('<head>'), it('</head>') + 7));
B.push(bolge('<style> blok', it('<style>'), it('</style>') + 8));
B.push(bolge('üst menü + mobil menü', it('<a class="skip"') >= 0 ? it('<a class="skip"') : it('<nav'), it('<main')));
B.push(bolge('<main> gövde', it('<main'), h.lastIndexOf('</main>') + 7));
B.push(bolge('altbilgi + betikler', h.lastIndexOf('</main>') + 7, h.length));

console.log(`\n  SAYFA ANATOMİSİ — /${HEDEF}/\n`);
console.log(`  toplam: ${(h.length / 1024).toFixed(1)} KB\n`);
for (const b of B) {
  if (b.bas < 0 || b.son < 0) { console.log(`  ${b.ad.padEnd(24)} — bulunamadı`); continue; }
  console.log(`  ${b.ad.padEnd(24)} ${String((b.uzunluk / 1024).toFixed(1)).padStart(6)} KB  (%${Math.round(b.uzunluk / h.length * 100)})`);
}

/* --- ortaklık ölçümü: menü ve altbilgi kaç sayfada birebir aynı --- */
function parca(str, bas, son) { return bas >= 0 && son > bas ? str.slice(bas, son) : ''; }
const menu = parca(h, it('<nav class="nav"'), it('<main'));
const altbilgi = parca(h, h.lastIndexOf('<footer'), h.lastIndexOf('</footer>') + 9);

const menuNorm = (s) => s.replace(/(href|src)="[^"]*"/g, '"YOL"').replace(/\s+/g, ' ').trim();
let menuAyni = 0, altAyni = 0;
for (const x of hepsi) {
  const hx = fs.readFileSync(x, 'utf8');
  const m = parca(hx, hx.indexOf('<nav class="nav"'), hx.indexOf('<main'));
  const a = parca(hx, hx.lastIndexOf('<footer'), hx.lastIndexOf('</footer>') + 9);
  if (menuNorm(m) === menuNorm(menu)) menuAyni++;
  if (menuNorm(a) === menuNorm(altbilgi)) altAyni++;
}
console.log(`\n  ── ortaklık (yollar hariç tutularak) ──`);
console.log(`  üst menü birebir aynı  : ${menuAyni}/${hepsi.length} sayfa`);
console.log(`  altbilgi birebir aynı  : ${altAyni}/${hepsi.length} sayfa`);

/* --- gövdedeki çevrilecek metin --- */
const govde = parca(h, it('<main'), h.lastIndexOf('</main>') + 7);
const metin = govde.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
console.log(`\n  ── çeviri yükü ──`);
console.log(`  gövde metni       : ${metin.split(' ').length} kelime`);
console.log(`  head'de çevrilecek: title, description, og/twitter başlık+açıklama, şema name/description`);
console.log(`  SSS sorusu        : ${(h.match(/"@type": "Question"/g) || []).length}`);
console.log(`  şema düğümü       : ${(() => { try { return (JSON.parse(h.match(/application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'] || []).length; } catch { return '?'; } })()}`);
console.log('');
