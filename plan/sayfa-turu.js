/* Sayfa türü sınıflandırıcı — TEK KAYNAK.
 *
 * ⚠ NEDEN VAR: denetim ve onarım betikleri sayfa türünü URL yoluna göre
 *   ayırıyordu (`/hizmetler/` içeriyorsa hizmet sayfası). 7 Eyl 2026'da
 *   adresler düzleşince bu kural çöktü: 28 hizmet sayfası "diğer" sayıldı,
 *   hizmete özel modüller 29 yerine 1 sayfa denetledi ve denetim "0 bulgu"
 *   diyerek SAHTE GEÇİŞ verdi. Ölçüldü: "77 sayfa (42 blog · 1 hizmet · 34 diğer)".
 *
 * Artık tür, adres haritasından okunuyor: yeni-url-haritasi.json neyi hizmet
 * olarak listeliyorsa hizmettir. Adres bir daha değişirse yalnız harita
 * güncellenir, sınıflandırma kendiliğinden doğru kalır.
 *
 * Kullanım:
 *   const { turu, HIZMET_YOLLARI } = require('./sayfa-turu');
 *   turu('/teknik-seo/')  → 'hizmet'
 */
const fs = require('fs'), path = require('path');

const H = JSON.parse(fs.readFileSync(path.join(__dirname, 'yeni-url-haritasi.json'), 'utf8'));

/* haritanın ürettiği hizmet adresleri */
const HIZMET_YOLLARI = new Set([
  ...Object.values(H.hizmetler).map((o) => o.yeni),
  ...Object.keys(H.birlestirilecek),
  ...Object.keys(H.hizmetler_dizini || {}),
]);
/* birleştirme henüz yapılmadıysa geçici AI adresi de hizmettir */
HIZMET_YOLLARI.add('/ai-video-produksiyon/');

/* site kökündeki kurumsal sayfalar */
const KURUMSAL = new Set(['/', '/hakkimizda/', '/iletisim/', '/teklif/', '/kvkk/', '/blog/', '/referanslar/']);

function turu(siteYolu) {
  if (/^\/blog\/[^/]+\/$/.test(siteYolu)) return 'blog';
  if (HIZMET_YOLLARI.has(siteYolu)) return 'hizmet';
  return 'diğer';
}

/* dosya yolundan site yoluna çevirip sınıflandır */
function turuDosyadan(dosya, siteKok) {
  const y = '/' + path.relative(siteKok, dosya).split(path.sep).join('/').replace(/index\.html$/, '');
  return turu(y);
}

module.exports = { turu, turuDosyadan, HIZMET_YOLLARI, KURUMSAL };
