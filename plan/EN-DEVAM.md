# İngilizce sürüm — devam notu

**Son güncelleme:** 7 Eylül 2026 · **19 İngilizce sayfa canlı**, 96 sayfa toplam

Biten: `/en/` · `about` · `contact` · `services` · `blog` · `get-a-quote` ·
`web-design` · `mobile-app-development` · `digital-marketing` · `seo` ·
`video-production` · `graphic-design` · `corporate-website` ·
`ecommerce-website` · `ai-services` · `custom-software-development` ·
`website-maintenance` · `ios-android-app-development` · `react-native-development`

**Modül 01 (Web & Yazılım) TAMAM** — beş alt hizmetin beşi de İngilizce.

Bu dosya bir sonraki oturum için. Hat kurulu ve çalışıyor; burada yazan
kararlara uymak zorunlu — uyulmazsa site iki farklı İngilizce konuşur.

---

## 1. Hat: bir sayfa nasıl çevrilir

```bash
node plan/en-metin-cikar.js <sayfa> --json      # C:/Temp/en-<sayfa>.json
node plan/en-kayit-goster.js <sayfa>            # kayıtları oku
# plan/en-ceviri-<sayfa>.json yaz  (anahtar = kayıt numarası)
node plan/en-sayfa-uret.js <sayfa>              # KURU KOŞU — hesap tutuyor mu
node plan/en-sayfa-uret.js <sayfa> --kaynak-yaz # numara kilidi
node plan/en-sayfa-uret.js <sayfa> --uygula
node plan/en-ic-link.js --uygula                # iç bağlantıları İngilizceye çevir
node plan/en-hreflang.js --uygula               # karşılıklı hreflang
node plan/en-sitemap.js 2026-09-07 --uygula     # sitemap'e ekle
node plan/geo-denetim-derin.js                  # 0 bulgu olmalı
node plan/etiket-denge.js && node plan/en-js-sozdizim.js && node plan/yol-butunlugu.js
```

**Ana sayfa için `anasayfa` yazın, `/` değil** — Git Bash tek eğik çizgiyi
Windows yoluna çevirir.

### Üreticinin kilitleri (hepsi ölçülmüş hatadan doğdu)
| Kilit | Ne yakalar |
|---|---|
| Sayım | `en` alanı boş kayıt |
| Çakışma | Aynı Türkçe dizgeye farklı çeviri (değişim global, imkânsız) |
| Numara kayması | Çeviri, yazıldığı Türkçe metinle eşleşmiyorsa durur |
| Blok sayımı | Blok sayfada tam 1 kez geçmiyorsa durur |
| Yol maskesi | `href/src/srcset/url()` içine çeviri sızarsa durur |
| Sözdizimi | Çeviri JS/JSON'u bozarsa **diske yazmaz** |

---

## 2. Terim sözlüğü — ZORUNLU

Bu kararlar 12 sayfada uygulandı. Değiştirmeyin.

### Marka vaadi
| Türkçe | İngilizce | Neden |
|---|---|---|
| tek panel | **one place** | H1 genişliği: "one dashboard" 1089px, sınır 1038px. Site geneli tek ifade. |
| BEŞ MODÜL · TEK PANEL | FIVE MODULES · ONE PLACE | altbilgi bandı, 77 sayfa |
| Beş modül, tek panel. | Five modules, one place. | |

### Kabuk (menü/altbilgi — `en-kabuk-ceviri.json`)
İşler→**Work** · Ajans→**Agency** · Teklif Al→**Get a Quote** ·
Hizmetler→**Services** · Süreç→**Process** · İletişim→**Contact** ·
Çalışma Süreci→**How We Work** · Sık Sorulanlar→**FAQs** ·
İçeriğe geç→**Skip to content** · Tüm hizmetler→**All services**

### Sık geçen kalıplar
| Türkçe | İngilizce |
|---|---|
| Kapsam çıkaralım | Let's map the scope |
| Ayrıntılı incele | Look in detail |
| WhatsApp'tan yaz | Message us on WhatsApp |
| Ne dahil, ne değil? | What's included, what isn't? |
| Ayrı kalem | Separate line item |
| Karar vermeden önce bakmak isterseniz | If you'd like to look before deciding |
| Kapsama göre | Depending on scope |
| Daha fazla / Daha az | More / Less |
| Aylık çıkış hakkı | Monthly exit right |
| Devir dosyası/paketi | Handover pack |
| teklif ekinde | in the quote annexe *(Oxford)* |
| Temsilî görsel. | Illustrative graphic. |
| Yatay kaydırın → | Scroll sideways → |
| Tabloyu yana kaydırın | Scroll the table sideways |

### İngiliz İngilizcesi (Oxford)
`colour` · `optimization` *(-ize kabul)* · `annexe` *(isim)* · `licence` *(isim)*
· `centre` · `basket` *(cart DEĞİL)* · `catalogue` · `working days`
*(business days DEĞİL)* · `enquiry` *(inquiry DEĞİL)* · `advert/ad`
*(advertisement DEĞİL)* · `give us a ring` · `sort it` · `chase` · `fortnight`

### Sektör terimleri
| Türkçe | İngilizce | Not |
|---|---|---|
| EBM | CPA | Cost Per Acquisition |
| benzer kitle | lookalike audience | Meta terimi |
| yeniden pazarlama | remarketing | |
| renk düzenleme | colour grading | correction DEĞİL |
| kurgu masası | edit suite | |
| telif ücreti *(oyuncu)* | performers' fees | royalty DEĞİL |
| ürün gönderimi | product seeding | |
| koruma alanı | clear space | logo çevresi |
| kurumsal kimlik | brand identity | corporate DEĞİL |
| kimlik kılavuzu | brand identity guidelines | çoğul |
| onaya hazır | ready for sign-off | |

