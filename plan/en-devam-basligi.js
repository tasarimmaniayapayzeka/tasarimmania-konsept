/* en-devam-basligi.js — EN-DEVAM.md başlığındaki sayıları DİSKTEN yeniden yazar.
 *
 * NEDEN: sayfa sayısını elle güncellemek üç turda kaydı — başlık "60 sayfa
 * (34 + 26)" derken disk 62 (34 + 28) idi. Elle yazılan sayı, ölçülen sayı
 * değildir. Bu betik her tur sonunda çalıştırılır; sayıyı sayar, yazar.
 *
 * ⚠ SAYIM ÖZYİNELEMELİ OLMALI. İlk sürüm yalnız üst düzey klasörleri saydı
 *   ve /en/index.html ile /en/blog/index.html'i çift/eksik saydığı için 61
 *   dedi; en-son-tarama.js aynı anda 62 diyordu. İki sayı çelişince
 *   hangisinin doğru olduğunu aramak zaman kaybı — tek yöntem: aynı özyineli
 *   tarama.
 *
 *   node plan/en-devam-basligi.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const EN = path.join(__dirname, '..', 'site', 'en');

function sayfalar(dizin) {
  let n = 0;
  for (const ad of fs.readdirSync(dizin)) {
    const tam = path.join(dizin, ad);
    if (fs.statSync(tam).isDirectory()) n += sayfalar(tam);
    else if (ad === 'index.html') n++;
  }
  return n;
}

const blog = sayfalar(path.join(EN, 'blog'));      /* /en/blog/ + yazılar */
const toplam = sayfalar(EN);
const kok = toplam - blog;

const p = path.join(__dirname, 'EN-DEVAM.md');
let h = fs.readFileSync(p, 'utf8');
const yeni = `**${toplam} İngilizce sayfa canlı** (${kok} sayfa + ${blog} blog sayfası)`;
const oncesi = h;
h = h.replace(/\*\*\d+ İngilizce sayfa canlı\*\* \(\d+ sayfa \+ \d+ blog (?:yazısı|sayfası)\)/, yeni);
h = h.replace(/Bu kararlar \d+ sayfada uygulandı\./, `Bu kararlar ${toplam} sayfada uygulandı.`);
fs.writeFileSync(p, h);
console.log(`  ${yeni}  ·  ${h === oncesi ? 'değişiklik yok' : 'güncellendi'}`);
