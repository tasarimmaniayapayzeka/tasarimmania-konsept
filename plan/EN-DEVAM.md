# İngilizce sürüm — devam notu

**Son güncelleme:** 7 Eylül 2026 · **68 İngilizce sayfa canlı** (33 sayfa + 35 blog sayfası) · **SEO kümesi TAMAM (8/8)** · **E-Ticaret Deneyimi kümesi TAMAM (6/6)** · **Mobil kümesi TAMAM (6/6)**

Biten: `/en/` · `about` · `contact` · `services` · `blog` · `get-a-quote` ·
`web-design` · `mobile-app-development` · `digital-marketing` · `seo` ·
`video-production` · `graphic-design` · `corporate-website` ·
`ecommerce-website` · `ai-services` · `custom-software-development` ·
`website-maintenance` · `ios-android-app-development` · `react-native-development` · `app-ui-ux-design` · `app-store-optimization` · `google-ads` · `meta-ads` · `performance-marketing` · `social-media-management` · `commercial-video-production` · `product-video-production` · `short-form-video` · `ai-video-production` · `technical-seo` · `seo-content-strategy` · `local-seo` · `ecommerce-seo` · `multilingual-seo`

**BEŞ MODÜLÜN 27 HİZMET SAYFASININ TAMAMI İNGİLİZCE.**
Ana sayfa + 6 kurumsal sayfa da bitti → 34/34.
Kalan: **42 blog yazısı** ve **`/kvkk/`** (çeviri değil, yeniden yazım).
Ölçüm: `node plan/en-eksik-sayfa.js`

Bu dosya bir sonraki oturum için. Hat kurulu ve çalışıyor; burada yazan
kararlara uymak zorunlu — uyulmazsa site iki farklı İngilizce konuşur.

---

## 1. Hat: bir sayfa nasıl çevrilir

```bash
node plan/en-harita-eksik.js                    # haritada eksik sayfa var mı
node plan/en-metin-cikar.js <sayfa> --json      # C:/Temp/en-<sayfa>.json
node plan/en-kayit-goster.js <sayfa>            # kayıtları oku
# plan/en-ceviri-<sayfa>.json yaz  (anahtar = kayıt numarası)
node plan/en-sayfa-uret.js <sayfa>              # KURU KOŞU — hesap tutuyor mu
node plan/en-sayfa-uret.js <sayfa> --kaynak-yaz # numara kilidi
node plan/en-sayfa-uret.js <sayfa> --uygula
node plan/en-ic-link.js --uygula                # iç bağlantıları İngilizceye çevir
node plan/en-gorsel-ayir.js --uygula            # GÖRSELLERİ AYRI KOPYA + AYRI AD
node plan/en-gorsel-desen-denetim.js            # karşılıksız blog görseli 0 olmalı
node plan/en-blog-dizin-denetim.js              # /en/blog/ dizininde kırık 0 olmalı
node plan/en-birim.js --uygula                  # sayaç birimi + ondalık ayırıcı
node plan/en-hreflang.js --uygula               # karşılıklı hreflang
node plan/en-sitemap.js 2026-09-07 --uygula     # sitemap'e ekle
node plan/geo-denetim-derin.js                  # 0 bulgu olmalı
node plan/etiket-denge.js && node plan/en-js-sozdizim.js && node plan/yol-butunlugu.js
node plan/en-son-tarama.js                      # TÜM EN sayfalarında kalan Türkçe
```

`en-son-tarama.js` üretimden **sonra** tarar; üreticinin raporu üretim
anını gösteriyor, oysa sayfaya sonra `en-ic-link.js`, `en-birim.js` ve
`en-hreflang.js` de dokunuyor. Muaf listesi (marka, kurum, yer, kişi,
müşteri markası) betiğin içinde ve gerekçeli — 20 ad.
Son ölçüm: **34 sayfa, 0 bulgu, noindex'i olmayan sayfa 0.**

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
| Meta uzunluk | title>60 · description<120 veya >165 — üretimden ÖNCE uyarır *(tuzak üç kez sayfa üretildikten sonra yakalanmıştı)* |
| JSON tırnak kaçışı | Aynı metin hem şemada hem gövdede geçiyorsa şemadaki kopya \" ile kaçışlıdır; kaçışlı biçimle ikinci deneme yapılır *(ölçüldü: /blog/yerel-seo/)* |

---

## 2. Terim sözlüğü — ZORUNLU

Bu kararlar 68 sayfada uygulandı. Değiştirmeyin.

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
metro/Marmaray istasyon adları · platform adları ·
HTML etiket adları · schema.org tür adları · **HTML/CSS/JS yorumları**

### Türk kurumları — TEK DESEN
İngilizce okur hangi ülkenin kurumu olduğunu bilmiyor. Kural:
**kısaltma korunur + ülke adı eklenir + kısa açıklama.** Uygulananlar:

