/* GEO onarım — Aşama 8: title uzunlukları
 *
 * 36 sayfanın <title> etiketi 60 karakteri aşıyordu; Google SERP'te ~60'tan
 * sonrasını kesiyor, yani o kelimeler kullanıcıya hiç görünmüyor.
 *
 * KISALTMA KURALI (tek tek elle, mekanik kırpma DEĞİL):
 *   · odak ifade her zaman korunur ve başta kalır
 *   · kesilen yer sıralama kuyruğudur ("— A, B, C" listesinin sonu)
 *   · " | TasarımMania" son eki (15 karakter) korunur; marka sinyali
 *   · hiçbir başlığa sayı/iddia EKLENMEZ, olan da uydurulmaz
 *
 * ⚠ BLOG YAZILARI ÜRETİCİDEN GELİYOR: yalnız HTML'i düzeltmek yetmez, ilk
 *   blog-uret.js koşusunda eski başlık geri gelir. Bu yüzden yapılandırma
 *   dosyasındaki metaBaslik alanı da güncellenir.
 *
 * Kullanım: node plan/geo-onar-8-basliklar.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

const YENI = {
  '/': 'TasarımMania — 360° Dijital Ajans ve Prodüksiyon Stüdyosu',
  '/blog/': 'Blog — Web, SEO ve Reklam Rehberleri | TasarımMania',

  '/blog/kamerasiz-urun-videosu/': 'Kamerasız Ürün Videosu Nasıl Üretilir? | TasarımMania',
  '/blog/mobil-uygulama-gelistirme-maliyeti/': 'Mobil Uygulama Geliştirme Maliyeti | TasarımMania',
  '/blog/mobil-uygulama-gelistirme-sureci/': 'Mobil Uygulama Geliştirme Süreci Kaç Aşama? | TasarımMania',
  '/blog/mobil-uygulama-yaptirma-sorulari/': 'Mobil Uygulama Yaptırmadan Önce Ne Sorulur? | TasarımMania',
  '/blog/native-mi-cross-platform-mi/': 'Native mi Cross-Platform mı? Mimari Seçimi | TasarımMania',
  '/blog/react-native-mi-flutter-mi/': 'React Native mi Flutter mı? Karşılaştırma | TasarımMania',
  '/blog/reklam-filmi-fiyat-kalemleri/': 'Reklam Filmi Fiyatını Belirleyen Kalemler | TasarımMania',
  '/blog/storyboard-nedir/': 'Storyboard Ne İşe Yarar, Neyi Kurtarır? | TasarımMania',
  '/blog/uygulama-magaza-optimizasyonu/': 'Uygulama Mağaza Optimizasyonu: 8 Adım | TasarımMania',
  '/blog/yapay-zeka-ile-video-uretimi/': 'Yapay Zeka ile Video Üretimi Ne İşe Yarar? | TasarımMania',

  '/dijital-pazarlama/': 'Dijital Pazarlama Ajansı — Google ve Meta Ads | TasarımMania',
  '/google-ads/': 'Google Ads Yönetimi — Arama ve Görsel Ağ | TasarımMania',
  '/meta-reklam/': 'Meta Ads Yönetimi — Facebook ve Instagram | TasarımMania',
  '/performans-pazarlama/': 'Performans Pazarlaması — Dönüşüm Yönetimi | TasarımMania',
  '/sosyal-medya/': 'Instagram Reklam Yönetimi ve İçerik Takvimi | TasarımMania',
  '/grafik-tasarim/': 'Grafik Tasarım Ajansı — Logo, Kurumsal Kimlik | TasarımMania',

  '/mobil-uygulama/': 'Mobil Uygulama Geliştirme Ajansı | TasarımMania',
  '/ios-android-uygulama/': 'Android iOS Uygulama Geliştirme — Native | TasarımMania',

  '/seo/': 'SEO Firmaları — Teknik, İçerik ve Yerel SEO | TasarımMania',
  '/cok-dilli-seo/': 'Çok Dilli SEO ve hreflang Kurulumu | TasarımMania',
  '/e-ticaret-seo/': 'Shopify SEO Hizmeti — Ürün ve Kategori | TasarımMania',
  '/seo-icerik/': 'SEO İçerik Stratejisi ve Kelime Planlaması | TasarımMania',
  '/teknik-seo/': 'Teknik SEO Hizmeti — Core Web Vitals, Schema | TasarımMania',
  '/yerel-seo/': 'Yerel SEO — Google İşletme Profili Yönetimi | TasarımMania',

  '/video-produksiyon/': 'Video Prodüksiyon Ajansı — Reklam Filmi | TasarımMania',
  '/ai-video-produksiyon/': 'AI Destekli Video Prodüksiyon — Kamerasız | TasarımMania',
  '/reklam-filmi/': 'Reklam Filmi Çekimi — Senaryodan Ekrana | TasarımMania',
  '/reels-video/': 'Instagram Reels Prodüksiyonu — Dikey Video | TasarımMania',
  '/urun-videosu/': 'Ürün Videosu Çekimi — E-Ticaret Formatı | TasarımMania',

  '/web-tasarim/': 'Web Tasarım ve Yazılım — Kurumsal, E-Ticaret | TasarımMania',
  '/site-bakim/': 'WordPress Site Bakım ve Yönetim Hizmeti | TasarımMania',
  '/e-ticaret/': 'E-Ticaret Sitesi Kurulumu — WooCommerce | TasarımMania',
  '/kurumsal-web-sitesi/': 'Kurumsal Web Sitesi Fiyatları ve Süreci | TasarımMania',
  '/ozel-yazilim/': 'Özel Yazılım Geliştirme — Bayi Paneli, ERP | TasarımMania',
};

const kacir = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

let n = 0, uzunKalan = [], yapKac = 0;
for (const [yol, baslik] of Object.entries(YENI)) {
  const f = path.join(S, yol.slice(1), 'index.html');
  if (!fs.existsSync(f)) { console.log(`  ✗ sayfa yok: ${yol}`); continue; }
  if (baslik.length > 60) { uzunKalan.push(`${yol} → ${baslik.length}`); continue; }

  let h = fs.readFileSync(f, 'utf8');
  const eski = (h.match(/<title>([\s\S]*?)<\/title>/) || ['', ''])[1].trim();
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${kacir(baslik)}</title>`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${kacir(baslik)}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${kacir(baslik)}">`);
  n++;
  console.log(`  ${String(eski.length).padStart(3)} → ${String(baslik.length).padStart(2)}  ${baslik}`);
  if (UYGULA) fs.writeFileSync(f, h, 'utf8');

  /* blog yazısının yapılandırması da güncellensin — yoksa ilk üretimde geri döner */
  const m = /^\/blog\/([^/]+)\/$/.exec(yol);
  if (!m) continue;
  const yapDosyalari = fs.readdirSync(__dirname).filter((x) => /^yazi-\d+-.*\.json$/.test(x));
  for (const yd of yapDosyalari) {
    const p = path.join(__dirname, yd);
    const C = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (C.slug !== m[1]) continue;
    if (C.yazi && C.yazi.metaBaslik !== baslik) {
      C.yazi.metaBaslik = baslik;
      yapKac++;
      if (UYGULA) fs.writeFileSync(p, JSON.stringify(C, null, 2) + '\n', 'utf8');
    }
  }
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — ${n} sayfa · ${yapKac} yapılandırma dosyası`);
if (uzunKalan.length) { console.log('\n  ✗ HÂLÂ 60 ÜSTÜ (elle bakın):'); uzunKalan.forEach((x) => console.log('    ' + x)); }
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
