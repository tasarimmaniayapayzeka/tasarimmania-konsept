/* GEO onarım — Aşama 15: hizmet sayfalarında dış kaynak referansı
 *
 * ÖLÇÜLEN DURUM: 29 hizmet sayfasının 0'ında gövde içi dış kaynak vardı.
 * Rehberin GEO bölümü (Modül 35 · Source Attribution) cevap motorlarının
 * bir sayfayı kaynak göstermesi için sayfanın kendisinin de kaynak
 * göstermesini istiyor.
 *
 * ⚠ HER URL curl ile DOĞRULANDI (200). Çalışmayan bağlantı konulmadı.
 * ⚠ RAKAM YOK: alt sayfalarda TL/yüzde/hafta/ay/gün/yıl yazmak sitenin kendi
 *   kuralına aykırı; eklenen cümlelerin hiçbirinde rakam geçmiyor.
 * ⚠ Kaynak, sayfanın KONUSUNA ait olan resmî/birincil kaynaktır; doldurmak
 *   için rastgele bağlantı verilmedi.
 *
 * Yerleşim: SSS bölümünden hemen önceki bölümün son paragrafının içine.
 * Böylece cümle gövde metninin parçası olur, "kaynakça" kutusu gibi durmaz.
 *
 * Kullanım: node plan/geo-onar-15-hizmet-kaynak.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const UYGULA = process.argv.includes('--uygula');

const bag = (u, m) => `<a href="${u}" target="_blank" rel="noopener">${m}</a>`;
const REKLAM = 'https://ticaret.gov.tr/tuketici/ticari-reklamlar';
const KVKK = 'https://www.kvkk.gov.tr/';
const TELIF = 'https://www.telifhaklari.gov.tr/';
const RTUK = 'https://www.rtuk.gov.tr/';
const ETICARET = 'https://ticaret.gov.tr/hizmet-ticareti/elektronik-ticaret';
const IYS = 'https://iys.org.tr/';
const GSC_REHBER = 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide';
const GSC_SEMA = 'https://developers.google.com/search/docs/appearance/structured-data/search-gallery';
const VITALS = 'https://web.dev/articles/vitals';
const ADS = 'https://support.google.com/google-ads/answer/6154846';
const AS_INCELEME = 'https://developer.apple.com/app-store/review/guidelines/';
const AS_URUN = 'https://developer.apple.com/app-store/product-page/';
const HIG = 'https://developer.apple.com/design/human-interface-guidelines/';
const MATERIAL = 'https://m3.material.io/';
const ETBIS = 'https://etbis.ticaret.gov.tr/';

const CUMLE = {
  '/hizmetler/': `Beş modülün ortak zemini mevzuattır; ${bag(REKLAM, 'ticari reklam kuralları')} hepsinde geçerlidir.`,

  '/web-tasarim/': `Sitede toplanan her form verisi ${bag(KVKK, 'KVKK kapsamındadır')}; aydınlatma metni baştan kurulur.`,
  '/kurumsal-web-sitesi/': `Kurumsal sitede arama görünürlüğünün temeli ${bag(GSC_REHBER, 'Google’ın kendi başlangıç kılavuzunda')} tarif edilir.`,
  '/e-ticaret/': `Mesafeli satış yükümlülükleri ${bag(ETICARET, 'Ticaret Bakanlığı’nın e-ticaret mevzuatında')} yazılıdır.`,
  '/ozel-yazilim/': `Panelde tutulan müşteri kaydı kişisel veridir; ${bag(KVKK, 'KVKK’nın veri sorumlusu yükümlülükleri')} tasarıma girer.`,
  '/yapay-zeka/': `Sohbet kayıtları da kişisel veridir; ${bag(KVKK, 'KVKK aydınlatma yükümlülüğü')} chatbot için de geçerlidir.`,
  '/site-bakim/': `Bakımın ölçülebilir tarafı sayfa deneyimidir; ${bag(VITALS, 'Core Web Vitals tanımları')} eşikleri açıkça verir.`,

  '/mobil-uygulama/': `Yayın kapısı mağazanın kendi kurallarıdır; ${bag(AS_INCELEME, 'App Store inceleme kılavuzu')} red sebeplerini sıralar.`,
  '/ios-android-uygulama/': `Platform davranışı belgelidir; ${bag(HIG, 'Apple’ın arayüz kılavuzu')} ve ${bag(MATERIAL, 'Material Design')} farklı kalıp tarif eder.`,
  '/react-native/': `Tek kod tabanı da mağaza kurallarına tabidir; ${bag(AS_INCELEME, 'App Store inceleme kılavuzu')} istisna tanımaz.`,
  '/uygulama-arayuz-tasarimi/': `Dokunma hedefi ve erişilebilirlik ölçüleri ${bag(HIG, 'Apple’ın arayüz kılavuzunda')} sayısal olarak tanımlıdır.`,
  '/aso/': `Mağaza alanlarının sınırları tahmine bırakılmaz; ${bag(AS_URUN, 'App Store ürün sayfası kılavuzu')} hepsini yazar.`,

  '/dijital-pazarlama/': `Reklam metnindeki her iddia denetlenebilir; ${bag(REKLAM, 'ticari reklam kuralları')} sınırı çizer.`,
  '/google-ads/': `Kalite puanının nasıl hesaplandığı ${bag(ADS, 'Google Ads yardım belgelerinde')} açıkça anlatılır.`,
  '/meta-reklam/': `Sosyal mecrada da reklam mevzuatı işler; ${bag(REKLAM, 'ticari reklam kuralları')} platform ayrımı yapmaz.`,
  '/performans-pazarlama/': `İzin gerektiren gönderiler ${bag(IYS, 'İleti Yönetim Sistemi')} üzerinden kayıt altındadır.`,
  '/sosyal-medya/': `İş birliği paylaşımlarında da reklam açıklaması gerekir; ${bag(REKLAM, 'ticari reklam kuralları')} bunu şart koşar.`,

  '/video-produksiyon/': `Yayına girecek işin mecra sınırları ${bag(RTUK, 'RTÜK’ün yayın ilkelerinde')} tanımlıdır.`,
  '/reklam-filmi/': `Filmdeki vaat de denetlenir; ${bag(REKLAM, 'ticari reklam kuralları')} abartılı iddiayı marka sahibine bağlar.`,
  '/urun-videosu/': `Görüntü ürünü olduğundan farklı gösteremez; ${bag(REKLAM, 'ticari reklam mevzuatı')} yanıltıcı sunumu yasaklar.`,
  '/reels-video/': `Kullanılan müzik telif konusudur; ${bag(TELIF, 'Telif Hakları Genel Müdürlüğü')} izin yolunu tarif eder.`,
  '/ai-video-produksiyon/': `Üretilen sahne de reklamdır; ${bag(REKLAM, 'ticari reklam kuralları')} yanıltıcı gösterimi kapsar.`,

  '/seo/': `Aramanın temel kuralları ${bag(GSC_REHBER, 'Google’ın başlangıç kılavuzunda')} birincil kaynaktan okunabilir.`,
  '/teknik-seo/': `Sayfa deneyimi ölçütleri ${bag(VITALS, 'Core Web Vitals tanımlarında')} eşikleriyle birlikte verilir.`,
  '/seo-icerik/': `İçeriğin arama sonucundaki görünümü ${bag(GSC_SEMA, 'Google’ın zengin sonuç galerisinde')} tür tür listelenir.`,
  '/yerel-seo/': `Haritalarda görünürlüğün kuralları ${bag(GSC_REHBER, 'Google’ın kendi belgelerinde')} açık biçimde duruyor.`,
  '/e-ticaret-seo/': `Ürün sayfası işaretlemesinin karşılığı ${bag(GSC_SEMA, 'zengin sonuç galerisinde')} örnekleriyle gösterilir.`,
  '/cok-dilli-seo/': `Dil ve ülke eşlemesinin doğru kurulumu ${bag(GSC_REHBER, 'Google’ın belgelerinde')} tarif edilir.`,

  '/grafik-tasarim/': `Teslim edilen tasarım bir eserdir; ${bag(TELIF, 'telif mevzuatı')} kullanım hakkının kapsamını belirler.`,
};

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const RAKAM = /\b\d+\s*(TL|₺|%|hafta|ay|gün|yıl|iş günü)\b/i;

let n = 0; const sorun = [];
console.log(`\n  ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'}\n`);

/* ⚠ KLASÖR TARAMASI ARTIK ÇALIŞMIYOR: adresler düzleşince site/hizmetler/
   altında tek sayfa kaldı; bu betik 29 yerine 1 sayfa deniyordu ve sessizce
   "0 sayfa" diyordu. Hizmet listesi haritadan okunuyor. */
