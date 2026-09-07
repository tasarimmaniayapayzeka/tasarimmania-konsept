/* BLOG GÖVDE PAKETİ — hizmet sayfalarındaki onaylı bileşenleri blog yazısına taşır
 *
 * Kullanım:
 *   node plan/blog-paket-uygula.js <slug>            → kuru koşu
 *   node plan/blog-paket-uygula.js <slug> --ikiz     → <slug>-yeni/ olarak yaz (orijinal DURUR)
 *   node plan/blog-paket-uygula.js <slug> --uygula   → yazının kendisine uygula
 *
 * NEDEN: plan/bilesen-farki.js ölçtü — hizmet sayfalarında VAR olan 8 bileşen
 * 42 blog yazısının HİÇBİRİNDE yok:
 *   .akv (23/34) · .sd (23/34) · .hrt (27/34) · .ac3 (28/34) · .ciz-kutu (23/34)
 *   · --dfA (23/34) · .dtay (23/34) · hub-hero3d (5/34)   →  blogda 0/42
 * Blog yazıları eski, düz şablonda kalmış. Yeni tasarım UYDURMUYORUZ;
 * kullanıcının zaten seçip onayladığı dili blog tarafına taşıyoruz.
 *
 * ⚠ İKİZ KLASÖR, AYNI DERİNLİKTE. Önizleme plan/ altına konulamaz: sayfanın
 *   bütün göreli yolları (css, logo, görsel, video) bir kat kayar ve kırılır.
 *   Bu yüzden ikiz, kardeş dizin olarak yazılıyor: /blog/<slug>-yeni/
 *
 * ⚠ FAQPage ŞEMASI KORUNUYOR. <details> akordiyonu .sd sekme paneline
 *   dönüşüyor; soru ve cevap metinleri BİREBİR aynı kalıyor, yalnız kabuk
 *   değişiyor. Hizmet sayfalarında FAQPage şeması ile .sd zaten bir arada
 *   (ölçüldü: ai-video-produksiyon → FAQPage 1, data-sd 4).
 *
 * ⚠ tm.css'te GLOBAL bir kayan-yazı bileşeni var; onun `span{display:inline-flex}`
 *   ve `span::before{content:…}` kuralları <figure> içine konan HER <span>'i
 *   ele geçiriyor (bu tuzak teknik-seo sayfasında ölçülmüş). Bu yüzden yeni
 *   bileşenlerde <figure> içinde çıplak <span> KULLANILMIYOR.
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');

const slug = process.argv[2];
const IKIZ = process.argv.includes('--ikiz');
const UYGULA = process.argv.includes('--uygula');
if (!slug) { console.error('Kullanım: node plan/blog-paket-uygula.js <slug> [--ikiz|--uygula]'); process.exit(1); }

const kaynakDizin = path.join(S, 'blog', slug);
const kaynak = path.join(kaynakDizin, 'index.html');
if (!fs.existsSync(kaynak)) { console.error('Yazı yok: ' + kaynak); process.exit(1); }
let h = fs.readFileSync(kaynak, 'utf8');
const rapor = [];

/* ─────────────────────────────────────────────────────────────────
   1) BİLEŞEN CSS'İ — referans hizmet sayfasından ÇIKARILIR, elle
      kopyalanmaz. Kaynak tek: değişirse blog da aynı değişimi alır.
   ───────────────────────────────────────────────────────────────── */
const REFERANS = path.join(S, 'ai-video-produksiyon', 'index.html');
const refCss = fs.readFileSync(REFERANS, 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];

/* İstenen seçici önekleri. Bir kural bunlardan biriyle başlıyorsa alınır. */
const ONEK = ['.ciz-', '.cz-', '.dtay', '.hrt', '.sd', '.akv', '.ara-cta', '.ac3-', '.yk'];
const ANAHTAR = /cizStroke|cizDolgu|cizRozet|sdGel|akvNabiz|dfIkon|dfA|hrtAkis|ac3/;

