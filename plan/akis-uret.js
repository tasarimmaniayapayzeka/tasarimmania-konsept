/* RSS 2.0 + Atom 1.0 akışı üretir (rehber Bölüm 05: RSS · Atom Feed).
 *
 * Veri yazıların KENDİSİNDEN okunur — başlık, açıklama, tarih, kategori ve
 * yazar sayfanın şemasından/meta alanlarından gelir. Elle liste tutulmaz;
 * yazı değişirse akış da değişir.
 *
 * ⚠ TARİH BİÇİMİ FARKLI: RSS RFC-822 ister (Tue, 01 Sep 2026 10:20:00 +0300),
 *   Atom ISO-8601 (2026-09-01T10:20:00+03:00). Aynı dizgeyi ikisine de
 *   vermek okuyucularda sessiz ayrıştırma hatası yapar.
 *
 * ⚠ SIRALAMA: en yeni en üstte. Sitedeki yazıların bir kısmı ileri tarihli
 *   (yayın takvimi); akış onları olduğu gibi taşır, tarih uydurulmaz.
 *
 * Kullanım: node plan/akis-uret.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const KANONIK = 'https://www.tasarimmania.com';
const MARKA = 'TasarımMania';

const kacir = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/* RFC-822: RSS'in beklediği biçim */
const GUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const AY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function rfc822(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return null;
  const p = (n) => String(n).padStart(2, '0');
  return `${GUN[d.getUTCDay()]}, ${p(d.getUTCDate())} ${AY[d.getUTCMonth()]} ${d.getUTCFullYear()} `
    + `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} +0000`;
}
function iso8601(iso) {
  const d = new Date(iso);
  return isNaN(d) ? null : d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/* --- yazıları topla --- */
const yazilar = [];
const blogKok = path.join(S, 'blog');
for (const e of fs.readdirSync(blogKok, { withFileTypes: true })) {
  if (!e.isDirectory()) continue;
  const f = path.join(blogKok, e.name, 'index.html');
  if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, 'utf8');
  let art = null;
  const sm = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (sm) { try { art = (JSON.parse(sm[1])['@graph'] || []).find((n) => [n['@type']].flat().includes('Article')); } catch { } }
  if (!art) continue;
  yazilar.push({
    slug: e.name,
    baslik: art.headline || '',
    ozet: art.description || (h.match(/<meta name="description" content="([^"]*)"/) || ['', ''])[1],
    yayin: art.datePublished || '',
    guncel: art.dateModified || art.datePublished || '',
    kategori: art.articleSection || '',
    yazar: (h.match(/<meta name="author" content="([^"]*)"/) || ['', MARKA])[1],
    url: `${KANONIK}/blog/${e.name}/`,
  });
}
yazilar.sort((a, b) => new Date(b.yayin) - new Date(a.yayin));

const sorun = yazilar.filter((y) => !y.baslik || !rfc822(y.yayin));
const enYeni = yazilar[0] ? yazilar[0].guncel : new Date().toISOString();

/* --- RSS 2.0 --- */
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  ${MARKA} — blog akışı (RSS 2.0)
  Üreten: plan/akis-uret.js — elle düzenlemeyin.
  Yazı eklendiğinde/değiştiğinde yeniden koşulmalı.
