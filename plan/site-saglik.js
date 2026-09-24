// Site sağlık taraması (yalnız ölçüm, hiçbir dosyayı değiştirmez).
// Tüm site/**/*.html: iç bağlantı/görsel/script/css hedefi var mı, <title>, meta description,
// canonical, h1 sayısı, hreflang karşılığı, img alt/boyut, JSON-LD sözdizimi, sitemap kapsamı.
// Kullanım: node plan/site-saglik.js  → JSON özet stdout'a
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..');
const SITE = path.join(KOK, 'site');
const CANLI = 'https://www.tasarimmania.com';

function tara(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const sayfalar = tara(SITE);
const rel = p => path.relative(SITE, p).replace(/\\/g, '/');
const bulgu = [];
const ekle = (sayfa, tur, detay) => bulgu.push({ sayfa: rel(sayfa), tur, detay });

// canonical → dosya eşlemesi (hreflang kontrolü için)
const canonDosya = new Map();
const veri = new Map();
for (const f of sayfalar) {
  const t = fs.readFileSync(f, 'utf8');
  veri.set(f, t);
  const c = (t.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (c) canonDosya.set(c, f);
}

const hedefVar = (f, url) => {
  let u = url.split('#')[0].split('?')[0];
  if (!u) return true;
  u = decodeURIComponent(u);
  let p = path.resolve(path.dirname(f), u);
  if (u.endsWith('/')) p = path.join(p, 'index.html');
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  return fs.existsSync(p);
};

const idler = f => new Set([...veri.get(f).matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));

for (const f of sayfalar) {
  const t = veri.get(f);
  const r = rel(f);
  const is404 = r.endsWith('404.html');
  const title = (t.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (t.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title) ekle(f, 'title-yok', '');
  else if (title.length > 65) ekle(f, 'title-uzun', `${title.length} kr`);
  if (!desc && !is404) ekle(f, 'description-yok', '');
  else if (desc && (desc.length > 165 || desc.length < 70)) ekle(f, 'description-uzunluk', `${desc.length} kr`);
  if (!is404 && !/<link rel="canonical"/.test(t)) ekle(f, 'canonical-yok', '');
  const h1 = (t.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) ekle(f, 'h1-sayisi', String(h1));
  if (!/<meta name="viewport"/.test(t)) ekle(f, 'viewport-yok', '');
  if (!/<html lang="/.test(t)) ekle(f, 'lang-yok', '');

  // yerel hedefler
  const sayfaIdleri = idler(f);
  for (const m of t.matchAll(/\s(href|src)="([^"]+)"/g)) {
    const url = m[2];
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(url)) continue;
    if (url.startsWith('#')) {
      if (url.length > 1 && !sayfaIdleri.has(url.slice(1))) ekle(f, 'kirik-capa', url);
      continue;
    }
    if (!hedefVar(f, url)) ekle(f, m[1] === 'src' ? 'kirik-kaynak' : 'kirik-baglanti', url);
  }
  for (const m of t.matchAll(/srcset="([^"]+)"/g))
    for (const s of m[1].split(',').map(x => x.trim().split(/\s+/)[0]))
      if (s && !/^https?:/.test(s) && !hedefVar(f, s)) ekle(f, 'kirik-srcset', s);

  // görseller
  for (const m of t.matchAll(/<img\b[^>]*>/g)) {
    const img = m[0];
    if (!/\salt="/.test(img)) ekle(f, 'img-alt-yok', img.slice(0, 80));
    if (!/\swidth="/.test(img) || !/\sheight="/.test(img)) ekle(f, 'img-boyut-yok', (img.match(/src="([^"]+)"/) || [])[1]);
  }

  // JSON-LD
  for (const m of t.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { ekle(f, 'jsonld-hatali', e.message.slice(0, 80)); }
  }

  // hreflang karşılığı karşı sayfada var mı, geri bağlıyor mu
  const canon = (t.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  for (const m of t.matchAll(/<link rel="alternate" hreflang="(tr|en)" href="([^"]+)"/g)) {
    const hedef = canonDosya.get(m[2]);
    if (!hedef) { ekle(f, 'hreflang-hedef-yok', `${m[1]} → ${m[2]}`); continue; }
    if (canon && !veri.get(hedef).includes(`href="${canon}"`)) ekle(f, 'hreflang-geri-donus-yok', m[2]);
  }
}

// sitemap kapsamı
const sm = fs.readFileSync(path.join(SITE, 'sitemap.xml'), 'utf8');
const smUrl = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
for (const [c, f] of canonDosya) if (!smUrl.has(c) && !/noindex/.test(veri.get(f))) ekle(f, 'sitemapte-yok', c);
for (const u of smUrl) if (!canonDosya.has(u)) bulgu.push({ sayfa: 'sitemap.xml', tur: 'sitemap-sahipsiz-url', detay: u });

const ozet = {};
for (const b of bulgu) (ozet[b.tur] = ozet[b.tur] || []).push(b);
console.log(JSON.stringify({
  sayfa: sayfalar.length,
  bulguSayisi: bulgu.length,
  turler: Object.fromEntries(Object.entries(ozet).map(([k, v]) => [k, { adet: v.length, ornek: v.slice(0, 6).map(x => `${x.sayfa} ${x.detay}`) }]))
}, null, 1));
