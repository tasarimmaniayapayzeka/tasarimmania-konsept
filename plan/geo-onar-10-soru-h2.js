/* GEO onarım — Aşama 10: hizmet sayfalarında soru biçimli H2
 *
 * Rehberin AEO modeli, cevap motorlarının bir bölümü alıntılayabilmesi için
 * başlığın SORUYU taşımasını istiyor. Ölçüm: 29 hizmet sayfasının yalnız
 * 9'unda soru biçimli H2 vardı.
 *
 * DÖNÜŞÜM KURALI:
 *   · Başlık, bölümün GERÇEKTE cevapladığı soruya çevrilir. Bölümün konusu
 *     değişmez, yeni vaat girmez.
 *   · Zaten soru cümlesi olup yalnız işareti eksik olanlara sadece "?" konur
 *     (10 başlık böyleydi) — metni yeniden yazmak gereksiz risk olurdu.
 *   · Sayfa başına EN AZ bir soru başlığı; hepsini soruya çevirmek başlık
 *     akışını tekdüzeleştirir.
 *
 * ⚠ Başlık metni sayfada başka yerde de geçebilir (içindekiler bağlantısı,
 *   şema). Değiştirme TÜM birebir geçişlere uygulanır, yoksa içindekiler
 *   başlıkla uyuşmaz hâle gelir. Kaç yerde değiştiği raporlanır.
 *
 * Kullanım: node plan/geo-onar-10-soru-h2.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const UYGULA = process.argv.includes('--uygula');

const DEGISIM = {
  '/hizmetler/dijital-pazarlama/google-ads/': [
    ['Kampanya Mimarisi ve Anahtar Kelime Kurgusu',
      'Kampanya mimarisi ve anahtar kelime kurgusu nasıl kurulur?'],
  ],
  '/hizmetler/dijital-pazarlama/': [
    ['Ne dahil, ne değil', 'Ne dahil, ne değil?'],
  ],
  '/hizmetler/dijital-pazarlama/meta-ads/': [
    ['Reklam Formatı Karşılaştırması ve Retargeting Kurgusu',
      'Hangi reklam formatı hangi hedefe uygun, retargeting nasıl kurulur?'],
  ],
  '/hizmetler/dijital-pazarlama/performans-pazarlamasi/': [
    ['Edinme Maliyeti ile Yaşam Boyu Değerin Dengesi',
      'Edinme maliyeti ile yaşam boyu değer nasıl dengelenir?'],
  ],
  '/hizmetler/grafik-tasarim/': [
    ['Logodan Kurumsal Kimlik Kılavuzuna Uzanan Süreç',
      'Logodan kurumsal kimlik kılavuzuna süreç nasıl ilerler?'],
  ],
  '/hizmetler/mobil-uygulama/aso-uygulama-pazarlamasi/': [
    ['ASO Çalışmasının İçeriği: Anahtar Kelimeden Görsele',
      'ASO çalışması anahtar kelimeden görsele neleri kapsar?'],
  ],
  '/hizmetler/mobil-uygulama/ios-android/': [
    ['Donanıma Doğrudan Erişim: Kamera, Sensör ve Bluetooth',
      'Native uygulama donanıma nasıl erişir: kamera, sensör, Bluetooth?'],
  ],
  '/hizmetler/mobil-uygulama/uygulama-ui-ux/': [
    ['Kullanıcı Akışından Yüksek Çözünürlüklü Ekrana',
      'Kullanıcı akışından yüksek çözünürlüklü ekrana nasıl geçilir?'],
  ],
  '/hizmetler/seo/cok-dilli-seo/': [
    ['ccTLD mi, Alt Dizin mi: Pazar Stratejisi',
      'ccTLD mi, alt dizin mi? Kararı pazar stratejisi belirler'],
  ],
  /* --- zaten soru, yalnız işareti eksik --- */
  '/hizmetler/seo/e-ticaret-seo/': [
    ['Kategori Sayfası mı, Ürün Sayfası mı Önce Optimize Edilir',
      'Kategori Sayfası mı, Ürün Sayfası mı Önce Optimize Edilir?'],
  ],
  '/hizmetler/seo/icerik-stratejisi/': [
    ['Rakip Boşluğu Tespiti ve SEO-GEO Farkı',
      'Rakip boşluğu nasıl tespit edilir, SEO ile GEO farkı nedir?'],
  ],
  '/hizmetler/seo/': [
    ['Ne dahil, ne değil', 'Ne dahil, ne değil?'],
  ],
  '/hizmetler/seo/teknik-seo/': [
    ['Core Web Vitals ve Sayfa Performansı',
      'Core Web Vitals sayfa performansını nasıl ölçer?'],
  ],
  '/hizmetler/video-produksiyon/ai-destekli-produksiyon/': [
    ['Fotoğraftan Ürün Videosuna: Süreç Nasıl İşliyor',
      'Fotoğraftan Ürün Videosuna: Süreç Nasıl İşliyor?'],
    ['Marka Tutarlılığı: Renk, Ton ve Logo Nasıl Korunuyor',
      'Marka Tutarlılığı: Renk, Ton ve Logo Nasıl Korunuyor?'],
  ],
  '/hizmetler/video-produksiyon/': [
    ['Ne dahil, ne değil', 'Ne dahil, ne değil?'],
  ],
  '/hizmetler/video-produksiyon/reklam-filmi/': [
    ['Animasyon mu, Çekimli mi: Format Kararı',
      'Animasyon mu, Çekimli mi? Format Kararı'],
  ],
  '/hizmetler/video-produksiyon/sosyal-video-reels/': [
    ['İlk Saniye Kurgusu ve Anlatı Ritmi',
      'İlk saniye kurgusu ve anlatı ritmi neden belirleyici?'],
  ],
  '/hizmetler/web-tasarim-yazilim/ai-entegrasyonu/': [
    ['Chatbot Nasıl Öğreniyor: Kendi İçerik Tabanınız',
      'Chatbot Nasıl Öğreniyor? Kendi İçerik Tabanınız'],
  ],
  '/hizmetler/web-tasarim-yazilim/': [
    ['Ne dahil, ne değil', 'Ne dahil, ne değil?'],
  ],
  '/hizmetler/web-tasarim-yazilim/kurumsal-web-sitesi/': [
    ['Sayfa Mimarisi ve Bilgi Hiyerarşisi Nasıl Kurulur',
      'Sayfa Mimarisi ve Bilgi Hiyerarşisi Nasıl Kurulur?'],
  ],
};

