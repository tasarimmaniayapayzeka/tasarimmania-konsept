/* SAHNE — seo / icerik-stratejisi
 *
 * KAYNAK: sayfanın kendi .akv listesindeki üç adım. Uydurma yok, üçü de
 * birebir sayfadan (site/hizmetler/seo/icerik-stratejisi/index.html, .akv-liste):
 *   01 "Süreç Nasıl İşliyor?"
 *      "Anahtar kelime ve niyet analizi, rakip boşluk taraması, başlık ve alt
 *       başlık kurgusu, yazım, iç bağlantı yerleştirme ve yayın sonrası
 *       performans takibi olarak ilerler. Her adım bir öncekinin çıktısına
 *       dayanır."
 *   02 "İç Bağlantı Kurgusu Nasıl Planlanıyor?"
 *      "Her yeni yazı, ilgili pillar sayfaya ve komşu cluster içeriklerine
 *       önceden belirlenmiş anchor metinlerle bağlanır. Bu kurgu, hem
 *       kullanıcıyı ilgili konuya yönlendirir hem de site içi otorite
 *       dağılımını güçlendirir."
 *   03 "Raporlama Neyi Gösteriyor?"
 *      "Rapor; hangi başlığın hangi niyeti karşıladığını, hangi cluster'ın
 *       tamamlandığını ve hangi rakip boşluğunun kapatıldığını gösterir."
 *
 * FİKİR: modülün ortak dili korunur — akan cam boru üç durağa uğrar, ışık
 * darbesi boru boyunca yürür, hangi durağın üstündeyse o durak canlanır ve
 * KENDİ işini yapar:
 *   01 solda dikey bir omurga, sağında sayfanın saydığı ALTI adım kutusu.
 *      Paket omurgadan aşağı iner; geçtiği yere kadar omurga aksan rengine
 *      döner (birikme). Her adım sırası gelince canlanır, sağındaki ÇIKTI
 *      şeridi dolar ve BİR SONRAKİ adımın omurgaya bağlanan girdi çubuğu o
 *      çıktının rengine boyanır — "her adım bir öncekinin çıktısına dayanır"
 *      cümlesinin birebir karşılığı. İlk adımın girdi çubuğu boyanmaz, önceki
 *      adımı yok.
 *   02 altta yeni yazı kartı; içindeki bir satırda önceden imlenmiş ANCHOR
 *      parçası (iki uç imi + altı çizili aksan bölüt). Oradan üç bağlantı
 *      çıkar: yukarı pillar sayfaya, sola ve sağa iki komşu cluster içeriğine.
 *      Bağlantılarda paketler yürür; vardıkça pillar ve iki cluster AYNI
 *      nabızla ışır — "site içi otorite dağılımı".
 *   03 rapor: üstte üç satır [başlık çubuğu → niyet rozeti] (hangi başlık
 *      hangi niyeti karşılıyor), ortada hub + beş yaprak tek tek dolarak
 *      tamamlanan cluster, altta üç içerik kartı; ortadaki kesik konturlu
 *      BOŞLUK dolarak kapanır.
 * Beş saniyede bir tur, dikişsiz döngü.
 *
 * YASAK (yasaklar.md — "seo" modül geneli + "icerik-stratejisi"):
 *  - ARAMA MOTORU LOGOSU / ONA BENZEYEN İŞARET YOK. Büyüteç de çizilmedi
 *    (sayfanın kendi .akis figürü 01. durakta büyüteç kullanıyor; hem yasağa
 *    yaklaşmamak hem kardeş figürü tekrar etmemek için burada yok).
 *  - RAKAM YOK: sıralama, trafik, arama hacmi, tarama bütçesi, puan, yüzde,
 *    süre, fiyat, adet — hiçbiri yazılmadı. Tek rakam durak numaraları
 *    (01/02/03), sayfanın kendi numaralandırması.
 *  - RAKİP ADI YOK: 03'teki "kapanan boşluk" kartı adsız; hiçbir yere marka,
 *    alan adı ya da URL yazılmadı.
 *  - GERÇEK BAŞLIK METNİ YAZILMADI — bütün başlıklar soyut çubuk (yasağın
 *    kendi ifadesi: "gerçek başlık metni yazma (soyut çubuk kalsın)").
 *  - PILLAR/CLUSTER YAPISI çizilebilir; çizilen tam olarak o.
 *  - GÖSTERGE ÜZERİNDE SAYI YOK: 01'in altıncı adımındaki "performans takibi"
 *    çizgisi NÖTR bir dalga — başladığı yerde bitiyor, yükseliş/düşüş iddiası
 *    taşımıyor, üzerinde eksen ya da değer yok.
 *  - LOGO YOK, İNSAN YÜZÜ YOK (bu sahnede insan figürü hiç yok).
 *
 * KARDEŞ FİGÜRLE ÇELİŞME KONTROLÜ (aynı sayfadaki .akis infografiği):
 *  .akis üç durağı şöyle çiziyor: (1) anahtar kelime TABLOSU — arama alanı,
 *  sütun başlıkları, niyet etiketli satırlar; (2) İKİ KESİŞEN DAİRE — mevcut
 *  ve rakip sayfalar, rakip tarafında kalan üç nokta "Boşluk"; (3) İÇERİK
 *  TAKVİMİ ızgarası — dört geniş satır, cluster/pillar/niyet/boşluk çipleri.
 *  Bu sahne başka üç adımı anlatıyor (süreç / iç bağlantı / raporlama) ve
 *  kardeş figürün üç çizimini TEKRAR ETMİYOR:
 *   · İKİ KESİŞEN DAİRE HİÇ YOK. Boşluk kavramı burada iki ayrı yerde ve
 *     BAŞKA biçimde geçiyor: 01'in ikinci adım simgesinde tarama sırasında
 *     görülen kesik konturlu boş göz (tespit), 03'ün altında kapanan kart
 *     (raporda kapatıldığı görülüyor). İkisi çelişmiyor, aynı hikâyenin iki
 *     ucu — sayfa da böyle diyor: 01'de "rakip boşluk taraması", 03'te
 *     "hangi rakip boşluğunun kapatıldığını gösterir".
 *   · TAKVİM IZGARASI YOK — takvim kardeş figürün işi. 03 bir RAPOR;
 *     satırları takvim satırı değil, başlık→niyet eşleşmesi.
 *   · ARAMA ALANI / TABLO BAŞLIĞI YOK.
 *  Kahramandaki (.ciz-svg) çizimle de çelişmiyor: orada "H1 — odak kelime"
 *  belgesi, "anahtar"/"niyet" çipleri ve YATAY iki "iç link ağı" kutusu var;
 *  burada iç bağlantı, pillar + iki komşu cluster + yeni yazı olarak DÖRT
 *  düğümlü ve DİKEY kurgulanmış — aynı kavram, farklı kesit.
 *
 * EŞİTLİK — KODA BAKARAK DEĞİL PİKSEL ÖLÇEREK (ölçüm değerleri aşağıda):
 *  · İKİ KOMŞU CLUSTER KARTI (durak 02): sayfa ikisini kıyaslamıyor, "komşu
 *    cluster içeriklerine" diyor. İki kart BİREBİR aynı kodla, aynı ölçü,
 *    aynı kontur, aynı iç çubuk dizisi; iki bağlantı da tam AYNA (dx ∓45,
 *    dy −58, aynı uzunluk), paket fazları aynı, halelerin nabzı aynı formül.
 *    ÖLÇÜLDÜ (faz 0,50 · kart kutusu ortalama parlaklığı): sol 26,66 /
 *    sağ 26,63 — fark %0,1.
 *  · ÜÇ NİYET ROZETİ (durak 03): sayfa niyet türlerini sıralamıyor,
 *    "hangi başlığın hangi niyeti karşıladığı" diyor. Üç rozet aynı çerçeve,
 *    aynı dolgu; ayırt edici iç işaretlerin ALANI eşitlendi (daire r 4,6 =
 *    66,5 px²; kare 8,1×8,1 = 65,6 px²; eşkenar dörtgen köşegen 11,5 =
 *    66,1 px²). ÖLÇÜLDÜ (rozet kutusu ortalama parlaklığı): 46,73 / 46,71 /
 *    46,47 — fark %0,6.
 *  · BEŞ YAPRAK (durak 03, cluster tamamlanması): beşi de aynı yarıçap, aynı
 *    kontur, aynı dolgu; dolma sırası "tamamlanma" anlatısının kendisi,
 *    üstünlük değil — ve sıra tur içinde hepsini geziyor.
 *  · ÜÇ İÇERİK KARTI (durak 03, altta): 1. ve 3. kart birebir aynı; 2. kart
 *    BİLEREK farklı çünkü sayfanın anlattığı şey o — kapanan boşluk. Kapanma
 *    tamamlandığında üçü de aynı görünür. ÖLÇÜLDÜ (faz 0,80): kart 1 = 24,17,
 *    kart 3 = 24,17 (fark %0,0); kart 2 kapanma tamamken 24,20.
 *  · ALTI SÜREÇ ADIMI (durak 01): adımlar SIRALI, sayfa da sıralı anlatıyor —
 *    eşitlik gereği yok. Yine de hepsi aynı gövde, aynı ölçü, aynı konturla
 *    çiziliyor ve sıra tepeleri durağın canlı penceresine simetrik oturtuldu:
 *    tepe fazları 0,1167 / 0,1500 / 0,1833 / 0,2167 / 0,2500 / 0,2833; bunların
 *    durak parlaklıkları 0,561 / 0,737 / 0,912 / 0,912 / 0,737 / 0,561 — yani
 *    1↔6, 2↔5, 3↔4 BİREBİR eşit. Ortadakiler daha parlak çünkü pencerenin
 *    ortasındalar; üstünlük değil, sıranın ortası.
 *
 * IŞIK DARBESİNİN GEÇTİĞİ YER (ölçüldü, yerleşim buna göre kuruldu):
 *   durak 01 → yerel (126, DY+242)  · durak 02 → (123, DY+177)
 *   durak 03 → (120, DY+204)
 *  01'de darbe 5. adımın nötr çubuklarının üstüne düşüyor; simge (sol) ve
 *  çıktı şeridi (sağ) darbe çekirdeğinin dışında kalıyor.
 *  02'de darbe pillar bağlantısının TAM ÜSTÜNDE — bilerek: otoritenin
 *  bağlantıdan aktığı yer orası.
 *  03'te darbe yaprak sırası ile alttaki kart dizisinin ARASINDAKİ boşluğa
 *  düşüyor; hiçbir ayrıntıyı yemiyor.
 *
 * DİKİŞSİZ DÖNGÜ: durum taşıyan (dolar/kapanır/işaretlenir) her şey durağın
 * KENDİ penceresine oturtuldu ve mürekkebi p (durak canlılığı) ile çarpıldı.
 * p, faz 0'da ve faz 1'e yakınken üç durakta da 0 olduğu için pencere dışında
 * hiçbir durum kalıntısı görünmüyor; kalan tüm hareket (tarama çizgisi, imleç,
 * takip noktası, kesik akışları, nabızlar) faz cinsinden TAM SAYI çevrimli.
 */