function cssSuz(css) {
  /* kuralları kabaca böl: en üst düzey { } dengesi */
  const parcalar = []; let derinlik = 0, basla = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') { if (derinlik === 0) { } derinlik++; }
    else if (css[i] === '}') { derinlik--; if (derinlik === 0) { parcalar.push(css.slice(basla, i + 1)); basla = i + 1; } }
  }
  const tut = [];
  for (const p of parcalar) {
    const t = p.trim(); if (!t) continue;
    /* ⚠ SEÇİCİYİ YORUMDAN ARINDIR — ÖLÇÜLMÜŞ HATA. Parça, bir önceki
     *   kuralın '}' işaretinden sonra başlıyor; araya giren yorum da parçaya
     *   dahil oluyor:
     *       "/* --- SORU PANELİ --- *\/\n.sd{display:grid;…}"
     *   Seçici ham metinden alınınca ".sd" değil "/* --- SORU PANELİ …" oluyor
     *   ve önek eşleşmesi TUTMUYOR. Sonuç: .sd ve .ara-cta'nın TEMEL kuralları
     *   (display:grid / overflow:hidden) çıkarılmadı; .sd-sol, .sd-soru gibi
     *   yorumsuz kardeşleri geldiği için hata "CSS geldi" gibi göründü.
     *   Belirtisi: soru paneli tek sütun kaldı, .ac3 süslemeleri kırpılmayıp
     *   sayfayı yatay taşırdı.
     *   Eşleşme yorumsuz metinden yapılır; ÇIKTIYA yorum DAHİL edilir —
     *   o yorumlar ölçülmüş tuzakları anlatıyor, kaybolmamalı. */
    const temiz = t.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    if (!temiz || temiz.indexOf('{') < 0) continue;
    const secici = temiz.slice(0, temiz.indexOf('{')).trim();
    const istendi =
      ONEK.some((o) => secici.split(',').some((s) => s.trim().startsWith(o))) ||
      (/^@(keyframes|property)/.test(secici) && ANAHTAR.test(secici)) ||
      (/^@media/.test(secici) && ONEK.some((o) => t.includes(o)));
    if (istendi) tut.push(t);
  }
  return tut;
}
const bilesenCss = cssSuz(refCss);
rapor.push(`bileşen CSS kuralı çıkarıldı: ${bilesenCss.length}`);

/* Bloga özgü eklemeler: gövde içinde duracak sahne ve ara CTA ölçüleri */
const BLOG_CSS = `
/* ===== BLOG GÖVDESİ — AKIŞKAN MİZANPAJ (plan/blog-paket-uygula.js) =====

   ⚠ ÖLÇÜLEN KUSUR — "büyük görsel sola yaslı". 1440px ekranda:
       .wrap        1240px  (93 → 1333)
       .yz-govde     760px  (117 → 877)   ← margin:0, ORTALANMAMIŞ
       kapak görsel 1192px  (117 → 1309)  ← metinden 432px GENİŞ
     Sonuç: sağda 456px ölü alan, kapak ile metin sütunu aynı sol kenardan
     başlayıp farklı yerde bitiyor. Göz basamak görüyor.

   ⚠ İKİNCİ KUSUR — görseller sütunun TAMAMINI kaplayan bloktu (760px).
     Metin görselin etrafından akmıyor, her görsel okumayı kesiyordu.

   ÇÖZÜM: okuma sütunu ortalanır ve genişler; görseller KÜÇÜLÜR ve
   dönüşümlü olarak sağa/sola yaslanır, metin etraflarından akar. */

/* 1) Okuma sütunu ORTALANDI ve 720px'de tutuldu.
      ⚠ ÖNCE 1000px DENENDİ, GERİ ALINDI — ölçüldü: 15,4px yazıyla satır
      102 KARAKTER çıktı. Rahat okuma aralığı 55-75 karakter; 100 üstü
      gözün satır başını kaybettiği bölge. 720px → ölçülen 73 karakter. */
.yz-govde{max-width:720px;margin-inline:auto}
/* 2) Kapak artık metinle AYNI kenarlarda biter — basamak kalkar.
      (Önce 1192px'di, metinden 432px genişti.) */
.yz-kapak img,.yz-kapak figcaption{max-width:720px;margin-inline:auto}

/* 3) AKIŞKAN GÖRSEL — dönüşümlü sağ/sol, metin etrafından akar.
      ⚠ GÖRSEL SÜTUNUN İÇİNE SIĞDIRILMIYOR, KENARA TAŞIYOR. 720px sütunun
      içine 340px'lik bir figür koyulsaydı yanında 355px (≈36 karakter)
      kalırdı — sarılan metin o genişlikte kırık kırık okunur. Bunun yerine
      figür 160px dışarı taşıyor: yanındaki metin ≈52 karaktere çıkıyor,
      sayfa da tek eksenli olmaktan kurtuluyor.
      Taşma payı SABİT 160px ve yüzme yalnız >=1180px'te açık; o genişlikte
      .wrap en dar hâlinde 1116px, sütun 720px → her yanda 198px boşluk
      var, 160px taşma her zaman sığıyor. */
.yz-gor{margin:8px 0 22px;clear:none}
/* Yanında yeterli metin olmayan figür yüzmez: tam sütun genişliği. */
.yz-gor.tam{width:100%!important;float:none!important;margin-inline:0!important;clear:both}
.yz-gor figcaption{margin-top:10px;font-size:12.6px;line-height:1.6;color:var(--muted)}
@media(min-width:1180px){
  .yz-gor{width:340px;float:right;margin-left:26px;margin-right:-160px}
  .yz-gor.sol{float:left;margin-left:-160px;margin-right:26px}
}
/* Bölüm başlığı yüzen görselin yanına sıkışmasın; her h2 yeni satırdan. */
.yz-govde h2{clear:both}
/* Tablo, alıntı ve bant yüzen görselin yanında ezilmesin. */
.yz-govde .yz-tablo,.yz-govde .yz-alinti,.yz-govde .ara-cta{clear:both}

/* 4) Sahne kutusu yüzen çerçeve içinde: sabit yükseklik YOK, en-boy oranı
      var. Hero'da 240-330px'e kilitliydi; burada genişliğe göre esner. */
.yz-gor .ciz-kutu{height:auto}
.yz-gor .ciz-cerceve{aspect-ratio:430/292;height:auto}
.yz-gor .ciz-bar span{font-size:8.6px}
.yz-gor .ciz-cip u{font-size:7px}
.yz-gor .ciz-cip b{font-size:10.5px}
/* 5) Döngü videosu da aynı yüzen çerçevede — .akv ızgarası KULLANILMIYOR. */
.yz-gor video,.yz-gor img{display:block;width:100%;height:auto;border-radius:14px;
  border:1px solid rgba(var(--acc-rgb),.3);background:var(--bg-2)}
.yz-gor .cerceveli{position:relative;border-radius:14px;overflow:hidden;
  box-shadow:0 26px 60px -30px rgba(0,0,0,.9)}
.yz-gor .akv-rozet{position:absolute;left:11px;top:10px;z-index:2}

/* 6) 1180px ALTINDA YÜZME YOK — görsel tam sütun genişliğinde, metin
      altından devam eder. Eşik keyfî değil: bu genişliğin altında ya
      figürün dışarı taşıması .wrap boşluğunu aşar ya da sarılan metin
      okunmaz ölçüye (≈36 karakter) düşer. İkisi de kötü; yüzmemesi iyi. */
@media(max-width:1179px){
  .yz-gor,.yz-gor.sol{float:none;width:100%;margin:26px 0}
}
/* ⚠ ARA CTA'YI TAM GENİŞLİĞE TAŞIMA DENENDİ, GERİ ALINDI (ölçüldü).
   İlk sürüm negatif kenar boşluğuyla bandı .wrap dolgusunun dışına
   çekiyordu: margin-inline: calc(-1 * clamp(16px,3vw,32px)). Ama
   .yz-govde 760px'e sınırlı, .wrap ise 1240px — ikisinin kenarı aynı
   yerde değil, band 366px ekranda 411px'e taştı (45px yatay kaydırma).
   width:100vw ile tam genişlik de yapılmadı: 100vw kaydırma çubuğunu
   da sayar, masaüstünde aynı taşmayı geri getirir.
   Karar: band okuma sütununda kalıyor. .ara-cta'nın kendi
   overflow:hidden kuralı 3D süslemeleri zaten kırpıyor.
   (Not: bu yorum CSS şablon dizgesinin İÇİNDE — ters tırnak kullanılamaz,
    dizgeyi erkenden kapatır ve betik sözdizimi hatası verir. Ölçüldü.) */
.yz-govde .ara-cta{border-radius:var(--r-lg)}
/* soru paneli ve bağlantı haritası blog bölümlerinde */
.yz-sd{margin-top:8px}
.yz-hrt{margin-top:8px}
@media(max-width:880px){.sd{grid-template-columns:1fr}.hrt{grid-template-columns:1fr}.hrt-svg{display:none}}
`;

