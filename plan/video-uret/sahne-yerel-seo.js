/* SAHNE — seo / yerel-seo
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Yerel Dizin Kayıtları (Citation) Yönetimi
 *      "İşletme bilgilerinin sektörel ve genel dizinlerde tutarlı biçimde yer
 *       alması tanınırlık sinyalinin önemli bir bileşenidir. Eksik ya da
 *       çelişkili kayıtlar tespit edilip düzeltilir, güvenilir yeni dizinlere
 *       kayıt açılır ve profilin güvenilirliği güçlenir."
 *   02 Müşteri Yorumu Toplama ve Yanıtlama Süreci
 *      "Yorum talebi süreci hizmet sonrası doğru zamanlamayla kurgulanır ve her
 *       yoruma kişiselleştirilmiş yanıt verilir. Olumsuz yorumlar hızlıca ele
 *       alınıp çözüme taşınır; bu disiplin hem tanınırlık sinyalini hem marka
 *       algısını doğrudan besler."
 *   03 Çoklu Şube ve Bölgesel İçerik Stratejisi
 *      "Her şube için bağımsız Google İşletme Profili, ayrı semt sayfası ve ayrı
 *       yorum akışı kurulur. Şubeler arası kategori, çalışma bilgisi ve iletişim
 *       bilgisi tutarlılığı düzenli olarak denetlenir, böylece hiçbir şube
 *       diğerinin sinyalini zayıflatmaz."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 üstte kaynak kayıt (üç alan: ad / adres / telefon — hepsi soyut çubuk),
 *      ondan aşağı akan bir omurga, omurgaya takılı dört dizin satırı. Denetim
 *      halkası satırlarda yukarıdan aşağı gezer: iki satır zaten tutarlı, bir
 *      satırın orta alanı EKSİK (hayalet genişliğin altında) ve halka gelince
 *      kaynağın genişliğine tamamlanır, dördüncü satır BOŞ bir yuva (kesikli
 *      kenarlık + artı) ve halka gelince yeni kayıt açılır, kenarlık sertleşir.
 *   02 üstte hizmet bitiş tiki → akan kesikli aralık → talep çıkışı (sayfanın
 *      "hizmet sonrası doğru zamanlama" cümlesi). Ortada üç yorum kartı; gezen
 *      halka hangi karttaysa onun yanıtı yazılır ve ÜÇ YANIT BİRBİRİNDEN FARKLI
 *      satır dizisine sahip — "kişiselleştirilmiş yanıt" şablon değil demektir.
 *      Altta çerçeveli bir alt bölge: uyarı işaretinden çıkan çözüm rayı sağdaki
 *      onay halkasına doğru dolar ("olumsuz yorumlar çözüme taşınır").
 *   03 üstte ÜÇ ŞUBE SÜTUNU, üçü birebir aynı: her birinde bağımsız profil,
 *      ayrı semt sayfası ve ayrı yorum akışı bloğu. Altlarından tek bir ortak
 *      kucaklama (üç eşit tırnak) tutarlılık denetimine iner. Denetim çerçevesi
 *      içinde üç öznitelik satırı (kategori / çalışma bilgisi / iletişim
 *      bilgisi) sırayla denetlenir; en altta üç şube jetonu AYNI ANDA ve AYNI
 *      değerle onaylanır.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * YASAK (bu sayfaya özel — yasaklar.md "seo" modül geneli + "yerel-seo"):
 *  - ARAMA MOTORU LOGOSU / ONA BENZER İŞARET YOK. Büyüteç, renkli harf, arama
 *    kutusu taklidi çizilmedi.
 *  - GOOGLE LOGOSU, MAPS KONUM İŞARETİ YA DA ONLARA BENZEYEN SİMGE YOK:
 *    bu sahnede damla biçimli konum iğnesi, harita alanı, ızgaralı sokak
 *    dokusu ya da yarıçap çemberi HİÇ ÇİZİLMEDİ.
 *  - YORUM YILDIZI YOK. Sayfanın kendi .akis infografiği altındaki not
 *    "Bilerek çizilmeyenler: yıldız, puan ve yorum sayısı" diyor; bu sahne o
 *    kararla aynı hizada durur. Yorumlar nötr metin çubuğu olarak çizildi.
 *  - RAKAM YOK: puan, yorum adedi, sıralama, trafik, tarama bütçesi, şube
 *    sayısı, fiyat — hiçbiri yazılmadı. Tek rakam durak numaraları (01/02/03),
 *    sayfanın kendi numaralandırması.
 *  - GERÇEK İŞLETME ADI / ADRES / TELEFON YOK: kaynak kaydın üç alanı da soyut
 *    çubuk; dizin satırlarında da yalnız çubuk var, hiçbir dizinin adı yazılı
 *    değil.
 *  - İNSAN YÜZÜ YOK: bu sahnede hiç avatar/siluet yok.
 *  - LOGO YOK.
 *
 * KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği + kahraman çizim):
 *  .akis üç kutuyu şöyle çiziyor: (1) işletme profili KARTI — kapak şeridi, ad
 *  ve kategori çubuğu, dört doluluk karesi, "Adres / Telefon / Çalışma bilgisi /
 *  Kategori" satırları; (2) SEMT ARAMASI — arama çubuğu, "semt bazlı" rozeti,
 *  konum ikonlu üç sorgu satırı; (3) HARİTA SIRALAMASI — ızgaralı harita, üç
 *  konum iğnesi, "İlgi / Mesafe / Tanınırlık" etiketleri. Kahraman çizim de
 *  konum iğnesi + semt yarıçapı + profil kartı çiziyor.
 *  Bu sahne o üç kutunun HİÇBİRİNİ tekrar etmiyor; sayfanın .akv listesindeki
 *  BAŞKA üç adımı çiziyor (dizin kayıtları, yorum süreci, çoklu şube). Çelişki
 *  yaratabilecek üç nokta bilerek elendi:
 *   · Konum iğnesi ve harita YOK — ikisini de kardeş figür ve kahraman çiziyor.
 *   · Yıldız/puan YOK — kardeş figürün altındaki not bunu açıkça dışarıda
 *     bırakıyor; yorum durağı yıldızsız çizildi.
 *   · Kaynak kaydın alan sırası kardeş figürle AYNI kavramları taşıyor
 *     (ad-adres-telefon) ama kutuyu tekrar etmiyor: burada kayıt tek başına
 *     değil, dizinlere DAĞITILAN bir kaynak olarak duruyor.
 *
 * EŞİTLİK — KODA BAKARAK DEĞİL PİKSEL ÖLÇEREK (durak 03):
 *  Sayfa "hiçbir şube diğerinin sinyalini zayıflatmaz" diyor; üç şube görselde
 *  eşit olmak ZORUNDA. Alınan önlemler:
 *   · Üç sütun TEK bir döngüde, tek kod yoluyla çiziliyor; indekse bağlı hiçbir
 *     değer yok (gecikme yok, sıra ışığı yok, boyut/kontur/dolgu birebir aynı).
 *   · Sütunlar panelin ÜST bandına (yerel DY+12…DY+118 = tuvalde y 138…244)
 *     konuldu. Işık darbesi bu durakta y 303…357 arasında geziyor, etki alanı
 *     (yarıçap 52) y 251…409; yani sütunlar darbenin erişiminin DIŞINDA.
 *   · Akan boru bu durakta panelin içinden geçiyor (x 812'de y 303, x 1058'de
 *     y 357) ve cam yüzey saydam olduğu için sütunları eşitsiz aydınlatırdı;
 *     panelin altına yarı geçirmez zemin konuldu, boru artık arkada kalıyor.
 *   · Denetim çerçevesindeki üç öznitelik satırı TAM GENİŞLİK — şubeye bağlı
 *     hiçbir öğe darbenin bandında durmuyor.
 *   · Üç şube jetonu darbenin ALTINDAKİ temiz banda (y 425…447) konuldu ve üçü
 *     AYNI ANDA, AYNI formülle onaylanıyor (sıralı süpürme yok — süpürme
 *     kaçınılmaz olarak birini önce parlatır).
 *  ÖLÇÜM (griye çevrilmiş kareden bölge ortalaması, sol / orta / sağ):
 *     tepe kare (faz 0,80)   sütun 57,14 / 56,82 / 56,28   fark %1,5
 *                            jeton 69,70 / 70,71 / 68,63   fark %2,9
 *     tüm döngü (120 kare)   sütun 38,24 / 37,78 / 37,38   fark %2,2
 *                            jeton 43,68 / 44,66 / 42,79   fark %4,2
 *  Kalan farkın kaynağı çizim DEĞİL: (a) tuval geneli `zeminHale` degradesi
 *  soldan sağa sönüyor — sütunlarda sıra hep 57,14 > 56,82 > 56,28, yani soldan
 *  sağa tekdüze azalıyor, oysa üç sütun tek kod yolundan çıkıyor; (b) jetonlarda
 *  ortadaki en parlak (70,71) çünkü ışık darbesi faz 0,80'de tuvalde x 932'de,
 *  panelin ortasına (x 935) 3 piksel kala duruyor — sahne aydınlatması, tasarım
 *  üstünlüğü değil, ve sol/sağ jetonlar birbirine denk kalıyor (69,70 / 68,63;
 *  aralarındaki %1,5'lik fark da soldan sağa sönen zemin degradesi).
 *  Ölçüm sırasında yarı geçirmez
 *  zemin .72'den .80'e çıkarıldı: sütun farkı %1,7 → %1,5, döngü farkı
 *  %3,1 → %2,2 indi (ve akan borunun denetim satırlarını kesmesi de azaldı).
 *
 * ÜRETİM — BU SAHNE crf 24 İLE BASILIR (ölçüldü, gerekçesi burada):
 *   node -e "const m=require('./plan/video-uret/motor.js');
 *            m.uret('modul-seo/yerel-seo','seo',
 *                   require('./plan/video-uret/sahne-yerel-seo.js'),{crf:24})"
 *   `uret.js` motorun varsayılanı olan crf 26 ile basar; bu sahnede o ayar
 *   döngü denetiminden KIL PAYI geçmiyor. Kaynak kareler kusursuz dikişsiz —
 *   ham SVG karelerinde ölçüldü: 119→0 farkı 0,025, ardışık kare ortalaması
 *   0,275, yani oran 0,09× (eşik 1,6). Sorun çizimde değil KODLAYICIDA:
 *   videonun tek anahtar karesi 0. karedir, sonraki 119 kare P-kare olarak
 *   nicemleme kayması biriktirir. mp4 üzerinden ölçüm:
 *      crf 26 → dikiş 0,71  oran 1,62 ✗   (188 KB)
 *      crf 24 → dikiş 0,61  oran 1,39 ✓   (230 KB)
 *   crf 24 seçildi: kardeş videoların boyut aralığında (163–287 KB).
 *
 * DİKİŞSİZ DÖNGÜ — ölçülmüş kural:
 *  Durak içi ilerlemeler durağın kendi penceresine oturtulmuş `u` üzerinden
 *  sürülüyor (durak 1: faz 0,01–0,39; durak 2: 0,31–0,69; durak 3: 0,61–0,99).
 *  `u` faz 1⁻ ile faz 0⁺ arasında ATLAR (örn. 2,6 → −0,03), bu yüzden `u`'dan
 *  türeyen HER geometri ayrıca `gate = kis01((p−0,02)/0,30)` ile çarpıldı.
 *  p (canlılık) dikişte iki taraftan da tam 0 olduğu için gate de 0; atlayan
 *  değerin ekranda karşılığı kalmıyor. Kesik akışları desenin TAM SAYI katı
 *  kadar kayıyor. Nabızlar kosinüs, turda tam sayıda çevrim.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara, böylece
   site içindeki videolar aynı ritmi paylaşıyor. Üstteki 118 piksel sayfadaki
   "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 DİZİN KAYDI' },
  /* ETİKET GENİŞLİĞİ PİKSEL ÖLÇÜLDÜ (kod hesabı değil), 246 px istasyona göre:
       "01 DİZİN KAYDI"  229 px
       "02 YORUM+YANIT"  230 px
       "03 ÇOKLU ŞUBE"   213 px
     Elenen aday: "02 YORUM YANITI" TAM 246 px çıktı — sığıyor ama iki kenara da
     sıfır boşlukla dayanıyordu; "+" biçimi kardeş sahnedeki "03 SES + POST"
     deseniyle de aynı hizada. "02 YORUM TOPLAMA" 264 px ile taşıyordu. */
  { x: 437, fazMerkez: 0.50, etiket: '02 YORUM+YANIT' },
  { x: 812, fazMerkez: 0.80, etiket: '03 ÇOKLU ŞUBE' },
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
    s += (i === 0 ? dizinKaydi(d.x, p, faz, a)
       : i === 1 ? yorumYaniti(d.x, p, faz, a)
       : subeler(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · YEREL DİZİN KAYITLARI (CITATION) YÖNETİMİ ─────────────────────
   Üstte KAYNAK KAYIT: üç alan (ad / adres / telefon) soyut çubuk olarak.
   Ondan aşağı akan bir omurga; omurgaya beş dizin satırı takılı. Denetim
   halkası satırlarda yukarıdan aşağı gezer:
     satır 1, 3, 4 → zaten tutarlı (üç alan da kaynağın genişliğinde)
     satır 2       → ÇELİŞKİLİ: orta alan hayalet genişliğin altında; halka
                     gelince kaynağın genişliğine tamamlanır ("düzeltilir")
     satır 5       → BOŞ YUVA: kesikli kenarlık + artı; halka gelince üç alan
                     yazılır, kenarlık sertleşir ("yeni dizine kayıt açılır")
   Satır gövdeleri hiç kararmıyor — halka sırayı gösteriyor, üstünlük değil.

   ÖLÇÜ NOTU — İKİ KEZ DÜZELTİLDİ, ikisi de önizlemede görüldü:
   1) İlk yerleşimde dört satır vardı ve içerik DY+280'de bitiyordu; panelin
      altında 64 piksel ölü boşluk kalıyordu. Satır sayısı beşe çıkarıldı,
      blok DY+88…DY+320 arasına yayıldı.
   2) Daha önemlisi: boru bu durakta y 357…368'den (yerel DY+231…DY+242)
      geçiyor ve ışık darbesi faz 0,20'de tam (188, 368) = yerel (126, DY+242)
      noktasına oturuyor. İlk yerleşimde o nokta SON satırın — yani "yeni kayıt
      açılıyor" anının — tam üstündeydi ve satırı yiyordu. Satırlar yeniden
      sıralandı: darbenin çekirdeği artık 4. satıra (sıradan, zaten tutarlı bir
      satır) düşüyor; anlatının iki taşıyıcı satırı darbenin erişimi olan
      DY+190…DY+294 bandının DIŞINDA duruyor — çelişkili satır DY+136…176'da,
      yeni kayıt satırı DY+280…320'de. Panelin altına ayrıca yarı geçirmez
      zemin konuldu, akan boru artık satırların arkasında kalıyor. */
