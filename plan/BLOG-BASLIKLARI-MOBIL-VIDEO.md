# Blog başlıkları — mobil uygulama, video prodüksiyon, AI entegrasyonu

**Neden bu liste:** iç link denetiminde 10 hizmet sayfası blog bağı alamadı.
Sebep basit — o konularda yazı yok. Link uydurmak yerine yazı üretilecek.

**Standart:** [İHSAN SEO BLOG] · 15 yazı/ay · 10 TOFU / 3 MOFU / 2 BOFU ·
odak ifade 2-3 kelime · yoğunluk %2.2-2.4 · 1000-1200 kelime ·
hub & spoke iç link (2 yukarı + 3 yatay + 2 dönüşüm).

---

## 0. ÖLÇÜM — konular tahminle değil hasatla seçildi

Google autocomplete + alfabe çorbası, 9 tohum kümesi.

### ⚠ Önce iki tuzak (ikisi de ölçümde çıktı)

**1. Google bu uçta ISO-8859-9 döndürüyor.** `&oe=utf-8&ie=utf-8` eklenmeden
Türkçe karakterler bozuluyor ve varyantların **%80'i çöpe gidiyor**
(mobil-uygulama: 124 → 22). İlk hasatta bu yaşandı; standarttaki `hasat.js`
aracında da aynı hata olabilir, kontrol edilmeli.

**2. "ASO" Türkçede tıbbi bir terim.** Hasat: `aso nedir kan tahlili`,
`aso kaç olmalı`, `aso açılımı nedir tıp`, `kandaki aso değeri`.
App Store Optimization anlamı arama hacminde **görünmüyor**.
→ **Odak ifade olarak "aso" KULLANILMAYACAK.** Yerine
"uygulama mağaza optimizasyonu".

### Ham sayı yanıltır — süzülmüş genişlik

| Küme | Ham varyant | Alıcı niyeti | **Ticari niyet** |
|---|---|---|---|
| reklam filmi | 390 | 310 | **67** |
| mobil uygulama | 112 | 108 | **18** |
| video prodüksiyon | 31 | 30 | **6** |
| react native | 212 | 158 | **3** |
| ai video | 193 | 172 | **3** |
| ürün videosu | 32 | 28 | **1** |
| aso | 49 | 21 | **1** (o da tıbbi) |
| ios/android | 118 | 91 | **0** |
| ai chatbot | 13 | 13 | **0** |

**Elenen desenler:** iş ilanı/maaş/sınav soruları, cihaz değiştirirken
uygulama aktarma, geliştirici kütüphane sorguları (`react native async
storage` gibi), ücretsiz/apk aramaları.

### Bundan çıkan iki karar

**a) `ios-android` ve `ai-chatbot` sayfalarının kendi adları aranmıyor.**
`ios android uygulama` aramalarının tamamı *telefon değiştirirken uygulama
taşıma*. O sayfalara yazı yazılacak ama **odak ifade sayfanın adı
olmayacak** — alıcı niyetinin yaşadığı komşu ifade hedeflenecek
(`native uygulama geliştirme`, `hangi dil`).

**b) Reklam filmi konusu en geniş.** 67 ticari varyantla diğerlerinin
katı — bu kümeye daha çok yazı ayrıldı.

---

## 1. AYIN 15 YAZISI

Ayırt edici eksen her yazıda yazılı (kanibalizasyon sözleşmesi, Madde 7).
**"2 YUKARI"** sütunu, yazının hangi hizmet sayfalarına link vereceğini
söyler — iç link boşluğu bu sütunla kapanıyor.

### KÜME A — Mobil uygulama *(hub: /hizmetler/mobil-uygulama/)*

