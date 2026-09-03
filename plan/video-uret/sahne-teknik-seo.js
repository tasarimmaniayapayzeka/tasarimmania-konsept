/* SAHNE — seo / teknik-seo
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Teknik Denetim Kapsamı
 *      "Denetim; tarama ve indeksleme durumu, sunucu yanıtları, güvenlik
 *       yapılandırması, iç bağlantı mimarisi ve mobil uyumluluğu kapsayan bir
 *       kontrol listesiyle ilerler. Her bulgu, arama motoruyla kurulan
 *       iletişimi etkileme derecesine göre sınıflandırılır."
 *   02 Önceliklendirme Yaklaşımı
 *      "İndekslemeyi engelleyen hatalar en üst sıraya alınır, ardından
 *       performans ve kullanıcı deneyimini zayıflatan sorunlar gelir. Schema
 *       zenginleştirmesi gibi ince ayarlar, altyapı sağlamlaştıktan sonra
 *       devreye girer."
 *   03 Uygulama ve Doğrulama Süreci
 *      "Önerilen düzeltmeler, sitenin mevcut yapısına uygun şekilde hayata
 *       geçirilir. Uygulama sonrası Search Console üzerinden kapsama ve
 *       performans verileri izlenerek gerçek etki doğrulanır."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 beş maddelik kontrol listesi taranır (tarama/indeksleme, sunucu,
 *      güvenlik, iç bağlantı, mobil); satırlar sırayla onaylanır, listenin
 *      altındaki dağıtım düğümünden çıkan bulgular üç "etki derecesi" şeridine
 *      akar — şeritler yukarıdan aşağı incelerek dereceyi gösterir;
 *   02 üç öncelik satırı YUKARIDAN AŞAĞI sırayla dolar; ikinci satır dolunca
 *      altyapı duvarı örülür; duvar sağlamlaşmadan sol raydaki KİLİT açılmaz,
 *      kilit açılınca akış üçüncü satıra (schema) iner ve alttaki ince ayar
 *      sürgüleri yerine oturur;
 *   03 sitenin mevcut yapısındaki boşluğa, o boşluğun tırnağına oturan bir
 *      düzeltme parçası soldan kayarak geçer; altta veri dışarı akar, doğrulama
 *      geri döner ve onay halkasını kapatır; en altta kapsama hücreleri ve
 *      performans eğrisi izlenir.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER ───────────────────────────────────────────────────────────
 * Üç etiket sayfanın kendi başlıklarının kısaltmasıdır. 03'ün tam adı
 * ("Uygulama ve Doğrulama Süreci") 246 px istasyona SIĞMIYOR — ölçüldü, aşağıda
 * "ÖLÇÜLEN DEĞERLER" bölümünde. Kısaltma adımın ikinci yarısını adlandırıyor;
 * ilk yarısı (düzeltmenin yapıya oturması) durağın üst üçte birinde çiziliyor.
 *
 * ── YASAK (bu sayfaya özel — yasaklar.md "seo" + "teknik-seo") ──────────
 *  - ARAMA MOTORU LOGOSU / ONA BENZEYEN İŞARET YOK: büyüteç, renkli harf,
 *    robot yüzü, motor simgesi hiçbir yerde çizilmedi.
 *  - SEARCH CONSOLE ARAYÜZÜ TAKLİT EDİLMEDİ: 03'te pencere çerçevesi, sekme,
 *    kenar menüsü, araç çubuğu yok. Kapsama bir hücre şeridi (yan yana sayfa
 *    hücreleri), performans ise akan tek bir eğri — ikisi de ürün ekranının
 *    düzenini değil kavramı çiziyor. Ürün adı yazılmadı.
 *  - RAKAM YOK: hata sayısı, puan, süre, yüzde, sıralama, trafik, tarama
 *    bütçesi — hiçbiri yazılmadı. Göstergelerin üzerinde sayı yok. Tek rakam
 *    durak numaraları (01/02/03), sayfanın kendi numaralandırması.
 *  - İNSAN YÜZÜ YOK, LOGO YOK.
 *
 * ── EŞİTLİK / DERECE — NEREDE EŞİT, NEREDE BİLEREK DEĞİL ────────────────
 * Bu sayfa "iki seçenek de geçerli" demiyor; tersine SIRA ve DERECE anlatıyor.
 * Bu yüzden:
 *  · 01'in BEŞ KONTROL SATIRI aynı kalemdir, sayfa bunları sıralamıyor →
 *    birebir aynı ölçü, aynı dolgu, aynı kontur, aynı onay eğrisi (yalnız
 *    başlangıç gecikmesi farklı: liste yukarıdan aşağı taranıyor, sayfanın
 *    kendi cümlesi de bunları sırayla sayıyor). Piksel ölçümü aşağıda.
 *  · 01'in ÜÇ ETKİ ŞERİDİ bilerek EŞİT DEĞİL: sayfa "etkileme derecesine göre
 *    sınıflandırılır" diyor. Derece üç şeyle birden gösteriliyor — dolu boy
 *    (168/112/58), şerit yüksekliği (20/16/12) ve aksan yoğunluğu
 *    (1,00/0,76/0,54). Hangi kontrol maddesinin hangi dereceye girdiği
 *    ÇİZİLMEDİ — sayfa bunu söylemiyor, uydurulmadı: şeritlere inen bağlar
 *    adsızdır, hiçbir kontrol satırına bağlanmaz.
 *  · 02'nin ÜÇ ÖNCELİK SATIRI bilerek EŞİT DEĞİL — ama yalnız SIRADA: gövde,
 *    ölçü, kontur, dolgu üçünde de birebir aynı, fark yalnız DOLMA SIRASI ve
 *    üçüncüsünün kilitli olması. Sayfa tam olarak bunu söylüyor.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) TARAMA — arama motoru kutusundan sunucu
 * kutusuna uzanan yol + üç erişim satırı (sitemap.xml / robots.txt / kırık
 * bağlantı); (2) İNDEKSLEME — "İndeks" başlığı, "Search Console" etiketi, üç
 * sayfa kartı (ikisi ✓ indekste, biri ✗ dışarıda), "kapsama raporu" notu;
 * (3) CORE WEB VITALS — LCP / INP / CLS çipleri, her birinde eşit uzunlukta bir
 * bant ve bir işaretçi, üzerlerinde bilerek rakam yok.
 * Bu sahne aynı sayfanın BAŞKA bir kesitini çizer, o üç durağı tekrarlamaz:
 *  · Kardeş figür SÜRECİN NESNESİNİ çiziyor (tarama → indeks → metrik).
 *    Bu sahne SÜRECİN İŞLEYİŞİNİ çiziyor (denetim → öncelik → uygulama).
 *    İkisi sayfanın iki ayrı bölümünden geliyor: kardeş figür "Derinlemesine",
 *    bu sahne "Ayrıntılar"daki 01/02/03 listesi.
 *  · 01'de arama motoru–sunucu yolu YOK, sitemap/robots satırları YOK. Sunucu
 *    burada yalnız kontrol listesinin bir maddesinin simgesi (22 px raf),
 *    kardeş figürdeki 146×112 sahne kutusu değil.
 *  · 03'te sayfa kartı + ✓/✗ + "İndekste/Dışarıda" yazısı YOK. Kapsama, adsız
 *    hücrelerden oluşan bir şerit; içinde iki hücre boş kalıyor — bu kardeş
 *    figürün "biri dışarıda" bulgusuyla ÇELİŞMİYOR, onu tekrarlamadan
 *    doğruluyor.
 *  · 03'ün performans eğrisi, kardeş figürün LCP/INP/CLS bantlarının kopyası
 *    değil: bant değil eğri, çip değil akış, ve YÜKSELMİYOR — sayfa "izlenerek
 *    doğrulanır" diyor, "yükseliyor" demiyor. Eğri dalgalanır; iddia değil
 *    izleme çizilmiştir.
 *
 * ── ÖLÇÜLEN DEĞERLER — hepsi bu makinede ölçüldü, hiçbiri tahmin değil ──
 *
 * 1) ETİKET GENİŞLİĞİ. Kod hesabıyla değil, etiket tek başına basılıp mürekkep
 *    kutusu piksel piksel taranarak ölçüldü (28 px, Consolas, ağırlık 600,
 *    harf arası 1,2). İstasyon 246 px:
 *      "01 DENETİM"               164 px  ✓
 *      "02 ÖNCELİK"               164 px  ✓
 *      "03 DOĞRULAMA"             198 px  ✓
 *      "03 UYGULAMA"              181 px  (denendi, seçilmedi)
 *      "03 UYGULA+ÖLÇ"            213 px  (denendi, seçilmedi)
 *      "03 UYGULAMA VE DOĞRULAMA" 397 px  ✗ TAŞAR — kısaltmanın gerekçesi bu.
 *    Videodaki tek yazı bu üç etikettir; en küçük yazı boyu 28 px.
 *
 * 2) DÖNGÜ DİKİŞİ — crf SEÇİMİ. Kaynak kareler faz cinsinden periyodik ama mp4
 *    kodlayıcısı döngü noktasında nicemleme kayması bırakıyor (kardeş sahne
 *    kurumsal-web-sitesi'nde de ölçülmüştü). Aynı sahne üç ayarla basıldı:
 *      crf 26 → dikiş 0,75  oran 1,59×  (180 KB) — eşiğin (1,60) 0,01 altında
 *      crf 24 → dikiş 0,66  oran 1,39×  (220 KB)
 *      crf 22 → dikiş 0,58  oran 1,21×  (269 KB)  ← SEÇİLDİ
 *    crf 22 seçildi: payı geniş ve kardeş videoların boyut aralığında
 *    (163–287 KB). BU SAHNE crf 22 İLE BASILIR — `uret.js` motorun varsayılanı
 *    crf 26 ile basar ve o ayar eşiğe 0,01 kalıyor:
 *      node -e "const m=require('./plan/video-uret/motor.js');
 *               m.uret('modul-seo/teknik-seo','seo',
 *                      require('./plan/video-uret/sahne-teknik-seo.js'),{crf:22})"
 *
 * 3) EŞİTLİK — TEK KAREDE DEĞİL DÖNGÜ ORTALAMASINDA ÖLÇÜLÜR.
 *    ÖNCE YANLIŞ ÖLÇTÜM, NOTU BIRAKIYORUM: faz 0,20'de tek kare ölçünce beş
 *    kontrol satırı 63,98 / 69,74 / 75,57 / 78,42 / 91,95 çıkıyordu (%30,4) ve
 *    "5. satır kayırılmış" gibi görünüyordu. Sebep tasarım değil ZAMANLAMA:
 *    tarama çizgisi o karede tam 5. satırın üstündeydi. Çizgi bütün satırları
 *    sırayla geziyor, bu yüzden ölçüm döngünün 40 karesinin ORTALAMASI alınarak
 *    tekrarlandı:
 *      01 beş kontrol satırı : 32,34 / 34,15 / 36,38 / 36,75 / 38,39  → %15,8
 *      02 üç öncelik satırı  : 36,46 / 39,98 / 39,55                  → %8,8
 *      03 yedi dolu hücre    :                                        → %5,8
 *    KALAN FARKIN KAYNAĞI SAHNE DEĞİL, MOTORUN KENDİ IŞIĞI. Aynı bantlar BOŞ
 *    kabukta (motor.kabuk('') — içinde hiç çizim yok) ölçüldü:
 *      01 satır bantları, boş kabuk: 20,21 / 21,97 / 23,65 / 24,92 / 25,36 → %20,3
 *      03 hücre bantları, boş kabuk: 23,95 … 18,19                        → %24,0
 *    Yani motorun tepe vinyeti (kabuk'taki `ustKarart`, üst %42'yi karartıyor)
 *    ve zemin halesi zaten bu rampayı yaratıyor; sahnenin çizimi rampayı
 *    AZALTIYOR (%20,3 → %15,8 ve %24,0 → %5,8), büyütmüyor. Bu bir üstünlük
 *    işareti değil sahne aydınlatmasıdır ve motorun ortak dilidir.
 *    SATIR ZEMİNİ NEDEN VAR: 01 ve 02'nin satır gövdelerinin altına
 *    `rgba(14,17,24,.72)` yarı geçirmez bir zemin kondu. Ölçüldü — zeminsiz /
 *    zeminli döngü ortalaması farkı: 01 %20,8 → %15,8, 02 %15,0 → %8,8.
 *    Ayrıca zemin varken `boru` tamamen kapatılıp ölçüldüğünde satır değerleri
 *    birebir aynı çıkıyor (46,6 / 49,8 / 53,5 / 53,8 / 69,0), yani akan
 *    borunun ışığı artık satırlara hiç sızmıyor.
 *
 * 4) OYNATMA (headless Chrome, _vd.html ile, --autoplay-policy bayrağı YOK):
 *      normal                        : paused=false, currentTime 2,70 → 4,40
 *      --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *      kaynak: teknik-seo.mp4, data-dongu: var, öğe görünür (rectTop 238)
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 DENETİM' },
  { x: 437, fazMerkez: 0.50, etiket: '02 ÖNCELİK' },
  { x: 812, fazMerkez: 0.80, etiket: '03 DOĞRULAMA' },
];
const DW = 246, DH = 344, DY = 126;

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
    s += (i === 0 ? denetimListesi(d.x, p, faz, a)
       : i === 1 ? oncelikSirasi(d.x, p, faz, a)
       : uygulaDogrula(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · TEKNİK DENETİM KAPSAMI ─────────────────────────────────────────
   Beş kontrol satırı, sayfanın saydığı beş kalem. Üstünden bir tarama çizgisi
   gidip gelir; satırlar sırayla onaylanır. Listenin altındaki dağıtım düğümü
   bulguları üç etki şeridine dağıtır.
   ÖLÇÜ NOTU — IŞIK DARBESİ NEREYE DÜŞÜYOR: bu durakta darbe (bx+126, DY+242)
   noktasında duruyor (faz 0.20'de seritNokta = 188, 368). Liste bilerek
   DY+182'de bitiriliyor: darbe yarıçapı 52, satırların alt kenarına dikey
   uzaklık 60 → beş satırın hiçbiri darbeden ışık almıyor, aralarındaki tek
   fark kendi onay gecikmeleri kalıyor. Dağıtım düğümü tam darbenin üstüne
   oturtuldu (halka, r=9): darbe geçerken düğüm kendiliğinden yanıyor. */
