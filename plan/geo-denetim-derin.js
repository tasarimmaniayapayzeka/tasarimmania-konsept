/* 2026 SEO+AEO+GEO Rehberi — DERİN denetim (v2)
 *
 * NEDEN v2: ilk denetim (geo-denetim.js) 40 modülün çoğunu TEK bir zayıf
 * ölçütle geçirdi. Örnekler:
 *   · Modül 1 yalnız main+header+footer sayıyordu; rehber aside, figure,
 *     blockquote/cite, dl, table da istiyor.
 *   · Modül 2 yalnız "H1 sayısı 1 mi" bakıyordu; atlanmış başlık seviyesi yok.
 *   · Modül 18 hiç ölçülmeden "ayrı ölçülüyor" diye geçti.
 *   · AEO/GEO modülleri YALNIZ blogda ölçüldü; 29 hizmet sayfası hiç bakılmadı.
 * Bu betik alt maddeleri tek tek sayar ve sayfa TÜRÜNE göre ayırır.
 *
 * Kullanım: node plan/geo-denetim-derin.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const hepsi = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const oku = (f) => fs.readFileSync(f, 'utf8');
const tur = (f) => /[/\\]blog[/\\][^/\\]+[/\\]index\.html$/.test(f) ? 'blog'
  : /[/\\]hizmetler[/\\]/.test(f) ? 'hizmet' : 'diğer';
const G = { blog: [], hizmet: [], diğer: [] };
for (const f of hepsi) G[tur(f)].push(f);

const bulgu = [];
const B = (oncelik, modul, baslik, olcum, ornek) => bulgu.push({ oncelik, modul, baslik, olcum, ornek });
const grup = (l) => { const g = {}; for (const f of l) (g[tur(f)] ??= []).push(u(f)); return g; };
const ozet = (l) => Object.entries(grup(l)).map(([k, v]) => `${v.length} ${k}`).join(' · ');
const ilk = (l, n = 3) => l.slice(0, n).map(u).join(', ') + (l.length > n ? ' …' : '');

/* ═══ 1. SEMANTİK HTML — alt maddeler ═══ */
/* ⚠ KAPSAM DARALTILDI — gerekçe ölçüme dayanıyor, sayaç susturmaya değil.
   <article> "kendi başına anlamlı, taşınabilir içerik" demek. Blog yazısı ve
   hizmet ayrıntı sayfası öyledir; /blog/ ve hizmet hub'ları LİSTE, /teklif/
   ise FORM sayfası. Oralara <article> koymak yanlış işaretleme olur, eksik
   işaretlemeden daha kötüdür. Bu yüzden kural yalnız belge sayfalarına bakar. */
const belgeSayfasi = (f) => /\/blog\/[^/]+\/$/.test(u(f))
  || (u(f).startsWith('/hizmetler/') && u(f).split('/').filter(Boolean).length >= 3)
  || u(f) === '/kvkk/';
for (const [etiket, ad, kume] of [['nav', '<nav>', hepsi], ['article', '<article>', hepsi.filter(belgeSayfasi)],
  ['section', '<section>', hepsi], ['aside', '<aside>', hepsi]]) {
  const yok = kume.filter((f) => !new RegExp(`<${etiket}\\b`).test(oku(f)));
  if (yok.length) B('P2', 1, `${ad} etiketi yok`, `${yok.length}/${kume.length} sayfa`, ozet(yok));
}
{
  /* <figure> ancak SARILACAK bir şey varsa aranır: gövdede süs olmayan
     (aria-hidden taşımayan) bir görsel/video/gömülü içerik. Logo ve döngüsel
     fon videosu bu tanıma girmez. */
  const govdeMedyasi = (f) => {
    const h = oku(f); const b = h.indexOf('<main'); const s = h.indexOf('<footer');
    const g = b < 0 ? h : h.slice(b, s > b ? s : undefined);
    return [...g.matchAll(/<(img|video|iframe)\b[^>]*>/g)].some((m) => !/aria-hidden/.test(m[0]));
  };
  const medyali = hepsi.filter(govdeMedyasi);
  const yok = medyali.filter((f) => !/<figure\b/.test(oku(f)));
  if (yok.length) B('P3', 1, '<figure>/<figcaption> yok', `${yok.length}/${medyali.length} (gövdesinde medya olan sayfa)`, ozet(yok));
  const bq = hepsi.filter((f) => /<blockquote/.test(oku(f)) && !/<cite/.test(oku(f)));
  if (bq.length) B('P3', 1, '<blockquote> var ama <cite> yok', `${bq.length} sayfa`, ilk(bq));
  const dl = hepsi.filter((f) => /<dl\b/.test(oku(f)));
  if (!dl.length) B('P3', 1, 'Definition list (<dl>) hiç kullanılmamış', '0/' + hepsi.length,
    'rehber "Definition Blocks" istiyor — AEO tanım bloğu için uygun etiket');
}

