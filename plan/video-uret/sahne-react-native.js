/* SAHNE — mobil / react-native
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Native Köprü ve Üçüncü Parti Modül Entegrasyonu
 *      "Kamera, biyometrik giriş veya push bildirimi gibi cihaza özgü
 *       yetenekler için React Native, native köprü (bridge) katmanı üzerinden
 *       platformun API'lerine erişir. Topluluk modülleri çoğu senaryoyu
 *       karşılar; özel donanım entegrasyonu gerektiğinde küçük bir native
 *       modül devreye alınır."
 *   02 State Yönetimi ve Ölçeklenebilir Proje Mimarisi
 *      "Uygulama büyüdükçe ekranlar arası veri akışını yönetmek kritik hale
 *       gelir. TypeScript ile tip güvenliği sağlanan, katmanlı bir klasör
 *       yapısı ve merkezi state yönetimi kuruyoruz; API çağrıları ve hata
 *       yönetimi ayrı bir servis katmanında toplanır."
 *   03 CI/CD ve Mağaza Yayın Hattı
 *      "Derleme, imzalama ve mağaza yükleme adımlarını otomatikleştiren bir
 *       CI/CD hattı kuruyoruz; her sürüm aynı kontrol adımlarından geçer ve
 *       iki mağazaya paralel gönderim standart bir işleyişe dönüşür."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 üstte üç cihaz yeteneği (kamera / biyometrik / bildirim) durur; altında
 *      modül rafı — dört topluluk modülü ve sağ uçta kesik çerçeveli KÜÇÜK bir
 *      native yuva; raf hep dolu, native yuva yalnız geç fazda dolar. Rafın
 *      altında KÖPRÜ KATMANI: bir kafes kirişi ve içinden geçen üç şerit;
 *      her şeritte biri aşağı biri yukarı iki paket taşınır. Köprünün altında
 *      iki yönlü trafik, en altta platform API bandı ve üç yuvası.
 *   02 üç katman plakası alt alta: ÜST plaka dört ekran kartı, her kartın
 *      altındaki bağ bir ELMAS TİP KAPISINDAN geçer (tip güvenliği: yalnız
 *      biçimi tutan jeton geçer); bağlar tek bir toplayıcı raya inip tek gövde
 *      hâlinde ORTA plakaya, merkezi state çekirdeğine girer — çekirdek halka
 *      etrafında dönen bir jeton taşır; oradan ALT plakaya, servis katmanına
 *      iner: iki eş şerit, biri dışarı ok (API çağrıları), biri huniye akan
 *      (hata yönetimi). Ekranlar arası doğrudan bağ YOKTUR — akış hep merkezden.
 *   03 tepedeki kaynaktan çıkan İKİ sürüm jetonu tek hat boyunca iner ve
 *      ÜÇ AYNI aşamadan geçer (derleme → imzalama → mağaza yükleme); jeton
 *      hangi aşamanın içindeyse o aşama yanar. Üçüncü aşamanın hemen altında
 *      hat tek bir dağıtım kirişine bağlanır; kirişten inen İKİ PARALEL
 *      KULVAR birbirinin aynısıdır ve birbirinin aynısı iki hedefe varır.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER ───────────────────────────────────────────────────────────
 * Videodaki TEK yazı üç durak etiketidir; ayrıntıyı şekiller taşıyor.
 * Etiketler sayfanın kendi başlıklarının kısaltması. Ölçüm aşağıda.
 *
 * ── YASAK (yasaklar.md "## mobil" modül geneli + "react-native") ────────
 *  - MAĞAZA LOGOSU YOK: 03'ün iki hedefi adsız, birbirinin aynı, nötr kutu.
 *    Elma/oyun/torba/bulut benzeri hiçbir işaret yok; hedef simgesi yalnız bir
 *    yükleme yuvası (yatay yarık + yukarı ok).
 *  - ÇATI/DİL LOGOSU YOK: React, TypeScript, JS ya da bunlara benzeyen hiçbir
 *    işaret çizilmedi (atom/altıgen/kıvrık ok yok). Tip güvenliği bir ELMAS
 *    BİÇİM KİLİDİ ile anlatıldı; harf ya da rozet kullanılmadı.
 *  - NATIVE ZAYIF/ÜSTÜN GÖSTERİLMEDİ: 01'deki native yuva sayfanın kendi
 *    cümlesiyle birebir — "özel donanım entegrasyonu GEREKTİĞİNDE KÜÇÜK bir
 *    native modül devreye alınır". Bu yüzden yuva küçüktür ve geç dolar; üstü
 *    çizilmemiş, kırmızıya boyanmamış, uyarı işareti konmamıştır. Dolduğunda
 *    topluluk modülleriyle AYNI aksan tonunu alır (aşağıda ölçüldü), yani
 *    "kötü çözüm" değil "seyrek gereken çözüm" olarak okunur.
 *  - RAKAM YOK: indirme, sürüm numarası, cihaz, test, süre, yüzde, boyut —
 *    hiçbiri yazılmadı. Tek rakam durak numaraları (01/02/03).
 *  - İNSAN YÜZÜ YOK, MARKA/ÜRÜN LOGOSU YOK.
 *
 * ── EŞİTLİK — NEREDE EŞİT, NEREDE BİLEREK DEĞİL ─────────────────────────
 * EŞİT OLMASI GEREKENLER (sayfa bunları sıralamıyor, "gibi" / "paralel" diyor):
 *   · 01'in ÜÇ YETENEK KUTUSU — "Kamera, biyometrik giriş veya push bildirimi
 *     GİBİ": alternatif örnekler, sıra yok. Aynı ölçü, aynı kontur, aynı dolgu,
 *     AYNI GECİKME (sıfır kayma). Piksel ölçümü aşağıda.
 *   · 01'in DÖRT TOPLULUK MODÜLÜ — aynı ölçü, aynı dolgu, aynı gecikme.
 *   · 01'in KÖPRÜ ÜÇ ŞERİDİ — üç şeridin paketleri BİREBİR aynı fazda gider;
 *     bilerek kayma verilmedi ki hiçbir yetenek "önce/daha çok" geçmesin.
 *   · 02'nin DÖRT EKRAN KARTI + dört tip kapısı — aynı ölçü, aynı gecikme.
 *   · 02'nin İKİ SERVİS ŞERİDİ — gövdeleri birebir aynı; fark yalnız uçtaki
 *     işaret (ok / huni), çünkü sayfa ikisini aynı katmanda eşit anıyor.
 *   · 03'ün İKİ HEDEFİ ve İKİ PARALEL KULVARI — "iki mağazaya PARALEL
 *     gönderim": ölçü, kontur, dolgu, gecikme, simge ve jeton fazı birebir
 *     aynı; kulvarlar hat ekseninde tam ayna (±58 px) ve ikisi de darbenin
 *     yatay erişiminin (52 px) dışında.
 *   · 03'ün ÜÇ AŞAMASI — sayfa bir SIRA anlatıyor (derleme → imzalama →
 *     yükleme), ama hiçbirini diğerinden önemli göstermiyor: gövde, ölçü,
 *     kontur, dolgu üçünde de birebir aynı; fark yalnız simge ve jetonun o an
 *     nerede olduğu.
 *     DİKKAT — "fark yalnız jetonun o an nerede olduğu" cümlesi TEK BAŞINA
 *     yeterli değil, çünkü "o an" da ölçülmek zorunda: her aşamanın ∫ ic·p
 *     değeri (jeton içerideyken durak da canlıysa geçen süre) eşit olmalı.
 *     İlk sürümde 0,080 / 0,028 / 0,123 idi (%123,7) — 02. aşama, durak en
 *     parlakken neredeyse hiç yanmıyordu. Düzeltildikten sonra 0,072 / 0,074 /
 *     0,074 (%1,7). Ölçüm ve gerekçe yayinHatti() içindeki "JETON HIZI"
 *     notunda.
 * BİLEREK EŞİT OLMAYAN TEK ŞEY:
 *   · 01'in NATIVE YUVASI. Sayfanın kendi cümlesi "çoğu senaryo" ↔ "küçük bir
 *     native modül" ayrımını kuruyor; yuva bu yüzden dar (26 px ↔ 38 px) ve
 *     geç dolar. Gerekçe yukarıdaki YASAK bölümünde.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) TEK KOD TABANI — "JavaScript/TypeScript"
 * yazan kod penceresi, altı kod satırı, ikiye ayrılan gövde, iki telefon
 * ("iOS" / "Android") ve "Ortak API katmanı" bandı; (2) PLATFORMA ÖZGÜ NOKTA —
 * "ortak kod tabanı" kutusu, elmas ayrım noktası, "iOS modülü" / "Android
 * modülü" kutuları ve "gerektiğinde native" notu, altta "Ortak kod";
 * (3) NEDEN REACT NATIVE — React Native ↔ Flutter karşılaştırma kartları.
 * Bu sahne sayfanın BAŞKA bir kesitini çizer, o üç durağı tekrarlamaz:
 *  · Kardeş figür TEK KOD TABANININ İKİ PLATFORMA AYRILMASINI anlatıyor.
 *    Bu sahne kod tabanının DIŞARIYLA KURDUĞU BAĞI anlatıyor: cihaz yeteneği,
 *    state akışı, yayın hattı. İkisi sayfanın iki ayrı bölümünden geliyor —
 *    kardeş figür "Derinlemesine", bu sahne "Ayrıntılar"daki 01/02/03 listesi.
 *  · Kod penceresi + kod satırları BU SAHNEDE YOK; telefon çerçevesi YOK;
 *    "iOS"/"Android" ayrımı YOK. 03'ün iki hedefi ADSIZ ve BİRBİRİNİN AYNI —
 *    kardeş figürdeki adlandırılmış iki platformun kopyası değil, sayfanın
 *    "iki mağazaya paralel gönderim" cümlesinin karşılığı.
 *  · Flutter karşılaştırması BU SAHNEDE HİÇ GEÇMİYOR — tek bir karşılaştırma
 *    kartı, çapraz işaret ya da iki seçenek yan yana çizilmedi.
 *  · ELMAS BİÇİMİ İKİ FİGÜRDE DE VAR ama BAŞKA İŞ YAPIYOR ve çelişmiyor:
 *    kardeş figürde elmas AYRIM NOKTASI (gövde ikiye ayrılıyor), burada TİP
 *    KAPISI (jeton biçimi tutuyorsa geçiyor, gövde ayrılmıyor). Burada elmasın
 *    içinden çatal ikonu değil, aynı biçimde bir jeton geçiyor.
 *  · Kardeş figürün "gerektiğinde native" notu ile bu sahnenin native yuvası
 *    AYNI ŞEYİ söylüyor, ters şey değil: ikisi de "gerektiğinde" diyor.
 *    Kardeş figürde bu not iki platform kutusunun altında kesik çerçeveli;
 *    burada da yuva kesik çerçeveli ve geç doluyor.
 *
 * ── ÖLÇÜLEN DEĞERLER — hepsi bu makinede ölçüldü, hiçbiri tahmin değil ──
 *
 * 1) ETİKET GENİŞLİĞİ. Kod hesabıyla değil, etiket TEK BAŞINA basılıp mürekkep
 *    kutusu piksel piksel taranarak ölçüldü (28 px, Consolas, ağırlık 600,
 *    harf arası 1,2). İstasyon 246 px:
 *      "01 KÖPRÜ+MODÜL"   229 px  ✓ SEÇİLDİ
 *      "02 STATE+YAPI"    213 px  ✓ SEÇİLDİ
 *      "03 CI/CD HATTI"   229 px  ✓ SEÇİLDİ
 *    Denenip elenenler — AYNI KARAKTER SAYISI AYNI GENİŞLİĞİ VERMİYOR, bu
 *    yüzden hesapla değil ölçerek seçildi:
 *      "01 NATIVE KÖPRÜ"  247 px  ✗ tam 1 px TAŞIYOR — kısaltmanın gerekçesi bu
 *      "01 KÖPRÜ KATMANI" 263 px  ✗
 *      "02 STATE MİMARİ"  246 px  (sığıyor ama payı sıfır — seçilmedi)
 *      "02 STATE+KATMAN"  247 px  ✗ ← üstteki ile AYNI 15 karakter, 1 px fazla
 *      "02 MERKEZİ STATE" 262 px  ✗
 *    Videodaki TEK yazı bu üç etikettir (sahnede başka <text> yok, grep ile
 *    doğrulandı); en küçük yazı boyu 28 px.
 *
 * 2) EŞİTLİK — tek karede değil DÖNGÜ ORTALAMASINDA, ve aynı kutular BOŞ
 *    KABUKTA da ölçülerek. Boş kabuk = motor.kabuk(''), içinde hiç çizim yok;
 *    motorun kendi tepe vinyeti (ustKarart, üst %42'yi karartıyor) ve zemin
 *    halesi zaten bir rampa yaratıyor, sahnenin payı ondan ayrılsın diye.
 *    YÖNTEM (bağımsız denetimde yeniden ölçüldü, tekrar üretilebilsin diye
 *    yazılıyor): Rec.709 parlaklık (0,2126R + 0,7152G + 0,0722B), 40 kare
 *    (faz = i·3/120), kutular çizimin KENDİ dikdörtgen koordinatları.
 *      küme                        sahne     boş kabuk
 *      01 üç yetenek kutusu        %2,1      %5,0
 *      01 dört topluluk modülü     %1,0      %5,7
 *      01 üç köprü şeridi          %2,9      %7,6
 *      01 üç API yuvası            %0,8      %7,3
 *      01 iki trafik çizgisi       %0,8      %3,6
 *      02 dört ekran kartı         %0,1      %1,0
 *      02 dört tip kapısı          %0,3      %0,9
 *      02 iki servis şeridi        %0,6      %4,1
 *      03 üç aşama                 %8,9      %8,0
 *      03 iki kulvar               %1,5      %5,4
 *      03 iki hedef                %0,7      %3,7
 *    OKUNUŞU: sahne ON kümenin HEPSİNDE rampayı AZALTIYOR (en uçta 01 API
 *    yuvaları %7,3 → %0,8). Kutuların altına konan yarı geçirmez zemin (ZEM)
 *    ile akan borunun ışığı bantlara sızmıyor. Eşitlik kuralının hedefi olan
 *    kümeler (yetenekler, modüller, ekranlar, şeritler, kulvarlar, hedefler)
 *    %2,9'un altında.
 *    03'ÜN ÜÇ AŞAMASI ayrı bir durum ve yorumu iki kez düzeltildi:
 *      · Bu bir "iki seçenek de geçerli" kümesi DEĞİL, sıralı bir hattır;
 *        rakamı yine de burada, çünkü ölçülmeden konuşulmasın.
 *      · %8,9'un %8,0'ı motorun vinyeti. Kalan 0,9 puan sahnenin.
 *      · ÖNCEKİ YORUM YANLIŞTI: "%9,6 / boş %9,1 → sahne 0,5 puan ekliyor"
 *        yazıyordu; yeniden ölçülünce %10,7 / %8,0 çıktı, yani sahne 2,7 puan
 *        EKLİYORDU. Sebebi de yanlış tahmin edilmişti: boru ve darbe tek tek
 *        kapatılıp ölçüldü, üç aşamanın değerleri 0,01'den az değişti — yani
 *        artık ışık borudan da darbeden de gelmiyordu. Gerçek sebep JETON
 *        HIZIYDI; düzeltmesi ve ölçümü yayinHatti() içinde "JETON HIZI"
 *        notunda. Düzeltmeden sonra %10,7 → %8,9.
 *    NATIVE YUVASI BU TABLODA YOK, çünkü BİLEREK eşit değil (gerekçe yukarıda).
 *    Yine de ölçüldü: yuva DOLUYKEN (faz 0,20, p=1) aksan çubuğunun tonu
 *    50,01, dört topluluk modülünde 49,34–49,37 — yani söz verildiği gibi
 *    AYNI ton. Kutu ortalaması 42,46 ↔ 39,64 (%7 yüksek), ama bu tondan değil
 *    yuvanın DAR olmasından: aynı parlaklıktaki çubuk daha küçük bir alana
 *    düşüyor. Gözle bakıldığında raftaki en parlak öğe değil.
 *
 * 3) DÖNGÜ DİKİŞİ — KUSUR SAHNEDE DEĞİL KODLAYICIDA. Önce kaynak PNG'ler,
 *    kodlayıcı hiç devreye girmeden ölçüldü (280x156'ya indirilip kanal başına
 *    ortalama mutlak fark):
 *      ardışık kare ortalaması 0,358 · en büyük 0,634 · DÖNGÜ DİKİŞİ 0,073
 *      → dikiş / ortalama 0,20×   (dikiş, normal bir kare adımından KÜÇÜK)
 *    Yani sahne faz cinsinden gerçekten periyodik. Kalan sıçrama x264'ün
 *    döngü noktasındaki nicemleme kayması. Aynı sahne beş ayarla basıldı
 *    (hepsi jeton hızı düzeltmesinden SONRA yeniden ölçüldü):
 *      crf 26 (uret.js VARSAYILANI) → dikiş 0,75  oran 1,85×  (188 KB)  ✗ KALIR
 *      crf 24                       → dikiş 0,67  oran 1,64×  (233 KB)  ✗ KALIR
 *      crf 22                       → dikiş 0,57  oran 1,40×  (289 KB)  ✓
 *      crf 21                       → dikiş 0,53  oran 1,29×  (325 KB)  ✓ SEÇİLDİ
 *      crf 20                       → dikiş 0,49  oran 1,20×  (362 KB)  ✓
 *    crf 21 seçildi: eşiğe (1,60) payı 0,31. Boyut (325 KB) kardeş videoların
 *    aralığının (163–318 KB) 7 KB üstünde — crf 22'ye inince 289 KB'ye düşüyor
 *    ama eşik payı 0,20'ye iniyor; pay tercih edildi. Bu sahnenin ardışık kare
 *    farkı kardeş sahnelerden düşük (çizim sakin), oran ölçütünün paydası
 *    küçük olduğu için varsayılan crf yetmiyor.
 *    ⚠ BU SAHNE crf 21 İLE BASILIR. `node plan/video-uret/uret.js ...` motorun
 *    varsayılanı crf 26 ile basar ve o ayar eşiği AŞAR (1,85×). Doğrusu:
 *      node -e "const m=require('./plan/video-uret/motor.js');
 *               m.uret('modul-mobil/react-native','mobil',
 *                      require('./plan/video-uret/sahne-react-native.js'),{crf:21})"
 *
 * 4) OYNATMA (headless Chrome, _vd.html ile; --autoplay-policy bayrağı YOK,
 *    --virtual-time-budget YOK — sayfa yerel http sunucusundan servis edildi
 *    ve sonucu aynı kaynağa POST etti, yani GERÇEK saniye beklenerek okundu):
 *      normal                        : paused=false, currentTime 1,98 → 3,68
 *      --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *      kaynak react-native.mp4 · data-dongu var · öğe görünür (rectTop 209)
 *    Ölçüm bitince _vd.html silindi.
 *
 * 5) mp4 GERÇEKTEN BU DOSYADAN MI BASILDI — denetimde doğrulandı: mp4'ün
 *    0/30/50/80/119. kareleri sahnenin aynı fazlarıyla karşılaştırıldı, kanal
 *    başına fark 1,19–1,25 (yalnız h264 nicemlemesi). Poster react-native.jpg
 *    ↔ sahne kare 50 farkı 0,69; çapraz kontrol için kare 10 ile 3,64 çıkıyor,
 *    yani poster gerçekten 0,42 fazı.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 KÖPRÜ+MODÜL' },
  { x: 437, fazMerkez: 0.50, etiket: '02 STATE+YAPI' },
  { x: 812, fazMerkez: 0.80, etiket: '03 CI/CD HATTI' },
];
const DW = 246, DH = 344, DY = 126;

/* Eşitlik gereken sıraların altına konan yarı geçirmez zemin. Akan borunun
   ışığı bu bantlara sızmasın diye; teknik-seo sahnesinde ölçülüp eklenmişti,
   burada da aynı değer kullanıldı. */
