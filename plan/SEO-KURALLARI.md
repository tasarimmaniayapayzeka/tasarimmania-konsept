# SEO Kuralları — Birleşik Standart

**Sürüm:** 1.2 · 1 Eylül 2026
**Kapsam:** Blog ve içerik üretimi yapılan tüm projeler.
**Kaynak:** "İhsan SEO Blog" standardı (29–30 Ağustos 2026) + 1 Eylül 2026 oturumundaki eklemeler.

**1.1'de ne değişti:** Onay bekleyen 10 madde onaylandı · Snippet bölümü (48–57) · 300 karakter tavanı.
**1.2'de ne değişti:** Saha araştırması sonrası BÖLÜM 13 eklendi (Madde 71–75): dış atıf, kaynaklı alıntı, havuz varlığı, Bing/IndexNow, video kararı. Kullanıcı 1 Eylül 2026'da onayladı.

---

## Nasıl okunur

| Etiket | Anlamı |
|---|---|
| **`[T]`** | **Temel** — 29–30 Ağustos'ta kurulan standart |
| **`[Y]`** | **Yeni** — 1 Eylül oturumunda eklenen |
| **`[Ö→✓]`** | Benim önerim, **1 Eylül'de onaylandı** |

Hepsi yürürlükte. Sayısal eşikler **Bölüm 12**'de toplu; denetim komutu **Madde 68**'de.

---

# BÖLÜM 1 — Konu seçimi ve huni

### 1. `[T]` Konu ölçümle seçilir, tahminle değil
Google autocomplete hasadı: `suggestqueries.google.com/complete/search?client=firefox&hl=tr&gl=tr&q=` + alfabe çorbasıyla varyant toplama. Yasak veya alakasız olanlar elenir.
**Araçlar:** `hasat.js`, `kume3.js`, `huni.js`, `seo-firsat.js`

### 2. `[T]` Uzun kuyruk sayısı = konu genişliği
4+ kelimelik varyant sayısı konunun derinliğini gösterir. Az uzun kuyruk = ince konu = ayrı yazı olmasın, başka yazıya bölüm olsun.

### 3. `[T]` Aylık tempo: 15 yazı — 10 TOFU / 3 MOFU / 2 BOFU

### 4. `[T]` Tür başına zorunluluk
| Tür | Okur niyeti | Zorunlu bileşen |
|---|---|---|
| **TOFU** | Belirtiyle/sorunla giriyor | Son H2 dönüşüm niyetli ("Hangi bölüme başvurulur?" / "Bu işi kim yapar?") |
| **MOFU** | Seçenek karşılaştırıyor | **Karşılaştırma tablosu zorunlu** |
| **BOFU** | Karar vermiş, uygulayacak | **Numaralı adım veya kontrol listesi zorunlu** |

### 5. `[T]` Kanibalizasyon sözleşmesi
Her yazıya bir **ayırt edici eksen**: SÜRE / ZAMANLAMA / SES / HİS / GÖRÜNÜM / MEKANİZMA / ROTA. Komşu yazının konusunu tekrarlamak **BLOKER**. Kardeşe link verilir, konusu anlatılmaz.

### 6. `[Ö→✓]` Eksen dosyaya yazılır, akılda tutulmaz
Ayırt edici eksen yazının kaynağında saklanır (HTML yorumu veya plan JSON alanı). Aksi hâlde 27 yazıda hangi eksenin kullanıldığı takip edilemez.

---

# BÖLÜM 2 — Anahtar kelime

### 7. `[T]` Odak ifade 2–3 kelime — uzun soru cümlesi ASLA
**Yaşanmış hata:** ilk 15 yazıda odak uzun soru cümlesiydi → %0,30 çıktı, hepsi turuncu; birinde %0,00 (ifade metinde hiç yoktu).

### 8. `[T]` Hedef yoğunluk %2,2–2,4
Yoast yeşili %0,5–2,5; biz üst tarafta duruyoruz.

### 9. `[T]` Tam geçiş sayısı formülle bulunur
`%2,4 × kelime / (100 × odak kelime sayısı)`
1100 kelimede: 2 kelimelik odak ≈ **12–14**, 3 kelimelik ≈ **9–10**, 4 kelimelik ≈ **7**.

### 10. `[T]` Türkçe ekler lehimize sayılır
"burun tıkanıklığının" içinde "burun tıkanıklığı" geçer — sayılır.

