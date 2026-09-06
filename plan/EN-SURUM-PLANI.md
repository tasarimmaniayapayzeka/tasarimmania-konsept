# İngilizce Sürüm — Üretim Planı

**Karar tarihi:** 6 Eylül 2026 · **Karar veren:** kullanıcı
**Adres yapısı:** `/en/` alt dizini · **Kapsam:** 77 sayfanın tamamı

---

## 1. Ölçülen kapsam (tahmin değil, sayım — `node plan/en-kapsam-olc.js`)

| Tür | Sayfa | Kelime | Ort. kelime | SSS Q&A | Görsel | Şema düğümü |
|---|---:|---:|---:|---:|---:|---:|
| blog | 42 | 64.453 | 1.535 | 334 | 126 | 294 |
| hizmet | 29 | 36.996 | 1.276 | 183 | 43 | 174 |
| diğer | 6 | 5.218 | 870 | 4 | 47 | 26 |
| **TOPLAM** | **77** | **106.667** | | **521** | **216** | **494** |

Bu, birebir çeviriyle kapanacak bir iş değil: **odak kelimeler İngilizcede farklı**,
yoğunluk ve başlık kuralları hedef dile göre yeniden kurulmalı.

---

## 2. Adres ve teknik kurallar

- **Yol:** TR `/hizmetler/seo/` → EN `/en/hizmetler/seo/`
  Dizin adları TR kalıyor mu, İngilizceye mi çevriliyor? → **Karar #1 (aşağıda)**
- **canonical:** her EN sayfası KENDİNE işaret eder (`…/en/…`), TR'ye değil.
- **hreflang:** `tr` · `en` · `x-default=tr`. **Yalnız karşılığı ÜRETİLMİŞ sayfaya konur.**
  Var olmayan adrese etiket koymak, Google'ın dil eşlemesinin tamamını iptal ettirir.
  Yazan betik: `node plan/en-hreflang.js --uygula` (karşılıklılığı da kurar).
- **Şema:** `inLanguage: "en"`, `WebPage.@id` EN adresi, `Person`/`Organization`
  düğümleri aynı `@id` ile paylaşılır (varlık tek, sayfa iki dilli).
- **Görsel:** her EN sayfası **kendi İngilizce SEO adlı kopyasını** kullanır.
  TR klasörüne işaret etmek YASAK (kalıcı proje kuralı). 126 blog görseli ×
  5 boyut = yeniden adlandırılacak dosya kümesi.
- **noindex:** EN sayfaları da doğuştan `noindex,nofollow` gelir; `--ac` ikisini
  birden açar.

---

## 3. Denetim araçlarının İngilizce durumu

| Araç | Durum |
|---|---|
| kelime sayısı, yoğunluk, iç link, meta uzunluk | **dilden bağımsız, çalışır** |
| uzun cümle oranı (15+ kelime) | çalışır |
| soru biçimli H2 oranı | `?` aradığı için çalışır |
| **edilgen çatı sayacı** | **YALNIZ TÜRKÇE** — İngilizce için ayrı desen gerekir (`be + past participle`) |
| eş anlamlı çift kontrolü | İngilizce sözlük gerekir |

`plan/seo-denetim.js` içine dil anahtarı eklenecek; İngilizce yazılar
Türkçe edilgen sayacıyla ölçülürse sonuç anlamsız olur.

---

## 4. Dalgalar

| Dalga | İçerik | Sayfa | Kelime |
|---|---|---:|---:|
| **D1** | Ana sayfa, 5 modül hub'ı, hizmetler dizini, hakkımızda, iletişim, teklif, KVKK, 404 | 12 | ~12.000 |
| **D2** | 23 hizmet alt sayfası | 23 | ~28.000 |
| **D3** | Blog dizini + 21 yazı (ticari niyeti yüksek olanlar) | 22 | ~33.000 |
| **D4** | Kalan 21 blog yazısı | 21 | ~33.000 |

Her dalga sonunda: `en-hreflang.js --uygula` → `onarim-turu.js --uygula` →
`geo-denetim.js` + `etiket-denge.js`. hreflang kapsamı dalga dalga büyür.

---

## 5. Karar bekleyen 3 madde

**Karar #1 — URL dizinleri çevrilsin mi?**
- (a) `/en/hizmetler/seo/` — TR dizin adları korunur. Basit, yönlendirme yok.
- (b) `/en/services/seo/` — tam İngilizce yol. Yabancı kullanıcı için okunur,
  İngilizce anahtar kelime URL'de geçer (hafif SEO artısı). Daha fazla eşleme işi.

**Karar #2 — Hedef pazar.** `hreflang="en"` (dil, ülke bağımsız) mı,
`en-GB`/`en-US` gibi ülkeye bağlı mı? Belirli bir ülke hedefi yoksa yalnız `en`
doğrusu; ülke seçmek diğer İngilizce pazarları dışlar.

**Karar #3 — Odak kelimeler.** İngilizce anahtar kelimelerin arama hacmini
bu ortamda **doğrulayamam** (araç erişimi yok). İki yol: (a) sektör standardı
terimlerle ilerlerim ve varsayım olduğunu yazarım, (b) siz Ahrefs/Semrush
verisi verirsiniz, ona göre kurarım.

---

## 6. Şu an hazır olan altyapı

- `plan/en-kapsam-olc.js` — kapsam sayımı
- `plan/en-hreflang.js` — karşılıklı hreflang, yalnız var olan sayfalara
- `plan/geo-denetim.js` modül 8 — "uygulanamaz" değil, **ilerleme ölçüyor**
  (şu an: İngilizce karşılığı olan 0/77)
