/* SAHNE — seo / cok-dilli-seo
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım (site/hizmetler/seo/
 * cok-dilli-seo/index.html, satır 1026-1037). Uydurma yok:
 *   01 Çok Dilli Site Haritası Yapısı
 *      "Her dil sürümü için ayrı XML site haritası hazırlanır ve hreflang
 *       bilgisi harita düzeyinde de tekrarlanabilir. Tek haritada tüm
 *       dilleri birleştirmek, tarama önceliğinin verimsiz dağılmasına yol
 *       açar."
 *      (Sayfanın SSS bölümü aynı adımı tamamlıyor: "her dil için ayrı site
 *       haritası hazırlayıp bir dizin dosyasında birleştirmektir. Bu yapı,
 *       tarama önceliğinin dil bazında ayarlanmasını sağlar." — üstteki
 *       dizin kartı oradan geliyor, uydurma değil.)
 *   02 Yerelleştirme ile Çeviri Farkı
 *      "Birebir çeviri cümle yapısını korurken anlamı aktarır; yerelleştirme
 *       ise ölçü birimi, kültürel referans ve arama niyeti farklarını da
 *       hedef pazara uyarlar. Anahtar kelime araştırması dil başına ayrı
 *       yürütülmelidir."
 *   03 Çeviri Sonrası Teknik Kontroller
 *      "Meta başlık, açıklama, görsel alt etiketi ve yapılandırılmış veri
 *       alanları da dil bazında güncellenmelidir. Dahili bağlantı yapısının
 *       dil sürümü içinde kalması, kullanıcının yanlış dile yönlendirilmesini
 *       önler."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 üstte dizin dosyası (üç girişi var), ondan aşağı inen omurgada tarama
 *      paketleri akar; paketler üç harita kartının kavşağından aynı anda
 *      geçer ve her haritanın kendi tarama önceliği çubuğunu doldurur —
 *      "ayrı harita, dil bazında öncelik". Her kartta bir çift yönlü ok
 *      jetonu var: hreflang bilgisi harita düzeyinde de tekrarlanıyor.
 *   02 üstte kaynak ve çeviri sayfası; satır GENİŞLİKLERİ birebir aynı ve
 *      satırlar 1'e 1 bağlarla eşleşiyor ("cümle yapısını korurken anlamı
 *      aktarır"). Ortada yerelleştirmenin ayrıca uyarladığı üç şey, sayfanın
 *      saydığı sırayla: ölçü birimi (cetvel bölüntüsü değişir), kültürel
 *      referans (soyut motif değişir), arama niyeti (ok başka hedefe döner).
 *      Altta üç ayrı şeritte anahtar kelime araştırması — şeritler kesikli
 *      ayraçla bölünmüş, "dil başına ayrı yürütülmelidir".
 *   03 üstte dört alan kartı sayfanın saydığı sırayla (meta başlık, açıklama,
 *      görsel alt etiketi, yapılandırılmış veri); sıra hangisindeyse onun
 *      onay tiki çizilir. Altta iki dil sürümü bölgesi; dahili bağlantı
 *      paketi her bölgenin KENDİ kapalı halkasında dolaşır, kesikli sınırı
 *      hiç geçmez ("dil sürümü içinde kalması").
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * YASAK (yasaklar.md — "seo" modül geneli + "cok-dilli-seo"):
 *  - BAYRAK YOK. Dil sürümleri nötr çizildi: her harita kartındaki rozet bir
 *    DAİRE içinde üç soyut çizgi. Bilerek daire — yatay bantlı dikdörtgen
 *    rozet bayrak gibi okunur. Ülke/bölge silueti, ay-yıldız, haç, hilal ya
 *    da herhangi bir ulusal işaret çizilmedi. 02'deki "kültürel referans"
 *    motifleri de saf geometri (dört yapraklı rozet / altıgen içinde üçgen);
 *    gerçek bir kültürün, dinin ya da ülkenin simgesi değil.
 *  - ARAMA MOTORU LOGOSU YOK: büyüteç, renkli harf, robot ya da motora
 *    benzeyen hiçbir işaret yok. "Arama niyeti" ok + hedef halkasıyla
 *    çizildi.
 *  - RAKAM YOK: sıralama, trafik, tarama bütçesi, dil sayısı, yüzde, puan —
 *    hiçbiri yazılmadı. Tarama önceliği çubuğunun üstünde sayı yok. Tek
 *    rakam durak numaraları (01/02/03), sayfanın kendi numaralandırması.
 *  - GERÇEK ALAN ADI / URL YOK: harita kartlarındaki yol satırları çubuk.
 *    Sahnede durak etiketleri DIŞINDA hiç metin yok.
 *  - LOGO YOK, İNSAN YÜZÜ YOK (sahnede insan figürü hiç yok).
 *
 * KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (aynı sayfadaki .akis infografiği,
 * satır 692-960): .akis üç durağı şöyle çiziyor: (1) dil-ülke eşlemesi —
 * tr/TR, de/DE, de/CH satırları ve bir küre; (2) URL yapısı — ccTLD ile alt
 * dizin kartları "veya" ile eşit ağırlıkta; (3) hreflang — üçgen düzende üç
 * düğüm ve aralarında ÇİFT YÖNLÜ oklar.
 * Bu sahne .akis'in anlattığı adımları TEKRARLAMIYOR; sayfanın öbür üçlüsünü
 * (.akv) anlatıyor. Çakışma denetimi:
 *   · Dil-ülke kodu yazısı (tr/TR, de-CH) burada YOK — o kesit kardeş figürün.
 *   · ccTLD / alt dizin kararı burada HİÇ çizilmedi; adres çubuğu yok, iki
 *     seçenekli karşılaştırma yok. Dolayısıyla kardeş figürdeki eşitliği
 *     bozacak bir tekrar da yok.
 *   · hreflang burada karar konusu değil, yalnız 01'de harita kartına
 *     iliştirilmiş bir çift yönlü ok jetonu olarak geçiyor — bu, kardeş
 *     figürdeki "karşılıklı işaretleme" fikriyle AYNI yönde (onu yalanlamaz)
 *     ama farklı kesit: orada sayfalar arası bağ, burada harita düzeyinde
 *     tekrarlanan bilgi. Sayfanın 01 metni bunu birebir söylüyor.
 *   · Küre çizimi burada YOK (kardeş figürde ve kahraman çiziminde var).
 *
 * EŞİTLİK — KODA BAKARAK DEĞİL PİKSEL ÖLÇEREK (sayfa dil sürümleri arasında
 * bir sıralama yapmıyor; hiçbir dil sürümü öbüründen üstün görünmemeli):
 *  · ÜÇ HARİTA KARTI (durak 01): kartların ölçüsü, konturu, dolgusu, yol
 *    çubukları, hreflang jetonu ve öncelik çubuğu BİREBİR aynı; rozet
 *    çizgilerinin uzunlukları da üç kartta aynı (10 / 8 / 6), yalnız açıları
 *    farklı — mürekkep eşit. Kavşak ışığı analitik olarak da eşit: paket
 *    deseni 76 adımlı, kavşaklar da tam 76 aralıklı, dolayısıyla üç kavşak
 *    deseni aynı fazda görüyor (kod içinde tek `gOrtak` değeri).
 *  · ÜÇ ANAHTAR KELİME ŞERİDİ (durak 02 alt bant): şeritler birebir aynı
 *    geometri ve AYNI faz — bilerek gecikme konmadı, çünkü gecikme tek karede
 *    bir şeridi öbürlerinden parlak gösteriyor. "Ayrılık" zamanlamayla değil
 *    kesikli ayraçla anlatılıyor.
 *  · İKİ DİL SÜRÜMÜ BÖLGESİ (durak 03 alt bant): aynı ölçü, aynı kontur,
 *    aynı düğüm yerleşimi ve AYNI faz; fark yalnız x konumu.
 *
 * ÖLÇÜM — YÖNTEM ÖNEMLİ, İLK YÖNTEM YANILTTI:
 *   Önce "sahneli kare - zeminsiz kare" farkı alındı; sonuçlar üç harita
 *   kartında %4,3, iki bölgede %2,7 fark gösterdi. YANLIŞTI: çizim yarı
 *   saydam, sonuç bg*(1-a)+c*a olduğu için çıkarma zeminin kendi degradesini
 *   çizime yazıyordu. Doğru yöntem: tuval TAMAMEN düz (#0E1118, zeminHale
 *   radyal degradesi ve ustKarart vinyeti kapalı) + ortak boru ve ışık
 *   darbesi kapalı; geriye kalan yalnız bu sahnenin çizimi. Döngünün 24
 *   karesinde bölge ortalaması:
 *     üç harita kartı          : 42.45 / 42.45 / 42.46   fark %0,0 (en kötü tek kare %0,0)
 *     rozet dairesi (yalnız simge): 46.34 / 46.31 / 46.37 fark %0,1 (%0,2)
 *     üç anahtar kelime şeridi : 33.52 / 33.55 / 33.52   fark %0,1 (%0,3)
 *     kaynak/çeviri sayfa kartı: 41.62 / 41.62           fark %0,0 (%0,0)
 *     iki dil sürümü bölgesi   : 38.40 / 38.44           fark %0,1 (%0,1)
 *     dört alan kartı          : 41.68 / 42.06 / 40.05 / 40.51 fark %4,8 (%6,0)
 *   Son satır BİLEREK eşitlenmedi: bunlar rakip seçenek değil, sayfanın
 *   saydığı DÖRT FARKLI alan (kalın başlık çubuğu ile süslü ayraç aynı
 *   mürekkebi tutmaz). Eşitlik kuralı "hepsi geçerli" denen seçenekler için.
 *   Ham tuvalde (degrade + vinyet açıkken) bu dört kartın farkı %13,8'e
 *   çıkıyor; farkın büyük kısmı ustKarart vinyetinin üst kartları
 *   karartmasından geliyor ve o vinyet modüldeki HER sahnede aynı.
 *
 * ETİKET GENİŞLİĞİ — PİKSEL ÖLÇÜLDÜ (istasyon 246 px):
 *   "01 AYRI HARİTA"  231 px · "02 YERELLEŞTİR" 230 px · "03 SON KONTROL" 229 px
 *   Karşılaştırma: "02 YERELLEŞTİRME" 262 px ve "03 TEKNİK KONTROL" 279 px
 *   TAŞIYOR, o yüzden alınmadı. ("01 MENÜ KURGUSU" kardeş sahnede 247 px —
 *   1 px taşıyor; aynı tuzağa düşülmesin diye hepsi 235'in altında tutuldu.)
 *
 * ÜRETİM — BU SAHNE crf 22 İLE BASILIR (ölçüldü, gerekçesi burada):
 *   node -e "const m=require('./plan/video-uret/motor.js');
 *            m.uret('modul-seo/cok-dilli-seo','seo',
 *                   require('./plan/video-uret/sahne-cok-dilli-seo.js'),{crf:22})"
 *   `uret.js` motorun varsayılanı olan crf 26 ile basar; bu sahnede o ayar
 *   döngü denetiminden GEÇMİYOR. Sorun çizimde değil KODLAYICIDA — ham
 *   SVG→PNG karelerinde aynı ölçüt uygulandı (dongu-denetim.js ile birebir
 *   aynı yöntem: 280×156'ya küçültüp kanal başına ortalama mutlak fark):
 *      ham kare: ardışık ortalama 0,382 · dikiş 0,062 · oran 0,16× — kusursuz.
 *   Yani kaynak dikişsiz; videonun tek anahtar karesi 0. karedir ve sonraki
 *   119 P-kare nicemleme kayması biriktirir. mp4 üzerinden ölçüm:
 *      crf 26 → dikiş 0,74  oran 1,65 ✗   (179 KB)
 *      crf 24 → dikiş 0,66  oran 1,46 ✓   (221 KB)
 *      crf 22 → dikiş 0,56  oran 1,24 ✓   (271 KB)
 *   crf 22 seçildi: eşiğe (1,60) payı en geniş olan ve kardeş videoların
 *   boyut aralığında (163–287 KB) kalan ayar. Sahneye "geçsin diye" yapay
 *   hareket EKLENMEDİ.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara, böylece
   site içindeki videolar aynı ritmi paylaşıyor. Üstteki 126 piksel sayfadaki
   "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 AYRI HARİTA' },
  { x: 437, fazMerkez: 0.50, etiket: '02 YERELLEŞTİR' },
  { x: 812, fazMerkez: 0.80, etiket: '03 SON KONTROL' },
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
    s += (i === 0 ? haritalar(d.x, p, faz, a)
       : i === 1 ? yerellestirme(d.x, p, faz, a)
       : kontroller(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · ÇOK DİLLİ SİTE HARİTASI YAPISI ────────────────────────────────
   Üstte dizin dosyası: üç girişi var (sayfanın SSS'i "bir dizin dosyasında
   birleştirmek" diyor). Ondan aşağı bir omurga iner, üstünde tarama
   paketleri akar. Üç harita kartı omurgaya kendi kavşağından bağlı; paket
   kavşaktan geçerken o haritanın tarama önceliği çubuğu dolar — sayfanın
   "tarama önceliğinin dil bazında ayarlanması" cümlesinin görsel karşılığı.
   Kartın sağındaki çift yönlü ok jetonu, "hreflang bilgisi harita düzeyinde
   de tekrarlanabilir" cümlesi.

   ÖLÇÜ NOTU: bu durakta boru y≈368'den, yani yerel DY+242'den geçiyor; ışık
   darbesi de tam oraya oturuyor (185, 368 — durak merkezi x=185). Üçüncü
   harita kartı (DY+244..306) o bandın hemen üstünde. Kart geniş dolgulu bir
   yüzey olduğu için borunun ışığı arkasında kalıyor ve kart okunur duruyor;
   omurga ise o bandı KESİYOR (DY+62..290 aralığı 242'yi içine alır), darbe
   geçerken omurganın o parçası birkaç kare boyunca yıkanıyor. Bu, modülün
   ortak dilinin parçası: darbe hangi durağın üstündeyse orayı aydınlatır. */
