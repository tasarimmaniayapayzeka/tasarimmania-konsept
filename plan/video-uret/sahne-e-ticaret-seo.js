/* SAHNE — seo / e-ticaret-seo
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok, üçü de
 * birebir o sayfadan (site/hizmetler/seo/e-ticaret-seo/index.html, .akv-liste):
 *   01 Faceted Navigation ve Crawl Bütçesi Yönetimi
 *      "Filtre kombinasyonlarının ürettiği sonsuz sayfa varyasyonu, arama
 *       motorlarının mağazanın önemli sayfalarına ayırdığı taramayı
 *       zayıflatabilir. Bu çalışmada hangi kombinasyonun indekslenmesi
 *       gerektiği, hangisinin kanonik yönlendirme ile birleştirileceği sayfa
 *       bazında belirlenir."
 *   02 Varyant ve Kopya İçerik Kontrolü
 *      "Renk, beden veya paket varyasyonlarının her biri ayrı URL üretebilir;
 *       bu durum kontrol edilmezse aynı ürünün onlarca kopyası indekse girer.
 *       Kanonik etiketleme ve varyant gruplama mantığı, bu tekrarı tek bir
 *       güçlü sayfada toplar."
 *   03 Platform Geçişinde Yönlendirme Planı
 *      "Mağaza altyapısı değiştiğinde eski URL'lerin yeni yapıya haritalanması,
 *       biriken sayfa otoritesinin kaybolmamasını sağlar. Yönlendirme planı,
 *       ürün ve kategori kırılımına göre önceden hazırlanır ve geçiş sonrası
 *       indeksleme takip edilir."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 üç filtre çipi yelpaze hâlinde dokuz varyasyon karosuna açılır (kenardaki
 *      karolar soluk — dizi panelin dışında sürüyor, "sonsuz varyasyon"); her
 *      karodan İNCE kesik besleme iner ve tek düğümde toplanır (dağılmış tarama);
 *      düğüm iki KARAR kutusuna eşit iki kolla bağlanır — biri tekil sayfayı
 *      indekse bırakır, öbürü üç kaydı tek kanonik satırda birleştirir; kararın
 *      altında besleme artık ÜÇ KALIN kanalda akar ve önemli sayfa karolarına
 *      varır (aynı tarama, dağılmak yerine toplanmış).
 *   02 üç öznitelik satırı (renk / beden / paket) — her satırda gezen bir aksan
 *      halka bir değer seçer; seçim aşağıda ALTI BİREBİR AYNI kopya kartı üretir
 *      (aynı ürünün kopyası); kopyalar gruplama bandında toplanır ve banttan tek
 *      kalın akış TEK güçlü sayfaya iner — sayfa her pakette bir soluk alır.
 *   03 solda eski URL satırları, sağda yeni yapı satırları; aralarında ÇAPRAZ
 *      eşleme çizgileri (haritalama) ve çizgiler üzerinde kayan otorite
 *      kürecikleri (biriken otorite yeni adrese taşınıyor). Sol satırlar iki
 *      köşeli parantezle gruplanmış: üstte iki satır, altta üç satır — sayfanın
 *      dediği "ürün ve kategori kırılımı". Altta yürürlükteki yönlendirme planı
 *      tek sürekli hat olarak akıyor. En altta beş durum karosu ve üzerlerinden
 *      gidip gelen bir tarama çizgisi: "geçiş sonrası indeksleme takip edilir".
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── DİKİŞSİZLİK: bu sahnede TEK BİR sarma (wrap) yok ─────────────────────
 * Vurgu gezmeleri sıçrayan `%1` yerine kosinüs kuvvetiyle yazıldı
 * (`pow(0.5+0.5*cos(2π(faz·k - ofset)), n)`), süpürme çizgisi gidip gelen
 * kosinüs, otorite kürecikleri iki uçta da sin(πt) ile sönüyor — yani hiçbir
 * öğe döngü noktasında ışınlanmıyor. Kesik akışlarının kaydırması desenin TAM
 * SAYI katı: dasharray toplamı × tur sayısı.
 *
 * ── YASAK (yasaklar.md → "seo" modül geneli + "e-ticaret-seo") ────────────
 *  - ARAMA MOTORU LOGOSU / BENZERİ İŞARET YOK: büyüteç, robot, renkli harf,
 *    dört renk nokta — hiçbiri çizilmedi. "Tarama" yalnız akan kesik paketlerle
 *    anlatılıyor; 03'teki süpürme DÜZ DİKEY BİR ÇİZGİ, büyüteç değil.
 *  - RAKAM YOK: sıralama, trafik, tarama bütçesi, sayfa sayısı, puan, yüzde —
 *    hiçbiri yazılmadı. Gösterge de yok. Tek rakam durak numaraları (01/02/03),
 *    sayfanın kendi numaralandırması.
 *  - GERÇEK MAĞAZA / PLATFORM ADI YOK: Shopify, ikas, IdeaSoft, WooCommerce
 *    adı da işareti de çizilmedi. 03'teki "eski/yeni" sütunlar adsız.
 *  - ÜRÜN MARKASI YOK: kopya kartlarındaki görseller yer tutucu dikdörtgen.
 *  - İNSAN YÜZÜ YOK: sahnede insan figürü hiç yok.
 *  - LOGO YOK.
 *  - YAZI: yalnız üç durak etiketi. Panellerin içinde tek bir harf yok —
 *    ayrıntıyı şekiller taşıyor (28 px altı yazı mobilde okunmuyor).
 *
 * ── ÜRETİM — BU SAHNE crf 23 İLE BASILIR (ölçüldü, gerekçesi burada) ──────
 *   node -e "const m=require('./plan/video-uret/motor.js');
 *            m.uret('modul-seo/e-ticaret-seo','seo',
 *                   require('./plan/video-uret/sahne-e-ticaret-seo.js'),{crf:23})"
 *   `uret.js` motorun varsayılanı olan crf 26 ile basar; bu sahne o ayarla döngü
 *   denetiminden GEÇMİYOR. Sorun çizimde değil KODLAYICIDA — önce bu ayrıştırıldı:
 *   ham SVG karelerinde (kodlayıcı devre dışı) ardışık kare farkı ortalaması
 *   0,314, dikiş 119→0 ise 0,069 → oran 0,22× (eşik 1,6). Kaynak kusursuz.
 *   Videonun tek anahtar karesi 0. karedir; sonraki 119 kare P-kare olarak
 *   nicemleme kayması biriktirir ve döngü noktasında geniş alana yayılmış,
 *   düşük genlikli bir tazelenme farkı kalır. mp4 üzerinden ölçüm:
 *      crf 26 → dikiş 0,89  oran 1,77 ✗   (228 KB)
 *      crf 24 → dikiş 0,79  oran 1,55 ✓   (280 KB)
 *      crf 23 → dikiş 0,73  oran 1,44 ✓   (310 KB)
 *      crf 22 → dikiş 0,69  oran 1,36 ✓   (345 KB)
 *   crf 23 seçildi: crf 24 eşiğe yalnız %3 pay bırakıyor, crf 22 ise kardeş SEO
 *   videolarının (236-277 KB) %25 üstüne çıkıyor. crf 23 hem %10 pay bırakıyor
 *   hem boyutça kardeşlerin yanında duruyor. Sahneye "geçsin diye" yapay
 *   hareket EKLENMEDİ.
 *
 * ── ETİKET GENİŞLİĞİ — PİKSEL ÖLÇÜLDÜ, kod hesabı değil ──────────────────
 * 28 px Consolas / ağırlık 600 / harf arası 1.2 ile render edilip mürekkep
 * sınırı ölçüldü (eşik: 246 px istasyon genişliği):
 *   "01 FİLTRE AĞI"   213 px ✓
 *   "02 VARYANT URL"  229 px ✓
 *   "03 YÖNLENDİRME"  229 px ✓
 * Elenen adaylar sığmadığı için elendi: "01 FİLTRE + TARAMA" 297,
 * "01 FİLTRE KARARI" 262, "02 VARYANT + KOPYA" 297, "02 KOPYA KONTROLÜ" 280,
 * "03 YÖNLENDİRME PLANI" 329. Sınırda kalanlar (245-246 px: "01 FİLTRE AĞACI",
 * "02 KOPYA İÇERİK") bilerek alınmadı — 1 px pay güvenli değil.
 *
 * ── KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği) ─────────
 * .akis üç kutuyu şöyle çiziyor: (1) KATEGORİ sayfası iskeleti — başlık çubuğu
 * ve 2×3 ürün kartı ızgarası, altında "iç link akışı"; (2) ÜRÜN sayfası düzeni —
 * solda büyük görsel, sağda başlık + üç özellik satırı + düğme, altta
 * "Yapılandırılmış veri"; (3) FİLTRE/VARYANT — solda dört ONAY KUTULU filtre
 * satırı (ikisi işaretli), sağda 3×2 = ALTI 40×40 VARYANT KARESİ (biri aksan
 * çerçeveyle seçili), altta birleşme oku + "kanonik etiket" rozeti.
 * Bu sahne aynı kavramları kullanır ama hiçbirini tekrar etmez:
 *  · Onay kutusu ve tik ÇİZİLMEDİ — .akis'in filtre paneli onları kullanıyor.
 *    Buradaki filtreler yatay çip, seçim gezen bir ışıkla gösteriliyor.
 *  · 40×40'lık altı kareli varyant ızgarası ÇİZİLMEDİ — buradaki varyantlar üç
 *    ÖZNİTELİK SATIRI (daire / farklı boy çubuk / kutu), yani başka bir kesit.
 *  · "kanonik etiket" rozeti ve onun ⤳ birleşme glifi ÇİZİLMEDİ — kanonik burada
 *    yazısız: 01'de üç kaydın tek satıra katlanması, 02'de kopyaların bantta
 *    toplanıp tek sayfaya inmesi.
 *  · .akis kategori/ürün/filtre ekranlarını çiziyor; bu sahne aynı sayfanın
 *    BAŞKA üç adımını (tarama payı, kopya kontrolü, platform geçişi) çiziyor —
 *    zaten farklı listeler.
 *
 * ── EŞİTLİK — nerede ZORUNLU, nerede DEĞİL ───────────────────────────────
 *  · ZORUNLU (01): "indekslenecek" ve "kanonik ile birleşecek" kutuları. Sayfa
 *    "hangisinin ... sayfa bazında belirlenir" diyor; ikisi de geçerli sonuç,
 *    biri üstün değil. Aynı ölçü (98×74), aynı rx, aynı dolgu, aynı kontur,
 *    aynı canlanma gecikmesi (ikisi de doğrudan p), düğümden çıkan iki kol
 *    aynı uzunlukta ve simetrik. İç simgelerin MÜREKKEBİ ayrıca ölçülüp
 *    eşitlendi — ölçüm bu dosyanın altındaki nota yazıldı.
 *  · ZORUNLU (01 alt): üç "önemli sayfa" karosu birebir aynı; ışık darbesinin
 *    yarıçapı (52) dışında kalacak şekilde DY+280'e indirildi, böylece ortadaki
 *    karo darbeden fazla pay almıyor.
 *  · ZORUNLU (02): altı kopya kartı birebir aynı çizim; tek fark en dıştaki
 *    ikisinin SİMETRİK sönümü (dizi panelin dışında sürüyor demek için).
 *    Hepsi aynı y'de, yani ışık darbesinden aynı payı alıyor.
 *  · ZORUNLU (03): beş durum karosu birebir aynı, hepsi aynı y'de; süpürme
 *    çizgisi gidip geldiği için hiçbiri kalıcı olarak öne çıkmıyor.
 *  · ZORUNLU (02 üç öznitelik SATIRI): sayfa "Renk, beden veya paket" diyor —
 *    üçü eşdeğer örnek. Üç satırın mürekkebi ölçülüp eşitlendi (%15,1 → %4,3).
 *  · GEREKMİYOR (03 sol/sağ sütun): sayfa burada iki seçenek sunmuyor, bir
 *    GEÇİŞ anlatıyor ("eski URL'lerin yeni yapıya haritalanması"). Eski sütun
 *    nötr gri, yeni sütun aksan konturlu; eski sütuna çarpı, kırmızı ya da
 *    "hatalı" işareti KONMADI — geçersiz değil, sadece geçmiş.
 *  · GEREKMİYOR (bir satırın İÇİNDEKİ jetonlar): renk tonları farklı, beden
 *    çubukları farklı boyda — özniteliğin kendisi bu. Kıyaslanan bir seçenek
 *    değil, aynı eksenin değerleri.
 *
 * Bütün sayısal sonuçlar dosyanın SONUNDAKİ "EŞİTLİK ÖLÇÜMÜ" bloğunda.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara, böylece
   site içindeki videolar aynı ritmi paylaşıyor. Üstteki 118 piksel sayfadaki
   "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 FİLTRE AĞI' },
  { x: 437, fazMerkez: 0.50, etiket: '02 VARYANT URL' },
  { x: 812, fazMerkez: 0.80, etiket: '03 YÖNLENDİRME' },
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
    s += (i === 0 ? filtreTarama(d.x, p, faz, a)
       : i === 1 ? varyantKopya(d.x, p, faz, a)
       : yonlendirme(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · FACETED NAVIGATION VE CRAWL BÜTÇESİ YÖNETİMİ ───────────────────
   Üstte üç filtre çipi; gezen bir ışık sırayla birini seçer (kombinasyon
   üretimi). Çipler yelpaze hâlinde dokuz varyasyon karosuna açılır — en
   dıştaki ikisi sönük, dizi panelin dışında sürüyor ("sonsuz sayfa
   varyasyonu"). Her karodan İNCE kesik besleme iner ve tek düğümde toplanır:
   tarama dağılmış hâli. Düğümden iki EŞİT kol iki karar kutusuna gider; kararın
   altında besleme ÜÇ KALIN kanala dönüşüp önemli sayfa karolarına varır.

   ÖLÇÜ NOTU — ışık darbesi bu durakta faz 0.20'de (bx+126, DY+242) merkezli,
   yarıçapı 52. Yerleşim buna göre kuruldu:
    · Karar kutuları DY+118..DY+192. Kutuların darbeye en yakın noktaları alt iç
      köşeleri: sol (bx+114, DY+192) → 51,4 px, sağ (bx+132, DY+192) → 50,4 px.
      İkisi de yarıçapın son yüzdeliğinde, degradenin bittiği yerde; kutuların
      ölçülen parlaklık farkı bu dosyanın sonundaki nota yazıldı.
    · Üç önemli sayfa karosu DY+290'a indirildi. İLK YERLEŞİM DY+280'DEYDİ ve
      ortadaki karonun ÜST KENARI darbe merkezinden yalnız 38 px uzaktaydı —
      yani yarıçapın (52) içinde, degradede ~0,24 opaklığa denk geliyordu.
      DY+290'da bu uzaklık 48 px, degrade opaklığı ~0,07; kalan fark ölçüldü.
    · Aradaki boşlukta yalnız üç kalın akış kanalı var — darbe onları
      aydınlatıyor, ki bu tam da anlatılan şey: taramanın toplanıp önemli
      sayfalara akması. */
