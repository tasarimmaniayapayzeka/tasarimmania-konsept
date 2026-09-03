/* SAHNE — video-produksiyon / urun-videosu
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Aydınlatma ve Sahne Kurulumu
 *      "yumuşak veya sert ışık kaynakları seçilir; parlak yüzeyli ürünlerde
 *       yansıma kontrolü için polarize filtre ve difüzör kullanılır. Sahne
 *       arka planı ... sade tutulur ve gerekiyorsa markanın kurumsal renk
 *       paletiyle uyumlu hale getirilir."
 *   02 Ürün Yönlendirme ve Prova Çekimi
 *      "ürünün en iyi göründüğü açı ve hareket, kısa bir prova ile belirlenir.
 *       Döner sehpa, yakın plan detay çekimi ve kullanım anı sahneleri
 *       planlanarak ... tek üründen birden fazla kesit üretilebilir."
 *   03 Ses ve Altyazı Entegrasyonu
 *      "Sessiz izlenme ihtimaline karşı önemli bilgiler ekran içi metin veya
 *       altyazı ile desteklenir. Arka plan müziği ve varsa seslendirme ..."
 *
 * FİKİR: reklam-filmi sahnesinin dili korunur — akan cam boru üç durağa
 * uğrar, ışık darbesi boru boyunca yürür, hangi durağın üstündeyse o durak
 * canlanır ve KENDİ işini yapar:
 *   01 iki ışık başı sahneyi yıkar, polarize filtre döner ve ürünün üstündeki
 *      yansıma onunla birlikte sönüp parlar; altta kurumsal renk paleti;
 *   02 döner sehpa dönerken kamera ürünün çevresinde açı arar, aynı üründen
 *      üç kesit sırayla seçilir;
 *   03 ses dalgası zayıflarken altyazı satırları güçlenir — sessiz izlenme
 *      ihtimaline karşı bilgi ekran içi metne taşınır.
 * Beş saniyede bir tur, dikişsiz döngü: polarize filtre TAM tur döner,
 * sehpa TAM tur döner, dalga ve yansıma sin/cos ile faza bağlıdır.
 *
 * YASAK (bu sayfaya özel, ölçülü):
 *  - Sayfa stüdyo çekimi ile işletme mekanında çekimi İKİ GEÇERLİ YAKLAŞIM
 *    sayıyor. Bu ikilik burada HİÇ çizilmiyor (üç durak .akv adımları, o
 *    ayrım orada geçmiyor). Aynı ilke adım 01'in kendi ikiliğine —
 *    "yumuşak VEYA sert ışık" — uygulandı: iki ışık başı AYNI ölçüde (46x38),
 *    AYNI konturda, AYNI p ile aynı anda giriyor; sönük kart, çapraz işaret,
 *    "önerilen" rozeti yok. İkisinin huzmesi de aynı yoğunlukta.
 *  - Pazaryeri oranları (kare/dikey/yatay) bu üç adımda geçmediği için
 *    çizilmedi.
 *  - Logo/platform işareti yok. Rakam yok (durak numaraları hariç).
 *  - İnsan yok — "kullanım anı" kesiti eğik ürün + hareket yayı ile soyut.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın tuval üzerindeki yeri — reklam-filmi ile birebir aynı ızgara,
   böylece modül içindeki sayfalar aynı ritmi paylaşıyor. Üstteki 118 piksel
   sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 SAHNE IŞIĞI' },
  { x: 437, fazMerkez: 0.50, etiket: '02 AÇI PROVASI' },
  { x: 812, fazMerkez: 0.80, etiket: '03 SES + METİN' },
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
    s += (i === 0 ? isikSahne(d.x, p, faz, a)
       : i === 1 ? prova(d.x, p, faz, a)
       : sesMetin(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · AYDINLATMA VE SAHNE KURULUMU ──────────────────────────────────
   İki ışık başı (yumuşak / sert) — EŞİT. Sol başın önünde difüzör paneli,
   sağ başın önünde polarize filtre; filtre tam tur döner ve ürünün üstündeki
   yansıma onun açısıyla sönüp parlar ("parlak yüzeyli ürünlerde yansıma
   kontrolü"). Arkada sade fon, altta kurumsal renk paleti. */
