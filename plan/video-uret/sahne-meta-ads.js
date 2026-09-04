/* SAHNE — pazarlama / meta-ads
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Piksel ve Conversions API Kurulumu
 *      "Web sitesine yerleştirilen piksel ve sunucu taraflı Conversions API,
 *       tarayıcı engelleyicilerinden etkilenmeden dönüşüm verisinin doğru
 *       ölçümlenmesini sağlar; retargeting ve optimizasyonun temelini oluşturur."
 *   02 Katalog Tabanlı Dinamik Reklamlar
 *      "Ürün kataloğu Commerce Manager'a bağlanarak kullanıcıya, ziyaret ettiği
 *       veya sepetine eklediği ürünü otomatik gösteren dinamik reklamlar
 *       kurulur; geniş ürün yelpazesi manuel üretim olmadan yönetilir."
 *   03 Kreatif Test ve Optimizasyon
 *      "Görsel, video ve metin varyasyonları A/B testiyle karşılaştırılarak
 *       hangi kreatifin daha güçlü sonuç verdiği belirlenir; sonuçlar sonraki
 *       döngünün mesaj stratejisine yön verir."
 *
 * FİKİR: modülün ortak dili — akan cam boru üç durağa uğrar, ışık darbesi
 * hangi durağın üstündeyse o durak canlanır ve KENDİ işini yapar:
 *   01 site iskeletine küçük bir etiket parçası OTURUR ("yerleştirilen");
 *      siteden aktarma düğümüne İKİ yol iner: tarayıcı yolunun üstünde bir
 *      engelleyici plakası akışı keser, sunucu kutusundan geçen ikinci yol
 *      akmaya devam eder; veri temel şeridine iner, şerit dolar ve yanındaki
 *      onay halkası kapanır ("etkilenmeden doğru ölçümleme"); şeridin
 *      altında retargeting (dönüş oku) ve optimizasyon (sürgü) çipleri yanar
 *      ("retargeting ve optimizasyonun temelini oluşturur");
 *   02 katalog panelindeki 3×3 nötr ürün hücresinin üzerinde bir seçici halka
 *      dolaşır (turda her hücreye BİR kez uğrayan kapalı tur); panelden aşağı
 *      inen bağ hattında veri akar, hattın ucundaki dişli döner
 *      ("otomatik"); izleme ve sepet sinyal çipleri dişliye bağlanır
 *      ("ziyaret ettiği veya sepetine eklediği"); alttaki reklam çerçevesinin
 *      ürün yuvası halkanın üstünde durduğu hücreyle eş zamanlı değişir,
 *      metin çubukları sürekli biçim değiştirir ("dinamik", "manuel üretim
 *      olmadan");
 *   03 üç varyasyon çipi (görsel / video / metin — sayfanın kendi üçlüsü)
 *      tek düğümde birleşip İKİ eş test paneline dağılır; panellerin sonuç
 *      çubukları dolar, biri daha yüksekte durur ve seçim halkası onu
 *      işaretler ("hangi kreatifin daha güçlü sonuç verdiği belirlenir");
 *      kazanan panelden çıkan yay strateji kartına iner, karttaki mesaj
 *      çubukları yeni genişliklerine kayar ("mesaj stratejisine yön verir")
 *      ve karttan çıkan kesikli yay varyasyon sırasının sol hizasına geri
 *      döner (belirli bir çipe değil) — videonun kendisi de başa döndüğü
 *      için "sonraki döngü" görsel olarak kapanır.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER (ölçüldü — render edilip mürekkep piksel tarandı) ─────────
 * Üç etiket sayfanın kendi başlıklarının kısaltmasıdır; istasyon 246 px:
 *   "01 VERİ ÖLÇÜMÜ"   230 px  ✓  (tam ad ürün adı içerdiği için yazılamaz,
 *                                   paragraf "dönüşüm verisinin doğru
 *                                   ölçümlenmesi" diyor — oradan)
 *   "02 KATALOG"       163 px  ✓  ("Katalog Tabanlı"nın ilk sözcüğü)
 *   "03 KREATİF TEST"  246 px  ✗ tam sınırda (pay 0) — seçilmedi; DEVIR'de
 *                                   1 px'lik taşmanın render ölçümüyle
 *                                   yakalandığı sahne var, pay bırakılmalı
 *   "03 A/B TESTİ"     196 px  ✓  SEÇİLDİ ("A/B testiyle" sayfanın sözü)
 * Videodaki tek yazı bu üç etikettir; en küçük yazı boyu 28 px.
 *
 * ── YASAK (yasaklar.md "pazarlama" modül geneli + "meta-ads") ───────────
 *  - HİÇBİR METRİK RAKAMI YOK: CPC, dönüşüm oranı, ROAS, bütçe, erişim,
 *    tıklanma — hiçbiri yazılmadı. 03'ün sonuç çubuklarının üzerinde sayı,
 *    ölçek çizgisi, yüzde YOK; yalnız iki dolgu çubuğu var. Tek rakam durak
 *    numaraları (01/02/03).
 *  - PLATFORM LOGOSU / MARKA RENGİ / ARAYÜZ İŞARETİ YOK: beğeni, paylaşım,
 *    yorum balonu gibi tanınabilir öğe çizilmedi; reklam çerçevesi jenerik
 *    (yer tutucu kutu + çubuklar + adsız buton hapı).
 *  - ÜRÜN ADI YAZILMADI: Piksel / Conversions API / Commerce Manager yalnız
 *    KAVRAM olarak çizildi — etiket parçası, sunucu kutusu, bağ/dişli.
 *    Etiketlerde de bu adlar geçmiyor.
 *  - KATALOG ÜRÜNLERİ NÖTR KUTU: 3×3 hücrede görsel/marka yok; reklam
 *    yuvasındaki "ürün" de yalnız konumu hücreye göre kayan boş bir kare.
 *  - İNSAN YÜZÜ YOK: izleme çipindeki göz simgesi tek başına bir gözdür,
 *    yüz değil; başka figür yok. LOGO YOK.
 *
 * ── EŞİTLİK / FARK — NEREDE EŞİT, NEREDE BİLEREK DEĞİL ──────────────────
 *  · 03'ün ÜÇ VARYASYON ÇİPİ (görsel/video/metin) sayfada sıralanmıyor →
 *    birebir aynı ölçü, aynı kontur, aynı dolgu, aynı parlaklık formülü,
 *    gecikme farkı YOK. Döngü ortalaması ölçümü %7,5 — ama BOŞ KABUK aynı
 *    bantlarda %15,7 veriyor (zemin halesi soldan sağa sönüyor): çizim
 *    motorun rampasını BÜYÜTMÜYOR, YARIYA indiriyor. Çizimin kendi katkısı
 *    (sahne − boş kabuk) 18,95 / 18,38 / 19,08 → %3,8 içinde eş.
 *  · 03'ün İKİ TEST PANELİ: çerçeve, dolgu, iç yer tutucular birebir aynı;
 *    merkezleri darbe noktasına (yerel x=120) eşit uzaklıkta. Tek fark
 *    SONUÇ ÇUBUĞUNUN dolu boyu (0,45 / 0,78) ve seçim halkası — sayfa
 *    "hangi kreatifin daha güçlü sonuç verdiği belirlenir" diyor; fark
 *    uydurma değil, sayfanın anlattığı test sonucunun kendisi. Kazanan
 *    panel hiçbir varyasyon çipine bağlanmadı (üç çip tek düğümde birleşip
 *    ikiye dağılıyor) — yani "video kazanır" gibi bir TÜR iması yok.
 *    Çerçeve eşitliği yalnız üst şeritte ölçüldü (%2,0; boş kabuk %14,4 —
 *    paneller altındaki koyu zemin farkı eşitliyor) çünkü alt yarıda
 *    kasıtlı fark (sonuç çubukları) var.
 *  · 02'nin DOKUZ HÜCRESİ adsız katalog kayıtları; seçici halka kapalı tur
 *    üzerinde her hücreye bir kez uğrar (her hücre: bir varış + bir çıkış).
 *    Döngü ortalaması %21,0 fark veriyor ama SATIR İÇİ fark ≤%1,6
 *    (satır satır %0,9 / %1,6 / %0,2 — bağımsız denetimde aynı bantlarla
 *    yeniden ölçüldü; buradaki eski "≤%0,9" iddiası yalnız üst satırdı); dikey
 *    fark boş kabukta da var (%24,4 — zemin halesi + boru alt sıraya daha
 *    yakın). Yani sütunlar/hücreler arasında seçim iması yok; dikey rampa
 *    motorun ortak aydınlatması ve sahne onu azaltıyor.
 *  · 02'nin İKİ SİNYAL ÇİPİ (izleme/sepet) sayfada "veya" ile eş sayılıyor →
 *    aynı ölçü, aynı formül, merkezleri darbeye eşit uzaklıkta (63 px).
 *    Ölçüm farkı %0,7 (ilk yerleşimde %16,9'du — boru göz çipinin üstünden
 *    geçiyordu; çipler aşağı alınıp koyu zemine oturtuldu, hikâye 02'nin
 *    fonksiyon yorumunda).
 *  · 01'in İKİ YOLU bilerek EŞİT DEĞİL: sayfanın cümlesi tam olarak bu —
 *    tarayıcı yolu engelleyiciyle kesilir, sunucu yolu akmaya devam eder ve
 *    ölçüm yine tamamlanır. Bu bir "iki geçerli seçenek" sayfası değil;
 *    çift kurulumun dayanıklılık hikâyesi sayfanın kendi iddiası.
 *  · 01'in İKİ TEMEL ÇİPİ (retargeting/optimizasyon) eşit — aynı ölçü, aynı
 *    formül, merkezleri düğüm dikeyine eşit uzaklıkta (35 px). Ölçüm %3,0
 *    (boş kabuk %8,7 — hale sağ çipi kayırıyor; ilk sürümde glif mürekkebi
 *    farkı bunu %12,7'ye büyütüyordu, ok kalınlaştırılıp sürgüler
 *    inceltilerek %3,0'a indirildi — çizim halenin fazını GERİ sarıyor).
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) HESAP VE KİTLE — reklam hesabı kutusu,
 * üç katmanlı kitle bantları, eşit üçlü huni; (2) FORMAT SEÇİMİ — dört eşit
 * format kartı; (3) RETARGETING — ziyaretçi→özel kitle→reklam + dönüş oku.
 * Bu sahne sayfanın BAŞKA bölümünü çizer (.akv "Ayrıntılar" listesi):
 * ölçüm kurulumu → katalog reklamı → kreatif test. Çakışan tek kavram
 * kümesi şunlar ve bilerek farklı kesitten:
 *  · .akis 3'te "piksel ve Conversions API" retargeting DÖNGÜSÜNÜ besleyen
 *    etiket; burada 01 o verinin NASIL toplandığını çiziyor (iki yol +
 *    engelleyici). Çelişki yok — 01'deki temel çipinin dönüş oku, .akis'in
 *    dönüş okuyla aynı yönde bir özettir.
 *  · .akis 2 dört FORMATI eşit çizer (statik/koleksiyon/kısa video/Reels).
 *    Buradaki 03 üçlüsü o dörtlü değil; sayfanın 03 paragrafındaki
 *    "görsel, video ve metin VARYASYONLARI". Üçü burada da eşit çizildi;
 *    kazanan yalnız adsız A-B panellerinden biri — format/varyasyon türü
 *    kazanmıyor, .akis'in eşitliğiyle çelişmiyor.
 *  · .akis'te reklam kartı statik bir örnek; buradaki çerçeve ürün yuvası
 *    değişen DİNAMİK reklam — 02 paragrafının konusu, çelişme değil ek.
 *
 * ── ÖLÇÜLEN DEĞERLER — hepsi bu makinede ölçüldü ────────────────────────
 * 1) ETİKET GENİŞLİĞİ: yukarıda, "ETİKETLER" bölümünde.
 * 2) EŞİTLİK (döngü ortalaması, 40 kare, bant ortalama parlaklık;
 *    karşılaştırma için aynı bantlar BOŞ kabukta da ölçüldü):
 *      03 varyasyon çipleri : 40,84 / 38,92 / 38,00 → %7,5 (boş %15,7;
 *        çizim katkısı 18,95 / 18,38 / 19,08 → %3,8)
 *      03 panel üst şeridi  : A 33,74 / B 33,07     → %2,0 (boş %14,4)
 *      02 dokuz hücre       : 46,4…56,1 → dikey %21,0 (boş %24,4);
 *        satır içi ≤%1,6 (0,9/1,6/0,2) — dikey rampa motorun ortak ışığı
 *      02 sinyal çipleri    : 44,44 / 44,12         → %0,7 (boş %0,0;
 *        ilk yerleşim %16,9'du — boru tuzağı, 02 yorumunda)
 *      01 temel çipleri     : 46,65 / 48,06         → %3,0 (boş %8,7)
 * 3) DÖNGÜ DİKİŞİ — crf SEÇİMİ (eşik 1,6; kaynak kareler faz-periyodik ama
 *    mp4 kodlayıcısı döngü noktasında nicemleme kayması bırakıyor, teknik-seo
 *    ve ios-android'de de aynı şey ölçülmüştü):
 *      crf 26 → dikiş 0,74  oran 1,69×  (168 KB) ✗ eşiği aşıyor
 *      crf 22 → dikiş 0,57  oran 1,29×  (254 KB) ← SEÇİLDİ
 *    BU SAHNE crf 22 İLE BASILIR — uret.js varsayılanı (crf 26) eşiği aşar:
 *      node -e "const m=require('./plan/video-uret/motor.js');
 *               m.uret('modul-pazarlama/meta-ads','pazarlama',
 *                      require('./plan/video-uret/sahne-meta-ads.js'),{crf:22})"
 * 4) OYNATMA (headless Chrome + CDP, GERÇEK ZAMANLI beklenerek;
 *    --autoplay-policy ve --virtual-time-budget KULLANILMADI — DEVIR.md
 *    tuzak #2 ve #4):
 *      normal                        : paused=false, currentTime 2,06 → 3,76
 *      --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *      kaynak meta-ads.mp4 · data-dongu VAR · öğe görünür (rectTop 237)
 *
 * ── FAZ PERİYODİKLİĞİ ───────────────────────────────────────────────────
 * Kesikli akışlar "5 8" deseni (periyot 13), turda 52 px = tam 4 devir.
 * Seçici halkanın turu kapalı (9 parça, başladığı hücreye döner), dişli
 * turda tam 1 tur döner (360°), reklam metin çubukları sin(2π·(faz·2+k)),
 * yuva vurgusu parça-içi konumdan türetilir — hepsi faz 0 = faz 1.
 * Aşama eşikleri yalnız p (canlılık) cinsinden; p pencere dışında 0 olduğu
 * için durak sönerken aşamalar geri sarar ve döngü sıçramaz (modülün ortak
 * davranışı, teknik-seo ile aynı).
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 VERİ ÖLÇÜMÜ' },
  { x: 437, fazMerkez: 0.50, etiket: '02 KATALOG' },
  { x: 812, fazMerkez: 0.80, etiket: '03 A/B TESTİ' },
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
    s += (i === 0 ? olcumKurulumu(d.x, p, faz, a)
       : i === 1 ? katalogDinamik(d.x, p, faz, a)
       : kreatifTest(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · PİKSEL VE CONVERSIONS API KURULUMU (kavram olarak; ad yazılmadı) ─
   Üst: site iskeleti; sol üst köşesindeki kesikli yuvaya küçük etiket parçası
   yukarıdan iner ve oturur — "web sitesine YERLEŞTİRİLEN". Parça soyut bir
   işaretleyici (köşe tırnaklı kare + merkez nokta); herhangi bir ürün simgesi
   değil.
   Orta: siteden aktarma düğümüne iki yol. SOL (tarayıcı) yolunun üstünde
   ızgaralı engelleyici plakası: akış çizgisi plakada BİTER, altı ölü/soluk.
   SAĞ yol sunucu kutusundan (iki raf yuvası — "sunucu taraflı") geçip akmaya
   devam eder. Aktarma düğümü darbenin tam park noktasında (yerel 126,242 —
   faz 0,20'de seritNokta buraya düşüyor) ve BİLEREK yalın bir halka: ilk
   yerleşimde onay işareti buradaydı, darbenin beyaz çekirdeği onu tamamen
   yutuyordu (önizlemede görüldü; teknik-seo da onayını aynı gerekçeyle
   kenara almıştı). Darbe geçerken düğüm kendiliğinden yanar.
   Alt: düğümden inen bağ TEMEL şeridini doldurur; onay halkası şeridin
   SOLUNDA kapanır ("doğru ölçümleme"), şeridin altında iki eş çip (dönüş
   oku = retargeting, sürgüler = optimizasyon) temel dolunca yanar.
   ÖLÇÜ NOTU — DARBE YIKAMASI (merkez 126,242 yarıçap 52; uzaklıklar hesap):
   plaka merkezi (70,162) → 98 px, sunucu kutusu merkezi (182,174) → 88 px,
   onay halkası (38,292) → 101 px, temel çipleri (91/161,323) → 88'er px —
   hepsi diskin dışında; iki yol arasındaki farkı çizimin kendisi (kesilen /
   akmayan dashlar) taşıyor, darbenin ışığı taşımıyor. Temel şeridinin üst
   kenarı diske 44 px'te giriyor — şerit karşılaştırılan bir çift değil tek
   parça olduğu için yıkama bir tarafı kayırmıyor. */
