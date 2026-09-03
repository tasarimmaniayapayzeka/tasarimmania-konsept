/* SAHNE — web-tasarim-yazilim / bakim-destek
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım (index.html:996-1007).
 * Uydurma yok, üç durak TAM OLARAK bunlar:
 *   01 Kapsam Dışında Kalanlar
 *      "Yeni özellik geliştirme, kapsamlı tasarım değişikliği veya farklı bir
 *       platforma geçiş gibi talepler bakım paketinin DIŞINDADIR; bu tür
 *       ihtiyaçlar Web Tasarım & Yazılım hizmetimiz altında AYRI BİR PROJE
 *       olarak ele alınır."
 *   02 Hangi Site Büyüklüklerine Uygun
 *      "Kurumsal tanıtım siteleri, blog altyapıları ve e-ticaret siteleri
 *       farklı bakım yoğunluğu gerektirir; KAPSAM site büyüklüğüne ve trafik
 *       hacmine göre ŞEKİLLENDİRİLİR."
 *   03 Acil Müdahale Süreci
 *      "Kesinti veya şüpheli erişim tespit edildiğinde BİLDİRİM anında
 *       iletilir, KAYNAK belirlenir ve site GÜVENLİ BİR KOPYAYA döndürülerek
 *       ERİŞİM yeniden sağlanır."
 *
 * FİKİR: modülün ortak dili korunuyor — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 üstte kapalı bir kapsam kutusu (içinde dönen bakım rutini) var; onun
 *      ALTINDA, kesikli sınır çizgisinin ÖTESİNDE ayrı bir bölge duruyor ve
 *      üç talep sırayla oraya düşüyor; oradan aşağı, kapsamın dışındaki ayrı
 *      bir iş kutusuna akıyorlar;
 *   02 üç site tipi tel kafesi alt alta; kapsam çerçevesi aşağı yukarı gezip
 *      hangisinin üstündeyse ONA GÖRE yeniden boyutlanıyor, soldaki trafik
 *      rayı sürekli akıyor, altta yoğunluk göstergesi çerçeveyle birlikte
 *      değişiyor;
 *   03 dört vuruş sırayla: erişim çizgisi kesiliyor + dışarıdan bir erişim
 *      denemesi geliyor → bildirim çıkıyor → nişangâh katmanlar arasında
 *      inip kaynağa kilitleniyor → güvenli kopya geri yükleniyor ve erişim
 *      çizgisi yeniden doluyor.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * ── YASAK (plan/video-uret/yasaklar.md · "bakim-destek") ────────────────
 *  · 01 KAPSAM DIŞINI anlatıyor. Dışarıda kalan üç talep KAPSAM KUTUSUNUN
 *    İÇİNDE DEĞİL, kesikli sınırın ALTINDAKİ ayrı bölgede duruyor; kutuları
 *    kesikli ve nötr beyaz konturlu — kapsam kutusu ise sürekli ve aksan
 *    konturlu.
 *    DİKKAT (yorumu doğru oku): AYRIMI YAPAN ŞEY RENK DEĞİL, KESİKLİ SINIR
 *    ÇİZGİSİ VE DÜŞEY SIRA. Panelde üç ayrı bölge var, üçü de farklı:
 *      1) ÜSTTE sürekli kontur + aksan kutu ....... KAPSAM İÇİ
 *      2) kesikli sınırın ALTINDA kesikli + nötr .. KAPSAM DIŞI (üç talep)
 *      3) EN ALTTA sürekli kontur + aksan kutu .... KAPSAM DIŞI ama AYRI İŞ
 *    3 numara da sınırın altındadır, yani kapsamın dışındadır; aksan rengi
 *    ona "bu da bizim hizmetimiz, sadece ayrı bir proje" dedirtmek için
 *    verildi (sayfa: "Web Tasarım & Yazılım hizmetimiz altında ayrı bir
 *    proje olarak ele alınır"). Yani "aksan = kapsam içi" DİYE OKUMA; bu
 *    binary bir kod değil. Sırayı ters çevirme: kapsam üstte, dışarıda
 *    kalanlar sınırın altında, ayrı iş en altta.
 *  · Çalışma süresi yüzdesi, müdahale süresi (SLA), paket fiyatı YOK —
 *    hiçbir yerde rakam yazmıyor (durak numaraları hariç, onlar sayfanın
 *    kendi numaralandırması).
 *  · Logo / marka / platform işareti yok. İnsan yüzü yok (hiç insan yok).
 *  · Sayfadaki .akis infografiğiyle ÇELİŞMİYOR: .akis üç BAKIM KATMANINI
 *    (yedekleme / güncelleme / kesinti izleme) ve tek rutinde birleşmelerini
 *    anlatıyor; bu video onlara hiç girmiyor, .akv'nin üç BAŞKA adımını
 *    (kapsam dışı / site ölçeği / acil müdahale) çiziyor.
 *
 * ── ÇIKARIM UYARISI (metinde AÇIKÇA yazmıyor) ──────────────────────────
 *  02'deki yoğunluk göstergesi çerçeve kurumsal → blog → e-ticaret sırasında
 *  ilerlerken doluyor. Sayfa "farklı bakım yoğunluğu gerektirir" diyor ama
 *  hangisinin daha yoğun olduğunu SÖYLEMİYOR; sıralama çizilen yapıların
 *  (birkaç bölüm → yazı akışı → ürün ızgarası) karmaşıklığından türetildi.
 *  Yan yana kıyas tablosu yapılmadı: üç kart AYNI ölçü/kontur/opaklıkta,
 *  gösterge TEK ve gezen çerçeveye bağlı — "şu tip daha iyi" okuması çıkmaz.
 *
 * ── DİKİŞSİZLİK ────────────────────────────────────────────────────────
 *  Faza bağlı her hareket periyodik: boru/kesikli akışlar dashoffset ile tam
 *  sayıda desen kaydırıyor, 02'nin çerçevesi saf sinüs, 01 ve 03'ün öykü
 *  rampaları (u) yalnız durağın CANLI penceresinde ilerliyor ve u'ya bağlı
 *  HER alfa p ile çarpılıyor. Döngü noktasında (faz 0 ve 119/120) 01 ve
 *  03'ün p'si tam 0 — rampanın 1'den 0'a dönüşü hiçbir pikseli oynatmıyor.
 *  (urun-videosu'nda yaşanan tuzak buydu: modülo ile sarmalanan çubukların
 *  p'den bağımsız 0.18 taban alfası vardı ve dikiş 1.95× ölçülmüştü.)
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın tuval üzerindeki yeri — reklam-filmi / urun-videosu ile birebir
   aynı ızgara, böylece bütün alt sayfalar aynı ritmi paylaşıyor. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı.
   ETİKET GENİŞLİĞİ: Consolas ilerlemesi 0,55 em → 28 px'te 15,4 px/harf.
   14 harf + 13×1,2 harf arası = 231 px; istasyon 246 px. Sığıyor.
   "03 ACİL MÜDAHALE" 16 harf = 264 px ile TAŞIYORDU, "03 MÜDAHALE" yapıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 KAPSAM DIŞI' },
  { x: 437, fazMerkez: 0.50, etiket: '02 SİTE BOYUTU' },
  { x: 812, fazMerkez: 0.80, etiket: '03 MÜDAHALE' },
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
    s += (i === 0 ? kapsamDisi(d.x, p, faz, a)
       : i === 1 ? siteBoyutu(d.x, p, faz, a)
       : mudahale(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · KAPSAM DIŞINDA KALANLAR ───────────────────────────────────────
   ÜSTTE kapsam kutusu (sürekli kontur, aksan): içinde bakılan site ve dönen
   bakım rutini. ALTTA kesikli sınır çizgisi. ONUN DA ALTINDA ayrı bir bölge
   (kesikli kontur, nötr beyaz): üç talep — yeni özellik, kapsamlı tasarım
   değişikliği, farklı platforma geçiş. Oradan aşağı akıp, kapsamın dışındaki
   AYRI İŞ kutusuna düşüyorlar ("ayrı bir proje olarak ele alınır").
   AYRI İŞ kutusu da SINIRIN ALTINDA, yani kapsamın DIŞINDA — konturu aksan
   olmasına rağmen. Aksan burada "kapsam içi" demek değil, "bu da bizim
   hizmetimiz ama ayrı bir proje" demek. Bu kutuyu sınırın ÜSTÜNE taşıma. */