const SERIT = { x0: -60, x1: 1180, cy: 330, genlik: 38, tur: 1.25 };

/* Üç durağın yeri — modüldeki öbür sahnelerle birebir aynı ızgara, böylece
   site içindeki videolar aynı ritmi paylaşıyor. Üstteki 118 piksel sayfadaki
   "CANLI DÖNGÜ" rozetine bırakıldı.
   ETİKET GENİŞLİĞİ ÖLÇÜLDÜ (28 px, Consolas 600, harf arası 1,2 — kod hesabı
   değil, render edilip piksel taranarak): 209 / 202 / 174 px. Üçü de 246 px
   istasyona sığıyor, en dar pay 37 px. */
const DURAK = [
  { x: 62,  fazMerkez: 0.20, etiket: '01 SÜREÇ AKIŞI' },
  { x: 437, fazMerkez: 0.50, etiket: '02 İÇ BAĞLANTI' },
  { x: 812, fazMerkez: 0.80, etiket: '03 RAPORLAMA' },
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
    s += (i === 0 ? surecAkisi(d.x, p, faz, a)
       : i === 1 ? icBaglanti(d.x, p, faz, a)
       : raporlama(d.x, p, faz, a));
    s += yaz(d.etiket, { x: d.x + DW / 2, y: DY + DH + 40, boy: 28, mono: true,
      agirlik: 600, hiza: 'middle', harfArasi: '1.2',
      renk: p > 0.35 ? `rgba(255,255,255,${(0.55 + 0.42 * p).toFixed(2)})` : 'rgba(167,176,194,.55)' });
    s += `</g>`;
  });

  /* --- ışık darbesi (durakların ÖNÜNDE) -------------------------------- */
  s += darbeIsigi(faz, SERIT, a.aksan.rgb, { yaricap: 52, opak: 0.9 });

  return s;
};

