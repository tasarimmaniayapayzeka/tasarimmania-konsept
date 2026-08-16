# TasarımMania — 15 Ana Sayfa Konsepti

tasarimmania.com'un yeni sitesi için hazırlanan keşif çalışması. On beş ayrı ana sayfa konsepti,
her biri **ayrı bir sanat yönetimi ve ayrı bir teknik imza** ile.

**Canlı:** https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept/
**Galeri:** `index.html` — on beş konsepti canlı önizlemeyle yan yana gösterir.

## Birinci dalga — serbest sanat yönetimi (01–10)

| # | Konsept | Karakter | Teknik imza |
|---|---------|----------|-------------|
| 01 | Noir Shader | Neredeyse siyah + asit yeşili | Ham WebGL shader hero, magnetik imleç |
| 02 | İsviçre Grid | Kırık beyaz brutalist editoryal | Görünür 12 sütun, açılan hizmet index satırları |
| 03 | Bento OS | Ürün sayfası kalitesi, koyu slate | Karo içi canlı widget'lar + 3D cam ikonlar |
| 04 | İzometrik Şehir | Derin lacivert 3D sahne | Saf CSS `preserve-3d` şehir, scroll'a bağlı kamera |
| 05 | Sinema / Showreel | Kömür + sinyal kırmızısı | Canvas showreel, akan timecode, format vitrini |
| 06 | Veri Merkezi | Terminal HUD, fosforlu yeşil | Canvas 3D tel kafes dünya, yurt dışı kampanya rotaları |
| 07 | Krom / Sıvı | Süt beyazı + iridesan | Fareyi takip eden sıvı krom metaball |
| 08 | Lüks Editoryal | Espresso + altın, serif | Sessiz lüks, altın çizgi çizimleri |
| 09 | Yatay Yolculuk | Gece mavisi + mercan | Sticky yatay scroll, beş durak |
| 10 | Kinetik Deste | Cesur renk blokları | 3D kart destesinin grid'e toplanması + FLIP filtre |

## İkinci dalga — marka renkleri (11–15)

Bu beşi markanın **kendi kimliği** üzerine kuruldu: gerçek logo dosyaları (`assets/logo/`) ve
logodan piksel düzeyinde ölçülen marka kırmızısı **`#ED1E24`** kullanıldı. Logonun kırmızı
çift-ok (chevron) formu bazı konseptlerde yapısal motife dönüştürüldü.

| # | Konsept | Karakter | Teknik imza |
|---|---------|----------|-------------|
| 11 | Kırmızı Mürekkep | Kağıt beyazı + marka kırmızısı | Chevron geometrisi + kırmızı mürekkep wipe geçişleri |
| 12 | Mor Aurora | Koyu mor, cam kartlar | Ham WebGL aurora gradyan ağı + cam kart 3D tilt |
| 13 | Duotone Riso | Krem kağıt, iki mürekkep | Canvas halftone duotone + kasıtlı baskı kayması |
| 14 | Mor Kristal | Patlıcan karası, lüks teknoloji | Saf CSS 3D fasetli kristaller + kırmızı enerji çekirdeği |
| 15 | Kırmızı Yayın | Siyah + kırmızı, yayın grafikleri | Alt bant animasyonları + canlı ticker + kırmızı wipe |

## Marka

- **Kırmızı:** `#ED1E24` (logodan ölçüldü)
- **Logo:** `assets/logo/logo-koyu-yazi.png` (açık zeminler), `logo-beyaz-yazi.png` (koyu zeminler),
  `logo-kare.png` (ikon)

## Kapsanan hizmetler

Her konsept aynı hizmet setini satar: web tasarım & yazılım, mobil uygulama,
dijital pazarlama (Meta & Google Ads), video prodüksiyon (YouTube / Instagram),
SEO ve yurt dışı / çok dilli kampanya yönetimi.

## Teknik kurallar

- Her konsept **tek dosyalık, self-contained** HTML (CSS ve JS inline).
- **Harici JS kütüphanesi yok** — three.js, GSAP, jQuery kullanılmadı.
  Tüm 3D efektler ham WebGL, Canvas 2D veya CSS `preserve-3d` ile yazıldı.
  Tek harici kaynak: Google Fonts.
- 390 / 768 / 1440 px'de **sıfır yatay taşma** (test koşumu: `_test/kontrol.html`).
- `prefers-reduced-motion` desteği ve IntersectionObserver ile sahne durdurma.

## Klasörler

```
index.html          galeri (15 konseptin canlı önizlemesi)
konsept/            15 ana sayfa konsepti
assets/logo/        gerçek marka logosu (3 varyant)
assets/             3D ikonlar (256px, optimize)
assets/tam-cozunurluk/  aynı ikonların 1024px şeffaf orijinalleri
_test/kontrol.html  çok genişlikli otomatik kontrol koşumu
arsiv/              reddedilen ilk deneme (referans)
server.js           bağımlılıksız yerel sunucu (port 8020)
```

## Yerelde çalıştırma

```bash
node server.js
# http://localhost:8020
```

---

Rakamlar, referanslar ve vaka çalışmaları demo amaçlı **temsilîdir**; seçilen konsept
gerçek verilerle üretime alınacaktır.
