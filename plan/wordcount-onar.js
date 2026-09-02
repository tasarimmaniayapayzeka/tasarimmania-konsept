/* Article.wordCount ONARIMI — 27 yazının HEPSİNDE şemadaki değer yanlıştı
 * (çoğunda 50-100 kelime eksik). Üreteç bu sayıyı JSON kaynak metninden
 * hesaplıyordu; oysa sayfada basılan gövde tablo, liste ve SSS metnini de
 * içeriyor. Yapısal veride gerçeğe uymayan bir sayı bildirilmiş oluyordu.
 *
 * DOĞRU TANIM (schema.org): "The number of words in the text of the Article."
 * Kaynak olarak seo-denetim.js'in ölçtüğü gövde kelime sayısını kullanıyoruz —
 * köprü (CTA) kartı hariç, yazının kendi metni.
 *
 * GÜVENLİK: yalnız "wordCount": <sayı> alanına dokunur. Yazdıktan sonra tüm
 * ld+json blokları JSON.parse ile doğrulanır; bozulursa dosya YAZILMAZ.
 *
 * Kullanım: node plan/wordcount-onar.js [--kuru]
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const KURU = process.argv.includes('--kuru');

const HARITA = JSON.parse(fs.readFileSync(path.join(KOK, 'plan/blog-uretim-haritasi.json'), 'utf8'));
const YAZILAR = HARITA.yazilar || HARITA.makaleler || HARITA;

let duzeltilen = 0, zatenDogru = 0;
const hata = [];

YAZILAR.forEach((y) => {
  const p = path.join(KOK, 'site/blog/' + y.slug + '/index.html');
  if (!fs.existsSync(p)) { hata.push(y.slug + ' → dosya yok'); return; }

  let m;
  try {
    m = JSON.parse(execSync(
      'node "' + path.join(KOK, 'plan/seo-denetim.js') + '" "' + p + '" "' + y.odak + '"',
      { encoding: 'utf8' }));
  } catch (e) { hata.push(y.slug + ' → denetim çöktü'); return; }

  const gercek = m['3_prose(1000-1200,kopruHaric)'];
  if (!Number.isInteger(gercek) || gercek < 200) { hata.push(y.slug + ' → ölçüm anlamsız: ' + gercek); return; }

  let h = fs.readFileSync(p, 'utf8');
  const mevcut = (h.match(/"wordCount":\s*(\d+)/) || [])[1];
  if (mevcut === undefined) { hata.push(y.slug + ' → wordCount alanı yok'); return; }
  if (+mevcut === gercek) { zatenDogru++; return; }

  const once = h;
  h = h.replace(/("wordCount":\s*)\d+/, '$1' + gercek);
  if (h === once) { hata.push(y.slug + ' → değiştirilemedi'); return; }

  /* JSON geçerliliği — bozarsak yazma */
  let gecerli = true;
  [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .forEach((s) => { try { JSON.parse(s[1]); } catch (e) { gecerli = false; } });
  if (!gecerli) { hata.push(y.slug + ' → ŞEMA BOZULDU, yazılmadı'); return; }

  if (!KURU) fs.writeFileSync(p, h, 'utf8');
  console.log('  ' + y.slug.padEnd(42) + mevcut + ' → ' + gercek);
  duzeltilen++;
});

console.log('');
console.log('düzeltilen  : ' + duzeltilen);
console.log('zaten doğru : ' + zatenDogru);
console.log('sorunlu     : ' + hata.length);
hata.forEach((x) => console.log('   ' + x));
console.log(KURU ? '\n(KURU KOŞU — yazılmadı)' : '\nYAZILDI');