### 11. `[T]` `[Y]` Uzun kuyruk gövdeye değil, H2/H3/SSS'ye gider
Gövde odak ifadeyle çalışır; uzun kuyruk başlıklarda ve SSS'de yaşar. **Sesli aramanın karşılandığı yer burasıdır** — sesli sorgular uzun ve doğal dildedir.

### 12. `[T]` `[Y]` LSI / yakın anlam — ana kelime en fazla 3 başlıkta
H1 dahil. Diğer başlıklar yan kelimelerden kurulur.

### 13. `[T]` `[Y]` Ters dizilim — her yazıda 2–3 anlamlı varyant
Odak ifadenin kelimeleri yer değiştirilerek **dilbilgisel ve akıcı** varyantlar üretilir. **Tam geçiş sayısına dahil değil, üstüne gelir.**
- **İyi:** "sinüzit belirtileri" → "belirtileriyle seyreden sinüzit" · "küf alerjisi" → "küfe karşı gelişen alerji"
- **Yasak:** "belirtileri sinüzit" gibi devrik kullanım. Anlam bozuluyorsa vazgeç. **Denetçi bozuk varyantı bloker sayar.**

### 14. `[T]` `[Y]` Eş anlamlı destek — yazı başına en az 3 çift
*Sağlık:* ürtiker↔kurdeşen · alerjik rinit↔saman nezlesi · anafilaksi↔alerjik şok · hışıltı↔hırıltı · dispne↔nefes darlığı
*Ajans:* e-ticaret yazılımı↔online mağaza altyapısı · SaaS↔abonelikli sistem · ısmarlama↔özel yazılım

---

# BÖLÜM 3 — Yapı

### 15. `[T]` Uzunluk 1000–1200 kelime (SSS hariç)

### 16. `[Ö→✓]` Kelime sayımının sınırı açıkça tanımlıdır
Sayım `<article class="yz-govde">` … `</article>` arasındaki **tüm görünür metni** kapsar: tablo ve liste **dahil**, CTA/köprü kartı **hariç**. Yoast da tüm görünür metni sayar.
*Neden:* ilk yazıda tablo sayılmadığı için "1200 kelime" raporlandı, gerçek 1327'ydi.

### 17. `[T]` H2 × 5–7

### 18. `[T]` Her H2 altında 1–3 H3, yazıda en az bir H4

### 19. `[T]` `[Y]` Her H2 altında 40–60 kelimelik doğrudan cevap
Bölümün sorusuna ilk paragrafta, dolandırmadan cevap verilir. Snippet ve sesli arama hedefi — **karakter tavanı için Madde 49'a bak.**

### 20. `[T]` 7–9 soruluk akordiyon SSS

### 21. `[T]` SSS tek kaynaktan üretilir
Ekrandaki akordiyon ve FAQPage şeması **aynı veri alanından** doğar. İkisi elle ayrı yazılmaz — kayma olur.

### 22. `[Ö→✓]` Kendi kendine yeten paragraf
Her H2 bloğu, yazının geri kalanı okunmadan tek başına anlaşılır olmalı. Üretken motorlar bölümü bağlamından koparıp alıntılıyor; "yukarıda anlattığımız gibi" türü bağımlılıklar alıntıyı anlamsızlaştırır.

### 23. `[Ö→✓]` Çıkarılabilir veri her türde bulunur
MOFU'da tablo zaten zorunlu. TOFU ve BOFU'da da en az bir **karşılaştırma tablosu veya sayısal eşik listesi** bulunur.

---

# BÖLÜM 4 — İnsansılık

### 24. `[T]` `[Y]` Metin insansı olur — denetçi sayar
| Ölçüt | Eşik |
|---|---|
| "Ayrıca" | ≤ 2 |
| "Ancak" | ≤ 3 |
| Çekince kapanışı | ≤ 3 cevapta |
| En uzun–en kısa SSS cevabı farkı | ≥ 45 kelime |
| Ardışık cümlelerin aynı kelimeyle başlaması | **0** |

### 25. `[T]` Bölümler aynı kalıpla açılmaz
Tanım → liste → uyarı döngüsü yasak.

### 26. `[T]` Yoast **Okunabilirlik** sekmesi ayrıdır ve atlanır
Edilgen çatı ≤ **%10** · 15+ kelimelik cümle ≤ **%20**
**Ölçüldü (30 Ağu 2026):** ilk üretim %31 / %33 = kırmızı. Yazar şartnamesine **baştan** koy.