| Türkçe | İngilizce | Nerede |
|---|---|---|
| KVKK | KVKK, Türkiye's data protection law | blog/chatbot |
| RTÜK | RTÜK's broadcasting principles | /video-produksiyon/, blog |
| İleti Yönetim Sistemi | the İleti Yönetim Sistemi, Türkiye's message management system | /performans-pazarlama/ |
| Telif Hakları Genel Müdürlüğü | Türkiye's Directorate General of Copyright | /reels-video/, blog |
| ticaret.gov.tr bağlantısı | Türkiye's commercial advertising rules / legislation | 4 sayfa |
| Ticaret Bakanlığı | Türkiye's Ministry of Trade | blog/teknik-seo |
| BTK | BTK, Türkiye's information and communication technologies authority | blog/seo-ve-web-tasarim |
| ETBİS | ETBİS, Türkiye's e-commerce information system | blog/teknik-seo |
| TÜİK | TurkStat *(kurumun kendi resmî İngilizce kısaltması)* | blog/teknik-seo |

⚠ Eski sözlükte "Sağlık Bakanlığı Türkçe kalacak" yazıyordu; o satır bu
desenden **önce** yazılmıştı ve kaldırıldı. Bakanlık adını Türkçe bırakmak
İngilizce okur için anlamsız — desen yukarıdaki gibi.

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
   `description` **≥120** olmalı — denetim kısa olanı da P3 yazıyor.
8. **JS'in ürettiği metin kaynakta görünmez.** İki sızıntı ölçüldü, ikisi de
   metin denetimlerinden geçmişti çünkü ekrana yalnız çalışma anında çıkıyor:
   - `data-birim` özniteliği: sayaç `sayı + dataset.birim` yazıyor. `<b>` içindeki
     yedek metin çevrilmişti ("0 layers") ama öznitelik Türkçe kalmıştı —
     canlanma bitince çip "3 katman" oluyordu. **6 sayfa, 7 çip.**
   - `bicim()` içindeki `.replace('.', ',')`: İngilizce sayfada "1.2s" yerine
     "1,2s". **15 sayfa.** Ana sayfadaki ROAS göstergesi de aynı hattaydı.

   `plan/en-birim.js` ikisini de kapatır ve hatta girdi. İngilizce birimi
   **uydurmaz**, `<b>` yedek metninden türetir — çip ile sayaç aynı kelimeyi
   söylesin diye. Statik ondalık virgülü de düzeltir; binlik ayırıcıya
   dokunmaz (Türkçede binlik grubu hep 3 hane: `48.000` → `48,000` doğru).
9. **Görsel iki dilde AYNI dosya olamaz.** Kullanıcı emri: *"görseller aynı
   etiketle asla gelmesin, Türkçe ve İngilizce ayrı olsun, panele iki kez
   yüklenecek; yoksa spam olur, SEO yapamayız."* Sayfa üreticisi görsel
   yollarını **maskeliyor** (yol maskesi kilidi), yani çeviri sırasında hiç
   dokunulmuyor — bu yüzden 35 İngilizce sayfanın 62 görselinin **60'ı**
   Türkçe adlı dosyaya işaret ediyordu ve hiçbir denetim bunu yakalamadı.
   `plan/en-gorsel-ayir.js` kopyalar + adları çevirir + **sıfır çapraz
   referans** kaldığını doğrular. Sözlük: `plan/en-gorsel-ad.json`.
   - Blog görselleri sözlükte değil, **kuralla** türetilir
     (`gorsel/`→`image/`, `kapak`→`cover`, `govde`→`body`) — 42 yazı aynı desende.
   - Marka/müşteri logolarında **ad korunur, klasör değişir**: dosya adı
     markanın kendi adı, marka adı çevrilmez. Ayrı kopya kuralı karşılanıyor.
   - ⚠ `/assets/` **site kökünün DIŞINDA** (`<kök>/assets`, `<kök>/site`).
     Göreli yolu site köküne göre hesaplamak `../../assets/…` üretti,
     doğrusu `../../../assets/…` — ölçüldü, 102 kırık yol. Göreli yol artık
     gerçek disk yolları üzerinden hesaplanıyor.
10. **Adres haritasında sayfa eksik olabilir.** İki kez oldu: `/hizmetler/`
   ve `/ai-video-produksiyon/`. İkisi de ancak üretici *"adres haritada yok"*
   deyip durunca ortaya çıktı — yani çeviri dosyası boşuna yazılmıştı.
   `plan/en-harita-eksik.js` aynı boşluğu **önceden** gösterir; tura
   başlamadan çalıştırın. Şu an diskteki 34 Türkçe sayfanın 34'ü haritada.

---

## 4. Kalan iş

### Hizmet sayfaları — **BİTTİ (27/27)**
Beş modülün de ana sayfası ve tüm alt hizmetleri İngilizce.
Ölçüm: `node plan/en-eksik-sayfa.js` → *HİZMET sayfası eksik: 0*.

Kalan işi tür tür görmek için:
```bash
node plan/en-eksik-sayfa.js   # hizmet / kurumsal / blog kırılımıyla
```

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
