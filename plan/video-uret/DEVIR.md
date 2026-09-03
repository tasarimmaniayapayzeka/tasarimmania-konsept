# DEVİR NOTU — modül döngü videoları

**Son güncelleme:** 3 Eylül 2026, 03:50
**Durum:** 4 / 23 sayfa bitti. Kalan 19 sayfa bekliyor.
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

Kullanıcı bu tasarımı önizlemeden sonra onayladı ("güzel", "onaylıyorm").

---

## Biten (4/23) — video-produksiyon

| sayfa | duraklar | mp4 | döngü |
|---|---|---|---|
| reklam-filmi | senaryo → çekim planı → ses+post | 163 KB | 1,46 |
| urun-videosu | sahne ışığı → açı provası → ses+metin | 167 KB | 1,53 |
| sosyal-video-reels | yerleşim → altyazı → ses dengesi | 263 KB | 1,29 |
| ai-destekli-produksiyon | uygun alan → ekip rolü → kalite onay | 165 KB | 1,52 |

Döngü eşiği 1,6. Dördü de normal modda oynuyor, hareket kısıtlı modda durgun.

---

## Kalan (19) — sırayla yapılacak

| modül | sayfa | dal (renk) |
|---|---|---|
| **web** | grafik-tasarim, ai-entegrasyonu, bakim-destek, e-ticaret, kurumsal-web-sitesi, ozel-yazilim | `web` (camgöbeği) |
| **seo** | cok-dilli-seo, e-ticaret-seo, icerik-stratejisi, teknik-seo, yerel-seo | `seo` (limon) |
| **mobil** | aso-uygulama-pazarlamasi, ios-android, react-native, uygulama-ui-ux | `mobil` (mor) |
| **pazarlama** | google-ads, meta-ads, performans-pazarlamasi, sosyal-medya-yonetimi | `pazarlama` (kehribar) |

`grafik-tasarim` kendi modülü ama `data-dal="web"` — sayfanın kendi değerini kullan.

**Web modülü iş akışı yazılmış ve bir kez başlatılmıştı, kredi bitince durduruldu.**
Betiği hazır, aynen yeniden koşturulabilir:
`.claude/.../workflows/scripts/modul-web-sahneleri-wf_77e862e5-f10.js`
(Yeni oturumda o dosya erişilemezse, video modülünün betiği aynı kalıptadır —
sayfa listesi ve dal değiştirilerek kopyalanır.)

---

## Üretim hattı

```bash
# 1. sahne yaz: plan/video-uret/sahne-<slug>.js
# 2. önizleme (mp4 üretmez, sayfaya dokunmaz) — PNG'yi AÇ VE BAK
node plan/video-uret/onizleme.js plan/video-uret/sahne-<slug>.js <dal> <cikti.png>
# 3. üret
node plan/video-uret/uret.js sahne-<slug>.js <dal> modul-<dal>/<slug>
# 4. döngü dikişini ölç (oran <= 1.6 olmalı)
node plan/video-uret/dongu-denetim.js assets/modul-<dal>/<slug>.mp4
# 5. sayfayı bağla (src+poster değişir, data-dongu eklenir, eski gözlemci silinir)
node plan/video-uret/bagla.js <sayfa> modul-<dal>/<slug>
# 6. oynatmayı iki modda ölç
node plan/video-olc.js <sayfa>   # sonra headless Chrome ile _vd.html
```

Dosyalar:
- `motor.js` — ortak motor. **DEĞİŞTİRME**, dört sayfa kullanıyor.
- `yasaklar.md` — her sayfanın kendi çizim yasağı. Sahne yazmadan önce oku.
- `adimlar.json` — 23 sayfanın üç adımı (`adimlari-cikar.js` üretir).
- `butunluk.js` — sayfa/dosya eşleşmesi denetimi.

---

## Ölçülmüş kurallar (tahmin değil, hepsi bu oturumda ölçüldü)

**Yazı boyu en az 28 px.** Video masaüstünde `0,517`, mobilde `~0,31` ölçekle
gösteriliyor. 28 px → masaüstü 14,5 / mobil 8,8. Daha küçük yazı mobilde okunmaz.
Bu yüzden videoda **yalnız üç durak etiketi** var; ayrıntıyı şekiller taşıyor,
açıklamayı zaten yanındaki sayfa metni yapıyor. Etiket 246 px istasyona sığmalı.

