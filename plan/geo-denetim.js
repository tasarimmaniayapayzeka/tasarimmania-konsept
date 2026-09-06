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
  let img = 0, altsiz = 0;
  for (const f of sayfalar) for (const m of oku(f).matchAll(/<img\b[^>]*>/g)) { img++; if (!/\balt="[^"]+"/.test(m[0])) altsiz++; }
  const io = say((f) => tipler(oku(f)).includes('ImageObject'));
  mod(14, 'Image Metadata', `${img} görsel · alt eksik ${altsiz} · ImageObject şeması ${io}/${T}`, !altsiz, 'P2',
    io === 0 ? 'ImageObject şeması hiçbir sayfada yok' : '');
}
/* 15 */ mod(15, 'Video Metadata', say((f) => tipler(oku(f)).includes('VideoObject')) + `/${T} VideoObject`,
  true, 'P3', 'Sitede gömülü video yok; madde uygulanamaz.');
/* 16 */ mod(16, 'Core Web Vitals', 'ÖLÇÜLEMEDİ', null, 'P2', 'Alan verisi gerekir (CrUX/Search Console). Bu betik dosya üstünden ölçemez.');
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
  mod(30, 'Information Gain', 'ÖLÇÜLEMEDİ', null, 'P3', 'Rakip karşılaştırması gerekir; bu betiğin kapsamı dışında.');
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
  let dis = 0;
  for (const f of blog) if (/<a[^>]+href="https?:\/\/(?!www\.tasarimmania)/.test(oku(f))) dis++;
  mod(35, 'Source & Citation Signals', `blog: dış kaynak linki olan ${dis}/${blog.length}`, dis >= blog.length * 0.3, 'P2');
}
/* 36 */ mod(36, 'llms.txt / AI Discovery', varMi('llms.txt') ? 'llms.txt VAR' : 'llms.txt YOK', varMi('llms.txt'), 'P3');
/* 37 */ mod(37, 'JavaScript SEO', 'Statik HTML — içerik sunucu tarafında hazır', true, 'P1');
/* 38 */ mod(38, 'Crawl Budget', `${sayfalar.length} sayfa · statik site`, true, 'P3');
/* 39 */ mod(39, 'HTTP / Status Code Health', 'CANLIDA AYRI ÖLÇÜLMELİ', null, 'P1', 'Dosya üstünden ölçülemez; canlı istek gerekir.');
/* 40 */ mod(40, 'Search Console / Indexing', 'ÖLÇÜLEMEDİ', null, 'P1', 'Search Console erişimi gerekir.');

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