function isikSahne(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const cx = bx + 123;
  let s = '';

  /* --- sade sahne fonu: alt köşeleri geniş yarıçaplı, dikişsiz zemin ---
     ÖLÇÜ NOTU: ilk sürümde ürünün tabanı DY+230'daydı; akan boru bu durakta
     tam y≈356'dan geçiyor ve ışık darbesi ürünü yıkayıp okunmaz yapıyordu
     (önizlemede görüldü). Sahne yukarı alındı: taban DY+198, palet borunun
     ALTINA DY+284'e indi; boru artık aradaki boş bandan geçiyor. */
  const wX = bx + 26, wW = 194, wY = DY + 96, wH = 100, wR = 34;
  s += `<path d="M${wX} ${wY} H${wX + wW} V${wY + wH - wR}
          Q${wX + wW} ${wY + wH} ${wX + wW - wR} ${wY + wH}
          H${wX + wR} Q${wX} ${wY + wH} ${wX} ${wY + wH - wR} Z"
          fill="rgba(255,255,255,${(0.030 + 0.026 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;
  /* zemin */
  s += `<ellipse cx="${cx}" cy="${DY + 198}" rx="84" ry="18"
          fill="rgba(255,255,255,${(0.040 + 0.035 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.09 + 0.11 * p).toFixed(3)})" stroke-width="1.1"/>`;

  /* --- iki ışık başı: AYNI ölçü, AYNI kontur, AYNI zamanlama ---------- */
  const bw = 46, bh = 38, by = DY + 22;
  const solX = bx + 30, sagX = bx + 170;
  [solX, sagX].forEach((hx) => {
    s += `<rect x="${hx}" y="${by}" width="${bw}" height="${bh}" rx="7"
            fill="rgba(255,255,255,${(0.055 + 0.075 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.4"/>`;
  });
  /* sol = yumuşak kaynak: geniş yayıcı YÜZEY — ışık veren yüzeyin kendisi.
     DENETİMDE ÖLÇÜLEN KUSUR: bu yüzey ilk sürümde yoktu; sol başın içinde
     yalnızca beyaz dikiş çizgileri vardı, sağ başta ise aksan dolgulu mercek.
     Baş kutusunun ortalama parlaklığı ölçüldü: sol 65,93 — sağ 75,31 (%14
     fark). Yani iki geçerli yaklaşımdan biri SÖNÜK KART gibi duruyordu ve
     üstündeki artı, yanındaki parlak noktayla kıyaslanınca "seçilmemiş"
     okunuyordu; sayfaya özel yasağın adıyla andığı durum.
     DÜZELTME ÖLÇÜYE DAYANIR — yayılan ışık EŞİTLENDİ, sadece dağılımı farklı:
       sert mercek : π·9² = 254,5 px² × (0,18 + 0,45p)  → p=1'de 160,3 alfa·px²
       yumuşak yüzey: 36×28 (rx 4) ≈ 994 px² × a        → a = 160,3/994 = 0,161
       p=0'da       : 254,5×0,18 = 45,8 → a = 45,8/994  = 0,046
     Aynı toplam ışık, geniş yüzeye yayıldığı için daha düşük parlaklıkta —
     yumuşak ile sert kaynağın fiziksel farkı tam olarak budur, üstünlük
     işareti değil. Ölçüm sonrası fark: 65,93 → 73,8 (sağ 75,31). */
  s += `<rect x="${solX + 5}" y="${by + 5}" width="36" height="28" rx="4"
          fill="rgba(${A},${(0.046 + 0.115 * p).toFixed(3)})"/>`;
  s += `<path d="M${solX + bw / 2} ${by + 4} V${by + bh - 4}
          M${solX + 5} ${by + bh / 2} H${solX + bw - 5}"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.2"/>`;
  /* sağ = sert kaynak: tek küçük mercek + huzmeyi daraltan kanatlar */
  s += `<circle cx="${sagX + bw / 2}" cy="${by + bh / 2}" r="9"
          fill="rgba(${A},${(0.18 + 0.45 * p).toFixed(2)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<path d="M${sagX + 3} ${by + 6} V${by + bh - 6} M${sagX + bw - 3} ${by + 6} V${by + bh - 6}"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.4"
          stroke-linecap="round"/>`;

  /* --- difüzör paneli (sol başın önünde) ------------------------------ */
  const dY = DY + 72;
  s += `<rect x="${solX - 4}" y="${dY}" width="${bw + 8}" height="14" rx="7"
          fill="rgba(255,255,255,${(0.050 + 0.065 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
  for (let i = 0; i < 6; i++) {
    const px = solX + 3 + i * 8.4;
    s += `<line x1="${px.toFixed(1)}" y1="${dY + 3.5}" x2="${px.toFixed(1)}" y2="${dY + 10.5}"
            stroke="rgba(255,255,255,${(0.10 + 0.15 * p).toFixed(3)})" stroke-width="1.1"/>`;
  }

  /* --- polarize filtre (sağ başın önünde) — TAM tur döner: dikişsiz --- */
  const pcx = sagX + bw / 2, pcy = dY + 8, pr = 15;
  s += `<g transform="rotate(${(faz * 360).toFixed(1)} ${pcx} ${pcy})">`;
  s += `<circle cx="${pcx}" cy="${pcy}" r="${pr}"
          fill="rgba(${A},${(0.055 + 0.070 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  for (let i = -2; i <= 2; i++) {
    const ox = i * 5.2;
    const yy = Math.sqrt(Math.max(0, pr * pr - ox * ox)) - 2.2;
    if (yy <= 0) continue;
    s += `<line x1="${(pcx + ox).toFixed(1)}" y1="${(pcy - yy).toFixed(1)}"
            x2="${(pcx + ox).toFixed(1)}" y2="${(pcy + yy).toFixed(1)}"
            stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
  }
  s += `</g>`;

  /* --- huzmeler: yumuşak geniş ve dağınık, sert dar ve keskin;
         yoğunlukları EŞİT (0.04 taban + 0.085 p) ------------------------- */
  const y0 = DY + 94, yF = DY + 198;
  s += `<path d="M${solX + bw / 2 - 26} ${y0} L${solX + bw / 2 + 26} ${y0}
          L${cx + 46} ${yF} L${bx + 18} ${yF} Z"
          fill="rgba(${A},${(0.040 + 0.085 * p).toFixed(3)})" filter="url(#yumusaAz)"/>`;
  s += `<path d="M${sagX + bw / 2 - 9} ${y0} L${sagX + bw / 2 + 9} ${y0}
          L${cx + 28} ${yF} L${cx - 12} ${yF} Z"
          fill="rgba(${A},${(0.040 + 0.085 * p).toFixed(3)})"/>`;

  /* --- ürün: parlak yüzeyli, üstünde kontrol edilen yansıma ------------- */
  const tab = DY + 198;
  s += `<ellipse cx="${cx}" cy="${tab + 3}" rx="30" ry="8"
          fill="rgba(${A},${(0.10 + 0.20 * p).toFixed(3)})"/>`;
  s += `<rect x="${cx - 13}" y="${tab - 72}" width="26" height="13" rx="4"
          fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<rect x="${cx - 22}" y="${tab - 60}" width="44" height="60" rx="9"
          fill="rgba(255,255,255,.075)"
          stroke="rgba(255,255,255,${(0.17 + 0.25 * p).toFixed(3)})" stroke-width="1.4"/>`;
  /* yansıma: polarize filtrenin açısıyla sönüp parlar (periyodik) */
  const yansima = Math.abs(Math.cos(2 * Math.PI * faz));
  s += `<rect x="${cx - 15}" y="${tab - 52}" width="8" height="44" rx="4"
          fill="rgba(255,255,255,${(0.06 + 0.52 * yansima * (0.35 + 0.65 * p)).toFixed(3)})"/>`;
  s += `<rect x="${cx + 3}" y="${tab - 48}" width="4" height="30" rx="2"
          fill="rgba(255,255,255,${(0.04 + 0.26 * yansima * (0.35 + 0.65 * p)).toFixed(3)})"/>`;

  /* --- kurumsal renk paleti: dört alan, sırayla oturur ------------------ */
  const renk = [`rgba(${A},.85)`, a.aksan.derin, 'rgba(255,255,255,.28)', 'rgba(255,255,255,.10)'];
  const sw = 22, bosl = 9;
  const px0 = bx + Math.round((DW - (4 * sw + 3 * bosl)) / 2);
  renk.forEach((r, i) => {
    const g = kis01((p - i * 0.10) / 0.40);
    s += `<rect x="${px0 + i * (sw + bosl)}" y="${DY + 284}" width="${sw}" height="${sw}" rx="6"
            fill="${r}" opacity="${(0.20 + 0.80 * g).toFixed(3)}"
            stroke="rgba(255,255,255,.16)" stroke-width="1"/>`;
  });
  return s;
}