/* ─────────────────────────────────────────────────────────────────
   2) SAHNELER — yazının h2 başlıklarına göre. Bu yazıya özgü.
   ───────────────────────────────────────────────────────────────── */
const SAHNELER = require('./blog-sahne-' + slug + '.js');

/* ─────────────────────────────────────────────────────────────────
   3) DÖNÜŞÜMLER
   ───────────────────────────────────────────────────────────────── */

/* 3a) SSS akordiyonu → .sd dönen soru paneli */
function sssDonustur(html) {
  /* ⚠ İKİ ADIMLI REPLACE FAZLADAN </div> BIRAKIYORDU — ÖLÇÜLDÜ.
   *   İlk sürüm önce <details>'leri .sd ile değiştiriyor, sonra ikinci bir
   *   replace ile <div class="yz-sss"> AÇILIŞINI siliyordu — ama KAPANIŞI
   *   yerinde kalıyordu. etiket-denge.js yakaladı: 74 açılış / 75 kapanış.
   *   Doğrusu: sarmalayıcıyı DENGELİ kapanışıyla birlikte tek parça bulup
   *   tümünü değiştirmek. */
  const bas = html.search(/<div class="[^"]*\byz-sss\b[^"]*"[^>]*>/);
  if (bas < 0) { rapor.push('SSS: blok bulunamadı — DOKUNULMADI'); return html; }
  /* dengeli </div> ara */
  let derinlik = 0, i = bas, son = -1;
  const acRe = /<div\b/g, kapRe = /<\/div>/g;
  acRe.lastIndex = bas; kapRe.lastIndex = bas;
  while (true) {
    acRe.lastIndex = i; kapRe.lastIndex = i;
    const a = acRe.exec(html), k = kapRe.exec(html);
    if (!k) break;
    if (a && a.index < k.index) { derinlik++; i = a.index + 1; }
    else { derinlik--; i = k.index + 1; if (derinlik === 0) { son = k.index + 6; break; } }
  }
  if (son < 0) { rapor.push('SSS: kapanış bulunamadı — DOKUNULMADI'); return html; }
  const tamBlok = html.slice(bas, son);
  const m = [tamBlok, tamBlok];
  const sorular = [...m[1].matchAll(/<details>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)]
    .map((x) => ({ s: x[1].trim(), c: x[2].trim() }));
  if (!sorular.length) { rapor.push('SSS: <details> bulunamadı — DOKUNULMADI'); return html; }

  const sol = sorular.map((q, i) =>
    `        <button type="button" class="sd-soru${i === 0 ? ' acik' : ''}" role="tab" aria-selected="${i === 0}"><i>${String(i + 1).padStart(2, '0')}</i><span>${q.s}</span></button>`).join('\n');
  const sag = sorular.map((q, i) =>
    `        <div class="sd-cevap${i === 0 ? ' acik' : ''}" role="tabpanel"><h3>${q.s}</h3><p>${q.c}</p></div>`).join('\n');

  const yeni = `<div class="sd yz-sd rv d1" data-sd>
      <div class="sd-sol" role="tablist" aria-label="Sorular">
${sol}
      </div>
      <div class="sd-sag">
${sag}
        <div class="sd-alt">
          <div class="sd-cubuk"><i data-sd-cubuk></i></div>
          <a class="sd-wa" href="https://wa.me/905547916545" target="_blank" rel="noopener">Sorunuz mu var? WhatsApp&#8217;tan yazın</a>
        </div>
      </div>
    </div>`;
  rapor.push(`SSS: ${sorular.length} soru → .sd paneli`);
  return html.slice(0, bas) + yeni + html.slice(son);
}