function denetimListesi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const lX = bx + 16, lW = 214;
  const y0 = DY + 16, adim = 34, rH = 30, N = 5;

  /* tarama çizgisi — turda tam iki geçiş, kosinüs olduğu için dikişsiz */
  const tara = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
  const taraY = y0 + tara * (adim * (N - 1) + rH);

  /* --- beş kontrol satırı: gövde birebir aynı, yalnız simge ve çubuk boyu
     farklı (sayfanın beş ayrı kalemi). Onay gecikmesi listeyi yukarıdan aşağı
     işletir; sayfa da kalemleri bu sırayla sayıyor. --------------------- */
  const cubuk = [86, 72, 78, 66, 82];
  const altCubuk = [54, 44, 50, 40, 52];

  for (let i = 0; i < N; i++) {
    const ry = y0 + i * adim;
    const onay = kis01((p - i * 0.10) / 0.34);
    const vurgu = kis01(1 - Math.abs(taraY - (ry + rH / 2)) / 24) * p;

    /* gövde — altta yarı geçirmez zemin; ölçümle eklendi, gerekçesi ve
       öncesi/sonrası değerleri dosya başındaki "3) EŞİTLİK" bölümünde. */
    s += `<rect x="${lX}" y="${ry}" width="${lW}" height="${rH}" rx="9" fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${lX}" y="${ry}" width="${lW}" height="${rH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p + 0.045 * vurgu).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p + 0.16 * vurgu).toFixed(3)})" stroke-width="1.2"/>`;

    /* simge kutusu */
    const ix = bx + 24, iy = ry + 4;
    s += `<rect x="${ix}" y="${iy}" width="22" height="22" rx="6"
            fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += simge01(i, ix, iy, A, p);

    /* başlık + alt çubuk */
    s += `<rect x="${bx + 54}" y="${ry + 9}" width="${cubuk[i]}" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.13 + 0.20 * p + 0.14 * vurgu).toFixed(3)})"/>`;
    s += `<rect x="${bx + 54}" y="${ry + 20}" width="${altCubuk[i]}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.08 + 0.13 * p).toFixed(3)})"/>`;

    /* onay halkası */
    const qx = bx + 214, qy = ry + 15;
    s += `<circle cx="${qx}" cy="${qy}" r="8.6" fill="rgba(${A},${(0.10 * onay).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.56 * onay).toFixed(3)})" stroke-width="1.5"/>`;
    s += `<path d="M${qx - 4} ${qy + 0.4} L${qx - 1.2} ${qy + 3.6} L${qx + 4.4} ${qy - 3.4}"
            fill="none" stroke="rgba(255,255,255,${(0.20 + 0.68 * onay).toFixed(2)})"
            stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="14" stroke-dashoffset="${(14 * (1 - onay)).toFixed(2)}"/>`;
  }

  /* --- tarama çizgisi --------------------------------------------------- */
  s += `<line x1="${lX + 2}" y1="${taraY.toFixed(1)}" x2="${lX + lW - 2}" y2="${taraY.toFixed(1)}"
          stroke="rgba(${A},${(0.20 + 0.55 * p).toFixed(3)})" stroke-width="1.8"
          stroke-linecap="round" filter="url(#yumusaAz)"/>`;

  /* --- dağıtım düğümü: listeden bulgular çıkar ------------------------- */
  const nx = bx + 126, ny = DY + 242;
  s += `<line x1="${nx}" y1="${DY + 186}" x2="${nx}" y2="${ny - 10}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="9" fill="rgba(${A},${(0.06 + 0.14 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.55 * p).toFixed(3)})" stroke-width="1.6"/>`;

  /* --- üç etki derecesi: yukarıdan aşağı azalan basamak -----------------
     Sayfa "etkileme derecesine göre sınıflandırılır" diyor. Derece üç şeyle
     birden gösteriliyor: DOLU BOY (168/112/58), ŞERİT YÜKSEKLİĞİ (20/16/12)
     ve AKSAN YOĞUNLUĞU. Üçü birlikte inen bir basamak çiziyor.
     İLK SÜRÜM YANLIŞ OKUNUYORDU: şeritlerin içinde kesikli bir akış vardı ve
     önizlemede üç sıra "hap düğmesi" gibi görünüyordu — derece değil menü.
     Kesikli akış kaldırıldı, yerine tek parça inen dolgu geldi.
     HANGİ KONTROL MADDESİNİN HANGİ DERECEYE girdiği ÇİZİLMEDİ: sayfa bunu
     söylemiyor. Düğümden inen bağlar adsızdır, hiçbir satıra bağlanmaz. */
  const seritTanim = [
    { y: DY + 272, h: 20, dolu: 168, g: 1.00 },
    { y: DY + 300, h: 16, dolu: 112, g: 0.76 },
    { y: DY + 324, h: 12, dolu: 58,  g: 0.54 },
  ];

  seritTanim.forEach((t, l) => {
    const sx = bx + 44, sw = 186;
    const my = t.y + t.h / 2;
    /* düğümden şeride inen dağıtım bağı */
    s += `<line x1="${nx - 6}" y1="${ny + 7}" x2="${sx + 4}" y2="${my}"
            stroke="rgba(${A},${(0.10 + 0.34 * p * t.g).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
    /* şerit gövdesi */
    s += `<rect x="${sx}" y="${t.y}" width="${sw}" height="${t.h}" rx="${t.h / 2}"
            fill="rgba(255,255,255,${(0.024 + 0.024 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.08 + 0.11 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* dereceyi taşıyan dolgu — boyu sabit, parlaklığı durakla gelir */
    const dol = kis01((p - l * 0.09) / 0.36);
    s += `<rect x="${sx}" y="${t.y}" width="${(t.dolu * dol).toFixed(1)}" height="${t.h}" rx="${t.h / 2}"
            fill="rgba(${A},${(0.22 + 0.52 * p * t.g).toFixed(3)})"/>`;
    /* dolgunun ucunda ilerleyen bulgu işareti (turda tam 1 çevrim) */
    const yur = 0.5 - 0.5 * Math.cos(2 * Math.PI * (faz - l * 0.06));
    s += `<circle cx="${(sx + 6 + (t.dolu - 12) * yur * dol).toFixed(1)}" cy="${my}" r="${(t.h / 2 - 3).toFixed(1)}"
            fill="rgba(255,255,255,${(0.30 * dol * p).toFixed(3)})"/>`;
  });

  return s;
}