/* ═══ 2. BAŞLIK HİYERARŞİSİ — atlanan seviye ═══ */
{
  const bozuk = [];
  for (const f of hepsi) {
    const h = oku(f);
    const sira = [...h.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]);
    let onceki = 0, hata = false;
    for (const s of sira) { if (onceki && s > onceki + 1) hata = true; onceki = s; }
    if (hata) bozuk.push(f);
  }
  if (bozuk.length) B('P2', 2, 'Atlanmış başlık seviyesi (örn. H2 yokken H3)', `${bozuk.length}/${hepsi.length}`, ozet(bozuk));
  const azH2 = G.hizmet.filter((f) => (oku(f).match(/<h2\b/g) || []).length < 3);
  if (azH2.length) B('P2', 2, 'Hizmet sayfasında 3’ten az H2', `${azH2.length}/${G.hizmet.length}`, ilk(azH2));
}

/* ═══ 3. META — rehberin saydığı alanlar ═══ */
for (const [ad, re, onc] of [
  ['meta charset', /charset=/i, 'P1'],
  ['html lang', /<html[^>]+lang="/i, 'P1'],
  ['meta theme-color', /name="theme-color"/i, 'P3'],
  ['meta author', /name="author"/i, 'P2'],
  ['max-snippet / max-image-preview', /max-(snippet|image-preview)/i, 'P2'],
  ['referrer politikası', /name="referrer"/i, 'P3'],
]) {
  const yok = hepsi.filter((f) => !re.test(oku(f)));
  if (yok.length) B(onc, 3, `${ad} yok`, `${yok.length}/${hepsi.length}`, ozet(yok));
}
{ /* title/description uzunluk ve tekrar */
  const t = new Map(), d = new Map();
  const uzunT = [], kisaD = [], uzunD = [];
  for (const f of hepsi) {
    const h = oku(f);
    const tt = (h.match(/<title>([^<]*)<\/title>/) || [, ''])[1];
    const dd = (h.match(/name="description"\s+content="([^"]*)"/) || [, ''])[1];
    (t.get(tt) || t.set(tt, []).get(tt)).push(f);
    (d.get(dd) || d.set(dd, []).get(dd)).push(f);
    if (tt.length > 60) uzunT.push(f);
    if (dd.length < 120) kisaD.push(f);
    if (dd.length > 165) uzunD.push(f);
  }
  const tekT = [...t.entries()].filter(([, v]) => v.length > 1);
  const tekD = [...d.entries()].filter(([, v]) => v.length > 1);
  if (tekT.length) B('P1', 3, 'AYNI title birden çok sayfada', `${tekT.length} tekrar`, tekT.map(([k, v]) => `"${k.slice(0, 40)}" ×${v.length}`).join(' · '));
  if (tekD.length) B('P1', 3, 'AYNI description birden çok sayfada', `${tekD.length} tekrar`, tekD.map(([, v]) => ilk(v, 2)).join(' | '));
  if (uzunT.length) B('P3', 3, 'title 60 karakterden uzun (SERP’te kesilir)', `${uzunT.length}/${hepsi.length}`, ilk(uzunT));
  if (uzunD.length) B('P3', 3, 'description 165 karakterden uzun', `${uzunD.length}/${hepsi.length}`, ilk(uzunD));
  if (kisaD.length) B('P3', 3, 'description 120 karakterden kısa', `${kisaD.length}/${hepsi.length}`, ilk(kisaD));
}

/* ═══ 5. CANONICAL tutarlılığı ═══ */
{
  const gorece = hepsi.filter((f) => { const m = oku(f).match(/rel="canonical"\s+href="([^"]*)"/); return m && !/^https?:\/\//.test(m[1]); });
  if (gorece.length) B('P1', 5, 'Göreli canonical (mutlak URL olmalı)', `${gorece.length}/${hepsi.length}`, ilk(gorece));
  const egikSiz = hepsi.filter((f) => { const m = oku(f).match(/rel="canonical"\s+href="([^"]*)"/); return m && !/\/$/.test(m[1]) && !/\.\w+$/.test(m[1]); });
  if (egikSiz.length) B('P2', 5, 'Canonical sonunda eğik çizgi yok (trailing slash tutarsız)', `${egikSiz.length}/${hepsi.length}`, ilk(egikSiz));
}

/* ═══ 7. SITEMAP ↔ SAYFA kümesi ═══ */
{
  const sm = fs.existsSync(path.join(S, 'sitemap.xml')) ? oku(path.join(S, 'sitemap.xml')) : '';
  const smUrl = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '')));
  const sayfaUrl = new Set(hepsi.map(u));
  const smYok = [...sayfaUrl].filter((x) => !smUrl.has(x));
  const sayfaYok = [...smUrl].filter((x) => !sayfaUrl.has(x));
  if (smYok.length) B('P1', 7, 'Sayfa var ama SITEMAP’te yok', `${smYok.length} sayfa`, smYok.slice(0, 5).join(', '));
  if (sayfaYok.length) B('P1', 7, 'Sitemap’te var ama SAYFA yok (404 riski)', `${sayfaYok.length} URL`, sayfaYok.slice(0, 5).join(', '));
  if (!/changefreq/.test(sm)) B('P3', 7, 'sitemap’te changefreq yok', '', '');
  B('P3', 7, 'Görsel sitemap yok', `${hepsi.reduce((a, f) => a + (oku(f).match(/<img/g) || []).length, 0)} görsel var`,
    'rehber "Image Sitemap" maddesini ayrı sayıyor');
}