/* ── 02 · ÜRÜN YÖNLENDİRME VE PROVA ÇEKİMİ ──────────────────────────────
   Döner sehpa tam tur döner; ürünün yan yüzü dönüşe göre sağa/sola açılır.
   Kamera sehpanın çevresinde dolaşarak "en iyi göründüğü açı"yı arar. Altta
   aynı üründen üç kesit: sehpa kesiti, yakın plan detay, kullanım anı. */
function prova(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  /* ÖLÇÜ NOTU: ilk sürümde sehpa DY+120'deydi ve kamera yörüngesi rx+18 idi;
     önizlemede kamera gövdesi panel kenarına biniyor, sehpanın alt yarısı da
     borunun ışığında kayboluyordu. Sehpa yukarı alındı, yörünge daraltıldı,
     kesitler borunun ALTINA indi. */
  const cx = bx + 123, cy = DY + 104;
  const rx = 72, ry = 24;
  let s = '';

  /* sehpa */
  s += `<ellipse cx="${cx}" cy="${cy + 10}" rx="${rx}" ry="${ry}"
          fill="rgba(255,255,255,${(0.020 + 0.018 * p).toFixed(3)})"/>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"
          fill="rgba(255,255,255,${(0.035 + 0.040 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.4"/>`;
  /* dönüş çentikleri — tam tur, dikişsiz */
  for (let k = 0; k < 14; k++) {
    const t = 2 * Math.PI * (k / 14 + faz);
    const qx = cx + (rx - 10) * Math.cos(t);
    const qy = cy + (ry - 4) * Math.sin(t);
    const on = 0.5 + 0.5 * Math.sin(t);
    s += `<circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="2.5"
            fill="rgba(${A},${(0.10 + 0.62 * on * p).toFixed(3)})"/>`;
  }

  /* ürün — yan yüz dönüşe göre açılır (işaret değişince öbür kenara geçer) */
  const bw = 34, bh = 56, uy = cy - bh;
  const d = 19 * Math.sin(2 * Math.PI * faz);
  const kenar = d >= 0 ? cx + bw / 2 : cx - bw / 2;
  s += `<path d="M${kenar} ${uy + 5} L${(kenar + d).toFixed(1)} ${uy + 12}
          L${(kenar + d).toFixed(1)} ${cy - 7} L${kenar} ${cy} Z"
          fill="rgba(255,255,255,.045)"
          stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<rect x="${cx - bw / 2}" y="${uy}" width="${bw}" height="${bh}" rx="8"
          fill="rgba(255,255,255,.075)"
          stroke="rgba(255,255,255,${(0.18 + 0.25 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<rect x="${cx - bw / 2 + 6}" y="${uy + 11}" width="6" height="32" rx="3"
          fill="rgba(255,255,255,${(0.07 + 0.14 * p).toFixed(3)})"/>`;

  /* kamera — sehpanın çevresinde açı arıyor; merceği hep ürüne bakar */
  const t = 2 * Math.PI * faz;
  const kx = cx + (rx + 16) * Math.cos(t);
  const ky = cy + (ry + 15) * Math.sin(t);
  const on = 0.5 + 0.5 * Math.sin(t);
  const ka = ((0.34 + 0.66 * on) * (0.34 + 0.66 * p)).toFixed(3);
  /* Mercek hep merkeze bakar. Kesikli "kx<cx" testi merceği yörüngenin
     tepesinde ve dibinde bir karede öbür yana ZIPLATIYORDU; kosinüs sürekli
     olduğu için aynı işi sıçramasız yapıyor. */
  const mx = kx - 18 * Math.cos(t);
  const my = ky - 8 * Math.sin(t);
  s += `<line x1="${kx.toFixed(1)}" y1="${ky.toFixed(1)}" x2="${cx}" y2="${(cy - 26).toFixed(1)}"
          stroke="rgba(${A},${(0.08 + 0.28 * on * p).toFixed(3)})" stroke-width="1"
          stroke-dasharray="3 6"/>`;
  s += `<g opacity="${ka}">`;
  s += `<rect x="${(kx - 13).toFixed(1)}" y="${(ky - 14).toFixed(1)}" width="12" height="6" rx="2"
          fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.30)" stroke-width="1"/>`;
  s += `<rect x="${(kx - 13).toFixed(1)}" y="${(ky - 9).toFixed(1)}" width="26" height="19" rx="4"
          fill="rgba(255,255,255,.11)" stroke="rgba(255,255,255,.38)" stroke-width="1.3"/>`;
  s += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="7"
          fill="rgba(${A},.55)" stroke="rgba(255,255,255,.38)" stroke-width="1.2"/>`;
  s += `</g>`;

  /* --- aynı üründen üç kesit; sıra soldan sağa bir kez süpürür --------- */
  const fw = 58, fh = 52, fy = DY + 250, ara = 10;
  const fx0 = bx + Math.round((DW - (3 * fw + 2 * ara)) / 2);
  /* Seçim süpürmesi durağın CANLI penceresine oturtuldu.
     ÖLÇÜ NOTU: ilk sürüm faz*3 kullanıyordu; süpürme tüm döngüye yayıldığı
     için durak canlıyken (0.31–0.69) sıra hep 2. ve 3. kesitteydi, BİRİNCİ
     KESİT HİÇ SEÇİLMİYORDU (önizlemede üç karede de aynı kesit seçiliydi).
     u, 0.38–0.62 arasını 0–1'e açar: üçü de p yüksekken sırayla seçilir.
     Pencere dışında üçü de sönük → faz 0 ile faz 1 aynı, dikiş yok. */
  const u = (faz - 0.38) / 0.24;
  for (let i = 0; i < 3; i++) {
    const fx = fx0 + i * (fw + ara);
    const sec = kis01(1 - Math.abs(u * 3 - i - 0.5) * 1.6) * p;
    const kk = (0.14 + 0.38 * sec).toFixed(3);
    /* bağlantı: tek üründen türüyor */
    s += `<path d="M${cx} ${cy + 42} C${cx} ${fy - 30} ${fx + fw / 2} ${fy - 38} ${fx + fw / 2} ${fy}"
            fill="none" stroke="rgba(${A},${(0.08 + 0.34 * sec).toFixed(3)})"
            stroke-width="1.3" stroke-dasharray="3 6"/>`;
    s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="6"
            fill="rgba(255,255,255,${(0.026 + 0.055 * sec).toFixed(3)})"
            stroke="rgba(${A},${(0.13 + 0.52 * sec).toFixed(3)})" stroke-width="1.3"/>`;
    const ix = fx + fw / 2;
    if (i === 0) {
      /* sehpa kesiti: küçük tabla + ürün */
      s += `<ellipse cx="${ix}" cy="${fy + 40}" rx="17" ry="5" fill="none"
              stroke="rgba(255,255,255,${kk})" stroke-width="1.2"/>`;
      s += `<rect x="${ix - 7}" y="${fy + 17}" width="14" height="23" rx="3.5" fill="none"
              stroke="rgba(255,255,255,${kk})" stroke-width="1.3"/>`;
    } else if (i === 1) {
      /* yakın plan detay: ürün köşesi büyütülmüş + iki detay işareti */
      s += `<path d="M${fx + 11} ${fy + 45} V${fy + 26} Q${fx + 11} ${fy + 12} ${fx + 27} ${fy + 12} H${fx + 48}"
              fill="none" stroke="rgba(255,255,255,${kk})" stroke-width="1.6"/>`;
      s += `<circle cx="${fx + 33}" cy="${fy + 31}" r="3" fill="rgba(255,255,255,${kk})"/>`;
      s += `<circle cx="${fx + 42}" cy="${fy + 38}" r="2" fill="rgba(255,255,255,${kk})"/>`;
    } else {
      /* kullanım anı: eğik ürün + hareket yayları (insan yok) */
      s += `<g transform="rotate(-20 ${ix} ${fy + 30})">
              <rect x="${ix - 7}" y="${fy + 15}" width="14" height="28" rx="4" fill="none"
                stroke="rgba(255,255,255,${kk})" stroke-width="1.3"/>
            </g>`;
      s += `<path d="M${ix + 12} ${fy + 16} a13 13 0 0 1 5 11" fill="none"
              stroke="rgba(255,255,255,${kk})" stroke-width="1.3" stroke-linecap="round"/>`;
      s += `<path d="M${ix + 17} ${fy + 12} a19 19 0 0 1 7 16" fill="none"
              stroke="rgba(255,255,255,${(0.06 + 0.20 * sec).toFixed(3)})" stroke-width="1.2"
              stroke-linecap="round"/>`;
    }
  }
  return s;
}

