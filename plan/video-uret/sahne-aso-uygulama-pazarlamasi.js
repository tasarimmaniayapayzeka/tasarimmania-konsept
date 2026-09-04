/* SAHNE — mobil-uygulama / aso-uygulama-pazarlamasi
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Anahtar Kelime ve Rakip Analizi
 *      "Rakip uygulamaların başlık, alt başlık ve açıklama alanları taranarak
 *       kapsanmayan kelime fırsatları çıkarılır; bu liste mağaza metnine
 *       yerleştirilecek öncelik sırasına dönüştürülür."
 *   02 Görsel Set ve Video Üretimi
 *      "Ekran görüntüsü sırası, ikon varyantları ve tanıtım videosu senaryosu,
 *       mağaza sayfasındaki ilk tepkiyi hedefleyecek şekilde kurgulanır ve A/B
 *       testiyle karşılaştırılan varyantlardan kazanan canlıya alınır."
 *   03 Kampanya ve Elde Tutma Raporlaması
 *      "İndirme kampanyasının kanal bazlı performansı ile elde tutma kohortu tek
 *       raporda birleştirilir; bu görünüm bütçenin hangi kanala yönlendirileceğine
 *       karar verilmesini sağlar."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık darbesi
 * boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve KENDİ işini yapar:
 *   01 üç rakip kartının başlık / alt başlık / açıklama alanları bir tarama
 *      çizgisiyle yukarıdan aşağı taranır; taranan alanlar kapsama satırına
 *      işlenir; satırda KAPSANMAYAN üç hücre kesikli kalır, o üç hücreden çıkan
 *      bağlar tek düğümde toplanır ve düğümden alta, soldan sağa okunan bir
 *      öncelik rayına sırayla üç fırsat çipi iner; rayın ucundaki kesikli yuva
 *      (mağaza metni) en son dolar;
 *   02 iki varyant sütunu YAN YANA durur — her sütunda bir ikon karosu, üç
 *      ekran görüntüsü kartı ve dört parçalı tanıtım videosu şeridi vardır;
 *      iki sütun BİREBİR aynı parçalardan kurulur, tek fark kartların SIRASI
 *      ve ikon içindeki işaretin yönü (sayfanın test ettiği şey tam olarak bu
 *      "kombinasyon"); altta test rayında bir işaretçi iki sütun arasında gidip
 *      gelir, sonuç netleşince kazanan sütunun altında durur ve o sütunun
 *      dizilimi alttaki canlı yuvaya yerleşir;
 *   03 üstte iki ayrı kaynak (solda kanal bazlı performans satırları, sağda
 *      elde tutma kohort tablosu) tek düğümde birleşir; düğümün altındaki TEK
 *      rapor çerçevesinde her kanal için performans çubuğu ve kohort hücreleri
 *      artık aynı sütunda durur; rapordan inen ok bütçe rayını besler, ray üç
 *      parçaya bölünür ve paylar sürekli yeniden dağılır, rayın ALTINDAKİ
 *      sap+toparlak işaretçi paylar arasında KAYARAK o an en geniş payın
 *      hizasına gelir.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER ───────────────────────────────────────────────────────────
 * Üç etiket sayfanın kendi başlıklarının kısaltmasıdır. Videodaki TEK yazı bu üç
 * etikettir; ayrıntıyı şekiller taşır. Ölçülen genişlikler aşağıda.
 *
 * ── YASAK (yasaklar.md "## mobil" modül geneli + "aso-uygulama-pazarlamasi") ──
 *  - MAĞAZA LOGOSU / ONA BENZEYEN SİMGE YOK: ikon karolarının içine yalnız halka
 *    + kısa çizgi kondu; harf, alışveriş çantası, çok renkli işaret ve OYNAT
 *    ÜÇGENİ hiçbir karonun içinde yok. DÜZELTİLDİ (denetim): burada önce "üçgen
 *    hiçbir yerde çizilmedi" yazıyordu, DOĞRU DEĞİLDİ — sahnede bir kapalı üçgen
 *    var. Sayıldı: dosyadaki beş <path>'ten yalnız biri kapalı (Z) ve o da
 *    03'teki akış okunun ucudur (aşağı bakan dolu ok başı, x=nx, DY+285–292);
 *    onay işareti ile ikon çizgileri açık yollardır. Ok ucu bir OK'tur, ikon
 *    değildir ve hiçbir karonun içinde durmaz. Tanıtım videosu "oynat düğmesi"
 *    olarak değil, dört parçalı bir şerit ve vurgulanmış açılış parçası olarak
 *    çizildi.
 *  - MAĞAZA MARKASI / KANAL MARKASI YOK: sayfa metninde geçen kanal adları
 *    (arama ve sosyal reklam kanalları) videoda YAZILMADI, üç kanal adsız satır.
 *  - RAKAM YOK: indirme, sürüm, cihaz, test sayısı, A/B testi sonucu yüzdesi,
 *    puan, yıldız, bütçe, oran — hiçbiri yazılmadı. Bütçe rayında ve performans
 *    çubuklarında sayı yok, yalnız pay genişliği var. Tek rakam durak numaraları
 *    (01/02/03), sayfanın kendi numaralandırması.
 *  - İNSAN YÜZÜ YOK, LOGO YOK.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) MAĞAZA SAYFASI — telefon çerçevesi içinde
 * mağaza ürün sayfası maketi: arama alanı, kare uygulama ikonu, yatay kayan üç
 * ekran görüntüsü kartı, açıklama çubukları, "Yükle" düğmesi ve sağda kesik
 * çizgilerle bağlanan dört etiket (Anahtar kelime / Başlık / Alt başlık / Ekran
 * görüntüsü); (2) KANAL SEÇİMİ — solda üç ADLI kanal kutusu, sağda tek "Uygulama"
 * düğümü, kutulardan düğüme kalınlıkları farklı oklar, üstte "bütçe dağılımı",
 * altta "Tek kanala bağlı kalınmaz"; (3) ELDE TUTMA — zaman ekseni üzerinde aşağı
 * eğilen eğri, altı taranmış alan, dört işaret noktası ve boş çubuk etiketler,
 * "Elde tutma" kartında değer yerine tire, altta kohort adımları (kayıt olma /
 * ilk işlem / tekrar açma) ve "Ölçüm indirme anında bitmez".
 * Bu sahne aynı sayfanın BAŞKA bir kesitini çizer, o üç durağı tekrarlamaz:
 *  · Kardeş figür SONUCUN NESNESİNİ çiziyor (mağaza sayfası → kanal ağı → eğri).
 *    Bu sahne ÜRETİM İŞİNİ çiziyor (kelime analizi → görsel/video üretimi →
 *    raporlama). İkisi sayfanın iki ayrı bölümünden geliyor: kardeş figür
 *    "Derinlemesine" altındaki akış, bu sahne "Ayrıntılar"daki 01/02/03 listesi.
 *  · 01'de TELEFON ÇERÇEVESİ YOK, arama alanı YOK, "Yükle" düğmesi YOK, kesik
 *    çizgiyle bağlanan alan etiketleri YOK. Kartlar mağaza sayfası değil RAKİP
 *    kartlarıdır ve içlerinde yalnız üç alan bandı vardır.
 *  · 02'nin ekran görüntüsü kartları kardeş figürdeki "yatay kayan üç kart"ın
 *    kopyası değil: orada kartlar bir telefon çerçevesinin içinde kaydırma
 *    göstergesiyle duruyor, burada çerçeve dışında ve İKİ AYRI SIRALAMA olarak
 *    yan yana duruyor — çizilen şey kartın kendisi değil SIRASI.
 *  · 03'te EĞRİ ÇİZİLMEDİ. Kohort, kardeş figürün eğrisi değil, sayfanın kendi
 *    cümlesindeki "kohort tablosu"dur: soldan sağa solan hücrelerden oluşan bir
 *    ızgara. Zaman ekseni, taranmış alan, işaret noktası, "Elde tutma" kartı ve
 *    adlandırılmış kohort adımları yok. Bu, kardeş figürün düşen eğrisiyle
 *    ÇELİŞMİYOR (hücreler de sağa doğru soluyor), onu tekrarlamadan doğruluyor.
 *  · 03'ün kanalları ADSIZ ve kardeş figürdeki "kalınlığı farklı oklar" deseni
 *    kullanılmadı; bütçe tek bir rayın üç parçaya bölünmesiyle gösteriliyor.
 *    Kardeş figürün açıklaması "ok kalınlıkları bir pay ya da sıralama değil,
 *    bütçenin yeniden dağıtıldığını anlatır" diyor; buradaki paylar da sabit bir
 *    sıralama göstermiyor, sürekli yeniden dağılıyor (ölçüm aşağıda).
 *
 * ── ÖLÇÜLEN DEĞERLER — hepsi bu makinede ölçüldü, hiçbiri tahmin değil ──
 * Ölçüm betikleri depoya konmadı (paralel oturumlar aynı klasörde çalışıyordu);
 * her maddenin YÖNTEMİ aşağıda yazılı, tekrar üretilebilir.
 *
 * 1) ETİKET GENİŞLİĞİ. Kod hesabıyla değil, etiket tek başına siyah zemine
 *    basılıp mürekkep kutusu piksel piksel taranarak ölçüldü (28 px, Consolas,
 *    ağırlık 600, harf arası 1,2). İstasyon 246 px:
 *      "01 KELİME"           146 px  ✓  SEÇİLDİ
 *      "02 GÖRSEL SET"       214 px  ✓  SEÇİLDİ
 *      "03 TEK RAPOR"        197 px  ✓  SEÇİLDİ
 *      "03 RAPORLAMA"        198 px  ✓  (sığıyor; "TEK RAPOR" adımın birleştirme
 *                                        işini daha iyi adlandırdığı için seçildi)
 *      "01 KELİME SETİ"      229 px  ✓  (sığıyor ama "SET" 02'nin etiketiyle çakışıyor)
 *      "01 KELİME AÇIĞI"     246 px  ✓  (tam sınırda, tek piksel payı yok — alınmadı)
 *      "01 RAKİP TARAMA"     248 px  ✗  TAŞAR — yalnız 2 px. Kod hesabı
 *                                        (16,6 px/karakter) "sığar" diyordu;
 *                                        render ölçümü yakaladı. Etiketin
 *                                        kısaltılma gerekçesi bu.
 *      "02 GÖRSEL+VİDEO"     248 px  ✗  TAŞAR
 *      "01 ANAHTAR KELİME"   279 px  ✗  TAŞAR
 *      "01 KELİME BOŞLUĞU"   280 px  ✗  TAŞAR (sayfanın kendi terimi, denendi)
 *    Videodaki TEK yazı bu üç etikettir; en küçük yazı boyu 28 px.
 *
 * 2) EŞİTLİK — 02'nin İKİ VARYANT SÜTUNU. Sayfa A/B testinden söz ediyor: test
 *    ADİL olmalı, yani karşılaştırma sırasında iki sütun aynı ağırlıkta durmalı.
 *    Bunu KODA BAKARAK değil ölçerek doğrulamak için sütunlar öyle kuruldu ki
 *    iki sütunun parçaları BİREBİR aynı: aynı karo, aynı üç kart, aynı şerit —
 *    tek fark kartların SIRASI (permütasyon) ve ikon işaretinin yönü. Kazananın
 *    işareti bilerek sütunların DIŞINA, alttaki test rayına kondu; böylece
 *    sütunların kendisi döngü boyunca hiç değişmiyor.
 *    120 karenin TAMAMINDA iki sütun kutusunun (A: x453–553, B: x567–667,
 *    y140–280) ortalama parlaklığı ölçüldü:
 *      sahne      A = 33,18   B = 33,38   fark %0,60
 *      boş kabuk  A = 29,62   B = 30,00   fark %1,29
 *    "Boş kabuk" = aynı ızgara + boru + cam panel + ışık darbesi, ama durakların
 *    İÇERİĞİ çizilmemiş. Yani motorun kendi ışığı (darbenin y yolu faz 0,50
 *    çevresinde simetrik değil) zaten %1,29'luk bir eğim yaratıyor; sahnenin
 *    çizimi bu eğimi %0,60'a DÜŞÜRÜYOR, büyütmüyor. Kalan fark bir üstünlük
 *    işareti değil sahne aydınlatmasıdır.
 *    KAZANAN NEDEN HEP A: sayfa "kazanan varyant canlıya alınır" diyor, yani bir
 *    kazanan çizilmek zorunda. İki sütun soyut yer tutucudur ve aynı üç desenin
 *    iki permütasyonudur; hangisinin kazandığı gerçek bir tarafı temsil etmiyor.
 *    A/B TESTİ SONUCU YÜZDESİ YAZILMADI (yasaklar.md).
 *
 * 3) EŞİTLİK — 03'ün ÜÇ KANALI. Sayfa kanalları SIRALAMIYOR; "bütçenin hangi
 *    kanala yönlendirileceği" kampanya sonucuna göre değişiyor, kardeş figürün
 *    açıklaması da ok kalınlıklarının "bir pay ya da sıralama değil" olduğunu
 *    yazıyor. Bu yüzden paylar 120° kaydırmalı kosinüslerle sürekli yeniden
 *    dağılıyor (toplamları sabit → ray hep dolu).
 *    ÖLÇÜM DÖNGÜ ORTALAMASI DEĞİL, GÖRÜNÜR PENCERE ORTALAMASI. Önce yanlış
 *    düşünüldü, notu bırakıyorum: "üç kosinüsün toplamı sabit, döngü
 *    ortalamasında üçü de eşit" doğru ama İLGİSİZ — izleyici bu durağı yalnız
 *    faz 0,61–0,99 arasında görüyor. Ölçüm, durağın görünür olduğu 45 karede
 *    ve canlilik ile ağırlıklandırılarak yapıldı. Bütçe rayındaki üç payın
 *    piksel genişliği (y = 438 satırı taranarak):
 *      2 çevrimlik ilk sürüm : 38,8 / 73,2 / 75,9 px   yayılım %64,7  ✗
 *      4 çevrimlik son sürüm : 66,6 / 63,2 / 67,5 px   yayılım %6,59  ✓
 *    "En geniş pay" hangi kanaldaysa orada geçen süre:
 *      piksel ölçümü : %37,3 / %30,0 / %32,7   yayılım %21,9
 *      sürekli hesap : %34,3 / %33,0 / %32,7   yayılım %4,85
 *    İkisi arasındaki fark TASARIM DEĞİL YUVARLAMA: paylar birbirine 1 px'ten
 *    yakınken kazananı tam sayıya yuvarlama belirliyor ve 45 karede birkaç
 *    karelik kayma yüzdeyi oynatıyor. Görünen şey %6,6'lık genişlik farkı ve
 *    üç kanalın da sırayla en geniş olması — sabit bir sıralama yok.
 *    RAPORUN ÜÇ SÜTUNU aynı karelerde VE AYNI CANLILIK AĞIRLIĞIYLA ölçüldü
 *    (kutu x854/924/994, genişlik 50, y306–384; ölçüt luma 0,299R+0,587G+0,114B):
 *      sahne      48,22 / 49,07 / 48,23   yayılım %1,77
 *      boş kabuk  50,10 / 52,31 / 51,09   yayılım %4,31
 *    AĞIRLIĞI UNUTMA (denetimde tam bu oldu): ağırlıksız tekrar ölçüm sahne
 *    %2,70 / kabuk %2,38 verir, yani iddia TERSİNE dönmüş gibi görünür. Ağırlık
 *    keyfî değil — durak faz 0,617–0,983 arasında görünüyor ve o pencerenin iki
 *    ucunda canlilik 0,2'nin altında, yani ekranda neredeyse hiç yok; ağırlıksız
 *    ortalama görünmeyen kareleri görünenler kadar sayar.
 *    Darbe x ekseninde tüm paneli süpürdüğü için üç sütun neredeyse aynı ışığı
 *    alıyor; sahnenin çizimi motorun %4,31'lik eğimini %1,77'ye indiriyor.
 *    ÖLÇÜM KUTUSU TUZAĞI: ilk ölçümde sütun kutuları y280'den başlıyordu ve
 *    raporun BAŞLIK ÇUBUĞUNU (x840–898, y289–296) birinci sütuna katıyordu;
 *    sonuç %8,97 çıkıp "sol sütun kayırılmış" gibi görünüyordu. Kutular başlık
 *    ayıracının altına çekilince gerçek değer %1,77 oldu.
 *
 * 4) DÖNGÜ DİKİŞİ — crf SEÇİMİ. Kaynak kareler faz cinsinden periyodik ama mp4
 *    kodlayıcısı döngü noktasında nicemleme kayması bırakıyor. Aynı sahne üç
 *    ayarla basıldı (dongu-denetim.js, eşik 1,60):
 *      crf 26 → dikiş 0,72  oran 1,64×  (187 KB)  ✗ EŞİĞİ AŞIYOR
 *      crf 24 → dikiş 0,62  oran 1,40×  (230 KB)  ✓
 *      crf 22 → dikiş 0,54  oran 1,21×  (286 KB)  ✓ SEÇİLDİ
 *    crf 22 seçildi: payı geniş ve kardeş videoların boyut aralığında
 *    (163–318 KB). BU SAHNE crf 22 İLE BASILIR — `uret.js` motorun varsayılanı
 *    crf 26 ile basar ve o ayar eşiği AŞAR:
 *      node -e "const m=require('./plan/video-uret/motor.js');
 *               m.uret('modul-mobil/aso-uygulama-pazarlamasi','mobil',
 *                 require('./plan/video-uret/sahne-aso-uygulama-pazarlamasi.js'),{crf:22})"
 *
 * 5) OYNATMA (headless Chrome + CDP, _vd.html ile, gerçek zamanlı beklenerek;
 *    --autoplay-policy bayrağı YOK, --virtual-time-budget YOK — sanal zaman
 *    medya saatini ilerletmiyor):
 *      normal                        : paused=false, currentTime 1,97 → 3,67
 *      --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *      kaynak: aso-uygulama-pazarlamasi.mp4 · data-dongu: var · öğe görünür
 *      (rectTop 238) · satır içi gözlemci bagla.js tarafından kaldırıldı
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 KELİME' },
  { x: 437, fazMerkez: 0.50, etiket: '02 GÖRSEL SET' },
  { x: 812, fazMerkez: 0.80, etiket: '03 TEK RAPOR' },
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
    s += (i === 0 ? kelimeAnalizi(d.x, p, faz, a)
       : i === 1 ? gorselSet(d.x, p, faz, a)
       : tekRapor(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · ANAHTAR KELİME VE RAKİP ANALİZİ ────────────────────────────────
   Üst: üç rakip kartı, her birinde sayfanın saydığı üç alan (başlık, alt
   başlık, açıklama). Bir tarama çizgisi kartların üstünden yukarıdan aşağı
   geçer; hangi alanın hizasındaysa o alan üç kartta AYNI ANDA canlanır —
   taranan şey rakip değil ALAN, sayfa da rakipleri sıralamıyor.
   Orta: kapsama satırı. Rakiplerin kapsadığı hücreler dolar, KAPSANMAYAN üç
   hücre kesikli kalır — "kapsanmayan kelime fırsatları" bunlar.
   Alt: üç fırsat tek düğümde toplanıp öncelik rayına iner; ray soldan sağa
   okunur ve ucundaki kesikli yuva ("mağaza metnine yerleştirilecek") en son
   dolar.
   ÖLÇÜ NOTU — IŞIK DARBESİ NEREYE DÜŞÜYOR (ölçüldü, tahmin değil): bu durakta
   darbe merkezi görünür pencere boyunca (faz 0,017–0,383) y ekseninde 335 ile
   368 arasında geziyor, yani DY+209 ile DY+242 arasında; yarıçapı 52 ve
   darbeGrad %100'de tamamen saydam. Yani DY+157'nin ÜSTÜ ve DY+294'ün ALTI
   darbeden HİÇ ışık almıyor. Karşılaştırılabilir öğeler oraya yerleştirildi:
   üç rakip kartı DY+12–116 (hepsi aynı y'de, yan yana), kapsama satırının yedi
   hücresi tek sırada DY+126–156 (hepsi aynı y). Satır ÖNCE DY+130–160'taydı,
   alt kenarı DY+157'yi 3 px aşıyordu — 4 px yukarı çekildi. Darbenin tam
   ortasına, DY+240'a ise tek bir nesne — fırsat düğümü — kondu; darbe geçerken
   düğüm kendiliğinden yanıyor.
   Öncelik çipleri (DY+288–316) darbe bandının içinde ama HEPSİ AYNI Y'DE ve
   yatay dizili: darbe x ekseninde tüm paneli süpürdüğü için üçü de aynı ışığı
   alıyor. Çiplerin sırası zaten sayfanın kendi iddiası ("öncelik sırasına
   dönüştürülür"), konumla anlatılıyor — parlaklıkla değil. */
