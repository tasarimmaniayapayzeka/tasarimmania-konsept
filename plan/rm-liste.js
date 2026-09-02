const fs = require('fs');
const path = require('path');
const liste = [];
(function tara(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return tara(p);
    if (e.name !== 'index.html') return;
    const h = fs.readFileSync(p, 'utf8');
    if (/class="akis-izgara"|<figure class="serp/.test(h)) liste.push(p.split(path.sep).join('/'));
  });
})('site/hizmetler');
/* SON SATIR SATIR SONUYLA BİTMELİ: bash'in `while IFS= read -r` döngüsü,
   dosya satır sonuyla bitmezse SON SATIRI SESSİZCE ATLAR. Bu tuzağa düşüldü —
   28 sayfanın 27'si ölçülüp sonuç "27/27 temiz" diye okundu. */
fs.writeFileSync('plan/rm-liste.txt', liste.sort().join('\n') + '\n', 'utf8');
console.log('  akis+serp sayfasi: ' + liste.length);
