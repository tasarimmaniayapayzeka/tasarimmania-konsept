/* SAHNE — web / grafik-tasarim
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Kimlik Kılavuzunun İçeriği
 *      "Teslim edilen kılavuz; logo varyasyonları, renk kodları, tipografi
 *       hiyerarşisi, görsel dil örnekleri ve doğru-yanlış kullanım
 *       karşılaştırmalarını bir arada sunar. Bu doküman, marka ile çalışan
 *       her tedarikçi için ortak referans olur."
 *   02 Geri Bildirim ve Onay Akışı
 *      "Konsept paylaşımının ardından geri bildirimler tek noktadan toplanır
 *       ve revizyonlar bu doğrultuda uygulanır. Onay akışı, farklı paydaşların
 *       görüşünü tek dosya üzerinde birleştirecek şekilde kurgulanır."
 *   03 Teslim Edilen Dosya Paketi
 *      "vektörel kaynak dosyalar, baskıya hazır sürümler, sosyal medya profil
 *       görselleri ve düzenlenebilir şablon katmanları birlikte teslim edilir.
 *       Ayrıca dosya adlandırma standardı da paylaşılır."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 açık kılavuz sayfası; okuma vurgusu bölümler üzerinde gezinir
 *      (logo varyasyonları → doğru-yanlış kullanım → tipografi hiyerarşisi
 *      → renk kodları), bölümler vurgunun altındayken canlanır;
 *   02 tek dosya üstte durur, üç paydaş altta; her paydaşın görüşü noktalar
 *      hâlinde TEK toplama düğümüne akar, düğümden tek gövdeyle dosyaya
 *      çıkar, dosyada revizyon çemberi döner ve onay şeridi dolar;
 *   03 teslim paketi bir kutu olarak durur; başlığında dosya adlandırma
 *      standardının parçaları sırayla aydınlanır, içinde dört teslim türü
 *      (vektörel kaynak, baskıya hazır sürüm, sosyal medya profil görseli,
 *      düzenlenebilir şablon katmanları) sırayla yerine oturur.
 * Beş saniyede bir tur, dikişsiz döngü: okuma vurgusu ve revizyon çemberi
 * TAM tur/periyot yapar, akan noktalar tam sayı frekanslıdır.
 *
 * YASAK (bu sayfaya özel, yasaklar.md "grafik-tasarim"):
 *  - "Logo varyasyonları" SOYUT YER TUTUCU işaretle çizildi: halka + üçgen.
 *    Bu form sayfanın KENDİ .akis figüründen alındı; sayfa figcaption'da
 *    "TasarımMania logosu veya gerçek bir müşteri logosu değildir" diyor.
 *    Gerçek ya da gerçeğe benzeyen hiçbir marka işareti yok.
 *  - Doğru-yanlış karşılaştırması gerçek bir markayı İMA ETMİYOR: iki kutuda
 *    da AYNI yer tutucu işaret var, "yanlış" olan yalnızca orantısı bozularak
 *    (yatayda gerilmiş) gösteriliyor. Bu, sayfanın .akis figürüyle de aynı
 *    yönde: orada da "Doğru" aksanlı, "Yanlış" sönük çiziliyor.
 *    DİKKAT — buradaki eşitsizlik BİLEREKTİR ve kural 8'in kapsamında
 *    değildir: sayfa bu ikisini "iki geçerli yaklaşım" saymıyor, biri doğru
 *    biri yanlış kullanım diyor. (Kural 8'in konusu urun-videosu'ndaki
 *    "yumuşak VEYA sert ışık" gibi eşit seçeneklerdir.)
 *  - Dosya sayısı/boyutu YAZILMADI. Dört kutu, sayfanın kendi cümlesinde
 *    sayılan dört teslim türüdür; üstlerinde hiçbir rakam yok.
 *  - Rakam yok (durak numaraları hariç), logo yok, insan yüzü yok:
 *    paydaşlar yüzsüz siluet (boş daire baş + omuz kavsi).
 *
 * KARDEŞ FİGÜRLE ÇELİŞME DENETİMİ (.akis, aynı sayfada):
 *  - .akis üç durağı: Logo → Kimlik kılavuzu → Şablonlar. Bu video ise .akv'nin
 *    üç adımını çiziyor; ikisi farklı listeler, biri diğerini tekrar etmiyor.
 *  - SIRA AYNI DEĞİL, ölçüldü — bunu yanlış yazmayın:
 *    .akis 02 kutusunda bölümler yukarıdan aşağı  renk paleti (y64) →
 *    tipografi (y180) → kullanım kuralları (y284) diye diziliyor.
 *    Buradaki kılavuz sayfasında sıra  logo varyasyonları (DY+32) →
 *    doğru-yanlış kullanım (DY+98) → tipografi (DY+170) → renk kodları
 *    (DY+256); yani palet ile kurallar uçlarda YER DEĞİŞTİRMİŞ durumda.
 *    Bu bir çelişki DEĞİL: kılavuzun bölüm dizilişi ne sayfa metninde ne
 *    .akis'te iddia ediliyor, sıra bir bilgi taşımıyor. Sırayı .akis'e
 *    uydurmak için bu bölümleri YENİDEN DİZMEYİN — buradaki sıra okuma
 *    vurgusunun 157±99 aralığına ve bölüm merkezlerine göre kurulu.
 *  - ÖRTÜŞEN şey ayrım ve sayım: renk ikisinde de DÖRT daire; doğru-yanlış
 *    ikisinde de Doğru(aksan) / Yanlış(sönük); tipografi ikisinde de
 *    kademeli — orada "Aa" + iki çubuk, burada dört çubuk. Harf örneği
 *    videoya KONMADI: 28 px altındaki yazı mobilde okunmuyor (ölçüldü).
 *  - .akis'te sosyal medya KARE bir post kartı. Buradaki "sosyal medya profil
 *    görseli" kare tuval + içinde DAİRESEL güvenli kırpım kılavuzu olarak
 *    çizildi; ikisi aynı şey değil, biri postu biri profili anlatıyor.
 *  - .akis'te geçen CMYK/PDF/RGB etiketleri buraya YAZILMADI (video yalnız üç
 *    durak etiketi taşır).
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın tuval üzerindeki yeri — video modülündeki sahnelerle birebir
   aynı ızgara, böylece bütün alt sayfalar aynı ritmi paylaşıyor. Üstteki
   118 piksel sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 KILAVUZ' },
  { x: 437, fazMerkez: 0.50, etiket: '02 ONAY AKIŞI' },
  { x: 812, fazMerkez: 0.80, etiket: '03 DOSYA PAKETİ' },
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
    s += (i === 0 ? kilavuz(d.x, p, faz, a)
       : i === 1 ? onayAkisi(d.x, p, faz, a)
       : paket(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* SOYUT YER TUTUCU İŞARET — halka + üçgen.
   Marka işareti DEĞİL. Oranları sayfanın kendi .akis figüründeki temsilî
   formdan alındı (orada r=34 halkaya karşı üçgen 0.65r / -0.76r / 1.59r /
   0.82r / -0.29r noktalarında). Sayfa bu formu figcaption'da "TasarımMania
   logosu veya gerçek bir müşteri logosu değildir" diye tanımlıyor. */
