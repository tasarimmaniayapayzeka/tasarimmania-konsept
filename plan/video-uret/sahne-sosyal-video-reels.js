/* SAHNE — video-produksiyon / sosyal-video-reels
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım (index.html, "Ayrıntılar"
 * bölümü). Uydurma yok, üç durak birebir bunlar:
 *   01 Platform Yerleşimine Göre Kurgu Farkları
 *      "Akış, keşfet ve reklam alanında gösterilen reels içerikleri farklı
 *       davranış kalıplarıyla izlenir. Kurgu, içeriğin gösterileceği
 *       yerleşime göre açılış hızı ve metin yoğunluğu açısından yeniden
 *       ayarlanabilir."
 *   02 Altyazı ve Okunabilirlik Kurgusu
 *      "Sesin kapalı izlendiği ortamlar göz önünde bulundurularak altyazı,
 *       kontrast ve harf büyüklüğü güvenli alan sınırları içinde okunaklı
 *       kalacak şekilde yerleştirilir."
 *   03 Ses Tasarımı ve Denge
 *      "Müzik, seslendirme ve efekt katmanları; mesajın vurgulanması gereken
 *       anında öne çıkacak, geri kalan bölümde ise geri planda kalacak
 *       şekilde dengelenir."
 *
 * Arayüzün neyle çakıştığı da sayfanın kendi metninden alındı
 * (Derinlemesine 02 + SSS): "profil simgesi, açıklama metni ve etkileşim
 * butonları bu bölgelerde yer alır."
 *
 * ── TERİM UYARISI: "GÜVENLİ ALAN" BU SAYFADA TERSİNE TANIMLI ──────────
 * DENETİMDE BULUNDU. Sezgi "ortadaki temiz bölge güvenli alandır" der;
 * bu sayfa BUNUN TERSİNİ söylüyor:
 *   SSS 02  : "Güvenli alan, arayüz elemanlarının video üzerine bindiği
 *              bölgelerdir."
 *   kart 02 : "başlık, alt yazı ve marka logosu bu güvenli alan dışına
 *              yerleştirilir."
 * Yani sayfaya göre TARALI bantlar güvenli alandır, ortadaki kesik çizgili
 * temiz bölge değil. Sayfanın kendi 02 figürü de böyle etiketliyor
 * (index.html'deki uzun yorum, "SAYFAYA UYULDU, TARİFE DEĞİL").
 * Bu sahne aynı çözümü kullanıyor: taralı bantlar = arayüzün bindiği yer,
 * ortadaki kesik çizgili çerçeve = sayfanın deyişiyle "başlık ve alt yazı"
 * alanı. Videoda hiçbir etiket YAZILMADIĞI için terim ekrana çıkmıyor;
 * bu not yalnız sonraki okuyucu yanlış tarafı çizmesin diye burada.
 *
 * FİKİR: reklam-filmi sahnesinin DNA'sı korunur — akan cam boru üç durağa
 * uğrar, ışık darbesi boru boyunca yürür, hangi durağın üstündeyse o durak
 * canlanır ve KENDİ işini yapar:
 *   01 · üç yerleşim kutusu sırayla seçilir; seçilene göre açılış bloğu ve
 *        metin satırları YENİDEN AYARLANIR (kurgu farkı görünür olur)
 *   02 · dikey çerçevede arayüzün bindiği ÜST ve ALT bantlar taranmış, ortada
 *        kesik çizgili temiz bölge; altyazı canlandıkça arkasına kontrast
 *        plakası gelir ve harf yüksekliği büyür
 *   03 · üç sürgü (seslendirme / müzik / efekt) ters yönde hareket eder —
 *        vurgu anında seslendirme öne çıkar, müzik geri çekilir; altta
 *        ortaya çıkan miks dalgası o anda kabarır
 * Beş saniyede bir tur, dikişsiz döngü: her hareket faz cinsinden periyodik.
 *
 * BU SAYFAYA ÖZEL YASAKLAR (uygulandı):
 *   · Platform logosu ya da platforma benzeyen ikon YOK. Etkileşim butonları
 *     NÖTR YUVARLAK; kalp / konuşma balonu / paylaş oku gibi tanıyıcı şekil
 *     hiç çizilmedi.
 *   · Rakam YOK — izlenme, oran, "ilk 3 saniye", süre, fiyat yazılmadı.
 *     Yalnız durak numaraları (01/02/03) var, onlar sayfanın kendi
 *     numaralandırması.
 *   · İnsan yüzü YOK; çerçeve içindeki görüntü soyut leke.
 *   · Videodaki TEK yazı üç durak etiketi, 28 px (mobilde ~8,8 px eşiği).
 *     Ayrıntının tamamını şekiller taşıyor.
 *
 * ── ÜRETİM: crf 23, uret.js'in varsayılan 26'sı DEĞİL ──────────────────
 * Bu sahne kardeşlerinden farklı kodlanıyor; sebebi ölçüldü, keyfi değil.
 * dongu-denetim.js crf 26'da 1.63× veriyordu (eşik 1.6). Sıçrama SAHNEDE
 * DEĞİL, kodlayıcıda: aynı kareler, yalnız crf değiştirilerek ölçüldü —
 *     crf 26 → 1.63×   crf 23 → 1.30×   crf 20 → 1.07×   crf 18 → 0.95×
 * Hareket sabitken oranın crf ile düşmesi, farkın x264'ün anahtar kare
 * nicemlemesinden geldiğini gösteriyor (kare 0 temiz bir I-kare, kare 119
 * sürüklenmiş bir P-kare).
 * Kodlanmamış KAYNAK karelerde döngü zaten dikişsiz:
 *   · 280×156'da  dikiş 0.105 / ortalama 0.326 = 0.33×
 *   · tam çözünürlükte 119→0 farkı 0.1193 — komşularından (0.1777, 0.1920,
 *     0.1676) DAHA KÜÇÜK, yani dikiş normal kare akışının bile altında.
 * Bu yüzden hareket "metrik geçsin diye" artırılmadı; sahne olduğu gibi
 * bırakılıp crf 23'e alındı. Dosya 261 KB — modül videolarının 180–600 KB
 * bandının içinde.
 * Yeniden üretmek için:
 *   node -e "const m=require('./plan/video-uret/motor'),
 *            s=require('./plan/video-uret/sahne-sosyal-video-reels.js');
 *            m.uret('modul-video/sosyal-video-reels','video',s,{crf:23})"
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Durak etiketleri kısa tutuldu: istasyon genişliği 246 px, yazı 28 px mono
   + 1.2 harf arası → yaklaşık 14 karakter sığıyor (reklam-filmi sahnesinde
   "02 ÇEKİM PLANI" ile ölçüldü). En uzunu 14 karakter. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 YERLEŞİM' },
  { x: 437, fazMerkez: 0.50, etiket: '02 ALTYAZI' },
  { x: 812, fazMerkez: 0.80, etiket: '03 SES DENGESİ' },
];
const DW = 246, DH = 344, DY = 126;

/* 01'deki üç yerleşimin kurgu ayarı. Sayfa "açılış hızı ve metin yoğunluğu"
   diyor; ikisi de 0..1 soyut oran olarak tutuluyor, ekranda RAKAM olarak
   değil yalnız blok genişliği / satır sayısı olarak görünüyor. */
