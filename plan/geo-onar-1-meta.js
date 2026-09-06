/* GEO onarım — Aşama 1: head meta alanları
 *
 * Rehberin istediği ve sitede eksik olanlar:
 *   · meta author            (76/77 yok)
 *   · max-snippet / max-image-preview / max-video-preview  (77/77 yok)
 *   · meta theme-color       (76/77 yok)
 *   · meta referrer          (77/77 yok)
 *   · twitter:title / description / image:alt  (76/77 yok)
 *   · og:image:alt           (34 statik sayfada yok)
 *
 * ⚠ ROBOTS ETİKETİNE DOKUNULMAZ. noindex-uygula.js --ac betiği
 *   <meta name="robots" content="noindex,nofollow"> dizgesini BİREBİR arıyor;
 *   içine max-* eklenirse indekslemeyi açma betiği kırılır. Bu yüzden max-*
 *   ayrı bir <meta name="googlebot"> etiketine yazılıyor — Google'ın kabul
 *   ettiği standart yol.
 *
 * Kullanım: node plan/geo-onar-1-meta.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

const EK_META = [
  '<meta name="author" content="TasarımMania">',
  '<meta name="googlebot" content="max-snippet:-1,max-image-preview:large,max-video-preview:-1">',
  '<meta name="theme-color" content="#0B0D12">',
  '<meta name="referrer" content="strict-origin-when-cross-origin">',
];
const OG_ALT_VARSAYILAN = 'TasarımMania — web, mobil, reklam, video ve SEO hizmetleri kapak görseli';

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const url = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const kacir = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/* ⚠ İLK SÜRÜM blog sayfalarını DIŞLIYORDU: "onlar üreticiden gelir" varsayımıyla.
   Ölçüm bunu çürüttü — 15 yeni yazı üreticiden geliyor ama ESKİ 27 yazının
   yapılandırma dosyası yok, yeniden üretilemiyorlar. Sonuç: 27 blog sayfası
   meta alanlarını hiç almadı. Artık betik TÜM sayfaları geziyor; zaten var olan
   etiketi atladığı için üreticiden gelenlere iki kez eklemesi de mümkün değil. */
const statik = tara(S).filter((f) => fs.statSync(f).size >= 2000);

let n = 0;
const rapor = [];
for (const f of statik) {
  let h = fs.readFileSync(f, 'utf8');
  const once = h;
  const isler = [];

  /* --- ek meta alanları: canonical'dan hemen sonra --- */
  const capa = h.match(/<link rel="canonical"[^>]*>/);
  if (capa) {
    const yeni = EK_META.filter((m) => {
      const ad = m.match(/name="([^"]+)"/)[1];
      return !new RegExp(`name="${ad}"`).test(h);
    });
    if (yeni.length) {
      h = h.replace(capa[0], capa[0] + '\n' + yeni.join('\n'));
      isler.push(`${yeni.length} meta`);
    }
  }

  /* --- og:image:alt --- */
  if (!/property="og:image:alt"/.test(h)) {
    const oi = h.match(/<meta property="og:image:height"[^>]*>|<meta property="og:image"[^>]*>/g);
    if (oi) {
      const son = oi[oi.length - 1];
      h = h.replace(son, son + `\n<meta property="og:image:alt" content="${kacir(OG_ALT_VARSAYILAN)}">`);
      isler.push('og:image:alt');
    }
  }

  /* --- twitter: başlık, açıklama, görsel alt --- */
  const ogT = (h.match(/property="og:title"\s+content="([^"]*)"/) || [])[1];
  const ogD = (h.match(/property="og:description"\s+content="([^"]*)"/) || [])[1];
  const ogA = (h.match(/property="og:image:alt"\s+content="([^"]*)"/) || [])[1] || OG_ALT_VARSAYILAN;
  const twImg = h.match(/<meta name="twitter:image"[^>]*>/);
  if (twImg && ogT && ogD) {
    const ekle = [];
    if (!/name="twitter:title"/.test(h)) ekle.push(`<meta name="twitter:title" content="${ogT}">`);
    if (!/name="twitter:description"/.test(h)) ekle.push(`<meta name="twitter:description" content="${ogD}">`);
    if (!/name="twitter:image:alt"/.test(h)) ekle.push(`<meta name="twitter:image:alt" content="${kacir(ogA)}">`);
    if (ekle.length) { h = h.replace(twImg[0], twImg[0] + '\n' + ekle.join('\n')); isler.push(`${ekle.length} twitter`); }
  }

  if (h !== once) { n++; rapor.push(`  ${url(f).padEnd(48)} ${isler.join(' · ')}`); if (UYGULA) fs.writeFileSync(f, h, 'utf8'); }
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — ${n}/${statik.length} statik sayfa\n`);
rapor.slice(0, 8).forEach((r) => console.log(r));
if (rapor.length > 8) console.log(`  … ${rapor.length - 8} sayfa daha`);
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