/* ── 01 · SÜREÇ NASIL İŞLİYOR ────────────────────────────────────────────
   Sayfanın saydığı ALTI adım, YILANKAVİ (serpentine) bir ızgarada — iki
   sütun, üç satır. Sayfa metnindeki sıra birebir korundu:
     satır 1 soldan sağa : 1 anahtar kelime ve niyet analizi
                           2 rakip boşluk taraması
     satır 2 sağdan sola : 3 başlık ve alt başlık kurgusu
                           4 yazım
     satır 3 soldan sağa : 5 iç bağlantı yerleştirme
                           6 yayın sonrası performans takibi
   Yılankavi seçildi çünkü sıra KESİNTİSİZ: satır sonunda aynı sütunda aşağı
   dönülüyor, "satır başına dönüş" sıçraması yok.
   Adım adları YAZILMADI (28 px altı yazı mobilde okunmaz; kural: ayrıntıyı
   şekiller taşır) — her adımın kendi simgesi var, ×1,25 ölçekle çiziliyor.
   "Her adım bir öncekinin çıktısına dayanır": kutunun altındaki ÇIKTI şeridi
   dolar, dolan çıktı bir sonraki kutuya giden bağda yürüyen jeton olarak
   taşınır. İlk kutuya gelen bir bağ yoktur — öncesi yok.

   YERLEŞİM ÖLÇÜMLE BELİRLENDİ — İKİ SÜRÜM ATILDI, ikisi de önizlemede
   görüldü:
     1) Tek sütunda alt alta altı satır (DY+22 … DY+322). Akan boru bu durakta
        yerel DY+230–242 bandından yatay geçiyor ve ışık darbesi (126, DY+242)
        tam 5. satırın üstüne oturuyordu; 5. ve 6. adımın simgesi okunmuyordu.
     2) Üç sütun × iki satır + altta yakın çekim. Bu kez alttaki yakın çekim
        kartlarının üst yarısı darbenin içinde kalıyordu ve panel kalabalıktı.
   Yürüyen sürüm iki sütun × üç satır: SÜTUN ARASI BOŞLUK yerel x 116–130'a
   düşüyor ve darbenin merkezi x = 126, yani darbe TAM OLUKTA. Satır 2 ile
   satır 3 arasına 48 px'lik ışık koridoru bırakıldı (DY+200–248); borunun
   yatay bandı ve darbenin merkezi (DY+242) o koridora oturuyor. Sonuç: altı
   simgenin hiçbiri darbenin güçlü bölgesinde değil.

   PENCERE: u = (faz − 0,10) / 0,20. Sıra tepeleri u = (i+0,5)/6, yani faz
   0,1167 … 0,2833; pencere durak merkezine (0,20) simetrik oturuyor. */

/* yılankavi ızgara: [sütun, satır] — sıra 1..6 */
const IZGARA = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 2], [1, 2]];
const KS = 100, KY = 88, KSUT = [16, 130], KSAT = [10, 112, 248];

function surecAkisi(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  let s = '';

  const u = (faz - 0.10) / 0.20;
  const sira = [0, 1, 2, 3, 4, 5].map((i) => kis01(1 - Math.abs(u * 6 - i - 0.5) * 1.6));
  const tamam = [0, 1, 2, 3, 4, 5].map((i) => kis01((u * 6 - i) / 0.55));

  const kx = (i) => bx + KSUT[IZGARA[i][0]];
  const ky = (i) => DY + KSAT[IZGARA[i][1]];

  /* --- adımlar arası bağlar (önce çizilir, kutuların ALTINDA kalsın) ---- */
  for (let i = 0; i < 5; i++) {
    const [c1, r1] = IZGARA[i], [c2] = IZGARA[i + 1];
    const g = tamam[i] * p;
    let x1, y1, x2, y2;
    if (IZGARA[i][1] === IZGARA[i + 1][1]) {
      /* aynı satır: yatay, satırın yönüne göre */
      const sag = c2 > c1;
      x1 = kx(i) + (sag ? KS : 0); x2 = kx(i + 1) + (sag ? 0 : KS);
      y1 = y2 = ky(i) + KY / 2;
    } else {
      /* satır dönüşü: sağ kenarda aşağı */
      x1 = x2 = kx(i) + KS / 2;
      y1 = ky(i) + KY; y2 = ky(i + 1);
    }
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="2"/>`;
    if (g > 0.004) {
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="rgba(${A},${(0.75 * g).toFixed(3)})" stroke-width="2.2"/>`;
      /* çıktı jetonu: bağ boyunca sonraki adıma yürür */
      s += `<rect x="${(x1 + (x2 - x1) * tamam[i] - 3.6).toFixed(1)}"
              y="${(y1 + (y2 - y1) * tamam[i] - 3.6).toFixed(1)}"
              width="7.2" height="7.2" rx="2" fill="rgba(${A},${(0.92 * g).toFixed(3)})"/>`;
    }
  }

  /* --- altı adım kutusu — hepsi BİREBİR aynı gövde ---------------------- */
  for (let i = 0; i < 6; i++) {
    const x = kx(i), y = ky(i);
    s += plaka(x, y, KS, KY, 9);
    s += `<rect x="${x}" y="${y}" width="${KS}" height="${KY}" rx="9"
            fill="rgba(255,255,255,${(0.026 + 0.032 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})" stroke-width="1.2"/>`;
    if (sira[i] * p > 0.01) {
      s += `<rect x="${x - 3}" y="${y - 3}" width="${KS + 6}" height="${KY + 6}" rx="12"
              fill="none" stroke="rgba(${A},${(0.72 * sira[i] * p).toFixed(3)})" stroke-width="1.7"/>`;
    }
    /* simge — ×1,25 ölçekle, kutuda yatay ortalı (47,5 px / 100 px kutu) */
    s += `<g transform="translate(${x + 26} ${y + 12}) scale(1.25)">`
       + simge(i, 0, 0, p, faz, A) + `</g>`;
    /* ÇIKTI şeridi — adım bitince dolar */
    s += `<rect x="${x + 26}" y="${y + 62}" width="48" height="14" rx="7"
            fill="rgba(255,255,255,.035)"
            stroke="rgba(255,255,255,${(0.09 + 0.12 * p).toFixed(3)})" stroke-width="1.1"/>`;
    if (tamam[i] * p > 0.004) {
      s += `<rect x="${x + 26}" y="${y + 62}" width="${(48 * tamam[i]).toFixed(1)}" height="14" rx="7"
              fill="rgba(${A},${(0.78 * p).toFixed(3)})"/>`;
    }
  }
  return s;
}

