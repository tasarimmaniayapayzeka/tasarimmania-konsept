/* GEO onarım — Aşama 9: meta description uzunlukları
 *
 * 17 sayfanın açıklaması 120 karakterin altındaydı (SERP'te boş alan kalıyor,
 * ikinci satır hiç kullanılmıyor), 2 sayfanınki 165'i aşıyordu (kesiliyor).
 *
 * KURAL: eklenen her cümle sayfada ZATEN yazan bir bilgiyi tekrar eder.
 * Yeni vaat, yeni sayı, yeni garanti EKLENMEZ. Kısaltmada da bilgi atılır,
 * cümle ortasından kesilmez.
 *
 * Meta description, og:description, twitter:description ve — birebir aynıysa —
 * şemadaki description alanı birlikte güncellenir; üçünün ayrışması
 * "hangisi doğru" sorusunu doğurur.
 *
 * Kullanım: node plan/geo-onar-9-aciklama.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const ALT = 120, UST = 165;

const YENI = {
  /* --- kısa olanlar: sayfadaki somut ayrıntıyla uzatıldı --- */
  '/hizmetler/dijital-pazarlama/meta-ads/':
    'Meta reklam ajansı hizmeti: hedef kitle segmentasyonu, reklam formatları, retargeting ve raporlama. '
    + 'Facebook ve Instagram kampanyaları tek panelden yönetilir.',
  '/hizmetler/seo/e-ticaret-seo/':
    'Shopify SEO hizmeti: mağaza altyapısına özel teknik ayarlar, ürün ve kategori sayfası optimizasyonu. '
    + 'Filtre URL’leri ve ürün şeması birlikte kurulur.',
  '/hizmetler/mobil-uygulama/ios-android/':
    'Android iOS uygulama geliştirme: Swift ve Kotlin ile native, platforma özgü tasarım ve donanım erişimi. '
    + 'Kamera, bildirim ve konum sistem seviyesinde çalışır.',
  '/hizmetler/mobil-uygulama/react-native/':
    'React native ile tek kod tabanından iOS ve Android; web sitenizle ortak API kullanımı ve verimli geliştirme. '
    + 'İki mağazaya tek ekiple yayın yapılır.',
  '/hizmetler/web-tasarim-yazilim/ai-entegrasyonu/':
    'Web tasarım ai entegrasyonu: kendi içeriğinizle eğitilmiş chatbot, WhatsApp’a aktarım ve denetim mekanizması. '
    + 'Bilmediği soruyu uydurmaz, insana devreder.',
  '/hizmetler/seo/cok-dilli-seo/':
    'İnternet sitesi çeviri ve çok dilli SEO: hreflang yapılandırması, yurt dışı pazar hedefleme ve alan adı kararı. '
    + 'Her dil için ayrı kelime araştırması yapılır.',
  '/hizmetler/video-produksiyon/ai-destekli-produksiyon/':
    'AI video prodüksiyon: fotoğraftan ürün videosu üretimi, marka tutarlılığı ve kamerasız hızlı prodüksiyon hattı. '
    + 'Set kurmadan çoklu varyant çıkarılır.',
  '/hizmetler/video-produksiyon/urun-videosu/':
    'Ürün videosu çekimi: stüdyo veya mekan çekimi seçenekleri, pazaryeri formatı ve e-ticaret sitesine entegrasyon. '
    + 'Dikey ve kare versiyonlar birlikte teslim edilir.',
  '/hizmetler/dijital-pazarlama/google-ads/':
    'Google reklam ajansı hizmeti: anahtar kelime kurgusu, dönüşüm takibi, teklif stratejisi ve optimizasyon döngüsü. '
    + 'Arama ve görsel ağ ayrı ayrı raporlanır.',
  '/hizmetler/video-produksiyon/reklam-filmi/':
    'Reklam filmi fiyatları ve süreci: senaryo yazımı, storyboard, profesyonel çekim ve seslendirme tek çatı altında. '
    + 'Her aşama bir öncekinin onayından sonra başlar.',
  '/hizmetler/video-produksiyon/sosyal-video-reels/':
    'Instagram reklam reels üretimi: dikey format, güvenli alan kurgusu, telifsiz müzik ve çoklu platform versiyonlama. '
    + 'TikTok ve Shorts sürümleri aynı çekimden çıkar.',
  '/hizmetler/grafik-tasarim/':
    'Grafik tasarım ajansı hizmeti: logo, kurumsal kimlik kılavuzu, kartvizit/katalog ve sosyal medya görsel şablonları. '
    + 'Kaynak dosyaların tamamı size teslim edilir.',
  '/hizmetler/web-tasarim-yazilim/bakim-destek/':
    'WordPress site yönetimi: güvenlik güncellemesi, otomatik yedekleme, kesinti izleme ve site taşıma/klonlama hizmeti. '
    + 'Aylık rapor ve tek noktadan destek verilir.',
  '/hizmetler/mobil-uygulama/aso-uygulama-pazarlamasi/':
    'Mobil uygulama pazarlama: App Store/Google Play anahtar kelime optimizasyonu, mağaza görselleri ve indirme kampanyası. '
    + 'Sıralama ve indirme birlikte izlenir.',
  '/hizmetler/mobil-uygulama/uygulama-ui-ux/':
    'Mobil uygulama arayüzü: kullanıcı akışı, wireframe, Figma ekranları ve erişilebilirlik standartlarıyla tasarım süreci. '
    + 'Geliştirmeden önce ekranlar onaylanır.',
  '/hizmetler/seo/yerel-seo/':
    'Seo ajansı istanbul hizmeti: Google İşletme Profili optimizasyonu, semt bazlı anahtar kelime ve yerel dizin kayıtları. '
    + 'Harita görünürlüğü aylık ölçülür.',
  '/teklif/':
    'Beş kısa adımda projenizin kapsamını çıkarın; ekranda bütçe bandı ve takvim tahmini görün. '
    + 'Telefon en sonda, tek alan. Formu doldurmak yaklaşık 40 saniye sürüyor.',

  /* --- uzun olanlar: bilgi ATILARAK kısaltıldı, cümle ortasından kesilmedi --- */
  '/iletisim/':
    'TasarımMania iletişim: 0554 791 65 45, WhatsApp ve Zeytinlik Mah. Pancar Sk. No:19-11 Bakırköy / İstanbul. '
    + 'Hafta içi 09:00–19:00, Cumartesi 10:00–16:00.',
  '/':
    'TasarımMania; web yazılım, mobil uygulama, dijital pazarlama, video prodüksiyon ve SEO’yu tek panelde birleştiren '
    + 'İstanbul merkezli 360 derece dijital ajans.',
};

