/* sitemap.xml — lastmod tazeleme
 *
 * GEO onarım turlarında 35 statik sayfanın title'ı, açıklaması, başlıkları ve
 * şeması değişti; sitemap ise hâlâ eski tarihi söylüyordu. Değişmiş sayfaya
 * eski lastmod yazmak arama motoruna "burada yeni bir şey yok" demektir —
 * yapılan işi görünmez kılar.
 *
 * ⚠ BLOG YAZILARINA DOKUNULMAZ. Onların lastmod'u YAYIN tarihi ve şemadaki
 *   datePublished/dateModified ile aynı; bir kısmı ileri tarihli. Bugünün
 *   tarihini yazmak, "yayın tarihinden önce güncellendi" gibi kendi içinde
 *   çelişen bir kayıt üretirdi.
 *
 * Tarih parametre olarak veriliyor: betiğin her koşuşunda "bugün"ü yazması,
 * içerik değişmese bile tarihi tazeleyip yanlış sinyal üretirdi.
 *
 * Kullanım: node plan/sitemap-lastmod.js 2026-09-06 [--uygula]
 */
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..');
const S = path.join(KOK, 'site');
const UYGULA = process.argv.includes('--uygula');
const TARIH = process.argv.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
if (!TARIH) { console.error('  kullanım: node plan/sitemap-lastmod.js YYYY-AA-GG [--uygula]'); process.exit(2); }

const smYol = path.join(S, 'sitemap.xml');
let sm = fs.readFileSync(smYol, 'utf8');

/* hangi URL'ler blog yazısı — onlar hariç tutulacak */
const blogMu = (u) => /\/blog\/[^/]+\/$/.test(u.replace('https://www.tasarimmania.com', ''));

let degisen = 0, atlanan = 0;
sm = sm.replace(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g, (t, loc, eski) => {
  if (blogMu(loc)) { atlanan++; return t; }
  if (eski === TARIH) return t;
  degisen++;
  return t.replace(`<lastmod>${eski}</lastmod>`, `<lastmod>${TARIH}</lastmod>`);
});

/* dosya başındaki "Son güncelleme" notu da tazelensin */
sm = sm.replace(/Son güncelleme: \d{4}-\d{2}-\d{2}/, `Son güncelleme: ${TARIH}`);

console.log(`\n  ${UYGULA ? 'UYGULANDI' : 'KURU KOŞU'} — lastmod ${TARIH}`);
console.log(`  güncellenen: ${degisen}  ·  blog olduğu için atlanan: ${atlanan}\n`);
if (UYGULA) fs.writeFileSync(smYol, sm, 'utf8');
else console.log('  Uygulamak için: --uygula\n');
