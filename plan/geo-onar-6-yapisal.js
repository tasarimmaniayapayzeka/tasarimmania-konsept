/* GEO onarım — Aşama 6: yapısal HTML etiketleri
 *
 * Rehberin 1. modülü (Semantic HTML) altı ayrı boşluk gösterdi. Hepsi burada,
 * her biri ölçülmüş bir gerekçeyle:
 *
 *   A. <aside> yok 61/77 — eski 27 blog yazısında hizmet köprüsü <div>,
 *      hizmet sayfalarında "ilgili içerik" blokları <section>. İkisi de
 *      tanım gereği yan içerik; <aside> doğru etiket.
 *   B. Ana sayfada içeriğe atlama bağlantısı yok (diğer 76 sayfada var).
 *   C. Ana sayfadaki müşteri sözünde <cite> yok — konuşan kişi işaretlenmemiş.
 *   D. /kvkk/ tek başına duran bir belge; <article> ile sarılmalı.
 *   E. /iletisim/ haritası <figure>+<figcaption> istiyor.
 *   F. /hizmetler/ sayfasındaki 20 "söz → hizmet" çifti aslında bir tanım
 *      listesi; <ul><li><b>/<span> yerine <dl><dt>/<dd>.
 *
 * ⚠ EKLENMEYENLER ve SEBEBİ (denetim kuralı da buna göre daraltıldı):
 *   · <article>: /blog/, /teklif/ ve 4 hizmet hub'ı liste/form sayfası.
 *     Etiketi yalnız sayaç sussun diye koymak yanlış işaretleme olur.
 *   · <figure>: /blog/, /kvkk/, /teklif/ gövdesinde hiç medya yok;
 *     /hizmetler/ videolarının tamamı aria-hidden süs döngüsü.
 *
 * ⚠ CSS TUZAĞI: .mod-liste kuralları "li", "b" ve "span" ETİKETİNE dayanıyor.
 *   Etiket değişince kural eşleşmez ve blok biçimsiz kalır — bu daha önce
 *   altbilgi h5→h3 dönüşümünde bire bir yaşandı. Seçiciler burada genişletiliyor.
 *
 * Kullanım: node plan/geo-onar-6-yapisal.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');

/* Açılış etiketinin kapanışını derinlik sayarak bul. Kaba regex ("ilk </div>")
   iç içe kaplarda yanlış yeri gösterir. */
function kapanis(h, bas, etiket) {
  const re = new RegExp(`<${etiket}\\b[^>]*>|</${etiket}>`, 'gi');
  re.lastIndex = bas;
  let d = 0, m;
  while ((m = re.exec(h))) {
    if (m[0][1] === '/') { d--; if (d === 0) return { bas: m.index, son: re.lastIndex }; }
    else d++;
  }
  return null;
}

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const dosyalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);

const yaz = (f, h) => { if (UYGULA) fs.writeFileSync(f, h, 'utf8'); };
const rapor = [];

/* ═══ A. yan içerik blokları → <aside> ═══ */
let aDiv = 0, aSec = 0;
for (const f of dosyalar) {
  let h = fs.readFileSync(f, 'utf8'), degisti = false;

  /* eski blog: <div class="yz-kopru"> → <aside …> */
  const dIdx = h.indexOf('<div class="yz-kopru">');
  if (dIdx >= 0) {
    const k = kapanis(h, dIdx, 'div');
    if (k) {
      h = h.slice(0, k.bas) + '</aside>' + h.slice(k.son);
      h = h.slice(0, dIdx) + '<aside class="yz-kopru" aria-label="Hizmet köprüsü">'
        + h.slice(dIdx + '<div class="yz-kopru">'.length);
      degisti = true; aDiv++;
    }
  }

  /* hizmet/diğer: "ilgili içerik" <section> → <aside> */
  for (const baslik of ['Bu konuyla bağlantılı sayfalar', 'Bu konuda yazdıklarımız']) {
    const bi = h.indexOf(baslik);
    if (bi < 0) continue;
    const si = h.lastIndexOf('<section', bi);
    if (si < 0) continue;
    /* ⚠ İKİNCİ KOŞUDA ZARAR VERMESİN: blok zaten <aside>'a çevrildiyse
       lastIndexOf('<section') artık BAŞKA bir bölümü gösterir ve yanlış
       bölüm dönüştürülür. Başlığa en yakın açılış <aside> ise atla. */
    if (h.lastIndexOf('<aside', bi) > si) continue;
    const k = kapanis(h, si, 'section');
    if (!k) continue;
    const acilis = h.slice(si, h.indexOf('>', si) + 1);
    const etiketAdi = baslik === 'Bu konuda yazdıklarımız' ? 'Konuyla ilgili yazılar' : 'İlgili hizmetler';
    h = h.slice(0, k.bas) + '</aside>' + h.slice(k.son);
    h = h.slice(0, si) + acilis.replace(/^<section/, '<aside').replace(/>$/, ` aria-label="${etiketAdi}">`)
      + h.slice(si + acilis.length);
    degisti = true; aSec++;
  }

  if (degisti) yaz(f, h);
}
rapor.push(`  A. <aside>  ·  eski blog köprüsü ${aDiv}  ·  ilgili-içerik bloğu ${aSec}`);

/* ═══ B. ana sayfaya atlama bağlantısı ═══ */
{
  const f = path.join(S, 'index.html');
  let h = fs.readFileSync(f, 'utf8');
  if (/class="skip"/.test(h)) rapor.push('  B. atlama bağlantısı  ·  zaten var, atlandı');
  else if (!/<main id="top"/.test(h)) rapor.push('  B. atlama bağlantısı  ·  ✗ <main id="top"> bulunamadı');
  else {
    h = h.replace('<body>', '<body>\n<a class="skip" href="#top">İçeriğe geç</a>');
    yaz(f, h); rapor.push('  B. atlama bağlantısı  ·  ana sayfaya eklendi (#top)');
  }
}