function dizinKaydi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const u = (faz - 0.01) / 0.38;              // durağın kendi penceresi
  const v = kis01((u - 0.06) / 0.56);         // süreç, pencerenin ilk %60'ında biter
  const gate = kis01((p - 0.02) / 0.30);      // dikiş kalkanı (dosya başındaki not)
  let s = '';

  /* --- yarı geçirmez zemin: akan boru panelin İÇİNDEN geçiyor ---------- */
  s += `<rect x="${bx + 10}" y="${DY + 6}" width="226" height="322" rx="13" fill="rgba(14,17,24,.68)"/>`;

  /* --- KAYNAK KAYIT ---------------------------------------------------- */
  const mX = bx + 16, mY = DY + 12, mW = 214, mH = 68;
  s += `<rect x="${mX}" y="${mY}" width="${mW}" height="${mH}" rx="10"
          fill="rgba(255,255,255,${(0.042 + 0.040 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.5"/>`;
  /* kaynak başlığı — aksan çubuk, gerçek işletme adı DEĞİL */
  s += `<rect x="${mX + 14}" y="${mY + 12}" width="56" height="7" rx="3.5"
          fill="rgba(${A},${(0.42 + 0.44 * p).toFixed(3)})"/>`;
  /* üç alan: ad / adres / telefon — hepsi soyut, hiçbiri okunur metin değil */
  const ALAN = [92, 116, 70];
  ALAN.forEach((w, i) => {
    const ay = mY + 30 + i * 14;
    s += `<rect x="${mX + 14}" y="${ay - 1}" width="8" height="8" rx="2.4" fill="none"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
    s += `<rect x="${mX + 28}" y="${ay}" width="${w}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.13 + 0.22 * p).toFixed(3)})"/>`;
  });

  /* --- omurga: kaynak bilgisi aşağıya, dizinlere akıyor -----------------
     Desen 13 (5+8); bir turda tam 3 desen kayıyor → dikişsiz. */
  const sX = bx + 24;
  s += `<line x1="${sX}" y1="${DY + 84}" x2="${sX}" y2="${DY + 300}"
          stroke="rgba(${A},${(0.22 + 0.48 * p).toFixed(3)})" stroke-width="1.7"
          stroke-dasharray="5 8" stroke-dashoffset="${(-faz * 39).toFixed(1)}"
          stroke-linecap="round"/>`;

  /* --- beş dizin satırı ------------------------------------------------- */
  const rX = bx + 38, rW = 192, rH = 40, r0 = DY + 88, rAdim = 48, rSay = 5;
  const sira = [0, 1, 2, 3, 4].map((i) => kis01(1 - Math.abs(v * rSay - i - 0.5) * 2.2));
  const BAR = [42, 54, 32];
  const barX = (k) => rX + 30 + (k === 0 ? 0 : k === 1 ? 50 : 112);

  for (let i = 0; i < rSay; i++) {
    const ry = r0 + i * rAdim;
    const tamam = kis01((v * rSay - i - 0.35) / 0.5) * gate;
    const yeni = i === 4;                      // boş yuva → yeni kayıt
    const celiskili = i === 1;                 // orta alanı eksik → düzeltilir

    /* omurgadan satıra takılma */
    s += `<line x1="${sX}" y1="${ry + rH / 2}" x2="${rX}" y2="${ry + rH / 2}"
            stroke="rgba(${A},${(0.16 + 0.38 * p).toFixed(3)})" stroke-width="1.5"/>`;
    s += `<circle cx="${sX}" cy="${ry + rH / 2}" r="2.8"
            fill="rgba(${A},${(0.28 + 0.52 * p).toFixed(3)})"/>`;

    /* gövde — dolu satırlarda düz kenarlık, boş yuvada kesikli.
       Kesikli ve düz kenarlık ÜST ÜSTE çizilip opaklıkla geçiş yapılıyor,
       böylece "kayıt açıldı" anı sıçramadan okunuyor. */
    s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.028 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${((0.10 + 0.15 * p) * (yeni ? tamam : 1)).toFixed(3)})"
            stroke-width="1.3"/>`;
    if (yeni) {
      s += `<rect x="${rX}" y="${ry}" width="${rW}" height="${rH}" rx="9" fill="none"
              stroke="rgba(255,255,255,${((0.09 + 0.13 * p) * (1 - tamam)).toFixed(3)})"
              stroke-width="1.3" stroke-dasharray="5 6"/>`;
    }

    /* dizin işareti — nötr kare; boş yuvada içi artı, kayıt açılınca nokta */
    const ix = rX + 9, iy = ry + 13;
    s += `<rect x="${ix}" y="${iy}" width="14" height="14" rx="4" fill="none"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
    if (yeni) {
      s += `<path d="M${ix + 7} ${iy + 3.6} V${iy + 10.4} M${ix + 3.6} ${iy + 7} H${ix + 10.4}"
              stroke="rgba(${A},${((0.34 + 0.42 * p) * (1 - tamam)).toFixed(3)})"
              stroke-width="1.7" stroke-linecap="round"/>`;
      s += `<circle cx="${ix + 7}" cy="${iy + 7}" r="3.1"
              fill="rgba(${A},${((0.38 + 0.44 * p) * tamam).toFixed(3)})"/>`;
    } else {
      s += `<circle cx="${ix + 7}" cy="${iy + 7}" r="3.1"
              fill="rgba(${A},${(0.30 + 0.44 * p).toFixed(3)})"/>`;
    }

    /* üç alan — kaynağın alanlarının dizindeki karşılığı */
    BAR.forEach((w, k) => {
      const bxx = barX(k), byy = ry + 13;
      /* hayalet: kaynağın genişliği, her satırda görünür */
      s += `<rect x="${bxx}" y="${byy}" width="${w}" height="7" rx="3.5"
              fill="rgba(255,255,255,.045)"/>`;
      /* gerçek genişlik */
      let oran = 1;
      if (yeni) oran = tamam;                                  // yoktu, açıldı
      else if (celiskili && k === 1) oran = 0.40 + 0.60 * tamam; // eksikti, tamamlandı
      s += `<rect x="${bxx}" y="${byy}" width="${(w * oran).toFixed(1)}" height="7" rx="3.5"
              fill="rgba(255,255,255,${(0.16 + 0.26 * p).toFixed(3)})"/>`;
    });

    /* alt çizgi: satırın denetlenmiş payı */
    s += `<rect x="${barX(0)}" y="${ry + 27}" width="144" height="3" rx="1.5"
            fill="rgba(255,255,255,.04)"/>`;
    s += `<rect x="${barX(0)}" y="${ry + 27}" width="${(144 * tamam).toFixed(1)}" height="3" rx="1.5"
            fill="rgba(${A},${(0.30 + 0.46 * p).toFixed(3)})"/>`;

    /* onay tiki — satır tamamlanınca çizilir */
    const tx = rX + 176, ty = ry + rH / 2;
    s += `<path d="M${tx - 6} ${ty} L${tx - 1.5} ${ty + 4.8} L${tx + 6.5} ${ty - 5}"
            fill="none" stroke="rgba(${A},${(0.30 + 0.60 * p).toFixed(3)})"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="19" stroke-dashoffset="${(19 * (1 - tamam)).toFixed(2)}"/>`;
  }

  /* --- denetim halkası: satırları karartmadan sırayı gösterir ----------- */
  const halkaY = r0 + a.kis(v * rSay - 0.5, 0, rSay - 1) * rAdim;
  const halkaG = Math.max(...sira) * gate;
  if (halkaG > 0.01) {
    s += `<rect x="${rX - 4}" y="${(halkaY - 4).toFixed(1)}" width="${rW + 8}" height="${rH + 8}" rx="12"
            fill="none" stroke="rgba(${A},${(0.70 * halkaG * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke-width="1.8"/>`;
  }
  return s;
}

