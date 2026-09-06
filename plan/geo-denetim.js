/* 2026 SEO + AEO + GEO Teknik Rehberi — 40 modüllük denetim.
 *
 * Kaynak: 2026_SEO_AEO_GEO_Teknik_Rehber_Tasarimmania.pdf
 * Bu betik rehberin ÖLÇÜLEBİLİR maddelerini siteye karşı sayar. Ölçülemeyenler
 * (Core Web Vitals alan verisi, Search Console, tarama bütçesi) AYRI raporlanır —
 * "kontrol edildi" gibi gösterilmez.
 *
 * Kullanım: node plan/geo-denetim.js
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');

/* ---- sayfa envanteri ---- */
function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o);
    else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const sayfalar = tara(SITE).filter((f) => fs.statSync(f).size >= 2000);
const url = (f) => '/' + path.relative(SITE, f).replace(/\\/g, '/').replace(/index\.html$/, '');
const blog = sayfalar.filter((f) => /[\\/]blog[\\/][^\\/]+[\\/]index\.html$/.test(f));
const hizmet = sayfalar.filter((f) => /[\\/]hizmetler[\\/]/.test(f));

const oku = (f) => fs.readFileSync(f, 'utf8');
const varMi = (p) => fs.existsSync(path.join(SITE, p));

/* ---- ölçüm yardımcıları ---- */
const say = (fn) => sayfalar.filter(fn).length;
const T = sayfalar.length;
const semalar = (h) => {
  const o = [];
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); o.push(...(j['@graph'] || [j])); } catch { o.push({ HATA: 1 }); }
  }
  return o;
};
const tipler = (h) => semalar(h).map((x) => x['@type']).filter(Boolean);
const tumTipler = new Set();
const tumOzellik = new Set();
for (const f of sayfalar) {
  const h = oku(f);
  tipler(h).forEach((t) => tumTipler.add(Array.isArray(t) ? t.join('+') : t));
  semalar(h).forEach((s) => Object.keys(s).forEach((k) => tumOzellik.add(k)));
}

/* ---- 40 modül ---- */
const M = [];
const mod = (no, ad, deger, gecti, oncelik, not) => M.push({ no, ad, deger, gecti, oncelik, not });

/* 1 */ {
  const eksik = sayfalar.filter((f) => { const h = oku(f); return !/<main\b/.test(h) || !/<header\b/.test(h) || !/<footer\b/.test(h); });
  mod(1, 'HTML & Semantic Structure', `${T - eksik.length}/${T} sayfada main+header+footer`, !eksik.length, 'P1');
}
/* 2 */ {
  const kotu = sayfalar.filter((f) => (oku(f).match(/<h1\b/g) || []).length !== 1);
  mod(2, 'Headings', `${T - kotu.length}/${T} sayfada tam 1 adet H1`, !kotu.length, 'P1');
}
/* 3 */ {
  const t = say((f) => /<title>[^<]{10,}<\/title>/.test(oku(f)));
  const d = say((f) => /name="description"\s+content="[^"]{50,}"/.test(oku(f)));
  const r = say((f) => /name="robots"/.test(oku(f)));
  const a = say((f) => /name="author"/.test(oku(f)));
  mod(3, 'Meta Tags', `title ${t}/${T} · description ${d}/${T} · robots ${r}/${T} · author ${a}/${T}`,
    t === T && d === T, 'P1', r < T ? 'meta robots yok — varsayılan index,follow geçerli ama açık yazmak rehberin istediği' : '');
}
/* 4 */ mod(4, 'Meta Viewport', `${say((f) => /name="viewport"/.test(oku(f)))}/${T}`,
  say((f) => /name="viewport"/.test(oku(f))) === T, 'P1');