function isaret(cx, cy, r, kontur, kalin, dolgu) {
  return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="none"
            stroke="${kontur}" stroke-width="${kalin}"/>`
    + `<path d="M${(cx + r * 0.65).toFixed(1)} ${(cy - r * 0.76).toFixed(1)}`
    + ` L${(cx + r * 1.59).toFixed(1)} ${(cy + r * 0.82).toFixed(1)}`
    + ` H${(cx - r * 0.29).toFixed(1)} Z" fill="${dolgu}"/>`;
}

/* ── 01 · KİMLİK KILAVUZUNUN İÇERİĞİ ────────────────────────────────────
   Açık kılavuz sayfası. Sayfanın saydığı içerik sırayla bölümler hâlinde
   duruyor: logo varyasyonları, doğru-yanlış kullanım, tipografi hiyerarşisi,
   renk kodları. Okuma vurgusu (yatay bant) bölümlerin üstünde gezinir —
   "her tedarikçi için ortak referans": kılavuza sürekli bakılıyor.
   Vurgunun konumu sin ile, tam sayı frekansta: dikişsiz. */
function kilavuz(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const gx = bx + 20, gw = 206, gy = DY + 16, gh = 292;
  const cx0 = bx + 42, cw = 170;
  let s = '';

  /* arkadaki ikinci sayfa — kılavuz çok sayfalı bir doküman */
  s += `<rect x="${gx + 10}" y="${gy - 8}" width="${gw}" height="${gh}" rx="11"
          fill="rgba(255,255,255,.024)" stroke="rgba(255,255,255,.06)" stroke-width="1.1"/>`;
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="11"
          fill="rgba(255,255,255,.050)"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* cilt dikişi */
  s += `<line x1="${bx + 32}" y1="${gy + 12}" x2="${bx + 32}" y2="${gy + gh - 12}"
          stroke="rgba(255,255,255,.085)" stroke-width="1" stroke-dasharray="4 7"/>`;

  /* --- okuma vurgusu ---------------------------------------------------
     Bölüm merkezleri (DY'ye göre): 58 · 127 · 197 · 256.
     Bant 157 ± 99 arasında gider gelir; frekans 2 (tam sayı → dikişsiz),
     kayma 0.60, böylece durak canlıyken (faz 0.01–0.39) bant aralığın
     TAMAMINI tarar — tek yönlü bir süpürmede alt iki bölüm hiç
     aydınlanmıyordu. */
  const hy = DY + 157 + 99 * Math.sin(2 * Math.PI * (faz * 2 + 0.60));
  const oku = (mrk) => kis01(1 - Math.abs(hy - (DY + mrk)) / 62);
  s += `<rect x="${gx + 6}" y="${(hy - 24).toFixed(1)}" width="${gw - 12}" height="48" rx="9"
          fill="rgba(${A},${(0.045 + 0.065 * p).toFixed(3)})"/>`;
  s += `<line x1="${gx + 6}" y1="${(hy + 24).toFixed(1)}" x2="${gx + gw - 6}" y2="${(hy + 24).toFixed(1)}"
          stroke="rgba(${A},${(0.14 + 0.36 * p).toFixed(3)})" stroke-width="1.4"/>`;

  /* bölüm ayraçları */
  [90, 162, 232].forEach((y) => {
    s += `<line x1="${cx0}" y1="${DY + y}" x2="${cx0 + cw}" y2="${DY + y}"
            stroke="rgba(255,255,255,.07)" stroke-width="1"/>`;
  });

  /* --- BÖLÜM 1 · logo varyasyonları ------------------------------------
     Üç kilitlenme: yatay, dikey, yalnız simge. Hepsinde AYNI soyut yer
     tutucu işaret; gerçek bir marka değil. */
  const o1 = oku(58), g1 = kis01(p / 0.42);
  const vy = DY + 32, vw = 52;
  for (let i = 0; i < 3; i++) {
    const vx = cx0 + i * 59;
    const c = (0.11 + 0.16 * g1 + 0.30 * o1 * g1).toFixed(3);
    const d = `rgba(${A},${(0.30 + 0.22 * g1 + 0.36 * o1 * g1).toFixed(3)})`;
    s += `<rect x="${vx}" y="${vy}" width="${vw}" height="52" rx="7"
            fill="rgba(255,255,255,${(0.026 + 0.040 * o1 * g1).toFixed(3)})"
            stroke="rgba(255,255,255,${c})" stroke-width="1.2"/>`;
    const bar = `rgba(255,255,255,${(0.16 + 0.14 * g1 + 0.22 * o1 * g1).toFixed(3)})`;
    if (i === 0) {                    /* yatay kilitlenme */
      s += isaret(vx + 13, vy + 26, 6, d, 2.2, d);
      s += `<rect x="${vx + 26}" y="${vy + 21}" width="19" height="5" rx="2.5" fill="${bar}"/>`;
      s += `<rect x="${vx + 26}" y="${vy + 30}" width="13" height="4" rx="2" fill="${bar}" opacity=".7"/>`;
    } else if (i === 1) {             /* dikey kilitlenme */
      s += isaret(vx + 23, vy + 17, 6, d, 2.2, d);
      s += `<rect x="${vx + 14}" y="${vy + 30}" width="24" height="5" rx="2.5" fill="${bar}"/>`;
      s += `<rect x="${vx + 19}" y="${vy + 39}" width="14" height="4" rx="2" fill="${bar}" opacity=".7"/>`;
    } else {                          /* yalnız simge */
      s += isaret(vx + 21, vy + 26, 10, d, 2.6, d);
    }
  }

  /* --- BÖLÜM 2 · doğru-yanlış kullanım karşılaştırması ------------------
     İkisinde de AYNI yer tutucu işaret. Sağdaki yalnızca ORANI BOZULARAK
     (yatayda gerilmiş) çiziliyor — kural ihlalinin kendisi bu.
     Buradaki aksan farkı bilerek: sayfa bunlara "iki geçerli yaklaşım"
     demiyor, biri doğru biri yanlış kullanım diyor. */
  const o2 = oku(127), g2 = kis01((p - 0.10) / 0.42);
  const ky = DY + 98, kw = 81, kh = 58;
  for (let i = 0; i < 2; i++) {
    const kx = cx0 + i * 89;
    const dogru = i === 0;
    const kont = dogru
      ? `rgba(${A},${(0.24 + 0.20 * g2 + 0.30 * o2 * g2).toFixed(3)})`
      : `rgba(255,255,255,${(0.10 + 0.09 * g2 + 0.13 * o2 * g2).toFixed(3)})`;
    s += `<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="9"
            fill="rgba(255,255,255,${(0.024 + 0.032 * o2 * g2).toFixed(3)})"
            stroke="${kont}" stroke-width="1.3"/>`;
    const mcx = kx + 40, mcy = ky + 22;
    const mr = dogru
      ? `rgba(${A},${(0.34 + 0.24 * g2 + 0.30 * o2 * g2).toFixed(3)})`
      : `rgba(255,255,255,${(0.16 + 0.14 * g2 + 0.16 * o2 * g2).toFixed(3)})`;
    if (dogru) {
      s += isaret(mcx, mcy, 10, mr, 2.6, mr);
    } else {
      s += `<g transform="translate(${mcx} ${mcy}) scale(1.55 0.62) translate(${-mcx} ${-mcy})">`
        + isaret(mcx, mcy, 10, mr, 2.6, mr) + `</g>`;
    }
    const isar = kx + 40, isay = ky + 44;
    if (dogru) {
      s += `<path d="M${isar - 8} ${isay} L${isar - 2.5} ${isay + 6} L${isar + 8.5} ${isay - 6.5}"
              fill="none" stroke="rgba(${A},${(0.36 + 0.26 * g2 + 0.30 * o2 * g2).toFixed(3)})"
              stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      s += `<path d="M${isar - 7} ${isay - 7} L${isar + 7} ${isay + 7}
              M${isar + 7} ${isay - 7} L${isar - 7} ${isay + 7}"
              fill="none" stroke="rgba(255,255,255,${(0.18 + 0.14 * g2 + 0.16 * o2 * g2).toFixed(3)})"
              stroke-width="2.4" stroke-linecap="round"/>`;
    }
  }

  /* --- BÖLÜM 3 · tipografi hiyerarşisi ---------------------------------
     Dört kademe: büyükten küçüğe boy ve ağırlık düşüyor. Harf örneği
     YAZILMADI — videoda yalnız üç durak etiketi metin olarak duruyor,
     28 px altındaki her yazı mobilde okunmuyor (ölçüldü). */
  const o3 = oku(197), g3 = kis01((p - 0.18) / 0.42);
  /* ÖNİZLEME DÜZELTMESİ: dört kademe de beyazken bölüm "dört gri satır"
     gibi okunuyordu, hiyerarşi görünmüyordu. En üst kademe aksana çevrildi
     (başlık), alttakiler giderek soluyor — kademe farkı artık boyla birlikte
     RENKLE de taşınıyor. */
  const kademe = [[112, 15, 0.34, true], [84, 10, 0.26, false],
    [150, 6, 0.17, false], [128, 6, 0.14, false]];
  let ty = DY + 170;
  kademe.forEach(([w, h, alfa, ust], i) => {
    const gk = kis01((g3 - i * 0.10) / 0.55);
    const yog = (alfa * (0.30 + 0.70 * gk) * (0.62 + 0.38 * o3)).toFixed(3);
    s += `<rect x="${cx0}" y="${ty}" width="${w}" height="${h}" rx="${(h / 2).toFixed(1)}"
            fill="${ust ? `rgba(${A},${(Number(yog) * 2.1).toFixed(3)})` : `rgba(255,255,255,${yog})`}"/>`;
    ty += h + (i === 0 ? 7 : 6);
  });

  /* --- BÖLÜM 4 · renk kodları ------------------------------------------
     Dört alan; her birinin altında kodunu temsil eden kısa çubuk.
     Kodun kendisi YAZILMADI (rakam yasak). */
  const o4 = oku(256), g4 = kis01((p - 0.26) / 0.42);
  const renk = [`rgba(${A},.85)`, a.aksan.derin, 'rgba(255,255,255,.30)', 'rgba(255,255,255,.12)'];
  renk.forEach((r, i) => {
    const sx = cx0 + 22 + i * 42;
    const gk = kis01((g4 - i * 0.09) / 0.55);
    s += `<circle cx="${sx}" cy="${DY + 256}" r="14" fill="${r}"
            opacity="${(0.22 + 0.78 * gk).toFixed(3)}"
            stroke="rgba(255,255,255,${(0.10 + 0.12 * o4).toFixed(3)})" stroke-width="1"/>`;
    s += `<rect x="${sx - 11}" y="${DY + 276}" width="22" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.18 * gk * (0.55 + 0.45 * o4)).toFixed(3)})"/>`;
  });
  return s;
}

