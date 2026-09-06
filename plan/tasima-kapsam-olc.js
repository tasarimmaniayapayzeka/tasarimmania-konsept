/* Düz URL taşımasının kapsamını ölçer — betiği yazmadan ÖNCE ne kadar
 * yolu dokunmak gerektiğini bilmek için.
 *
 * Taşımanın riski dosyayı taşımak değil, DERİNLİK DEĞİŞİMİ:
 *   /hizmetler/seo/teknik-seo/  (3 seviye) → /teknik-seo/  (1 seviye)
 * Sayfa içindeki her "../" ile başlayan yol yeniden hesaplanmalı. Ayrıca
 * 77 sayfanın tamamındaki "/hizmetler/..." linkleri yeni adrese çevrilmeli.
 *
 * Kullanım: node plan/tasima-kapsam-olc.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const H = JSON.parse(fs.readFileSync(path.join(__dirname, 'yeni-url-haritasi.json'), 'utf8'));

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const derinlik = (y) => y.split('/').filter(Boolean).length;

const hepsi = tara(S).filter((f) => fs.statSync(f).size >= 2000);

/* eski → yeni eşleme */
const esleme = new Map();
Object.entries(H.hizmetler).forEach(([eski, o]) => esleme.set(eski, o.yeni));
Object.entries(H.birlestirilecek).forEach(([yeni, o]) => o.kaynaklar.forEach((k) => esleme.set(k, yeni)));

console.log('\n  DÜZ URL TAŞIMASI — KAPSAM ÖLÇÜMÜ\n');

/* --- 1. derinlik değişimi --- */
console.log('  ── 1. derinlik değişimi (göreli yolları etkiler) ──');
const derinlikDegisimi = new Map();
for (const [eski, yeni] of esleme) {
  const d = derinlik(eski) - derinlik(yeni);
  if (!derinlikDegisimi.has(d)) derinlikDegisimi.set(d, []);
  derinlikDegisimi.get(d).push(eski);
}
[...derinlikDegisimi.entries()].sort((a, b) => b[0] - a[0]).forEach(([d, l]) => {
  console.log(`     ${d > 0 ? d + ' seviye yukarı' : d === 0 ? 'değişmiyor' : Math.abs(d) + ' seviye aşağı'}: ${l.length} sayfa`);
});

/* --- 2. taşınan sayfaların içindeki göreli yollar --- */
console.log('\n  ── 2. taşınan sayfalarda yeniden hesaplanacak göreli yol ──');
let toplamYol = 0;
const ornekler = [];
for (const [eski] of esleme) {
  const f = path.join(S, eski.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, 'utf8');
  const n = [...h.matchAll(/(?:href|src|srcset)="(\.{1,2}\/[^"]*)"/g)].length;
  toplamYol += n;
  if (ornekler.length < 3) ornekler.push(`${eski} → ${n} yol`);
}
console.log(`     ${esleme.size} sayfada toplam ${toplamYol} göreli yol`);
ornekler.forEach((x) => console.log('     ' + x));

/* --- 3. DİĞER sayfalardan /hizmetler/ adresine giden linkler --- */
console.log('\n  ── 3. /hizmetler/ adresine link veren diğer sayfalar ──');
let linkVeren = 0, linkSayisi = 0;
const tur = { blog: 0, hizmet: 0, diğer: 0 };
for (const f of hepsi) {
  const h = fs.readFileSync(f, 'utf8');
  const n = [...h.matchAll(/(?:href)="[^"]*hizmetler\/[^"]*"/g)].length;
  if (!n) continue;
  linkVeren++; linkSayisi += n;
  const y = yol(f);
  tur[/^\/blog\/[^/]+\//.test(y) ? 'blog' : y.startsWith('/hizmetler/') ? 'hizmet' : 'diğer']++;
}
console.log(`     ${linkVeren} sayfa · ${linkSayisi} link  (blog ${tur.blog} · hizmet ${tur.hizmet} · diğer ${tur.diğer})`);

/* --- 4. canonical / og:url / şema / sitemap --- */
console.log('\n  ── 4. mutlak adres geçen alanlar ──');
let canonical = 0, ogUrl = 0, semaId = 0;
for (const f of hepsi) {
  const h = fs.readFileSync(f, 'utf8');
  if (/rel="canonical"[^>]*hizmetler\//.test(h)) canonical++;
  if (/og:url"[^>]*hizmetler\//.test(h)) ogUrl++;
  semaId += [...h.matchAll(/"(@id|url|item)":\s*"[^"]*\/hizmetler\/[^"]*"/g)].length;
}
console.log(`     canonical: ${canonical} sayfa · og:url: ${ogUrl} sayfa · şema alanı: ${semaId} adet`);
const sm = fs.readFileSync(path.join(S, 'sitemap.xml'), 'utf8');
const smg = fs.existsSync(path.join(S, 'sitemap-gorsel.xml')) ? fs.readFileSync(path.join(S, 'sitemap-gorsel.xml'), 'utf8') : '';
console.log(`     sitemap.xml: ${(sm.match(/hizmetler\//g) || []).length} · sitemap-gorsel.xml: ${(smg.match(/hizmetler\//g) || []).length}`);

/* --- 5. blog yapılandırmalarında hizmet linki --- */
const yapDosyalari = fs.readdirSync(__dirname).filter((f) => /^yazi-\d+-.*\.json$/.test(f));
let yapLink = 0, yapDosya = 0;
for (const yd of yapDosyalari) {
  const s = fs.readFileSync(path.join(__dirname, yd), 'utf8');
  const n = (s.match(/hizmetler\//g) || []).length;
  if (n) { yapDosya++; yapLink += n; }
}
console.log(`\n  ── 5. blog yapılandırmaları ──`);
console.log(`     ${yapDosya}/${yapDosyalari.length} dosyada ${yapLink} hizmet yolu (üreticiye kaynak — güncellenmezse geri döner)`);
console.log('');
