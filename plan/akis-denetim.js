/* AKIŞ İNFOGRAFİKLERİNİN YAPISAL DENETİMİ — 23 sayfa.
 * Dosya düzeyinde bakar; render ölçümü tarayıcıda ayrıca yapılır. */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const HIZ = path.join(KOK, 'site/hizmetler');

const liste = [];
(function tara(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return tara(p);
    if (e.name !== 'index.html') return;
    if (fs.readFileSync(p, 'utf8').includes('class="akis-izgara"')) liste.push(p);
  });
})(HIZ);

let sorun = 0;
const imzalar = {};
console.log('sayfa'.padEnd(44) + 'kutu ok  svg font  para yer');

liste.sort().forEach((p) => {
  const h = fs.readFileSync(p, 'utf8');
  const ad = path.relative(HIZ, p).split(path.sep).slice(0, -1).join('/');

  const serit = (h.match(/\bserit\b/g) || []).length;
  const kutu = (h.match(/class="akis-kutu"/g) || []).length;
  const ok = (h.match(/class="akis-ok"/g) || []).length;
  const vb = (h.match(/viewBox="0 0 380 400"/g) || []).length;

  const fig = (h.match(/<figure class="akis[\s\S]*?<\/figure>/) || [''])[0];
  const fsz = [...fig.matchAll(/<text[^>]*font-size="([\d.]+)"/g)].map((m) => +m[1]);
  const mn = fsz.length ? Math.min(...fsz) : 0;
  /* para izi: tutar + birim. % ARAMA — SVG filtre öznitelikleri yanlış alarm verir. */
  const para = fig.match(/\d[\d.,]*\s*(?:bin\s*)?(?:TL\b|₺|TRY|USD|EUR)/g) || [];

  const yer = h.indexOf('<div class="dtay">') < h.indexOf('<figure class="akis')
    && h.indexOf('<figure class="akis') < h.indexOf('<div class="dtay-fiyat');

  const mq = h.match(/@media\(max-width:\d+px\)\{[^{}]*\.akis-izgara\{grid-template-columns:1fr[\s\S]*?\n\}/);
  imzalar[mq ? mq[0].replace(/\s+/g, ' ') : 'YOK'] = (imzalar[mq ? mq[0].replace(/\s+/g, ' ') : 'YOK'] || 0) + 1;

  const temiz = serit === 0 && kutu === 3 && ok === 2 && vb === 3 && mn >= 13 && !para.length && yer;
  if (!temiz) sorun++;

  console.log(ad.padEnd(44) + String(kutu).padEnd(5) + String(ok).padEnd(4)
    + String(vb).padEnd(5) + String(mn).padEnd(6)
    + (para.length ? '✗' : '✓').padEnd(5) + (yer ? '✓' : '✗') + (temiz ? '' : '   ← SAPMA'));
  if (serit) console.log('        ✗ .serit kalıntısı: ' + serit);
  if (para.length) console.log('        ✗ para izi: ' + para.join(' | '));
});

console.log('');
console.log('sayfa: ' + liste.length + '   sapan: ' + sorun);
console.log('kırılım çeşidi: ' + Object.keys(imzalar).length);
Object.entries(imzalar).forEach(([k, n]) => console.log('  ' + n + ' sayfa: ' + k.slice(0, 96)));
console.log('');
console.log(sorun === 0 && Object.keys(imzalar).length === 1
  ? '✓ ' + liste.length + ' sayfa tek desende, yapısal olarak temiz'
  : '✗ sapma var');