/* Altı adımın simgesi — 38×30 kutu, sol üst köşesi (gx, gy).
   Her simge sayfanın saydığı adımın karşılığı; ekstra anlam yüklenmedi. */
function simge(i, gx, gy, p, faz, A) {
  const ink = (0.13 + 0.22 * p).toFixed(3);          // nötr mürekkep
  const vur = (0.26 + 0.44 * p).toFixed(3);          // aksan mürekkep
  let s = '';

  if (i === 0) {
    /* 1 · anahtar kelime ve niyet ANALİZİ: üç kelime çubuğu bir gruba
       alınıyor ve niyet jetonuna bağlanıyor (sınıflandırma). */
    [0, 1, 2].forEach((r) => {
      s += `<rect x="${gx}" y="${gy + 2 + r * 10}" width="15" height="6" rx="3"
              fill="rgba(255,255,255,${ink})"/>`;
    });
    s += `<path d="M${gx + 19} ${gy + 2} H${gx + 25} V${gy + 28} H${gx + 19}"
            fill="none" stroke="rgba(${A},${vur})" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<rect x="${gx + 29}" y="${gy + 11}" width="8" height="8" rx="2.5"
            fill="rgba(${A},${vur})"/>`;

  } else if (i === 1) {
    /* 2 · rakip boşluk TARAMASI: altı gözlü küçük ızgara, biri kesik konturlu
       (boşluk); üzerinden tarama çizgisi geçer. Turda tam 2 çevrim → dikişsiz.
       KESİŞEN DAİRE ÇİZİLMEDİ — o kardeş figürün (.akis 02) çizimi. */
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 2; r++) {
        const cx = gx + c * 14, cyy = gy + r * 18;
        if (c === 2 && r === 0) {
          s += `<rect x="${cx}" y="${cyy}" width="10" height="12" rx="2.5" fill="none"
                  stroke="rgba(${A},${vur})" stroke-width="1.3" stroke-dasharray="2.6 2.6"/>`;
        } else {
          s += `<rect x="${cx}" y="${cyy}" width="10" height="12" rx="2.5"
                  fill="rgba(255,255,255,${ink})"/>`;
        }
      }
    }
    const tx = gx + 38 * (0.5 + 0.5 * Math.sin(2 * Math.PI * faz * 2));
    s += `<line x1="${tx.toFixed(1)}" y1="${gy - 2}" x2="${tx.toFixed(1)}" y2="${gy + 32}"
            stroke="rgba(${A},${(0.30 + 0.45 * p).toFixed(3)})" stroke-width="1.6"/>`;

  } else if (i === 2) {
    /* 3 · başlık ve ALT BAŞLIK kurgusu: bir üst başlık, altında girintili
       iki alt başlık, sola dayalı hiyerarşi ağacı. */
    s += `<rect x="${gx}" y="${gy + 3}" width="34" height="6" rx="3"
            fill="rgba(${A},${vur})"/>`;
    s += `<path d="M${gx + 3} ${gy + 11} V${gy + 26.5} M${gx + 3} ${gy + 17.5} H${gx + 9}
            M${gx + 3} ${gy + 26.5} H${gx + 9}" fill="none"
            stroke="rgba(255,255,255,${ink})" stroke-width="1.3" stroke-linecap="round"/>`;
    s += `<rect x="${gx + 11}" y="${gy + 15}" width="24" height="5" rx="2.5"
            fill="rgba(255,255,255,${ink})"/>`;
    s += `<rect x="${gx + 11}" y="${gy + 24}" width="18" height="5" rx="2.5"
            fill="rgba(255,255,255,${ink})"/>`;

  } else if (i === 3) {
    /* 4 · yazım: üç satır + yanıp sönen imleç. Turda tam 6 çevrim → dikişsiz.
       Gerçek metin yok, soyut çubuk. */
    [[34, 3], [30, 13], [17, 23]].forEach(([w, dy]) => {
      s += `<rect x="${gx}" y="${gy + dy}" width="${w}" height="5" rx="2.5"
              fill="rgba(255,255,255,${ink})"/>`;
    });
    const yanip = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 6);
    s += `<rect x="${gx + 20}" y="${gy + 21}" width="2.8" height="9" rx="1.4"
            fill="rgba(${A},${(0.90 * yanip * (0.30 + 0.70 * p)).toFixed(3)})"/>`;

  } else if (i === 4) {
    /* 5 · iç bağlantı YERLEŞTİRME: iki düğüm, aralarında akan bir bağ.
       (Durak 02 bu adımın açılımı; burada yalnız süreçteki yeri gösteriliyor.) */
    s += `<circle cx="${gx + 7}" cy="${gy + 8}" r="5.5" fill="none"
            stroke="rgba(${A},${vur})" stroke-width="1.6"/>`;
    s += `<circle cx="${gx + 30}" cy="${gy + 22}" r="5.5" fill="none"
            stroke="rgba(${A},${vur})" stroke-width="1.6"/>`;
    s += `<line x1="${gx + 11.5}" y1="${gy + 11.5}" x2="${gx + 25.5}" y2="${gy + 18.5}"
            stroke="rgba(${A},${vur})" stroke-width="1.8" stroke-dasharray="3 4"
            stroke-dashoffset="-${(faz * 14).toFixed(1)}" stroke-linecap="round"/>`;

  } else {
    /* 6 · yayın sonrası performans TAKİBİ: nötr takip çizgisi.
       BİLEREK YÖNSÜZ — başladığı yükseklikte bitiyor, eksen ve değer yok,
       üzerinde rakam yok. "Takip ediliyor" demek, "arttı" dememek için. */
    const nokta = [];
    for (let k = 0; k <= 12; k++) {
      const t = k / 12;
      nokta.push([gx + 38 * t, gy + 15 + 9 * Math.sin(2 * Math.PI * 1.5 * t)]);
    }
    s += `<path d="${nokta.map((n, k) => (k ? 'L' : 'M') + n[0].toFixed(1) + ' ' + n[1].toFixed(1)).join(' ')}"
            fill="none" stroke="rgba(255,255,255,${ink})" stroke-width="1.7"
            stroke-linecap="round" stroke-linejoin="round"/>`;
    /* takip noktası GİDİP GELİR, sarmalamaz: `(faz*2)%1` denendi ve
       ATILDI — testere dişi olduğu için nokta sağ uçtan sol uca ZIPLIYOR,
       hem tur ortasında hem tam döngü noktasında. Kosinüs sürekli. */
    const td = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 2);
    s += `<circle cx="${(gx + 38 * td).toFixed(1)}"
            cy="${(gy + 15 + 9 * Math.sin(2 * Math.PI * 1.5 * td)).toFixed(1)}" r="3.2"
            fill="rgba(${A},${(0.35 + 0.55 * p).toFixed(3)})"/>`;
  }
  return s;
}