function kelimeAnalizi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- üç rakip kartı --------------------------------------------------- */
  const kY = DY + 12, kH = 104, kW = 66;
  const kartX = [bx + 16, bx + 90, bx + 164];

  /* tarama çizgisi — turda tam iki geçiş, kosinüs olduğu için dikişsiz */
  const tara = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
  const taraY = kY + 8 + tara * (kH - 16);

  /* alanların kart içindeki y merkezleri: başlık, alt başlık, açıklama */
  const alanY = [18, 33, 68];

  kartX.forEach((cx0) => {
    s += `<rect x="${cx0}" y="${kY}" width="${kW}" height="${kH}" rx="9"
            fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${cx0}" y="${kY}" width="${kW}" height="${kH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;

    /* başlık alanı */
    const v0 = kis01(1 - Math.abs(taraY - (kY + alanY[0])) / 14) * p;
    s += `<rect x="${cx0 + 9}" y="${kY + 13}" width="48" height="9" rx="4.5"
            fill="rgba(255,255,255,${(0.14 + 0.20 * p + 0.24 * v0).toFixed(3)})"/>`;
    /* alt başlık alanı */
    const v1 = kis01(1 - Math.abs(taraY - (kY + alanY[1])) / 14) * p;
    s += `<rect x="${cx0 + 9}" y="${kY + 29}" width="34" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.11 + 0.16 * p + 0.22 * v1).toFixed(3)})"/>`;
    /* alan ayıracı */
    s += `<line x1="${cx0 + 9}" y1="${kY + 44}" x2="${cx0 + 57}" y2="${kY + 44}"
            stroke="rgba(255,255,255,${(0.06 + 0.08 * p).toFixed(3)})" stroke-width="1"/>`;
    /* açıklama alanı — dört ince satır */
    const v2 = kis01(1 - Math.abs(taraY - (kY + alanY[2])) / 24) * p;
    [48, 44, 40, 34].forEach((w, r) => {
      s += `<rect x="${cx0 + 9}" y="${kY + 52 + r * 10}" width="${w}" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.07 + 0.11 * p + 0.16 * v2).toFixed(3)})"/>`;
    });
    /* karttan kapsama satırına inen besleme — kesikli, turda tam 4 desen */
    s += `<line x1="${cx0 + kW / 2}" y1="${kY + kH + 2}" x2="${cx0 + kW / 2}" y2="${DY + 124}"
            stroke="rgba(${A},${(0.14 + 0.38 * p).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  });

  /* tarama çizgisi — üç kartın üstünden birden geçer.
     ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: ilk sürüm tek bir bulanık (yumusaAz, σ=3,4) çizgiydi;
     1,8 px'lik çizgi σ=3,4 ile yayılınca tepe opaklığı ~0,16'ya düşüyor ve
     önizlemede kartların koyu alt yarısında HİÇ görünmüyordu. Şimdi altta geniş
     bir hale, üstte keskin bir çizgi var. */
  s += `<line x1="${bx + 14}" y1="${taraY.toFixed(1)}" x2="${bx + 232}" y2="${taraY.toFixed(1)}"
          stroke="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})" stroke-width="6"
          stroke-linecap="round" filter="url(#yumusaAz)"/>`;
  s += `<line x1="${bx + 14}" y1="${taraY.toFixed(1)}" x2="${bx + 232}" y2="${taraY.toFixed(1)}"
          stroke="rgba(255,255,255,${(0.16 + 0.46 * p).toFixed(3)})" stroke-width="1.5"
          stroke-linecap="round"/>`;

  /* --- kapsama satırı: yedi hücre, üçü kapsanmıyor ---------------------- */
  const hX = bx + 17, hY = DY + 126, hW = 26, hH = 30, hBos = 5;
  const bosluk = [1, 3, 6];                       // kapsanmayan kelime fırsatları
  /* kapsanan hücreler arasında GECİKME YOK: sayfa onları sıralamıyor, hepsi
     tek eğriyle doluyor (teknik-seo sahnesinde soldan sağa gecikmenin döngü
     ortalamasında %16 fark yarattığı ölçülmüştü). */
  const dol = kis01((p - 0.06) / 0.30);
  for (let i = 0; i < 7; i++) {
    const cx = hX + i * (hW + hBos);
    const bos = bosluk.indexOf(i) >= 0;
    s += `<rect x="${cx}" y="${hY}" width="${hW}" height="${hH}" rx="6"
            fill="${bos ? 'rgba(255,255,255,.020)'
              : `rgba(${A},${(0.10 + 0.46 * dol * (0.35 + 0.65 * p)).toFixed(3)})`}"
            stroke="${bos ? `rgba(${A},${(0.16 + 0.34 * p).toFixed(3)})`
              : `rgba(${A},${(0.16 + 0.38 * dol).toFixed(3)})`}"
            stroke-width="1.3" ${bos ? 'stroke-dasharray="4 4"' : ''}/>`;
    /* kapsanan hücrenin içindeki kelime çubuğu — boş hücrede yok */
    if (!bos) {
      s += `<rect x="${cx + 6}" y="${hY + 13}" width="14" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.16 + 0.30 * dol * p).toFixed(3)})"/>`;
    }
  }

  /* --- boş hücrelerden fırsat düğümüne inen bağlar ---------------------- */
  const nx = bx + 126, ny = DY + 240;
  bosluk.forEach((i) => {
    const cx = hX + i * (hW + hBos) + hW / 2;
    s += `<line x1="${cx}" y1="${hY + hH + 3}" x2="${nx}" y2="${ny - 10}"
            stroke="rgba(${A},${(0.14 + 0.42 * p).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  });
  s += `<circle cx="${nx}" cy="${ny}" r="9" fill="rgba(${A},${(0.06 + 0.16 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.56 * p).toFixed(3)})" stroke-width="1.6"/>`;

  /* --- öncelik rayı: soldan sağa okunur --------------------------------- */
  const rY = DY + 288, cH = 28;
  const cipX = [bx + 18, bx + 84, bx + 140];
  const cipW = [58, 48, 40];
  /* düğümden çiplerin yerine inen kılavuzlar — inişin yolu okunsun diye */
  cipX.forEach((cxk, k) => {
    s += `<line x1="${nx}" y1="${ny + 11}" x2="${cxk + cipW[k] / 2}" y2="${rY - 5}"
            stroke="rgba(${A},${(0.07 + 0.20 * p).toFixed(3)})" stroke-width="1.2"
            stroke-dasharray="3 6" stroke-dashoffset="-${(faz * 45).toFixed(1)}"/>`;
  });
  /* ray */
  s += `<line x1="${bx + 16}" y1="${rY + cH + 8}" x2="${bx + 232}" y2="${rY + cH + 8}"
          stroke="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})" stroke-width="1.4"
          stroke-linecap="round"/>`;
  for (let t = 0; t < 4; t++) {
    s += `<line x1="${bx + 26 + t * 62}" y1="${rY + cH + 4}" x2="${bx + 26 + t * 62}" y2="${rY + cH + 12}"
            stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1.2"/>`;
  }
  /* üç fırsat çipi — düğümden sırayla iner (öncelik sırası) */
  for (let k = 0; k < 3; k++) {
    const gel = kis01((p - 0.20 - k * 0.16) / 0.26);
    if (gel <= 0.001) continue;
    const y = a.karis(ny + 4, rY, gel);
    const x = a.karis(nx - cipW[k] / 2, cipX[k], gel);
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cipW[k]}" height="${cH}" rx="8"
            fill="rgba(${A},${(0.16 + 0.26 * gel * p).toFixed(3)})"
            stroke="rgba(${A},${(0.24 + 0.46 * gel).toFixed(3)})" stroke-width="1.3"
            opacity="${gel.toFixed(3)}"/>`;
    s += `<circle cx="${(x + 10).toFixed(1)}" cy="${(y + cH / 2).toFixed(1)}" r="3.4"
            fill="rgba(255,255,255,${(0.30 + 0.42 * gel * p).toFixed(3)})" opacity="${gel.toFixed(3)}"/>`;
    s += `<rect x="${(x + 18).toFixed(1)}" y="${(y + 11).toFixed(1)}" width="${cipW[k] - 27}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.24 + 0.36 * gel * p).toFixed(3)})" opacity="${gel.toFixed(3)}"/>`;
  }
  /* rayın ucundaki mağaza metni yuvası — en son dolar */
  const yerles = kis01((p - 0.72) / 0.24);
  const yX = bx + 192, yW = 38;
  s += `<rect x="${yX}" y="${rY}" width="${yW}" height="${cH}" rx="8" fill="rgba(255,255,255,.018)"
          stroke="rgba(${A},${(0.18 + 0.34 * p).toFixed(3)})" stroke-width="1.3" stroke-dasharray="4 4"/>`;
  if (yerles > 0.01) {
    s += `<rect x="${yX + 4}" y="${rY + 4}" width="${(yW - 8)}" height="${cH - 8}" rx="5"
            fill="rgba(${A},${(0.34 * yerles * (0.4 + 0.6 * p)).toFixed(3)})" opacity="${yerles.toFixed(3)}"/>`;
  }
  /* çiplerden yuvaya bakan kısa ok */
  s += `<path d="M${bx + 182} ${rY + cH / 2} H${bx + 189}
          M${bx + 186} ${rY + cH / 2 - 3.6} L${bx + 189.6} ${rY + cH / 2} L${bx + 186} ${rY + cH / 2 + 3.6}"
          fill="none" stroke="rgba(${A},${(0.18 + 0.52 * p).toFixed(3)})" stroke-width="1.6"
          stroke-linecap="round" stroke-linejoin="round"/>`;

  return s;
}

/* ── 02 · GÖRSEL SET VE VİDEO ÜRETİMİ ────────────────────────────────────
   İki varyant sütunu yan yana. Her sütunda sayfanın saydığı üç kalem var:
   ikon varyantı (karo), ekran görüntüsü SIRASI (üç kart) ve tanıtım videosu
   şeridi (dört parça, ilki "açılış" olarak vurgulu).
   İKİ SÜTUN BİREBİR AYNI PARÇALARDAN KURULUR — aynı karo, aynı üç kart, aynı
   şerit. Tek fark kartların SIRASI (aynı üç desen başka permütasyonda) ve ikon
   işaretinin yönü. Sayfanın test ettiği şey tam olarak bu "kombinasyon"dur;
   ağırlık farkı testi haksız kılardı.
   KAZANANIN İŞARETİ SÜTUNLARIN DIŞINDA: sonuç netleşince alttaki test rayındaki
   işaretçi kazanan sütunun altında durur ve onay halkası ORADA belirir; sütunun
   kendisine hiçbir şey eklenmez. Böylece iki sütun döngü boyunca hiç değişmez ve
   eşitlikleri piksel olarak ölçülebilir (ölçüm dosya başında).
   Kazanan sütunun dizilimi alttaki canlı yuvaya yerleşir ("canlıya alınır").
   ÖLÇÜ NOTU — IŞIK DARBESİ (ölçüldü): bu durakta darbe merkezi görünür pencere
   boyunca (faz 0,317–0,683) y ekseninde 292,0–353,1 arasında, yani DY+166 ile
   DY+227 arasında geziyor; x ekseninde ise 332,7'den 787,3'e, yani sütunların
   İKİSİNİN DE üstünden geçiyor. Sütunlar bu yüzden panel merkezine (x 560)
   SİMETRİK kondu: A'nın merkezi 503, B'nin merkezi 617 — ikisi de 57 px uzakta.
   Kalan fark darbenin y yolunun faz 0,50 çevresinde simetrik olmamasından
   geliyor; büyüklüğü ölçüldü ve dosya başında yazılı (%0,60; motorun kendi
   eğimi %1,29). */
function gorselSet(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const colW = 100, colH = 140, colY = DY + 14;
  const colX = [bx + 16, bx + 130];
  /* aynı üç kart deseni, iki ayrı SIRALAMA — test edilen şey bu */
  const sira = [[0, 1, 2], [2, 0, 1]];
  /* ikon işaretinin yönü: aynı çizgi, 90° döndürülmüş → mürekkep birebir aynı */
  const yon = [0, 90];

  colX.forEach((cx0, c) => {
    /* sütun gövdesi — altta yarı geçirmez zemin (akan borunun ışığı sızmasın) */
    s += `<rect x="${cx0}" y="${colY}" width="${colW}" height="${colH}" rx="12"
            fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${cx0}" y="${colY}" width="${colW}" height="${colH}" rx="12"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;

    /* ikon karosu — MAĞAZA İŞARETİ DEĞİL: yalnız halka + kısa çizgi */
    const ix = cx0 + 30, iy = colY + 14;
    s += `<rect x="${ix}" y="${iy}" width="40" height="40" rx="11"
            fill="rgba(255,255,255,${(0.045 + 0.040 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
    s += `<g transform="rotate(${yon[c]} ${ix + 20} ${iy + 20})">
            <circle cx="${ix + 20}" cy="${iy + 20}" r="9" fill="none"
              stroke="rgba(${A},${(0.30 + 0.46 * p).toFixed(3)})" stroke-width="2"/>
            <path d="M${ix + 20} ${iy + 6.5} V${iy + 13}" stroke="rgba(255,255,255,${(0.26 + 0.36 * p).toFixed(3)})"
              stroke-width="2" stroke-linecap="round"/>
          </g>`;

    /* ekran görüntüsü SIRASI — üç kart, aynı üç desen başka sırada */
    const sy = colY + 66;
    for (let i = 0; i < 3; i++) {
      const sx = cx0 + 8 + i * 30;
      s += `<rect x="${sx}" y="${sy}" width="24" height="34" rx="4"
              fill="rgba(255,255,255,${(0.035 + 0.035 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
      s += kartDeseni(sira[c][i], sx, sy, A, p);
    }

    /* tanıtım videosu şeridi — dört parça, ilki açılış (vurgulu) */
    const vy = colY + 112, vx = cx0 + 8;
    for (let i = 0; i < 4; i++) {
      const w = 19.5;
      s += `<rect x="${(vx + i * 21).toFixed(1)}" y="${vy}" width="${w}" height="11" rx="3"
              fill="${i === 0 ? `rgba(${A},${(0.30 + 0.44 * p).toFixed(3)})`
                : `rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})`}"/>`;
    }
  });

  /* --- test rayı: işaretçi iki sütun arasında gidip gelir --------------- */
  const tY = DY + 186, mA = colX[0] + colW / 2, mB = colX[1] + colW / 2;
  s += `<line x1="${bx + 30}" y1="${tY}" x2="${bx + 216}" y2="${tY}"
          stroke="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})" stroke-width="1.4"
          stroke-linecap="round"/>`;
  [mA, mB].forEach((mx) => {
    s += `<line x1="${mx}" y1="${DY + 158}" x2="${mx}" y2="${tY - 5}"
            stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"
            stroke-dasharray="3 4"/>`;
    s += `<line x1="${mx}" y1="${tY - 5}" x2="${mx}" y2="${tY + 5}"
            stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.4"/>`;
  });
  /* karşılaştırma: turda tam iki gidiş-geliş; sonuç netleşince kazananda durur.
     EŞİK ÖLÇÜLDÜ, DÜŞÜRÜLDÜ: ilk sürümde eşik p>0,60 idi; bu durak yalnız
     faz 0,31–0,69 arasında görünüyor ve o eşik yuvayı görünür sürenin ancak
     %40'ında dolduruyordu — önizlemede alttaki büyük yuva döngünün çoğunda
     BOŞ duruyordu. Eşik 0,42'ye indi: yuva görünür sürenin %58'inde doluyor,
     kalanında ise hayalet yer tutucular duruyor (aşağıda). */
  const sonuc = kis01((p - 0.42) / 0.30);
  const salla = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
  const isX = a.karis(a.karis(mA, mB, salla), mA, sonuc);
  s += `<circle cx="${isX.toFixed(1)}" cy="${tY}" r="6.4"
          fill="rgba(${A},${(0.24 + 0.52 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.20 + 0.30 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* onay halkası — SÜTUNUN DEĞİL, rayın üstünde; kazananın hizasında */
  if (sonuc > 0.02) {
    const ox = mA, oy = tY + 22;
    s += `<circle cx="${ox}" cy="${oy}" r="11.5" fill="rgba(${A},${(0.10 * sonuc).toFixed(3)})"
            stroke="rgba(${A},${(0.18 + 0.58 * sonuc).toFixed(3)})" stroke-width="1.6"/>`;
    s += `<path d="M${ox - 5} ${oy + 0.5} L${ox - 1.4} ${oy + 4.4} L${ox + 5.6} ${oy - 4}"
            fill="none" stroke="rgba(255,255,255,${(0.20 + 0.70 * sonuc).toFixed(2)})"
            stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="18" stroke-dashoffset="${(18 * (1 - sonuc)).toFixed(2)}"/>`;
  }

  /* --- canlı yuva: kazanan dizilim mağaza sayfasına alınır -------------- */
  const lY = DY + 228, lX = bx + 16, lW = 214, lH = 102;
  s += `<rect x="${lX}" y="${lY}" width="${lW}" height="${lH}" rx="12" fill="rgba(255,255,255,.016)"
          stroke="rgba(${A},${(0.16 + 0.20 * p).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="5 5" opacity="${(1 - sonuc).toFixed(3)}"/>`;
  s += `<rect x="${lX}" y="${lY}" width="${lW}" height="${lH}" rx="12" fill="rgba(255,255,255,.016)"
          stroke="rgba(${A},${(0.22 + 0.44 * p).toFixed(3)})" stroke-width="1.4"
          opacity="${sonuc.toFixed(3)}"/>`;
  /* hayalet yer tutucular — yuva boşken bile mağaza yuvasının yapısı okunsun;
     kazanan geldikçe sönerler. Kesikli, dolgusuz: "burası henüz boş" demek. */
  if (sonuc < 0.99) {
    const h = (1 - sonuc).toFixed(3);
    const yt = `fill="none" stroke="rgba(255,255,255,${(0.10 + 0.10 * p).toFixed(3)})"
                stroke-width="1.2" stroke-dasharray="4 4"`;
    s += `<g opacity="${h}">`;
    s += `<rect x="${lX + 14}" y="${lY + 14}" width="38" height="38" rx="10" ${yt}/>`;
    s += `<rect x="${lX + 64}" y="${lY + 20}" width="72" height="9" rx="4.5" ${yt}/>`;
    s += `<rect x="${lX + 64}" y="${lY + 36}" width="52" height="7" rx="3.5" ${yt}/>`;
    for (let i = 0; i < 3; i++) {
      s += `<rect x="${lX + 14 + i * 32}" y="${lY + 62}" width="26" height="30" rx="4" ${yt}/>`;
    }
    for (let i = 0; i < 4; i++) {
      s += `<rect x="${lX + 118 + i * 24}" y="${lY + 72}" width="22" height="10" rx="3" ${yt}/>`;
    }
    s += `</g>`;
  }
  if (sonuc > 0.01) {
    /* kazanan sütunun (A) parçaları yuvaya iner */
    const kay = (1 - sonuc) * 30;
    s += `<g opacity="${sonuc.toFixed(3)}" transform="translate(0,${(-kay).toFixed(1)})">`;
    /* ikon */
    const gx = lX + 14, gy = lY + 14;
    s += `<rect x="${gx}" y="${gy}" width="38" height="38" rx="10"
            fill="rgba(255,255,255,${(0.045 + 0.040 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
    s += `<circle cx="${gx + 19}" cy="${gy + 19}" r="8.5" fill="none"
            stroke="rgba(${A},${(0.30 + 0.46 * p).toFixed(3)})" stroke-width="2"/>
          <path d="M${gx + 19} ${gy + 6} V${gy + 12.5}"
            stroke="rgba(255,255,255,${(0.26 + 0.36 * p).toFixed(3)})" stroke-width="2" stroke-linecap="round"/>`;
    /* başlık + alt başlık çubukları */
    s += `<rect x="${gx + 50}" y="${gy + 6}" width="72" height="9" rx="4.5"
            fill="rgba(255,255,255,${(0.16 + 0.24 * p).toFixed(3)})"/>`;
    s += `<rect x="${gx + 50}" y="${gy + 22}" width="52" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
    /* kazanan SIRA ile üç kart */
    const wy = lY + 62;
    for (let i = 0; i < 3; i++) {
      const wx = lX + 14 + i * 32;
      s += `<rect x="${wx}" y="${wy}" width="26" height="30" rx="4"
              fill="rgba(255,255,255,${(0.035 + 0.035 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
      s += kartDeseni(sira[0][i], wx + 1, wy - 2, A, p);
    }
    /* tanıtım videosu şeridi — açılış parçası vurgulu */
    for (let i = 0; i < 4; i++) {
      s += `<rect x="${lX + 118 + i * 24}" y="${wy + 10}" width="22" height="10" rx="3"
              fill="${i === 0 ? `rgba(${A},${(0.30 + 0.44 * p).toFixed(3)})`
                : `rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})`}"/>`;
    }
    s += `</g>`;
  }

  return s;
}