-->
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${kacir(MARKA)} Blog</title>
    <link>${KANONIK}/blog/</link>
    <description>Web, mobil, dijital pazarlama, video prodüksiyon ve SEO üzerine rehber yazılar.</description>
    <language>tr</language>
    <lastBuildDate>${rfc822(enYeni)}</lastBuildDate>
    <atom:link href="${KANONIK}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${yazilar.map((y) => `    <item>
      <title>${kacir(y.baslik)}</title>
      <link>${y.url}</link>
      <guid isPermaLink="true">${y.url}</guid>
      <description>${kacir(y.ozet)}</description>
      <pubDate>${rfc822(y.yayin)}</pubDate>${y.kategori ? `\n      <category>${kacir(y.kategori)}</category>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>
`;

/* --- Atom 1.0 --- */
const atom = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  ${MARKA} — blog akışı (Atom 1.0)
  Üreten: plan/akis-uret.js — elle düzenlemeyin.
-->
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="tr">
  <title>${kacir(MARKA)} Blog</title>
  <subtitle>Web, mobil, dijital pazarlama, video prodüksiyon ve SEO üzerine rehber yazılar.</subtitle>
  <id>${KANONIK}/blog/</id>
  <link href="${KANONIK}/blog/" rel="alternate" type="text/html"/>
  <link href="${KANONIK}/blog/atom.xml" rel="self" type="application/atom+xml"/>
  <updated>${iso8601(enYeni)}</updated>
  <author><name>${kacir(MARKA)}</name><uri>${KANONIK}/</uri></author>
${yazilar.map((y) => `  <entry>
    <title>${kacir(y.baslik)}</title>
    <id>${y.url}</id>
    <link href="${y.url}" rel="alternate" type="text/html"/>
    <published>${iso8601(y.yayin)}</published>
    <updated>${iso8601(y.guncel)}</updated>
    <author><name>${kacir(y.yazar)}</name></author>${y.kategori ? `\n    <category term="${kacir(y.kategori)}"/>` : ''}
    <summary type="text">${kacir(y.ozet)}</summary>
  </entry>`).join('\n')}
</feed>
`;

/* --- head'e alternate bağlantıları --- */
const BAG = (on) => `<link rel="alternate" type="application/rss+xml" title="${MARKA} Blog (RSS)" href="${on}rss.xml">\n`
  + `<link rel="alternate" type="application/atom+xml" title="${MARKA} Blog (Atom)" href="${on}atom.xml">`;

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
let bagEklenen = 0;
const yazilacak = new Map();
for (const f of tara(blogKok)) {
  let h = fs.readFileSync(f, 'utf8');
  if (/type="application\/rss\+xml"/.test(h)) continue;
  const capa = h.match(/<link rel="canonical"[^>]*>/);
  if (!capa) continue;
  /* /blog/index.html → ./  ·  /blog/<slug>/index.html → ../ */
  const on = path.dirname(f) === blogKok ? './' : '../';
  h = h.replace(capa[0], capa[0] + '\n' + BAG(on));
  yazilacak.set(f, h);
  bagEklenen++;
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — blog akışları\n`);
console.log(`  yazı            : ${yazilar.length}`);
console.log(`  en yeni         : ${yazilar[0] ? yazilar[0].yayin.slice(0, 10) + ' · ' + yazilar[0].baslik.slice(0, 44) : '—'}`);
console.log(`  en eski         : ${yazilar.at(-1) ? yazilar.at(-1).yayin.slice(0, 10) : '—'}`);
console.log(`  rss.xml         : ${(rss.length / 1024).toFixed(1)} KB · ${(rss.match(/<item>/g) || []).length} öğe`);
console.log(`  atom.xml        : ${(atom.length / 1024).toFixed(1)} KB · ${(atom.match(/<entry>/g) || []).length} öğe`);
console.log(`  head bağlantısı : ${bagEklenen} sayfaya eklenecek`);
if (sorun.length) { console.log('\n  ✗ SORUNLU YAZI:'); sorun.forEach((y) => console.log(`     ${y.slug} — başlık/tarih okunamadı`)); }

if (UYGULA) {
  fs.writeFileSync(path.join(blogKok, 'rss.xml'), rss, 'utf8');
  fs.writeFileSync(path.join(blogKok, 'atom.xml'), atom, 'utf8');
  for (const [f, c] of yazilacak) fs.writeFileSync(f, c, 'utf8');
  console.log('\n  site/blog/rss.xml · site/blog/atom.xml yazıldı');
}
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
