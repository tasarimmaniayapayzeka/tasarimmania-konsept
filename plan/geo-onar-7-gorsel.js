/* GEO onarım — Aşama 7: görseller
 *
 *   A. loading/fetchpriority eksik 78 görsel. Ölçüm: 77'si ÜST MENÜ logosu,
 *      1'i /hakkimizda/ kahraman fonu. İkisi de ekranın üstünde duruyor —
 *      oraya loading="lazy" koymak yükleme sırasını GERİLETİR, LCP'yi bozar.
 *      Doğru öznitelik fetchpriority="high". Altbilgi logosunda zaten lazy var.
 *
 *   B. Görsel sitemap yok. Ayrı dosya + sitemap dizini üretilir; var olan
 *      sitemap.xml'e dokunulmaz (blog-kaydet.js onu <url> bloğu ekleyip
 *      çıkararak yönetiyor, araya image düğümü sokmak o mantığı kırardı).
 *
 * ⚠ Sitemap'e yalnız GERÇEKTEN sayfada gösterilen görseller yazılır; assets
 *   klasörünü topluca taramak, hiçbir sayfada kullanılmayan dosyaları da
 *   listelerdi.
 *
 * Kullanım: node plan/geo-onar-7-gorsel.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const KANONIK = 'https://www.tasarimmania.com';

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const dosyalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const kacir = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/* ═══ A. fetchpriority ═══ */
let eklenen = 0, etkilenenSayfa = 0;
for (const f of dosyalar) {
  const once = fs.readFileSync(f, 'utf8');
  let n = 0;
  const h = once.replace(/<img\b[^>]*?>/g, (t) => {
    if (/loading=|fetchpriority=/.test(t)) return t;
    n++;
    return t.replace(/\s*\/?>$/, ' fetchpriority="high">');
  });
  if (n) {
    eklenen += n; etkilenenSayfa++;
    if (UYGULA) fs.writeFileSync(f, h, 'utf8');
  }
}

/* ═══ B. görsel sitemap ═══ */
const sayfaGorselleri = [];
const disarida = new Set();
let toplamGorsel = 0;
for (const f of dosyalar) {
  const h = fs.readFileSync(f, 'utf8');
  const sayfaUrl = KANONIK + u(f);
  const gorseller = new Map();                 /* mutlak url → alt metin */

  /* ⚠ YALNIZ GÖVDE: üst menü ve altbilgi logosu her sayfada aynı. İlk sürüm
     hepsini yazdı ve 216 girdinin 77'si tek bir logo oldu — sitemap'i şişiren,
     hiçbir sayfaya özgü olmayan gürültü. Görsel sitemap İÇERİK görselleri için. */
  const mb = h.indexOf('<main'); const ft = h.lastIndexOf('</main>');
  const govde = mb < 0 ? h : h.slice(mb, ft > mb ? ft : undefined);

  for (const m of govde.matchAll(/<img\b[^>]*>/g)) {
    const src = (m[0].match(/\ssrc="([^"]+)"/) || [])[1];
    if (!src || /^data:/.test(src)) continue;
    /* alt="" = "bu görsel süstür, ekran okuyucu atlasın" demek. Sitede 18 tanesi
       böyle işaretli (modül ikonları, kahraman fonu) ve hepsi bilinçli. Süs
       görselini sitemap'e yazmak, arama motoruna "bunu indeksle" demek olur. */
    const alt = (m[0].match(/\salt="([^"]*)"/) || ['', ''])[1];
    if (!alt) { disarida.add(src.replace(/^.*\//, '') + ' (alt="" süs)'); continue; }

    /* Göreli yolu kanonik mutlak URL'ye çevir.
       ⚠ İKİ AYRI KÖK VAR: sayfalar site/ altında, görsel varlıkları ise depo
       kökündeki assets/ klasöründe. site/ tabanlı çözüm assets için ".." ile
       web kökünün üstüne çıkıyordu ve ilk sürüm bu 50 görseli eleyip yalnız
       blog görsellerini listeledi — ölçüldü. Doğrusu: site/ dışına çıkan yolu
       DEPO köküne göre çözmek; gerçek yayında assets/ web kökünün yanında. */
    let mutlak;
    if (/^https?:/.test(src)) mutlak = src;
    else {
      const gercek = path.normalize(path.join(path.dirname(f), src));
      const siteIci = path.relative(S, gercek);
      mutlak = KANONIK + '/' + (siteIci.startsWith('..')
        ? path.relative(KOK, gercek).split(path.sep).join('/')
        : siteIci.split(path.sep).join('/'));
    }
    if (mutlak.includes('/..')) { disarida.add(mutlak.replace(/^.*\//, '')); continue; }
    if (!gorseller.has(mutlak)) gorseller.set(mutlak, alt);
  }
  if (gorseller.size) { sayfaGorselleri.push([sayfaUrl, gorseller]); toplamGorsel += gorseller.size; }
}

const gorselXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  + '<!--\n  TasarımMania — görsel sitemap\n'
  + '  Yalnız sayfalarda GERÇEKTEN gösterilen görseller. assets/ klasörünü\n'
  + '  topluca taramak, hiçbir yerde kullanılmayan dosyaları da listelerdi.\n'
  + '  Üreten: plan/geo-onar-7-gorsel.js — elle düzenlemeyin.\n-->\n'
  + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  + '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
  + sayfaGorselleri.map(([sy, gs]) => '  <url>\n    <loc>' + kacir(sy) + '</loc>\n'
    + [...gs].map(([g, alt]) => '    <image:image>\n      <image:loc>' + kacir(g) + '</image:loc>\n'
      + (alt ? '      <image:title>' + kacir(alt) + '</image:title>\n' : '')
      + '    </image:image>\n').join('')
    + '  </url>\n').join('')
  + '</urlset>\n';

const dizinXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  + '<!--\n  Sitemap dizini: sayfa haritası + görsel haritası.\n'
  + '  İndeksleme açıldığında robots.txt bu dosyayı göstermeli.\n-->\n'
  + '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + `  <sitemap><loc>${KANONIK}/sitemap.xml</loc></sitemap>\n`
  + `  <sitemap><loc>${KANONIK}/sitemap-gorsel.xml</loc></sitemap>\n`
  + '</sitemapindex>\n';

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'}\n`);
console.log(`  A. fetchpriority="high"  ·  ${eklenen} görsel · ${etkilenenSayfa} sayfa`);
console.log(`  B. sitemap-gorsel.xml    ·  ${sayfaGorselleri.length} sayfa · ${toplamGorsel} görsel`);
console.log('  B. sitemap-index.xml     ·  2 harita');
if (disarida.size) console.log(`
  ⚠ listeye GİRMEYEN ${disarida.size} görsel (assets/ web kökünün dışında):
     ${[...disarida].join(', ')}`);
if (UYGULA) {
  fs.writeFileSync(path.join(S, 'sitemap-gorsel.xml'), gorselXml, 'utf8');
  fs.writeFileSync(path.join(S, 'sitemap-index.xml'), dizinXml, 'utf8');
}
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
