/* SAHNE — web-tasarim-yazilim / ozel-yazilim
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok, metinler
 * site/hizmetler/web-tasarim-yazilim/ozel-yazilim/index.html içinden:
 *   01 Bayi Paneli ve Yetki Yönetimi
 *      "Farklı bayi, bölge veya departman rollerinin kendi yetki sınırları
 *       içinde çalıştığı paneller kurulur. Her rol için görüntüleme, onay ve
 *       raporlama yetkileri ayrı ayrı tanımlanır, böylece merkez ekip tüm ağı
 *       tek noktadan izleyebilir."
 *   02 Rezervasyon ve Randevu Otomasyonu
 *      "Takvim çakışmalarını önleyen, otomatik bildirim gönderen ve kapasite
 *       planlaması yapan rezervasyon sistemleri geliştirilir. Sistem, mevcut
 *       web sitenizle veya mobil uygulamanızla aynı veri tabanını paylaşacak
 *       şekilde kurgulanır."
 *   03 ERP/CRM Entegrasyon Katmanı
 *      "Muhasebe, stok veya müşteri yönetimi sistemleriniz ile web tarafındaki
 *       süreçler arasında veri tekrarını önleyen bir entegrasyon katmanı
 *       kurulur. Bu katman, sipariş, stok veya müşteri bilgisinin tek
 *       kaynaktan güncel kalmasını sağlar."
 *
 * FİKİR: kardeş sahnelerin dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 panel: başlık şeridi + üç rol satırı; her satırda aynı üç yetki
 *      hücresi (göz = görüntüleme, tik = onay, çubuklar = raporlama) ama HER
 *      SATIRDA FARKLI açık — "kendi yetki sınırları". Başlık şeridinin sağ
 *      ucunda nabız atan izleme noktası, altta ağ rayı ve ikisini bağlayan
 *      tek hat: "merkez ekip tüm ağı tek noktadan izleyebilir".
 *   02 takvim ızgarası: dolu hücreler, ÇAKIŞAN hücre (üst üste binen iki blok
 *      + nabız halkası) ve çakışmanın taşındığı boş hücre; sağda kendiliğinden
 *      gelip giden bildirim kartları; altında kapasite şeridi. Alt bantta TEK
 *      veri tabanı, ona bağlı iki uç: tarayıcı penceresi ve telefon.
 *   03 solda üç kaynak sistem (muhasebe = tablo, stok = kutular, müşteri
 *      yönetimi = yüzsüz avatar), ortada dikey ENTEGRASYON KATMANI (içinden
 *      tarama ışığı iner), sağda web tarafındaki süreçler penceresi. Alt
 *      bantta üç üst üste binmiş kopya kart → tek güncel kart: "veri
 *      tekrarını önleyen ... tek kaynaktan güncel".
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * DİKİŞSİZLİK: tüm hareket faz cinsinden periyodik. Kesikli çizgilerde desen
 * bir turda TAM SAYI katı kayar; genişleyen halkalarda yarıçap (faz*n)%1 ile
 * sürülür ama opaklık sin(π·u) olduğu için u=0 ve u=1'de görünmez, sıçrama
 * yok. Satır/kutu süpürmeleri durağın canlı penceresine oturtuldu, pencere
 * dışında sıfıra kırpılıyor.
 *
 * ÖLÇÜ NOTU — DARBE YARIÇAPI 52 DEĞİL 60, NEDENİ ÖLÇÜLDÜ:
 * dongu-denetim.js ilk üretimde 1.63× verip DÜŞTÜ (eşik 1.6). Teşhis için
 * dikiş bir de KAYNAK PNG'lerde ölçüldü — orada 0.16× çıktı, yani çizimde
 * sıçrama YOK; döngü noktası turun en sakin geçişi (o anda darbe tuvalin
 * dışında, üç durak da sönük). Fark kodlayıcıdan geliyor: kare 0 tek
 * I-karedir, kare 119'a kadar P-karelerde nicemleme hatası birikir ve
 * çözülen iki kare arasında ~0.70 birimlik sabit gürültü kalır. Bu taban her
 * sahnede var; oranı kurtaran şey ORTALAMA hareketin yüksekliğidir. Bu sahne
 * kardeşlerinden sakin (ince kontur, küçük hücre) ve kaynak ortalaması 0.294
 * ile eşiğin tam kıyısındaydı. Denenen kaldıraçlar (kaynak ortalaması):
 *     temel 0.299 | yarıçap 60 → 0.320 | boru hızı 4 → 0.311
 *     boru hızı 5 → 0.324 | hız 4 + yarıçap 60 → 0.333
 * BORU HIZINA DOKUNULMADI: o ritim kardeş sahnelerle ortak. Yalnız darbenin
 * yarıçapı 52 → 60 yapıldı; hâle zaten sıfıra sönümlenen radyal gradyan,
 * tek etkisi geçtiği bandı biraz daha aydınlatması. Sonuç: mp4 ortalaması
 * 0.46 → 0.49, dikiş 0.75 sabit, oran 1.63 → 1.53 ✓.
 *
 * ÖLÇÜ NOTU — BORU BANDI: ışık darbesi her durağın üstünden geçerken tuvalin
 * ortasından geçiyor (durak 01'de y≈357–368, durak 02'de y≈292–330, durak
 * 03'te y≈303–357). Bu yüzden okunması gereken içerik ÜST BLOK (y 140–292) ve
 * ALT BANT (durak 01'de 415+, 02'de 356+, 03'de 396+) olarak ikiye ayrıldı;
 * boru aradaki boş banttan geçiyor.
 *
 * YASAK (plan/video-uret/yasaklar.md → "ozel-yazilim"):
 *  - ERP/CRM ÜRÜN ADI ya da logosu YOK. Kaynak sistemler yalnız soyut şekil:
 *    tablo / kutu yığını / yüzsüz avatar. Hiçbir yere marka yazılmadı.
 *  - Bayi/bölge sayısı, kapasite rakamı YOK. Ağ rayındaki düğümler sayı
 *    bildirmiyor, kapasite şeridi de yüzde/oran yazmıyor.
 *  - "Roller gerçek bir şirket şeması gibi durmasın": hiyerarşi kutuları,
 *    ast-üst çizgisi ve unvan yok. Çizilen şey bir YETKİ MATRİSİ — üç satır
 *    aynı boyda, aynı konturda, aynı anda giriyor ve her birinde ÜÇTEN İKİ
 *    yetki açık (1-0-1 / 1-1-0 / 0-1-1), yani hiçbiri "üst rol" değil.
 *    Aynı gerekçeyle durak 03'ün stok işareti de bitişik kasa yığını olarak
 *    çizildi; ilk sürümdeki "altta iki, üstte ortalanmış bir kutu" düzeni
 *    çizgisiz olmasına rağmen şema gibi okunuyordu.
 *  - Ortak yasaklar: logo yok, rakam yok (durak numaraları hariç), insan yüzü
 *    yok (avatar yüzsüz), yazı yalnız üç durak etiketinde ve 28 punto.
 *
 * .akis İLE ÇELİŞMEME: sayfadaki .akis infografiği soldan sağa "mevcut sistem
 * (ERP/CRM/muhasebe) → akış → panel" diziyor. Durak 03 de kaynak sistemleri
 * SOLA, web tarafını SAĞA koyuyor — aynı yön. Durak 02'nin alt bandındaki tek
 * veri tabanı, .akis'teki "VERİTABANI · tek kaynak" durağıyla aynı fikirdir.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın tuval üzerindeki yeri — kardeş sahnelerle birebir aynı ızgara,
   böylece modül içindeki sayfalar aynı ritmi paylaşıyor. Üstteki 118 piksel
   sayfadaki "CANLI DÖNGÜ" rozetine bırakıldı. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 BAYİ PANELİ' },
  { x: 437, fazMerkez: 0.50, etiket: '02 REZERVASYON' },
  { x: 812, fazMerkez: 0.80, etiket: '03 ENTEGRASYON' },
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
    s += (i === 0 ? bayiPaneli(d.x, p, faz, a)
       : i === 1 ? rezervasyon(d.x, p, faz, a)
       : entegrasyon(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 60, opak: 0.9 });

  return s;
};

/* ═══ ORTAK KÜÇÜK PARÇALAR ═══════════════════════════════════════════════ */

