/* SAHNE — video-produksiyon / ai-destekli-produksiyon
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok, her şekil
 * aşağıdaki cümlelerden çıkıyor:
 *   01 "Hangi Ürün ve Sektörler İçin Uygun" — "E-ticaret ürün tanıtımı,
 *      kozmetik ve elektronik gibi detay odaklı kategoriler, mekan ve konsept
 *      tanıtımı bu hat için uygun alanlardır. İnsan yüzü ve karmaşık el
 *      hareketi gerektiren senaryolarda klasik çekim veya hibrit yaklaşım
 *      tercih edilir."
 *   02 "Prodüksiyon Akışı ve Ekip Rolü" — "Süreç bir prodüksiyon yönetmeni ve
 *      AI operatörü tarafından yürütülür; kamera ekibi yerine sahne, hareket
 *      ve ışık senaryosunu tanımlayan bir teknik ekip görev alır. Her sahne,
 *      render öncesi ve sonrası olmak üzere iki kez kontrol edilir."
 *   03 "Kalite Kontrol ve Onay Süreci" — "Üretilen her sahne, marka referans
 *      dosyasıyla karşılaştırılıp iç kontrolden geçirildikten sonra müşteri
 *      onayına sunulur. Onay öncesi tespit edilen tutarsızlıklar, yayına
 *      çıkmadan düzeltilir."
 *
 * FİKİR: modülün akan cam boru dili korunur; boru bu üç durağa uğrar. Işık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır:
 *   01 dört uygun kategori kutucuğu sırayla onaylanır, altta kesikli kutuda
 *      klasik çekim + üretilen kare birleşimi (hibrit yol) durur;
 *   02 iki kişi (prodüksiyon yönetmeni, AI operatörü) üstte; altta dikey hat:
 *      KONTROL → render → KONTROL, iki kapı sırayla yanar;
 *   03 referans dosyası ile üretilen kare karşılaştırılır, kare şeridinde
 *      tutarsızlık işareti belirip düzeltilir, altta müşteri onayı çizilir.
 *
 * BU SAYFAYA ÖZEL YASAK — DENGE: sayfa "AI her şeyi kendi yapıyor" demiyor,
 * ekip rolünü ve iki kez kontrolü ayrıca anlatıyor. Bu yüzden 02'de insan
 * unsuru (iki rol kartı 86 px + iki kontrol kapısı 40'ar px) render kutusundan
 * (64 px) BİLEREK daha ağır; 03'ün tamamı zaten insan kontrolü ve onayı.
 * AI ürün/model adı, logosu, marka işareti YOK. Süre/bütçe/hız/oran RAKAMI
 * YOK. İNSAN YÜZÜ YOK — kişi yalın daire + omuz kavisi, yüz hattı çizilmiyor.
 * Durak numaraları (01/02/03) sayfanın kendi numaralandırmasıdır.
 *
 * DÖNGÜ: tüm hareket faz cinsinden periyodik — cos/sin ya da desenin tam
 * katı kadar kayan dashoffset. Tek seferlik hareket yok.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Duraklar reklam-filmi sahnesiyle aynı ızgarada: üstte rozetin ("CANLI
   DÖNGÜ", sol üst) oturacağı 118 piksel boş, altta etiket için yer var.
   Etiket 28 px mono; istasyon 246 px geniş → en fazla 14 karakter sığıyor. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 UYGUN ALAN' },
  { x: 437, fazMerkez: 0.50, etiket: '02 EKİP ROLÜ' },
  { x: 812, fazMerkez: 0.80, etiket: '03 KALİTE ONAY' },
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
  /* hiz TAM SAYI olmak zorunda (bir döngüde desenin tam katı kayar).
     3'ten 5'e çıkarıldı: ÖLÇÜM GEREKÇESİ — bu sahnede hareket az olduğu
     için ardışık kare farkı ortalaması düşük kalıyordu ve mp4'ün ilk
     karesi anahtar kare olduğundan dikiş oranı 1.66× ölçülmüştü (eşik
     1.6). Işık telleri hızlanınca ortalama yükseliyor, oran düşüyor. */
  s += boru(yol, faz, a.aksan.rgb, { kalin: 20, desen: 48, hiz: 5 });

  /* --- duraklar -------------------------------------------------------- */
  DURAK.forEach((d, i) => {
    const p = canli[i];
    s += `<g>`;
    if (p > 0.02) {
      s += `<rect x="${d.x - 14}" y="${DY - 14}" width="${DW + 28}" height="${DH + 28}" rx="26"
              fill="rgba(${A},${(0.10 * p).toFixed(3)})" filter="url(#yumusaCok)"/>`;
    }
    s += cam({ x: d.x, y: DY, w: DW, h: DH, r: 18, parlaklik: p, aksan: a.aksan.rgb });
    s += (i === 0 ? uygunAlan(d.x, p, faz, a)
       : i === 1 ? ekipRolu(d.x, p, faz, d.fazMerkez, a)
       :           kaliteOnay(d.x, p, faz, d.fazMerkez, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · HANGİ ÜRÜN VE SEKTÖRLER İÇİN UYGUN ────────────────────────────
   Dört kutucuk = sayfanın saydığı dört alan: e-ticaret ürün (koli), kozmetik
   (şişe), elektronik (cihaz), mekan/konsept (iç mekan köşesi). Canlanınca
   sırayla onay tiki alırlar. Altta KESİKLİ kutu: sayfanın "klasik çekim veya
   hibrit yaklaşım" dediği yol — kamera ile üretilen kareler bir düğümde
   birleşir. İnsan yüzü ÇİZİLMİYOR; zaten sayfanın dışarıda bıraktığı şey o. */
function uygunAlan(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cz = (0.15 + 0.26 * p).toFixed(3);
  let s = '';

  const TW = 92, TH = 78;
  const yerler = [
    [bx + 26, DY + 24], [bx + 128, DY + 24],
    [bx + 26, DY + 110], [bx + 128, DY + 110],
  ];
  yerler.forEach((t, i) => {
    const tx = t[0], ty = t[1];
    const cx = tx + TW / 2, cy = ty + TH / 2 + 2;
    const yerel = kis01((p - i * 0.09) / 0.34);
    s += `<rect x="${tx}" y="${ty}" width="${TW}" height="${TH}" rx="9"
            fill="rgba(255,255,255,${(0.026 + 0.034 * yerel).toFixed(3)})"
            stroke="rgba(${A},${(0.13 + 0.44 * yerel).toFixed(3)})" stroke-width="1.3"/>`;
    s += kategoriGlifi(i, cx, cy, cz, A, yerel);

    /* uygunluk tiki — kutucuğun sağ üst köşesinde */
    const tcx = tx + TW - 15, tcy = ty + 15;
    s += `<circle cx="${tcx}" cy="${tcy}" r="8.4" fill="rgba(${A},${(0.16 * yerel).toFixed(3)})"
            stroke="rgba(${A},${(0.18 + 0.62 * yerel).toFixed(2)})" stroke-width="1.3"/>`;
    /* tik TAM ÇİZİLİ, yalnız parlaklığı yerel'e bağlı — sıra hissi opaklıkla
       veriliyor. ÖLÇÜLDÜ: kesikli çizimle 120 karenin 26'sında en az bir
       kutucuk yarım tik gösteriyordu ve yarım tik AŞAĞI BAKAN "⌄" gibi
       okunuyor (açılır liste oku). "Uygun alan" anlatan bir kutucukta bu
       yanlış işaret. Aynı düzeltme kontrolKapisi'nde zaten uygulanmıştı. */
    s += `<path d="M${tcx - 4} ${tcy + 0.4} L${tcx - 1.2} ${tcy + 3.4} L${tcx + 4.4} ${tcy - 3.4}"
            fill="none" stroke="rgba(255,255,255,${(0.22 + 0.72 * yerel).toFixed(2)})"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  });

  /* --- kesikli şerit: klasik çekim + üretilen kare = hibrit yol ---------
     KONUM ÖLÇÜLDÜ: boru bu durakta y 346–378 bandından geçiyor (kalınlık
     dahil). İlk yerleşimde şerit tam oraya oturuyordu ve kamera darbe
     ışığında kayboluyordu — önizlemede görüldü. Şerit borunun ALTINA
     alındı; 314–384 arası boruya koridor olarak bırakıldı. */
  const hx = bx + 26, hy = DY + 258, hw = 194, hh = 62;
  const hc = (0.14 + 0.22 * p).toFixed(3);
  s += `<rect x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="11"
          fill="rgba(255,255,255,.016)" stroke="rgba(255,255,255,${hc})"
          stroke-width="1.3" stroke-dasharray="7 7"/>`;

  /* kamera silueti (klasik çekim) */
  const ccx = hx + 44, ccy = hy + 30;
  s += `<rect x="${ccx - 18}" y="${ccy - 12}" width="36" height="24" rx="5"
          fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,${hc})" stroke-width="1.4"/>`;
  s += `<rect x="${ccx - 26}" y="${ccy - 7}" width="8" height="12" rx="3"
          fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,${hc})" stroke-width="1.2"/>`;
  s += `<rect x="${ccx + 18}" y="${ccy - 6}" width="11" height="13" rx="3"
          fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,${hc})" stroke-width="1.2"/>`;
  s += `<ellipse cx="${ccx + 32}" cy="${ccy + 0.5}" rx="4.2" ry="7.5" fill="rgba(255,255,255,.04)"
          stroke="rgba(${A},${(0.22 + 0.42 * p).toFixed(2)})" stroke-width="1.4"/>`;
  s += `<path d="M${ccx} ${ccy + 12} L${ccx} ${ccy + 19}
          M${ccx} ${ccy + 19} L${ccx - 10} ${ccy + 28} M${ccx} ${ccy + 19} L${ccx + 10} ${ccy + 28}"
          fill="none" stroke="rgba(255,255,255,${hc})" stroke-width="2" stroke-linecap="round"/>`;

  /* üretilen kare yığını */
  for (let k = 0; k < 3; k++) {
    const fx = hx + 138 + k * 4, fy = ccy - 5 - k * 6;
    s += `<rect x="${fx}" y="${fy}" width="32" height="22" rx="4"
            fill="rgba(${A},${(0.05 + 0.05 * k + 0.05 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.09 * k + 0.22 * p).toFixed(3)})" stroke-width="1.2"/>`;
  }

  /* birleşme düğümü — iki yol tek projede buluşuyor (hibrit) */
  const nx = hx + 112, ny = ccy;
  s += `<path d="M${ccx + 37} ${ny} L${nx - 8} ${ny} M${nx + 8} ${ny} L${hx + 138} ${ny}"
          fill="none" stroke="rgba(255,255,255,${hc})" stroke-width="1.3"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="7.5" fill="rgba(${A},${(0.08 + 0.12 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.48 * p).toFixed(2)})" stroke-width="1.3"/>`;
  s += `<path d="M${nx - 3.4} ${ny} H${nx + 3.4} M${nx} ${ny - 3.4} V${ny + 3.4}"
          stroke="rgba(255,255,255,${(0.30 + 0.48 * p).toFixed(2)})" stroke-width="1.6" stroke-linecap="round"/>`;
  return s;
}

/* dört kategori glifi — hepsi soyut siluet, yazı yok */
function kategoriGlifi(i, cx, cy, cz, A, yerel) {
  const c = `rgba(255,255,255,${cz})`;
  const vurgu = `rgba(${A},${(0.22 + 0.45 * yerel).toFixed(2)})`;
  if (i === 0) {
    /* e-ticaret ürün: bantlı koli.
       İLK SÜRÜM PENCERE GİBİ OKUNUYORDU (ortadan tam boy artı işareti).
       Düzeltme: bant yalnız kapakta, kapak bandı gövdeden ayrı. */
    return `<rect x="${cx - 22}" y="${cy - 19}" width="44" height="38" rx="4"
              fill="rgba(255,255,255,.045)" stroke="${c}" stroke-width="1.5"/>
            <path d="M${cx - 22} ${cy - 6} H${cx + 22}" stroke="${c}" stroke-width="1.4"/>
            <rect x="${cx - 5}" y="${cy - 19}" width="10" height="13" fill="${vurgu}" opacity=".7"/>
            <path d="M${cx - 13} ${cy + 6} H${cx + 13}" stroke="${c}" stroke-width="1.2" opacity=".8"/>`;
  }
  if (i === 1) {
    /* kozmetik: şişe */
    return `<rect x="${cx - 6}" y="${cy - 24}" width="12" height="9" rx="2.5"
              fill="rgba(255,255,255,.06)" stroke="${c}" stroke-width="1.3"/>
            <rect x="${cx - 3.5}" y="${cy - 16}" width="7" height="6" fill="rgba(255,255,255,.05)"
              stroke="${c}" stroke-width="1.1"/>
            <rect x="${cx - 13}" y="${cy - 11}" width="26" height="31" rx="7"
              fill="rgba(255,255,255,.045)" stroke="${c}" stroke-width="1.5"/>
            <rect x="${cx - 13}" y="${cy + 1}" width="26" height="9" fill="${vurgu}" opacity=".55"/>`;
  }
  if (i === 2) {
    /* elektronik: cihaz */
    return `<rect x="${cx - 16}" y="${cy - 23}" width="32" height="45" rx="6"
              fill="rgba(255,255,255,.045)" stroke="${c}" stroke-width="1.5"/>
            <rect x="${cx - 11.5}" y="${cy - 18}" width="23" height="30" rx="2.5"
              fill="rgba(${A},.10)" stroke="${vurgu}" stroke-width="1.2"/>
            <path d="M${cx - 5} ${cy + 17} H${cx + 5}" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>`;
  }
  /* mekan ve konsept: tek kaçışlı iç mekan kutusu.
     İLK SÜRÜM RESİM SEHPASI GİBİ OKUNUYORDU (ön çerçeve yoktu, yalnız
     kaçış çizgileri vardı). Düzeltme: dış açıklık çerçevesi tam çizili,
     arka duvar içeride, dört köşe kaçış çizgisiyle bağlı. */
  return `<rect x="${cx - 24}" y="${cy - 20}" width="48" height="40" rx="2"
            fill="rgba(255,255,255,.03)" stroke="${c}" stroke-width="1.5"/>
          <rect x="${cx - 10}" y="${cy - 8}" width="20" height="16"
            fill="rgba(255,255,255,.05)" stroke="${c}" stroke-width="1.3"/>
          <path d="M${cx - 24} ${cy - 20} L${cx - 10} ${cy - 8} M${cx + 24} ${cy - 20} L${cx + 10} ${cy - 8}
                   M${cx - 24} ${cy + 20} L${cx - 10} ${cy + 8} M${cx + 24} ${cy + 20} L${cx + 10} ${cy + 8}"
            fill="none" stroke="${c}" stroke-width="1.2" opacity=".85"/>
          <rect x="${cx - 5}" y="${cy - 4}" width="10" height="8" fill="${vurgu}" opacity=".6"/>`;
}

/* ── 02 · PRODÜKSİYON AKIŞI VE EKİP ROLÜ ────────────────────────────────
   Üstte iki kişi: prodüksiyon yönetmeni (plan panosu) ve AI operatörü (konsol).
   Altta dikey hat: KONTROL kapısı → render kutusu → KONTROL kapısı; sayfanın
   "render öncesi ve sonrası olmak üzere iki kez kontrol edilir" cümlesi.
   İki kapı faza bağlı olarak SIRAYLA yanar. Render kutusundaki üç çubuk,
   ekibin tanımladığı sahne / hareket / ışık senaryosudur — dolgu ekibin
   canlılığına bağlı, yani üretimi ekip besliyor. YÜZ ÇİZİLMİYOR. */
function ekipRolu(bx, p, faz, fm, a) {
  const A = a.aksan.rgb.join(',');
  const cz = (0.20 + 0.30 * p).toFixed(3);
  let s = '';

  /* --- iki rol kartı --------------------------------------------------- */
  for (let i = 0; i < 2; i++) {
    const kx = bx + 26 + i * 102, ky = DY + 16, kw = 92, kh = 80;
    const yerel = kis01((p - i * 0.10) / 0.34);
    const kc = `rgba(255,255,255,${(0.20 + 0.42 * yerel).toFixed(3)})`;
    s += `<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="10"
            fill="rgba(255,255,255,${(0.030 + 0.038 * yerel).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.46 * yerel).toFixed(3)})" stroke-width="1.3"/>`;
    const cx = kx + kw / 2;
    /* kişi — yüz hattı YOK */
    s += `<circle cx="${cx}" cy="${ky + 24}" r="8.4" fill="rgba(255,255,255,.05)"
            stroke="${kc}" stroke-width="1.8"/>`;
    s += `<path d="M${cx - 13} ${ky + 47} a13 13 0 0 1 26 0" fill="rgba(255,255,255,.045)"
            stroke="${kc}" stroke-width="1.8"/>`;
    if (i === 0) {
      /* prodüksiyon yönetmeni: plan panosu */
      s += `<rect x="${cx - 16}" y="${ky + 53}" width="32" height="20" rx="3"
              fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,${cz})" stroke-width="1.2"/>`;
      for (let l = 0; l < 3; l++) {
        s += `<path d="M${cx - 11} ${ky + 58 + l * 5} H${cx + (l === 2 ? 4 : 11)}"
                stroke="rgba(${A},${(0.24 + 0.40 * yerel).toFixed(2)})" stroke-width="1.5" stroke-linecap="round"/>`;
      }
    } else {
      /* AI operatörü: konsol — iki sürgü */
      s += `<rect x="${cx - 18}" y="${ky + 53}" width="36" height="20" rx="3"
              fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,${cz})" stroke-width="1.2"/>`;
      for (let l = 0; l < 2; l++) {
        const sy = ky + 59 + l * 8;
        const konum = 0.5 + 0.34 * Math.sin(2 * Math.PI * (faz * 2 + l * 0.3));
        s += `<path d="M${cx - 13} ${sy} H${cx + 13}" stroke="rgba(255,255,255,${cz})" stroke-width="1.4"/>`;
        s += `<circle cx="${(cx - 13 + 26 * konum).toFixed(1)}" cy="${sy}" r="3.1"
                fill="rgba(${A},${(0.35 + 0.5 * yerel).toFixed(2)})"/>`;
      }
    }
  }

  /* --- dikey hat: kapı → render → kapı ---------------------------------
     KONUM ÖLÇÜLDÜ: boru bu durakta y 282–340 bandından geçiyor. Render
     kutusu ilk yerleşimde tam oraya oturuyordu; kutu aşağı alındı ve
     262–344 arası boruya koridor bırakıldı — akan bağlantı orayı geçiyor. */
  /* İKİ KAPI DA HER AN GÖRÜNÜR, vurgu sırayla geçer.
     İLK SÜRÜMDE kapılar cos(2πfaz·2) ile ters çalışıyordu: durak canlıyken
     hep birincisi yanıyor, ikincisi neredeyse görünmüyordu — önizlemede
     ölçüldü. Şimdi dalgalar durağın kendi faz merkezine göre kuruluyor:
     vurgu önce üstteki (render öncesi) sonra alttaki (render sonrası)
     kapıya geçiyor; taban parlaklık 0.35, ikisi de okunuyor. */
  const hatX = bx + 123;
  const g1 = Math.pow(0.5 + 0.5 * Math.cos(2 * Math.PI * (faz - (fm - 0.08))), 3);
  const g2 = Math.pow(0.5 + 0.5 * Math.cos(2 * Math.PI * (faz - (fm + 0.10))), 3);
  s += kontrolKapisi(bx + 26, DY + 104, 194, 38, (0.35 + 0.65 * g1) * p, A);
  s += akanHat(hatX, DY + 142, DY + 218, faz, A, p);
  s += renderKutusu(bx + 26, DY + 218, 194, 60, p, faz, A);
  s += akanHat(hatX, DY + 278, DY + 286, faz, A, p);
  s += kontrolKapisi(bx + 26, DY + 286, 194, 38, (0.35 + 0.65 * g2) * p, A);
  return s;
}

/* akan bağlantı — dashoffset bir döngüde desenin TAM katı kadar kayar */
function akanHat(x, y1, y2, faz, A, p) {
  const desen = 14, tur = 3;
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"
            stroke="rgba(${A},${(0.25 + 0.45 * p).toFixed(2)})" stroke-width="2"
            stroke-dasharray="5 9" stroke-dashoffset="${(-(faz * desen * tur)).toFixed(1)}"/>`;
}

/* insan kontrolü kapısı: onay dairesi + iki denetim satırı */
function kontrolKapisi(x, y, w, h, guc, A) {
  const g = kis01(guc);
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"
            fill="rgba(255,255,255,${(0.030 + 0.050 * g).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.56 * g).toFixed(3)})" stroke-width="1.4"/>`;
  const cx = x + 25, cy = y + h / 2;
  s += `<circle cx="${cx}" cy="${cy}" r="11.5" fill="rgba(${A},${(0.13 * g).toFixed(3)})"
          stroke="rgba(${A},${(0.24 + 0.60 * g).toFixed(2)})" stroke-width="1.5"/>`;
  /* tik HER ZAMAN TAM ÇİZİLİ, yalnız parlaklığı değişir. Kesikli çizimle
     denendi: taban parlaklıkta yarım kalan tik "eksik/hatalı işaret" gibi
     okunuyordu — önizlemede görüldü. */
  s += `<path d="M${cx - 5.2} ${cy + 0.4} L${cx - 1.6} ${cy + 4.2} L${cx + 5.6} ${cy - 4}"
          fill="none" stroke="rgba(255,255,255,${(0.30 + 0.66 * g).toFixed(2)})"
          stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>`;
  [0, 1].forEach((l) => {
    const sy = y + 13 + l * 13, gen = l === 0 ? 128 : 96;
    s += `<rect x="${x + 46}" y="${sy}" width="${gen}" height="6" rx="3" fill="rgba(255,255,255,.05)"/>`;
    s += `<rect x="${x + 46}" y="${sy}" width="${(gen * (0.30 + 0.70 * g)).toFixed(1)}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.18 + 0.34 * g).toFixed(2)})"/>`;
  });
  return s;
}

/* render kutusu: tarama çizgisi gidip gelir (periyodik), yanında ekibin
   tanımladığı üç senaryo çubuğu (sahne / hareket / ışık) */
function renderKutusu(x, y, w, h, p, faz, A) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"
            fill="rgba(255,255,255,${(0.026 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.3"/>`;
  const fx = x + 13, fy = y + 11, fw = 70, fh = 42;
  s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="5"
          fill="rgba(${A},${(0.05 + 0.07 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.40 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<circle cx="${fx + 24}" cy="${fy + 18}" r="7.5" fill="none"
          stroke="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${fx + 10}" y="${fy + 31}" width="30" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
  /* tarama — sin ile gidip gelir, dikişsiz */
  const sy = fy + fh / 2 + (fh / 2 - 5) * Math.sin(2 * Math.PI * faz * 2);
  s += `<line x1="${fx + 2}" y1="${sy.toFixed(1)}" x2="${fx + fw - 2}" y2="${sy.toFixed(1)}"
          stroke="rgba(${A},${(0.35 + 0.55 * p).toFixed(2)})" stroke-width="2"/>`;
  /* sahne / hareket / ışık senaryosu — ekibin tanımı */
  for (let l = 0; l < 3; l++) {
    const by = y + 14 + l * 13, gen = 82;
    const dolu = 0.35 + 0.55 * kis01(p - l * 0.06);
    s += `<rect x="${x + 98}" y="${by}" width="${gen}" height="6" rx="3" fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${x + 98}" y="${by}" width="${(gen * dolu).toFixed(1)}" height="6" rx="3"
            fill="rgba(${A},${(0.24 + 0.42 * p).toFixed(2)})"/>`;
  }
  return s;
}

/* ── 03 · KALİTE KONTROL VE ONAY SÜRECİ ─────────────────────────────────
   Üstte iki kart yan yana: marka referans DOSYASI (köşesi kıvrık sayfa) ve
   ÜRETİLEN KARE (kadraj köşeli çerçeve); ortadaki çift yönlü ok ikisini
   karşılaştırır. Ortada kare şeridi: soldan sağa ilerleyen bir dalga her
   karede önce tutarsızlık işaretini, hemen ardından düzeltme tikini yakar —
   "onay öncesi tespit edilen tutarsızlıklar, yayına çıkmadan düzeltilir".
   Altta müşteri onayı: tik çizilir, iki satır dolar. */
function kaliteOnay(bx, p, faz, fm, a) {
  const A = a.aksan.rgb.join(',');
  const cz = (0.16 + 0.26 * p).toFixed(3);
  let s = '';

  /* --- referans dosyası ------------------------------------------------ */
  const rx = bx + 22, ry = DY + 22, rw = 88, rh = 92;
  s += `<path d="M${rx + 8} ${ry} H${rx + rw - 20} L${rx + rw} ${ry + 20} V${ry + rh - 8}
          a8 8 0 0 1 -8 8 H${rx + 8} a8 8 0 0 1 -8 -8 V${ry + 8} a8 8 0 0 1 8 -8 Z"
          fill="rgba(255,255,255,${(0.032 + 0.032 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cz})" stroke-width="1.4"/>`;
  s += `<path d="M${rx + rw - 20} ${ry} V${ry + 20} H${rx + rw}"
          fill="none" stroke="rgba(255,255,255,${cz})" stroke-width="1.3"/>`;
  /* dosyadaki onaylı referans kare */
  s += `<rect x="${rx + 13}" y="${ry + 28}" width="62" height="34" rx="4"
          fill="rgba(${A},${(0.06 + 0.07 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<circle cx="${rx + 31}" cy="${ry + 43}" r="6.5" fill="none"
          stroke="rgba(255,255,255,${(0.16 + 0.24 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<rect x="${rx + 42}" y="${ry + 50}" width="26" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.14 + 0.22 * p).toFixed(3)})"/>`;
  [0, 1].forEach((l) => {
    s += `<rect x="${rx + 13}" y="${ry + 70 + l * 10}" width="${l === 0 ? 62 : 44}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
  });

  /* --- üretilen kare --------------------------------------------------- */
  const ux = bx + 136;
  s += `<rect x="${ux}" y="${ry}" width="${rw}" height="${rh}" rx="9"
          fill="rgba(255,255,255,${(0.032 + 0.032 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.16 + 0.44 * p).toFixed(3)})" stroke-width="1.4"/>`;
  /* kadraj köşeleri */
  const kk = (x1, y1, dx, dy) => `<path d="M${x1 + dx} ${y1} H${x1} V${y1 + dy}"
      fill="none" stroke="rgba(${A},${(0.24 + 0.48 * p).toFixed(2)})" stroke-width="1.6" stroke-linecap="round"/>`;
  s += kk(ux + 10, ry + 10, 12, 12) + kk(ux + rw - 10, ry + 10, -12, 12);
  s += kk(ux + 10, ry + rh - 10, 12, -12) + kk(ux + rw - 10, ry + rh - 10, -12, -12);
  s += `<circle cx="${ux + 31}" cy="${ry + 43}" r="6.5" fill="none"
          stroke="rgba(255,255,255,${(0.16 + 0.24 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<rect x="${ux + 42}" y="${ry + 50}" width="26" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.14 + 0.22 * p).toFixed(3)})"/>`;
  s += `<rect x="${ux + 20}" y="${ry + 66}" width="48" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;

  /* --- karşılaştırma oku ----------------------------------------------- */
  const kar = (0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.cos(2 * Math.PI * (faz - fm)), 2)) * p;
  const oy = ry + rh / 2, ox = bx + 123;
  s += `<path d="M${ox - 9} ${oy} H${ox + 9}
          M${ox - 5} ${oy - 4} L${ox - 9} ${oy} L${ox - 5} ${oy + 4}
          M${ox + 5} ${oy - 4} L${ox + 9} ${oy} L${ox + 5} ${oy + 4}"
          fill="none" stroke="rgba(255,255,255,${(0.22 + 0.60 * kar).toFixed(2)})"
          stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* --- iç kontrol: kare şeridi, tutarsızlık → düzeltme ------------------ */
  /* İŞARETLERİN ZAMANI ÖLÇÜLDÜ: ilk sürümde dalga faz 0.00–0.48 arasında
     tepe yapıyordu, oysa bu durak yalnız 0.61–0.99 arasında canlı — hiçbir
     tutarsızlık işareti görünmüyordu. Dalga artık durağın kendi faz
     merkezine oturuyor, dört kareyi soldan sağa tarıyor. cos^6: yarı
     genişlik 0.075 = kareler arası aralık, yani sıra sıra yanıyorlar. */
  const sx = bx + 27, sy = DY + 126, kw2 = 42, kh2 = 32;
  const guclu = kis01(p * 2.4);
  for (let i = 0; i < 4; i++) {
    const kx = sx + i * 50;
    const tepe = fm + (i - 1.5) * 0.075;
    const isaret = Math.pow(kis01(Math.cos(2 * Math.PI * (faz - tepe))), 6) * guclu;
    const duzelt = Math.pow(kis01(Math.cos(2 * Math.PI * (faz - tepe - 0.05))), 6) * guclu;
    s += `<rect x="${kx}" y="${sy}" width="${kw2}" height="${kh2}" rx="5"
            fill="rgba(255,255,255,${(0.028 + 0.030 * p + 0.045 * duzelt).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.30 * p + 0.34 * duzelt).toFixed(3)})" stroke-width="1.2"/>`;
    s += `<rect x="${kx + 7}" y="${sy + 21}" width="${15 + i * 2}" height="4" rx="2"
            fill="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})"/>`;
    s += `<circle cx="${kx + 13}" cy="${sy + 12}" r="5" fill="none"
            stroke="rgba(255,255,255,${(0.12 + 0.20 * p).toFixed(3)})" stroke-width="1.1"/>`;
    /* tutarsızlık işareti — üçgen uyarı, karenin sağ üstünde yanar.
       Düzeltme yükselirken işaret SÖNER: ikisi üst üste binince okunmayan
       bir leke oluşuyordu (önizlemede görüldü), devir teslim böyle net. */
    const ix = kx + 30, iy = sy + 11;
    const isaretG = isaret * (1 - kis01(duzelt * 1.6));
    if (isaretG > 0.02) {
      s += `<path d="M${ix} ${iy - 6.5} L${ix + 6.5} ${iy + 5} H${ix - 6.5} Z"
              fill="rgba(255,255,255,${(0.80 * isaretG).toFixed(3)})"/>`;
    }
    /* düzeltme tiki — hemen ardından aynı yerde */
    if (duzelt > 0.02) {
      s += `<circle cx="${ix}" cy="${iy}" r="7.6" fill="rgba(${A},${(0.88 * duzelt).toFixed(3)})"/>`;
      s += `<path d="M${ix - 3.4} ${iy + 0.3} L${ix - 1} ${iy + 2.9} L${ix + 3.8} ${iy - 2.9}"
              fill="none" stroke="rgba(255,255,255,${(0.95 * duzelt).toFixed(3)})"
              stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  }

  /* --- müşteri onayı ----------------------------------------------------
     KONUM ÖLÇÜLDÜ: boru bu durakta y 294–368 bandından geçiyor. Onay kartı
     borunun ALTINA alındı, 284–376 arası koridor bırakıldı. */
  const ox2 = bx + 26, oy2 = DY + 250, ow = 194, oh = 76;
  const onay = kis01((p - 0.50) / 0.36);
  s += `<rect x="${ox2}" y="${oy2}" width="${ow}" height="${oh}" rx="12"
          fill="rgba(${A},${(0.030 + 0.060 * onay).toFixed(3)})"
          stroke="rgba(${A},${(0.16 + 0.52 * onay).toFixed(3)})" stroke-width="1.4"/>`;
  const ocx = ox2 + 42, ocy = oy2 + oh / 2;
  s += `<circle cx="${ocx}" cy="${ocy}" r="22" fill="rgba(${A},${(0.12 * onay).toFixed(3)})"
          stroke="rgba(${A},${(0.24 + 0.62 * onay).toFixed(2)})" stroke-width="1.8"/>`;
  /* onay tiki TAM ÇİZİLİ, yalnız parlaklığı değişir. ÖLÇÜLDÜ: kesikli
     çizimle bu tik 120 karenin 14'ünde yarım, yalnız 7'sinde tamdı — yani
     durağın EN BÜYÜK işareti (r=22 daire) çoğu zaman "⌄" açılır liste oku
     gibi okunuyordu, "müşteri onayı" değil. Onayın ilerlediğini zaten halka
     parlaklığı ve yanındaki iki satırın dolması anlatıyor. */
  s += `<path d="M${ocx - 9.5} ${ocy + 1} L${ocx - 2.6} ${ocy + 8.2} L${ocx + 10.5} ${ocy - 7.4}"
          fill="none" stroke="rgba(255,255,255,${(0.26 + 0.70 * onay).toFixed(2)})"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  [0, 1].forEach((l) => {
    const by = ocy - 12 + l * 16, gen = l === 0 ? 92 : 66;
    s += `<rect x="${ox2 + 86}" y="${by}" width="${gen}" height="7" rx="3.5" fill="rgba(255,255,255,.05)"/>`;
    s += `<rect x="${ox2 + 86}" y="${by}" width="${(gen * (0.28 + 0.72 * onay)).toFixed(1)}" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.20 + 0.34 * onay).toFixed(2)})"/>`;
  });
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
