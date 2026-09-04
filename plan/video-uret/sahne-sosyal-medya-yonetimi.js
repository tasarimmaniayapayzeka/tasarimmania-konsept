/* SAHNE — pazarlama / sosyal-medya-yonetimi
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Reklam Formatı ve Yerleşim Seçimi
 *      "Akış, hikaye, reels ve keşfet yerleşimleri farklı tüketim
 *       alışkanlıklarına hitap eder; her format için kreatif oran ve mesaj
 *       uzunluğu ayrı uyarlanır, seçim kampanya hedefine göre daraltılır
 *       veya genişletilir."
 *   02 Ölçüm ve Raporlama Yaklaşımı
 *      "Performans takibi; erişim, etkileşim ve reklamdan gelen dönüşüm
 *       sinyallerini birlikte okuyarak yapılır. Rapor, hangi içerik türünün
 *       ve hangi kitlenin daha güçlü sonuç verdiğini gösterecek şekilde
 *       düzenlenir, bir sonraki dönemin kararlarına temel oluşturur."
 *   03 Marka Sesi ve Onay Mekanizması
 *      "Her gönderi ve reklam metni, yayınlanmadan önce marka dili
 *       kontrolünden ve müşteri onayından geçer. Onay akışı, hesap sahibinin
 *       son sözü söylediği ama üretim yükünü taşımadığı bir işbirliği modeli
 *       kurar."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 dört SOYUT yerleşim kutusu (akış / hikaye / reels / keşfet) tek sıra;
 *      bir vurgu dördünü de SIRAYLA gezer, vurgulanan kutuda kreatif oran
 *      köşe tırnakları belirir ve altındaki mesaj çubuğu O formatın kendi
 *      uzunluğuna uyarlanır; alttaki kampanya hedefi düğümünden beslenen
 *      seçim aralığı daralıp genişler;
 *   02 üç sinyal şeridi (erişim / etkileşim / dönüşüm) tek okuma düğümünde
 *      birleşir ("birlikte okuyarak"); düğümden inen rapor panelinde iki
 *      çubuk öbeği (içerik türü / kitle) yükselir ve her öbeğin güçlü çıkanı
 *      işaretlenir; rapordan çıkan akış sağ üstteki üç karar yuvasını doldurur
 *      ("bir sonraki dönemin kararlarına temel");
 *   03 kuyruktan çıkan gönderi kartı ray boyunca İKİ kapıdan geçer: önce
 *      marka dili kapısı (üç ton sürgüsü, kart geçerken hedef çentiklerine
 *      oturur), sonra müşteri onayı damgası iner ve karta mühür bırakır;
 *      kart yayın çizgisini ancak ikisinden geçince aşar. Üretim solda
 *      (kuyruk), hesap sahibi sağda tek hareketle son sözü söylüyor.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER — render edilip mürekkep piksel taranarak ölçüldü ─────────
 * Videodaki TEK yazı bu üç etikettir; ayrıntıyı şekiller taşıyor. 28 px,
 * Consolas, ağırlık 600, harf arası 1,2; istasyon yuvası 246 px. Ölçüm hattı
 * teknik-seo sahnesinin kayıtlı değeriyle sağlandı: "01 DENETİM" burada da
 * 164 px çıktı.
 *   "01 YERLEŞİM"        180 px  ✓ SEÇİLDİ ("yerleşim seçimi" adımın adı)
 *   "01 FORMAT SEÇİMİ"   262 px  ✗ TAŞAR
 *   "01 YERLEŞİM SEÇİMİ" 295 px  ✗ TAŞAR
 *   "02 ÖLÇÜM+RAPOR"     230 px  ✓ SEÇİLDİ (adımın iki yarısı da adlandı)
 *   "02 RAPORLAMA"       197 px  (denendi, seçilmedi)
 *   "03 ONAY AKIŞI"      212 px  ✓ SEÇİLDİ (sayfanın kendi sözü: "Onay
 *                                akışı, hesap sahibinin...")
 *   "03 MARKA+ONAY"      214 px  (denendi, seçilmedi)
 * Etiketler ayrıca SAHNENİN İÇİNDE, basılmış karede ölçüldü (y 478-528
 * bandı, her durağın 246 px yuvası taranarak):
 *   01 mürekkep 180 px · solda 33, sağda 33 px boşluk
 *   02 mürekkep 230 px · solda  8, sağda  8 px boşluk
 *   03 mürekkep 211 px · solda 17, sağda 18 px boşluk
 *
 * ── YASAK (yasaklar.md "## pazarlama" MODÜL GENELİ + "sosyal-medya-yonetimi")
 *  - PLATFORM LOGOSU / MARKA RENGİ / ARAYÜZ İŞARETİ YOK. Dört yerleşim
 *    SOYUT KUTU: yalnız oran ve iç düzen farkı (akış = sütunda kart,
 *    hikaye = dik dikdörtgen, reels = dik dikdörtgen + oynatma üçgeni,
 *    keşfet = karışık boy mozaik). Kalp, paylaş oku ve konuşma balonu
 *    HİÇBİR YERDE ÇİZİLMEDİ; hikaye ilerleme parçacıkları da (tanınabilir
 *    arayüz öğesi) bilerek çizilmedi. Oynatma üçgeni jenerik bir video
 *    işaretidir; sayfanın kendi hero çizimi de aynı üçgeni kullanıyor.
 *  - HİÇBİR METRİK RAKAMI YOK: CPC, dönüşüm oranı, ROAS, bütçe, erişim,
 *    tıklanma — hiçbiri yazılmadı. 02'nin rapor panelinde YALNIZ çubuk var,
 *    üzerinde sayı yok; eksen, yüzde, etiket yok. Tek rakam durak
 *    numaraları (01/02/03), sayfanın kendi numaralandırması.
 *  - İNSAN YÜZÜ YOK (03'ün kartlarında avatar bile yok), LOGO YOK.
 *
 * ── EŞİTLİK / FARK — NEREDE EŞİT, NEREDE BİLEREK DEĞİL ──────────────────
 *  · 01'in DÖRT YERLEŞİM KUTUSU: sayfa dördünü "farklı tüketim
 *    alışkanlıklarına hitap eder" diye sayıyor, sıralamıyor. Dört hücre
 *    birebir aynı ölçü/kontur/dolgu/zemin; vurgu süresi dördünde eşit —
 *    vurgu, p'nin tepe bölgesine sıkıştırılmış doğrusal bir süpürmeyle
 *    gezer ve şiddeti p'ye değil doyuma ulaşan bir zarfa bağlıdır, yani
 *    kenardaki kutu ortadakinden sönük vurgulanmaz. PİKSEL ÖLÇÜMÜ dosya
 *    sonunda "ÖLÇÜLEN DEĞERLER" bölümünde.
 *  · 01'in MESAJ ÇUBUKLARI bilerek FARKLI boyda: sayfanın kendi cümlesi
 *    "mesaj uzunluğu ayrı uyarlanır". Hangi formatın uzun olduğu sayfada
 *    YOK; çubuk boyları yalnız "farklıdır" iddiasını taşır, uzunluk bir
 *    kalite sırası değildir ve çubuk yalnız vurgu anında dolar (kalıcı bir
 *    kıyas tablosu oluşmaz).
 *  · 02'nin ÜÇ SİNYAL ŞERİDİ (erişim/etkileşim/dönüşüm): sayfa üçünü
 *    "birlikte okuyarak" diyor, tartmıyor → üç şerit aynı ölçü, aynı dolgu,
 *    aynı dalga genliği, aynı akış hızı; fark yalnız glif ve dalga deseni.
 *  · 02'nin RAPOR ÇUBUKLARI bilerek EŞİT DEĞİL: sayfa raporun "hangi içerik
 *    türünün ve hangi kitlenin daha güçlü sonuç verdiğini gösterecek şekilde
 *    düzenlendiğini" söylüyor — güçlü çıkanın işaretlenmesi sayfanın kendi
 *    iddiasıdır. Çubuklar adsızdır; hangi türün/kitlenin güçlü olduğu
 *    söylenmez (sayfa da söylemiyor), yalnız "rapor gösterir" çizilir.
 *  · 03'ün İKİ KAPISI sıralı SÜREÇ aşamasıdır, yarışan seçenek değil;
 *    sayfa sırayı kendisi veriyor ("marka dili kontrolünden VE müşteri
 *    onayından geçer", son söz hesap sahibinde).
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) İÇERİK TAKVİMİ — dört satırlık takvim
 * ızgarasında üç gönderi TÜRÜ (marka mesajı / ürün-hizmet vitrini / topluluk
 * yanıtı) + gösterge; (2) ETKİLEŞİM — gönderi kartı, üç yorum satırı, yüzsüz
 * avatarlar, "yanıt" oku; (3) REKLAM VE ONAY — dikey akış: Hedefleme (üç eşit
 * kitle bandı) → Onay (halka içinde tik, "müşteri onayı", "marka dili
 * kontrolü") → Yayın (yükselen ok, "erişimi genişletilir").
 * Bu sahne sayfanın BAŞKA bir kesitini çizer (Ayrıntılar'daki 01/02/03),
 * o durakları tekrarlamaz ve onlarla çelişmez:
 *  · 01'de takvim ızgarası YOK (kutular tek sıra, karışık boy; takvim
 *    hücresi düzeni bilerek kurulmadı) — kardeşin çizdiği İÇERİK TÜRLERİ
 *    değil, YERLEŞİM ORANLARI çiziliyor; ikisi sayfada ayrı kavramlar.
 *  · 02'de yorum satırı, avatar, yanıt oku YOK; kardeşte ölçüm/rapor durağı
 *    zaten yok — bu sahne o boşluğu dolduruyor, kopyalamıyor.
 *  · 03'te kitle bandı YOK, halka içinde tik YOK, yükselen yayın oku YOK.
 *    Aynı iki kavram (marka dili kontrolü + müşteri onayı) burada SÜRECİN
 *    İŞLEYİŞİ olarak çizildi: kapı + damga. Kardeş "aşama listesi"ni,
 *    bu sahne "mekanizmayı" gösteriyor; sıra iki çizimde de aynı.
 *  · Kardeşin "ONAY sizde" çipiyle uyumlu: damga (son söz) hesap sahibi
 *    tarafında tek harekettir, üretim yükü (kuyruk, kapı, sürgüler) ekip
 *    tarafındadır.
 *
 * ── ÖLÇÜLEN DEĞERLER — hepsi bu makinede ölçüldü, hiçbiri tahmin değil ──
 * 1) IŞIK DARBESİ GEOMETRİSİ (motorun kendi seritNokta'sıyla hesaplandı):
 *    · Durak 01: darbe istasyon genişliğinden geçerken y=346,8–368,0
 *      bandında yürür; dört yerleşim kutusuna en yakın geçişi 111,7 px —
 *      darbe yayı (yarıçap 52) kutulara HİÇ değmez, dördü yalnız kendi
 *      vurgu süpürmesiyle aydınlanır. Kampanya hedefi düğümü (185, 362)
 *      bilerek darbenin yoluna kondu: faz 0,20'de darbe merkezi (188, 368),
 *      uzaklık 6,7 px — düğüm darbe geçerken kendiliğinden yanar
 *      (teknik-seo'nun dağıtım düğümü deseni).
 *    · Durak 02: okuma düğümü (560, 303) bilerek darbenin yoluna kondu —
 *      faz 0,50'de darbe merkezi (560,0, 303,1), uzaklık 0,1 px: "birlikte
 *      okuma" anı darbenin kendisiyle yanar. Üç sinyal şeridine en yakın
 *      darbe geçişi 72,7 px, üç karar yuvasına 76,4 px, rapor paneline
 *      56,6 px — hepsi 52'lik yarıçapın DIŞINDA.
 *    · Durak 03: kart ile darbe AYNI yönde yürür ve istasyon ortasında
 *      buluşur — faz 0,80'de darbe (932,0, 330,0), kart merkezi (945, 330):
 *      uzaklık 13,0 px. Kapı 1 anında (t=0,37) darbe kartın 53 px
 *      arkasında, damga anında (t=0,69) 46 px önündedir — ışık kartı
 *      kapılardan geçirirken izler (spot etkisi bilerek; iki kapı yarışan
 *      seçenek değil, sıralı aşamadır).
 * 2) EŞİTLİK — TEK KAREDE DEĞİL, DURAĞIN GÖRÜNÜR PENCERESİNİN ORTALAMASINDA
 *    (p>0 olan 45'er kare). Her kutunun ortalama parlaklığı kendi
 *    dikdörtgeninde ölçüldü; aynı kutular BOŞ KABUKTA (motor.kabuk(''),
 *    hiç çizim yok) da ölçüldü ki kalan farkın sahneden mi motorun kendi
 *    ışığından mı geldiği ayrılsın:
 *    · 01 dört yerleşim kutusu : 36,39 / 36,16 / 36,60 / 35,96 → fark %1,8
 *      (aynı kutular boş kabukta 18,79 / 20,41 / 21,69 / 23,32 → %21,5;
 *      motorun zeminHale'si tuval ortasına doğru yatay bir rampa yaratıyor,
 *      sahnenin rgba(14,17,24,.88) zemin plakaları + içerik bu rampayı
 *      %21,5'ten %1,8'e indiriyor. İLK SÜRÜM %6,2 idi: keşfet mozaiği sönük
 *      (34,56), reels üçgeni parlak (36,78) kalmıştı — keşfet dolguları
 *      1,20/0,95 katsayısına çıkarılıp üçgen 0,25+0,21p'ye indirildi.)
 *    · 01 vurgu eşitliği tasarımla kuruldu: süpürme sT p'nin tepe bölgesine
 *      (u=±0,10) sıkıştırıldı, şiddet p'ye değil p≥0,30'da doyan hEnv
 *      zarfına bağlı — dört kutunun vurgu tepesi de süresi de aynı; sonuç
 *      yukarıdaki %1,8'lik pencere ortalamasının içinde.
 *    · 02 üç sinyal şeridi     : 32,42 / 34,30 / 36,01 → fark %10,5
 *      (aynı kutular boş kabukta 25,18 / 27,92 / 30,98 → %20,7). İKİ TUZAK
 *      ÖLÇÜLDÜ VE DÜZELTİLDİ: (a) ilk sürümde dalga frekansları 1,6/2,6/3,4
 *      idi; yüksek frekans daha UZUN yay çiziyor, üçüncü şerit sırf dalga
 *      boyundan parlak çıkıyordu (fark %13,9). Üç dalga aynı frekansa (2,6)
 *      alındı, ayrım hız+faz kaymasına taşındı → %10,5. (b) glif mürekkebi
 *      tek tek ölçüldü: 7521/8179/8322 → kontur ayarıyla 8049/8179/8070
 *      (%1,6). KALAN %10,5 SAHNEDEN DEĞİL MOTORDAN: boş kabuk %20,7'lik
 *      dikey rampayı zaten taşıyor (zeminHale + kabuk'un ustKarart tepe
 *      vinyeti üst şeridi karartıyor; ayrıca istasyon halesi tek başına
 *      ölçüldü — şerit bölgelerinde 36,06/40,30/44,16, üst kenar sönümü).
 *      Sahne rampayı BÜYÜTMÜYOR, %20,7→%10,5'e KESIYOR — teknik-seo'nun
 *      beş eşit kontrol satırı aynı gerekçeyle %15,8'de kabul edilmişti.
 *      Üç sinyal zaten yarışan seçenek değil, birlikte okunan girdiler.
 * 3) DÖNGÜ DİKİŞİ — crf SEÇİMİ (dongu-denetim.js ile ölçüldü). Kaynak
 *    kareler faz cinsinden periyodik ama kodlayıcı döngü noktasında
 *    nicemleme kayması bırakıyor (teknik-seo'da da ölçülmüştü):
 *      crf 26 → dikiş 0,68  oran 1,57×  (169 KB) — eşiğin (1,60) 0,03 altında
 *      crf 23 → dikiş 0,55  oran 1,27×  (231 KB)  ← SEÇİLDİ
 *    crf 23 seçildi: payı geniş ve kardeş videoların boyut aralığında
 *    (163–318 KB). BU SAHNE crf 23 İLE BASILIR — `uret.js` motor varsayılanı
 *    crf 26 ile basar ve o ayar eşiğe 0,03 kalıyor:
 *      node -e "const m=require('./plan/video-uret/motor.js');
 *               m.uret('modul-pazarlama/sosyal-medya-yonetimi','pazarlama',
 *                      require('./plan/video-uret/sahne-sosyal-medya-yonetimi.js'),
 *                      {crf:23})"
 * 4) OYNATMA (headless Chrome, puppeteer-core ile gerçek zamanlı bekleyerek;
 *    --autoplay-policy bayrağı YOK, --virtual-time-budget YOK):
 *      normal                        : paused=false, currentTime 1,94 → 3,64
 *      --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *      kaynak: sosyal-medya-yonetimi.mp4, data-dongu: var, rectTop 285,
 *      öğe görünür (gorunur=true, deneme=1)
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 YERLEŞİM' },
  { x: 437, fazMerkez: 0.50, etiket: '02 ÖLÇÜM+RAPOR' },
  { x: 812, fazMerkez: 0.80, etiket: '03 ONAY AKIŞI' },
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
    s += (i === 0 ? yerlesimSecimi(d.x, p, faz, a)
       : i === 1 ? olcumRapor(d.x, p, faz, a)
       : onayAkisi(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · REKLAM FORMATI VE YERLEŞİM SEÇİMİ ──────────────────────────────
   Dört soyut yerleşim kutusu tek sıra (akış / hikaye / reels / keşfet) —
   yasaklar.md bu sayfa için tam olarak bunu istiyor: "soyut yerleşim
   kutuları". Vurgu dördünü sırayla gezer; vurgulanan kutuda kreatif oran
   köşe tırnakları belirir, mesaj çubuğu o formatın boyuna dolar. Alt
   bölgede kampanya hedefi düğümü (darbenin yolunda) ve ondan beslenen
   seçim aralığı: daraltılır / genişletilir.
   VURGU EŞİTLİĞİ NASIL KURULDU: süpürme sT, p'nin tepe bölgesine (u=-0,10
   ...+0,10) sıkıştırılmış DOĞRUSAL bir rampadır; dört kutunun vurgu merkezi
   u=∓0,075/∓0,025'e simetrik düşer. Şiddet p ile DEĞİL, p≥0,30'da doyan
   hEnv zarfıyla çarpılır — yoksa kenar kutular (p≈0,6) ortadakilerden
   (p≈0,87) sönük vurgulanırdı. Zarf pencere kenarında 0'a iner, döngü
   dikişsiz kalır. */