const YERLESIM = [
  { hiz: 0.70, yog: 0.44 },   // akış     — tek parça, dengeli
  { hiz: 0.90, yog: 0.28 },   // keşfet   — hızlı açılış, az metin
  { hiz: 0.52, yog: 0.80 },   // reklam   — sakin açılış, çok metin
];

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
    s += (i === 0 ? yerlesim(d.x, p, faz, a)
        : i === 1 ? altyazi(d.x, p, faz, a)
                  : sesDengesi(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · PLATFORM YERLEŞİMİNE GÖRE KURGU FARKLARI ──────────────────────
   Üstte üç dikey yerleşim kutusu: akış (tek parça), keşfet (kılavuz içinde
   bir kare), reklam (altında çağrı bandı). Seçim tam bir döngüde üçünü
   dolaşır. Altta iki ayar satırı seçime göre YENİDEN KURULUR:
     · açılış bloğu + kesme işaretleri  → "açılış hızı"
     · metin satırları                  → "metin yoğunluğu"
   Satır başlarındaki küçük işaretler yazı değil şekil (çift ok = hız,
   üç çizgi yığını = metin) — 28 px altı yazı kuralı bu yüzden bozulmuyor. */
function yerlesim(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';
  const fw = 64, fh = 128, fy = DY + 24;

  /* Seçim ağırlıkları — üçgen pencere, toplamı her fazda tam 1, döngüsel
     mesafe kullanıldığı için faz 0 ile 1 aynı → dikişsiz.
     ÖLÇÜLEN KUSUR: ilk sürümde seçim tur başına BİR kez dönüyordu; bu durak
     yalnız faz 0.01–0.39 arasında canlı olduğu için üçüncü yerleşim
     (reklam) tam da durak karardığında seçiliyordu, yani hiç görünmüyordu.
     Turda ÜÇ kez döndürüldü: canlı pencerede üçü de sırasını alıyor. */
  const uFaz = (faz * 3) % 1;
  const w = [0, 1, 2].map((i) => Math.max(0, 1 - dongusel(uFaz, (2 * i + 1) / 6) * 3));
  const hiz = w[0] * YERLESIM[0].hiz + w[1] * YERLESIM[1].hiz + w[2] * YERLESIM[2].hiz;
  const yog = w[0] * YERLESIM[0].yog + w[1] * YERLESIM[1].yog + w[2] * YERLESIM[2].yog;

  for (let i = 0; i < 3; i++) {
    const fx = bx + 22 + i * 69;
    const sec = w[i] * (0.30 + 0.70 * p);

    /* seçili kutunun arkasında hafif hale */
    if (sec > 0.05) {
      s += `<rect x="${fx - 7}" y="${fy - 7}" width="${fw + 14}" height="${fh + 14}" rx="14"
              fill="rgba(${A},${(0.10 * sec).toFixed(3)})"/>`;
    }
    s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="9"
            fill="rgba(255,255,255,${(0.026 + 0.05 * sec).toFixed(3)})"
            stroke="rgba(${A},${(0.13 + 0.60 * sec).toFixed(3)})" stroke-width="1.4"/>`;

    if (i === 0) {
      /* AKIŞ — tek parça, ekranı dolduran dikey içerik */
      s += `<rect x="${fx + 6}" y="${fy + 6}" width="${fw - 12}" height="${fh - 12}" rx="6"
              fill="rgba(255,255,255,${(0.035 + 0.03 * sec).toFixed(3)})"/>`;
      s += `<circle cx="${fx + 25}" cy="${fy + 48}" r="16"
              fill="rgba(${A},${(0.16 + 0.24 * sec).toFixed(3)})"/>`;
      s += `<rect x="${fx + 12}" y="${fy + 95}" width="36" height="6" rx="3"
              fill="rgba(255,255,255,${(0.16 + 0.24 * sec).toFixed(3)})"/>`;
      s += `<rect x="${fx + 12}" y="${fy + 106}" width="23" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.10 + 0.16 * sec).toFixed(3)})"/>`;
    } else if (i === 1) {
      /* KEŞFET — kılavuz içinde bir kare; içerik komşularıyla yarışır */
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 2; c++) {
          const tx = fx + 5 + c * 29, ty = fy + 5 + r * 40;
          const bu = (r === 1 && c === 0);
          s += `<rect x="${tx}" y="${ty}" width="25" height="36" rx="4"
                  fill="${bu ? `rgba(${A},${(0.20 + 0.34 * sec).toFixed(3)})`
                             : `rgba(255,255,255,${(0.045 + 0.025 * sec).toFixed(3)})`}"/>`;
        }
      }
    } else {
      /* REKLAM — içerik + altında nötr çağrı bandı (metin yok, salt blok) */
      s += `<rect x="${fx + 6}" y="${fy + 6}" width="${fw - 12}" height="86" rx="6"
              fill="rgba(255,255,255,${(0.035 + 0.03 * sec).toFixed(3)})"/>`;
      s += `<circle cx="${fx + 26}" cy="${fy + 44}" r="14"
              fill="rgba(${A},${(0.14 + 0.22 * sec).toFixed(3)})"/>`;
      s += `<rect x="${fx + 12}" y="${fy + 72}" width="30" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.12 + 0.18 * sec).toFixed(3)})"/>`;
      s += `<rect x="${fx + 9}" y="${fy + 102}" width="${fw - 18}" height="17" rx="8.5"
              fill="rgba(${A},${(0.24 + 0.46 * sec).toFixed(3)})"/>`;
    }

    /* seçim işareti — kutunun üstünde aşağı bakan küçük üçgen */
    if (sec > 0.03) {
      const mx = fx + fw / 2;
      s += `<path d="M${mx - 6} ${fy - 14} L${mx + 6} ${fy - 14} L${mx} ${fy - 5} Z"
              fill="rgba(${A},${(0.85 * sec).toFixed(3)})"/>`;
    }
  }

  /* ayrım çizgisi — üstte yerleşim, altta kurgu ayarı */
  s += `<line x1="${bx + 22}" y1="298" x2="${bx + 224}" y2="298"
          stroke="rgba(255,255,255,${(0.05 + 0.06 * p).toFixed(3)})" stroke-width="1"/>`;

  /* --- AÇILIŞ HIZI: açılış bloğu + kesme işaretleri --------------------- */
  const x0 = bx + 52, x1 = bx + 220, ry = 318;
  /* çift ok işareti = hız (yazı değil, şekil) */
  const gx = bx + 28, gy = ry + 5;
  s += `<path d="M${gx - 8} ${gy - 6} L${gx - 2} ${gy} L${gx - 8} ${gy + 6}
                 M${gx + 1} ${gy - 6} L${gx + 7} ${gy} L${gx + 1} ${gy + 6}"
          fill="none" stroke="rgba(255,255,255,${(0.22 + 0.34 * p).toFixed(3)})"
          stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<rect x="${x0}" y="${ry}" width="${x1 - x0}" height="10" rx="5"
          fill="rgba(255,255,255,.048)"/>`;
  const acilis = 24 + 72 * (1 - hiz);
  s += `<rect x="${x0}" y="${ry}" width="${acilis.toFixed(1)}" height="10" rx="5"
          fill="rgba(${A},${(0.34 + 0.46 * p).toFixed(2)})"/>`;
  const adim = 42 - 20 * hiz;
  for (let k = 1; k <= 8; k++) {
    const px = x0 + acilis + adim * k;
    const sonuk = kis01((x1 - 5 - px) / 14);
    if (sonuk <= 0) break;
    s += `<line x1="${px.toFixed(1)}" y1="${ry - 3}" x2="${px.toFixed(1)}" y2="${ry + 13}"
            stroke="rgba(255,255,255,${(sonuk * (0.16 + 0.30 * p)).toFixed(3)})" stroke-width="1.8"/>`;
  }

  /* --- METİN YOĞUNLUĞU: satır sayısı ve uzunluğu ----------------------- */
  const my = 356;
  /* üç çizgi yığını işareti = metin */
  for (let g = 0; g < 3; g++) {
    s += `<rect x="${bx + 20}" y="${my + 22 + g * 8}" width="${16 - g * 4}" height="3.4" rx="1.7"
            fill="rgba(255,255,255,${(0.20 + 0.30 * p).toFixed(3)})"/>`;
  }
  const taban = [148, 118, 92, 130];
  taban.forEach((tb, k) => {
    const sy = my + k * 18;
    const gorun = k < 3 ? 1 : kis01((yog - 0.40) / 0.28);
    if (gorun <= 0) return;
    s += `<rect x="${x0}" y="${sy}" width="${tb}" height="8" rx="4"
            fill="rgba(255,255,255,${(0.05 * gorun).toFixed(3)})"/>`;
    s += `<rect x="${x0}" y="${sy}" width="${(tb * (0.30 + 0.70 * yog)).toFixed(1)}" height="8" rx="4"
            fill="rgba(255,255,255,${(gorun * (0.26 + 0.40 * p)).toFixed(3)})"/>`;
  });

  return s;
}