const { HIZMET_YOLLARI } = require('./sayfa-turu');
const hizmetDosyalari = [...HIZMET_YOLLARI]
  .map((y) => path.join(S, y.replace(/^\//, ''), 'index.html'))
  .filter(fs.existsSync);
for (const f of hizmetDosyalari) {
  const yol = u(f);
  /* Grafik tasarım eski adresinde meta-refresh yönlendirme duruyor (sayfa
     /grafik-tasarim/'a taşındı). Yönlendirme sayfası içerik değil. */
  const cumle = CUMLE[yol];
  if (!cumle) {
    const ham = fs.readFileSync(f, 'utf8');
    if (/http-equiv="refresh"/i.test(ham)) { console.log(`  · ${yol} — yönlendirme sayfası, atlandı`); continue; }
    sorun.push(`${yol} — cümle tanımlı değil`); continue;
  }
  if (RAKAM.test(cumle.replace(/<[^>]*>/g, ''))) { sorun.push(`${yol} — cümlede rakam var`); continue; }

  let h = fs.readFileSync(f, 'utf8');
  const govdeBas = h.indexOf('<main');
  const govdeSon = h.lastIndexOf('</main>');
  const govde = h.slice(govdeBas, govdeSon);
  if (/<a[^>]+href="https?:\/\/(?!(www\.)?(tasarimmania|wa\.me|api\.whatsapp|fonts\.))/.test(govde)) {
    console.log(`  · ${yol} — zaten dış kaynak var, atlandı`);
    continue;
  }

  /* ⚠ İLK SÜRÜM YANLIŞ YERE KOYUYORDU: "SSS'den önceki son </p>" kuralı,
     SSS'ten önce duran TEKLİF BANDININ paragrafını buluyordu ("Beş adım, iki
     dakika…"). Kaynak cümlesi satış bandına değil gövde metnine ait.
     Doğru çapa: İKİNCİ H2 bölümü — hizmet sayfalarında her zaman gerçek bir
     içerik bölümü (kapsam/derinlik anlatımı). Cümle o bölümün son
     paragrafının içine giriyor. */
  const h2ler = [...h.matchAll(/<h2\b/g)].map((m) => m.index).filter((i) => i > govdeBas && i < govdeSon);
  if (h2ler.length < 2) { sorun.push(`${yol} — yeterli H2 yok`); continue; }
  const bolumBas = h2ler[1];
  const bolumSon = h2ler[2] || (h.indexOf('id="sss"') > bolumBas ? h.indexOf('id="sss"') : govdeSon);
  /* ⚠ PENCERE SINIRI ŞART: ikinci bölüm ile SSS arasında fiyat şeridi ve
     kapsam-çıkaralım CTA bandı duruyor. "Bir sonraki H2'ye kadarki son <p>"
     kuralı o bandın paragrafını buluyordu ("Beş adım, iki dakika…") — ölçüldü.
     Bölümün kendi gövdesi başlıktan hemen sonra geliyor; pencere onunla
     sınırlanıyor ve banda taşmıyor. */
  const PENCERE = 6000;
  /* ⚠ İKİNCİ SÜZGEÇ — pencere tek başına yetmedi: bir hub sayfasında CTA bandı
     pencerenin içinde kalıyordu. Paragrafın KENDİ METNİ de bakılıyor; satış
     bandı cümleleri aday olmaktan çıkarılıyor. */
  const BANT = /Beş adım|Ekranda süre|Kapsamı birlikte çıkaralım|iki dakika|fiyat aralığı çıkar/i;
  const adaylar = [...h.matchAll(/<\/p>/g)].map((m) => m.index)
    .filter((i) => i > bolumBas && i < Math.min(bolumSon, bolumBas + PENCERE))
    .filter((i) => {
      const bas = h.lastIndexOf('<p', i);
      const t = h.slice(bas, i).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      return t.length > 60 && !BANT.test(t);
    });
  if (!adaylar.length) { sorun.push(`${yol} — ikinci bölümde uygun <p> yok`); continue; }
  const nokta = adaylar[adaylar.length - 1];

  h = h.slice(0, nokta) + ' ' + cumle + h.slice(nokta);
  n++;
  const onceki = h.slice(Math.max(0, nokta - 90), nokta).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`  ✓ ${yol}`);
  console.log(`      …${onceki.slice(-64)}`);
  if (UYGULA) fs.writeFileSync(f, h, 'utf8');
}

console.log(`\n  ${n} hizmet sayfasına kaynak ${UYGULA ? 'eklendi' : 'eklenecek'}`);
if (sorun.length) { console.log('\n  ✗ SORUNLU:'); sorun.forEach((x) => console.log('    ' + x)); }
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
