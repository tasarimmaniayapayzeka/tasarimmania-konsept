/* SAHNE — video-produksiyon / reklam-filmi
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok:
 *   01 Senaryo ve Onay Süreci
 *   02 Çekim Planlaması ve Yönetmenlik
 *   03 Seslendirme ve Post-Prodüksiyon
 *
 * FİKİR: eski görselin akan cam boru DNA'sı korunur, ama boru artık
 * boşluğa değil bu üç durağa uğrar. Işık darbesi boru boyunca yürür;
 * hangi durağın üstündeyse o durak canlanır ve kendi işini yapar
 * (senaryo satırları yazılır → depo/ışık kurulur → dalga formu ve renk
 * düzeltmesi işler). Beş saniyede bir tur, dikişsiz döngü.
 *
 * YASAK (bu sayfaya özel): marka/platform logosu yok, süre/bütçe/fiyat
 * rakamı yok, gerçek bir çekimden alınmış görüntü yok. Durak numaraları
 * (01/02/03) sayfanın kendi numaralandırmasıdır.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* üç durağın tuval üzerindeki yeri.
   ÖLÇÜ NOTU: ilk sürümde paneller 292 yüksekti ve tuvalin üstünde 168,
   altında 130 piksel ölü boşluk kalıyordu — önizlemede görüldü. Paneller
   yükseltildi; üstte rozetin ("CANLI DÖNGÜ", sol üst) oturacağı 118 piksel
   bilerek boş bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 SENARYO' },
  { x: 437, fazMerkez: 0.50, etiket: '02 ÇEKİM PLANI' },
  { x: 812, fazMerkez: 0.80, etiket: '03 SES + POST' },
];
const DW = 246, DH = 344, DY = 126;

module.exports = function sahne(faz, a) {
  const { cam, yaz, boru, seritYolu, darbeIsigi, canlilik, kis, karis } = a;
  const A = a.aksan.rgb.join(',');
  const yol = seritYolu(SERIT);

  /* darbe tuvali soldan sağa geçer; faz doğrudan yol parametresi */
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

  /* --- akan cam boru (duraklarn ARKASINDA) ---------------------------- */
  s += boru(yol, faz, a.aksan.rgb, { kalin: 20, desen: 48, hiz: 3 });

  /* --- duraklar -------------------------------------------------------- */
  DURAK.forEach((d, i) => {
    const p = canli[i];
    s += `<g>`;
    /* canlanınca arkasında hale */
    if (p > 0.02) {
      s += `<rect x="${d.x - 14}" y="${DY - 14}" width="${DW + 28}" height="${DH + 28}" rx="26"
              fill="rgba(${A},${(0.10 * p).toFixed(3)})" filter="url(#yumusaCok)"/>`;
    }
    s += cam({ x: d.x, y: DY, w: DW, h: DH, r: 18, parlaklik: p, aksan: a.aksan.rgb });
    s += (i === 0 ? senaryo(d.x, p, a) : i === 1 ? cekim(d.x, p, faz, a) : post(d.x, p, faz, a));
    /* etiket */
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (duraklarn ÖNÜNDE, geçtiği yeri aydınlatır) -------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · SENARYO VE ONAY ────────────────────────────────────────────────
   Senaryo sayfası; canlanınca satırlar sırayla "yazılır", sonunda onay
   tiki çizilir. Sayfa metni: "senaryo ... müşteri onayına sunulur." */
function senaryo(bx, p, a) {
  const { yaz } = a;
  const A = a.aksan.rgb.join(',');
  const x = bx + 34, y = DY + 34, w = DW - 68, h = 226;
  let s = '';
  /* arkadaki ikinci sayfa — "sahne bazlı" çokluk hissi */
  s += `<rect x="${x + 13}" y="${y - 10}" width="${w}" height="${h}" rx="9"
          fill="rgba(255,255,255,.026)" stroke="rgba(255,255,255,.065)" stroke-width="1.2"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9"
          fill="rgba(255,255,255,.052)" stroke="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* sahne başlığı çubuğu */
  s += `<rect x="${x + 15}" y="${y + 19}" width="54" height="8" rx="4" fill="rgba(${A},${(0.45 + 0.4 * p).toFixed(2)})"/>`;
  /* metin satırları — p arttıkça sırayla "yazılır" */
  const satir = [104, 122, 86, 130, 74, 118, 92];
  satir.forEach((gen, i) => {
    const yerel = kis01((p - i * 0.095) / 0.38);
    const sy = y + 47 + i * 23;
    s += `<rect x="${x + 15}" y="${sy}" width="${gen}" height="7" rx="3.5" fill="rgba(255,255,255,.05)"/>`;
    if (yerel > 0) {
      s += `<rect x="${x + 15}" y="${sy}" width="${(gen * yerel).toFixed(1)}" height="7" rx="3.5"
              fill="rgba(255,255,255,${(0.22 + 0.30 * p).toFixed(2)})"/>`;
    }
  });
  /* onay tiki — son aşamada belirir; sayfa "müşteri onayına sunulur" diyor */
  const onay = kis01((p - 0.60) / 0.32);
  const cx = bx + DW / 2, cy = DY + DH - 52;
  s += `<circle cx="${cx}" cy="${cy}" r="23" fill="rgba(${A},${(0.11 * onay).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.62 * onay).toFixed(2)})" stroke-width="1.7"/>`;
  const tik = `M${cx - 9.5} ${cy + 1} L${cx - 2.5} ${cy + 8.5} L${cx + 10.5} ${cy - 7.5}`;
  s += `<path d="${tik}" fill="none" stroke="rgba(255,255,255,${(0.28 + 0.68 * onay).toFixed(2)})"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="36" stroke-dashoffset="${(36 * (1 - onay)).toFixed(1)}"/>`;
  return s;
}

/* ── 02 · ÇEKİM PLANI VE YÖNETMENLİK ────────────────────────────────────
   Storyboard kareleri üstte sırayla seçilir; altta kamera + ışık ayağı.
   Sayfa metni: "kamera hareketleri, ışık kurulumu ve lokasyon lojistiği". */
function cekim(bx, p, faz, a) {
  const { yaz } = a;
  const A = a.aksan.rgb.join(',');
  let s = '';

  /* storyboard: üç kare, sırayla vurgulanır ("sahne bazlı" plan) */
  const kw = 64, kh = 46, ky = DY + 34;
  for (let i = 0; i < 3; i++) {
    const kx = bx + 26 + i * (kw + 11);
    const sec = kis01(1 - Math.abs(((faz * 3) % 1) * 3 - i - 0.5) * 1.6) * p;
    s += `<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="6"
            fill="rgba(255,255,255,${(0.03 + 0.055 * sec).toFixed(3)})"
            stroke="rgba(${A},${(0.14 + 0.52 * sec).toFixed(3)})" stroke-width="1.3"/>`;
    /* kare içi kompozisyon — yüz YOK, soyut yerleşim çizgileri */
    s += `<rect x="${kx + 9}" y="${ky + 28}" width="${22 + i * 7}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.20 * sec).toFixed(3)})"/>`;
    s += `<circle cx="${kx + 45}" cy="${ky + 19}" r="${7.5 - i}" fill="none"
            stroke="rgba(255,255,255,${(0.10 + 0.22 * sec).toFixed(3)})" stroke-width="1.3"/>`;
  }

  /* --- KAMERA — sinema gövdesi siluetı ------------------------------------
     İLK SÜRÜM ŞEKİLSİZDİ: düz bir dikdörtgen + kutu, "kamera" okunmuyordu.
     Eklenen: üst taşıma kolu, arkada vizör, lens namlusu ve parlama halkası. */
  const cx = bx + 70, cy = DY + 214;
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  /* taşıma kolu */
  s += `<rect x="${cx - 26}" y="${cy - 40}" width="54" height="7" rx="3.5"
          fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;
  s += `<path d="M${cx - 18} ${cy - 33} L${cx - 18} ${cy - 26} M${cx + 20} ${cy - 33} L${cx + 20} ${cy - 26}"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="2.4" stroke-linecap="round"/>`;
  /* gövde */
  s += `<rect x="${cx - 32}" y="${cy - 26}" width="64" height="48" rx="8"
          fill="rgba(255,255,255,.075)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.5"/>`;
  /* arkada vizör */
  s += `<rect x="${cx - 46}" y="${cy - 17}" width="15" height="20" rx="4"
          fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  /* lens namlusu + ön halka */
  s += `<rect x="${cx + 30}" y="${cy - 14}" width="24" height="28" rx="5"
          fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.4"/>`;
  s += `<ellipse cx="${cx + 55}" cy="${cy}" rx="6.5" ry="15" fill="rgba(255,255,255,.05)"
          stroke="rgba(${A},${(0.28 + 0.52 * p).toFixed(2)})" stroke-width="1.6"/>`;
  s += `<ellipse cx="${cx + 55}" cy="${cy}" rx="3" ry="8" fill="rgba(${A},${(0.30 + 0.5 * p).toFixed(2)})"/>`;
  /* kayıt göstergesi — nabız faza bağlı, döngüde sürekli */
  const nabiz = 0.35 + 0.65 * (0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 4));
  s += `<circle cx="${cx - 20}" cy="${cy - 14}" r="4.2" fill="rgba(${A},${(nabiz * p * 0.95 + 0.08).toFixed(2)})"/>`;
  /* tripod — üç bacak, ortadaki kısa */
  s += `<path d="M${cx} ${cy + 22} L${cx} ${cy + 44}
          M${cx} ${cy + 44} L${cx - 22} ${cy + 74} M${cx} ${cy + 44} L${cx + 22} ${cy + 74}
          M${cx} ${cy + 44} L${cx + 5} ${cy + 70}"
          fill="none" stroke="rgba(255,255,255,${cizgi})" stroke-width="2.3" stroke-linecap="round"/>`;

  /* --- IŞIK — softbox + ayak -----------------------------------------------
     İLK SÜRÜM KADEH GİBİ OKUNUYORDU (ters yamuk + düz ayak). Değişen:
     softbox artık dik duran yuvarlatılmış panel, ayak eğik, taban çatal. */
  const lx = bx + DW - 52, ly = cy - 26;
  s += `<rect x="${lx - 21}" y="${ly - 24}" width="42" height="46" rx="7"
          fill="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.4"/>`;
  /* softbox iç ızgara */
  s += `<path d="M${lx} ${ly - 24} L${lx} ${ly + 22} M${lx - 21} ${ly - 1} L${lx + 21} ${ly - 1}"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1"/>`;
  /* huzme — sahneye doğru */
  s += `<path d="M${lx - 19} ${ly + 22} L${lx - 62} ${cy + 74} L${lx + 26} ${cy + 74} L${lx + 19} ${ly + 22} Z"
          fill="rgba(${A},${(0.045 + 0.13 * p).toFixed(3)})"/>`;
  /* ayak + çatal taban */
  s += `<path d="M${lx} ${ly + 22} L${lx + 3} ${cy + 52}
          M${lx + 3} ${cy + 52} L${lx - 15} ${cy + 74} M${lx + 3} ${cy + 52} L${lx + 20} ${cy + 74}"
          fill="none" stroke="rgba(255,255,255,${cizgi})" stroke-width="2.3" stroke-linecap="round"/>`;
  return s;
}

/* ── 03 · SESLENDİRME VE POST-PRODÜKSİYON ───────────────────────────────
   Dalga formu sürekli akar; altta renk düzeltmesi ayrımı soldan sağa
   süpürür. Sayfa metni: "seslendirme, müzik ve ses efekti katmanları ...
   renk düzeltmesiyle birleştirilerek". */
function post(bx, p, faz, a) {
  const { yaz } = a;
  const A = a.aksan.rgb.join(',');
  let s = '';
  /* dalga formu — üç ses katmanı: seslendirme, müzik, efekt.
     Sayfa metni: "seslendirme, müzik ve ses efekti katmanları eklenir." */
  const wx = bx + 24, wy = DY + 108, ww = DW - 48, cubuk = 27;
  for (let i = 0; i < cubuk; i++) {
    const t = i / cubuk;
    /* iki sinüsün toplamı; ikisi de faz cinsinden periyodik → dikişsiz */
    const h = (0.30 + 0.70 * Math.abs(
      Math.sin(2 * Math.PI * (t * 2.2 + faz * 2)) * 0.62 +
      Math.sin(2 * Math.PI * (t * 4.6 - faz * 3)) * 0.38)) * 68 * (0.32 + 0.68 * p);
    const bx2 = wx + t * ww;
    s += `<rect x="${bx2.toFixed(1)}" y="${(wy - h / 2).toFixed(1)}" width="4.6" height="${h.toFixed(1)}" rx="2.3"
            fill="rgba(${A},${(0.30 + 0.55 * p).toFixed(2)})"/>`;
  }
  s += `<line x1="${wx}" y1="${wy}" x2="${wx + ww}" y2="${wy}" stroke="rgba(255,255,255,.10)" stroke-width="1"/>`;
  /* üç katman şeridi — dalganın altında, ayrı ayrı okunur */
  ['SESLENDİRME', 'MÜZİK', 'EFEKT'].forEach((ad, i) => {
    const sy = DY + 158 + i * 15;
    const canliK = kis01((p - i * 0.14) / 0.4);
    s += `<rect x="${wx}" y="${sy}" width="${ww}" height="7" rx="3.5" fill="rgba(255,255,255,.045)"/>`;
    s += `<rect x="${wx}" y="${sy}" width="${(ww * (0.42 + 0.58 * canliK)).toFixed(1)}" height="7" rx="3.5"
            fill="rgba(${A},${(0.20 + 0.42 * canliK).toFixed(2)})"/>`;
  });

  /* renk düzeltmesi: aynı kare, ayrım çizgisi soldan sağa süpürür */
  const gx = bx + 24, gy = DY + 222, gw = DW - 48, gh = 82;
  const bol = 0.5 + 0.42 * Math.sin(2 * Math.PI * faz);        // periyodik
  s += `<clipPath id="grade${Math.round(bx)}"><rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="8"/></clipPath>`;
  s += `<g clip-path="url(#grade${Math.round(bx)})">`;
  /* düzeltilmemiş taraf: soğuk ve sönük */
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="#1A2230"/>`;
  s += `<circle cx="${gx + gw * 0.30}" cy="${gy + gh * 0.62}" r="30" fill="rgba(140,160,190,.20)"/>`;
  s += `<rect x="${gx}" y="${gy + gh * 0.72}" width="${gw}" height="${gh * 0.28}" fill="rgba(120,140,170,.12)"/>`;
  /* düzeltilmiş taraf: modül aksanına doğru ısınmış */
  s += `<g clip-path="url(#grade${Math.round(bx)})">`;
  s += `<rect x="${gx + gw * bol}" y="${gy}" width="${gw}" height="${gh}" fill="#2A1526"/>`;
  s += `<circle cx="${gx + gw * 0.30}" cy="${gy + gh * 0.62}" r="30" fill="rgba(${A},.30)"
          clip-path="url(#grade${Math.round(bx)})"/>`;
  s += `<rect x="${gx + gw * bol}" y="${gy}" width="${gw}" height="${gh}" fill="rgba(${A},${(0.10 + 0.10 * p).toFixed(3)})"/>`;
  s += `</g>`;
  s += `</g>`;
  /* ayrım çizgisi */
  s += `<line x1="${(gx + gw * bol).toFixed(1)}" y1="${gy}" x2="${(gx + gw * bol).toFixed(1)}" y2="${gy + gh}"
          stroke="rgba(255,255,255,${(0.35 + 0.4 * p).toFixed(2)})" stroke-width="1.8"/>`;
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="8" fill="none"
          stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1.2"/>`;
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }
