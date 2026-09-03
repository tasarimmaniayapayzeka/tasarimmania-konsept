/* SAHNE — web-tasarim-yazilim / ai-entegrasyonu
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok, her şekil
 * aşağıdaki cümlelerden çıkıyor:
 *   01 "Teknik Altyapı: Widget, API ve Veri Kaynakları"
 *      "Chatbot, sitenize küçük bir widget olarak yerleşir ve arka planda
 *       bilgi tabanınızla API üzerinden konuşur. Bilgi tabanı; site sayfaları,
 *       ürün/hizmet katalogları, sık sorulan sorular ve paylaştığınız
 *       dokümanlardan oluşturulur. WhatsApp Business entegrasyonu, konuşmanın
 *       kanal değiştirmeden devam etmesini sağlar."
 *   02 "Marka Sesi ve İçerik Güncelleme"
 *      "Chatbotun üslubu kurumsal dilinize göre tanımlanır; resmi, samimi veya
 *       teknik bir ton seçilebilir. Yeni bir hizmet eklendiğinde veya bir bilgi
 *       değiştiğinde, chatbot yeniden kurulmadan içerik tabanı güncellenir ve
 *       değişiklik anında yanıtlara yansır."
 *   03 "Performans Takibi ve İyileştirme"
 *      "Konuşma kayıtları, hangi soruların sık sorulduğunu ve hangilerinin
 *       yanıtsız kaldığını gösterir. Bu veriyle içerik tabanı düzenli olarak
 *       genişletilir, karşılama mesajları ve yönlendirme kuralları optimize
 *       edilir."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 sitenin köşesindeki widget konuşur; altındaki API kanalında paketler
 *      iki yönde akar; en altta bilgi tabanı paneli, dört kaynak satırı
 *      (site sayfası · katalog · SSS · doküman) sırayla beslenir; sağdaki
 *      cihazda AYNI konuşma devam eder (kanal değiştirmeden);
 *   02 üç ton seçeneği tek sese bağlanır, altta içerik yığınındaki kart
 *      güncellenir ve yukarı çıkan darbe yanıt balonunu tazeler;
 *   03 konuşma kayıtları taranır — sıklık çubukları ve yanıtsız kalan satır —
 *      ve bu veri altta iki çıktıya iner: içerik tabanına yeni satır,
 *      karşılama mesajı + yönlendirme kuralı.
 * Beş saniyede bir tur, dikişsiz döngü: bütün hareket ya sin/cos ya da tam
 * sayı frekanslı sarmalama; tek seferlik hareket yok.
 *
 * YASAK (bu sayfaya özel — yasaklar.md "ai-entegrasyonu"):
 *  - AI ürün/model adı ya da logosu YOK. Hiçbir şekil bir markaya benzemiyor.
 *  - Yanıt oranı, yanıt süresi, memnuniyet gibi RAKAM YOK. Tuvalde yalnız
 *    durak numaraları (01/02/03) var, başka hiçbir sayı yok.
 *  - Sohbet balonları SOYUT ÇUBUK — okunur sahte diyalog yazılmadı.
 *  - WhatsApp Business "kanal değiştirmeden devam" cümlesi, MARKA İŞARETİYLE
 *    DEĞİL, nötr bir cihaz dış hattıyla çizildi: yeşil yok, ahize yok, balon
 *    içinde ahize yok. Cihazın içindeki iki balon, widget'takiyle aynı —
 *    anlatılan tam olarak "aynı konuşma başka kanalda sürüyor".
 *
 * KARDEŞ FİGÜRLE (sayfadaki .akis infografiği) ÇELİŞMEME:
 *  .akis "asistan SOLDA, ziyaretçi SAĞDA" hizasını kullanıyor ve balonların
 *  içine yazı yerine çubuk koyuyor. Bu sahne aynı iki kuralı izler: aksan
 *  konturlu asistan balonu hep SOLDA, nötr ziyaretçi balonu hep SAĞDA; hiçbir
 *  balonun içinde yazı yok. .akis'in anlattığı akış (soru → bilgi tabanı →
 *  dönen cevap) burada TEKRARLANMIYOR; bu sahne .akv listesinin üç adımını
 *  anlatıyor, o üç adım .akis'in üç durağından farklı.
 *
 * EŞİTLİK (kural 8): 02'de sayfa "resmi, samimi VEYA teknik bir ton
 * seçilebilir" diyor — üçü de geçerli. Bu yüzden üç ton kutusu HİÇ
 * seçilmiyor: aynı ölçü (62x34), aynı yarıçap, aynı kontur, aynı dolgu,
 * aynı zamanlama. İçlerindeki iki çubuk farklı bölünüyor (40+22 · 31+31 ·
 * 36+26) ama TOPLAM GENİŞLİK ÜÇÜNDE DE 62 ve yükseklik/alfa aynı — yani üç
 * kutunun mürekkep alanı birebir eşit. Farklı olan yalnız ritim, ki "ton"
 * farkı zaten bu. Kutuların ortalama parlaklığı önizleme PNG'sinde ölçüldü.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — reklam-filmi / urun-videosu ile birebir aynı ızgara,
   modül içinde ritim ortak kalsın diye. Üstteki 118 piksel sayfadaki
   "CANLI DÖNGÜ" rozetine bırakıldı.

   ÖLÇÜ NOTU — IŞIK DARBESİNİN YIKADIĞI ŞERİT: boru her durakta farklı
   yükseklikten geçiyor ve darbe (yarıçap 52, çekirdeği ~30) tam durak
   canlıyken oradan geçtiği için o şeride ince ayrıntı konulmadı:
     durak 01 · boru y 356–368 → boş bırakılan bant  y 326–396
     durak 02 · boru y 292–330 → boş bırakılan bant  y 262–360
     durak 03 · boru y 304–357 → boş bırakılan bant  y 273–387
   Bantlardan yalnız ince bağlantı hatları geçiyor; hepsinin iki ucundaki
   şekil bandın dışında duruyor. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 WIDGET+API' },
  { x: 437, fazMerkez: 0.50, etiket: '02 MARKA SESİ' },
  { x: 812, fazMerkez: 0.80, etiket: '03 SORU TAKİBİ' },
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
    s += (i === 0 ? altyapi(d.x, p, faz, a)
       : i === 1 ? markaSesi(d.x, p, faz, a)
       : takip(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · TEKNİK ALTYAPI: WIDGET, API VE VERİ KAYNAKLARI ────────────────
   Üstte sitenin köşesine oturmuş widget (asistan balonu SOLDA, ziyaretçi
   balonu SAĞDA — sayfadaki .akis ile aynı hiza), sağında aynı konuşmanın
   devam ettiği nötr cihaz. Ortada API kanalı: paketler üst şeritte sağa,
   alt şeritte sola akar (iki yönlü). Altta bilgi tabanı paneli; dört satır
   sayfanın saydığı dört kaynak: site sayfası, katalog, SSS, doküman. */
