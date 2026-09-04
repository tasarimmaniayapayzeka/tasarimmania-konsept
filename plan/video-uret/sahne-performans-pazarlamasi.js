/* SAHNE — dijital-pazarlama / performans-pazarlamasi
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Ölçüm Altyapısı Kurulumu
 *      "Kampanyalar başlamadan önce dönüşüm etiketleri, UTM yapısı ve atıf
 *       modeli netleştirilir. Bu temel olmadan toplanan veri kanallar
 *       arasında karşılaştırılamaz."
 *   02 Optimizasyon Döngüsü
 *      "Gösterge paneli düzenli izlenir; edinme maliyeti yükselen veya yaşam
 *       boyu değeri düşen kanallarda kreatif, hedefleme ve bütçe kararları
 *       yeniden gözden geçirilir."
 *   03 Raporlama ve Şeffaflık
 *      "Kanal bazlı ayrı tablolar yerine tek bir konsolide rapor sunulur.
 *       İşletme sahibi her kanalın sonuca katkısını aynı ekranda görür."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 üç kurulum satırı sırayla NETLEŞİR (dönüşüm etiketi kesikli çizgiden
 *      dolguya oturur, UTM parçaları ortak hizaya iner, atıf temas noktaları
 *      tek çizgiyle bağlanır); satırlardan inen hat TEMEL plakasını örer,
 *      plaka tamamlanınca üstünde üç BİREBİR AYNI veri pulu belirir — aynı
 *      tanım, aynı kutu: veri artık karşılaştırılabilir. Işık darbesi tam
 *      temel plakasının üstünden geçer ve onu yakar.
 *   02 üstte gösterge paneli: iki eş panelde iki eğri, biri YÖN olarak
 *      yükselir (edinme maliyeti), biri YÖN olarak düşer (yaşam boyu değer);
 *      izleme çizgisi paneli düzenli tarar. İkaz eşiği tetiklenince akış
 *      aşağıdaki döngü halkasına iner: halka üzerinde üç durak — kreatif,
 *      hedefleme, bütçe — gezgin ok geçtikçe sırayla yeniden ele alınır.
 *      Işık darbesi tam ikaz eşiğinin üstünden geçer.
 *   03 tek ekran çerçevesi: üç adsız kanal satırı AYNI cetvel üzerinde kendi
 *      katkı çubuğunu doldurur; katkılar aşağıda TEK konsolide şeride üç
 *      görünür parça olarak akar (şeffaflık: bütünün içinde paylar seçilir);
 *      şeritten tek sonuç halkası kapanır. Işık darbesi tam konsolide
 *      şeridin üstünden geçer ve onu yakar.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER — render edilip mürekkep genişliği piksel tarandı ─────────
 * (28 px, Consolas, ağırlık 600, harf arası 1,2 — istasyon 246 px)
 *   "01 ALTYAPI"       163 px  ✓
 *   "02 OPTİMİZE"      179 px  ✓  (sayfanın kendi rozet sözü: hero'da OPTİMİZE)
 *   "03 RAPORLAMA"     198 px  ✓
 *   "02 OPTİMİZASYON"  247 px  ✗ 246'yı 1 px AŞIYOR — kısaltmanın gerekçesi bu.
 *   "01 ÖLÇÜM ALTYAPISI" 295 px ✗ taşar, denendi, seçilmedi.
 * Videodaki tek yazı bu üç etikettir; en küçük yazı boyu 28 px.
 *
 * ── YASAK (yasaklar.md "pazarlama" modül geneli + "performans-pazarlamasi") ──
 *  - HİÇBİR METRİK RAKAMI YOK: CPC, dönüşüm oranı, ROAS, bütçe, erişim,
 *    tıklanma — hiçbiri yazılmadı. Gösterge panelinde SAYI YOK, yalnız
 *    eğri/çubuk var. Tek rakam durak numaraları (01/02/03), sayfanın kendi
 *    numaralandırması.
 *  - Edinme maliyeti ve yaşam boyu değer RAKAMSIZ — yalnız YÖN gösterildi
 *    (eğri yükseliyor / düşüyor + yön oku). yasaklar.md bunu açıkça serbest
 *    bırakıyor: "yalnız yön (yükseliyor/düşüyor) gösterilebilir".
 *  - KANAL ADI VE LOGOSU YOK: 01 ve 03'teki kanallar adsız nötr pul/satır;
 *    reklam platformu logosu, marka rengi, arayüz işareti çizilmedi.
 *    Her şey modülün kehribar aksanı + beyaz.
 *  - İNSAN YÜZÜ YOK, LOGO YOK, ürün/arayüz taklidi yok (ekran çerçeveleri
 *    nokta+boş başlık çubuğundan ibaret; pencere düğmesi/sekme/menü yok).
 *
 * ── EŞİTLİK / FARK — NEREDE EŞİT, NEREDE BİLEREK DEĞİL ──────────────────
 *  · 01'in ÜÇ KURULUM SATIRI aynı kalemdir (sayfa tek cümlede sayıyor):
 *    gövde birebir aynı ölçü/dolgu/kontur, yalnız içerik ve gecikme farklı.
 *    Döngü ortalaması ölçümü dosya sonundaki "ÖLÇÜLEN DEĞERLER"de.
 *  · 01'in ÜÇ VERİ PULU bilerek BİREBİR AYNI — içerik de aynı: sayfanın
 *    "tek bir tanımla izlenir / karşılaştırılabilir" tezinin kendisi.
 *    Yerleşme sırası saf GECİKME, tavan değil (ilk sürümdeki tavan hatası
 *    ölçümle bulunup düzeltildi — koddaki "ÖLÇÜLDÜ, DEĞİŞTİRİLDİ" notu).
 *  · 02'nin İKİ GÖSTERGE PANELİ eş gövdeli (aynı ölçü, kontur, tarama):
 *    ikisi de sayfanın saydığı birer İKAZ koşulu; biri ötekinden üstün
 *    değil. Yön farkı (biri çıkar, biri iner) sayfanın kendi cümlesi.
 *    Bu, kardeş .akis figürünün DENGEDEKİ terazisiyle çelişmez: terazi iki
 *    kavramın dengesini, buradaki paneller belli bir kanaldaki BOZULMA
 *    işaretlerini çizer — ikisi de üstünlük iddia etmez.
 *  · 02'nin ÜÇ DÖNGÜ DURAĞI (kreatif/hedefleme/bütçe) eş çipli; gezgin ok
 *    üçünü aynı turda sırayla ziyaret eder (sıra = sayfanın cümle sırası).
 *    Ziyaret parlaması SABİT katsayılı — p ile çarpılsaydı zirveye yakın
 *    ziyareti alan çip kayırılırdı (ölçülüp düzeltildi, koddaki not).
 *    Üç çipin darbeye uzaklığı: alt 141 px, sol 74,9 px, sağ 74,9 px —
 *    üçü de darbe yarıçapının (52) DIŞINDA, fazladan ışık almaz.
 *  · 03'ün ÜÇ KANAL SATIRI eş gövdeli, KATKI DOLGULARI bilerek FARKLI
 *    boyda: sayfanın tezi zaten "hangi kanalın sonuç ürettiği ölçümle
 *    belirlenir" ve "her kanalın sonuca katkısını görür" — katkılar eş
 *    çizilseydi bu tez silinirdi. Kanallar adsız olduğu için hiçbir gerçek
 *    platform üstün gösterilmiş olmuyor. Ortak cetvel (aynı boş ray) üçünde
 *    birebir aynı.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) KANAL BAZLI RAPORLAR — üç ayrı panel,
 * üçünde üç farklı grafik biçimi; (2) TEK RAPOR — üç panelin ucundan inen
 * üç çizgi tek geniş tabloda birleşir, satır değerleri bilerek "—";
 * (3) MALİYET ↔ DEĞER — dengede duran terazi.
 * Bu sahne aynı sayfanın BAŞKA kesitini çizer, o üç durağı TEKRARLAMAZ:
 *  · Kardeş figür SÜRECİN NESNESİNİ (raporlar → tablo → denge), bu sahne
 *    SÜRECİN İŞLEYİŞİNİ (kurulum → döngü → tek ekranda katkı) çizer.
 *    Kaynakları da ayrı: kardeş figür "Derinlemesine", bu sahne
 *    "Ayrıntılar"daki 01/02/03 listesi.
 *  · 03'te TABLO YOK: sütun, satır hücresi, "—" değeri, üç-çizgi-birleşme
 *    çizilmedi (hepsi kardeş figürde var). Burada katkı parçalı TEK şerit +
 *    tek sonuç halkası — kardeş figürün tablosuyla aynı tezi başka biçimde
 *    doğruluyor, kopyalamıyor.
 *  · Sonuç halkasında ONAY TİKİ YOK: sayfanın SSS'i "dönüşüm garanti
 *    edilmez" diyor; tik "garanti" okunurdu. Halka yalnız kapanır ve
 *    görünür kılar ("görür"), söz vermez.
 *
 * ── ÖLÇÜLEN DEĞERLER — hepsi bu makinede ölçüldü, hiçbiri tahmin değil ──
 *
 * 1) IŞIK DARBESİNİN DÜŞTÜĞÜ NOKTALAR (seritNokta ile hesap, faz merkezleri):
 *      faz 0,20 → (188, 368) = durak içi (126, 242) → 01'in TEMEL plakası
 *        oraya oturtuldu (plaka merkezi y 242). Üç kurulum satırının alt
 *        kenarı DY+146: darbeye dikey uzaklık 96 > 52 → satırlar darbeden
 *        fazladan ışık almaz, tek farkları kendi gecikmeleri.
 *      faz 0,50 → (560, 303) = durak içi (123, 177) → 02'nin İKAZ eşiği
 *        oraya oturtuldu. İki panelin alt kenarı DY+128: uzaklık 49 ama iki
 *        panel darbe merkezine SİMETRİK (x 26..118 | 128..220, merkez 123)
 *        → alacakları ışık eşit; döngü ortalaması ölçümü aşağıda.
 *      faz 0,80 → (932, 330) = durak içi (120, 204) → 03'ün KONSOLİDE
 *        şeridi oraya oturtuldu (şerit y 190..218). Üç kanal satırının alt
 *        kenarı DY+150: uzaklık 54 > 52 → satırlar darbe dışı.
 *
 * 2) EŞİTLİK — DÖNGÜ ORTALAMASI (40 kare, bant başına ortalama parlaklık;
 *    tek karede ölçme tuzağı DEVIR.md'de — zamanlama farkı yanıltıyor).
 *    Karşılaştırma için aynı bantlar BOŞ kabukta da ölçüldü (motor.kabuk('')
 *    — hiç çizim yok, yalnız vinyet + zemin halesi):
 *      01 üç kurulum satırı : 31,62/33,69/35,13 → %11,1  (boş kabuk %16,3)
 *      01 üç veri pulu      : 45,49/44,43/47,98 → %8,0   (boş kabuk %16,4)
 *      02 iki gösterge paneli: 36,18/36,17      → %0,0   (darbeye simetrik)
 *      02 üç döngü çipi     : 43,12/46,48/43,41 → %7,8   (boş kabuk %17,3)
 *      03 üç kanal satırı   : 34,11/35,20/36,11 → %5,9   (boş kabuk %10,5)
 *    Beş grupta da sahne farkı boş kabuğun ortam rampasından KÜÇÜK — çizim
 *    rampayı azaltıyor, kayırma eklemiyor. Kalan farkların kaynağı motorun
 *    ortak ışığı (üst vinyet + hale) ve 02 çiplerinde simge mürekkebi
 *    (hedefleme halkası ötekilerden geniş alan tarar). 01/03 satırlarının
 *    ve konsolide şeridin altına teknik-seo'da ölçülmüş rgba(14,17,24,.72)
 *    zemin kondu; borunun ışığı satırlara sızmasın diye.
 *    03 KONSOLİDE ŞERİDİN ÜÇ PARÇASI bilerek eşit ölçülmez: genişlikleri
 *    (80/59/43) katkı farkının kendisi, sayfanın tezi. Parça dolgu OPAKLIĞI
 *    üçünde aynı formül; ölçülen 54,90/57,22/45,40 (%26) — B'yi kaldıran,
 *    darbenin şeridin ortasından (A|B sınırı) geçmesi; boş kabukta bile aynı
 *    bantlarda %16 ortam rampası var. Genişlik sırası A>B>C her karede
 *    korunuyor; parlaklık bir sıralama iddiası taşımıyor.
 *
 * 3) DÖNGÜ DİKİŞİ (dongu-denetim.js) — crf SEÇİMİ. Kaynak kareler faz
 *    cinsinden periyodik ama mp4 kodlayıcısı döngü noktasında nicemleme
 *    kayması bırakıyor (teknik-seo'da da ölçülmüştü). Bu sahnede ardışık
 *    kare farkı zaten küçük (0,43 — bol durağan cam), o yüzden kodlayıcı
 *    dikişi oransal büyüyor:
 *      crf 26 → dikiş 0,70  oran 1,63×  (163 KB)  ✗ eşik 1,60 aşıldı
 *      crf 22 → dikiş 0,53  oran 1,24×  (248 KB)  ← SEÇİLDİ ✓
 *    248 KB kardeş videoların aralığında (163–318 KB). BU SAHNE crf 22 İLE
 *    BASILIR — `uret.js` varsayılanı (crf 26) eşiği geçemiyor:
 *      node -e "const m=require('./plan/video-uret/motor.js');
 *               m.uret('modul-pazarlama/performans-pazarlamasi','pazarlama',
 *                 require('./plan/video-uret/sahne-performans-pazarlamasi.js'),
 *                 {crf:22})"
 *
 * 4) OYNATMA (headless Chrome + CDP, _vd.html, --autoplay-policy bayrağı YOK,
 *    GERÇEK saniye bekleyerek ölçüldü — --virtual-time-budget medya saatini
 *    İLERLETMEZ (DEVIR.md tuzak #2); --timeout bayrağı da bu Chrome'da
 *    DOM'u yükleme anında döküyor ("bekliyor" çıktı), o da kullanılamaz:
 *      normal                        : paused=false, currentTime 1,82 → 3,52 ✓
 *      --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0     ✓
 *      kaynak: performans-pazarlamasi.mp4, data-dongu: var, öğe görünür
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 ALTYAPI' },
  { x: 437, fazMerkez: 0.50, etiket: '02 OPTİMİZE' },
  { x: 812, fazMerkez: 0.80, etiket: '03 RAPORLAMA' },
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
    s += (i === 0 ? olcumAltyapisi(d.x, p, faz, a)
       : i === 1 ? optimizasyonDongusu(d.x, p, faz, a)
       : raporlamaSeffaflik(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · ÖLÇÜM ALTYAPISI KURULUMU ───────────────────────────────────────
   Üç kurulum satırı — sayfanın saydığı üç kalem: dönüşüm etiketleri, UTM
   yapısı, atıf modeli. Her satırın sağında o kalemin kendisi kesikli/dağınık
   hâlden NET hâle oturur ("netleştirilir"). Satırlardan inen hat TEMEL
   plakasını örer ("bu temel olmadan..."); plaka bitince üstünde üç birebir
   aynı veri pulu belirir: veri artık ortak tanımda, karşılaştırılabilir.
   ÖLÇÜ NOTU — IŞIK DARBESİ (126, 242) noktasında duruyor: temel plakası
   (y 228..256, merkez 242) bilerek oraya kondu — darbe geçerken TEMEL yanar.
   Satırların alt kenarı DY+146, darbeye 96 px: hiçbir satır fazladan ışık
   almaz. */