/* ── 02 · İÇ BAĞLANTI KURGUSU ────────────────────────────────────────────
   Altta YENİ YAZI kartı. İçindeki ikinci satırda önceden imlenmiş ANCHOR
   parçası: iki uç imi (önceden belirlenmiş) + altı çizili aksan bölüt.
   Oradan üç bağlantı çıkar — yukarı PILLAR sayfaya, sola ve sağa iki KOMŞU
   CLUSTER içeriğine. Bağlantı uçlarında ok başı var: "kullanıcıyı ilgili
   konuya yönlendirir". Bağlantılarda paketler yürür; vardıkça üç hedef de
   AYNI nabızla ışır: "site içi otorite dağılımını güçlendirir".
   PILLAR kartı daha büyük çünkü sayfanın kendi hiyerarşisi öyle ("ilgili
   pillar sayfaya ve komşu cluster içeriklerine") — iki komşu cluster kartı
   ise birbirinin BİREBİR aynı, bağlantıları da tam ayna.
   ÖLÇÜ NOTU: ışık darbesi bu durakta yerel (123, DY+177)'ye oturuyor, yani
   pillar bağlantısının tam üstüne. Bilerek: paketlerin aktığı yer orası.
   Kart gövdeleri ve rozetler o bandın dışında (clusterlar DY+112–174,
   yeni yazı DY+232'den aşağıda). */
function icBaglanti(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const u = (faz - 0.40) / 0.20;
  /* AŞAMALAR — önce anchor imlenir, sonra bağlantılar kurulur.
     Aşama değerleri SAF (0..1, p içermez); mürekkebe dönüşürken p ile
     çarpılırlar. p pencere dışında 0 olduğu için hiçbir durum kalıntısı
     görünmez → dikişsiz. */
  /* ZAMANLAMA ÖNİZLEMEYLE DÜZELTİLDİ: ilk sürümde bağlantılar u = 0,30'dan
     önce hiç çizilmiyordu, yani durak faz 0,44'te tam aydınlıkken bile dört
     kart BAĞLANTISIZ duruyordu — durağın adı "iç bağlantı" olduğu hâlde.
     Aşamalar öne çekildi; durak görünür olduğu andan itibaren bir şey oluyor. */
  const sIm = kis01((u + 0.30) / 0.15);        // anchor uç imleri
  const sAnchor = kis01((u + 0.10) / 0.20);    // anchor bölütü + altı çizgi
  const sBag = kis01((u - 0.02) / 0.24);       // bağlantılar
  const asAnchor = sAnchor * p, asBag = sBag * p;
  /* paket nabzı: turda tam 3 çevrim → dikişsiz; üç bağlantıda AYNI faz */
  const q = (faz * 3) % 1;
  const nabiz = 0.5 - 0.5 * Math.cos(2 * Math.PI * faz * 3);
  let s = '';

  /* --- pillar sayfa -----------------------------------------------------
     ÖLÇÜM SONRASI YUKARI ALINDI: boru bu durakta çapraz iniyor ve sol/sağ
     komşu cluster kartı ilk yerleşimde (DY+112–174) boruya EŞİT UZAKLIKTA
     DEĞİLDİ — sol kartın altından 18 px geçerken sağ kartın İÇİNDEN, alt
     kenarının 6 px üstünden geçiyordu. Kartlar DY+96–154'e, pillar da
     DY+10–78'e alındı; boru artık iki kartın da altından geçiyor. */
  const pX = bx + 76, pY = DY + 10, pW = 94, pH = 68;
  s += `<rect x="${pX - 7}" y="${pY - 7}" width="${pW + 14}" height="${pH + 14}" rx="14"
          fill="rgba(${A},${(0.045 * nabiz * asBag + 0.020 * p).toFixed(3)})"/>`;
  s += plaka(pX, pY, pW, pH, 10);
  s += `<rect x="${pX}" y="${pY}" width="${pW}" height="${pH}" rx="10"
          fill="rgba(255,255,255,${(0.040 + 0.040 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.20 + 0.40 * p + 0.22 * nabiz * asBag).toFixed(3)})" stroke-width="1.7"/>`;
  s += `<rect x="${pX + 12}" y="${pY + 12}" width="70" height="9" rx="4.5"
          fill="rgba(${A},${(0.34 + 0.44 * p).toFixed(3)})"/>`;
  [70, 58, 64].forEach((w, r) => {
    s += `<rect x="${pX + 12}" y="${pY + 32 + r * 12}" width="${w}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.10 + 0.17 * p).toFixed(3)})"/>`;
  });

  /* --- iki komşu cluster içeriği — BİREBİR aynı kod ---------------------- */
  const cW = 72, cH = 58, cY = DY + 96;
  [bx + 14, bx + 160].forEach((cX) => {
    s += `<rect x="${cX - 6}" y="${cY - 6}" width="${cW + 12}" height="${cH + 12}" rx="13"
            fill="rgba(${A},${(0.040 * nabiz * asBag).toFixed(3)})"/>`;
    s += plaka(cX, cY, cW, cH, 9);
    s += `<rect x="${cX}" y="${cY}" width="${cW}" height="${cH}" rx="9"
            fill="rgba(255,255,255,${(0.030 + 0.032 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.11 + 0.17 * p).toFixed(3)})" stroke-width="1.3"/>`;
    s += `<rect x="${cX + 10}" y="${cY + 10}" width="42" height="7" rx="3.5"
            fill="rgba(${A},${(0.26 + 0.40 * p).toFixed(3)})"/>`;
    [50, 38, 44].forEach((w, r) => {
      s += `<rect x="${cX + 10}" y="${cY + 26 + r * 11}" width="${w}" height="4.6" rx="2.3"
              fill="rgba(255,255,255,${(0.09 + 0.15 * p).toFixed(3)})"/>`;
    });
  });

  /* --- yeni yazı -------------------------------------------------------- */
  const yX = bx + 58, yY = DY + 232, yW = 130, yH = 92;
  s += plaka(yX, yY, yW, yH, 10);
  s += `<rect x="${yX}" y="${yY}" width="${yW}" height="${yH}" rx="10"
          fill="rgba(255,255,255,${(0.036 + 0.036 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.12 + 0.18 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${yX + 12}" y="${yY + 12}" width="60" height="7" rx="3.5"
          fill="rgba(${A},${(0.28 + 0.42 * p).toFixed(3)})"/>`;
  [[106, 30], [104, 42], [98, 54], [72, 66]].forEach(([w, dy]) => {
    s += `<rect x="${yX + 12}" y="${yY + dy}" width="${w}" height="5" rx="2.5"
            fill="rgba(255,255,255,${(0.09 + 0.15 * p).toFixed(3)})"/>`;
  });

  /* ANCHOR METNİ — satır içinde önceden imlenmiş bölüt.
     "Önceden belirlenmiş": iki uç imi bölütten ÖNCE (asAnchor'ın ilk yarısı)
     beliriyor, bölütün kendisi ve altı çizgisi sonra doluyor. */
  const aX = yX + 46, aW = 46, aY = yY + 42;
  s += `<path d="M${aX - 3} ${aY - 4} V${aY + 9} M${aX + aW + 3} ${aY - 4} V${aY + 9}"
          stroke="rgba(255,255,255,${(0.60 * sIm * p).toFixed(3)})"
          stroke-width="1.4" stroke-linecap="round"/>`;
  s += `<rect x="${aX}" y="${aY}" width="${aW}" height="5" rx="2.5"
          fill="rgba(${A},${(0.85 * asAnchor).toFixed(3)})"/>`;
  s += `<rect x="${aX}" y="${aY + 8}" width="${(aW * sAnchor).toFixed(1)}" height="1.7" rx="0.85"
          fill="rgba(${A},${(0.70 * asAnchor).toFixed(3)})"/>`;

  /* --- üç bağlantı: pillar (yukarı) + iki komşu cluster (ayna) ----------
     L2 ve L3 tam ayna: dx = ∓45, dy = −58, aynı uzunluk, aynı kesik deseni,
     aynı paket fazı. */
  const bag = [
    { x1: bx + 123, y1: yY,     x2: bx + 123, y2: pY + pH },
    { x1: bx + 95,  y1: yY,     x2: bx + 50,  y2: cY + cH },
    { x1: bx + 151, y1: yY,     x2: bx + 196, y2: cY + cH },
  ];
  const kay = (faz * 36).toFixed(1);                    // desen 12 × 3 tur
  bag.forEach((b) => {
    s += `<line x1="${b.x1}" y1="${b.y1}" x2="${b.x2}" y2="${b.y2}"
            stroke="rgba(${A},${(0.55 * asBag).toFixed(3)})" stroke-width="1.8"
            stroke-dasharray="5 7" stroke-dashoffset="-${kay}" stroke-linecap="round"/>`;
    /* ok başı — hedefe bakar ("kullanıcıyı ilgili konuya yönlendirir") */
    const dx = b.x2 - b.x1, dy = b.y2 - b.y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L, px = -uy, py = ux;
    const tipX = b.x2, tipY = b.y2;
    s += `<path d="M${tipX.toFixed(1)} ${tipY.toFixed(1)}
            L${(tipX - ux * 10 + px * 5).toFixed(1)} ${(tipY - uy * 10 + py * 5).toFixed(1)}
            L${(tipX - ux * 10 - px * 5).toFixed(1)} ${(tipY - uy * 10 - py * 5).toFixed(1)} Z"
            fill="rgba(${A},${(0.80 * asBag).toFixed(3)})"/>`;
    /* otorite paketi — üç bağlantıda AYNI q (eşitlik), hedefe doğru yürür.
       q testere dişi olduğu için paket kaynağa döner; ZIPLAMA görünmesin
       diye opaklık sin(πq): kaynakta 0'dan açılıyor, hedefte 0'a kapanıyor. */
    if (asBag > 0.02) {
      const gx = b.x1 + dx * q, gy = b.y1 + dy * q;
      s += `<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="3.6"
              fill="rgba(${A},${(0.95 * asBag * Math.sin(Math.PI * q)).toFixed(3)})"/>`;
    }
  });
  return s;
}

