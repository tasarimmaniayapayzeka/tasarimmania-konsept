/* Her .akv-video sayfasinin uc adimini (baslik + metin) cikarir.
 * Sahneler bu adimlardan turetilir; uydurma denetiminin dayanagi budur. */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..', '..');

const liste = [];
(function tara(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return tara(p);
    if (e.name !== 'index.html') return;
    if (fs.readFileSync(p, 'utf8').includes('class="akv-video"')) liste.push(p);
  });
})(path.join(KOK, 'site/hizmetler'));

const cikti = liste.sort().map((p) => {
  const h = fs.readFileSync(p, 'utf8');
  const rel = path.relative(path.join(KOK, 'site/hizmetler'), p).split(path.sep).join('/').replace('/index.html', '');
  const dal = (h.match(/data-dal="([^"]+)"/) || [])[1];
  const kendi = /assets\/modul-[a-z]+\/(?!akis\.)/.test(h);
  const adimlar = [...h.matchAll(/<span class="akv-no">(\d+)<\/span>\s*<div><h3>([^<]+)<\/h3><p>([\s\S]*?)<\/p>/g)]
    .map((m) => ({ no: m[1], baslik: m[2], metin: m[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() }));
  return { sayfa: rel, dal, kendiVideosuVar: kendi, adimlar };
});

fs.writeFileSync(path.join(__dirname, 'adimlar.json'), JSON.stringify(cikti, null, 1), 'utf8');
const kalan = cikti.filter((x) => !x.kendiVideosuVar);
console.log('  toplam sayfa      : ' + cikti.length);
console.log('  kendi videosu var : ' + (cikti.length - kalan.length));
console.log('  KALAN             : ' + kalan.length);
console.log('');
const grup = {};
kalan.forEach((x) => { (grup[x.dal] = grup[x.dal] || []).push(x.sayfa); });
Object.entries(grup).forEach(([d, s]) => {
  console.log('  ' + d + ' (' + s.length + ')');
  s.forEach((y) => console.log('      ' + y));
});
const eksik = cikti.filter((x) => x.adimlar.length !== 3);
console.log('');
console.log(eksik.length ? '  ✗ 3 adimi olmayan sayfa: ' + eksik.map((x) => x.sayfa + '=' + x.adimlar.length).join(', ')
  : '  ✓ her sayfada tam 3 adim var');
