/* en-blog-liste.js — 42 blog yazısının Türkçe slug'ı, başlığı ve boyutu.
 *
 * Slug haritası yazılmadan önce hangi yazının hangi başlık olduğunu ve
 * çevrilecek kayıt sayısını görmek için.
 *
 *   node plan/en-blog-liste.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const BLOG = path.join(__dirname, '..', 'site', 'blog');

const yazilar = fs.readdirSync(BLOG)
  .filter((ad) => fs.existsSync(path.join(BLOG, ad, 'index.html')))
  .sort();

console.log('');
console.log(`  ${yazilar.length} blog yazısı\n`);
console.log('  slug'.padEnd(42) + 'kayıt  kelime   başlık');
console.log('  ' + '─'.repeat(112));

let toplamKayit = 0, toplamKelime = 0;
for (const slug of yazilar) {
  const h = fs.readFileSync(path.join(BLOG, slug, 'index.html'), 'utf8');
  const baslik = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1]
    .replace(/<[^>]+>/g, '').trim();

  /* Kayıt sayısını üreticinin kendi çıkarıcısıyla ölç — tahmin değil. */
  let kayit = '?';
  try {
    const cikti = execFileSync(process.execPath,
      [path.join(__dirname, 'en-metin-cikar.js'), `blog/${slug}`, '--json'],
      { encoding: 'utf8' });
    kayit = (cikti.match(/(\d+) kayıt/) || [, '?'])[1];
  } catch { /* çıkarıcı bu yolu tanımıyorsa boş bırak */ }

  const kelime = h.replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/).filter(Boolean).length;

  if (kayit !== '?') toplamKayit += Number(kayit);
  toplamKelime += kelime;
  console.log('  ' + slug.padEnd(40) + String(kayit).padStart(5) + String(kelime).padStart(8) + '   ' + baslik);
}

console.log('  ' + '─'.repeat(112));
console.log('  ' + 'TOPLAM'.padEnd(40) + String(toplamKayit).padStart(5) + String(toplamKelime).padStart(8));
console.log('');