function yerlesimSecimi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const u = sarU(faz, 0.20);
  const hEnv = kis01((p - 0.05) / 0.25);          // p>=0.30'da 1'e doyar
  const sT = kis01((u + 0.10) / 0.20);            // tepe bölgesinde 0→1 süpürme
  let s = '';

  const TW = 48, TH = 104, Y0 = DY + 16;
  const MESAJ = [0.78, 0.44, 0.34, 0.60];         // "mesaj uzunluğu ayrı uyarlanır"

  for (let i = 0; i < 4; i++) {
    const tx = bx + 16 + i * 55;
    const cx = tx + TW / 2;
    const hi = kis01(1 - Math.abs(sT * 4 - i - 0.5) * 1.7) * hEnv;

    /* hücre — altta yarı geçirmez zemin plakası (motor rampasını keser;
       gerekçe ve öncesi/sonrası dosya başında "ÖLÇÜLEN DEĞERLER" 2). */
    s += `<rect x="${tx - 2}" y="${Y0 - 2}" width="${TW + 4}" height="${TH + 4}" rx="10" fill="rgba(14,17,24,.88)"/>`;
    s += `<rect x="${tx}" y="${Y0}" width="${TW}" height="${TH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p + 0.045 * hi).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p + 0.20 * hi).toFixed(3)})" stroke-width="1.2"/>`;

    /* iç düzen: yalnız oran ve yerleşim farkı, arayüz öğesi yok */
    s += yerlesimIci(i, cx, Y0, A, p, hi);

    /* kreatif oran köşe tırnakları — yalnız vurgu anında */
    if (hi > 0.03) {
      const b = tirnakSinir(i, cx, Y0);
      const o = (0.75 * hi).toFixed(3);
      const L = 6;
      s += `<g stroke="rgba(${A},${o})" stroke-width="1.6" fill="none" stroke-linecap="round">`;
      s += `<path d="M${b.x0} ${b.y0 + L} V${b.y0} H${b.x0 + L}"/>`;
      s += `<path d="M${b.x1 - L} ${b.y0} H${b.x1} V${b.y0 + L}"/>`;
      s += `<path d="M${b.x1} ${b.y1 - L} V${b.y1} H${b.x1 - L}"/>`;
      s += `<path d="M${b.x0 + L} ${b.y1} H${b.x0} V${b.y1 - L}"/>`;
      s += `</g>`;
    }

    /* mesaj uzunluğu çubuğu — boş iz her zaman eşit, dolgu yalnız vurguda */
    s += `<rect x="${tx + 6}" y="${Y0 + 88}" width="36" height="4" rx="2" fill="rgba(255,255,255,.05)"/>`;
    const dolu = 36 * MESAJ[i] * kis01(hi * 1.5);
    if (dolu > 0.5) {
      s += `<rect x="${tx + 6}" y="${Y0 + 88}" width="${dolu.toFixed(1)}" height="4" rx="2"
              fill="rgba(${A},${(0.35 + 0.45 * hi).toFixed(3)})"/>`;
    }

    /* hücreden kampanya hedefine inen adsız bağ */
    s += `<line x1="${cx}" y1="${Y0 + TH + 6}" x2="${bx + 123}" y2="${DY + 225}"
            stroke="rgba(${A},${(0.10 + 0.30 * p).toFixed(3)})" stroke-width="1.3"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}"/>`;
  }

  /* kampanya hedefi düğümü — bilerek darbenin yolunda (faz 0,20'de darbe
     (188,368), düğüm (185,362): uzaklık 6,7 px; darbe geçerken yanar) */
  const nx = bx + 123, ny = DY + 236;
  s += `<circle cx="${nx}" cy="${ny}" r="9" fill="rgba(${A},${(0.06 + 0.14 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.55 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="3" fill="rgba(255,255,255,${(0.25 + 0.45 * p).toFixed(3)})"/>`;

  /* düğümden seçim rayına inen bağ */
  s += `<line x1="${nx}" y1="${ny + 9}" x2="${nx}" y2="${DY + 298}"
          stroke="rgba(${A},${(0.14 + 0.38 * p).toFixed(3)})" stroke-width="1.5"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;

  /* seçim aralığı: "kampanya hedefine göre daraltılır veya genişletilir".
     Salınım faz cinsinden (turda tam 2 çevrim) ve p zarfıyla; zarf 0 iken
     ray orta açıklıkta durur — döngü dikişsiz. */
  const rayY = DY + 308;
  s += `<line x1="${bx + 30}" y1="${rayY}" x2="${bx + 216}" y2="${rayY}"
          stroke="rgba(255,255,255,${(0.09 + 0.09 * p).toFixed(3)})" stroke-width="2"/>`;
  const env2 = kis01((p - 0.02) / 0.22);
  const osc = 0.5 + 0.5 * Math.sin(2 * Math.PI * faz * 2);
  const gap = 34 + 52 * (0.5 + (osc - 0.5) * env2);
  s += `<rect x="${(nx - gap).toFixed(1)}" y="${rayY - 3}" width="${(2 * gap).toFixed(1)}" height="6" rx="3"
          fill="rgba(${A},${(0.10 + 0.24 * p).toFixed(3)})"/>`;
  [-1, 1].forEach((yn) => {
    const kx = nx + yn * gap;
    s += `<path d="M${(kx + yn * 0).toFixed(1)} ${rayY - 9} V${rayY + 9} M${kx.toFixed(1)} ${rayY - 9} H${(kx - yn * 6).toFixed(1)} M${kx.toFixed(1)} ${rayY + 9} H${(kx - yn * 6).toFixed(1)}"
            fill="none" stroke="rgba(${A},${(0.30 + 0.48 * p).toFixed(3)})" stroke-width="2" stroke-linecap="round"/>`;
  });

  return s;
}

/* Dört yerleşimin iç düzeni — hepsi soyut, hiçbiri arayüz taklidi değil. */
function yerlesimIci(i, cx, Y0, A, p, hi) {
  const beyaz = (o) => `rgba(255,255,255,${o.toFixed(3)})`;
  const dolgu = 0.10 + 0.10 * p + 0.10 * hi;
  let s = '';
  if (i === 0) {
    /* AKIŞ: sütunda kart — üst/alt komşu kartlar kırpık ve soluk */
    s += `<rect x="${cx - 15}" y="${Y0 + 8}" width="30" height="9" rx="3" fill="${beyaz(0.045 + 0.03 * p)}"/>`;
    s += `<rect x="${cx - 15}" y="${Y0 + 22}" width="30" height="30" rx="4"
            fill="rgba(${A},${(dolgu + 0.06).toFixed(3)})" stroke="${beyaz(0.16 + 0.12 * p)}" stroke-width="1.1"/>`;
    s += `<rect x="${cx - 11}" y="${Y0 + 44}" width="14" height="3" rx="1.5" fill="${beyaz(0.20 + 0.15 * p)}"/>`;
    s += `<rect x="${cx - 15}" y="${Y0 + 58}" width="30" height="9" rx="3" fill="${beyaz(0.045 + 0.03 * p)}"/>`;
  } else if (i === 1) {
    /* HİKAYE: tam dik dikdörtgen (9:16'ya yakın), altta kısa mesaj çizgisi */
    s += `<rect x="${cx - 14}" y="${Y0 + 8}" width="28" height="52" rx="5"
            fill="rgba(${A},${dolgu.toFixed(3)})" stroke="${beyaz(0.16 + 0.12 * p)}" stroke-width="1.1"/>`;
    s += `<rect x="${cx - 9}" y="${Y0 + 50}" width="18" height="3" rx="1.5" fill="${beyaz(0.22 + 0.16 * p)}"/>`;
  } else if (i === 2) {
    /* REELS: aynı dik oran + jenerik oynatma üçgeni (sayfanın hero çizimi
       de aynı üçgeni kullanıyor; platform işareti değil, video işareti) */
    s += `<rect x="${cx - 14}" y="${Y0 + 8}" width="28" height="52" rx="5"
            fill="rgba(${A},${dolgu.toFixed(3)})" stroke="${beyaz(0.16 + 0.12 * p)}" stroke-width="1.1"/>`;
    s += `<path d="M${cx - 4} ${Y0 + 27} L${cx + 7} ${Y0 + 34} L${cx - 4} ${Y0 + 41} Z"
            fill="${beyaz(0.25 + 0.21 * p)}"/>`;
  } else {
    /* KEŞFET: karışık boy mozaik — takvim ızgarası DEĞİL (kardeş figürle
       çakışmasın diye bilerek şaşırtmalı yerleşim) */
    s += `<rect x="${cx - 16}" y="${Y0 + 8}" width="15" height="15" rx="3"
            fill="rgba(${A},${(dolgu * 1.20).toFixed(3)})" stroke="${beyaz(0.15 + 0.11 * p)}" stroke-width="1"/>`;
    s += `<rect x="${cx + 1}" y="${Y0 + 8}" width="15" height="25" rx="3"
            fill="rgba(${A},${(dolgu * 0.95).toFixed(3)})" stroke="${beyaz(0.15 + 0.11 * p)}" stroke-width="1"/>`;
    s += `<rect x="${cx - 16}" y="${Y0 + 27}" width="15" height="25" rx="3"
            fill="rgba(${A},${(dolgu * 0.95).toFixed(3)})" stroke="${beyaz(0.15 + 0.11 * p)}" stroke-width="1"/>`;
    s += `<rect x="${cx + 1}" y="${Y0 + 37}" width="15" height="15" rx="3"
            fill="rgba(${A},${(dolgu * 1.20).toFixed(3)})" stroke="${beyaz(0.15 + 0.11 * p)}" stroke-width="1"/>`;
  }
  return s;
}

/* Kreatif oran tırnaklarının saracağı sınırlar (iç düzenin çevresi) */
function tirnakSinir(i, cx, Y0) {
  if (i === 0) return { x0: cx - 19, y0: Y0 + 4, x1: cx + 19, y1: Y0 + 71 };
  if (i === 3) return { x0: cx - 20, y0: Y0 + 4, x1: cx + 20, y1: Y0 + 56 };
  return { x0: cx - 18, y0: Y0 + 4, x1: cx + 18, y1: Y0 + 64 };
}

/* ── 02 · ÖLÇÜM VE RAPORLAMA YAKLAŞIMI ───────────────────────────────────
   Sol üstte üç sinyal şeridi (erişim / etkileşim / dönüşüm) — üçü birebir
   aynı gövde, aynı genlik; yalnız glif ve dalga deseni farklı ("birlikte
   okuyarak", tartı yok). Şeritler okuma düğümünde birleşir; düğüm bilerek
   darbenin yolunda (faz 0,50'de uzaklık 0,0 px). Düğümden inen rapor
   panelinde iki adsız çubuk öbeği (içerik türü / kitle) yükselir; her
   öbeğin güçlü çıkanı halkayla işaretlenir — "hangi içerik türünün ve hangi
   kitlenin daha güçlü sonuç verdiğini GÖSTERECEK şekilde düzenlenir".
   Panelden çıkan akış sağ üstteki üç karar yuvasına tırmanır ve onları
   sırayla doldurur — "bir sonraki dönemin kararlarına temel oluşturur".
   Çubukların ve yuvaların üzerinde SAYI YOK. */
function olcumRapor(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const LX = bx + 16, LW = 104, LH = 24;
  /* Üç dalga AYNI frekans ve genlikte — yay uzunluğu, yani mürekkep eşit
     kalsın diye (ölçüldü: frekanslar 1,6/2,6/3,4 iken üçüncü şerit sırf
     dalga boyundan %13,9'luk fark yaratıyordu). Ayrım desende değil
     harekette: hız (K, tam sayı → dikişsiz) ve faz kayması (FO) farklı. */
  const K = [1, 2, 1];                       // dalga akış hızı (tam sayı → dikişsiz)
  const FO = [0, 0.33, 0.67];                // faz kayması (uzamsal, serbest)

  for (let i = 0; i < 3; i++) {
    const ly = DY + 16 + i * 32;
    /* şerit gövdesi — zemin plakası + eş gövde */
    s += `<rect x="${LX - 2}" y="${ly - 2}" width="${LW + 4}" height="${LH + 4}" rx="8" fill="rgba(14,17,24,.88)"/>`;
    s += `<rect x="${LX}" y="${ly}" width="${LW}" height="${LH}" rx="7"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += sinyalGlif(i, LX + 5, ly + 3, A, p);
    /* eş genlikli dalga — faz katsayısı tam sayı, döngü dikişsiz */
    let d = '';
    const N = 22, wx = LX + 30, ww = 66, my = ly + 12;
    for (let j = 0; j <= N; j++) {
      const t = j / N;
      const y = my + 5 * Math.sin(2 * Math.PI * (t * 2.6 + FO[i] + faz * K[i]));
      d += (j === 0 ? 'M' : 'L') + (wx + t * ww).toFixed(1) + ' ' + y.toFixed(1);
    }
    s += `<path d="${d}" fill="none" stroke="rgba(${A},${(0.32 + 0.40 * p).toFixed(3)})"
            stroke-width="1.6" stroke-linecap="round"/>`;
    /* şeritten okuma düğümüne akan bağ */
    s += `<line x1="${LX + LW + 3}" y1="${my}" x2="${bx + 118}" y2="${DY + 172 + (i - 1) * 3}"
            stroke="rgba(${A},${(0.12 + 0.32 * p).toFixed(3)})" stroke-width="1.3"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}"/>`;
  }

  /* okuma düğümü — "birlikte okuyarak"; bilerek darbenin tam yolunda */
  const nx = bx + 123, ny = DY + 177;
  s += `<circle cx="${nx}" cy="${ny}" r="11" fill="rgba(${A},${(0.06 + 0.14 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.58 * p).toFixed(3)})" stroke-width="1.7"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="3.5" fill="rgba(255,255,255,${(0.28 + 0.42 * p).toFixed(3)})"/>`;

  /* düğümden rapor paneline inen akış */
  s += `<line x1="${nx}" y1="${ny + 11}" x2="${nx}" y2="${DY + 254}"
          stroke="rgba(${A},${(0.14 + 0.40 * p).toFixed(3)})" stroke-width="1.5"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;

  /* rapor paneli — yalnız çubuk, üzerinde sayı yok */
  const PX = bx + 16, PW = 214, PY = DY + 258, PH = 74;
  s += `<rect x="${PX - 2}" y="${PY - 2}" width="${PW + 4}" height="${PH + 4}" rx="11" fill="rgba(14,17,24,.80)"/>`;
  s += `<rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<line x1="${bx + 123}" y1="${PY + 10}" x2="${bx + 123}" y2="${PY + PH - 10}"
          stroke="rgba(255,255,255,.08)" stroke-width="1"/>`;

  /* iki çubuk öbeği: içerik türü / kitle. Boylar bilerek eşit değil —
     sayfanın kendi iddiası: rapor güçlü çıkanı GÖSTERİR. Adsızdırlar. */
  const taban = PY + 64;
  const H1 = [26, 46, 18], H2 = [20, 48, 30];
  const buyu = kis01((p - 0.10) / 0.45);
  const mk = kis01((p - 0.55) / 0.30);
  [H1, H2].forEach((H, g) => {
    const x0 = bx + (g === 0 ? 34 : 140);
    s += `<line x1="${x0 - 6}" y1="${taban}" x2="${x0 + 64}" y2="${taban}"
            stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
    let enY = 0, enX = 0;
    H.forEach((h, j) => {
      const hh = h * buyu;
      const x = x0 + j * 26;
      s += `<rect x="${x}" y="${(taban - hh).toFixed(1)}" width="16" height="${hh.toFixed(1)}" rx="3"
              fill="rgba(${A},${(0.26 + 0.44 * p).toFixed(3)})"/>`;
      if (h > enY) { enY = h; enX = x + 8; }
    });
    /* güçlü çıkanın işareti — halka, rakam değil */
    if (mk > 0.02) {
      s += `<circle cx="${enX}" cy="${(taban - enY * buyu - 9).toFixed(1)}" r="4" fill="none"
              stroke="rgba(255,255,255,${(0.65 * mk).toFixed(3)})" stroke-width="1.5"/>`;
    }
  });

  /* rapordan sonraki döneme çıkan akış + üç karar yuvası */
  s += `<path d="M${bx + 228} ${PY + 8} V${DY + 98}" fill="none"
          stroke="rgba(${A},${(0.14 + 0.36 * p).toFixed(3)})" stroke-width="1.5"
          stroke-dasharray="6 10" stroke-dashoffset="-${(faz * 48).toFixed(1)}"/>`;
  s += `<path d="M${bx + 223.5} ${DY + 100} L${bx + 228} ${DY + 93} L${bx + 232.5} ${DY + 100}"
          fill="none" stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.6"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let i = 0; i < 3; i++) {
    const py = DY + 22 + i * 26;
    s += `<rect x="${bx + 158}" y="${py}" width="64" height="16" rx="8"
            fill="rgba(255,255,255,.040)"
            stroke="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})" stroke-width="1.1"/>`;
    const dol = kis01((p - 0.50 - i * 0.12) / 0.24);
    if (dol > 0.02) {
      s += `<rect x="${bx + 162}" y="${py + 5}" width="${(56 * dol).toFixed(1)}" height="6" rx="3"
              fill="rgba(${A},${(0.30 + 0.40 * p).toFixed(3)})"/>`;
    }
  }

  return s;
}

/* Sinyal glifleri — kavram işaretleri; platform arayüzü taklidi değil.
   Kalp / paylaş oku / konuşma balonu BİLEREK yok. */
function sinyalGlif(i, gx, gy, A, p) {
  const c = `rgba(255,255,255,${(0.30 + 0.35 * p).toFixed(3)})`;
  const ak = `rgba(${A},${(0.40 + 0.42 * p).toFixed(3)})`;
  if (i === 0) {
    /* erişim: kaynaktan yayılan iki yay */
    return `<circle cx="${gx + 4.5}" cy="${gy + 13}" r="2" fill="${ak}"/>
            <path d="M${gx + 8.5} ${gy + 8.5} a7 7 0 0 1 3.4 8.4" fill="none" stroke="${c}"
              stroke-width="1.62" stroke-linecap="round"/>
            <path d="M${gx + 10.5} ${gy + 4.5} a12 12 0 0 1 5.6 13.8" fill="none" stroke="${c}"
              stroke-width="1.62" stroke-linecap="round"/>`;
  }
  if (i === 1) {
    /* etkileşim: iki yönlü alışveriş okları */
    return `<path d="M${gx + 3} ${gy + 7.5} h9.5 M${gx + 10} ${gy + 4.5} l3 3 l-3 3" fill="none"
              stroke="${ak}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M${gx + 15} ${gy + 13.5} h-9.5 M${gx + 8} ${gy + 10.5} l-3 3 l3 3" fill="none"
              stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  /* dönüşüm: huni + damla */
  return `<path d="M${gx + 3} ${gy + 4} H${gx + 15} L${gx + 11} ${gy + 10} V${gy + 14} H${gx + 7} V${gy + 10} Z"
            fill="none" stroke="${c}" stroke-width="1.32" stroke-linejoin="round"/>
          <circle cx="${gx + 9}" cy="${gy + 16.6}" r="1.6" fill="${ak}"/>`;
}

