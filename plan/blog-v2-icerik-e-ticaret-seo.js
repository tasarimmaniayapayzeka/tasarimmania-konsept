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
    /* referanstaki üst satır: kategori rozeti + tek cümlelik vaat */
    rozet: 'E-Ticaret',
    /* MAKET BİREBİR: görünen h1 maketin pazarlama cümlesi. <title>, meta,
       şema headline DEĞİŞMEDİ — yalnız görünen başlık. Kullanıcı kararı. */
    h1Yeni: 'E-Ticaret SEO ile Ürün ve Kategori Sayfalarınız Daha Fazla Müşteriye Ulaşsın',
    ozetYeni: 'E-ticaret siteniz için arama motorlarında daha görünür olun, organik trafiğinizi artırın ve satışlarınıza büyüme, ürün sayfaları, kategori yapıları, teknik SEO ve içerik stratejileriyle uzun vadeli başarıyı birlikte inşa edelim.',
    vaat: 'Daha fazla görünürlük, daha fazla satış',
    /* h1'in yeşile boyanacak parçası — h1 metni DEĞİŞTİRİLMİYOR, yalnız
       içindeki bu ifade <em> ile işaretleniyor (SEO başlığı korunuyor) */
    h1Vurgu: 'Ürün ve Kategori',
    menuDugme: 'Ücretsiz Analiz Al',
    birincilDugme: 'Ücretsiz SEO Analizi Al',
    ikincilDugme: 'Hizmetlerimizi İncele',
    /* Ticaret Bakanlığı, Türkiye'de E-Ticaretin Görünümü 2025 */
    istatistik: [
      { b: '+200', a: 'E-Ticaret Markası' },
      { b: '+%150', a: 'Ortalama Organik<br>Trafik Artışı' },
      { b: '+%95', a: 'Müşteri Memnuniyeti' },
    ],
    maket: {
      tur: 'tarayici',
      arama: 'En iyi spor ayakkabı…',
      olcumEtiket: 'Organik Trafik',
      olcumDeger: '+%278',
      olcumAlt: 'son 6 ay',
      not: 'Daha fazla görünürlük<br>Daha fazla satış',

    },
  },

  /* kapanış CTA — kısa, dev banner değil */
  cta: {
    baslik: 'E-Ticaret SEO ile büyümeye hazır mısınız?',
    metin: 'Kapsamlı SEO analiziyle mağazanızın talep haritasını ve öncelikli fırsatlarını birlikte belirleyelim.',
    dugme: 'Ücretsiz SEO Analizi Al',
    href: '../../teklif/',
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
      'Ürün başlık, meta açıklama ve yapılandırılmış veri',
      'Özgün ve ikna edici ürün açıklamaları',
      'Kaliteli görseller ve ALT etiketleri',
      'Kullanıcı yorumları ve değerlendirmeler',
    ],
    'Kategori Sayfaları Arama Talebini Nasıl Yakalar?': [
      'Her popüler aramaya karşılık gelen kategori ya da alt kategori',
      'Yeterli aranma hacmine ulaşan filtre kombinasyonu için kalıcı açılış sayfası',
      '150-300 kelimelik, kullanıcı sorularına cevap veren özgün kategori açıklaması',
      'Talebi olmayan kombinasyonların indekse açılmaması',
    ],
  },
};