function filtreTarama(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- üç filtre çipi --------------------------------------------------
     Seçim gezmesi kosinüs kuvveti: sıçrama yok, faz cinsinden periyodik. */
  const cipX = [bx + 16, bx + 90, bx + 164], cipW = 66, cipY = DY + 12, cipH = 22;
  const cipMerkez = cipX.map((x) => x + cipW / 2);
  const sec = [0, 1, 2].map((i) =>
    Math.pow(0.5 + 0.5 * Math.cos(2 * Math.PI * (faz * 2 - i / 3)), 3));

  cipX.forEach((x, i) => {
    const g = sec[i] * (0.30 + 0.70 * p);
    s += `<rect x="${x}" y="${cipY}" width="${cipW}" height="${cipH}" rx="11"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p + 0.045 * g).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.22 * p + 0.50 * g).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<circle cx="${x + 14}" cy="${cipY + 11}" r="4.4"
            fill="rgba(${A},${(0.22 + 0.28 * p + 0.45 * g).toFixed(3)})"/>`;
    s += `<rect x="${x + 25}" y="${cipY + 8}" width="30" height="6" rx="3"
            fill="rgba(255,255,255,${(0.12 + 0.18 * p + 0.16 * g).toFixed(3)})"/>`;
  });

  /* --- yelpaze: üç çip → dokuz varyasyon karosu ------------------------- */
  const karoY = DY + 52, karoW = 20, karoH = 32;
  const karoMerkez = [];
  for (let i = 0; i < 9; i++) karoMerkez.push(bx + 17 + karoW / 2 + i * (karoW + 4));
  /* dış karolar simetrik sönük: dizi panelin dışında sürüyor */
  const sonum = [0.40, 0.66, 0.88, 1, 1, 1, 0.88, 0.66, 0.40];

  karoMerkez.forEach((mx, i) => {
    const k = Math.floor(i / 3);
    s += `<path d="M${cipMerkez[k]} ${cipY + cipH} L${mx} ${karoY}" fill="none"
            stroke="rgba(${A},${(0.09 + 0.20 * p + 0.26 * sec[k] * p).toFixed(3)})"
            stroke-width="1.1"/>`;
  });

  karoMerkez.forEach((mx, i) => {
    const f = sonum[i];
    const x = mx - karoW / 2;
    s += `<rect x="${x}" y="${karoY}" width="${karoW}" height="${karoH}" rx="4"
            fill="rgba(255,255,255,${(0.026 + 0.030 * p) * f})"
            stroke="rgba(255,255,255,${((0.10 + 0.15 * p) * f).toFixed(3)})" stroke-width="1"/>`;
    s += `<rect x="${x + 4}" y="${karoY + 6}" width="12" height="4" rx="2"
            fill="rgba(${A},${((0.20 + 0.35 * p) * f).toFixed(3)})"/>`;
    s += `<rect x="${x + 4}" y="${karoY + 15}" width="12" height="3" rx="1.5"
            fill="rgba(255,255,255,${((0.10 + 0.16 * p) * f).toFixed(3)})"/>`;
    s += `<rect x="${x + 4}" y="${karoY + 22}" width="8" height="3" rx="1.5"
            fill="rgba(255,255,255,${((0.10 + 0.16 * p) * f).toFixed(3)})"/>`;
  });

  /* --- dokuz İNCE besleme tek düğümde toplanır: dağılmış tarama ---------
     desen 8 (3+5), bir turda tam 4 desen kayar → dikişsiz. */
  const dugumX = bx + 123, dugumY = DY + 104;
  const inceKay = (faz * 32).toFixed(1);
  karoMerkez.forEach((mx, i) => {
    s += `<path d="M${mx} ${karoY + karoH} L${dugumX} ${dugumY}" fill="none"
            stroke="rgba(${A},${((0.16 + 0.42 * p) * sonum[i]).toFixed(3)})" stroke-width="1.2"
            stroke-dasharray="3 5" stroke-dashoffset="-${inceKay}" stroke-linecap="round"/>`;
  });
  s += `<circle cx="${dugumX}" cy="${dugumY}" r="4.6"
          fill="rgba(${A},${(0.28 + 0.55 * p).toFixed(3)})"/>`;

  /* --- iki EŞİT kol → iki karar kutusu ---------------------------------
     Kutular bx+16 ve bx+132 (ikisi de 98 geniş), merkezleri bx+65 ve bx+181;
     düğüm ikisinin tam ortasında (bx+123). Kolların uzunluğu birebir aynı. */
  const kutuY = DY + 118, kutuW = 98, kutuH = 74;
  const kutuX = [bx + 16, bx + 132];
  const kutuM = kutuX.map((x) => x + kutuW / 2);
  kutuM.forEach((mx) => {
    s += `<path d="M${dugumX} ${dugumY + 5} L${mx} ${kutuY}" fill="none"
            stroke="rgba(${A},${(0.22 + 0.50 * p).toFixed(3)})" stroke-width="2"
            stroke-dasharray="5 7" stroke-dashoffset="-${(faz * 48).toFixed(1)}"
            stroke-linecap="round"/>`;
  });

  /* İKİ KARAR KUTUSU — birebir aynı kabuk, yalnız içerideki karar farklı.
     Kabuk parametreleri tek yerde tutuluyor ki ileride ayrışmasın. */
  const kabukDolgu = (0.030 + 0.030 * p).toFixed(3);
  const kabukKontur = (0.14 + 0.40 * p).toFixed(3);
  kutuX.forEach((x) => {
    s += `<rect x="${x}" y="${kutuY}" width="${kutuW}" height="${kutuH}" rx="10"
            fill="rgba(255,255,255,${kabukDolgu})"
            stroke="rgba(${A},${kabukKontur})" stroke-width="1.4"/>`;
  });

  /* SOL KARAR — indekslenecek: tekil sayfa kendi başına kalır, altında
     kendi kaydı için ayrılmış aksan şeridi. */
  {
    const x = kutuX[0];
    const sx = x + 30, sy = kutuY + 12, sw = 38, sh = 44;
    s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="6"
            fill="rgba(255,255,255,${(0.045 + 0.045 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.20 + 0.28 * p).toFixed(3)})" stroke-width="1.6"/>`;
    s += `<rect x="${sx + 7}" y="${sy + 9}" width="24" height="5" rx="2.5"
            fill="rgba(${A},${(0.34 + 0.44 * p).toFixed(3)})"/>`;
    s += `<rect x="${sx + 7}" y="${sy + 20}" width="24" height="4" rx="2"
            fill="rgba(255,255,255,${(0.13 + 0.20 * p).toFixed(3)})"/>`;
    s += `<rect x="${sx + 7}" y="${sy + 29}" width="16" height="4" rx="2"
            fill="rgba(255,255,255,${(0.13 + 0.20 * p).toFixed(3)})"/>`;
    /* indekse ayrılan kendi satırı */
    s += `<rect x="${x + 18}" y="${kutuY + 62}" width="62" height="6" rx="3"
            fill="rgba(${A},${(0.30 + 0.48 * p).toFixed(3)})"/>`;
  }

  /* SAĞ KARAR — kanonik ile birleşecek: üç kayıt tek satırda toplanır.
     Yazı yok, rozet yok (kardeş .akis figürü "kanonik etiket" rozetini zaten
     kullanıyor); birleşme sadece geometriyle anlatılıyor. */
  {
    const x = kutuX[1];
    const kx = x + 12, hx = x + 60;
    const hy = kutuY + 36;
    for (let i = 0; i < 3; i++) {
      const ky = kutuY + 14 + i * 18;
      s += `<rect x="${kx}" y="${ky}" width="30" height="12" rx="3.5"
              fill="rgba(255,255,255,${(0.040 + 0.040 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.16 + 0.22 * p).toFixed(3)})" stroke-width="1.3"/>`;
      s += `<path d="M${kx + 30} ${ky + 6} C${kx + 42} ${ky + 6} ${hx - 14} ${hy + 6} ${hx - 4} ${hy + 6}"
              fill="none" stroke="rgba(${A},${(0.20 + 0.48 * p).toFixed(3)})" stroke-width="1.5"
              stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}"
              stroke-linecap="round"/>`;
    }
    s += `<rect x="${hx}" y="${hy}" width="26" height="12" rx="3.5"
            fill="rgba(${A},${(0.20 + 0.34 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.30 + 0.44 * p).toFixed(3)})" stroke-width="1.6"/>`;
    /* birleşmenin tek çıkışı — sol kutudaki tek satırın karşılığı */
    s += `<rect x="${x + 18}" y="${kutuY + 62}" width="62" height="6" rx="3"
            fill="rgba(${A},${(0.30 + 0.48 * p).toFixed(3)})"/>`;
  }

  /* --- karar sonrası: ÜÇ KALIN kanal, önemli sayfalara -----------------
     Yukarıda dokuz İNCE besleme vardı; burada üç KALIN kanal var. Aynı tarama,
     dağılmak yerine toplanmış — sayfanın "önemli sayfalarına ayırdığı taramayı
     zayıflatabilir" cümlesinin görsel karşılığı. Rakam ya da gösterge yok. */
  const onemliX = [bx + 16, bx + 90, bx + 164], onemliW = 66;
  const onemliM = onemliX.map((x) => x + onemliW / 2);
  const onemliY = DY + 290, onemliH = 36;
  const kalinKay = (faz * 64).toFixed(1);
  kutuM.forEach((mx) => {
    s += `<path d="M${mx} ${kutuY + kutuH} L${dugumX} ${DY + 216}" fill="none"
            stroke="rgba(${A},${(0.18 + 0.42 * p).toFixed(3)})" stroke-width="1.8"
            stroke-dasharray="5 7" stroke-dashoffset="-${(faz * 48).toFixed(1)}"
            stroke-linecap="round"/>`;
  });
  onemliM.forEach((mx) => {
    s += `<path d="M${dugumX} ${DY + 216} L${mx} ${onemliY}" fill="none"
            stroke="rgba(${A},${(0.24 + 0.52 * p).toFixed(3)})" stroke-width="3.4"
            stroke-dasharray="9 7" stroke-dashoffset="-${kalinKay}" stroke-linecap="round"/>`;
  });
  s += `<circle cx="${dugumX}" cy="${DY + 216}" r="4.2"
          fill="rgba(${A},${(0.26 + 0.52 * p).toFixed(3)})"/>`;

  /* üç önemli sayfa karosu — BİREBİR aynı, hepsi aynı y'de */
  onemliX.forEach((x) => {
    s += `<rect x="${x}" y="${onemliY}" width="${onemliW}" height="${onemliH}" rx="8"
            fill="rgba(255,255,255,${(0.038 + 0.038 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.18 + 0.40 * p).toFixed(3)})" stroke-width="1.4"/>`;
    s += `<rect x="${x + 10}" y="${onemliY + 10}" width="34" height="6" rx="3"
            fill="rgba(${A},${(0.32 + 0.44 * p).toFixed(3)})"/>`;
    s += `<rect x="${x + 10}" y="${onemliY + 23}" width="46" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
  });
  return s;
}