/* ── 02 · ALTYAZI VE OKUNABİLİRLİK ──────────────────────────────────────
   Dikey çerçeve (9:16). Arayüzün bindiği İKİ bölge taranmış: ÜST şerit ve
   ALT şerit. Alt şeritte profil yuvarlağı, profil + açıklama çubukları ve
   BUNLARIN SAĞINDA üç nötr yuvarlak (etkileşim butonları — tanıyıcı hiçbir
   şekil yok). Ortada kesik çizgili temiz bölge = sayfanın deyişiyle "başlık
   ve alt yazı" alanı; solundaki ölçü ayracı sınırını gösterir. Altyazı bu
   bölgenin içinde: durak canlandıkça arkasına kontrast plakası gelir, harf
   yüksekliği büyür. Sağ üstteki nötr rozet sessiz izlenmeyi anlatır: ses
   seviyeleri düz, üstü çizik.

   DENETİMDE DÜZELTİLDİ — SAĞ SÜTUN KALDIRILDI. Önceki sürümde üçüncü bir
   taralı bölge (sağ sütun) vardı ve üç nötr yuvarlak oraya konmuştu. Sayfa
   böyle bir bölge TANIMLAMIYOR; iki yerde de yalnız üst/alt diyor:
     kart 02 / Derinlemesine 02: "Dikey format, ekranın ÜST VE ALT
       kısımlarında platform arayüzüyle çakışan alanlar barındırır"
     sayfanın kendi 02 figürü (svA2): "Üst ve alt bölgeler köşegen taralı…
       ALT TARALI BANTTA profil yuvarlağı, profil ve açıklama çubukları ve
       BUNLARIN SAĞINDA üç nötr yuvarlak yer alıyor"
   Yani video, aynı sayfadaki kardeş figürle çelişiyordu: butonlar orada alt
   bantta, burada sağ sütundaydı. Yuvarlaklar sayfanın dediği yere taşındı,
   sağ tarama silindi. Boşalan genişlik temiz bölgeye verildi (gw 96 → 128),
   bu da altyazı çubuklarını uzattı — mobilde okunurluk arttı. */