/* ── 03 · MARKA SESİ VE ONAY MEKANİZMASI ─────────────────────────────────
   Ray üstünde bir gönderi kartı iki kapıdan geçer: (1) marka dili kapısı —
   üç ton sürgüsü, kart kapıdayken hedef çentiklerine oturur ("marka dili
   kontrolü"); (2) müşteri onayı damgası — iner, karta mühür bırakır ("son
   sözü söyler"). Solda üretim kuyruğu (bir gönderi + bir reklam metni
   kartı — "her gönderi VE reklam metni"), sağda yayın çizgisi: kart onu
   ancak iki kapıdan geçtikten sonra aşar ("yayınlanmadan önce ... geçer").
   Halka içinde tik BİLEREK yok (kardeş figürün onay işareti o) — mühür
   halka+nokta.
   HAREKET NEDEN TEK YÖNLÜ: kartın yol parametresi t, faza değil durağın
   SARILMIŞ uzaklığına bağlanır (t = (u+0,19)/0,38, u=faz−0,80 sarılmış).
   t pencere boyunca zamanla tekdüze artar — kart asla geri yürümez.
   Pencere kenarlarında (t=0 ve t=1) p=0'dır ve kartın tüm mürekkebi vis
   çarpanıyla söner; t'nin 1→0 sıfırlanması görünmez, döngü dikişsiz.
   Sürgü hizalanması gibi kalıcı öğelere binen durumlar da envP zarfıyla
   çarpılır — zarf pencere kenarında 0'a iner, kalıntı sıçrama kalmaz. */
