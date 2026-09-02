const fs = require('fs');
const path = require('path');
const liste = [];
(function tara(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return tara(p);
    if (e.name !== 'index.html') return;
    const h = fs.readFileSync(p, 'utf8');
    /* yönlendirme kütüğü sayfaları ölçülmez */
    if (/http-equiv="refresh"/i.test(h) && /location\.replace/.test(h)) return;
    liste.push(p.split(path.sep).join('/'));
  });
})('site');
fs.writeFileSync('plan/duzen-liste.txt', liste.sort().join('\n') + '\n', 'utf8');
console.log('  olculecek sayfa: ' + liste.length);
