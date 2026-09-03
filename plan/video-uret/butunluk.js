/* BÜTÜNLÜK DENETİMİ — sayfa ile video dosyası eşleşiyor mu?
 *
 * NEDEN: iş akışı yarıda kesilirse bir sayfa, henüz üretilmemiş bir mp4'e
 * bağlanmış olabilir. O sayfa canlıda KIRIK görünür. Yarım kalan işten
 * sonra bu betik ilk çalıştırılacak şeydir.
 *
 * Kullanım: node plan/video-uret/butunluk.js
 */
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..', '..');
const HIZ = path.join(KOK, 'site/hizmetler');

const sayfalar = [];
(function tara(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return tara(p);
    if (e.name !== 'index.html') return;
    if (fs.readFileSync(p, 'utf8').includes('class="akv-video"')) sayfalar.push(p);
  });
})(HIZ);

let kirik = 0, kendi = 0, ortak = 0;
const eskiGozlemci = [];

console.log('durum    sayfa'.padEnd(56) + 'video dosyası');
console.log('-'.repeat(96));

sayfalar.sort().forEach((f) => {
  const h = fs.readFileSync(f, 'utf8');
  const m = h.match(/<div class="akv-video">[\s\S]{0,420}?<\/div>/);
  const v = m ? m[0] : '';
  const src = (v.match(/src="((?:\.\.\/)+assets\/[^"]+)"/) || [])[1];
  const pos = (v.match(/poster="((?:\.\.\/)+assets\/[^"]+)"/) || [])[1];
  const coz = (r) => path.resolve(path.dirname(f), r);

  const vVar = src && fs.existsSync(coz(src));
  const pVar = pos && fs.existsSync(coz(pos));
  const dosya = src ? src.split('/').pop() : '?';
  const ad = path.relative(HIZ, f).split(path.sep).join('/').replace('/index.html', '');

  /* akis.mp4 = modül geneli eski dosya; kendi adını taşıyan = yeni */
  const kendiVideosu = dosya !== 'akis.mp4';
  if (kendiVideosu) kendi++; else ortak++;

  if (/döngü videosu yalnız ekrandayken oynar/.test(h)) eskiGozlemci.push(ad);

  const saglam = vVar && pVar;
  if (!saglam) kirik++;

  console.log((saglam ? (kendiVideosu ? '✓ kendi' : '· ortak') : '✗ KIRIK').padEnd(9)
    + ad.padEnd(47) + dosya
    + (saglam ? '' : '   ← mp4:' + (vVar ? 'var' : 'YOK') + ' poster:' + (pVar ? 'var' : 'YOK')));
});

console.log('');
console.log('  toplam sayfa        : ' + sayfalar.length);
console.log('  kendi videosu var   : ' + kendi);
console.log('  hâlâ ortak (akis)   : ' + ortak);
console.log('  KIRIK (dosya yok)   : ' + kirik);
console.log('  eski satır içi gözlemci kalan: ' + eskiGozlemci.length
  + (eskiGozlemci.length ? '  → ' + eskiGozlemci.slice(0, 4).join(', ') : ''));
console.log('');
console.log(kirik === 0 ? '  ✓ KIRIK SAYFA YOK — bırakılabilir durumda'
  : '  ✗ ' + kirik + ' sayfa kırık — bırakmadan önce düzelt');
process.exitCode = kirik === 0 ? 0 : 9;