function kis01(v) { return Math.max(0, Math.min(1, v)); }

/* Akan kesikli çizgi. desen = nokta+boşluk toplamı; bir turda desen×tur kadar
   kayar, tur TAM SAYI olduğu için faz 0 ile faz 1 aynı görünür.
   yon: -1 yol başından sonuna doğru, +1 sonundan başına doğru. */
function akan(d, faz, renk, o) {
  const desen = o.desen || 15;
  const tur = o.tur || 3;
  const yon = o.yon === undefined ? -1 : o.yon;
  const kaydir = yon * faz * desen * tur;
  return `<path d="${d}" fill="none" stroke="${renk}" stroke-width="${o.kalin || 1.4}"
            stroke-linecap="round"
            stroke-dasharray="${(desen * 0.30).toFixed(1)} ${(desen * 0.70).toFixed(1)}"
            stroke-dashoffset="${kaydir.toFixed(1)}"/>`;
}

/* Genişleyen halka — u=(faz·tur)%1, opaklık sin(π·u): iki uçta da 0,
   yarıçap sıçraması görünmez. */
function halka(cx, cy, faz, A, o) {
  const tur = o.tur || 3;
  const u = (faz * tur) % 1;
  const r = (o.r0 || 6) + (o.rArt || 13) * u;
  const op = Math.sin(Math.PI * u) * (o.guc === undefined ? 1 : o.guc);
  if (op <= 0.004) return '';
  return `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none"
            stroke="rgba(${A},${(0.80 * op).toFixed(3)})" stroke-width="1.6"/>`;
}

/* ══ 01 · BAYİ PANELİ VE YETKİ YÖNETİMİ ══════════════════════════════════
   Üst blok panelin kendisi: üstte başlık şeridi, altında üç rol satırı.
   Her satırda SOLDA rol pulu (yüzsüz avatar — üçü birebir aynı, hiçbiri öne
   çıkmıyor), SAĞDA üç yetki hücresi:
     sütun 0 = görüntüleme (göz)   sütun 1 = onay (tik)   sütun 2 = raporlama (çubuk)
   Açık/kapalı deseni her satırda FARKLI ama açık sayısı EŞİT (ikişer):
     1-0-1 / 1-1-0 / 0-1-1. "Kendi yetki sınırları" bu; üstünlük değil.
   Başlık şeridinin sağ ucundaki nabız atan izleme noktası ile alt banttaki ağ
   rayı ve ikisini birleştiren tek hat "merkez ekip tüm ağı tek noktadan
   izleyebilir" cümlesini karşılıyor. */
const YETKI = [
  [1, 0, 1],
  [1, 1, 0],
  [0, 1, 1],
];