/* ── 02 · MÜŞTERİ YORUMU TOPLAMA VE YANITLAMA SÜRECİ ────────────────────
   Üst şerit: hizmet bitiş tiki → akan kesikli aralık → talep çıkışı.
   Kesikli aralık "hizmet sonrası doğru zamanlama"nın görsel karşılığı; aralığın
   uzunluğu sabit, üzerinden akan kesikler zamanın geçtiğini söylüyor.
   Orta: üç yorum kartı. Gezen halka hangi karttaysa onun yanıtı yazılır.
   ÜÇ YANITIN SATIR DİZİSİ BİRBİRİNDEN FARKLI — "kişiselleştirilmiş yanıt"
   demek şablon çoğaltmak değil demek; aynı üç çubuğu kopyalamak bunun tersini
   söylerdi.
   Alt: çerçeveli bölge — uyarı işaretinden çıkan çözüm rayı sağdaki onay
   halkasına doğru dolar ("olumsuz yorumlar hızlıca ele alınıp çözüme taşınır").
   YILDIZ YOK: sayfanın kendi .akis notu yıldız/puan/adedi bilerek dışarıda
   bırakıyor; yorumlar nötr metin çubuğu olarak çizildi.
   ÖLÇÜ NOTU: boru bu durakta y 292…330 (yerel DY+166…DY+204), darbe faz
   0,50'de (560, 303) = yerel (123, DY+177). İkisi de 2. yorum satırının
   bandına düşüyor; panelin altına yarı geçirmez zemin konuldu, boru artık
   arkada kalıyor. Darbe panelin x aralığındayken en aşağı yerel DY+256'ya
   kadar uzanıyor (faz 0,401'de merkez y 330, yarıçap 52); alt bölgenin
   TAŞIYICI hattı — uyarı işareti, çözüm rayı ve onay halkası — yerel
   DY+288'de, yani o erişimin altında duruyor. */
