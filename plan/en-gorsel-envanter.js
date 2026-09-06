/* en-gorsel-envanter.js — İngilizce sayfaların hangi görsel dosyalarına
 * işaret ettiğini, hangi sayfadan ve hangi alt metniyle çağrıldığını döker.
 *
 * KURAL (kullanıcı emri): her dil sürümünde görseller o dilin SEO adıyla
 * AYRI kopyalanır; başka dilin klasörüne işaret etmek YASAK. Aksi hâlde
 * aynı dosya iki dilde aynı adla servis edilir — SEO'da tekrar sayılır.
 *
 * Bu betik ölçüm yapar, dosya taşımaz. Yeniden adlandırma sözlüğü
 * plan/en-gorsel-ad.json içinde; onu yazmadan önce buraya bakılır.
 *
 *   node plan/en-gorsel-envanter.js          # özet
 *   node plan/en-gorsel-envanter.js --tam    # her dosya + alt metni
 */
'use strict';
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..');
const EN = path.join(KOK, 'site', 'en');
const TAM = process.argv.includes('--tam');

function sayfalar(dizin) {
  const c = [];
  for (const ad of fs.readdirSync(dizin)) {
    const t = path.join(dizin, ad);
    if (fs.statSync(t).isDirectory()) c.push(...sayfalar(t));
    else if (ad === 'index.html') c.push(t);
  }
  return c;
}

const GORSEL = /\.(webp|jpg|jpeg|png|avif)$/i;
/* src / srcset / og:image-twitter:image content */
const REF = /(?:src|srcset)="([^"]+)"|<meta[^>]+(?:property="og:image"|name="twitter:image")[^>]*content="([^"]+)"/g;

const dosyalar = new Map();   /* mutlak site yolu → {sayfa:Set, alt:Set, tur} */

for (const sayfa of sayfalar(EN)) {
  const h = fs.readFileSync(sayfa, 'utf8');
  const kisa = '/' + path.relative(path.join(KOK, 'site'), sayfa).replace(/\\/g, '/').replace(/index\.html$/, '');

  /* Bir <img> etiketinin alt metnini yakalamak için etiket etiket gez. */
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    const etiket = m[0];
    const alt = (etiket.match(/\salt="([^"]*)"/) || [, ''])[1];
    const adaylar = [];
    const src = (etiket.match(/\ssrc="([^"]+)"/) || [, ''])[1];
    if (src) adaylar.push(src);
    const ss = (etiket.match(/\ssrcset="([^"]+)"/) || [, ''])[1];
    if (ss) for (const p of ss.split(',')) adaylar.push(p.trim().split(/\s+/)[0]);
    for (const a of adaylar) {
      if (!GORSEL.test(a.split('?')[0])) continue;
      const cozum = path.posix.normalize(path.posix.join(path.posix.dirname(kisa), a));
      const kayit = dosyalar.get(cozum) || { sayfa: new Set(), alt: new Set(), tur: 'img' };
      kayit.sayfa.add(kisa); if (alt) kayit.alt.add(alt);
      dosyalar.set(cozum, kayit);
    }
  }

  /* meta og:image / twitter:image — mutlak adres */
  for (const m of h.matchAll(/<meta[^>]+(?:property="og:image"|name="twitter:image")[^>]*content="([^"]+)"/g)) {
    const u = m[1];
    if (!GORSEL.test(u.split('?')[0])) continue;
    const kayit = dosyalar.get(u) || { sayfa: new Set(), alt: new Set(), tur: 'meta' };
    kayit.sayfa.add(kisa);
    dosyalar.set(u, kayit);
  }
}

/* Türü sınıflandır: blog görseli · marka/müşteri logosu · içerik görseli */
function sinif(yol) {
  if (/\/blog\//.test(yol)) return 'blog';
  if (/\/(logo|referans)\//.test(yol)) return 'marka';
  return 'icerik';
}

const gruplar = { blog: [], marka: [], icerik: [] };
for (const [yol, k] of dosyalar) gruplar[sinif(yol)].push([yol, k]);

console.log('');
console.log(`  İngilizce sayfa           : ${sayfalar(EN).length}`);
console.log(`  işaret edilen görsel dosya: ${dosyalar.size}`);
console.log('');
console.log(`  blog görseli (Türkçe klasörden çağrılıyor): ${gruplar.blog.length}`);
console.log(`  marka / müşteri logosu                    : ${gruplar.marka.length}`);
console.log(`  içerik görseli (assets)                   : ${gruplar.icerik.length}`);
console.log('');

/* KURAL İHLALİ: İngilizce sayfadan /en/ dışındaki bir görsele işaret. */
const ihlal = [...dosyalar.keys()].filter((y) => y.startsWith('/') && !y.startsWith('/en/'));
console.log(`  ⚠ /en/ DIŞINA işaret eden görsel: ${ihlal.length} / ${dosyalar.size}`);
console.log('');

if (TAM) {
  for (const tur of ['blog', 'icerik', 'marka']) {
    console.log(`  ── ${tur.toUpperCase()} ──`);
    for (const [yol, k] of gruplar[tur].sort()) {
      console.log(`  ${yol}`);
      console.log(`     sayfa: ${[...k.sayfa].join(', ')}`);
      for (const a of k.alt) console.log(`     alt  : ${a.slice(0, 100)}`);
    }
    console.log('');
  }
}