function bayiPaneli(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const CX = bx + 123;
  let s = '';

  /* ÇİZİM NOTU — İLK SÜRÜM ELENDİ: merkez düğümü tuvalin ortasındaydı ve
     ondan üç rol puluna inen üç eğri, yetki hücrelerinin ÜSTÜNDEN geçiyordu;
     önizlemede matris okunmuyordu, kablolar hücrelerin içine giriyordu.
     Yerine panelin kendi dili kondu: üstte başlık şeridi (sağ ucunda merkez
     ekibin canlı izleme noktası), altında üç satır. Bağlantı kalabalığı
     tamamen kalktı, "panel" fikri de doğrudan okunuyor. */

  /* --- panel başlık şeridi: sağ ucunda merkez izleme noktası ------------ */
  const bX = bx + 22, bW = 202, bY = 142, bH = 28;
  s += `<rect x="${bX}" y="${bY}" width="${bW}" height="${bH}" rx="9"
          fill="rgba(${A},${(0.045 + 0.070 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.44 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<rect x="${bX + 12}" y="${bY + 11}" width="42" height="6" rx="3"
          fill="rgba(255,255,255,${(0.20 + 0.30 * p).toFixed(3)})"/>`;
  s += `<rect x="${bX + 62}" y="${bY + 11}" width="26" height="6" rx="3"
          fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
  const izx = bX + bW - 18, izy = bY + bH / 2;
  s += halka(izx, izy, faz, A, { tur: 3, r0: 7, rArt: 15, guc: 0.25 + 0.75 * p });
  s += `<circle cx="${izx}" cy="${izy}" r="5" fill="rgba(${A},${(0.34 + 0.56 * p).toFixed(2)})"/>`;
  s += `<line x1="${bX}" y1="178" x2="${bX + bW}" y2="178"
          stroke="rgba(255,255,255,${(0.06 + 0.08 * p).toFixed(3)})" stroke-width="1"/>`;

  /* --- üç rol satırı ---------------------------------------------------- */
  /* Süpürme durağın CANLI penceresine (0.01–0.39) oturtuldu; dışarıda üç
     satır da sönük olduğu için faz 0 ile faz 1 aynı — dikiş yok. */
  const u = (faz - 0.10) / 0.20;
  const pw = 32, ch = 26, hw = 38, ara = 9;
  const pX = bx + 30, cx0 = bx + 84;

  for (let i = 0; i < 3; i++) {
    const sy = 190 + i * 34;
    const sec = kis01(1 - Math.abs(u * 3 - i - 0.5) * 1.6) * p;

    /* satır zemini — sıra o satıra gelince aydınlanır */
    s += `<rect x="${bX}" y="${sy - 4}" width="${bW}" height="34" rx="9"
            fill="rgba(255,255,255,${(0.010 + 0.010 * p + 0.026 * sec).toFixed(3)})"/>`;

    /* rol pulu — üçü birebir aynı: aynı ölçü, aynı kontur, aynı zamanlama */
    s += `<rect x="${pX}" y="${sy}" width="${pw}" height="${ch}" rx="8"
            fill="rgba(255,255,255,${(0.035 + 0.045 * p + 0.045 * sec).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
    /* yüzsüz avatar silueti */
    const ax = pX + pw / 2, ay = sy + ch / 2;
    const aOp = (0.24 + 0.34 * p + 0.30 * sec).toFixed(3);
    s += `<circle cx="${ax}" cy="${ay - 4.5}" r="4.2" fill="rgba(255,255,255,${aOp})"/>`;
    s += `<path d="M${ax - 7.5} ${ay + 7} a7.5 7.5 0 0 1 15 0 Z"
            fill="rgba(255,255,255,${aOp})"/>`;

    /* üç yetki hücresi */
    for (let k = 0; k < 3; k++) {
      const hx = cx0 + k * (hw + ara);
      s += yetkiHucre(hx, sy, hw, ch, k, YETKI[i][k] === 1, p, sec, A);
    }
  }

  /* --- alt bant: ağ rayı (boru bandının ALTINDA, y 415+) ---------------- */
  const ry = 436, rx0 = bx + 30, rx1 = bx + 216;
  /* panelden raya inen tek hat; noktalar YUKARI, panele doğru akıyor —
     "merkez ekip tüm ağı tek noktadan izleyebilir" */
  const hatD = `M${CX} ${bY + bH + 122} V ${ry - 10}`;
  s += `<path d="${hatD}" fill="none" stroke="rgba(255,255,255,${(0.035 + 0.035 * p).toFixed(3)})" stroke-width="1"/>`;
  s += akan(hatD, faz, `rgba(${A},${(0.14 + 0.34 * p).toFixed(3)})`,
    { desen: 16, tur: 5, yon: 1, kalin: 1.3 });

  s += `<line x1="${rx0}" y1="${ry}" x2="${rx1}" y2="${ry}"
          stroke="rgba(255,255,255,${(0.07 + 0.08 * p).toFixed(3)})" stroke-width="1.2"/>`;
  const N = 7;
  for (let i = 0; i < N; i++) {
    const nx = rx0 + (rx1 - rx0) * (i / (N - 1));
    /* dalga: tam frekans 2, düğüm sırasına göre kayık — periyodik, dikişsiz */
    const dalga = 0.5 + 0.5 * Math.sin(2 * Math.PI * (faz * 3 - i / N));
    const g = (0.11 + 0.13 * dalga + 0.52 * dalga * p).toFixed(3);
    s += `<rect x="${(nx - 6).toFixed(1)}" y="${ry - 6}" width="12" height="12" rx="3.5"
            fill="rgba(${A},${g})" stroke="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})" stroke-width="1"/>`;
  }
  return s;
}

/* Tek yetki hücresi. Açıkken aksan dolgulu ve işareti parlak; kapalıyken
   aynı işaret sönük duruyor — hangi yetkinin kapalı olduğu okunsun diye. */
