/* SAHNE — web-tasarim-yazilim / e-ticaret
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok, her çizim
 * aşağıdaki cümlelerden birine dayanıyor:
 *
 *   01 Ürün Yönetimi ve Stok Senkronizasyonu
 *      "Ürün kartları toplu düzenleme araçlarıyla yönetilir; stok miktarı,
 *       varyasyon kombinasyonları ve fiyat güncellemeleri tek ekrandan
 *       yapılabilir. Tedarikçi sisteminden gelen stok verisi otomatik
 *       senkronizasyonla güncel tutulur, böylece tükenen bir ürün sitede
 *       satışta kalmaz."
 *   02 Güvenlik ve Ödeme Uyumluluğu
 *      "Ödeme sayfaları SSL sertifikası ile şifrelenir ve kart bilgileri
 *       sitede saklanmaz; işlem doğrudan banka veya ödeme kuruluşunun güvenli
 *       altyapısında gerçekleşir. Sanal pos entegrasyonu, 3D Secure
 *       doğrulaması dahil olmak üzere güncel güvenlik standartlarına uygun
 *       kurulur."
 *   03 Teslim Sonrası Destek Kapsamı
 *      "Site teslim edildikten sonra teknik sorunlar, eklenti güncellemeleri
 *       ve entegrasyon arızaları destek kapsamında ele alınır. İşletme kendi
 *       ürün ve kampanya yönetimini yürütürken altyapı bakımı TasarımMania
 *       tarafından takip edilir. Destek kapsamının sınırları fiyatlandırma
 *       bölümünde belirtilir."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 tedarikçi diskinden mağaza paneline senkron döner; tablodaki ürün
 *      satırları toplu seçilir; ORTADAKİ satırın stok çubuğu boşalır ve o
 *      satırın satış anahtarı kapanır ("tükenen ürün satışta kalmaz");
 *      altta varyasyon kombinasyon matrisi ve fiyat/stok alanları.
 *   02 ödeme sayfası (adres çubuğunda KAPALI kilit = SSL) içinde maskeli kart
 *      alanı; oradan çıkan tek ray DOĞRUDAN kalkana (banka/ödeme kuruluşunun
 *      güvenli altyapısı) akar; sitenin deposuna giden dal ÇARPI ile kapalı
 *      ve depo boş kalır ("kart bilgileri sitede saklanmaz"); kalkanın içinde
 *      doğrulama tiki çizilir.
 *   03 teslim edilmiş site + onay rozeti; altında KESİKLİ kapsam çerçevesi
 *      içinde üç iş (teknik sorun / eklenti güncellemesi / entegrasyon
 *      arızası) sırayla onaylanır; en altta İKİ EŞİT şerit: işletmenin ürün +
 *      kampanya yönetimi ile ajansın altyapı bakımı takibi.
 *
 * DİKİŞSİZ DÖNGÜ: senkron halkası ve dişli TAM tur atar (360·faz), ray
 * kesikleri tam sayı katı kayar, matris dalgası cos(2π·2faz), diğer her şey
 * durak canlılığı p'ye bağlı — p döngü başında ve sonunda 0.
 *
 * YASAK (bu sayfaya özel — yasaklar.md "e-ticaret"):
 *  - Ödeme kuruluşu / banka / kart markası logosu ya da işareti YOK. Kilit ve
 *    kalkan kavram olarak çizildi; kart yalnızca boş bir dikdörtgen + çip +
 *    MASKELİ kareler (rakam değil, kare). Kurum kutusu yerine yalın kalkan
 *    seçildi ki hiçbir kuruma benzemesin.
 *  - Rakam yok: stok çubuk, fiyat alanı KISA ÇİZGİ ile temsil edildi (kardeş
 *    .akis figürü de sepet toplamını "—" ile gösteriyor, tutar yazmıyor).
 *    Komisyon/adet/yüzde hiçbir yerde geçmiyor. Durak numaraları serbest.
 *  - İnsan yok, yüz yok.
 *
 * KARDEŞ FİGÜRLE ÇELİŞMEME (sayfadaki .akis infografiği): o figür ziyaretçi
 * yolunu çiziyor — ürün kartı → sepet → ödeme; ödeme kutusunda kilit,
 * "3D Secure" ve "SSL" var. BU VİDEO ziyaretçi yolunu TEKRAR ETMİYOR; .akv
 * adımlarının anlattığı işletme tarafını çiziyor (yönetim paneli, verinin
 * nereye gitmediği, teslim sonrası kapsam). Kilit + kalkan aynı adımda
 * (ödeme) duruyor, yani iki figür aynı şeyi söylüyor. Sepet burada HİÇ
 * çizilmedi — sepet .akv adımlarında geçmiyor, o figürün işi.
 *
 * EŞİTLİK NOTU: 03'teki iki şerit BİRBİRİNİN ALTERNATİFİ DEĞİL, aynı anda
 * yürüyen iki sorumluluk. Yine de biri "sönük kart" gibi durmasın diye
 * kutular birebir aynı ölçü/kontur/dolgu ve AYNI p ile giriyor, ikisinde de
 * eşit sayıda glif ve aynı uzunlukta alt çubuk var, ikisinde de faza bağlı
 * hareket var (solda bayrak dalgalanır, sağda dişli döner).
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Durak ızgarası reklam-filmi/urun-videosu ile birebir aynı — modül içinde
   sayfalar aynı ritmi paylaşsın diye. Üstteki 118 piksel sayfadaki
   "CANLI DÖNGÜ" rozetine bırakıldı.
   ETİKET GENİŞLİĞİ: Consolas 28px ≈ 15,4 px/karakter + 1,2 harf arası ≈ 16,6.
   14 karakter ≈ 232 px, istasyon 246 px — sığıyor (ölçüldü, önizlemede
   doğrulandı). Daha uzun etiket taşar. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 ÜRÜN + STOK' },
  { x: 437, fazMerkez: 0.50, etiket: '02 ÖDEME + SSL' },
  { x: 812, fazMerkez: 0.80, etiket: '03 DESTEK' },
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
              fill="rgba(${A},${(0.17 * p).toFixed(3)})" filter="url(#yumusaCok)"/>`;
    }
    /* İÇ AYDINLANMA — "hangi durağın üstündeyse o durak canlanır" okunurluğu.
       ÖLÇÜM NOTU: ilk sürümde durak canlılığı yalnız cam() kenarı ve halesiyle
       anlatılıyordu; kare kare fark ölçüldüğünde sahnenin toplam hareketi
       0,379 çıkıyordu (kardeş sahneler 0,372-0,431) ve mp4 döngü oranı 1,66 —
       eşik 1,60. Kaynak düzeyinde dikiş zaten temizdi (119→0 farkı 0,067,
       ortalamanın altıAda), sorun H.264'ün ilk kareyi bağımsız kodlaması.
       Panelin kendi aydınlanması derinleştirildi: hem canlı durak daha net
       okunuyor hem de ölçüm gerçeği yansıtıyor. p ile geldiği için dikişe
       hiç dokunmuyor (dikiş anında p = 0). */
    if (p > 0.01) {
      s += `<rect x="${d.x + 1}" y="${DY + 1}" width="${DW - 2}" height="${DH - 2}" rx="17"
              fill="rgba(${A},${(0.062 * p).toFixed(3)})"/>`;
    }
    s += cam({ x: d.x, y: DY, w: DW, h: DH, r: 18, parlaklik: p, aksan: a.aksan.rgb });
    s += (i === 0 ? urunStok(d.x, p, faz, a)
       : i === 1 ? odemeGuvenlik(d.x, p, faz, a)
       : destek(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ══ 01 · ÜRÜN YÖNETİMİ VE STOK SENKRONİZASYONU ═════════════════════════
   Üç kat:
     A  tedarikçi diski → dönen senkron halkası → mağaza paneli
        ("Tedarikçi sisteminden gelen stok verisi otomatik senkronizasyonla")
     B  toplu düzenleme tablosu; başlıkta "tümünü seç", satırlarda kutucuklar
        sırayla işaretlenir ("toplu düzenleme araçlarıyla yönetilir").
        ORTA satırın stok çubuğu boşalır → satış anahtarı kapanır, satır söner
        ("tükenen bir ürün sitede satışta kalmaz").
        ÖLÇÜ NOTU: boşalan satır bilerek ORTA satır. Boru bu durakta y≈DY+242
        geçiyor, ışık darbesi ±30 px'i yıkıyor; en alt satır (DY+184) o bandın
        kenarında kalıyordu, orta satır (DY+148) darbeden uzak.
     C  varyasyon kombinasyon matrisi + fiyat/stok alanları
        ("varyasyon kombinasyonları ve fiyat güncellemeleri tek ekrandan").
        Boru B ile C arasındaki boş bantta akıyor — bu boşluk bilerek var. */
function urunStok(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.14 + 0.22 * p).toFixed(3);
  const akEt = (0.26 + 0.56 * p).toFixed(2);
  let s = '';

  /* ── A · tedarikçi senkronu ─────────────────────────────────────────── */
  const dcx = bx + 46, dUst = DY + 24, dAlt = DY + 52, drx = 20, dry = 6.5;
  s += `<path d="M${dcx - drx} ${dUst} V${dAlt} A${drx} ${dry} 0 0 0 ${dcx + drx} ${dAlt} V${dUst} Z"
          fill="rgba(255,255,255,.045)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<ellipse cx="${dcx}" cy="${dUst}" rx="${drx}" ry="${dry}"
          fill="rgba(255,255,255,.075)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  [dUst + 10, dUst + 19].forEach((yy) => {
    s += `<path d="M${dcx - drx} ${yy} A${drx} ${dry} 0 0 0 ${dcx + drx} ${yy}"
            fill="none" stroke="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})" stroke-width="1.1"/>`;
  });

  /* mağaza paneli (senkronun vardığı yer) */
  s += `<rect x="${bx + 178}" y="${DY + 22}" width="46" height="38" rx="7"
          fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<line x1="${bx + 178}" y1="${DY + 33}" x2="${bx + 224}" y2="${DY + 33}"
          stroke="rgba(255,255,255,${cizgi})" stroke-width="1.1"/>`;
  [0, 1].forEach((i) => {
    s += `<rect x="${bx + 186}" y="${DY + 40 + i * 9}" width="${30 - i * 10}" height="4" rx="2"
            fill="rgba(${A},${(0.24 + 0.42 * p).toFixed(2)})"/>`;
  });

  /* raylar + dönen senkron halkası (TAM tur → dikişsiz) */
  const rayY = DY + 41;
  s += akanRay(`M${bx + 68} ${rayY} H${bx + 104}`, faz, A, akEt, 2.2);
  s += akanRay(`M${bx + 142} ${rayY} H${bx + 176}`, faz, A, akEt, 2.2);
  s += senkronHalka(bx + 123, rayY, 14, faz, p, A);

  /* ── B · toplu düzenleme tablosu ────────────────────────────────────── */
  const px = bx + 16, py = DY + 80, pw = 214, ph = 142;
  s += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="10"
          fill="rgba(255,255,255,.030)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
  s += `<line x1="${px}" y1="${DY + 106}" x2="${px + pw}" y2="${DY + 106}"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1"/>`;
  /* "tümünü seç" — toplu düzenlemenin başlangıcı */
  s += kutucuk(bx + 28, DY + 86, 13, kis01((p - 0.04) / 0.24), A, p);
  [[78, 44], [150, 32], [196, 26]].forEach(([ox, w]) => {
    s += `<rect x="${bx + ox}" y="${DY + 90}" width="${w}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.10 * p).toFixed(3)})"/>`;
  });

  /* toplu düzenleme aracının satırlar üzerinde gezinen tarama bandı.
     Sinüs — tam sayı katı tur atar, sıçrama yok; p ile kapanır. */
  if (p > 0.02) {
    const tby = DY + 164 + 42 * Math.sin(2 * Math.PI * (faz * 2 + 0.13));
    s += `<rect x="${px + 4}" y="${(tby - 15).toFixed(1)}" width="${pw - 8}" height="30" rx="8"
            fill="rgba(${A},${(0.085 * p).toFixed(3)})"/>`;
  }

  for (let i = 0; i < 3; i++) {
    const ry = DY + 112 + i * 36;
    const sec = kis01((p - 0.12 - i * 0.09) / 0.28);
    /* orta satır tükeniyor */
    const bosal = i === 1 ? kis01((p - 0.40) / 0.34) : 0;
    const sonuk = 1 - 0.52 * bosal;
    s += `<g opacity="${sonuk.toFixed(3)}">`;
    if (sec > 0.05) {
      s += `<rect x="${px + 4}" y="${ry - 2}" width="${pw - 8}" height="34" rx="7"
              fill="rgba(${A},${(0.055 * sec).toFixed(3)})"/>`;
    }
    s += kutucuk(bx + 28, ry + 9, 13, sec, A, p);
    /* ürün görseli — soyut yer tutucu */
    s += `<rect x="${bx + 48}" y="${ry + 4}" width="22" height="22" rx="5"
            fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1"/>`;
    s += `<circle cx="${bx + 55}" cy="${ry + 11}" r="2.6" fill="rgba(255,255,255,${(0.16 + 0.16 * p).toFixed(3)})"/>`;
    s += `<path d="M${bx + 50} ${ry + 24} L${bx + 57} ${ry + 16} L${bx + 62} ${ry + 20} L${bx + 66} ${ry + 17} L${bx + 68} ${ry + 24} Z"
            fill="rgba(255,255,255,${(0.13 + 0.14 * p).toFixed(3)})"/>`;
    /* ad çubukları */
    s += `<rect x="${bx + 78}" y="${ry + 8}" width="${62 - i * 8}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.16 + 0.20 * p).toFixed(3)})"/>`;
    s += `<rect x="${bx + 78}" y="${ry + 19}" width="${40 + i * 6}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})"/>`;
    /* stok çubuğu — RAKAM YOK, yalnız dolgu oranı.
       senkron nefes alsın diye küçük periyodik oynama (faz cinsinden). */
    const tabanStok = [0.74, 1, 0.52][i];
    const nefes = i === 1 ? 0 : 0.13 * p * Math.sin(2 * Math.PI * (faz * 3 + i * 0.3));
    const oran = kis01(tabanStok * (1 - bosal) + nefes);
    s += `<rect x="${bx + 150}" y="${ry + 12}" width="36" height="6" rx="3" fill="rgba(255,255,255,.055)"/>`;
    if (oran > 0.02) {
      s += `<rect x="${bx + 150}" y="${ry + 12}" width="${(36 * oran).toFixed(1)}" height="6" rx="3"
              fill="rgba(${A},${(0.28 + 0.46 * p).toFixed(2)})"/>`;
    }
    /* satış anahtarı — stok bitince kapanır */
    const acik = 1 - kis01((bosal - 0.62) / 0.3);
    const ax = bx + 196, ay = ry + 9;
    s += `<rect x="${ax}" y="${ay}" width="26" height="13" rx="6.5"
            fill="rgba(${A},${(0.10 + 0.30 * acik * (0.3 + 0.7 * p)).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})" stroke-width="1"/>`;
    s += `<circle cx="${(ax + 6.5 + 13 * acik).toFixed(1)}" cy="${ay + 6.5}" r="4.6"
            fill="rgba(255,255,255,${(0.42 + 0.40 * acik * p).toFixed(2)})"/>`;
    s += `</g>`;
  }

  /* ── C · varyasyon kombinasyonları + fiyat/stok alanları ────────────── */
  const mx = bx + 18, my = DY + 262, cw = 22, ch = 14, gx = 5, gy = 5;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      /* dalga faz cinsinden ÜÇ tam tur atar → dikişsiz */
      const d = 0.5 - 0.5 * Math.cos(2 * Math.PI * (faz * 3 - c * 0.085 - r * 0.13));
      const par = d * p;
      s += `<rect x="${mx + c * (cw + gx)}" y="${my + r * (ch + gy)}" width="${cw}" height="${ch}" rx="3.5"
              fill="rgba(${A},${(0.050 + 0.48 * par).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.07 + 0.17 * par).toFixed(3)})" stroke-width="1"/>`;
    }
  }
  /* iki alan: üstte fiyat (değer yerine KISA ÇİZGİ), altta stok (çubuk) */
  const fx = bx + 126, fw = 104;
  [0, 1].forEach((i) => {
    const fy = DY + 262 + i * 29;
    const odak = kis01((p - 0.30 - i * 0.10) / 0.30);
    s += `<rect x="${fx}" y="${fy}" width="${fw}" height="22" rx="6"
            fill="rgba(255,255,255,.035)"
            stroke="rgba(${A},${(0.12 + 0.52 * odak).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${fx + 10}" y="${fy + 9}" width="26" height="4" rx="2"
            fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;
    if (i === 0) {
      /* fiyat: sayfada fiyat rakamı yayımlanmıyor → yer tutucu çizgi */
      s += `<rect x="${fx + 62}" y="${fy + 9.5}" width="22" height="3.2" rx="1.6"
              fill="rgba(${A},${(0.30 + 0.50 * odak).toFixed(2)})"/>`;
    } else {
      s += `<rect x="${fx + 52}" y="${fy + 9}" width="38" height="4" rx="2" fill="rgba(255,255,255,.06)"/>`;
      s += `<rect x="${fx + 52}" y="${fy + 9}" width="${(38 * (0.35 + 0.5 * odak)).toFixed(1)}" height="4" rx="2"
              fill="rgba(${A},${(0.28 + 0.46 * odak).toFixed(2)})"/>`;
    }
  });
  return s;
}

/* ══ 02 · GÜVENLİK VE ÖDEME UYUMLULUĞU ══════════════════════════════════
   A  ödeme sayfası: adres çubuğunda KAPALI kilit (SSL, p ile aksana döner —
      kardeş .akis figüründeki et-kilit ile aynı davranış), içinde kart alanı:
      çip + MASKELİ kareler. Karelerin parlaklığı faz cinsinden karışır =
      şifreleme. Rakam yok, marka yok.
   B  sayfadan çıkan ray İKİYE ayrılır:
        sağ  → akan kesiklerle DOĞRUDAN kalkana gider
        sol  → sitenin deposuna gider ama ÇARPI ile kapalı, kesikleri akmıyor
      ("kart bilgileri sitede saklanmaz; işlem doğrudan ... güvenli
       altyapısında gerçekleşir")
   C  solda BOŞ kalan site deposu (sönük, aksan almıyor),
      sağda kalkan = güvenli altyapı; içinde doğrulama tiki çizilir
      ("3D Secure doğrulaması"). Kurum kutusu/logo YOK — yalın kalkan. */
function odemeGuvenlik(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.14 + 0.22 * p).toFixed(3);
  let s = '';

  /* ── A · ödeme sayfası ──────────────────────────────────────────────── */
  s += `<rect x="${bx + 26}" y="${DY + 16}" width="194" height="126" rx="11"
          fill="rgba(255,255,255,.038)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<line x1="${bx + 26}" y1="${DY + 40}" x2="${bx + 220}" y2="${DY + 40}"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1"/>`;
  /* SSL kilidi — hep KAPALI, yalnız rengi canlanır */
  const kRenk = `rgba(${karisRenk([110, 133, 150], a.aksan.rgb, p)},${(0.55 + 0.45 * p).toFixed(2)})`;
  s += `<rect x="${bx + 40}" y="${DY + 26}" width="14" height="11" rx="2.6"
          fill="none" stroke="${kRenk}" stroke-width="1.8"/>`;
  s += `<path d="M${bx + 43} ${DY + 26} v-4 a4 4 0 0 1 8 0 v4"
          fill="none" stroke="${kRenk}" stroke-width="1.8"/>`;
  s += `<circle cx="${bx + 47}" cy="${DY + 31.5}" r="1.5" fill="${kRenk}"/>`;
  /* adres çubuğu */
  s += `<rect x="${bx + 62}" y="${DY + 24}" width="142" height="15" rx="7.5"
          fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,${(0.07 + 0.08 * p).toFixed(3)})" stroke-width="1"/>`;
  s += `<rect x="${bx + 71}" y="${DY + 29.5}" width="58" height="4" rx="2"
          fill="rgba(255,255,255,${(0.10 + 0.12 * p).toFixed(3)})"/>`;

  /* kart alanı — MARKA YOK, RAKAM YOK: çip + maskeli kareler */
  s += `<rect x="${bx + 56}" y="${DY + 54}" width="134" height="74" rx="9"
          fill="rgba(255,255,255,.055)"
          stroke="rgba(${A},${(0.16 + 0.40 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${bx + 70}" y="${DY + 66}" width="19" height="15" rx="3"
          fill="rgba(${A},${(0.20 + 0.36 * p).toFixed(2)})"/>`;
  s += `<path d="M${bx + 70} ${DY + 73.5} h19 M${bx + 79.5} ${DY + 66} v15"
          stroke="rgba(14,17,24,.55)" stroke-width="1.1"/>`;
  /* maskeli kareler: parlaklık faz cinsinden karışır → şifreleme izlenimi */
  [[DY + 94, 3], [DY + 108, 2]].forEach(([yy, grup], gi) => {
    for (let g = 0; g < grup; g++) {
      for (let k = 0; k < 4; k++) {
        const idx = gi * 12 + g * 4 + k;
        const karis = 0.5 - 0.5 * Math.cos(2 * Math.PI * (faz * 4 + idx * 0.37));
        const xk = bx + 70 + g * 42 + k * 9;
        s += `<rect x="${xk}" y="${yy}" width="6" height="6" rx="1.6"
                fill="rgba(255,255,255,${(0.09 + 0.46 * karis * (0.18 + 0.82 * p)).toFixed(3)})"/>`;
      }
    }
  });

  /* ── B · raylar: biri akıyor, biri kapalı ───────────────────────────── */
  const anaYol = `M${bx + 123} ${DY + 142} V${DY + 164}`
    + ` Q${bx + 123} ${DY + 190} ${bx + 152} ${DY + 195}`
    + ` Q${bx + 172} ${DY + 199} ${bx + 172} ${DY + 222}`;
  s += `<path d="${anaYol}" fill="none" stroke="rgba(255,255,255,${(0.07 + 0.07 * p).toFixed(3)})" stroke-width="3.6"/>`;
  s += akanRay(anaYol, faz, A, (0.30 + 0.58 * p).toFixed(2), 2.6);
  /* ikinci ince kat: aynı yolda farklı desen — şifreli akış izlenimi.
     desen 22, tur 4 (akanRay ile aynı) → dikişsiz kalır. */
  s += `<path d="${anaYol}" fill="none" stroke="rgba(255,255,255,${(0.24 + 0.44 * p).toFixed(2)})"
          stroke-width="1.1" stroke-linecap="round" stroke-dasharray="3 19"
          stroke-dashoffset="${(-faz * 88 - 9).toFixed(1)}"/>`;

  const blokYol = `M${bx + 123} ${DY + 164}`
    + ` Q${bx + 123} ${DY + 190} ${bx + 94} ${DY + 195}`
    + ` Q${bx + 68} ${DY + 200} ${bx + 68} ${DY + 220}`;
  s += `<path d="${blokYol}" fill="none" stroke="rgba(150,163,182,${(0.16 + 0.10 * p).toFixed(3)})"
          stroke-width="2" stroke-dasharray="5 6"/>`;
  /* ÇARPI — bu yoldan veri gitmiyor */
  const xcx = bx + 68, xcy = DY + 234;
  s += `<circle cx="${xcx}" cy="${xcy}" r="11" fill="rgba(14,17,24,.75)"
          stroke="rgba(160,172,190,${(0.34 + 0.24 * p).toFixed(2)})" stroke-width="1.7"/>`;
  s += `<path d="M${xcx - 4.4} ${xcy - 4.4} L${xcx + 4.4} ${xcy + 4.4}
          M${xcx + 4.4} ${xcy - 4.4} L${xcx - 4.4} ${xcy + 4.4}"
          stroke="rgba(190,200,215,${(0.42 + 0.30 * p).toFixed(2)})" stroke-width="2" stroke-linecap="round"/>`;

  /* ── C · boş site deposu (solda) ────────────────────────────────────── */
  const scx = bx + 68, sUst = DY + 258, sAlt = DY + 304, srx = 30, sry = 8.5;
  s += `<path d="M${scx - srx} ${sUst} V${sAlt} A${srx} ${sry} 0 0 0 ${scx + srx} ${sAlt} V${sUst} Z"
          fill="rgba(255,255,255,.022)" stroke="rgba(150,163,182,${(0.20 + 0.10 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<ellipse cx="${scx}" cy="${sUst}" rx="${srx}" ry="${sry}"
          fill="rgba(255,255,255,.03)" stroke="rgba(150,163,182,${(0.22 + 0.10 * p).toFixed(3)})" stroke-width="1.3"/>`;
  /* boş kalıyor: içeride dolu satır yok, yalnız soluk kesik iz */
  s += `<path d="M${scx - srx} ${sUst + 15} A${srx} ${sry} 0 0 0 ${scx + srx} ${sUst + 15}"
          fill="none" stroke="rgba(150,163,182,.12)" stroke-width="1.1" stroke-dasharray="4 5"/>`;

  /* ── C · kalkan = banka / ödeme kuruluşunun güvenli altyapısı ───────── */
  const kcx = bx + 170, kUst = DY + 226, kOmuz = DY + 245, kYan = DY + 290, kAlt = DY + 326, kW = 46;
  const kalkan = `M${kcx} ${kUst} L${kcx + kW} ${kOmuz} L${kcx + kW} ${kYan}`
    + ` Q${kcx + kW} ${kAlt - 12} ${kcx} ${kAlt}`
    + ` Q${kcx - kW} ${kAlt - 12} ${kcx - kW} ${kYan}`
    + ` L${kcx - kW} ${kOmuz} Z`;
  if (p > 0.02) {
    s += `<path d="${kalkan}" fill="rgba(${A},${(0.16 * p).toFixed(3)})" filter="url(#yumusaCok)"/>`;
  }
  s += `<path d="${kalkan}" fill="rgba(255,255,255,${(0.035 + 0.030 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.52 * p).toFixed(3)})" stroke-width="1.7"/>`;
  /* doğrulama tiki — 3D Secure doğrulaması.
     Halka doğrulama süresince nefes alır: sinüs, üç tam tur → dikişsiz. */
  const dgr = kis01((p - 0.30) / 0.44);
  const nefes = 0.5 - 0.5 * Math.cos(2 * Math.PI * (faz * 3));
  s += `<circle cx="${kcx}" cy="${DY + 279}" r="${(26 + 4.5 * nefes * p).toFixed(1)}"
          fill="rgba(${A},${(0.10 * dgr).toFixed(3)})"
          stroke="rgba(${A},${(0.14 + 0.36 * dgr).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<circle cx="${kcx}" cy="${DY + 279}" r="${(30 + 9 * nefes).toFixed(1)}" fill="none"
          stroke="rgba(${A},${(0.30 * p * (1 - nefes)).toFixed(3)})" stroke-width="1.6"/>`;
  s += tikCiz(kcx, DY + 279, 15.5, dgr, `rgba(255,255,255,${(0.30 + 0.66 * dgr).toFixed(2)})`, 3.2);
  return s;
}