/* Kontrol listesi simgeleri — hepsi sayfanın kendi cümlesindeki kalemler.
   Arama motorunu ima eden hiçbir işaret (büyüteç, robot, harf) YOK. */
function simge01(i, ix, iy, A, p) {
  const m = (0.28 + 0.40 * p).toFixed(3);
  const c = `rgba(255,255,255,${m})`;
  const ak = `rgba(${A},${(0.34 + 0.46 * p).toFixed(3)})`;
  const cx = ix + 11;
  if (i === 0) {
    /* tarama ve indeksleme durumu: indekse inen ok + tepsi */
    return `<path d="M${ix + 3.5} ${iy + 12.5} V${iy + 17} a2.4 2.4 0 0 0 2.4 2.4 H${ix + 16.1}
              a2.4 2.4 0 0 0 2.4 -2.4 V${iy + 12.5}" fill="none" stroke="${c}" stroke-width="1.6"
              stroke-linecap="round"/>
            <path d="M${cx} ${iy + 3.4} V${iy + 13.4}" stroke="${ak}" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M${cx - 3.6} ${iy + 9.8} L${cx} ${iy + 13.8} L${cx + 3.6} ${iy + 9.8}"
              fill="none" stroke="${ak}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (i === 1) {
    /* sunucu yanıtları: iki raf yuvası */
    return `<rect x="${ix + 3}" y="${iy + 4}" width="16" height="6.4" rx="2" fill="none"
              stroke="${c}" stroke-width="1.5"/>
            <rect x="${ix + 3}" y="${iy + 12.6}" width="16" height="6.4" rx="2" fill="none"
              stroke="${c}" stroke-width="1.5"/>
            <circle cx="${ix + 6.6}" cy="${iy + 7.2}" r="1.5" fill="${ak}"/>
            <circle cx="${ix + 6.6}" cy="${iy + 15.8}" r="1.5" fill="${ak}"/>`;
  }
  if (i === 2) {
    /* güvenlik yapılandırması: asma kilit */
    return `<path d="M${ix + 6.6} ${iy + 10} V${iy + 7.4} a4.4 4.4 0 0 1 8.8 0 V${iy + 10}"
              fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
            <rect x="${ix + 4.6}" y="${iy + 10}" width="12.8" height="8.8" rx="2.4"
              fill="rgba(${A},${(0.16 + 0.30 * p).toFixed(3)})" stroke="${c}" stroke-width="1.4"/>`;
  }
  if (i === 3) {
    /* iç bağlantı mimarisi: üç düğüm iki bağ */
    return `<path d="M${ix + 5} ${iy + 16.4} L${ix + 11} ${iy + 5.6} L${ix + 17} ${iy + 14.4}"
              fill="none" stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>
            <circle cx="${ix + 5}" cy="${iy + 16.4}" r="2.5" fill="${ak}"/>
            <circle cx="${ix + 11}" cy="${iy + 5.6}" r="2.5" fill="${ak}"/>
            <circle cx="${ix + 17}" cy="${iy + 14.4}" r="2.5" fill="${ak}"/>`;
  }
  /* mobil uyumluluk: jenerik dikey çerçeve (çentik/kamera adası YOK) */
  return `<rect x="${ix + 6.4}" y="${iy + 3}" width="9.2" height="16" rx="2.4" fill="none"
            stroke="${c}" stroke-width="1.5"/>
          <path d="M${ix + 9.2} ${iy + 16.6} H${ix + 12.8}" stroke="${ak}" stroke-width="1.5"
            stroke-linecap="round"/>`;
}

/* ── 02 · ÖNCELİKLENDİRME YAKLAŞIMI ──────────────────────────────────────
   Üç öncelik satırı yukarıdan aşağı: (A) indekslemeyi engelleyen hatalar,
   (B) performansı ve kullanıcı deneyimini zayıflatan sorunlar, (C) schema
   zenginleştirmesi gibi ince ayarlar. Satır gövdeleri BİREBİR aynı; fark
   yalnız dolma sırası. A ve B dolunca aradaki altyapı duvarı örülür; duvar
   sağlamlaşmadan sol raydaki kilit AÇILMAZ, dolayısıyla C dolmaya başlamaz.
   Sayfanın cümlesi tam olarak bu: "ince ayarlar, altyapı sağlamlaştıktan
   sonra devreye girer."
   ÖLÇÜ NOTU — IŞIK DARBESİ: bu durakta darbe (bx+123, DY+177) noktasında
   duruyor ve boru DY+166 ile DY+204 arasından geçiyor. Bu bant bilerek
   ALTYAPI DUVARINA (DY+132–192) bırakıldı: duvar büyük ve düz tuğlalardan
   oluştuğu için ışığı yutmuyor. Satır B'nin alt kenarı DY+118 (uzaklık 59),
   satır C'nin üst kenarı DY+232 (uzaklık 55) — ikisi de darbe yarıçapının
   (52) dışında, yani üç satırın hiçbiri darbeden fazladan ışık almıyor.
   Kilit de raya, bx+30'a alındı (darbeye uzaklık 93). */
function oncelikSirasi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const rX = bx + 46, rW = 184, rH = 48;
  const rayX = bx + 30;

  /* aşamalar — hepsi p cinsinden, p sürekli ve pencere dışında 0 → dikişsiz */
  const dolgu = [kis01(p / 0.34), kis01((p - 0.22) / 0.34), kis01((p - 0.72) / 0.24)];
  const kat = kis01((p - 0.46) / 0.26);          // altyapı duvarının örülmesi
  const gecit = kis01((p - 0.66) / 0.20);        // kilidin açılması

  const rowY = [DY + 14, DY + 70, DY + 232];

  /* --- sıra rayı: akış yukarıdan aşağı, kilide kadar --------------------
     Kilit kapalıyken akış kilidin ÜSTÜNDE kesilir; açılınca alt parça da
     akmaya başlar. Desen 13; turda tam 4 desen kayar → dikişsiz. */
  const rayAkis = (faz * 52).toFixed(1);
  s += `<line x1="${rayX}" y1="${DY + 24}" x2="${rayX}" y2="${DY + 198}"
          stroke="rgba(${A},${(0.16 + 0.44 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 8" stroke-dashoffset="-${rayAkis}" stroke-linecap="round"/>`;
  s += `<line x1="${rayX}" y1="${DY + 224}" x2="${rayX}" y2="${DY + 246}"
          stroke="rgba(${A},${(0.10 + 0.60 * gecit * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 8" stroke-dashoffset="-${rayAkis}" stroke-linecap="round"/>`;
  s += `<path d="M${rayX - 4.5} ${DY + 244} L${rayX} ${DY + 250} L${rayX + 4.5} ${DY + 244}"
          fill="none" stroke="rgba(${A},${(0.12 + 0.62 * gecit * p).toFixed(3)})" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>`;

  /* --- üç öncelik satırı ------------------------------------------------ */
  for (let i = 0; i < 3; i++) {
    const ry = rowY[i];
    const d = dolgu[i];
    /* satır C, kilit açılmadan hiç dolmaz */
    const etkin = i === 2 ? d * gecit : d;

    /* gövde — altta yarı geçirmez zemin; ölçümle eklendi, gerekçesi ve
       öncesi/sonrası değerleri dosya başındaki "3) EŞİTLİK" bölümünde. */
    s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="10" fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="10"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;

    /* raydan satıra giren bağ */
    s += `<line x1="${rayX}" y1="${ry + rH / 2}" x2="${rX}" y2="${ry + rH / 2}"
            stroke="rgba(${A},${(0.12 + 0.34 * p).toFixed(3)})" stroke-width="1.4"/>`;

    /* simge kutusu */
    const ix = rX + 9, iy = ry + 9;
    s += `<rect x="${ix}" y="${iy}" width="30" height="30" rx="8"
            fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += simge02(i, ix, iy, A, p);

    /* başlık çubuğu + dolan sıra çubuğu */
    s += `<rect x="${rX + 50}" y="${ry + 10}" width="${[104, 92, 86][i]}" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.13 + 0.20 * p).toFixed(3)})"/>`;
    const tW = 124;
    s += `<rect x="${rX + 50}" y="${ry + 26}" width="${tW}" height="9" rx="4.5"
            fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${rX + 50}" y="${ry + 26}" width="${(tW * etkin).toFixed(1)}" height="9" rx="4.5"
            fill="rgba(${A},${(0.26 + 0.50 * p).toFixed(3)})"/>`;
  }

  /* --- altyapı duvarı: A ve B tamamlandıkça örülür ---------------------- */
  const dX = rX, dW = rW, dY0 = DY + 132, kH = 18, kBos = 3;
  for (let c = 0; c < 3; c++) {
    const ky = dY0 + c * (kH + kBos);
    const ofs = c % 2 ? -22 : 0;                 // tuğla derzi şaşırtması
    for (let b = -1; b < 5; b++) {
      const x0 = dX + ofs + b * 46;
      const x1 = Math.min(dX + dW, x0 + 44);
      const xs = Math.max(dX, x0);
      if (x1 - xs < 4) continue;
      const sira = kis01((kat - (c * 0.16 + (b + 1) * 0.05)) / 0.42);
      s += `<rect x="${xs}" y="${ky}" width="${(x1 - xs).toFixed(1)}" height="${kH}" rx="4"
              fill="rgba(255,255,255,${(0.020 + 0.045 * sira).toFixed(3)})"
              stroke="rgba(${A},${(0.08 + 0.42 * sira * (0.35 + 0.65 * p)).toFixed(3)})" stroke-width="1.2"/>`;
    }
  }
  /* duvar sağlamlaştı çizgisi */
  s += `<line x1="${dX}" y1="${DY + 195}" x2="${(dX + dW * kat).toFixed(1)}" y2="${DY + 195}"
          stroke="rgba(${A},${(0.20 + 0.60 * kat * p).toFixed(3)})" stroke-width="2.4"
          stroke-linecap="round"/>`;

  /* --- kilit: duvar sağlamlaşınca açılır -------------------------------- */
  const lx = rayX, ly = DY + 212;
  s += `<g transform="rotate(${(-36 * gecit).toFixed(1)} ${lx - 6} ${ly - 3})">
          <path d="M${lx - 6} ${ly - 3} V${ly - 8} a6 6 0 0 1 12 0 V${ly - 3}" fill="none"
            stroke="rgba(${A},${(0.26 + 0.58 * gecit * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke-width="2.1" stroke-linecap="round"/>
        </g>`;
  s += `<rect x="${lx - 8.4}" y="${ly - 3}" width="16.8" height="13" rx="3"
          fill="rgba(${A},${(0.14 + 0.44 * gecit * (0.35 + 0.65 * p)).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})" stroke-width="1.1"/>`;

  /* --- ince ayar sürgüleri: yalnız C devreye girince oturur -------------
     Sayfa "Schema zenginleştirmesi gibi ince ayarlar" diyor; sürgüler o ince
     ayarın görsel karşılığı. Üzerlerinde değer/rakam YOK. */
  const suY = DY + 296;
  for (let k = 0; k < 4; k++) {
    const sy = suY + k * 12;
    const sX = rX + 6, sW2 = rW - 12;
    s += `<line x1="${sX}" y1="${sy}" x2="${sX + sW2}" y2="${sy}"
            stroke="rgba(255,255,255,${(0.10 + 0.10 * p).toFixed(3)})" stroke-width="3.4"
            stroke-linecap="round"/>`;
    /* tutamak: sürgü, C etkinleşince hedefine kayar; kalan titreşim faz
       cinsinden periyodik (turda tam 2 çevrim) → dikişsiz */
    const hedef = [0.30, 0.62, 0.44, 0.74][k];
    const bas = [0.12, 0.20, 0.16, 0.24][k];
    const cC = dolgu[2] * gecit;
    const t = bas + (hedef - bas) * cC
      + 0.012 * cC * Math.sin(2 * Math.PI * (faz * 2 - k / 4));
    s += `<circle cx="${(sX + sW2 * t).toFixed(1)}" cy="${sy}" r="4.2"
            fill="rgba(${A},${(0.24 + 0.55 * cC * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.16 + 0.22 * p).toFixed(3)})" stroke-width="1.1"/>`;
  }

  return s;
}