/* ── 02 · VARYANT VE KOPYA İÇERİK KONTROLÜ ──────────────────────────────
   Üç öznitelik satırı — renk (daireler), beden (farklı boyda çubuklar), paket
   (kutular). Her satırda gezen bir aksan halka bir değeri seçer; üç seçim
   birleşince aşağıda ALTI BİREBİR AYNI kopya kartı beliriyor: "aynı ürünün
   onlarca kopyası". Kopyalar gruplama bandında toplanır, banttan tek kalın
   akış iner ve TEK güçlü sayfaya varır; sayfa her pakette bir soluk alır.

   ÖLÇÜ NOTU — ışık darbesi bu durakta faz 0.50'de (bx+123, DY+177) merkezli.
   Gruplama bandı bilerek tam oraya (DY+164..DY+190, merkezi DY+177) oturtuldu:
   bant "toplanma" adımı olduğu için darbenin onu aydınlatması anlamlı. AMA
   ÖNİZLEMEDE GÖRÜLDÜ: bandın ORTA ~100 pikselindeki kesikler tepe anında
   yanıyor, yalnız iki uç okunuyor. Bu kabul edildi — bandın anlamını taşıyan
   şey biçimi (geniş yuvarlak toplayıcı) ve iki uçtan içeri akan kesikler;
   ayrıca darbe orada yalnız p'nin tepe yaptığı birkaç karede duruyor.
   Bandı kaydırmak sorunu çözmüyordu: darbe panelin tam ortasından geçiyor,
   hangi öğe oraya konsa aynı payı alıyor.
   ALTI KOPYA KARTI TEK SIRADA (hepsi aynı y'de) — böylece darbeden de, borudan
   da aynı payı alıyorlar; iki sıra hâlinde dizilseydi alt sıra parlak çıkardı.
   Kartların kontrastı önizlemeden sonra yükseltildi (aşağıdaki nota bakın). */