/* Ekran görüntüsü kartının içindeki soyut düzen. ÜÇ DESEN, iki sütunda aynı
   üç desen başka SIRADA kullanılır — böylece iki sütunun toplam mürekkebi
   birebir aynı olur ve A/B testi ağırlıkça adil kalır. */
function kartDeseni(d, sx, sy, A, p) {
  const c = `rgba(255,255,255,${(0.14 + 0.22 * p).toFixed(3)})`;
  const ak = `rgba(${A},${(0.28 + 0.42 * p).toFixed(3)})`;
  if (d === 0) {
    /* üstte geniş görsel alanı, altta iki satır */
    return `<rect x="${sx + 4}" y="${sy + 5}" width="16" height="11" rx="2.5" fill="${ak}"/>
            <rect x="${sx + 4}" y="${sy + 20}" width="16" height="3.4" rx="1.7" fill="${c}"/>
            <rect x="${sx + 4}" y="${sy + 26}" width="11" height="3.4" rx="1.7" fill="${c}"/>`;
  }
  if (d === 1) {
    /* üstte iki satır, altta geniş görsel alanı */
    return `<rect x="${sx + 4}" y="${sy + 5}" width="16" height="3.4" rx="1.7" fill="${c}"/>
            <rect x="${sx + 4}" y="${sy + 11}" width="11" height="3.4" rx="1.7" fill="${c}"/>
            <rect x="${sx + 4}" y="${sy + 18}" width="16" height="11" rx="2.5" fill="${ak}"/>`;
  }
  /* ortada görsel alanı, üstte ve altta birer satır */
  return `<rect x="${sx + 4}" y="${sy + 5}" width="16" height="3.4" rx="1.7" fill="${c}"/>
          <rect x="${sx + 4}" y="${sy + 12}" width="16" height="11" rx="2.5" fill="${ak}"/>
          <rect x="${sx + 4}" y="${sy + 26}" width="11" height="3.4" rx="1.7" fill="${c}"/>`;
}