/* Öncelik satırı simgeleri. Arama motoru işareti YOK, ürün adı YOK. */
function simge02(i, ix, iy, A, p) {
  const m = (0.28 + 0.40 * p).toFixed(3);
  const c = `rgba(255,255,255,${m})`;
  const ak = `rgba(${A},${(0.36 + 0.46 * p).toFixed(3)})`;
  if (i === 0) {
    /* indekslemeyi engelleyen hata: engele çarpan ok + ulaşılamayan indeks */
    return `<path d="M${ix + 3} ${iy + 15} H${ix + 10.5}" stroke="${c}" stroke-width="1.8"
              stroke-linecap="round"/>
            <path d="M${ix + 7.4} ${iy + 11.6} L${ix + 11} ${iy + 15} L${ix + 7.4} ${iy + 18.4}"
              fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="${ix + 13}" y="${iy + 5}" width="3.4" height="20" rx="1.7" fill="${ak}"/>
            <rect x="${ix + 19.6}" y="${iy + 9}" width="8.4" height="12" rx="2" fill="none"
              stroke="${c}" stroke-width="1.3" stroke-dasharray="3 3"/>`;
  }
  if (i === 1) {
    /* performans + kullanıcı deneyimi: sayısız kadran + imleç */
    return `<path d="M${ix + 4} ${iy + 21} a11 11 0 0 1 22 0" fill="none" stroke="${c}"
              stroke-width="1.7" stroke-linecap="round"/>
            <path d="M${ix + 15} ${iy + 21} L${ix + 20.5} ${iy + 12.5}" stroke="${ak}"
              stroke-width="1.9" stroke-linecap="round"/>
            <circle cx="${ix + 15}" cy="${iy + 21}" r="2" fill="${ak}"/>
            <path d="M${ix + 19} ${iy + 20} L${ix + 19} ${iy + 28.4} L${ix + 21.2} ${iy + 26.2}
              L${ix + 23} ${iy + 29.4} L${ix + 24.6} ${iy + 28.4} L${ix + 22.9} ${iy + 25.4}
              L${ix + 25.6} ${iy + 24.8} Z" fill="${c}"/>`;
  }
  /* schema zenginleştirmesi: işaretleme köşeli ayraçları */
  const cx = ix + 15, cy = iy + 15;
  return `<path d="M${cx - 5} ${cy - 6} L${cx - 11} ${cy} L${cx - 5} ${cy + 6}" fill="none"
            stroke="${ak}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M${cx + 5} ${cy - 6} L${cx + 11} ${cy} L${cx + 5} ${cy + 6}" fill="none"
            stroke="${ak}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M${cx + 2.2} ${cy - 7} L${cx - 2.2} ${cy + 7}" stroke="${c}"
            stroke-width="1.8" stroke-linecap="round"/>`;
}