/* ═══ 9-10. ŞEMA kapsamı — rehberin saydığı türler ═══ */
{
  /* ⚠ İLK SÜRÜM YANLIŞ ÖLÇÜYORDU: yalnız @graph ÜST SEVİYESİNE bakıyordu.
     Sonuç: "ImageObject hiç yok" dedi, oysa Article.image ve Organization.logo
     içinde VARDI. Şema bir ağaç; türü ve özelliği ağacın tamamında aramak gerekir. */
  const semaTur = (h) => {
    const o = [];
    const gez = (n) => {
      if (Array.isArray(n)) return n.forEach(gez);
      if (!n || typeof n !== 'object') return;
      if (n['@type']) o.push(...[n['@type']].flat());
      Object.values(n).forEach(gez);
    };
    for (const m of h.matchAll(/application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { gez(JSON.parse(m[1])); } catch { }
    }
    return o;
  };
  for (const [t, onc, aciklama] of [
    ['WebSite', 'P2', 'site geneli arama/entity kökü'],
    ['WebPage', 'P2', 'her sayfanın kendi tanımı'],
    ['ItemList', 'P3', 'liste sayfaları (blog dizini, hizmet dizini)'],
    ['Person', 'P2', 'yazar/uzman entity'],
    ['ImageObject', 'P2', 'görsel entity'],
    ['Offer', 'P3', 'hizmet teklif bilgisi'],
    ['OfferCatalog', 'P3', 'hizmet kataloğu'],
  ]) {
    const n = hepsi.filter((f) => semaTur(oku(f)).includes(t)).length;
    if (!n) B(onc, 9, `Şema türü hiç yok: ${t}`, '0/' + hepsi.length, aciklama);
  }
  /* ⚠ /hizmetler/ MUAF: tek bir hizmeti değil beş modülün KATALOĞUNU sunuyor.
     Oraya Service düğümü koymak "bu sayfa şu hizmettir" demek olurdu — yanlış.
     Katalog karşılığı ItemList olarak eklendi ve ayrıca ölçülüyor. */
  const hizmetDetay = G.hizmet.filter((f) => u(f) !== '/hizmetler/');
  const hizSema = hizmetDetay.filter((f) => semaTur(oku(f)).includes('Service'));
  if (hizSema.length < hizmetDetay.length) B('P2', 9, 'Hizmet sayfasında Service şeması yok', `${hizmetDetay.length - hizSema.length}/${hizmetDetay.length}`, ilk(hizmetDetay.filter((f) => !semaTur(oku(f)).includes('Service'))));
  for (const [p, onc] of [['areaServed', 'P2'], ['provider', 'P2'], ['mainEntityOfPage', 'P3'], ['subjectOf', 'P3'], ['knowsAbout', 'P2']]) {
    const n = hepsi.filter((f) => oku(f).includes(`"${p}"`)).length;
    if (!n) B(onc, 9, `Şema özelliği hiç yok: ${p}`, '0/' + hepsi.length, 'rehberin entity ilişkileri listesinde');
  }
  /* ⚠ ANA SAYFA MUAF: kırıntı gezinme "kökten buraya" yolunu gösterir;
     kökün kendisinde tek öğelik bir yol anlamsızdır. */
  const kirintiliGerek = hepsi.filter((f) => u(f) !== '/');
  const bcYok = kirintiliGerek.filter((f) => !semaTur(oku(f)).includes('BreadcrumbList'));
  if (bcYok.length) B('P2', 9, 'BreadcrumbList şeması yok', `${bcYok.length}/${kirintiliGerek.length}`, ozet(bcYok));
}

/* ═══ 14. GÖRSEL — CLS ve format ═══ */
{
  let img = 0, boyutsuz = 0, tembelsiz = 0;
  const boyutsuzSayfa = new Set();
  for (const f of hepsi) for (const m of oku(f).matchAll(/<img\b[^>]*>/g)) {
    img++;
    if (!/\bwidth="/.test(m[0]) || !/\bheight="/.test(m[0])) { boyutsuz++; boyutsuzSayfa.add(f); }
    if (!/loading="lazy"/.test(m[0]) && !/fetchpriority="high"/.test(m[0])) tembelsiz++;
  }
  if (boyutsuz) B('P2', 14, 'img etiketinde width/height yok (CLS riski)', `${boyutsuz}/${img} görsel · ${boyutsuzSayfa.size} sayfa`, ozet([...boyutsuzSayfa]));
  if (tembelsiz) B('P3', 14, 'img’de loading/fetchpriority yok', `${tembelsiz}/${img} görsel`, '');
  const ogGorece = hepsi.filter((f) => { const m = oku(f).match(/property="og:image"\s+content="([^"]*)"/); return m && !/^https?:\/\//.test(m[1]); });
  if (ogGorece.length) B('P1', 14, 'og:image göreli yol (mutlak URL şart)', `${ogGorece.length}/${hepsi.length}`, ilk(ogGorece));
}

/* ═══ 18. İÇ LİNK — öksüz sayfa, kırık link, çapa tekrarı ═══ */
{
  const gelen = new Map(hepsi.map((f) => [u(f), 0]));
  /* ⚠ ÖLÇÜM HATASI DÜZELTİLDİ: eski sürüm HER <header> etiketini site menüsü
     sayıyordu. Oysa blog yazılarının <main> içinde kendi <header class="phd">
     bloğu var ve "Blog" linki oradan veriliyor. Sonuç: 42 gerçek iç link
     elendi ve /blog/ "öksüz" diye raporlandı. Artık yalnız <main> DIŞINDAKİ
     header/footer menü sayılıyor. */
  const menuBolge = (h) => {
    const anaBas = h.indexOf('<main'); const anaSon = h.indexOf('</main>');
    const icerde = (i) => anaBas >= 0 && i > anaBas && i < anaSon;
    const b = [];
    for (const m of h.matchAll(/<nav\b([^>]*)>[\s\S]*?<\/nav>/gi))
      if (!/yz-ilgili|ilgili|breadcrumb/i.test(m[1]) && !icerde(m.index)) b.push([m.index, m.index + m[0].length]);
    for (const m of h.matchAll(/<(footer|header)\b[^>]*>[\s\S]*?<\/\1>/gi))
      if (!icerde(m.index)) b.push([m.index, m.index + m[0].length]);
    for (const m of h.matchAll(/<div[^>]*class="[^"]*mobmenu[^"]*"[^>]*>[\s\S]*?<\/div>/gi))
      b.push([m.index, m.index + m[0].length]);
    return b;
  };
  let kirik = 0; const kirikOrnek = [];
  for (const f of hepsi) {
    const h = oku(f), bl = menuBolge(h), dizin = path.dirname(f);
    /* ⚠ İKİNCİ ÖLÇÜM HATASI: desen yalnız "../" ile başlayan bağları yakalıyordu.
       Ana sayfa ve /blog/ dizini "./hakkimizda/" biçimini kullanıyor; o bağların
       tamamı sayıma hiç girmedi. Artık "./" ve "../" birlikte okunuyor. */
    for (const m of h.matchAll(/<a\s[^>]*href="(\.{1,2}\/[^"#?]*)"/g)) {
      const hedef = path.normalize(path.join(dizin, m[1]));
      if (!fs.existsSync(hedef) && !fs.existsSync(path.join(hedef, 'index.html'))) { kirik++; if (kirikOrnek.length < 4) kirikOrnek.push(u(f) + ' → ' + m[1]); }
      if (bl.some(([a, b]) => m.index >= a && m.index < b)) continue;
      const url2 = '/' + path.relative(S, fs.existsSync(path.join(hedef, 'index.html')) ? path.join(hedef, 'index.html') : hedef).split(path.sep).join('/').replace(/index\.html$/, '');
      if (gelen.has(url2)) gelen.set(url2, gelen.get(url2) + 1);
    }
  }
  if (kirik) B('P0', 18, 'KIRIK iç link', `${kirik} adet`, kirikOrnek.join(' · '));
  const oksuz = [...gelen.entries()].filter(([, n]) => n === 0).map(([k]) => k);
  if (oksuz.length) B('P1', 18, 'ÖKSÜZ sayfa (menü dışında hiç iç link almıyor)', `${oksuz.length}/${hepsi.length}`, oksuz.slice(0, 6).join(', '));
}

/* ═══ 23/24/28. AEO-GEO — HİZMET sayfaları (ilk denetimde hiç bakılmadı) ═══ */
{
  const soruH2 = G.hizmet.filter((f) => (oku(f).match(/<h2[^>]*>[^<]*\?/g) || []).length >= 1);
  B('P2', 23, 'Hizmet sayfasında soru biçimli H2', `${soruH2.length}/${G.hizmet.length} sayfada en az 1 tane`,
    soruH2.length < G.hizmet.length * 0.5 ? 'rehberin AEO modeli hizmet sayfalarında da soru başlığı istiyor' : '');
  const faq = G.hizmet.filter((f) => /FAQPage/.test(oku(f)));
  if (faq.length < G.hizmet.length) B('P2', 23, 'Hizmet sayfasında FAQPage şeması yok', `${G.hizmet.length - faq.length}/${G.hizmet.length}`, ilk(G.hizmet.filter((f) => !/FAQPage/.test(oku(f)))));
  const tarih = G.hizmet.filter((f) => /"dateModified"/.test(oku(f)));
  if (tarih.length < G.hizmet.length) B('P2', 34, 'Hizmet sayfasında dateModified yok', `${G.hizmet.length - tarih.length}/${G.hizmet.length}`, ilk(G.hizmet.filter((f) => !/"dateModified"/.test(oku(f)))));
  const dis = G.hizmet.filter((f) => /<a[^>]+href="https?:\/\/(?!www\.tasarimmania)/.test(oku(f)));
  if (dis.length < G.hizmet.length * 0.3) B('P3', 35, 'Hizmet sayfasında dış kaynak referansı az', `${dis.length}/${G.hizmet.length}`, 'GEO "Source Attribution" maddesi');
}

/* ═══ Diğer teknik ═══ */
{
  if (!fs.existsSync(path.join(S, '404.html'))) B('P2', 39, 'Özel 404 sayfası yok', 'site/404.html yok', 'GitHub Pages varsayılan 404 gösterir');
  const noopener = [];
  for (const f of hepsi) for (const m of oku(f).matchAll(/<a[^>]+target="_blank"[^>]*>/g)) if (!/rel="[^"]*noopener/.test(m[0])) { noopener.push(f); break; }
  if (noopener.length) B('P3', 1, 'target="_blank" var ama rel="noopener" yok', `${noopener.length} sayfa`, ilk(noopener));
  /* ⚠ İLK SÜRÜM YANLIŞ: yalnız SAYFADAKİ İLK "#" bağlantısına bakıyordu, o da
     atlama bağlantısı olmayabiliyordu. Doğrusu: sınıfı/metni atlama olan HERHANGİ
     bir bağlantı var mı? (Sitede `<a class="skip" href="#ana">İçeriğe geç</a>` var.) */
  const skip = hepsi.filter((f) => !/<a[^>]*class="[^"]*skip|<a[^>]*>\s*(İçeriğe geç|Skip)/i.test(oku(f)));
  if (skip.length) B('P3', 1, 'İçeriğe atlama bağlantısı (skip link) yok', `${skip.length}/${hepsi.length}`, ozet(skip));
}

/* ═══ RAPOR ═══ */
console.log(`\n  DERİN DENETİM — ${hepsi.length} sayfa (${G.blog.length} blog · ${G.hizmet.length} hizmet · ${G.diğer.length} diğer)\n`);
const sira = { P0: 0, P1: 1, P2: 2, P3: 3 };
bulgu.sort((a, b) => sira[a.oncelik] - sira[b.oncelik] || a.modul - b.modul);
let son = '';
for (const b of bulgu) {
  if (b.oncelik !== son) { console.log(`\n  ─── ${b.oncelik} ───`); son = b.oncelik; }
  console.log(`  ${String(b.modul).padStart(2)}. ${b.baslik}`);
  console.log(`      ${b.olcum}${b.ornek ? '  ·  ' + b.ornek : ''}`);
}
const s = {};
for (const b of bulgu) s[b.oncelik] = (s[b.oncelik] || 0) + 1;
console.log(`\n  TOPLAM ${bulgu.length} bulgu · ` + Object.entries(s).map(([k, v]) => `${k}:${v}`).join(' · ') + '\n');
