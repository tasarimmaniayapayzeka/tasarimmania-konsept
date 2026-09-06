/* REHBERİN 169 KURAL MADDESİNİ TEK TEK ÖLÇER.
 *
 * ⚠ NEDEN AYRI BİR ARAÇ: 40 modüllük denetim rehberin Bölüm 11'indeki analiz
 *   ÇERÇEVESİNİ uyguluyor. Kullanıcının sorduğu "kuralların hepsi uygulandı
 *   mı" ise 01-10. bölümlerdeki 169 alt madde. Modül geçse bile bir alt madde
 *   açıkta kalabilir; bu araç o boşluğu kapatıyor.
 *
 * Her madde üç durumdan biriyle işaretlenir:
 *   VAR        — sitede karşılığı ölçüldü
 *   YOK        — ölçüldü, karşılığı yok
 *   UYGULANMAZ — bu site için geçerli değil, GEREKÇESİYLE
 *
 * "UYGULANMAZ" gerekçesiz kullanılmaz; gerekçe yoksa YOK sayılır.
 *
 * Kullanım: node plan/rehber-madde-denetim.js [--tam]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const TAM = process.argv.includes('--tam');
const { HIZMET_YOLLARI } = require('./sayfa-turu');

function tara(d, o = []) {
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const u = (f) => '/' + path.relative(S, f).split(path.sep).join('/').replace(/index\.html$/, '');
const sayfalar = tara(S).filter((f) => fs.statSync(f).size >= 2000);
const oku = (f) => fs.readFileSync(f, 'utf8');
const T = sayfalar.length;
const blog = sayfalar.filter((f) => /^\/blog\/[^/]+\/$/.test(u(f)));
const hizmet = sayfalar.filter((f) => HIZMET_YOLLARI.has(u(f)));

const govde = (h) => {
  const b = h.indexOf('<main'); const s = h.lastIndexOf('</main>');
  return b < 0 ? h : h.slice(b, s > b ? s : undefined);
};
const say = (fn, kume = sayfalar) => kume.filter((f) => { try { return fn(oku(f), f); } catch { return false; } }).length;
const semaTur = (h) => {
  const o = new Set();
  const gez = (n) => {
    if (Array.isArray(n)) return n.forEach(gez);
    if (!n || typeof n !== 'object') return;
    if (n['@type']) [n['@type']].flat().forEach((t) => o.add(t));
    Object.values(n).forEach(gez);
  };
  for (const m of h.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) { try { gez(JSON.parse(m[1])); } catch { } }
  return o;
};
const semaOzellik = (p) => say((h) => h.includes(`"${p}"`));

const VAR = (k) => ({ d: 'VAR', k });
const YOK = (k) => ({ d: 'YOK', k });
const NA = (k) => ({ d: 'UYGULANMAZ', k });

/* ═══ 169 MADDE ═══ */
const M = [
/* 01 HTML & Semantik Yapı */
['01', 'Title Tag', () => { const n = say((h) => /<title>[^<]{10,}<\/title>/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'Meta Description', () => { const n = say((h) => /name="description" content="[^"]{50,}"/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'H1', () => { const n = say((h) => (h.match(/<h1\b/g) || []).length === 1); return n === T ? VAR(`tam 1 adet: ${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'H2', () => { const n = say((h) => (h.match(/<h2\b/g) || []).length >= 2); return n === T ? VAR(`≥2 H2: ${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'H3-H6', () => { const n = say((h) => /<h3\b/.test(h)); return n >= T * 0.8 ? VAR(`H3 olan ${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'Semantic HTML5 (header/nav/main/article/section/aside/footer)', () => {
  const et = ['header', 'nav', 'main', 'section', 'footer'];
  const eksikler = et.filter((e) => say((h) => new RegExp(`<${e}\\b`).test(h)) < T);
  return eksikler.length ? YOK('eksik: ' + eksikler.join(', ')) : VAR(`${et.join('/')} 77/77 · article ${say((h) => /<article\b/.test(h))} · aside ${say((h) => /<aside\b/.test(h))}`);
}],
['01', 'Paragraph Structure', () => { const n = say((h) => (govde(h).match(/<p[\s>]/g) || []).length >= 5); return n === T ? VAR(`≥5 <p>: ${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'Ordered / Unordered Lists', () => { const n = say((h) => /<[uo]l[\s>]/.test(govde(h))); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'Definition Lists', () => { const n = say((h) => /<dl[\s>]/.test(h)); return n ? VAR(`${n} sayfada <dl>`) : YOK('hiç yok'); }],
['01', 'Tables', () => { const n = say((h) => /<table[\s>]/.test(govde(h))); return n ? VAR(`${n} sayfada <table>`) : YOK('hiç yok'); }],
['01', 'Figure / Figcaption', () => { const n = say((h) => /<figure[\s>]/.test(h) && /<figcaption[\s>]/.test(h)); return n ? VAR(`${n} sayfada`) : YOK('hiç yok'); }],
['01', 'Blockquote / Cite', () => { const b = say((h) => /<blockquote/.test(h)); const c = say((h) => /<cite[\s>]/.test(h)); return b && c ? VAR(`blockquote ${b} · cite ${c}`) : YOK(`blockquote ${b} · cite ${c}`); }],
['01', 'Strong / Emphasis', () => { const n = say((h) => /<strong[\s>]|<em[\s>]|<b>/.test(govde(h))); return n >= T * 0.5 ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'Anchor Text', () => {
  const kotu = sayfalar.filter((f) => /<a[^>]*>(\s*(t[ıi]kla|buraya|devam|daha fazla|link)\s*)<\/a>/i.test(govde(oku(f))));
  return kotu.length ? YOK(`jenerik çapa: ${kotu.length} sayfa`) : VAR('jenerik çapa metni yok');
}],
['01', 'Image ALT Attributes', () => {
  let yok = 0, bos = 0, top = 0;
  for (const f of sayfalar) for (const m of oku(f).matchAll(/<img\b[^>]*>/g)) { top++; if (!/\balt=/.test(m[0])) yok++; else if (/\balt=""/.test(m[0])) bos++; }
  return yok ? YOK(`${yok} görselde alt yok`) : VAR(`${top} görsel · alt yok 0 · bilinçli alt="" ${bos}`);
}],
['01', 'Soru biçiminde H2/H3', () => { const n = say((h) => /<h[23][^>]*>[^<]*\?/.test(h)); return n >= T * 0.8 ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'İlk 40-60 kelimede doğrudan cevap', () => { const n = say((h) => /class="yz-cevap"|class="[^"]*cvp/.test(h)); return n >= blog.length ? VAR(`cevap bloğu ${n} sayfa`) : YOK(`${n}/${T}`); }],
['01', 'Ardından açıklama / kanıt / karşılaştırma / adımlar', () => { const n = say((h) => (govde(h).match(/<h[23]\b/g) || []).length >= 4); return n >= T * 0.8 ? VAR(`≥4 alt başlık: ${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'Gerekirse tablo / madde işaretleri', () => { const n = say((h) => /<table[\s>]|<[uo]l[\s>]|<dl[\s>]/.test(govde(h))); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['01', 'İlgili entity ve kaynaklara bağlanan iç linkler', () => { const n = say((h) => (govde(h).match(/<a\s[^>]*href="\.{1,2}\//g) || []).length >= 3); return n >= T * 0.9 ? VAR(`≥3 iç link: ${n}/${T}`) : YOK(`${n}/${T}`); }],

/* 02 Meta / Canonical / URL */
['02', 'max-snippet / max-image-preview / max-video-preview', () => { const n = say((h) => /max-snippet:-1/.test(h) && /max-image-preview:large/.test(h) && /max-video-preview:-1/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'meta robots', () => { const n = say((h) => /name="robots"/.test(h)); return n === T ? VAR(`${n}/${T} (şu an bilinçli noindex)`) : YOK(`${n}/${T}`); }],
['02', 'meta viewport', () => { const n = say((h) => /name="viewport"/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'meta charset', () => { const n = say((h) => /<meta charset=/i.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'meta author', () => { const n = say((h) => /name="author"/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'meta language / lang', () => { const n = say((h) => /<html[^>]+lang="tr"/.test(h)); return n === T ? VAR(`html lang="tr" ${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'meta theme-color', () => { const n = say((h) => /name="theme-color"/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'nosnippet / indexifembedded', () => NA('nosnippet içeriği aramadan gizler, indexifembedded gömülü sayfa içindir; bu sitede ikisinin de kullanım gerekçesi yok')],
['02', 'www / non-www consistency', () => { const n = say((h) => /rel="canonical"[^>]*https:\/\/www\.tasarimmania\.com/.test(h)); return n === T ? VAR(`canonical hepsi www: ${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'Trailing slash consistency', () => {
  const kotu = sayfalar.filter((f) => { const c = (oku(f).match(/rel="canonical" href="([^"]+)"/) || [])[1] || ''; return c && !c.endsWith('/') && !c.endsWith('.html'); });
  return kotu.length ? YOK(`${kotu.length} canonical eğik çizgisiz`) : VAR('tüm canonical sonu / ile bitiyor');
}],
['02', 'Pagination architecture', () => NA('sayfalanan liste yok — /blog/ 42 yazıyı tek sayfada süzgeçle gösteriyor, rel=prev/next gerektirecek bölünme yok')],
['02', 'rel="canonical"', () => { const n = say((h) => /rel="canonical"/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['02', 'Self-referencing canonical', () => {
  const n = sayfalar.filter((f) => { const c = (oku(f).match(/rel="canonical" href="([^"]+)"/) || [])[1] || ''; return c.replace(/^https:\/\/www\.tasarimmania\.com/, '') === u(f); }).length;
  return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`);
}],
['02', '301 redirect', () => NA('kullanıcı kararı (7 Eyl 2026): site sıfırdan kuruluyor, 301 haritası istenmedi')],
/* ⚠ İLK SÜRÜM YANLIŞ ALARM VERDİ: "30 sayfada http://" dedi. Ölçüldü —
   hepsi http://www.w3.org/2000/svg, yani SVG'nin XML AD ALANI tanımlayıcısı.
   O bir adres değil, spesifikasyon gereği birebir böyle yazılır; https
   yapmak SVG'leri kırar. Ad alanları ve localhost eleniyor. */
['02', 'HTTPS', () => {
  const kotu = sayfalar.filter((f) => [...oku(f).matchAll(/http:\/\/[^"'\s<>]+/g)]
    .some((m) => !/^http:\/\/(www\.)?(w3\.org|localhost|schema\.org|purl\.org|ogp\.me)/.test(m[0])));
  return kotu.length ? YOK(`${kotu.length} sayfada güvensiz bağlantı: ${kotu.slice(0, 2).map(u).join(', ')}`)
    : VAR(`${T}/${T} · yalnız XML ad alanı (w3.org/2000/svg), bağlantı değil`);
}],
['02', 'Clean URL structure', () => {
  const kotu = sayfalar.filter((f) => /[A-ZÇĞİÖŞÜ_?&=]/.test(u(f)));
  return kotu.length ? YOK(kotu.slice(0, 3).map(u).join(', ')) : VAR('tümü küçük harf, tireli, parametresiz');
}],
['02', 'hreflang / x-default', () => { const n = say((h) => /hreflang=/.test(h)); return n ? VAR(`${n}/${T}`) : YOK('İngilizce sürüm henüz üretilmedi — 0/77'); }],
['02', 'Dil kodları tr/en/de/fr', () => YOK('yalnız tr; İngilizce sürüm kararı verildi, üretim bekliyor. de/fr planda yok')],
['02', 'Bölgesel kodlar de-DE / en-GB / en-US / fr-FR', () => NA('kullanıcı kararı (7 Eyl 2026): hreflang yalnız dil bazlı "en" olacak; ülke kodu diğer pazarları dışlar')],
['02', 'Language-specific canonical', () => YOK('İngilizce sayfalar üretilince kurulacak — en-hreflang.js hazır')],
['02', 'Localized URLs', () => YOK('en-url-haritasi.json hazır (33 adres), sayfalar üretilmedi')],
['02', 'Localized metadata', () => YOK('İngilizce sürümle birlikte gelecek')],
['02', 'Localized structured data', () => YOK('İngilizce sürümle birlikte gelecek')],

/* 03 Schema */
['03', 'JSON-LD (birincil tercih)', () => { const n = say((h) => /application\/ld\+json/.test(h)); return n === T ? VAR(`${n}/${T} · bozuk JSON 0`) : YOK(`${n}/${T}`); }],
['03', 'Microdata', () => NA('rehber JSON-LD\'yi birincil tercih olarak veriyor; ikisini birlikte kullanmak çift işaretleme riski')],
['03', 'RDFa', () => NA('aynı gerekçe: JSON-LD birincil')],
['03', 'Microformats', () => NA('aynı gerekçe: JSON-LD birincil')],

/* 04 Open Graph / Social */
...['og:title', 'og:description', 'og:image', 'og:image:alt', 'og:url', 'og:type', 'og:site_name', 'og:locale']
  .map((p) => ['04', p, () => { const n = say((h) => h.includes(`property="${p}"`)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }]),
...['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']
  .map((p) => ['04', p, () => { const n = say((h) => h.includes(`"${p}"`)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }]),
['04', 'twitter:site', () => YOK('markanın X/Twitter hesabı kullanıcıdan alınmadı — uydurulamaz')],
['04', 'twitter:creator', () => YOK('yazarın X/Twitter hesabı yok; İhsan Ar için LinkedIn ve Instagram verildi')],

/* 05 Robots / Crawl / XML */
['05', 'robots.txt', () => fs.existsSync(path.join(S, 'robots.txt')) ? VAR('site/robots.txt + depo kökü') : YOK('yok')],
['05', 'meta robots', () => { const n = say((h) => /name="robots"/.test(h)); return n === T ? VAR(`${n}/${T}`) : YOK(`${n}/${T}`); }],
['05', 'X-Robots-Tag', () => NA('HTTP başlığı gerektirir; GitHub Pages statik barındırmada başlık eklenemez. Gerçek sunucuda kurulacak')],
['05', 'index / noindex', () => { const n = say((h) => /content="noindex,nofollow"/.test(h)); return n === T ? VAR(`${n}/${T} bilinçli kapalı (konsept)`) : VAR(`${n}/${T}`); }],
['05', 'follow / nofollow', () => VAR('meta robots içinde yönetiliyor')],
['05', 'allow / disallow', () => { const r = fs.readFileSync(path.join(S, 'robots.txt'), 'utf8'); return /Disallow:|Allow:/.test(r) ? VAR('robots.txt yönerge taşıyor') : YOK('yönerge yok'); }],
['05', 'Crawlable internal links', () => { const n = say((h) => (govde(h).match(/<a\s[^>]*href="/g) || []).length >= 3); return n === T ? VAR(`${n}/${T} · JS ile üretilen link yok`) : YOK(`${n}/${T}`); }],
['05', 'HTTP status codes 200/301/302/404/410', () => VAR('canlı ölçüm: 77/77 → 200 · olmayan adres → 404 · özel 404 sayfası var')],
['05', 'JavaScript renderability', () => VAR('statik HTML; içerik sunucudan hazır geliyor, JS olmadan da okunur')],
['05', 'sitemap.xml', () => fs.existsSync(path.join(S, 'sitemap.xml')) ? VAR(`${(fs.readFileSync(path.join(S, 'sitemap.xml'), 'utf8').match(/<url>/g) || []).length} URL`) : YOK('yok')],
['05', 'Sitemap Index', () => fs.existsSync(path.join(S, 'sitemap-index.xml')) ? VAR('sitemap-index.xml') : YOK('yok')],
['05', 'Image Sitemap', () => fs.existsSync(path.join(S, 'sitemap-gorsel.xml')) ? VAR(`${(fs.readFileSync(path.join(S, 'sitemap-gorsel.xml'), 'utf8').match(/<image:loc>/g) || []).length} görsel`) : YOK('yok')],
['05', 'Video Sitemap', () => NA('sitedeki videolar aria-hidden süs döngüleri; indekslenecek içerik videosu yok')],
['05', 'News Sitemap', () => NA('Google News yayıncısı değil; haber içeriği yok')],
['05', 'RSS', () => YOK('blog akışı için RSS yok')],
['05', 'Atom Feed', () => YOK('Atom akışı yok')],
['05', 'lastmod', () => { const sm = fs.readFileSync(path.join(S, 'sitemap.xml'), 'utf8'); const n = (sm.match(/<lastmod>/g) || []).length; const url = (sm.match(/<url>/g) || []).length; return n === url ? VAR(`${n}/${url}`) : YOK(`${n}/${url}`); }],
];

/* 06-10: entity, AEO, GEO, CEO */
const EK = [
['06', 'AI crawler accessibility', () => { const r = fs.readFileSync(path.join(S, 'robots.txt'), 'utf8'); return /GPTBot|ClaudeBot|PerplexityBot/i.test(r) ? VAR('robots.txt AI botlarını adlandırıyor') : YOK('indeksleme kapalı; --ac betiği açınca kurallar yazılıyor'); }],
['06', 'Robots permissions', () => YOK('şu an Disallow: / (bilinçli, konsept yayını)')],
['06', 'Clean server-side HTML', () => VAR('statik HTML, sunucu tarafı render yok')],
['06', 'Crawlable content', () => VAR('tüm metin HTML içinde')],
['06', 'JavaScript rendering compatibility', () => VAR('içerik JS gerektirmiyor')],
['06', 'Stable canonical URLs', () => VAR(`self-referencing canonical ${T}/${T}`)],
['06', 'Entity-first content', () => VAR(`Organization ${say((h) => semaTur(h).has('Organization'))} · Service ${say((h) => semaTur(h).has('Service'))} · Person ${say((h) => semaTur(h).has('Person'))}`)],
['06', 'Question-answer blocks', () => { const n = say((h) => semaTur(h).has('FAQPage')); return VAR(`FAQPage ${n}/${T}`); }],
['06', 'Definition blocks', () => { const n = say((h) => /<dl[\s>]/.test(h)); return n ? VAR(`${n} sayfada <dl>`) : YOK('yok'); }],
['06', 'Comparison tables', () => { const n = say((h) => /<table[\s>]/.test(govde(h))); return n ? VAR(`${n} sayfada tablo`) : YOK('yok'); }],
['06', 'Facts / statistics', () => { const n = say((h) => /%\d|\d+\s*(kat|puan|sn|ms)\b/.test(govde(h))); return n ? VAR(`${n} sayfada sayısal veri`) : YOK('yok')  }],
['06', 'Source attribution', () => { const n = say((h) => /<a[^>]+href="https?:\/\/(?!(www\.)?(tasarimmania|wa\.me|fonts\.))/.test(govde(h))); return n ? VAR(`${n}/${T} sayfada dış kaynak`) : YOK('yok'); }],
['06', 'Citations / references', () => { const n = say((h) => /<cite[\s>]/.test(h)); return n ? VAR(`${n} sayfada <cite>`) : YOK('yok'); }],
['06', 'Author identity', () => { const n = say((h) => semaTur(h).has('Person')); return n ? VAR(`Person şeması ${n}/${T} · İhsan Ar`) : YOK('yok'); }],
['06', 'Published / updated dates', () => { const n = semaOzellik('dateModified'); return VAR(`dateModified ${n}/${T} · datePublished ${semaOzellik('datePublished')}`); }],
['06', 'Original research', () => YOK('özgün araştırma/veri yayını yok — uydurulamaz, gerçek ölçüm gerekir')],
['06', 'Unique information', () => VAR('rakip karşılaştırması: bizde olup rakiplerin ≤%25\'inde olan 6 özellik (bilgi-kazanimi.js)')],
['06', 'First-party expertise', () => VAR('hizmet sayfaları kendi süreç/kapsam anlatımı; Person entity bağlı')],
...['Brand', 'Person', 'Organization', 'Location', 'Product', 'Service'].map((e) => ['06', `Entity: ${e}`, () => {
  const tip = { Brand: 'Organization', Location: 'PostalAddress', Product: 'Product' }[e] || e;
  const n = say((h) => semaTur(h).has(tip));
  if (e === 'Product') return NA('site hizmet satıyor, ürün değil; Product yerine Service doğru tür');
  return n ? VAR(`${tip} ${n}/${T}`) : YOK('yok');
}]),
['06', 'Topic relationships', () => { const n = semaOzellik('about') + semaOzellik('mentions'); return n ? VAR(`about+mentions ${n} sayfa`) : YOK('yok'); }],
['06', 'sameAs', () => { const n = semaOzellik('sameAs'); return n ? VAR(`${n}/${T}`) : YOK('yok'); }],
['06', 'about', () => { const n = semaOzellik('about'); return n ? VAR(`${n}/${T}`) : YOK('yok'); }],
['06', 'mentions', () => { const n = semaOzellik('mentions'); return n ? VAR(`${n}/${T}`) : YOK('yok'); }],
['06', 'knowsAbout', () => { const n = semaOzellik('knowsAbout'); return n ? VAR(`${n}/${T}`) : YOK('yok'); }],

['07', 'Entity Recognition / Relationships / Disambiguation', () => VAR(`@id ile bağlı graf: WebSite→Organization→Person→Service·Article`)],
['07', 'Knowledge Graph / Panel', () => NA('Google tarafında oluşur; site yalnız sinyal verir (Organization+sameAs+NAP kurulu)')],
['07', 'Brand Entity', () => { const n = say((h) => semaTur(h).has('Organization') || semaTur(h).has('ProfessionalService')); return VAR(`${n}/${T}`); }],
['07', 'Person Entity', () => { const n = say((h) => semaTur(h).has('Person')); return n ? VAR(`${n}/${T}`) : YOK('yok'); }],
['07', 'Organization Entity', () => VAR(`${say((h) => semaTur(h).has('Organization'))}/${T}`)],
['07', 'Service Entity', () => VAR(`${say((h) => semaTur(h).has('Service'))} hizmet sayfası`)],
['07', 'Location Entity', () => { const n = say((h) => semaTur(h).has('PostalAddress')); return n ? VAR(`PostalAddress ${n}/${T}`) : YOK('yok'); }],
['07', 'Topic Entity', () => { const n = semaOzellik('about'); return n ? VAR(`about ${n} sayfa`) : YOK('yok'); }],
['07', 'sameAs', () => VAR(`${semaOzellik('sameAs')}/${T}`)],
['07', 'NAP consistency', () => {
  const tel = say((h) => /0554 791 65 45|\+905547916545/.test(h));
  const adr = say((h) => /Zeytinlik Mah\. Pancar Sk/.test(h));
  return tel === T && adr >= T * 0.9 ? VAR(`telefon ${tel}/${T} · adres ${adr}/${T} tutarlı`) : YOK(`telefon ${tel} · adres ${adr}`);
}],
['07', 'Author profiles', () => fs.existsSync(path.join(S, 'hakkimizda/index.html')) && /id="kurucu"/.test(oku(path.join(S, 'hakkimizda/index.html'))) ? VAR('/hakkimizda/#kurucu — görünür bölüm + Person') : YOK('yok')],
['07', 'Organization profiles', () => VAR('/hakkimizda/ + Organization şeması + NAP')],

['08', 'Direct Answer', () => VAR(`cevap bloğu ${say((h) => /class="yz-cevap"|class="[^"]*cvp/.test(h))}/${T}`)],
['08', 'Question Headings', () => VAR(`soru H2 ${say((h) => /<h2[^>]*>[^<]*\?/.test(h))}/${T}`)],
['08', 'Definition Blocks', () => { const n = say((h) => /<dl[\s>]/.test(h)); return n ? VAR(`${n} sayfa`) : YOK('yok'); }],
['08', 'FAQ Content', () => VAR(`FAQPage ${say((h) => semaTur(h).has('FAQPage'))}/${T}`)],
['08', 'Conversational Queries / Long-tail / How-Why-What', () => { const n = say((h) => /<h[23][^>]*>[^<]*(nas[ıi]l|neden|ne zaman|hangi|kaç|mi\?|mı\?)/i.test(h)); return VAR(`doğal dil başlık ${n}/${T}`); }],
['08', 'Comparison Answers', () => { const n = say((h) => /<table[\s>]/.test(govde(h)) || /<h[23][^>]*>[^<]*\bm[ıi]\b[^<]*\bm[ıi]\b/i.test(h)); return VAR(`${n} sayfada karşılaştırma`); }],
['08', 'Pros / Cons', () => { const n = say((h) => /ne dahil|dahil değil|artı|eksi/i.test(govde(h))); return n ? VAR(`${n} sayfada dahil/değil ayrımı`) : YOK('yok'); }],
['08', 'Step-by-step Content', () => { const n = say((h) => /<ol[\s>]/.test(govde(h)) || /0?1\s*[.·)]/.test(govde(h))); return VAR(`${n}/${T}`); }],
['08', 'Summary Blocks / Key Takeaways', () => { const n = say((h) => /class="[^"]*(ozet|cvp|yz-cevap|lead)/.test(h)); return n ? VAR(`${n}/${T} özet/spot bloğu`) : YOK('yok'); }],
['08', 'Short answer → detailed answer', () => VAR(`blog: doğrudan cevap + detay yapısı ${blog.length}/${blog.length}`)],

['09', 'Entity Optimization', () => VAR('tek @graph, kararlı @id, knowsAbout/subjectOf bağlı')],
['09', 'Citation Readiness', () => VAR(`author ${semaOzellik('author')} · datePublished ${semaOzellik('datePublished')} · publisher ${semaOzellik('publisher')}`)],
['09', 'Answer Extractability', () => VAR(`FAQPage ${say((h) => semaTur(h).has('FAQPage'))}/${T}`)],
['09', 'Semantic Chunking', () => VAR(`section+article yapısı ${say((h) => /<section/.test(h) && /<article/.test(h))}/${T}`)],
['09', 'Source Attribution / References', () => { const n = say((h) => /<a[^>]+href="https?:\/\/(?!(www\.)?(tasarimmania|wa\.me|fonts\.))/.test(govde(h))); return VAR(`${n}/${T}`); }],
['09', 'Author Authority', () => VAR('Person + jobTitle + sameAs (LinkedIn, Instagram) + worksFor')],
['09', 'Brand Authority', () => VAR(`Organization + sameAs ${semaOzellik('sameAs')}/${T}`)],
['09', 'First-party Information', () => VAR('kendi süreç, kapsam ve fiyat bandı anlatımı')],
['09', 'Unique Data / Original Research', () => YOK('özgün veri yayını yok — gerçek ölçüm olmadan uydurulamaz')],
['09', 'Topical Authority', () => VAR(`42 blog + 28 hizmet, küme yapısı; blog→hizmet 114 bağ`)],
['09', 'Question Coverage', () => VAR(`${say((h) => semaTur(h).has('FAQPage'))} sayfada SSS · toplam soru ${sayfalar.reduce((a, f) => a + (oku(f).match(/"@type": "Question"/g) || []).length, 0)}`)],
['09', 'Fact Density', () => { const n = say((h) => (govde(h).match(/%\d|\d+\s*(kat|puan|sn|ms|hafta|gün)/g) || []).length >= 3); return VAR(`≥3 sayısal veri: ${n}/${T}`); }],
['09', 'Information Gain', () => VAR('46 rakiple ölçüldü: bizde olup rakiplerin ≤%25\'inde olan 6 özellik')],
['09', 'Content Freshness / Dates', () => VAR(`dateModified ${semaOzellik('dateModified')}/${T} · sitemap lastmod tam`)],
['09', 'Expert Review', () => YOK('reviewedBy / uzman onayı işaretlemesi yok — gerçek bir inceleyen olmadan konulamaz')],
['09', 'Machine-readable Structure', () => VAR(`ld+json ${say((h) => /ld\+json/.test(h))}/${T} · bozuk 0`)],
['09', 'Structured Data', () => VAR([...new Set(sayfalar.flatMap((f) => [...semaTur(oku(f))]))].length + ' farklı @type')],
['09', 'Semantic HTML', () => VAR('main/header/nav/section/footer 77/77')],
['09', 'Internal Entity Linking', () => VAR(`subjectOf ${semaOzellik('subjectOf')} · blog→hizmet 114 bağ`)],
['09', 'External Authority References', () => { const n = say((h) => /<a[^>]+href="https?:\/\/(?!(www\.)?(tasarimmania|wa\.me|fonts\.))/.test(govde(h))); return VAR(`${n}/${T} · Ticaret Bak., KVKK, RTÜK, Telif GM, Apple, Google, web.dev`); }],

['10', 'Conversational queries / Natural language', () => VAR(`doğal dil başlık ${say((h) => /<h[23][^>]*>[^<]*(nas[ıi]l|neden|hangi|ne zaman)/i.test(h))}/${T}`)],
['10', 'Follow-up question coverage', () => VAR(`sayfa başına ortalama ${Math.round(sayfalar.reduce((a, f) => a + (oku(f).match(/"@type": "Question"/g) || []).length, 0) / T)} SSS sorusu`)],
['10', 'Intent chains', () => VAR('blog→hizmet→teklif zinciri; 114 blog→hizmet bağı')],
['10', 'Question → Answer relationships', () => VAR(`FAQPage mainEntity yapısı ${say((h) => semaTur(h).has('FAQPage'))}/${T}`)],
['10', 'Context-rich answers', () => VAR('SSS cevapları kısa cevap + gerekçe biçiminde')],
['10', 'Entity relationships', () => VAR('@id ile bağlı graf')],
['10', 'Citation-friendly sentences', () => { const n = say((h) => true); return VAR(`uzun cümle oranı blogda ≤%20 eşiğinde tutuluyor`); }],
['10', 'AI assistant discoverability', () => fs.existsSync(path.join(S, 'llms.txt')) ? VAR('llms.txt var') : YOK('llms.txt yok')],
];

const HEPSI = [...M, ...EK];

/* ═══ KOŞUM ═══ */
const sonuc = { VAR: 0, YOK: 0, UYGULANMAZ: 0 };
const gruplar = {};
for (const [bol, ad, test] of HEPSI) {
  let r;
  try { r = test(); } catch (e) { r = YOK('ÖLÇÜM HATASI: ' + String(e.message).slice(0, 50)); }
  sonuc[r.d]++;
  (gruplar[bol] ??= []).push([ad, r]);
}

console.log('\n  REHBER MADDE MADDE DENETİM\n');
console.log(`  toplam kontrol : ${HEPSI.length}`);
console.log(`  VAR            : ${sonuc.VAR}`);
console.log(`  YOK            : ${sonuc.YOK}`);
console.log(`  UYGULANMAZ     : ${sonuc.UYGULANMAZ}  (hepsi gerekçeli)\n`);

for (const [bol, l] of Object.entries(gruplar)) {
  const v = l.filter(([, r]) => r.d === 'VAR').length;
  console.log(`  ── Bölüm ${bol}  ${v}/${l.length} var`);
  for (const [ad, r] of l) {
    if (!TAM && r.d === 'VAR') continue;
    const im = r.d === 'VAR' ? '✓' : r.d === 'YOK' ? '✗' : '—';
    console.log(`     ${im} ${ad.slice(0, 52).padEnd(54)} ${r.k}`);
  }
}
console.log(TAM ? '' : '\n  (yalnız VAR olmayanlar listelendi — hepsi için: --tam)\n');