function yetkiHucre(x, y, w, h, tip, acik, p, sec, A) {
  const cx = x + w / 2, cy = y + h / 2;
  const g = acik ? (0.30 + 0.40 * p + 0.30 * sec) : 0;
  let s = '';
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7"
          fill="${acik ? `rgba(${A},${(0.07 + 0.22 * g).toFixed(3)})` : `rgba(255,255,255,${(0.016 + 0.014 * p).toFixed(3)})`}"
          stroke="${acik ? `rgba(${A},${(0.24 + 0.50 * g).toFixed(3)})` : `rgba(255,255,255,${(0.07 + 0.05 * p).toFixed(3)})`}"
          stroke-width="1.3"/>`;
  const op = acik ? (0.42 + 0.52 * g).toFixed(3) : (0.10 + 0.06 * p).toFixed(3);
  const renk = `rgba(255,255,255,${op})`;
  /* MÜREKKEP DENGESİ — ÖLÇÜLDÜ, TAHMİN DEĞİL.
     Üç satırın her birinde ikişer yetki açık; satırlar ancak İŞARETLERİN
     mürekkebi eşitse eşit parlaklıkta olur — yoksa "farklı yetki sınırı"
     yerine "sönük rol / parlak rol" okunur.
     YÖNTEM: faz 0.32 (durak canlı, p=0.368, üç satırda da süpürme vurgusu
     sıfır). Her satırın 198×26 kutusunun ortalama parlaklığından AYNI y
     aralığındaki boş zemin şeridi çıkarılıyor. Çıkarma şart: tuvalin radyal
     halesi ve borunun bulanık parlaması alt satırları kendiliğinden
     aydınlatıyor, ham ortalamalar (55.28 / 58.72 / 61.20) bu yüzden yalan
     söylüyor.
       İLK SÜRÜM (göz kontur 1.5 + bebek 2.7 / tik 2.2 / çubuk gen. 3.6):
         net 25.84 / 27.15 / 28.41 → %9.45 yayılım. Sıra tik > çubuk > göz;
         yani "göz + çubuk" satırı en sönük görünüyordu.
       SON SÜRÜM (aşağıdaki ölçüler): net 27.34 / 28.21 / 28.45 → %3.99. */
  if (tip === 0) {
    /* görüntüleme — göz */
    s += `<ellipse cx="${cx}" cy="${cy}" rx="10.6" ry="6.5" fill="none"
            stroke="${renk}" stroke-width="2.3"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="3.4" fill="${renk}"/>`;
  } else if (tip === 1) {
    /* onay — tik */
    s += `<path d="M${cx - 6.6} ${cy + 0.6} L${cx - 1.9} ${cy + 4.9} L${cx + 6.6} ${cy - 4.4}"
            fill="none" stroke="${renk}" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    /* raporlama — üç çubuk */
    [[-7.4, 8], [-1.85, 12], [3.7, 10]].forEach(([dx, hh]) => {
      s += `<rect x="${(cx + dx).toFixed(1)}" y="${(cy + 6 - hh).toFixed(1)}" width="3.7" height="${hh}" rx="1.7"
              fill="${renk}"/>`;
    });
  }
  return s;
}

/* ══ 02 · REZERVASYON VE RANDEVU OTOMASYONU ══════════════════════════════
   Üst blok: 4×4 takvim ızgarası. Bazı hücreler dolu; BİR hücrede üst üste
   binmiş iki blok + nabız halkası = çakışma; oradan komşu boş hücreye kavisli
   bir hat gidiyor = "takvim çakışmalarını önleyen". Sağdaki üç kart kendi
   kendine gelip gidiyor = "otomatik bildirim gönderen". Izgaranın altındaki
   şerit = "kapasite planlaması" (oran/yüzde YAZMIYOR).
   Alt bant: TEK veri tabanı, ona bağlı iki uç — tarayıcı penceresi ve telefon.
   EŞİTLİK: sayfa "mevcut web sitenizle VEYA mobil uygulamanızla aynı veri
   tabanını" diyor; ikisi de geçerli. İki uç aynı anda giriyor, aynı kontur
   alfası, aynı bağlantı hızı ve aynasal bağ eğrisi kullanıyor. Dolgu alfaları
   ALANA GÖRE dengelendi (ölçüldü, aşağıdaki nota bakın). */
const DOLU = [[1, 0], [0, 1], [3, 1], [3, 3]];
const CAKISMA = [1, 2];
const HEDEF = [2, 3];