/* 3b) İlgili yazılar ızgarası → .hrt akan bağlantı haritası */
function ilgiliDonustur(html) {
  /* ⚠ SINIF ADI TAM EŞLEŞME ARAMA. İlk sürüm `class="yz-ilgili"` yazıyordu;
   *   gerçek işaretleme `class="yz-ilgili rv"` (canlanma sınıfı ekli) ve blok
   *   hiç bulunamadı. Sınıf listesi içinde ARA. */
  const m = html.match(/(<nav class="[^"]*\byz-ilgili\b[^"]*"[^>]*>)([\s\S]*?)(<\/nav>)/);
  if (!m) { rapor.push('İlgili: blok bulunamadı — DOKUNULMADI'); return html; }
  /* başlık ve not korunuyor — bunlar içerik, kabuk değil */
  const baslik = (m[2].match(/<h2[^>]*>[\s\S]*?<\/h2>/) || [''])[0];
  const not = (m[2].match(/<p class="not">[\s\S]*?<\/p>/) || [''])[0];
  const kartlar = [...m[2].matchAll(/<li><a href="([^"]+)"([^>]*)><span class="kat">([^<]*)<\/span><span class="bas">([^<]*)<\/span><\/a><\/li>/g)]
    .map((x) => ({ href: x[1], stil: x[2], kat: x[3], bas: x[4] }));
  if (!kartlar.length) { rapor.push('İlgili: kart bulunamadı — DOKUNULMADI'); return html; }
  const n = kartlar.length;

  /* akış yolları: merkezden her karta bir eğri */
  const yuk = 70 * n;
  const yollar = kartlar.map((_, i) => {
    const y = (yuk / n) * (i + 0.5);
    return `M0,${yuk / 2} C48,${yuk / 2} 48,${y} 96,${y}`;
  });
  const svg = `<svg class="hrt-svg" viewBox="0 0 96 ${yuk}" preserveAspectRatio="none" aria-hidden="true">
        ${yollar.map((d) => `<path class="hrt-yol" d="${d}"/>`).join('\n        ')}
        ${yollar.map((d, i) => `<path class="hrt-akis${i ? ' g' + (i + 1) : ''}" d="${d}"/>`).join('\n        ')}
      </svg>`;

  const sag = kartlar.map((k) =>
    `          <a class="yk" href="${k.href}"${k.stil}><b>${k.bas}</b><span>${k.kat} kümesinden</span></a>`).join('\n');

  const yeni = `${baslik}
      ${not}
      <div class="hrt yz-hrt rv d1">
        <div class="hrt-ben"><i></i><b>BU YAZI</b><span>okuduğunuz sayfa</span></div>
        ${svg}
        <div class="hrt-sag">
${sag}
        </div>
      </div>`;
  rapor.push(`İlgili: ${n} kart → .hrt akan harita (başlık ve not korundu)`);
  return html.replace(m[0], m[1] + '\n      ' + yeni + '\n    ' + m[3]);
}

