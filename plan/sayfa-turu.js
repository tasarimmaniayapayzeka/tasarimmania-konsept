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

/* ⚠ DİL ÖNEKİ — İngilizce sürüm /en/ altında yaşıyor. Önek soyulmazsa
   /en/seo/ "diğer" sayılır, hizmete özel modüller onu denetlemez ve site
   büyüdükçe her kural ayrı ayrı yanılır — yukarıdaki "sahte geçiş"in aynısı.
   Eşleme en-url-haritasi.json'dan okunur; İngilizce adres Türkçe karşılığına
   çevrilerek sınıflanır, böylece iki dil aynı kurala tabi olur. */
let EN_TR = null;
function enTrHaritasi() {
  if (EN_TR) return EN_TR;
  EN_TR = new Map([['/en/', '/']]);
  try {
    const E = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-url-haritasi.json'), 'utf8'));
    for (const grup of ['hizmetler', 'kurumsal'])
      for (const [tr, o] of Object.entries(E[grup] || {})) if (o && o.en) EN_TR.set(o.en, tr);
  } catch (e) { /* harita yoksa yalnız kök eşlemesi geçerli */ }
  return EN_TR;
}
/* İngilizce adresi Türkçe karşılığına çevirir; Türkçe adres olduğu gibi döner. */
function dilsiz(siteYolu) {
  if (siteYolu !== '/en/' && !siteYolu.startsWith('/en/')) return siteYolu;
  return enTrHaritasi().get(siteYolu) || siteYolu.replace(/^\/en\//, '/');
}
/* Bir dilin KÖK sayfası mı? Kırıntı gezinme gibi kurallar kökü muaf tutar;
   /en/ de İngilizcenin köküdür, /'nin alt sayfası değil. */
function kokMu(siteYolu) { return siteYolu === '/' || siteYolu === '/en/'; }
function ingilizceMi(siteYolu) { return siteYolu === '/en/' || siteYolu.startsWith('/en/'); }

function turu(siteYolu) {
  const y = dilsiz(siteYolu);
  if (/^\/blog\/[^/]+\/$/.test(y)) return 'blog';
  if (HIZMET_YOLLARI.has(y)) return 'hizmet';
  return 'diğer';
}

/* dosya yolundan site yoluna çevirip sınıflandır */
function turuDosyadan(dosya, siteKok) {
  const y = '/' + path.relative(siteKok, dosya).split(path.sep).join('/').replace(/index\.html$/, '');
  return turu(y);
}

module.exports = { turu, turuDosyadan, dilsiz, kokMu, ingilizceMi, HIZMET_YOLLARI, KURUMSAL };