### Çevrilmeyenler
Marka adları (müşteri logoları) · kişi adları · adres · telefon ·
metro/Marmaray istasyon adları · **RTÜK** · **KVKK** *(kısaltma korunur,
yanına açıklama eklenir)* · Sağlık Bakanlığı · platform adları ·
HTML etiket adları · schema.org tür adları · **HTML/CSS/JS yorumları**

### Temsilî değerler — site geneli tek
`markaniz.com` → **yourbrand.com** · `rakip-a.com` → **competitor-a.com** ·
`Örn. Ayşe Yılmaz` → **e.g. Jane Whitfield** · `ornek@firma.com` →
**name@company.com** · `X Firması` → **Company X**

### Olay adları (GA4/uygulama) — İngilizce yazılır
`form_gonder`→form_submit · `telefon_tikla`→phone_click ·
`whatsapp_tikla`→whatsapp_click · `sepete_ekle`→add_to_basket ·
`reklam_tikla`→ad_click · `satin_alma`→purchase · `kayit_ol`→sign_up ·
`bildirim_izni`→notification_permission · `sahne_onay`→scene_approved ·
`cekim_tamam`→shoot_complete · `disa_aktarim`→export ·
`denetim_bitti`→audit_complete · `kelime_yukseldi`→keyword_up

### Sayı ve para biçimi
- Binlik/ondalık ayırıcı **ters**: `2.350.000` → `2,350,000` · `0,38` → `0.38`
- Para birimi **öne geçer**: `45 – 90 bin ₺` → `₺45k – 90k`
- Ay adları çevrilir: Eylül→September, Ekim→October

---

## 3. Bilinen tuzaklar

1. **Satır sonu dosyadan dosyaya değişir** (CRLF/LF). Blok eşleşmesi artık
   satır sonundan bağımsız — ama elle desen yazarken `\r?\n` kullanın.
2. **`\w` Türkçe harf kapsamaz.** `[A-Za-zÇĞİÖŞÜçğıöşü]` yazın.
3. **Kısa dizge uzun dizgenin içinde geçebilir.** Kayıtlar ve kabuk TEK
   listede birlikte sıralanıyor; yeni sözlük eklerseniz aynı listeye girmeli.
4. **Tümü büyük harf tek kelimeler** (`PAZARLAMA`) ekran etiketidir, kod değil.
5. **H1 genişliği ölçülmeli.** Kanvas tahmini yanıltıyor — adayı iframe'de
   gerçekten render edip `offsetHeight/lineHeight` ile satır sayın.
   Site `display=optional` kullanıyor: **yedek fontta da ölçün**.
6. **Soru biçimli H2 korunmalı.** Denetim hizmet sayfalarında soru biçimli H2 arıyor; Türkçe başlıktaki soru işaretini çeviride düşürmek P2 üretiyor (ölçüldü: /react-native/).
7. **title ≤60, description ≤165 karakter.** Denetim yakalıyor ama üretimden
   önce bakın; aynı Türkçe metin birden çok kayıtta olabilir (çakışma kilidi).

---

## 4. Kalan iş

### Hizmet alt sayfaları — kalan 15 sayfa, ~25.100 kelime
*(Modül 01 alt hizmetlerinin tamamı bitti; kalanlar Modül 02-05)*



`uygulama-arayuz-tasarimi` (169/1689) · `aso` (170/1759) ·
`google-ads` (181/1716) · `meta-reklam` (177/1546) ·
`performans-pazarlama` (157/1592) · `sosyal-medya` (169/1729) ·
`reklam-filmi` (166/1577) · `urun-videosu` (174/1710) ·
`reels-video` (167/1768) · `ai-video-produksiyon` (169/1727) ·
`teknik-seo` (168/1645) · `seo-icerik` (162/1509) · `yerel-seo` (156/1590) ·
`e-ticaret-seo` (153/1588) · `cok-dilli-seo` (170/1553)

Öncelik: iç bağlantı sayısına göre — `en-ic-link.js` çalıştırıp listeye bakın.

### Blog — 42 yazı
Slug'lar **İngilizce odak kelimeden** türetilecek, Türkçe slug'ın çevirisi
olmayacak (`en-url-haritasi.json` → `blog._kural`). Başlıkların çevirisi
**zaten hazır**: `plan/en-blog-ceviri-uret.js` içindeki `BASLIK` sözlüğü.

### Özel durumlar
- **`/kvkk/`** (57 kayıt) — birebir çeviri **YAPILMAYACAK**. KVKK Türk
  mevzuatına özgü; İngilizce sürümde karşılığı genel gizlilik politikasıdır,
  metin yeniden yazılmalı. Haritada notu var.
- **`/referanslar/`** — Türkçesi de yazılmamış (müşteri izni bekliyor).
- **`404.html`** — çevrilmedi.

### İki açık kalem
1. **Dil seçici YOK.** İngilizce sayfaya ancak adres yazarak girilir.
   İngilizce sürüm bitince **tek geçişte** eklenecek — şimdi eklenirse
   olmayan adrese işaret eder (hreflang'daki ilkenin aynısı).
2. **`/en/blog/` öksüz** — İngilizce blog yazıları gelince kapanır.

### Değişmeyen kurallar
- **noindex açılmayacak** (89/89 sayfa + `robots.txt Disallow: /`).
- Tasarıma dokunulmuyor: İngilizce sayfa, Türkçe sayfanın **bit bit kopyası**;
  yalnız insanın gördüğü metin değişir. CSS/JS/yapı/sınıf adları aynı kalır.
