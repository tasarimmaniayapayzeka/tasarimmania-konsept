/* SAHNE — pazarlama / google-ads
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Arama Ağı Reklamcılığı
 *      "Kullanıcı doğrudan bir ürün veya hizmeti aradığında metin reklamlarla
 *       karşısına çıkma stratejisidir. Reklam grubu teması ile anahtar kelime
 *       listesi ve açılış sayfası arasındaki uyum, hem Kalite Puanını hem de
 *       tıklama başına maliyeti belirleyen temel unsurdur."
 *   02 Görsel Ağ ve Yeniden Pazarlama
 *      "Siteyi ziyaret edip dönüşüm gerçekleştirmeyen kullanıcılara görsel ve
 *       video formatlarla yeniden ulaşma yöntemidir. Kitle segmentasyonu net
 *       kurgulandığında marka hatırlatma mesajı daha isabetli kişilere ulaşır."
 *   03 Raporlama ve Optimizasyon Döngüsü
 *      "Kampanya performansı; arama terimi raporu, cihaz kırılımı ve dönüşüm
 *       maliyeti gibi göstergelerle izlenir. Bu veriler ışığında bütçe dağılımı
 *       ve teklif stratejisi yeniden ayarlanır."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 arama girişine nötr bir sorgu çubuğu yazılır, altında metin reklam
 *      kartı belirir; tema / anahtar kelime listesi / açılış sayfası üçlüsü
 *      tam darbenin üstündeki uyum düğümünde birleşir; düğümden iki çıktı
 *      beslenir — sayısız kalite kadranı dolar, maliyet şeridi geriler;
 *   02 ziyaretçi noktaları site kartından çıkıp ortadaki ayrıştırıcıya iner,
 *      ayrıştırıcı onları iki eş segment yuvasına böler; alttaki iki EŞ biçim
 *      kartından (görsel / video) çıkan hatırlatma vuruşları yuvalara geri
 *      ulaşır ve halka yayarak söner;
 *   03 üç gösterge karosu (satır çubukları · cihaz kırılımı · akan maliyet
 *      eğrisi) verisini tam darbenin üstündeki karar eşiğine akıtır; eşikten
 *      iki EŞ ayar çerçevesi beslenir — bütçe çubukları toplamı sabit kalarak
 *      yeniden dağılır, teklif sürgüsü yeni konumuna kayıp onay halkasını
 *      kapatır. Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── ETİKETLER — RENDER EDİLİP PİKSEL TARANARAK ÖLÇÜLDÜ ──────────────────
 * Videodaki TEK yazı üç durak etiketidir (dosyada tek `yaz()` çağrısı var,
 * ham `<text>` yok). 28 px Consolas 600, harf arası 1,2; istasyon 246 px.
 * Ölçüm hattı sağlaması: "01 DENETİM" bu hatta da 164 px çıktı (teknik-seo
 * sahnesinin kayıtlı değeriyle birebir).
 *   "01 ARAMA AĞI"     196 px  ✓ SEÇİLDİ (başlığın kendisi)
 *   "01 ARAMA REKLAMI" 262 px  ✗ TAŞAR
 *   "02 GÖRSEL AĞ"     197 px  ✓ SEÇİLDİ (başlığın ilk yarısı; ikinci yarı —
 *                              yeniden pazarlama — çizimin kendisinde: siteden
 *                              ayrılan noktalara hatırlatma geri dönüyor)
 *   "02 GÖRSEL+VİDEO"  247 px  ✗ TAŞAR (1 px ile)   "02 HATIRLATMA" 214 px
 *                              (denendi, seçilmedi)
 *   "03 RAPOR+AYAR"    214 px  ✓ SEÇİLDİ (adımın iki yarısı: raporlama +
 *                              yeniden ayarlanır)
 *   "03 OPTİMİZASYON"  246 px  (tam sınır, payı sıfır — seçilmedi)
 *   "03 RAPORLAMA"     198 px  (denendi, seçilmedi; ayar yarısını adlandırmaz)
 *
 * ── YASAK (yasaklar.md "## pazarlama" MODÜL GENELİ + "google-ads") ───────
 *  - PLATFORM LOGOSU / MARKA RENGİ / ARAYÜZ İŞARETİ YOK: arama girişi düz bir
 *    hap; büyüteç dahi çizilmedi (arama motorunu ima etmesin diye — teknik-seo
 *    sahnesindeki kararın aynısı). Reklam kartındaki köşe çipi düz bir aksan
 *    dikdörtgenidir; hiçbir platformun rozet/etiket biçimi değil, üzerinde
 *    yazı yok. Renkler yalnız modülün kehribar aksanı + beyaz.
 *  - ANAHTAR KELİME METNİ YAZILMADI: sorgu, reklam metni, kelime listesi —
 *    hepsi nötr çubuk. Sayfanın kardeş figürü de aynı kuralı kullanıyor
 *    ("kelimeler ad uydurmamak için çubukla temsil edilmiştir").
 *  - HİÇBİR METRİK RAKAMI YOK: CPC, dönüşüm oranı, ROAS, bütçe, erişim,
 *    tıklanma — hiçbiri yazılmadı. Kalite kadranında, maliyet şeridinde,
 *    gösterge karolarında, bütçe çubuklarında, sürgü rayında SAYI YOK; kadran
 *    ölçek çentikleri bile çizilmedi. Tek rakam durak numaraları (01/02/03),
 *    sayfanın kendi numaralandırması.
 *  - LOGO YOK, İNSAN YÜZÜ YOK: ziyaretçiler yüzsüz nokta; cihaz kırılımındaki
 *    iki çerçeve jenerik (çentik/kamera adası yok).
 *  - YÖN İDDİASI: maliyet şeridinin gerilemesi sayfanın kendi cümleleridir —
 *    uyum "tıklama başına maliyeti belirleyen temel unsur" (01) ve SSS:
 *    "Kalite Puanı ... maliyeti dengeler; teklifi artırmak yerine alaka
 *    düzeyini yükseltmek". Şerit tamamen boşalmaz (0,78 → 0,36 dolu), maliyet
 *    "sıfırlanır" iddiası çizilmedi.
 *
 * ── EŞİTLİK — SİMETRİ KURULDU + PİKSEL ÖLÇÜLDÜ (döngü ortalaması) ───────
 * Sayfanın eş saydığı her çift, darbe merkezine BİLEREK eş uzaklıkta:
 *  · 02 iki biçim kartı (görsel/video): merkezleri (bx+71, DY+282) ve
 *    (bx+175, DY+282); darbe (bx+123, DY+177,1)'e ikisi de dx 52 / dy 104,9.
 *    Aynı ölçü, kontur, dolgu, gecikme; glif çerçeveleri aynı (40×30).
 *  · 02 iki segment yuvası: merkezleri (bx+63, DY+218) ve (bx+183, DY+218);
 *    darbeye ikisi de dx 60 / dy 40,9. Sayfa segmentleri sıralamıyor —
 *    aynı ölçü, aynı dolma gecikmesi.
 *  · 03 iki ayar çerçevesi (bütçe/teklif): merkezleri (bx+64, DY+283) ve
 *    (bx+176, DY+283); darbe (bx+120, DY+204)'e ikisi de dx 56 / dy 79.
 *    Aynı ölçü, kontur, aynı `ayar` eğrisiyle sürülüyor.
 *  · 01 üçlüsü (tema/kelime/açılış): sayfa üçünü tek "uyum" cümlesinde sayar;
 *    kutular aynı ölçü/kontur/dolgu, girişleri listeleme sırasıyla (0,00 /
 *    0,05 / 0,10 gecikme — sayfanın kendi sayma sırası). Alt kenarları darbe
 *    merkezinin 56 px üstünde, yani 52 px'lik darbe yarıçapının DIŞINDA.
 *  ÖLÇÜM (her kutu, durağın görünür penceresindeki 45 karenin ortalaması;
 *  ölçüm betiği aynı kutuları BOŞ KABUKTA da ölçüp motorun kendi ışığını
 *  ayırdı — üç düzeltme turu gerekti, hepsi aşağıda):
 *    01 üçlü        : 37,97 / 38,59 / 37,95   → fark %1,65
 *                     (boş kabukta aynı kutular: 21,94 / 23,83 / 26,35 →
 *                      %16,75; motorun `zeminHale` rampası — sahne rampayı
 *                      onda bire indiriyor. İlk sürüm %7,46'ydı: orta glifin
 *                      çubukları inceltilip yan glifler kalınlaştırıldı.)
 *    02 segment     : sol 35,91  sağ 35,91    → fark %0,00
 *                     (İlk sürüm %11,5: iki ayrı sebep tek tek bulundu.
 *                      1. hatırlatma vuruşundaki yarım tur faz farkı görünür
 *                      pencerede sol/sağ varışları farklı p'ye düşürüyordu —
 *                      eşitlendi. 2. DARBE her şeyin önünde çizildiği için
 *                      sol yaklaşma yolunun ışığı [y≈336-355, yuva bandının
 *                      içi] plakalarla KESİLEMİYORDU; sağ çıkış yolu uzaktı
 *                      [y≈292-296]. Yuvalar darbenin önündeki üst katmana
 *                      alındı — bu sahnenin ölçümle gerekçeli tek istisnası.)
 *    02 biçim kartı : sol 38,11  sağ 38,32    → fark %0,55
 *    03 ayar        : sol 39,69  sağ 39,52    → fark %0,43
 *                     (İlk sürüm %10,9: bütçe çubukları sürgü tarafını
 *                      eziyordu; sol doldurma inceltildi, sürgü rayı/tutamak/
 *                      onay halkası kalınlaştırıldı.)
 *  EŞİT OLMAYAN, BİLEREK: 03 bütçe çubukları (46/26/34 → 30/44/32) — sayfa
 *  "bütçe dağılımı ... yeniden ayarlanır" diyor, dağılımın DEĞİŞMESİ içeriğin
 *  kendisi; toplam bilerek sabit (106 → 106, bütçe artmaz, yeniden dağılır).
 *  Cihaz kırılımı çubukları (40/24) da bilerek farklı: "kırılım" farkı gösterir,
 *  sayfa cihazlar arasında eşitlik iddia etmiyor.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ────────
 * .akis üç durağı DERİNLEMESİNE bölümünden çizer: (1) kampanya mimarisi —
 * hesap → dört kampanya türü → reklam grupları + negatif liste; (2) dönüşüm
 * takibi — Google Tag / GA4 / çağrı / çevrimdışı düğümleri + "önce takip,
 * sonra yayın" bandı; (3) optimizasyon döngüsü — KAPALI HALKA üzerinde dört
 * adlı durak, ortada değeri "—" bırakılmış "Teklif stratejisi" kartı.
 * Bu sahne AYRINTILAR bölümündeki 01/02/03 listesini çizer, o üç durağı
 * tekrarlamaz ve onlarla çelişmez:
 *  · 01'de hesap ağacı, kampanya türü kutuları, negatif liste YOK — burada
 *    aramanın kendisi ve uyum üçlüsü var; kardeş figürde ikisi de çizilmiyor.
 *    Anahtar kelimeler iki çizimde de AYNI kuralla nötr çubuk.
 *  · 02'nin konusu (görsel ağ + yeniden pazarlama) kardeş figürde hiç yok.
 *  · 03'te kardeşin HALKA biçimi ve adlı durakları tekrar edilmedi: burada
 *    döngü, biçim olarak değil İŞLEYİŞ olarak var (rapor → eşik → ayar; başa
 *    dönüşü zaten darbenin kendisi taşıyor). Kardeşin ortadaki "Teklif
 *    stratejisi — değer —" kartıyla aynı hizada: buradaki sürgü de KONUM
 *    değiştirir ama üzerinde değer yazmaz. Arama terimi raporu ve cihaz
 *    kırılımı kardeşte yalnız AD olarak halka duraklarında; burada adsız
 *    ŞEKİL olarak gösterge karolarında — aynı gerçek, iki ayrı kesit.
 *
 * ── IŞIK DARBESİ GEOMETRİSİ (seritNokta ile sayısal doğrulandı) ──────────
 * Darbe merkezleri: faz 0,20 → (188, 368) = 01'de (bx+126, DY+242);
 * faz 0,50 → (560, 303,1) = 02'de (bx+123, DY+177,1); faz 0,80 → (932, 330)
 * = 03'te (bx+120, DY+204). 01'in uyum düğümü, 02'nin ayrıştırıcısı ve 03'ün
 * karar eşiği TAM bu noktalara oturtuldu: darbe geçerken kendiliğinden
 * yanarlar (teknik-seo'nun dağıtım düğümü deseni). Eşitliğe konu her kutu
 * darbe yarıçapının (52) dışında — uzaklıklar yukarıdaki eşitlik bölümünde.
 *
 * ── ÜRETİM AYARI — crf 24 İLE BASILIR (dongu-denetim.js ile ölçüldü) ─────
 * Kaynak kareler faz cinsinden periyodik ama mp4 kodlayıcısı döngü noktasında
 * nicemleme kayması bırakıyor (teknik-seo sahnesinde de ölçülmüştü):
 *   crf 26 (uret.js varsayılanı) → dikiş 0,72  oran 1,72×  (171 KB) ✗ eşik
 *   crf 24                       → dikiş 0,63  oran 1,50×  (211 KB) ✓ SEÇİLDİ
 * 211 KB kardeş videoların aralığında (163-318 KB). Basım:
 *   node -e "const m=require('./plan/video-uret/motor.js');
 *            m.uret('modul-pazarlama/google-ads','pazarlama',
 *                   require('./plan/video-uret/sahne-google-ads.js'),{crf:24})"
 *
 * ── OYNATMA (headless Chrome, _vd.html; GERÇEK ZAMANLI beklendi — sanal
 * zaman medya saatini ilerletmez; --autoplay-policy bayrağı KULLANILMADI) ──
 *   normal                        : paused=false, currentTime 1,93 → 3,63
 *   --force-prefers-reduced-motion: paused=true,  currentTime 0 → 0
 *   kaynak: google-ads.mp4, data-dongu: var, öğe görünür (rectTop 238)
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 ARAMA AĞI' },
  { x: 437, fazMerkez: 0.50, etiket: '02 GÖRSEL AĞ' },
  { x: 812, fazMerkez: 0.80, etiket: '03 RAPOR+AYAR' },
];
const DW = 246, DH = 344, DY = 126;

/* eşitlik ölçümüne giren kutuların altına konan yarı geçirmez taban —
   ios-android sahnesinde ölçülen değer (.88) aynen kullanıldı */