/* ── 03 · KAMPANYA VE ELDE TUTMA RAPORLAMASI ─────────────────────────────
   Üst: İKİ AYRI kaynak. Solda kanal bazlı performans (üç adsız kanal satırı,
   çubuk boyu payı gösterir), sağda elde tutma kohortu (soldan sağa solan hücre
   tablosu — sayfanın kendi sözü "kohort tablosu"; kardeş figürdeki EĞRİ DEĞİL).
   Orta: iki kaynak tek düğümde birleşir ve altındaki TEK rapor çerçevesine
   iner. Rapor çerçevesinde artık her kanal için performans çubuğu ve o kanalın
   kohort hücreleri AYNI sütunda durur — "tek raporda birleştirilir".
   Alt: rapordan inen ok bütçe rayını besler. Ray üç paya bölünür, paylar sürekli
   yeniden dağılır; üstteki çift çizgili işaretçi o an en geniş payın üstünde
   durur ("bütçenin hangi kanala yönlendirileceğine karar").
   ÜÇ KANAL NEDEN EŞİT ÇİZİLMEDİ: sayfa kanalları sıralamıyor ama "bütçenin
   hangi kanala yönlendirileceği"nin karara bağlandığını söylüyor; kardeş figür
   de ok kalınlıklarının farklı olduğunu ve bunun sabit bir pay değil YENİDEN
   DAĞITIM anlamına geldiğini yazıyor. Bu yüzden paylar sabit değil: üç kanalın
   ağırlığı 120° kaydırmalı kosinüslerle sürekli dönüyor, toplamları sabit
   (1,5) olduğu için ray hep dolu ve döngü ORTALAMASINDA üçü de eşit oluyor.
   ÖLÇÜ NOTU — IŞIK DARBESİ (ölçüldü): bu durakta darbe merkezi görünür pencere
   boyunca (faz 0,617–0,983) y ekseninde 292,3–367,7, yani DY+166 ile DY+242
   arasında geziyor; yarıçapı 52. Üç kanal satırı DİKEY dizili olduğu için
   darbeden farklı ışık alırdı; bu yüzden kaynak paneli DY+12–112 arasına, yani
   darbenin en üst erişiminin (DY+114) tamamen ÜSTÜNE alındı. Raporun üç sütunu
   ise yatay dizili ve hepsi aynı y'de; darbe x ekseninde tüm paneli süpürdüğü
   için üçü de aynı ışığı alıyor — ölçüldü, yayılım %1,77 (motorun kendi eğimi
   %4,31). Bütçe rayı DY+300'de, darbenin en alt erişiminin (DY+294) altında. */
