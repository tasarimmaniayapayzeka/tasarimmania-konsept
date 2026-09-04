/* SAHNE — mobil / ios-android
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Mağaza Onay ve Yayınlama Süreci
 *      "App Store ve Google Play, her sürümü kendi inceleme kriterlerine göre
 *       değerlendirir; gizlilik bildirimleri, izin metinleri ve ikon
 *       standartları platforma göre farklılaşır. Native geliştirme sürecinde
 *       bu gereksinimler baştan uygulama mimarisine dahil edilir, böylece
 *       inceleme aşamasında geri çevrilme riski azalır."
 *   02 Sürüm Yönetimi ve Cihaz Uyumluluğu
 *      "Farklı ekran boyutları, işletim sistemi sürümleri ve donanım
 *       kapasiteleri için ayrı test matrisleri oluşturulur. Native derleyici,
 *       her cihaz sınıfında performansı ayrı ayrı optimize etmeye imkan tanır;
 *       bu da eski veya düşük donanımlı cihazlarda da stabil çalışmayı güvence
 *       altına alır."
 *   03 Arka Plan Görevleri ve Bildirim Altyapısı
 *      "Konum takibi, senkronizasyon veya ölçüm gibi arka planda çalışması
 *       gereken işlemler, işletim sisteminin enerji yönetimi kurallarına native
 *       seviyede uyarlanır. Anlık bildirim altyapısı da platforma özgü
 *       servislerle kurulur, böylece teslim oranı ve gecikme performansı
 *       yüksek tutulur."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 uygulama paketinin içinde üç gereksinim (gizlilik bildirimi · izin
 *      metni · ikon standardı) daha en baştan duruyor; akış İKİ EŞİT inceleme
 *      sütununa ayrılıyor, her sütun aynı üç kriteri KENDİ sırasıyla
 *      karşılıyor; kriterler kapanınca kapı açılıyor ve sürüm karosu yayın
 *      bandına iniyor;
 *   02 sayfanın saydığı üç boyut için üç ayrı test matrisi; tek bir tarama
 *      çizgisi üçünü de aynı anda, aynı yükseklikte geziyor; sonuçlar native
 *      derleyiciye iniyor, derleyici üç cihaz sınıfına ayrı çıktı veriyor —
 *      sınıfların ölçüsü ve donanım kapasitesi farklı, altlarındaki kararlılık
 *      izi birebir aynı;
 *   03 iki eşit bildirim servisi aynı cihaza ulaşıyor, ekranın üstüne bildirim
 *      kartları oturuyor, altta arka plan işi ilerliyor; en altta enerji
 *      yönetimi ritmi: izinli pencereler ile uyku aralıkları sırayla geçiyor ve
 *      üç arka plan görevi yalnız izinli pencerelerin üstünde duruyor.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER ───────────────────────────────────────────────────────────
 * Videodaki TEK yazı bu üç etikettir (dosyada bir tane `yaz()` çağrısı var,
 * ham `<text>` hiç yok — sayıldı). Ayrıntıyı şekiller taşıyor.
 * Etiketler adımların kısaltmasıdır; 246 px istasyona sığdığı KOD HESABIYLA
 * DEĞİL, basılıp mürekkep genişliği piksel taranarak doğrulandı (28 px,
 * Consolas, ağırlık 600, harf arası 1,2). Ölçüm hattı teknik-seo sahnesinin
 * kayıtlı değeriyle sağlaması yapıldı: "01 DENETİM" burada da 164 px çıktı.
 *   "01 ONAY+YAYIN"      213 px  ✓ SEÇİLDİ (adımın iki yarısını da adlandırır)
 *   "01 ONAY + YAYIN"    247 px  ✗ TAŞAR — yalnız boşluklar yüzünden, 1 px ile
 *   "01 MAĞAZA ONAYI"    246 px  (tam sınır, payı sıfır — seçilmedi)
 *   "01 YAYIN ONAYI"     229 px  (denendi, seçilmedi)
 *   "02 UYUMLULUK"       198 px  ✓ SEÇİLDİ (adımın ikinci yarısı; birinci
 *                                yarısı — sürüm/test matrisi — çizimde)
 *   "02 TEST MATRİSİ"    246 px  (tam sınır — seçilmedi)
 *   "02 CİHAZ TESTİ"     229 px  (denendi, seçilmedi)
 *   "03 BİLDİRİM"        180 px  ✓ SEÇİLDİ (adımın ikinci yarısı; birinci
 *                                yarısı — arka plan görevleri + enerji
 *                                pencereleri — durağın alt üçte birinde)
 *   "03 ARKA PLAN"       197 px  (denendi, seçilmedi)
 *   "03 ARKA+BİLDİRİM"   264 px  ✗ TAŞAR   "03 GÖREV+BİLDİRİM" 280 px ✗ TAŞAR
 * Etiketler ayrıca SAHNENİN İÇİNDE, basılmış karede ölçüldü (y 478-528 bandı,
 * her durağın 246 px'lik yuvası taranarak):
 *   01 mürekkep 213 px · solda 16, sağda 17 px boşluk
 *   02 mürekkep 196 px · solda 25, sağda 25 px boşluk
 *   03 mürekkep 180 px · solda 33, sağda 33 px boşluk
 *
 * ── YASAK (yasaklar.md "## mobil" MODÜL GENELİ + "ios-android") ─────────
 *  - MAĞAZA LOGOSU / MAĞAZAYA BENZEYEN SİMGE YOK: elma, robot, oyun düğmesi,
 *    çokgen rozet, mağaza vitrini hiçbir yerde çizilmedi. 01'in iki inceleme
 *    sütunu ADSIZ ve işaretsiz; sayfa "App Store ve Google Play" diyor ama
 *    videoda ne ad ne işaret var (videoda zaten durak etiketleri dışında hiç
 *    yazı yok). 03'ün iki servisi de adsız.
 *  - İKİ PLATFORM EŞİT (bu sayfanın en sıkı maddesi): 01'in iki inceleme
 *    sütunu ve 03'ün iki bildirim servisi birbirinin BİREBİR eşi — aynı
 *    genişlik, aynı yükseklik, aynı köşe, aynı dolgu, aynı kontur, aynı
 *    gecikme. Tek fark 01'de kriter SIRASI (sayfa "platforma göre farklılaşır"
 *    diyor); aynı üç glif iki sütunda da birer kez geçtiği için toplam
 *    mürekkep eşit. PİKSEL ÖLÇÜMÜ aşağıda — koda bakılıp geçilmedi.
 *  - RAKAM YOK: indirme, sürüm numarası, cihaz/test sayısı, yüzde, teslim
 *    oranı, gecikme süresi, pil yüzdesi — hiçbiri yazılmadı. Göstergelerin
 *    üzerinde sayı yok. Tek rakam durak numaraları (01/02/03), sayfanın kendi
 *    numaralandırması.
 *  - MARKA/ÜRÜN/DİL LOGOSU YOK, İNSAN YÜZÜ YOK. Cihaz çerçeveleri jenerik:
 *    çentik, kamera adası ya da tanınabilir silüet çizilmedi.
 *
 * ── EŞİTLİK — PİKSEL ÖLÇÜLDÜ, TEK KAREDE DEĞİL DÖNGÜ ORTALAMASINDA ──────
 * Ölçüm yöntemi: karşılaştırılan iki kutunun ortalama parlaklığı, durağın
 * GÖRÜNÜR OLDUĞU pencerenin bütün karelerinde (01 için faz 0,02-0,38; 03 için
 * 0,62-0,98) toplanıp ortalandı. Aynı kutular BOŞ KABUKTA (motor.kabuk(''),
 * içinde hiç çizim yok) da ölçüldü ki kalan farkın sahneden mi motorun kendi
 * ışığından mı geldiği ayrılabilsin:
 *   01 sol sütun  47,99   sağ sütun  48,27   → fark %0,58
 *      (aynı kutular boş kabukta 21,26 / 24,04 → %11,56)
 *   03 sol servis 36,69   sağ servis 36,47   → fark %0,62
 *      (aynı kutular boş kabukta 21,69 / 19,57 → %9,81)
 * Yani motorun `zeminHale` halesi tuvalin ortasından (x=560) dışarı sönen bir
 * yatay rampa yaratıyor ve 01'de SAĞI, 03'te SOLU parlak gösteriyor (boş kabuk
 * değerleri bunu birebir doğruluyor). Kalan fark bu rampanın YÖNÜNÜ izliyor
 * ama büyüklüğü çok küçük: %11,56 → %0,58 (yirmide bir) ve %9,81 → %0,62
 * (on altıda bir). Sahne rampayı yaratmıyor, ONU KESİYOR.
 * KESEN ŞEY `zemin()` TABANI: her ölçülen kutunun altına rgba(14,17,24,.88)
 * yarı geçirmez bir plaka kondu. Ölçüldü — plaka .78 iken fark %0,99 ve %0,94
 * idi, .88'e çıkarılınca %0,58 ve %0,62'ye indi. (Desen teknik-seo sahnesinden;
 * orada da aynı rampa ölçülmüştü.)
 * IŞIK DARBESİ İKİ ÇİFTİN DE ÜSTÜNE HİÇ DÜŞMÜYOR — motorun kendi
 * seritNokta() fonksiyonuyla, durağın görünür olduğu bütün karelerde
 * hesaplandı: darbe merkezinin iki inceleme sütununun kutusuna en kısa
 * uzaklığı 58,6 px, iki bildirim servisininkine 83,5 px; darbe yarıçapı 52.
 * (Ayrıca 01'de ışık alanı x=188 ekseninde tam simetrik — eşlenik fazlarda
 * sapma 0,0000 px — ama sütunlar zaten menzil dışında olduğu için buna
 * dayanılmadı, ölçüm kutuların kendisinde yapıldı.)
 * EŞİT OLMAYAN, BİLEREK: 02'nin üç cihaz sınıfı. Ölçüleri (26/32/38 × 46/58/70)
 * ve donanım kapasitesi çubukları farklı, çünkü sayfa "farklı ekran boyutları"
 * ve "eski veya düşük donanımlı cihazlar" diyor. Bu üçü İKİ PLATFORM DEĞİL,
 * sayfanın kendi ayırdığı cihaz sınıfları. Sayfanın onlar hakkındaki İDDİASI
 * — "her cihaz sınıfında stabil çalışma" — eşit olan şeyde: üç sınıfın
 * altındaki kararlılık izi aynı genişlikte (40), aynı genlikte (1,8), aynı
 * fazda ve aynı renkte çiziliyor.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ───────
 * .akis üç durağı şöyle çiziyor: (1) İKİ TASARIM DİLİ — yan yana iki telefon,
 * solda liste + sekme çubuğu, sağda kart yığını + yuvarlak eylem düğmesi,
 * altlarında "Swift / Human Interface" ve "Kotlin / Material Design";
 * (2) DONANIM KATMANI — beş donanım satırı (kamera, ivmeölçer, GPS, parmak izi,
 * Bluetooth), dikey "Donanım API" bandı ve sağda telefon; (3) İKİ KOD TABANI —
 * iki kod penceresi (Swift/Kotlin sekmeleri), altta "Ayrı kod tabanı, birlikte
 * ilerler" bandı.
 * Bu sahne sayfanın BAŞKA bir kesitini çizer, o üç durağı tekrarlamaz:
 *  · Kardeş figür sayfanın "Derinlemesine" bölümünü (tasarım dili → donanım →
 *    kod tabanı) çiziyor; bu sahne "Ayrıntılar"daki 01/02/03 listesini
 *    (mağaza onayı → uyumluluk → arka plan/bildirim) çiziyor. Ortak tek konu
 *    yok.
 *  · Kardeş figürdeki hiçbir öğe burada tekrarlanmadı: telefon içi liste/kart
 *    düzeni YOK, sekme çubuğu YOK, yuvarlak eylem düğmesi YOK, "Donanım API"
 *    bandı ve beş donanım satırı YOK, kod penceresi ve kod satırı çubukları
 *    YOK. Bu sahnedeki cihaz çerçeveleri kardeş figürdekinin kopyası değil:
 *    orada iki eşit telefon "iki tasarım dili" için, burada üç FARKLI ölçüde
 *    çerçeve "cihaz sınıfı" için, ve 03'te tek çerçeve "bildirimi alan cihaz"
 *    için var.
 *  · ÇELİŞMEYEN, DOĞRULAYAN nokta: kardeş figür "iki ayrı kod tabanı" diyor.
 *    Bu sahne 02'de derleyicinin GİRDİSİNE kaynak/kod tabanı ÇİZMEDİ —
 *    derleyiciye yalnız test matrisleri iniyor, çıkışında cihaz sınıfları var.
 *    Böylece "tek kod tabanı" izlenimi doğmuyor, kardeş figürle çatışmıyor.
 *  · İki platformun eşitliği iki figürde de aynı: kardeş figürün altyazısı
 *    "İki platform bilerek eşit ağırlıkta çizildi" diyor; bu sahnede aynı şey
 *    ölçülerek sağlandı (yukarıdaki %0,58 / %0,62).
 *
 * ── DÖNGÜ DİKİŞİ — SIÇRAMA SAHNEDE DEĞİL KODLAYICIDA ───────────────────
 * Önce KAYNAK karelerde (mp4 hiç yokken, PNG'ler üzerinde) ölçüldü:
 *   ardışık kare farkı ortalama 0,258 · en büyük 0,449 · döngü dikişi 0,040
 *   → oran 0,15× — yani dikiş, normal iki kare arasındaki farkın ALTIDA BİRİ.
 * Sahne faz cinsinden periyodik. Kalan sıçrama mp4 nicemlemesinden geliyor;
 * aynı sahne üç ayarla basılıp ölçüldü:
 *   crf 26 → dikiş 0,68  oran 1,79×  (175 KB) ✗ EŞİĞİ (1,60) AŞIYOR
 *   crf 24 → dikiş 0,61  oran 1,57×  (220 KB) ✓ ama payı 0,03
 *   crf 22 → dikiş 0,53  oran 1,37×  (273 KB) ✓ SEÇİLDİ — payı 0,23
 * BU SAHNE crf 22 İLE BASILIR. `uret.js` motorun varsayılanı olan crf 26 ile
 * basar ve o ayar eşiği AŞAR; üretim komutu şudur:
 *   node -e "const m=require('./plan/video-uret/motor.js');
 *            m.uret('modul-mobil/ios-android','mobil',
 *                   require('./plan/video-uret/sahne-ios-android.js'),{crf:22})"
 * Faz cinsinden periyodiklik kuralı: tüm kaydırmalar "4 7" deseni (periyot 11)
 * ve turda 44 px — tam 4 devir. Bir bağ önce "3 4" desenliydi (periyot 7);
 * 44/7 tam sayı olmadığı için o bağ döngü noktasında sıçrıyordu, düzeltildi.
 * Tarama çizgisi, zaman imleci, yayılım yayları, kararlılık izi ve arka plan
 * ilerlemesi kosinüs; derleyicinin çentikleri turda tam 3 devir ve uçlarda
 * sönümlü.
 *
 * ── OYNATMA (headless Chrome + CDP, GERÇEK ZAMANLI beklenerek) ──────────
 * --autoplay-policy bayrağı KULLANILMADI; --virtual-time-budget de
 * kullanılmadı (medya saatini ilerletmiyor, DEVIR.md tuzak #2).
 *   normal                        : paused=false, currentTime 1,83 → 3,54
 *   --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *   kaynak ios-android.mp4 · data-dongu VAR · öğe görünür (rectTop 237)
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 ONAY+YAYIN' },
  { x: 437, fazMerkez: 0.50, etiket: '02 UYUMLULUK' },
  { x: 812, fazMerkez: 0.80, etiket: '03 BİLDİRİM' },
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
    s += (i === 0 ? onayVeYayin(d.x, p, faz, a)
       : i === 1 ? uyumluluk(d.x, p, faz, a)
       : bildirimVeArkaPlan(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* Yarı geçirmez koyu taban. NEDEN VAR: motorun `zeminHale` halesi tuvalin
   ortasından (x=560) dışarı doğru sönen bir yatay rampa yaratıyor; iki eşit
   sütunu bu rampanın üstüne koyarsan sütunlardan biri her zaman daha parlak
   olur. Taban rampayı keser. Ölçülen öncesi/sonrası değerler dosya başındaki
   "EŞİTLİK" bölümünde. (Desen teknik-seo sahnesinden alındı.) */
