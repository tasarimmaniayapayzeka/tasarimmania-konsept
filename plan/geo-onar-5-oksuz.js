/* GEO onarım — Aşama 5: öksüz yazılar (P1)
 *
 * ÖLÇÜLEN DURUM: 9 hizmet sayfasında hiç blog linki yok. Bunlar tam olarak
 * mobil ve video modüllerinin sayfaları — yani yeni yazılan 15 yazının hedef
 * sayfaları. Yazılar hizmet sayfasına link veriyor, hizmet sayfası geri
 * vermiyor. Sonucu üç yazının menü dışında HİÇ iç link almaması:
 *   /blog/react-native-mi-flutter-mi/
 *   /blog/uygulama-magaza-optimizasyonu/
 *   /blog/web-sitesine-chatbot-eklemek/
 *
 * Çözüm: sitenin başka hizmet sayfalarında ZATEN var olan "Bu konuda
 * yazdıklarımız" bloğunu bu 9 sayfaya da koymak. Yeni bir desen icat edilmiyor;
 * var olan desen eksik sayfalara taşınıyor.
 *
 * Başlık ve özet metni yazının KENDİ h1'inden ve meta açıklamasından okunur —
 * elle yazılmaz, böylece yazı değişirse burada eskimiş metin kalmaz.
 *
 * Kullanım: node plan/geo-onar-5-oksuz.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

/* hizmet sayfası → o sayfanın konusunu SÜRDÜREN yazılar.
   ★ işaretliler şu an öksüz olan üç yazı. */
const ESLEME = {
  'hizmetler/mobil-uygulama': [
    'mobil-uygulama-gelistirme-maliyeti',
    'mobil-uygulama-gelistirme-sureci',
    'native-mi-cross-platform-mi',
  ],
  'hizmetler/mobil-uygulama/react-native': [
    'react-native-mi-flutter-mi',            /* ★ */
    'native-mi-cross-platform-mi',
    'mobil-uygulama-gelistirme-sureci',
  ],
  'hizmetler/mobil-uygulama/ios-android': [
    'native-mi-cross-platform-mi',
    'react-native-mi-flutter-mi',            /* ★ ikinci gelen link */
    'mobil-uygulama-gelistirme-maliyeti',
  ],
  'hizmetler/mobil-uygulama/aso-uygulama-pazarlamasi': [
    'uygulama-magaza-optimizasyonu',         /* ★ */
    'mobil-uygulama-yaptirma-sorulari',
    'mobil-uygulama-gelistirme-sureci',
  ],
  'hizmetler/video-produksiyon': [
    'reklam-filmi-cekim-asamalari',
    'urun-videosu-studyo-mu-mekan-mi',
    'reklam-filmi-fiyat-kalemleri',
  ],
  'hizmetler/video-produksiyon/reklam-filmi': [
    'reklam-filmi-cekim-asamalari',
    'reklam-filmi-fiyat-kalemleri',
    'storyboard-nedir',
  ],
  'hizmetler/video-produksiyon/urun-videosu': [
    'urun-videosu-studyo-mu-mekan-mi',
    'e-ticaret-urun-videosu-formatlari',
    'kamerasiz-urun-videosu',
  ],
  'hizmetler/video-produksiyon/ai-destekli-produksiyon': [
    'yapay-zeka-ile-video-uretimi',
    'kamerasiz-urun-videosu',
    'e-ticaret-urun-videosu-formatlari',
  ],
  'hizmetler/web-tasarim-yazilim/ai-entegrasyonu': [
    'web-sitesine-chatbot-eklemek',          /* ★ */
    'kullanici-deneyimi',
    'seo-ve-web-tasarim',
  ],
};

/* Var olan bloklardaki özet uzunluğu ölçüldü: ~103 karakter, kelime sınırında
   kesik, üç nokta YOK. Aynı biçim korunuyor. */
function kirp(s, n = 105) {
  if (s.length <= n) return s;
  const k = s.slice(0, n);
  return k.slice(0, k.lastIndexOf(' ')).replace(/[,;:]$/, '');
}
const kacir = (s) => s.replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;');

function yaziBilgi(slug) {
  const p = path.join(S, 'blog', slug, 'index.html');
  if (!fs.existsSync(p)) return null;
  const h = fs.readFileSync(p, 'utf8');
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || ['', ''])[1]
    .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const ac = (h.match(/<meta name="description" content="([^"]*)"/) || ['', ''])[1];
  return { h1, ozet: kirp(ac.replace(/&quot;/g, '"').replace(/&#39;/g, "'")) };
}

let n = 0;
const eksik = [];
console.log(`\n  ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'}\n`);

for (const [dizin, sluglar] of Object.entries(ESLEME)) {
  const dosya = path.join(S, dizin, 'index.html');
  if (!fs.existsSync(dosya)) { eksik.push(dizin + ' — sayfa yok'); continue; }
  let h = fs.readFileSync(dosya, 'utf8');

  if (/data-ic-link="blog"/.test(h)) { console.log(`  · /${dizin}/ — blok zaten var, atlandı`); continue; }
  if (!h.includes('</main>')) { eksik.push(dizin + ' — </main> yok'); continue; }

  const derinlik = dizin.split('/').length;          /* site köküne kaç seviye */
  const on = '../'.repeat(derinlik);

  const baglar = [];
  for (const s of sluglar) {
    const b = yaziBilgi(s);
    if (!b) { eksik.push(`${dizin} → ${s} (yazı yok)`); continue; }
    baglar.push(`          <a class="yk" href="${on}blog/${s}/"><b>${kacir(b.h1)}</b>\n`
      + `            <span>${kacir(b.ozet)}</span></a>`);
  }
  if (!baglar.length) continue;

  const blok = `  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head rv">
        <span class="eyebrow"><i></i>Konuyla ilgili yazılar</span>
        <h2 data-kin>Bu konuda yazdıklarımız</h2>
      </div>
      <div class="hrt-sag" data-ic-link="blog">
${baglar.join('\n')}
      </div>
    </div>
  </section>
`;

  h = h.replace('</main>', blok + '</main>');
  n++;
  console.log(`  ✓ /${dizin}/`.padEnd(56) + `${baglar.length} yazı · ${on}blog/`);
  baglar.forEach((_, i) => console.log(`        → ${sluglar[i]}`));
  if (UYGULA) fs.writeFileSync(dosya, h, 'utf8');
}

console.log(`\n  ${n} sayfaya blok ${UYGULA ? 'eklendi' : 'eklenecek'}`);
if (eksik.length) { console.log('\n  SORUNLU:'); eksik.forEach((e) => console.log('    ' + e)); }
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