### 27. `[T]` Geçiş kelimesi endişesi boşunaydı — ders
"Ayrıca ≤2 / Ancak ≤3" sınırına rağmen Yoast "Geçiş kelimeleri: İyi iş" verdi. Ardışık-cümle kuralımız da yeşil üretiyor. **Kuralı gevşetme.**

### 28. `[T]` Yoast skoru tarayıcıda hesaplanır
Programla yüklenen yazıda panel listesinde skor boş görünebilir; skor editör açıkken hesaplanır.

---

# BÖLÜM 5 — İç link mimarisi

### 29. `[T]` Hub & spoke (küme) modeli — rastgele link yasak
Yazılar konu kümelerine bölünür; her kümenin bir **hub (pillar)** sayfası vardır.

### 30. `[T]` Yazı başına: 2 YUKARI + 3 YATAY + 2 DÖNÜŞÜM = 7–9 link
Yukarı = hub · Yatay = aynı kümedeki kardeşler · Dönüşüm = araç/teklif/iletişim

### 31. `[T]` Kardeş rotasyonu **küme İÇİ sayaçla** yapılır
**Ölçüldü:** global indeksle döndürünce **5/48 yazı öksüz kaldı**.

### 32. `[T]` İnce kümeler `KOMSU` haritasıyla takviye edilir
2–3 üyeli küme 3 kardeş çıkaramaz; konusu yakın kümeden tamamlanır.

### 33. `[T]` TERS YÖN ŞART — hub'lar da yazılara link verir
Aksi hâlde otorite tek yönlü akar. **Tema/bileşen tarafında "İlgili rehber yazıları" bloğuyla otomatik** kurulur; pillar sayfaları elle düzenlenmez.

### 34. `[T]` Kod sırası tuzağı
`const KUMELER` yazı listesinden **önce** gelmeli; `const` hoisting yapmaz.

### 35. `[Ö→✓]` Zincir kırığı yasağı
Yayında olmayan kardeşe link verilmez. Küme tamamlanana kadar yatay linkler boş bırakılır, **toplu enjeksiyon turuyla** sonradan eklenir.

---

# BÖLÜM 6 — Görseller

### 36. `[T]` Higgsfield, 16:9, sitenin palet dili

### 37. `[T]` Kare kuralları
İnsan yok · okunabilir metin yok · marka yok · ekran ve kâğıt boş.

### 38. `[T]` Her kare tek tek gözle denetlenir

### 39. `[T]` Değirmen boyutları
`<slug>-640.webp` · `-960.webp` · `-1440.webp` · `-1920.webp` + `-1440.jpg` (og:image)

### 40. `[T]` Alt metin betimleyicidir — anahtar kelime doldurması değil

### 41. `[T]` AI ifşası zorunlu

### 42. `[T]` Öne çıkarılmış görsel gerçekten atanır
WordPress'te `_thumbnail_id` atanır — yoksa panel kutusu ve Yoast sosyal önizlemesi boş görünür.
**Statik sitede karşılığı:** `Article.image` + yazıya özel `og:image`.

---

# BÖLÜM 7 — Şema, GEO, CEO ve Snippet

### 43. `[T]` Article + FAQPage + yazar varlığı, tek `@id` düğümüne bağlı
`author`, `reviewedBy`, `lastReviewed` alanlarıyla.

### 44. `[Y]` İçerik SEO + GEO + CEO uyumlu üretilir
- **SEO** — klasik arama sıralaması
- **GEO** *(Generative Engine Optimization)* — ChatGPT, Gemini, Perplexity, Google AI Overviews içeriği **alıntılayabilsin**
- **CEO** *(Conversational Engine Optimization)* — sohbet arayüzündeki doğal dil sorusuna doğrudan karşılık gelsin

### 45. `[Ö→✓]` GEO varlık katmanı — şemada bulunması zorunlu
| Alan | Ne işe yarar |
|---|---|
| `Article.image` | AI özetinde görsel alıntı |
| `Article.about` | Yazının anlattığı varlığın bağlanması |
| `Article.mentions` | Geçen kavramların makineye işaretlenmesi |
| `Article.wordCount` | Derinlik sinyali |
| `Organization.sameAs` | Marka doğrulaması — E-E-A-T omurgası |
| `Organization.logo` | Kaynak gösteriminde marka görünürlüğü |
| `speakable` | Sesli asistana "şu bölümü oku" işareti |

### 46. `[Ö→✓]` CEO ölçütü — soru formunda H2 oranı ≥ %50
SSS soruları zaten doğal dilde yazılır ("mı/mi", "nasıl", "kaç", "hangi", "ne zaman").