function zemin(x, y, w, h, r) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="rgba(14,17,24,.88)"/>`;
}

/* ═════════════════════════════════════════════════════════════════════════
   01 · MAĞAZA ONAY VE YAYINLAMA SÜRECİ
   ─────────────────────────────────────────────────────────────────────────
   Üstte uygulama paketi: üç gereksinim (gizlilik bildirimi · izin metni ·
   ikon standardı) daha en baştan mimarinin İÇİNDE duruyor. Paketten çıkan
   akış İKİ EŞİT inceleme sütununa ayrılıyor; her sütunun kendi kriter sırası
   var (sayfa: "platforma göre farklılaşır") ama gövde, ölçü, kontur, dolgu ve
   gecikme birebir aynı. Kriterler karşılanınca kapı açılıyor ve sürüm karosu
   yayın bandına iniyor.
   İKİ SÜTUN ADSIZ: mağaza markası, logosu, mağazaya benzeyen simge yok.
   ═════════════════════════════════════════════════════════════════════════ */
function onayVeYayin(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const { karis } = a;
  const CX = bx + 123;                       // panelin tam ortası — ayna ekseni
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- paket: uygulama mimarisi + gömülü gereksinimler ------------------ */
  const px = CX - 100, py = DY + 8, pw = 200, ph = 48;
  s += zemin(px, py, pw, ph, 11);
  s += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="11"
          fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${px + 12}" y="${py + 7}" width="46" height="6" rx="3"
          fill="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})"/>`;
  /* üç gereksinim çipi — sırası paket içinde sabit */
  for (let i = 0; i < 3; i++) {
    const cx0 = px + 11 + i * 63, cy0 = py + 18;
    const gel = kis01((p - i * 0.05) / 0.30);
    s += `<rect x="${cx0}" y="${cy0}" width="58" height="24" rx="7"
            fill="rgba(${A},${(0.06 + 0.13 * gel).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.42 * gel).toFixed(3)})" stroke-width="1.2"/>`;
    s += gereklilikGlifi(i, cx0 + 4, cy0 + 3, A, p);
    s += `<rect x="${cx0 + 28}" y="${cy0 + 9}" width="24" height="6" rx="3"
            fill="rgba(255,255,255,${(0.12 + 0.20 * gel).toFixed(3)})"/>`;
  }

  /* --- paketten iki sütuna ayrılan akış --------------------------------- */
  const ak = (faz * 44).toFixed(1);          // desen 4+7=11; turda tam 4 desen
  s += `<path d="M${CX} ${DY + 56} V${DY + 62} M${CX - 57} ${DY + 62} H${CX + 57}
          M${CX - 57} ${DY + 62} V${DY + 68} M${CX + 57} ${DY + 62} V${DY + 68}"
          fill="none" stroke="rgba(${A},${(0.16 + 0.44 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="4 7" stroke-dashoffset="-${ak}" stroke-linecap="round"/>`;

  /* --- İKİ İNCELEME SÜTUNU ---------------------------------------------
     BİREBİR AYNI: genişlik 100, yükseklik 106, köşe 10, dolgu, kontur, üç
     yuva ölçüsü, onay gecikmesi. TEK FARK kriter sırası — sayfa "gizlilik
     bildirimleri, izin metinleri ve ikon standartları platforma göre
     farklılaşır" diyor. Aynı üç glif iki sütunda da bir kez geçiyor, yani
     iki sütunun toplam mürekkebi eşit. Piksel ölçümü dosya başında. */
  const lw = 100, lh = 106, ly = DY + 68;
  const lx = [CX - 107, CX + 7];
  const sira = [[0, 1, 2], [2, 0, 1]];

  lx.forEach((x0, s0) => {
    s += zemin(x0, ly, lw, lh, 10);
    s += `<rect x="${x0}" y="${ly}" width="${lw}" height="${lh}" rx="10"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* sütun başlığı — iki sütunda birebir aynı çubuk */
    s += `<rect x="${x0 + 10}" y="${ly + 8}" width="44" height="6" rx="3"
            fill="rgba(255,255,255,${(0.13 + 0.19 * p).toFixed(3)})"/>`;
    s += `<circle cx="${x0 + 84}" cy="${ly + 11}" r="4"
            fill="rgba(${A},${(0.20 + 0.45 * p).toFixed(3)})"/>`;

    for (let i = 0; i < 3; i++) {
      const yx = x0 + 5, yy = ly + 20 + i * 28;
      const onay = kis01((p - i * 0.08) / 0.30);     // İKİ SÜTUNDA DA AYNI
      s += `<rect x="${yx}" y="${yy}" width="90" height="26" rx="8"
              fill="rgba(255,255,255,${(0.026 + 0.030 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.08 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
      s += `<rect x="${yx + 3}" y="${yy + 3}" width="20" height="20" rx="6"
              fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
      s += gereklilikGlifi(sira[s0][i], yx + 4, yy + 4, A, p);
      s += `<rect x="${yx + 27}" y="${yy + 9}" width="30" height="7" rx="3.5"
              fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
      /* onay halkası */
      const qx = yx + 76, qy = yy + 13;
      s += `<circle cx="${qx}" cy="${qy}" r="7.5" fill="rgba(${A},${(0.10 * onay).toFixed(3)})"
              stroke="rgba(${A},${(0.16 + 0.56 * onay).toFixed(3)})" stroke-width="1.4"/>`;
      s += `<path d="M${qx - 3.6} ${qy + 0.3} L${qx - 1} ${qy + 3.2} L${qx + 3.9} ${qy - 3}"
              fill="none" stroke="rgba(255,255,255,${(0.20 + 0.68 * onay).toFixed(2)})"
              stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"
              stroke-dasharray="13" stroke-dashoffset="${(13 * (1 - onay)).toFixed(2)}"/>`;
    }
  });

  /* --- iki sütundan sürüm karosuna inen birleşme ------------------------ */
  s += `<path d="M${CX - 57} ${DY + 174} L${CX - 12} ${DY + 204}
          M${CX + 57} ${DY + 174} L${CX + 12} ${DY + 204}"
          fill="none" stroke="rgba(${A},${(0.14 + 0.42 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="4 7" stroke-dashoffset="-${ak}" stroke-linecap="round"/>`;

  /* --- YAYIN KAPISI: iki inceleme de tamamlanınca açılır ----------------
     Kriterlerin sonuncusu p=0,46'da kapanıyor; kapı p=0,30-0,50 arasında
     açılıyor, karo p=0,52'de inmeye başlıyor. Yani sıra: onaylar → kapı →
     iniş. Kapı KANATLARI iki yana eşit kayıyor. */
  const acilma = kis01((p - 0.30) / 0.20);
  const kW = 64, kY = DY + 252, kH = 11;
  [-1, 1].forEach((yon) => {
    const kx = yon < 0 ? CX - kW - 32 * acilma : CX + 32 * acilma;
    /* kanat + iç uçta dikey söve: iki düz çubuk "kapı" gibi okunmuyordu */
    s += `<rect x="${kx.toFixed(1)}" y="${kY}" width="${kW}" height="${kH}" rx="5.5"
            fill="rgba(255,255,255,${(0.06 + 0.06 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.24 + 0.50 * p).toFixed(3)})" stroke-width="1.4"/>`;
    const sx0 = yon < 0 ? kx + kW - 3.4 : kx - 2.6;
    s += `<rect x="${sx0.toFixed(1)}" y="${kY - 7}" width="6" height="${kH + 14}" rx="3"
            fill="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})"/>`;
  });

  /* --- yayın bandı ------------------------------------------------------
     TEK ve ORTALANMIŞ olması bilerek: bant MAĞAZA RAFI değil, uygulamanın
     "yayında" durumu. İki inceleme tek bir uygulamaya ait; iki mağaza
     rafı çizmek ikinci bir eşitlik yükü getirirdi ve sayfa böyle bir ayrım
     yapmıyor. Bant içine liste satırı, kart ya da mağaza düzeni ÇİZİLMEDİ.
     ÖLÇÜ NOTU: ilk sürüm 200×60 idi, içinde 36'lık karo tek başına duruyor
     ve bant boş görünüyordu (önizlemede görüldü); 158×56'ya indirildi,
     karo 40'a büyütüldü. */
  const by = DY + 278, bh = 56;
  s += `<rect x="${CX - 79}" y="${by}" width="158" height="${bh}" rx="14"
          fill="rgba(${A},${(0.030 + 0.055 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.14 + 0.30 * p).toFixed(3)})" stroke-width="1.3"/>`;

  /* --- sürüm karosu: kapı açılınca banda iner --------------------------- */
  const inis = kis01((p - 0.52) / 0.34);
  const tS = 40;
  const tY = karis(DY + 204, by + (bh - tS) / 2, inis);
  const yerlesti = kis01((inis - 0.86) / 0.14);
  if (yerlesti > 0.02) {
    s += `<rect x="${CX - tS / 2 - 9}" y="${(tY - 9).toFixed(1)}" width="${tS + 18}" height="${tS + 18}" rx="16"
            fill="none" stroke="rgba(255,255,255,${(0.42 * yerlesti * p).toFixed(3)})" stroke-width="1.5"/>`;
  }
  s += `<rect x="${CX - tS / 2}" y="${tY.toFixed(1)}" width="${tS}" height="${tS}" rx="12"
          fill="rgba(${A},${(0.28 + 0.34 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.34 + 0.44 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${CX - tS / 2 + 8}" y="${(tY + 11).toFixed(1)}" width="${tS - 16}" height="6" rx="3"
          fill="rgba(255,255,255,${(0.18 + 0.24 * p).toFixed(3)})"/>`;
  s += `<rect x="${CX - tS / 2 + 8}" y="${(tY + 22).toFixed(1)}" width="${tS - 24}" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.11 + 0.16 * p).toFixed(3)})"/>`;

  return s;
}