| # | Başlık | Odak (2-3 kelime) | Tür | Eksen | 2 YUKARI |
|---|---|---|---|---|---|
| 1 | Mobil Uygulama Geliştirme Maliyeti Neye Göre Değişir? | mobil uygulama geliştirme | TOFU | MALİYET | mobil-uygulama · ios-android |
| 2 | Mobil Uygulama Yaptırmadan Önce Hangi Sorular Sorulur? | uygulama yaptırma | TOFU | KARAR | mobil-uygulama · react-native |
| 3 | Mobil Uygulama Geliştirme Süreci Kaç Aşamadan Oluşur? | geliştirme süreci | TOFU | SÜRE | mobil-uygulama · ios-android |
| 4 | Native mi Cross-Platform mı? Uygulama Mimarisi Seçimi | native uygulama | **MOFU** | MEKANİZMA | ios-android · react-native |
| 5 | React Native mi Flutter mı? Tek Kod Tabanı Karşılaştırması | react native | **MOFU** | KARŞILAŞTIRMA | react-native · mobil-uygulama |
| 6 | Uygulama Mağaza Optimizasyonu Nasıl Yapılır? 8 Adım | mağaza optimizasyonu | **BOFU** | ROTA | aso-uygulama-pazarlamasi · mobil-uygulama |

*Neden 4 ve 5 MOFU:* ikisi de karşılaştırma — standart MOFU'da **tablo
zorunlu** diyor, konu zaten tabloya uygun.
*Neden 6 BOFU:* numaralı adım listesi zorunluluğu doğal olarak karşılanıyor.

### KÜME B — Video prodüksiyon *(hub: /hizmetler/video-produksiyon/)*

| # | Başlık | Odak | Tür | Eksen | 2 YUKARI |
|---|---|---|---|---|---|
| 7 | Reklam Filmi Çekimi Hangi Aşamalardan Geçer? | reklam filmi çekimi | TOFU | SÜREÇ | reklam-filmi · video-produksiyon |
| 8 | Reklam Filmi Fiyatını Belirleyen Kalemler Nelerdir? | reklam filmi fiyat | TOFU | MALİYET | reklam-filmi · video-produksiyon |
| 9 | Storyboard Ne İşe Yarar, Çekimden Önce Neyi Kurtarır? | storyboard | TOFU | HAZIRLIK | reklam-filmi · video-produksiyon |
| 10 | Reklam Filmi Ajansı Seçerken Nelere Bakılır? | reklam filmi ajansı | TOFU | SEÇİM | video-produksiyon · reklam-filmi |
| 11 | Ürün Videosu Çekimi: Stüdyo mu, Mekân mı? | ürün videosu | **MOFU** | MEKÂN | urun-videosu · video-produksiyon |
| 12 | E-Ticaret Ürün Videosu Formatları ve Ölçüleri | ürün videosu formatı | TOFU | GÖRÜNÜM | urun-videosu · web-tasarim-yazilim/e-ticaret |
| 13 | Yapay Zeka ile Video Üretimi Nerede İşe Yarar, Nerede Yaramaz? | yapay zeka video | TOFU | SINIR | ai-destekli-produksiyon · video-produksiyon |
| 14 | Kamerasız Ürün Videosu Nasıl Üretilir? Adım Adım | kamerasız video | **BOFU** | ROTA | ai-destekli-produksiyon · urun-videosu |

### KÜME C — Site üstü yapay zekâ *(hub: /hizmetler/web-tasarim-yazilim/)*

| # | Başlık | Odak | Tür | Eksen | 2 YUKARI |
|---|---|---|---|---|---|
| 15 | Web Sitesine Chatbot Eklemek Neyi Değiştirir? | web sitesi chatbot | TOFU | ETKİ | ai-entegrasyonu · web-tasarim-yazilim |

---

## 2. İÇ LİNK KAPANMASI — kontrol

Her hedef sayfanın **en az 2** yazıdan link alması şart (blok kuralı).

| Hedef sayfa | Alacağı yazı | Sayı |
|---|---|---|
| `/mobil-uygulama/` | 1, 2, 3, 5, 6 | **5** ✓ |
| `/mobil-uygulama/ios-android/` | 1, 3, 4 | **3** ✓ |
| `/mobil-uygulama/react-native/` | 2, 4, 5 | **3** ✓ |
| `/mobil-uygulama/aso-uygulama-pazarlamasi/` | 6 | **1** ⚠ |
| `/video-produksiyon/` | 7, 8, 9, 10, 11, 13 | **6** ✓ |
| `/video-produksiyon/reklam-filmi/` | 7, 8, 9, 10 | **4** ✓ |
| `/video-produksiyon/urun-videosu/` | 11, 12, 14 | **3** ✓ |
| `/video-produksiyon/ai-destekli-produksiyon/` | 13, 14 | **2** ✓ |
| `/web-tasarim-yazilim/ai-entegrasyonu/` | 15 | **1** ⚠ |