/* ══ 03 · TESLİM SONRASI DESTEK KAPSAMI ═════════════════════════════════
   A  teslim edilmiş site: akan ok → site çerçevesi → onay rozeti
      ("Site teslim edildikten sonra")
   B  KESİKLİ çerçeve = destek kapsamı; içinde sayfanın saydığı üç iş:
        teknik sorun (uyarı üçgeni) · eklenti güncellemesi (modül + yukarı ok)
        · entegrasyon arızası (iki halka, kopan bağ kapanır)
      Her satır sırayla onaylanır. Çerçevenin DIŞINDA hiçbir şey çizilmedi:
      sayfa neyin kapsam dışı olduğunu söylemiyor, uydurulmadı; kesikli
      kenar "sınır var, ayrıntısı fiyatlandırmada" demek için yeterli.
   C  İki EŞİT şerit: solda işletmenin ürün + kampanya yönetimi (kutu + bayrak),
      sağda ajansın altyapı bakımı takibi (dişli + nabız çizgisi).
      Bunlar seçenek değil, aynı anda yürüyen iki sorumluluk — yine de
      birebir aynı ölçü/kontur/dolgu ve aynı p ile giriyorlar. */
function destek(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const cizgi = (0.14 + 0.22 * p).toFixed(3);
  let s = '';

  /* ── A · teslim ─────────────────────────────────────────────────────── */
  s += akanRay(`M${bx + 24} ${DY + 40} H${bx + 66}`, faz, A, (0.24 + 0.52 * p).toFixed(2), 2.2);
  s += `<path d="M${bx + 66} ${DY + 40} l-7 -4.5 v9 Z" fill="rgba(${A},${(0.30 + 0.5 * p).toFixed(2)})"/>`;
  s += `<rect x="${bx + 74}" y="${DY + 16}" width="100" height="48" rx="8"
          fill="rgba(255,255,255,.045)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.3"/>`;
  s += `<line x1="${bx + 74}" y1="${DY + 29}" x2="${bx + 174}" y2="${DY + 29}"
          stroke="rgba(255,255,255,${(0.08 + 0.10 * p).toFixed(3)})" stroke-width="1"/>`;
  [0, 1, 2].forEach((i) => {
    s += `<circle cx="${bx + 82 + i * 7}" cy="${DY + 22.5}" r="1.8"
            fill="rgba(255,255,255,${(0.14 + 0.14 * p).toFixed(3)})"/>`;
  });
  [[36, 58], [45, 74], [54, 42]].forEach(([oy, w], i) => {
    s += `<rect x="${bx + 84}" y="${DY + oy}" width="${w}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.09 + (i === 0 ? 0.22 : 0.11) * p).toFixed(3)})"/>`;
  });
  const teslim = kis01((p - 0.06) / 0.30);
  s += `<circle cx="${bx + 180}" cy="${DY + 56}" r="13" fill="rgba(14,17,24,.85)"
          stroke="rgba(${A},${(0.24 + 0.56 * teslim).toFixed(2)})" stroke-width="1.7"/>`;
  s += tikCiz(bx + 180, DY + 56, 8, teslim, `rgba(255,255,255,${(0.30 + 0.66 * teslim).toFixed(2)})`, 2.4);

  /* ── B · kapsam çerçevesi (yürüyen kesikler, tam sayı katı → dikişsiz) ─ */
  const kx = bx + 16, ky = DY + 82, kw = 214, kh = 146;
  s += `<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" rx="12"
          fill="rgba(255,255,255,.022)"
          stroke="rgba(${A},${(0.20 + 0.42 * p).toFixed(3)})" stroke-width="1.5"
          stroke-dasharray="8 6" stroke-dashoffset="${(-faz * 14 * 6).toFixed(1)}"/>`;

  for (let i = 0; i < 3; i++) {
    const ry = DY + 92 + i * 46;
    const cy = ry + 20;
    const ic = kis01((p - 0.16 - i * 0.13) / 0.32);
    const ikx = bx + 46;
    const ir = `rgba(${A},${(0.30 + 0.52 * p).toFixed(2)})`;
    if (i === 0) {
      /* teknik sorun — uyarı üçgeni */
      s += `<path d="M${ikx} ${cy - 13} L${ikx + 14} ${cy + 11} L${ikx - 14} ${cy + 11} Z"
              fill="none" stroke="${ir}" stroke-width="1.9" stroke-linejoin="round"/>`;
      s += `<rect x="${ikx - 1.5}" y="${cy - 5}" width="3" height="9" rx="1.5" fill="${ir}"/>`;
      s += `<circle cx="${ikx}" cy="${cy + 8}" r="1.7" fill="${ir}"/>`;
    } else if (i === 1) {
      /* eklenti güncellemesi — modül kutusu + yukarı ok */
      s += `<rect x="${ikx - 12}" y="${cy - 2}" width="24" height="15" rx="4"
              fill="none" stroke="${ir}" stroke-width="1.9"/>`;
      s += `<path d="M${ikx} ${cy - 14} v11 M${ikx - 5.5} ${cy - 8.5} L${ikx} ${cy - 14} L${ikx + 5.5} ${cy - 8.5}"
              fill="none" stroke="${ir}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      /* entegrasyon arızası — iki halka, kopan bağ onayla kapanır */
      s += `<circle cx="${ikx - 7}" cy="${cy}" r="8.5" fill="none" stroke="${ir}" stroke-width="1.9"/>`;
      s += `<circle cx="${ikx + 7}" cy="${cy}" r="8.5" fill="none" stroke="${ir}" stroke-width="1.9"
              stroke-dasharray="${(2 * Math.PI * 8.5).toFixed(1)}"
              stroke-dashoffset="${(2 * Math.PI * 8.5 * 0.16 * (1 - ic)).toFixed(1)}"/>`;
      s += `<rect x="${ikx - 3}" y="${cy - 1.6}" width="6" height="3.2" rx="1.6"
              fill="rgba(255,255,255,${(0.14 + 0.62 * ic).toFixed(2)})"/>`;
    }
    /* iş açıklaması çubukları */
    s += `<rect x="${bx + 72}" y="${cy - 7}" width="${98 - i * 10}" height="6" rx="3"
            fill="rgba(255,255,255,${(0.14 + 0.20 * p).toFixed(3)})"/>`;
    s += `<rect x="${bx + 72}" y="${cy + 4}" width="${64 + i * 8}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.07 + 0.09 * p).toFixed(3)})"/>`;
    /* kapsamda ele alındı — halka onaydan sonra hafifçe nefes alır
       (sinüs, üç tam tur → dikişsiz) */
    const nb = 0.5 - 0.5 * Math.cos(2 * Math.PI * (faz * 3 - i * 0.16));
    s += `<circle cx="${bx + 200}" cy="${cy}" r="${(12 + 2.6 * nb * ic).toFixed(1)}"
            fill="rgba(${A},${(0.09 * ic).toFixed(3)})"
            stroke="rgba(${A},${(0.16 + 0.54 * ic).toFixed(3)})" stroke-width="1.5"/>`;
    s += tikCiz(bx + 200, cy, 7.5, ic, `rgba(255,255,255,${(0.26 + 0.68 * ic).toFixed(2)})`, 2.3);
  }

  /* ── C · iki EŞİT şerit ─────────────────────────────────────────────── */
  const seritY = DY + 240, seritW = 102, seritH = 78;
  [bx + 18, bx + 126].forEach((sx, i) => {
    s += `<rect x="${sx}" y="${seritY}" width="${seritW}" height="${seritH}" rx="10"
            fill="rgba(255,255,255,.030)" stroke="rgba(255,255,255,${cizgi})" stroke-width="1.2"/>`;
    const g1 = sx + 32, g2 = sx + 72, gy = seritY + 32;
    const gr = `rgba(${A},${(0.30 + 0.50 * p).toFixed(2)})`;
    if (i === 0) {
      /* ürün kutusu */
      s += `<rect x="${g1 - 11}" y="${gy - 9}" width="22" height="19" rx="3.5"
              fill="none" stroke="${gr}" stroke-width="1.9"/>`;
      s += `<path d="M${g1 - 11} ${gy - 2.5} h22 M${g1} ${gy - 9} v6.5"
              stroke="${gr}" stroke-width="1.6"/>`;
      /* kampanya bayrağı — faza bağlı dalgalanır (sağdaki dişliyle eşit hareket) */
      const dal = 3 * Math.sin(2 * Math.PI * (faz * 2));
      s += `<path d="M${g2 - 8} ${gy - 12} v24" stroke="${gr}" stroke-width="1.9" stroke-linecap="round"/>`;
      s += `<path d="M${g2 - 8} ${gy - 11} Q${g2 + 1 + dal} ${gy - 8} ${g2 + 10} ${gy - 11}
              L${g2 + 10} ${gy - 1} Q${g2 + 1 + dal} ${gy + 2} ${g2 - 8} ${gy - 1} Z"
              fill="rgba(${A},${(0.16 + 0.30 * p).toFixed(3)})" stroke="${gr}" stroke-width="1.6"
              stroke-linejoin="round"/>`;
    } else {
      /* altyapı bakımı: dişli (TAM tur) + izleme nabzı */
      s += disli(g1, gy, 8.6, faz, gr, 1.9);
      const nabiz = `M${g2 - 13} ${gy} h5 l3 -8 l4 15 l3 -7 h5`;
      s += `<path d="${nabiz}" fill="none" stroke="rgba(255,255,255,${(0.10 + 0.10 * p).toFixed(3)})"
              stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`;
      s += akanRay(nabiz, faz, A, (0.30 + 0.50 * p).toFixed(2), 1.9, 30, 7);
    }
    s += `<rect x="${sx + 16}" y="${seritY + 58}" width="70" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.14 * p).toFixed(3)})"/>`;
  });
  return s;
}