/* Üç gereksinim glifi — 20×20 kutuya oturur. Hepsi sayfanın kendi cümlesinden:
   "gizlilik bildirimleri, izin metinleri ve ikon standartları".
   Mağaza markası, logosu ya da mağazaya benzeyen işaret YOK. */
function gereklilikGlifi(i, ix, iy, A, p) {
  const c = `rgba(255,255,255,${(0.30 + 0.40 * p).toFixed(3)})`;
  const ak = `rgba(${A},${(0.36 + 0.46 * p).toFixed(3)})`;
  const cx = ix + 9;
  if (i === 0) {
    /* gizlilik bildirimi: kalkan */
    return `<path d="M${cx} ${iy + 1.6} L${ix + 16.4} ${iy + 4.6} V${iy + 9.4}
              C${ix + 16.4} ${iy + 13.4} ${cx + 3.4} ${iy + 15.6} ${cx} ${iy + 16.4}
              C${cx - 3.4} ${iy + 15.6} ${ix + 1.6} ${iy + 13.4} ${ix + 1.6} ${iy + 9.4}
              V${iy + 4.6} Z" fill="rgba(${A},${(0.10 + 0.20 * p).toFixed(3)})"
              stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>
            <path d="M${cx - 3.2} ${iy + 8.6} L${cx - 0.6} ${iy + 11.2} L${cx + 3.8} ${iy + 6}"
              fill="none" stroke="${ak}" stroke-width="1.6" stroke-linecap="round"
              stroke-linejoin="round"/>`;
  }
  if (i === 1) {
    /* izin metni: anahtar.
       İLK SÜRÜM BÜYÜTEÇ GİBİ OKUNUYORDU — halka + ÇAPRAZ sap tam olarak
       büyüteç işaretidir, önizlemede öyle göründü. Sap YATAY yapıldı ve
       dişler aşağı indirildi; büyüteçte diş yoktur, artık karışmıyor. */
    return `<circle cx="${ix + 5.6}" cy="${iy + 10}" r="3.6" fill="none" stroke="${c}" stroke-width="1.5"/>
            <path d="M${ix + 9.2} ${iy + 10} H${ix + 17.4}" stroke="${ak}"
              stroke-width="1.7" stroke-linecap="round"/>
            <path d="M${ix + 13.2} ${iy + 10.4} V${iy + 14.4}
              M${ix + 16.4} ${iy + 10.4} V${iy + 13.2}"
              stroke="${ak}" stroke-width="1.5" stroke-linecap="round"/>`;
  }
  /* ikon standardı: yuvarlatılmış kare + hizalama kılavuzları */
  return `<rect x="${ix + 3.4}" y="${iy + 3.4}" width="11.2" height="11.2" rx="3.6"
            fill="rgba(${A},${(0.10 + 0.20 * p).toFixed(3)})" stroke="${c}" stroke-width="1.4"/>
          <path d="M${ix + 1} ${iy + 9} H${ix + 17} M${ix + 9} ${iy + 1} V${iy + 17}"
            stroke="${ak}" stroke-width="1" stroke-dasharray="2 2.6"/>`;
}

