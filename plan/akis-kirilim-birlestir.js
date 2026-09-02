/* AKIŞ KIRILIMINI TEK DESENDE BİRLEŞTİR
 *
 * SORUN: her ajan kendi çözümünü uydurdu, üç farklı varyant oluştu:
 *   11 sayfa : @media(max-width:860px), sınır yok
 *    2 sayfa : @media(max-width:1100px) + .akis-kutu svg{max-width:520px}
 *    1 sayfa : @media(max-width:1120px) + .akis-kutu{max-width:520px}
 *
 * ÖLÇÜM (ajanların bulgusu, doğrulandı): 861-1100px arasında (tablet) beş
 * sütunlu ızgara kutuları ~192px'e sıkıştırıyor, yazı 6.59px'e düşüyor.
 * 860px kırılımı bu aralığı açıkta bırakıyordu.
 *
 * SEÇİLEN DESEN — ozel-yazilim'inki, çünkü gerekçesi en sağlam:
 *   kırılım 1100px  → tablette de tek sütun
 *   sınır KUTUYA    → SVG'ye konsaydı numara/ad etiketi hizadan kaçardı
 *   max-width 520px → sınırsızken 1119px ekranda SVG 991px'e yayılıp
 *                     kutu 1043px yükseliyordu (ölçüldü)
 *
 * Kullanım: node plan/akis-kirilim-birlestir.js [--kuru]
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const KURU = process.argv.includes('--kuru');

const HEDEF_BLOK = `@media(max-width:1100px){
  .akis-izgara{grid-template-columns:1fr;gap:10px}
  .akis-ok svg{transform:rotate(90deg)}
  .akis{padding:14px}
  .akis-kutu{width:100%;max-width:520px;margin-inline:auto}
}`;

function sayfalar() {
  const kok = path.join(KOK, 'site/hizmetler');
  const liste = [];
  (function tara(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) return tara(p);
      if (e.name !== 'index.html') return;
      if (fs.readFileSync(p, 'utf8').includes('class="akis-izgara"')) liste.push(p);
    });
  })(kok);
  return liste;
}

let duzeltilen = 0, zaten = 0;
const hata = [];

sayfalar().forEach((p) => {
  let h = fs.readFileSync(p, 'utf8');
  const kisa = path.relative(path.join(KOK, 'site/hizmetler'), p).replace(/\\/g, '/').replace('/index.html', '');

  /* mevcut yığılma bloğunu bul: .akis-izgara'yı tek sütuna alan media */
  const re = /@media\(max-width:\d+px\)\{[^{}]*\.akis-izgara\{grid-template-columns:1fr[\s\S]*?\n\}/;
  const m = h.match(re);
  if (!m) { hata.push(kisa + ' → yığılma bloğu bulunamadı'); return; }

  if (m[0] === HEDEF_BLOK) { zaten++; return; }

  const eskiKirilim = (m[0].match(/max-width:(\d+)px/) || [])[1];
  h = h.replace(m[0], HEDEF_BLOK);

  /* ajanların eklediği tekil sınır kurallarını temizle (artık blokta) */
  h = h.replace(/\n\s*\.akis-kutu svg\{max-width:520px;margin-inline:auto\}/g, '');

  if (!KURU) fs.writeFileSync(p, h, 'utf8');
  duzeltilen++;
  console.log('  ' + kisa.padEnd(44) + eskiKirilim + 'px → 1100px');
});

console.log('');
console.log('düzeltilen : ' + duzeltilen);
console.log('zaten doğru: ' + zaten);
console.log('sorunlu    : ' + hata.length);
hata.forEach((x) => console.log('   ' + x));
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '\nYAZILDI');