let sayfa = 0, baslikSayisi = 0; const sorun = [];
console.log(`\n  ${UYGULA ? 'UYGULANIYOR' : 'KURU KOŞU'}\n`);

for (const [yol, ciftler] of Object.entries(DEGISIM)) {
  const f = path.join(S, yol.slice(1), 'index.html');
  if (!fs.existsSync(f)) { sorun.push(yol + ' — sayfa yok'); continue; }
  let h = fs.readFileSync(f, 'utf8');
  const once = h;
  const notlar = [];

  for (const [eski, yeni] of ciftler) {
    /* metin gerçekten bir H2 mi — yanlış yeri değiştirmemek için şart */
    const h2ler = [...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
      .map((m) => m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
    if (!h2ler.includes(eski)) { sorun.push(`${yol} — H2 olarak bulunamadı: "${eski.slice(0, 46)}"`); continue; }
    const kac = h.split(eski).length - 1;
    h = h.split(eski).join(yeni);
    baslikSayisi++;
    notlar.push(`${kac} yerde · ${yeni}`);
  }

  if (h !== once) {
    sayfa++;
    console.log(`  ${yol}`);
    notlar.forEach((n) => console.log(`      ${n}`));
    if (UYGULA) fs.writeFileSync(f, h, 'utf8');
  }
}

console.log(`\n  ${sayfa} sayfa · ${baslikSayisi} başlık`);
if (sorun.length) { console.log('\n  ✗ SORUNLU:'); sorun.forEach((x) => console.log('    ' + x)); }
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