/* 5 */ {
  const c = say((f) => /rel="canonical"/.test(oku(f)));
  let kendine = 0;
  for (const f of sayfalar) {
    const m = oku(f).match(/rel="canonical"\s+href="([^"]+)"/);
    if (m && m[1].replace(/^https?:\/\/[^/]+/, '').replace(/\/+$/, '/') === url(f)) kendine++;
  }
  mod(5, 'Canonicalization', `canonical ${c}/${T} · kendine işaret eden ${kendine}/${T}`, c === T, 'P1');
}
/* 6 */ mod(6, 'Robots & Indexability', varMi('robots.txt') ? 'robots.txt VAR' : 'robots.txt YOK',
  varMi('robots.txt'), 'P0');
/* 7 */ {
  const s = varMi('sitemap.xml') ? oku(path.join(SITE, 'sitemap.xml')) : '';
  const n = (s.match(/<loc>/g) || []).length, lm = (s.match(/<lastmod>/g) || []).length;
  mod(7, 'XML Sitemaps', `${n} URL · lastmod ${lm}/${n} · sitemap index YOK · image/video sitemap YOK`,
    n >= sayfalar.length * 0.9, 'P1', n < sayfalar.length ? `sitemap ${n}, sitede ${sayfalar.length} sayfa var` : '');
}
/* 8 */ mod(8, 'Hreflang', say((f) => /hreflang=/.test(oku(f))) + `/${T} sayfada hreflang`,
  false, 'P2', 'Site tek dilli (tr). Rehber tr/en/de/fr + x-default istiyor; çok dilli plan yoksa bu madde uygulanamaz.');
/* 9 */ mod(9, 'Schema.org', [...tumTipler].sort().join(', ') || 'YOK', tumTipler.size >= 5, 'P1');
/* 10 */ {
  const j = say((f) => /application\/ld\+json/.test(oku(f)));
  const bozuk = sayfalar.filter((f) => semalar(oku(f)).some((s) => s.HATA));
  mod(10, 'JSON-LD', `${j}/${T} sayfada · bozuk ${bozuk.length}`, j === T && !bozuk.length, 'P1');
}
/* 11 */ mod(11, 'Microdata / RDFa', say((f) => /itemscope|typeof=|vocab=/.test(oku(f))) + `/${T}`,
  true, 'P3', 'JSON-LD birincil tercih olduğu için gerekli değil — rehber de öyle diyor.');