function haritalar(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- dizin dosyası ---------------------------------------------------- */
  const dX = bx + 16, dY = DY + 14, dW = 214, dH = 44;
  s += `<rect x="${dX}" y="${dY}" width="${dW}" height="${dH}" rx="10"
          fill="rgba(255,255,255,${(0.035 + 0.035 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  /* katmanlı dosya simgesi — üst üste binmiş üç kâğıt */
  for (let l = 2; l >= 0; l--) {
    s += `<rect x="${dX + 12 + l * 3}" y="${dY + 10 + l * 4}" width="26" height="20" rx="4"
            fill="rgba(${A},${(0.06 + 0.10 * p + 0.04 * (2 - l)).toFixed(3)})"
            stroke="rgba(${A},${(0.20 + 0.40 * p).toFixed(3)})" stroke-width="1.2"/>`;
  }
  /* üç giriş satırı — dizin bu üç haritayı listeliyor. Genişlikler BİREBİR
     aynı: farklı uzunluk "bu dilde daha çok sayfa var" gibi okunurdu. */
  for (let i = 0; i < 3; i++) {
    s += `<circle cx="${dX + 60}" cy="${dY + 13.5 + i * 11}" r="2.6"
            fill="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})"/>`;
    s += `<rect x="${dX + 68}" y="${dY + 11 + i * 11}" width="126" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.20 * p).toFixed(3)})"/>`;
  }

  /* --- omurga + tarama paketleri ---------------------------------------
     İLK SÜRÜM KUSURLUYDU — ÖNİZLEMEDE GÖRÜLDÜ: paketler tek tek daire olarak
     çiziliyor ve sarma noktası görünmesin diye sin(πu) ile sönümleniyordu.
     Zarf üç kavşağa farklı çarpan uyguluyordu (faz 0,20'de sin(πu) =
     0,59 / 0,99 / 0,41), yani ortadaki dil sürümünün paketi ve öncelik
     çubuğu öbür ikisinden parlak çıkıyordu — önizleme PNG'sinde görünüyordu.
     Düzeltme: paketler AKAN KESİK. Desen adımı 76, bir turda tam 3 desen
     (228) kayıyor → faz 0 ile faz 1 birebir aynı, dikişsiz. Kavşaklar da
     tam 76 aralıklı olduğu için üç kavşak deseni AYNI fazda görüyor:
     kavşak ışığı analitik olarak üçünde de BİREBİR eşit. */
  const ARA = 76, KAPSAM = ARA * 3, KAVSAK = 61;
  const sX = bx + 40, sY0 = DY + 62, sY1 = sY0 + KAPSAM;
  s += `<line x1="${sX}" y1="${sY0}" x2="${sX}" y2="${sY1}"
          stroke="rgba(255,255,255,${(0.09 + 0.14 * p).toFixed(3)})" stroke-width="2"
          stroke-linecap="round"/>`;
  const kay = (-faz * KAPSAM).toFixed(1);
  s += `<line x1="${sX}" y1="${sY0}" x2="${sX}" y2="${sY1}"
          stroke="rgba(${A},${(0.22 + 0.45 * p).toFixed(3)})" stroke-width="7"
          stroke-linecap="round" stroke-dasharray="13 63" stroke-dashoffset="${kay}"
          filter="url(#yumusaAz)"/>`;
  s += `<line x1="${sX}" y1="${sY0}" x2="${sX}" y2="${sY1}"
          stroke="rgba(255,255,255,${(0.35 + 0.50 * p).toFixed(3)})" stroke-width="2.8"
          stroke-linecap="round" stroke-dasharray="13 63" stroke-dashoffset="${kay}"/>`;

  const SATIR = [DY + 92, DY + 168, DY + 244];      // kart üst kenarları
  const KH = 62, KX = bx + 64, KW = 166;

  /* Paket merkezinin kavşağa sarmalı uzaklığı — j'ye bağlı DEĞİL, üç kart
     için tek değer. Kesik sarmasında sap ±38'de yer değiştirir, orada
     g ≈ 0,002 olduğu için geçiş sürekli. */
  let sap = (((KAVSAK - (((faz * KAPSAM) % ARA) + 6.5)) % ARA) + ARA) % ARA;
  if (sap > ARA / 2) sap -= ARA;
  const gOrtak = Math.exp(-Math.pow(sap / 15, 2));

  /* --- üç harita kartı -------------------------------------------------- */
  for (let i = 0; i < 3; i++) {
    const ky = SATIR[i], mid = ky + KH / 2;
    const g = gOrtak * p;

    /* kavşak çubuğu */
    s += `<line x1="${sX}" y1="${mid}" x2="${KX}" y2="${mid}"
            stroke="rgba(${A},${(0.16 + 0.55 * g).toFixed(3)})" stroke-width="1.8"
            stroke-linecap="round"/>`;
    s += `<circle cx="${sX}" cy="${mid}" r="${(3 + 1.6 * g).toFixed(2)}"
            fill="rgba(${A},${(0.30 + 0.60 * g).toFixed(3)})"/>`;

    /* kart gövdesi — üç kart birebir aynı ölçü/kontur/dolgu */
    s += `<rect x="${KX}" y="${ky}" width="${KW}" height="${KH}" rx="11"
            fill="rgba(255,255,255,${(0.030 + 0.040 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.16 * p).toFixed(3)})" stroke-width="1.25"/>`;

    /* dil rozeti — DAİRE (bayrak gibi okunmasın diye bilerek dikdörtgen
       değil). İçindeki üç çizginin uzunlukları üç kartta da 10 / 8 / 6;
       yalnız düzenleri farklı, mürekkep eşit. */
    const rcx = KX + 26, rcy = mid;
    s += `<circle cx="${rcx}" cy="${rcy}" r="13" fill="rgba(${A},${(0.05 + 0.07 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.24 + 0.42 * p).toFixed(3)})" stroke-width="1.3"/>`;
    const cA = `rgba(255,255,255,${(0.30 + 0.38 * p).toFixed(3)})`;
    const ciz = (x1, y1, x2, y2) =>
      `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"
         stroke="${cA}" stroke-width="1.7" stroke-linecap="round"/>`;
    if (i === 0) {
      s += ciz(rcx - 5, rcy - 5, rcx + 5, rcy - 5);        // 10
      s += ciz(rcx - 4, rcy,     rcx + 4, rcy);            // 8
      s += ciz(rcx - 3, rcy + 5, rcx + 3, rcy + 5);        // 6
    } else if (i === 1) {
      s += ciz(rcx - 5, rcy - 5, rcx - 5, rcy + 5);        // 10 (dikey)
      s += ciz(rcx - 1, rcy - 5, rcx + 7, rcy - 5);        // 8
      s += ciz(rcx - 1, rcy + 5, rcx + 5, rcy + 5);        // 6
    } else {
      s += ciz(rcx - 4, rcy + 5, rcx + 3, rcy - 2);        // ~10 (çapraz)
      s += ciz(rcx - 4, rcy - 5, rcx + 2, rcy - 5);        // ~6
      s += ciz(rcx + 1, rcy + 5, rcx + 7, rcy - 1);        // ~8
    }

    /* yol çubukları — gerçek URL yazılmadı */
    s += `<rect x="${KX + 48}" y="${mid - 20}" width="76" height="6" rx="3"
            fill="rgba(255,255,255,${(0.12 + 0.22 * p).toFixed(3)})"/>`;
    s += `<rect x="${KX + 48}" y="${mid - 9}" width="58" height="6" rx="3"
            fill="rgba(255,255,255,${(0.09 + 0.16 * p).toFixed(3)})"/>`;

    /* hreflang jetonu — çift yönlü ok (harita düzeyinde tekrarlanan bilgi) */
    const jx = KX + 122, jy = mid - 17;
    s += `<rect x="${jx}" y="${jy - 9}" width="34" height="19" rx="9"
            fill="rgba(${A},${(0.05 + 0.07 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.18 + 0.34 * p).toFixed(3)})" stroke-width="1.1"/>`;
    const oA = `rgba(${A},${(0.34 + 0.50 * p).toFixed(3)})`;
    s += `<path d="M${jx + 9} ${jy} L${jx + 25} ${jy}
                  M${jx + 12} ${jy - 3.4} L${jx + 8.6} ${jy} L${jx + 12} ${jy + 3.4}
                  M${jx + 22} ${jy - 3.4} L${jx + 25.4} ${jy} L${jx + 22} ${jy + 3.4}"
            fill="none" stroke="${oA}" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>`;

    /* tarama önceliği çubuğu — ÜZERİNDE SAYI YOK */
    const cb = KX + 48, cy2 = mid + 6, cw = 100;
    s += `<rect x="${cb}" y="${cy2}" width="${cw}" height="7" rx="3.5"
            fill="rgba(255,255,255,.055)"/>`;
    s += `<rect x="${cb}" y="${cy2}" width="${(cw * (0.28 + 0.72 * g)).toFixed(1)}" height="7" rx="3.5"
            fill="rgba(${A},${(0.26 + 0.54 * g).toFixed(3)})"/>`;
  }

  return s;
}