function altyazi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  /* Çerçeve sola kaydırıldı: sağ boşlukta sessizlik rozetine gerçek yer
     açılsın diye. İlk sürümde rozet r=17 ile sıkışıyor ve içindeki işaretler
     birbirine giriyordu (önizlemede okunmadı). */
  const fx = bx + 40, fw = 148, fy = 152, fh = 264;
  const id = 'cr' + Math.round(bx);
  let s = '';

  s += `<clipPath id="${id}"><rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="14"/></clipPath>`;
  s += `<g clip-path="url(#${id})">`;
  /* çerçeve içindeki görüntü — soyut leke, insan yüzü yok */
  s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="#131A26"/>`;
  /* görüntü ağır ağır kayar — "video oynuyor" duygusu. sin/cos faz cinsinden
     tam tur attığı için döngüde sıçrama yok. */
  const kx = 7 * Math.sin(2 * Math.PI * faz), ky = 5 * Math.cos(2 * Math.PI * faz);
  s += `<circle cx="${(fx + 54 + kx).toFixed(1)}" cy="${(fy + 128 + ky).toFixed(1)}" r="48"
          fill="rgba(${A},${(0.09 + 0.10 * p).toFixed(3)})"/>`;
  s += `<circle cx="${(fx + 108 - kx).toFixed(1)}" cy="${(fy + 96 - ky).toFixed(1)}" r="26"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"/>`;
  s += `<rect x="${fx}" y="${fy + 196}" width="${fw}" height="68"
          fill="rgba(255,255,255,.026)"/>`;

  /* arayüzün bindiği bölgeler — taralı. SAYFANIN DEDİĞİ KADAR: üst ve alt. */
  s += tarama(id + 'a', fx, fy, fw, 32, p);
  s += tarama(id + 'b', fx, fy + fh - 58, fw, 58, p);
  s += `</g>`;

  /* çerçeve kenarı */
  s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="14" fill="none"
          stroke="rgba(255,255,255,${(0.13 + 0.16 * p).toFixed(3)})" stroke-width="1.5"/>`;

  /* alt şerit içeriği — sayfanın kendi 02 figüründeki sırayla: profil
     yuvarlağı, profil + açıklama çubukları, BUNLARIN SAĞINDA üç nötr
     yuvarlak. Altyazının neden buraya konamayacağını gösterir.
     Çubuklar kısaltıldı (86→62, 58→44): yuvarlaklara sayfanın tarif ettiği
     yer açılsın diye. */
  s += `<circle cx="${fx + 16}" cy="${fy + fh - 40}" r="7" fill="none"
          stroke="rgba(255,255,255,${(0.20 + 0.18 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<rect x="${fx + 28}" y="${fy + fh - 44}" width="34" height="6" rx="3"
          fill="rgba(255,255,255,${(0.17 + 0.16 * p).toFixed(3)})"/>`;
  s += `<rect x="${fx + 11}" y="${fy + fh - 25}" width="62" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.11 + 0.13 * p).toFixed(3)})"/>`;
  s += `<rect x="${fx + 11}" y="${fy + fh - 15}" width="44" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})"/>`;

  /* etkileşim butonları — NÖTR yuvarlaklar, alt bantta, çubukların SAĞINDA.
     Üçü BİREBİR aynı: r, dolgu, kontur, kontur kalınlığı, opaklık — yalnız
     cx farklı. Hiçbirinde ayırt edici iç şekil yok (kalp / konuşma balonu /
     paylaş oku çizilmedi), yani platform işareti yok. */
  for (let i = 0; i < 3; i++) {
    /* cx 88+21i: en sağdaki yuvarlağın sağ kenarı fx+116, çerçeve kenarı
       fx+148 → 9 px pay. (92+22i denendi, pay 3 px kalıyordu ve masaüstü
       0,517 ölçeğinde çerçeveye yapışık okunuyordu.) Soldaki yuvarlağın sol
       kenarı fx+79, açıklama çubuğunun sağ ucu fx+73 → 6 px açıklık. */
    s += `<circle cx="${fx + 88 + i * 21}" cy="${fy + fh - 30}" r="9" fill="rgba(255,255,255,.05)"
            stroke="rgba(255,255,255,${(0.16 + 0.16 * p).toFixed(3)})" stroke-width="1.4"/>`;
  }

  /* temiz bölge ("başlık ve alt yazı" alanı) — kesik çizgili.
     Sağ tarama kalkınca genişledi: 96 → 128. */
  const gx = fx + 10, gy = 192, gw = fw - 20, gh = 158;
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="9" fill="rgba(${A},${(0.030 * p + 0.012).toFixed(3)})"
          stroke="rgba(${A},${(0.28 + 0.48 * p).toFixed(2)})" stroke-width="1.6"
          stroke-dasharray="7 5"/>`;

  /* ölçü ayracı — güvenli alanın dikey sınırını işaretler */
  const ax = bx + 24;
  s += `<path d="M${ax} ${gy} L${ax} ${gy + gh} M${ax - 7} ${gy} L${ax + 7} ${gy}
                 M${ax - 7} ${gy + gh} L${ax + 7} ${gy + gh}"
          fill="none" stroke="rgba(${A},${(0.24 + 0.42 * p).toFixed(2)})" stroke-width="1.6"
          stroke-linecap="round"/>`;

  /* ALTYAZI — kontrast plakası + harf yüksekliği p ile büyür.
     Satırlar da ilerler: art arda gelen üç altyazı boyu arasında yumuşak
     geçiş var (turda iki tur → durak canlıyken iki-üç satır görülüyor).
     Üçgen ağırlıklar toplamı her fazda 1, döngüsel mesafeyle hesaplandığı
     için faz 0 ile 1 aynı → dikişsiz. Plaka metni sarar: genişliği en uzun
     satıra göre değişir, kontrast plakasının işi bu. */
  const SATIR = [[1.00, 0.62], [0.80, 0.94], [1.00, 0.38]];
  const cFaz = (faz * 2) % 1;
  const sw = [0, 1, 2].map((i) => Math.max(0, 1 - dongusel(cFaz, (2 * i + 1) / 6) * 3));
  /* En uzun satır payı. gw-28 idi; o değerde plaka (satır + 26 kenar payı)
     temiz bölgeye 1 px kala oturuyor, kesik çizgiye yapışık görünüyordu.
     gw-40 ile plaka her iki yandan 7 px içeride kalıyor — ölçüldü. */
  const tam = gw - 40;
  const u1 = tam * (sw[0] * SATIR[0][0] + sw[1] * SATIR[1][0] + sw[2] * SATIR[2][0]);
  const u2 = tam * (sw[0] * SATIR[0][1] + sw[1] * SATIR[1][1] + sw[2] * SATIR[2][1]);
  const hy = 6.2 + 3.6 * p;
  const py = gy + gh - 56;
  const pw = Math.max(u1, u2) + 26;
  const px = gx + (gw - pw) / 2;
  s += `<rect x="${px.toFixed(1)}" y="${py}" width="${pw.toFixed(1)}" height="46" rx="9"
          fill="rgba(6,8,13,${(0.24 + 0.50 * p).toFixed(2)})"
          stroke="rgba(255,255,255,${(0.05 + 0.14 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += `<rect x="${(gx + (gw - u1) / 2).toFixed(1)}" y="${py + 11}" width="${u1.toFixed(1)}" height="${hy.toFixed(1)}" rx="${(hy / 2).toFixed(1)}"
          fill="rgba(255,255,255,${(0.34 + 0.56 * p).toFixed(2)})"/>`;
  s += `<rect x="${(gx + (gw - u2) / 2).toFixed(1)}" y="${(py + 11 + hy + 7).toFixed(1)}" width="${u2.toFixed(1)}" height="${hy.toFixed(1)}" rx="${(hy / 2).toFixed(1)}"
          fill="rgba(255,255,255,${(0.26 + 0.50 * p).toFixed(2)})"/>`;

  /* SESSİZ ROZETİ — düz ses seviyeleri + eğik çizgi. Hoparlör ya da platform
     işareti YOK; sayfanın "sesin kapalı izlendiği ortamlar" ifadesi. */
  const mx = bx + 216, my = 194, r = 22;
  s += `<circle cx="${mx}" cy="${my}" r="${r}" fill="rgba(14,17,24,.78)"
          stroke="rgba(255,255,255,${(0.15 + 0.20 * p).toFixed(3)})" stroke-width="1.5"/>`;
  /* Çubuklar UZUN, eğik çizginin karartma kılıfı İNCE: ilk sürümde kılıf
     7 px'ti ve ortadaki çubuğu tamamen yiyordu (önizlemede iki nokta gibi
     okundu). Şimdi çizginin iki yanında çubuğun görünür payı kalıyor. */
  [[-11, 9], [0, 19], [11, 9]].forEach(([dx, h]) => {
    s += `<rect x="${mx + dx - 2.3}" y="${my - h / 2}" width="4.6" height="${h}" rx="2.3"
            fill="rgba(255,255,255,${(0.52 + 0.34 * p).toFixed(3)})"/>`;
  });
  s += `<line x1="${mx - 15}" y1="${my + 15}" x2="${mx + 15}" y2="${my - 15}"
          stroke="rgba(14,17,24,.92)" stroke-width="4.4" stroke-linecap="round"/>`;
  s += `<line x1="${mx - 15}" y1="${my + 15}" x2="${mx + 15}" y2="${my - 15}"
          stroke="rgba(${A},${(0.62 + 0.33 * p).toFixed(2)})" stroke-width="2.6" stroke-linecap="round"/>`;

  return s;
}

/* ── 03 · SES TASARIMI VE DENGE ─────────────────────────────────────────
   Üç sürgü: seslendirme, müzik, efekt. Seslendirme ile müzik TERS yönde
   hareket eder — vurgu anında seslendirme öne çıkar, müzik geri çekilir
   (sayfa: "öne çıkacak ... geri planda kalacak şekilde dengelenir").
   Altta ortaya çıkan miks dalgası: vurgu anında kabarır, o noktada aksan
   çizgisi var. Sürgülerin yeri sin(2πfaz) ile verildiği için tam periyodik. */
function sesDengesi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';
  const ty = DY + 30, tb = 186;                 // sürgü yolu üst / uzunluk

  /* ÖLÇÜLEN KUSUR: ilk sürümde sürgüler sin(2πfaz) ile turda bir kez gidip
     geliyordu; bu durak faz 0.61–0.99 arasında canlı olduğu için o pencerede
     seslendirme HEP kısıktı — "öne çıkma" anı hiç görünmüyordu. Frekans ikiye
     çıkarıldı ve faz kaydırması, tepe noktası durağın en canlı olduğu
     faz 0.80'e denk gelecek biçimde seçildi. Katsayılar tam sayı, kayma
     sabit → döngü hâlâ dikişsiz. */
  const dalga = Math.sin(2 * Math.PI * 2 * faz + 1.3 * Math.PI);
  const deger = [
    0.50 + 0.34 * dalga,                                          // seslendirme
    0.50 - 0.30 * dalga,                                          // müzik (ters)
    0.46 + 0.15 * Math.sin(2 * Math.PI * 3 * faz + 0.6),          // efekt
  ];
  const vurgu = kis01(dalga);                   // seslendirme öne çıktığı an

  /* Üç kanal şeridi. Her şerit: solda ölçek çentikleri, ortada sürgü yolu +
     başlık, sağında bitişik seviye sütunu. Bitişiklik bilerek: ölçüm ile
     sürgü aynı kanala ait olduğu tek bakışta okunsun. */
  for (let i = 0; i < 3; i++) {
    const cx = bx + 60 + i * 65;
    const sx = cx - 6;                          // sürgü ekseni
    const v = deger[i];
    const ky = ty + (1 - v) * tb;

    for (let k = 0; k <= 6; k++) {
      const cy = ty + (tb * k) / 6;
      s += `<line x1="${sx - 15}" y1="${cy.toFixed(1)}" x2="${sx - 9}" y2="${cy.toFixed(1)}"
              stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.4"/>`;
    }
    /* yol */
    s += `<rect x="${sx - 4}" y="${ty}" width="8" height="${tb}" rx="4"
            fill="rgba(255,255,255,${(0.055 + 0.030 * p).toFixed(3)})"/>`;
    /* dolu kısım (başlığın altı) */
    s += `<rect x="${sx - 4}" y="${ky.toFixed(1)}" width="8" height="${(ty + tb - ky).toFixed(1)}" rx="4"
            fill="rgba(${A},${(0.26 + 0.44 * p).toFixed(2)})"/>`;
    /* sürgü başlığı */
    s += `<rect x="${sx - 14}" y="${(ky - 8).toFixed(1)}" width="28" height="16" rx="5"
            fill="rgba(24,28,38,.92)"
            stroke="rgba(255,255,255,${(0.26 + 0.34 * p).toFixed(3)})" stroke-width="1.5"/>`;
    s += `<line x1="${sx - 8}" y1="${ky.toFixed(1)}" x2="${sx + 8}" y2="${ky.toFixed(1)}"
            stroke="rgba(${A},${(0.55 + 0.40 * p).toFixed(2)})" stroke-width="2.2"
            stroke-linecap="round"/>`;

    /* Bitişik seviye sütunu — sürgü değerine kadar dolar. Sürgü dolgusu
       aksan rengindeyken bu sütun BEYAZ: yoksa iki çubuk aynı görünüp
       "kanal + ölçüm" değil "iki çubuk" gibi okunuyordu (önizlemede görüldü). */
    for (let k = 0; k < 11; k++) {
      const segY = ty + tb - 11 - k * 17;
      const acik = v * 11 > k + 0.4;
      s += `<rect x="${cx + 10}" y="${segY}" width="7" height="11" rx="2"
              fill="rgba(255,255,255,${(acik ? 0.20 + 0.42 * p : 0.045).toFixed(3)})"/>`;
    }
  }

  /* Ayrım çizgisi — üstte miks, altta çıkan ses.
     DENETİMDE DÜZELTİLDİ: 362 idi. Vurgu noktası (yarıçapı vurguyla büyüyen)
     wy-56 = 358'de duruyor ve en büyük halinde 353,2–362,8'i kaplıyordu,
     yani çizgiyi KESİYORDU. Çizgi 350'ye alındı (miks bloğunun altı 342,
     8 px pay kalıyor), işaret aşağı indirildi; ölçülen açıklık 5,2 px. */
  s += `<line x1="${bx + 22}" y1="350" x2="${bx + 224}" y2="350"
          stroke="rgba(255,255,255,${(0.05 + 0.06 * p).toFixed(3)})" stroke-width="1"/>`;

  /* --- ortaya çıkan miks: vurgu anında kabaran dalga ------------------- */
  const wx = bx + 22, ww = 202, wy = 414, cub = 30;
  for (let i = 0; i < cub; i++) {
    const t = (i + 0.5) / cub;
    const zarf = 0.40 + 0.60 * vurgu * Math.exp(-Math.pow((t - 0.52) / 0.17, 2));
    const sal = 0.55 + 0.45 * Math.abs(
      Math.sin(2 * Math.PI * (t * 3.1 + faz * 2)) * 0.62 +
      Math.sin(2 * Math.PI * (t * 6.3 - faz * 3)) * 0.38);
    const h = zarf * sal * 82 * (0.30 + 0.70 * p);
    s += `<rect x="${(wx + t * ww - 2.3).toFixed(1)}" y="${(wy - h / 2).toFixed(1)}"
            width="4.6" height="${h.toFixed(1)}" rx="2.3"
            fill="rgba(${A},${(0.28 + 0.52 * p).toFixed(2)})"/>`;
  }
  s += `<line x1="${wx}" y1="${wy}" x2="${wx + ww}" y2="${wy}"
          stroke="rgba(255,255,255,.09)" stroke-width="1"/>`;
  /* Vurgu anı işareti — dalganın ÜSTÜNDE duran kısa çentik + nokta.
     İlk sürümde dalgayı boydan boya kesen uzun bir çizgiydi; panelde
     başıboş bir çizik gibi okunuyordu (önizlemede görüldü). */
  const vx = wx + ww * 0.52;
  s += `<line x1="${vx.toFixed(1)}" y1="${wy - 46}" x2="${vx.toFixed(1)}" y2="${wy - 40}"
          stroke="rgba(255,255,255,${(0.08 + 0.44 * vurgu * p).toFixed(3)})" stroke-width="1.8"
          stroke-linecap="round"/>`;
  s += `<circle cx="${vx.toFixed(1)}" cy="${wy - 54}" r="${(2.4 + 2.4 * vurgu).toFixed(1)}"
          fill="rgba(255,255,255,${(0.14 + 0.66 * vurgu * p).toFixed(3)})"/>`;

  return s;
}

/* --- küçük yardımcılar (yalnız bu sahne kullanıyor) --------------------- */

/* taralı bölge — arayüzün video üstüne bindiği alan */
function tarama(id, x, y, w, h, p) {
  let s = `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`;
  s += `<g clip-path="url(#${id})">`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(255,255,255,${(0.022 + 0.016 * p).toFixed(3)})"/>`;
  for (let d = -h; d < w; d += 12) {
    s += `<line x1="${(x + d).toFixed(1)}" y1="${y + h}" x2="${(x + d + h).toFixed(1)}" y2="${y}"
            stroke="rgba(255,255,255,${(0.030 + 0.024 * p).toFixed(3)})" stroke-width="1"/>`;
  }
  s += `</g>`;
  return s;
}

function dongusel(a, b) { const d = Math.abs(a - b); return Math.min(d, 1 - d); }
function kis01(v) { return Math.max(0, Math.min(1, v)); }