/* 3c) Hizmet köprüsü → .ac3 3D akışkan CTA bandı */
function kopruDonustur(html) {
  const m = html.match(/<aside class="yz-kopru"[^>]*>([\s\S]*?)<\/aside>/);
  if (!m) { rapor.push('Köprü: bulunamadı — DOKUNULMADI'); return html; }
  const bas = (m[1].match(/<b>([\s\S]*?)<\/b>/) || [])[1] || '';
  const met = (m[1].match(/<p>([\s\S]*?)<\/p>/) || [])[1] || '';
  const btnler = [...m[1].matchAll(/<a class="btn[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map((x) => ({ href: x[1], metin: x[2].replace(/<[^>]*>/g, '').trim() }));
  const dugmeler = btnler.length ? btnler : [{ href: '../../teklif/', metin: 'Teklif Al' }];

  const yeni = `<aside class="ara-cta">
      <div class="ac3-zemin" aria-hidden="true"></div>
      <div class="ac3-s s1" aria-hidden="true"></div>
      <div class="ac3-s s2" aria-hidden="true"></div>
      <div class="ara-cta-in">
        <p><b>${bas}</b><span>${met.replace(/<[^>]*>/g, '')}</span></p>
        <div class="ara-cta-btn">
${dugmeler.map((d, i) => `          <a class="btn ${i === 0 ? 'btn-p' : 'btn-g'} btn-sm" href="${d.href}">${d.metin}</a>`).join('\n')}
        </div>
      </div>
    </aside>`;
  rapor.push(`Köprü: → .ac3 3D bant (${dugmeler.length} düğme)`);
  return html.replace(m[0], yeni);
}

/* 3d) [KULLANIM DIŞI] Gövde görselini .akv ızgarasına çevirme.
 * Kullanıcı geri bildirimi: "hayır kopyalama … düzgün akışkan bir mizanpaj
 * istiyorum sağ ve sollu … resimleri de ebat olarak küçült."
 * .akv, hizmet sayfasından kopyalanmış iki sütunlu GENİŞ bir ızgaraydı;
 * tam da şikâyet edilen "büyük, sola yaslı blok" davranışını üretiyordu.
 * Yerine yuzenGorseller() geldi: küçük, dönüşümlü sağa/sola yaslanan,
 * metnin etrafından aktığı figürler. Fonksiyon silinmedi ki karar
 * gerekçesi kodda kalsın; ÇAĞRILMIYOR. */
function akvDonustur_KULLANILMIYOR(html) {
  const g = html.match(/\s*<figure class="yz-gorsel">[\s\S]*?<\/figure>/);
  if (!g) { rapor.push('Gövde görseli: bulunamadı — .akv KURULMADI'); return html; }
  const kaynakSrc = (g[0].match(/<img[^>]*src="([^"]+)"/) || [])[1] || '';
  const alt = (g[0].match(/alt="([^"]*)"/) || [])[1] || '';
  const kapsam = (g[0].match(/<figcaption>([\s\S]*?)<\/figcaption>/) || [])[1] || '';

  /* video: yazının modülüne ait döngü videosu; yoksa görsel poster olarak kalır */
  const dal = (html.match(/<body data-dal="([^"]+)"/) || [])[1] || 'web';
  const vid = SAHNELER.video || null;
  const varMi = vid && fs.existsSync(path.join(KOK, vid.dosya));
  if (!varMi) rapor.push(`⚠ .akv videosu YOK (${vid ? vid.dosya : 'tanımsız'}) — görsel poster olarak kullanıldı`);

  const adimlar = SAHNELER.akvAdimlari.map((a, i) => `          <li>
            <span class="akv-no">${String(i + 1).padStart(2, '0')}</span>
            <div><h3>${a.b}</h3><p>${a.p}</p></div>
          </li>`).join('\n');

  const gorsel = varMi
    ? `          <video data-dongu muted loop playsinline preload="metadata" poster="${vid.poster}" aria-label="${alt}">
            <source src="${vid.src}" type="video/mp4">
          </video>`
    : `          <img src="${kaynakSrc}" alt="${alt}" loading="lazy" decoding="async">`;

  const yeni = `
      <figure class="yz-akv">
        <div class="akv">
          <ol class="akv-liste">
${adimlar}
          </ol>
          <div class="akv-video">
            <b class="akv-rozet"><i></i>CANLI DÖNGÜ</b>
${gorsel}
          </div>
        </div>
        <figcaption>${kapsam}</figcaption>
      </figure>`;

  /* eski görseli kaldır, yeniyi ORTAYA koy: h2'lerin ikinci yarısının başına */
  let y = html.replace(g[0], '');
  const h2ler = [...y.matchAll(/<h2[^>]*>/g)].map((m2) => m2.index);
  const sira = Math.max(0, Math.floor(h2ler.length * 0.4));
  const hedef = h2ler[sira];
  if (hedef == null) { rapor.push('⚠ .akv yerleştirilecek h2 yok — sona kondu'); return y; }
  /* ⚠ DERİNLİĞİ DOSYA BAYTIYLA RAPORLAMA. İlk sürüm `hedef / y.length`
   *   diyordu; pay dosyanın tamamı (dev <head> + JSON-LD dahil) olduğu için
   *   "69%" gibi yanıltıcı bir sayı çıkıyordu. Anlamlı ölçü: kaçıncı h2. */
  rapor.push(`.akv: ${SAHNELER.akvAdimlari.length} adım + ${varMi ? 'döngü videosu' : 'görsel'} · ${sira + 1}/${h2ler.length}. h2'nin önüne taşındı (eskiden gövdenin %87'sindeydi)`);
  return y.slice(0, hedef) + yeni + '\n\n      ' + y.slice(hedef);
}

/* 3e) YÜZEN GÖRSELLER — dönüşümlü sağ/sol, metin etraflarından akar
 *
 * ⚠ TARAF, BELGE SIRASINA GÖRE VERİLİR — dizideki sıraya göre değil.
 *   Figürler farklı çapalara ekleniyor; dizi sırası ile sayfadaki sıra
 *   aynı olmak zorunda değil. Önce her figürün çapasının belgedeki KONUMU
 *   bulunuyor, sıralanıyor, taraf ondan sonra atanıyor. Yoksa iki komşu
 *   figür aynı tarafa düşüp mizanpaj tek yana yığılır.
 */
function yuzenGorseller(html) {
  const eski = html.match(/\s*<figure class="yz-gorsel">[\s\S]*?<\/figure>/);
  const eskiSrc = eski ? (eski[0].match(/<img[^>]*src="([^"]+)"/) || [])[1] : '';
  const eskiAlt = eski ? (eski[0].match(/alt="([^"]*)"/) || [])[1] : '';
  let y = eski ? html.replace(eski[0], '') : html;
  if (eski) rapor.push('eski tam genişlik gövde görseli kaldırıldı (%87 derinlikteydi)');

  /* video figürü + sahne figürleri tek listede */
  const vid = SAHNELER.video;
  const videoVar = vid && fs.existsSync(path.join(KOK, vid.dosya));
  if (!videoVar) rapor.push(`⚠ döngü videosu YOK (${vid ? vid.dosya : '—'}) — eski görsel kullanıldı`);

  const figurler = [
    ...SAHNELER.sahneler.map((s) => ({ tur: 'sahne', ...s })),
    ...(SAHNELER.videoCapa ? [{
      tur: 'video', capa: SAHNELER.videoCapa, aciklama: SAHNELER.videoAciklama || '',
      src: videoVar ? vid.src : eskiSrc, poster: videoVar ? vid.poster : '', alt: eskiAlt, videoVar,
    }] : []),
  ];

  /* ⚠ FİGÜR h2'DEN ÖNCE DEĞİL, BÖLÜMÜN İÇİNE KONUR — ölçülmüş kusur.
   *   İlk sürüm figürü çapa h2'nin ÖNÜNE koyuyordu. Ama `.yz-govde h2
   *   {clear:both}` kuralı h2'yi yüzen figürün altına itiyor; figür bir
   *   önceki bölümün sonunda, yanında akacak metin olmadan asılı kalıyordu.
   *   Ölçüm: dört figürün dördünde de "yanındaki satır sayısı 0" —
   *   yani metin hiç sarılmıyordu, mizanpaj hâlâ blok blok akıyordu.
   *   Doğrusu: figürü h2'den SONRA, bölümün ilk paragrafından ÖNCE koymak.
   *   Böylece o bölümün metni figürün yanından akar. */
  /* ⚠ CEVAP KUTUSU FİGÜRÜN YANINA GELMEMELİ — ölçülmüş kusur.
   *   h2'den hemen sonra .yz-cevap (kenarlıklı, dolgulu kutu) geliyor.
   *   Figür h2'nin hemen ardına konunca kutu yüzen figürün yanında kalıyor
   *   ve içindeki metin 34 karaktere düşüyor — 10 satır boyunca ince bir
   *   şerit. Kutu tam genişlik istiyor. Bu yüzden ekleme noktası h2'den
   *   sonra DEĞİL, varsa .yz-cevap kutusundan SONRA. */
  const konumlu = figurler.map((f) => {
    const c = y.indexOf(f.capa);
    if (c < 0) return { ...f, i: -1 };
    let i = c + f.capa.length;
    /* ⚠ SABİT PENCEREYLE ARAMA ÇALIŞMADI — ölçüldü. İlk sürüm kutuyu
     *   `y.slice(i, i+400)` içinde arıyordu; uzun cevap kutularının kapanış
     *   </div>'i 400 karakterin dışında kalınca eşleşme olmuyor ve figür
     *   kutunun ÖNÜNE düşüyordu. DOM sırasıyla doğrulandı: 4 figürün 2'si
     *   yanlış yerdeydi. Pencere kaldırıldı, konumdan itibaren aranıyor. */
    const kutu = y.slice(i).match(/^\s*<div class="yz-cevap">[\s\S]*?<\/div>/);
    if (kutu) i += kutu[0].length;

    /* ⚠ KISA BÖLÜMDE YÜZDÜRME. Figürün yanından akacak metin yoksa yüzen
     *   görsel ince bir şerit üretiyor: son figürün yanında ortalama 35
     *   karakter × 12 satır ölçüldü — okunmaz. Bir sonraki h2'ye kadar
     *   kalan kelime sayılıyor; eşik altındaysa figür TAM GENİŞLİK olur
     *   (yüzmez). Sessizce bırakılmıyor, raporda söyleniyor. */
    const sonrasi = y.slice(i);
    const sonrakiH2 = sonrasi.search(/<h2[\s>]/);
    const bolumMetni = (sonrakiH2 < 0 ? sonrasi : sonrasi.slice(0, sonrakiH2)).replace(/<[^>]+>/g, ' ');
    const kelime = bolumMetni.split(/\s+/).filter(Boolean).length;
    return { ...f, i, kelime };
  });
  const bulunamayan = konumlu.filter((f) => f.i < 0);
  for (const f of bulunamayan) rapor.push(`⚠ çapa bulunamadı, figür ATLANDI: "${f.capa.slice(0, 46)}…"`);
  const sirali = konumlu.filter((f) => f.i >= 0).sort((a, b) => a.i - b.i);

  /* taraf: belge sırasına göre dönüşümlü — ilki sağ.
     Yanında yeterli metin olmayan figür yüzmez, tam genişlik olur; sıradaki
     yüzen figür dönüşümü bozmadan devam eder. */
  const ESIK = 70;  /* kelime — 340px figürün yanında en az ~6 satır demek */
  let sayac = 0; const tamOlanlar = [];
  for (const f of sirali) {
    if (f.kelime < ESIK) { f.taraf = ' tam'; tamOlanlar.push(f.kelime); continue; }
    f.taraf = sayac % 2 === 0 ? '' : ' sol';
    sayac++;
  }
  if (tamOlanlar.length) rapor.push(`⚠ ${tamOlanlar.length} figür TAM GENİŞLİK bırakıldı (bölümde yalnız ${tamOlanlar.join(', ')} kelime var; yüzse metin ince şeride düşerdi)`);

  /* sondan başa ekle ki önceki indeksler kaymasın */
  for (const f of [...sirali].reverse()) {
    const ic = f.tur === 'sahne'
      ? `<div class="ciz-kutu" aria-hidden="true">
          <div class="ciz-cerceve">
            <div class="ciz-bar"><i></i><i></i><i></i><span>${f.bar}</span><b>${f.rozet}</b></div>
            <div class="ciz-svg">
              <svg viewBox="0 0 430 210" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${f.svg}</svg>
            </div>
            <div class="ciz-alt">${f.cipler.map((c) => `<div class="ciz-cip"><u>${c.u}</u><b data-sayac="${c.s}" data-birim="${c.birim}">0${c.birim}</b></div>`).join('')}</div>
          </div>
        </div>`
      : f.videoVar
        ? `<div class="cerceveli">
          <b class="akv-rozet"><i></i>CANLI DÖNGÜ</b>
          <video data-dongu muted loop playsinline preload="metadata" poster="${f.poster}" aria-label="${f.alt}">
            <source src="${f.src}" type="video/mp4">
          </video>
        </div>`
        : `<img src="${f.src}" alt="${f.alt}" loading="lazy" decoding="async">`;

    const blok = `<figure class="yz-gor${f.taraf}">
        ${ic}
        <figcaption>${f.aciklama}</figcaption>
      </figure>
      `;
    y = y.slice(0, f.i) + blok + y.slice(f.i);
  }
  const sag = sirali.filter((f) => !f.taraf).length;
  rapor.push(`yüzen görsel: ${sirali.length} (sağ ${sag} · sol ${sirali.length - sag}) · genişlik %40, eskiden %100`);
  return y;
}

/* 3f) CSS ve JS enjeksiyonu */
function cssEkle(html) {
  if (html.includes('BLOG GÖVDE PAKETİ')) { rapor.push('CSS: zaten var'); return html; }
  return html.replace('</style>', bilesenCss.join('\n') + '\n' + BLOG_CSS + '\n</style>');
}
function jsEkle(html) {
  if (html.includes('data-sd-cubuk') === false) return html;
  if (html.includes('/* soru paneli */')) { rapor.push('JS: zaten var'); return html; }
  const js = `
<script>
"use strict";
/* soru paneli */
/* 6 sn'de bir kendisi döner; kullanıcı dokununca döngü KALICI durur.
   Otomatik dönüş yalnız >=881px: dar ekranda okuma bölünmesin (mobil
   denetim bulgusu). */
(function(){
  var kok = document.querySelector('[data-sd]');
  if (!kok) return;
  var sorular  = [].slice.call(kok.querySelectorAll('.sd-soru'));
  var cevaplar = [].slice.call(kok.querySelectorAll('.sd-cevap'));
  var cubuk = kok.querySelector('[data-sd-cubuk]');
  var AZALT = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var aktif = 0, zaman = null, durdu = false;
  function ciz(n){
    aktif = n;
    sorular.forEach(function(b,i){ b.classList.toggle('acik', i===n); b.setAttribute('aria-selected', i===n?'true':'false'); });
    cevaplar.forEach(function(c,i){ c.classList.toggle('acik', i===n); });
    if (cubuk && !AZALT && !durdu) { cubuk.classList.remove('akiyor'); void cubuk.offsetWidth; cubuk.classList.add('akiyor'); }
  }
  sorular.forEach(function(b,i){
    b.addEventListener('click', function(){
      durdu = true;
      if (zaman) { clearInterval(zaman); zaman = null; }
      if (cubuk) { cubuk.classList.remove('akiyor'); cubuk.style.width = '0'; }
      ciz(i);
    });
  });
  ciz(0);
  if (!AZALT && window.matchMedia('(min-width: 881px)').matches) zaman = setInterval(function(){ if (!durdu) ciz((aktif+1) % sorular.length); }, 6000);
})();
</script>
<script>
"use strict";
/* sahne sayaçları: 9 sn'lik çizim döngüsüyle senkron */
(function(){
  var cipler = document.querySelectorAll('.ciz-cip [data-sayac]');
  if (!cipler.length) return;
  function bicim(hedef, deger){ return (hedef % 1 === 0 ? Math.round(deger) : deger.toFixed(1).replace('.', ',')); }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cipler.forEach(function(b){ b.textContent = bicim(parseFloat(b.dataset.sayac), parseFloat(b.dataset.sayac)) + b.dataset.birim; });
    return;
  }
  var DONGU = 9000, basla = performance.now();
  function kare(t){
    var oran = Math.min(1, Math.max(0, (((t - basla) % DONGU) - 1200) / 3800));
    cipler.forEach(function(b){
      var hedef = parseFloat(b.dataset.sayac);
      b.textContent = bicim(hedef, hedef * oran) + b.dataset.birim;
    });
    requestAnimationFrame(kare);
  }
  requestAnimationFrame(kare);
})();
</script>
`;
  rapor.push('JS: soru paneli + sahne sayaçları eklendi');
  return html.replace('</body>', js + '</body>');
}

/* ── sırayla uygula ── */
h = sssDonustur(h);
h = ilgiliDonustur(h);
h = kopruDonustur(h);
h = yuzenGorseller(h);
h = cssEkle(h);
h = jsEkle(h);

/* ── yaz ── */
/* ── İKİZ SAYFA: ÖNİZLEME OLARAK İŞARETLE ──
 * ⚠ İki denetim bulgusu ikizin KOPYA olmasından çıktı (ölçüldü):
 *   · dil değiştirici, orijinalin İngilizce karşılığını gösteriyordu →
 *     gidiş-dönüş kapanmıyor (A→B→A değil, A→B→C)
 *   · aynı İngilizce sayfaya iki Türkçe sayfa işaret ediyordu
 * İkisi de gerçek: ikiz kalıcı bir sayfa DEĞİL, karar verilince silinecek.
 * Bu yüzden dil düğmesi kaldırılıyor ve sayfaya görünür önizleme bandı
 * konuyor — canlı sayfayla karıştırılmasın. */
function onizlemeIsaretle(html) {
  let y = html.replace(/<div class="dil"[^>]*>[\s\S]*?<\/div>\s*/g, '');
  const bant = `<div style="position:relative;z-index:120;background:#FFB020;color:#1a1200;
  font:600 13px/1.45 var(--sans);padding:9px 16px;text-align:center;letter-spacing:-.01em">
  ÖNİZLEME — yeni gövde paketi denemesi. Canlı sayfa: <a href="../e-ticaret-seo/" style="color:#1a1200;text-decoration:underline">/blog/${slug}/</a>. Karar verilince bu kopya silinecek.
</div>`;
  return y.replace(/(<body[^>]*>)/, '$1\n' + bant);
}

let hedefDizin = null;
if (IKIZ) {
  h = onizlemeIsaretle(h);
  hedefDizin = path.join(S, 'blog', slug + '-yeni');
  fs.mkdirSync(hedefDizin, { recursive: true });
  /* görsel klasörünü de kopyala — göreli yollar ./gorsel/… biçiminde */
  const gsrc = path.join(kaynakDizin, 'gorsel');
  if (fs.existsSync(gsrc)) {
    const gdst = path.join(hedefDizin, 'gorsel');
    fs.mkdirSync(gdst, { recursive: true });
    for (const f of fs.readdirSync(gsrc)) fs.copyFileSync(path.join(gsrc, f), path.join(gdst, f));
  }
  fs.writeFileSync(path.join(hedefDizin, 'index.html'), h);
} else if (UYGULA) {
  fs.writeFileSync(kaynak, h);
}

console.log(`\n  ${IKIZ ? 'İKİZ YAZILDI' : UYGULA ? 'UYGULANDI' : 'KURU KOŞU (yazılmadı)'}\n`);
for (const r of rapor) console.log('  · ' + r);
if (hedefDizin) console.log(`\n  → /blog/${slug}-yeni/`);
console.log(`  boyut: ${(h.length / 1024).toFixed(1)} KB\n`);