**Font ağırlığı zorunlu.** librsvg (sharp'in SVG motoru), `font-weight` verilmemiş
metni **harfleri yiyerek** çizer — sınamada satır noktalara döndü
(`plan/video-uret/font-testi.js`). `motor.yaz()` ağırlığı dayatır; ham `<text>` yazma.
JetBrains Mono bu makinede kurulu değil — gerçek mono için Consolas.

**Dikişsiz döngü.** Kare `i`'nin fazı `i/120` (son kare 1.0 DEĞİL). Tüm hareket faz
cinsinden periyodik olmalı. Tek seferlik hareket koyma.

**Eşitlik piksel ölçülür, koda bakılarak değil.** Bir sahnede iki ışık başı
boyut/kontur/gecikme bakımından eşitti ama içlerindeki dolgu **%14 parlaklık farkı**
yaratıyordu; biri "sönük kart" gibi duruyordu.

**Kardeş figürle çelişme.** Aynı sayfada zaten bir `.akis` infografiği var. Bir sahne
sayfada olmayan üçüncü bir bölge uydurup butonları oraya koymuştu; sayfanın kendi
figürü "alt bantta, çubukların sağında" diyordu.

---

## Oynatma: düzeltilen gerçek kusur

Sayfalarda her birinde kopyalanmış küçük bir `IntersectionObserver` vardı:
görününce `play()`, değilse `pause()`. **Çalışıyordu** ama `prefers-reduced-motion`
hiç sormuyordu. `tm.js`'in `video[data-dongu]` yolu aynı işi yapıp fazlasını da
yapıyor (kısıtlı modda hiç başlatmaz, sekme arkada duraklatır, politika engelinde
yeniden dener). Bağlanan sayfalarda kopya kaldırılıp tek uygulamaya geçildi.
**19 sayfada eski gözlemci hâlâ duruyor** — `bagla.js` her sayfada otomatik siliyor.

---

## ÖLÇÜM TUZAKLARI — buraya düşüldü, tekrarlama

1. **`scroll-behavior:smooth`** (`tm.css:60`) `scrollTo`'yu animasyonlu yapar; hemen
   ölçersen konum hâlâ eskidir. Hareket kısıtlı modda reduce bloğu onu `auto` yaptığı
   için orada çalışır, normalde çalışmaz → sonuç "normalde durgun, kısıtlıda oynuyor"
   gibi **ters** görünür. `video-olc.js` artık ölçüm başında `auto`'ya çekiyor.
2. **Tembel görseller sayfayı büyütür**, `scrollIntoView` hedefi kaçırır
   (rectTop 844 → 1557 → 2615). Önce sayfayı baştan sona gez, sonra hedefe git.
3. **`--autoplay-policy=no-user-gesture-required` kullanma** — gerçek kullanıcıda yok.
4. Bu üç tuzak yüzünden bir ara "video hiç oynamıyor, rozet yalan söylüyor" denildi.
   **Yanlıştı, video oynuyordu.** Kullanıcıya düzeltmesi iletildi.
5. **`node -e` içinde ters bölü**: bash heredoc/inline'da `\\` yenir, `/\\/g` → `/\/g`
   sözdizimi hatası olur. Regex içeren betiği **dosyaya yaz**, `node -e` ile geçme.
6. **`while IFS= read`** dosya satır sonuyla bitmezse son satırı sessizce atlar.

---

## Bırakılan diğer açık işler (bu oturumdan önce de vardı)

- **320px** ekranlarda `.akis` yazısı 7,80 px. Desenin ortak özelliği, hedef taban
  375px olduğu için dokunulmadı. Kullanıcı kararı bekliyor.
- Gerçek alan adına taşıma komutları **koşulmadı**:
  `node plan/canli-paket.js` sonra `node plan/noindex-uygula.js --ac`
- 19 sayfa hâlâ modül geneli `akis.mp4` kullanıyor. Hepsi kendi videosuna geçince
  `assets/modul-*/akis.mp4` ve `akis.jpg` **öksüz kalacak** — o zaman silinebilir.
  (Şu an `modul-video/akis.*` zaten öksüz ama silinmedi, iş bitene kadar dursun.)

---

## Yedek

En son doğrulanmış arşiv:
`E:\Claude-Projeler-Yedek\25-TasarimMania-Site\TasarimMania-Site_2026-09-03_0005.zip`
424,9 MB · 63 sayfa · `.git` yok · içeriği açılıp doğrulandı.

**Bu oturumun video işi o yedekten SONRA yapıldı.** Yeni oturum başında yedeği
tazele:
```bash
powershell -ExecutionPolicy Bypass -File plan\yedek-al.ps1
powershell -ExecutionPolicy Bypass -File plan\yedek-dogrula.ps1
```