function tekRapor(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* Üç kanalın payı — 120° kaydırmalı kosinüs. Toplamları sabit (2,025) olduğu
     için ray hep dolu ve hiçbir kare taşmıyor.
     TABAN 0,35 VAR: ölçülüp eklendi. Tabansız ilk sürümde kosinüs 0'a inince o
     kanalın payı 192 px'lik rayda 1,2 px'e düşüyordu; önizlemede ray ÜÇ DEĞİL
     İKİ parça gibi okunuyordu ve "bir kanala hiç bütçe verilmiyor" gibi bir
     iddia doğuyordu — sayfa bunu söylemiyor.
     ÇEVRİM SAYISI 4: ölçülüp değiştirildi, ilk sürüm 2 idi. Durak yalnız
     faz 0,61–0,99 arasında görünüyor; 2 çevrimde bu pencereye ancak yarım tur
     düşüyordu ve ÜÇ PAY GÖRÜNÜR PENCEREDE EŞİTLENMİYORDU — ölçüldü, piksel
     genişliği ortalaması 38,8 / 73,2 / 75,9 (yayılım %64,7), yani sabit bir
     sıralama gibi okunuyordu. Sayfa kanalları sıralamıyor. 2/3/4/5/6 çevrim ve
     100 kaydırma değeri, canlilik ile AĞIRLIKLANDIRILMIŞ pencere ortalaması
     üzerinden tarandı; 4 çevrim + 0,40 kaydırma seçildi (5 çevrim daha da
     dengeli çıktı ama saniyede bir tur atıyor, ray seviye göstergesi gibi
     titriyordu). Sonuç ve ölçüm dosya başında.
     RAPOR ÇUBUKLARI VE BÜTÇE PAYLARI AYNI SAYIYI KULLANIR. İlk sürümde bütçe,
     performansı 0,035 faz geriden izliyordu ("karar anı"). Gecikme kaldırıldı,
     GEREKÇESİNİ OLDUĞU GİBİ YAZIYORUM: kaldırınca ölçülen değer neredeyse hiç
     değişmedi ("en geniş"te geçen süre yayılımı %23,7 → %21,9), yani gecikme
     bir kusur DEĞİLDİ. Kaldırılma sebebi başka: 4 çevrimde 0,035 faz 0,17
     saniye ediyor ve ekranda ayırt edilemiyordu — ölçülemeyen bir ayrıntı için
     rayın kaydırması analitik taramada bulunan en dengeli değerden (0,40)
     sapıyordu. Şimdi raporun gösterdiği pay ile bütçenin gittiği pay birebir
     aynı; sayfanın "bu görünüm ... karar verilmesini sağlar" cümlesine de bu
     daha yakın. (Kalan %21,9'un sebebi tasarım değil piksel yuvarlaması —
     dosya başındaki 3. madde.) */
  const pay = (k) =>
    0.35 + 0.65 * (0.5 + 0.5 * Math.cos(2 * Math.PI * (faz * 4 - 0.40 - k / 3)));
  const ag = [0, 1, 2].map(pay);
  const topB = ag[0] + ag[1] + ag[2];

  /* --- kaynak 1: kanal bazlı performans (SOL) --------------------------- */
  const sX = bx + 16, sY = DY + 12, sW = 100, sH = 100;
  s += `<rect x="${sX}" y="${sY}" width="${sW}" height="${sH}" rx="10" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${sX}" y="${sY}" width="${sW}" height="${sH}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.024 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;
  for (let k = 0; k < 3; k++) {
    const ry = sY + 14 + k * 26;
    s += `<circle cx="${sX + 14}" cy="${ry + 9}" r="4.2"
            fill="rgba(${A},${(0.24 + 0.44 * p).toFixed(3)})"/>`;
    s += `<rect x="${sX + 24}" y="${ry + 5}" width="62" height="8" rx="4"
            fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${sX + 24}" y="${ry + 5}" width="${(18 + 44 * ag[k]).toFixed(1)}" height="8" rx="4"
            fill="rgba(${A},${(0.24 + 0.48 * p).toFixed(3)})"/>`;
  }

  /* --- kaynak 2: elde tutma kohort tablosu (SAĞ) ------------------------
     Kardeş figürdeki EĞRİ DEĞİL: zaman ekseni, taranmış alan ve işaret noktası
     yok; sayfanın kendi sözüyle "kohort tablosu" — sağa doğru solan hücreler. */
  const gX = bx + 130, gW = 100;
  s += `<rect x="${gX}" y="${sY}" width="${gW}" height="${sH}" rx="10" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${gX}" y="${sY}" width="${gW}" height="${sH}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.024 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;
  const solma = [0.92, 0.60, 0.38, 0.22];
  const kdol = kis01((p - 0.06) / 0.30);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const cx = gX + 12 + c * 20, cy = sY + 16 + r * 23;
      s += `<rect x="${cx}" y="${cy}" width="16" height="17" rx="3.5"
              fill="rgba(${A},${(0.06 + 0.56 * solma[c] * kdol * (0.35 + 0.65 * p)).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;
    }
  }

  /* --- iki kaynak tek düğümde birleşir ---------------------------------- */
  const nx = bx + 123, ny = DY + 138;
  [sX + sW / 2, gX + gW / 2].forEach((fx) => {
    s += `<line x1="${fx}" y1="${sY + sH + 3}" x2="${nx}" y2="${ny - 10}"
            stroke="rgba(${A},${(0.14 + 0.42 * p).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  });
  s += `<circle cx="${nx}" cy="${ny}" r="9" fill="rgba(${A},${(0.06 + 0.16 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.56 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<line x1="${nx}" y1="${ny + 10}" x2="${nx}" y2="${DY + 152}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.5"
          stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}"/>`;

  /* --- TEK rapor: her kanalın performansı ve kohortu aynı sütunda -------- */
  const rX = bx + 16, rY = DY + 154, rW = 214, rH = 108;
  const birles = kis01((p - 0.14) / 0.34);
  s += `<rect x="${rX}" y="${rY}" width="${rW}" height="${rH}" rx="12" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${rX}" y="${rY}" width="${rW}" height="${rH}" rx="12"
          fill="rgba(255,255,255,${(0.028 + 0.028 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* rapor başlığı yerine soyut çubuk + ayıraç */
  s += `<rect x="${rX + 12}" y="${rY + 9}" width="58" height="7" rx="3.5"
          fill="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})"/>`;
  s += `<line x1="${rX + 12}" y1="${rY + 24}" x2="${rX + rW - 12}" y2="${rY + 24}"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;
  const taban = rY + 82;
  for (let k = 0; k < 3; k++) {
    const gx0 = rX + 24 + k * 70;
    /* performans çubuğu — kanal payı */
    const h = 12 + 40 * ag[k] * birles;
    s += `<rect x="${gx0 + 15}" y="${(taban - h).toFixed(1)}" width="22" height="${h.toFixed(1)}" rx="5"
            fill="rgba(${A},${(0.24 + 0.46 * p).toFixed(3)})"/>`;
    /* Eksen çizgisi kohort hücrelerini (gx0+4 … gx0+46) simetrik kucaklar ve
       rapor çerçevesini AŞMAZ. ÖLÇÜLDÜ, DÜZELTİLDİ: gx0+52 üçüncü sütunda
       x=1044'e gidiyordu, rapor çerçevesi ise x=1042'de bitiyor — çizgi kenar
       konturunun üstünden geçiyordu (yakın çekimde görüldü). Üç sütunda da
       aynı miktarda kısaldığı için sütun eşitliği bozulmuyor. */
    s += `<line x1="${gx0 + 2}" y1="${taban + 3}" x2="${gx0 + 48}" y2="${taban + 3}"
            stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1"/>`;
    /* aynı sütunda o kanalın kohort hücreleri */
    for (let c = 0; c < 4; c++) {
      s += `<rect x="${gx0 + 4 + c * 12}" y="${taban + 9}" width="10" height="10" rx="2.5"
              fill="rgba(${A},${(0.06 + 0.52 * solma[c] * birles * (0.35 + 0.65 * p)).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.06 + 0.08 * p).toFixed(3)})" stroke-width="0.9"/>`;
    }
  }

  /* --- rapordan bütçe rayına inen akış (ok ucu dolu üçgen) -------------- */
  s += `<line x1="${nx}" y1="${DY + 266}" x2="${nx}" y2="${DY + 286}"
          stroke="rgba(${A},${(0.18 + 0.46 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}"/>`;
  s += `<path d="M${nx - 4.6} ${DY + 285} L${nx} ${DY + 292} L${nx + 4.6} ${DY + 285} Z"
          fill="rgba(${A},${(0.24 + 0.56 * p).toFixed(3)})"/>`;

  /* --- bütçe rayı: üç pay, sürekli yeniden dağılır ---------------------- */
  const bX = bx + 18, bY = DY + 300, bW = 212, bH = 24;
  s += `<rect x="${bX}" y="${bY}" width="${bW}" height="${bH}" rx="9" fill="rgba(255,255,255,.030)"
          stroke="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})" stroke-width="1.2"/>`;
  const icW = bW - 10, bosPay = 5;
  let acc = 0;
  const merkez = [];
  for (let k = 0; k < 3; k++) {
    const w = (icW - 2 * bosPay) * ag[k] / topB;
    const x0 = bX + 5 + acc;
    s += `<rect x="${x0.toFixed(1)}" y="${bY + 5}" width="${w.toFixed(1)}" height="${bH - 10}" rx="4"
            fill="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.24 + 0.38 * p).toFixed(3)})" stroke-width="1"/>`;
    merkez.push(x0 + w / 2);
    acc += w + bosPay;
  }
  /* Karar işaretçisi — sap + toparlak, o an en geniş payın hizasında.
     KESKİN "EN GENİŞİ SEÇ" DEĞİL, KAYARAK: paylar 120° kaydırmalı olduğu için
     en geniş olan turda 12 kez değişiyor; sert seçim işaretçiyi 0,4 saniyede
     bir zıplatıyordu. Şimdi konum, payların 6. KUVVETİYLE ağırlıklandırılmış
     ağırlık merkezi — sürekli ve türevi sınırlı, işaretçi kayarak gidiyor.
     ÜS 6'DIR: burada "10. kuvvet" yazıyordu, kod hep 6 kullanıyordu; denetimde
     yakalandı ve yorum koda göre düzeltildi (kod değişmedi).
     "EN GENİŞİN ÜSTÜNDE" NE KADAR DOĞRU — ÖLÇÜLDÜ: durağın görünür olduğu 45
     karenin 40'ında işaretçi en geniş payın ARALIĞI içinde; kalan 5 kare
     (77, 87, 97, 107, 117) iki pay birbirine yakınken yaşanan geçiş anları,
     merkez o karelerde ikisinin arasından geçiyor. Bu kasıtlı: sert seçim
     zıplama demekti. "Hep en genişin üstünde" DEMEK yanlış olurdu.

     RAYIN ALTINDA, ÜSTÜNDE DEĞİL — ÖLÇÜLEREK TAŞINDI: işaretçi önce rayın
     ÜSTÜNDEYDİ (toparlak bY-16, sap bY-13→bY-3). Tam o bantta rapordan inen
     akış okunun dolu ucu duruyor (x = nx = bx+123, y DY+285–292). Eski yorum
     "ikisi yan yana duruyor" diyordu; ÖLÇÜM BUNU YALANLADI: görünür 45 karenin
     19'unda yatay mesafe 9 px'in (ok ucu yarı genişliği 4,6 + toparlak yarıçapı
     4) altına, üç karede (82 / 97 / 112) 1,0 px'e iniyor ve beyaz toparlak ok
     ucunu tamamen örtüyor — kare 97'de durak canlılığı 0,96, yani durağın EN
     GÖRÜNÜR anında. Ok yukarıda (DY+266–292), işaretçi aşağıda (DY+326–341):
     iki bant artık hiç kesişmiyor, ok her karede okunuyor. Ray DY+300'de
     bırakıldı — yukarı almak onu darbe bandına (en alt erişim DY+294) sokardı. */
  const kuv = ag.map((v) => Math.pow(v, 6));
  const kuvTop = kuv[0] + kuv[1] + kuv[2];
  const isX = (merkez[0] * kuv[0] + merkez[1] * kuv[1] + merkez[2] * kuv[2]) / kuvTop;
  s += `<line x1="${isX.toFixed(1)}" y1="${bY + bH + 2}" x2="${isX.toFixed(1)}" y2="${bY + bH + 8}"
          stroke="rgba(255,255,255,${(0.22 + 0.48 * p).toFixed(3)})" stroke-width="1.6"
          stroke-linecap="round"/>`;
  s += `<circle cx="${isX.toFixed(1)}" cy="${bY + bH + 11}" r="4"
          fill="rgba(255,255,255,${(0.26 + 0.52 * p).toFixed(3)})"/>`;

  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