const kacir = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

let n = 0; const disari = [];
for (const [yol, aciklama] of Object.entries(YENI)) {
  const f = path.join(S, yol.slice(1), 'index.html');
  if (!fs.existsSync(f)) { console.log(`  ✗ sayfa yok: ${yol}`); continue; }
  if (aciklama.length < ALT || aciklama.length > UST) {
    disari.push(`${yol} → ${aciklama.length} karakter (hedef ${ALT}-${UST})`);
    continue;
  }

  let h = fs.readFileSync(f, 'utf8');
  const eski = (h.match(/<meta name="description" content="([^"]*)"/) || ['', ''])[1];
  const k = kacir(aciklama);

  /* --- 1. şema: YALNIZ ld+json bloğunun içinde ara ---
     ⚠ ÖLÇÜLEN HATA: ilk sürüm eski metni SAYFANIN TAMAMINDA arayıp değiştirdi.
     Yeni açıklama eskisiyle BAŞLADIĞI için (sonuna cümle ekliyoruz), desen
     az önce yazdığı meta etiketinin içinde de eşleşti ve cümleyi ikinci kez
     ekledi: 160 karakterlik metin 205'e çıktı, 16 sayfada. Kapsam artık
     ld+json bloğuyla sınırlı ve meta etiketlerinden ÖNCE çalışıyor. */
  if (eski) {
    h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, (blok) =>
      blok.split(JSON.stringify(eski).slice(1, -1)).join(JSON.stringify(aciklama).slice(1, -1)));
  }

  /* --- 2. meta etiketleri ---
     og/twitter yalnız ESKİ metinle birebir aynıysa güncellenir; farklıysa
     bilerek ayrı yazılmış demektir, ona dokunmak yazarın kararını ezmek olur */
  const ogE = (h.match(/og:description" content="([^"]*)"/) || ['', ''])[1];
  const twE = (h.match(/twitter:description" content="([^"]*)"/) || ['', ''])[1];
  h = h.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${k}">`);
  if (ogE === kacir(eski)) h = h.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${k}">`);
  if (twE === kacir(eski)) h = h.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${k}">`);

  n++;
  console.log(`  ${String(eski.length).padStart(3)} → ${String(aciklama.length).padStart(3)}  ${yol}`);
  if (UYGULA) fs.writeFileSync(f, h, 'utf8');
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — ${n} sayfa`);
if (disari.length) { console.log('\n  ✗ HEDEF ARALIĞIN DIŞINDA — yazılmadı:'); disari.forEach((x) => console.log('    ' + x)); }
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