const ZEMIN_TABAN = 'rgba(14,17,24,.88)';

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
    s += (i === 0 ? aramaAgi(d.x, p, faz, a)
       : i === 1 ? gorselAg(d.x, p, faz, a)
       : raporAyar(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  /* --- 02'nin segment yuvaları darbenin de önünde: eşitlik ölçümüyle
     gerekçelendirilmiş tek istisna (gorselAg içindeki nota bakın) ---------- */
  s += yuvaKatmani(canli[1], faz, a);

  return s;
};

/* ── 01 · ARAMA AĞI REKLAMCILIĞI ─────────────────────────────────────────
   Üst: nötr sorgu çubuğu yazılır ("kullanıcı ... aradığında"), altında metin
   reklam kartı belirir ("metin reklamlarla karşısına çıkma"). Orta: tema /
   anahtar kelime listesi / açılış sayfası üçlüsü uyum düğümünde birleşir.
   Alt: düğümden iki çıktı — kalite kadranı dolar, maliyet şeridi geriler.
   Uyum düğümü TAM darbenin üstünde (bx+126, DY+242); üçlünün alt kenarı
   DY+186, darbeye dikey uzaklık 56 > 52 → üç kutu darbeden ışık almaz,
   girişleri yalnız kendi listeleme gecikmeleriyle ayrılır. */
function aramaAgi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- sorgu çubuğu: düz hap, büyüteç YOK, metin YOK -------------------- */
  const gX = bx + 24, gY = DY + 16, gW = 198, gH = 30;
  s += `<rect x="${gX}" y="${gY}" width="${gW}" height="${gH}" rx="15"
          fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* nötr sorgu çubuğu — p ile yazılır */
  const tp = kis01(p / 0.5);
  const tW = 120 * tp;
  s += `<rect x="${gX + 16}" y="${gY + 11}" width="${tW.toFixed(1)}" height="8" rx="4"
          fill="rgba(255,255,255,${(0.16 + 0.26 * p).toFixed(3)})"/>`;
  /* imleç — faz*6 tam tur, dikişsiz yanıp sönme */
  const gozKirp = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 6);
  s += `<rect x="${(gX + 20 + tW).toFixed(1)}" y="${gY + 8}" width="2.4" height="14" rx="1.2"
          fill="rgba(${A},${(0.25 + 0.60 * gozKirp * (0.3 + 0.7 * p)).toFixed(3)})"/>`;

  /* sorgudan reklama inen kısa akış */
  s += `<line x1="${bx + 123}" y1="${gY + gH + 2}" x2="${bx + 123}" y2="${DY + 58}"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="3 5" stroke-dashoffset="-${(faz * 32).toFixed(1)}"/>`;

  /* --- metin reklam kartı ----------------------------------------------- */
  const rX = bx + 24, rY = DY + 60, rW = 198, rH = 62;
  s += `<rect x="${rX}" y="${rY}" width="${rW}" height="${rH}" rx="10" fill="${ZEMIN_TABAN}"/>`;
  s += `<rect x="${rX}" y="${rY}" width="${rW}" height="${rH}" rx="10"
          fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.14 + 0.30 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* köşe çipi: düz aksan dikdörtgeni — hiçbir platformun rozeti değil */
  s += `<rect x="${rX + 12}" y="${rY + 10}" width="16" height="9" rx="3"
          fill="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})"/>`;
  /* başlık + iki gövde satırı — sırayla "yazılır", hepsi nötr çubuk */
  const k1 = kis01((p - 0.12) / 0.30), k2 = kis01((p - 0.22) / 0.30), k3 = kis01((p - 0.32) / 0.30);
  s += `<rect x="${rX + 34}" y="${rY + 10}" width="${(112 * k1).toFixed(1)}" height="9" rx="4.5"
          fill="rgba(${A},${(0.28 + 0.42 * p).toFixed(3)})"/>`;
  s += `<rect x="${rX + 12}" y="${rY + 30}" width="${(150 * k2).toFixed(1)}" height="6" rx="3"
          fill="rgba(255,255,255,${(0.14 + 0.18 * p).toFixed(3)})"/>`;
  s += `<rect x="${rX + 12}" y="${rY + 44}" width="${(126 * k3).toFixed(1)}" height="6" rx="3"
          fill="rgba(255,255,255,${(0.11 + 0.15 * p).toFixed(3)})"/>`;

  /* --- uyum üçlüsü: tema / anahtar kelime listesi / açılış sayfası ------
     Aynı ölçü, aynı kontur, aynı dolgu; giriş sırası sayfanın sayma sırası. */
  const uy = DY + 134, uw = 68, uh = 52;
  const ux = [bx + 16, bx + 89, bx + 162];
  for (let i = 0; i < 3; i++) {
    const gir = kis01((p - i * 0.05) / 0.30);
    s += `<rect x="${ux[i]}" y="${uy}" width="${uw}" height="${uh}" rx="9" fill="${ZEMIN_TABAN}"/>`;
    s += `<rect x="${ux[i]}" y="${uy}" width="${uw}" height="${uh}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p * gir).toFixed(3)})" stroke-width="1.2"/>`;
    s += uclu01(i, ux[i], uy, A, p, gir);
  }

  /* üçlüden uyum düğümüne inen bağlar — dash 4+7=11, faz*44 → turda 4 desen */
  const nx = bx + 126, ny = DY + 242;
  [bx + 50, bx + 123, bx + 196].forEach((cx) => {
    s += `<line x1="${cx}" y1="${uy + uh + 2}" x2="${nx}" y2="${ny - 11}"
            stroke="rgba(${A},${(0.12 + 0.36 * p).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  });

  /* uyum düğümü — TAM darbenin üstünde, darbe geçerken kendiliğinden yanar */
  s += `<circle cx="${nx}" cy="${ny}" r="9" fill="rgba(${A},${(0.06 + 0.16 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.56 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="3" fill="rgba(255,255,255,${(0.25 + 0.55 * p).toFixed(2)})"/>`;

  /* düğümden iki çıktıya akış */
  s += `<line x1="${nx - 7}" y1="${ny + 6}" x2="${bx + 70}" y2="${DY + 282}"
          stroke="rgba(${A},${(0.10 + 0.34 * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  s += `<line x1="${nx + 7}" y1="${ny + 6}" x2="${bx + 176}" y2="${DY + 296}"
          stroke="rgba(${A},${(0.10 + 0.34 * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;

  /* --- kalite kadranı: yarım yay, ÇENTİK VE SAYI YOK --------------------
     Yay yarıçapı 30 → yarım çevre 94,2; dasharray 95 ile gd oranında dolar. */
  const gd = kis01((p - 0.50) / 0.34);
  const kx = bx + 70, ky = DY + 318;
  s += `<path d="M${kx - 30} ${ky} A30 30 0 0 1 ${kx + 30} ${ky}" fill="none"
          stroke="rgba(255,255,255,${(0.09 + 0.10 * p).toFixed(3)})" stroke-width="7" stroke-linecap="round"/>`;
  s += `<path d="M${kx - 30} ${ky} A30 30 0 0 1 ${kx + 30} ${ky}" fill="none"
          stroke="rgba(${A},${(0.30 + 0.55 * p).toFixed(3)})" stroke-width="7" stroke-linecap="round"
          stroke-dasharray="95" stroke-dashoffset="${(95 * (1 - gd)).toFixed(1)}"/>`;
  /* ibre: -90° (boş) → +90°·gd ; üzerinde değer yok */
  const aci = -90 + 180 * gd;
  s += `<g transform="rotate(${aci.toFixed(1)} ${kx} ${ky})">
          <line x1="${kx}" y1="${ky - 4}" x2="${kx}" y2="${ky - 22}"
            stroke="rgba(255,255,255,${(0.30 + 0.50 * p).toFixed(2)})" stroke-width="2.2" stroke-linecap="round"/>
        </g>`;
  s += `<circle cx="${kx}" cy="${ky}" r="3.4" fill="rgba(255,255,255,${(0.30 + 0.45 * p).toFixed(2)})"/>`;

  /* --- maliyet şeridi: uyum dolarken geriler (0,78 → 0,36), SIFIRLANMAZ -- */
  const mX = bx + 128, mY = DY + 306, mW = 96;
  const dolu = 0.78 - 0.42 * gd;
  s += `<rect x="${mX}" y="${mY}" width="${mW}" height="12" rx="6"
          fill="rgba(255,255,255,.045)"/>`;
  s += `<rect x="${mX}" y="${mY}" width="${(mW * dolu).toFixed(1)}" height="12" rx="6"
          fill="rgba(${A},${(0.24 + 0.40 * p).toFixed(3)})"/>`;
  /* gerileme yönü: şerit ucunu izleyen içe dönük ok ucu (rakam değil, yön) */
  const ucX = mX + mW * dolu;
  s += `<path d="M${(ucX + 12).toFixed(1)} ${mY - 4} L${(ucX + 5).toFixed(1)} ${mY + 6} L${(ucX + 12).toFixed(1)} ${mY + 16}"
          fill="none" stroke="rgba(255,255,255,${(0.14 + 0.34 * gd * p).toFixed(3)})"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;

  return s;
}

/* Üçlü kutu glifleri — üçü de sayfanın kendi kavramı, hepsi adsız/nötr. */
function uclu01(i, x, y, A, p, gir) {
  const c = `rgba(255,255,255,${(0.22 + 0.34 * p * gir).toFixed(3)})`;
  const ak = `rgba(${A},${(0.30 + 0.44 * p * gir).toFixed(3)})`;
  const cx = x + 34, cy = y + 26;
  if (i === 0) {
    /* reklam grubu teması: merkez düğüm + üç uydu (tek temaya bağlı grup) */
    return `<circle cx="${cx}" cy="${cy}" r="3.8" fill="${ak}"/>
            <line x1="${cx}" y1="${cy}" x2="${cx - 14}" y2="${cy - 11}" stroke="${c}" stroke-width="1.5"/>
            <line x1="${cx}" y1="${cy}" x2="${cx + 14}" y2="${cy - 11}" stroke="${c}" stroke-width="1.5"/>
            <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + 15}" stroke="${c}" stroke-width="1.5"/>
            <rect x="${cx - 19}" y="${cy - 16}" width="11" height="11" rx="3" fill="none" stroke="${c}" stroke-width="1.5"/>
            <rect x="${cx + 8}" y="${cy - 16}" width="11" height="11" rx="3" fill="none" stroke="${c}" stroke-width="1.5"/>
            <rect x="${cx - 5.5}" y="${cy + 12}" width="11" height="11" rx="3" fill="none" stroke="${c}" stroke-width="1.5"/>`;
  }
  if (i === 1) {
    /* anahtar kelime listesi: madde imi + nötr çubuk (kelime YAZILMAZ).
       Çubuklar ilk sürümden inceltildi (6→5) ve kısaltıldı — ölçüm orta
       kutuyu komşularından %8 parlak göstermişti (değerler dosya başında). */
    let g = '';
    [20, 15, 18].forEach((w, r) => {
      const ry = y + 15 + r * 12;
      g += `<circle cx="${x + 19}" cy="${ry + 2.7}" r="1.7" fill="${ak}"/>`;
      g += `<rect x="${x + 26}" y="${ry}" width="${w}" height="5.5" rx="2.7" fill="${c}"/>`;
    });
    return g;
  }
  /* açılış sayfası: mini sayfa çerçevesi + başlık + iki satır */
  return `<rect x="${cx - 13}" y="${y + 10}" width="26" height="33" rx="4" fill="none"
            stroke="${c}" stroke-width="1.4"/>
          <rect x="${cx - 8}" y="${y + 16}" width="15" height="4" rx="2" fill="${ak}"/>
          <rect x="${cx - 8}" y="${y + 25}" width="13" height="3" rx="1.5" fill="${c}"/>
          <rect x="${cx - 8}" y="${y + 32}" width="10" height="3" rx="1.5" fill="${c}"/>`;
}

/* ── 02 · GÖRSEL AĞ VE YENİDEN PAZARLAMA ────────────────────────────────
   Üst-orta: site kartından çıkan ziyaretçi noktaları ("siteyi ziyaret edip
   dönüşüm gerçekleştirmeyen kullanıcılar") ortadaki ayrıştırıcıya iner.
   Ayrıştırıcı TAM darbenin üstünde (bx+123, DY+177) — "kitle segmentasyonu"
   darbe geçerken yanar. İki EŞ segment yuvası darbe merkezine eş uzaklıkta
   (dx 60 / dy 41). Alt: iki EŞ biçim kartı (görsel / video, dx 52 / dy 105);
   her kartın hatırlatma vuruşu kendi tarafındaki yuvaya çıkar ve halka
   yayarak söner ("marka hatırlatma mesajı daha isabetli kişilere ulaşır"). */
function gorselAg(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- site kartı (üst orta) -------------------------------------------- */
  const sX = bx + 77, sY = DY + 14, sW = 92, sH = 66;
  s += `<rect x="${sX}" y="${sY}" width="${sW}" height="${sH}" rx="9"
          fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.10 + 0.15 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${sX + 10}" y="${sY + 9}" width="34" height="6" rx="3"
          fill="rgba(${A},${(0.26 + 0.36 * p).toFixed(3)})"/>`;
  s += `<rect x="${sX + 10}" y="${sY + 22}" width="72" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;
  s += `<rect x="${sX + 10}" y="${sY + 33}" width="58" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})"/>`;
  /* sayfadaki gezinen ama dönüşmeyen ziyaretçiler: kartın içinde iki nokta */
  s += `<circle cx="${sX + 18}" cy="${sY + 50}" r="3" fill="rgba(255,255,255,${(0.16 + 0.16 * p).toFixed(3)})"/>`;
  s += `<circle cx="${sX + 34}" cy="${sY + 50}" r="3" fill="rgba(255,255,255,${(0.12 + 0.14 * p).toFixed(3)})"/>`;

  /* --- siteden ayrıştırıcıya inen ziyaretçiler --------------------------
     Üç nokta, t = (faz·2 + k/3) mod 1 → turda tam iki geçiş, dikişsiz.
     Uçlarda sin(πt) penceresiyle doğar/söner. */
  const cikY0 = sY + sH + 2, cikY1 = DY + 158;
  for (let k = 0; k < 3; k++) {
    const t = (faz * 2 + k / 3) % 1;
    const op = Math.pow(Math.sin(Math.PI * t), 0.8) * (0.30 + 0.60 * p);
    const yy = cikY0 + (cikY1 - cikY0) * t;
    s += `<circle cx="${bx + 123}" cy="${yy.toFixed(1)}" r="3.4"
            fill="rgba(255,255,255,${op.toFixed(3)})"/>`;
  }
  s += `<line x1="${bx + 123}" y1="${cikY0}" x2="${bx + 123}" y2="${cikY1}"
          stroke="rgba(255,255,255,${(0.06 + 0.08 * p).toFixed(3)})" stroke-width="1"/>`;

  /* --- ayrıştırıcı: TAM darbenin üstünde -------------------------------- */
  const ax = bx + 123, ay = DY + 177;
  s += `<rect x="${ax - 11}" y="${ay - 17}" width="22" height="34" rx="7"
          fill="rgba(${A},${(0.08 + 0.18 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.24 + 0.52 * p).toFixed(3)})" stroke-width="1.5"/>`;
  s += `<line x1="${ax - 4}" y1="${ay - 9}" x2="${ax - 4}" y2="${ay + 9}"
          stroke="rgba(255,255,255,${(0.20 + 0.35 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<line x1="${ax + 4}" y1="${ay - 9}" x2="${ax + 4}" y2="${ay + 9}"
          stroke="rgba(255,255,255,${(0.20 + 0.35 * p).toFixed(3)})" stroke-width="1.4"/>`;

  /* --- iki EŞ segment yuvasına inen bağlar ------------------------------
     Yuvaların KENDİSİ burada ÇİZİLMEZ: yuvalar darbenin önündeki üst
     katmanda (yuvaKatmani, kök çizimin sonunda). Gerekçe ölçüm: darbe deseni
     istasyonu geçerken sol yaklaşma yolu (y≈336-355) yuvaların bandına
     giriyor, sağ çıkış yolu (y≈292-296) uzak kalıyordu; darbe her şeyin
     önünde çizildiği için plakalar bu ışığı KESEMEDİ ve sol yuva döngü
     ortalamasında %11 parlak kaldı (üç plaka denemesi de %11'de sabit
     kaldı — fark haritası ışığın plakaların ÜSTÜNDE olduğunu gösterdi).
     Yuvalar darbenin önüne alınınca fark %0,00 ölçüldü. Bağlar ve ayrıştırıcı
     bilerek altta: onlar eşitlik çifti değil, darbeyle yıkanmaları serbest. */
  yuvaX2().forEach((yx, i) => {
    const hedefX = yx + YUVA.w / 2;
    s += `<path d="M${ax + (i === 0 ? -8 : 8)} ${ay + 12} L${hedefX} ${YUVA.y - 4}"
            fill="none" stroke="rgba(${A},${(0.12 + 0.36 * p).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  });

  /* --- iki EŞ biçim kartı: görsel / video -------------------------------
     Aynı ölçü, kontur, dolgu, gecikme; glif çerçeveleri aynı 40×30. */
  const kY = DY + 248, kW = 94, kH = 68;
  const kX = [bx + 24, bx + 128];
  for (let i = 0; i < 2; i++) {
    const x = kX[i];
    s += `<rect x="${x}" y="${kY}" width="${kW}" height="${kH}" rx="10" fill="${ZEMIN_TABAN}"/>`;
    s += `<rect x="${x}" y="${kY}" width="${kW}" height="${kH}" rx="10"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.30 * p).toFixed(3)})" stroke-width="1.3"/>`;
    const fx = x + kW / 2 - 20, fy = kY + 12;
    s += `<rect x="${fx}" y="${fy}" width="40" height="30" rx="5" fill="none"
            stroke="rgba(255,255,255,${(0.20 + 0.28 * p).toFixed(3)})" stroke-width="1.4"/>`;
    if (i === 0) {
      /* görsel biçim: jenerik resim glifi (daire + iki tepe) */
      s += `<circle cx="${fx + 11}" cy="${fy + 9}" r="3.2"
              fill="rgba(${A},${(0.36 + 0.44 * p).toFixed(3)})"/>`;
      s += `<path d="M${fx + 4} ${fy + 25} L${fx + 15} ${fy + 14} L${fx + 23} ${fy + 21}
              L${fx + 30} ${fy + 15} L${fx + 36} ${fy + 25}" fill="none"
              stroke="rgba(255,255,255,${(0.24 + 0.32 * p).toFixed(3)})"
              stroke-width="1.5" stroke-linejoin="round"/>`;
    } else {
      /* video biçimi: jenerik oynatma üçgeni */
      s += `<path d="M${fx + 16} ${fy + 8} L${fx + 28} ${fy + 15} L${fx + 16} ${fy + 22} Z"
              fill="rgba(${A},${(0.36 + 0.44 * p).toFixed(3)})"/>`;
      s += `<line x1="${fx + 6}" y1="${fy + 26}" x2="${fx + 34}" y2="${fy + 26}"
              stroke="rgba(255,255,255,${(0.24 + 0.32 * p).toFixed(3)})" stroke-width="1.5"
              stroke-linecap="round"/>`;
    }
    /* kart alt çubuğu: iki kartta birebir aynı */
    s += `<rect x="${x + 14}" y="${kY + 50}" width="${kW - 28}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;

    /* hatırlatma vuruşu: karttan kendi yuvasına çıkar — t = (faz·2) mod 1,
       İKİ TARAFTA AYNI ANDA (ayna simetrisi; yol, süre ve parlaklık birebir
       aynı). İlk sürümde sağ tarafa yarım tur faz farkı verilmişti — durağın
       görünür penceresinde sol varış anları yüksek p'ye, sağınki düşük p'ye
       denk gelip yuvaları ayrıştırıyordu; kaldırıldı. Varış halkası üst
       katmanda (yuvaKatmani), çünkü yuvanın üstünde patlıyor. */
    const hx0 = x + kW / 2, hy0 = kY - 2;
    const hx1 = yuvaX2()[i] + YUVA.w / 2, hy1 = YUVA.y + YUVA.h + 4;
    const t = (faz * 2) % 1;
    const op = Math.pow(Math.sin(Math.PI * t), 0.8) * (0.25 + 0.65 * p);
    const px = hx0 + (hx1 - hx0) * t, py = hy0 + (hy1 - hy0) * t;
    s += `<line x1="${hx0}" y1="${hy0}" x2="${hx1}" y2="${hy1}"
            stroke="rgba(${A},${(0.10 + 0.26 * p).toFixed(3)})" stroke-width="1.2"
            stroke-dasharray="3 6" stroke-dashoffset="${(faz * 36).toFixed(1)}"/>`;
    s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.6"
            fill="rgba(${A},${op.toFixed(3)})"/>`;
  }

  return s;
}