### 47. `[Y]` Sesli komut aramaları hedeflenir
Madde 19 (doğrudan cevap) + Madde 20 (SSS) + Madde 46 (soru formu) + Madde 11 (uzun kuyruk başlıklara) birlikte sesli aramayı karşılar.

---

## Snippet ve alıntılanma

### 48. `[Y]` Öne çıkan snippet dört biçimde çıkar — sorguya uygun biçim verilir
| Biçim | Ne zaman çıkar | Bizim vereceğimiz yapı |
|---|---|---|
| **Paragraf** | "nedir", "neden", "ne kadar" | Doğrudan cevap kutusu (Madde 19) |
| **Liste** | "nasıl", "adımları", "en iyi X'ler" | `<ol>` sıralı adım · `<ul>` çoklu seçenek |
| **Tablo** | "karşılaştırma", "fiyat", "fark" | Temiz `<table>` (Madde 51) |
| **Video** | "nasıl yapılır" görsel | Kapsam dışı |

### 49. `[Y]` **300 karakter tavanı** — kelime sayısı yetmez
Google paragraf snippet'ini yaklaşık **300 karakterde** kesiyor. 40–60 kelime kuralı **Türkçede 305–382 karakter üretiyor** (ilk yazıda ölçüldü: 6 cevabın 6'sı da 300'ü aştı).

**Kural:** Doğrudan cevabın **ilk cümlesi tek başına çekirdek cevabı ≤160 karakterde** vermeli. Kalan cümleler bağlamı tamamlar. Böylece Google nereden keserse kessin cevap ayakta kalır.

### 50. `[Y]` Soru başlıkta birebir tekrarlanır
Snippet tetikleyicisi budur. H2 metni, hedeflenen sorguyu kullanıcının yazdığı gibi içermeli.

### 51. `[Y]` Cevap başlığın hemen altında durur
Araya görsel, CTA, reklam veya alıntı kutusu girmez. Tablo snippet'i için `<th>` başlık satırı zorunlu, **`colspan`/`rowspan` yasak** — birleşik hücreli tabloyu Google çekmez.

### 52. `[Y]` AI crawler'ları engelleme — açıkça doğrula
`GPTBot` · `Google-Extended` · `PerplexityBot` · `ClaudeBot` · `CCBot` robots.txt'de **bloklanmaz**. Varsayılan izinlidir ama her projede tek tek doğrulanır. Engelliyse üretken motorlarda **hiç görünmezsin**.

### 53. `[Ö→✓]` `llms.txt` kurulur
Kök dizinde, site haritasının üretken motor karşılığı: sitenin ne olduğu, ana bölümler ve kanonik sayfa listesi düz metin olarak.

### 54. `[Y]` Tanım cümlesi kalıbı
Her ana kavram için tek cümlelik açık tanım bulunur ("X, … olan …dır"). Üretken motorlar tanım cümlesini doğrudan alıntılar.

### 55. `[Y]` Tarih tazeliği
`dateModified` gerçekten güncellenir. Bayat tarih, AI özetinde kaynak seçilmeme sebebidir.

### 56. `[Y]` Özgün ölçüm = alıntılanma sebebi
Herkesin yazdığını tekrar eden içerik alıntılanmaz. Her yazıda en az bir **kendi ölçümümüz, kendi karşılaştırmamız veya kendi eşiğimiz** bulunur.

### 57. `[T]` Meta description 150–160 karakter

---

# BÖLÜM 8 — Özgünlük

### 58. `[T]` `[Y]` Sıfırdan yazım — hiçbir siteden metin çekme veya döndürme yok

### 59. `[T]` Benzerlik testi zorunlu
Üretilenler hem **birbirine** hem **yayındakilere** karşı test edilir. Ölçüm: 5-gram ve 7-gram örtüşmesi.

### 60. `[T]` İnternetin tamamına karşı intihal taraması YAPILAMAZ
Bu **açıkça söylenir**, garanti verilmez. Ölçülebilen yalnızca kendi arşivimize karşı örtüşmedir.

---

# BÖLÜM 9 — Mevzuat

### 61. `[T]` Sağlık sitelerinde bloker listesi
İlaç/etken madde adı ve dozu · fiyat/ücretsiz/kampanya · hasta yorumu · "en iyi/garanti" · talep oluşturma · kesin tedavi vaadi · kapsam dışı yaş grubu · **uydurma istatistik**.
→ Bkz. `saglik-tanitim-mevzuati-2025`

