/* /blog/e-ticaret-seo/ — v2 tasarım dili içerik eşlemesi
 *
 * ⚠⚠ REFERANSTAKİ RAKAMLAR KOPYALANMADI — BİLEREK.
 *   Verilen tasarım örneğinde "+200 E-Ticaret Markası", "+%150 Ortalama
 *   Organik Trafik Artışı", "+%95 Müşteri Memnuniyeti" ve "+%278 son 6 ay"
 *   yazıyor. Bunlar TasarımMania için DOĞRULANMIŞ veri değil; siteye
 *   konsaydı uydurma performans iddiası olurdu. Bu projenin kuralı da net:
 *   rakamın tek kaynağı var, sayfa içeriği ondan sapamaz.
 *   Yerine yazının KENDİ kaynaklı sayıları kullanıldı — üçü de
 *   Ticaret Bakanlığı'nın "Türkiye'de E-Ticaretin Görünümü 2025" raporundan
 *   ya da yazının kendi anlattığı mimari kuraldan geliyor.
 *   Gerçek rakam gelirse burası değiştirilir; şablon hazır.
 *
 * ⚠ MAKETLERDEKİ ÜRÜNLER TEMSİLÎ ÇİZİM. Gerçek ürün fotoğrafı yok:
 *   telif sorunu ve 84 sayfa × 2 dil kopya yükü doğururdu.
 */
const SAHNE = require('./blog-sahne-e-ticaret-seo.js');
const sahneBul = (capa) => SAHNE.sahneler.find((s) => s.capa.includes(capa));

module.exports = {
  hero: {
    birincilDugme: 'Ücretsiz SEO Analizi Al',
    ikincilDugme: 'E-Ticaret SEO Hizmeti',
    /* Ticaret Bakanlığı, Türkiye'de E-Ticaretin Görünümü 2025 */
    istatistik: [
      { b: '634.611', a: '2025’te e-ticaret yapan işletme <br>(Ticaret Bakanlığı)' },
      { b: '600.800', a: '2024’teki sayı — bir yılda <br>33.811 işletme eklendi' },
      { b: '3 tık', a: 'Ana sayfadan ürüne izin verilen <br>en fazla adım' },
    ],
    maket: {
      tur: 'tarayici',
      arama: 'En iyi spor ayakkabı…',
      olcumEtiket: 'E-ticaret yapan işletme',
      olcumDeger: '+%5,6',
      olcumAlt: '2024 → 2025 · Ticaret Bakanlığı',
      not: 'Talep büyüyor, <br>görünürlük yarışı da',
      aciklama: 'Temsilî arayüz çizimi. Eğri, Ticaret Bakanlığı’nın açıkladığı işletme sayısı değişimini gösterir; mağaza performansı vaadi değildir.',
    },
  },

  /* başlıkta yeşile boyanacak parça */
  vurgular: {
    'E-Ticaret SEO Nedir, Sıralamayı Üreten Mekanizma Nasıl Çalışır?': 'Sıralamayı Üreten Mekanizma',
    'Kategori Sayfaları Arama Talebini Nasıl Yakalar?': 'Arama Talebini',
    'Ürün Sayfasında Sıralamayı Hangi Sinyaller Üretir?': 'Hangi Sinyaller',
    'Site Mimarisi ve İç Bağlantı Akışı Neden Belirleyicidir?': 'İç Bağlantı Akışı',
    'İçerik Katmanı Satış Sayfalarını Nasıl Güçlendirir?': 'İçerik Katmanı',
    'Mağazanız İçin Profesyonel E-Ticaret SEO Desteği Alın': 'E-Ticaret SEO Desteği',
    'Kategori Sayfası ile Ürün Sayfası Optimizasyonu Karşılaştırması': 'Karşılaştırması',
  },

  maketler: {
    'E-Ticaret SEO Nedir, Sıralamayı Üreten Mekanizma Nasıl Çalışır?': {
      tur: 'sahne', ...sahneBul('E-Ticaret SEO Nedir'),
      aciklama: 'Mekanizma üç dişliyle döner: talep sayfalara dağılır, her sayfa tek niyete odaklanır, otorite iç bağlantılarla akar.',
    },
    'Kategori Sayfaları Arama Talebini Nasıl Yakalar?': {
      tur: 'sahne', ...sahneBul('Kategori Sayfaları'),
      aciklama: 'Geniş aramaları kategori üstlenir; ürün sayfaları o çatının altında spesifik talebi karşılar.',
    },
    'Ürün Sayfasında Sıralamayı Hangi Sinyaller Üretir?': {
      tur: 'urun', puan: 4,
      aciklama: 'Temsilî ürün sayfası çizimi: özgün açıklama, yapılandırılmış veri ve kullanıcı etkileşimi aynı şablonda buluşur.',
    },
    'Site Mimarisi ve İç Bağlantı Akışı Neden Belirleyicidir?': {
      tur: 'sahne', ...sahneBul('Site Mimarisi'),
      aciklama: 'Güç ana sayfadan kategorilere, oradan ürünlere akar. Akışı kesen kopuk sayfa en sık gözden kaçan zayıf halkadır.',
    },
  },

  /* yeşil daireli kontrol listeleri — hepsi yazının KENDİ metninden çıkarıldı */
  listeler: {
    'Ürün Sayfasında Sıralamayı Hangi Sinyaller Üretir?': [
      'Üretici metnini kopyalamayan, kendi ölçümünüzle yazılmış özgün açıklama',
      'Fiyat, stok ve değerlendirme puanını makineye ileten yapılandırılmış veri',
      'Zengin sonuç gösterimine adaylık ve buradan gelen tıklama artışı',
      'Her yeni değerlendirmeyle sayfaya eklenen taze ve özgün metin',
    ],
    'Kategori Sayfaları Arama Talebini Nasıl Yakalar?': [
      'Her popüler aramaya karşılık gelen kategori ya da alt kategori',
      'Yeterli aranma hacmine ulaşan filtre kombinasyonu için kalıcı açılış sayfası',
      '150-300 kelimelik, kullanıcı sorularına cevap veren özgün kategori açıklaması',
      'Talebi olmayan kombinasyonların indekse açılmaması',
    ],
  },
};