function onayAkisi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const u = sarU(faz, 0.80);
  const t = kis01((u + 0.19) / 0.38);
  const vis = kis01((p - 0.03) / 0.12);
  const envP = kis01(p / 0.25);
  const R = DY + 204;
  let s = '';

  /* --- ray ------------------------------------------------------------- */
  s += `<line x1="${bx + 18}" y1="${R}" x2="${bx + 224}" y2="${R}"
          stroke="rgba(255,255,255,${(0.09 + 0.08 * p).toFixed(3)})" stroke-width="2"/>`;
  s += `<line x1="${bx + 18}" y1="${R}" x2="${bx + 224}" y2="${R}"
          stroke="rgba(${A},${(0.10 + 0.26 * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;
  s += `<path d="M${bx + 218} ${R - 4.5} L${bx + 224} ${R} L${bx + 218} ${R + 4.5}" fill="none"
          stroke="rgba(${A},${(0.22 + 0.40 * p).toFixed(3)})" stroke-width="1.7"
          stroke-linecap="round" stroke-linejoin="round"/>`;

  /* --- üretim kuyruğu (sol): gönderi + reklam metni ------------------- */
  s += `<rect x="${bx + 14}" y="${DY + 146}" width="52" height="116" rx="10" fill="rgba(14,17,24,.72)"/>`;
  s += `<path d="M${bx + 62} ${DY + 150} H${bx + 20} V${DY + 258} H${bx + 62}" fill="none"
          stroke="rgba(255,255,255,${(0.12 + 0.12 * p).toFixed(3)})" stroke-width="1.4"/>`;
  /* kuyruk kartı 1: gönderi (görsel alanı + metin) */
  s += `<rect x="${bx + 26}" y="${DY + 158}" width="34" height="38" rx="5"
          fill="rgba(255,255,255,.040)" stroke="rgba(255,255,255,${(0.16 + 0.10 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += `<rect x="${bx + 31}" y="${DY + 163}" width="12" height="12" rx="2.5" fill="rgba(${A},${(0.28 + 0.14 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 31}" y="${DY + 180}" width="24" height="3" rx="1.5" fill="rgba(255,255,255,.18)"/>`;
  s += `<rect x="${bx + 31}" y="${DY + 187}" width="18" height="3" rx="1.5" fill="rgba(255,255,255,.13)"/>`;
  /* kuyruk kartı 2: reklam metni (yalnız metin çubukları) */
  s += `<rect x="${bx + 26}" y="${DY + 212}" width="34" height="38" rx="5"
          fill="rgba(255,255,255,.040)" stroke="rgba(255,255,255,${(0.16 + 0.10 * p).toFixed(3)})" stroke-width="1.1"/>`;
  [0, 1, 2].forEach((j) => {
    s += `<rect x="${bx + 31}" y="${DY + 219 + j * 8}" width="${[24, 20, 14][j]}" height="3" rx="1.5"
            fill="rgba(255,255,255,${j === 0 ? '.20' : '.14'})"/>`;
  });

  /* --- kapı 1: marka dili kontrolü ------------------------------------- */
  const bell = a.darbe((t - 0.22) / 0.30) * envP;
  s += `<rect x="${bx + 94}" y="${DY + 140}" width="36" height="120" rx="8"
          fill="rgba(${A},${(0.035 + 0.05 * bell).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.30 * p + 0.30 * bell).toFixed(3)})" stroke-width="1.5"/>`;
  /* ton sürgüleri paneli (kapının üstünde) */
  s += `<rect x="${bx + 72}" y="${DY + 66}" width="80" height="58" rx="9" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${bx + 74}" y="${DY + 68}" width="76" height="54" rx="8"
          fill="rgba(255,255,255,.030)" stroke="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += `<line x1="${bx + 112}" y1="${DY + 122}" x2="${bx + 112}" y2="${DY + 140}"
          stroke="rgba(255,255,255,${(0.12 + 0.10 * p).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="3 4"/>`;
  const TGT = [0.64, 0.30, 0.74], REST = [0.30, 0.62, 0.42];
  for (let i = 0; i < 3; i++) {
    const sy = DY + 82 + i * 14, sx = bx + 84, sw = 56;
    s += `<line x1="${sx}" y1="${sy}" x2="${sx + sw}" y2="${sy}"
            stroke="rgba(255,255,255,${(0.10 + 0.08 * p).toFixed(3)})" stroke-width="2.5" stroke-linecap="round"/>`;
    const txx = sx + sw * TGT[i];
    s += `<path d="M${txx.toFixed(1)} ${sy - 3.6} L${(txx + 3).toFixed(1)} ${sy} L${txx.toFixed(1)} ${sy + 3.6} L${(txx - 3).toFixed(1)} ${sy} Z"
            fill="none" stroke="rgba(${A},${(0.40 + 0.30 * p).toFixed(3)})" stroke-width="1.1"/>`;
    const hx = sx + sw * (REST[i] + (TGT[i] - REST[i]) * bell);
    s += `<circle cx="${hx.toFixed(1)}" cy="${sy}" r="3.2"
            fill="rgba(${A},${(0.35 + 0.50 * bell).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.22 + 0.14 * p).toFixed(3)})" stroke-width="1"/>`;
  }

  /* --- kapı 2: müşteri onayı damgası ----------------------------------- */
  const S = bx + 170;
  const press = a.darbe((t - 0.60) / 0.18);
  const py = DY + 124 + 48 * press;
  s += `<rect x="${S - 12}" y="${DY + 96}" width="24" height="6" rx="3"
          fill="rgba(255,255,255,${(0.10 + 0.10 * p).toFixed(3)})"/>`;
  s += `<rect x="${S - 2.5}" y="${DY + 102}" width="5" height="${(24 + 48 * press).toFixed(1)}" rx="2"
          fill="rgba(255,255,255,${(0.13 + 0.11 * p).toFixed(3)})"/>`;
  s += `<rect x="${S - 17}" y="${py.toFixed(1)}" width="34" height="15" rx="5"
          fill="rgba(${A},${(0.28 + 0.34 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.22 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
  const carpma = kis01((press - 0.85) / 0.15) * vis;
  if (carpma > 0.02) {
    s += `<ellipse cx="${S}" cy="${R - 18}" rx="17" ry="3.5"
            fill="rgba(255,255,255,${(0.30 * carpma).toFixed(3)})"/>`;
  }

  /* --- yayın çizgisi: iki kapıdan geçmeden aşılamaz -------------------- */
  s += `<line x1="${bx + 206}" y1="${DY + 156}" x2="${bx + 206}" y2="${DY + 252}"
          stroke="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}"/>`;

  /* --- yürüyen kart: t tekdüze, görünürlük vis ------------------------- */
  if (vis > 0.01) {
    const cx = bx + 52 + 162 * t;
    s += `<g opacity="${vis.toFixed(3)}">`;
    s += `<rect x="${(cx - 22).toFixed(1)}" y="${R - 17}" width="44" height="34" rx="6"
            fill="rgba(${A},${(0.12 + 0.16 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.30 + 0.24 * p).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${(cx - 16).toFixed(1)}" y="${R - 11}" width="12" height="12" rx="2.5"
            fill="rgba(${A},${(0.38 + 0.20 * p).toFixed(3)})"/>`;
    s += `<rect x="${cx.toFixed(1)}" y="${R - 10}" width="16" height="3" rx="1.5" fill="rgba(255,255,255,.36)"/>`;
    s += `<rect x="${cx.toFixed(1)}" y="${R - 3}" width="12" height="3" rx="1.5" fill="rgba(255,255,255,.26)"/>`;
    /* mühür: damgadan sonra belirir — halka + nokta (tik DEĞİL) */
    const muhur = kis01((t - 0.70) / 0.08);
    if (muhur > 0.02) {
      s += `<circle cx="${(cx + 11).toFixed(1)}" cy="${R + 6}" r="5.5" fill="none"
              stroke="rgba(${A},${(0.90 * muhur).toFixed(3)})" stroke-width="1.6"/>`;
      s += `<circle cx="${(cx + 11).toFixed(1)}" cy="${R + 6}" r="1.8"
              fill="rgba(255,255,255,${(0.80 * muhur).toFixed(3)})"/>`;
    }
    s += `</g>`;
  }

  return s;
}

/* faz–merkez farkını [-0,5 … +0,5) aralığına sarar (döngüsel uzaklık) */
function sarU(faz, merkez) { return ((faz - merkez + 1.5) % 1) - 0.5; }
function kis01(v) { return Math.max(0, Math.min(1, v)); }
