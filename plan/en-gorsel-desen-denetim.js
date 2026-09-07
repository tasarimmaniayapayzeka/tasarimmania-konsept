/* en-gorsel-desen-denetim.js — blog görsel adlarının kural desenine uyup uymadığını ölçer.
 *
 * NEDEN: en-gorsel-ayir.js blog görsellerini SÖZLÜKTEN değil KURALDAN türetiyor:
 *   /blog/<tr-slug>/gorsel/<tr-slug>-<kapak|govde>-<en>.<uzantı>
 * /blog/e-ticaret-yazilimi/ bu desene UYMUYOR (uc-yol-1440.webp,
 * katalog-karmasikligi-1920.webp) ve 10 referans Türkçe klasöre işaret
 * ederek kaldı. Kilit yakaladı ama "kaç yazıda daha var?" sorusu ölçülmedi.
 *
 * Bu betik 42 TR blog yazısının HEPSİNİ tarar; kurala uymayan her dosyayı
 * yazı yazı listeler. Böylece tek tek çeviri sırasında sürprizle
 * karşılaşmak yerine eksik adlar önden görülür.
 *
 *   node plan/en-gorsel-desen-denetim.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..', 'site', 'blog');
const HARITA = require('./en-url-haritasi.json');
/* Kurala uymayan dosya, sözlüğe elle yazıldıysa sorun DEĞİL. İkisini
 * ayırmazsak betik kalıcı yanlış alarm üretir ve bakılmaz hâle gelir. */
const ISTISNA = new Set(Object.keys(require('./en-gorsel-ad.json').blog_istisna || {}));

/* slug → İngilizce slug (haritadan) */
function enSlug(trSlug) {
  const d = HARITA.blog && HARITA.blog['/blog/' + trSlug + '/'];
  if (!d || !d.en) return null;
  return d.en.replace(/^\/en\/blog\//, '').replace(/\/$/, '');
}

/* en-gorsel-ayir.js'in blog kuralı: <tr-slug>-<kapak|govde>-<ek> */
const DESEN = (trSlug) => new RegExp('^' + trSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-(kapak|govde)-');

let toplamDosya = 0, uyan = 0, istisnayla = 0;
const acikta = [];
const haritasiz = [];

for (const trSlug of fs.readdirSync(KOK)) {
  const gorselDizin = path.join(KOK, trSlug, 'gorsel');
  if (!fs.existsSync(gorselDizin)) continue;
  if (!enSlug(trSlug)) haritasiz.push(trSlug);
  const re = DESEN(trSlug);
  const kotu = [];
  for (const ad of fs.readdirSync(gorselDizin)) {
    toplamDosya++;
    if (re.test(ad)) { uyan++; continue; }
    if (ISTISNA.has(`/blog/${trSlug}/gorsel/${ad}`)) { istisnayla++; continue; }
    kotu.push(ad);
  }
  if (kotu.length) acikta.push({ trSlug, en: enSlug(trSlug), kotu });
}

const acikSayi = toplamDosya - uyan - istisnayla;
console.log('');
console.log(`  taranan blog görseli   : ${toplamDosya}`);
console.log(`  kurala uyan            : ${uyan}`);
console.log(`  sözlük istisnasıyla    : ${istisnayla}  (kural tutmuyor ama elle eşlendi)`);
console.log(`  KARŞILIKSIZ            : ${acikSayi}  ·  etkilenen yazı: ${acikta.length}`);
console.log('');
if (!acikta.length) console.log('  ✓ karşılığı olmayan blog görseli yok');
for (const u of acikta) {
  console.log(`  /blog/${u.trSlug}/  →  ${u.en || '⚠ HARİTADA YOK'}`);
  for (const k of u.kotu) console.log(`     ${k}`);
}
if (haritasiz.length) console.log(`\n  ⚠ haritada karşılığı olmayan yazı: ${haritasiz.join(', ')}`);
console.log('');