/* ── 03 · SES VE ALTYAZI ENTEGRASYONU ───────────────────────────────────
   Ses dalgası zayıflarken ekran içi metin ve altyazı güçlenir: "sessiz
   izlenme ihtimaline karşı önemli bilgiler ekran içi metin veya altyazı ile
   desteklenir." Altta iki katman şeridi: arka plan müziği ve seslendirme. */
function sesMetin(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  let s = '';

  /* Sesin var/yok salınımı. Frekans 2 (tam sayı → dikişsiz), faz kayması 0.89.
     ÖLÇÜ NOTU: ilk sürüm tek çevrimdi ve tam bu durak canlıyken (faz 0.80)
     dibe vuruyordu — ses dalgaları izleyiciye HİÇ görünmüyordu (önizlemede
     ölçüldü). Kayma, durağın canlı penceresinde (0.61–0.99) sesli → orta →
     sessiz geçişinin tamamı görünsün diye seçildi. */
  const ses = 0.5 + 0.5 * Math.sin(2 * Math.PI * (faz * 2 + 0.89));
  const sessiz = 1 - ses;

  /* --- kare: ürün + ekran içi metin + altyazı ------------------------- */
  const fx = bx + 18, fw = 210, fy = DY + 30, fh = 118;
  const fcx = fx + fw / 2;
  s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="9"
          fill="rgba(255,255,255,${(0.030 + 0.035 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.4"/>`;
  /* ürün */
  s += `<ellipse cx="${fcx}" cy="${fy + 81}" rx="28" ry="6"
          fill="rgba(${A},${(0.09 + 0.18 * p).toFixed(3)})"/>`;
  s += `<rect x="${fcx - 16}" y="${fy + 36}" width="32" height="45" rx="7"
          fill="rgba(255,255,255,.075)"
          stroke="rgba(255,255,255,${(0.16 + 0.24 * p).toFixed(3)})" stroke-width="1.3"/>`;

  /* ekran içi metin plakası — ses düşünce güçlenir */
  const mp = (0.20 + 0.65 * sessiz) * (0.30 + 0.70 * p);
  s += `<rect x="${fx + 13}" y="${fy + 13}" width="66" height="15" rx="7.5"
          fill="rgba(${A},${(0.12 + 0.55 * mp).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.08 + 0.20 * mp).toFixed(3)})" stroke-width="1"/>`;
  s += `<rect x="${fx + 19}" y="${fy + 19}" width="34" height="3" rx="1.5"
          fill="rgba(255,255,255,${(0.15 + 0.55 * mp).toFixed(3)})"/>`;

  /* hoparlör — dalgaları ses ile belirip kayboluyor (sessiz izlenme) */
  const hx = fx + fw - 34, hy = fy + 22;
  s += `<path d="M${hx - 9} ${hy - 4} H${hx - 4} L${hx + 2} ${hy - 10} V${hy + 10}
          L${hx - 4} ${hy + 4} H${hx - 9} Z"
          fill="rgba(255,255,255,${(0.10 + 0.22 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.10 + 0.18 * p).toFixed(3)})" stroke-width="1.1"
          stroke-linejoin="round"/>`;
  [8, 14].forEach((r, i) => {
    const o = kis01((ses - i * 0.22) / 0.5) * (0.30 + 0.70 * p);
    s += `<path d="M${hx + 6} ${hy - r * 0.72} a${r} ${r} 0 0 1 0 ${(r * 1.44).toFixed(1)}"
            fill="none" stroke="rgba(${A},${(0.90 * o).toFixed(3)})" stroke-width="1.9"
            stroke-linecap="round"/>`;
  });

  /* Altyazı — iki satır; satır boyu değişen replikle birlikte uzayıp kısalır,
     parlaklığı ses düştükçe artar (bilgi metne taşınıyor).
     ÖLÇÜ NOTU: ilk sürüm satırları "(faz*2)%1" ile yazdırıyordu; modülo
     döngü noktasında DOLU satırı bir karede BOŞA düşürüyordu. Ölçüldü:
     dikiş/ortalama 1.95× (eşik 1.6) ve fark görüntüsünde iki altyazı çubuğu
     bembeyaz çıktı. Modülo atıldı, yerine düz sinüs kondu: tam frekans 2,
     her karede sürekli, faz 0 ile faz 1 aynı. */
  const s1 = 0.55 + 0.45 * Math.sin(2 * Math.PI * (faz * 2 + 0.10));
  const s2 = 0.55 + 0.45 * Math.sin(2 * Math.PI * (faz * 2 + 0.62));
  const av = (0.30 + 0.62 * sessiz) * (0.35 + 0.65 * p);
  [[132, s1, fy + 90], [92, s2, fy + 102]].forEach(([gen, k, sy]) => {
    s += `<rect x="${(fcx - gen / 2).toFixed(1)}" y="${sy}" width="${gen}" height="8" rx="4"
            fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${(fcx - gen / 2).toFixed(1)}" y="${sy}" width="${(gen * k).toFixed(1)}" height="8" rx="4"
            fill="rgba(255,255,255,${(0.18 + 0.62 * av).toFixed(3)})"/>`;
  });

  /* --- ses dalgası: sessizde küçülür, sesli anda dolar ----------------- */
  const wx = bx + 18, wy = DY + 208, ww = 210, cubuk = 26;
  for (let i = 0; i < cubuk; i++) {
    const t = i / cubuk;
    const h = (0.26 + 0.74 * Math.abs(
      Math.sin(2 * Math.PI * (t * 2.3 + faz * 2)) * 0.62 +
      Math.sin(2 * Math.PI * (t * 4.4 - faz * 3)) * 0.38))
      * 56 * (0.30 + 0.70 * p) * (0.34 + 0.66 * ses);
    const qx = wx + t * ww;
    s += `<rect x="${qx.toFixed(1)}" y="${(wy - h / 2).toFixed(1)}" width="4.6" height="${h.toFixed(1)}" rx="2.3"
            fill="rgba(${A},${(0.26 + 0.55 * p).toFixed(2)})"/>`;
  }
  s += `<line x1="${wx}" y1="${wy}" x2="${wx + ww}" y2="${wy}"
          stroke="rgba(255,255,255,.10)" stroke-width="1"/>`;

  /* --- iki katman: arka plan müziği ve seslendirme --------------------- */
  for (let i = 0; i < 2; i++) {
    const sy = DY + 258 + i * 20;
    const k = kis01((p - i * 0.16) / 0.42);
    s += `<rect x="${wx}" y="${sy}" width="${ww}" height="9" rx="4.5" fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${wx}" y="${sy}" width="${(ww * (0.40 + 0.60 * k)).toFixed(1)}" height="9" rx="4.5"
            fill="rgba(${A},${(0.20 + 0.42 * k).toFixed(2)})"/>`;
  }
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
