/* İNFOGRAFİKLERİN DAR EKRAN ONARIMI
 *
 * SORUN (ölçüldü): SVG'ler width:100% ile küçüldüğü için içlerindeki yazı da
 * küçülüyordu. 390px ekranda en küçük yazı:
 *     hub grafikleri (viewBox 620)   → 4.4 – 5.1 px
 *     alt sayfa şeritleri (vB 1200)  → 2.4 px
 * 768px'te bile hiçbiri 9px eşiğine ulaşmıyordu. Yani grafikler yalnız geniş
 * masaüstünde okunuyordu.
 *
 * ÇÖZÜM: sitenin ZATEN kullandığı desen — blog karşılaştırma tablolarında
 * .yz-tablo{overflow-x:auto} + table{min-width:520px}. Aynısı burada:
 * dar ekranda kapsayıcı yatay kayar, SVG okunur asgari genişliğini korur.
 *
 * ASGARİ GENİŞLİK HESABI (en küçük yazı >= 9px olacak şekilde):
 *   hub   : en küçük yazı ~9.6 viewBox birimi → 620 * (9/9.6) ≈ 582 → 600px
 *   şerit : en küçük yazı ~9.6 viewBox birimi → 1200 * (9/9.6) ≈ 1125 → 1140px
 *
 * Kaydırma ipucu, yalnız kaydırmanın etkin olduğu genişlikte görünür.
 *
 * Kullanım: node plan/grafik-mobil-onar.js [--kuru]
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const KURU = process.argv.includes('--kuru');

/* KAPSAM NOTU — alt sayfalar bu betikten ÇIKARILDI.
   Bu betik önce hem hub grafiklerine hem de web alt sayfalarındaki yatay
   şeride yatay kaydırma uyguluyordu. Kaydırma okunurluğu düzeltti ama
   kullanıcı "box box açılsın tek tek mobilde" dedi: alt sayfalardaki şerit
   üç ayrı kutuya bölündü ve mobilde alt alta açılıyor (bkz. .akis-izgara).
   Orada artık kaydırma YOK, dolayısıyla bu betiğin işi kalmadı.
   Hub grafikleri tek parça bir arayüz maketi — bölünemez, kaydırma
   onlarda hâlâ doğru çözüm. */
const HEDEF = ['seo', 'web-tasarim-yazilim', 'mobil-uygulama', 'dijital-pazarlama', 'video-produksiyon']
  .map((s) => ({ p: 'site/hizmetler/' + s + '/index.html', sinif: 'serp', kirilim: 1000, min: 620 }));

const ISARET = '/* GRAFIK-MOBIL-ONARIM */';

function css(sinif, kirilim, min) {
  return `
${ISARET}
/* Dar ekranda grafik küçülünce yazısı okunmaz oluyordu (ölçüm: 390px'te
   ${sinif === 'serp' ? '4.4-5.1' : '2.4'}px). Sitenin tablo deseni: kapsayıcı yatay kayar,
   SVG okunur asgari genişliğini korur. */
.${sinif}-kaydir{display:none;font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--acc);margin:0 0 10px;opacity:.85}
@media(max-width:${kirilim}px){
  .${sinif}{overflow:auto hidden;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}
  .${sinif} svg{min-width:${min}px}
  .${sinif}-kaydir{display:block}
}`;
}

let yapildi = 0, atlandi = 0;
const hata = [];

HEDEF.forEach(({ p, sinif, kirilim, min }) => {
  const tam = path.join(KOK, p);
  if (!fs.existsSync(tam)) { hata.push(p + ' → dosya yok'); return; }
  let h = fs.readFileSync(tam, 'utf8');
  if (h.includes(ISARET)) { atlandi++; return; }

  /* 1) CSS'i </style> öncesine ekle */
  const styleSon = h.lastIndexOf('</style>');
  if (styleSon === -1) { hata.push(p + ' → </style> yok'); return; }
  h = h.slice(0, styleSon) + css(sinif, kirilim, min) + '\n' + h.slice(styleSon);

  /* 2) ipucu satırını figure içine, svg'den ÖNCE ekle */
  const figRe = new RegExp('(<figure class="' + sinif + '[^"]*">\\s*)(<svg)');
  if (!figRe.test(h)) { hata.push(p + ' → figure.' + sinif + ' bulunamadı'); return; }
  h = h.replace(figRe, '$1<span class="' + sinif + '-kaydir" aria-hidden="true">Yatay kaydırın →</span>\n        $2');

  if (!KURU) fs.writeFileSync(tam, h, 'utf8');
  yapildi++;
  console.log('  ' + p.replace('site/hizmetler/', '').padEnd(46) + '.' + sinif + '  min-width ' + min + 'px  kırılım ' + kirilim);
});

console.log('');
console.log('onarılan : ' + yapildi);
console.log('zaten var: ' + atlandi);
console.log('sorunlu  : ' + hata.length);
hata.forEach((x) => console.log('   ' + x));
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '\nYAZILDI');
