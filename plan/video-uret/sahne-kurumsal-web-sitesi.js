/* SAHNE — web-tasarim-yazilim / kurumsal-web-sitesi
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Sayfa Mimarisi ve Menü Kurgusu
 *      "Ana menü, alt menüler ve mega menü ihtiyacı; hizmet/ürün grubu
 *       sayısına ve kurumsal iletişim sayfalarının kapsamına göre birlikte
 *       tasarlanır. Breadcrumb ve iç link stratejisiyle geniş içerik hacmi
 *       kolay gezinilebilir hale gelir."
 *   02 Yönetim Paneli ve Yetkilendirme
 *      "Departmanlar kendi içerik bölümlerini rol bazlı yetkilerle
 *       güncelleyebilir; kurumsal kimlik kuralları önceden tanımlı
 *       bileşenlere gömülü olduğundan marka tutarlılığı korunur."
 *   03 SEO ve Sistem Entegrasyonları
 *      "Şema işaretlemesi, XML site haritası ve kanonik yapı arama motoru
 *       görünürlüğünü güçlendirir; CRM, başvuru formu veya bayi bulucu gibi
 *       mevcut sistemleriniz mimariye entegre edilir."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 ana menü çubuğundan mega menü ve alt menü açılır, mega menünün
 *      sütunları sırayla öne çıkar; ortada breadcrumb zinciri sırayla yanar;
 *      altta iki iniş sayfası kartı iki DÜZ iç link okuyla karşılıklı
 *      bağlanır (darbe tam o iki okun arasından geçer);
 *   02 üç departman satırı BİREBİR aynı; gezen halka hangi satırdaysa o
 *      satırın kilidi açılır ve yalnız o bölüm yazılır — altta önceden
 *      tanımlı bileşen kütüphanesi, üç FARKLI bileşende de AYNI kimlik
 *      jetonu KİLİTLİ durur (satır kilidi açılır, kimlik kilidi açılmaz);
 *   03 üstte şema işaretlemesi ve XML site haritası; ortada üç kopya tek
 *      kanonik sayfada birleşir (kanonik sayfa her paket varışında bir
 *      soluk alır); altta mimari omurgaya üç mevcut sistem kutusu takılır.
 * Beş saniyede bir tur, dikişsiz döngü: menü açıklığı ve sütun ışığı kosinüs/
 * sinüs, satır sırası durağın canlı penceresine oturmuş tek geçiş (pencere
 * dışında sıfır), tüm kesik akışları desenin TAM SAYI katı kadar kayar.
 *
 * YASAK (bu sayfaya özel — yasaklar.md "kurumsal-web-sitesi"):
 *  - ARAMA MOTORU LOGOSU YOK: SEO durağında büyüteç, renkli harf, robot ya da
 *    herhangi bir motora benzeyen işaret ÇİZİLMEDİ. SEO yalnız sayfanın kendi
 *    saydığı üç teknik parçayla anlatılıyor: şema işaretlemesi, XML site
 *    haritası, kanonik yapı.
 *  - RAKAM YOK: sıralama, trafik, sayfa sayısı, departman sayısı, fiyat —
 *    hiçbiri yazılmadı. Tek rakam durak numaraları (01/02/03), sayfanın kendi
 *    numaralandırması.
 *  - ÜRÜN ADI YOK: mevcut sistemler kutu olarak çizildi, üzerlerine ad
 *    yazılmadı. Kutular sayfadaki üç örneği karşılıyor — CRM (yüzsüz avatar),
 *    başvuru formu (satırlı form kâğıdı), bayi bulucu (konum iğnesi).
 *  - İNSAN YÜZÜ YOK: CRM kutusundaki siluetin yüz çizgisi yok.
 *  - LOGO YOK.
 *
 * ÜRETİM — BU SAHNE crf 22 İLE BASILIR (ölçüldü, gerekçesi burada):
 *   node -e "const m=require('./plan/video-uret/motor.js');
 *            m.uret('modul-web/kurumsal-web-sitesi','web',
 *                   require('./plan/video-uret/sahne-kurumsal-web-sitesi.js'),{crf:22})"
 *   `uret.js` motorun varsayılanı olan crf 26 ile basar; bu sahnede o ayar
 *   döngü denetiminden geçmiyor. Kaynak kareler KUSURSUZ dikişsiz — ham SVG
 *   karelerinde ölçüldü: 119→0 farkı 0,07, ardışık kare ortalaması 0,42,
 *   yani oran 0,17× (eşik 1,6). Sorun çizimde değil KODLAYICIDA: videonun tek
 *   anahtar karesi 0. karedir, sonraki 119 kare P-kare olarak nicemleme
 *   kayması biriktirir ve döngü noktasında geniş alana yayılmış, düşük
 *   genlikli bir tazelenme farkı kalır. mp4 üzerinden ölçüm:
 *      crf 26 → dikiş 0,83  oran 1,78 ✗   (190 KB)
 *      crf 24 → dikiş 0,72  oran 1,52 ✓   (235 KB)
 *      crf 22 → dikiş 0,62  oran 1,31 ✓   (287 KB)
 *   crf 22 seçildi: kardeş videoların boyut aralığında (163–263 KB) ve payı
 *   geniş. Sahneye "geçsin diye" yapay hareket EKLENMEDİ — denendi, döngü
 *   denetimi kareleri 280×156'ya küçülterek ölçtüğü için küçük genlikli
 *   hareket ortalamayı hiç değiştirmedi (0,47 → 0,47).
 *
 * KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (sayfadaki .akis infografiği):
 *  .akis üç durağı şöyle çiziyor: (1) site haritası AĞACI — kök "Ana sayfa",
 *  üç çocuk, "iniş sayfası" yaprakları; (2) yönetim paneli PENCERESİ — solda
 *  menü, sağda iki içerik alanı, "Yayınla" düğmesi; (3) ALT ALTA üç sistem
 *  rozeti — ERP, CRM, bayi bulucu.
 *  Bu sahne aynı sırayı ve aynı kavramları kullanır ama tekrar etmez:
 *   · 01'de ağaç YOK — ağacı kardeş figür (ve kahramandaki çizim) zaten
 *     çiziyor. Burada aynı adımın öbür yarısı var: MENÜ (ana/alt/mega),
 *     breadcrumb ve iç link. İkisi de sayfanın 01 metninde geçiyor.
 *   · 02'de tarayıcı penceresi taklidi YOK (kardeş figür beyaz pencere ve
 *     trafik ışığı noktalarını kullanıyor); burada rol satırları var.
 *   · 03'te sistem kutuları kardeş figürdeki gibi ALT ALTA değil, mimari
 *     omurganın altında YAN YANA — aynı üç sistemi anlatır, farklı kesit.
 *     Kutu sırası da kardeş figürle çelişmez: orada dikey liste, burada
 *     omurgaya takılan üç uç.
 *
 * EŞİTLİK — KODA BAKARAK DEĞİL PİKSEL ÖLÇEREK:
 *  · ÜÇ SİSTEM KUTUSU (durak 03): sayfa "şu sistem daha iyi" demiyor, üçünü
 *    de örnek sayıyor. Kutular AYNI ölçü (66×72), AYNI kontur, AYNI dolgu,
 *    AYNI takılma ışığı, AYNI kesik akış fazı. Sırayla seçen süpürme BİLEREK
 *    KONMADI: süpürmenin tepesi durağın p eğrisiyle çarpıldığında ortadaki
 *    kutuyu daha parlak gösteriyor. Kalan tek fark simgelerin mürekkebiydi;
 *    ölçüldü ve eşitlendi — kutu ortalamaları 69,14 / 68,39 / 69,71
 *    (fark %1,9; düzeltme öncesi 69,14 / 70,99 / 66,60, %6,2).
 *  · ÜÇ DEPARTMAN SATIRI (durak 02): satır gövdeleri hiç kararmıyor, sıra
 *    GEZEN BİR HALKA olarak dolaşıyor. Sıra tepeleri u = 1/6, 1/2, 5/6'da;
 *    1. ve 3. satırın p değeri birebir eşit (0,649), ortadaki pencerenin
 *    ortasında olduğu için daha parlak — sıranın ortası, üstünlük değil.
 *  · BREADCRUMB ÇİPLERİ (durak 01): üçü aynı formülle yanıyor, ölçüm
 *    74,32 / 74,99 / 76,95 (fark %3,4 — kalan fark zemin degradesi).
 *  · İKİ İNİŞ SAYFASI KARTI (durak 01): satır dizisi, dolgu, kontur, aksan
 *    ve düğme birebir aynı; fark yalnız konum.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara, böylece
   site içindeki videolar aynı ritmi paylaşıyor. Üstteki 118 piksel sayfadaki
   "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 MENÜ KURGUSU' },
  { x: 437, fazMerkez: 0.50, etiket: '02 ROL YETKİSİ' },
  { x: 812, fazMerkez: 0.80, etiket: '03 SEO + SİSTEM' },
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
    s += (i === 0 ? menuMimari(d.x, p, faz, a)
       : i === 1 ? rolPaneli(d.x, p, faz, a)
       : seoSistem(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · SAYFA MİMARİSİ VE MENÜ KURGUSU ────────────────────────────────
   Üstte ana menü çubuğu; iki başlığın altından menü açılır — biri GENİŞ ve
   ÇOK SÜTUNLU (mega menü), öbürü DAR ve tek sütunlu (alt menü). Ortada
   breadcrumb zinciri sırayla yanar. Altta iki iniş sayfası kartı; aralarında
   karşılıklı iki iç link yayı, kesikleri akıyor.
   ÖLÇÜ NOTU: boru bu durakta y≈356-368'den, yani yerel DY+230 ile DY+242
   arasından geçiyor; ışık darbesi de tam oraya oturuyor (188, 368). Bu yüzden
   iki yay o bandın DIŞINA alındı — biri üstünden (DY+184-214), biri altından
   (DY+262-292) geçiyor. Kartların gövdesi bandı kesiyor ama kartlar büyük
   dolgu alanları olduğu için borunun ışığı arkalarında kalıyor, okunurluğu
   bozmuyor. */