/* ═══ C. müşteri sözlerine <cite> ═══ */
{
  const f = path.join(S, 'index.html');
  let h = fs.readFileSync(f, 'utf8');
  const once = h;
  /* <figcaption class="qp"> içindeki <b>Ad Soyad</b> → konuşanın adı
     ⚠ ÖLÇÜLEN HATA: desen önce `[\s\S]*?<b>` biçimindeydi ve </figcaption> ile
     SINIRLI DEĞİLDİ. Üç müşteri sözü işaretlendikten sonra ikinci koşuda
     son figcaption'dan atlayıp iletişim bölümündeki <b>Telefon</b> etiketini
     yakaladı — "Telefon" bir konuşan değil. Artık eşleşme figcaption'ın
     içinde kalıyor. */
  h = h.replace(/<figcaption class="qp">[\s\S]*?<\/figcaption>/g,
    (blok) => blok.replace(/<b>([^<]+)<\/b>/, (t, ad) => `<b><cite>${ad}</cite></b>`));
  const n = (h.match(/<cite>/g) || []).length;
  if (h !== once) {
    /* <cite> tarayıcıda eğik yazılır; tasarımda eğik yok */
    if (!/cite\{font-style:inherit\}/.test(h)) {
      h = h.replace('</style>', '  cite{font-style:inherit}\n  </style>');
    }
    yaz(f, h); rapor.push(`  C. <cite>  ·  ${n} müşteri sözü işaretlendi`);
  } else rapor.push('  C. <cite>  ·  değişiklik yok');
}

/* ═══ D. /kvkk/ gövdesi → <article> ═══ */
{
  const f = path.join(S, 'kvkk/index.html');
  let h = fs.readFileSync(f, 'utf8');
  if (/<article\b/.test(h)) rapor.push('  D. /kvkk/ <article>  ·  zaten var');
  else {
    const m = h.match(/<main\b[^>]*>/);
    if (!m) rapor.push('  D. /kvkk/ <article>  ·  ✗ <main> yok');
    else {
      h = h.replace(m[0], m[0] + '\n<article>')
        .replace('</main>', '</article>\n</main>');
      yaz(f, h); rapor.push('  D. /kvkk/ <article>  ·  gövde sarıldı');
    }
  }
}

/* ═══ E. /iletisim/ haritası → <figure> ═══ */
{
  const f = path.join(S, 'iletisim/index.html');
  let h = fs.readFileSync(f, 'utf8');
  const m = h.match(/<iframe\b[^>]*maps\/embed[^>]*>[\s\S]*?<\/iframe>/);
  if (!m) rapor.push('  E. /iletisim/ <figure>  ·  ✗ harita bulunamadı');
  else if (/<figure\b/.test(h)) rapor.push('  E. /iletisim/ <figure>  ·  zaten var');
  else {
    h = h.replace(m[0], `<figure class="hrt-fig">\n${m[0]}\n`
      + '<figcaption>Zeytinlik Mah. Pancar Sk. No:19-11, Bakırköy / İstanbul — '
      + 'ofisin harita üzerindeki konumu.</figcaption>\n</figure>');
    if (!/\.hrt-fig\{/.test(h)) h = h.replace('</style>',
      '  .hrt-fig{margin:0}\n'
      + '  .hrt-fig figcaption{margin-top:9px;font-size:12.4px;color:var(--muted);line-height:1.5}\n  </style>');
    yaz(f, h); rapor.push('  E. /iletisim/ <figure>  ·  harita + açıklama sarıldı');
  }
}

/* ═══ F. /hizmetler/ .mod-liste → <dl> ═══ */
{
  const f = path.join(S, 'hizmetler/index.html');
  let h = fs.readFileSync(f, 'utf8');
  if (/<dl\b/.test(h)) rapor.push('  F. <dl> tanım listesi  ·  zaten var');
  else {
    let cift = 0;
    h = h.replace(/<ul class="mod-liste">([\s\S]*?)<\/ul>/g, (t, ic) => {
      const yeni = ic.replace(/<li([^>]*)><b>([\s\S]*?)<\/b><span>([\s\S]*?)<\/span><\/li>/g,
        (x, oz, terim, tanim) => { cift++; return `<div${oz}><dt>${terim}</dt><dd>${tanim}</dd></div>`; });
      return `<dl class="mod-liste">${yeni}</dl>`;
    });
    /* CSS: etiket seçicileri dt/dd/div'i de kapsasın + dd varsayılan girintisi sıfırlansın */
    h = h.replace('.mod-liste li{', '.mod-liste li,.mod-liste>div{')
      .replace('.mod-liste li::before{', '.mod-liste li::before,.mod-liste>div::before{')
      .replace('.mod-liste b{', '.mod-liste b,.mod-liste dt{')
      .replace('.mod-liste span{', '.mod-liste span,.mod-liste dd{');
    if (!/\.mod-liste dd\{margin/.test(h)) h = h.replace('.mod-liste b,.mod-liste dt{',
      '.mod-liste dd{margin:0}\n  .mod-liste b,.mod-liste dt{');
    yaz(f, h); rapor.push(`  F. <dl> tanım listesi  ·  ${cift} terim/tanım çifti dönüştürüldü`);
  }
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'}\n`);
rapor.forEach((r) => console.log(r));
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