const ZEM = 'rgba(14,17,24,.72)';

module.exports = function sahne(faz, a) {
  const { cam, yaz, boru, seritYolu, darbeIsigi, canlilik } = a;
  const A = a.aksan.rgb.join(',');
  const yol = seritYolu(SERIT);

  const canli = DURAK.map((d) => canlilik(faz, d.fazMerkez, 0.19));

  let s = '';

  /* --- zemin ızgarası: çok soluk, derinlik için ------------------------ */
  s += '<g opacity=".5">';
  for (let x = 80; x < 1120; x += 80) {
    s += `<line x1="${x}" y1="0" x2="${x}" y2="626" stroke="rgba(255,255,255,.022)" stroke-width="1"/>`;
  }
  for (let y = 80; y < 626; y += 80) {
    s += `<line x1="0" y1="${y}" x2="1120" y2="${y}" stroke="rgba(255,255,255,.022)" stroke-width="1"/>`;
  }
  s += '</g>';

  /* --- akan cam boru (durakların ARKASINDA) ---------------------------- */
  s += boru(yol, faz, a.aksan.rgb, { kalin: 20, desen: 48, hiz: 3 });

  /* --- duraklar -------------------------------------------------------- */
  DURAK.forEach((d, i) => {
    const p = canli[i];
    s += `<g>`;
    if (p > 0.02) {
      s += `<rect x="${d.x - 14}" y="${DY - 14}" width="${DW + 28}" height="${DH + 28}" rx="26"
              fill="rgba(${A},${(0.10 * p).toFixed(3)})" filter="url(#yumusaCok)"/>`;
    }
    s += cam({ x: d.x, y: DY, w: DW, h: DH, r: 18, parlaklik: p, aksan: a.aksan.rgb });
    s += (i === 0 ? kopruKatmani(d.x, p, faz, a)
       : i === 1 ? stateYapisi(d.x, p, faz, a)
       : yayinHatti(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · NATIVE KÖPRÜ VE ÜÇÜNCÜ PARTİ MODÜL ────────────────────────────
   Yukarıdan aşağı sayfanın kendi cümle sırası: cihaza özgü yetenekler →
   (topluluk modülleri / gerektiğinde native modül) → köprü katmanı →
   platformun API'leri.

   ÖLÇÜ NOTU — IŞIK DARBESİ NEREYE DÜŞÜYOR: bu durakta darbe (bx+126, DY+242)
   noktasında duruyor, yarıçapı 52. Eşit olması gereken üç küme bilerek bu
   dairenin dışına yerleştirildi: yetenek kutuları DY+12–58 (en yakın kenar
   184 uzak), modül rafı DY+70–104 (138 uzak), API yuvaları DY+298–314
   (56 uzak; yuvalar pY+14'ten başlıyor, pY = DY+284). Dairenin içinde yalnız
   iki trafik çizgisi var ve o ikisi de darbenin x'ine (bx+126) göre TAM
   SİMETRİK (bx+86 ve bx+166, ikisi de 40 uzak) — ölçüldü, döngü ortalamasında
   39,80 ↔ 40,11, yani %0,8 (boş kabukta %3,6): eşit ışık alıyorlar. Akan
   borunun ekseni bu durakta DY+230 (x=62) ile DY+242 (x=188) arasında
   geziniyor; o bant da aynı boşluğa denk geliyor. */
function kopruKatmani(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const lX = bx + 16, lW = 214;

  /* --- üç cihaz yeteneği: BİREBİR aynı kutu, sıfır gecikme farkı -------- */
  const tW = 66, tH = 46, tY = DY + 12;
  const merkezX = [0, 1, 2].map((i) => lX + i * 74 + tW / 2);   // bx+49/123/197
  const tCanli = kis01((p - 0.04) / 0.34);                       // üçü de aynı

  for (let i = 0; i < 3; i++) {
    const tx = lX + i * 74;
    s += `<rect x="${tx}" y="${tY}" width="${tW}" height="${tH}" rx="10" fill="${ZEM}"/>`;
    s += `<rect x="${tx}" y="${tY}" width="${tW}" height="${tH}" rx="10"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += yetenekSimgesi(i, tx + tW / 2, tY + 20, A, p);
    /* alt çubuk — üçünde de aynı boy, aynı ton */
    s += `<rect x="${tx + 16}" y="${tY + 33}" width="34" height="6" rx="3"
            fill="rgba(${A},${(0.16 + 0.44 * tCanli * (0.35 + 0.65 * p)).toFixed(3)})"/>`;
    /* yetenekten modül rafına inen kısa bağ — üçü aynı faz */
    s += `<line x1="${tx + tW / 2}" y1="${tY + tH}" x2="${tx + tW / 2}" y2="${DY + 70}"
            stroke="rgba(${A},${(0.14 + 0.40 * p).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}" stroke-linecap="round"/>`;
  }

  /* --- modül rafı: dört topluluk modülü + KÜÇÜK native yuva -------------
     Dört modül birebir aynı (38 px, aynı dolgu, aynı gecikme). Native yuva
     dar (26 px) ve GEÇ dolar — sayfanın "gerektiğinde küçük bir native modül
     devreye alınır" cümlesi. Dolduğunda topluluk modülleriyle aynı aksan
     tonunu alır; sönük bırakılmadı, üstü çizilmedi. */
  const mY = DY + 70, mH = 34;
  const mDol = kis01((p - 0.16) / 0.34);                          // dördü de aynı
  const gerek = kis01((p - 0.62) / 0.26);                         // yuva geç dolar

  for (let i = 0; i < 4; i++) {
    const mx = lX + i * 46;
    s += `<rect x="${mx}" y="${mY}" width="38" height="${mH}" rx="8" fill="${ZEM}"/>`;
    s += `<rect x="${mx}" y="${mY}" width="38" height="${mH}" rx="8"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<rect x="${mx + 8}" y="${mY + 9}" width="22" height="6" rx="3"
            fill="rgba(${A},${(0.18 + 0.46 * mDol * (0.35 + 0.65 * p)).toFixed(3)})"/>`;
    s += `<rect x="${mx + 8}" y="${mY + 20}" width="14" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
  }
  /* native yuva — DOLDUĞUNDA topluluk modülleriyle BİREBİR aynı tonu alır.
     ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: ilk sürümde yuvanın konturu aksan renkliydi ve
     p=1'de 0,70 alfaya çıkıyordu; topluluk modüllerinin konturu 0,22 beyaz
     olduğu için native yuva raftaki EN PARLAK öğe oluyordu — "asıl olan bu"
     gibi okunuyordu, oysa sayfa onu seyrek gereken küçük bir parça olarak
     anlatıyor. Şimdi dolu gövde topluluk modülleriyle aynı formülü kullanıyor;
     aksan yalnız BOŞ yuvanın kesik çerçevesinde var ve yuva doldukça sönüyor. */
  const nx = lX + 188;
  s += `<rect x="${nx}" y="${mY}" width="26" height="${mH}" rx="8" fill="${ZEM}"/>`;
  s += `<rect x="${nx}" y="${mY}" width="26" height="${mH}" rx="8"
          fill="rgba(255,255,255,.012)"
          stroke="rgba(${A},${((0.18 + 0.14 * p) * (1 - gerek)).toFixed(3)})"
          stroke-width="1.3" stroke-dasharray="4 4"/>`;
  s += `<rect x="${nx}" y="${mY}" width="26" height="${mH}" rx="8"
          fill="rgba(255,255,255,${((0.030 + 0.028 * p) * gerek).toFixed(3)})"
          stroke="rgba(255,255,255,${((0.09 + 0.13 * p) * gerek).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<rect x="${nx + 6}" y="${mY + 9}" width="14" height="6" rx="3"
          fill="rgba(${A},${((0.18 + 0.46 * mDol * (0.35 + 0.65 * p)) * gerek).toFixed(3)})"/>`;
  s += `<rect x="${nx + 6}" y="${mY + 20}" width="9" height="5" rx="2.5"
          fill="rgba(255,255,255,${((0.10 + 0.16 * p) * gerek).toFixed(3)})"/>`;

  /* --- raftan köprüye toplayıcı ---------------------------------------- */
  for (let i = 0; i < 4; i++) {
    s += `<line x1="${lX + i * 46 + 19}" y1="${mY + mH}" x2="${lX + i * 46 + 19}" y2="${DY + 110}"
            stroke="rgba(255,255,255,${(0.08 + 0.14 * p).toFixed(3)})" stroke-width="1.3"/>`;
  }
  s += `<line x1="${nx + 13}" y1="${mY + mH}" x2="${nx + 13}" y2="${DY + 110}"
          stroke="rgba(${A},${(0.08 + 0.34 * gerek * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<line x1="${lX + 8}" y1="${DY + 110}" x2="${lX + lW - 8}" y2="${DY + 110}"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.3"/>`;

  /* --- KÖPRÜ KATMANI: kafes kirişi + üç şerit ---------------------------
     "native köprü (bridge) katmanı üzerinden platformun API'lerine erişir."
     Kiriş köprüyü okutur; üç şerit üç yeteneğin geçtiği yoldur. Üç şeridin
     paketleri BİREBİR aynı fazda gider — kayma verilseydi bir yetenek
     "önce geçen" gibi okunurdu. */
  const bY = DY + 118, bH = 68;
  s += `<rect x="${lX}" y="${bY}" width="${lW}" height="${bH}" rx="14"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.36 * p).toFixed(3)})" stroke-width="1.4"/>`;
  /* kafes: eşit aralıklı çaprazlar + her düğümde dikey dikme + üst/alt kuşak.
     ÖNİZLEMEDE GÖRÜLDÜ: yalnız çaprazlar varken şekil "testere dişi" gibi
     okunuyordu, köprü kirişi gibi değil. Dikmeler eklenince kiriş okundu. */
  const kN = 8, kW = (lW - 16) / kN;
  for (let k = 0; k < kN; k++) {
    const x0 = lX + 8 + k * kW, x1 = x0 + kW;
    const yA = k % 2 ? bY + bH - 9 : bY + 9;
    const yB = k % 2 ? bY + 9 : bY + bH - 9;
    s += `<line x1="${x0.toFixed(1)}" y1="${yA}" x2="${x1.toFixed(1)}" y2="${yB}"
            stroke="rgba(255,255,255,${(0.050 + 0.065 * p).toFixed(3)})" stroke-width="1.2"/>`;
  }
  for (let k = 0; k <= kN; k++) {
    const x0 = lX + 8 + k * kW;
    s += `<line x1="${x0.toFixed(1)}" y1="${bY + 9}" x2="${x0.toFixed(1)}" y2="${bY + bH - 9}"
            stroke="rgba(255,255,255,${(0.045 + 0.060 * p).toFixed(3)})" stroke-width="1.1"/>`;
  }
  s += `<line x1="${lX + 8}" y1="${bY + 9}" x2="${lX + lW - 8}" y2="${bY + 9}"
          stroke="rgba(255,255,255,${(0.075 + 0.10 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<line x1="${lX + 8}" y1="${bY + bH - 9}" x2="${lX + lW - 8}" y2="${bY + bH - 9}"
          stroke="rgba(255,255,255,${(0.075 + 0.10 * p).toFixed(3)})" stroke-width="1.3"/>`;

  /* üç şerit + iki yönlü paket. Turda tam 2 çevrim → dikişsiz. */
  const asagi = (faz * 2) % 1;
  const yukari = 1 - ((faz * 2 + 0.5) % 1);
  merkezX.forEach((cx) => {
    s += `<rect x="${cx - 8}" y="${bY}" width="16" height="${bH}" rx="8"
            fill="rgba(${A},${(0.045 + 0.055 * p).toFixed(3)})"/>`;
    s += `<line x1="${cx}" y1="${bY + 4}" x2="${cx}" y2="${bY + bH - 4}"
            stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;
    /* paketler — uçlarda sönerek girip çıkar, hareket faz cinsinden periyodik */
    [[asagi, 1], [yukari, 0]].forEach(([u, ileri]) => {
      const py = bY + 6 + u * (bH - 12);
      const sol = kis01(u / 0.12) * kis01((1 - u) / 0.12);
      s += `<rect x="${cx - 4.6}" y="${(py - 4.6).toFixed(1)}" width="9.2" height="9.2" rx="2.4"
              fill="rgba(${ileri ? A : '255,255,255'},${((ileri ? 0.85 : 0.55) * sol * (0.30 + 0.70 * p)).toFixed(3)})"/>`;
    });
  });

  /* --- köprü ile platform arası iki yönlü trafik ------------------------
     Darbenin x'ine (bx+126) göre tam simetrik: bx+86 ve bx+166. */
  const akis = (faz * 48).toFixed(1);
  const tD = bx + 86, tU = bx + 166;
  s += `<line x1="${tD}" y1="${bY + bH}" x2="${tD}" y2="${DY + 276}"
          stroke="rgba(${A},${(0.20 + 0.48 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="6 10" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
  s += `<path d="M${tD - 4.5} ${DY + 270} L${tD} ${DY + 278} L${tD + 4.5} ${DY + 270}"
          fill="none" stroke="rgba(${A},${(0.26 + 0.50 * p).toFixed(3)})" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<line x1="${tU}" y1="${DY + 276}" x2="${tU}" y2="${bY + bH}"
          stroke="rgba(${A},${(0.20 + 0.48 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="6 10" stroke-dashoffset="${akis}" stroke-linecap="round"/>`;
  s += `<path d="M${tU - 4.5} ${bY + bH + 8} L${tU} ${bY + bH} L${tU + 4.5} ${bY + bH + 8}"
          fill="none" stroke="rgba(${A},${(0.26 + 0.50 * p).toFixed(3)})" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>`;

  /* --- platform API bandı: üç eş yuva ----------------------------------- */
  const pY = DY + 284, pH = 44;
  s += `<rect x="${lX}" y="${pY}" width="${lW}" height="${pH}" rx="11" fill="${ZEM}"/>`;
  s += `<rect x="${lX}" y="${pY}" width="${lW}" height="${pH}" rx="11"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
  const yDol = kis01((p - 0.30) / 0.34);
  merkezX.forEach((cx) => {
    s += `<rect x="${cx - 17}" y="${pY + 14}" width="34" height="16" rx="5"
            fill="rgba(${A},${(0.10 + 0.42 * yDol * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += `<line x1="${cx - 9}" y1="${pY + 22}" x2="${cx + 9}" y2="${pY + 22}"
            stroke="rgba(255,255,255,${(0.16 + 0.24 * p).toFixed(3)})" stroke-width="1.4"
            stroke-linecap="round"/>`;
    /* yuvaya inen kısa bağ — üçü aynı boy, aynı ton */
    s += `<line x1="${cx}" y1="${pY}" x2="${cx}" y2="${pY + 14}"
            stroke="rgba(255,255,255,${(0.08 + 0.14 * p).toFixed(3)})" stroke-width="1.3"/>`;
  });

  return s;
}

/* Cihaz yeteneği simgeleri — sayfanın saydığı üç örnek ("Kamera, biyometrik
   giriş veya push bildirimi"). Marka / çatı / dil / mağaza işareti YOK.
   Üçü de aynı kalem kalınlığını (1.5) ve aynı iki tonu kullanır. Simge biçimi
   ister istemez farklı, ama KUTULARIN TAMAMI (çerçeve + simge + alt çubuk)
   döngü ortalamasında ölçüldü: 28,55 / 27,99 / 28,03 → %2,0 fark. Aynı
   kutular boş kabukta %6,2 fark veriyor, yani çizim rampayı büyütmüyor. */
function yetenekSimgesi(i, cx, cy, A, p) {
  const c = `rgba(255,255,255,${(0.30 + 0.40 * p).toFixed(3)})`;
  const ak = `rgba(${A},${(0.36 + 0.46 * p).toFixed(3)})`;
  if (i === 0) {
    /* kamera: gövde + mercek (tanınabilir bir cihaz silueti değil, jenerik) */
    return `<rect x="${cx - 11}" y="${cy - 7}" width="22" height="15" rx="4" fill="none"
              stroke="${c}" stroke-width="1.5"/>
            <path d="M${cx - 4} ${cy - 7} V${cy - 10} H${cx + 3} V${cy - 7}" fill="none"
              stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>
            <circle cx="${cx}" cy="${cy + 0.5}" r="4.4" fill="none" stroke="${ak}" stroke-width="1.6"/>`;
  }
  if (i === 1) {
    /* biyometrik giriş: parmak izi — dört iç içe yay */
    return `<path d="M${cx - 9} ${cy + 6} a9 9 0 0 1 18 0" fill="none" stroke="${c}" stroke-width="1.5"
              stroke-linecap="round"/>
            <path d="M${cx - 6.2} ${cy + 6} a6.2 6.2 0 0 1 12.4 0" fill="none" stroke="${c}" stroke-width="1.5"
              stroke-linecap="round"/>
            <path d="M${cx - 3.4} ${cy + 6} a3.4 3.4 0 0 1 6.8 0" fill="none" stroke="${ak}" stroke-width="1.5"
              stroke-linecap="round"/>
            <path d="M${cx} ${cy + 6} V${cy + 9.5}" stroke="${ak}" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M${cx - 9} ${cy - 8} h2.6 M${cx + 6.4} ${cy - 8} h2.6" stroke="${c}"
              stroke-width="1.5" stroke-linecap="round"/>`;
  }
  /* push bildirimi: çan + iki yayılım yayı (platform işareti değil) */
  return `<path d="M${cx - 7} ${cy + 4} V${cy - 0.5} a7 7 0 0 1 14 0 V${cy + 4}" fill="none"
            stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M${cx - 9.5} ${cy + 4} H${cx + 9.5}" stroke="${c}" stroke-width="1.5"
            stroke-linecap="round"/>
          <path d="M${cx - 2.6} ${cy + 7} a2.6 2.6 0 0 0 5.2 0" fill="none" stroke="${ak}"
            stroke-width="1.5" stroke-linecap="round"/>
          <path d="M${cx} ${cy - 7.6} V${cy - 10}" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M${cx - 12.5} ${cy - 2} a4.5 4.5 0 0 1 2.6 -4.4" fill="none" stroke="${ak}"
            stroke-width="1.5" stroke-linecap="round"/>
          <path d="M${cx + 12.5} ${cy - 2} a4.5 4.5 0 0 0 -2.6 -4.4" fill="none" stroke="${ak}"
            stroke-width="1.5" stroke-linecap="round"/>`;
}

/* ── 02 · STATE YÖNETİMİ VE ÖLÇEKLENEBİLİR PROJE MİMARİSİ ───────────────
   Üç KATMAN PLAKASI alt alta — "katmanlı bir klasör yapısı" bu üç plakadır,
   ayrı bir klasör ikonu uydurulmadı: sayfanın saydığı katmanlar (ekranlar /
   merkezi state / servis) plakaların kendisi. Her plakanın sol üstünde aynı
   küçük sekme var, üçü de birbirinin aynı.
   AKIŞ HEP MERKEZDEN: ekranlar arasında DOĞRUDAN bağ çizilmedi — sayfa
   "merkezi state yönetimi" diyor, ekranların birbirine bağlanmasını değil.
   TİP GÜVENLİĞİ: her bağın üstünde elmas bir kapı var, içinden aynı biçimde
   elmas bir jeton geçiyor. Harf, rozet, dil adı YOK.

   ÖLÇÜ NOTU — IŞIK DARBESİ: bu durakta darbe (bx+123, DY+177) noktasında ve
   bx+123 hem durağın hem bu çizimin TAM ORTA EKSENİ. Eşit olması gereken
   kümeler dairenin (yarıçap 52) dışında: ekran kartları DY+16–56 (121 uzak),
   tip kapıları DY+88 (89 uzak), bağ uçları DY+112 (65 uzak), servis şeritleri
   DY+254 ve DY+286 (77 ve 109 uzak). Dairenin içinde yalnız MERKEZİ STATE
   ÇEKİRDEĞİ var — tek parça, eşitlik iddiası taşımıyor; darbenin tam onun
   üstünde durması bilerek: merkez, akışın aydınlandığı yerdir. */
function stateYapisi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const lX = bx + 16, lW = 214, CX = bx + 123;

  /* katman plakası + sekme (üçü birebir aynı biçim) */
  const plaka = (y, h) =>
    `<rect x="${lX + 10}" y="${y - 5}" width="26" height="8" rx="3"
       fill="rgba(255,255,255,${(0.05 + 0.07 * p).toFixed(3)})"/>
     <rect x="${lX}" y="${y}" width="${lW}" height="${h}" rx="12"
       fill="rgba(255,255,255,${(0.018 + 0.018 * p).toFixed(3)})"
       stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;

  /* --- ÜST PLAKA: dört ekran kartı ------------------------------------- */
  s += plaka(DY + 8, 56);
  const cW = 44, cY = DY + 16, cH = 40;
  const kartX = [0, 1, 2, 3].map((i) => bx + 23 + i * 52);   // merkezler 45/97/149/201
  const kDol = kis01((p - 0.04) / 0.32);                     // dördü de aynı

  kartX.forEach((kx) => {
    s += `<rect x="${kx}" y="${cY}" width="${cW}" height="${cH}" rx="8" fill="${ZEM}"/>`;
    s += `<rect x="${kx}" y="${cY}" width="${cW}" height="${cH}" rx="8"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<rect x="${kx + 7}" y="${cY + 8}" width="30" height="6" rx="3"
            fill="rgba(${A},${(0.16 + 0.44 * kDol * (0.35 + 0.65 * p)).toFixed(3)})"/>`;
    s += `<rect x="${kx + 7}" y="${cY + 19}" width="22" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
    s += `<rect x="${kx + 7}" y="${cY + 28}" width="16" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.08 + 0.13 * p).toFixed(3)})"/>`;
  });

  /* --- dört bağ + elmas TİP KAPISI (birebir aynı faz) ------------------- */
  const gY = DY + 88;
  const jeton = (faz * 2) % 1;                       // turda 2 çevrim → dikişsiz
  kartX.forEach((kx) => {
    const cx = kx + cW / 2;
    s += `<line x1="${cx}" y1="${DY + 64}" x2="${cx}" y2="${DY + 112}"
            stroke="rgba(${A},${(0.14 + 0.38 * p).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}" stroke-linecap="round"/>`;
    /* kapı: elmas kontur */
    s += `<path d="M${cx} ${gY - 9} L${cx + 9} ${gY} L${cx} ${gY + 9} L${cx - 9} ${gY} Z"
            fill="rgba(14,17,24,.85)"
            stroke="rgba(${A},${(0.24 + 0.50 * p).toFixed(3)})" stroke-width="1.5"
            stroke-linejoin="round"/>`;
    /* jeton: aynı elmas biçim, kapıdan geçerken tam oturur */
    const jy = DY + 66 + jeton * 44;
    const g = kis01(jeton / 0.14) * kis01((1 - jeton) / 0.14);
    s += `<path d="M${cx} ${(jy - 4.6).toFixed(1)} L${(cx + 4.6).toFixed(1)} ${jy.toFixed(1)}
            L${cx} ${(jy + 4.6).toFixed(1)} L${(cx - 4.6).toFixed(1)} ${jy.toFixed(1)} Z"
            fill="rgba(255,255,255,${(0.78 * g * (0.30 + 0.70 * p)).toFixed(3)})"/>`;
  });

  /* toplayıcı ray + tek gövde: akış merkeze iner */
  s += `<line x1="${bx + 45}" y1="${DY + 112}" x2="${bx + 201}" y2="${DY + 112}"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<line x1="${CX}" y1="${DY + 112}" x2="${CX}" y2="${DY + 144}"
          stroke="rgba(${A},${(0.18 + 0.46 * p).toFixed(3)})" stroke-width="2"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}" stroke-linecap="round"/>`;

  /* --- ORTA PLAKA: merkezi state çekirdeği -----------------------------
     ÖNİZLEMEDE GÖRÜLDÜ, TASARIM BUNA GÖRE DEĞİŞTİ: motorun ışık darbesi
     durakların ÜSTÜNE çiziliyor ve bu durakta tam (bx+123, DY+177) noktasında
     duruyor — yani çekirdeğin tam ortasında. İlk sürümde oraya beyaz bir elmas
     mühür konmuştu; durak en canlıyken mühür darbenin beyaz çekirdeğinin
     (yarıçap 8,3) altında kalıyor, "parlayan top" gibi okunuyordu.
     Şimdi merkez BİLEREK boş: çekirdek bir HALKA, ortasındaki ışık darbenin
     kendisi. Halkanın üstündeki dört elmas çentik, tip kapılarıyla aynı
     biçimdir ve 45°/135°/225°/315°'de durur — darbenin merkezine göre TAM
     SİMETRİK.
     DENETİMDE ÖLÇÜLDÜ — "dördü birebir aynı ışığı alır" DEMEK YANLIŞ OLURDU:
     döngü ortalamasında 33,66 / 35,90 / 34,64 / 34,61, yani %6,5 (boş kabukta
     %1,7). Fark darbeden değil AKAN BORUDAN geliyor: boru çekirdeğin tam
     ortasından eğimli geçtiği için (bu x'te dy/dx ≈ -0,17) alt-sol çentik
     boruya 13,8 px, üst-sağ 14,3 px, üst-sol 20,2 px, alt-sağ 19,7 px
     uzakta kalıyor. Değiştirilmedi, çünkü bu dört çentik bir EŞİTLİK KÜMESİ
     değil — sayfa burada iki-üç geçerli seçenek saymıyor, TEK bir merkezi
     state çekirdeği anlatıyor; çentikler o tek parçanın üstündeki bağlantı
     ağızları. Ayrıca her biri 12x12 px: masaüstü ölçeğinde (0,517) 6 px,
     fark gözle ayırt edilemiyor (faz 0,60 karesi 4× büyütülüp bakıldı). */
  s += plaka(DY + 134, 86);
  const coX = bx + 66, coY = DY + 144, coW = 114, coH = 66;
  s += `<rect x="${coX}" y="${coY}" width="${coW}" height="${coH}" rx="16" fill="rgba(14,17,24,.80)"/>`;
  s += `<rect x="${coX}" y="${coY}" width="${coW}" height="${coH}" rx="16"
          fill="rgba(255,255,255,${(0.030 + 0.034 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.44 * p).toFixed(3)})" stroke-width="1.5"/>`;
  const hx = CX, hy = coY + coH / 2, R = 24;
  s += `<circle cx="${hx}" cy="${hy}" r="${R - 5}" fill="rgba(${A},${(0.05 + 0.10 * p).toFixed(3)})"/>`;
  s += `<circle cx="${hx}" cy="${hy}" r="${R}" fill="none"
          stroke="rgba(${A},${(0.26 + 0.48 * p).toFixed(3)})" stroke-width="1.8"/>`;
  /* dört elmas çentik — tip kapılarıyla aynı biçim, merkeze göre simetrik */
  [45, 135, 225, 315].forEach((deg) => {
    const r = (deg * Math.PI) / 180;
    const ex = hx + R * Math.cos(r), ey = hy + R * Math.sin(r);
    s += `<path d="M${ex.toFixed(1)} ${(ey - 4.4).toFixed(1)} L${(ex + 4.4).toFixed(1)} ${ey.toFixed(1)}
            L${ex.toFixed(1)} ${(ey + 4.4).toFixed(1)} L${(ex - 4.4).toFixed(1)} ${ey.toFixed(1)} Z"
            fill="rgba(14,17,24,.9)" stroke="rgba(${A},${(0.28 + 0.46 * p).toFixed(3)})" stroke-width="1.3"
            stroke-linejoin="round"/>`;
  });
  /* halka üstünde dönen jeton — turda tam 1 çevrim → dikişsiz */
  const ang = 2 * Math.PI * faz;
  s += `<circle cx="${(hx + R * Math.cos(ang)).toFixed(1)}" cy="${(hy + R * Math.sin(ang)).toFixed(1)}" r="3.8"
          fill="rgba(255,255,255,${(0.34 + 0.52 * p).toFixed(3)})"/>`;
  /* dört kol: kuzey giriş, güney çıkış, doğu-batı okuma/yazma. Merkeze göre
     simetrik olduğu için dördü de darbeden aynı ışığı alır. */
  s += `<line x1="${hx}" y1="${hy - R}" x2="${hx}" y2="${coY}"
          stroke="rgba(255,255,255,${(0.10 + 0.18 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<line x1="${hx}" y1="${hy + R}" x2="${hx}" y2="${coY + coH}"
          stroke="rgba(255,255,255,${(0.10 + 0.18 * p).toFixed(3)})" stroke-width="1.4"/>`;
  [-1, 1].forEach((yon) => {
    const ex = hx + yon * R, fx = hx + yon * (coW / 2 - 8);
    s += `<line x1="${ex}" y1="${hy}" x2="${fx}" y2="${hy}"
            stroke="rgba(255,255,255,${(0.10 + 0.18 * p).toFixed(3)})" stroke-width="1.4"/>`;
    s += `<circle cx="${fx}" cy="${hy}" r="3.4" fill="rgba(${A},${(0.20 + 0.44 * p).toFixed(3)})"/>`;
  });

  /* merkezden servis katmanına inen gövde */
  s += `<line x1="${CX}" y1="${DY + 210}" x2="${CX}" y2="${DY + 240}"
          stroke="rgba(${A},${(0.18 + 0.46 * p).toFixed(3)})" stroke-width="2"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}" stroke-linecap="round"/>`;

  /* --- ALT PLAKA: servis katmanı — iki EŞ şerit ------------------------- */
  s += plaka(DY + 240, 80);
  const sX = bx + 34, sW = 178, sH = 22;
  const seritY = [DY + 254, DY + 286];
  const sAkis = (faz * 44).toFixed(1);

  seritY.forEach((sy, i) => {
    s += `<rect x="${sX}" y="${sy}" width="${sW}" height="${sH}" rx="11" fill="${ZEM}"/>`;
    s += `<rect x="${sX}" y="${sy}" width="${sW}" height="${sH}" rx="11"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* şerit içinde akan kesikler — ikisinde de aynı desen, aynı hız */
    s += `<line x1="${sX + 14}" y1="${sy + sH / 2}" x2="${sX + sW - 34}" y2="${sy + sH / 2}"
            stroke="rgba(${A},${(0.24 + 0.48 * p).toFixed(3)})" stroke-width="2.2"
            stroke-dasharray="5 6" stroke-dashoffset="-${sAkis}" stroke-linecap="round"/>`;
    const ux = sX + sW - 24, uy = sy + sH / 2;
    if (i === 0) {
      /* API çağrıları: dışarı çıkan ok */
      s += `<path d="M${ux - 2} ${uy} H${ux + 10}" stroke="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})"
              stroke-width="2.2" stroke-linecap="round"/>`;
      s += `<path d="M${ux + 5} ${uy - 5} L${ux + 11} ${uy} L${ux + 5} ${uy + 5}" fill="none"
              stroke="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      /* hata yönetimi: akış huniye toplanır (dışarı kaçmaz) */
      s += `<path d="M${ux - 3} ${uy - 6} L${ux + 9} ${uy - 6} L${ux + 4} ${uy + 1} V${uy + 6}
              L${ux + 2} ${uy + 6} V${uy + 1} Z" fill="none"
              stroke="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})" stroke-width="1.8"
              stroke-linejoin="round" stroke-linecap="round"/>`;
    }
  });
  /* iki şeridi besleyen dikey dağıtıcı — ikisine de aynı uzunlukta */
  s += `<line x1="${CX}" y1="${DY + 240}" x2="${CX}" y2="${DY + 254}"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<line x1="${sX + 6}" y1="${DY + 265}" x2="${sX + 6}" y2="${DY + 297}"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<line x1="${sX + 6}" y1="${DY + 265}" x2="${sX + 14}" y2="${DY + 265}"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<line x1="${sX + 6}" y1="${DY + 297}" x2="${sX + 14}" y2="${DY + 297}"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.4"/>`;

  return s;
}

/* ── 03 · CI/CD VE MAĞAZA YAYIN HATTI ───────────────────────────────────
   Tepede kaynak; ondan çıkan İKİ sürüm jetonu tek hat boyunca iner ve AYNI üç
   aşamadan geçer — sayfanın "her sürüm aynı kontrol adımlarından geçer"
   cümlesi budur: jetonlar farklı, aşamalar aynı. Aşama, içinde jeton varken
   yanar. Üçüncü aşamanın altındaki dağıtım kirişinden inen iki paralel
   kulvar birbirinin AYNISI iki hedefe varır ("iki mağazaya paralel gönderim").

   ÖLÇÜLDÜ, YERLEŞİM BUNA GÖRE DEĞİŞTİ — darbe (bx+120, DY+204), yarıçap 52:
   İlk sürümde aşamalar DY+46/98/150'deydi ve üçüncüsünün alt yarısı darbenin
   içinde kalıyordu. 40 karelik döngü ortalaması alındığında üç aşamanın
   parlaklığı 31,86 / 33,70 / 36,05 çıktı (%11,6) — yani "son adım daha
   önemli" gibi okunuyordu; oysa BOŞ KABUKTA aynı bölgeler %8,0 fark
   veriyordu, demek ki farkın 3,6 puanı sahnenin kendi ışığıydı.
   Düzeltme iki parçalı:
     (a) üç aşama yukarı alındı, üçüncüsünün alt kenarı DY+146 — darbe
         merkezine 58 px, yani yarıçapın (52) tamamen dışında;
     (b) çatal, kollar ve iki hedef darbenin YAN TARAFINA taşındı: dağıtım
         kirişi DY+150'de (dikey uzaklık 54 → her x için r ≥ 54), iki paralel
         kulvar ise x = bx+65 ve bx+181'de duruyor; darbenin x'ine yatay
         uzaklıkları 55 ve 61, ikisi de 52'nin dışında — yani kulvarlar hangi
         y'de olursa olsun darbeden SIFIR ışık alıyor.
   Yan kazanç: çatalın yukarı alınması "iki mağazaya PARALEL gönderim"
   cümlesini birebir çiziyor — iki kulvar 108 piksel boyunca yan yana iniyor.
   ÜÇ AŞAMANIN ALTINA ZEMİN KONDU: akan borunun ekseni bu durakta DY+178
   (x=812) ile DY+232 (x=1058) arasında geziniyor; zemin, borunun ışığının
   aşama gövdelerine sızmasını kesiyor.
   BU İKİ DÜZELTMENİN ETKİSİ DENETİMDE DOĞRULANDI: boru ve darbe tek tek
   kapatılıp üç aşama yeniden ölçüldü, değerler 0,01'den az değişti — yani
   (a) ve (b) işe yaramış, bu bölgeye artık ne borudan ne darbeden ışık
   geliyor. AMA YETMEMİŞTİ: kalan %10,7'lik rampanın sebebi jeton hızıydı,
   bkz. aşağıdaki "JETON HIZI" notu. O da düzeltilince %8,9'a indi (boş
   kabuk %8,0). */
function yayinHatti(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const CX = bx + 123;
  const hatUst = DY + 26, hatAlt = DY + 150;      // tek gövde
  const kirisY = DY + 150, ofs = 58;              // dağıtım kirişi
  const kulvarAlt = DY + 262;

  /* --- kaynak: her sürüm buradan çıkar --------------------------------- */
  s += `<rect x="${CX - 36}" y="${DY + 6}" width="72" height="22" rx="8" fill="${ZEM}"/>`;
  s += `<rect x="${CX - 36}" y="${DY + 6}" width="72" height="22" rx="8"
          fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<rect x="${CX - 26}" y="${DY + 12}" width="28" height="5" rx="2.5"
          fill="rgba(${A},${(0.24 + 0.46 * p).toFixed(3)})"/>`;
  s += `<rect x="${CX - 26}" y="${DY + 20}" width="16" height="4" rx="2"
          fill="rgba(255,255,255,${(0.12 + 0.18 * p).toFixed(3)})"/>`;
  /* kaynaktaki işaret, hat üzerinde yürüyen sürüm jetonuyla AYNI biçim */
  s += `<path d="M${CX + 21} ${DY + 11} L${CX + 27} ${DY + 17} L${CX + 21} ${DY + 23}
          L${CX + 15} ${DY + 17} Z" fill="none"
          stroke="rgba(${A},${(0.24 + 0.48 * p).toFixed(3)})" stroke-width="1.5"
          stroke-linejoin="round"/>`;

  /* --- hat gövdesi ------------------------------------------------------ */
  s += `<line x1="${CX}" y1="${hatUst}" x2="${CX}" y2="${hatAlt}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="2"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}" stroke-linecap="round"/>`;

  /* --- sürüm jetonları: hat boyunca iner (turda 3 tur) ------------------
     JETON SAYISI — ÖNİZLEMEDE GÖRÜLDÜ: üç jeton kullanılınca aralık
     124/3 = 41,3 piksel oluyordu ve aşama adımı da 40 piksel — jetonlar üç
     aşamaya AYNI ANDA ve hep aynı yerde denk düşüyordu, üç halka birden
     yanıp kalıyordu, hiçbir şey ilerlemiyor gibi görünüyordu. İki jetonda
     aralık 62 piksele çıkıyor, adımla (40) örtüşmüyor: her aşama sırayla
     ve ayrı ayrı yanıyor.

     JETON HIZI — DENETİMDE ÖLÇÜLDÜ, DÜZELTİLDİ. Jetonlar turda 1 tur
     atarken (faz + k/2) aşamaların yanma payı ÇOK EŞİTSİZDİ. Ölçüt: her
     aşamanın ∫ ic·p değeri, yani "içinde jeton varken durak da canlıyken"
     geçirdiği süre (600 örnekli döngü taraması):
         turda 1 tur : 0,080 / 0,028 / 0,123   → yayılım %123,7
     Sebep aritmetik: durak yalnız faz 0,61–0,99 arasında canlı (merkez
     0,80, genişlik 0,19), jeton döngüsü ise 0,5 fazda bir tekrarlıyordu —
     pencereye tek çevrimin %76'sı sığıyor ve o dilim hep aynı yere denk
     geliyordu. Sonuç: durak EN PARLAKKEN (faz 0,80) 03. aşamanın onay
     halkası kapanıyor, 02. aşama sönük kalıyordu; "ikinci adım atlanıyor"
     diye okunuyordu, oysa sayfa "her sürüm AYNI kontrol adımlarından
     geçer" diyor. Kare kare bakılarak da doğrulandı (faz 0,68/0,74/0,80/
     0,86/0,92 basıldı: 02. aşamanın halkası hiçbir parlak karede kapanmıyor).
     Denenen düzenler (aynı ölçüt):
         turda 2 tur, 2 jeton, en iyi kayma : %12,8
         turda 3 tur, 2 jeton, kayma 0      : %1,7   ✓ SEÇİLDİ
         turda 2 tur, 3 jeton               : %0,0  ✗ ama üç aşama, canlı
             karelerin %47'sinde AYNI ANDA yanıyor — yukarıdaki "hiçbir şey
             ilerlemiyor" kusurunun ta kendisi. Eşitlik sayı olarak
             mükemmel çıkıyor çünkü hepsi birlikte yanıyor; reddedildi.
     Seçilen düzende üç aşama canlı karelerin HİÇBİRİNDE birlikte yanmıyor
     (%0), yanma payı 0,072 / 0,074 / 0,074. Hız 74 px/sn = 3,1 px/kare —
     turda 3 tur TAM SAYI olduğu için döngü dikişsiz kalıyor. */
  const jetonlar = [0, 1].map((k) => (faz * 3 + k / 2) % 1);
  const jetonY = jetonlar.map((u) => hatUst + u * (hatAlt - hatUst));

  /* --- üç AYNI aşama ----------------------------------------------------
     ÖNİZLEMEDE GÖRÜLDÜ, YERLEŞİM BUNA GÖRE DEĞİŞTİ: ilk sürümde aşamanın
     başlık çubuğu aX+50'den başlıyordu ve hat ekseni (CX) tam çubuğun içinden
     geçiyordu; sürüm jetonu çubuğun üstüne binip leke gibi duruyordu. Şimdi
     her aşamanın ortasında CX'te bir GEÇİŞ YUVASI var: hat aşamanın içinden
     görünür biçimde geçiyor, jeton yuvanın içinde ilerliyor, çubuklar yuvanın
     sağında duruyor. Üç aşamanın gövdesi, simge kutusu, yuvası ve çubukları
     BİREBİR aynı ölçüde — fark yalnız simge ve jetonun o an nerede olduğu. */
  const asamaY = [DY + 32, DY + 72, DY + 112], aH = 34, aX = bx + 22, aW = 202;
  asamaY.forEach((sy, i) => {
    /* aşama, içinde jeton varken yanar — üçünde de aynı ölçü */
    let ic = 0;
    jetonY.forEach((jy) => { ic = Math.max(ic, kis01(1 - Math.abs(jy - (sy + aH / 2)) / 24)); });
    const v = ic * p;
    s += `<rect x="${aX}" y="${sy}" width="${aW}" height="${aH}" rx="10" fill="${ZEM}"/>`;
    s += `<rect x="${aX}" y="${sy}" width="${aW}" height="${aH}" rx="10"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p + 0.045 * v).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p + 0.16 * v).toFixed(3)})" stroke-width="1.2"/>`;
    /* simge kutusu — üçünde birebir aynı ölçü */
    const ix = aX + 9, iy = sy + 3;
    s += `<rect x="${ix}" y="${iy}" width="28" height="28" rx="8"
            fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += asamaSimgesi(i, ix, iy, A, p);
    /* geçiş yuvası: hat aşamanın içinden geçer */
    s += `<rect x="${CX - 8}" y="${sy + 3}" width="16" height="${aH - 6}" rx="8"
            fill="rgba(${A},${(0.05 + 0.09 * p + 0.07 * v).toFixed(3)})"/>`;
    /* iki çubuk — üçünde aynı boy, yuvanın sağında */
    s += `<rect x="${CX + 17}" y="${sy + 9}" width="56" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.13 + 0.20 * p + 0.14 * v).toFixed(3)})"/>`;
    s += `<rect x="${CX + 17}" y="${sy + 21}" width="36" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.08 + 0.13 * p).toFixed(3)})"/>`;
    /* geçiş halkası: jeton bu aşamadayken kapanır */
    const qx = aX + aW - 16, qy = sy + aH / 2;
    s += `<circle cx="${qx}" cy="${qy}" r="8.6" fill="rgba(${A},${(0.10 * v).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.56 * v).toFixed(3)})" stroke-width="1.5"/>`;
    s += `<path d="M${qx - 4} ${qy + 0.4} L${qx - 1.2} ${qy + 3.6} L${qx + 4.4} ${qy - 3.4}"
            fill="none" stroke="rgba(255,255,255,${(0.18 + 0.70 * v).toFixed(2)})"
            stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="14" stroke-dashoffset="${(14 * (1 - v)).toFixed(2)}"/>`;
  });

  /* jetonlar aşamaların ÜSTÜNDE çizilir ki hattın üstünde yürüdükleri görünsün */
  jetonlar.forEach((u, k) => {
    const jy = jetonY[k];
    const g = kis01(u / 0.07) * kis01((1 - u) / 0.07);
    s += `<path d="M${CX} ${(jy - 6).toFixed(1)} L${CX + 6} ${jy.toFixed(1)}
            L${CX} ${(jy + 6).toFixed(1)} L${CX - 6} ${jy.toFixed(1)} Z"
            fill="rgba(255,255,255,${(0.85 * g * (0.30 + 0.70 * p)).toFixed(3)})"/>`;
  });

  /* --- dağıtım kirişi + İKİ PARALEL KULVAR -----------------------------
     Kiriş TEK yatay çizgi (DY+150), iki kulvar ondan iner. Kulvarlar
     birbirinin aynısı: aynı x uzaklığı (±58), aynı boy, aynı desen, aynı
     jeton fazı. "İki mağazaya paralel gönderim" cümlesi budur. */
  const kolY = kulvarAlt;
  s += `<line x1="${CX - ofs}" y1="${kirisY}" x2="${CX + ofs}" y2="${kirisY}"
          stroke="rgba(${A},${(0.20 + 0.44 * p).toFixed(3)})" stroke-width="2" stroke-linecap="round"/>`;
  /* kulvar jetonları hat jetonlarıyla AYNI hızda (turda 3 tur); yoksa hat
     74 px/sn akarken kulvarlar 19 px/sn kalıyor ve hattan kopuk duruyordu. */
  const kulvarJeton = [0, 1].map((k) => (faz * 3 + k / 2) % 1);
  [-1, 1].forEach((yon) => {
    const kx = CX + yon * ofs;
    s += `<line x1="${kx}" y1="${kirisY}" x2="${kx}" y2="${kolY}"
            stroke="rgba(${A},${(0.20 + 0.46 * p).toFixed(3)})" stroke-width="2"
            stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}" stroke-linecap="round"/>`;
    /* kulvar jetonları — İKİ KULVARDA BİREBİR AYNI FAZ */
    kulvarJeton.forEach((w) => {
      const jy = kirisY + 8 + w * (kolY - kirisY - 16);
      const g = kis01(w / 0.10) * kis01((1 - w) / 0.10);
      s += `<path d="M${kx} ${(jy - 5.4).toFixed(1)} L${kx + 5.4} ${jy.toFixed(1)}
              L${kx} ${(jy + 5.4).toFixed(1)} L${kx - 5.4} ${jy.toFixed(1)} Z"
              fill="rgba(255,255,255,${(0.80 * g * (0.30 + 0.70 * p)).toFixed(3)})"/>`;
    });
  });

  /* --- iki hedef: birbirinin AYNISI, adsız, logo yok -------------------- */
  const hW = 98, hH = 52;
  const varis = kis01((p - 0.50) / 0.32);             // ikisi de aynı anda
  [-1, 1].forEach((yon) => {
    const hx = CX + yon * ofs - hW / 2;
    s += `<rect x="${hx}" y="${kolY}" width="${hW}" height="${hH}" rx="11" fill="${ZEM}"/>`;
    s += `<rect x="${hx}" y="${kolY}" width="${hW}" height="${hH}" rx="11"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p + 0.030 * varis).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p + 0.14 * varis).toFixed(3)})" stroke-width="1.2"/>`;
    /* yükleme yuvası: yatay yarık + yukarı ok. MAĞAZA İŞARETİ DEĞİL. */
    const yx = hx + hW / 2, yy = kolY + 22;
    s += `<rect x="${yx - 22}" y="${yy - 4}" width="44" height="8" rx="4"
            fill="rgba(${A},${(0.14 + 0.44 * varis * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += `<path d="M${yx} ${yy + 14} V${yy + 6}" stroke="rgba(${A},${(0.26 + 0.50 * p).toFixed(3)})"
            stroke-width="2" stroke-linecap="round"/>`;
    s += `<path d="M${yx - 4.6} ${yy + 10} L${yx} ${yy + 5} L${yx + 4.6} ${yy + 10}" fill="none"
            stroke="rgba(${A},${(0.26 + 0.50 * p).toFixed(3)})" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<rect x="${yx - 16}" y="${kolY + 38}" width="32" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
  });

  return s;
}

/* Yayın hattı aşama simgeleri — hepsi sayfanın kendi kelimeleri.
   Mağaza markası, çatı/dil işareti ve rakam YOK. */
function asamaSimgesi(i, ix, iy, A, p) {
  const c = `rgba(255,255,255,${(0.30 + 0.40 * p).toFixed(3)})`;
  const ak = `rgba(${A},${(0.36 + 0.46 * p).toFixed(3)})`;
  const cx = ix + 14, cy = iy + 14;                 // simge kutusu 28×28
  if (i === 0) {
    /* derleme: iki parça tek gövdede birleşir */
    return `<rect x="${cx - 11}" y="${cy - 11}" width="9" height="9" rx="2" fill="none"
              stroke="${c}" stroke-width="1.5"/>
            <rect x="${cx - 11}" y="${cy + 2}" width="9" height="9" rx="2" fill="none"
              stroke="${c}" stroke-width="1.5"/>
            <path d="M${cx - 1} ${cy - 6.5} H${cx + 1.5} V${cy + 6.5} H${cx - 1}" fill="none"
              stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>
            <rect x="${cx + 2}" y="${cy - 6}" width="10" height="12" rx="2.5"
              fill="${ak}"/>`;
  }
  if (i === 1) {
    /* imzalama: mühür — halka + içinde imza dalgası + iki kurdele ucu.
       ÖNİZLEMEDE GÖRÜLDÜ, DEĞİŞTİRİLDİ: ilk sürümde halkanın sağ altına
       eğik bir sap çizilmişti; ortaya çıkan şekil BÜYÜTEÇ gibi okunuyordu,
       mühür gibi değil. Sap kaldırıldı, yerine aşağı inen iki kurdele ucu
       kondu — bu biçim yalnız "mühürlendi" anlamına geliyor. */
    return `<circle cx="${cx}" cy="${cy - 3}" r="8.2" fill="none" stroke="${c}" stroke-width="1.5"/>
            <circle cx="${cx}" cy="${cy - 3}" r="4.8" fill="none" stroke="${c}" stroke-width="1.1"/>
            <path d="M${cx - 4.6} ${cy - 3} q2.3 -4 4.6 0 t4.6 0" fill="none" stroke="${ak}"
              stroke-width="1.7" stroke-linecap="round"/>
            <path d="M${cx - 5} ${cy + 4} V${cy + 12} L${cx - 2} ${cy + 9.6} L${cx + 1} ${cy + 12} V${cy + 4}"
              fill="none" stroke="${ak}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  /* mağaza yükleme: yuvaya giren yukarı ok (marka işareti değil) */
  return `<path d="M${cx - 9} ${cy + 4} V${cy + 9} a2.2 2.2 0 0 0 2.2 2.2 H${cx + 6.8}
            a2.2 2.2 0 0 0 2.2 -2.2 V${cy + 4}" fill="none" stroke="${c}" stroke-width="1.5"
            stroke-linecap="round"/>
          <path d="M${cx} ${cy + 6} V${cy - 8}" stroke="${ak}" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M${cx - 4} ${cy - 4.4} L${cx} ${cy - 8.6} L${cx + 4} ${cy - 4.4}" fill="none"
            stroke="${ak}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
