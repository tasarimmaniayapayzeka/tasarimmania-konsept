# DEVİR NOTU — modül döngü videoları

**Son güncelleme:** 3 Eylül 2026, 19:45
**Durum:** 15 / 23 sayfa bitti. Kalan 8 sayfa bekliyor (mobil 4 + pazarlama 4).
**Bırakma durumu:** temiz — kırık sayfa yok, yarım dosya yok, hepsi işlendi ve yayınlandı.

---

## İlk iş: durumu doğrula

```bash
node plan/video-uret/butunluk.js
```

`KIRIK (dosya yok) : 0` görmeden devam etme. Bir sayfa, üretilmemiş bir mp4'e
bağlıysa canlıda kırık görünür.

---

## Ne yapılıyor, neden

Her alt sayfanın sağındaki `.akv-video` kutusunda **modül geneli soyut bir 3B
render** duruyordu — cam levhalar arasında renkli bir boru. Yanındaki 01/02/03
adımlarıyla hiçbir ilişkisi yoktu ve aynı dosyayı 4-6 sayfa paylaşıyordu.

Kullanıcının sözü: *"çok saçma anlamlı bişiy yap gene böyle akıskan olsun sistem
aynı ama bunun anlamı yok"* ve *"her birine ayrı yapacaz"*.

Yerine geçen: aynı görsel dil (cam yüzey, akan ışık şeridi, modül aksanı), ama üç
durak artık **sayfanın kendi adımları**. Işık darbesi boru boyunca yürür, hangi
durağın üstündeyse o durak canlanır ve kendi işini yapar. 5 sn, dikişsiz döngü.

Kullanıcı bu tasarımı önizlemeden sonra onayladı ("güzel", "onaylıyorm") ve sonra
"web modülünden devam et bitsin artık bu proje" dedi — hedef 23/23.

---

## Biten (15/23)

### video-produksiyon (4)

| sayfa | duraklar | mp4 | döngü |
|---|---|---|---|
| reklam-filmi | senaryo → çekim planı → ses+post | 163 KB | 1,46 |
| urun-videosu | sahne ışığı → açı provası → ses+metin | 167 KB | 1,53 |
| sosyal-video-reels | yerleşim → altyazı → ses dengesi | 263 KB | 1,29 |
| ai-destekli-produksiyon | uygun alan → ekip rolü → kalite onay | 165 KB | 1,52 |

### web + grafik-tasarim (6) — dal `web`, camgöbeği

| sayfa | duraklar | mp4 | döngü |
|---|---|---|---|
| grafik-tasarim | kılavuz → onay akışı → dosya paketi | 179 KB | 1,52 |
| ai-entegrasyonu | widget+API → marka sesi → soru takibi | 183 KB | 1,54 |
| bakim-destek | kapsam dışı → site boyutu → müdahale | 197 KB | 1,55 |
| e-ticaret | ürün+stok → ödeme+SSL → destek | 191 KB | 1,40 |
| kurumsal-web-sitesi | menü kurgusu → rol yetkisi → SEO+sistem | 288 KB | 1,31 |
| ozel-yazilim | bayi paneli → rezervasyon → entegrasyon | 181 KB | 1,53 |

### seo (5) — dal `seo`, limon

| sayfa | duraklar | mp4 | döngü |
|---|---|---|---|
| teknik-seo | denetim → öncelik → doğrulama | 276 KB | 1,21 |
| yerel-seo | dizin kaydı → yorum+yanıt → çoklu şube | 236 KB | 1,39 |
| e-ticaret-seo | filtre ağı → varyant URL → yönlendirme | 318 KB | 1,44 |
| icerik-stratejisi | süreç akışı → iç bağlantı → raporlama | 174 KB | 1,47 |
| cok-dilli-seo | ayrı harita → yerelleştir → son kontrol | 277 KB | 1,24 |

Döngü eşiği 1,6. Hepsi normal modda oynuyor, hareket kısıtlı modda durgun,
`data-dongu` ile bağlı, eski satır içi gözlemci kaldırılmış.

Canlı linkler — sayfada **"Karar vermeden önce bakmak isterseniz"** bölümüne kadar
kaydırınca video görünür (ekrana girince başlar):
`https://tasarimmaniayapayzeka.github.io/tasarimmania-konsept/site/hizmetler/<yol>/`

---

## Kalan (8) — sırayla yapılacak

| modül | sayfa | dal (renk) | yasaklar.md başlığı |
|---|---|---|---|
| **mobil** | aso-uygulama-pazarlamasi, ios-android, react-native, uygulama-ui-ux | `mobil` (mor) | "## mobil" |
| **pazarlama** | google-ads, meta-ads, performans-pazarlamasi, sosyal-medya-yonetimi | `pazarlama` (kehribar) | "## pazarlama" |

**Bu iki modül için iş akışı SCRIPTI henüz yazılmadı** (video/web/seo'nunki
yazılmış ve kaydedilmişti). SEO'nun script'i en güncel kalıp — onu kopyalayıp
sayfa listesini ve dalı değiştirerek yeni script yaz:
`.claude/.../workflows/scripts/modul-seo-sahneleri-wf_3988b9ff-884.js`
İçindeki `ORTAK` metni ve iki aşamalı `pipeline` yapısını aynen kullan, sadece
`SAYFALAR` dizisini ve "seo" geçen yerleri güncelle.

