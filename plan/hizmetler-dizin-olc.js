/* /hizmetler/ sayfası gerçekten TÜM hizmetleri listeliyor mu?
 *
 * Kullanıcı kararı (7 Eyl 2026): sayfa dizin sayfası olarak KALACAK, header
 * ve menüde duracak. Düz yapıda 28 hizmet sayfası var; sayfa eski hub
 * yapısından kalma 5 modül kartı gösteriyor olabilir.
 *
 * Kullanım: node plan/hizmetler-dizin-olc.js
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const { HIZMET_YOLLARI } = require('./sayfa-turu');

const f = path.join(S, 'hizmetler', 'index.html');
const h = fs.readFileSync(f, 'utf8');
const mb = h.indexOf('<main'), ft = h.lastIndexOf('</main>');
const govde = h.slice(mb, ft);

/* gövdede hangi hizmet sayfalarına link var */
const baglanan = new Set();
for (const m of govde.matchAll(/href="([^"]+)"/g)) {
  const ham = m[1].replace(/[#?].*$/, '');
  if (/^(https?:|mailto:|tel:|#)/i.test(ham) || !ham) continue;
  const mutlak = path.resolve(path.dirname(f), ham);
  const rel = path.relative(S, mutlak);
  if (rel.startsWith('..')) continue;
  const y = '/' + rel.split(path.sep).join('/').replace(/\/?$/, '/');
  if (HIZMET_YOLLARI.has(y) && y !== '/hizmetler/') baglanan.add(y);
}

const tumu = [...HIZMET_YOLLARI].filter((y) => y !== '/hizmetler/')
  .filter((y) => fs.existsSync(path.join(S, y.replace(/^\//, ''), 'index.html')))
  .sort();
const eksik = tumu.filter((y) => !baglanan.has(y));

console.log('\n  /hizmetler/ DİZİN SAYFASI — KAPSAM\n');
console.log(`  sitedeki hizmet sayfası : ${tumu.length}`);
console.log(`  bu sayfadan linklenen   : ${baglanan.size}`);
console.log(`  LİSTEDE OLMAYAN         : ${eksik.length}\n`);
eksik.forEach((y) => {
  const p = path.join(S, y.replace(/^\//, ''), 'index.html');
  const hh = fs.readFileSync(p, 'utf8');
  const h1 = (hh.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || ['', ''])[1]
    .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`     ${y.padEnd(30)} ${h1.slice(0, 52)}`);
});

/* menü/header durumu */
console.log('\n  ── menüde mi ──');
const navBolge = h.slice(0, mb);
console.log(`     üst menüde "Hizmetler" bağlantısı: ${/hizmetler\/"/.test(navBolge) || /href="\.\/"/.test(navBolge) ? 'VAR' : 'yok'}`);

/* tüm sayfalarda menüde var mı */
function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const hepsi = tara(S).filter((x) => fs.statSync(x).size >= 2000);
let menude = 0;
for (const x of hepsi) {
  const hh = fs.readFileSync(x, 'utf8');
  const ust = hh.slice(0, hh.indexOf('<main') > 0 ? hh.indexOf('<main') : 4000);
  if (/href="[^"]*hizmetler\/"/.test(ust)) menude++;
}
console.log(`     üst menüde bağlantı taşıyan sayfa: ${menude}/${hepsi.length}`);
console.log('');
