/* DAR EKRAN DÜZELTMESİNİ 23 .akis SAYFASINA YAY
 *
 * SORUN (ölçüldü, iframe ile gerçek dar viewport'ta): 320px ekranda .akis
 * grafiğinin en küçük yazısı 7,68 px — 9 px eşiğinin altında.
 *
 * ÖLÇÜM TUZAĞI 1: headless Chrome `--window-size` ile 500 px'in ALTINA
 * İNMİYOR. 320/360/375/390 istendiğinde dördü de innerWidth 500 döndürüyor.
 * Bu yüzden dar ekran ancak <iframe> genişliği ayarlanarak ölçülebiliyor.
 *
 * ÖLÇÜM TUZAĞI 2: iframe'in dikey kaydırma çubuğu 15 px yiyor ve sonucu
 * karamsar gösteriyor (320'de wrap 305 ölçülüyor). Gerçek telefonda çubuk
 * bindirmelidir, 0 px yer kaplar. Bu yüzden iframe yüksekliği içeriğe
 * eşitlenip çubuk kaldırılmalı. Çubuklu ölçüm "360 da kalıyor" diyordu;
 * çubuksuz ölçümde 360 zaten geçiyor (9,03).
 *
 * ÇÖZÜM: SVG'ler yeniden çizilmiyor. Negatif margin ile figür sayfa
 * oluğunun (wrap 24px) içine taşırılıp grafiğe alan açılıyor — yalnız BU
 * figür kenara yaklaşıyor, sayfanın geri kalanı oluğunu koruyor.
 *
 * SONUÇ (teknik-seo, çubuksuz):
 *   320px  7,68 → 9,03      360px  9,03 → 10,38      375px  9,54 → 10,88
 *
 * Kullanım: node plan/dar-ekran-yay.js [--kuru]
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const HIZ = path.join(KOK, 'site/hizmetler');
const KURU = process.argv.includes('--kuru');

const YENI_YORUM = `/* DAR-EKRAN-DOLGU */
/* ÖLÇÜLDÜ (iframe ile gerçek dar viewport'ta; headless Chrome --window-size
   ile 500px'in ALTINA İNMİYOR, ayrıca iframe kaydırma çubuğu 15px yiyor —
   ikisi de giderilerek ölçüldü):
       320px  7,68 → 9,03      360px  9,03 → 10,38      375px  9,54 → 10,88
   9px eşiği yalnız 320px'te kalıyordu. Negatif margin figürü sayfa oluğunun
   (wrap 24px) içine taşırıyor: YALNIZ bu figür kenara yaklaşıyor, sayfanın
   geri kalanı oluğunu koruyor. SVG'ler yeniden çizilmedi. */`;

const YENI_BLOK = `@media(max-width:400px){
  .akis{margin-inline:-14px;padding:8px}
  .akis-kutu{padding:6px;gap:8px}
}`;

const sayfalar = [];
(function tara(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return tara(p);
    if (e.name !== 'index.html') return;
    if (fs.readFileSync(p, 'utf8').includes('class="akis-izgara"')) sayfalar.push(p);
  });
})(HIZ);

let degisen = 0, zaten = 0;
const hata = [];

sayfalar.sort().forEach((p) => {
  let h = fs.readFileSync(p, 'utf8');
  const ad = path.relative(HIZ, p).split(path.sep).join('/').replace('/index.html', '');

  if (h.includes('margin-inline:-14px')) { zaten++; return; }

  /* eski yorum bloğu (varsa) + 400px medya bloğu birlikte değiştirilir */
  const yorumRe = /\/\* DAR-EKRAN-DOLGU \*\/[\s\S]*?(?=@media\(max-width:400px\))/;
  const blokRe = /@media\(max-width:400px\)\{[^{}]*\.akis\{[\s\S]*?\n\}/;

  const blok = h.match(blokRe);
  if (!blok) { hata.push(ad + ' → 400px bloğu bulunamadı'); return; }

  if (yorumRe.test(h)) h = h.replace(yorumRe, YENI_YORUM + '\n');
  else h = h.replace(blokRe, YENI_YORUM + '\n' + blok[0]);

  h = h.replace(blokRe, YENI_BLOK);

  if (!KURU) fs.writeFileSync(p, h, 'utf8');
  degisen++;
  console.log('  ✓ ' + ad);
});

console.log('');
console.log('  değişen : ' + degisen);
console.log('  zaten   : ' + zaten);
console.log('  sorunlu : ' + hata.length);
hata.forEach((x) => console.log('     ' + x));
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '\nYAZILDI');