/* ── 03 · RAPORLAMA NEYİ GÖSTERİYOR ──────────────────────────────────────
   Sayfa üç şey sayıyor, rapor da üç bölüm:
     (a) "hangi başlığın hangi niyeti karşıladığı" — üç satır:
         [başlık çubuğu] → [niyet rozeti]. Başlık metni YAZILMIYOR, çubuk.
         Üç rozet aynı çerçeve/dolgu; iç işaretleri ALANI EŞİT üç ayrı biçim
         (daire / kare / eşkenar dörtgen) — tür ayrımı var, sıralama yok.
     (b) "hangi cluster'ın tamamlandığı" — hub + beş yaprak; yapraklar tek
         tek dolar, hepsi dolunca hub tamamlanma halkasını alır.
     (c) "hangi rakip boşluğunun kapatıldığı" — üç içerik kartı; ortadaki
         kesik konturlu BOŞLUK aşağıdan yukarı dolarak kapanır ve 1. ile 3.
         kartla aynı hâle gelir. Rakip adı, alan adı, rakam YOK.
   ÖLÇÜ NOTU: ışık darbesi yerel (120, DY+204)'e düşüyor — yaprak sırası
   (DY+166–184) ile kart dizisinin (DY+216'dan aşağı) arasındaki boşluk. */