/* ── 02 · GERİ BİLDİRİM VE ONAY AKIŞI ───────────────────────────────────
   Üstte TEK dosya (konsept), altta üç paydaş — yüzsüz siluet. Her paydaşın
   altında paylaşılan konseptin kopyası duruyor ("konsept paylaşımının
   ardından"). Görüşler nokta nokta yukarı akıp TEK toplama düğümünde
   birleşir ("geri bildirimler tek noktadan toplanır"), düğümden tek gövdeyle
   dosyaya çıkar ("tek dosya üzerinde birleştirecek şekilde"). Dosyada
   revizyon çemberi tam tur döner ve bir satır yeniden yazılır ("revizyonlar
   bu doğrultuda uygulanır"), sonunda onay şeridi dolar. */
function onayAkisi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  const dx = bx + 38, dw = 170, dy = DY + 18, dh = 114;
  const nx = bx + 123, ny = DY + 186, nr = 13;
  const payX = [bx + 52, bx + 123, bx + 194];

  /* --- paydaşların elindeki konsept kopyası ---------------------------- */
  payX.forEach((sx, i) => {
    const gk = kis01((p - i * 0.09) / 0.42);
    s += `<rect x="${sx - 21}" y="${DY + 284}" width="42" height="22" rx="6"
            fill="rgba(255,255,255,${(0.030 + 0.030 * gk).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * gk).toFixed(3)})" stroke-width="1.1"/>`;
    s += isaret(sx - 11, DY + 295, 4.2,
      `rgba(${A},${(0.26 + 0.34 * gk).toFixed(3)})`, 1.6,
      `rgba(${A},${(0.26 + 0.34 * gk).toFixed(3)})`);
    s += `<rect x="${sx + 1}" y="${DY + 291}" width="16" height="4" rx="2"
            fill="rgba(255,255,255,${(0.12 + 0.16 * gk).toFixed(3)})"/>`;
    s += `<rect x="${sx + 1}" y="${DY + 298}" width="11" height="3" rx="1.5"
            fill="rgba(255,255,255,${(0.09 + 0.12 * gk).toFixed(3)})"/>`;
  });

  /* --- paydaş siluetleri: YÜZSÜZ (boş daire baş + omuz kavsi) ---------- */
  payX.forEach((sx, i) => {
    const gk = kis01((p - i * 0.09) / 0.42);
    const k = (0.12 + 0.20 * gk).toFixed(3);
    s += `<circle cx="${sx}" cy="${DY + 242}" r="10"
            fill="rgba(255,255,255,${(0.055 + 0.055 * gk).toFixed(3)})"
            stroke="rgba(255,255,255,${k})" stroke-width="1.3"/>`;
    s += `<path d="M${sx - 19} ${DY + 278} C${sx - 19} ${DY + 258} ${sx + 19} ${DY + 258} ${sx + 19} ${DY + 278} Z"
            fill="rgba(255,255,255,${(0.050 + 0.050 * gk).toFixed(3)})"
            stroke="rgba(255,255,255,${k})" stroke-width="1.3"/>`;
  });

  /* --- görüş yolları: üç kavis TEK düğümde birleşir -------------------- */
  const yolPay = [
    [[payX[0], DY + 228], [payX[0] + 6, DY + 198], [nx - 11, DY + 193]],
    [[payX[1], DY + 228], [payX[1], DY + 212], [nx, DY + 199]],
    [[payX[2], DY + 228], [payX[2] - 6, DY + 198], [nx + 11, DY + 193]],
  ];
  yolPay.forEach((q) => {
    s += `<path d="M${q[0][0]} ${q[0][1]} Q${q[1][0]} ${q[1][1]} ${q[2][0]} ${q[2][1]}"
            fill="none" stroke="rgba(${A},${(0.10 + 0.24 * p).toFixed(3)})" stroke-width="1.3"/>`;
  });

  /* Akan görüş noktaları. Frekans 2 (tam sayı → dikişsiz); her yolda iki
     nokta yarım periyot arayla. Opaklık sin(πu) ile uçlarda sıfırlanıyor,
     böylece u sarmasında sıçrama GÖRÜNMÜYOR. */
  yolPay.forEach((q, i) => {
    for (let k = 0; k < 2; k++) {
      const u = (faz * 2 + k * 0.5 + i * 0.17) % 1;
      const n = kuadratik(u, q[0], q[1], q[2]);
      const o = Math.sin(Math.PI * u) * p;
      if (o <= 0.02) continue;
      s += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="3.4"
              fill="rgba(${A},${(0.85 * o).toFixed(3)})"/>`;
    }
  });

  /* --- TEK toplama düğümü ---------------------------------------------- */
  s += `<circle cx="${nx}" cy="${ny}" r="${nr}"
          fill="rgba(${A},${(0.10 + 0.20 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})" stroke-width="1.8"/>`;
  s += `<circle cx="${nx}" cy="${ny}" r="4.4" fill="rgba(255,255,255,${(0.30 + 0.55 * p).toFixed(3)})"/>`;

  /* --- düğümden dosyaya tek gövde -------------------------------------- */
  s += `<line x1="${nx}" y1="${ny - nr}" x2="${nx}" y2="${dy + dh}"
          stroke="rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})" stroke-width="2"/>`;
  for (let k = 0; k < 2; k++) {
    const u = (faz * 2 + k * 0.5 + 0.28) % 1;
    const o = Math.sin(Math.PI * u) * p;
    if (o <= 0.02) continue;
    const py = (ny - nr) - u * ((ny - nr) - (dy + dh));
    s += `<circle cx="${nx}" cy="${py.toFixed(1)}" r="3.4" fill="rgba(${A},${(0.85 * o).toFixed(3)})"/>`;
  }

  /* --- TEK dosya -------------------------------------------------------- */
  s += `<rect x="${dx}" y="${dy}" width="${dw}" height="${dh}" rx="10"
          fill="rgba(255,255,255,${(0.038 + 0.032 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.4"/>`;
  s += `<rect x="${dx + 14}" y="${dy + 13}" width="52" height="8" rx="4"
          fill="rgba(${A},${(0.42 + 0.42 * p).toFixed(2)})"/>`;

  /* revizyon çemberi — TAM tur döner, dikişsiz */
  const rcx = dx + dw - 24, rcy = dy + 20, rr = 9;
  s += `<g transform="rotate(${(faz * 360).toFixed(1)} ${rcx} ${rcy})">`;
  s += `<path d="M${rcx + rr} ${rcy} A${rr} ${rr} 0 1 1 ${rcx} ${rcy - rr}"
          fill="none" stroke="rgba(${A},${(0.28 + 0.50 * p).toFixed(3)})" stroke-width="2"
          stroke-linecap="round"/>`;
  s += `<path d="M${rcx - 4.5} ${rcy - rr - 0.5} L${rcx} ${rcy - rr} L${rcx + 1.5} ${rcy - rr + 4.6}"
          fill="none" stroke="rgba(${A},${(0.28 + 0.50 * p).toFixed(3)})" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `</g>`;

  /* konsept görseli + satırlar; ikinci satır revizyonla yeniden yazılıyor */
  s += `<rect x="${dx + 14}" y="${dy + 32}" width="58" height="46" rx="7"
          fill="rgba(255,255,255,.045)"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += isaret(dx + 38, dy + 55, 8, `rgba(${A},${(0.30 + 0.42 * p).toFixed(3)})`, 2.2,
    `rgba(${A},${(0.30 + 0.42 * p).toFixed(3)})`);
  const rev = 0.5 + 0.5 * Math.sin(2 * Math.PI * (faz * 2 + 0.30));
  const satir = [[72, 7, dy + 36, 1], [66, 6, dy + 50, rev], [58, 6, dy + 62, 1]];
  satir.forEach(([w, h, sy, dolu]) => {
    s += `<rect x="${dx + 84}" y="${sy}" width="${w}" height="${h}" rx="${(h / 2).toFixed(1)}"
            fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${dx + 84}" y="${sy}" width="${(w * (0.30 + 0.70 * dolu)).toFixed(1)}" height="${h}" rx="${(h / 2).toFixed(1)}"
            fill="rgba(255,255,255,${(0.16 + 0.26 * p).toFixed(3)})"/>`;
  });
  s += `<rect x="${dx + 14}" y="${dy + 90}" width="60" height="6" rx="3"
          fill="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})"/>`;

  /* onay şeridi — akış sonunda dolar */
  const onay = kis01((p - 0.45) / 0.40);
  const ox = dx + 112, oy = dy + 86, ow = 46, oh = 22;
  s += `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" rx="11"
          fill="rgba(${A},${(0.06 + 0.20 * onay).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.55 * onay).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<path d="M${ox + 10} ${oy + 11} L${ox + 14.5} ${oy + 16} L${ox + 23} ${oy + 6}"
          fill="none" stroke="rgba(255,255,255,${(0.22 + 0.70 * onay).toFixed(3)})"
          stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="24" stroke-dashoffset="${(24 * (1 - onay)).toFixed(1)}"/>`;
  s += `<rect x="${ox + 28}" y="${oy + 8}" width="10" height="6" rx="3"
          fill="rgba(255,255,255,${(0.12 + 0.40 * onay).toFixed(3)})"/>`;
  return s;
}

/* ── 03 · TESLİM EDİLEN DOSYA PAKETİ ────────────────────────────────────
   Tek paket kutusu. Başlığında dosya adlandırma standardı: üç parça, arada
   ayraç — parçalar sırayla aydınlanır (standart okunuyor). İçinde sayfanın
   saydığı dört teslim türü sırayla yerine oturur:
     vektörel kaynak      · düğüm ve tutamaçlı eğri
     baskıya hazır sürüm  · kesim işaretli ve taşma paylı sayfa
     sosyal medya profili · kare tuval + dairesel güvenli kırpım kılavuzu
     şablon katmanları    · üst üste binen katmanlar, üsttekinde tutamaçlar
   Adet YAZILMADI; dört kutu sayfanın kendi cümlesinde sayılan dört türdür. */
function paket(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const px = bx + 16, py = DY + 14, pw = 214, ph = 288;
  let s = '';

  /* --- paket kutusu ----------------------------------------------------- */
  s += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="14"
          fill="rgba(255,255,255,${(0.026 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.4"/>`;
  s += `<line x1="${px}" y1="${py + 46}" x2="${px + pw}" y2="${py + 46}"
          stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.2"/>`;

  /* --- dosya adlandırma standardı: parça · ayraç · parça · ayraç · parça -
     Frekans 2 (tam sayı → dikişsiz) bir süpürme parçaları sırayla okur.
     Parçaların içine hiçbir yazı/rakam konmadı. */
  const parca = [46, 30, 38];
  const u = (faz * 2) % 1;
  let ax = px + 33;
  parca.forEach((w, i) => {
    const sec = kis01(1 - Math.abs(u * 3 - i - 0.5) * 1.7) * p;
    s += `<rect x="${ax}" y="${py + 18}" width="${w}" height="11" rx="5.5"
            fill="rgba(${A},${(0.16 + 0.20 * p + 0.44 * sec).toFixed(3)})"/>`;
    ax += w;
    if (i < 2) {
      s += `<rect x="${ax + 5}" y="${py + 22.5}" width="7" height="2.6" rx="1.3"
              fill="rgba(255,255,255,${(0.16 + 0.22 * p).toFixed(3)})"/>`;
      ax += 17;
    }
  });

  /* --- dört teslim türü ------------------------------------------------- */
  /* ÖNİZLEME DÜZELTMESİ: ilk sürümde satır 1 py+48'deydi ve başlık ayracı
     py+46'daydı — kutuların üst kenarı ayraca yapışık duruyordu. Satırlar
     4 px indirildi, yükseklik 106'ya çekildi; alt boşluk 16 px kaldı. */
  const tw = 93, th = 106;
  const yer = [[px + 10, py + 52], [px + 111, py + 52], [px + 10, py + 166], [px + 111, py + 166]];
  yer.forEach((k, i) => {
    const gk = kis01((p - i * 0.09) / 0.42);
    /* hafif salınım — faz cinsinden periyodik, tek seferlik hareket değil */
    const dy = 2.4 * Math.sin(2 * Math.PI * (faz * 2 + i * 0.25));
    const x = k[0], y = k[1] + dy;
    const kk = `rgba(255,255,255,${(0.16 + 0.22 * gk).toFixed(3)})`;
    const ak = `rgba(${A},${(0.26 + 0.42 * gk).toFixed(3)})`;
    s += `<g opacity="${(0.25 + 0.75 * gk).toFixed(3)}">`;
    s += `<rect x="${x}" y="${y.toFixed(1)}" width="${tw}" height="${th}" rx="9"
            fill="rgba(255,255,255,${(0.024 + 0.034 * gk).toFixed(3)})"
            stroke="rgba(${A},${(0.13 + 0.32 * gk).toFixed(3)})" stroke-width="1.2"/>`;

    if (i === 0) {
      /* vektörel kaynak dosya: düğümler + tutamaçlar */
      s += `<path d="M${x + 16} ${y + 78} C${x + 26} ${y + 34} ${x + 58} ${y + 96} ${x + 76} ${y + 40}"
              fill="none" stroke="${ak}" stroke-width="2.2" stroke-linecap="round"/>`;
      s += `<path d="M${x + 16} ${y + 78} L${x + 26} ${y + 34} M${x + 76} ${y + 40} L${x + 58} ${y + 96}"
              stroke="${kk}" stroke-width="1" stroke-dasharray="3 4"/>`;
      [[x + 26, y + 34], [x + 58, y + 96]].forEach((h) => {
        s += `<circle cx="${h[0]}" cy="${h[1].toFixed(1)}" r="3.2" fill="${kk}"/>`;
      });
      [[x + 16, y + 78], [x + 43, y + 63.5], [x + 76, y + 40]].forEach((d) => {
        s += `<rect x="${d[0] - 4}" y="${(d[1] - 4).toFixed(1)}" width="8" height="8" rx="1.5"
                fill="rgba(14,17,24,.9)" stroke="${ak}" stroke-width="1.6"/>`;
      });
    } else if (i === 1) {
      /* baskıya hazır sürüm: taşma payı + kesim işaretleri */
      s += `<rect x="${x + 20}" y="${y + 24}" width="54" height="64" rx="2"
              fill="none" stroke="${kk}" stroke-width="1" stroke-dasharray="4 4"/>`;
      s += `<rect x="${x + 26}" y="${y + 30}" width="42" height="52" rx="2"
              fill="rgba(255,255,255,${(0.030 + 0.030 * gk).toFixed(3)})"
              stroke="${ak}" stroke-width="1.3"/>`;
      s += `<rect x="${x + 33}" y="${y + 40}" width="28" height="6" rx="3" fill="${kk}"/>`;
      s += `<rect x="${x + 33}" y="${y + 52}" width="20" height="4" rx="2" fill="${kk}" opacity=".75"/>`;
      s += `<rect x="${x + 33}" y="${y + 61}" width="24" height="4" rx="2" fill="${kk}" opacity=".6"/>`;
      s += kesimIsareti(x + 20, y + 24, 54, 64, 9, ak);
    } else if (i === 2) {
      /* sosyal medya profil görseli: kare tuval + dairesel güvenli kırpım */
      s += `<rect x="${x + 19}" y="${y + 25}" width="56" height="56" rx="8"
              fill="rgba(255,255,255,${(0.030 + 0.030 * gk).toFixed(3)})"
              stroke="${kk}" stroke-width="1.2"/>`;
      s += `<circle cx="${x + 47}" cy="${(y + 53).toFixed(1)}" r="24" fill="none"
              stroke="${ak}" stroke-width="1.3" stroke-dasharray="5 5"/>`;
      s += isaret(x + 43, y + 53, 10, ak, 2.6, ak);
    } else {
      /* düzenlenebilir şablon katmanları: üst üste binen katmanlar */
      s += `<rect x="${x + 13}" y="${y + 48}" width="54" height="40" rx="6" fill="rgba(14,17,24,.55)"
              stroke="${kk}" stroke-width="1.1" opacity=".55"/>`;
      s += `<rect x="${x + 20}" y="${y + 40}" width="54" height="40" rx="6" fill="rgba(14,17,24,.7)"
              stroke="${kk}" stroke-width="1.1" opacity=".8"/>`;
      s += `<rect x="${x + 27}" y="${y + 32}" width="54" height="40" rx="6"
              fill="rgba(255,255,255,${(0.040 + 0.036 * gk).toFixed(3)})"
              stroke="${ak}" stroke-width="1.4"/>`;
      s += `<rect x="${x + 35}" y="${y + 42}" width="30" height="5" rx="2.5" fill="${kk}"/>`;
      s += `<rect x="${x + 35}" y="${y + 53}" width="20" height="4" rx="2" fill="${kk}" opacity=".7"/>`;
      /* düzenlenebilirlik: üst katmanın köşe tutamaçları */
      [[x + 27, y + 32], [x + 81, y + 32], [x + 27, y + 72], [x + 81, y + 72]].forEach((h) => {
        s += `<rect x="${h[0] - 3}" y="${(h[1] - 3).toFixed(1)}" width="6" height="6" rx="1"
                fill="rgba(14,17,24,.9)" stroke="${ak}" stroke-width="1.5"/>`;
      });
    }
    s += `</g>`;
  });
  return s;
}

/* kuadratik Bézier üzerinde nokta — akan görüş noktalarının konumu */
function kuadratik(t, p0, p1, p2) {
  const u = 1 - t;
  return {
    x: u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    y: u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  };
}

/* kesim (kırpma) işaretleri — baskıya hazır sürümün görsel dilbilgisi */
function kesimIsareti(x, y, w, h, u, renk) {
  const d = [
    `M${x - u - 3} ${y} H${x - 3}`, `M${x} ${y - u - 3} V${y - 3}`,
    `M${x + w + 3} ${y} H${x + w + u + 3}`, `M${x + w} ${y - u - 3} V${y - 3}`,
    `M${x - u - 3} ${y + h} H${x - 3}`, `M${x} ${y + h + 3} V${y + h + u + 3}`,
    `M${x + w + 3} ${y + h} H${x + w + u + 3}`, `M${x + w} ${y + h + 3} V${y + h + u + 3}`,
  ].join(' ');
  return `<path d="${d}" fill="none" stroke="${renk}" stroke-width="1.3" stroke-linecap="round"/>`;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