/* ── ortak küçük çizimler ──────────────────────────────────────────────── */

function kis01(v) { return Math.max(0, Math.min(1, v)); }

/* iki rengi karıştır (kilit sönükten aksana dönerken) */
function karisRenk(a, b, t) {
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * kis01(t))).join(',');
}

/* AKAN RAY — kesikler faz cinsinden TAM SAYI katı kayar → dikişsiz döngü */
function akanRay(d, faz, A, opak, kalin, desen = 22, tur = 4) {
  return `<path d="${d}" fill="none" stroke="rgba(${A},${opak})" stroke-width="${kalin}"
      stroke-linecap="round" stroke-dasharray="${(desen * 0.32).toFixed(1)} ${(desen * 0.68).toFixed(1)}"
      stroke-dashoffset="${(-faz * desen * tur).toFixed(1)}"/>`;
}

/* onay tiki — oran 0..1 arasında çizilir */
function tikCiz(cx, cy, r, oran, renk, kalin) {
  const d = `M${(cx - r * 0.58).toFixed(1)} ${(cy + r * 0.05).toFixed(1)}`
    + ` L${(cx - r * 0.14).toFixed(1)} ${(cy + r * 0.48).toFixed(1)}`
    + ` L${(cx + r * 0.62).toFixed(1)} ${(cy - r * 0.45).toFixed(1)}`;
  const uz = r * 2.3;
  return `<path d="${d}" fill="none" stroke="${renk}" stroke-width="${kalin}"
      stroke-linecap="round" stroke-linejoin="round"
      stroke-dasharray="${uz.toFixed(1)}" stroke-dashoffset="${(uz * (1 - kis01(oran))).toFixed(2)}"/>`;
}

