/* en-harita-eksik.js — Türkçe sayfa var ama en-url-haritasi.json'da karşılığı YOK.
 *
 * İki kez ölçülmüş hata: /hizmetler/ ve /ai-video-produksiyon/ haritada
 * atlanmıştı; ikisi de ancak üretici "adres haritada yok" deyip durunca
 * ortaya çıktı. Bu betik aynı boşluğu ÖNCEDEN gösterir.
 *
 *   node plan/en-harita-eksik.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'site');
const harita = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));

/* Haritadaki tüm Türkçe yollar — bölüm adı ne olursa olsun. */
const haritali = new Set();
for (const [bolum, girdiler] of Object.entries(harita)) {
  if (bolum.startsWith('_') || typeof girdiler !== 'object') continue;
  for (const [tr, deger] of Object.entries(girdiler)) {
    if (tr.startsWith('_')) continue;
    if (deger && typeof deger === 'object' && deger.en) haritali.add(tr);
  }
}

/* Diskteki Türkçe sayfalar — /en/ ve /blog/ hariç. */
function trSayfalar(dizin, on = '') {
  const cikti = [];
  for (const ad of fs.readdirSync(dizin)) {
    const tam = path.join(dizin, ad);
    if (!fs.statSync(tam).isDirectory()) continue;
    if (on === '' && (ad === 'en' || ad === 'varlik' || ad.startsWith('.'))) continue;
    if (fs.existsSync(path.join(tam, 'index.html'))) cikti.push(`${on}/${ad}/`);
    cikti.push(...trSayfalar(tam, `${on}/${ad}`));
  }
  return cikti;
}

/* Blog YAZILARI haritada tek tek yer almaz (slug kuralı var); /blog/ dizin
 * sayfasının kendisi ise haritada — filtre onu düşürmemeli. */
const diskte = trSayfalar(SITE).filter((y) => y === '/blog/' || !y.startsWith('/blog/'));
const eksik = diskte.filter((y) => !haritali.has(y));
const oksuz = [...haritali].filter((y) => y !== '/' && !diskte.includes(y));

console.log('');
console.log(`  diskte Türkçe sayfa (blog hariç): ${diskte.length}`);
console.log(`  haritada karşılığı olan         : ${diskte.length - eksik.length}`);
console.log('');
if (eksik.length) {
  console.log(`  HARİTADA YOK: ${eksik.length}`);
  for (const y of eksik) console.log(`     ✗ ${y}`);
} else {
  console.log('  ✓ diskteki her Türkçe sayfanın haritada karşılığı var');
}
if (oksuz.length) {
  console.log('');
  console.log(`  HARİTADA VAR AMA DİSKTE YOK: ${oksuz.length}  (yazılmamış sayfa olabilir)`);
  for (const y of oksuz) console.log(`     · ${y}`);
}
console.log('');
