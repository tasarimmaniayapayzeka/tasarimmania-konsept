/* /blog/e-ticaret-seo/ — bölüm sahneleri, .akv adımları ve döngü videosu
 *
 * Her yazının KENDİ dosyası olacak. Şablon sahne kullanılmıyor: aynı şemayı
 * 42 yazıya dağıtmak tekrar hissi yaratır ve kullanıcı bunu zaten reddetti.
 *
 * Sahne dili hero'dakiyle aynı: .cz-cizgi kendini çizer (--u = yaklaşık yol
 * uzunluğu, --d = gecikme), .cz-dolgu sonradan belirir, .cz-etiket en son.
 * Döngü 9 sn. viewBox 430x210.
 *
 * ⚠ --u YOL UZUNLUĞUNDAN KÜÇÜK OLMAMALI. stroke-dasharray yoldan kısaysa
 *   çizgi kesik kesik görünür ve "çiziliyor" izlenimi bozulur. Şüphedeyken
 *   büyük tut: fazlası yalnız çizim başlangıcını biraz erkene alır.
 *
 * ⚠ ÇAPA METNİ BİREBİR OLMALI. Sahne, çapa dizgesinin ÖNÜNE konuyor;
 *   dizge bulunamazsa betik sahneyi atlar ve raporda söyler (sessizce
 *   geçmez).
 */
