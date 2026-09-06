/* GEO onarım — Aşama 3: şema grafiği
 *
 * Sitede şema VAR ama PARÇALI: 93 blok bağımsız duruyor, birbirine @id ile
 * bağlanmıyor. Rehberin istediği "entity zinciri" (Organization → WebSite →
 * WebPage → Article/Service) bu yüzden kurulamıyor. Bu betik:
 *
 *   1. Bir sayfadaki TÜM ld+json bloklarını tek bir @graph'ta birleştirir.
 *   2. Her düğüme kararlı bir @id verir (aynı varlık her sayfada aynı kimlik).
 *   3. Eksik düğümleri ekler: WebSite, WebPage, Organization (referans düğümü).
 *   4. Organization'a knowsAbout, hizmet sayfalarına subjectOf ekler.
 *   5. Liste sayfalarına (/blog/, /hizmetler/) ItemList ekler.
 *
 * ⚠ UYDURMA YOK. subjectOf yalnız sayfada GERÇEKTEN link verilen yazılara
 *   kurulur; knowsAbout listesi gerçek hizmet sayfalarından türetilmiştir;
 *   dateModified yalnız zaten tarihi olan sayfalarda taşınır, üretilmez.
 *
 * ⚠ FAQPage EKLENMEZ. Sayfada görünür SSS yoksa FAQPage işaretlemek Google'ın
 *   yapılandırılmış veri kurallarını çiğner. /hizmetler/ hub'ında SSS bölümü
 *   yok — oraya şema değil, önce içerik gerekiyor.
 *
 * Kullanım: node plan/geo-onar-3-sema.js [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const KANONIK = 'https://www.tasarimmania.com';

/* Organization'ın uzmanlık alanları — beş modülün gerçek hizmet sayfalarından
   türetildi, uydurulmadı. Yeni modül açılırsa buraya eklenir. */
const BILGI_ALANLARI = [
  'Web tasarımı ve yazılım geliştirme',
  'Mobil uygulama geliştirme',
  'Dijital pazarlama ve performans reklamcılığı',
  'Video prodüksiyon ve reklam filmi',
  'Arama motoru optimizasyonu',
  'Grafik tasarım ve kurumsal kimlik',
  'E-ticaret sitesi kurulumu',
  'Sosyal medya yönetimi',
];

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const yol = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const tamUrl = (f) => KANONIK + yol(f);
const coz = (s) => String(s).replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');

/* Sayfanın ana gövdesi — menü/altbilgi dışındaki bölge.
   subjectOf'u menüdeki linklerden türetmek yanlış olurdu: menü her sayfada aynı. */
function govde(h) {
  const b = h.indexOf('<main');
  const s = h.indexOf('<footer');
  return b < 0 ? h : h.slice(b, s > b ? s : undefined);
}

const dosyalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);

