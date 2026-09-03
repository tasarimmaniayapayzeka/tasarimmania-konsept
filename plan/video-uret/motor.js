/* MODÜL VİDEOSU ÜRETİM MOTORU — kare kare SVG → PNG → mp4
 *
 * NEDEN VAR: sayfalardaki .akv-video kutusunda modül geneli soyut bir 3B
 * render duruyordu. İki kusuru vardı:
 *   1) Anlamı yoktu — cam levhalar arasında pembe bir boru. Sayfanın
 *      yanındaki 01/02/03 adımlarıyla hiçbir ilişkisi yok.
 *   2) HİÇ OYNAMIYORDU. Rozet "CANLI DÖNGÜ" diyor ama işaretlemede ne
 *      autoplay, ne data-dongu, ne data-scrub var. Tarayıcıda ölçüldü:
 *      readyState 4 (tam yüklü), paused true, currentTime 0 → 0.
 *      Yani 23 sayfa 180–600 KB videoyu indirip donuk poster gösteriyordu.
 *
 * BU MOTOR: her sayfaya, o sayfanın KENDİ adımlarını anlatan, sorunsuz
 * döngülenen bir mp4 üretir. Görsel dil korunur (cam yüzey, akan ışık
 * şeridi, modül aksanı) — değişen tek şey artık bir anlam taşıması.
 *
 * ── TUZAKLAR (ikisi de bu makinede yaşandı, ölçüldü) ───────────────────
 * 1. FONT AĞIRLIĞI: librsvg (sharp'in SVG motoru) font-weight verilmemiş
 *    metni harfleri yiyerek çizer — sınamada ilk satır noktalara dönüştü.
 *    Bu dosyadaki her <text> için font-weight ZORUNLU. yaz() bunu dayatır.
 * 2. JETBRAINS MONO KURULU DEĞİL: sitenin mono fontu bu makinede yok,
 *    motor sessizce orantılı sans'a düşüyor. Gerçek mono için Consolas.
 *
 * ── SORUNSUZ DÖNGÜ KURALI ─────────────────────────────────────────────
 * Kare i'nin fazı i/KARE olarak verilir (i = 0 … KARE-1). Son kare faz
 * (KARE-1)/KARE'dir, 1.0 DEĞİL — böylece son kareden ilk kareye geçiş
 * sıçramaz. Tüm hareket faz cinsinden periyodik olmalıdır: sin(2πφk),
 * ya da tam tur atan kaydırma. Faza bağlı olmayan tek seferlik hareket
 * KOYMA, döngüde zıplar.
 */
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const sharp = require('C:/Users/İHSAN/Desktop/Claude-Projeler/27-MediestGroup/node_modules/sharp');

const EN = 1120;          // mevcut modül videolarıyla birebir aynı ölçü
const BOY = 626;
const KARE = 120;         // 24 fps × 5 sn
const FPS = 24;

/* Site paletinden (site/css/tm.css) alındı — uydurulmadı */
const ZEMIN = '#0E1118';
const AKSAN = {
  video:     { rgb: [255, 45, 155], derin: '#CB086E' },
  web:       { rgb: [0, 229, 255],  derin: '#05737F' },
  mobil:     { rgb: [122, 34, 255], derin: '#680AF5' },
  pazarlama: { rgb: [255, 176, 32], derin: '#8E5E06' },
  seo:       { rgb: [166, 255, 0],  derin: '#4D7305' },
};

const MONO = 'Consolas, ui-monospace, monospace';
const SANS = 'Segoe UI, system-ui, sans-serif';

/* ---- küçük yardımcılar ------------------------------------------------ */

const kis = (v, a, b) => Math.max(a, Math.min(b, v));
const karis = (a, b, t) => a + (b - a) * t;
/* yumuşak giriş-çıkış; 0..1 → 0..1 */
const yumusak = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/* 0..1 aralığında bir kez gidip gelen darbe (döngüde sürekli) */
const darbe = (t) => 0.5 - 0.5 * Math.cos(2 * Math.PI * kis(t, 0, 1));