/* ═════════════════════════════════════════════════════════════════════════
   02 · SÜRÜM YÖNETİMİ VE CİHAZ UYUMLULUĞU
   ─────────────────────────────────────────────────────────────────────────
   Üstte sayfanın saydığı ÜÇ boyut için üç ayrı test matrisi: ekran boyutu ·
   işletim sistemi sürümü · donanım kapasitesi. Tek bir tarama çizgisi üç
   matrisi de AYNI ANDA, AYNI YÜKSEKLİKTE geçiyor — hiçbir matris kayrılmıyor.
   Ortada native derleyici: matrislerden gelen sonuçları alıp her cihaz sınıfı
   için ayrı çıktı veriyor. Altta üç cihaz sınıfı; ölçüleri ve donanım
   kapasiteleri BİLEREK farklı (sayfa "eski veya düşük donanımlı cihazlar"
   diyor), ama üçünün altındaki KARARLILIK İZİ birebir aynı — sayfanın iddiası
   tam olarak bu: her sınıfta stabil çalışma.
   RAKAM YOK: sürüm numarası, cihaz sayısı, test sayısı, yüzde yazılmadı.
   ═════════════════════════════════════════════════════════════════════════ */
function uyumluluk(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const CX = bx + 123;
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- üç test matrisi -------------------------------------------------- */
  const mW = 66, mY = DY + 12, mH = 98;
  const mX = [CX - 107, CX - 33, CX + 41];
  const gX = 7, gY = 36, hcW = 15, hcH = 10, hcB = 4;   // ızgara yerleşimi

  /* tarama çizgisi: turda tam iki geçiş, kosinüs → dikişsiz.
     ÜÇ MATRİSTE DE AYNI Y — biri diğerinden önce/parlak taranmıyor. */
  const tara = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
  const taraY = mY + gY + tara * (4 * hcH + 3 * hcB);

  mX.forEach((x0, m) => {
    s += zemin(x0, mY, mW, mH, 9);
    s += `<rect x="${x0}" y="${mY}" width="${mW}" height="${mH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* boyut glifi */
    s += `<rect x="${x0 + 22}" y="${mY + 7}" width="22" height="22" rx="6"
            fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += boyutGlifi(m, x0 + 22, mY + 7, A, p);

    /* ızgara — matris içindeki hücreler AYNI ANDA doluyor (soldan sağa
       gecikme YOK: teknik-seo sahnesinde bu gecikme "sağdakiler daha az"
       diye okunmuştu). Matrisler arası gecikme var: sayfa üç boyutu sırayla
       sayıyor. */
    const dol = kis01((p - m * 0.07) / 0.34);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        const hx = x0 + gX + c * (hcW + hcB), hy = mY + gY + r * (hcH + hcB);
        const vurgu = kis01(1 - Math.abs(taraY - (hy + hcH / 2)) / 15) * p;
        /* boş hücre neredeyse yalnız kontur, dolan hücre aksan: ilk sürümde
           ikisi arasındaki fark azdı ve ızgara "tuş takımı" gibi düz
           görünüyordu — önizlemede görüldü, kontrast ve tarama vurgusu açıldı.
           HÜCRELER ARASINDA SIRA YOK: bir matrisin on iki hücresi aynı anda
           doluyor (teknik-seo sahnesinde soldan sağa gecikme "sağdakiler daha
           az" diye okunmuştu). Matrisler arası gecikme var, çünkü sayfa üç
           boyutu sırayla sayıyor. */
        s += `<rect x="${hx}" y="${hy}" width="${hcW}" height="${hcH}" rx="3"
                fill="rgba(${A},${(0.02 + 0.32 * dol + 0.44 * vurgu).toFixed(3)})"
                stroke="rgba(${A},${(0.10 + 0.30 * dol + 0.34 * vurgu).toFixed(3)})" stroke-width="1"/>`;
      }
    }
    /* tarama çizgisi bu matrisin üstünde */
    s += `<line x1="${x0 + gX - 3}" y1="${taraY.toFixed(1)}" x2="${x0 + gX + 3 * hcW + 2 * hcB + 3}"
            y2="${taraY.toFixed(1)}" stroke="rgba(255,255,255,${(0.24 + 0.55 * p).toFixed(3)})"
            stroke-width="2" stroke-linecap="round" filter="url(#yumusaAz)"/>`;
  });

  /* --- matrislerden derleyiciye ---------------------------------------- */
  const ak = (faz * 44).toFixed(1);
  mX.forEach((x0) => {
    s += `<path d="M${x0 + 33} ${DY + 110} V${DY + 122} L${CX} ${DY + 134}"
            fill="none" stroke="rgba(${A},${(0.14 + 0.40 * p).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="4 7" stroke-dashoffset="-${ak}" stroke-linecap="round"/>`;
  });

  /* --- NATIVE DERLEYİCİ -------------------------------------------------
     Işık darbesi bu durakta tam buraya düşüyor (panel içinde y 292-330);
     tek parça, ortalanmış, eşitlik iddiası taşımayan bir gövde bilerek
     buraya kondu. */
  const dx = CX - 62, dy = DY + 134, dw = 124, dh = 74;
  s += zemin(dx, dy, dw, dh, 12);
  s += `<rect x="${dx}" y="${dy}" width="${dw}" height="${dh}" rx="12"
          fill="rgba(255,255,255,${(0.034 + 0.030 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.36 * p).toFixed(3)})" stroke-width="1.4"/>`;
  /* İLK SÜRÜMDE İÇERİDE KONTURLU BİR YAMUK VARDI: yuvarlak gövdenin içine
     çizilen o yamuk önizlemede ZARF gibi okunuyordu. Kaldırıldı; yerine
     giriş/çıkış ağızları ve aşağı akan çentikler geldi. */
  /* üstte tek giriş ağzı (üç matris burada birleşiyor), altta tek çıkış ağzı */
  [[dy + 6, 44], [dy + dh - 10, 44]].forEach(([ay, aw]) => {
    s += `<rect x="${(CX - aw / 2).toFixed(1)}" y="${ay}" width="${aw}" height="4" rx="2"
            fill="rgba(${A},${(0.24 + 0.44 * p).toFixed(3)})"/>`;
  });
  /* aşağı akan üç çentik — turda tam 3 çevrim; uçlarda sönümlendiği için
     sarma noktasında sıçrama yok (dikişsiz) */
  for (let k = 0; k < 3; k++) {
    const u = (faz * 3 + k / 3) % 1;
    const yk = dy + 18 + u * (dh - 36);
    const gen = 40 - 16 * u;
    const op = Math.sin(Math.PI * u) * (0.34 + 0.55 * p);
    s += `<path d="M${(CX - gen / 2).toFixed(1)} ${(yk - 4).toFixed(1)} L${CX} ${(yk + 4).toFixed(1)}
            L${(CX + gen / 2).toFixed(1)} ${(yk - 4).toFixed(1)}" fill="none"
            stroke="rgba(${A},${op.toFixed(3)})" stroke-width="2.2" stroke-linecap="round"
            stroke-linejoin="round"/>`;
  }

  /* --- derleyiciden üç cihaz sınıfına ayrı çıktı ------------------------ */
  const sinif = [
    { cx: CX - 72, w: 26, h: 46, kap: 0.34 },
    { cx: CX,      w: 32, h: 58, kap: 0.62 },
    { cx: CX + 72, w: 38, h: 70, kap: 0.90 },
  ];
  const taban = DY + 318;
  sinif.forEach((k) => {
    s += `<path d="M${CX} ${dy + dh} V${dy + dh + 10} L${k.cx} ${taban - k.h - 8}
            V${taban - k.h}" fill="none" stroke="rgba(${A},${(0.13 + 0.38 * p).toFixed(3)})"
            stroke-width="1.5" stroke-dasharray="4 7" stroke-dashoffset="-${ak}"
            stroke-linecap="round"/>`;
  });

  /* --- üç cihaz sınıfı: ölçü ve kapasite farklı, KARARLILIK İZİ AYNI ---- */
  sinif.forEach((k, i) => {
    const fx = k.cx - k.w / 2, fy = taban - k.h;
    s += zemin(fx, fy, k.w, k.h, 7);
    s += `<rect x="${fx}" y="${fy}" width="${k.w}" height="${k.h}" rx="7"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* ekran — jenerik, çentik ya da kamera adası YOK */
    s += `<rect x="${fx + 4}" y="${fy + 7}" width="${k.w - 8}" height="${k.h - 14}" rx="4"
            fill="rgba(14,17,24,.55)" stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})"
            stroke-width="1"/>`;
    s += `<rect x="${(k.cx - 4).toFixed(1)}" y="${fy + 3}" width="8" height="2" rx="1"
            fill="rgba(255,255,255,${(0.12 + 0.14 * p).toFixed(3)})"/>`;
    /* donanım kapasitesi çubuğu — sınıfa göre BİLEREK farklı */
    const cw = k.w - 12;
    s += `<rect x="${fx + 6}" y="${fy + 12}" width="${cw}" height="5" rx="2.5"
            fill="rgba(255,255,255,.06)"/>`;
    s += `<rect x="${fx + 6}" y="${fy + 12}" width="${(cw * k.kap).toFixed(1)}" height="5" rx="2.5"
            fill="rgba(${A},${(0.22 + 0.44 * p).toFixed(3)})"/>`;

    /* KARARLILIK İZİ — üç sınıfta BİREBİR aynı: aynı genişlik, aynı genlik,
       aynı faz, aynı renk. Sayfanın iddiası bu. Yükselen bir eğri DEĞİL,
       düz seyreden bir iz: sayfa "stabil çalışma" diyor, "artıyor" demiyor. */
    const iw = 40, ix0 = k.cx - iw / 2, iy0 = taban + 14;
    /* ÖLÇÜ NOTU: ilk sürüm 34 px'e İKİ tam dalga sığdırıyordu ve önizlemede
       "~~~" gibi bir tırtık okunuyordu — kararlılık değil gürültü. Genlik
       2,4'ten 1,8'e, dalga sayısı 2'den 1'e indi, taban çizgisi görünür
       yapıldı: artık düz seyreden bir iz. */
    s += `<line x1="${ix0}" y1="${iy0}" x2="${ix0 + iw}" y2="${iy0}"
            stroke="rgba(255,255,255,${(0.09 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;
    let d = '';
    for (let t = 0; t <= 16; t++) {
      const u = t / 16;
      const yv = iy0 - 1.8 * Math.sin(2 * Math.PI * (u + faz * 2));
      d += (t === 0 ? 'M' : 'L') + (ix0 + u * iw).toFixed(1) + ' ' + yv.toFixed(1);
    }
    s += `<path d="${d}" fill="none" stroke="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})"
            stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  });

  return s;
}

/* Üç test boyutunun glifi — 22×22 kutuya oturur. Sayfanın kendi üç kalemi:
   ekran boyutları · işletim sistemi sürümleri · donanım kapasiteleri.
   Mağaza, marka ya da işletim sistemi işareti YOK. */
function boyutGlifi(i, ix, iy, A, p) {
  const c = `rgba(255,255,255,${(0.30 + 0.40 * p).toFixed(3)})`;
  const ak = `rgba(${A},${(0.36 + 0.46 * p).toFixed(3)})`;
  if (i === 0) {
    /* ekran boyutları: iç içe iki çerçeve */
    return `<rect x="${ix + 3}" y="${iy + 4.5}" width="16" height="13" rx="2.6" fill="none"
              stroke="${c}" stroke-width="1.4"/>
            <rect x="${ix + 7.5}" y="${iy + 7.5}" width="7" height="7" rx="1.6" fill="none"
              stroke="${ak}" stroke-width="1.3"/>`;
  }
  if (i === 1) {
    /* işletim sistemi sürümleri: kaydırılmış üç katman (rakam YOK) */
    return `<rect x="${ix + 3.5}" y="${iy + 4}" width="13" height="5" rx="1.8" fill="none"
              stroke="${c}" stroke-width="1.3"/>
            <rect x="${ix + 5.5}" y="${iy + 9}" width="13" height="5" rx="1.8" fill="none"
              stroke="${c}" stroke-width="1.3"/>
            <rect x="${ix + 3.5}" y="${iy + 14}" width="13" height="5" rx="1.8"
              fill="rgba(${A},${(0.20 + 0.30 * p).toFixed(3)})" stroke="${ak}" stroke-width="1.3"/>`;
  }
  /* donanım kapasitesi: yonga + bacaklar */
  return `<rect x="${ix + 6}" y="${iy + 6}" width="10" height="10" rx="2.2"
            fill="rgba(${A},${(0.16 + 0.26 * p).toFixed(3)})" stroke="${c}" stroke-width="1.3"/>
          <path d="M${ix + 8.5} ${iy + 6} V${iy + 3} M${ix + 13.5} ${iy + 6} V${iy + 3}
            M${ix + 8.5} ${iy + 16} V${iy + 19} M${ix + 13.5} ${iy + 16} V${iy + 19}
            M${ix + 6} ${iy + 8.5} H${ix + 3} M${ix + 6} ${iy + 13.5} H${ix + 3}
            M${ix + 16} ${iy + 8.5} H${ix + 19} M${ix + 16} ${iy + 13.5} H${ix + 19}"
            stroke="${c}" stroke-width="1.2" stroke-linecap="round"/>`;
}

/* ═════════════════════════════════════════════════════════════════════════
   03 · ARKA PLAN GÖREVLERİ VE BİLDİRİM ALTYAPISI
   ─────────────────────────────────────────────────────────────────────────
   Üstte İKİ EŞİT bildirim servisi (sayfa: "platforma özgü servislerle
   kurulur"). İkisi birbirinin BİREBİR kopyası — ölçü, kontur, dolgu, gecikme
   aynı; ikisi de aynı anda ileti üretiyor, ikisi de aynı cihaza ulaşıyor.
   Adsız: mağaza/servis markası, logosu ya da onlara benzeyen simge yok.
   Ortada cihaz: gelen bildirim kartı ekranın üstüne oturuyor.
   Altta enerji yönetimi ritmi: bant boyunca izinli pencereler ile uyku
   aralıkları sırayla geçiyor; üç arka plan görevi (konum takibi ·
   senkronizasyon · ölçüm) yalnız izinli pencerelerin üstünde duruyor ve
   yalnız zaman imleci o pencerenin içindeyken çalışıyor.
   RAKAM YOK: teslim oranı, gecikme süresi, pil yüzdesi yazılmadı.
   ═════════════════════════════════════════════════════════════════════════ */
function bildirimVeArkaPlan(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const CX = bx + 123;
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const ak = (faz * 44).toFixed(1);
  let s = '';

  /* --- İKİ BİLDİRİM SERVİSİ: birbirinin birebir kopyası ----------------- */
  const sw = 96, sh = 84, sy = DY + 12;
  const sx = [CX - 107, CX + 11];
  sx.forEach((x0) => {
    s += zemin(x0, sy, sw, sh, 10);
    s += `<rect x="${x0}" y="${sy}" width="${sw}" height="${sh}" rx="10"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* yayın kaynağı: köşe düğümü + üç eşmerkezli yayılım yayı.
       İLK SÜRÜM DİKEY MİL + ÜSTTE YARIM DAİRE İDİ; önizlemede aynı panelin
       altındaki ÖLÇÜM KADRANI glifiyle karışıyordu (kadran da yay + ibre).
       Mil kaldırıldı, yaylar köşeden açılıyor: kadranla karışmıyor.
       Marka, mağaza ya da servis işareti DEĞİL — yalnız yayılım. */
    const ax = x0 + 22, ay = sy + 34;
    s += `<circle cx="${ax}" cy="${ay}" r="3.6" fill="rgba(${A},${(0.34 + 0.50 * p).toFixed(3)})"/>`;
    for (let k = 0; k < 3; k++) {
      const r = 10 + k * 9;
      const nb = 0.5 - 0.5 * Math.cos(2 * Math.PI * (faz * 2 - k * 0.16));
      s += `<path d="M${ax + r} ${ay} A${r} ${r} 0 0 0 ${ax} ${ay - r}" fill="none"
              stroke="rgba(${A},${(0.12 + 0.50 * nb * (0.30 + 0.70 * p)).toFixed(3)})"
              stroke-width="1.9" stroke-linecap="round"/>`;
    }
    /* iki ileti çipi — iki serviste de AYNI gecikme */
    for (let i = 0; i < 2; i++) {
      const cy0 = sy + 44 + i * 18;
      const gel = kis01((p - 0.12 - i * 0.10) / 0.30);
      s += `<rect x="${x0 + 12}" y="${cy0}" width="72" height="14" rx="5"
              fill="rgba(${A},${(0.06 + 0.16 * gel).toFixed(3)})"
              stroke="rgba(${A},${(0.14 + 0.40 * gel).toFixed(3)})" stroke-width="1.1"/>`;
      s += `<rect x="${x0 + 18}" y="${cy0 + 4}" width="${34 + i * 10}" height="6" rx="3"
              fill="rgba(255,255,255,${(0.10 + 0.22 * gel).toFixed(3)})"/>`;
    }
  });

  /* --- iki servisten cihaza inen tek yol -------------------------------- */
  s += `<path d="M${CX - 59} ${DY + 96} V${DY + 110} H${CX + 59} V${DY + 96}
          M${CX} ${DY + 110} V${DY + 128}" fill="none"
          stroke="rgba(${A},${(0.15 + 0.42 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="4 7" stroke-dashoffset="-${ak}" stroke-linecap="round"/>`;

  /* --- CİHAZ: jenerik dikey çerçeve (çentik / kamera adası YOK) --------- */
  const fw = 78, fh = 116, fx = CX - fw / 2, fy = DY + 128;
  s += zemin(fx, fy, fw, fh, 13);
  s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="13"
          fill="rgba(255,255,255,${(0.032 + 0.028 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.11 + 0.16 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${fx + 6}" y="${fy + 10}" width="${fw - 12}" height="${fh - 20}" rx="8"
          fill="rgba(14,17,24,.72)" stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})"
          stroke-width="1"/>`;
  s += `<rect x="${CX - 6}" y="${fy + 5}" width="12" height="2.4" rx="1.2"
          fill="rgba(255,255,255,${(0.12 + 0.14 * p).toFixed(3)})"/>`;
  /* gelen bildirim kartları — üstten oturuyor */
  for (let i = 0; i < 2; i++) {
    const gel = kis01((p - 0.28 - i * 0.20) / 0.30);
    if (gel <= 0.01) continue;
    const ky = fy + 16 + i * 26 - 8 * (1 - gel);
    s += `<rect x="${fx + 11}" y="${ky.toFixed(1)}" width="${fw - 22}" height="22" rx="6"
            fill="rgba(${A},${(0.10 + 0.26 * gel).toFixed(3)})"
            stroke="rgba(${A},${(0.18 + 0.44 * gel).toFixed(3)})" stroke-width="1.1"
            opacity="${gel.toFixed(3)}"/>`;
    s += `<rect x="${fx + 16}" y="${(ky + 5).toFixed(1)}" width="10" height="10" rx="3"
            fill="rgba(255,255,255,${(0.14 + 0.22 * gel).toFixed(3)})" opacity="${gel.toFixed(3)}"/>`;
    s += `<rect x="${fx + 30}" y="${(ky + 6).toFixed(1)}" width="${26 - i * 6}" height="4" rx="2"
            fill="rgba(255,255,255,${(0.14 + 0.24 * gel).toFixed(3)})" opacity="${gel.toFixed(3)}"/>`;
    s += `<rect x="${fx + 30}" y="${(ky + 13).toFixed(1)}" width="${18 + i * 6}" height="3.4" rx="1.7"
            fill="rgba(255,255,255,${(0.09 + 0.16 * gel).toFixed(3)})" opacity="${gel.toFixed(3)}"/>`;
  }
  /* ekranın alt bölümü: arka planda süren iş.
     KONUM SEÇİMİ ÖLÇÜLDÜ, KEYFİ DEĞİL: bu durakta ışık darbesi panel içinde
     y 304-357 bandında yürüyor, tepe noktası (DY+204) tam buraya düşüyor.
     İlk sürümde burası boştu ve darbe ikinci bildirim kartını yıkıyordu.
     Şimdi darbenin altında anlamı olan bir öğe var: arka plan görevi
     çalışırken bandın üzerinden geçen ilerleme. Kosinüs → dikişsiz. */
  const iz = kis01((p - 0.20) / 0.30);
  const tw = fw - 34, tx = CX - tw / 2, ty = DY + 206;
  s += `<rect x="${fx + 17}" y="${ty - 12}" width="26" height="4" rx="2"
          fill="rgba(255,255,255,${(0.10 + 0.18 * iz).toFixed(3)})"/>`;
  s += `<rect x="${tx}" y="${ty}" width="${tw}" height="8" rx="4"
          fill="rgba(255,255,255,${(0.05 + 0.05 * p).toFixed(3)})"/>`;
  const yur = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
  s += `<rect x="${(tx + (tw - 16) * yur).toFixed(1)}" y="${ty}" width="16" height="8" rx="4"
          fill="rgba(${A},${(0.26 + 0.50 * iz).toFixed(3)})"/>`;
  s += `<rect x="${fx + 17}" y="${ty + 16}" width="${(20 + 18 * iz).toFixed(1)}" height="4" rx="2"
          fill="rgba(255,255,255,${(0.08 + 0.14 * iz).toFixed(3)})"/>`;

  /* --- ENERJİ YÖNETİMİ RİTMİ ------------------------------------------- */
  const bandX = CX - 107, bandW = 214, bandY = DY + 300, bandH = 22;
  s += zemin(bandX, bandY, bandW, bandH, 11);
  s += `<rect x="${bandX}" y="${bandY}" width="${bandW}" height="${bandH}" rx="11"
          fill="rgba(255,255,255,${(0.024 + 0.022 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.08 + 0.11 * p).toFixed(3)})" stroke-width="1.1"/>`;

  const segN = 6, segB = 4, segW = (bandW - 2 * segB - (segN - 1) * 2) / segN;
  /* zaman imleci: turda tam iki gidiş-geliş, kosinüs → dikişsiz */
  const imlecT = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
  const imlecX = bandX + segB + imlecT * (bandW - 2 * segB);

  const gorev = [];
  for (let i = 0; i < segN; i++) {
    const gx = bandX + segB + i * (segW + 2);
    const izinli = i % 2 === 0;
    const icinde = imlecX >= gx && imlecX <= gx + segW ? 1 : 0;
    if (izinli) gorev.push({ x: gx + segW / 2, etkin: icinde });
    s += `<rect x="${gx.toFixed(1)}" y="${bandY + 5}" width="${segW.toFixed(1)}" height="${bandH - 10}" rx="6"
            fill="${izinli ? `rgba(${A},${(0.14 + 0.34 * p + 0.24 * icinde * p).toFixed(3)})`
              : 'rgba(255,255,255,.028)'}"
            stroke="${izinli ? `rgba(${A},${(0.22 + 0.40 * p).toFixed(3)})`
              : `rgba(255,255,255,${(0.09 + 0.08 * p).toFixed(3)})`}"
            stroke-width="1.1" ${izinli ? '' : 'stroke-dasharray="3 3"'}/>`;
  }
  s += `<line x1="${imlecX.toFixed(1)}" y1="${bandY - 4}" x2="${imlecX.toFixed(1)}" y2="${bandY + bandH + 4}"
          stroke="rgba(255,255,255,${(0.22 + 0.46 * p).toFixed(3)})" stroke-width="1.6"
          stroke-linecap="round"/>`;

  /* --- üç arka plan görevi: izinli pencerelerin üstünde ------------------ */
  gorev.forEach((g, i) => {
    const gx = g.x - 14, gy = DY + 264;
    const cnl = (0.30 + 0.70 * g.etkin) * p;
    s += `<rect x="${gx.toFixed(1)}" y="${gy}" width="28" height="28" rx="8"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p + 0.05 * g.etkin * p).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.20 * p + 0.34 * g.etkin * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += gorevGlifi(i, gx + 4, gy + 4, A, cnl);
    /* DİKİŞ NOTU: bu bağ önce "3 4" desenliydi (periyot 7) ama kaydırma
       turda 44 px — 44/7 tam sayı değil, faz 1'de desen başa dönmüyordu ve
       döngü noktasında sıçrıyordu. Desen sahnedeki öbür akışlarla aynı
       ("4 7", periyot 11): 44/11 = 4 tam devir → dikişsiz. */
    s += `<line x1="${g.x.toFixed(1)}" y1="${gy + 28}" x2="${g.x.toFixed(1)}" y2="${bandY}"
            stroke="rgba(${A},${(0.10 + 0.16 * p + 0.36 * g.etkin * p).toFixed(3)})"
            stroke-width="1.3" stroke-dasharray="4 7" stroke-dashoffset="-${ak}"/>`;
  });

  return s;
}

