# DEVİR NOTU — modül döngü videoları · ✅ TAMAMLANDI

**Son güncelleme:** 5 Eylül 2026, 02:30
**Durum:** **23 / 23 sayfa bitti.** Öksüz dosyalar temizlendi, tam tarama 0 bulgu,
yedek alınıp içeriği doğrulandı. Bu işte yapılacak bir şey KALMADI.

Bu dosya artık iki amaçla duruyor: (1) yeni bir sayfa eklenirse üretim hattının
tarifi, (2) ölçüm tuzaklarının kaydı.

---

## Ne yapıldı

Her alt sayfanın sağındaki `.akv-video` kutusunda **modül geneli soyut bir 3B
render** duruyordu (cam levhalar arasında renkli boru; 4-6 sayfa aynı dosyayı
paylaşıyordu). Kullanıcı: *"çok saçma anlamlı bişiy yap ... her birine ayrı
yapacaz"*. Yerine, aynı görsel dille (cam yüzey, akan ışık şeridi, modül aksanı)
her sayfaya **kendi 01/02/03 adımlarını anlatan** 5 sn dikişsiz döngü üretildi.
Tasarım kullanıcı onaylı; 23/23 hedefi kullanıcının "bitsin artık bu proje"
talimatıyla kondu ve tamamlandı.

### Sayfa dökümü (tamamı)

| modül (dal/renk) | sayfalar | döngü aralığı | mp4 aralığı |
|---|---|---|---|
| video-produksiyon (pembe) | reklam-filmi, urun-videosu, sosyal-video-reels, ai-destekli-produksiyon | 1,29-1,53 | 163-263 KB |
| web+grafik (camgöbeği) | grafik-tasarim, ai-entegrasyonu, bakim-destek, e-ticaret, kurumsal-web-sitesi, ozel-yazilim | 1,31-1,55 | 179-288 KB |
| seo (limon) | teknik-seo, yerel-seo, e-ticaret-seo, icerik-stratejisi, cok-dilli-seo | 1,21-1,47 | 174-318 KB |
| mobil (mor) | ios-android, react-native, uygulama-ui-ux, aso-uygulama-pazarlamasi | 1,22-1,47 | 235-273 KB |
| pazarlama (kehribar) | google-ads, meta-ads, performans-pazarlamasi, sosyal-medya-yonetimi | 1,24-1,50 | 211-254 KB |

Döngü eşiği 1,6 — 23'ü de altında. Hepsi `data-dongu` ile bağlı: normal modda
görününce oynar, hareket kısıtlı modda hiç başlamaz, sekme arkada duraklar.
Eski satır içi `IntersectionObserver` (reduced-motion sormuyordu) 23 sayfadan da
kaldırıldı.

### Kapanış doğrulamaları (5 Eyl 2026)

