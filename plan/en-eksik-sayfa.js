/* en-eksik-sayfa.js — İngilizcesi HENÜZ ÜRETİLMEMİŞ Türkçe sayfaları listeler.
 *
 * hreflang betiği yalnızca sayı veriyor ("43 sayfanın İngilizcesi yok").
 * Bu betik hangileri olduğunu tür tür gösterir ki kalan iş görünür olsun.
 *
 *   node plan/en-eksik-sayfa.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'site');
const harita = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));

/* Türkçe yol → İngilizce yol (bölüm adı ne olursa olsun). */
const en = new Map();
for (const [bolum, girdiler] of Object.entries(harita)) {
  if (bolum.startsWith('_') || typeof girdiler !== 'object') continue;
  for (const [tr, d] of Object.entries(girdiler)) {
    if (tr.startsWith('_')) continue;
    if (d && typeof d === 'object' && d.en) en.set(tr, d.en);
  }
}

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

const diskte = ['/', ...trSayfalar(SITE)];
const eksik = { blog: [], hizmet: [], kurumsal: [], haritasiz: [] };

for (const tr of diskte) {
  const hedef = tr === '/' ? '/en/' : en.get(tr);
  if (!hedef) { eksik.haritasiz.push(tr); continue; }
  const varMi = fs.existsSync(path.join(SITE, hedef.replace(/^\//, ''), 'index.html'));
  if (varMi) continue;
  if (tr.startsWith('/blog/') && tr !== '/blog/') { eksik.blog.push(`${tr}  →  ${hedef}`); continue; }
  if (/^\/(seo|web-tasarim|sosyal-medya|google-ads|meta-reklam|video-produksiyon|yapay-zeka|dijital-pazarlama|performans-pazarlama|mobil-uygulama|ios-android-uygulama|react-native|uygulama-arayuz-tasarimi|aso|grafik-tasarim|teknik-seo|seo-icerik|yerel-seo|e-ticaret-seo|cok-dilli-seo|reklam-filmi|urun-videosu|reels-video|ai-video-produksiyon|kurumsal-web-sitesi|e-ticaret|ozel-yazilim|site-bakim)\/$/.test(tr))
    eksik.hizmet.push(`${tr}  →  ${hedef}`);
  else eksik.kurumsal.push(`${tr}  →  ${hedef}`);
}

const say = (a) => a.length;
console.log('');
console.log(`  diskteki Türkçe sayfa: ${diskte.length}`);
console.log('');
console.log(`  HİZMET sayfası eksik : ${say(eksik.hizmet)}`);
for (const s of eksik.hizmet) console.log(`     ✗ ${s}`);
console.log(`  KURUMSAL sayfa eksik : ${say(eksik.kurumsal)}`);
for (const s of eksik.kurumsal) console.log(`     ✗ ${s}`);
console.log(`  BLOG yazısı eksik    : ${say(eksik.blog)}   (slug'lar İngilizce odak kelimeden türetilecek)`);
if (eksik.haritasiz.length) {
  console.log(`  HARİTADA HİÇ YOK     : ${say(eksik.haritasiz)}`);
  for (const s of eksik.haritasiz) console.log(`     ! ${s}`);
}
console.log('');
console.log(`  TOPLAM eksik: ${say(eksik.hizmet) + say(eksik.kurumsal) + say(eksik.blog) + say(eksik.haritasiz)}`);
console.log('');