/* ── 03 · UYGULAMA VE DOĞRULAMA SÜRECİ ───────────────────────────────────
   Üst: sitenin MEVCUT yapısı — dört bloklu bir iskelet; üçüncü sıradaki
   boşluğa, o boşluğun tırnağına birebir oturan bir düzeltme parçası soldan
   sağa değil, kendi kanalında kayarak geçer ("mevcut yapısına uygun şekilde").
   Orta: veri dışarı akar, doğrulama geri döner ve onay halkasını kapatır.
   Alt: kapsama hücreleri ve performans eğrisi izlenir.
   ÖLÇÜ NOTU — IŞIK DARBESİ: bu durakta darbe (bx+120, DY+204) noktasında.
   İki akış çizgisi DY+150 ve DY+190'a, izleme çerçevesi DY+212'ye alındı;
   darbe ikisinin arasındaki boşluğa düşüyor. Onay halkası bx+28'e alındı
   (darbeye uzaklık 93), yoksa tam ortasında kalıp okunmuyordu.
   ARAYÜZ TAKLİDİ YOK: pencere çerçevesi, sekme, kenar menüsü, araç çubuğu
   çizilmedi; alttaki iki bölge yalnız hücre şeridi ve tek eğridir. */
function uygulaDogrula(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- mevcut yapı iskeleti --------------------------------------------- */
  const kX = bx + 16, kW = 214, kY = DY + 14, kH = 126;
  s += `<rect x="${kX}" y="${kY}" width="${kW}" height="${kH}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  /* üstteki iki tam sıra */
  [0, 1].forEach((r) => {
    s += `<rect x="${kX + 12}" y="${kY + 14 + r * 26}" width="${[190, 160][r]}" height="18" rx="6"
            fill="rgba(255,255,255,${(0.075 + 0.055 * p).toFixed(3)})"/>`;
  });
  /* eksik sıra: sol blok — boşluk — serbest kanal
     ÖLÇÜ NOTU: ilk sürümde sol blok 62, boşluk 62, yol 68'di; parça 62
     genişken 68'lik yolda ilerlediği için boşluğun sağ ucunu neredeyse hep
     örtüyordu ve iki tırnak üst üste binip okunmuyordu. Şimdi parça 56, yol
     62: yolun son 6 pikselinde parça boşluğun tamamen dışında duruyor, geri
     kalanında boşluğun sağ ucunu örterek İÇİNE giriyor — bu örtüşme kusur
     değil, oturma hareketinin kendisi. Boşluğun kesikli sol tırnağı parça
     oturana kadar görünür kalıyor, yani hedef her an okunuyor. */
  const eY = kY + 66, eH = 18;
  s += `<rect x="${kX + 12}" y="${eY}" width="54" height="${eH}" rx="6"
          fill="rgba(255,255,255,${(0.075 + 0.055 * p).toFixed(3)})"/>`;
  /* boşluk: tırnaklı kesik çerçeve — parçanın oturacağı yer */
  const gX = kX + 72, gW = 56;
  s += `<path d="${tirnakYol(gX, eY, gW, eH)}" fill="rgba(255,255,255,.018)"
          stroke="rgba(${A},${(0.16 + 0.34 * p).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="4 4"/>`;
  /* alttaki tam sıra */
  s += `<rect x="${kX + 12}" y="${kY + 92}" width="176" height="18" rx="6"
          fill="rgba(255,255,255,${(0.075 + 0.055 * p).toFixed(3)})"/>`;

  /* düzeltme parçası — kanalın sağından boşluğa kayar. Parçanın SOL
     kenarındaki tırnak, boşluğun tırnağının negatifidir: yapı ne kabul
     ediyorsa o biçimde uygulanıyor.
     ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: ilk sürüm kosinüsü DOĞRUDAN faza bağlıyordu
     (kay = ½+½cos2πφ). O eğri φ=0,5'te oturuyor ama bu durak φ=0,61–0,99
     arasında görünüyor; izleyicinin gördüğü tek şey parçanın yuvadan
     ÇIKMASIYDI — hareket tersine akıyordu. Şimdi oturma durağın kendi
     canlılığına (p) bağlı: darbe yaklaşırken parça yuvaya giriyor, tepe
     noktasında oturuyor, darbe uzaklaşırken kanala dönüyor. p sürekli ve
     pencere dışında 0 olduğu için döngü yine dikişsiz. */
  const yerlesme = kis01((p - 0.14) / 0.52);  // 0 → kanalda, 1 → oturmuş
  const kay = 1 - yerlesme;
  const pX = gX + 62 * kay;
  const otur = kis01((yerlesme - 0.86) / 0.14);           // tam oturduğu an
  s += `<path d="${tirnakYol(pX, eY, gW, eH)}"
          fill="rgba(${A},${(0.30 + 0.34 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.36 + 0.44 * p).toFixed(3)})" stroke-width="1.2"/>`;
  if (otur > 0.02) {
    s += `<rect x="${gX - 5}" y="${eY - 5}" width="${gW + 10}" height="${eH + 10}" rx="8"
            fill="none" stroke="rgba(255,255,255,${(0.55 * otur * p).toFixed(3)})" stroke-width="1.6"/>`;
  }

  /* --- veri dışarı, doğrulama geri ---------------------------------------
     Desen 16; turda tam 3 desen kayar → dikişsiz. İki DÜZ çizgi, kapalı eğri
     yok (kurumsal sahnesinde "yükleme çemberi" tuzağına düşülmüştü). */
  const ak1 = (faz * 48).toFixed(1);
  s += `<line x1="${bx + 46}" y1="${DY + 162}" x2="${bx + 204}" y2="${DY + 162}"
          stroke="rgba(${A},${(0.22 + 0.50 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="6 10" stroke-dashoffset="-${ak1}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 204} ${DY + 157.5} L${bx + 212} ${DY + 162} L${bx + 204} ${DY + 166.5} Z"
          fill="rgba(${A},${(0.28 + 0.52 * p).toFixed(3)})"/>`;
  s += `<line x1="${bx + 204}" y1="${DY + 196}" x2="${bx + 52}" y2="${DY + 196}"
          stroke="rgba(${A},${(0.22 + 0.50 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="6 10" stroke-dashoffset="${ak1}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 52} ${DY + 191.5} L${bx + 44} ${DY + 196} L${bx + 52} ${DY + 200.5} Z"
          fill="rgba(${A},${(0.28 + 0.52 * p).toFixed(3)})"/>`;

  /* onay halkası: "gerçek etki doğrulanır" — en son kapanır */
  const onay = kis01((p - 0.52) / 0.36);
  const ox = bx + 28, oy = DY + 196;
  s += `<circle cx="${ox}" cy="${oy}" r="12.6" fill="rgba(${A},${(0.10 * onay).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.58 * onay).toFixed(3)})" stroke-width="1.7"/>`;
  s += `<path d="M${ox - 5.6} ${oy + 0.6} L${ox - 1.6} ${oy + 5} L${ox + 6.2} ${oy - 4.6}"
          fill="none" stroke="rgba(255,255,255,${(0.20 + 0.70 * onay).toFixed(2)})"
          stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="20" stroke-dashoffset="${(20 * (1 - onay)).toFixed(2)}"/>`;
  /* halkadan yapıya dönen kısa bağ — doğrulanan etki siteye geri işlenir */
  s += `<line x1="${ox}" y1="${oy - 12.6}" x2="${ox}" y2="${kY + kH + 4}"
          stroke="rgba(${A},${(0.10 + 0.40 * onay * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="4 6" stroke-dashoffset="${ak1}"/>`;

  /* --- performans: akan tek eğri, İDDİA DEĞİL İZLEME --------------------
     Eğri yükselmiyor; dalgalanıyor. Sayfa "izlenerek doğrulanır" diyor.
     Faz katsayıları tam sayı (2 ve 3) → bir turda desen tam kapanır.
     ÖLÇÜ NOTU — SIRALAMA NEDEN BÖYLE: ilk sürümde kapsama hücreleri üstte,
     eğri alttaydı. Işık darbesi bu durakta (bx+120, DY+204) duruyor ve
     hücrelerin ORTADAKİLERİNİ yıkayıp kenardakilerden parlak gösteriyordu —
     "şu sayfalar daha kapsamda" gibi okunuyordu. İkisi yer değiştirdi:
     darbenin altına eğri geldi (eşitlik iddiası taşımayan tek çizgi),
     hücreler 100 piksel aşağı indi ve darbe yarıçapının (52) tamamen dışına
     çıktı — dokuz hücre artık yalnız kendi dolma gecikmesiyle ayrılıyor. */
  const eX = kX + 12, eW = kW - 24, eYm = DY + 256, eA = 20;
  s += `<rect x="${kX}" y="${DY + 222}" width="${kW}" height="66" rx="9" fill="none"
          stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<line x1="${eX}" y1="${eYm}" x2="${eX + eW}" y2="${eYm}"
          stroke="rgba(255,255,255,.075)" stroke-width="1"/>`;
  let d = '';
  const N = 46;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const y = eYm - eA * (
      0.62 * Math.sin(2 * Math.PI * (t * 1.6 + faz * 2)) +
      0.38 * Math.sin(2 * Math.PI * (t * 3.4 - faz * 3)));
    d += (i === 0 ? 'M' : 'L') + (eX + t * eW).toFixed(1) + ' ' + y.toFixed(1);
  }
  s += `<path d="${d}" fill="none" stroke="rgba(${A},${(0.30 + 0.55 * p).toFixed(3)})"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* okuma başı: sağ uçta sabit, eğri altından akıyor */
  const bY = eYm - eA * (
    0.62 * Math.sin(2 * Math.PI * (1 * 1.6 + faz * 2)) +
    0.38 * Math.sin(2 * Math.PI * (1 * 3.4 - faz * 3)));
  s += `<line x1="${eX + eW}" y1="${DY + 232}" x2="${eX + eW}" y2="${DY + 280}"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1"/>`;
  s += `<circle cx="${eX + eW}" cy="${bY.toFixed(1)}" r="4"
          fill="rgba(${A},${(0.40 + 0.55 * p).toFixed(3)})"/>`;

  /* --- kapsama: adsız hücre şeridi, iki hücre dışarıda kalır ------------
     Kardeş .akis figürü "üç sayfa kartı, biri dışarıda" diyor; burada aynı
     gerçeğin başka kesiti var — kart değil şerit, ✓/✗ değil dolu/boş hücre. */
  const cY = DY + 296, cH = 44;
  s += `<rect x="${kX}" y="${cY}" width="${kW}" height="${cH}" rx="9" fill="none"
          stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;
  const disarida = [3, 7];
  /* ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: ilk sürüm hücreleri soldan sağa gecikmeyle
     dolduruyordu (p - i·0,045). Döngü ortalaması alındığında sağdaki hücreler
     soldakilerden sönük çıkıyordu — %16,2 fark, yani "sağdaki sayfalar daha az
     kapsamda" gibi okunuyordu. Oysa sayfa hücreler arasında bir ayrım
     yapmıyor; yalnız "kapsama izlenir" diyor. Gecikme kaldırıldı, dokuz hücre
     de tek eğriyle doluyor. */
  const dol = kis01((p - 0.10) / 0.34);
  for (let i = 0; i < 9; i++) {
    const hx = kX + 14 + i * 21, hy = cY + 9;
    const bos = disarida.indexOf(i) >= 0;
    s += `<rect x="${hx}" y="${hy}" width="16" height="26" rx="3.5"
            fill="${bos ? 'rgba(255,255,255,.020)'
              : `rgba(${A},${(0.10 + 0.50 * dol * (0.35 + 0.65 * p)).toFixed(3)})`}"
            stroke="${bos ? `rgba(255,255,255,${(0.10 + 0.10 * p).toFixed(3)})`
              : `rgba(${A},${(0.14 + 0.40 * dol).toFixed(3)})`}"
            stroke-width="1.2" ${bos ? 'stroke-dasharray="3 3"' : ''}/>`;
  }

  return s;
}

/* Sol kenarında yarım daire tırnak olan blok: boşluk ile parça aynı yolu
   kullanır, bu yüzden parça boşluğa BİREBİR oturur. */
function tirnakYol(x, y, w, h) {
  const my = y + h / 2, r = 4.6;
  return `M${x + 4} ${y} H${x + w - 4} a4 4 0 0 1 4 4 V${y + h - 4} a4 4 0 0 1 -4 4 H${x + 4}
    a4 4 0 0 1 -4 -4 V${my + r} a${r} ${r} 0 0 0 0 ${-2 * r} V${y + 4} a4 4 0 0 1 4 -4 Z`;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