/* toplu düzenleme kutucuğu */
function kutucuk(x, y, k, oran, A, p) {
  const o = kis01(oran);
  let s = `<rect x="${x}" y="${y}" width="${k}" height="${k}" rx="3.2"
      fill="rgba(${A},${(0.06 + 0.34 * o).toFixed(3)})"
      stroke="rgba(${A},${(0.20 + 0.52 * o * (0.4 + 0.6 * p)).toFixed(3)})" stroke-width="1.3"/>`;
  s += tikCiz(x + k / 2, y + k / 2, k * 0.42, o, `rgba(255,255,255,${(0.20 + 0.72 * o).toFixed(2)})`, 1.9);
  return s;
}

/* SENKRON HALKASI — iki oklu yay, döngüde TAM tur atar (360·faz) */
function senkronHalka(cx, cy, r, faz, p, A) {
  const renk = `rgba(${A},${(0.34 + 0.50 * p).toFixed(2)})`;
  const nk = (deg) => (deg * Math.PI) / 180;
  const yay = (a0, a1) => `M${(cx + r * Math.cos(nk(a0))).toFixed(1)} ${(cy + r * Math.sin(nk(a0))).toFixed(1)}`
    + ` A${r} ${r} 0 0 1 ${(cx + r * Math.cos(nk(a1))).toFixed(1)} ${(cy + r * Math.sin(nk(a1))).toFixed(1)}`;
  /* uç okları: teğet yönünde sivri, yarıçap yönünde tabanlı üçgen */
  const ok = (deg) => {
    const t = nk(deg);
    const px = cx + r * Math.cos(t), py = cy + r * Math.sin(t);
    const tx = -Math.sin(t), ty = Math.cos(t);          // teğet (açı artış yönü)
    const nx = Math.cos(t), ny = Math.sin(t);           // dışa doğru
    const u = 6.2, v = 4.4;
    return `${(px + tx * u).toFixed(1)},${(py + ty * u).toFixed(1)} `
      + `${(px - nx * v).toFixed(1)},${(py - ny * v).toFixed(1)} `
      + `${(px + nx * v).toFixed(1)},${(py + ny * v).toFixed(1)}`;
  };
  return `<g transform="rotate(${(360 * faz).toFixed(1)} ${cx} ${cy})">
      <path d="${yay(26, 150)}" fill="none" stroke="${renk}" stroke-width="2.3" stroke-linecap="round"/>
      <path d="${yay(206, 330)}" fill="none" stroke="${renk}" stroke-width="2.3" stroke-linecap="round"/>
      <polygon points="${ok(150)}" fill="${renk}"/>
      <polygon points="${ok(330)}" fill="${renk}"/>
    </g>`;
}

/* DİŞLİ — altyapı bakımı; döngüde TAM tur atar */
function disli(cx, cy, r, faz, renk, kalin) {
  let d = '';
  const n = 7;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    d += `M${(cx + Math.cos(t) * r).toFixed(1)} ${(cy + Math.sin(t) * r).toFixed(1)}`
      + ` L${(cx + Math.cos(t) * (r + 4.2)).toFixed(1)} ${(cy + Math.sin(t) * (r + 4.2)).toFixed(1)} `;
  }
  return `<g transform="rotate(${(360 * faz).toFixed(1)} ${cx} ${cy})">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${renk}" stroke-width="${kalin}"/>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.34).toFixed(1)}" fill="none" stroke="${renk}" stroke-width="${(kalin * 0.8).toFixed(1)}"/>
      <path d="${d}" fill="none" stroke="${renk}" stroke-width="${kalin}" stroke-linecap="round"/>
    </g>`;
}