function raporlama(bx, p, faz, a) {
  const A = a.aksan.rgb.join(',');
  const u = (faz - 0.70) / 0.20;
  let s = '';

  /* --- rapor başlığı ---------------------------------------------------- */
  s += `<rect x="${bx + 16}" y="${DY + 12}" width="214" height="26" rx="8"
          fill="rgba(255,255,255,${(0.042 + 0.038 * p).toFixed(3)})"
          stroke="rgba(255,255,255,${(0.10 + 0.15 * p).toFixed(3)})" stroke-width="1.3"/>`;
  s += `<rect x="${bx + 26}" y="${DY + 19}" width="5" height="12" rx="2.5"
          fill="rgba(${A},${(0.40 + 0.45 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 40}" y="${DY + 22}" width="62" height="6" rx="3"
          fill="rgba(255,255,255,${(0.12 + 0.18 * p).toFixed(3)})"/>`;
  s += `<rect x="${bx + 112}" y="${DY + 22}" width="38" height="6" rx="3"
          fill="rgba(255,255,255,${(0.09 + 0.13 * p).toFixed(3)})"/>`;

  /* --- (a) başlık → niyet eşleşmesi ------------------------------------- */
  for (let i = 0; i < 3; i++) {
    const y = DY + 46 + i * 30;
    /* aşama SAF; p ile yalnız mürekkebe dönüşürken çarpılıyor */
    const g = kis01((u - 0.06 - i * 0.09) / 0.20) * p;
    /* (i sırası anlatının kendisi: rapor satırları sırayla eşleşiyor) */
    s += `<rect x="${bx + 16}" y="${y}" width="214" height="26" rx="8"
            fill="rgba(255,255,255,${(0.024 + 0.026 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.08 + 0.11 * p).toFixed(3)})" stroke-width="1.1"/>`;
    /* başlık: soyut çubuk (gerçek başlık metni yazılmaz) */
    s += `<rect x="${bx + 26}" y="${y + 10}" width="84" height="6" rx="3"
            fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
    /* eşleşme oku — g ile belirir */
    s += `<path d="M${bx + 120} ${y + 9} L${bx + 126} ${y + 13} L${bx + 120} ${y + 17}"
            fill="none" stroke="rgba(${A},${(0.20 * p + 0.55 * g).toFixed(3)})"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    /* niyet rozeti — üçü aynı çerçeve/dolgu, iç işaretlerin ALANI eşit */
    const rX = bx + 138, rW = 44, rH = 18, rY = y + 4;
    s += `<rect x="${rX}" y="${rY}" width="${rW}" height="${rH}" rx="9"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(${A},${(0.14 * p + 0.48 * g).toFixed(3)})" stroke-width="1.3"/>`;
    const mx = rX + rW / 2, my = rY + rH / 2;
    const mi = `rgba(${A},${(0.16 * p + 0.62 * g).toFixed(3)})`;
    /* ALANLARI EŞİTLENDİ (ölçüm sonrası düzeltildi): ilk sürümde kare
       8,1×8,1 ve rx 1,4 idi; yuvarlatma köşelerden 1,68 px² yiyor ve kare
       öbür ikisinden %4 daha az mürekkep taşıyordu. Yuvarlatma kaldırıldı,
       kenar 8,15'e çıkarıldı:
         daire   π·4,60²      = 66,48 px²
         kare    8,15²        = 66,42 px²
         eşkenar 11,53²/2     = 66,47 px²
       → alan farkı %0,1. */
    if (i === 0) {
      s += `<circle cx="${mx}" cy="${my}" r="4.6" fill="${mi}"/>`;
    } else if (i === 1) {
      s += `<rect x="${mx - 4.075}" y="${my - 4.075}" width="8.15" height="8.15" fill="${mi}"/>`;
    } else {
      s += `<path d="M${mx} ${my - 5.765} L${mx + 5.765} ${my} L${mx} ${my + 5.765} L${mx - 5.765} ${my} Z"
              fill="${mi}"/>`;
    }
  }

  /* --- (b) cluster tamamlanması: hub + beş yaprak ------------------------ */
  /* ÖLÇÜ NOTU: ilk yerleşimde hub DY+158, yapraklar DY+175'teydi ve akan boru
     bu durakta panelin SOL kenarından DY+178, sağ kenarından DY+231 ile
     çapraz geçiyor — yani tam hub ile ilk yaprakların üstünden. Önizlemede
     görüldü, hub okunmuyordu. 16 px yukarı alındı: yapraklar DY+156, hub
     DY+140–172, boru artık hemen ALTLARINDAN geçiyor. Işık darbesi (120,
     DY+204) ise yaprak sırası ile kart dizisi arasındaki 50 px'lik boşluğun
     ortasına düşüyor. */
  const hX = bx + 16, hY = DY + 140, hW = 32;
  const yapX = [bx + 72, bx + 108, bx + 144, bx + 180, bx + 214];
  const yapY = DY + 156;
  /* yaprak dolum aşamaları SAF (0..1); geometriye saf değer, mürekkebe p ile
     çarpılmış değer gider — böylece dolum yarıçapı durak parlaklığına göre
     zıplamaz, yalnız görünürlük p ile sönümlenir. */
  const sDolu = yapX.map((_, j) => kis01((u - 0.28 - j * 0.10) / 0.16));
  const sBitti = Math.min(...sDolu);
  const bitti = sBitti * p;

  s += `<line x1="${hX + hW}" y1="${yapY}" x2="${bx + 214}" y2="${yapY}"
          stroke="rgba(255,255,255,${(0.07 + 0.10 * p).toFixed(3)})" stroke-width="1.6"/>`;
  s += plaka(hX, hY, hW, hW, 10);
  s += `<rect x="${hX}" y="${hY}" width="${hW}" height="${hW}" rx="10"
          fill="rgba(255,255,255,${(0.038 + 0.036 * p).toFixed(3)})"
          stroke="rgba(${A},${(0.18 + 0.36 * p + 0.30 * bitti).toFixed(3)})" stroke-width="1.5"/>`;
  s += `<rect x="${hX + 8}" y="${hY + 12}" width="18" height="5" rx="2.5"
          fill="rgba(${A},${(0.30 + 0.42 * p).toFixed(3)})"/>`;
  s += `<rect x="${hX + 8}" y="${hY + 21}" width="12" height="4" rx="2"
          fill="rgba(255,255,255,${(0.10 + 0.16 * p).toFixed(3)})"/>`;
  if (bitti > 0.01) {
    s += `<rect x="${hX - 5}" y="${hY - 5}" width="${hW + 10}" height="${hW + 10}" rx="14"
            fill="none" stroke="rgba(${A},${(0.72 * bitti).toFixed(3)})" stroke-width="1.7"/>`;
  }
  yapX.forEach((x, j) => {
    s += `<circle cx="${x}" cy="${yapY}" r="8.5"
            fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
            stroke="rgba(255,255,255,${(0.10 + 0.15 * p).toFixed(3)})" stroke-width="1.2"/>`;
    if (sDolu[j] * p > 0.004) {
      s += `<circle cx="${x}" cy="${yapY}" r="${(8.5 * sDolu[j]).toFixed(1)}"
              fill="rgba(${A},${(0.72 * p).toFixed(3)})"/>`;
    }
  });

  /* --- (c) kapanan rakip boşluğu: üç içerik kartı ------------------------
     1. ve 3. kart BİREBİR aynı. 2. kart sayfanın anlattığı şey: kesik
     konturlu boşluk aşağıdan yukarı doluyor ve öbür ikisiyle aynı hâle
     geliyor. Rakip adı ya da URL yazılmadı; kart içerikleri soyut çubuk. */
  /* ÖLÇÜM SONRASI AŞAĞI ALINDI: boru bu durakta soldan sağa iniyor — 1.
     kartın x'inde yerel DY+187, 3. kartın x'inde DY+221,6. Kartlar DY+222'de
     başlayınca boru 3. kartın üst kenarını SIYIRIYORDU ve 1.–3. kart tur
     ortalamasında %7,4 ayrılıyordu. DY+232'ye indirildi: boru 1. kartın
     45 px, 3. kartın 10 px üstünden geçiyor, ikisinin de DIŞINDA. */
  const kW = 66, kH = 96, kY = DY + 232;
  const sKapan = kis01((u - 0.52) / 0.30);         // SAF aşama (0..1)
  /* DÖNGÜ TUZAĞI, ÖLÇÜLDÜ VE KAPATILDI: 1. ve 3. kartın mürekkebinde durağan
     bir taban var (0,10) — statik oldukları için sorun değil. 2. kartın
     içeriği ise kırpma ile açılıp kapandığından DURUM taşıyor: 119. karede
     (faz 0,99167) sKapan = 1, p = 0 → kart taban mürekkeple GÖRÜNÜR;
     0. karede sKapan = 0 → GÖRÜNMEZ. 66×106'lık bir blok döngü noktasında
     yanıp sönüyordu. `kapali` kapısı p sıfıra inerken 2. kartın tabanını da
     siler; p > 0,125 olan her karede 1'dir, yani kart canlıyken 1. ve 3.
     kartla BİREBİR aynı mürekkebi taşır (eşitlik bozulmuyor). */
  const kapali = kis01(p * 8);
  const kartIc = (x, alfa) => {
    let t = '';
    t += `<rect x="${x + 10}" y="${kY + 12}" width="34" height="7" rx="3.5"
            fill="rgba(${A},${(0.62 * alfa).toFixed(3)})"/>`;
    [46, 38, 44, 30].forEach((w, r) => {
      t += `<rect x="${x + 10}" y="${kY + 30 + r * 12}" width="${w}" height="5" rx="2.5"
              fill="rgba(255,255,255,${(0.34 * alfa).toFixed(3)})"/>`;
    });
    t += `<rect x="${x + 10}" y="${kY + 80}" width="26" height="10" rx="5"
            fill="rgba(${A},${(0.34 * alfa).toFixed(3)})"/>`;
    return t;
  };

  [0, 1, 2].forEach((j) => {
    const x = bx + 16 + j * 74;
    if (j === 1) {
      /* boşluk: kesik kontur önce; kart aşağıdan yukarı dolarak boşluğu
         kapatır, kesik kontur kapandıkça sönümlenir */
      s += `<rect x="${x}" y="${kY}" width="${kW}" height="${kH}" rx="9" fill="none"
              stroke="rgba(${A},${(0.34 * p * (1 - 0.55 * sKapan)).toFixed(3)})"
              stroke-width="1.4" stroke-dasharray="6 6"/>`;
      const id = `bosluk${Math.round(bx)}`;
      s += `<clipPath id="${id}"><rect x="${x}" y="${(kY + kH * (1 - sKapan)).toFixed(1)}"
              width="${kW}" height="${(kH * sKapan).toFixed(1)}"/></clipPath>`;
      /* plaka da kırpmanın İÇİNDE: boşluk kapanmadan önce o bölge gerçekten
         boş kalsın, kapandıkça 1. ve 3. kartla birebir aynı tabanı alsın. */
      s += `<g clip-path="url(#${id})">`;
      /* plaka da `kapali` kapısından geçer: KOYU olduğu için p sıfıra
         inerken silinmezse 119. kare ile 0. kare arasında karartma farkı
         kalır — aynı dikiş tuzağının ikinci yüzü. */
      s += plaka(x, kY, kW, kH, 9, kapali);
      s += `<rect x="${x}" y="${kY}" width="${kW}" height="${kH}" rx="9"
              fill="rgba(255,255,255,${((0.030 + 0.030 * p) * kapali).toFixed(3)})"
              stroke="rgba(255,255,255,${((0.11 + 0.16 * p) * kapali).toFixed(3)})" stroke-width="1.3"/>`;
      s += kartIc(x, (0.10 + 0.90 * p) * kapali);
      s += `</g>`;
    } else {
      s += plaka(x, kY, kW, kH, 9);
      s += `<rect x="${x}" y="${kY}" width="${kW}" height="${kH}" rx="9"
              fill="rgba(255,255,255,${(0.030 + 0.030 * p).toFixed(3)})"
              stroke="rgba(255,255,255,${(0.11 + 0.16 * p).toFixed(3)})" stroke-width="1.3"/>`;
      s += kartIc(x, 0.10 + 0.90 * p);
    }
  });
  return s;
}