function varyantKopya(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- üç öznitelik satırı ---------------------------------------------
     Dört yuva, satır başına: yuva genişliği 53, ilk yuva bx+17'de. */
  const yuvaM = [0, 1, 2, 3].map((i) => bx + 17 + 26.5 + i * 53);
  const satirY = [DY + 12, DY + 40, DY + 68], satirH = 24;

  for (let r = 0; r < 3; r++) {
    const sy = satirY[r];
    /* satır zemini — üç satırda birebir aynı */
    s += `<rect x="${bx + 16}" y="${sy}" width="214" height="${satirH}" rx="9"
            fill="rgba(255,255,255,${(0.020 + 0.022 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.1"/>`;

    for (let i = 0; i < 4; i++) {
      const mx = yuvaM[i], my = sy + satirH / 2;
      /* gezen seçim: kosinüs kuvveti — sıçrama yok, faz cinsinden periyodik */
      const g = Math.pow(0.5 + 0.5 * Math.cos(2 * Math.PI * (faz * 2 - i / 4 - r / 12)), 4)
              * (0.30 + 0.70 * p);

      if (r === 0) {
        /* RENK — farklı tonda daireler (öznitelik değeri, hizmet seçimi değil).
           Tonlar ve kontur, üç satırın mürekkebini eşitlemek için ölçüm sonrası
           bir tık yükseltildi — gerekçe aşağıdaki eşitlik notunda. */
        const ton = [0.20, 0.33, 0.46, 0.60][i];
        s += `<circle cx="${mx}" cy="${my}" r="8"
                fill="rgba(255,255,255,${(ton * (0.42 + 0.58 * p)).toFixed(3)})"
                stroke="rgba(255,255,255,${(0.17 + 0.20 * p).toFixed(3)})" stroke-width="1"/>`;
      } else if (r === 1) {
        /* BEDEN — farklı boyda çubuklar */
        const w = [16, 22, 28, 34][i];
        s += `<rect x="${(mx - w / 2).toFixed(1)}" y="${my - 6}" width="${w}" height="12" rx="6"
                fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"
                stroke="rgba(255,255,255,${(0.14 + 0.16 * p).toFixed(3)})" stroke-width="1"/>`;
      } else {
        /* PAKET — birebir aynı koliler: kapak dikişi + kısa bant.
           İKİ KEZ DÜZELTİLDİ, ikisi de önizlemede görüldü:
             1) köşesi kıvrık dikdörtgen "belge/sayfa" gibi duruyordu ve hemen
                altındaki kopya kartlarıyla karışıyordu;
             2) yatay dikiş + TAM BOY dikey bant bu kez 2×2 "pencere gözü"
                oluşturuyordu, koli değil ızgara okunuyordu.
           Bant artık yalnız kapak yüksekliğinde (üst kenardan dikişe kadar) —
           klasik koli üstü. */
        const w = 28, h = 18, x0 = mx - w / 2, y0 = my - h / 2, kapak = 6;
        s += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="2.5"
                fill="rgba(255,255,255,${(0.036 + 0.036 * p).toFixed(3)})"
                stroke="rgba(255,255,255,${(0.125 + 0.14 * p).toFixed(3)})" stroke-width="1.1"/>`;
        s += `<line x1="${x0}" y1="${y0 + kapak}" x2="${x0 + w}" y2="${y0 + kapak}"
                stroke="rgba(255,255,255,${(0.105 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
        s += `<line x1="${mx}" y1="${y0}" x2="${mx}" y2="${y0 + kapak}"
                stroke="rgba(255,255,255,${(0.105 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
      }
      /* seçim halkası */
      if (g > 0.01) {
        s += `<rect x="${mx - 22}" y="${my - 11}" width="44" height="22" rx="11" fill="none"
                stroke="rgba(${A},${(0.85 * g).toFixed(3)})" stroke-width="1.8"/>`;
      }
    }
  }

  /* --- seçim birleşiyor → ayrı URL'ler --------------------------------- */
  const kopY = DY + 106, kopW = 32, kopH = 44;
  const kopM = [];
  for (let i = 0; i < 6; i++) kopM.push(bx + 17 + kopW / 2 + i * (kopW + 4));
  const dugumX = bx + 123, dugumY = DY + 96;
  s += `<path d="M${dugumX} ${satirY[2] + satirH} L${dugumX} ${dugumY}" fill="none"
          stroke="rgba(${A},${(0.20 + 0.45 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += `<circle cx="${dugumX}" cy="${dugumY}" r="4"
          fill="rgba(${A},${(0.28 + 0.52 * p).toFixed(3)})"/>`;
  /* dış ikisi simetrik sönük: dizi panelin dışında sürüyor ("onlarca") */
  const sonum = [0.45, 0.78, 1, 1, 0.78, 0.45];
  kopM.forEach((mx, i) => {
    s += `<path d="M${dugumX} ${dugumY + 4} L${mx} ${kopY}" fill="none"
            stroke="rgba(${A},${((0.14 + 0.38 * p) * sonum[i]).toFixed(3)})" stroke-width="1.2"
            stroke-dasharray="3 5" stroke-dashoffset="-${(faz * 32).toFixed(1)}"
            stroke-linecap="round"/>`;
  });

  /* --- ALTI BİREBİR AYNI kopya kartı ------------------------------------
     İçerideki desen altı kartta da aynı: aynı ürünün kopyası. Tek fark en
     dıştaki ikisinin SİMETRİK sönümü. */
  kopM.forEach((mx, i) => {
    const f = sonum[i], x = mx - kopW / 2;
    /* KONTRAST YÜKSELTİLDİ: ilk sürümde dolgu .030+.032p / kontur .11+.17p idi
       ve önizlemede kartlar boruların halesi içinde eriyordu — kopya oldukları
       okunmuyordu. Değerler yaklaşık %40 artırıldı; oran altı kartta da aynı. */
    s += `<rect x="${x}" y="${kopY}" width="${kopW}" height="${kopH}" rx="6"
            fill="rgba(255,255,255,${((0.044 + 0.046 * p) * f).toFixed(3)})"
            stroke="rgba(255,255,255,${((0.17 + 0.25 * p) * f).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<rect x="${x + 6}" y="${kopY + 6}" width="20" height="16" rx="3"
            fill="rgba(255,255,255,${((0.075 + 0.075 * p) * f).toFixed(3)})"/>`;
    s += `<circle cx="${x + 12}" cy="${kopY + 12}" r="2.6"
            fill="rgba(255,255,255,${((0.19 + 0.24 * p) * f).toFixed(3)})"/>`;
    s += `<path d="M${x + 7} ${kopY + 21} L${x + 13} ${kopY + 14} L${x + 17} ${kopY + 18}
            L${x + 20} ${kopY + 15} L${x + 25} ${kopY + 21} Z"
            fill="rgba(255,255,255,${((0.15 + 0.20 * p) * f).toFixed(3)})"/>`;
    s += `<rect x="${x + 6}" y="${kopY + 27}" width="20" height="4" rx="2"
            fill="rgba(${A},${((0.28 + 0.44 * p) * f).toFixed(3)})"/>`;
    s += `<rect x="${x + 6}" y="${kopY + 35}" width="14" height="4" rx="2"
            fill="rgba(255,255,255,${((0.15 + 0.22 * p) * f).toFixed(3)})"/>`;
    /* kopyadan gruplama bandına inen kısa bağ */
    s += `<line x1="${mx}" y1="${kopY + kopH}" x2="${mx}" y2="${DY + 164}"
            stroke="rgba(${A},${((0.18 + 0.44 * p) * f).toFixed(3)})" stroke-width="1.6"
            stroke-dasharray="4 6" stroke-dashoffset="-${(faz * 40).toFixed(1)}"
            stroke-linecap="round"/>`;
  });

  /* --- varyant gruplama bandı — darbe tam buraya oturuyor --------------- */
  const bantY = DY + 164, bantH = 26;
  s += `<rect x="${bx + 16}" y="${bantY}" width="214" height="${bantH}" rx="13"
          fill="rgba(255,255,255,${(0.045 + 0.045 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.44 * p).toFixed(3)})" stroke-width="1.5"/>`;
  s += `<line x1="${bx + 28}" y1="${bantY + bantH / 2}" x2="${bx + 218}" y2="${bantY + bantH / 2}"
          stroke="rgba(${A},${(0.30 + 0.52 * p).toFixed(3)})" stroke-width="2.4"
          stroke-dasharray="8 10" stroke-dashoffset="-${(faz * 54).toFixed(1)}"
          stroke-linecap="round"/>`;

  /* --- banttan tek kalın akış: tekrar tek sayfada toplanıyor ------------ */
  s += `<line x1="${dugumX}" y1="${bantY + bantH}" x2="${dugumX}" y2="${DY + 212}"
          stroke="rgba(${A},${(0.28 + 0.54 * p).toFixed(3)})" stroke-width="3.6"
          stroke-dasharray="9 7" stroke-dashoffset="-${(faz * 64).toFixed(1)}"
          stroke-linecap="round"/>`;

  /* --- TEK GÜÇLÜ SAYFA --------------------------------------------------
     Nabız, akışla aynı hızda (turda tam 4 çevrim): her paket vardığında bir
     soluk alıyor — hem anlamlı hem dikişsiz. */
  const nabiz = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 4);
  const gX = bx + 40, gY = DY + 212, gW = 166, gH = 106;
  s += `<rect x="${gX - 7}" y="${gY - 7}" width="${gW + 14}" height="${gH + 14}" rx="16"
          fill="rgba(${A},${(0.028 + 0.075 * nabiz * (0.3 + 0.7 * p)).toFixed(3)})"/>`;
  s += `<rect x="${gX}" y="${gY}" width="${gW}" height="${gH}" rx="11"
          fill="rgba(255,255,255,${(0.050 + 0.050 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.26 + 0.44 * p + 0.18 * nabiz * p).toFixed(3)})" stroke-width="2"/>`;
  /* solda görsel yer tutucu (marka/ürün görüntüsü değil, boş çerçeve) */
  s += `<rect x="${gX + 14}" y="${gY + 16}" width="52" height="52" rx="8"
          fill="rgba(255,255,255,${(0.055 + 0.050 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.13 + 0.18 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<circle cx="${gX + 30}" cy="${gY + 32}" r="5"
          fill="rgba(255,255,255,${(0.15 + 0.20 * p).toFixed(3)})"/>`;
  s += `<path d="M${gX + 18} ${gY + 64} L${gX + 32} ${gY + 46} L${gX + 41} ${gY + 55}
          L${gX + 48} ${gY + 48} L${gX + 62} ${gY + 64} Z"
          fill="rgba(255,255,255,${(0.12 + 0.17 * p).toFixed(3)})"/>`;
  /* sağda başlık + satırlar */
  s += `<rect x="${gX + 78}" y="${gY + 18}" width="72" height="9" rx="4.5"
          fill="rgba(${A},${(0.38 + 0.46 * p).toFixed(3)})"/>`;
  [64, 54, 60].forEach((w, i) => {
    s += `<rect x="${gX + 78}" y="${gY + 36 + i * 13}" width="${w}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
  });
  /* alt şerit: toplanan tekrarın tek adresi */
  s += `<rect x="${gX + 14}" y="${gY + 82}" width="138" height="9" rx="4.5"
          fill="rgba(${A},${(0.22 + 0.40 * p + 0.16 * nabiz * p).toFixed(3)})"/>`;
  return s;
}

/* ── 03 · PLATFORM GEÇİŞİNDE YÖNLENDİRME PLANI ──────────────────────────
   Solda eski URL satırları, sağda yeni yapı satırları; aralarında ÇAPRAZ
   eşleme çizgileri — sıra birebir korunmuyor, çünkü sayfa "yeni yapıya
   haritalanması" diyor, birebir kopyalanması değil. Çizgiler üzerinde kayan
   otorite kürecikleri: "biriken sayfa otoritesinin kaybolmaması". Sol satırlar
   iki köşeli parantezle gruplanmış (üstte iki, altta üç) — "ürün ve kategori
   kırılımı". Altta yürürlükteki yönlendirme planı tek sürekli hat.
   En altta beş durum karosu ve üzerinden gidip gelen tarama çizgisi:
   "geçiş sonrası indeksleme takip edilir".

   ÖLÇÜ NOTU — ışık darbesi bu durakta faz 0.80'de (bx+120, DY+204) merkezli,
   yarıçap 52. Plan bandı DY+196..DY+228 aralığında, yani darbe bandın içine
   düşüyor ve bandın orta bölgesi tepe anında yanıyor; bant tek sürekli hat
   olduğu için iki ucundan okunmaya devam ediyor (neden iki bölgeye
   AYRILMADIĞI aşağıdaki nota yazıldı — ölçüm sonucu).
   Beş durum karosu DY+272'de: darbeye en yakın nokta ortadaki karonun üst
   kenarı (bx+120, DY+272), uzaklık 68 px > 52 — beş karo da darbenin dışında.

   YASAK NOTU — süpürme çizgisi DÜZ DİKEY BİR ÇİZGİ; büyüteç, halka ya da
   herhangi bir arama motoru işareti değil. Eski sütuna çarpı/hata işareti
   konmadı: sayfa eski yapıyı yanlış demiyor, taşınıyor diyor. */
function yonlendirme(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- eşleme bloğu ----------------------------------------------------- */
  const satir = 5, satirH = 20, ilkY = DY + 16, adim = 27;
  const solX = bx + 26, solW = 68, sagX = bx + 152, sagW = 78;
  /* haritalama: sıra korunmuyor (yeni yapı farklı kırılım) */
  const hedef = [0, 2, 1, 4, 3];

  /* iki kırılım parantezi: üstte iki satır, altta üç satır */
  const parantez = (y0, y1) =>
    `<path d="M${bx + 20} ${y0} H${bx + 12} V${y1} H${bx + 20}" fill="none"
       stroke="rgba(${A},${(0.18 + 0.40 * p).toFixed(3)})" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round"/>`;
  s += parantez(ilkY, ilkY + adim + satirH);
  s += parantez(ilkY + 2 * adim, ilkY + 4 * adim + satirH);

  /* eşleme çizgileri + kayan otorite kürecikleri (çizgiler satırların ALTINDA) */
  for (let i = 0; i < satir; i++) {
    const y1 = ilkY + i * adim + satirH / 2;
    const y2 = ilkY + hedef[i] * adim + satirH / 2;
    const x1 = solX + solW, x2 = sagX;
    s += `<path d="M${x1} ${y1} C${x1 + 22} ${y1} ${x2 - 22} ${y2} ${x2} ${y2}"
            fill="none" stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="1.3"/>`;
    /* otorite küreciği: iki uçta da sin(πt) ile sönüyor → sarma görünmez */
    for (let k = 0; k < 2; k++) {
      const t = (faz * 2 + i * 0.17 + k * 0.5) % 1;
      const cx = x1 + (x2 - x1) * t;
      const cy = y1 + (y2 - y1) * (t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const op = Math.sin(Math.PI * t) * (0.30 + 0.70 * p);
      s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3.4"
              fill="rgba(${A},${(0.90 * op).toFixed(3)})"/>`;
    }
  }

  /* satırlar — sol nötr gri, sağ aksan konturlu (geçmiş → yeni, üstünlük değil) */
  for (let i = 0; i < satir; i++) {
    const y = ilkY + i * adim;
    s += `<rect x="${solX}" y="${y}" width="${solW}" height="${satirH}" rx="6"
            fill="rgba(255,255,255,${(0.028 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.12 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<rect x="${solX + 8}" y="${y + 7}" width="${[40, 32, 44, 36, 30][i]}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.13 + 0.18 * p).toFixed(3)})"/>`;

    const ny = ilkY + i * adim;
    s += `<rect x="${sagX}" y="${ny}" width="${sagW}" height="${satirH}" rx="6"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${sagX + 8}" y="${ny + 7}" width="${[46, 38, 52, 42, 34][i]}" height="6" rx="3"
            fill="rgba(${A},${(0.28 + 0.42 * p).toFixed(3)})"/>`;
  }

  /* --- yeni yapıdan plan bandına inen tek hat --------------------------- */
  const merkez = bx + 123;
  const planY = DY + 196, planH = 32;
  s += `<line x1="${merkez}" y1="${ilkY + 4 * adim + satirH + 6}" x2="${merkez}" y2="${planY}"
          stroke="rgba(${A},${(0.22 + 0.48 * p).toFixed(3)})" stroke-width="2"
          stroke-dasharray="5 7" stroke-dashoffset="-${(faz * 48).toFixed(1)}"
          stroke-linecap="round"/>`;

  /* --- yönlendirme planı bandı: TEK sürekli hat -------------------------
     İKİ KEZ DEĞİŞTİ, ikisi de ölçümle:
       1) İlk sürümde bant iki "kırılım bölgesine" ayrılmıştı ve ikinci
          bölgenin işareti bx+133'teydi — ışık darbesinin merkezine (bx+120)
          13 px uzakta, önizlemede tamamen yanıyordu.
       2) İşaretler bandın iki ucuna aynalı konulunca çizim gerçekten
          simetrik oldu ama ÖLÇÜM bunun yetmediğini gösterdi: boru bu durakta
          soldan sağa iniyor (y 304 → 358) ve bandın (y 322-354) SAĞ yarısının
          içinden geçiyor. 120 karenin ortalamasında ham parlaklık sol bölge
          82,70 / sağ bölge 110,17 — %24,9 fark. Çizim eşitti, IŞIK eşit değildi.
     Çözüm bandı kaydırmak ya da altına opak zemin koymak DEĞİL (boru bu duraktaki
     her yatay öğeyi keser, opak zemin de farkı ancak %18'e indiriyordu): bandı
     iki bölgeye BÖLMEKTEN VAZGEÇİLDİ. "Ürün ve kategori kırılımı" zaten yukarıda
     eşleme bloğunun solundaki İKİ KÖŞELİ PARANTEZ ile anlatılıyor; bant artık
     yürürlükteki tek yönlendirme hattı. Bölünme olmayınca kıyaslanacak iki
     bölge de yok — sayfa da bu ikisini kıyaslamıyor, ikisini de kullanıyor. */
  s += `<rect x="${bx + 16}" y="${planY}" width="214" height="${planH}" rx="10"
          fill="rgba(255,255,255,${(0.042 + 0.042 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.5"/>`;
  s += `<rect x="${bx + 26}" y="${planY + 12}" width="9" height="9" rx="2.5"
          fill="rgba(${A},${(0.32 + 0.44 * p).toFixed(3)})"/>`;
  s += `<line x1="${bx + 43}" y1="${planY + planH / 2}" x2="${bx + 204}" y2="${planY + planH / 2}"
          stroke="rgba(${A},${(0.26 + 0.50 * p).toFixed(3)})" stroke-width="2.4"
          stroke-dasharray="7 9" stroke-dashoffset="-${(faz * 48).toFixed(1)}"
          stroke-linecap="round"/>`;
  s += `<path d="M${bx + 204} ${planY + planH / 2 - 6} L${bx + 216} ${planY + planH / 2}
          L${bx + 204} ${planY + planH / 2 + 6} Z"
          fill="rgba(${A},${(0.30 + 0.52 * p).toFixed(3)})"/>`;

  /* --- geçiş sonrası indeksleme takibi ---------------------------------
     Beş birebir aynı durum karosu, hepsi aynı y'de. Üzerinden GİDİP GELEN bir
     tarama çizgisi geçiyor; çizgi hangi karonun üstündeyse o karo aydınlanıyor.
     Kalıcı bir üstünlük yok: çizgi bir turda dört gidiş-geliş yapıyor, yani her
     karonun üstünden SEKİZ kez geçiyor.

     SÜPÜRME EĞRİSİ ÜÇ KEZ ÖLÇÜLDÜ, KODA BAKIP GEÇİLMEDİ. Karolar birebir aynı
     çizildiği için beş karo arasındaki tek fark, her karonun 120 kare boyunca
     TOPLADIĞI aydınlanma. Bu toplam sayısal olarak hesaplandı (aydınlanma terimi
     üç yerde de doğrusal, dolayısıyla toplamı mürekkep farkının aynası):
        kosinüs, aralık 16..230   →  9,10  7,83  6,47  5,28  6,08   fark %42,0
        üçgen ×1, aralık 16..230  →  5,68  9,88 10,01  6,24  4,30   fark %57,1
        üçgen ×1, aralık  1..245  →  6,14  9,08  8,81  5,84  4,20   fark %53,7
        üçgen ×2, aralık  1..245  →  4,59  5,32  6,40  7,80  8,75   fark %47,6
        üçgen ×3, aralık  1..245  →  5,55  5,89  6,67  7,15  7,57   fark %26,7
        üçgen ×4, aralık  1..245  →  6,54  6,72  6,70  6,52  6,35   fark  %5,6
        üçgen ×5, aralık  1..245  →  6,31  6,69  7,07  6,69  6,30   fark %10,9
        üçgen ×6, aralık  1..245  →  6,02  6,76  7,42  6,68  6,01   fark %19,1
     İki ayrı kusur vardı: (a) kosinüs uçlarda YAVAŞLIYOR, çizgi kenar karoların
     üstünde daha uzun kalıyordu; (b) süpürme aralığı 16..230 iken uçtaki iki
     karo kendi ışık rampasını (±34 px) tamamlayamıyordu — aralık 1..245'e
     genişletildi, artık ilk karonun merkezi (bx+35) sol uca tam 34, son
     karonunki (bx+211) sağ uca tam 34 px uzakta.
     Kalan kusur, süpürme konumunun durak parlaklığı p ile İLİŞKİLİ olmasıydı:
     tek geçişte çizgi, p'nin tepe yaptığı anda hep aynı bölgede oluyordu.
     Çözüm frekans: turda DÖRT gidiş-geliş, p penceresinde her karonun üstünden
     birkaç kez geçiyor ve ilişki ortalamada siliniyor — %5,6.
     Dikişsizlik: `(4φ) mod 1`'in üçgeni φ=0 ve φ=1'de de 0 olduğu için sarma
     noktasında sıçrama yok; kare başına yer değiştirme her yerde 16,27 px. */
  const takipY = DY + 272, takipH = 46, kW = 38;
  const kM = [];
  for (let i = 0; i < 5; i++) kM.push(bx + 16 + kW / 2 + i * (kW + 6));
  const t4 = (faz * 4) % 1;
  const sx = bx + 1 + (1 - Math.abs(2 * t4 - 1)) * 244;

  s += `<line x1="${bx + 16}" y1="${takipY - 12}" x2="${bx + 230}" y2="${takipY - 12}"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;
  kM.forEach((mx) => {
    const g = Math.max(0, 1 - Math.abs(mx - sx) / 34) * (0.25 + 0.75 * p);
    const x = mx - kW / 2;
    s += `<rect x="${x}" y="${takipY}" width="${kW}" height="${takipH}" rx="8"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p + 0.045 * g).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.24 * p + 0.46 * g).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${x + 7}" y="${takipY + 10}" width="24" height="5" rx="2.5"
            fill="rgba(${A},${(0.22 + 0.28 * p + 0.42 * g).toFixed(3)})"/>`;
    s += `<rect x="${x + 7}" y="${takipY + 21}" width="24" height="4" rx="2"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
    s += `<rect x="${x + 7}" y="${takipY + 30}" width="16" height="4" rx="2"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
  });
  /* tarama çizgisi — düz dikey çizgi (büyüteç / motor işareti DEĞİL) */
  s += `<line x1="${sx.toFixed(1)}" y1="${takipY - 16}" x2="${sx.toFixed(1)}" y2="${takipY + takipH + 10}"
          stroke="rgba(${A},${(0.30 + 0.55 * p).toFixed(3)})" stroke-width="2"/>`;
  s += `<circle cx="${sx.toFixed(1)}" cy="${takipY - 16}" r="3.6"
          fill="rgba(${A},${(0.35 + 0.55 * p).toFixed(3)})"/>`;
  return s;
}

/* ══ EŞİTLİK ÖLÇÜMÜ — SON DEĞERLER ══════════════════════════════════════════
 *
 * NASIL ÖLÇÜLDÜ (koda bakarak değil): 120 karenin TAMAMI basıldı, her bölgenin
 * ortalama gri değeri toplandı. Sonra AYNI ölçüm iki kez daha yapıldı:
 *   · `boru` ve `darbeIsigi` boş dönecek şekilde (düz zemin),
 *   · üstelik istasyon İÇERİĞİ de çizilmeden (yalnız ızgara + cam panel + hale).
 * İkincisi birincisinden çıkarılınca geriye SAF MÜREKKEP kalıyor — zemin
 * degradesi, boru ışığı ve darbe ayıklanmış oluyor.
 *
 * SAF MÜREKKEP (120 kare ortalaması):
 *   01 karar kutuları     sol 18,20   sağ 17,94                     → %1,4
 *   01 üç önemli sayfa    21,70 / 21,48 / 21,12                     → %2,7
 *   02 altı kopya kartı   10,81 17,87 23,16 23,15 17,87 10,79       → %53,4
 *                         (BİLEREK: sönüm dizisi 0,45/0,78/1 — dizi panelin
 *                          dışında sürüyor demek için. Aynalı çiftler
 *                          10,81↔10,79 · 17,87↔17,87 · 23,16↔23,15,
 *                          yani çizim %0,2 içinde simetrik.)
 *   02 üç öznitelik satırı 12,58 / 12,20 / 12,74                    → %4,3
 *   03 beş durum karosu   16,62 16,53 16,64 17,11 17,03             → %3,3
 *
 * HAM (izleyicinin gördüğü, boru ve darbe dahil):
 *   01 karar kutuları     sol 51,63   sağ 56,57                     → %8,7
 *   01 üç önemli sayfa    51,65 / 54,16 / 55,97                     → %7,7
 *   03 beş durum karosu   53,28 → 47,18 (soldan sağa azalan)        → %11,4
 *
 * HAM İLE MÜREKKEP NEDEN AYRIŞIYOR — ÖLÇÜLDÜ, TAHMİN DEĞİL: boru ve darbe
 * kapatılınca ham farklar HİÇ DEĞİŞMEDİ (örn. karar kutuları %8,8 → %8,7).
 * Yani kaynak boru ya da darbe değil, motorun kabuğundaki `zeminHale` radyal
 * degradesi: tuvalin %50/%46'sında merkezlenmiş, istasyon 01 solda ve istasyon
 * 03 sağda olduğu için her ikisinde de tuval merkezine yakın kenar daha parlak.
 * Bu MOTORUN ortak zemini, sahnenin kararı değil — ve motor.js'e dokunulmuyor.
 * Sahnenin sorumluluğu ÇİZİMİN eşitliği; o da yukarıdaki mürekkep tablosunda.
 *
 * DÜZELTİLEN İKİ GERÇEK KUSUR (ikisi de ölçümle bulundu, gözle değil):
 *   1) Öznitelik satırları %15,1 farklıydı — koli simgesi (kutu konturu + kapak
 *      dikişi + bant) daireden ve çubuktan belirgin fazla mürekkep taşıyordu.
 *      Sayfa üçünü de eşdeğer örnek sayıyor ("Renk, beden veya paket"), bu
 *      yüzden koli alfaları düşürüldü, daire tonu/konturu bir tık yükseltildi:
 *      %15,1 → %4,3.
 *   2) Durum karolarının süpürmesi %5,9 farklıydı; süpürme eğrisi ve aralığı
 *      sekiz aday üzerinden ölçülüp seçildi (ayrıntı yonlendirme() içinde):
 *      %5,9 → %3,3.
 */
