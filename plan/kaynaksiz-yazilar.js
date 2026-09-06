/* Gövdesinde hiç DIŞ kaynak bağlantısı olmayan yazıları listeler.
 * Modül 35 (Source & Citation Signals) bu listeyi kapatmak için kullanılır.
 * Kullanım: node plan/kaynaksiz-yazilar.js
 */
const fs = require('fs'), path = require('path');
const S = path.join(__dirname, '..', 'site');
const KENDI = /tasarimmania|facebook|instagram|twitter|linkedin|youtube|wa\.me|api\.whatsapp|fonts\.g|googleapis|gstatic|schema\.org|github\.io/i;

function tara(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) tara(p, o); else if (e.name === 'index.html') o.push(p);
  }
  return o;
}
const govde = (h) => {
  const b = h.indexOf('<main'); const s = h.lastIndexOf('</main>');
  return b < 0 ? h : h.slice(b, s > b ? s : undefined);
};
const disVar = (h) => [...govde(h).matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"/g)].some((m) => !KENDI.test(m[1]));

const yazilar = tara(path.join(S, 'blog')).filter((f) => /blog[\\/][^\\/]+[\\/]index\.html$/.test(f));
const yok = [];
for (const f of yazilar) {
  const h = fs.readFileSync(f, 'utf8');
  if (disVar(h)) continue;
  const slug = path.basename(path.dirname(f));
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || ['', ''])[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  yok.push([slug, h1]);
}
console.log(`\n  DIŞ KAYNAĞI OLMAYAN BLOG YAZISI: ${yok.length}/${yazilar.length}\n`);
yok.forEach(([s, h]) => console.log(`  ${s.padEnd(38)} ${h.slice(0, 58)}`));

/* ⚠ Hizmet listesi haritadan — klasör taraması adres düzleşince çöktü
   ("0/1" diyordu, gerçek 29). → plan/sayfa-turu.js */
const { HIZMET_YOLLARI } = require('./sayfa-turu');
const hizmet = [...HIZMET_YOLLARI]
  .map((y) => path.join(S, y.replace(/^\//, ''), 'index.html'))
  .filter(fs.existsSync);
const hYok = hizmet.filter((f) => !disVar(fs.readFileSync(f, 'utf8')));
console.log(`\n  DIŞ KAYNAĞI OLMAYAN HİZMET SAYFASI: ${hYok.length}/${hizmet.length}\n`);