**Mobil ve pazarlamanın kendine özgü yasakları zaten `yasaklar.md`'de yazılı**
(bayrak, logo, eşitlik gibi genel maddeler değil — bu iki modüle özel):
- iOS/Android sayfası **piksel ölçerek eşitlik** ister (referans: ürün videosu
  kusuru, %14 fark bulunmuştu).
- React Native native'e göre zayıf/üstün gösterilemez.
- Pazarlama modülünde **hiçbir metrik rakamı yok** (CPC, dönüşüm oranı, ROAS,
  bütçe, erişim) — gösterge paneli çizilirse üzerinde sayı olmayacak.
- Sosyal medya yerleşimleri soyut kutu; kalp/paylaş oku/konuşma balonu yok.

---

## Üretim hattı

```bash
# 1. sayfanın .akv listesindeki 3 adımı oku, sahne yaz:
#    plan/video-uret/sahne-<slug>.js
# 2. önizleme (mp4 üretmez, sayfaya dokunmaz) — PNG'yi AÇ VE BAK, en az 2 tur
node plan/video-uret/onizleme.js plan/video-uret/sahne-<slug>.js <dal> <cikti.png>
# 3. üret
node plan/video-uret/uret.js sahne-<slug>.js <dal> modul-<dal>/<slug>
# 4. döngü dikişini ölç (oran <= 1.6 olmalı)
node plan/video-uret/dongu-denetim.js assets/modul-<dal>/<slug>.mp4
# 5. sayfayı bağla (src+poster değişir, data-dongu eklenir, eski gözlemci silinir)
node plan/video-uret/bagla.js <sayfa> modul-<dal>/<slug>
# 6. oynatmayı iki modda ölç (bkz. ÖLÇÜM TUZAKLARI #1 — gerçek zamanlı bekle)
node plan/video-olc.js <sayfa>   # sonra headless Chrome ile _vd.html
# 7. bitince: iş bitiminde herkes butunluk.js çalıştırır
node plan/video-uret/butunluk.js
```

Dosyalar:
- `motor.js` — ortak motor. **DEĞİŞTİRME**, 15 sayfa kullanıyor.
- `yasaklar.md` — her sayfanın kendi çizim yasağı. Sahne yazmadan önce oku.
- `adimlar.json` — 23 sayfanın üç adımı (`adimlari-cikar.js` üretir).
- `butunluk.js` — sayfa/dosya eşleşmesi denetimi.

---

## Ölçülmüş kurallar (tahmin değil, hepsi bu oturumda ölçüldü)

**Yazı boyu en az 28 px, PİKSEL ölçerek doğrula.** Video masaüstünde `0,517`,
mobilde `~0,31` ölçekle gösteriliyor. 28 px → masaüstü 14,5 / mobil 8,8. Videoda
**yalnız üç durak etiketi** var; ayrıntıyı şekiller taşıyor. Etiket 246 px
istasyona sığmalı — kod hesabıyla değil, **render edip mürekkep genişliğini
piksel tarayarak** doğrula (bir sahnede en geniş etiket 246'yı 1 px aşmıştı,
render ölçümüyle yakalandı).