/* ── 02 · YERELLEŞTİRME İLE ÇEVİRİ FARKI ────────────────────────────────
   ÜST BANT — birebir çeviri: iki sayfa kartı, satır genişlikleri BİREBİR
   aynı (62/48/66/40) ve satırlar 1'e 1 bağlarla eşleşiyor; bağlar sırayla
   parlar. Sayfa: "cümle yapısını korurken anlamı aktarır."
   ORTA BANT — yerelleştirmenin AYRICA uyarladığı üç şey, sayfanın saydığı
   sırayla: ölçü birimi, kültürel referans, arama niyeti. Her satırda soldaki
   biçim sağdaki hedef pazar karşılığına dönüşüyor. Sayfa "yerelleştirme ise
   ... farklarını DA hedef pazara uyarlar" diyor: burada yerelleştirme
   çevirinin yerine değil ÜSTÜNE geliyor, sahne de öyle diziliyor (önce
   çeviri bandı, sonra uyarlama bandı) — çeviri "yanlış" gibi çizilmedi,
   üstü çizilmiş/kırmızı bir işaret yok.
   ALT BANT — üç ayrı şeritte anahtar kelime araştırması; şeritler kesikli
   ayraçla bölünmüş. Sayfa: "dil başına ayrı yürütülmelidir." */