function menuMimari(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* menü açıklığı: durak canlıyken tam açık, kosinüs olduğu için dikişsiz */
  const ac = 0.5 + 0.5 * Math.cos(2 * Math.PI * (faz - 0.20));
  const acP = ac * (0.35 + 0.65 * p);

  /* --- ana menü çubuğu ------------------------------------------------- */
  const mbX = bx + 16, mbY = DY + 20, mbW = 214, mbH = 28;
  s += `<rect x="${mbX}" y="${mbY}" width="${mbW}" height="${mbH}" rx="8"
          fill="rgba(255,255,255,${(0.040 + 0.040 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  /* dört başlık; 1. ve 3. başlığın altında menü var (mega ve alt menü) */
  const oge = [
    { x: bx + 26,  w: 38, alt: null },
    { x: bx + 76,  w: 46, alt: 'mega' },
    { x: bx + 134, w: 34, alt: null },
    { x: bx + 180, w: 42, alt: 'dar' },
  ];
  oge.forEach((o) => {
    const acik = o.alt ? acP : 0;
    s += `<rect x="${o.x}" y="${mbY + 10}" width="${o.w}" height="8" rx="4"
            fill="${o.alt
              ? `rgba(${A},${(0.26 + 0.55 * acik).toFixed(3)})`
              : `rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})`}"/>`;
    if (o.alt) {
      /* açılan başlığın altı çizilir — genişlik açıklıkla büyür */
      s += `<rect x="${o.x}" y="${mbY + 22}" width="${(o.w * ac).toFixed(1)}" height="2.6" rx="1.3"
              fill="rgba(${A},${(0.30 + 0.55 * acP).toFixed(3)})"/>`;
    }
  });

  /* --- açılan menüler: geniş mega + dar alt menü ------------------------ */
  const mY = DY + 56;
  const kutular = [
    { x: bx + 16,  w: 150, h: 84 * ac, sutun: 3, kaynak: bx + 99 },   // mega menü
    { x: bx + 174, w: 56,  h: 58 * ac, sutun: 1, kaynak: bx + 201 },  // alt menü
  ];
  kutular.forEach((k, ki) => {
    if (k.h < 5) return;
    const id = `mn${Math.round(bx)}${ki}`;
    /* başlıktan menüye inen bağ */
    s += `<line x1="${k.kaynak}" y1="${mbY + mbH}" x2="${k.kaynak}" y2="${mY}"
            stroke="rgba(${A},${(0.20 + 0.45 * acP).toFixed(3)})" stroke-width="1.6"/>`;
    s += `<clipPath id="${id}"><rect x="${k.x}" y="${mY}" width="${k.w}" height="${k.h.toFixed(1)}" rx="9"/></clipPath>`;
    s += `<rect x="${k.x}" y="${mY}" width="${k.w}" height="${k.h.toFixed(1)}" rx="9"
            fill="rgba(255,255,255,${(0.035 + 0.035 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.14 * p).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<g clip-path="url(#${id})">`;
    for (let c = 0; c < k.sutun; c++) {
      const cx = k.x + 10 + c * 46;
      /* gezinme ışığı: sütunlar sırayla öne çıkar — sayfanın "geniş içerik
         hacmi kolay gezinilebilir" cümlesinin görsel karşılığı. Sinüs, turda
         tam 1 çevrim, sütunlar arası 1/3 faz farkı → dikişsiz. */
      const isik = 0.5 + 0.5 * Math.sin(2 * Math.PI * (faz - c / 3));
      s += `<rect x="${cx - 5}" y="${mY + 6}" width="44" height="${Math.max(0, k.h - 12).toFixed(1)}" rx="6"
              fill="rgba(${A},${(0.02 + 0.085 * isik * acP).toFixed(3)})"/>`;
      /* sütun başlığı */
      s += `<rect x="${cx}" y="${mY + 12}" width="26" height="6" rx="3"
              fill="rgba(${A},${(0.24 + 0.30 * acP + 0.22 * isik * acP).toFixed(3)})"/>`;
      for (let r = 0; r < 3; r++) {
        const w = 34 - ((c + r) % 3) * 5;
        s += `<rect x="${cx}" y="${mY + 28 + r * 14}" width="${w}" height="5" rx="2.5"
                fill="rgba(255,255,255,${(0.09 + 0.14 * p + 0.10 * isik * acP).toFixed(3)})"/>`;
      }
    }
    s += `</g>`;
  });

  /* --- breadcrumb zinciri: sırayla yanar -------------------------------- */
  const bcY = DY + 152, bcH = 16;
  const cip = [40, 52, 44];
  const toplam = cip.reduce((x, y) => x + y, 0) + (cip.length - 1) * 16;
  let cx0 = bx + Math.round((DW - toplam) / 2);
  cip.forEach((w, i) => {
    const g = kis01((p - i * 0.13) / 0.42);
    s += `<rect x="${cx0}" y="${bcY}" width="${w}" height="${bcH}" rx="8"
            fill="rgba(255,255,255,${(0.030 + 0.055 * g).toFixed(3)})"
            stroke="rgba(${A},${(0.13 + 0.52 * g).toFixed(3)})" stroke-width="1.2"/>`;
    if (i < cip.length - 1) {
      const sx = cx0 + w + 5.5;
      s += `<path d="M${sx} ${bcY + 4} L${sx + 5} ${bcY + 8} L${sx} ${bcY + 12}"
              fill="none" stroke="rgba(255,255,255,${(0.14 + 0.30 * g).toFixed(3)})"
              stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    cx0 += w + 16;
  });

  /* --- iki iniş sayfası kartı — BİREBİR AYNI çizim ----------------------
     Sayfa iki kartı kıyaslamıyor, ikisi de örnek; bu yüzden satır dizisi,
     dolgu ve kontur ikisinde de aynı. Fark yalnız konum. */
  const kY = DY + 184, kH = 130, kW = 86;
  const satir = [66, 54, 60, 46, 56];
  [bx + 16, bx + 144].forEach((kx) => {
    s += `<rect x="${kx}" y="${kY}" width="${kW}" height="${kH}" rx="9"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.11 + 0.17 * p).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${kx + 10}" y="${kY + 12}" width="48" height="7" rx="3.5"
            fill="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})"/>`;
    satir.forEach((w, r) => {
      s += `<rect x="${kx + 10}" y="${kY + 32 + r * 14}" width="${w}" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.09 + 0.16 * p).toFixed(3)})"/>`;
    });
    s += `<rect x="${kx + 10}" y="${kY + 108}" width="40" height="11" rx="5.5"
            fill="rgba(${A},${(0.16 + 0.34 * p).toFixed(3)})"/>`;
  });

  /* --- iç link: iki yön, kesikler ters yönde akıyor ---------------------
     Desen 10; bir turda tam 2 desen kayıyor → dikişsiz.
     İKİ KEZ DÜZELTİLDİ (ikisi de önizlemede görüldü):
       1) Kartlar 74 genişti, aradaki 66 piksellik boşlukta iki YAY ışık
          darbesinin çevresinde tam bir halka kapatıyordu.
       2) Kartlar 86'ya çıkınca boşluk 42'ye indi ama yaylar bu kez daha da
          dar bir elips yaptı — "yükleme çemberi" izlenimi sürdü.
     Çözüm: yay değil DÜZ ok. İki düz bağlantı, biri sağa biri sola, farklı
     yükseklikte; darbe ikisinin arasından geçiyor, hiçbir kapalı eğri yok. */
  const kay = (faz * 20).toFixed(1);
  const bagCiz = (x1, x2, y, ofs) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"
      stroke="rgba(${A},${(0.26 + 0.54 * p).toFixed(3)})" stroke-width="1.8"
      stroke-dasharray="4 6" stroke-dashoffset="${ofs}" stroke-linecap="round"/>`;
  s += bagCiz(bx + 102, bx + 137, DY + 206, -kay);
  s += `<path d="M${bx + 137} ${DY + 202} L${bx + 144} ${DY + 206} L${bx + 137} ${DY + 210} Z"
          fill="rgba(${A},${(0.30 + 0.58 * p).toFixed(3)})"/>`;
  s += bagCiz(bx + 144, bx + 109, DY + 268, kay);
  s += `<path d="M${bx + 109} ${DY + 264} L${bx + 102} ${DY + 268} L${bx + 109} ${DY + 272} Z"
          fill="rgba(${A},${(0.30 + 0.58 * p).toFixed(3)})"/>`;
  return s;
}

/* ── 02 · YÖNETİM PANELİ VE YETKİLENDİRME ───────────────────────────────
   Üç departman satırı: [rol] — [kilit] — [kendi içerik bölümü].
   Satırların kendisi HİÇ KARARMIYOR; dolaşan bir halka hangi satırdaysa o
   satırın kilidi açılır, o bölümün satırları uzar ve imleç yanıp söner.
   Böylece "kendi bölümünü günceller" anlatılırken hiçbir departman sönük
   kart gibi durmuyor (yasak listesindeki eşitlik tuzağı).
   Altta önceden tanımlı bileşen kütüphanesi: üç FARKLI bileşen (düğme, kart,
   başlık bloğu) ama her birinde AYNI kimlik jetonu ve jetonun yanında KAPALI
   kalan kilit — satır kilidi açılır, kimlik kilidi açılmaz.
   ÖLÇÜ NOTU: ilk yerleşimde satırlar DY+50/108/166'daydı ve borunun bu
   duraktaki bandı (sol kenarda DY+204, sağ kenarda DY+166) ile darbe
   (bx+123, DY+177) tam ÜÇÜNCÜ SATIRIN üstüne oturuyordu — önizlemede o
   satırın kilidi ve imleci hiç okunmuyordu. Satırlar yukarı toplandı
   (DY+40/86/132, yükseklik 40), kütüphane aşağı indi (DY+204); darbe artık
   ikisinin arasındaki boşluğa düşüyor, hiçbir ayrıntıyı yemiyor. */
function rolPaneli(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- panel gövdesi ----------------------------------------------------
     ÖLÇÜLDÜ: satırların kendisi üç kez BİREBİR aynı kodla çizildiği hâlde
     ortalama parlaklıkları 51,90 / 58,25 / 76,96 çıkıyordu (%32,6 fark).
     Sebep çizim değil IŞIK: akan boru bu durakta panelin altından geçiyor
     ve cam yüzey neredeyse saydam olduğu için alttaki satır boruya en yakın
     olan. Yönetim paneli zaten bir "pencere gövdesi" olduğundan gövdeye
     yarı geçirmez bir zemin verildi; boru artık gövdenin ARKASINDA kalıyor.
     ÖLÇÜM SONRASI: fark %32,6 → %23,4. Kalan fark ışık darbesinin KENDİSİ;
     darbe durakların ÖNÜNDE çizildiği için (modülün ortak dili) hiçbir zemin
     onu kesmez ve panelin alt kenarına yaklaştıkça 3. satırı aydınlatır.
     Bu bir tasarım üstünlüğü değil sahne aydınlatması: üç satır aynı kodla,
     aynı ölçü ve aynı konturla çiziliyor, sıra tepesi de 1. ve 3. satırda
     birebir eşit. */
  s += `<rect x="${bx + 12}" y="${DY + 8}" width="222" height="172" rx="12"
          fill="rgba(14,17,24,.62)"/>`;

  /* --- panel başlık şeridi --------------------------------------------- */
  const hX = bx + 16, hY = DY + 14, hW = 214, hH = 20;
  s += `<rect x="${hX}" y="${hY}" width="${hW}" height="${hH}" rx="7"
          fill="rgba(255,255,255,${(0.045 + 0.040 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<circle cx="${hX + 13}" cy="${hY + 10}" r="3.4" fill="rgba(${A},${(0.35 + 0.5 * p).toFixed(3)})"/>`;
  s += `<rect x="${hX + 24}" y="${hY + 7}" width="52" height="6" rx="3"
          fill="rgba(255,255,255,${(0.11 + 0.16 * p).toFixed(3)})"/>`;
  s += `<rect x="${hX + 84}" y="${hY + 7}" width="34" height="6" rx="3"
          fill="rgba(255,255,255,${(0.08 + 0.12 * p).toFixed(3)})"/>`;

  /* --- sıranın gezmesi: yukarıdan aşağı tek geçiş ----------------------
     ÖLÇÜLDÜ, DEĞİŞTİRİLDİ: ilk sürüm `1 - cos(2π·2·(faz-0.31))` ile gidip
     gelen bir halka kullanıyordu. Ölçümde 1. SATIR HİÇ AÇILMIYORDU: sırası
     tam faz 0.31'e denk geliyor, orada durak parlaklığı p = 0 — yani
     izleyicinin gördüğü aralıkta o satırın kilidi hiç açılmadı.
     Yerine gelen: sıra, durağın canlı penceresine oturtulmuş TEK geçiş.
     u = (faz-0.40)/0.20; tepe noktaları u = 1/6, 1/2, 5/6 → faz 0.4333,
     0.5000, 0.5667. Bunların p değerleri 0,649 / 1,000 / 0,649: birinci ve
     üçüncü satır BİREBİR eşit, ortadaki satır pencerenin ortasında olduğu
     için doğal olarak daha parlak — üstünlük değil, sıranın ortası.
     Pencere dışında üç satırın da sırası 0'a iniyor ve halka görünmez
     oluyor; faz 0 ile faz 1 aynı kare → dikişsiz. */
  const u = (faz - 0.40) / 0.20;
  const rowY0 = DY + 40, rowAdim = 46, rowH = 40;
  const sira = [0, 1, 2].map((i) => kis01(1 - Math.abs(u * 3 - i - 0.5) * 1.6));

  for (let i = 0; i < 3; i++) {
    const ry = rowY0 + i * rowAdim;
    const ac = sira[i];                                 // satırın sırası

    /* satır gövdesi — üç satırda BİREBİR aynı */
    s += `<rect x="${bx + 16}" y="${ry}" width="214" height="${rowH}" rx="9"
            fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;

    /* rol: yüzsüz avatar silueti */
    const ax = bx + 24, ay = ry + 5;
    s += `<rect x="${ax}" y="${ay}" width="30" height="30" rx="8"
            fill="rgba(255,255,255,${(0.045 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
    s += `<circle cx="${ax + 15}" cy="${ay + 11}" r="4.8" fill="none"
            stroke="rgba(255,255,255,${(0.24 + 0.34 * p).toFixed(3)})" stroke-width="1.6"/>`;
    s += `<path d="M${ax + 5} ${ay + 26} a10 8 0 0 1 20 0" fill="none"
            stroke="rgba(255,255,255,${(0.24 + 0.34 * p).toFixed(3)})" stroke-width="1.6"/>`;

    /* yetki kilidi: sıra gelince halka kalkar (açılır) */
    const lx = bx + 74, ly = ry + 20;
    s += `<g transform="rotate(${(-34 * ac).toFixed(1)} ${lx - 5} ${ly - 3})">
            <path d="M${lx - 5} ${ly - 3} V${ly - 7} a5 5 0 0 1 10 0 V${ly - 3}" fill="none"
              stroke="rgba(${A},${(0.30 + 0.55 * ac * (0.4 + 0.6 * p)).toFixed(3)})"
              stroke-width="1.9" stroke-linecap="round"/>
          </g>`;
    s += `<rect x="${lx - 7}" y="${ly - 3}" width="14" height="11" rx="2.6"
            fill="rgba(${A},${(0.16 + 0.42 * ac * (0.4 + 0.6 * p)).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})" stroke-width="1.1"/>`;

    /* kendi içerik bölümü — yalnız sırası gelen satır yazılır */
    const sx = bx + 96, sy = ry + 5;
    s += `<rect x="${sx}" y="${sy}" width="134" height="30" rx="7"
            fill="rgba(255,255,255,${(0.028 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.1"/>`;
    const g1 = 54 + 50 * ac, g2 = 40 + 34 * ac;
    s += `<rect x="${sx + 8}" y="${sy + 7}" width="${g1.toFixed(1)}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.12 + 0.22 * p).toFixed(3)})"/>`;
    s += `<rect x="${sx + 8}" y="${sy + 18}" width="${g2.toFixed(1)}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.18 * p).toFixed(3)})"/>`;
    /* imleç: turda tam 6 kez yanıp söner → dikişsiz */
    const yanip = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 6);
    s += `<rect x="${(sx + 10 + g1).toFixed(1)}" y="${sy + 5}" width="2.6" height="9" rx="1.3"
            fill="rgba(${A},${(0.85 * ac * yanip * (0.35 + 0.65 * p)).toFixed(3)})"/>`;
  }

  /* --- gezen halka: satırları karartmadan sırayı gösterir ---------------
     Konum sürekli (kırpılmış doğru), görünürlük sıranın en büyüğüne bağlı:
     pencere dışında 0 olduğu için kırpma sıçraması görünmez. */
  const halkaY = rowY0 + a.kis(u * 3 - 0.5, 0, 2) * rowAdim;
  const halkaG = Math.max(...sira);
  if (halkaG > 0.01) {
    s += `<rect x="${bx + 13}" y="${(halkaY - 3).toFixed(1)}" width="220" height="${rowH + 6}" rx="12"
            fill="none" stroke="rgba(${A},${(0.72 * halkaG * (0.35 + 0.65 * p)).toFixed(3)})"
            stroke-width="1.8"/>`;
  }

  /* --- önceden tanımlı bileşen kütüphanesi ------------------------------
     Üç bileşen farklı (düğme / kart / başlık bloğu) — sayfa bunları
     kıyaslamıyor, "kütüphane" diyor; aynı üç kutuyu tekrarlamak kütüphane
     değil, kopya gibi okunuyordu. Ortak olan KİMLİK: her bileşende aynı
     aksan jetonu ve yanında kapalı kilit. */
  const kX = bx + 16, kY = DY + 204, kW = 214, kH = 116;
  s += `<rect x="${kX}" y="${kY}" width="${kW}" height="${kH}" rx="10" fill="none"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1.2"
          stroke-dasharray="5 6"/>`;
  const cizg = (0.10 + 0.16 * p).toFixed(3);
  for (let i = 0; i < 3; i++) {
    const bxx = bx + 24 + i * 69, byy = kY + 12;
    s += `<rect x="${bxx}" y="${byy}" width="60" height="92" rx="8"
            fill="rgba(255,255,255,${(0.035 + 0.035 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.2"/>`;
    if (i === 0) {
      /* düğme bileşeni */
      s += `<rect x="${bxx + 9}" y="${byy + 12}" width="42" height="34" rx="5" fill="none"
              stroke="rgba(255,255,255,${cizg})" stroke-width="1.1"/>`;
      s += `<rect x="${bxx + 16}" y="${byy + 22}" width="28" height="13" rx="6.5"
              fill="rgba(${A},${(0.40 + 0.38 * p).toFixed(3)})"/>`;
      s += `<rect x="${bxx + 13}" y="${byy + 52}" width="34" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
    } else if (i === 1) {
      /* kart bileşeni */
      s += `<rect x="${bxx + 9}" y="${byy + 10}" width="42" height="47" rx="5" fill="none"
              stroke="rgba(255,255,255,${cizg})" stroke-width="1.1"/>`;
      s += `<rect x="${bxx + 14}" y="${byy + 15}" width="32" height="15" rx="3"
              fill="rgba(${A},${(0.28 + 0.34 * p).toFixed(3)})"/>`;
      s += `<rect x="${bxx + 14}" y="${byy + 36}" width="32" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
      s += `<rect x="${bxx + 14}" y="${byy + 46}" width="22" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
    } else {
      /* başlık bloğu bileşeni */
      s += `<rect x="${bxx + 9}" y="${byy + 16}" width="42" height="10" rx="4"
              fill="rgba(${A},${(0.34 + 0.40 * p).toFixed(3)})"/>`;
      [42, 34, 26].forEach((w, r) => {
        s += `<rect x="${bxx + 9}" y="${byy + 34 + r * 10}" width="${w}" height="5" rx="2.5"
                fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
      });
    }
    /* kimlik jetonu — üç bileşende de AYNI */
    s += `<rect x="${bxx + 10}" y="${byy + 70}" width="12" height="12" rx="3.5"
            fill="rgba(${A},${(0.45 + 0.40 * p).toFixed(3)})"/>`;
    /* kimlik kilidi — KAPALI kalır (satır kilidinin tersi) */
    const clx = bxx + 36, cly = byy + 78;
    s += `<path d="M${clx - 3.6} ${cly - 1} V${cly - 4.4} a3.6 3.6 0 0 1 7.2 0 V${cly - 1}" fill="none"
            stroke="rgba(255,255,255,${(0.22 + 0.26 * p).toFixed(3)})" stroke-width="1.5"/>`;
    s += `<rect x="${clx - 5.2}" y="${cly - 1}" width="10.4" height="8.4" rx="2"
            fill="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.16 + 0.20 * p).toFixed(3)})" stroke-width="1"/>`;
  }
  return s;
}