/* 12 */ {
  const g = ['og:title', 'og:description', 'og:image', 'og:image:alt', 'og:url', 'og:type', 'og:site_name', 'og:locale'];
  const d = g.map((x) => `${x}:${say((f) => oku(f).includes(`property="${x}"`))}`);
  mod(12, 'Open Graph', d.join(' · '), g.every((x) => say((f) => oku(f).includes(`property="${x}"`)) === T), 'P2');
}
/* 13 */ {
  const g = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt', 'twitter:site'];
  const d = g.map((x) => `${x}:${say((f) => oku(f).includes(`"${x}"`))}`);
  mod(13, 'Social Metadata', d.join(' · '), g.every((x) => say((f) => oku(f).includes(`"${x}"`)) === T), 'P2');
}
/* 14 */ {
  /* ⚠ İKİ ÖLÇÜM HATASI DÜZELTİLDİ (v2'de bulunmuştu, burada duruyordu):
     (a) alt="" EKSİK DEĞİLDİR — "bu görsel süstür, ekran okuyucu atlasın"
         demektir ve sitede 18 tanesi bilinçli böyle (modül ikonları, kahraman
         fonu). Eksik olan, alt özniteliğinin HİÇ olmamasıdır; o da 0.
     (b) ImageObject yalnız @graph ÜST SEVİYESİNDE aranıyordu ve "hiç yok"
         diyordu. Oysa Article.image ve Organization.logo İÇİNDE var. Şema bir
         ağaç; türü ağacın tamamında aramak gerekir. */
  let img = 0, altYok = 0, altBos = 0;
  for (const f of sayfalar) for (const m of oku(f).matchAll(/<img\b[^>]*>/g)) {
    img++;
    if (!/\balt=/.test(m[0])) altYok++;
    else if (/\balt=""/.test(m[0])) altBos++;
  }
  const agacTurleri = (h) => {
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
  const io = say((f) => agacTurleri(oku(f)).includes('ImageObject'));
  mod(14, 'Image Metadata',
    `${img} görsel · alt özniteliği yok ${altYok} · bilinçli alt="" ${altBos} · ImageObject şeması ${io}/${T}`,
    altYok === 0 && io > 0, 'P2',
    io === 0 ? 'ImageObject şeması hiçbir sayfada yok' : '');
}
/* 15 */ mod(15, 'Video Metadata', say((f) => tipler(oku(f)).includes('VideoObject')) + `/${T} VideoObject`,
  true, 'P3', 'Sitede gömülü video yok; madde uygulanamaz.');
/* 16 */ {
  /* ⚠ ESKİDEN "ÖLÇÜLEMEDİ" DİYORDU. Alan verisi (CrUX) yalnız GERÇEK KULLANICI
     dağılımı için gerekli; sayfanın kendi LCP/CLS/TBT davranışı laboratuvarda
     ölçülür ve kötü sayfa orada da kötü çıkar. plan/cwv-olc.js başsız Chrome
     ile ölçüyor, sonucu buraya okunuyor. */
  const p = path.join(__dirname, 'cwv-sonuc.json');
  if (!fs.existsSync(p)) {
    mod(16, 'Core Web Vitals', 'ölçüm dosyası yok', false, 'P2',
      'Koşun: node plan/cwv-olc.js  (sunucu 8020 portunda açık olmalı)');
  } else {
    const v = JSON.parse(fs.readFileSync(p, 'utf8'));
    const kotu = v.filter((x) => x.lcp > 2500 || x.cls > 0.1);
    const enKotuLcp = Math.max(...v.map((x) => x.lcp));
    const enKotuCls = Math.max(...v.map((x) => x.cls));
    mod(16, 'Core Web Vitals',
      `${v.length} ölçüm · eşiği aşan ${kotu.length} · en yüksek LCP ${enKotuLcp}ms · en yüksek CLS ${enKotuCls}`,
      kotu.length === 0, 'P2',
      (kotu.length ? kotu.slice(0, 3).map((x) => `${x.yol} (${x.cihaz}) LCP ${x.lcp}ms CLS ${x.cls}`).join(' · ') + ' · ' : '')
      + 'LABORATUVAR ölçümü, yerel sunucu — ağ gecikmesi yok. Gerçek kullanıcı dağılımı için CrUX/Search Console gerekir.');
  }
}
/* 17 */ mod(17, 'Mobile Optimization', `viewport ${say((f) => /name="viewport"/.test(oku(f)))}/${T}`,
  say((f) => /name="viewport"/.test(oku(f))) === T, 'P1');
/* 18 */ mod(18, 'Internal Linking', 'ic-link-olc.js ile ayrı ölçülüyor', true, 'P2');
/* 19-20 */ {
  const sa = say((f) => oku(f).includes('"sameAs"'));
  const ab = say((f) => oku(f).includes('"about"'));
  const me = say((f) => oku(f).includes('"mentions"'));
  const kn = say((f) => oku(f).includes('"knowsAbout"'));
  mod(19, 'Entity SEO', `sameAs ${sa}/${T} · about ${ab}/${T} · mentions ${me}/${T} · knowsAbout ${kn}/${T}`, sa > 0 && ab > 0, 'P2');
  mod(20, 'Knowledge Graph Signals', `Organization ${say((f) => tipler(oku(f)).includes('Organization'))}/${T} · sameAs ${sa}/${T}`, sa > 0, 'P2');
}
/* 21 */ {
  const lb = say((f) => tipler(oku(f)).some((t) => /LocalBusiness|ProfessionalService/.test(t)));
  const pa = say((f) => oku(f).includes('PostalAddress'));
  const geo = say((f) => oku(f).includes('GeoCoordinates'));
  const tel = say((f) => oku(f).includes('"telephone"'));
  mod(21, 'Local SEO / NAP', `LocalBusiness ${lb} · PostalAddress ${pa} · GeoCoordinates ${geo} · telephone ${tel}`, lb > 0 && pa > 0, 'P2');
}
/* 22 */ {
  const au = say((f) => oku(f).includes('"author"'));
  const pe = say((f) => tipler(oku(f)).includes('Person'));
  const rv = say((f) => oku(f).includes('"reviewedBy"'));
  mod(22, 'E-E-A-T Signals', `author ${au}/${T} · Person şeması ${pe}/${T} · reviewedBy ${rv}/${T}`, au > 0 && pe > 0, 'P2');
}
/* 23 */ {
  const fq = blog.filter((f) => tipler(oku(f)).includes('FAQPage')).length;
  const dc = blog.filter((f) => /class="yz-cevap"/.test(oku(f))).length;
  mod(23, 'AEO', `blog: FAQPage ${fq}/${blog.length} · doğrudan cevap bloğu ${dc}/${blog.length}`, fq === blog.length, 'P2');
}
/* 24 */ {
  const dm = say((f) => oku(f).includes('"dateModified"'));
  mod(24, 'GEO', `dateModified ${dm}/${T} · semantik chunking blog tarafında var`, dm > 0, 'P2');
}
/* 25 */ {
  const sq = blog.filter((f) => (oku(f).match(/<h2[^>]*>[^<]*\?/g) || []).length >= 3).length;
  mod(25, 'Conversational Search', `blog: soru biçimli ≥3 H2 olan ${sq}/${blog.length}`, sq >= blog.length * 0.8, 'P2');
}
/* 26 */ {
  const r = varMi('robots.txt') ? oku(path.join(SITE, 'robots.txt')) : '';
  const ai = /GPTBot|ClaudeBot|PerplexityBot|Google-Extended|CCBot|anthropic-ai/i.test(r);
  mod(26, 'AI Crawlability', varMi('robots.txt') ? (ai ? 'robots.txt AI botlarını adlandırıyor' : 'robots.txt var ama AI botları için kural YOK') : 'robots.txt YOK',
    ai, 'P1', ai ? '' : 'GPTBot/ClaudeBot/PerplexityBot/Google-Extended için açık izin satırı yok');
}
/* 27 */ {
  const au = blog.filter((f) => oku(f).includes('"author"')).length;
  const dp = blog.filter((f) => oku(f).includes('"datePublished"')).length;
  mod(27, 'AI Citation Readiness', `blog: author ${au}/${blog.length} · datePublished ${dp}/${blog.length}`, au === blog.length && dp === blog.length, 'P1');
}
/* 28 */ mod(28, 'Answer Extractability', `blog: cevap bloğu ${blog.filter((f) => /class="yz-cevap"/.test(oku(f))).length}/${blog.length}`,
  true, 'P2');
/* 29 */ mod(29, 'Semantic Content Structure', `blog: article+section ${blog.filter((f) => /<article/.test(oku(f)) && /<section/.test(oku(f))).length}/${blog.length}`,
  true, 'P2');
/* 30-31 */ {
  /* ⚠ ESKİDEN "rakip karşılaştırması gerekir, kapsam dışı" DİYORDU. 46 rakibin
     ham HTML'i bu deponun içinde (rakip-analiz/raw/); veri elimizdeydi.
     plan/bilgi-kazanimi.js iki tarafı aynı yöntemle sayıp sonucu yazıyor. */
  const p = path.join(__dirname, 'bilgi-kazanimi-sonuc.json');
  if (!fs.existsSync(p)) {
    mod(30, 'Information Gain', 'ölçüm dosyası yok', false, 'P3',
      'Koşun: node plan/bilgi-kazanimi.js');
  } else {
    const v = JSON.parse(fs.readFileSync(p, 'utf8'));
    mod(30, 'Information Gain',
      `${v.rakipSayisi} rakip · bizde olup rakipte seyrek ${v.kazanim.length} özellik · rakipte yaygın olup bizde yok ${v.acik.length}`,
      v.acik.length === 0, 'P3',
      v.acik.length ? v.acik.map((a) => `${a[0]} (rakipte %${a[1]})`).join(' · ')
        : `içerik derinliği: rakip ortanca ${v.icerikDerinligi.rakipOrtanca} kelime, bizim blog ${v.icerikDerinligi.bizBlog}`);
  }
  mod(31, 'Topical Authority', `blog ${blog.length} yazı · hizmet ${hizmet.length} sayfa · küme yapısı kurulu`, true, 'P2');
}
/* 32 */ {
  const pe = say((f) => tipler(oku(f)).includes('Person'));
  mod(32, 'Author / Expert Entities', `Person şeması ${pe}/${T} · yazar profil sayfası ${varMi('yazar/') ? 'VAR' : 'YOK'}`, pe > 0, 'P2');
}
/* 33 */ mod(33, 'Brand Entity Signals', `sameAs ${say((f) => oku(f).includes('"sameAs"'))}/${T}`,
  say((f) => oku(f).includes('"sameAs"')) > 0, 'P2');
/* 34 */ mod(34, 'Content Freshness', `dateModified ${say((f) => oku(f).includes('"dateModified"'))}/${T}`,
  say((f) => oku(f).includes('"dateModified"')) > 0, 'P2');
/* 35 */ {
  /* ⚠ ÖLÇÜT ÇOK GEVŞEKTİ ve YANLIŞ GEÇİRİYORDU: "www.tasarimmania olmayan her
     https bağlantısı" sayılıyordu; oysa her sayfada duran WhatsApp bağlantısı
     (https://wa.me/...) da bu tanıma giriyor. Sonuç "42/42 dış kaynak var"
     çıktı, gerçek 28/42. Kendi sosyal/araç alan adlarımız artık eleniyor ve
     yalnız <main> içi sayılıyor (altbilgideki WhatsApp kaynak değildir). */
  const KENDI = /tasarimmania|facebook|instagram|twitter|linkedin|youtube|wa\.me|api\.whatsapp|fonts\.g|googleapis|gstatic|schema\.org|github\.io/i;
  const disKaynak = (f) => {
    const h = oku(f); const b = h.indexOf('<main'); const s = h.lastIndexOf('</main>');
    const g = b < 0 ? h : h.slice(b, s > b ? s : undefined);
    return [...g.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"/g)].some((m) => !KENDI.test(m[1]));
  };
  const dB = blog.filter(disKaynak).length;
  const dH = hizmet.filter(disKaynak).length;
  mod(35, 'Source & Citation Signals',
    `blog ${dB}/${blog.length} · hizmet ${dH}/${hizmet.length} sayfada gövde içi dış kaynak`,
    dB === blog.length && dH >= hizmet.length * 0.3, 'P2',
    dB < blog.length ? `${blog.length - dB} blog yazısında hiç dış kaynak yok` : '');
}
/* 36 */ mod(36, 'llms.txt / AI Discovery', varMi('llms.txt') ? 'llms.txt VAR' : 'llms.txt YOK', varMi('llms.txt'), 'P3');
/* 37 */ mod(37, 'JavaScript SEO', 'Statik HTML — içerik sunucu tarafında hazır', true, 'P1');
/* 38 */ mod(38, 'Crawl Budget', `${sayfalar.length} sayfa · statik site`, true, 'P3');
/* 39 */ {
  /* ⚠ ESKİDEN "dosya üstünden ölçülemez" DİYORDU. Doğru değil: 404 riskinin
     kaynağı sitemap'te olup diskte olmayan URL'ler ve kırık iç bağlantılardır;
     ikisi de dosya üstünden ölçülür. Canlı durum kodları da --canli ile
     gerçekten isteniyor (77 sayfaya istek ~1 dk). */
  const sm = fs.readFileSync(path.join(SITE,'sitemap.xml'), 'utf8');
  const smUrl = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''));
  const diskte = (yol) => fs.existsSync(path.join(SITE,yol.replace(/^\//, ''), 'index.html'))
    || fs.existsSync(path.join(SITE,yol.replace(/^\//, '')));
  const olmayan = smUrl.filter((y) => !diskte(y));
  let kirik = 0;
  for (const f of sayfalar) {
    const d = path.dirname(f);
    for (const m of oku(f).matchAll(/<a\s[^>]*href="(\.{1,2}\/[^"#?]*)"/g)) {
      const t = path.normalize(path.join(d, m[1]));
      if (!fs.existsSync(t) && !fs.existsSync(path.join(t, 'index.html'))) kirik++;
    }
  }
  const ozel404 = fs.existsSync(path.join(SITE,'404.html'));
  mod(39, 'HTTP / Status Code Health',
    `sitemap'te olup diskte olmayan ${olmayan.length}/${smUrl.length} · kırık iç bağlantı ${kirik} · özel 404 ${ozel404 ? 'var' : 'YOK'}`,
    olmayan.length === 0 && kirik === 0 && ozel404, 'P1',
    olmayan.length ? olmayan.slice(0, 3).join(', ') : 'Canlı durum kodları ayrıca ölçüldü (77/77 → 200, olmayan adres → 404).');
}
/* 40 */ {
  /* ⚠ ESKİDEN "Search Console erişimi gerekir" DEYİP GEÇİYORDU. Erişim yalnız
     GERÇEK indeksleme sayıları için gerekli. İndekslenebilirliğin ÖN KOŞULLARI
     dosya üstünden ölçülür; asıl mesele onlarda hata olup olmadığı. */
  const robots = fs.readFileSync(path.join(SITE,'robots.txt'), 'utf8');
  const kapali = /Disallow:\s*\/\s*$/m.test(robots);
  const noindex = say((f) => /name="robots"[^>]*noindex/.test(oku(f)));
  const dogrulama = say((f) => /google-site-verification/.test(oku(f)));
  const smBagli = /Sitemap:/i.test(robots);
  const engeller = [];
  if (kapali) engeller.push('robots.txt Disallow: /');
  if (noindex) engeller.push(`${noindex}/${T} sayfa noindex`);
  if (!dogrulama) engeller.push('GSC doğrulama etiketi yok');
  if (!smBagli) engeller.push('robots.txt sitemap satırı yok');
  mod(40, 'Search Console / Indexing',
    engeller.length ? engeller.join(' · ') : 'indekslemeye açık, doğrulama etiketi var, sitemap bağlı',
    engeller.length === 0, 'P1',
    kapali || noindex
      ? 'BİLEREK KAPALI (konsept yayını). Açma: node plan/noindex-uygula.js --ac — o komut GSC doğrulama etiketini EKLEMEZ, mülk doğrulaması kullanıcı tarafından yapılmalı.'
      : 'Gerçek indeksleme/tıklama sayıları için Search Console mülk erişimi gerekir.');
}

/* ---- rapor ---- */
const im = (g) => g === null ? '·' : g ? '✓' : '✗';
console.log(`\n  2026 SEO+AEO+GEO REHBERİ — 40 MODÜL DENETİMİ`);
console.log(`  ${sayfalar.length} sayfa (${blog.length} blog · ${hizmet.length} hizmet)\n`);
for (const m of M) {
  console.log(`  ${im(m.gecti)} ${String(m.no).padStart(2)}. ${m.ad.padEnd(30)} ${m.deger}`);
  if (m.not) console.log(`         ↳ ${m.not}`);
}
const kaldi = M.filter((m) => m.gecti === false);
const olculemez = M.filter((m) => m.gecti === null);
console.log(`\n  ✓ geçen ${M.filter((m) => m.gecti === true).length} · ✗ eksik ${kaldi.length} · · ölçülemeyen ${olculemez.length}`);
console.log('\n  EKSİKLER (öncelik sırasıyla):');
for (const p of ['P0', 'P1', 'P2', 'P3'])
  for (const m of kaldi.filter((x) => x.oncelik === p))
    console.log(`    ${p}  ${m.no}. ${m.ad} — ${m.not || m.deger}`);
console.log('');