function yorumYaniti(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const u = (faz - 0.31) / 0.38;
  const v = kis01((u - 0.06) / 0.56);
  const gate = kis01((p - 0.02) / 0.30);
  let s = '';

  s += `<rect x="${bx + 10}" y="${DY + 8}" width="226" height="322" rx="13" fill="rgba(14,17,24,.68)"/>`;

  /* --- talep şeridi: hizmet bitti → aralık → talep çıkışı --------------- */
  const ty = DY + 16, tcy = ty + 20;
  s += `<circle cx="${bx + 34}" cy="${tcy}" r="12" fill="rgba(${A},${(0.10 + 0.10 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.28 + 0.50 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<path d="M${bx + 28.5} ${tcy} L${bx + 33} ${tcy + 4.6} L${bx + 40} ${tcy - 5}"
          fill="none" stroke="rgba(255,255,255,${(0.40 + 0.50 * p).toFixed(3)})"
          stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* aralık — desen 12 (4+8), turda tam 4 desen → dikişsiz */
  s += `<line x1="${bx + 52}" y1="${tcy}" x2="${bx + 148}" y2="${tcy}"
          stroke="rgba(${A},${(0.24 + 0.48 * p).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="4 8" stroke-dashoffset="${(-faz * 48).toFixed(1)}"
          stroke-linecap="round"/>`;
  /* talep çıkışı — nötr kutu, iki satır, sağa çıkan ok */
  s += `<rect x="${bx + 156}" y="${ty + 6}" width="58" height="28" rx="7"
          fill="rgba(255,255,255,${(0.040 + 0.040 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<rect x="${bx + 165}" y="${ty + 13}" width="34" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.14 + 0.22 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 165}" y="${ty + 23}" width="22" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.11 + 0.18 * p).toFixed(3)})"/>`;
  s += `<path d="M${bx + 218} ${tcy - 5} L${bx + 226} ${tcy} L${bx + 218} ${tcy + 5} Z"
          fill="rgba(${A},${(0.30 + 0.55 * p).toFixed(3)})"/>`;

  /* --- üç yorum + kişiselleştirilmiş yanıt ------------------------------
     Yorum satırları üç kartta FARKLI (gerçek yorumlar aynı uzunlukta olmaz),
     yanıt satırları da üç kartta FARKLI — şablon değil.  */
  const YORUM = [[86, 62, 74], [72, 88, 54], [92, 58, 68]];
  const YANIT = [[52, 34], [40, 46], [58, 28]];
  const r0 = DY + 66, rAdim = 58, rH = 50;
  const sira = [0, 1, 2].map((i) => kis01(1 - Math.abs(v * 3 - i - 0.5) * 1.7));

  for (let i = 0; i < 3; i++) {
    const ry = r0 + i * rAdim;
    const yanit = kis01((v * 3 - i - 0.30) / 0.5) * gate;

    /* yorum kartı — yıldız YOK, yalnız nötr metin çubukları */
    s += `<rect x="${bx + 16}" y="${ry}" width="122" height="${rH}" rx="8"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    YORUM[i].forEach((w, k) => {
      s += `<rect x="${bx + 26}" y="${ry + 11 + k * 13}" width="${w}" height="6" rx="3"
              fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
    });

    /* dönüş oku — yanıt kartına giren dirsek */
    s += `<path d="M${bx + 140} ${ry + 16} H${bx + 147} V${ry + 30} H${bx + 152}"
            fill="none" stroke="rgba(${A},${((0.24 + 0.50 * p) * (0.30 + 0.70 * yanit)).toFixed(3)})"
            stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path d="M${bx + 152} ${ry + 26} L${bx + 158} ${ry + 30} L${bx + 152} ${ry + 34} Z"
            fill="rgba(${A},${((0.26 + 0.55 * p) * (0.30 + 0.70 * yanit)).toFixed(3)})"/>`;

    /* yanıt kartı — satır dizisi her yorumda farklı */
    s += `<rect x="${bx + 160}" y="${ry + 14}" width="70" height="32" rx="7"
            fill="rgba(${A},${(0.030 + 0.055 * yanit).toFixed(3)})"
            stroke="rgba(${A},${(0.12 + 0.48 * yanit * (0.4 + 0.6 * p)).toFixed(3)})" stroke-width="1.2"/>`;
    YANIT[i].forEach((w, k) => {
      s += `<rect x="${bx + 168}" y="${ry + 22 + k * 12}" width="${(w * (0.25 + 0.75 * yanit)).toFixed(1)}"
              height="5" rx="2.5" fill="rgba(255,255,255,${(0.12 + 0.26 * p).toFixed(3)})"/>`;
    });
  }

  /* --- gezen halka: kartları karartmadan sırayı gösterir ---------------- */
  const halkaY = r0 + a.kis(v * 3 - 0.5, 0, 2) * rAdim;
  const halkaG = Math.max(...sira) * gate;
  if (halkaG > 0.01) {
    s += `<rect x="${bx + 12}" y="${(halkaY - 4).toFixed(1)}" width="222" height="${rH + 8}" rx="12"
            fill="none" stroke="rgba(${A},${(0.70 * halkaG * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke-width="1.8"/>`;
  }

  /* --- olumsuz yorum → çözüm ------------------------------------------- */
  const fX = bx + 16, fY = DY + 248, fW = 214, fH = 78;
  s += `<rect x="${fX}" y="${fY}" width="${fW}" height="${fH}" rx="10" fill="none"
          stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.2"
          stroke-dasharray="5 6"/>`;
  /* uyarı işareti — üçgen + çubuk + nokta (yıldız/puan DEĞİL) */
  const wx = fX + 26, wy = fY + 40;
  s += `<path d="M${wx} ${wy - 12} L${wx + 12} ${wy + 9} L${wx - 12} ${wy + 9} Z" fill="none"
          stroke="rgba(255,255,255,${(0.28 + 0.36 * p).toFixed(3)})" stroke-width="1.9"
          stroke-linejoin="round"/>`;
  s += `<path d="M${wx} ${wy - 4} V${wy + 1}" stroke="rgba(255,255,255,${(0.30 + 0.38 * p).toFixed(3)})"
          stroke-width="1.9" stroke-linecap="round"/>`;
  s += `<circle cx="${wx}" cy="${wy + 5}" r="1.5" fill="rgba(255,255,255,${(0.30 + 0.38 * p).toFixed(3)})"/>`;
  /* çözüm rayı — soldan sağa dolar */
  const cozum = kis01((v - 0.32) / 0.6) * gate;
  const rayX = fX + 48, rayW = 118, rayY = fY + 40;
  s += `<rect x="${rayX}" y="${rayY - 3}" width="${rayW}" height="6" rx="3" fill="rgba(255,255,255,.045)"/>`;
  s += `<rect x="${rayX}" y="${rayY - 3}" width="${(rayW * cozum).toFixed(1)}" height="6" rx="3"
          fill="rgba(${A},${(0.32 + 0.48 * p).toFixed(3)})"/>`;
  s += `<circle cx="${(rayX + rayW * cozum).toFixed(1)}" cy="${rayY}" r="4.4"
          fill="rgba(${A},${(0.35 + 0.55 * p).toFixed(3)})"/>`;
  /* onay halkası — çözüm varınca tik çizilir */
  const ox = fX + 186, oy = rayY;
  s += `<circle cx="${ox}" cy="${oy}" r="17" fill="rgba(${A},${(0.09 * cozum).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.60 * cozum).toFixed(3)})" stroke-width="1.7"/>`;
  s += `<path d="M${ox - 7.5} ${oy + 0.6} L${ox - 2} ${oy + 6.5} L${ox + 8} ${oy - 5.5}"
          fill="none" stroke="rgba(255,255,255,${(0.26 + 0.66 * cozum).toFixed(3)})"
          stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="27" stroke-dashoffset="${(27 * (1 - cozum)).toFixed(2)}"/>`;
  return s;
}