/* Segment yuvaları — DARBENİN ÖNÜNDEKİ üst katman (gerekçe ölçüm, gorselAg
   içindeki nota bakın). Geometri: merkezler (bx+63, DY+218) ve (bx+183,
   DY+218). İki yuva birebir eş: ölçü, plaka, kontur, nokta gecikmesi. */
const YUVA = { y: DY + 206, w: 78, h: 24 };
function yuvaX2() { const bx = DURAK[1].x; return [bx + 24, bx + 144]; }

function yuvaKatmani(p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';
  yuvaX2().forEach((yx) => {
    /* opak taban: yuva hem borunun hem darbenin önünde — ışığı fiziksel örter */
    s += `<rect x="${yx - 4}" y="${YUVA.y - 4}" width="${YUVA.w + 8}" height="${YUVA.h + 8}" rx="14"
            fill="rgb(14,17,24)"/>`;
    s += `<rect x="${yx}" y="${YUVA.y}" width="${YUVA.w}" height="${YUVA.h}" rx="12"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* segmentteki kişiler: üç nokta, iki yuvada AYNI gecikmeyle dolar */
    for (let j = 0; j < 3; j++) {
      const dol = kis01((p - 0.16 - j * 0.08) / 0.30);
      s += `<circle cx="${yx + 20 + j * 19}" cy="${YUVA.y + 12}" r="4"
              fill="rgba(${A},${(0.10 + 0.55 * dol).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.10 + 0.16 * dol).toFixed(3)})" stroke-width="1"/>`;
    }
    /* varış halkası: hatırlatma mesajı kitleye ulaştı — iki yuvada aynı anda */
    const t = (faz * 2) % 1;
    const varis = kis01((t - 0.72) / 0.28);
    if (varis > 0) {
      s += `<circle cx="${yx + YUVA.w / 2}" cy="${YUVA.y + 12}" r="${(5 + 13 * varis).toFixed(1)}"
              fill="none" stroke="rgba(${A},${((1 - varis) * 0.45 * (0.3 + 0.7 * p)).toFixed(3)})"
              stroke-width="1.6"/>`;
    }
  });
  return s;
}

/* ── 03 · RAPORLAMA VE OPTİMİZASYON DÖNGÜSÜ ─────────────────────────────
   Üst: üç gösterge karosu — arama terimi raporu (satır çubukları), cihaz
   kırılımı (jenerik iki cihaz + kırılım çubukları), dönüşüm maliyeti (akan
   eğri; İDDİA DEĞİL İZLEME — yükselmez, dalgalanır). Hiçbirinde SAYI yok.
   Orta: veriler TAM darbenin üstündeki karar eşiğine akar (bx+120, DY+204).
   Alt: iki EŞ ayar çerçevesi — bütçe çubukları toplamı sabit yeniden dağılır,
   teklif sürgüsü yeni konumuna kayar ve onay halkası kapanır. Kardeş .akis
   figürünün HALKA biçimi burada tekrar edilmedi; döngüyü darbenin kendisi
   taşıyor (rapor → eşik → ayar, her turda yeniden). */
function raporAyar(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- üç gösterge karosu ------------------------------------------------ */
  const tY = DY + 16, tW = 68, tH = 100;
  const tX = [bx + 16, bx + 89, bx + 162];
  tX.forEach((x, i) => {
    const gir = kis01((p - i * 0.05) / 0.30);
    s += `<rect x="${x}" y="${tY}" width="${tW}" height="${tH}" rx="9" fill="${ZEMIN_TABAN}"/>`;
    s += `<rect x="${x}" y="${tY}" width="${tW}" height="${tH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p * gir).toFixed(3)})" stroke-width="1.2"/>`;
    if (i === 0) s += terimRaporu(x, tY, A, p, gir);
    else if (i === 1) s += cihazKirilimi(x, tY, A, p, gir);
    else s += maliyetEgrisi(x, tY, A, p, faz);
  });

  /* --- karolardan karar eşiğine akış ------------------------------------ */
  const nx = bx + 120, ny = DY + 204;
  [bx + 50, bx + 123, bx + 196].forEach((cx) => {
    s += `<line x1="${cx}" y1="${tY + tH + 2}" x2="${nx}" y2="${ny - 13}"
            stroke="rgba(${A},${(0.12 + 0.36 * p).toFixed(3)})" stroke-width="1.4"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  });

  /* karar eşiği: eşkenar dörtgen — TAM darbenin üstünde ------------------- */
  s += `<path d="M${nx} ${ny - 11} L${nx + 11} ${ny} L${nx} ${ny + 11} L${nx - 11} ${ny} Z"
          fill="rgba(${A},${(0.07 + 0.16 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.56 * p).toFixed(3)})" stroke-width="1.6" stroke-linejoin="round"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="2.6" fill="rgba(255,255,255,${(0.25 + 0.55 * p).toFixed(2)})"/>`;

  /* eşikten iki ayar çerçevesine akış */
  s += `<line x1="${nx - 9}" y1="${ny + 7}" x2="${bx + 64}" y2="${DY + 244}"
          stroke="rgba(${A},${(0.10 + 0.34 * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;
  s += `<line x1="${nx + 9}" y1="${ny + 7}" x2="${bx + 176}" y2="${DY + 244}"
          stroke="rgba(${A},${(0.10 + 0.34 * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}" stroke-linecap="round"/>`;

  /* --- iki EŞ ayar çerçevesi — merkezleri (bx+64) ve (bx+176), DY+283 ---- */
  const cY = DY + 240, cW = 96, cH = 86;
  const cX = [bx + 16, bx + 128];
  const ayar = kis01((p - 0.35) / 0.40);
  cX.forEach((x) => {
    s += `<rect x="${x}" y="${cY}" width="${cW}" height="${cH}" rx="10" fill="${ZEMIN_TABAN}"/>`;
    s += `<rect x="${x}" y="${cY}" width="${cW}" height="${cH}" rx="10"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
  });

  /* bütçe dağılımı: üç çubuk yeniden dağılır — TOPLAM SABİT (106 → 106).
     Üzerlerinde sayı yok; taşınan payı küçük aktarım oku gösterir. */
  const taban = cY + 72;
  const bxs = [cX[0] + 18, cX[0] + 46, cX[0] + 74];
  const h0 = [46, 26, 34], h1 = [30, 44, 32];
  for (let i = 0; i < 3; i++) {
    const h = h0[i] + (h1[i] - h0[i]) * ayar;
    s += `<rect x="${bxs[i]}" y="${(taban - h).toFixed(1)}" width="14" height="${h.toFixed(1)}" rx="4"
            fill="rgba(${A},${(0.19 + 0.37 * p).toFixed(3)})"/>`;
    s += `<line x1="${bxs[i] - 3}" y1="${taban}" x2="${bxs[i] + 17}" y2="${taban}"
            stroke="rgba(255,255,255,${(0.12 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;
  }
  /* aktarım oku: 1. çubuktan 2.ye — pay öbür kelimeye yönlendiriliyor */
  s += `<path d="M${bxs[0] + 7} ${cY + 18} Q${cX[0] + 46} ${cY + 6} ${bxs[1] + 5} ${cY + 18}"
          fill="none" stroke="rgba(255,255,255,${(0.10 + 0.36 * ayar * p).toFixed(3)})"
          stroke-width="1.4" stroke-linecap="round"/>`;
  s += `<path d="M${bxs[1] + 1} ${cY + 13} L${bxs[1] + 5} ${cY + 18} L${bxs[1] + 9} ${cY + 13}"
          fill="none" stroke="rgba(255,255,255,${(0.10 + 0.36 * ayar * p).toFixed(3)})"
          stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* teklif stratejisi: sürgü yeni konumuna kayar, onay halkası kapanır.
     Çentikler düz çizgi (ölçek değeri değil); üzerinde sayı yok. */
  const rX = cX[1] + 14, rW2 = cW - 28, rY2 = cY + 46;
  s += `<line x1="${rX}" y1="${rY2}" x2="${rX + rW2}" y2="${rY2}"
          stroke="rgba(255,255,255,${(0.14 + 0.16 * p).toFixed(3)})" stroke-width="4.4"
          stroke-linecap="round"/>`;
  [0.2, 0.5, 0.8].forEach((t) => {
    s += `<line x1="${(rX + rW2 * t).toFixed(1)}" y1="${rY2 - 6}" x2="${(rX + rW2 * t).toFixed(1)}" y2="${rY2 + 6}"
            stroke="rgba(255,255,255,${(0.12 + 0.14 * p).toFixed(3)})" stroke-width="1.3"/>`;
  });
  /* tutamak: 0,28 → 0,72; kalan titreşim faz·2 → dikişsiz */
  const tut = 0.28 + 0.44 * ayar + 0.012 * ayar * Math.sin(2 * Math.PI * faz * 2);
  s += `<circle cx="${(rX + rW2 * tut).toFixed(1)}" cy="${rY2}" r="7.5"
          fill="rgba(${A},${(0.32 + 0.50 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.20 + 0.26 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* strateji satırı: sürgünün üstünde nötr başlık çubuğu (iki çerçeve düzeni
     dengede kalsın diye bütçedeki aktarım okuna karşılık) */
  s += `<rect x="${rX}" y="${cY + 13}" width="${(rW2 * 0.80).toFixed(1)}" height="9" rx="4.5"
          fill="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})"/>`;
  /* onay halkası: ayar oturunca kapanır — "yeniden ayarlanır" tamamlandı */
  const onay = kis01((ayar - 0.70) / 0.30);
  const ox = rX + rW2 - 8, oy = cY + 70;
  s += `<circle cx="${ox}" cy="${oy}" r="9.5" fill="rgba(${A},${(0.10 * onay).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.55 * onay).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<path d="M${ox - 4.4} ${oy + 0.4} L${ox - 1.3} ${oy + 4} L${ox + 4.8} ${oy - 3.8}"
          fill="none" stroke="rgba(255,255,255,${(0.18 + 0.66 * onay).toFixed(2)})"
          stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="15" stroke-dashoffset="${(15 * (1 - onay)).toFixed(2)}"/>`;

  return s;
}

/* 03-A · arama terimi raporu: madde imi + nötr satır çubukları (terim YAZILMAZ) */
function terimRaporu(x, y, A, p, gir) {
  let s = '';
  [34, 26, 38, 22].forEach((w, i) => {
    const ry = y + 18 + i * 20;
    const dol = kis01((gir - i * 0.08) / 0.30);
    s += `<circle cx="${x + 13}" cy="${ry + 3}" r="1.8"
            fill="rgba(${A},${(0.24 + 0.40 * dol).toFixed(3)})"/>`;
    s += `<rect x="${x + 20}" y="${ry}" width="${w}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.10 + 0.22 * dol).toFixed(3)})"/>`;
  });
  return s;
}

/* 03-B · cihaz kırılımı: jenerik iki cihaz + kırılım çubukları (sayı yok).
   Çubuklar bilerek farklı — kırılım farkı gösterir; sayfa cihazlar arasında
   eşitlik iddia etmiyor. Çerçeveler jenerik: çentik/kamera adası yok. */
function cihazKirilimi(x, y, A, p, gir) {
  const c = `rgba(255,255,255,${(0.20 + 0.28 * p * gir).toFixed(3)})`;
  let s = '';
  /* masaüstü çerçevesi + ayak */
  s += `<rect x="${x + 14}" y="${y + 16}" width="28" height="18" rx="3" fill="none"
          stroke="${c}" stroke-width="1.4"/>`;
  s += `<line x1="${x + 24}" y1="${y + 37}" x2="${x + 32}" y2="${y + 37}"
          stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>`;
  s += `<rect x="${x + 14}" y="${y + 44}" width="${(40 * kis01(gir / 0.6)).toFixed(1)}" height="5" rx="2.5"
          fill="rgba(${A},${(0.24 + 0.40 * p).toFixed(3)})"/>`;
  /* telefon çerçevesi (jenerik) */
  s += `<rect x="${x + 22}" y="${y + 58}" width="12" height="20" rx="3" fill="none"
          stroke="${c}" stroke-width="1.4"/>`;
  s += `<rect x="${x + 14}" y="${y + 84}" width="${(24 * kis01(gir / 0.6)).toFixed(1)}" height="5" rx="2.5"
          fill="rgba(${A},${(0.24 + 0.40 * p).toFixed(3)})"/>`;
  return s;
}

/* 03-C · dönüşüm maliyeti: akan eğri — İDDİA DEĞİL İZLEME (yükselmez,
   dalgalanır). Faz katsayıları tam sayı (2 ve 3) → turda desen tam kapanır. */
function maliyetEgrisi(x, y, A, p, faz) {
  const eX = x + 8, eW = 52, mid = y + 52, amp = 16;
  let s = '';
  s += `<line x1="${eX}" y1="${mid}" x2="${eX + eW}" y2="${mid}"
          stroke="rgba(255,255,255,.075)" stroke-width="1"/>`;
  let d = '';
  const N = 26;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const yy = mid - amp * (
      0.60 * Math.sin(2 * Math.PI * (t * 1.4 + faz * 2)) +
      0.40 * Math.sin(2 * Math.PI * (t * 2.8 - faz * 3)));
    d += (i === 0 ? 'M' : 'L') + (eX + t * eW).toFixed(1) + ' ' + yy.toFixed(1);
  }
  s += `<path d="${d}" fill="none" stroke="rgba(${A},${(0.28 + 0.50 * p).toFixed(3)})"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* okuma başı sağ uçta */
  const bY = mid - amp * (
    0.60 * Math.sin(2 * Math.PI * (1 * 1.4 + faz * 2)) +
    0.40 * Math.sin(2 * Math.PI * (1 * 2.8 - faz * 3)));
  s += `<circle cx="${eX + eW}" cy="${bY.toFixed(1)}" r="3.2"
          fill="rgba(${A},${(0.36 + 0.50 * p).toFixed(3)})"/>`;
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