- `butunluk.js`: 23/23 kendi videosunda · ortak 0 · kırık 0 · eski gözlemci 0
- Öksüz `modul-*/akis.mp4` + `akis.jpg` (5'er adet) silindi — silmeden önce her
  birinin site genelinde **0 kullanıcısı** grep ile doğrulandı; aynı klasördeki
  hero/ekip gibi kullanılan görsellere dokunulmadı. Canlıda 404 doğrulandı.
- Tam tarama: **62 sayfa × 390px + 1440px = 124 ölçüm, 0 bulgu** (taşma,
  kalıntı, kırık görsel, yazı boyu, dizilim).
- Canlı yoklama: her modülden bir video 200.
- Yedek: `E:\Claude-Projeler-Yedek\25-TasarimMania-Site\TasarimMania-Site_2026-09-05_0223.zip`
  461,5 MB · 63 sayfa · 125 asset · `.git` yok · `tm.css` arşiv/disk bayt bayt aynı.

---

## Yeni sayfa eklenirse: üretim hattı

```bash
# 0. adımları çıkar (yeni sayfa .akv listesine girmiş olmalı)
node plan/video-uret/adimlari-cikar.js
# 1. yasaklar.md'ye o sayfanın çizim yasaklarını ekle, sonra sahne yaz:
#    plan/video-uret/sahne-<slug>.js  (referans: sahne-teknik-seo.js, dongu 1,21)
# 2. önizleme — PNG'yi AÇ VE BAK, en az 2 tur
node plan/video-uret/onizleme.js plan/video-uret/sahne-<slug>.js <dal> <cikti.png>
# 3. üret
node plan/video-uret/uret.js sahne-<slug>.js <dal> modul-<dal>/<slug>
# 4. döngü dikişi (oran <= 1.6)
node plan/video-uret/dongu-denetim.js assets/modul-<dal>/<slug>.mp4
# 5. bağla (src+poster, data-dongu, eski gözlemci temizliği)
node plan/video-uret/bagla.js <sayfa> modul-<dal>/<slug>
# 6. oynatmayı GERÇEK ZAMANLI ölç (tuzak #2'ye bak) + butunluk.js
```

- `motor.js` — ortak motor, 23 sayfa kullanıyor. **DEĞİŞTİRME.**
- `yasaklar.md` — sayfa başına çizim yasakları.
- Kural özeti: yazı yalnız 3 durak etiketi, en az 28 px, etiket 246 px istasyona
  **render edilip piksel ölçülerek** sığdırılır; `motor.yaz()` dışında ham
  `<text>` yok; logo/rakam/yüz yok; eşitlik gereken yerde **piksel ölç** (koda
  bakıp geçme); yorumdaki her iddiayı **ölçerek** yaz.

---

## ÖLÇÜM TUZAKLARI — hepsine bu işte düşüldü, kayıt burada

1. **`scroll-behavior:smooth`** (`tm.css:60`) `scrollTo`'yu animasyonlu yapar;
   hemen ölçersen konum eski. Reduce modunda `auto` olduğu için orada çalışır,
   normalde çalışmaz → sonuç ters görünür. `video-olc.js` başta `auto`'ya çeker.
2. **`--virtual-time-budget` medya saatini İLERLETMEZ.** `paused` doğru okunur
   ama `currentTime` hep 0 görünür → "oynamıyor" sahte alarmı. Gerçek zamanlı
   bekleyerek (CDP) ölç.
3. **Tembel görseller sayfayı büyütür**, `scrollIntoView` hedefi kaçırır. Önce
   sayfayı gez, sonra hedefe git.
4. **`--autoplay-policy=no-user-gesture-required` kullanma** — gerçekte yok.
5. **librsvg font tuzağı**: `font-weight` verilmemiş metin harf yiyerek çizilir.
6. **`node -e` içinde ters bölü yenir** → regex'li betiği dosyaya yaz.
7. **`while IFS= read`** son satırı, dosya satır sonuyla bitmiyorsa atlar.
8. **Eşitlik koddan görünmez**: boyut/kontur/gecikme eşit olsa da dolgular %14
   parlaklık farkı yaratabiliyor. Piksel ölç.
9. **Yorum da yanlış olabilir**: iki sahnede çizim doğru, yorumdaki iddia
   yanlıştı; bir üçüncüde "≤%0,9" iddiası ölçümde %1,6 çıktı. Yorum iddiası =
   ölçüm sonucu olmalı.

1-4 tuzağı birleşince bir ara "video hiç oynamıyor" denildi — **yanlıştı**,
video oynuyordu; kullanıcıya düzeltmesi iletildi.

---

## Videoyla ilgisiz, hâlâ bekleyen açık işler

- **320px** ekranlarda `.akis` yazısı 7,80 px (taban 375px kabul edilmişti) —
  kullanıcı kararı bekliyor.
- Gerçek alan adına taşıma: `node plan/canli-paket.js` + `node plan/noindex-uygula.js --ac`
  **koşulmadı** (konsept yayında noindex kilidi duruyor).
- Gerçek e-posta yok; `sitemap.xml` / `robots.txt` yok.
- Hakkımızda sayfasının tanıtım filmi kaldırılmıştı (eski kırmızı kimlik);
  yenisi çekilirse kapaklar `assets/ajans/tanitim-kapak-*.webp`te duruyor.
