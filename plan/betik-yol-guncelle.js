/* Onarım/üretim betiklerindeki SABİT eski adresleri yeni adreslere çevirir.
 *
 * ⚠ NEDEN GEREKLİ: onarım betikleri sayfa yollarını sabit yazıyor
 *   ('/hizmetler/seo/teknik-seo/': [...]). Adresler düzleşince bu anahtarlar
 *   hiçbir sayfaya denk gelmez; betik SESSİZCE HİÇBİR ŞEY YAPMAZ ve "0 sayfa"
 *   der. Ölçüldü: taşımadan sonra "hizmet sayfası dış kaynağı" ve "kaynak
 *   bağlantısı görünümü" turları boş döndü. İçerik zaten sayfalarda duruyor,
 *   ama betikler bir daha koşulamaz hâle gelmişti.
 *
 * ⚠ TAŞIMA BETİKLERİ HARİÇ: duz-url-tasi.js, yeni-yapi-fark.js,
 *   duz-url-cakisma.js, tasima-kapsam-olc.js, hizmet-yapi-teshis.js ve
 *   canli-url-envanteri.js eski adresleri BİLEREK taşıyor (işleri bu).
 *   Onlara dokunulmaz.
 *
 * Kullanım: node plan/betik-yol-guncelle.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const UYGULA = process.argv.includes('--uygula');
const H = JSON.parse(fs.readFileSync(path.join(__dirname, 'yeni-url-haritasi.json'), 'utf8'));

const ESLEME = new Map();
Object.entries(H.hizmetler).forEach(([eski, o]) => ESLEME.set(eski, o.yeni));
ESLEME.set('/hizmetler/web-tasarim-yazilim/ai-entegrasyonu/', '/yapay-zeka/');
ESLEME.set('/hizmetler/video-produksiyon/ai-destekli-produksiyon/', '/ai-video-produksiyon/');
/* en uzun eşleşme önce — önek tuzağı */
const SIRALI = [...ESLEME.entries()].sort((a, b) => b[0].length - a[0].length);

const HARIC = new Set(['duz-url-tasi.js', 'yeni-yapi-fark.js', 'duz-url-cakisma.js',
  'tasima-kapsam-olc.js', 'hizmet-yapi-teshis.js', 'canli-url-envanteri.js',
  'betik-yol-guncelle.js', 'sayfa-turu.js', 'kalinti-bul.js']);

const betikler = fs.readdirSync(__dirname)
  .filter((f) => f.endsWith('.js') && !HARIC.has(f));

let dosya = 0, degisim = 0;
const rapor = [];
for (const b of betikler) {
  const p = path.join(__dirname, b);
  const h = fs.readFileSync(p, 'utf8');
  let n = 0;
  /* hem '/hizmetler/x/y/' hem 'hizmetler/x/y' biçimleri */
  let c = h;
  for (const [eski, yeni] of SIRALI) {
    const eskiTemiz = eski.replace(/^\/|\/$/g, '');
    const yeniTemiz = yeni.replace(/^\/|\/$/g, '');
    const desenler = [
      [eski, yeni],                                   /* /hizmetler/seo/teknik-seo/ */
      [eskiTemiz + '/', yeniTemiz + '/'],             /* hizmetler/seo/teknik-seo/ */
      [eskiTemiz, yeniTemiz],                         /* hizmetler/seo/teknik-seo  */
    ];
    for (const [a, y] of desenler) {
      if (!c.includes(a)) continue;
      const kac = c.split(a).length - 1;
      c = c.split(a).join(y);
      n += kac;
    }
  }
  if (!n) continue;
  dosya++; degisim += n;
  rapor.push(`  ${b.padEnd(32)} ${n} değişim`);
  if (UYGULA) fs.writeFileSync(p, c, 'utf8');
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — betiklerdeki sabit adresler\n`);
rapor.forEach((r) => console.log(r));
console.log(`\n  ${dosya} betik · ${degisim} değişim`);
console.log(`  dokunulmayan (taşıma araçları): ${[...HARIC].join(', ')}`);
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