/* Üç arka plan görevinin glifi — 20×20 kutuya oturur. Sayfanın kendi cümlesi:
   "Konum takibi, senkronizasyon veya ölçüm gibi arka planda çalışması gereken
   işlemler". Harita, konum servisi ya da marka işareti YOK. */
function gorevGlifi(i, ix, iy, A, c0) {
  const c = `rgba(255,255,255,${(0.26 + 0.44 * c0).toFixed(3)})`;
  const ak = `rgba(${A},${(0.32 + 0.50 * c0).toFixed(3)})`;
  if (i === 0) {
    /* konum takibi: damla + merkez */
    return `<path d="M${ix + 10} ${iy + 18} C${ix + 4.4} ${iy + 10.6} ${ix + 2.6} ${iy + 8.2}
              ${ix + 2.6} ${iy + 6.4} A${7.4} ${7.4} 0 0 1 ${ix + 17.4} ${iy + 6.4}
              C${ix + 17.4} ${iy + 8.2} ${ix + 15.6} ${iy + 10.6} ${ix + 10} ${iy + 18} Z"
              fill="none" stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>
            <circle cx="${ix + 10}" cy="${iy + 6.4}" r="2.6" fill="${ak}"/>`;
  }
  if (i === 1) {
    /* senkronizasyon: iki dönen ok */
    return `<path d="M${ix + 3.4} ${iy + 10} A6.6 6.6 0 0 1 ${ix + 16.6} ${iy + 10}" fill="none"
              stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M${ix + 16.6} ${iy + 10} A6.6 6.6 0 0 1 ${ix + 3.4} ${iy + 10}" fill="none"
              stroke="${c}" stroke-width="1.5" stroke-linecap="round"
              transform="translate(0,3.4)"/>
            <path d="M${ix + 13.6} ${iy + 6.6} L${ix + 16.8} ${iy + 9.8} L${ix + 13.4} ${iy + 12.4}"
              fill="none" stroke="${ak}" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
            <path d="M${ix + 6.4} ${iy + 16.8} L${ix + 3.2} ${iy + 13.6} L${ix + 6.6} ${iy + 11}"
              fill="none" stroke="${ak}" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>`;
  }
  /* ölçüm: kadran + ibre (üzerinde rakam YOK) */
  return `<path d="M${ix + 2.6} ${iy + 14.4} A7.4 7.4 0 0 1 ${ix + 17.4} ${iy + 14.4}" fill="none"
            stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M${ix + 10} ${iy + 14.4} L${ix + 14.4} ${iy + 8.6}" stroke="${ak}"
            stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="${ix + 10}" cy="${iy + 14.4}" r="1.8" fill="${ak}"/>`;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