**İki sayfa eksik kalıyor.** Sebebi ölçüm: ASO ve site-chatbot konularında
ticari arama yok, zorlama ikinci yazı üretmek "arama hacmi olmayan sayfa"
demek olurdu.

**Çözüm — ikinci ay:**
- `mağaza görselleri` odaklı ikinci ASO yazısı (App Store ekran görüntüsü
  ve simge kuralları — ürün, arama hacminden bağımsız gerçek bir soru)
- `chatbot whatsapp aktarım` odaklı ikinci AI yazısı (hasatta
  `whatsapp yapay zeka chatbot` görünüyor)

Ya da o iki sayfa tek yazıyla bırakılır — blok kuralı 2 istiyor ama kuralı
gevşetmek yerine yazıyı üretmek doğru olan.

---

## 3. YAZIM ÖNCESİ ZORUNLU NOTLAR

**Odak ifade uzun soru cümlesi OLMAYACAK.** Standartta ölçülmüş hata:
ilk 15 yazıda odak uzun cümleydi, yoğunluk %0.30 çıktı, hepsi turuncu.
Tablodaki "Odak" sütunu 2-3 kelime — gövdede o geçecek, başlıktaki uzun
soru H2/SSS'ye gidecek.

**Tam geçiş sayısı** (1100 kelime, %2.4):
2 kelimelik odak ≈ 12-14 · 3 kelimelik ≈ 9-10.

**"Uydurma istatistik = bloker" burada da geçerli.** Sağlık projesi değil
ama kural aynı: kaynaksız oran/yüzde/TL yazılmaz. Reklam filmi ve uygulama
maliyet yazılarında bu tuzağa düşmek çok kolay — **fiyat aralığı vermek
yerine maliyeti belirleyen kalemleri anlat.**

**Snippet tavanı:** her H2'nin doğrudan cevabının **ilk cümlesi tek başına
≤160 karakterde** çekirdek cevabı versin.

**Yoast okunabilirlik ayrı sekme:** edilgen çatı ≤%10, 15+ kelimelik cümle
≤%20. Baştan etken ve kısa yaz.

**Zincir kırığı yasağı:** yayında olmayan kardeşe link verilmez. Küme
tamamlanınca toplu enjeksiyon turu yapılır.

**Denetim:** `node plan/seo-denetim.js <yazi/index.html> "<odak>"`

### ⚠ Tek kanibalizasyon uyarısı — yazı 12

Otomatik benzerlik denetimi bir çakışma buldu:

> **Yeni 12:** "E-Ticaret Ürün Videosu Formatları ve Ölçüleri"
> **Mevcut:** "E-Ticaret Ürün Görseli Satışı Etkiler mi?"
> *(ortak: e-ticaret, ürün)*

**Gerçek çakışma değil** — biri **durağan görsel**, diğeri **video**. Ama
komşu oldukları için sözleşme gereği:

- Yazı 12'nin ayırt edici ekseni **FORMAT/ÖLÇÜ** (en-boy oranı, süre,
  pazaryeri şartnameleri). Görselin satışa etkisini **anlatmayacak.**
- Yazı 12, mevcut görsel yazısına **kardeş linki verecek** ama konusunu
  tekrarlamayacak (Madde 7: "kardeş yazıya link ver ama konusunu anlatma").
- Mevcut görsel yazısı da yayın sonrası toplu enjeksiyon turunda 12'ye
  link alacak.

Kalan 14 başlıkta mevcut 27 yazıyla konu çakışması yok (ölçüldü).

---

## 4. SIRA ÖNERİSİ

Ölçülen genişliğe göre: **önce Küme B (reklam filmi)** — 67 ticari varyantla
en geniş konu, en hızlı getiri. Sonra Küme A, en son Küme C.

Ama iç link boşluğunu kapatmak öncelikse sıra farklı olur: **1, 4, 5, 6**
(mobil modülünün dördü) önce yazılırsa o modül tek turda kapanır.

---

## 5. ÜRETİM DURUMU