function altyapi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* --- site penceresi ------------------------------------------------- */
  const wx = bx + 16, wy = DY + 18, ww = 134, wh = 100;
  s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="10"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  [12, 22, 32].forEach((dx) => {
    s += `<circle cx="${wx + dx}" cy="${wy + 12}" r="2.8"
            fill="rgba(255,255,255,${(0.14 + 0.16 * p).toFixed(3)})"/>`;
  });
  s += `<rect x="${wx + 44}" y="${wy + 6}" width="76" height="13" rx="6.5"
          fill="rgba(255,255,255,${(0.055 + 0.055 * p).toFixed(3)})"/>`;
  s += `<line x1="${wx}" y1="${wy + 25}" x2="${wx + ww}" y2="${wy + 25}"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1"/>`;
  [[106, 34], [62, 48], [50, 62]].forEach(([gen, dy]) => {
    s += `<rect x="${wx + 12}" y="${wy + dy}" width="${gen}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.055 + 0.065 * p).toFixed(3)})"/>`;
  });

  /* --- widget: sitenin köşesine oturur, dışına taşar ------------------- */
  const gx = bx + 84, gy = DY + 66, gw = 82, gh = 68;
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="11"
          fill="rgba(255,255,255,${(0.055 + 0.045 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.24 + 0.50 * p).toFixed(3)})" stroke-width="1.5"/>`;
  s += `<circle cx="${gx + 12}" cy="${gy + 11}" r="3.6" fill="rgba(${A},${(0.30 + 0.55 * p).toFixed(2)})"/>`;
  s += `<rect x="${gx + 22}" y="${gy + 8}" width="34" height="6" rx="3"
          fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;
  s += `<line x1="${gx + 6}" y1="${gy + 20}" x2="${gx + gw - 6}" y2="${gy + 20}"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;
  /* asistan balonu — SOLDA, aksan konturlu (.akis ile aynı hiza) */
  s += `<rect x="${gx + 8}" y="${gy + 26}" width="44" height="12" rx="6"
          fill="rgba(${A},${(0.10 + 0.20 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})" stroke-width="1.2"/>`;
  /* ziyaretçi balonu — SAĞDA, nötr.
     ÖLÇÜ NOTU: ilk sürümde x=gx+gw-42, y=gy+42 idi; balon widget'ın yuvarlak
     sağ-alt köşesine yapışıyor ve büyütmede "kutudan taşmış" gibi okunuyordu
     (önizleme x2.6 büyütmede görüldü). İçeri alındı: sağdan 12, alttan 20. */
  s += `<rect x="${gx + gw - 46}" y="${gy + 40}" width="34" height="12" rx="6"
          fill="rgba(255,255,255,${(0.085 + 0.10 * p).toFixed(3)})"/>`;
  /* yazıyor göstergesi — üç nokta, tam sayı frekansla sırayla yanar.
     p ile TAMAMEN söndürülmüyor (aşağıdaki "sönük durakta da nefes" notu). */
  for (let i = 0; i < 3; i++) {
    const on = 0.28 + 0.72 * tepe(faz * 3, i / 3, 0.17);
    s += `<circle cx="${gx + 14 + i * 9}" cy="${gy + 60}" r="2.4"
            fill="rgba(${A},${(0.10 + 0.58 * on * (0.35 + 0.65 * p)).toFixed(3)})"/>`;
  }

  /* --- nötr cihaz: aynı konuşma kanal değiştirmeden devam -------------- */
  const tx = bx + 192, ty = DY + 50, tw = 38, th = 80;
  s += `<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="9"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<rect x="${tx + 13}" y="${ty + 5}" width="12" height="3" rx="1.5"
          fill="rgba(255,255,255,${(0.12 + 0.14 * p).toFixed(3)})"/>`;
  s += `<line x1="${tx + 5}" y1="${ty + 16}" x2="${tx + tw - 5}" y2="${ty + 16}"
          stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1"/>`;
  /* aynı konuşma: asistan SOLDA (aksan konturlu), ziyaretçi SAĞDA (nötr) */
  s += `<rect x="${tx + 6}" y="${ty + 26}" width="18" height="8" rx="4"
          fill="rgba(${A},${(0.10 + 0.20 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.28 + 0.42 * p).toFixed(3)})" stroke-width="1"/>`;
  s += `<rect x="${tx + tw - 21}" y="${ty + 42}" width="15" height="8" rx="4"
          fill="rgba(255,255,255,${(0.085 + 0.10 * p).toFixed(3)})"/>`;
  s += `<rect x="${tx + 6}" y="${ty + 58}" width="16" height="8" rx="4"
          fill="rgba(${A},${(0.08 + 0.14 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.32 * p).toFixed(3)})" stroke-width="1"/>`;

  /* devir hattı: widget → cihaz, üstünde yürüyen nokta */
  const d0 = [bx + 166, DY + 98], d1 = [bx + 176, DY + 98],
        d2 = [bx + 182, DY + 88], d3 = [bx + 192, DY + 88];
  s += `<path d="M${d0[0]} ${d0[1]} C${d1[0]} ${d1[1]} ${d2[0]} ${d2[1]} ${d3[0]} ${d3[1]}"
          fill="none" stroke="rgba(${A},${(0.16 + 0.42 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<path d="M${d3[0] - 6} ${d3[1] - 4} L${d3[0]} ${d3[1]} L${d3[0] - 6} ${d3[1] + 4}"
          fill="none" stroke="rgba(${A},${(0.20 + 0.50 * p).toFixed(3)})" stroke-width="1.4"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  const dt = (faz * 2) % 1;
  const dn = kubik(d0, d1, d2, d3, dt);
  s += `<circle cx="${dn.x.toFixed(1)}" cy="${dn.y.toFixed(1)}" r="2.8"
          fill="rgba(255,255,255,${(0.85 * Math.sin(Math.PI * dt) * (0.25 + 0.75 * p)).toFixed(3)})"/>`;

  /* --- API kanalı: iki şerit, paketler ters yönlerde akar -------------- */
  const kx = bx + 22, ky = DY + 146, kw = 208, kh = 30;
  s += `<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="15"
          fill="rgba(255,255,255,${(0.026 + 0.028 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="1.3"/>`;
  [[ky + 9, 1], [ky + 21, -1]].forEach(([sy, yon]) => {
    s += `<line x1="${kx + 12}" y1="${sy}" x2="${kx + kw - 12}" y2="${sy}"
            stroke="rgba(255,255,255,${(0.05 + 0.05 * p).toFixed(3)})" stroke-width="1"/>`;
    for (let i = 0; i < 6; i++) {
      /* paketler eşit aralıklı; bir turda TAM 3 tur atıyorlar → faz 0 ile
         faz 1'de paket kümesi birebir aynı, dikiş yok */
      const u = (((faz * 3 + i / 6) % 1) + 1) % 1;
      const px = kx + 14 + (yon > 0 ? u : 1 - u) * (kw - 28);
      s += `<rect x="${(px - 4).toFixed(1)}" y="${sy - 4}" width="8" height="8" rx="2.5"
              fill="rgba(${A},${(0.30 + 0.58 * p).toFixed(2)})"/>`;
    }
    const ax = yon > 0 ? kx + kw - 12 : kx + 12;
    s += `<path d="M${ax - 5 * yon} ${sy - 4} L${ax} ${sy} L${ax - 5 * yon} ${sy + 4}"
            fill="none" stroke="rgba(${A},${(0.22 + 0.45 * p).toFixed(3)})" stroke-width="1.3"
            stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  /* widget → kanal, kanal → bilgi tabanı.
     Kesikleri akıyor: desen 11 (4+7) ve turda 33 kayıyor → tam 3 tur, faz 0
     ile faz 1'de desen birebir aynı, dikiş üretmez. */
  const akis = (-faz * 33).toFixed(1);
  s += `<path d="M${bx + 125} ${DY + 134} C${bx + 112} ${DY + 143} ${bx + 86} ${DY + 137} ${bx + 60} ${ky}"
          fill="none" stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="4 7" stroke-dashoffset="${akis}"/>`;
  /* (ışık darbesinin yıkadığı bandı yalnız bu ince hat geçer) */
  s += `<path d="M${bx + 190} ${ky + kh} C${bx + 208} ${DY + 210} ${bx + 208} ${DY + 240} ${bx + 190} ${DY + 270}"
          fill="none" stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="4 7" stroke-dashoffset="${akis}"/>`;

  /* --- bilgi tabanı: dört kaynak satırı ------------------------------- */
  const bxx = bx + 16, byy = DY + 270, bw = 214, bh = 68;
  s += `<rect x="${bxx}" y="${byy}" width="${bw}" height="${bh}" rx="10"
          fill="rgba(255,255,255,${(0.026 + 0.030 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.16 + 0.36 * p).toFixed(3)})" stroke-width="1.3"/>`;
  const genis = [136, 114, 148, 122];
  for (let i = 0; i < 4; i++) {
    /* her satır sırayla beslenir; frekans 4 (tam sayı) → dikişsiz ve
       durağın canlı penceresinde dördü de görünür.
       SÖNÜK DURAKTA DA NEFES: eskiden çarpan düz `p` idi, durak karanlıkken
       satırlar TAMAMEN donuyordu. Ölçüldü (dongu-denetim): kareler arası
       ortalama fark 0,52'ye düşünce dikiş/ortalama 1,64 çıktı — oysa tam
       çözünürlükte dikiş farkı (0,104) normal kare farkından (0,186) DAHA
       KÜÇÜKTÜ, yani gerçek bir sıçrama yoktu; oran, paydası çok küçük olduğu
       için eşiği aşıyordu. Kardeş sahnelerde de hareket p ile tamamen
       kısılmıyor (sehpa çentikleri sönük durakta da dönüyor). */
    const on = tepe(faz * 4, i / 4, 0.20) * (0.30 + 0.70 * p);
    const ry = byy + 5 + i * 15;
    s += `<rect x="${bxx + 8}" y="${ry}" width="${bw - 16}" height="14" rx="5"
            fill="rgba(${A},${(0.018 + 0.200 * on).toFixed(3)})"/>`;
    s += kaynakIkon(bxx + 13, ry + 1, i, (0.20 + 0.58 * on + 0.12 * p).toFixed(3), A);
    s += `<rect x="${bxx + 34}" y="${ry + 4}" width="${genis[i]}" height="6" rx="3"
            fill="rgba(${A},${(0.14 + 0.56 * on + 0.08 * p).toFixed(3)})"/>`;
  }
  return s;
}

/* dört kaynak işareti — 12x12, hepsi soyut, hiçbiri marka değil.
   0 site sayfası · 1 ürün/hizmet kataloğu · 2 sık sorulan sorular · 3 doküman */
function kaynakIkon(x, y, tip, alfa, A) {
  const c = `rgba(${A},${alfa})`;
  if (tip === 0) {
    return `<rect x="${x}" y="${y}" width="12" height="12" rx="2" fill="none" stroke="${c}" stroke-width="1.3"/>`
      + `<line x1="${x}" y1="${y + 3.6}" x2="${x + 12}" y2="${y + 3.6}" stroke="${c}" stroke-width="1.3"/>`;
  }
  if (tip === 1) {
    let g = '';
    [[0, 0], [6.8, 0], [0, 6.8], [6.8, 6.8]].forEach(([dx, dy]) => {
      g += `<rect x="${x + dx}" y="${y + dy}" width="5.2" height="5.2" rx="1.2" fill="none" stroke="${c}" stroke-width="1.2"/>`;
    });
    return g;
  }
  if (tip === 2) {
    return `<rect x="${x}" y="${y}" width="8.6" height="6.4" rx="2" fill="none" stroke="${c}" stroke-width="1.2"/>`
      + `<rect x="${x + 3.4}" y="${y + 5.6}" width="8.6" height="6.4" rx="2" fill="none" stroke="${c}" stroke-width="1.2"/>`;
  }
  return `<path d="M${x} ${y} H${x + 7.6} L${x + 12} ${y + 4.4} V${y + 12} H${x} Z" fill="none" stroke="${c}" stroke-width="1.3" stroke-linejoin="round"/>`
    + `<line x1="${x + 2.6}" y1="${y + 8}" x2="${x + 8.6}" y2="${y + 8}" stroke="${c}" stroke-width="1.2"/>`;
}

/* ── 02 · MARKA SESİ VE İÇERİK GÜNCELLEME ───────────────────────────────
   Üstte üç ton kutusu — EŞİT (dosya başındaki eşitlik notu). Üçü de aynı
   düğüme bağlanır; düğümün altında asistan yanıt balonu (SOLDA, aksan
   konturlu). Altta içerik yığını: üstteki kart güncellenir, yukarı çıkan
   darbe balonun üstünden bir tazeleme parıltısı geçirir — "chatbot yeniden
   kurulmadan ... değişiklik anında yanıtlara yansır". */
function markaSesi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const kimlik = Math.round(bx);
  let s = '';

  /* --- üç ton kutusu: ölçü, kontur, dolgu ve zamanlama BİREBİR AYNI ---- */
  const tw = 62, th = 34, ara = 14, ty = DY + 20;
  const bolum = [[40, 22], [31, 31], [36, 26]];      // toplam üçünde de 62
  for (let i = 0; i < 3; i++) {
    const tx = bx + 16 + i * (tw + ara);
    s += `<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="9"
            fill="rgba(255,255,255,${(0.038 + 0.045 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.18 + 0.42 * p).toFixed(3)})" stroke-width="1.3"/>`;
    bolum[i].forEach((gen, k) => {
      s += `<rect x="${tx + 10}" y="${ty + 10 + k * 10}" width="${gen}" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.16 + 0.30 * p).toFixed(3)})"/>`;
    });
    /* düğüme giden hat — üçünde de aynı kalınlık ve aynı alfa */
    s += `<path d="M${tx + tw / 2} ${ty + th} C${tx + tw / 2} ${ty + th + 14} ${bx + 123} ${ty + th + 8} ${bx + 123} ${DY + 76}"
            fill="none" stroke="rgba(${A},${(0.16 + 0.34 * p).toFixed(3)})" stroke-width="1.2"/>`;
  }
  s += `<circle cx="${bx + 123}" cy="${DY + 76}" r="5"
          fill="rgba(${A},${(0.35 + 0.55 * p).toFixed(2)})"/>`;

  /* --- asistan yanıt balonu — SOLDA, aksan konturlu -------------------- */
  const yx = bx + 16, yy = DY + 86, yw = 178, yh = 54;
  const uz = (faz * 2) % 1;                       // frekans 2 → tam sayı
  const tazele = tepe(uz, 0.78, 0.20);
  s += `<rect x="${yx}" y="${yy}" width="${yw}" height="${yh}" rx="12"
          fill="rgba(${A},${(0.055 + 0.060 * p + 0.05 * tazele * p).toFixed(3)})"
          stroke="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})" stroke-width="1.6"/>`;
  [[140, 12], [118, 26], [84, 40]].forEach(([gen, dy]) => {
    s += `<rect x="${yx + 14}" y="${yy + dy}" width="${gen}" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.16 + 0.34 * p).toFixed(3)})"/>`;
  });
  /* tazeleme parıltısı: darbe geldiğinde balonun üstünden geçer.
     Konum uz'a bağlı ama opaklık iki uçta 0 → döngüde sıçrama yok. */
  if (tazele > 0.01) {
    s += `<clipPath id="aiBalon${kimlik}"><rect x="${yx}" y="${yy}" width="${yw}" height="${yh}" rx="12"/></clipPath>`;
    const px = yx - 30 + (yw + 60) * kis01((uz - 0.62) / 0.32);
    s += `<g clip-path="url(#aiBalon${kimlik})">
            <rect x="${px.toFixed(1)}" y="${yy}" width="26" height="${yh}"
              fill="rgba(255,255,255,${(0.16 * tazele * (0.3 + 0.7 * p)).toFixed(3)})"/>
          </g>`;
  }

  /* --- güncelleme hattı: yığından balona yürüyen darbe ----------------- */
  s += `<line x1="${bx + 123}" y1="${DY + 240}" x2="${bx + 123}" y2="${yy + yh}"
          stroke="rgba(${A},${(0.12 + 0.28 * p).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="4 7" stroke-dashoffset="${(faz * 33).toFixed(1)}"/>`;
  const yur = kis01((uz - 0.25) / 0.40);
  if (uz > 0.25 && uz < 0.65) {
    const dy = DY + 240 - yur * (DY + 240 - (yy + yh));
    s += `<circle cx="${bx + 123}" cy="${dy.toFixed(1)}" r="3.4"
            fill="rgba(255,255,255,${(0.90 * Math.sin(Math.PI * yur) * (0.3 + 0.7 * p)).toFixed(3)})"/>`;
  }

  /* --- içerik yığını: üstteki kart güncellenir ------------------------- */
  const sx = bx + 16, sw = 214, sh = 26;
  const guncel = tepe(uz, 0.15, 0.22);
  for (let i = 0; i < 3; i++) {
    const sy = DY + 240 + i * 34;
    const yeni = i === 0;
    const on = yeni ? guncel : 0;
    s += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="8"
            fill="rgba(255,255,255,${(0.028 + 0.030 * p + 0.140 * on).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.30 * p + 0.55 * on).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${sx + 12}" y="${sy + 8}" width="10" height="10" rx="2.5"
            fill="none" stroke="rgba(${A},${(0.20 + 0.36 * p).toFixed(3)})" stroke-width="1.2"/>`;
    /* güncellenen kartın çubuğu düzgün, periyodik bir salınımla yeniden yazılır */
    const gen = yeni ? 96 + 46 * guncel : [0, 118, 88][i];
    s += `<rect x="${sx + 30}" y="${sy + 7}" width="${gen.toFixed(1)}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.14 + 0.28 * p).toFixed(3)})"/>`;
    s += `<rect x="${sx + 30}" y="${sy + 16}" width="${[64, 78, 52][i]}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.09 + 0.18 * p).toFixed(3)})"/>`;
    if (yeni) {
      /* yeni bilgi işareti — artı; rakam değil, marka değil */
      const cx = sx + sw - 20, cy = sy + sh / 2;
      const av = (0.20 + 0.70 * guncel) * (0.3 + 0.7 * p);
      s += `<path d="M${cx - 5} ${cy} H${cx + 5} M${cx} ${cy - 5} V${cy + 5}"
              stroke="rgba(${A},${av.toFixed(3)})" stroke-width="1.8" stroke-linecap="round"/>`;
    }
  }
  return s;
}

/* ── 03 · PERFORMANS TAKİBİ VE İYİLEŞTİRME ──────────────────────────────
   Üstte konuşma kayıtları: dört satır, her birinde soru çubuğu ve sıklık
   çubuğu (uzundan kısaya — "hangi soruların sık sorulduğu"); üçüncü satır
   kesikli konturlu ve içi boş işaretli — "hangilerinin yanıtsız kaldığı".
   Tarama satırlar üzerinde yürür. Altta iki çıktı: bilgi tabanına eklenen
   yeni satır ve karşılama mesajı + yönlendirme kuralı. HİÇBİR RAKAM YOK —
   çubuk uzunlukları görecelidir, üstlerinde sayı yazmaz. */
function takip(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* --- konuşma kayıtları ---------------------------------------------- */
  const lx = bx + 16, lw = 214, lh = 24;
  const soru = [62, 54, 68, 48];
  const siklik = [148, 116, 84, 56];
  for (let i = 0; i < 4; i++) {
    const ly = DY + 20 + i * 30;
    /* tarama sönük durakta da sürer — gerekçesi 01'deki aynı adlı notta */
    const on = tepe(faz * 4, i / 4, 0.20) * (0.30 + 0.70 * p);
    const yanitsiz = i === 2;
    s += `<rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="7"
            fill="rgba(255,255,255,${(0.020 + 0.024 * p + 0.150 * on).toFixed(3)})"
            stroke="rgba(${A},${(0.12 + 0.26 * p + 0.55 * on).toFixed(3)})" stroke-width="1.2"
            ${yanitsiz ? 'stroke-dasharray="5 4"' : ''}/>`;
    /* işaret: yanıtlanan dolu, yanıtsız kalan içi boş */
    if (yanitsiz) {
      s += `<circle cx="${lx + 14}" cy="${ly + 12}" r="5" fill="none"
              stroke="rgba(${A},${(0.26 + 0.42 * p).toFixed(3)})" stroke-width="1.4"
              stroke-dasharray="2.6 2.6"/>`;
    } else {
      s += `<circle cx="${lx + 14}" cy="${ly + 12}" r="5"
              fill="rgba(${A},${(0.26 + 0.50 * p).toFixed(3)})"/>`;
    }
    s += `<rect x="${lx + 26}" y="${ly + 5}" width="${soru[i]}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.12 + 0.24 * p).toFixed(3)})"/>`;
    /* sıklık çubuğu: yanıtsız satırda içi boş kalır */
    s += `<rect x="${lx + 26}" y="${ly + 14}" width="${siklik[i]}" height="6" rx="3"
            fill="${yanitsiz ? 'none' : `rgba(${A},${(0.20 + 0.42 * p + 0.34 * on).toFixed(3)})`}"
            ${yanitsiz ? `stroke="rgba(${A},${(0.20 + 0.34 * p).toFixed(3)})" stroke-width="1.1" stroke-dasharray="4 4"` : ''}/>`;
  }

  /* --- iki çıktıya inen hatlar (darbenin yıkadığı bandı ince geçerler) - */
  const h1 = [[bx + 70, DY + 142], [bx + 62, DY + 190], [bx + 62, DY + 226], [bx + 66, DY + 260]];
  const h2 = [[bx + 176, DY + 142], [bx + 184, DY + 190], [bx + 184, DY + 226], [bx + 180, DY + 260]];
  [h1, h2].forEach((h, k) => {
    s += `<path d="M${h[0][0]} ${h[0][1]} C${h[1][0]} ${h[1][1]} ${h[2][0]} ${h[2][1]} ${h[3][0]} ${h[3][1]}"
            fill="none" stroke="rgba(${A},${(0.13 + 0.32 * p).toFixed(3)})" stroke-width="1.3"
            stroke-dasharray="4 7" stroke-dashoffset="${(-faz * 33).toFixed(1)}"/>`;
    const u = (((faz * 3 + k * 0.5) % 1) + 1) % 1;
    const n = kubik(h[0], h[1], h[2], h[3], u);
    s += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="2.8"
            fill="rgba(255,255,255,${(0.85 * Math.sin(Math.PI * u) * (0.22 + 0.78 * p)).toFixed(3)})"/>`;
  });

  /* --- çıktı A: içerik tabanı genişletilir ---------------------------- */
  const ax = bx + 16, ay = DY + 260, aw = 100, ah = 78;
  s += `<rect x="${ax}" y="${ay}" width="${aw}" height="${ah}" rx="9"
          fill="rgba(255,255,255,${(0.026 + 0.028 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.15 + 0.32 * p).toFixed(3)})" stroke-width="1.3"/>`;
  const ekle = tepe(faz * 2, 0.30, 0.24);
  for (let i = 0; i < 4; i++) {
    const yy = ay + 10 + i * 17;
    const yeni = i === 3;
    if (yeni) {
      s += `<rect x="${ax + 12}" y="${yy}" width="76" height="9" rx="4.5" fill="none"
              stroke="rgba(${A},${(0.16 + 0.24 * p).toFixed(3)})" stroke-width="1"
              stroke-dasharray="4 4"/>`;
      s += `<rect x="${ax + 12}" y="${yy}" width="${(76 * ekle).toFixed(1)}" height="9" rx="4.5"
              fill="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})"/>`;
    } else {
      s += `<rect x="${ax + 12}" y="${yy}" width="76" height="9" rx="4.5"
              fill="rgba(${A},${(0.16 + 0.30 * p).toFixed(3)})"/>`;
    }
  }

  /* --- çıktı B: karşılama mesajı + yönlendirme kuralı ------------------ */
  const ox = bx + 130, oy = DY + 260, ow = 100, oh = 78;
  s += `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" rx="9"
          fill="rgba(255,255,255,${(0.026 + 0.028 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.15 + 0.32 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* karşılama balonu — asistan tarafı, aksan konturlu */
  s += `<path d="M${ox + 14} ${oy + 10} H${ox + 78} a7 7 0 0 1 7 7 V${oy + 27}
          a7 7 0 0 1 -7 7 H${ox + 26} l-6 7 v-7 h-6 a7 7 0 0 1 -7 -7 V${oy + 17}
          a7 7 0 0 1 7 -7 Z"
          fill="rgba(${A},${(0.07 + 0.09 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.28 + 0.42 * p).toFixed(3)})" stroke-width="1.3"
          stroke-linejoin="round"/>`;
  s += `<rect x="${ox + 22}" y="${oy + 19}" width="44" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.16 + 0.30 * p).toFixed(3)})"/>`;
  /* yönlendirme çatalı — iki dal SİMETRİK ve eşzamanlı, biri öne çıkmaz */
  const fx = ox + ow / 2, fy = oy + 44;
  s += `<path d="M${fx} ${fy} V${fy + 8}
          M${fx} ${fy + 8} C${fx} ${fy + 16} ${fx - 26} ${fy + 12} ${fx - 30} ${fy + 22}
          M${fx} ${fy + 8} C${fx} ${fy + 16} ${fx + 26} ${fy + 12} ${fx + 30} ${fy + 22}"
          fill="none" stroke="rgba(${A},${(0.20 + 0.38 * p).toFixed(3)})" stroke-width="1.3"
          stroke-linecap="round"/>`;
  [-30, 30].forEach((dx) => {
    s += `<rect x="${fx + dx - 9}" y="${fy + 22}" width="18" height="9" rx="4.5"
            fill="rgba(${A},${(0.18 + 0.34 * p).toFixed(3)})"/>`;
  });
  /* iki dalda AYNI ANDA yürüyen iki nokta — eşitlik korunur */
  const fu = tepe(faz * 2, 0.55, 0.30);
  if (fu > 0.01) {
    const t = kis01((((faz * 2) % 1) - 0.30) / 0.42);
    [-1, 1].forEach((yon) => {
      const n = kubik([fx, fy + 8], [fx, fy + 16], [fx + yon * 26, fy + 12], [fx + yon * 30, fy + 22], t);
      s += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="2.6"
              fill="rgba(255,255,255,${(0.85 * fu * (0.25 + 0.75 * p)).toFixed(3)})"/>`;
    });
  }
  return s;
}

/* ---- yardımcılar ------------------------------------------------------ */

/* Periyodik tepe: u'nun 1'lik periyodunda merkezde 1, ±genişlikte 0.
   Sarmalı mesafe kullanır → döngü başında da sürekli, dikiş üretmez. */
function tepe(u, merkez, genislik) {
  let d = Math.abs(((((u - merkez) % 1) + 1) % 1));
  d = Math.min(d, 1 - d);
  if (d >= genislik) return 0;
  return 0.5 + 0.5 * Math.cos((Math.PI * d) / genislik);
}

/* kübik Bézier üzerinde nokta — yürüyen paketler için */
function kubik(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    y: u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  };
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