function rezervasyon(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const IL = bx + 20, CX = bx + 123;
  const gw = 32, gh = 26, gx = IL, gy = 152, adx = 37, ady = 31;
  const hx = (c) => gx + c * adx;
  const hy = (r) => gy + r * ady;
  const u = (faz - 0.40) / 0.20;
  let s = '';

  /* --- üst şerit: gün başlıkları (yazısız çubuk) ------------------------ */
  for (let c = 0; c < 4; c++) {
    s += `<rect x="${hx(c)}" y="142" width="${gw}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})"/>`;
  }

  /* --- ızgara ----------------------------------------------------------- */
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      s += `<rect x="${hx(c)}" y="${hy(r)}" width="${gw}" height="${gh}" rx="6"
              fill="rgba(255,255,255,${(0.018 + 0.016 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.055 + 0.055 * p).toFixed(3)})" stroke-width="1"/>`;
    }
  }
  /* dolu randevular — süpürmeyle sırayla parlıyor */
  DOLU.forEach(([c, r], i) => {
    const sec = kis01(1 - Math.abs(u * 4 - i - 0.5) * 1.5) * p;
    s += `<rect x="${hx(c) + 5}" y="${hy(r) + 6}" width="${gw - 10}" height="${gh - 12}" rx="4"
            fill="rgba(${A},${(0.22 + 0.30 * p + 0.34 * sec).toFixed(3)})"/>`;
  });

  /* --- çakışan hücre: üst üste binen iki blok + nabız halkası ----------- */
  const cx = hx(CAKISMA[0]), cy = hy(CAKISMA[1]);
  const ccx = cx + gw / 2, ccy = cy + gh / 2;
  s += `<rect x="${cx}" y="${cy}" width="${gw}" height="${gh}" rx="6"
          fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.16 + 0.18 * p).toFixed(3)})" stroke-width="1.3"
          stroke-dasharray="4 3"/>`;
  /* ÖLÇÜ NOTU: iki blok ilk sürümde %13–29 beyazdı ve tek gri leke gibi
     okunuyordu; üst üste binmeleri görünmüyordu. Alfalar yükseltildi ve
     alttaki bloğa kontur eklendi, böylece "iki randevu aynı yerde" ayırt
     ediliyor. Halkanın turu 2 → 3: tur 2'de u=(faz·2)%1, durağın ZİRVESİNDE
     (faz 0.50) tam 0 oluyordu, yani nabız hiç görünmüyordu (önizlemede
     ölçüldü). Tur 3'te aynı fazda u=0.5, halka en parlak yerinde. */
  s += `<rect x="${cx + 4}" y="${cy + 4}" width="20" height="9" rx="3"
          fill="rgba(255,255,255,${(0.26 + 0.30 * p).toFixed(3)})"/>`;
  s += `<rect x="${cx + 9}" y="${cy + 12}" width="20" height="9" rx="3"
          fill="rgba(255,255,255,${(0.20 + 0.24 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.28 + 0.34 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += halka(ccx, ccy, faz, A, { tur: 3, r0: 11, rArt: 15, guc: 0.25 + 0.75 * p });

  /* --- çakışma boş hücreye taşınıyor ------------------------------------ */
  const tx = hx(HEDEF[0]), ty = hy(HEDEF[1]);
  const tcx = tx + gw / 2, tcy = ty + gh / 2;
  const kavis = `M${ccx} ${ccy + 11} C ${ccx + 16} ${ccy + 22} ${tcx - 16} ${tcy - 22} ${tcx} ${tcy - 11}`;
  s += `<path d="${kavis}" fill="none" stroke="rgba(255,255,255,${(0.05 + 0.05 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += akan(kavis, faz, `rgba(${A},${(0.26 + 0.46 * p).toFixed(3)})`,
    { desen: 13, tur: 6, yon: -1, kalin: 1.5 });
  s += `<path d="M${tcx - 5} ${tcy - 15} L${tcx} ${tcy - 8} L${tcx + 5} ${tcy - 15} Z"
          fill="rgba(${A},${(0.30 + 0.50 * p).toFixed(3)})"/>`;
  s += `<rect x="${tx + 5}" y="${ty + 6}" width="${gw - 10}" height="${gh - 12}" rx="4"
          fill="rgba(${A},${(0.24 + 0.46 * p).toFixed(3)})"/>`;

  /* --- kapasite şeridi (rakam yok) -------------------------------------- */
  const kw = 3 * adx + gw, ky = 280, seg = 9;
  const sw = (kw - (seg - 1) * 3) / seg;
  for (let i = 0; i < seg; i++) {
    const dalga = 0.5 + 0.5 * Math.sin(2 * Math.PI * (faz * 3 - i / seg));
    s += `<rect x="${(gx + i * (sw + 3)).toFixed(1)}" y="${ky}" width="${sw.toFixed(1)}" height="8" rx="4"
            fill="rgba(${A},${(0.08 + 0.11 * dalga + 0.36 * dalga * p).toFixed(3)})"/>`;
  }

  /* --- otomatik bildirim kartları --------------------------------------- */
  /* ÖLÇÜ NOTU: kart bx+172'de 54 genişti ve kayma 30 idi; en dıştaki durumda
     sağ kenar bx+256'ya çıkıyor, yani cam panelin (bx+246) DIŞINA taşıyordu —
     önizlemede üstteki kart panelin kenarından sarkıyordu. Genişlik ve kayma
     kısıldı: en dış durumda sağ kenar bx+240. */
  const nx = bx + 170, nw = 50, nh = 22;
  for (let i = 0; i < 3; i++) {
    const ny = 156 + i * 34;
    /* ÖLÇÜ NOTU: opaklık ilk sürümde doğrudan g idi; durağın zirvesinde
       (faz 0.50) birinci kartın g'si tam 0 çıkıyor ve sütunun üstü BOŞ
       kalıyordu (önizlemede görüldü). Taban 0.28 eklendi: üç kart hep
       duruyor, sırayla öne çıkıyor. */
    const g = 0.5 - 0.5 * Math.cos(2 * Math.PI * (faz * 3 + i / 3));
    const dx = 20 * (1 - g);
    const op = ((0.28 + 0.72 * g) * (0.22 + 0.78 * p)).toFixed(3);
    if (op <= 0.01) continue;
    s += `<g opacity="${op}" transform="translate(${dx.toFixed(1)},0)">`;
    s += `<rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" rx="7"
            fill="rgba(255,255,255,.06)" stroke="rgba(${A},.42)" stroke-width="1.3"/>`;
    s += `<circle cx="${nx + 12}" cy="${ny + nh / 2}" r="3.6" fill="rgba(${A},.85)"/>`;
    s += `<rect x="${nx + 21}" y="${ny + 7}" width="21" height="4" rx="2" fill="rgba(255,255,255,.42)"/>`;
    s += `<rect x="${nx + 21}" y="${ny + 14}" width="14" height="4" rx="2" fill="rgba(255,255,255,.24)"/>`;
    s += `</g>`;
  }

  /* --- alt bant: TEK veri tabanı, iki eş uç ------------------------------
     EŞİTLİK ÖLÇÜMÜ: iki uç farklı biçimde (yatay pencere / dikey telefon)
     olduğu için aynı alfa aynı parlaklığı VERMİYOR:
       pencere 42×30 = 1260 px²   telefon 26×38 = 988 px²
     İki uç tuval merkezine simetrik durduğundan zemin ikisinde de aynı;
     ham kutu ortalaması doğrudan karşılaştırılabiliyor (faz 0.50).
       İLK SÜRÜM : 109.08 / 102.92 → %5.81 fark, telefon sönük uç gibiydi.
       SON SÜRÜM : 109.08 / 111.65 → %2.33.
     Faz 0.50'de darbe hâlesi iki kutuya da en fazla ~67 px yaklaşıyor
     (yarıçap 60), yani ikisi de temiz; yine de ölçüm faz 0.62'de tekrarlandı
     (80.54 / 82.19 → %2.03). İki faz uyuştuğu için sonuç hâleden değil
     çizimden geliyor.
     Düzeltme dolgu alfasına değil İÇ İŞARET ALANINA yapıldı; iki kutunun
     mürekkep yoğunluğu (işaret alanı ÷ kutu alanı) eşitlendi. */
  const uy = 356, pcx = CX - 62, tcx2 = CX + 62;
  const eDolgu = (0.055 + 0.065 * p).toFixed(3);
  const eKontur = (0.20 + 0.42 * p).toFixed(3);
  const eIsaret = (0.20 + 0.34 * p).toFixed(3);

  /* uç 1 — tarayıcı penceresi (web siteniz) */
  s += `<rect x="${pcx - 21}" y="${uy}" width="42" height="30" rx="6"
          fill="rgba(255,255,255,${eDolgu})" stroke="rgba(${A},${eKontur})" stroke-width="1.4"/>`;
  s += `<rect x="${pcx - 16}" y="${uy + 5}" width="32" height="5" rx="2.5" fill="rgba(255,255,255,${eIsaret})"/>`;
  s += `<rect x="${pcx - 16}" y="${uy + 14}" width="24" height="4" rx="2" fill="rgba(255,255,255,${eIsaret})"/>`;
  s += `<rect x="${pcx - 16}" y="${uy + 21}" width="17" height="4" rx="2" fill="rgba(255,255,255,${eIsaret})"/>`;

  /* uç 2 — telefon (mobil uygulamanız).
     ÖLÇÜ NOTU: ilk sürümde iç işaret alanı pencerenin yarısı kadardı; kutu
     ortalamaları 109.08 (pencere) / 102.92 (telefon) çıktı, %5.81 fark. Aynı
     alfa ile daha küçük kutuya daha az işaret düşünce telefon "sönük uç" gibi
     duruyordu. İşaret sayısı ve genişliği artırıldı, ölçüm tekrarlandı. */
  s += `<rect x="${tcx2 - 13}" y="${uy - 4}" width="26" height="38" rx="6"
          fill="rgba(255,255,255,${eDolgu})" stroke="rgba(${A},${eKontur})" stroke-width="1.4"/>`;
  s += `<rect x="${tcx2 - 5.5}" y="${uy}" width="11" height="3.4" rx="1.7" fill="rgba(255,255,255,${eIsaret})"/>`;
  s += `<rect x="${tcx2 - 8.5}" y="${uy + 8}" width="17" height="4.4" rx="2.2" fill="rgba(255,255,255,${eIsaret})"/>`;
  s += `<rect x="${tcx2 - 8.5}" y="${uy + 15}" width="13" height="4.4" rx="2.2" fill="rgba(255,255,255,${eIsaret})"/>`;
  s += `<rect x="${tcx2 - 8.5}" y="${uy + 22}" width="17" height="4.4" rx="2.2" fill="rgba(255,255,255,${eIsaret})"/>`;
  s += `<rect x="${tcx2 - 6}" y="${uy + 30}" width="12" height="3.4" rx="1.7" fill="rgba(255,255,255,${eIsaret})"/>`;

  /* veri tabanı — tek kaynak */
  const dcy = 414, dr = 27, dH = 26;
  s += `<path d="M${CX - dr} ${dcy} V${dcy + dH} A${dr} 9 0 0 0 ${CX + dr} ${dcy + dH} V${dcy} Z"
          fill="rgba(255,255,255,${(0.045 + 0.050 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<ellipse cx="${CX}" cy="${dcy}" rx="${dr}" ry="9"
          fill="rgba(${A},${(0.14 + 0.28 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.46 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<path d="M${CX - dr} ${dcy + 12} A${dr} 9 0 0 0 ${CX + dr} ${dcy + 12}"
          fill="none" stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;

  /* iki aynasal bağ — aynı uzunluk, aynı hız, aynı alfa */
  [[pcx, -1], [tcx2, 1]].forEach(([ux, yon]) => {
    const d = `M${ux} 392 C ${ux} 404 ${CX + yon * 17} 398 ${CX + yon * 17} ${dcy - 4}`;
    s += `<path d="${d}" fill="none" stroke="rgba(255,255,255,${(0.05 + 0.05 * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += akan(d, faz, `rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})`,
      { desen: 14, tur: 5, yon: -1, kalin: 1.4 });
  });
  /* uçların altındaki kısa bağlantı sapı — ikisi de aynı */
  s += `<line x1="${pcx}" y1="${uy + 30}" x2="${pcx}" y2="392"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += `<line x1="${tcx2}" y1="${uy + 34}" x2="${tcx2}" y2="392"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1.2"/>`;
  return s;
}