### 62. `[Ö→✓]` "Uydurma istatistik = bloker" her sektörde geçerli
Kaynaksız oran, uydurma yüzde ve doğrulanmamış TL rakamı hiçbir projede yazılmaz.

---

# BÖLÜM 10 — Yayın ve takvim

### 63. `[T]` Tarih yayılımı
Yazılar tek güne yığılmaz — aya ~2 gün arayla, saatler değişken. WordPress'te `post_date` **ve** `post_date_gmt` birlikte verilir.
**Statik sitede:** `datePublished` yayılımlı üretilir.

### 64. `[T]` Zamanlanmış yayının iki şartı
**(a)** Site haritası **dinamik** olmalı, yalnız `publish` döndürmeli — sabit listede bekleyen adres 404 yedirir.
**(b)** **Kaçan yayın yakalayıcı** kurulmalı — WP-Cron ziyaretle çalışır, kaçırırsa yazı asılı kalır.
→ Bkz. `ramazan-ersoy-projesi`

---

# BÖLÜM 11 — Üretim hattı ve denetim

### 65. `[T]` Hat: yaz → adversaryal denetçi → onar → **YENİDEN denetle** → mekanik sayım hakem
Denetçi **geçirmek için değil, kusur bulmak için** çalışır. Her bulgu somut metinle kanıtlı olmalı.

### 66. `[T]` Geçme çıtası: **bloker 0, önemli ≤ 2**

### 67. `[T]` Ajan raporuna körü körüne güvenilmez
**Son söz mekanik sayımdadır.**
**Yaşanmış:** ajan "1165 kelime / %2,4" dedi, mekanik sayım 1327 kelime / %2,23 buldu — ajan tabloyu saymamıştı.

### 68. `[Ö→✓]` Denetim komutu
```bash
node plan/seo-denetim.js <yazi/index.html> "<odak ifade>"
```
Bölüm 12'deki eşikleri tek geçişte ölçer, JSON döner.

### 69. `[Ö→✓]` Ölçüm tuzağı — bölge ayrıştırma
`<style>` bloğundaki sınıf adları (`.yz-govde`, `.yz-sss`) gövde arayışını yanıltır; `indexOf` önce CSS tanımını bulur. **Ölçümden önce `<style>` ve `<script>` blokları temizlenir.**
*Yaşanmış:* gövde 1327 yerine 91 kelime ölçüldü.

### 70. `[T]` Ölçmeden konuşma
Durum, etki veya risk iddiası **ölçüme dayanmalı**. "Genelde böyledir" yasak.
→ Bkz. `olcmeden-konusma`

---

# BÖLÜM 12 — Sayısal eşikler (denetim tablosu)

| Madde | Ölçüt | Eşik |
|---|---|---|
| 15 | Gövde uzunluğu (SSS hariç) | 1000–1200 kelime |
| 17 | H2 sayısı | 5–7 |
| 18 | H4 sayısı | ≥ 1 |
| 19 | Doğrudan cevap uzunluğu | 40–60 kelime |
| **49** | **Doğrudan cevabın ilk cümlesi** | **≤ 160 karakter** |
| 20 | SSS sorusu | 7–9 |
| 7 | Odak ifade uzunluğu | 2–3 kelime |
| 8 | Odak yoğunluğu | %2,2–2,4 |
| 12 | Odağın geçtiği başlık sayısı | ≤ 3 (H1 dahil) |
| 13 | Ters dizilim varyantı | 2–3 |
| 14 | Eş anlamlı çift | ≥ 3 |
| 30 | İç link | 7–9 (2+3+2) |
| 24 | "Ayrıca" / "Ancak" | ≤ 2 / ≤ 3 |
| 24 | SSS uzun–kısa farkı | ≥ 45 kelime |
| 24 | Ardışık aynı kelimeyle başlayan cümle | 0 |
| 26 | Edilgen çatı | ≤ %10 |
| 26 | 15+ kelimelik cümle | ≤ %20 |
| 46 | Soru formunda H2 oranı | ≥ %50 |
| 51 | Tabloda `colspan`/`rowspan` | 0 |
| 57 | Meta description | 150–160 karakter |
| 59 | Arşive karşı n-gram örtüşmesi | %0 hedef |
| 66 | Bloker / önemli bulgu | 0 / ≤ 2 |
| **71** | **Dış kaynak atıfı** | **2–3 link** |
| **72** | **Kaynaklı alıntı** | **≥ 1** |