function xmlKacis(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* METİN — font-weight'i ZORUNLU kılar (librsvg harf yeme tuzağı) */
function yaz(metin, o) {
  const w = o.agirlik || 600;                 // asla atlanmaz
  const aile = o.mono ? MONO : SANS;
  const hiza = o.hiza || 'start';
  const harf = o.harfArasi ? ` letter-spacing="${o.harfArasi}"` : '';
  const op = o.opak === undefined ? 1 : o.opak;
  return `<text x="${o.x}" y="${o.y}" font-family="${aile}" font-weight="${w}"`
    + ` font-size="${o.boy}" fill="${o.renk}" text-anchor="${hiza}"${harf}`
    + ` opacity="${op.toFixed(3)}">${xmlKacis(metin)}</text>`;
}

/* CAM PANEL — sitedeki .akis kutularının yüzey dili */
function cam(o) {
  const r = o.r === undefined ? 16 : o.r;
  const p = kis(o.parlaklik === undefined ? 0 : o.parlaklik, 0, 1);
  const kenarA = (0.10 + 0.30 * p).toFixed(3);
  const dolgu = (0.028 + 0.030 * p).toFixed(3);
  return `<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="${r}"`
    + ` fill="rgba(255,255,255,${dolgu})"`
    + ` stroke="rgba(${o.aksan.join(',')},${kenarA})" stroke-width="1.4"/>`;
}

/* ŞERİT YOLU — tuval boyunca yumuşak dalga. t (0..1) → {x,y}
   Işık darbesi bu yol üzerinde yürür; istasyonlar yolun üstüne oturur. */
function seritNokta(t, o) {
  const x = karis(o.x0, o.x1, t);
  const y = o.cy + o.genlik * Math.sin(2 * Math.PI * (t * o.tur + (o.kaydir || 0)));
  return { x, y };
}
function seritYolu(o, adim = 90) {
  let d = '';
  for (let i = 0; i <= adim; i++) {
    const n = seritNokta(i / adim, o);
    d += (i === 0 ? 'M' : 'L') + n.x.toFixed(1) + ' ' + n.y.toFixed(1);
  }
  return d;
}

/* AKAN CAM BORU — SÜREKLİ cam gövde + içinde kayan uzun ışık telleri.
 *
 * İLK SÜRÜM YANLIŞTI: gövde neredeyse görünmezdi (%5,5 beyaz) ve üstündeki
 * kısa kesikler baskın çıkıyordu; sonuç akışkan cam boru değil NOKTALI ÇİZGİ
 * gibi okunuyordu. Önizlemede görüldü. Düzeltme: gövde opak ve sürekli,
 * içeride koyu çekirdek (derinlik), teller UZUN kesiklerle akıyor, üstte
 * ince cam parlaması var.
 *
 * Teller dashoffset ile akar; bir döngüde desenin TAM SAYIDA katı kayar,
 * bu yüzden faz 0 ile faz 1 aynı görünür (dikişsiz döngü). */
function boru(yol, faz, aksan, o = {}) {
  const kalin = o.kalin || 26;
  const A = aksan.join(',');
  const desen = o.desen || 96;
  const tur = o.hiz || 3;                            // tam sayı → dikişsiz
  const kaydir = -(faz * desen * tur);
  return `
  <g>
    <path d="${yol}" fill="none" stroke="rgba(${A},.16)" stroke-width="${kalin + 20}"
          stroke-linecap="round" filter="url(#yumusa)"/>
    <path d="${yol}" fill="none" stroke="rgba(255,255,255,.115)" stroke-width="${kalin}"
          stroke-linecap="round"/>
    <path d="${yol}" fill="none" stroke="rgba(14,17,24,.50)" stroke-width="${kalin - 7}"
          stroke-linecap="round"/>
    <path d="${yol}" fill="none" stroke="rgba(${A},.30)" stroke-width="${kalin - 9}"
          stroke-linecap="round"/>
    <path d="${yol}" fill="none" stroke="rgba(${A},.90)" stroke-width="${(kalin * 0.30).toFixed(1)}"
          stroke-linecap="round" stroke-dasharray="${(desen * 0.62).toFixed(1)} ${(desen * 0.38).toFixed(1)}"
          stroke-dashoffset="${kaydir.toFixed(1)}" filter="url(#yumusaAz)"/>
    <path d="${yol}" fill="none" stroke="rgba(255,255,255,.78)" stroke-width="${(kalin * 0.12).toFixed(1)}"
          stroke-linecap="round" stroke-dasharray="${(desen * 0.34).toFixed(1)} ${(desen * 0.66).toFixed(1)}"
          stroke-dashoffset="${(kaydir - desen * 0.18).toFixed(1)}"/>
    <path d="${yol}" fill="none" stroke="rgba(255,255,255,.42)" stroke-width="${(kalin * 0.09).toFixed(1)}"
          stroke-linecap="round" stroke-dasharray="${(desen * 0.20).toFixed(1)} ${(desen * 0.80).toFixed(1)}"
          stroke-dashoffset="${(kaydir - desen * 0.55).toFixed(1)}"/>
    <g transform="translate(0,${-(kalin * 0.26).toFixed(1)})">
      <path d="${yol}" fill="none" stroke="rgba(255,255,255,.20)" stroke-width="${(kalin * 0.16).toFixed(1)}"
            stroke-linecap="round"/>
    </g>
  </g>`;
}

/* IŞIK DARBESİ — yol üzerinde yürüyen parlak nokta */
function darbeIsigi(t, seritO, aksan, o = {}) {
  const n = seritNokta(t, seritO);
  const R = o.yaricap || 46;
  const A = aksan.join(',');
  return `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${R}"
            fill="url(#darbeGrad)" opacity="${(o.opak === undefined ? 0.85 : o.opak).toFixed(2)}"/>
          <circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${(R * 0.16).toFixed(1)}"
            fill="rgba(255,255,255,.92)"/>
          <circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${(R * 0.30).toFixed(1)}"
            fill="rgba(${A},.55)"/>`;
}

/* İSTASYONUN NE KADAR "CANLI" olduğu: darbe ona yaklaştıkça 0→1.
   Sarmalı mesafe kullanılır, böylece döngü başında da doğru çalışır. */
function canlilik(faz, merkez, genislik = 0.17) {
  let d = Math.abs(faz - merkez);
  d = Math.min(d, 1 - d);                    // döngüsel mesafe
  return kis(1 - d / genislik, 0, 1);
}

/* ---- SVG kabuğu ------------------------------------------------------- */

function kabuk(icerik, aksan) {
  const A = aksan.rgb.join(',');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${EN}" height="${BOY}" viewBox="0 0 ${EN} ${BOY}">
  <defs>
    <filter id="yumusa" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="13"/>
    </filter>
    <filter id="yumusaAz" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="3.4"/>
    </filter>
    <filter id="yumusaCok" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
    <radialGradient id="darbeGrad">
      <stop offset="0%"   stop-color="rgba(255,255,255,.95)"/>
      <stop offset="28%"  stop-color="rgba(${A},.72)"/>
      <stop offset="100%" stop-color="rgba(${A},0)"/>
    </radialGradient>
    <radialGradient id="zeminHale" cx="50%" cy="46%">
      <stop offset="0%"   stop-color="rgba(${A},.13)"/>
      <stop offset="100%" stop-color="rgba(${A},0)"/>
    </radialGradient>
    <linearGradient id="ustKarart" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgba(11,13,18,.55)"/>
      <stop offset="42%"  stop-color="rgba(11,13,18,0)"/>
    </linearGradient>
  </defs>
  <rect width="${EN}" height="${BOY}" fill="${ZEMIN}"/>
  <rect width="${EN}" height="${BOY}" fill="url(#zeminHale)"/>
${icerik}
  <rect width="${EN}" height="${BOY}" fill="url(#ustKarart)"/>
</svg>`;
}

/* ---- üretim hattı ----------------------------------------------------- */

/* sahne(faz, arac) → SVG gövdesi (string).
   ad: çıktı klasörü adı, örn "modul-video/reklam-filmi" */
async function uret(ad, dal, sahne, secenek = {}) {
  const aksan = AKSAN[dal];
  if (!aksan) throw new Error('bilinmeyen dal: ' + dal);

  const kok = path.join(__dirname, '..', '..');
  const gecici = path.join(__dirname, '.kare-' + ad.replace(/[\\/]/g, '-'));
  const hedefMp4 = path.join(kok, 'assets', ad + '.mp4');
  const hedefJpg = path.join(kok, 'assets', ad + '.jpg');
  fs.mkdirSync(path.dirname(hedefMp4), { recursive: true });
  fs.rmSync(gecici, { recursive: true, force: true });
  fs.mkdirSync(gecici, { recursive: true });

  const arac = { EN, BOY, aksan, cam, yaz, boru, seritYolu, seritNokta,
    darbeIsigi, canlilik, yumusak, darbe, karis, kis, MONO, SANS };

  for (let i = 0; i < KARE; i++) {
    /* faz i/KARE — son kare 1.0 DEĞİL, döngü dikişsiz olsun diye */
    const svg = kabuk(sahne(i / KARE, arac), aksan);
    await sharp(Buffer.from(svg))
      .png({ compressionLevel: 6 })
      .toFile(path.join(gecici, String(i).padStart(4, '0') + '.png'));
  }

  execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
    '-framerate', String(FPS), '-i', path.join(gecici, '%04d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-crf', String(secenek.crf || 26), '-preset', 'slow',
    '-movflags', '+faststart', '-an', hedefMp4]);

  /* Poster: hareketin okunur olduğu bir kare (varsayılan 0.42 fazı).
     Videonun İLK karesi değil — ilk karede darbe kenarda olur ve
     istasyonlar sönük görünür; poster bunu temsil etmez. */
  const posterKare = Math.round((secenek.posterFaz === undefined ? 0.42 : secenek.posterFaz) * KARE);
  await sharp(path.join(gecici, String(posterKare).padStart(4, '0') + '.png'))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(hedefJpg);

  const bilgi = {
    mp4: hedefMp4, jpg: hedefJpg,
    mp4KB: Math.round(fs.statSync(hedefMp4).size / 1024),
    jpgKB: Math.round(fs.statSync(hedefJpg).size / 1024),
    kare: KARE, fps: FPS, posterKare,
  };
  fs.rmSync(gecici, { recursive: true, force: true });
  return bilgi;
}

module.exports = { uret, EN, BOY, KARE, FPS, AKSAN, ZEMIN, MONO, SANS,
  cam, yaz, boru, seritYolu, seritNokta, darbeIsigi, canlilik,
  yumusak, darbe, karis, kis, kabuk };