function olcumKurulumu(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- site iskeleti ---------------------------------------------------- */
  const kX = bx + 16, kW = 214, kY = DY + 14, kH = 100;
  s += `<rect x="${kX}" y="${kY}" width="${kW}" height="${kH}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  /* içerik çubukları (sağ sütun) */
  s += `<rect x="${bx + 104}" y="${DY + 30}" width="108" height="9" rx="4.5"
          fill="rgba(255,255,255,${(0.11 + 0.14 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 104}" y="${DY + 46}" width="76" height="7" rx="3.5"
          fill="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 104}" y="${DY + 62}" width="108" height="40" rx="7"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += `<rect x="${bx + 112}" y="${DY + 74}" width="76" height="6" rx="3"
          fill="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 112}" y="${DY + 86}" width="54" height="6" rx="3"
          fill="rgba(255,255,255,${(0.06 + 0.08 * p).toFixed(3)})"/>`;

  /* --- etiket yuvası + oturan parça: "yerleştirilen" -------------------- */
  const sX = bx + 53, sY = DY + 34;
  s += `<rect x="${sX}" y="${sY}" width="34" height="34" rx="8" fill="rgba(255,255,255,.015)"
          stroke="rgba(${A},${(0.18 + 0.30 * p).toFixed(3)})" stroke-width="1.2"
          stroke-dasharray="4 4"/>`;
  const yerles = kis01((p - 0.06) / 0.30);
  const tY = sY + 3 - 14 * (1 - yerles);
  const tOp = 0.25 + 0.75 * yerles;
  s += `<g opacity="${tOp.toFixed(3)}">
          <rect x="${sX + 3}" y="${tY.toFixed(1)}" width="28" height="28" rx="6"
            fill="rgba(${A},${(0.16 + 0.26 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})" stroke-width="1.4"/>
          <circle cx="${sX + 17}" cy="${(tY + 14).toFixed(1)}" r="3.2"
            fill="rgba(255,255,255,${(0.45 + 0.40 * p).toFixed(2)})"/>
          <path d="M${sX + 8} ${(tY + 7).toFixed(1)} h-2 v2 M${sX + 26} ${(tY + 7).toFixed(1)} h2 v2
                   M${sX + 8} ${(tY + 21).toFixed(1)} h-2 v-2 M${sX + 26} ${(tY + 21).toFixed(1)} h2 v-2"
            transform="translate(0,0)" fill="none"
            stroke="rgba(255,255,255,${(0.30 + 0.30 * p).toFixed(2)})" stroke-width="1.3"/>
        </g>`;
  /* parça oturunca kısa vurgu çerçevesi */
  const otur = kis01((yerles - 0.85) / 0.15);
  if (otur > 0.02) {
    s += `<rect x="${sX - 4}" y="${sY - 4}" width="42" height="42" rx="11" fill="none"
            stroke="rgba(255,255,255,${(0.45 * otur * p).toFixed(3)})" stroke-width="1.5"/>`;
  }

  /* --- iki yol: tarayıcı (kesilir) / sunucu (akar) ---------------------- */
  const akis = (faz * 52).toFixed(1);
  /* SOL — tarayıcı yolu: plakaya kadar akar, plakada biter */
  s += `<line x1="${bx + 70}" y1="${kY + kH + 0}" x2="${bx + 70}" y2="${DY + 152}"
          stroke="rgba(${A},${(0.16 + 0.42 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 8" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
  /* engelleyici plakası: ızgaralı filtre levhası */
  s += `<rect x="${bx + 53}" y="${DY + 156}" width="34" height="12" rx="4"
          fill="rgba(255,255,255,${(0.05 + 0.06 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.20 + 0.24 * p).toFixed(3)})" stroke-width="1.3"/>`;
  [61, 70, 79].forEach((gx) => {
    s += `<line x1="${bx + gx}" y1="${DY + 159}" x2="${bx + gx}" y2="${DY + 165}"
            stroke="rgba(255,255,255,${(0.22 + 0.22 * p).toFixed(3)})" stroke-width="1.2"/>`;
  });
  /* plakadan sonrası: ölü hat — akış yok, çok soluk düz çizgi */
  s += `<path d="M${bx + 70} ${DY + 170} V${DY + 204} L${bx + 116} ${DY + 236}"
          fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1.4"/>`;

  /* SAĞ — sunucu yolu: kutudan geçer, toplayıcıya kadar akar */
  s += `<line x1="${bx + 182}" y1="${kY + kH + 0}" x2="${bx + 182}" y2="${DY + 152}"
          stroke="rgba(${A},${(0.16 + 0.42 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 8" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
  /* sunucu kutusu: iki raf yuvası — "sunucu taraflı" */
  s += `<rect x="${bx + 160}" y="${DY + 154}" width="44" height="40" rx="8"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.16 + 0.22 * p).toFixed(3)})" stroke-width="1.3"/>`;
  [161, 177].forEach((ry, ri) => {
    s += `<rect x="${bx + 166}" y="${DY + ry}" width="32" height="10" rx="3" fill="none"
            stroke="rgba(255,255,255,${(0.16 + 0.18 * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += `<circle cx="${bx + 171}" cy="${DY + ry + 5}" r="1.8"
            fill="rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})"/>`;
  });
  s += `<line x1="${bx + 182}" y1="${DY + 194}" x2="${bx + 182}" y2="${DY + 212}"
          stroke="rgba(${A},${(0.16 + 0.42 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 8" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 182} ${DY + 212} L${bx + 136} ${DY + 238}"
          fill="none" stroke="rgba(${A},${(0.16 + 0.42 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 8" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;

  /* --- aktarma düğümü: darbenin park noktasında (126, 242) — yalın halka.
     Onay işareti BİLEREK burada değil: darbenin beyaz çekirdeği tam bu
     noktaya oturuyor, içine çizilen her şey görünmez oluyor (teknik-seo da
     onayını aynı gerekçeyle kenara almıştı). Düğüm darbe geçerken yanar. */
  const ox = bx + 126, oy = DY + 242;
  s += `<circle cx="${ox}" cy="${oy}" r="8.5" fill="rgba(${A},${(0.06 + 0.14 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.55 * p).toFixed(3)})" stroke-width="1.6"/>`;

  /* --- temel şeridi + onay halkası + iki eş çip -------------------------- */
  const temel = kis01((p - 0.60) / 0.30);
  const onay = kis01((p - 0.50) / 0.34);
  s += `<line x1="${ox}" y1="${oy + 10}" x2="${ox}" y2="${DY + 284}"
          stroke="rgba(${A},${(0.12 + 0.38 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="5 8" stroke-dashoffset="-${akis}"/>`;
  s += `<rect x="${bx + 60}" y="${DY + 286}" width="140" height="13" rx="6.5"
          fill="rgba(255,255,255,.035)"
          stroke="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += `<rect x="${bx + 60}" y="${DY + 286}" width="${(140 * temel).toFixed(1)}" height="13" rx="6.5"
          fill="rgba(${A},${(0.24 + 0.42 * p).toFixed(3)})"/>`;
  /* onay halkası: "doğru ölçümleme" — şeridin solunda, darbe diskinin
     tamamen dışında (merkeze 101 px) */
  const ux = bx + 38, uy = DY + 292;
  s += `<line x1="${bx + 51}" y1="${uy}" x2="${bx + 59}" y2="${uy}"
          stroke="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<circle cx="${ux}" cy="${uy}" r="12.6" fill="rgba(${A},${(0.08 + 0.10 * onay).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.56 * (0.3 * p + 0.7 * onay)).toFixed(3)})" stroke-width="1.7"/>`;
  s += `<path d="M${ux - 5.6} ${uy + 0.6} L${ux - 1.6} ${uy + 5} L${ux + 6.2} ${uy - 4.6}"
          fill="none" stroke="rgba(255,255,255,${(0.20 + 0.70 * onay).toFixed(2)})"
          stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="20" stroke-dashoffset="${(20 * (1 - onay)).toFixed(2)}"/>`;
  /* iki çip: retargeting (dönüş oku) + optimizasyon (sürgüler) — EŞİT */
  [bx + 78, bx + 148].forEach((cx0, ci) => {
    const g = 0.25 + 0.75 * temel;                    // ikisinde de aynı
    s += `<rect x="${cx0}" y="${DY + 310}" width="26" height="26" rx="7"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p * g).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.12 + 0.16 * p * g).toFixed(3)})" stroke-width="1.2"/>`;
    const ak = `rgba(${A},${(0.30 + 0.50 * p * g).toFixed(3)})`;
    const bey = `rgba(255,255,255,${(0.30 + 0.30 * p * g).toFixed(3)})`;
    if (ci === 0) {
      /* dönüş oku (retargeting) — kalınlık/boy sürgülerle mürekkep dengesi
         için ölçülerek ayarlandı (ilk sürümde bant farkı %12,7'ydi) */
      s += `<path d="M${cx0 + 20.4} ${DY + 322.5} a7.4 7.4 0 1 1 -3.8 -6.6"
              fill="none" stroke="${ak}" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M${cx0 + 13.0} ${DY + 312.4} l4.2 0.8 -1.0 4.2"
              fill="none" stroke="${ak}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      /* sürgüler (optimizasyon) */
      s += `<line x1="${cx0 + 5.5}" y1="${DY + 319}" x2="${cx0 + 20.5}" y2="${DY + 319}"
              stroke="${bey}" stroke-width="1.7" stroke-linecap="round"/>
            <line x1="${cx0 + 5.5}" y1="${DY + 327}" x2="${cx0 + 20.5}" y2="${DY + 327}"
              stroke="${bey}" stroke-width="1.7" stroke-linecap="round"/>
            <circle cx="${cx0 + 16}" cy="${DY + 319}" r="2.3" fill="${ak}"/>
            <circle cx="${cx0 + 10}" cy="${DY + 327}" r="2.3" fill="${ak}"/>`;
    }
  });

  return s;
}

/* ── 02 · KATALOG TABANLI DİNAMİK REKLAMLAR ──────────────────────────────
   Üst: katalog paneli — 3×3 nötr ürün hücresi (görsel yok, marka yok) ve
   sağında bağ halkaları ("Commerce Manager'a bağlanarak" — yalnız kavram:
   iki geçmeli halka) + üç kayıt çubuğu.
   Seçici halka hücrelerin üstünde KAPALI turda dolaşır (boustrofedon 9 parça,
   başladığı hücreye döner; her hücreye bir varış + bir çıkış düşer — eşit).
   Orta: panelden inen bağ hattı; ucunda turda tam bir tur dönen dişli
   ("otomatik ... kurulur", "manuel üretim olmadan"). Darbe faz 0,50'de tam
   hattın üstünde (yerel 123,177) durur — veri hattı ışığı darbeden alır.
   Dişli İLK yerleşimde tam o noktadaydı ve darbenin beyaz çekirdeği onu
   yutuyordu (önizlemede görüldü); hattın alt ucuna, çerçevenin üstüne
   alındı. İki eş sinyal çipi dişliye bağlanır: göz = "ziyaret ettiği",
   sepet = "sepetine eklediği" — katalog verisi + kullanıcı sinyali dişlide
   birleşip reklamı kurar.
   Alt: jenerik reklam çerçevesi — ürün yuvasındaki kare, halkanın üstünde
   durduğu hücrenin satır/sütununa göre yer değiştirir (dinamik ürün);
   metin çubukları sürekli genişlik değiştirir (dinamik metin); altta adsız
   buton hapı. Platform arayüz öğesi yok.
   ÖLÇÜ NOTU — DARBE YIKAMASI (merkez 123,177 yarıçap 52; uzaklıklar hesap):
   en yakın hücre merkezi (117,105) → 72 px, sinyal çipleri (60/186,221) →
   77'şer px, dişli merkezi (123,230) → 53 px, çerçeve üst kenarı (123,248) →
   71 px — hepsi diskin dışında; darbe yalnız kesikli hattı yıkıyor. */
function katalogDinamik(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- katalog paneli --------------------------------------------------- */
  s += `<rect x="${bx + 16}" y="${DY + 14}" width="214" height="112" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;

  /* 3×3 nötr hücre + seçici halkanın kapalı turu */
  const hucre = (c, r) => ({ x: bx + 34 + c * 35, y: DY + 22 + r * 35 });
  const tur = [0, 1, 2, 5, 4, 3, 6, 7, 8];         // boustrofedon, kapalı
  const u = faz % 1;
  const seg = Math.floor(u * 9) % 9;
  const lt = u * 9 - Math.floor(u * 9);
  const e = lt * lt * (3 - 2 * lt);                 // yumuşak parça geçişi
  const kime = (i) => { const k = tur[i % 9]; return hucre(k % 3, Math.floor(k / 3)); };
  const p0 = kime(seg), p1 = kime(seg + 1);
  const hx = p0.x + (p1.x - p0.x) * e, hy = p0.y + (p1.y - p0.y) * e;

  for (let k = 0; k < 9; k++) {
    const h = hucre(k % 3, Math.floor(k / 3));
    const yakin = kis01(1 - (Math.abs(h.x + 13 - (hx + 13)) + Math.abs(h.y + 13 - (hy + 13))) / 34);
    s += `<rect x="${h.x}" y="${h.y}" width="26" height="26" rx="6"
            fill="rgba(255,255,255,${(0.030 + 0.026 * p + 0.060 * yakin * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.10 * p + 0.16 * yakin * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += `<rect x="${h.x + 7}" y="${h.y + 7}" width="12" height="12" rx="3"
            fill="rgba(255,255,255,${(0.05 + 0.05 * p + 0.10 * yakin * p).toFixed(3)})"/>`;
  }
  /* seçici halka */
  s += `<rect x="${(hx - 3).toFixed(1)}" y="${(hy - 3).toFixed(1)}" width="32" height="32" rx="8"
          fill="none" stroke="rgba(${A},${(0.25 + 0.55 * p).toFixed(3)})" stroke-width="1.8"/>`;

  /* bağ halkaları (yalnız kavram) + kayıt çubukları */
  s += `<rect x="${bx + 146}" y="${DY + 30}" width="26" height="14" rx="7" fill="none"
          stroke="rgba(${A},${(0.30 + 0.40 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<rect x="${bx + 160}" y="${DY + 40}" width="26" height="14" rx="7" fill="none"
          stroke="rgba(255,255,255,${(0.22 + 0.24 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<rect x="${bx + 146}" y="${DY + 68}" width="60" height="7" rx="3.5"
          fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 146}" y="${DY + 82}" width="42" height="6" rx="3"
          fill="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 146}" y="${DY + 96}" width="52" height="6" rx="3"
          fill="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})"/>`;

  /* --- bağ hattı + dişli (otomatik) -------------------------------------
     Dişli hattın ALT ucunda, çerçevenin hemen üstünde: darbe faz 0,50'de
     (123,177)'ye park ediyor; ilk yerleşimde dişli tam oradaydı ve darbenin
     beyaz çekirdeği onu tamamen yutuyordu (önizlemede görüldü). Şimdi darbe
     yalnız hattı yıkıyor; dişli disk dışında (merkeze 53 px) ve iki sinyal
     bağı da tam dişliye giriyor — katalog verisi + kullanıcı sinyali dişlide
     birleşip reklamı otomatik kuruyor. */
  const akis = (faz * 52).toFixed(1);
  s += `<circle cx="${bx + 123}" cy="${DY + 126}" r="3.4"
          fill="rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})"/>`;
  s += `<line x1="${bx + 123}" y1="${DY + 130}" x2="${bx + 123}" y2="${DY + 212}"
          stroke="rgba(${A},${(0.18 + 0.46 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="5 8" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
  /* dişli: 8 diş, turda tam 360° — dikişsiz */
  const gx = bx + 123, gy = DY + 230, aci = (faz * 360).toFixed(1);
  let disli = '';
  for (let t = 0; t < 8; t++) {
    const ar = (t / 8) * 2 * Math.PI;
    const x1 = gx + Math.cos(ar) * 10.5, y1 = gy + Math.sin(ar) * 10.5;
    const x2 = gx + Math.cos(ar) * 15.5, y2 = gy + Math.sin(ar) * 15.5;
    disli += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"
                stroke="rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})" stroke-width="3.4"/>`;
  }
  s += `<g transform="rotate(${aci} ${gx} ${gy})">
          <circle cx="${gx}" cy="${gy}" r="10.5" fill="rgba(14,17,24,.70)"
            stroke="rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})" stroke-width="2"/>
          ${disli}
        </g>
        <circle cx="${gx}" cy="${gy}" r="3.4"
          fill="rgba(255,255,255,${(0.35 + 0.40 * p).toFixed(2)})"/>`;

  /* --- iki eş sinyal çipi: göz (ziyaret) + sepet (sepete ekleme) --------
     İLK YERLEŞİM y=196'DAYDI VE ÖLÇÜM %16,9 FARK VERDİ: boru tam göz
     çipinin üstünden geçiyor (yerel y≈193), sepet tarafında ise 26 px
     yukarıdan — göz çipi borunun ışığını alıp "kayırılmış" görünüyordu
     (boş kabukta aynı bantlar %0,0 — fark tümüyle borudandı). Çipler
     borunun altına (y=208) indirildi ve ikisine de aynı koyu zemin plakası
     kondu (teknik-seo'nun satır zemini çözümü). Ölçüm sonrası: %0,7. */
  [[bx + 47, 0], [bx + 173, 1]].forEach(([cx0, ci]) => {
    s += `<rect x="${cx0 - 3}" y="${DY + 205}" width="32" height="32" rx="9"
            fill="rgba(14,17,24,.78)"/>`;
    s += `<rect x="${cx0}" y="${DY + 208}" width="26" height="26" rx="7"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.12 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
    const bey = `rgba(255,255,255,${(0.32 + 0.34 * p).toFixed(3)})`;
    const ak = `rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})`;
    const mx = cx0 + 13, my = DY + 221;
    if (ci === 0) {
      /* göz: tek başına göz simgesi — yüz değil */
      s += `<path d="M${mx - 8} ${my} Q${mx} ${my - 7} ${mx + 8} ${my} Q${mx} ${my + 7} ${mx - 8} ${my} Z"
              fill="none" stroke="${bey}" stroke-width="1.6"/>
            <circle cx="${mx}" cy="${my}" r="2.4" fill="${ak}"/>`;
    } else {
      /* sepet */
      s += `<path d="M${mx - 7} ${my - 4} h14 l-2.6 8 h-8.8 Z" fill="none"
              stroke="${bey}" stroke-width="1.6" stroke-linejoin="round"/>
            <path d="M${mx - 10} ${my - 7} l3 3" stroke="${bey}" stroke-width="1.6" stroke-linecap="round"/>
            <circle cx="${mx - 3.4}" cy="${my + 7.5}" r="1.7" fill="${ak}"/>
            <circle cx="${mx + 3.4}" cy="${my + 7.5}" r="1.7" fill="${ak}"/>`;
    }
    /* çipten dişliye giren sinyal bağı */
    const x1 = ci === 0 ? cx0 + 26 : cx0, x2 = ci === 0 ? bx + 109 : bx + 137;
    s += `<line x1="${x1}" y1="${DY + 221}" x2="${x2}" y2="${DY + 227}"
            stroke="rgba(${A},${(0.14 + 0.36 * p).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="5 8" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
  });

  /* --- dinamik reklam çerçevesi ----------------------------------------- */
  s += `<rect x="${bx + 38}" y="${DY + 248}" width="170" height="82" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.30 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* ürün yuvası: içindeki kare, halkanın durduğu hücreye göre kayar */
  const kSeg = tur[seg];
  const col = kSeg % 3, row = Math.floor(kSeg / 3);
  const vurgu = a.darbe(lt);                        // parça ortasında tepe
  s += `<rect x="${bx + 50}" y="${DY + 262}" width="30" height="30" rx="7"
          fill="rgba(255,255,255,.02)"
          stroke="rgba(${A},${(0.20 + 0.30 * p + 0.22 * vurgu * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${bx + 58 + (col - 1) * 4}" y="${DY + 270 + (row - 1) * 4}" width="14" height="14" rx="3.5"
          fill="rgba(${A},${(0.22 + 0.34 * p).toFixed(3)})"/>`;
  /* dinamik metin çubukları: turda tam 2 devir salınan genişlik */
  const w1 = 72 + 14 * Math.sin(2 * Math.PI * (faz * 2));
  const w2 = 50 + 12 * Math.sin(2 * Math.PI * (faz * 2 + 0.33));
  s += `<rect x="${bx + 92}" y="${DY + 263}" width="${w1.toFixed(1)}" height="9" rx="4.5"
          fill="rgba(255,255,255,${(0.11 + 0.15 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 92}" y="${DY + 279}" width="${w2.toFixed(1)}" height="7" rx="3.5"
          fill="rgba(255,255,255,${(0.07 + 0.11 * p).toFixed(3)})"/>`;
  /* adsız buton hapı */
  s += `<rect x="${bx + 92}" y="${DY + 298}" width="56" height="14" rx="7"
          fill="rgba(${A},${(0.20 + 0.30 * p).toFixed(3)})"/>`;

  return s;
}

/* ── 03 · KREATİF TEST VE OPTİMİZASYON ───────────────────────────────────
   Üst: üç varyasyon çipi — görsel (çerçeve+dağ), video (çerçeve+üçgen),
   metin (üç çubuk). Sayfa üçünü sıralamıyor → birebir aynı ölçü, kontur,
   dolgu, parlaklık formülü; gecikme farkı yok.
   Üç çip TEK düğümde birleşir, düğümden İKİ eş panele dağılır — kazanan
   panel hiçbir çipe doğrudan bağlı değil (tür iması yok).
   Orta: iki test paneli; çerçeve ve iç yer tutucular birebir aynı, merkezler
   darbe noktasına (yerel x=120) eşit uzaklıkta. Sonuç çubukları testP ile
   dolar; sol 0,45'te, sağ 0,78'de durur ve seçim halkası sağın çubuğunu
   işaretler — sayfanın "hangi kreatifin daha güçlü sonuç verdiği belirlenir"
   cümlesi. Çubukların üzerinde SAYI/ÖLÇEK YOK.
   Alt: kazanan panelden inen yay strateji kartına bağlanır; karttaki üç
   mesaj çubuğu ESKİ genişliklerinden YENİ genişliklerine kayar ("mesaj
   stratejisine yön verir" — biri uzar, biri kısalır, biri uzar: yeniden
   düzenleme, "hepsi büyür" iddiası değil). Karttan çıkan kesikli yay sol
   kenardan varyasyon sırasının HİZASINA döner — "SONRAKİ döngünün"
   stratejisi; videonun başa dönmesiyle yay kapanır.
   ÖLÇÜ NOTU — DARBE YIKAMASI: darbe faz 0,80'de yerel (120,204)'te durur.
   Panel alt kenarları 44 px mesafede ve İKİ panel yatayda eşit uzaklıkta
   (59'ar px) — yıkama simetrik, ölçümü dosya başında. Strateji kartının üst
   kenarı 58 px, geri dönüş yayı ≥82 px — yarıçap dışında. */
function kreatifTest(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- üç varyasyon çipi: birebir eş ------------------------------------ */
  const cipX = [bx + 16, bx + 92, bx + 168];
  cipX.forEach((x0, ci) => {
    s += `<rect x="${x0}" y="${DY + 16}" width="62" height="46" rx="9"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.12 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
    const cx = x0 + 31, cy = DY + 39;
    const bey = `rgba(255,255,255,${(0.32 + 0.34 * p).toFixed(3)})`;
    const ak = `rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})`;
    if (ci === 0) {
      /* görsel: çerçeve + nokta + dağ */
      s += `<rect x="${cx - 14}" y="${cy - 11}" width="28" height="22" rx="4" fill="none"
              stroke="${bey}" stroke-width="1.5"/>
            <circle cx="${cx - 7}" cy="${cy - 5}" r="2.4" fill="${ak}"/>
            <path d="M${cx - 11} ${cy + 8} L${cx - 4} ${cy - 1} L${cx + 2} ${cy + 5}
                     L${cx + 6} ${cy + 1} L${cx + 11} ${cy + 8} Z" fill="${ak}" opacity=".8"/>`;
    } else if (ci === 1) {
      /* video: çerçeve + oynat üçgeni */
      s += `<rect x="${cx - 14}" y="${cy - 11}" width="28" height="22" rx="4" fill="none"
              stroke="${bey}" stroke-width="1.5"/>
            <path d="M${cx - 3.5} ${cy - 5.5} L${cx + 6} ${cy} L${cx - 3.5} ${cy + 5.5} Z"
              fill="${ak}"/>`;
    } else {
      /* metin: üç çubuk */
      s += `<rect x="${cx - 12}" y="${cy - 8.5}" width="24" height="3.6" rx="1.8" fill="${bey}"/>
            <rect x="${cx - 12}" y="${cy - 1.8}" width="18" height="3.6" rx="1.8" fill="${bey}"/>
            <rect x="${cx - 12}" y="${cy + 4.9}" width="21" height="3.6" rx="1.8" fill="${ak}"/>`;
    }
    /* çipten düğüme inen bağ */
    s += `<line x1="${cx}" y1="${DY + 62}" x2="${bx + 120}" y2="${DY + 79}"
            stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="1.3"/>`;
  });

  /* --- dağıtım düğümü + iki panele eş bağ ------------------------------- */
  s += `<circle cx="${bx + 120}" cy="${DY + 82}" r="4.5"
          fill="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})"/>`;
  [[bx + 61], [bx + 179]].forEach(([tx]) => {
    s += `<line x1="${bx + 120}" y1="${DY + 86}" x2="${tx}" y2="${DY + 96}"
            stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="1.3"/>`;
  });

  /* --- iki test paneli: çerçeveler birebir eş --------------------------- */
  const testP = kis01((p - 0.20) / 0.36);
  const secim = kis01((p - 0.50) / 0.26);
  const panel = [[bx + 11, 0.45], [bx + 129, 0.78]];
  panel.forEach(([px, oranSonuc], pi) => {
    s += `<rect x="${px}" y="${DY + 96}" width="100" height="64" rx="10"
            fill="rgba(14,17,24,.62)"/>`;
    s += `<rect x="${px}" y="${DY + 96}" width="100" height="64" rx="10"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* iç yer tutucular — iki panelde birebir aynı */
    s += `<rect x="${px + 10}" y="${DY + 106}" width="20" height="20" rx="5"
            fill="rgba(255,255,255,${(0.05 + 0.05 * p).toFixed(3)})"/>`;
    s += `<rect x="${px + 38}" y="${DY + 109}" width="30" height="6" rx="3"
            fill="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})"/>`;
    s += `<rect x="${px + 38}" y="${DY + 121}" width="22" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.06 + 0.08 * p).toFixed(3)})"/>`;
    /* sonuç çubuğu: iz aynı, yalnız DOLU BOY farklı (testin bulgusu) */
    s += `<rect x="${px + 78}" y="${DY + 106}" width="10" height="44" rx="5"
            fill="rgba(255,255,255,.045)"/>`;
    const h = 44 * oranSonuc * testP;
    if (h > 1) {
      s += `<rect x="${px + 78}" y="${(DY + 150 - h).toFixed(1)}" width="10" height="${h.toFixed(1)}"
              rx="${Math.min(5, h / 2).toFixed(1)}"
              fill="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})"/>`;
    }
    /* seçim halkası yalnız güçlü sonuçta */
    if (pi === 1 && secim > 0.02) {
      s += `<circle cx="${px + 83}" cy="${(DY + 150 - h).toFixed(1)}" r="8.5" fill="none"
              stroke="rgba(255,255,255,${(0.60 * secim).toFixed(3)})" stroke-width="1.7"/>`;
    }
  });

  /* --- kazanandan strateji kartına inen yay ----------------------------- */
  const strat = kis01((p - 0.62) / 0.26);
  const yayL = 150;
  s += `<path d="M${bx + 179} ${DY + 162} C${bx + 206} ${DY + 196} ${bx + 206} ${DY + 232} ${bx + 150} ${DY + 264}"
          fill="none" stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.7"
          stroke-linecap="round" stroke-dasharray="${yayL}"
          stroke-dashoffset="${(yayL * (1 - strat)).toFixed(1)}"/>`;
  /* uç oku: eşikte PAT diye belirmesin — opaklığı strat ile sürekli */
  const okOp = kis01((strat - 0.80) / 0.20);
  if (okOp > 0.01) {
    s += `<path d="M${bx + 156} ${DY + 256} L${bx + 150} ${DY + 264} L${bx + 160} ${DY + 265}"
            fill="none" stroke="rgba(${A},${(0.55 * p * okOp).toFixed(3)})" stroke-width="1.7"
            stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  /* --- strateji kartı: mesaj çubukları yeni düzene kayar ---------------- */
  s += `<rect x="${bx + 35}" y="${DY + 262}" width="170" height="68" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.2"/>`;
  /* yön glyphi: kıvrılan ok */
  s += `<path d="M${bx + 53} ${DY + 314} V${DY + 292} Q${bx + 53} ${DY + 284} ${bx + 61} ${DY + 284} H${bx + 71}"
          fill="none" stroke="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})" stroke-width="1.9"
          stroke-linecap="round"/>
        <path d="M${bx + 67} ${DY + 280.5} L${bx + 71.5} ${DY + 284} L${bx + 67} ${DY + 287.5}"
          fill="none" stroke="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})" stroke-width="1.9"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  /* üç mesaj çubuğu: eski → yeni genişlik (yeniden düzenleme) */
  const eskiW = [58, 84, 44], yeniW = [86, 60, 72];
  const ez = strat * strat * (3 - 2 * strat);
  eskiW.forEach((w0, mi) => {
    const w = w0 + (yeniW[mi] - w0) * ez;
    s += `<rect x="${bx + 92}" y="${DY + 278 + mi * 15}" width="${w.toFixed(1)}" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.10 + 0.13 * p).toFixed(3)})"/>`;
    /* ucunda aksan tutamağı — yönü gösterir, değer göstermez */
    s += `<circle cx="${(bx + 92 + w).toFixed(1)}" cy="${DY + 281.5 + mi * 15}" r="2.6"
            fill="rgba(${A},${(0.25 + 0.40 * p * ez).toFixed(3)})"/>`;
  });

  /* --- sonraki döngüye dönen kesikli yay --------------------------------
     Yay belirli bir çipe DEĞİL, varyasyon sırasının SOL HİZASINA döner ve
     ucu sıraya doğru (sağa) bakar: strateji "sonraki döngünün" TÜM
     varyasyonlarına yön verir, tek türe değil. İlk yerleşimde uç ilk çipin
     (görsel) altına düşüyordu — "strateji görseli besler" gibi okunabilirdi,
     önizlemede görülüp satır hizasına alındı. */
  s += `<path d="M${bx + 35} ${DY + 296} C${bx + 4} ${DY + 268} ${bx + 4} ${DY + 120} ${bx + 8} ${DY + 44}"
          fill="none" stroke="rgba(${A},${(0.10 + 0.30 * strat * p).toFixed(3)})" stroke-width="1.5"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}" stroke-linecap="round"/>`;
  s += `<path d="M${bx + 5} ${DY + 37} L${bx + 12} ${DY + 43} L${bx + 5} ${DY + 49}"
          fill="none" stroke="rgba(${A},${(0.12 + 0.34 * strat * p).toFixed(3)})" stroke-width="1.6"
          stroke-linecap="round" stroke-linejoin="round"/>`;

  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