| # | Yazı | Durum |
|---|---|---|
| 1 | Mobil Uygulama Geliştirme Maliyeti | ✅ **TAMAM** — 18/18 eşik, 2 görsel, dizin+sitemap kayıtlı |
| 2-15 | kalan 14 başlık | ⬜ sırada |

**Yayın takvimi:** mevcut kartlar 1 Eylül → 23 Ekim 2026 arası 2 günde bir.
Yeni yazılar oradan devam ediyor: yazı 1 = **25 Ekim 2026**, sonrakiler 27, 29, 31 Ekim…

### Yazı üretim hattı (sırayla koşulacak)

```
node plan/blog-uret.js    plan/yazi-NN-*.json                    # HTML üret
node plan/seo-denetim.js  site/blog/<slug>/index.html "<odak>" plan/yazi-NN-*.json
node plan/blog-kaydet.js  plan/yazi-NN-*.json --uygula           # dizin kartı + sitemap
```

`blog-kaydet.js` **yeni** — yazı üretiliyor ama `/blog/` listesine ve sitemap'e
girmiyordu, yani kimse ulaşamıyordu. Etkisiz tekrar korumalı (iki kez koşmak
kart çoğaltmaz).

### ⚠ Yoğunluk ölü bölgesi — yazmadan önce hesapla

3 kelimelik odakta her geçiş yoğunluğu `%3/N·100` oynatır. %2.2-2.4 bandı dar
olduğundan **bazı kelime sayılarında hiçbir tam sayı bandın içine düşmez.**
Yazı 1'de bu yaşandı: 1099 kelimede 8 geçiş %1.75, 9 geçiş %2.46 — ikisi de dışarıda.

| Gövde kelime | Gereken tam geçiş |
|---|---|
| 1000-1090 | 8 |
| **1091-1124** | **hiçbiri — bu aralıktan kaçın** |
| 1125-1227 | 9 |

Gövde uzunluğunu bu tabloya göre seç; sonradan kelime eklemek/çıkarmak zorunda kalma.

### Denetim aracında düzeltilen üç ölçüm hatası

Bunlar yazının değil, **denetçinin** hatasıydı; yazı 2-15'te de etkili:

1. **Edilgen dedektörü 24 vakanın 8'inde yanılıyordu.** "yapıldı"yı kaçırıyor
   (Türkçe harften sonra `\b` tutmuyor), "sürebilir/bildirim/yanıltır"ı edilgen
   sanıyordu. Düzeltildi → 0/24. Bekçisi: `node plan/edilgen-test.js`.
2. **Cümle sınırı blok sınırını görmüyordu.** Noktasız bloklar (tablo hücreleri,
   düğme yazıları) tek dev cümleye yapışıp "uzun cümle" oranını şişiriyordu —
   karşılaştırma tablosu tek başına 69 kelimelik "cümle" sayılıyordu.
3. **Eş anlamlı çift listesi e-ticaret yazısına gömülüydü;** başka konudaki yazı
   bu maddeyi asla geçemiyordu. Artık 3. argümanla yazı yapılandırmasından okunuyor.

**Bilerek ölçülmeyen:** ünlü gövdeli `-n-` edilgeni ("planlanıyor"). Eklendi,
gerçek metinde ölçüldü, **geri alındı**: 2 gerçek yakalamaya karşı 6 yalancı
pozitif ("kullanıyoruz", "hızlanır" — hepsi etken). `edilgen-test.js` bunu
"hata" değil "BİLİNEN SINIR" olarak sayar; kayıt duruyor, sessizce silinmedi.

### Yan bulgu — blog kategori süzgeci bozukmuş (düzeltildi)

Yazı 1 için "Mobil" düğmesi eklerken çıktı: **süzgeç en baştan beri
çalışmıyormuş.** `.bl-k{display:flex}`, `[hidden]`in `display:none`ını eziyordu;
JS kartı gizliyor sanıyor, 28 kartın hepsi ekranda kalıyordu. `tm.css`'e
`[hidden]{display:none!important}` eklendi. Doğrulandı: Tümü 28 · Mobil 1 ·
Seo 7 · Web Tasarım 3. Ana sayfa/teklif/iletişim gerilemesi yok.