---

# BÖLÜM 13 — Alıntılanma taktikleri (saha araştırması, 1 Eylül 2026)

Kaynaklar: Princeton GEO deneyi (9 taktik tek tek ölçüldü) · yapısal özellik çalışması (6 motorda +%17,3 alıntı artışı) · 2023–2026 eleştirel tarama · 2026 alıntı endeksleri.
**Uyarı (Madde 70 gereği):** tüm çalışmalar İngilizce; Türkçe için ölçülmüş veri yok. Oranlar yön göstergesidir, garanti değil.

### 71. `[Ö→✓]` Dış kaynak atıfı — her yazıda 2–3 güvenilir dış link
Resmî istatistik, kurum raporu, akademik kaynak (TÜİK, ETBİS, bakanlık duyuruları). Princeton ölçümü: **+30–40%**, düşük otoriteli sitelerde **+115%** — yeni domain olarak tam bizim profilimiz.
- Link `target="_blank" rel="noopener"` ile verilir.
- **Ölü link yayın öncesi curl ile doğrulanır.** Yaşanmış: `eticaret.gov.tr` curl'e kapalı çıktı (000); yerine `ticaret.gov.tr` duyurusu kullanıldı (200).

### 72. `[Ö→✓]` Kaynaklı alıntı — yazı başına en az 1
Gerçek ve doğrulanabilir cümle, `<blockquote>` + `<cite>` ile. Princeton: +30–40%.
**Alıntı uydurulmaz** — kaynakta birebir geçmeyen söz tırnak içine alınmaz (Madde 62'nin alıntı hâli).

### 73. `[Ö→✓]` Havuz varlığı (off-page GEO)
AI motorları alıntılarının %68'ini 15 domainden alıyor; alıntılanan URL'lerin yalnız %12'si Google ilk-10'u ile örtüşüyor. Kendi sitene yazmak yetmez — AI'ın zaten okuduğu havuzda var olmak gerekir:
- **LinkedIn şirket sayfası** (kurulunca `Organization.sameAs`'e de girer — Madde 45'in açığı kapanır)
- **Medium'da kanonik linkli özet** yeniden yayın (Gemini'nin sosyal diliminde Medium %28)
- **Sektör dizinleri**

### 74. `[Ö→✓]` Bing Webmaster Tools + IndexNow
ChatGPT'nin arama hattı **Bing dizinine** dayanır; Gemini Google dizinine. Search Console tek başına ChatGPT tarafını kapsamaz. **Gerçek domaine geçiş kontrol listesine eklendi.**

### 75. `[Ö→✓]` Video ve animasyon kararı — ölçüme dayalı
- **CSS akışkan döngüler (Lumina Pro tarzı): blog gövdesinde KULLANILMAZ.** Crawler CSS/JS çalıştırmaz, metin okur → GEO değeri sıfır. Hizmet/satış sayfalarında insan dönüşümü için değerli, orada kalır.
- **YouTube Shorts gömme yalnız İKİ koşulla değerli:** (1) video kendi kanalımızda yaşar → Madde 73 havuz varlığı (Gemini alıntılarının ~%43'ü Google mülklerine, YouTube dahil); (2) sayfaya **transkript** konur → LLM'in okuyabileceği metin doğar + `VideoObject` şeması eklenir.
- **Transkriptsiz gömme = süs.** Alıntılanmaya ölçülmüş katkısı yok.
- Öncelik: 71–72 (içerik) → 73 (dağıtım) → video. Video en pahalı taktik; seri üretimi bloke etmez, sonradan eklenebilir.

---

## Proje durumu — TasarımMania (1 Eylül 2026, akşam güncellemesi)

| Kontrol | Durum |
|---|---|
| `robots.txt` — AI crawler engeli yok | ✅ |
| `sitemap.xml` — blog dahil 36 URL | ✅ |
| `llms.txt` — 36 bağlantı | ✅ Yayında |
| İlk yazı: 30/31 eşik + Madde 71–72 | ✅ 1200 kelime, %2,33, dış atıf 2, alıntı 1 |
| GEO şema (Madde 45) | ✅ `sameAs` hariç hepsi — gerçek sosyal hesap bekliyor |
| `Organization.sameAs` | ❌ LinkedIn kurulunca (Madde 73) |
| Bing Webmaster + IndexNow | ❌ Gerçek domaine geçişte |
| Havuz varlığı (LinkedIn/Medium) | ❌ Kullanıcı kararı bekliyor |