function kapsamDisi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  /* Öykü rampası: yalnız durağın canlı penceresinde (0.01–0.39) ilerler.
     ÖLÇÜ NOTU: ilk sürüm 0.03–0.37 aralığına yayılmıştı; ilk talep faz 0.05
     civarında düşüyordu ve orada p daha 0.19 — kutu neredeyse görünmüyordu.
     Rampa 0.07–0.34'e daraltıldı, dört vuruş da p ≥ 0.38'de oynuyor. */
  const u = kis01((faz - 0.07) / 0.27);
  let s = '';

  /* ---- KAPSAM İÇİ: sürekli kontur + aksan --------------------------- */
  const zaX = bx + 20, zaY = DY + 24, zaW = 206, zaH = 92;
  s += `<rect x="${zaX}" y="${zaY}" width="${zaW}" height="${zaH}" rx="13"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.48 * p).toFixed(3)})" stroke-width="1.7"/>`;

  /* bakılan site: başlık bandı + üç satır */
  const skX = zaX + 18, skY = zaY + 20;
  s += `<rect x="${skX}" y="${skY}" width="60" height="52" rx="7"
          fill="rgba(255,255,255,.06)"
          stroke="rgba(255,255,255,${(0.18 + 0.24 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${skX + 8}" y="${skY + 9}" width="44" height="7" rx="3.5"
          fill="rgba(${A},${(0.34 + 0.44 * p).toFixed(2)})"/>`;
  [0, 1, 2].forEach((k) => {
    s += `<rect x="${skX + 8}" y="${skY + 23 + k * 10}" width="${44 - k * 11}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.14 + 0.18 * p).toFixed(3)})"/>`;
  });

  /* dönen bakım rutini — TAM tur, dikişsiz */
  const lcx = zaX + 138, lcy = zaY + 46, lr = 19;
  s += `<g transform="rotate(${(faz * 360).toFixed(1)} ${lcx} ${lcy})">`;
  s += `<path d="M${lcx} ${lcy - lr} A${lr} ${lr} 0 1 0 ${lcx + lr} ${lcy}" fill="none"
          stroke="rgba(${A},${(0.30 + 0.55 * p).toFixed(2)})" stroke-width="2.6" stroke-linecap="round"/>`;
  s += `<path d="M${lcx + lr - 6} ${lcy + 7} L${lcx + lr + 6} ${lcy + 7} L${lcx + lr} ${lcy - 4} Z"
          fill="rgba(${A},${(0.30 + 0.55 * p).toFixed(2)})"/>`;
  s += `</g>`;
  /* rutinin üç katmanı — soyut çubuk, ad yazılmıyor */
  [0, 1, 2].forEach((k) => {
    s += `<rect x="${zaX + 172}" y="${zaY + 26 + k * 14}" width="20" height="8" rx="4"
            fill="rgba(${A},${(0.16 + 0.34 * p).toFixed(3)})"/>`;
  });

  /* ---- SINIR: kesikli, akan ----------------------------------------- */
  const sy = DY + 128;
  s += `<line x1="${bx + 16}" y1="${sy}" x2="${bx + 230}" y2="${sy}"
          stroke="rgba(255,255,255,${(0.16 + 0.20 * p).toFixed(3)})" stroke-width="1.6"
          stroke-dasharray="9 7" stroke-dashoffset="${(-faz * 16 * 3).toFixed(1)}"/>`;

  /* ---- KAPSAM DIŞI BÖLGE: kesikli kontur + nötr beyaz ---------------- */
  const zbX = bx + 20, zbY = DY + 142, zbW = 206, zbH = 84;
  s += `<rect x="${zbX}" y="${zbY}" width="${zbW}" height="${zbH}" rx="13"
          fill="rgba(255,255,255,.014)"
          stroke="rgba(255,255,255,${(0.13 + 0.13 * p).toFixed(3)})" stroke-width="1.4"
          stroke-dasharray="8 6"/>`;

  /* üç talep — sırayla düşer; hepsi nötr beyaz, aksan YOK */
  const gY = zbY + 14, gW = 62, gH = 56;
  const gX0 = zbX + 5;
  for (let i = 0; i < 3; i++) {
    const gx = gX0 + i * 68;
    const g = kis01((u - 0.05 - i * 0.17) / 0.22) * p;
    const c = (0.16 + 0.52 * g).toFixed(3);
    s += `<rect x="${gx}" y="${gY}" width="${gW}" height="${gH}" rx="9"
            fill="rgba(255,255,255,${(0.020 + 0.045 * g).toFixed(3)})"
            stroke="rgba(255,255,255,${c})" stroke-width="1.3"/>`;
    const mx = gx + gW / 2, my = gY + gH / 2;
    if (i === 0) {
      /* yeni özellik geliştirme: boş yuva + artı */
      s += `<rect x="${mx - 17}" y="${my - 17}" width="34" height="34" rx="8" fill="none"
              stroke="rgba(255,255,255,${c})" stroke-width="1.4" stroke-dasharray="5 4"/>`;
      s += `<path d="M${mx} ${my - 10} V${my + 10} M${mx - 10} ${my} H${mx + 10}"
              stroke="rgba(255,255,255,${c})" stroke-width="2.4" stroke-linecap="round"/>`;
    } else if (i === 1) {
      /* kapsamlı tasarım değişikliği: yerleşim çerçevesi + sütunları
         yer değiştiren çift başlı ok */
      s += `<rect x="${mx - 21}" y="${my - 18}" width="42" height="30" rx="5" fill="none"
              stroke="rgba(255,255,255,${c})" stroke-width="1.4"/>`;
      s += `<rect x="${mx - 17}" y="${my - 14}" width="34" height="5" rx="2.5"
              fill="rgba(255,255,255,${c})"/>`;
      s += `<rect x="${mx - 17}" y="${my - 5}" width="14" height="13" rx="3" fill="none"
              stroke="rgba(255,255,255,${c})" stroke-width="1.2"/>`;
      s += `<rect x="${mx + 3}" y="${my - 5}" width="14" height="13" rx="3" fill="none"
              stroke="rgba(255,255,255,${c})" stroke-width="1.2"/>`;
      s += `<path d="M${mx - 13} ${my + 19} H${mx + 13} M${mx - 9} ${my + 15} L${mx - 13} ${my + 19}
              L${mx - 9} ${my + 23} M${mx + 9} ${my + 15} L${mx + 13} ${my + 19} L${mx + 9} ${my + 23}"
              fill="none" stroke="rgba(255,255,255,${c})" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      /* farklı bir platforma geçiş: bir kaptan BAŞKA BİÇİMDE bir kaba */
      s += `<rect x="${mx - 25}" y="${my - 11}" width="22" height="22" rx="5" fill="none"
              stroke="rgba(255,255,255,${c})" stroke-width="1.4"/>`;
      s += `<rect x="${mx + 3}" y="${my - 11}" width="22" height="22" rx="11" fill="none"
              stroke="rgba(255,255,255,${c})" stroke-width="1.4"/>`;
      s += `<path d="M${mx - 1} ${my} H${mx + 1} M${mx - 4} ${my - 4} L${mx} ${my} L${mx - 4} ${my + 4}"
              fill="none" stroke="rgba(255,255,255,${c})" stroke-width="1.6"
              stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  }

  /* ---- AYRI İŞ: kapsamın dışında, kendi kutusunda -------------------
     YOL SEÇİMİ ÖLÇÜMDEN: ilk sürümde bağlantı panelin TAM ORTASINDAN
     (panel içi x≈123) aşağı iniyordu. Akan borunun ışık darbesi bu durak
     canlıyken tam oraya (panel içi 123, 242) oturuyor ve r=52'lik parlama
     kesikli çizgiyi de ok ucunu da tamamen yutuyordu — önizlemede görüldü,
     bağlantı hiç okunmuyordu. Yol sol kenara (panel içi x=40) alındı;
     darbenin parlak diski 71–175 arasını kapsıyor, 40 dışarıda kalıyor. */
  const pr = kis01((u - 0.56) / 0.34) * p;
  const akX = bx + 62, akY = DY + 262, akW = 126, akH = 54;
  const yX = bx + 40, yY = akY + 27;
  s += `<path d="M${yX} ${zbY + zbH} V${yY - 10} q0 10 10 10 H${akX - 10}" fill="none"
          stroke="rgba(${A},${(0.20 + 0.55 * pr).toFixed(3)})" stroke-width="2"
          stroke-dasharray="7 6" stroke-dashoffset="${(-faz * 13 * 3).toFixed(1)}"/>`;
  s += `<path d="M${akX - 12} ${yY - 6} L${akX - 1} ${yY} L${akX - 12} ${yY + 6} Z"
          fill="rgba(${A},${(0.20 + 0.65 * pr).toFixed(3)})"/>`;
  s += `<rect x="${akX}" y="${akY}" width="${akW}" height="${akH}" rx="11"
          fill="rgba(255,255,255,${(0.024 + 0.040 * pr).toFixed(3)})"
          stroke="rgba(${A},${(0.16 + 0.52 * pr).toFixed(3)})" stroke-width="1.6"/>`;
  /* ayrı işin kendi planı — üç satır, sırayla dolar */
  [0, 1, 2].forEach((k) => {
    const q = kis01((pr - k * 0.16) / 0.44);
    s += `<rect x="${akX + 16}" y="${akY + 13 + k * 12}" width="98" height="6" rx="3"
            fill="rgba(255,255,255,.05)"/>`;
    s += `<rect x="${akX + 16}" y="${akY + 13 + k * 12}" width="${(98 * (0.30 + 0.70 * q)).toFixed(1)}" height="6" rx="3"
            fill="rgba(${A},${(0.18 + 0.46 * q).toFixed(3)})"/>`;
  });
  return s;
}