function yerellestirme(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* ---------- ÜST BANT: kaynak → çeviri, 1'e 1 ------------------------- */
  const aY = DY + 12, aH = 92, kW = 92;
  const k1X = bx + 16, k2X = bx + 138;
  const satirW = [62, 48, 66, 40];                 // iki kartta da AYNI

  [k1X, k2X].forEach((kx) => {
    s += `<rect x="${kx}" y="${aY}" width="${kW}" height="${aH}" rx="10"
            fill="rgba(255,255,255,${(0.030 + 0.038 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.25"/>`;
    s += `<rect x="${kx + 13}" y="${aY + 15}" width="34" height="6" rx="3"
            fill="rgba(${A},${(0.28 + 0.42 * p).toFixed(3)})"/>`;
    satirW.forEach((w, i) => {
      s += `<rect x="${kx + 13}" y="${aY + 34 + i * 14}" width="${w}" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.10 + 0.18 * p).toFixed(3)})"/>`;
    });
  });

  /* 1'e 1 bağlar; kopya başı satırlar arasında dolaşıyor (faz cinsinden
     periyodik → dikişsiz) */
  satirW.forEach((w, i) => {
    const g = (0.5 + 0.5 * Math.cos(2 * Math.PI * (faz - i / 4))) * p;
    const y = aY + 36.5 + i * 14;
    s += `<line x1="${k1X + kW}" y1="${y}" x2="${k2X}" y2="${y}"
            stroke="rgba(${A},${(0.14 + 0.60 * g).toFixed(3)})" stroke-width="1.6"
            stroke-linecap="round"/>`;
    s += `<circle cx="${(k1X + kW + (k2X - k1X - kW) * (0.15 + 0.7 * g)).toFixed(1)}" cy="${y}"
            r="${(1.4 + 1.8 * g).toFixed(2)}" fill="rgba(255,255,255,${(0.20 + 0.60 * g).toFixed(3)})"/>`;
  });

  /* ---------- ORTA BANT: yerelleştirmenin uyarladığı üç şey ------------ */
  const bY = DY + 116, bH = 100;
  s += `<rect x="${bx + 16}" y="${bY}" width="214" height="${bH}" rx="11"
          fill="rgba(255,255,255,${(0.026 + 0.032 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.08 + 0.14 * p).toFixed(3)})" stroke-width="1.2"/>`;

  const solX = bx + 50, sagX = bx + 194;
  for (let i = 0; i < 3; i++) {
    const cy = bY + 22 + i * 28;
    /* sıra: her satır kendi fazında dönüşüyor, faz cinsinden periyodik */
    const t = (0.5 + 0.5 * Math.cos(2 * Math.PI * (faz - i / 3))) * p;
    /* ÖLÇÜ NOTU: bu durakta boru y≈303'ten, yani yerel DY+177'den geçiyor ve
       ışık darbesi (yarıçap 52) tam bu bandı süpürüyor. İnce kontur o anda
       yutuluyordu — simge çizgileri 1,8'e kalınlaştırıldı, taban opaklıklar
       yükseltildi. Bant yeri değiştirilmedi: sayfanın anlatım sırası
       (çeviri → uyarlama → anahtar kelime) korunuyor. */
    const solA = `rgba(255,255,255,${(0.30 + 0.30 * p).toFixed(3)})`;
    const sagA = `rgba(${A},${(0.36 + 0.52 * t).toFixed(3)})`;

    if (i === 0) {
      /* ÖLÇÜ BİRİMİ — cetvel: solda geniş bölüntü, sağda dar bölüntü */
      s += cetvel(solX, cy, 4, solA);
      s += cetvel(sagX, cy, 6, sagA);
    } else if (i === 1) {
      /* KÜLTÜREL REFERANS — saf geometri; hiçbir gerçek kültür/din/ülke
         simgesi değil */
      s += rozetMotif(solX, cy, solA);
      s += altigenMotif(sagX, cy, sagA);
    } else {
      /* ARAMA NİYETİ — ok başka hedefe dönüyor (büyüteç YOK) */
      s += niyet(solX, cy, -1, solA);
      s += niyet(sagX, cy, 1, sagA);
    }

    /* dönüşüm oku — kesikler akıyor, tur başına tam sayı kayma */
    const okY = cy;
    s += `<line x1="${bx + 76}" y1="${okY}" x2="${bx + 166}" y2="${okY}"
            stroke="rgba(${A},${(0.14 + 0.40 * t).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="5 6" stroke-dashoffset="${(-faz * 44).toFixed(1)}"/>`;
    s += `<path d="M${bx + 162} ${okY - 4} L${bx + 167} ${okY} L${bx + 162} ${okY + 4}"
            fill="none" stroke="rgba(${A},${(0.22 + 0.55 * t).toFixed(3)})" stroke-width="1.6"
            stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  /* ---------- ALT BANT: dil başına ayrı anahtar kelime araştırması ------ */
  const cY = DY + 228, cH = 100, seritW = 62;
  const seritX = [bx + 18, bx + 92, bx + 166];
  /* kesikli ayraçlar — "ayrı yürütülmelidir" bunlarla anlatılıyor */
  [bx + 84, bx + 158].forEach((ax) => {
    s += `<line x1="${ax}" y1="${cY + 6}" x2="${ax}" y2="${cY + cH - 6}"
            stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"
            stroke-dasharray="4 6"/>`;
  });
  /* ÜÇ ŞERİT BİREBİR AYNI VE AYNI FAZDA — bilerek gecikme yok */
  const aday = [44, 34, 40];
  const dus = (0.5 - 0.5 * Math.cos(2 * Math.PI * faz));      // 0→1→0, dikişsiz
  seritX.forEach((sx) => {
    aday.forEach((w, i) => {
      const g = (0.35 + 0.65 * (0.5 + 0.5 * Math.cos(2 * Math.PI * (faz - i / 3)))) * p;
      s += `<rect x="${sx + (seritW - w) / 2}" y="${cY + 12 + i * 13}" width="${w}" height="6" rx="3"
              fill="rgba(255,255,255,${(0.08 + 0.20 * g).toFixed(3)})"/>`;
    });
    /* huni: üç aday tek seçilmiş kelimeye iniyor */
    s += `<path d="M${sx + 6} ${cY + 56} L${sx + seritW / 2} ${cY + 74} L${sx + seritW - 6} ${cY + 56}"
            fill="none" stroke="rgba(255,255,255,${(0.09 + 0.15 * p).toFixed(3)})" stroke-width="1.3"
            stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<circle cx="${sx + seritW / 2}" cy="${(cY + 52 + 22 * dus).toFixed(1)}"
            r="3.2" fill="rgba(255,255,255,${(0.25 + 0.55 * p * dus).toFixed(3)})"/>`;
    s += `<rect x="${sx + (seritW - 40) / 2}" y="${cY + 80}" width="40" height="9" rx="4.5"
            fill="rgba(${A},${(0.22 + 0.48 * p * dus).toFixed(3)})"/>`;
  });
  return s;
}

/* cetvel — bölüntü sıklığı ölçü birimi farkını anlatır; sayı yazılmadı */
function cetvel(cx, cy, bolme, renk) {
  let s = `<line x1="${cx - 15}" y1="${cy + 7}" x2="${cx + 15}" y2="${cy + 7}"
             stroke="${renk}" stroke-width="1.6" stroke-linecap="round"/>`;
  for (let i = 0; i <= bolme; i++) {
    const x = cx - 15 + (30 * i) / bolme;
    const h = i % 2 === 0 ? 9 : 5.5;
    s += `<line x1="${x.toFixed(1)}" y1="${cy + 7}" x2="${x.toFixed(1)}" y2="${(cy + 7 - h).toFixed(1)}"
            stroke="${renk}" stroke-width="1.5" stroke-linecap="round"/>`;
  }
  return s;
}

/* dört yapraklı soyut motif — gerçek bir kültürün simgesi DEĞİL */
function rozetMotif(cx, cy, renk) {
  let s = '';
  for (let i = 0; i < 4; i++) {
    const ac = (Math.PI / 2) * i;
    const dx = Math.cos(ac) * 6, dy = Math.sin(ac) * 6;
    s += `<circle cx="${(cx + dx).toFixed(1)}" cy="${(cy + dy).toFixed(1)}" r="6"
            fill="none" stroke="${renk}" stroke-width="1.8"/>`;
  }
  return s;
}

/* altıgen içinde üçgen — yine saf geometri */
function altigenMotif(cx, cy, renk) {
  const nk = (r, don) => {
    let d = '';
    for (let i = 0; i < 6; i++) {
      const ac = (Math.PI / 3) * i + don;
      d += (i === 0 ? 'M' : 'L') + (cx + Math.cos(ac) * r).toFixed(1) + ' ' + (cy + Math.sin(ac) * r).toFixed(1);
    }
    return d + 'Z';
  };
  const ucgen = (r) => {
    let d = '';
    for (let i = 0; i < 3; i++) {
      const ac = (2 * Math.PI / 3) * i - Math.PI / 2;
      d += (i === 0 ? 'M' : 'L') + (cx + Math.cos(ac) * r).toFixed(1) + ' ' + (cy + Math.sin(ac) * r).toFixed(1);
    }
    return d + 'Z';
  };
  return `<path d="${nk(12, 0)}" fill="none" stroke="${renk}" stroke-width="1.4" stroke-linejoin="round"/>`
    + `<path d="${ucgen(6.5)}" fill="none" stroke="${renk}" stroke-width="1.4" stroke-linejoin="round"/>`;
}

/* arama niyeti — hedef halkası + ona giren ok. Büyüteç ya da motor işareti
   YOK; yön farkı "niyet farkı" demek. */
function niyet(cx, cy, yon, renk) {
  const hx = cx + 5;
  let s = `<circle cx="${hx}" cy="${cy}" r="8" fill="none" stroke="${renk}" stroke-width="1.8"/>`
    + `<circle cx="${hx}" cy="${cy}" r="3" fill="none" stroke="${renk}" stroke-width="1.8"/>`;
  /* ok: yon -1 → alt soldan, yon +1 → üst soldan girer */
  const bx0 = cx - 16, by0 = cy + yon * 9;
  const ux = hx - 8, uy = cy + yon * 2;
  s += `<path d="M${bx0} ${by0} L${ux.toFixed(1)} ${uy.toFixed(1)}"
          stroke="${renk}" stroke-width="1.5" stroke-linecap="round"/>`;
  const ac = Math.atan2(uy - by0, ux - bx0);
  const k1 = ac + 2.5, k2 = ac - 2.5;
  s += `<path d="M${(ux + Math.cos(k1) * 5).toFixed(1)} ${(uy + Math.sin(k1) * 5).toFixed(1)}
                L${ux.toFixed(1)} ${uy.toFixed(1)}
                L${(ux + Math.cos(k2) * 5).toFixed(1)} ${(uy + Math.sin(k2) * 5).toFixed(1)}"
          fill="none" stroke="${renk}" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  return s;
}

/* ── 03 · ÇEVİRİ SONRASI TEKNİK KONTROLLER ──────────────────────────────
   ÜST — dört alan kartı, sayfanın saydığı SIRAYLA: meta başlık (tek kalın
   çubuk), açıklama (üç ince satır), görsel alt etiketi (görsel çerçevesi +
   etiket), yapılandırılmış veri (süslü ayraç içinde alan çiftleri). Sıra
   hangisindeyse onun onay tiki çizilir; tik durağın canlılığına bağlı,
   durak sönünce sıfırlanıyor → dikişsiz.
   ALT — iki dil sürümü bölgesi. Her bölgenin kesikli sınırı var; dahili
   bağlantı paketi bölgenin KENDİ kapalı üçgen halkasında dolaşıyor ve sınırı
   hiç geçmiyor. Sayfa: "Dahili bağlantı yapısının dil sürümü içinde kalması,
   kullanıcının yanlış dile yönlendirilmesini önler."
   İki bölge birebir aynı ve AYNI fazda — hiçbir dil sürümü öbüründen ileride
   ya da parlak değil. */
function kontroller(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const kW = 102, kH = 74;
  const POS = [[bx + 16, DY + 14], [bx + 128, DY + 14],
               [bx + 16, DY + 96], [bx + 128, DY + 96]];

  POS.forEach((pz, i) => {
    const [x, y] = pz;
    const onay = kis01((p - i * 0.12) / 0.40);
    s += `<rect x="${x}" y="${y}" width="${kW}" height="${kH}" rx="10"
            fill="rgba(255,255,255,${(0.030 + 0.038 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.25"/>`;

    const ink = `rgba(255,255,255,${(0.14 + 0.26 * p).toFixed(3)})`;
    const vur = `rgba(${A},${(0.28 + 0.46 * p).toFixed(3)})`;

    if (i === 0) {
      /* META BAŞLIK — tek kalın çubuk + altında kısa çubuk */
      s += `<rect x="${x + 14}" y="${y + 20}" width="60" height="10" rx="5" fill="${vur}"/>`;
      s += `<rect x="${x + 14}" y="${y + 38}" width="40" height="5" rx="2.5" fill="${ink}"/>`;
    } else if (i === 1) {
      /* AÇIKLAMA — üç ince satır */
      [66, 58, 46].forEach((w, j) => {
        s += `<rect x="${x + 14}" y="${y + 19 + j * 11}" width="${w}" height="5" rx="2.5"
                fill="${j === 0 ? vur : ink}"/>`;
      });
    } else if (i === 2) {
      /* GÖRSEL ALT ETİKETİ — görsel çerçevesi + iliştirilmiş etiket */
      s += `<rect x="${x + 13}" y="${y + 17}" width="42" height="32" rx="5"
              fill="none" stroke="${vur}" stroke-width="1.8"/>`;
      s += `<circle cx="${x + 24}" cy="${y + 27}" r="3.4" fill="none" stroke="${ink}" stroke-width="1.3"/>`;
      s += `<path d="M${x + 16} ${y + 46} L${x + 27} ${y + 34} L${x + 36} ${y + 43}
                    L${x + 41} ${y + 38} L${x + 52} ${y + 46}"
              fill="none" stroke="${ink}" stroke-width="1.4"
              stroke-linecap="round" stroke-linejoin="round"/>`;
      /* etiket: sivri uçlu kart + delik */
      s += `<path d="M${x + 62} ${y + 24} L${x + 84} ${y + 24} L${x + 84} ${y + 42}
                    L${x + 62} ${y + 42} L${x + 55} ${y + 33} Z"
              fill="none" stroke="${vur}" stroke-width="1.4" stroke-linejoin="round"/>`;
      s += `<circle cx="${x + 63}" cy="${y + 33}" r="2.2" fill="${ink}"/>`;
    } else {
      /* YAPILANDIRILMIŞ VERİ — süslü ayraçlar YOL olarak çizildi (metin
         değil), içinde alan/değer çiftleri */
      const ay = (ax, yon) => `<path d="M${ax + yon * 6} ${y + 17}
            q${-yon * 6} 0 ${-yon * 6} 6 q0 6 ${-yon * 5} 6 q${yon * 5} 0 ${yon * 5} 6
            q0 6 ${yon * 6} 6" fill="none" stroke="${vur}" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>`;
      s += ay(x + 14, 1);
      s += ay(x + 88, -1);
      for (let j = 0; j < 3; j++) {
        s += `<rect x="${x + 30}" y="${y + 21 + j * 11}" width="18" height="5" rx="2.5" fill="${ink}"/>`;
        s += `<rect x="${x + 54}" y="${y + 21 + j * 11}" width="${26 - j * 6}" height="5" rx="2.5"
                fill="rgba(255,255,255,${(0.09 + 0.16 * p).toFixed(3)})"/>`;
      }
    }

    /* onay tiki — sıra bu karta gelince çizilir */
    const tx = x + kW - 20, ty = y + kH - 15;
    s += `<circle cx="${tx}" cy="${ty}" r="9.5" fill="rgba(${A},${(0.10 * onay).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.60 * onay).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<path d="M${tx - 4.2} ${ty + 0.4} L${tx - 1.2} ${ty + 3.6} L${tx + 4.6} ${ty - 3.4}"
            fill="none" stroke="rgba(255,255,255,${(0.20 + 0.70 * onay).toFixed(2)})"
            stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="15" stroke-dashoffset="${(15 * (1 - onay)).toFixed(2)}"/>`;
  });

  /* --- iki dil sürümü bölgesi ------------------------------------------ */
  const rY = DY + 190, rW = 100, rH = 126;
  [bx + 16, bx + 130].forEach((rx) => {
    s += `<rect x="${rx}" y="${rY}" width="${rW}" height="${rH}" rx="12"
            fill="rgba(255,255,255,${(0.022 + 0.026 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.34 * p).toFixed(3)})" stroke-width="1.3"
            stroke-dasharray="6 5"/>`;

    /* üç düğüm — üçgen düzen */
    const N = [
      { x: rx + rW / 2, y: rY + 34 },
      { x: rx + 27,     y: rY + 92 },
      { x: rx + rW - 27, y: rY + 92 },
    ];
    /* kapalı halka: bağlantılar dil sürümünün İÇİNDE kalıyor */
    let d = '';
    N.forEach((n, j) => { d += (j === 0 ? 'M' : 'L') + n.x.toFixed(1) + ' ' + n.y.toFixed(1); });
    d += 'Z';
    s += `<path d="${d}" fill="none" stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"
            stroke-width="1.4" stroke-linejoin="round"/>`;

    /* kenar ortalarında yön işareti */
    for (let j = 0; j < 3; j++) {
      const A1 = N[j], B1 = N[(j + 1) % 3];
      const mx = (A1.x + B1.x) / 2, my = (A1.y + B1.y) / 2;
      const ac = Math.atan2(B1.y - A1.y, B1.x - A1.x) * 180 / Math.PI;
      s += `<g transform="translate(${mx.toFixed(1)} ${my.toFixed(1)}) rotate(${ac.toFixed(1)})">
              <path d="M-4 -3.4 L0.6 0 L-4 3.4" fill="none"
                stroke="rgba(${A},${(0.24 + 0.46 * p).toFixed(3)})" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/></g>`;
    }

    /* düğümler */
    N.forEach((n) => {
      s += `<rect x="${(n.x - 15).toFixed(1)}" y="${(n.y - 11).toFixed(1)}" width="30" height="22" rx="6"
              fill="rgba(255,255,255,${(0.040 + 0.045 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.11 + 0.18 * p).toFixed(3)})" stroke-width="1.2"/>`;
      s += `<rect x="${(n.x - 9).toFixed(1)}" y="${(n.y - 5).toFixed(1)}" width="18" height="4" rx="2"
              fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
      s += `<rect x="${(n.x - 9).toFixed(1)}" y="${(n.y + 2).toFixed(1)}" width="12" height="4" rx="2"
              fill="rgba(255,255,255,${(0.09 + 0.15 * p).toFixed(3)})"/>`;
    });

    /* paket kapalı halkada dolaşıyor — u = faz, tur başına tam 1 çevrim,
       sınırı hiç geçmiyor → dikişsiz ve "dil sürümü içinde kalır" */
    const kenar = [];
    let toplam = 0;
    for (let j = 0; j < 3; j++) {
      const A1 = N[j], B1 = N[(j + 1) % 3];
      const L = Math.hypot(B1.x - A1.x, B1.y - A1.y);
      kenar.push({ A: A1, B: B1, L });
      toplam += L;
    }
    let kalan = (faz % 1) * toplam;
    let pos = N[0];
    for (const k of kenar) {
      if (kalan <= k.L) {
        const t = kalan / k.L;
        pos = { x: k.A.x + (k.B.x - k.A.x) * t, y: k.A.y + (k.B.y - k.A.y) * t };
        break;
      }
      kalan -= k.L;
    }
    s += `<circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="8"
            fill="rgba(${A},${(0.26 * p).toFixed(3)})"/>`;
    s += `<circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="3.4"
            fill="rgba(255,255,255,${(0.30 + 0.60 * p).toFixed(3)})"/>`;
  });
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