/* ── 03 · ÇOKLU ŞUBE VE BÖLGESEL İÇERİK STRATEJİSİ ──────────────────────
   Üstte üç şube sütunu — ÜÇÜ BİREBİR AYNI (dosya başındaki EŞİTLİK notu).
   Her sütunda sayfanın saydığı üç bağımsız parça alt alta:
     bağımsız profil · ayrı semt sayfası · ayrı yorum akışı
   Sütunların altından tek bir ortak kucaklama (üç eşit tırnak, ortadan inen tek
   gövde) tutarlılık denetimine iner. Denetim çerçevesinde üç öznitelik satırı
   sırayla denetlenir: kategori (etiket), çalışma bilgisi (kadranı rakamsız
   saat), iletişim bilgisi (ahize). En altta üç şube jetonu AYNI ANDA onaylanır —
   sıralı süpürme bilerek konmadı, süpürme kaçınılmaz olarak birini önce
   parlatıyor ve sayfa "hiçbir şube diğerinin sinyalini zayıflatmaz" diyor. */
function subeler(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const u = (faz - 0.61) / 0.38;
  const v = kis01((u - 0.06) / 0.56);
  const gate = kis01((p - 0.02) / 0.30);
  let s = '';

  /* yarı geçirmez zemin — boru bu durakta panelin içinden çapraz geçiyor
     (x 812'de y 303, x 1058'de y 357); zemin olmadan sol sütun ile sağ sütun
     farklı aydınlanıyordu. */
  s += `<rect x="${bx + 8}" y="${DY + 8}" width="230" height="326" rx="13" fill="rgba(14,17,24,.80)"/>`;

  /* --- üç şube sütunu: TEK kod yolu, indekse bağlı hiçbir değer yok ----- */
  const KOL = [bx + 12, bx + 89, bx + 166];       // merkezler bx+46 / +123 / +200
  const ky = DY + 12, kw = 68, kh = 106;
  KOL.forEach((kx) => {
    s += `<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="10"
            fill="rgba(255,255,255,${(0.034 + 0.034 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.3"/>`;
    /* şube başlığı — nötr kare + aksan çubuk (ad yazılmıyor) */
    s += `<rect x="${kx + 9}" y="${ky + 9}" width="11" height="11" rx="3" fill="none"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
    s += `<rect x="${kx + 25}" y="${ky + 11}" width="32" height="7" rx="3.5"
            fill="rgba(${A},${(0.36 + 0.42 * p).toFixed(3)})"/>`;

    /* üç bağımsız parça */
    for (let b = 0; b < 3; b++) {
      const by = ky + 28 + b * 26;
      s += `<rect x="${kx + 9}" y="${by}" width="50" height="22" rx="5"
              fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.1"/>`;
      const ink = (0.14 + 0.24 * p).toFixed(3);
      if (b === 0) {
        /* bağımsız profil — kapak şeridi + ad çubuğu */
        s += `<rect x="${kx + 14}" y="${by + 5}" width="40" height="6" rx="2"
                fill="rgba(${A},${(0.24 + 0.34 * p).toFixed(3)})"/>`;
        s += `<rect x="${kx + 14}" y="${by + 14}" width="26" height="4" rx="2"
                fill="rgba(255,255,255,${ink})"/>`;
      } else if (b === 1) {
        /* ayrı semt sayfası — belge satırları */
        [30, 24, 18].forEach((w, r) => {
          s += `<rect x="${kx + 14}" y="${by + 5 + r * 6}" width="${w}" height="3.4" rx="1.7"
                  fill="rgba(255,255,255,${ink})"/>`;
        });
      } else {
        /* ayrı yorum akışı — iki yorum çubuğu + dönüş tırnağı */
        s += `<rect x="${kx + 14}" y="${by + 5}" width="28" height="4" rx="2"
                fill="rgba(255,255,255,${ink})"/>`;
        s += `<rect x="${kx + 20}" y="${by + 13}" width="22" height="4" rx="2"
                fill="rgba(${A},${(0.22 + 0.34 * p).toFixed(3)})"/>`;
        s += `<path d="M${kx + 14} ${by + 11} V${by + 15} H${kx + 18}" fill="none"
                stroke="rgba(${A},${(0.22 + 0.36 * p).toFixed(3)})" stroke-width="1.2"
                stroke-linecap="round" stroke-linejoin="round"/>`;
      }
    }
  });

  /* --- ortak kucaklama: üç eşit tırnak, tek gövde ------------------------ */
  const brY = DY + 132;
  s += `<path d="M${bx + 46} ${brY - 10} V${brY} H${bx + 200} V${brY - 10}
          M${bx + 123} ${brY - 10} V${brY}" fill="none"
          stroke="rgba(${A},${(0.20 + 0.44 * p).toFixed(3)})" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<line x1="${bx + 123}" y1="${brY}" x2="${bx + 123}" y2="${brY + 14}"
          stroke="rgba(${A},${(0.24 + 0.48 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="4 6" stroke-dashoffset="${(-faz * 40).toFixed(1)}"/>`;
  s += `<path d="M${bx + 118} ${brY + 14} L${bx + 123} ${brY + 20} L${bx + 128} ${brY + 14} Z"
          fill="rgba(${A},${(0.28 + 0.52 * p).toFixed(3)})"/>`;

  /* --- tutarlılık denetimi ---------------------------------------------- */
  const fX = bx + 16, fY = DY + 156, fW = 214, fH = 174;
  s += `<rect x="${fX}" y="${fY}" width="${fW}" height="${fH}" rx="10" fill="none"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1.2"
          stroke-dasharray="5 6"/>`;

  /* üç öznitelik satırı — TAM GENİŞLİK, şubeye bağlı öğe yok (eşitlik notu) */
  const sira = [0, 1, 2].map((i) => kis01(1 - Math.abs(v * 3 - i - 0.5) * 1.7));
  for (let i = 0; i < 3; i++) {
    const ry = fY + 10 + i * 42, rx = fX + 10, rw = 194, rh = 36;
    const dolgu = kis01((v * 3 - i - 0.30) / 0.5) * gate;
    s += `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="8"
            fill="rgba(255,255,255,${(0.024 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.08 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
    const ix = rx + 12, iy = ry + rh / 2;
    const ink = (0.26 + 0.36 * p).toFixed(3);
    if (i === 0) {
      /* kategori — etiket */
      s += `<path d="M${ix - 8} ${iy + 1} L${ix} ${iy - 7} H${ix + 8} V${iy + 1} L${ix} ${iy + 9} Z"
              fill="none" stroke="rgba(255,255,255,${ink})" stroke-width="1.6"
              stroke-linejoin="round"/>`;
      s += `<circle cx="${ix + 3.6}" cy="${iy - 2.6}" r="1.7" fill="rgba(255,255,255,${ink})"/>`;
    } else if (i === 1) {
      /* çalışma bilgisi — kadranı RAKAMSIZ saat */
      s += `<circle cx="${ix}" cy="${iy}" r="8" fill="none"
              stroke="rgba(255,255,255,${ink})" stroke-width="1.6"/>`;
      s += `<path d="M${ix} ${iy - 4.6} V${iy} H${ix + 4.2}" fill="none"
              stroke="rgba(255,255,255,${ink})" stroke-width="1.6"
              stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      /* iletişim bilgisi — ahize (numara YAZILMIYOR) */
      s += `<path d="M${ix - 8} ${iy - 6} a2.6 2.6 0 0 1 2.6 -2.6 h2.2 a1.8 1.8 0 0 1 1.7 1.3 l1 3.2
              a1.8 1.8 0 0 1 -0.9 2.1 l-1.5 0.8 a13 13 0 0 0 5.3 5.3 l0.8 -1.5
              a1.8 1.8 0 0 1 2.1 -0.9 l3.2 1 a1.8 1.8 0 0 1 1.3 1.7 v2.2
              a2.6 2.6 0 0 1 -2.6 2.6 A16 16 0 0 1 ${ix - 8} ${iy - 6} Z"
              fill="none" stroke="rgba(255,255,255,${ink})" stroke-width="1.5"
              stroke-linejoin="round"/>`;
    }
    /* denetim rayı */
    const cX = rx + 36, cW = 118, cY = ry + rh / 2;
    s += `<rect x="${cX}" y="${cY - 3}" width="${cW}" height="6" rx="3" fill="rgba(255,255,255,.042)"/>`;
    s += `<rect x="${cX}" y="${cY - 3}" width="${(cW * dolgu).toFixed(1)}" height="6" rx="3"
            fill="rgba(${A},${(0.30 + 0.46 * p).toFixed(3)})"/>`;
    /* tik */
    const tx = rx + 172;
    s += `<path d="M${tx - 6} ${cY} L${tx - 1.5} ${cY + 4.8} L${tx + 6.5} ${cY - 5}"
            fill="none" stroke="rgba(${A},${(0.30 + 0.60 * p).toFixed(3)})"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="19" stroke-dashoffset="${(19 * (1 - dolgu)).toFixed(2)}"/>`;
  }

  /* denetim halkası — satırları karartmadan sırayı gösterir */
  const halkaY = fY + 10 + a.kis(v * 3 - 0.5, 0, 2) * 42;
  const halkaG = Math.max(...sira) * gate;
  if (halkaG > 0.01) {
    s += `<rect x="${fX + 6}" y="${(halkaY - 4).toFixed(1)}" width="202" height="44" rx="11"
            fill="none" stroke="rgba(${A},${(0.68 * halkaG * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke-width="1.7"/>`;
  }

  /* --- üç şube jetonu: AYNI ANDA, AYNI değerle onaylanır -----------------
     Darbenin altındaki temiz banda (y 418…448) konuldu; sütunlarla aynı
     x merkezlerinde durur, böylece "bu üç şube tutarlı" okunur. */
  const esit = kis01((v - 0.62) / 0.3) * gate;
  const eY = fY + 154;
  s += `<line x1="${bx + 46}" y1="${eY}" x2="${bx + 200}" y2="${eY}"
          stroke="rgba(${A},${(0.14 + 0.36 * esit).toFixed(3)})" stroke-width="1.4"/>`;
  KOL.forEach((kx) => {
    const cx = kx + 34;
    s += `<rect x="${cx - 11}" y="${eY - 11}" width="22" height="22" rx="6"
            fill="rgba(${A},${(0.05 + 0.16 * esit).toFixed(3)})"
            stroke="rgba(${A},${(0.18 + 0.55 * esit).toFixed(3)})" stroke-width="1.4"/>`;
    s += `<path d="M${cx - 4.6} ${eY + 0.4} L${cx - 1.2} ${eY + 4} L${cx + 5} ${eY - 3.4}"
            fill="none" stroke="rgba(255,255,255,${(0.20 + 0.68 * esit).toFixed(3)})"
            stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="16" stroke-dashoffset="${(16 * (1 - esit)).toFixed(2)}"/>`;
  });
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