/* ── 02 · HANGİ SİTE BÜYÜKLÜKLERİNE UYGUN ───────────────────────────────
   Üç site tipi tel kafesi alt alta: kurumsal tanıtım (birkaç bölüm), blog
   altyapısı (yazı akışı), e-ticaret (ürün ızgarası). Üçü AYNI dış ölçüde,
   AYNI konturda, AYNI opaklıkta — üstünlük işareti yok, fark yalnız iç
   yapıda. Solda trafik rayı sürekli akar. Kapsam çerçevesi saf sinüsle
   aşağı-yukarı gezer ve hangi kartın üstündeyse onu sarar; altta tek bir
   yoğunluk göstergesi çerçeveyle birlikte değişir ("kapsam ... site
   büyüklüğüne ve trafik hacmine göre şekillendirilir"). */
function siteBoyutu(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  const kX = bx + 46, kW = 154, kH = 76;
  const kY = [DY + 34, DY + 130, DY + 226];

  /* --- trafik rayı: sürekli akan noktalar ---------------------------- */
  const rX = bx + 28, r0 = DY + 34, r1 = DY + 302;
  s += `<line x1="${rX}" y1="${r0}" x2="${rX}" y2="${r1}"
          stroke="rgba(255,255,255,${(0.07 + 0.06 * p).toFixed(3)})" stroke-width="1.4"/>`;
  /* (k/12 + faz) % 1: noktalar tek tip olduğu için KÜME faz 0 ile faz 1'de
     birebir aynı — sarmalanma görünmez, dikiş oluşmaz. */
  for (let k = 0; k < 12; k++) {
    const t = (k / 12 + faz) % 1;
    const y = r0 + t * (r1 - r0);
    s += `<circle cx="${rX}" cy="${y.toFixed(1)}" r="2.8"
            fill="rgba(${A},${(0.22 + 0.52 * p).toFixed(3)})"/>`;
  }

  /* --- üç site tipi: aynı kabuk, farklı iç yapı ---------------------- */
  for (let i = 0; i < 3; i++) {
    const y = kY[i];
    s += `<rect x="${kX}" y="${y}" width="${kW}" height="${kH}" rx="9"
            fill="rgba(255,255,255,${(0.028 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.15 + 0.20 * p).toFixed(3)})" stroke-width="1.3"/>`;
    /* ortak başlık bandı */
    s += `<rect x="${kX + 10}" y="${y + 9}" width="134" height="6" rx="3"
            fill="rgba(255,255,255,${(0.13 + 0.16 * p).toFixed(3)})"/>`;
    const ic = (0.12 + 0.26 * p).toFixed(3);
    if (i === 0) {
      /* kurumsal tanıtım: geniş bir tanıtım bloğu + üç kısa bölüm */
      s += `<rect x="${kX + 10}" y="${y + 21}" width="134" height="24" rx="4"
              fill="rgba(${A},${(0.10 + 0.20 * p).toFixed(3)})"/>`;
      for (let j = 0; j < 3; j++) {
        s += `<rect x="${kX + 10 + j * 46}" y="${y + 51}" width="38" height="16" rx="4"
                fill="rgba(255,255,255,${ic})"/>`;
      }
    } else if (i === 1) {
      /* blog altyapısı: alt alta yazı satırları.
         ÖLÇÜ NOTU: bu kart tam ışık darbesinin bandında (panel içi y 130–206,
         darbe 177'de). İlk sürümde satırlar 3 px yüksekliğinde ince
         çizgilerdi ve darbe geçerken kart boş bir dikdörtgene dönüşüyordu —
         önizlemede görüldü. Satırlar 4,5 px'e kalınlaştı, alfa yükseltildi. */
      for (let j = 0; j < 4; j++) {
        const ry = y + 21 + j * 12;
        s += `<rect x="${kX + 10}" y="${ry}" width="14" height="10" rx="2.5"
                fill="rgba(${A},${(0.18 + 0.34 * p).toFixed(3)})"/>`;
        s += `<rect x="${kX + 29}" y="${ry}" width="${104 - j * 9}" height="4.5" rx="2.2"
                fill="rgba(255,255,255,${(0.16 + 0.32 * p).toFixed(3)})"/>`;
        s += `<rect x="${kX + 29}" y="${ry + 6}" width="${74 - j * 7}" height="4" rx="2"
                fill="rgba(255,255,255,${(0.11 + 0.22 * p).toFixed(3)})"/>`;
      }
    } else {
      /* e-ticaret: ürün ızgarası */
      for (let r = 0; r < 3; r++) {
        for (let c2 = 0; c2 < 3; c2++) {
          const gx = kX + 10 + c2 * 46, gy = y + 21 + r * 16;
          s += `<rect x="${gx}" y="${gy}" width="38" height="12" rx="3"
                  fill="rgba(255,255,255,${ic})"/>`;
          s += `<rect x="${gx}" y="${gy}" width="12" height="12" rx="3"
                  fill="rgba(${A},${(0.12 + 0.22 * p).toFixed(3)})"/>`;
        }
      }
    }
  }

  /* --- kapsam çerçevesi: saf sinüs → sürekli ve dikişsiz -------------
     pos = 1 - 1.35·sin(2πφ);  φ=0.34→0, φ=0.50→1, φ=0.66→2 (durağın canlı
     penceresi 0.31–0.69). Kırpma sayesinde uçlarda kartın üstünde bekler. */
  const pos = Math.max(0, Math.min(2, 1 - 1.35 * Math.sin(2 * Math.PI * faz)));
  const cy0 = kY[0] + (kY[1] - kY[0]) * pos;      // eşit aralıklı, doğrusal
  const cX0 = kX - 8, cX1 = kX + kW + 8;
  const cY0 = cy0 - 8, cY1 = cy0 + kH + 8;
  const ca = (0.22 + 0.66 * p).toFixed(3);
  const kol = 20;
  s += `<path d="M${cX0} ${(cY0 + kol).toFixed(1)} V${cY0.toFixed(1)} H${cX0 + kol}
          M${cX1 - kol} ${cY0.toFixed(1)} H${cX1} V${(cY0 + kol).toFixed(1)}
          M${cX1} ${(cY1 - kol).toFixed(1)} V${cY1.toFixed(1)} H${cX1 - kol}
          M${cX0 + kol} ${cY1.toFixed(1)} H${cX0} V${(cY1 - kol).toFixed(1)}"
          fill="none" stroke="rgba(${A},${ca})" stroke-width="2.4"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  /* trafik rayından o anki kapsama giren dal */
  s += `<path d="M${rX} ${(cy0 + kH / 2).toFixed(1)} H${cX0 - 3}" fill="none"
          stroke="rgba(${A},${(0.16 + 0.44 * p).toFixed(3)})" stroke-width="1.6"/>`;

  /* --- yoğunluk göstergesi: TEK, gezen çerçeveye bağlı ---------------
     Kıyas tablosu değil; çerçeve hangi tipin üstündeyse gösterge ona göre
     yeniden şekilleniyor. Rakam/yüzde yazmıyor, yalnız dolan bölmeler. */
  const kade = [0.34, 0.62, 0.92];
  const alt = Math.floor(Math.min(pos, 1.999));
  const ust = alt + 1;
  const kr = pos - alt;
  const seviye = kade[alt] + (kade[ust] - kade[alt]) * kr;
  const bol = 6, bw = 22, bg = 4.4;
  for (let j = 0; j < bol; j++) {
    const gx = kX + j * (bw + bg);
    const dol = kis01(seviye * bol - j);
    s += `<rect x="${gx}" y="${DY + 312}" width="${bw}" height="11" rx="5.5"
            fill="rgba(255,255,255,.05)"/>`;
    s += `<rect x="${gx}" y="${DY + 312}" width="${bw}" height="11" rx="5.5"
            fill="rgba(${A},${(0.72 * dol * (0.28 + 0.72 * p)).toFixed(3)})"/>`;
  }
  return s;
}

/* ── 03 · ACİL MÜDAHALE SÜRECİ ──────────────────────────────────────────
   Dört vuruş, sırayla:
     A  kesinti VEYA şüpheli erişim tespit edilir  (erişim çizgisi düşer,
        dışarıdan bir erişim denemesi gelir, tespit halkası atar)
     B  bildirim anında iletilir                   (çan işareti dışarı çıkar)
     C  kaynak belirlenir                          (nişangâh katmanlara inip
                                                    birine kilitlenir)
     D  güvenli bir kopyaya döndürülür             (kopyadan siteye dönüş
        ve erişim yeniden sağlanır                  yayı; çizgi yeniden dolar)
   Rampa u yalnız durağın canlı penceresinde (0.61–0.99) ilerler ve u'ya
   bağlı her alfa p ile çarpılır; döngü noktasında p = 0 olduğu için
   rampanın sıfırlanması görünmez.
   ÖLÇÜ NOTU: ilk sürüm rampayı 0.63–0.96'ya yayıyordu; son iki vuruş durak
   SÖNERKEN oynuyordu (kaynak vuruşu faz 0.87'de p=0.63, geri dönüş 0.93'te
   p=0.32). Rampa 0.66–0.92'ye toplandı: dört vuruş da p ≥ 0.26'da başlıyor
   ve en ayrıntılı vuruş (kaynak) p'nin tepesine (faz 0.80) denk geliyor. */
function mudahale(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const u = kis01((faz - 0.66) / 0.26);
  /* İKİ AYRI SÜRÜCÜ — ölçümle ayrıldı.
     *R = ham rampa, KONUM için. Alfa gibi p ile çarpılırsa hareket durak
     sönerken GERİ SARIYOR: ölçüldü, faz 0.87'de p=0.63 olduğu için nişangâh
     üçüncü katmana hiç varamıyor, ikinciden geri dönüyordu; bildirim balonu
     da sola kayıyordu. Konum artık p'ye bakmıyor.
     p'li olanlar ALFA için. Ham rampa döngü noktasında 1'den 0'a düşüyor;
     bu sıçramanın görünmemesi için ham rampayla KONUMU sürülen HER öğenin
     alfası p ile çarpılmış olmalı (faz 0 ve 119/120'de p tam 0). Aşağıdaki
     B ve D bloklarındaki taban alfalar bu yüzden "0.30" değil "0.30*p". */
  const tespitR = kis01(u / 0.24);
  const bildirimR = kis01((u - 0.22) / 0.24);
  const kaynakR = kis01((u - 0.44) / 0.26);
  const geriR = kis01((u - 0.68) / 0.28);
  const tespit = tespitR * p;
  const bildirim = bildirimR * p;
  const kaynak = kaynakR * p;
  const geri = geriR * p;
  let s = '';

  /* ---- A · TESPİT --------------------------------------------------- */
  const aX = bx + 20, aY = DY + 24, aW = 206, aH = 76;
  s += `<rect x="${aX}" y="${aY}" width="${aW}" height="${aH}" rx="11"
          fill="rgba(255,255,255,${(0.026 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* erişim çizgisi: sol yarıda canlı, kesinti noktasından sonra düz */
  const eY = aY + 48, e0 = aX + 14, e1 = aX + aW - 14;
  const kesX = aX + 118;
  let d = `M${e0} ${eY}`;
  for (let i = 1; i <= 26; i++) {
    const x = e0 + (e1 - e0) * (i / 26);
    let y = eY;
    if (x < kesX) {
      y = eY - 9 * Math.sin(2 * Math.PI * (i / 26 * 3 + faz * 2));
    } else {
      /* kesinti: düzleşme, tespit ilerledikçe daha da düzleşir */
      y = eY - 9 * Math.sin(2 * Math.PI * (i / 26 * 3 + faz * 2)) * (1 - tespit) + 16 * tespit;
    }
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  s += `<path d="${d}" fill="none" stroke="rgba(${A},${(0.28 + 0.52 * p).toFixed(3)})"
          stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* dışarıdan gelen erişim denemesi: panelin dışından kesinti noktasına */
  s += `<path d="M${aX + aW - 6} ${aY + 12} L${kesX + 8} ${eY - 12}" fill="none"
          stroke="rgba(255,255,255,${(0.10 + 0.52 * tespit).toFixed(3)})" stroke-width="1.8"
          stroke-dasharray="6 5" stroke-dashoffset="${(-faz * 11 * 4).toFixed(1)}"/>`;
  s += `<path d="M${kesX + 16} ${eY - 20} L${kesX + 5} ${eY - 9} L${kesX + 17} ${eY - 7} Z"
          fill="rgba(255,255,255,${(0.10 + 0.60 * tespit).toFixed(3)})"/>`;
  /* tespit halkası — genişleyip sönüyor, sönerken sarmalandığı için dikişsiz */
  const hf = (faz * 4) % 1;
  s += `<circle cx="${kesX}" cy="${eY}" r="${(5 + 20 * hf).toFixed(1)}" fill="none"
          stroke="rgba(${A},${(0.75 * (1 - hf) * tespit).toFixed(3)})" stroke-width="2"/>`;
  s += `<circle cx="${kesX}" cy="${eY}" r="5"
          fill="rgba(${A},${(0.20 + 0.70 * tespit).toFixed(3)})"/>`;

  /* ---- B · BİLDİRİM ANINDA İLETİLİR --------------------------------- */
  const bY = DY + 112;
  const bx0 = bx + 30, bx1 = bx + 132;
  const bcx = bx0 + (bx1 - bx0) * bildirimR;           // KONUM: ham rampa
  const ca2 = (0.20 * p + 0.62 * bildirim).toFixed(3);
  s += `<path d="M${bx0 + 34} ${bY + 15} H${bx1 + 40}" fill="none"
          stroke="rgba(${A},${(0.08 * p + 0.30 * bildirim).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="5 6" stroke-dashoffset="${(-faz * 11 * 3).toFixed(1)}"/>`;
  s += `<rect x="${bcx.toFixed(1)}" y="${bY}" width="76" height="30" rx="15"
          fill="rgba(255,255,255,${(0.030 * p + 0.055 * bildirim).toFixed(3)})"
          stroke="rgba(${A},${(0.14 * p + 0.56 * bildirim).toFixed(3)})" stroke-width="1.5"/>`;
  /* çan — marka değil, genel bildirim işareti */
  const cx2 = bcx + 21, cy2 = bY + 15;
  s += `<path d="M${cx2 - 8} ${cy2 + 5} V${cy2 - 1} a8 8 0 0 1 16 0 V${cy2 + 5} l3 4 h-22 Z"
          fill="none" stroke="rgba(${A},${ca2})" stroke-width="1.6" stroke-linejoin="round"/>`;
  s += `<path d="M${cx2 - 3} ${cy2 + 9} a3 3 0 0 0 6 0" fill="none"
          stroke="rgba(${A},${ca2})" stroke-width="1.6" stroke-linecap="round"/>`;
  /* iletildi: iki kısa çizgi */
  [0, 1].forEach((k) => {
    s += `<rect x="${bcx + 38}" y="${bY + 9 + k * 9}" width="${28 - k * 9}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 * p + 0.40 * bildirim).toFixed(3)})"/>`;
  });

  /* ---- C · KAYNAK BELİRLENİR ----------------------------------------
     ÖLÇÜ NOTU: bu vuruş akan borunun ışık darbesinin tam üstünde duruyor
     (durak canlıyken darbe panel içi 123, 204'te). İlk sürümde katmanlar
     ince konturlu ve düşük alfalıydı; önizlemede darbe hepsini yutmuştu.
     reklam-filmi'nin aynı bantta ayakta kalan öğeleri DOLGULU ve kalın —
     aynısı yapıldı: katmanlar p'ye bağlı taban dolguya kavuştu, kontur
     kalınlaştı, nişangâhın da p'ye bağlı bir taban parlaklığı var. */
  const lY = DY + 158, lX = bx + 34, lW = 158, lH = 17;
  const nY = lY + 8.5 + kaynakR * 42;                    // KONUM: ham rampa
  for (let j = 0; j < 3; j++) {
    const yy = lY + j * 21;
    const yak = kis01(1 - Math.abs(nY - (yy + 8.5)) / 13) * kaynak;
    s += `<rect x="${lX}" y="${yy}" width="${lW}" height="${lH}" rx="8.5"
            fill="rgba(255,255,255,${(0.045 + 0.030 * p + 0.075 * yak).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.16 * p + 0.56 * yak).toFixed(3)})" stroke-width="1.7"/>`;
    s += `<rect x="${lX + 13}" y="${yy + 6}" width="${62 + j * 24}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.16 + 0.30 * p + 0.34 * yak).toFixed(3)})"/>`;
  }
  const nX = lX + lW - 25;
  const na = (0.14 * p + 0.72 * kaynak).toFixed(3);
  s += `<circle cx="${nX}" cy="${nY.toFixed(1)}" r="12" fill="none"
          stroke="rgba(${A},${na})" stroke-width="2.6"/>`;
  s += `<circle cx="${nX}" cy="${nY.toFixed(1)}" r="2.6" fill="rgba(${A},${na})"/>`;
  s += `<path d="M${nX - 19} ${nY.toFixed(1)} h9 M${nX + 10} ${nY.toFixed(1)} h9
          M${nX} ${(nY - 19).toFixed(1)} v9 M${nX} ${(nY + 10).toFixed(1)} v9"
          stroke="rgba(${A},${na})" stroke-width="2.4" stroke-linecap="round"/>`;

  /* ---- D · GÜVENLİ KOPYAYA DÖNÜŞ, ERİŞİM YENİDEN --------------------- */
  const dY2 = DY + 238, dH2 = 66;
  const kpX = bx + 26, stX = bx + 158, dW2 = 62;
  /* güvenli kopya: üst üste iki kart */
  s += `<rect x="${kpX + 8}" y="${dY2 - 6}" width="${dW2}" height="${dH2}" rx="9"
          fill="rgba(255,255,255,.030)"
          stroke="rgba(255,255,255,${(0.12 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<rect x="${kpX}" y="${dY2}" width="${dW2}" height="${dH2}" rx="9"
          fill="rgba(255,255,255,${(0.034 + 0.040 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.50 * geri).toFixed(3)})" stroke-width="1.5"/>`;
  [0, 1, 2].forEach((k) => {
    s += `<rect x="${kpX + 12}" y="${dY2 + 17 + k * 13}" width="${38 - k * 8}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.12 + 0.24 * p).toFixed(3)})"/>`;
  });
  /* dönüş yayı: kopyadan siteye */
  const yay = `M${kpX + dW2 + 4} ${dY2 + 32} C${kpX + dW2 + 34} ${dY2 - 4}
               ${stX - 34} ${dY2 - 4} ${stX - 4} ${dY2 + 32}`;
  s += `<path d="${yay}" fill="none" stroke="rgba(${A},${(0.12 * p).toFixed(3)})" stroke-width="2.2"/>`;
  s += `<path d="${yay}" fill="none" stroke="rgba(${A},${(0.30 * p + 0.60 * geri).toFixed(3)})"
          stroke-width="2.4" stroke-linecap="round"
          stroke-dasharray="150" stroke-dashoffset="${(150 * (1 - geriR)).toFixed(1)}"/>`;
  s += `<path d="M${stX - 12} ${dY2 + 24} L${stX - 2} ${dY2 + 34} L${stX - 13} ${dY2 + 36} Z"
          fill="rgba(${A},${(0.10 * p + 0.72 * geri).toFixed(3)})"/>`;
  /* erişimi geri gelen site */
  s += `<rect x="${stX}" y="${dY2}" width="${dW2}" height="${dH2}" rx="9"
          fill="rgba(255,255,255,${(0.034 + 0.040 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.16 + 0.54 * geri).toFixed(3)})" stroke-width="1.5"/>`;
  s += `<rect x="${stX + 12}" y="${dY2 + 14}" width="38" height="6" rx="3"
          fill="rgba(255,255,255,${(0.12 + 0.26 * p).toFixed(3)})"/>`;
  /* erişim çizgisi soldan sağa yeniden doluyor */
  let d2 = '';
  const gN = 18, gX = stX + 10, gW2 = 42, gY2 = dY2 + 44;
  for (let i = 0; i <= gN; i++) {
    const x = gX + gW2 * (i / gN);
    const y = gY2 - 7 * Math.sin(2 * Math.PI * (i / gN * 2 + faz * 2));
    d2 += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  s += `<path d="${d2}" fill="none" stroke="rgba(255,255,255,${(0.06 * p).toFixed(3)})" stroke-width="2"/>`;
  s += `<path d="${d2}" fill="none" stroke="rgba(${A},${(0.25 * p + 0.62 * geri).toFixed(3)})"
          stroke-width="2.2" stroke-linecap="round"
          stroke-dasharray="110" stroke-dashoffset="${(110 * (1 - geriR)).toFixed(1)}"/>`;
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