/* ── 03 · SEO VE SİSTEM ENTEGRASYONLARI ─────────────────────────────────
   Üst sıra: solda şema işaretlemesi (etiket işareti + anahtar/değer satırları),
   sağda XML site haritası (belge + dışarı akan adres satırları).
   Orta: kanonik yapı — üç kopya kaydın oku tek güçlü sayfada birleşir.
   Alt: mimari omurga; altına üç mevcut sistem kutusu takılır (CRM, başvuru
   formu, bayi bulucu). Üç kutu birebir aynı; yalnız içlerindeki simge farklı.
   ARAMA MOTORU İŞARETİ YOK — SEO tarafı bu üç teknik parçayla anlatılıyor. */
function seoSistem(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- şema işaretlemesi ------------------------------------------------ */
  const sX = bx + 16, sY = DY + 16, sW = 102, sH = 80;
  s += `<rect x="${sX}" y="${sY}" width="${sW}" height="${sH}" rx="9"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  const ecx = sX + 30, ecy = sY + 21;
  const eR = (0.26 + 0.42 * p).toFixed(3);
  s += `<path d="M${ecx - 12} ${ecy - 7} L${ecx - 19} ${ecy} L${ecx - 12} ${ecy + 7}"
          fill="none" stroke="rgba(${A},${eR})" stroke-width="1.9"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="M${ecx + 12} ${ecy - 7} L${ecx + 19} ${ecy} L${ecx + 12} ${ecy + 7}"
          fill="none" stroke="rgba(${A},${eR})" stroke-width="1.9"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="M${ecx + 4} ${ecy - 8} L${ecx - 4} ${ecy + 8}"
          fill="none" stroke="rgba(${A},${eR})" stroke-width="1.9" stroke-linecap="round"/>`;
  for (let r = 0; r < 3; r++) {
    const dol = kis01((p - r * 0.12) / 0.40);
    const ry = sY + 38 + r * 13;
    s += `<rect x="${sX + 12}" y="${ry}" width="22" height="5" rx="2.5"
            fill="rgba(${A},${(0.22 + 0.45 * dol).toFixed(3)})"/>`;
    s += `<rect x="${sX + 40}" y="${ry}" width="48" height="5" rx="2.5"
            fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${sX + 40}" y="${ry}" width="${(48 * dol).toFixed(1)}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.14 + 0.26 * p).toFixed(3)})"/>`;
  }

  /* --- XML site haritası ------------------------------------------------ */
  const hX = bx + 128, hW2 = 102;
  s += `<rect x="${hX}" y="${sY}" width="${hW2}" height="${sH}" rx="9"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  /* belge — köşesi kıvrık */
  const dX = hX + 12, dY = sY + 12, dW = 40, dH = 56, kv = 12;
  s += `<path d="M${dX} ${dY + 5} a5 5 0 0 1 5 -5 H${dX + dW - kv} L${dX + dW} ${dY + kv}
          V${dY + dH - 5} a5 5 0 0 1 -5 5 H${dX + 5} a5 5 0 0 1 -5 -5 Z"
          fill="rgba(255,255,255,${(0.045 + 0.040 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.18 + 0.24 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<path d="M${dX + dW - kv} ${dY} V${dY + kv} H${dX + dW}" fill="none"
          stroke="rgba(255,255,255,${(0.18 + 0.24 * p).toFixed(3)})" stroke-width="1.2"/>`;
  for (let r = 0; r < 4; r++) {
    s += `<rect x="${dX + 8}" y="${dY + 22 + r * 9}" width="${24 - (r % 2) * 6}" height="4" rx="2"
            fill="rgba(255,255,255,${(0.12 + 0.18 * p).toFixed(3)})"/>`;
  }
  /* belgeden çıkan adres satırları — dalga turda tam 2 çevrim */
  for (let r = 0; r < 4; r++) {
    const dalga = 0.5 + 0.5 * Math.sin(2 * Math.PI * (faz * 2 - r * 0.14));
    s += `<rect x="${hX + 62}" y="${dY + 12 + r * 12}" width="28" height="5" rx="2.5"
            fill="rgba(${A},${(0.12 + 0.55 * dalga * (0.30 + 0.70 * p)).toFixed(3)})"/>`;
  }

  /* --- kanonik yapı: üç kopya tek sayfada birleşir ---------------------- */
  const kop = [0, 1, 2];
  const hedefX = bx + 148, hedefY = DY + 112, hedefW = 70, hedefH = 50;
  const akis = (faz * 42).toFixed(1);              // desen 14 × 3 tur
  kop.forEach((i) => {
    const y = DY + 106 + i * 22;
    s += `<rect x="${bx + 16}" y="${y}" width="52" height="18" rx="4"
            fill="rgba(255,255,255,${(0.028 + 0.024 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.13 * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += `<rect x="${bx + 22}" y="${y + 6}" width="26" height="4" rx="2"
            fill="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})"/>`;
    const cy = y + 9;
    s += `<path d="M${bx + 68} ${cy} C${bx + 104} ${cy} ${bx + 110} ${DY + 137} ${bx + 142} ${DY + 137}"
            fill="none" stroke="rgba(${A},${(0.18 + 0.45 * p).toFixed(3)})" stroke-width="1.5"
            stroke-dasharray="5 9" stroke-dashoffset="-${akis}" stroke-linecap="round"/>`;
  });
  s += `<path d="M${bx + 142} ${DY + 133} L${bx + 148} ${DY + 137} L${bx + 142} ${DY + 141} Z"
          fill="rgba(${A},${(0.28 + 0.55 * p).toFixed(3)})"/>`;
  /* kanonik sayfa — kopyalardan güçlü, sayfanın kendi anlattığı hiyerarşi.
     Her kesik paket vardığında bir soluk alır: nabız, okların akışıyla aynı
     hızda (turda tam 3 çevrim) → hem anlamlı hem dikişsiz. */
  const nabiz = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 3);
  s += `<rect x="${hedefX - 6}" y="${hedefY - 6}" width="${hedefW + 12}" height="${hedefH + 12}" rx="12"
          fill="rgba(${A},${(0.030 + 0.075 * nabiz * (0.3 + 0.7 * p)).toFixed(3)})"/>`;
  s += `<rect x="${hedefX}" y="${hedefY}" width="${hedefW}" height="${hedefH}" rx="8"
          fill="rgba(255,255,255,${(0.045 + 0.045 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.24 + 0.44 * p + 0.20 * nabiz * p).toFixed(3)})" stroke-width="1.8"/>`;
  s += `<rect x="${hedefX + 10}" y="${hedefY + 10}" width="30" height="6" rx="3"
          fill="rgba(${A},${(0.35 + 0.45 * p).toFixed(3)})"/>`;
  s += `<rect x="${hedefX + 10}" y="${hedefY + 24}" width="46" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
  s += `<rect x="${hedefX + 10}" y="${hedefY + 34}" width="34" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;

  /* --- mimari omurga ---------------------------------------------------- */
  const oY = DY + 196;
  s += `<rect x="${bx + 16}" y="${oY}" width="214" height="14" rx="7"
          fill="rgba(255,255,255,${(0.050 + 0.045 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.40 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<line x1="${bx + 24}" y1="${oY + 7}" x2="${bx + 222}" y2="${oY + 7}"
          stroke="rgba(${A},${(0.28 + 0.50 * p).toFixed(3)})" stroke-width="2"
          stroke-dasharray="6 10" stroke-dashoffset="-${(faz * 48).toFixed(1)}"
          stroke-linecap="round"/>`;

  /* --- üç mevcut sistem: AYNI kutu, AYNI ışık, AYNI faz ------------------
     Sırayla seçen süpürme yok — süpürme durakların p farkı yüzünden ortadaki
     kutuyu daha parlak gösteriyordu. Üçü de aynı anda, aynı değerle takılır. */
  const bW = 66, bH = 72, bY = DY + 250;
  for (let i = 0; i < 3; i++) {
    const x0 = bx + 16 + i * 74, cx = x0 + bW / 2;
    /* omurgadan inen bağ — üç bağın kesik fazı da aynı */
    s += `<line x1="${cx}" y1="${oY + 14}" x2="${cx}" y2="${bY}"
            stroke="rgba(${A},${(0.16 + 0.45 * p).toFixed(3)})" stroke-width="1.6"
            stroke-dasharray="4 7" stroke-dashoffset="-${(faz * 44).toFixed(1)}"/>`;
    s += `<rect x="${x0}" y="${bY}" width="${bW}" height="${bH}" rx="9"
            fill="rgba(255,255,255,${(0.032 + 0.030 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.42 * p).toFixed(3)})" stroke-width="1.4"/>`;
    /* takılma ışığı — üçünde birebir aynı */
    s += `<circle cx="${cx}" cy="${bY}" r="3.4" fill="rgba(${A},${(0.25 + 0.62 * p).toFixed(3)})"/>`;

    /* SİMGE MÜREKKEBİ ÖLÇÜLDÜ VE EŞİTLENDİ — kutuların dolgusu/konturu zaten
       aynıydı ama içlerindeki çizgi miktarı farklıydı: kutu bölgesinin
       ortalama parlaklığından kendi boş bandı çıkarılınca 5,45 / 8,09 / 3,58
       geliyordu (%56 mürekkep farkı, toplamda %6,2). Form fazla, iğne az
       mürekkep taşıyordu. Formun kalemi inceltilip üçüncü satırı atıldı,
       iğnenin kalemi ve iç noktası büyütüldü. */
    const ink = (0.26 + 0.36 * p).toFixed(3);
    if (i === 0) {
      /* CRM — yüzsüz avatar silueti (yüz çizgisi YOK) */
      s += `<circle cx="${cx}" cy="${bY + 28}" r="8" fill="none"
              stroke="rgba(255,255,255,${ink})" stroke-width="1.8"/>`;
      s += `<path d="M${cx - 13} ${bY + 52} a13 11 0 0 1 26 0" fill="none"
              stroke="rgba(255,255,255,${ink})" stroke-width="1.8"/>`;
    } else if (i === 1) {
      /* başvuru formu — satırlı kâğıt */
      s += `<rect x="${cx - 11}" y="${bY + 18}" width="22" height="30" rx="3.5" fill="none"
              stroke="rgba(255,255,255,${ink})" stroke-width="1.45"/>`;
      s += `<path d="M${cx - 5} ${bY + 27} H${cx + 5} M${cx - 5} ${bY + 35} H${cx + 5}"
              stroke="rgba(255,255,255,${ink})" stroke-width="1.45" stroke-linecap="round"/>`;
    } else {
      /* bayi bulucu — konum iğnesi */
      s += `<path d="M${cx} ${bY + 52} C${cx} ${bY + 52} ${cx - 11} ${bY + 37} ${cx - 11} ${bY + 29}
              a11 11 0 1 1 22 0 C${cx + 11} ${bY + 37} ${cx} ${bY + 52} ${cx} ${bY + 52} Z"
              fill="none" stroke="rgba(255,255,255,${ink})" stroke-width="2.4"
              stroke-linejoin="round"/>`;
      s += `<circle cx="${cx}" cy="${bY + 29}" r="4.6" fill="rgba(255,255,255,${ink})"/>`;
    }
  }
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