function olcumAltyapisi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const rX = bx + 16, rW = 214, rH = 34;
  const rowY = [DY + 20, DY + 66, DY + 112];

  for (let i = 0; i < 3; i++) {
    const ry = rowY[i];
    /* netleşme: satır sırayla, sayfa da kalemleri bu sırayla sayıyor */
    const net = kis01((p - 0.04 - i * 0.11) / 0.32);

    /* gövde — birebir aynı; altta yarı geçirmez zemin (boru ışığı sızmasın,
       teknik-seo'da ölçülmüş çözüm) */
    s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="9" fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;

    /* simge kutusu */
    const ix = rX + 8, iy = ry + 6;
    s += `<rect x="${ix}" y="${iy}" width="22" height="22" rx="6"
            fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += simge01(i, ix, iy, A, p);

    /* başlık çubuğu */
    s += `<rect x="${rX + 40}" y="${ry + 13.5}" width="${[64, 52, 58][i]}" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.13 + 0.20 * p).toFixed(3)})"/>`;

    /* sağda kalemin kendisi: kesikli hâlden net hâle */
    s += netlesen01(i, rX + 122, ry, net, p, A, faz);
  }

  /* --- satırlardan temele inen hat (desen 13, turda tam 4 kayma) -------- */
  s += `<line x1="${bx + 123}" y1="${DY + 152}" x2="${bx + 123}" y2="${DY + 194}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;

  /* --- üç veri pulu: BİREBİR AYNI — ortak tanım, karşılaştırılabilir veri.
     Temel örülmeden görünmezler (sayfa: "bu temel olmadan ... karşılaştırılamaz") */
  const kat = kis01((p - 0.30) / 0.30);            // temel plakasının örülmesi
  const pulGor = kis01((p - 0.55) / 0.30) * kat;   // pullar temelden sonra
  for (let i = 0; i < 3; i++) {
    const cxp = bx + 63 + i * 60, cyp = DY + 202;
    /* ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: ilk sürümde dalga `pulGor * (1 - i*0.06)` idi —
       bu bir gecikme değil TAVANDI: B ve C pulu hiçbir karede 1'e ulaşamıyor,
       "üç pul birebir aynı" iddiasıyla çelişiyordu. Saf gecikmeye çevrildi:
       üçü de aynı son değere ulaşır, yalnız sırayla. */
    const g = kis01((pulGor - i * 0.06) / 0.88);   // yerleşme sırası, tavan yok
    if (g < 0.02) continue;
    s += `<rect x="${cxp - 20}" y="${cyp + (1 - g) * 8}" width="40" height="24" rx="7"
            fill="rgba(${A},${(0.10 + 0.16 * g).toFixed(3)})"
            stroke="rgba(${A},${(0.20 + 0.42 * g).toFixed(3)})" stroke-width="1.2"/>`;
    /* pul içi: aynı mini çubuk + aynı nokta — üçünde birebir aynı */
    s += `<rect x="${cxp - 12}" y="${cyp + (1 - g) * 8 + 9}" width="16" height="6" rx="3"
            fill="rgba(255,255,255,${(0.30 * g).toFixed(3)})"/>`;
    s += `<circle cx="${cxp + 11}" cy="${cyp + (1 - g) * 8 + 12}" r="3"
            fill="rgba(255,255,255,${(0.34 * g).toFixed(3)})"/>`;
  }

  /* --- TEMEL plakası: dört blok sırayla örülür, darbe tam üstünden geçer */
  const pY = DY + 228, pH = 28;
  for (let b = 0; b < 4; b++) {
    const px = bx + 36 + b * 44.5;
    const sira = kis01((kat - b * 0.14) / 0.40);
    s += `<rect x="${px}" y="${pY}" width="40.5" height="${pH}" rx="5"
            fill="rgba(255,255,255,${(0.022 + 0.050 * sira).toFixed(3)})"
            stroke="rgba(${A},${(0.10 + 0.44 * sira * (0.35 + 0.65 * p)).toFixed(3)})" stroke-width="1.2"/>`;
  }
  /* plaka sağlamlaştı çizgisi */
  s += `<line x1="${bx + 36}" y1="${pY + pH + 5}" x2="${(bx + 36 + 174 * kat).toFixed(1)}" y2="${pY + pH + 5}"
          stroke="rgba(${A},${(0.20 + 0.55 * kat * p).toFixed(3)})" stroke-width="2.2"
          stroke-linecap="round"/>`;
  /* zemin tarama işareti — temelin altındaki klasik yer çizgileri */
  for (let t = 0; t < 7; t++) {
    const tx = bx + 48 + t * 25;
    s += `<line x1="${tx}" y1="${pY + pH + 12}" x2="${tx - 10}" y2="${pY + pH + 22}"
            stroke="rgba(255,255,255,${(0.05 + 0.09 * kat * p).toFixed(3)})" stroke-width="1.4"
            stroke-linecap="round"/>`;
  }

  return s;
}

/* Satır sağında netleşen kalemler. Kesikli (belirsiz) hâlden dolgulu (net)
   hâle geçiş — "netleştirilir" sözünün kendisi. */
function netlesen01(i, x, ry, net, p, A, faz) {
  let s = '';
  const my = ry + 17;
  const kesik = (0.14 + 0.16 * p).toFixed(3);
  if (i === 0) {
    /* dönüşüm etiketi: sola bakan etiket rozeti + delik */
    const tx = x + 22, w = 42, h = 18;
    const yolT = `M${tx + 10} ${my - h / 2} H${tx + w} a4 4 0 0 1 4 4 V${my + h / 2 - 4}
      a4 4 0 0 1 -4 4 H${tx + 10} L${tx} ${my} Z`;
    s += `<path d="${yolT}" fill="rgba(${A},${(0.28 * net).toFixed(3)})"
            stroke="rgba(${A},${(0.26 + 0.44 * net).toFixed(3)})" stroke-width="1.3"
            ${net < 0.85 ? `stroke-dasharray="4 4" stroke-opacity="${kesik}"` : ''}/>`;
    s += `<circle cx="${tx + 12}" cy="${my}" r="2.6"
            fill="rgba(255,255,255,${(0.20 + 0.42 * net).toFixed(3)})"/>`;
    /* etiketin bağlandığı olay noktası */
    s += `<circle cx="${x + 76}" cy="${my}" r="4"
            fill="rgba(255,255,255,${(0.14 + 0.30 * net).toFixed(3)})"/>`;
    return s;
  }
  if (i === 1) {
    /* UTM yapısı: üç parça ortak hizaya iner, aralarına bağ girer */
    const ofset = [-6, 5, -4];
    for (let k = 0; k < 3; k++) {
      const sx = x + 12 + k * 26;
      const oy = ofset[k] * (1 - net);
      s += `<rect x="${sx}" y="${(my - 5 + oy).toFixed(1)}" width="16" height="10" rx="3"
              fill="rgba(${A},${(0.10 + 0.22 * net).toFixed(3)})"
              stroke="rgba(${A},${(0.22 + 0.40 * net).toFixed(3)})" stroke-width="1.2"/>`;
      if (k < 2) {
        s += `<line x1="${sx + 16}" y1="${my}" x2="${sx + 26}" y2="${my}"
                stroke="rgba(255,255,255,${(0.10 + 0.30 * net).toFixed(3)})" stroke-width="1.6"/>`;
      }
    }
    return s;
  }
  /* atıf modeli: dört temas noktası tek çizgiyle bağlanır */
  const n = 4, x0 = x + 10, dx = 22;
  let d = '';
  for (let k = 0; k < n; k++) d += (k ? 'L' : 'M') + (x0 + k * dx) + ' ' + (my + (k % 2 ? -5 : 5));
  const uz = 3 * Math.hypot(dx, 10) + 6;
  s += `<path d="${d}" fill="none" stroke="rgba(${A},${(0.20 + 0.42 * net).toFixed(3)})"
          stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="${uz.toFixed(0)}" stroke-dashoffset="${(uz * (1 - net)).toFixed(1)}"/>`;
  for (let k = 0; k < n; k++) {
    const nk = kis01((net - k * 0.16) / 0.30);
    s += `<circle cx="${x0 + k * dx}" cy="${my + (k % 2 ? -5 : 5)}" r="3.4"
            fill="rgba(${A},${(0.16 + 0.50 * nk).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.22 * nk).toFixed(3)})" stroke-width="1"/>`;
  }
  return s;
}

/* Kurulum satırı simgeleri — üç kalemin küçük işareti. Logo yok. */
function simge01(i, ix, iy, A, p) {
  const c = `rgba(255,255,255,${(0.28 + 0.40 * p).toFixed(3)})`;
  const ak = `rgba(${A},${(0.34 + 0.46 * p).toFixed(3)})`;
  if (i === 0) {
    /* dönüşüm etiketi: küçük etiket */
    return `<path d="M${ix + 8.4} ${iy + 5} H${ix + 16.6} a2 2 0 0 1 2 2 V${iy + 15}
              a2 2 0 0 1 -2 2 H${ix + 8.4} L${ix + 3.6} ${iy + 11} Z" fill="none"
              stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>
            <circle cx="${ix + 9.6}" cy="${iy + 11}" r="1.6" fill="${ak}"/>`;
  }
  if (i === 1) {
    /* UTM yapısı: zincir bağı */
    return `<rect x="${ix + 3.2}" y="${iy + 7.6}" width="9" height="6.8" rx="3.4" fill="none"
              stroke="${c}" stroke-width="1.5"/>
            <rect x="${ix + 9.8}" y="${iy + 7.6}" width="9" height="6.8" rx="3.4" fill="none"
              stroke="${ak}" stroke-width="1.5"/>`;
  }
  /* atıf modeli: iki temas yolunun TEK dönüşümde birleşmesi (çoktan bire) —
     tek noktadan dağılan "paylaş" işaretine benzemesin diye yön bilerek bu */
  return `<circle cx="${ix + 4.4}" cy="${iy + 6.4}" r="1.8" fill="${c}"/>
          <circle cx="${ix + 4.4}" cy="${iy + 15.6}" r="1.8" fill="${c}"/>
          <path d="M${ix + 5.6} ${iy + 6.4} C${ix + 10} ${iy + 6.4} ${ix + 10} ${iy + 11} ${ix + 14.6} ${iy + 11}
            M${ix + 5.6} ${iy + 15.6} C${ix + 10} ${iy + 15.6} ${ix + 10} ${iy + 11} ${ix + 14.6} ${iy + 11}"
            fill="none" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>
          <circle cx="${ix + 16.6}" cy="${iy + 11}" r="2.2" fill="${ak}"/>`;
}

/* ── 02 · OPTİMİZASYON DÖNGÜSÜ ───────────────────────────────────────────
   Üstte gösterge paneli: iki EŞ panel — solda yön olarak YÜKSELEN eğri
   (edinme maliyeti), sağda yön olarak DÜŞEN eğri (yaşam boyu değer); ikisi
   de sayfanın saydığı ikaz koşulu, rakam yok. İzleme çizgisi paneli düzenli
   tarar ("düzenli izlenir"). İkaz eşiği tetiklenince akış aşağı iner:
   döngü halkasında kreatif → hedefleme → bütçe durakları gezgin ok geçtikçe
   yeniden ele alınır ("yeniden gözden geçirilir").
   ÖLÇÜ NOTU — IŞIK DARBESİ (123, 177) noktasında: İKAZ eşiği tam oraya
   kondu, darbe geçerken eşik yanar. İki panel darbe merkezine simetrik;
   üç döngü çipinin darbeye uzaklığı 141 / 74,9 / 74,9 — üçü de yarıçap
   (52) dışında. Gezgin turda TAM 3 tur atar (tam sayı → dikişsiz) ve
   durağın canlı penceresinde üç çipin üçüne de uğrar. */
function optimizasyonDongusu(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- gösterge paneli çerçevesi ---------------------------------------- */
  const gx = bx + 16, gw = 214, gy = DY + 14, gh = 126;
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="10" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<circle cx="${bx + 30}" cy="${DY + 28}" r="3"
          fill="rgba(${A},${(0.40 + 0.40 * p).toFixed(2)})"/>`;
  s += `<rect x="${bx + 40}" y="${DY + 25}" width="56" height="6" rx="3"
          fill="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})"/>`;
  s += `<line x1="${bx + 24}" y1="${DY + 40}" x2="${bx + 222}" y2="${DY + 40}"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;

  /* --- iki eş panel: yalnız eğri + yön, RAKAM YOK ----------------------- */
  const pY = DY + 54, pH = 74, pW = 92;
  [bx + 26, bx + 128].forEach((pX, k) => {
    s += `<rect x="${pX}" y="${pY}" width="${pW}" height="${pH}" rx="8"
            fill="rgba(255,255,255,${(0.020 + 0.022 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.08 + 0.11 * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += `<rect x="${pX + 8}" y="${pY + 8}" width="20" height="4" rx="2"
            fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;
    [1, 2].forEach((g) => {
      s += `<line x1="${pX + 6}" y1="${pY + 18 + g * 18}" x2="${pX + pW - 6}" y2="${pY + 18 + g * 18}"
              stroke="rgba(255,255,255,.05)" stroke-width="1"/>`;
    });
    /* eğri: k=0 yükselir (edinme maliyeti), k=1 düşer (yaşam boyu değer).
       Biçim statik — yön mekânsal; okuma noktası eğri boyunca gidip gelir. */
    let d = '';
    const N = 24;
    const eY = (t) => k === 0
      ? pY + 62 - t * 38 + 3.2 * Math.sin(2 * Math.PI * (t * 1.4 + 0.15))
      : pY + 24 + t * 38 + 3.2 * Math.sin(2 * Math.PI * (t * 1.4 + 0.15));
    for (let i2 = 0; i2 <= N; i2++) {
      const t = i2 / N;
      d += (i2 === 0 ? 'M' : 'L') + (pX + 8 + t * 74).toFixed(1) + ' ' + eY(t).toFixed(1);
    }
    s += `<path d="${d}" fill="none" stroke="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    /* yön oku — sayfanın "yükselen / düşen" sözü, yalnız yön */
    const ux = pX + 82, uy = eY(1);
    const rot = k === 0 ? -52 : 52;
    s += `<g transform="translate(${ux.toFixed(1)} ${uy.toFixed(1)}) rotate(${rot})">
            <path d="M-4 -3 L4 0 L-4 3" fill="none"
              stroke="rgba(${A},${(0.40 + 0.50 * p).toFixed(2)})" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
          </g>`;
    /* okuma noktası: eğri üzerinde gidip gelir (turda tam 2 çevrim) */
    const t = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
    s += `<circle cx="${(pX + 8 + t * 74).toFixed(1)}" cy="${eY(t).toFixed(1)}" r="3.4"
            fill="rgba(255,255,255,${(0.25 + 0.45 * p).toFixed(2)})"/>`;
  });

  /* izleme çizgisi: panelin tamamını düzenli tarar (turda 1 gidiş-dönüş) */
  const tara = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz);
  const taraX = gx + 8 + tara * (gw - 16);
  s += `<line x1="${taraX.toFixed(1)}" y1="${DY + 46}" x2="${taraX.toFixed(1)}" y2="${DY + 134}"
          stroke="rgba(${A},${(0.14 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
          stroke-linecap="round" filter="url(#yumusaAz)"/>`;

  /* --- ikaz eşiği: panelden döngüye iniş — darbe tam üstünde ------------ */
  s += `<line x1="${bx + 123}" y1="${DY + 142}" x2="${bx + 123}" y2="${DY + 166}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;
  s += `<g transform="translate(${bx + 123} ${DY + 177}) rotate(45)">
          <rect x="-6.5" y="-6.5" width="13" height="13" rx="3"
            fill="rgba(${A},${(0.10 + 0.24 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.26 + 0.55 * p).toFixed(3)})" stroke-width="1.5"/>
        </g>`;
  s += `<line x1="${bx + 123}" y1="${DY + 188}" x2="${bx + 123}" y2="${DY + 204}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="5 8" stroke-dashoffset="-${(faz * 52).toFixed(1)}"/>`;

  /* --- döngü halkası ----------------------------------------------------- */
  const cx = bx + 123, cy = DY + 262, r = 56;
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
          stroke="rgba(255,255,255,${(0.09 + 0.08 * p).toFixed(3)})" stroke-width="2.4"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
          stroke="rgba(${A},${(0.14 + 0.22 * p).toFixed(3)})" stroke-width="1.2"/>`;

  /* halka üzerinde yön çevrintileri — bu bir DÖNGÜ, yükleme değil */
  [0.125, 0.458, 0.792].forEach((T) => {
    const ang = 2 * Math.PI * T;
    const hx = cx + r * Math.cos(ang), hy = cy + r * Math.sin(ang);
    s += `<g transform="translate(${hx.toFixed(1)} ${hy.toFixed(1)}) rotate(${(360 * T + 90).toFixed(1)})">
            <path d="M-3 -4 L4 0 L-3 4" fill="none"
              stroke="rgba(255,255,255,${(0.14 + 0.18 * p).toFixed(3)})" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round"/>
          </g>`;
  });

  /* gezgin ok: turda TAM 3 tur (tam sayı → dikişsiz) + kuyruk */
  const tur = (faz * 3) % 1;
  [0, 0.030, 0.060].forEach((geri, k) => {
    const ang = 2 * Math.PI * (tur - geri);
    const hx = cx + r * Math.cos(ang), hy = cy + r * Math.sin(ang);
    const rr = [4.6, 3.1, 2.0][k];
    const op = [0.85, 0.40, 0.18][k];
    s += `<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${rr}"
            fill="rgba(255,255,255,${(op * (0.35 + 0.65 * p)).toFixed(3)})"/>`;
    if (k === 0) {
      s += `<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${rr + 4}"
              fill="none" stroke="rgba(${A},${(0.45 * (0.35 + 0.65 * p)).toFixed(3)})" stroke-width="1.4"/>`;
    }
  });

  /* üç döngü durağı: kreatif (alt) → hedefleme (sol) → bütçe (sağ) —
     gezginin canlı penceredeki ziyaret sırası sayfanın cümle sırası. */
  const NOD = [
    { T: 0.25,   ad: 'kreatif' },
    { T: 0.5833, ad: 'hedefleme' },
    { T: 0.9167, ad: 'butce' },
  ];
  NOD.forEach((n2, k) => {
    const ang = 2 * Math.PI * n2.T;
    const nx = cx + r * Math.cos(ang), ny = cy + r * Math.sin(ang);
    /* ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: parlama önce p ile çarpılıyordu; gezginin üç
       çipe uğradığı fazlar farklı p'ye denk geldiği için ziyaret parlamaları
       eşit ağırlıkta değildi (hedefleme zirveye en yakın ziyareti alıyordu).
       Sayfa üçünü aynı cümlede eşit sayıyor; parlama katsayısı sabitlendi.
       Kalan fark ölçümü dosya başında ("ÖLÇÜLEN DEĞERLER" 2) — kaynak
       zamanlama değil, simge mürekkebi + halka üzerindeki konum. */
    let dd = Math.abs(tur - n2.T); dd = Math.min(dd, 1 - dd);
    const akt = kis01(1 - dd / 0.075) * 0.72;
    s += `<rect x="${(nx - 15).toFixed(1)}" y="${(ny - 15).toFixed(1)}" width="30" height="30" rx="8"
            fill="rgba(14,17,24,.80)"/>`;
    s += `<rect x="${(nx - 15).toFixed(1)}" y="${(ny - 15).toFixed(1)}" width="30" height="30" rx="8"
            fill="rgba(255,255,255,${(0.035 + 0.028 * p + 0.06 * akt).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.26 * p + 0.42 * akt).toFixed(3)})" stroke-width="1.3"/>`;
    s += simge02(k, nx, ny, A, p, akt, faz);
  });

  return s;
}

/* Döngü durağı simgeleri — kreatif / hedefleme / bütçe. Logo yok, rakam yok. */
function simge02(k, nx, ny, A, p, akt, faz) {
  const c = `rgba(255,255,255,${(0.30 + 0.30 * p + 0.30 * akt).toFixed(3)})`;
  const ak = `rgba(${A},${(0.35 + 0.30 * p + 0.30 * akt).toFixed(3)})`;
  if (k === 0) {
    /* kreatif: kalem ucu */
    return `<path d="M${nx - 4.5} ${ny - 8} L${nx + 4.5} ${ny - 8} L${nx + 7} ${ny + 3} L${nx} ${ny + 9} L${nx - 7} ${ny + 3} Z"
              fill="none" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>
            <line x1="${nx}" y1="${ny + 9}" x2="${nx}" y2="${ny + 1}" stroke="${c}" stroke-width="1.3"/>
            <circle cx="${nx}" cy="${ny - 1}" r="2" fill="${ak}"/>`;
  }
  if (k === 1) {
    /* hedefleme: iç içe halkalar + merkez */
    return `<circle cx="${nx}" cy="${ny}" r="8" fill="none" stroke="${c}" stroke-width="1.4"/>
            <circle cx="${nx}" cy="${ny}" r="4.2" fill="none" stroke="${c}" stroke-width="1.2"/>
            <circle cx="${nx}" cy="${ny}" r="1.7" fill="${ak}"/>`;
  }
  /* bütçe: dağıtım sürgüsü — topuz durak ele alındıkça hafif yer değiştirir
     (turda tam 2 çevrim → dikişsiz), üzerinde değer YOK */
  const t = 0.5 + 0.22 * Math.sin(2 * Math.PI * faz * 2) * akt - 0.10 * akt;
  return `<line x1="${nx - 9}" y1="${ny - 4}" x2="${nx + 9}" y2="${ny - 4}"
            stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="${(nx - 9 + 18 * t).toFixed(1)}" cy="${ny - 4}" r="2.6" fill="${ak}"/>
          <line x1="${nx - 9}" y1="${ny + 5}" x2="${nx + 9}" y2="${ny + 5}"
            stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="${(nx + 9 - 18 * t).toFixed(1)}" cy="${ny + 5}" r="2.6" fill="${ak}"/>`;
}

/* ── 03 · RAPORLAMA VE ŞEFFAFLIK ─────────────────────────────────────────
   TEK ekran çerçevesi ("aynı ekranda"): üç adsız kanal satırı ortak cetvel
   üzerinde kendi katkısını doldurur; katkılar aşağıda TEK konsolide şeride
   üç GÖRÜNÜR parça olarak iner (şeffaflık: bütünün içindeki paylar
   seçilebilir); şeritten tek sonuç halkası kapanır — TİK YOK, sayfanın
   SSS'i sonuç garanti etmiyor.
   Kardeş .akis figürüyle fark: burada TABLO yok, "—" hücresi yok,
   üç-çizgi-birleşme yok — o kesit kardeş figürün.
   ÖLÇÜ NOTU — IŞIK DARBESİ (120, 204) noktasında: konsolide şerit
   (y 190..218) bilerek oraya kondu — darbe geçerken TEK RAPOR yanar.
   Kanal satırlarının alt kenarı DY+150, darbeye 54 px → yarıçap dışı;
   satır zeminleri de ışık sızmasını kesiyor. */
function raporlamaSeffaflik(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- ekran çerçevesi --------------------------------------------------- */
  const sx = bx + 16, sw = 214, sy = DY + 14, sh = 294;
  s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10"
          fill="rgba(255,255,255,${(0.020 + 0.020 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<circle cx="${bx + 30}" cy="${DY + 30}" r="3"
          fill="rgba(${A},${(0.40 + 0.40 * p).toFixed(2)})"/>`;
  s += `<rect x="${bx + 40}" y="${DY + 27}" width="60" height="6" rx="3"
          fill="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})"/>`;
  s += `<line x1="${bx + 24}" y1="${DY + 44}" x2="${bx + 222}" y2="${DY + 44}"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;

  /* --- üç kanal satırı: gövde ve cetvel birebir aynı, KATKI farklı ------- */
  const rX = bx + 28, rW = 190, rH = 28;
  const rowY = [DY + 50, DY + 86, DY + 122];
  const katki = [0.86, 0.64, 0.46];               // sayfanın tezi: katkılar farklıdır
  const dolgu = katki.map((_, i) => kis01((p - 0.06 - i * 0.13) / 0.30));

  for (let i = 0; i < 3; i++) {
    const ry = rowY[i];
    s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="8" fill="rgba(14,17,24,.72)"/>`;
    s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="8"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
    /* adsız kanal pulu — üçünde birebir aynı */
    s += `<rect x="${rX + 8}" y="${ry + 7}" width="14" height="14" rx="4"
            fill="rgba(255,255,255,${(0.04 + 0.04 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.12 + 0.14 * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += `<circle cx="${rX + 15}" cy="${ry + 14}" r="2.2"
            fill="rgba(${A},${(0.30 + 0.40 * p).toFixed(2)})"/>`;
    s += `<rect x="${rX + 30}" y="${ry + 11.5}" width="26" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.11 + 0.15 * p).toFixed(3)})"/>`;
    /* ortak cetvel: boş ray üçünde aynı — katkı dolgusu tek fark */
    s += `<rect x="${rX + 66}" y="${ry + 10}" width="120" height="8" rx="4"
            fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${rX + 66}" y="${ry + 10}" width="${(120 * katki[i] * dolgu[i]).toFixed(1)}" height="8" rx="4"
            fill="rgba(${A},${(0.28 + 0.46 * p).toFixed(3)})"/>`;
  }

  /* --- satırlardan konsolide şeride inen akış --------------------------- */
  const segX = [bx + 32, bx + 112, bx + 171, bx + 214];   // parça sınırları
  const segd = katki.map((_, i) => kis01((p - 0.30 - i * 0.12) / 0.26));
  for (let i = 0; i < 3; i++) {
    const cxs = (segX[i] + segX[i + 1]) / 2;
    s += `<line x1="${cxs.toFixed(1)}" y1="${DY + 154}" x2="${cxs.toFixed(1)}" y2="${DY + 186}"
            stroke="rgba(${A},${(0.10 + 0.34 * segd[i] * p).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}" stroke-linecap="round"/>`;
  }

  /* --- TEK konsolide şerit: üç görünür parça — darbe tam üstünden geçer -- */
  const kY = DY + 190, kH = 28;
  s += `<rect x="${rX}" y="${kY}" width="${rW}" height="${kH}" rx="8" fill="rgba(14,17,24,.72)"/>`;
  s += `<rect x="${rX}" y="${kY}" width="${rW}" height="${kH}" rx="8"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.16 + 0.30 * p).toFixed(3)})" stroke-width="1.3"/>`;
  for (let i = 0; i < 3; i++) {
    const x0 = segX[i], x1 = segX[i + 1];
    /* parça dolgu opaklığı üçünde AYNI formül — fark yalnız genişlik */
    s += `<rect x="${x0}" y="${kY + 4}" width="${((x1 - x0) * segd[i]).toFixed(1)}" height="${kH - 8}" rx="4"
            fill="rgba(${A},${(0.26 + 0.40 * p).toFixed(3)})"/>`;
  }
  /* parça ayraçları: bütünün içindeki paylar GÖRÜNÜR — şeffaflık.
     3 px ve tam boy: ışık darbesi şeridin üstünden geçerken de seçilsin */
  [1, 2].forEach((i) => {
    s += `<line x1="${segX[i]}" y1="${kY + 2}" x2="${segX[i]}" y2="${kY + kH - 2}"
            stroke="rgba(14,17,24,${(0.62 + 0.25 * segd[i]).toFixed(2)})" stroke-width="3"/>`;
  });

  /* --- şeritten tek sonuca ----------------------------------------------- */
  s += `<line x1="${bx + 123}" y1="${DY + 218}" x2="${bx + 123}" y2="${DY + 246}"
          stroke="rgba(${A},${(0.12 + 0.36 * p).toFixed(3)})" stroke-width="1.5"
          stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}"/>`;
  const sonuc = kis01((p - 0.58) / 0.32);
  const oy = DY + 264;
  const nab = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);   // turda tam 2 nabız
  if (sonuc > 0.02) {
    s += `<circle cx="${bx + 123}" cy="${oy}" r="${(20 + 3 * nab).toFixed(1)}" fill="none"
            stroke="rgba(${A},${(0.14 * sonuc * (0.5 + 0.5 * nab)).toFixed(3)})" stroke-width="1.2"/>`;
  }
  const cev = 2 * Math.PI * 13;
  s += `<circle cx="${bx + 123}" cy="${oy}" r="13" fill="rgba(${A},${(0.08 * sonuc).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.55 * sonuc).toFixed(3)})" stroke-width="1.7"
          stroke-dasharray="${cev.toFixed(1)}" stroke-dashoffset="${(cev * (1 - sonuc)).toFixed(1)}"
          transform="rotate(-90 ${bx + 123} ${oy})"/>`;
  s += `<circle cx="${bx + 123}" cy="${oy}" r="4"
          fill="rgba(255,255,255,${(0.20 + 0.55 * sonuc).toFixed(2)})"/>`;

  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