function kis01(v) { return Math.max(0, Math.min(1, v)); }

/* KART TABANI — yarı geçirmez koyu plaka.
 *
 * NEDEN VAR (ölçüldü, tahmin değil): akan boru duraklarn ARKASINDAN geçiyor
 * ve cam kartlar neredeyse saydam olduğu için borunun geniş halesi kartların
 * içinden görünüyordu. Boru bu videoda YATAY DEĞİL, ÇAPRAZ ilerliyor: durak
 * 02'de panelin sol kenarında yerel DY+204, sağ kenarında DY+166; durak
 * 03'te solda DY+178, sağda DY+231. Yani boru sürekli olarak bir tarafa daha
 * yakın. Sonuç, EŞİT çizilmiş kardeş kartlarda kalıcı bir parlaklık farkı:
 *   ışıksız (yalnız çizim mürekkebi) sol/sağ komşu cluster kartı 69,086 /
 *   69,080 — fark %0,01, yani çizim birebir eşit;
 *   ışıklı TUR ORTALAMASI (30 örnek) ise 56,14 / 72,50 — fark %25,4.
 * Işık darbesi soldan sağa süpürdüğü için ORTALAMADA eşitlenir; eşitlemeyen
 * borunun kendisiydi. Plaka boruyu kartın arkasında kesiyor. Darbe kartların
 * ÖNÜNDE çizildiği için (modülün ortak dili) ondan etkilenmiyor — ama darbe
 * turda her iki tarafı da geziyor, kalıcı bir taraf tutması yok.
 * Opaklık 0,62: boru kartların ARASINDAKİ boşluklarda hâlâ görünüyor, yani
 * kardeş videoların cam + akan boru dili korunuyor. */
function plaka(x, y, w, h, r, k = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"
            fill="rgba(14,17,24,${(0.62 * k).toFixed(3)})"/>`;
}