module.exports = {
  /* .akv bloğundaki döngü videosu — bu yazının konusuna ait olan
     mevcut modül videosu. /blog/<slug>-yeni/ üç kat aşağıda. */
  video: {
    dosya: 'assets/modul-seo/e-ticaret-seo.mp4',
    src: '../../../assets/modul-seo/e-ticaret-seo.mp4',
    poster: '../../../assets/modul-seo/e-ticaret-seo.jpg',
  },

  /* Döngü videosunun yerleşeceği çapa. Sahnelerle AYNI listeye girer;
     taraf (sağ/sol) belge sırasına göre otomatik atanır. */
  videoCapa: '<h2>Ürün Sayfasında Sıralamayı Hangi Sinyaller Üretir?</h2>',
  videoAciklama: 'Talep analizi, sayfa eşleştirme, sinyal üretimi ve otorite dağıtımı sürekli bakım ister; hizmet bu döngüyü kurar, ölçer ve raporlar.',

  sahneler: [
    /* ── 1: üç dişli — mekanizmanın kendisi ── */
    {
      capa: '<h2>Kategori Sayfaları Arama Talebini Nasıl Yakalar?</h2>',
      bar: 'sıralamayı üreten mekanizma',
      rozet: 'ÜÇ DİŞLİ',
      aciklama: 'Mekanizma üç dişliyle döner: arama talebi sayfalara dağılır, her sayfa tek niyete odaklanır, otorite iç bağlantılarla doğru sayfalara akar. Halkalardan biri koptuğunda diğerleri de güç kaybeder.',
      cipler: [
        { u: 'TALEP', s: '3', birim: ' katman' },
        { u: 'SAYFA', s: '2', birim: ' tür' },
        { u: 'AKIŞ', s: '3', birim: ' tık' },
      ],
      svg: `<circle class="cz-cizgi" style="--u:290;--d:0.00s" cx="108" cy="104" r="46"/>
<circle class="cz-dolgu" style="--d:0.00s" cx="108" cy="104" r="46"/>
<circle class="cz-cizgi" style="--u:220;--d:0.50s" cx="215" cy="104" r="35"/>
<circle class="cz-dolgu" style="--d:0.50s" cx="215" cy="104" r="35"/>
<circle class="cz-cizgi" style="--u:170;--d:1.00s" cx="308" cy="104" r="27"/>
<circle class="cz-dolgu" style="--d:1.00s" cx="308" cy="104" r="27"/>
<path class="cz-cizgi" style="--u:60;--d:1.40s" d="M154 104 H180"/>
<path class="cz-cizgi" style="--u:60;--d:1.65s" d="M250 104 H281"/>
<circle class="cz-cizgi" style="--u:44;--d:1.90s" cx="108" cy="104" r="7"/>
<circle class="cz-cizgi" style="--u:38;--d:2.05s" cx="215" cy="104" r="6"/>
<circle class="cz-cizgi" style="--u:32;--d:2.20s" cx="308" cy="104" r="5"/>
<path class="cz-sonradan" style="--d:2.40s" d="M62 168 H370"/>
<text class="cz-etiket vurgu" style="--d:2.60s" x="108" y="182" text-anchor="middle">TALEP</text>
<text class="cz-etiket" style="--d:2.75s" x="215" y="182" text-anchor="middle">SAYFA</text>
<text class="cz-etiket" style="--d:2.90s" x="308" y="182" text-anchor="middle">OTORİTE</text>
<text class="cz-etiket" style="--d:3.10s" x="215" y="34" text-anchor="middle">ÜÇÜ AYNI PLANDA BULUŞUR</text>`,
    },

    /* ── 2: ürün sayfası sinyalleri ── */
    {
      capa: '<h2>Site Mimarisi ve İç Bağlantı Akışı Neden Belirleyicidir?</h2>',
      bar: 'ürün sayfasını sıralatan sinyaller',
      rozet: 'ÜÇ SİNYAL',
      aciklama: 'Ürün sayfasını sıralatan üç ana sinyal: özgün açıklama, yapılandırılmış veri ve kullanıcı etkileşimi. Sinyaller birleştiğinde sayfa hem makineye hem alıcıya aynı hikâyeyi anlatır.',
      cipler: [
        { u: 'ÖZGÜN METİN', s: '1', birim: '' },
        { u: 'ŞEMA', s: '1', birim: '' },
        { u: 'ETKİLEŞİM', s: '1', birim: '' },
      ],
      svg: `<rect class="cz-cizgi" style="--u:300;--d:0.00s" x="26" y="46" width="104" height="118" rx="9"/>
<rect class="cz-dolgu" style="--d:0.00s" x="26" y="46" width="104" height="118" rx="9"/>
<path class="cz-cizgi" style="--u:180;--d:0.40s" d="M42 74 H114 M42 90 H100 M42 106 H108"/>
<text class="cz-etiket vurgu" style="--d:0.90s" x="78" y="182" text-anchor="middle">ÜRÜN SAYFASI</text>
<path class="cz-cizgi" style="--u:70;--d:1.20s" d="M130 78 H196"/>
<path class="cz-cizgi" style="--u:70;--d:1.45s" d="M130 105 H196"/>
<path class="cz-cizgi" style="--u:70;--d:1.70s" d="M130 132 H196"/>
<rect class="cz-cizgi" style="--u:200;--d:1.95s" x="200" y="58" width="120" height="38" rx="7"/>
<rect class="cz-dolgu" style="--d:1.95s" x="200" y="58" width="120" height="38" rx="7"/>
<rect class="cz-cizgi" style="--u:200;--d:2.25s" x="200" y="104" width="120" height="38" rx="7"/>
<rect class="cz-dolgu" style="--d:2.25s" x="200" y="104" width="120" height="38" rx="7"/>
<rect class="cz-cizgi" style="--u:200;--d:2.55s" x="200" y="150" width="120" height="38" rx="7"/>
<rect class="cz-dolgu" style="--d:2.55s" x="200" y="150" width="120" height="38" rx="7"/>
<text class="cz-etiket" style="--d:2.85s" x="212" y="82">ÖZGÜN AÇIKLAMA</text>
<text class="cz-etiket" style="--d:3.00s" x="212" y="128">YAPILANDIRILMIŞ VERİ</text>
<text class="cz-etiket" style="--d:3.15s" x="212" y="174">KULLANICI ETKİLEŞİMİ</text>
<path class="cz-sonradan" style="--d:3.40s" d="M330 77 C372 77 372 123 340 123 M330 123 H340 M330 169 C372 169 372 123 340 123"/>
<text class="cz-etiket vurgu" style="--d:3.70s" x="392" y="127" text-anchor="middle">SIRA</text>`,
    },

    /* ── 3: bağlantı akışı ── */
    {
      capa: '<h2>Mağazanız İçin Profesyonel E-Ticaret SEO Desteği Alın</h2>',
      bar: 'otorite ana sayfadan ürüne akar',
      rozet: 'AKIŞ',
      aciklama: 'Dış dünyadan en çok referans alan sayfa çoğu mağazada ana sayfadır. Menü o gücü kategorilere, kategori de listelediği ürünlere aktarır. Ana sayfadan üç tıkla ulaşılamayan ürün önemsiz kalır.',
      cipler: [
        { u: 'KAYNAK', s: '1', birim: ' sayfa' },
        { u: 'KATEGORİ', s: '2', birim: '' },
        { u: 'ÜRÜN', s: '4', birim: '' },
      ],
      svg: `<rect class="cz-cizgi" style="--u:210;--d:0.00s" x="18" y="86" width="82" height="40" rx="8"/>
<rect class="cz-dolgu" style="--d:0.00s" x="18" y="86" width="82" height="40" rx="8"/>
<text class="cz-etiket vurgu" style="--d:0.40s" x="59" y="146" text-anchor="middle">ANA SAYFA</text>
<rect class="cz-cizgi" style="--u:190;--d:0.80s" x="166" y="46" width="78" height="36" rx="7"/>
<rect class="cz-dolgu" style="--d:0.80s" x="166" y="46" width="78" height="36" rx="7"/>
<rect class="cz-cizgi" style="--u:190;--d:1.05s" x="166" y="128" width="78" height="36" rx="7"/>
<rect class="cz-dolgu" style="--d:1.05s" x="166" y="128" width="78" height="36" rx="7"/>
<text class="cz-etiket" style="--d:1.30s" x="205" y="40" text-anchor="middle">KATEGORİ</text>
<text class="cz-etiket" style="--d:1.45s" x="205" y="180" text-anchor="middle">KATEGORİ</text>
<path class="cz-cizgi" style="--u:110;--d:1.70s" d="M100 100 C134 100 134 64 166 64"/>
<path class="cz-cizgi" style="--u:110;--d:1.95s" d="M100 112 C134 112 134 146 166 146"/>
<rect class="cz-cizgi" style="--u:150;--d:2.20s" x="312" y="30" width="64" height="28" rx="6"/>
<rect class="cz-dolgu" style="--d:2.20s" x="312" y="30" width="64" height="28" rx="6"/>
<rect class="cz-cizgi" style="--u:150;--d:2.40s" x="312" y="68" width="64" height="28" rx="6"/>
<rect class="cz-dolgu" style="--d:2.40s" x="312" y="68" width="64" height="28" rx="6"/>
<rect class="cz-cizgi" style="--u:150;--d:2.60s" x="312" y="114" width="64" height="28" rx="6"/>
<rect class="cz-dolgu" style="--d:2.60s" x="312" y="114" width="64" height="28" rx="6"/>
<rect class="cz-cizgi" style="--u:150;--d:2.80s" x="312" y="152" width="64" height="28" rx="6"/>
<rect class="cz-dolgu" style="--d:2.80s" x="312" y="152" width="64" height="28" rx="6"/>
<path class="cz-cizgi" style="--u:90;--d:3.00s" d="M244 58 C282 58 282 44 312 44 M244 64 C282 64 282 82 312 82"/>
<path class="cz-cizgi" style="--u:90;--d:3.25s" d="M244 140 C282 140 282 128 312 128 M244 146 C282 146 282 166 312 166"/>
<text class="cz-etiket vurgu" style="--d:3.55s" x="344" y="200" text-anchor="middle">ÜRÜN SAYFALARI</text>`,
    },
  ],
};