/* ══ 03 · ERP/CRM ENTEGRASYON KATMANI ════════════════════════════════════
   Üst blok: SOLDA üç kaynak sistem — muhasebe (tablo), stok (kutu yığını),
   müşteri yönetimi (yüzsüz avatar). Ürün adı ya da logo YOK, üçü de aynı
   kutu ölçüsü ve aynı konturda. ORTADA dikey entegrasyon katmanı: içinden
   tarama ışığı iner, plakaları veri formatlarını eşleyen katmanı anlatır.
   SAĞDA web tarafındaki süreçler penceresi. Üç hat içeri girer, katmandan
   TEK hat çıkar.
   Alt bant: üst üste binmiş üç sönük kopya kart → tek parlak kart:
   "veri tekrarını önleyen ... tek kaynaktan güncel kalması". */
function entegrasyon(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.15 + 0.22 * p).toFixed(3);
  const u = (faz - 0.70) / 0.20;
  let s = '';

  const kX = bx + 22, kW = 46, kH = 34;
  const bandX = bx + 102, bandW = 36, bandY = 142, bandH = 148;
  const pnlX = bx + 168, pnlW = 56, pnlY = 150, pnlH = 132;

  /* --- entegrasyon katmanı (orta bant) ---------------------------------- */
  s += `<rect x="${bandX}" y="${bandY}" width="${bandW}" height="${bandH}" rx="15"
          fill="rgba(${A},${(0.045 + 0.055 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.24 + 0.46 * p).toFixed(3)})" stroke-width="1.6"/>`;
  for (let i = 0; i < 7; i++) {
    const py = bandY + 16 + i * 20;
    s += `<rect x="${bandX + 7}" y="${py}" width="${bandW - 14}" height="3.6" rx="1.8"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
  }
  /* tarama ışığı: bandın içinde iner; opaklık sin(π·v) → uçlarda 0, dikişsiz */
  const v = (faz * 3) % 1;
  const tOp = Math.sin(Math.PI * v) * (0.25 + 0.75 * p);
  if (tOp > 0.004) {
    s += `<rect x="${bandX + 3}" y="${(bandY + 6 + v * (bandH - 32)).toFixed(1)}"
            width="${bandW - 6}" height="20" rx="10"
            fill="rgba(${A},${(0.55 * tOp).toFixed(3)})" filter="url(#yumusaAz)"/>`;
  }

  /* --- üç kaynak sistem — eşit ölçü, eşit kontur, eşit giriş ------------- */
  for (let i = 0; i < 3; i++) {
    const ky = 148 + i * 46;
    const kcy = ky + kH / 2;
    const sec = kis01(1 - Math.abs(u * 3 - i - 0.5) * 1.6) * p;
    s += `<rect x="${kX}" y="${ky}" width="${kW}" height="${kH}" rx="8"
            fill="rgba(255,255,255,${(0.035 + 0.040 * p + 0.045 * sec).toFixed(3)})"
            stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
    const gOp = (0.24 + 0.30 * p + 0.32 * sec).toFixed(3);
    const gx = kX + kW / 2;
    /* MÜREKKEP DENGESİ — ÖLÇÜLDÜ: üç kaynak kutusu sayfada "muhasebe, stok
       VEYA müşteri yönetimi" diye eşit sayılıyor, hiçbiri sönük durmamalı.
       YÖNTEM: 46×34 kutunun ortalamasından, aynı y aralığındaki boş zemin
       şeridi çıkarılıyor; ölçüm fazı üç kutuda da süpürme vurgusunun sıfır
       olduğu yerden seçiliyor (p=0.368).
       ÖLÇÜM FAZI TUZAĞA DÜŞTÜ, DÜZELTİLDİ: ilk ölçümler faz 0.68'de
       alınmıştı. Darbe yarıçapı 52 → 60 yapılınca (bkz. dosya başındaki
       döngü notu) hâle o fazda ÜÇÜNCÜ kutunun zemin şeridine taşmaya
       başladı: şerit 42.71 → 49.19 okundu, çıkarma şişti ve müşteri kutusu
       12.24 gibi sahte bir "net" verdi. Kutunun kendisi hâlenin dışındaydı,
       yani hata çizimde değil ÖLÇÜMDEYDİ. Faz 0.92'ye geçildi: aynı p, aynı
       süpürme durumu, ama darbe (1081, 361) noktasında — hem kutu hem şerit
       temiz.
         İLK SÜRÜM (faz 0.68, temiz iki kutu) : 17.45 / 19.82 / —  → tablo
                     belirgin sönüktü, kontur kalınlıkları artırıldı.
         ARA SÜRÜM (faz 0.92)                 : 18.70 / 19.43 / 20.65 → %9.88;
                     bu kez avatar fazla parlaktı.
         SON SÜRÜM (faz 0.92)                 : 19.53 / 19.43 / 19.93 → %2.52. */
    if (i === 0) {
      /* muhasebe — tablo */
      s += `<rect x="${gx - 13}" y="${kcy - 10}" width="26" height="20" rx="3" fill="none"
              stroke="rgba(255,255,255,${gOp})" stroke-width="1.68"/>`;
      s += `<path d="M${gx - 13} ${kcy - 3} H${gx + 13} M${gx - 13} ${kcy + 3.5} H${gx + 13}
              M${gx - 2} ${kcy - 10} V${kcy + 10}"
              stroke="rgba(255,255,255,${gOp})" stroke-width="1.45"/>`;
    } else if (i === 1) {
      /* stok — bitişik kutu yığını (raf).
         ÖLÇÜ NOTU: ilk sürüm altta iki, üstte ORTALANMIŞ bir kutu çiziyordu;
         aralarında çizgi olmasa da ŞEMA GİBİ okunuyordu ve bu sayfanın
         yasağı "gerçek bir şirket şeması gibi durmasın" diyor. Kutular
         bitiştirildi, üst sıra sola hizalandı: artık istiflenmiş kasa. */
      for (let q = 0; q < 3; q++) {
        s += `<rect x="${gx - 13.5 + q * 9}" y="${kcy + 0.5}" width="9" height="9" rx="1.6" fill="none"
                stroke="rgba(255,255,255,${gOp})" stroke-width="1.2"/>`;
      }
      for (let q = 0; q < 2; q++) {
        s += `<rect x="${gx - 13.5 + q * 9}" y="${kcy - 8.5}" width="9" height="9" rx="1.6" fill="none"
                stroke="rgba(255,255,255,${gOp})" stroke-width="1.2"/>`;
      }
    } else {
      /* müşteri yönetimi — yüzsüz avatar */
      s += `<circle cx="${gx}" cy="${kcy - 4.5}" r="4.4" fill="rgba(255,255,255,${gOp})"/>`;
      s += `<path d="M${gx - 8.1} ${kcy + 8.5} a8.1 8.1 0 0 1 16.2 0 Z"
              fill="rgba(255,255,255,${gOp})"/>`;
    }
    /* kutudan katmana giren hat */
    const d = `M${kX + kW} ${kcy} H${bandX}`;
    s += `<path d="${d}" fill="none" stroke="rgba(255,255,255,${(0.05 + 0.05 * p).toFixed(3)})" stroke-width="1.1"/>`;
    s += akan(d, faz, `rgba(${A},${(0.16 + 0.30 * p + 0.34 * sec).toFixed(3)})`,
      { desen: 12, tur: 5, yon: -1, kalin: 1.5 });
  }

  /* --- katmandan çıkan TEK hat + web tarafı penceresi -------------------- */
  const cikis = `M${bandX + bandW} 216 H${pnlX}`;
  s += `<path d="${cikis}" fill="none" stroke="rgba(255,255,255,${(0.06 + 0.06 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += akan(cikis, faz, `rgba(${A},${(0.28 + 0.48 * p).toFixed(3)})`,
    { desen: 12, tur: 5, yon: -1, kalin: 2 });

  s += `<rect x="${pnlX}" y="${pnlY}" width="${pnlW}" height="${pnlH}" rx="9"
          fill="rgba(255,255,255,${(0.035 + 0.045 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.22 + 0.44 * p).toFixed(3)})" stroke-width="1.4"/>`;
  s += `<line x1="${pnlX}" y1="${pnlY + 20}" x2="${pnlX + pnlW}" y2="${pnlY + 20}"
          stroke="rgba(${A},${(0.16 + 0.24 * p).toFixed(3)})" stroke-width="1.1"/>`;
  s += `<rect x="${pnlX + 8}" y="${pnlY + 7}" width="22" height="5" rx="2.5"
          fill="rgba(255,255,255,${(0.16 + 0.24 * p).toFixed(3)})"/>`;
  for (let i = 0; i < 4; i++) {
    const ry2 = pnlY + 34 + i * 24;
    const dol = kis01((p - i * 0.12) / 0.42);
    s += `<rect x="${pnlX + 8}" y="${ry2}" width="16" height="7" rx="3.5"
            fill="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})"/>`;
    s += `<rect x="${pnlX + 28}" y="${ry2}" width="${(20 * (0.35 + 0.65 * dol)).toFixed(1)}" height="7" rx="3.5"
            fill="rgba(${A},${(0.16 + 0.40 * dol).toFixed(3)})"/>`;
  }

  /* --- alt bant: kopyalar tek güncel kayda iner ------------------------- */
  const ay = 404;
  /* üç sönük kopya, üst üste binmiş */
  for (let i = 0; i < 3; i++) {
    s += `<rect x="${bx + 40 + i * 7}" y="${ay + i * 7}" width="30" height="22" rx="5"
            fill="rgba(255,255,255,${(0.030 + 0.028 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.16 + 0.16 * p).toFixed(3)})" stroke-width="1.2"
            stroke-dasharray="4 3"/>`;
    s += `<rect x="${bx + 46 + i * 7}" y="${ay + 8 + i * 7}" width="16" height="3.4" rx="1.7"
            fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;
  }
  const okD = `M${bx + 116} ${ay + 18} H${bx + 152}`;
  s += `<path d="${okD}" fill="none" stroke="rgba(255,255,255,${(0.05 + 0.05 * p).toFixed(3)})" stroke-width="1.2"/>`;
  s += akan(okD, faz, `rgba(${A},${(0.24 + 0.44 * p).toFixed(3)})`,
    { desen: 12, tur: 6, yon: -1, kalin: 1.6 });
  s += `<path d="M${bx + 152} ${ay + 12} L${bx + 161} ${ay + 18} L${bx + 152} ${ay + 24} Z"
          fill="rgba(${A},${(0.28 + 0.48 * p).toFixed(3)})"/>`;
  /* tek güncel kayıt */
  s += `<rect x="${bx + 166}" y="${ay + 4}" width="38" height="28" rx="7"
          fill="rgba(${A},${(0.10 + 0.24 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.30 + 0.48 * p).toFixed(3)})" stroke-width="1.5"/>`;
  s += `<rect x="${bx + 173}" y="${ay + 12}" width="24" height="4.5" rx="2.2"
          fill="rgba(255,255,255,${(0.24 + 0.40 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 173}" y="${ay + 20}" width="16" height="4.5" rx="2.2"
          fill="rgba(255,255,255,${(0.16 + 0.28 * p).toFixed(3)})"/>`;
  s += halka(bx + 185, ay + 18, faz, A, { tur: 2, r0: 18, rArt: 16, guc: 0.20 + 0.60 * p });
  return s;
}