**Font ağırlığı zorunlu.** librsvg (sharp'in SVG motoru), `font-weight` verilmemiş
metni **harfleri yiyerek** çizer. `motor.yaz()` ağırlığı dayatır; ham `<text>` yazma.
JetBrains Mono kurulu değil — gerçek mono için Consolas.

**Dikişsiz döngü.** Kare `i`'nin fazı `i/120` (son kare 1.0 DEĞİL). Tüm hareket faz
cinsinden periyodik olmalı.

**Eşitlik piksel ölçülür, koda bakılarak değil.** Ürün videosu sahnesinde iki ışık
başı boyut/kontur/gecikme bakımından eşitti ama dolgu **%14 parlaklık farkı**
yaratıyordu; biri "sönük kart" gibi duruyordu. AI entegrasyonu sahnesinde aynı
kontrol yapılıp fark **%1,0** çıktı — geçti.

**Kardeş figürle çelişme.** Sayfada zaten bir `.akis` infografiği var. Reels
sahnesi sayfada olmayan üçüncü bir bölge uydurup butonları oraya koymuştu;
sayfanın kendi figürü "alt bantta, çubukların sağında" diyordu.

**Yorumdaki iddia da ölçülmeli, sadece çizim değil.** Grafik tasarım sahnesinde
çizim doğruydu ama yorum "kardeş figürle aynı sıra" diyordu — ölçülünce sıra
farklı çıktı (palet↔kurallar uçlarda yer değiştirmiş). Yorum ölçüme dayalı
yeniden yazıldı, çizime dokunulmadı (önizleme PNG sha256 öncesi/sonrası aynı).

---

## Oynatma: düzeltilen gerçek kusur

Sayfalarda kopyalanmış küçük bir `IntersectionObserver` vardı: görününce
`play()`, değilse `pause()`. **Çalışıyordu** ama `prefers-reduced-motion` hiç
sormuyordu. `tm.js`'in `video[data-dongu]` yolu aynı işi yapıp fazlasını da
yapıyor. Bağlanan 15 sayfada kopya kaldırıldı. **Kalan 8 sayfada hâlâ duruyor**
— `bagla.js` her sayfada otomatik siliyor.

---

## ÖLÇÜM TUZAKLARI — buraya düşüldü, tekrarlama

1. **`scroll-behavior:smooth`** (`tm.css:60`) `scrollTo`'yu animasyonlu yapar; hemen
   ölçersen konum hâlâ eskidir. Hareket kısıtlı modda reduce bloğu onu `auto` yaptığı
   için orada çalışır, normalde çalışmaz → sonuç ters görünür. `video-olc.js` ölçüm
   başında `auto`'ya çekiyor, ama yine de **gerçek zamanlı bekleyerek** ölç.
2. **`--virtual-time-budget` medya saatini ilerletmez.** `paused` doğru okunur ama
   `currentTime` ilerlemesi okunamaz — CDP ile gerçek saniye bekleyerek ölçülmeli.
   (Bu tuzağa SEO turunda tekrar düşülüp düzeltildi.)
3. **Tembel görseller sayfayı büyütür**, `scrollIntoView` hedefi kaçırır. Önce
   sayfayı baştan sona gez, sonra hedefe git.
4. **`--autoplay-policy=no-user-gesture-required` kullanma** — gerçek kullanıcıda yok.
5. **`node -e` içinde ters bölü**: bash heredoc/inline'da `\` yenir, sözdizimi
   hatası olur. Regex içeren betiği **dosyaya yaz**, `node -e` ile geçme. (Bu
   oturumda üç kez tekrar düşüldü — `butunluk.js`'in ilk denemesi de dahil.)
6. **`while IFS= read`** dosya satır sonuyla bitmezse son satırı sessizce atlar.

Yukarıdaki 1-4 tuzağı yüzünden bir ara "video hiç oynamıyor, rozet yalan
söylüyor" denildi — **yanlıştı, video oynuyordu.** Kullanıcıya düzeltmesi
iletildi, buraya da ders olarak kaydedildi.

---

## Bitince yapılacaklar (23/23 olunca)

1. `node plan/video-uret/butunluk.js` → kırık 0, "hâlâ ortak (akis)" 0 olmalı.
2. **Öksüz dosyaları temizle.** Her modül tamamlandığında o modülün `akis.mp4` +
   `akis.jpg` dosyasını kullanan sayfa kalmaz. 3 Eylül 19:45 itibarıyla:
   - `modul-video/akis.*` → öksüz (0 kullanan)
   - `modul-web/akis.*` → öksüz (0 kullanan)
   - `modul-seo/akis.*` → öksüz (0 kullanan)
   - `modul-mobil/akis.*`, `modul-pazarlama/akis.*` → henüz kullanılıyor (4'er sayfa)
   Hepsi bitince beşi de silinebilir. Silmeden önce `grep -rl "akis.mp4" site/`
   ile gerçekten 0 kullanan kaldığını doğrula.
3. **62 sayfayı mobil (390px) + masaüstü (1440px) tara** — bkz. önceki tam site
   taraması deseni (`plan/tam-tarama.js`, `plan/duzen-olc.js`). Yatay taşma, ekran
   kalıntısı, kırık görsel, yazı boyu, dizilim.
4. Yedeği tazele ve **içeriğini doğrula** (bayt karşılaştırmasıyla, `Get-Content`
   metin karşılaştırmasıyla DEĞİL — Türkçe yorumlar ANSI/UTF-8 farkı yaratır):
   ```bash
   powershell -ExecutionPolicy Bypass -File plan\yedek-al.ps1
   powershell -ExecutionPolicy Bypass -File plan\yedek-dogrula.ps1
   ```
5. Commit + push, `00-DEVAM.md`'yi "23/23 tamamlandı" olarak güncelle.

---

## Bu oturumdan önce de bekleyen, videoyla ilgisiz açık işler

- **320px** ekranlarda `.akis` yazısı 7,80 px. Desenin ortak özelliği, hedef taban
  375px olduğu için dokunulmadı. Kullanıcı kararı bekliyor.
- Gerçek alan adına taşıma komutları **koşulmadı**:
  `node plan/canli-paket.js` sonra `node plan/noindex-uygula.js --ac`
- Gerçek e-posta adresi yok.
- `sitemap.xml` / `robots.txt` yok.

---

## Yedek

En son doğrulanmış arşiv:
`E:\Claude-Projeler-Yedek\25-TasarimMania-Site\TasarimMania-Site_2026-09-03_1804.zip`
457,7 MB · 63 sayfa · 97 asset · `.git` yok · içeriği bayt bayt doğrulandı.

**Bu arşiv 15/23 durumunu kapsıyor** (web + seo dahil, mobil + pazarlama hariç).
Kalan 8 sayfa bitince yedeği tekrar tazele (bkz. "Bitince yapılacaklar" #4).