/* ---- 1. tur: hangi blog yazısının @id'si ne — subjectOf için gerek ---- */
const blogBaslik = new Map();     /* slug → başlık */
for (const f of dosyalar) {
  const m = /^\/blog\/([^/]+)\/$/.exec(yol(f));
  if (!m) continue;
  const h = fs.readFileSync(f, 'utf8');
  blogBaslik.set(m[1], coz((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || ['', ''])[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()));
}

/* ---- ana tur ---- */
let degisen = 0, atlanan = [];
const rapor = [];

for (const f of dosyalar) {
  const ham = fs.readFileSync(f, 'utf8');
  const u = tamUrl(f);
  const sayfaYolu = yol(f);

  /* --- blokları çıkar --- */
  const bloklar = [...ham.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!bloklar.length) { atlanan.push(sayfaYolu + ' (ld+json yok)'); continue; }

  let dugumler = [];
  let bozuk = false;
  for (const b of bloklar) {
    try {
      const j = JSON.parse(b[1]);
      dugumler.push(...(j['@graph'] || [j]));
    } catch (e) { bozuk = true; }
  }
  if (bozuk) { atlanan.push(sayfaYolu + ' (BOZUK JSON — elle bakılmalı)'); continue; }
  const oncekiSayi = dugumler.length;

  const turu = (n) => [n['@type']].flat();
  const bul = (t) => dugumler.find((n) => turu(n).includes(t));
  const eklendi = [];

  /* --- 2. kararlı @id'ler --- */
  for (const n of dugumler) {
    const t = turu(n);
    if (n['@id']) continue;
    if (t.includes('Organization') || t.includes('ProfessionalService')) n['@id'] = KANONIK + '/#kurulus';
    else if (t.includes('BreadcrumbList')) n['@id'] = u + '#kirintili';
    else if (t.includes('FAQPage')) n['@id'] = u + '#sss';
    else if (t.includes('Service')) n['@id'] = u + '#hizmet';
    else if (t.includes('Article')) n['@id'] = u + '#article';
    else if (t.some((x) => /Page$/.test(x))) n['@id'] = u + '#sayfa';
    delete n['@context'];                      /* @graph'ta tek @context yeter */
  }
  dugumler.forEach((n) => delete n['@context']);

  /* --- 3. Organization: her sayfada bulunsun, knowsAbout alsın --- */
  let org = bul('Organization') || bul('ProfessionalService');
  if (!org) {
    /* Referans düğümü: tam tanım ana sayfada; buradaki düğüm aynı @id ile
       zinciri kapatır. Tekrarlı veri değil, aynı varlığın kimliği. */
    org = { '@type': 'Organization', '@id': KANONIK + '/#kurulus', name: 'TasarımMania', url: KANONIK + '/' };
    dugumler.push(org);
    eklendi.push('Organization');
  }
  if (!org.knowsAbout) { org.knowsAbout = BILGI_ALANLARI; eklendi.push('knowsAbout'); }

  /* --- 4. WebSite --- */
  if (!bul('WebSite')) {
    dugumler.push({
      '@type': 'WebSite', '@id': KANONIK + '/#site', url: KANONIK + '/',
      name: 'TasarımMania', inLanguage: 'tr-TR',
      publisher: { '@id': KANONIK + '/#kurulus' },
    });
    eklendi.push('WebSite');
  }

  /* --- 5. WebPage --- */
  const baslik = coz((ham.match(/<title>([\s\S]*?)<\/title>/) || ['', ''])[1].trim());
  const aciklama = coz((ham.match(/<meta name="description" content="([^"]*)"/) || ['', ''])[1]);
  const ogGorsel = (ham.match(/<meta property="og:image" content="([^"]*)"/) || ['', ''])[1];
  const kirintili = dugumler.find((n) => turu(n).includes('BreadcrumbList'));
  const anaVarlik = bul('Article') || bul('Service');

  /* CollectionPage / AboutPage / ContactPage zaten WebPage'in alt türü.
     Yeni düğüm eklemek yerine var olanı zenginleştir ve türü açıkça belirt —
     alt tür hiyerarşisini çözmeyen tüketiciler de WebPage'i görsün. */
  let sayfa = dugumler.find((n) => turu(n).some((x) => /(^|[a-z])Page$/.test(x) && x !== 'FAQPage'));
  if (sayfa) {
    const t = turu(sayfa);
    if (!t.includes('WebPage')) { sayfa['@type'] = [...t, 'WebPage']; eklendi.push('WebPage(tür)'); }
  } else {
    sayfa = { '@type': 'WebPage', '@id': u + '#sayfa' };
    dugumler.push(sayfa);
    eklendi.push('WebPage');
  }
  sayfa.url = sayfa.url || u;
  if (!sayfa.name && baslik) sayfa.name = baslik;
  if (!sayfa.description && aciklama) sayfa.description = aciklama;
  sayfa.inLanguage = sayfa.inLanguage || 'tr-TR';
  sayfa.isPartOf = sayfa.isPartOf || { '@id': KANONIK + '/#site' };
  if (kirintili && !sayfa.breadcrumb) sayfa.breadcrumb = { '@id': kirintili['@id'] };
  if (ogGorsel && !sayfa.primaryImageOfPage) sayfa.primaryImageOfPage = { '@type': 'ImageObject', url: ogGorsel };
  if (anaVarlik && !sayfa.mainEntity) sayfa.mainEntity = { '@id': anaVarlik['@id'] };
  /* dateModified UYDURULMAZ: yalnız sayfada zaten varsa taşınır. */
  const varOlanTarih = anaVarlik && (anaVarlik.dateModified || anaVarlik.datePublished);
  if (varOlanTarih && !sayfa.dateModified) sayfa.dateModified = varOlanTarih;

  /* --- 6. subjectOf: hizmet → o hizmeti anlatan blog yazıları --- */
  if (anaVarlik && turu(anaVarlik).includes('Service') && !anaVarlik.subjectOf) {
    const g = govde(ham);
    const sluglar = [...new Set([...g.matchAll(/href="[^"]*\/blog\/([a-z0-9-]+)\//g)].map((m) => m[1]))]
      .filter((s) => blogBaslik.has(s));
    if (sluglar.length) {
      anaVarlik.subjectOf = sluglar.map((s) => ({
        '@type': 'Article', '@id': `${KANONIK}/blog/${s}/#article`,
        url: `${KANONIK}/blog/${s}/`, name: blogBaslik.get(s),
      }));
      eklendi.push(`subjectOf(${sluglar.length})`);
    }
  }

  /* --- 7. liste sayfalarına ItemList --- */
  if (!bul('ItemList') && (sayfaYolu === '/blog/' || sayfaYolu === '/hizmetler/')) {
    const g = govde(ham);
    const ogeler = [];
    const gorulen = new Set();
    for (const m of g.matchAll(/<a[^>]+href="\.\/([a-z0-9-]+)\/"[^>]*>([\s\S]*?)<\/a>/g)) {
      if (gorulen.has(m[1])) continue;
      const ad = coz((m[2].match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/) || ['', ''])[1]
        .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
      if (!ad) continue;
      gorulen.add(m[1]);
      ogeler.push({ '@type': 'ListItem', position: ogeler.length + 1, name: ad, url: u + m[1] + '/' });
    }
    /* /hizmetler/ kartlarında başlık <a> dışında; modül linklerinden topla */
    if (!ogeler.length) {
      for (const m of g.matchAll(/<a href="\.\/([a-z0-9-]+)\/">([^<]+?)\s*<svg/g)) {
        if (gorulen.has(m[1])) continue;
        gorulen.add(m[1]);
        ogeler.push({ '@type': 'ListItem', position: ogeler.length + 1,
          name: coz(m[2].replace(/\s*modülünü aç\s*$/, '').trim()), url: u + m[1] + '/' });
      }
    }
    if (ogeler.length) {
      dugumler.push({ '@type': 'ItemList', '@id': u + '#liste',
        name: sayfaYolu === '/blog/' ? 'TasarımMania blog yazıları' : 'TasarımMania hizmet modülleri',
        numberOfItems: ogeler.length, itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: ogeler });
      if (!sayfa.mainEntity) sayfa.mainEntity = { '@id': u + '#liste' };
      eklendi.push(`ItemList(${ogeler.length})`);
    }
  }

  if (!eklendi.length && oncekiSayi === dugumler.length && bloklar.length === 1
      && /"@graph"/.test(bloklar[0][1])) continue;

  /* --- yaz: tek blok, tek @graph --- */
  const yeni = '<script type="application/ld+json">\n'
    + JSON.stringify({ '@context': 'https://schema.org', '@graph': dugumler }, null, 2)
    + '\n</script>';

  let cikti = ham;
  for (let i = bloklar.length - 1; i >= 0; i--) {
    const b = bloklar[i];
    cikti = cikti.slice(0, b.index) + (i === 0 ? yeni : '') + cikti.slice(b.index + b[0].length);
  }
  /* ilk blok tek başına kaldıysa etrafındaki boş satırları toparla */
  cikti = cikti.replace(/\n[ \t]*\n[ \t]*\n+/g, '\n\n');

  degisen++;
  rapor.push(`  ${sayfaYolu.padEnd(50)} ${bloklar.length}→1 blok · ${dugumler.length} düğüm` + (eklendi.length ? ' · +' + eklendi.join(' +') : ''));
  if (UYGULA) fs.writeFileSync(f, cikti, 'utf8');
}

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — ${degisen}/${dosyalar.length} sayfa\n`);
const sinir = process.argv.includes('--tam') ? rapor.length : 14;
rapor.slice(0, sinir).forEach((r) => console.log(r));
if (rapor.length > sinir) console.log(`  … ${rapor.length - sinir} sayfa daha (--tam ile hepsi)`);
if (atlanan.length) { console.log('\n  ATLANDI:'); atlanan.forEach((a) => console.log('    ' + a)); }
console.log(UYGULA ? '' : '\n  Uygulamak için: --uygula\n');
